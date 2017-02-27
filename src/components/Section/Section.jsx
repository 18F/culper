import React from 'react'
import { push } from '../../middleware/history'
import { updateSection } from '../../actions/SectionActions'
import AuthenticatedView from '../../views/AuthenticatedView'
import Identification from './Identification'
import Financial from './Financial'
import Foreign from './Foreign'
import History from './History'
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
    this.props.dispatch(push(`/form/${props.section}/${props.subsection}`))
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
        <SectionView name="history1">
          <History subsection={this.props.subsection} />
        </SectionView>
        <SectionView name="history2">
          <History subsection={this.props.subsection} />
        </SectionView>
        <SectionView name="foreign">
          <Foreign subsection={this.props.subsection} />
        </SectionView>
      </SectionViews>
    )
  }
}

export default AuthenticatedView(Section)
