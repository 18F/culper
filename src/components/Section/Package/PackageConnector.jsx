import { connect } from 'react-redux'

import { formStatusSelector } from 'selectors/validation'
import { updateApplication } from 'actions/ApplicationActions'

const connectPackageSection = (Component) => {
  const mapStateToProps = (state) => {
    const { application } = state
    const {
      Settings, Identification, History, Submission,
    } = application

    return {
      ...formStatusSelector(state),
      Application: application,
      Identification,
      History,
      Submission,
      Settings,
    }
  }

  const mapDispatchToProps = {
    updateApplication,
  }

  return connect(mapStateToProps, mapDispatchToProps)(Component)
}

export default connectPackageSection
