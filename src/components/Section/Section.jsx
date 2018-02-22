import React from 'react'
import { push } from '../../middleware/history'
import { updateSection } from '../../actions/SectionActions'
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
import { SectionViews, SectionView } from './SectionView'

class Section extends React.Component {
  constructor (props) {
    super(props)
    this.update = this.update.bind(this)
  }

  // TODO: See if this is necessary. Removing this makes the first section not expand in navigation ATM.
  componentDidMount () {
    this.update(this.props)
  }

  componentDidUpdate () {
    // Once a section updates then attempt to focus on the first form element
    // const selectors = [
    //   '.eapp-core input',
    //   '.eapp-core textarea',
    //   '.eapp-core select',
    //   '.eapp-core a'
    // ]

    let el = null
    // for (const selector of selectors) {
    //   el = window.document.querySelector(selectors.join(', '))
    //   if (el) {
    //     // Make sure it is currently visible
    //     const bottom = el.getBoundingClientRect().bottom
    //     const height = window.innerHeight
    //     if (height >= bottom) {
    //       // Break out of this loop if an visible element was found
    //       break
    //     }
    //   }

    //   el = null
    // }

    // Fallback to a specific known point of reference
    if (!el) {
      el = window.document.querySelector('.eapp-section-focus')
    }

    if (el) {
      window.setTimeout(() => {
        el.focus()
      }, 200)
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

export default AuthenticatedView(Section)
