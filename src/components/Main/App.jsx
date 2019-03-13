import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'
import classnames from 'classnames'

import i18n from 'util/i18n'
import * as formTypes from 'constants/formTypes'

import {
  SectionTitle,
  ProgressBar,
  ScoreCard,
  Navigation,
  NavigationToggle,
} from 'components'
import { Introduction } from 'components/Form'
import Logout from 'components/Navigation/Logout'
import StickyHeader from 'components/Sticky/StickyHeader'

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
      instructions: false,
    }
    this.showInstructions = this.showInstructions.bind(this)
    this.dismissInstructions = this.dismissInstructions.bind(this)

    // workaround for not having React.createRef(), introduced in React 16.3
    // https://reactjs.org/docs/refs-and-the-dom.html#dont-overuse-refs
    this.sectionFocusEl = null
    this.setSectionFocusEl = (el) => {
      this.sectionFocusEl = el
    }
  }

  componentDidUpdate(prevProps) {
    const { location } = this.props
    /**
     * for keyboard navigation accessbility, focus on the main content area after a new section is
     * navigated to */
    if (location.pathname !== prevProps.location.pathname) {
      this.sectionFocusEl.focus()
    }
  }

  showInstructions() {
    this.setState({ instructions: true })
  }

  dismissInstructions() {
    this.setState({ instructions: false })
  }

  designClass() {
    const { location } = this.props

    if (location
      && location.query
      && location.query.design
    ) {
      return 'design'
    }

    if (
      window
      && window.location
      && window.location.search
      && window.location.search.indexOf('design') !== -1
    ) {
      return 'design'
    }

    return ''
  }

  render() {
    const {
      formType, settings, dispatch, children,
    } = this.props
    const { instructions } = this.state

    const formName = formTypes[formType]

    const appClasses = classnames(
      this.designClass(),
      { 'modal-open': settings.modalOpen }
    )

    const mobileNavigation = settings.mobileNavigation || false

    const titleClasses = classnames('eapp-structure-right', 'eapp-title')

    const headingClasses = classnames(
      'eapp-structure-wrap',
      'eapp-header',
      { 'mobile-navigation': mobileNavigation }
    )

    const mainClasses = classnames(
      'eapp-structure-wrap',
      'eapp-main',
      { 'mobile-navigation': mobileNavigation }
    )

    const navigationClasses = classnames(
      'eapp-structure-left',
      'eapp-navigation',
      {
        'mobile-visible': mobileNavigation,
        'tablet-visible': mobileNavigation,
        'desktop-visible': mobileNavigation,
        'mobile-hidden': !mobileNavigation,
      }
    )

    const coreClasses = classnames(
      'eapp-structure-right',
      'eapp-core',
      {
        'mobile-hidden': mobileNavigation,
        visible: !mobileNavigation,
      }
    )

    /* eslint jsx-a11y/anchor-has-content: 0 */
    /* eslint jsx-a11y/anchor-is-valid: 0 */
    /* eslint no-script-url: 0 */

    return (
      <div className={appClasses}>
        <Introduction
          forceOpen={instructions}
          onDismiss={this.dismissInstructions}
          dispatch={dispatch}
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
                          type="button"
                          className="usa-accordion-button usa-banner-button"
                          aria-expanded="false"
                          aria-controls="gov-banner"
                        >
                          <span className="usa-banner-button-text">
                            {i18n.t('app.banner.button')}
                          </span>
                        </button>
                      </div>
                    </div>
                    <div
                      className="usa-banner-content usa-grid usa-accordion-content"
                      id="gov-banner"
                    >
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
                <div className={headingClasses}>
                  <div className="eapp-structure-row">
                    <div className="eapp-structure-left eapp-logo" id="logo">
                      <NavigationToggle />
                      <div className="eapp-logo-container">
                        <img
                          className="eapp-logo-icon"
                          src="/img/nbis-seal-small.png"
                          alt="National Background Investigation Services"
                        />
                        <span className="eapp-logo-text">{formName}</span>
                      </div>
                    </div>
                    <div className={titleClasses}>
                      <div className="eapp-logout">
                        <button
                          type="button"
                          onClick={this.showInstructions}
                          className="instructions mobile-hidden"
                        >
                          {i18n.t('app.instructions')}
                        </button>
                        <Logout />
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
        <main className={mainClasses}>
          <div className="eapp-structure-row">
            <div className={navigationClasses}>
              <ScoreCard />
              <Navigation />
              <button
                type="button"
                onClick={this.showInstructions}
                className="instructions mobile-visible"
              >
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
            <div id="main-content" className={coreClasses}>
              {children}
              &nbsp;
            </div>
          </div>
        </main>
      </div>
    )
  }
}

/* eslint react/forbid-prop-types: 0 */
App.propTypes = {
  location: PropTypes.object.isRequired,
  formType: PropTypes.string.isRequired,
  settings: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
}

function mapStateToProps(state) {
  const { authentication, application } = state
  const { formType } = authentication
  const settings = application.Settings
    || { mobileNavigation: false, modalOpen: false }

  return {
    settings,
    formType,
  }
}

// Wraps the the App component with connect() which adds the dispatch()
// function to the props property for this component
export default withRouter(connect(mapStateToProps)(App))
