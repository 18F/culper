import React from 'react'
import { connect } from 'react-redux'
import { i18n } from '../../../config'
import { updateApplication } from '../../../actions/ApplicationActions'
import Modal from '../Modal'

export class Consent extends React.Component {
  constructor (props) {
    super(props)
    this.click = this.click.bind(this)
  }

  componentDidMount () {
    // Focus on the button after mounting
    if (window && window.document) {
      const el = window.document.querySelector('.consent-modal button')
      if (el) {
          el.focus()
      }
    }
  }

  click (event) {
    this.props.dispatch(updateApplication('Settings', 'consented', 'Yes'))
  }

  render () {
    return (
      <div className="consent-modal">
        <Modal show={this.props.settings.consented !== 'Yes'} className="consent-content">
          <div>
            <div className="consent-legal">
              {i18n.m2('consent.contents')}
            </div>
            <button name="consent"
                    className="consent-acceptance"
                    role="button"
                    title={i18n.t('consent.acceptance.title')}
                    onClick={this.click}>
              {i18n.t('consent.acceptance.title')}
            </button>
          </div>
        </Modal>
      </div>
    )
  }
}

Consent.defaultProps = {
  settings: { consented: '' },
  dispatch: (action) => {}
}

function mapStateToProps (state) {
  const app = state.application || {}
  const settings = app.Settings || { consented: '' }

  return {
    settings
  }
}

export default connect(mapStateToProps)(Consent)
