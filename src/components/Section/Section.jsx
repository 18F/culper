import React from 'react'
import { connect } from 'react-redux'
import { updateTitle } from '../../actions/SectionActions'
import AuthenticatedView from '../../views/AuthenticatedView'
import Identification from './Identification'
import Identifying from './Identifying'

// Mapping section identifiers to the associated components.
const sectionMap = {
  'identification': {
    'title': 'Identification',
    'render': (subsection) => { return (<Identification subsection={subsection} />) }
  },
  'identifying': {
    'title': 'Your Identifying Information',
    'render': (subsection) => { return (<Identifying subsection={subsection} />) }
  }
}

class Section extends React.Component {
  /**
   * Provides the appropriate section to render. Defaults to `identification`.
   */
  getSection () {
    let s = this.props.section
    if (!sectionMap[this.props.section]) {
      s = 'identification'
    }

    var sec = sectionMap[s]
    this.props.dispatch(updateTitle(sec.title))
    return sec.render(this.props.subsection)
  }

  render () {
    return (
      <div className="section">
        {this.getSection()}
      </div>
    )
  }
}

export default AuthenticatedView(Section)
