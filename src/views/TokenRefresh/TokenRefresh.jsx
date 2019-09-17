import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import i18n from 'util/i18n'

const TokenRefresh = ({ saved }) => (
  <div className="token-error login eapp-core" id="login">
    <div id="seal-header" className="seal-header">
      <img
        src="/img/nbis-seal.png"
        alt="National Background Investigation Services"
      />
      <h3>{i18n.t('login.token.heading')}</h3>
    </div>
    <div className="content">
      <div className="table one">
        <div id="tokenrefresh" className="auth denied">
          <h2>{i18n.t('login.token.title')}</h2>
          <strong>
            {i18n.t('login.token.saved', { time: saved.toLocaleTimeString() })}
          </strong>
          {i18n.m('login.token.para')}
          <a href="/login" className="usa-button-primary usa-button-big">
            {i18n.t('login.token.button')}
          </a>
        </div>
      </div>
    </div>
  </div>
)

TokenRefresh.defaultProps = {
  saved: new Date(),
}

TokenRefresh.propTypes = {
  saved: PropTypes.instanceOf(Date),
}

/**
 * Maps the relevant subtree state from the applications state tree.
 * In this case, we pull the authentication sub-state. This is mapped
 * to the authentication reducer. When actions are dispatched, this
 * method is executed which causes a re-render.
 */
function mapStateToProps(state) {
  const app = state.application || {}
  const settings = app.Settings || {}
  return {
    saved: settings.saved || new Date(),
  }
}

// Wraps the the App component with connect() which adds the dispatch()
// function to the props property for this component
export default connect(mapStateToProps)(TokenRefresh)
