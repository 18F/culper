import React from 'react'
import i18n from 'util/i18n'
import { Spinner, SpinnerAction } from 'components/Form'

class Loading extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      spinner: false,
      spinnerAction: SpinnerAction.Spin,
    }
  }

  componentDidMount() {
    this.setState({ spinner: true })
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

export default Loading
