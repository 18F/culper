import React from 'react'
import AuthenticatedView from '../../views/AuthenticatedView'
import { navigation } from '../../config'
import Section from './Section'

class Navigation extends React.Component {
  render () {
    const navItems = navigation.map((section) => {
      return <Section section={section}/>
    })

    return <nav>
      <ul className="usa-sidenav-list">
        {navItems}
      </ul>
    </nav>
  }
}

export default AuthenticatedView(Navigation)
