import React from 'react'
import { i18n } from './config'
import { SectionTitle, ProgressBar, ScoreCard, Navigation } from './components'
import { connect } from 'react-redux'
import { logout } from './actions/AuthActions'

/*
           1/6-ish                                 2/3-ish                               1/6-ish
  ------------------------------------------------------------------------------------------------
  |                       |
  | Title                 | <Page title />
  | <Logout button />     |
  |                       |
  ------------------------------------------------------------------------------------------------
  |                       |
  | <Score />             | <View />
  | <Nav />               |  - This will be where the main content lies
  |                       |
  |                       |
  |                       |
  |                       |
  |                       |
  |                       |
  ------------------------------------------------------------------------------------------------
  |
  | <Footer />
  |
  ------------------------------------------------------------------------------------------------
*/

export class App extends React.Component {
  constructor (props) {
    super(props)
    this.logout = this.logout.bind(this)
  }

  logout () {
    this.props.dispatch(logout())
    window.location = window.location.pathname
  }

  designClass () {
    if (this.props.location && this.props.location.query && this.props.location.query.design) {
      return 'design'
    }

    if (window && window.location && window.location.search && window.location.search.indexOf('design') !== -1) {
      return 'design'
    }

    return ''
  }

  render () {
    let logoutButton = this.props.authenticated && this.props.twofactor
        ? (<a href="#" onClick={this.logout} className="logout">{i18n.t('app.logout')}</a>)
        : null

    return (
      <div className={this.designClass()}>
        <div id="scrollTo"></div>
        <a className="usa-skipnav" href="#main-content">{i18n.t('app.skip')}</a>
        <header className="usa-header usa-header-basic" role="banner">
          <div className="usa-banner">
            <div className="usa-accordion">
              <header className="usa-banner-header">
                <div className="usa-grid usa-banner-inner">
                  <img src="/img/favicons/favicon-57.png" alt="U.S. flag" />
                  <p>{i18n.t('app.banner.title')}</p>
                  <button className="usa-accordion-button usa-banner-button"
                          aria-expanded="false" aria-controls="gov-banner">
                    <span className="usa-banner-button-text">{i18n.t('app.banner.button')}</span>
                  </button>
                </div>
              </header>
              <div className="usa-banner-content usa-grid usa-accordion-content" id="gov-banner">
                <div className="usa-banner-guidance-gov usa-width-one-half">
                  <img className="usa-banner-icon usa-media_block-img" src="/img/icon-dot-gov.svg" alt="Dot gov" />
                  <div className="usa-media_block-body">
                    <p>
                      <strong>{i18n.t('app.banner.witty')}</strong>
                      <br />
                      {i18n.t('app.banner.extension')}
                    </p>
                  </div>
                </div>
                <div className="usa-banner-guidance-ssl usa-width-one-half">
                  <img className="usa-banner-icon usa-media_block-img" src="/img/icon-https.svg" alt="SSL" />
                  <div className="usa-media_block-body">
                    <p>{i18n.t('app.banner.ssl')}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="eapp-structure-wrap eapp-header">
            <div className="eapp-structure-row">
              <div className="eapp-structure-left eapp-logo" id="logo">
                <img className="eapp-logo-icon" src="img/US-OfficeOfPersonnelManagement-Seal.svg" />
                <span className="eapp-logo-text">SF86</span>
              </div>
              <div className="eapp-structure-right eapp-title">
                <div className="eapp-logout">
                  {logoutButton}
                </div>
                <SectionTitle />
              </div>
            </div>
          </div>
        </header>
        <div id="scrollToProgress"></div>
        <div className="usa-overlay"></div>
        <ProgressBar />
        <main id="main-content" className="eapp-structure-wrap">
          <div className="eapp-structure-row">
            <div className="eapp-structure-left eapp-navigation">
              <ScoreCard />
              <Navigation />
              &nbsp;
            </div>
            <div className="eapp-structure-right eapp-core">
              {this.props.children}
              &nbsp;
            </div>
          </div>
        </main>
      </div>
    )
  }
}

/**
 * Maps the relevant subtree state from the applications state tree.
 * In this case, we pull the authentication sub-state. This is mapped
 * to the authentication reducer. When actions are dispatched, this
 * method is executed which causes a re-render.
 *
 */
function mapStateToProps (state) {
  const auth = state.authentication
  return {
    authenticated: auth.authenticated,
    twofactor: auth.twofactor,
    token: auth.token
  }
}

// Wraps the the App component with connect() which adds the dispatch()
// function to the props property for this component
export default connect(mapStateToProps)(App)
