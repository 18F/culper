import React from 'react'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'
import { i18n } from '../../config'
import {
  SectionTitle,
  ProgressBar,
  ScoreCard,
  Navigation,
  NavigationToggle
} from '..'
import { Form } from '../../views'
import { Introduction, Show } from '../Form'
import Logout from '../Navigation/Logout'
import StickyHeader from '../Sticky/StickyHeader'
import formTypes from './../../config/formTypes'

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

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      instructions: false
    }
    this.showInstructions = this.showInstructions.bind(this)
    this.dismissInstructions = this.dismissInstructions.bind(this)

    // workaround for not having React.createRef(), introduced in React 16.3
    // https://reactjs.org/docs/refs-and-the-dom.html#dont-overuse-refs
    this.sectionFocusEl = null
    this.setSectionFocusEl = el => {
      this.sectionFocusEl = el
    }
  }

  componentDidUpdate(prevProps) {
    // for keyboard navigation accessbility, focus on the main content area after a new section is navigated to
    if (this.props.location.pathname !== prevProps.location.pathname) {
      this.sectionFocusEl.focus()
    }
  }

  showInstructions(event) {
    this.setState({ instructions: true })
  }

  dismissInstructions() {
    this.setState({ instructions: false })
  }

  designClass() {
    if (
      this.props.location &&
      this.props.location.query &&
      this.props.location.query.design
    ) {
      return 'design'
    }

    if (
      window &&
      window.location &&
      window.location.search &&
      window.location.search.indexOf('design') !== -1
    ) {
      return 'design'
    }

    return ''
  }

  render() {
    const klassApp = `${this.designClass()} ${
      this.props.settings.modalOpen ? 'modal-open' : ''
    }`.trim()
    const mobileNavigation = this.props.settings.mobileNavigation || false
    const klassTitle = 'eapp-structure-right eapp-title'
    const klassHeading = `eapp-structure-wrap eapp-header ${
      mobileNavigation ? 'mobile-navigation' : ''
    }`.trim()
    const klassMain = `eapp-structure-wrap eapp-main ${
      mobileNavigation ? 'mobile-navigation' : ''
    }`.trim()
    const klassNavigation = `eapp-structure-left eapp-navigation ${
      mobileNavigation
        ? 'mobile-visible tablet-visible desktop-visible'
        : 'mobile-hidden'
    }`
    const klassCore = `eapp-structure-right eapp-core ${
      mobileNavigation ? 'mobile-hidden' : 'visible'
    }`

    return (
      <div className={klassApp}>
        <Introduction
          forceOpen={this.state.instructions}
          onDismiss={this.dismissInstructions}
          dispatch={this.props.dispatch}
        />
        <div id="scrollTo" />
        <a className="usa-skipnav" href="#main-content">
          {i18n.t('app.skip')}
        </a>
        <StickyHeader stickyClass="sticky-header">
          <div className="header-container">
            <div className="header">
              <header className="usa-header usa-header-basic" role="banner">
                <div className="usa-banner mobile-hidden">
                  <div className="usa-accordion">
                    <div className="usa-banner-header">
                      <div className="usa-grid usa-banner-inner">
                        <img
                          src="/img/favicons/favicon-57.png"
                          alt="U.S. flag"
                        />
                        <p>{i18n.t('app.banner.title')}</p>
                        <button
                          className="usa-accordion-button usa-banner-button"
                          aria-expanded="false"
                          aria-controls="gov-banner">
                          <span className="usa-banner-button-text">
                            {i18n.t('app.banner.button')}
                          </span>
                        </button>
                      </div>
                    </div>
                    <div
                      className="usa-banner-content usa-grid usa-accordion-content"
                      id="gov-banner">
                      <div className="usa-banner-guidance-gov usa-width-one-half">
                        <img
                          className="usa-banner-icon usa-media_block-img"
                          src="/img/icon-dot-gov.svg"
                          alt="Dot gov"
                        />
                        <div className="usa-media_block-body">
                          <p>
                            <strong>{i18n.t('app.banner.witty')}</strong>
                            <br />
                            {i18n.t('app.banner.extension')}
                          </p>
                        </div>
                      </div>
                      <div className="usa-banner-guidance-ssl usa-width-one-half">
                        <img
                          className="usa-banner-icon usa-media_block-img"
                          src="/img/icon-https.svg"
                          alt="SSL"
                        />
                        <div className="usa-media_block-body">
                          <p>{i18n.t('app.banner.ssl')}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className={klassHeading}>
                  <div className="eapp-structure-row">
                    <div className="eapp-structure-left eapp-logo" id="logo">
                      <NavigationToggle />
                      <div className="eapp-logo-container">
                        <img
                          className="eapp-logo-icon"
                          src="/img/nbis-seal-small.png"
                          alt="National Background Investigation Services"
                        />
                        <span className="eapp-logo-text">
                          {formTypes[this.props.formType]}
                        </span>
                      </div>
                    </div>
                    <div className={klassTitle}>
                      <div className="eapp-logout">
                        <button
                          onClick={this.showInstructions}
                          className="instructions mobile-hidden">
                          {i18n.t('app.instructions')}
                        </button>
                        <Show when={this.props.authenticated}>
                          <Logout />
                        </Show>
                      </div>
                      <SectionTitle hidden={mobileNavigation} />
                    </div>
                  </div>
                </div>
              </header>
              <div id="scrollToProgress" />
              <div className="usa-overlay" />
              <ProgressBar />
            </div>
          </div>
        </StickyHeader>
        <main className={klassMain}>
          <div className="eapp-structure-row">
            <div className={klassNavigation}>
              <ScoreCard />
              <Navigation />
              <button
                onClick={this.showInstructions}
                className="instructions mobile-visible">
                <span>{i18n.t('app.instructions')}</span>
              </button>
              &nbsp;
            </div>
            <a
              href="javascript:;;;"
              className="eapp-section-focus"
              title="Main content. Please press TAB to go to the next question"
              ref={this.setSectionFocusEl}
            />
            <div id="main-content" className={klassCore}>
              <Form {...this.props} />
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
function mapStateToProps(state) {
  const auth = state.authentication
  const app = state.application || {}
  const settings = app.Settings || { mobileNavigation: false, modalOpen: false }

  return {
    settings: settings,
    authenticated: auth.authenticated,
    formType: auth.formType
  }
}

// Wraps the the App component with connect() which adds the dispatch()
// function to the props property for this component
export default withRouter(connect(mapStateToProps)(App))
