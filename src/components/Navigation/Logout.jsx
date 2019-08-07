import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { i18n, env } from 'config'
import { logout } from 'actions/AuthActions'
import { api } from 'services'
import { saveSection } from 'components/SavedIndicator/persistence-helpers'

class Logout extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      saml: false,
    }
  }

  componentWillMount() {
    if (env.SamlEnabled() && env.SamlSLOEnabled()) {
      api.samlSLO().then((response) => {
        this.setState({ saml: response.data || {} })
      })
    }
  }

  logout = () => {
    const { application, section, dispatch } = this.props

    saveSection(application, section.section, section.subsection, dispatch)
      .then(() => {
        dispatch(logout())
      })
      .catch((error) => {
        alert(error)
      })
  }

  logoutSAML() {
    const { saml } = this.state

    return (
      <div id="saml" className="auth saml">
        <form method="post" action={saml.URL}>
          <input
            type="hidden"
            name="SAMLRequest"
            value={saml.Base64XML}
          />
          <button type="submit" className="usa-button-big">
            <span>{i18n.t('app.logout')}</span>
          </button>
        </form>
      </div>
    )
  }

  logoutBasic() {
    if (!env.BasicAuthenticationEnabled()) {
      return null
    }

    return (
      <button type="button" onClick={this.logout} className="logout">
        {i18n.t('app.logout')}
      </button>
    )
  }

  render() {
    const { saml } = this.state

    if (env.SamlEnabled() && !env.SamlSLOEnabled() && saml) {
      return this.logoutSAML()
    }

    return this.logoutBasic()
  }
}

Logout.propTypes = {
  section: PropTypes.object,
  application: PropTypes.object,
  dispatch: PropTypes.func,
}

Logout.defaultProps = {
  section: {},
  application: {},
  dispatch: () => {},
}

function mapStateToProps(state) {
  const { section, application } = state

  return {
    section,
    application,
  }
}

export default connect(mapStateToProps)(Logout)
