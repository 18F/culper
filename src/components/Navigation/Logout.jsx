import React from 'react'
import { connect } from 'react-redux'
import { i18n, env } from '../../config'
import { logout } from '../../actions/AuthActions'
import { api } from '../../services'
import { saveSection } from '../SavedIndicator/persistence-helpers'

class Logout extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}

    this.logout = this.logout.bind(this)
    this.logoutSAML = this.logoutSAML.bind(this)
  }

  componentWillMount() {
    if (env.SamlEnabled() && env.SamlSLOEnabled()) {
      api.samlSLO().then(response => {
        this.setState({ saml: response.data || {} })
      })
    }
  }

  logout() {
    const application = this.props.app
    const section = this.props.section.section
    const subsection = this.props.section.subsection

    saveSection(application, section, subsection, this.props.dispatch)
      .then(() => {
        this.props.dispatch(logout())
      })
      .catch(error => {
        alert(error)
      })
  }

  logoutSAML() {
    if (!env.SamlEnabled() && env.SamlSLOEnabled()) {
      return null
    }

    if (!this.state.saml) {
      return null;
    }

    return (
        <div id="saml" className="auth saml">
          <form method="post" action={this.state.saml.URL}>
            <input
              type="hidden"
              name="SAMLRequest"
              value={this.state.saml.Base64XML}
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
      <a href="#" onClick={this.logout} className="logout">
        {i18n.t('app.logout')}
      </a>
    )
  }

  render() {
    return this.logoutSAML() || this.logoutBasic()
  }
}

function mapStateToProps({ section = {}, application = {} }) {
  return {
    section,
    app: application
  }
}

export default connect(mapStateToProps)(Logout)
