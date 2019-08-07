import React from 'react'
import i18n from 'util/i18n'
import { Spinner, SpinnerAction } from 'components/Form'
import { timeout } from 'components/Form/Location/Location'

class Loading extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      spinner: false,
      spinnerAction: SpinnerAction.ACTION_SPIN,
    }
  }

  componentDidMount() {
    this.setState({ spinner: true })
  }

  // TODO - trigger this when load is done
  animateCloseTimeout = () => {
    timeout(() => {
      this.setState({ spinner: true, spinnerAction: SpinnerAction.Shrink })

      timeout(() => {
        // Grow the green arrow
        this.setState(
          { spinner: true, spinnerAction: SpinnerAction.Grow },
          () => {
            timeout(() => {
              // TODO - push to new route here
            }, 1000)
          }
        )
      })
    }, 1000)
  }

  render() {
    const { spinner, spinnerAction } = this.state
    return (
      <div className="loading">
        <Spinner
          show={spinner}
          action={spinnerAction}
          label={i18n.m('application.loading.title')}
        />
      </div>
    )
  }
}

Loading.defaultProps = {
  spinner: false,
}

export default Loading
