import React from 'react'
import { connect } from 'react-redux'
import { i18n } from '../../../config'
import { updateApplication } from '../../../actions/ApplicationActions'
import { logout } from '../../../actions/AuthActions'
import AuthenticatedView from '../../../views/AuthenticatedView'
import Branch from '../Branch'
import Modal from '../Modal'
import Show from '../Show'

export class Introduction extends React.Component {
  constructor (props) {
    super(props)
    this.updateBranch = this.updateBranch.bind(this)
  }

  componentDidMount () {
    // Focus on the "Yes" value after initial mounting
    if (window && window.document) {
      const el = window.document.querySelector('.introduction-modal .branch .yes input')
      if (el) {
          el.focus()
      }
    }
  }

  updateBranch (values) {
    if (values.value === 'No') {
      this.props.dispatch(updateApplication('Settings', 'acceptedTerms', { value: '' }))
      this.props.dispatch(logout())
      if (window && window.location) {
        window.location = window.location.pathname
      }
      return
    }

    this.props.dispatch(updateApplication('Settings', 'acceptedTerms', values))
  }

  render () {
    const klass = `introduction-modal ${this.props.forceOpen ? 'closeable' : ''}`.trim()
    const accepted = (this.props.settings.acceptedTerms || {}).value === 'Yes'
    return (
      <div className={klass}>
        <Modal className="introduction-content"
               show={!accepted || this.props.forceOpen}
               closeable={this.props.forceOpen}
               onDismiss={this.props.onDismiss}>
          <div>
            <div className="introduction-legal">
              {i18n.m('introduction.contents')}
            </div>
            <Show when={!this.props.forceOpen}>
              <Branch name="acceptance_of_terms"
                      label={i18n.t('introduction.acceptance.title')}
                      labelSize="h3"
                      optional={true}
                      className="introduction-acceptance"
                      {...this.props.settings.acceptedTerms}
                      onUpdate={this.updateBranch}>
                {i18n.m('introduction.acceptance.para')}
              </Branch>
            </Show>
          </div>
        </Modal>
      </div>
    )
  }
}

Introduction.defaultProps = {
  settings: { acceptedTerms: { value: '' } },
  forceOpen: false,
  onDismiss: () => {},
  dispatch: (action) => {}
}

function mapStateToProps (state) {
  const app = state.application || {}
  const settings = app.Settings || { acceptedTerms: { value: '' } }

  return {
    settings: settings
  }
}

export default connect(mapStateToProps)(AuthenticatedView(Introduction))
