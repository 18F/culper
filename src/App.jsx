import React from 'react'
import { SectionTitle, ScoreCard, Navigation } from './components'
import { connect } from 'react-redux'
import { login, logout } from './actions/AuthActions'

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

  render () {
    let logoutButton = this.props.authenticated && this.props.twofactor
        ? (<a href="#" onClick={this.logout} className="logout">Logout</a>)
        : null

    return (
      <div>
        <a className="usa-skipnav" href="#main-content">Skip to main content</a>
        <header className="usa-header usa-header-basic" role="banner">
          <div className="usa-banner">
            <div className="usa-accordion">
              <header className="usa-banner-header">
                <div className="usa-grid usa-banner-inner">
                  <img src="/img/favicons/favicon-57.png" alt="U.S. flag" />
                  <p>An official website of the United States government</p>
                  <button className="usa-accordion-button usa-banner-button"
                          aria-expanded="false" aria-controls="gov-banner">
                    <span className="usa-banner-button-text">Here's how you know</span>
                  </button>
                </div>
              </header>
              <div className="usa-banner-content usa-grid usa-accordion-content" id="gov-banner">
                <div className="usa-banner-guidance-gov usa-width-one-half">
                  <img className="usa-banner-icon usa-media_block-img" src="/img/icon-dot-gov.svg" alt="Dot gov" />
                  <div className="usa-media_block-body">
                    <p>
                      <strong>The .gov means it’s official.</strong>
                      <br />
                      Federal government websites always use a .gov or .mil domain. Before sharing sensitive information online, make sure you’re on a .gov or .mil site by inspecting your browser’s address (or “location”) bar.
                    </p>
                  </div>
                </div>
                <div className="usa-banner-guidance-ssl usa-width-one-half">
                  <img className="usa-banner-icon usa-media_block-img" src="/img/icon-https.svg" alt="SSL" />
                  <div className="usa-media_block-body">
                    <p>This site is also protected by an SSL (Secure Sockets Layer) certificate that’s been signed by the U.S. government. The <strong>https://</strong> means all transmitted data is encrypted  — in other words, any information or browsing history that you provide is transmitted securely.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="usa-grid-full no-gutter eapp-header">
              <div className="usa-width-one-fourth eapp-logo" id="logo">
                <span className="eapp-logo-text">
                  SF86
                </span>
              </div>
              <div className="eapp-logout">
                {logoutButton}
              </div>
            <SectionTitle />
          </div>
        </header>
        <div className="usa-overlay"></div>
		<div className="eapp-progress">
		  <div id="progress-bar" className="eapp-progress-current"></div>
		</div>
        <main id="main-content">
          <div className="usa-grid-full no-gutter">
            <div className="usa-width-one-fourth eapp-navigation">
              <ScoreCard />
              <Navigation />
              &nbsp;
            </div>
            <div className="usa-width-one-half eapp-core">
              {this.props.children}
              &nbsp;
            </div>
            <div className="usa-width-one-sixth">
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
