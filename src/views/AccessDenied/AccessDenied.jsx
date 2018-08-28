import React from 'react'
import { connect } from 'react-redux'
import { i18n } from '../../config'

class AccessDenied extends React.Component {
  render() {
    return (
      <div className="login eapp-core" id="login">
        <div id="seal-header" className="seal-header text-center">
          <div className="content">
            <img
              src="/img/US-OfficeOfPersonnelManagement-Seal.svg"
              alt="U.S. Office of Personnel Management"
            />
            <h2>{i18n.t('login.title')}</h2>
          </div>
        </div>
        <div className="content">
          <div className="table one">
            <div id="accessdenied" className="auth denied">
              <h2>{i18n.t('login.denied.title')}</h2>
              {i18n.m('login.denied.para')}
              <a href="/login" className="usa-button-primary">
                {i18n.t('login.denied.button')}
              </a>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

AccessDenied.defaultProps = {}

/**
 * Maps the relevant subtree state from the applications state tree.
 * In this case, we pull the authentication sub-state. This is mapped
 * to the authentication reducer. When actions are dispatched, this
 * method is executed which causes a re-render.
 */
function mapStateToProps(state) {
  return {}
}

// Wraps the the App component with connect() which adds the dispatch()
// function to the props property for this component
export default connect(mapStateToProps)(AccessDenied)
