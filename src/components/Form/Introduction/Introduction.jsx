import React from 'react'
import { connect } from 'react-redux'
import { i18n } from '../../../config'
import { updateApplication } from '../../../actions/ApplicationActions'
import { logout } from '../../../actions/AuthActions'
import AuthenticatedView from '../../../views/AuthenticatedView'
import Branch from '../Branch'
import Modal from '../Modal'

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
    return (
      <div className="introduction-modal">
        <Modal show={this.props.settings.acceptedTerms !== 'Yes'} className="introduction-content">
          <div>
            <div className="introduction-legal">
              {i18n.m('introduction.contents')}
            </div>
            <Branch name="acceptance_of_terms"
                    label={i18n.t('introduction.acceptance.title')}
                    labelSize="h3"
                    className="introduction-acceptance"
                    value={this.props.settings.acceptedTerms}
                    onUpdate={this.updateBranch}>
              {i18n.m('introduction.acceptance.para')}
            </Branch>
          </div>
        </Modal>
      </div>
    )
  }
}

Introduction.defaultProps = {
  settings: { acceptedTerms: '' },
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
