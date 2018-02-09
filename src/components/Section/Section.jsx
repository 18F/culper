import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { push } from '../../middleware/history'
import { updateSection } from '../../actions/SectionActions'
import { extractApplicantBirthdate } from './extractors'
import AuthenticatedView from '../../views/AuthenticatedView'
import Identification from './Identification'
import Financial from './Financial'
import Relationships from './Relationships'
import Citizenship from './Citizenship'
import Foreign from './Foreign'
import Military from './Military'
import History from './History'
import Legal from './Legal'
import Psychological from './Psychological'
import SubstanceUse from './SubstanceUse'
import Package from './Package'
import { SectionView, SectionViews } from './SectionView'

class Section extends React.Component {
  constructor (props) {
    super(props)
    this.update = this.update.bind(this)
  }

  getChildContext () {
    return { applicantBirthdate: this.props.applicantBirthdate }
  }

  // TODO: See if this is necessary. Removing this makes the first section not expand in navigation ATM.
  componentDidMount () {
    this.update(this.props)
  }

  componentDidUpdate () {
    // Once a section updates then attempt to focus on the first form element
    const selectors = [
      '.eapp-core input',
      '.eapp-core textarea',
      '.eapp-core select'
    ]
    const el = window.document.querySelector(selectors.join(', '))
    if (el) {
      window.setTimeout(() => {
        el.focus()
      }, 100)
    }
  }

  update (props) {
    this.props.dispatch(updateSection(props.section, props.subsection))
    this.props.dispatch(push(`/form/${props.section}/${props.subsection || 'intro'}`))
  }

  render () {
    return (
      <SectionViews current={this.props.section} dispatch={this.props.dispatch}>
        <SectionView name="identification">
          <Identification subsection={this.props.subsection} update={this.update} />
        </SectionView>
        <SectionView name="financial">
          <Financial subsection={this.props.subsection} update={this.update} />
        </SectionView>
        <SectionView name="relationships">
          <Relationships subsection={this.props.subsection} update={this.update} />
        </SectionView>
        <SectionView name="citizenship">
          <Citizenship subsection={this.props.subsection} update={this.update} />
        </SectionView>
        <SectionView name="military">
          <Military subsection={this.props.subsection} update={this.update} />
        </SectionView>
        <SectionView name="history">
          <History subsection={this.props.subsection} update={this.update} />
        </SectionView>
        <SectionView name="foreign">
          <Foreign subsection={this.props.subsection} update={this.update} />
        </SectionView>
        <SectionView name="legal">
          <Legal subsection={this.props.subsection} update={this.update} />
        </SectionView>
        <SectionView name="psychological">
          <Psychological subsection={this.props.subsection} update={this.update} />
        </SectionView>
        <SectionView name="substance">
          <SubstanceUse subsection={this.props.subsection} update={this.update} />
        </SectionView>
        <SectionView name="package">
          <Package subsection={this.props.subsection} update={this.update} />
        </SectionView>
      </SectionViews>
    )
  }
}

function mapStateToProps (state) {
  const app = state.application || {}
  return {
    applicantBirthdate: extractApplicantBirthdate(app)
  }
}

Section.childContextTypes = {
  applicantBirthdate: PropTypes.object
}

export default connect(mapStateToProps)(AuthenticatedView(Section))
