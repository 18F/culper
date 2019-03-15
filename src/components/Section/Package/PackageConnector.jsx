import { connect } from 'react-redux'

import {
  nestedFormSectionsSelector,
} from 'selectors/navigation'

import { formErrorsSelector } from 'selectors/validation'

const connectPackageSection = (Component) => {
  const mapStateToProps = state => ({
    formSections: nestedFormSectionsSelector(state),
    ...formErrorsSelector(state),
  })

  return connect(mapStateToProps)(Component)
}

export default connectPackageSection
