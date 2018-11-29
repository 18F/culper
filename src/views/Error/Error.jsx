import React from 'react'
import { connect } from 'react-redux'
import { i18n } from '../../config'

export default class Error extends React.Component {
  render() {
    return (
      <div className="login eapp-core" id="login">
        <div id="seal-header" className="seal-header text-center">
          <div className="content">
            <img
              src="/img/nbis-seal.png"
              alt="National Background Investigation Services"
            />
            <h2>{i18n.t('login.title')}</h2>
          </div>
        </div>
        <div className="content">
          <div className="table one">
            <div id="error" className="auth error">
              <h3>{i18n.t('application.loading.error.title')}</h3>
              {i18n.m('application.loading.error.para')}
              <a href="/" title={i18n.t('application.loading.error.button')}>
                {i18n.t('application.loading.error.button')}
              </a>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
