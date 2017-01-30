import React from 'react'
import { updateSection } from '../../actions/SectionActions'
import AuthenticatedView from '../../views/AuthenticatedView'
import Identification from './Identification'
import Financial from './Financial'
import Foreign from './Foreign'
import { SectionView, SectionViews } from './SectionView'

class Section extends React.Component {

  /**
   * Used when routes are updated and render is called for different sections. On initial page load,
   * the componentDidMount() is rendered. However, subsequent path changes trigger componentWillReceiveProps()
   */
  componentWillReceiveProps (updatedProps) {
    let name = updatedProps.section
    let sub = updatedProps.subsection
    this.props.dispatch(updateSection(name, sub))
  }

  componentDidMount () {
    let name = this.props.section
    let sub = this.props.subsection
    this.props.dispatch(updateSection(name, sub))
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
        <SectionView name="foreign">
          <Foreign subsection={this.props.subsection} />
        </SectionView>
      </SectionViews>
    )
  }
}

export default AuthenticatedView(Section)
