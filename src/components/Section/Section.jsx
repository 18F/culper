import React from 'react'
import { updateTitle } from '../../actions/SectionActions'
import AuthenticatedView from '../../views/AuthenticatedView'
import Identification from './Identification'
import OtherNamesUsed from './OtherNamesUsed'
import Identifying from './Identifying'

// Mapping section identifiers to the associated components.
const sectionMap = {
  'identification': {
    'title': 'Identification',
    'render': (subsection) => { return (<Identification subsection={subsection} />) }
  },
  'othernames': {
    'title': 'Other Names Used',
    'render': (subsection) => { return (<OtherNamesUsed subsection={subsection} />) }
  },
  'identifying': {
    'title': 'Your Identifying Information',
    'render': (subsection) => { return (<Identifying subsection={subsection} />) }
  }
}

class Section extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      section: !sectionMap[this.props.section] ? 'identification' : this.props.section
    }
  }

  componentDidMount () {
    var sec = sectionMap[this.state.section]
    this.props.dispatch(updateTitle(sec.title))
  }

  /**
   * Provides the appropriate section to render. Defaults to `identification`.
   */
  getSection () {
    var sec = sectionMap[this.state.section]
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
