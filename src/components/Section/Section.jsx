import React from 'react'
import { connect } from 'react-redux'
import AuthenticatedView from '../../views/AuthenticatedView'
import Identification from './Identification'

// Mapping section identifiers to the associated components.
const sectionMap = {
  'identification': (subsection) => { return (<Identification subsection={subsection} />) }
}

class Section extends React.Component {
  /**
   * Provides the appropriate section to render. Defaults to `identification`.
   */
  section () {
    console.log('<Section /> props:', this.props)
    let s = this.props.section
    if (!sectionMap[this.props.section]) {
      s = 'identification'
    }
    console.log('<Section /> map:', sectionMap[s])
    return sectionMap[s](this.props.subsection)
  }

  render () {
    return (
      <div className="section">
        {this.section()}
      </div>
    )
  }
}

export default AuthenticatedView(Section)
