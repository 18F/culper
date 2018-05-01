import React from 'react'
import { connect } from 'react-redux'
import { i18n } from '../../config'
import { push } from '../../middleware/history'
import { getApplicationState } from '../../actions/ApplicationActions'
import { Spinner, SpinnerAction } from '../../components/Form'
import { timeout } from '../../components/Form/Location/Location'

class Loading extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      spinner: this.props.spinner,
      spinnerState: SpinnerAction.ACTION_SPIN
    }

    // Animations
    this.animationDelay = null
    this.cancelAnimations = this.cancelAnimations.bind(this)
    this.animateCloseTimeout = this.animateCloseTimeout.bind(this)
  }

  componentWillMount () {
    if (!this.props.authenticated) {
      this.props.dispatch(push('/login'))
    }
  }

  componentDidMount () {
    this.cancelAnimations()
    this.setState({ spinner: true }, () => {
      this.props.dispatch(getApplicationState(() => {
        this.animateCloseTimeout()
      }))
    })
  }

  animateCloseTimeout () {
    timeout(() => {
      this.setState({spinner: true, spinnerAction: SpinnerAction.Shrink})

      timeout(() => {
        // Grow the green arrow
        this.setState({spinner: true, spinnerAction: SpinnerAction.Grow}, () => {
          timeout(() => {
            this.props.dispatch(push('/form/identification/intro'))
          }, 1000)
        })
      })
    }, 1000)
  }

  cancelAnimations (w = window) {
    if (this.animationDelay) {
      w.clearTimeout(this.animationDelay)
    }
  }

  render () {
    return (
      <div className="loading">
        <Spinner show={this.state.spinner}
                 action={this.state.spinnerAction}
                 label={i18n.m('application.loading.title')}
                 />
      </div>
    )
  }
}

Loading.defaultProps = {
  spinner: false,
  authenticated: false
}

/**
 * Maps the relevant subtree state from the applications state tree.
 * In this case, we pull the authentication sub-state. This is mapped
 * to the authentication reducer. When actions are dispatched, this
 * method is executed which causes a re-render.
 */
function mapStateToProps (state) {
  const auth = state.authentication
  return {
    authenticated: auth.authenticated
  }
}

// Wraps the the App component with connect() which adds the dispatch()
// function to the props property for this component
export default connect(mapStateToProps)(Loading)
