import AuthenticatedView from '../../views/AuthenticatedView'
import { connect } from 'react-redux'
import React from 'react'
import Section from './Section'

class SubSection extends React.Component {
  render () {
    return (
      <Section name={this.props.name}
        isSubSection={true}
        sectionClass={this.props.subClass}
        subUrl={this.props.subUrl}
        locked={this.props.locked} />
    )
  }
}

SubSection.defaultProps = {
  locked: false
}

export default connect()(AuthenticatedView(SubSection))
