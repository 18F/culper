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
import Design from './Design'
import Package from './Package'
import { SectionView, SectionViews } from './SectionView'

class Section extends React.Component {

  /**
   * Used when routes are updated and render is called for different sections. On initial page load,
   * the componentDidMount() is rendered. However, subsequent path changes trigger componentWillReceiveProps()
   */
  componentWillReceiveProps (updatedProps) {
    this.update(updatedProps)
  }

  componentDidMount () {
    this.update(this.props)
  }

  update (props) {
    let name = props.section
    let sub = props.subsection
    this.props.dispatch(updateSection(name, sub))
    this.props.dispatch(push(`/form/${props.section}/${props.subsection || 'intro'}`))
  }

  render () {
    return (
      <SectionViews current={this.props.section} dispatch={this.props.dispatch}>
        <SectionView name="identification">
          <Identification subsection={this.props.subsection} />
        </SectionView>
        <SectionView name="financial">
          <Financial subsection={this.props.subsection} />
        </SectionView>
        <SectionView name="relationships">
          <Relationships subsection={this.props.subsection} />
        </SectionView>
        <SectionView name="citizenship">
          <Citizenship subsection={this.props.subsection} />
        </SectionView>
        <SectionView name="military">
          <Military subsection={this.props.subsection} />
        </SectionView>
        <SectionView name="history">
          <History subsection={this.props.subsection} />
        </SectionView>
        <SectionView name="foreign">
          <Foreign subsection={this.props.subsection} />
        </SectionView>
        <SectionView name="legal">
          <Legal subsection={this.props.subsection} />
        </SectionView>
        <SectionView name="psychological">
          <Psychological subsection={this.props.subsection} />
        </SectionView>
        <SectionView name="substance">
          <SubstanceUse subsection={this.props.subsection} />
        </SectionView>
        <SectionView name="design">
          <Design subsection={this.props.subsection} />
        </SectionView>
        <SectionView name="package">
          <Package subsection={this.props.subsection} />
        </SectionView>
      </SectionViews>
    )
  }
}

export default AuthenticatedView(Section)
