import React from 'react'
import { connect } from 'react-redux'
import { i18n } from '../../../config'
import { SectionViews, SectionView } from '../SectionView'
import SectionElement from '../SectionElement'
import AuthenticatedView from '../../../views/AuthenticatedView'
import { addDividers, createPrintSubsectionViews } from '../generators'
import navigation from './navigation'
import foreignNav from '../Foreign/navigation'

class Financial extends SectionElement {
  getReviewGroupProps(subsection) {
    const props = super.getReviewGroupProps(subsection)
    switch (subsection.url) {
      case 'bankruptcy':
        props.addressBooks = this.props.AddressBooks
        break
      case 'card':
        props.addressBooks = this.props.AddressBooks
        break
      case 'credit':
        props.addressBooks = this.props.AddressBooks
        break
      case 'delinquent':
        props.addressBooks = this.props.AddressBooks
        break
    }
    return props
  }

  render() {
    return this.createSection(navigation, 'substance', foreignNav)
  }
}

function mapStateToProps(state) {
  const app = state.application || {}
  const financial = app.Financial || {}
  const errors = app.Errors || {}
  const completed = app.Completed || {}
  const addressBooks = app.AddressBooks || {}

  return {
    Financial: financial,
    Gambling: financial.Gambling || {},
    Bankruptcy: financial.Bankruptcy || {},
    Taxes: financial.Taxes || {},
    Card: financial.Card || {},
    Credit: financial.Credit || {},
    Delinquent: financial.Delinquent || {},
    Nonpayment: financial.Nonpayment || {},
    Errors: errors.financial || [],
    Completed: completed.financial || [],
    AddressBooks: addressBooks
  }
}

Financial.defaultProps = {
  section: 'financial',
  store: 'Financial',
  scrollToBottom: SectionView.BottomButtonsSelector
}

export class FinancialSections extends React.Component {
  getSubsectionProps(subsection) {
    const extraProps = {
      ...this.props[subsection.store],
      dispatch: this.props.dispatch,
      onError: this.props.onError
    }

    switch (subsection.url) {
      case 'bankruptcy':
        extraProps.addressBooks = this.props.AddressBooks
        extraProps.defaultState = false
        break
      case 'gambling':
        extraProps.defaultState = false
        break
      case 'taxes':
        extraProps.defaultState = false
        break
      case 'card':
        extraProps.addressBooks = this.props.AddressBooks
        extraProps.defaultState = false
        break
      case 'credit':
        extraProps.addressBooks = this.props.AddressBooks
        extraProps.defaultState = false
        break
      case 'delinquent':
        extraProps.addressBooks = this.props.AddressBooks
        extraProps.defaultState = false
        break
      case 'nonpayment':
        extraProps.defaultState = false
        break
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

export default connect(mapStateToProps)(AuthenticatedView(Financial))
