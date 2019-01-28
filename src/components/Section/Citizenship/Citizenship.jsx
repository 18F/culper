import React from 'react'
import { connect } from 'react-redux'
import { i18n } from '../../../config'
import SectionElement from '../SectionElement'
import { SectionViews, SectionView } from '../SectionView'
import AuthenticatedView from '../../../views/AuthenticatedView'
import { addDividers, createPrintSubsectionViews } from '../generators'
import navigation from './navigation'
import relationshipsNav from '../Relationships/navigation'

class Citizenship extends SectionElement {
  render() {
    return this.createSection(navigation, 'military', relationshipsNav)
  }
}

function mapStateToProps(state) {
  let app = state.application || {}
  let citizenship = app.Citizenship || {}
  let errors = app.Errors || {}
  let completed = app.Completed || {}
  return {
    Application: app,
    Citizenship: citizenship,
    Status: citizenship.Status || {},
    Multiple: citizenship.Multiple || {},
    Passports: citizenship.Passports || {},
    Errors: errors.citizenship || [],
    Completed: completed.citizenship || []
  }
}

Citizenship.defaultProps = {
  section: 'citizenship',
  store: 'Citizenship',
  scrollToBottom: SectionView.BottomButtonsSelector
}

export class CitizenshipSections extends React.Component {
  getSubsectionProps(subsection) {
    const extraProps = {
      ...this.props[subsection.store],
      dispatch: this.props.dispatch,
      onError: this.props.onError
    }

    switch (subsection.url) {
      case 'multiple':
        extraProps.defaultState = false
        break
      case 'passports':
        extraProps.defaultState = false
        break
      case 'status':
        extraProps.defaultState = false
    }

    return extraProps
  }

  createSubsections() {
    return createPrintSubsectionViews(navigation, subsection => {
      return this.getSubsectionProps(subsection)
    })
  }

  render() {
    const components = addDividers(this.createSubsections())

    return <div>{components}</div>
  }
}

export default connect(mapStateToProps)(AuthenticatedView(Citizenship))
