import React from 'react'
import { connect } from 'react-redux'
import { i18n } from '../../../config'
import navigation from './navigation'
import { SectionView } from '../SectionView'
import SectionElement from '../SectionElement'
import SectionComments from '../SectionComments'
import AuthenticatedView from '../../../views/AuthenticatedView'
import Gambling from './Gambling'
import Bankruptcies from './Bankruptcy'
import Taxes from './Taxes'
import Card from './Card'
import Credit from './Credit'
import Delinquent from './Delinquent'
import Nonpayment from './Nonpayment'
import foreignNav from '../Foreign/navigation'

class Financial extends SectionElement {
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
    Comments: financial.Comments || {},
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
  render() {
    return (
      <div>
        <Bankruptcies
          name="bankruptcy"
          {...this.props.Bankruptcy}
          addressBooks={this.props.AddressBooks}
          dispatch={this.props.dispatch}
          onError={this.props.onError}
          defaultState={false}
          required={true}
          scrollIntoView={false}
        />
        <hr className="section-divider" />
        <Gambling
          name="gambling"
          {...this.props.Gambling}
          dispatch={this.props.dispatch}
          onError={this.props.onError}
          defaultState={false}
          required={true}
          scrollIntoView={false}
        />

        <hr className="section-divider" />
        <Taxes
          name="taxes"
          {...this.props.Taxes}
          dispatch={this.props.dispatch}
          onError={this.props.onError}
          defaultState={false}
          required={true}
          scrollIntoView={false}
        />

        <hr className="section-divider" />
        <Card
          name="card"
          {...this.props.Card}
          addressBooks={this.props.AddressBooks}
          dispatch={this.props.dispatch}
          onError={this.props.onError}
          defaultState={false}
          required={true}
          scrollIntoView={false}
        />

        <hr className="section-divider" />
        <Credit
          name="credit"
          {...this.props.Credit}
          addressBooks={this.props.AddressBooks}
          dispatch={this.props.dispatch}
          onError={this.props.onError}
          defaultState={false}
          required={true}
          scrollIntoView={false}
        />

        <hr className="section-divider" />
        <Delinquent
          name="delinquent"
          {...this.props.Delinquent}
          addressBooks={this.props.AddressBooks}
          dispatch={this.props.dispatch}
          onError={this.props.onError}
          defaultState={false}
          required={true}
          scrollIntoView={false}
        />

        <hr className="section-divider" />
        <Nonpayment
          name="nonpayment"
          {...this.props.Nonpayment}
          dispatch={this.props.dispatch}
          onError={this.props.onError}
          defaultState={false}
          required={true}
          scrollIntoView={false}
        />

        <hr className="section-divider" />
        <SectionComments
          name="comments"
          {...this.props.Comments}
          title={i18n.t('financial.review.comments')}
          dispatch={this.props.dispatch}
          onError={this.handleError}
          required={false}
          scrollIntoView={false}
        />
      </div>
    )
  }
}
export default connect(mapStateToProps)(AuthenticatedView(Financial))
