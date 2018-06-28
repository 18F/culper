import React from 'react'
import { NavLink } from 'react-router-dom'
import AuthenticatedView from '../../views/AuthenticatedView'

class Section extends React.Component {
  render () {
    const url = `/form/${this.props.section.url}/intro`
    return (
      <li key={url}>
        <NavLink to={url} activeClassName="usa-current">{this.props.section.name}</NavLink>
      </li>
    )
  }
}

export default AuthenticatedView(Section)
