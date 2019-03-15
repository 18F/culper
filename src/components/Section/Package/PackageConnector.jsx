import { connect } from 'react-redux'

import { formStatusSelector } from 'selectors/validation'

const connectPackageSection = (Component) => {
  const mapStateToProps = state => ({
    ...formStatusSelector(state),
  })

  return connect(mapStateToProps)(Component)
}

export default connectPackageSection
