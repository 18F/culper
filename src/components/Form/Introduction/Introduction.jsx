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

  updateBranch (values) {
    if (values === 'No') {
      this.props.dispatch(updateApplication('Settings', 'acceptedTerms', ''))
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
    return (
      <div className={klass}>
        <Modal className="introduction-content"
               show={this.props.settings.acceptedTerms !== 'Yes' || this.props.forceOpen}
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
                      value={this.props.settings.acceptedTerms}
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
  settings: { acceptedTerms: '' },
  forceOpen: false,
  onDismiss: () => {},
  dispatch: (action) => {}
}

function mapStateToProps (state) {
  const app = state.application || {}
  const settings = app.Settings || { acceptedTerms: '' }

  return {
    settings: settings
  }
}

export default connect(mapStateToProps)(AuthenticatedView(Introduction))
