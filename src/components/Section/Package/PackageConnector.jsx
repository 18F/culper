import { connect } from 'react-redux'

import { formStatusSelector } from 'selectors/validation'
import { updateApplication } from 'actions/ApplicationActions'

const connectPackageSection = (Component) => {
  const mapStateToProps = (state) => {
    const { application } = state
    const { Identification, History, Submission } = application

    return {
      ...formStatusSelector(state),
      Application: application,
      Identification,
      History,
      Submission,
    }
  }

  const mapDispatchToProps = {
    updateApplication,
  }

  return connect(mapStateToProps, mapDispatchToProps)(Component)
}

export default connectPackageSection
