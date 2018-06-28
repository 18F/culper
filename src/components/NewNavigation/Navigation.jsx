import React from 'react'
import AuthenticatedView from '../../views/AuthenticatedView'
import { navigation } from '../../config'
import SectionList from './SectionList'

class Navigation extends React.Component {
  render () {
    return (
      <nav>
        <SectionList sections={navigation}/>
      </nav>
    )
  }
}

Navigation.propTypes = {}

export default AuthenticatedView(Navigation)
