import React from 'react'
import { NavLink } from 'react-router-dom'
import { navigation } from '../../config'

export default class Navigation extends React.Component {
  render () {
    const navItems = navigation.map((section) => {
      const url = `/form/${section.url}/intro`
      return (
        <li key={url}>
          <NavLink to={url} activeClassName="usa-current">{section.name}</NavLink>
        </li>
      )
    })

    return <nav>
      <ul className="usa-sidenav-list">
        {navItems}
      </ul>
    </nav>
  }
}
