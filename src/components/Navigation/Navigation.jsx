import React from 'react'
import { navigation } from '../../config'
import SectionList from './SectionList'

class Navigation extends React.Component {
  render() {
    return (
      <nav className="form-navigation" role="navigation">
        <SectionList sections={navigation} />
      </nav>
    )
  }
}

Navigation.propTypes = {}

export default Navigation
