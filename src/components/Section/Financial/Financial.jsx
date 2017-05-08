import React from 'react'
import { connect } from 'react-redux'
import { i18n } from '../../../config'
import AuthenticatedView from '../../../views/AuthenticatedView'
import ValidationElement from '../../Form/ValidationElement'
import IntroHeader from '../../Form/IntroHeader'
import { push } from '../../../middleware/history'
import { updateApplication, reportErrors, reportCompletion } from '../../../actions/ApplicationActions'
import { SectionViews, SectionView } from '../SectionView'
import Gambling from './Gambling'
import Bankruptcies from './Bankruptcy'
import Taxes from './Taxes'
import Card from './Card'
import Credit from './Credit'
import Delinquent from './Delinquent'
import Nonpayment from './Nonpayment'

class Financial extends ValidationElement {
  constructor (props) {
    super(props)

    this.state = {
      subsection: props.subsection
    }

    this.handleTour = this.handleTour.bind(this)
    this.handleReview = this.handleReview.bind(this)
  }

  componentDidMount () {
    let current = this.launch(this.props.Financial, this.props.subsection, 'gambling')
    if (current !== '') {
      this.props.dispatch(push(`/form/financial/${current}`))
    }
  }

  handleTour (event) {
    this.props.dispatch(push('/form/financial/gambling'))
  }

  handleReview (event) {
    this.props.dispatch(push('/form/financial/review'))
  }

  /**
   * Report errors and completion status
   */
  onValidate (event, status, errorCodes) {
    if (!event) {
      return
    }

    if (!event.fake) {
      let errors = super.triageErrors(this.props.Section.section, [...this.props.Errors], errorCodes)
      this.props.dispatch(reportErrors(this.props.Section.section, '', errors))
    }

    let cstatus = 'neutral'
    if (this.hasStatus('gambling', status, true) &&
        this.hasStatus('bankruptcy', status, true) &&
        this.hasStatus('taxes', status, true) &&
        this.hasStatus('card', status, true) &&
        this.hasStatus('credit', status, true) &&
        this.hasStatus('nonpayment', status, true)) {
      cstatus = 'complete'
    } else if (this.hasStatus('gambling', status, false) ||
               this.hasStatus('bankruptcy', status, false) ||
               this.hasStatus('taxes', status, false) ||
               this.hasStatus('card', status, false) ||
               this.hasStatus('credit', status, false) ||
               this.hasStatus('nonpayment', status, false)) {
      cstatus = 'incomplete'
    }

    let completed = {
      ...this.props.Completed,
      ...status,
      status: cstatus
    }

    this.props.dispatch(reportCompletion(this.props.Section.section, this.props.Section.subsection, completed))
  }

  /**
   * Update storage values for a subsection
   */
  onUpdate (field, values) {
    this.props.dispatch(updateApplication('Financial', field, values))
  }

  /**
   * Helper to test whether a subsection is complete
   */
  hasStatus (property, status, val) {
    return (this.props.Completed[property] && this.props.Completed[property].status === val)
      || (status && status[property] && status[property].status === val)
  }

  /**
   * Determine the desired behaviour when visiting the
   * root of a route
   */
  launch (storage, subsection, defaultView) {
    subsection = subsection || ''
    if (subsection === '') {
      let keys = Object.keys(storage)
      if (keys.length === 0 && storage.constructor === Object) {
        return defaultView
      }
    }

    return subsection
  }

  render () {
    return (
      <div>
        <SectionViews current={this.props.subsection} dispatch={this.props.dispatch}>
          <SectionView name="">
            <div className="financial intro review-screen">
              <div className="usa-grid-full">
                <IntroHeader Errors={this.props.Errors}
                             Completed={this.props.Completed}
                             tour={i18n.t('financial.tour.para')}
                             review={i18n.t('financial.review.para')}
                             onTour={this.handleTour}
                             onReview={this.handleReview}
                             />
              </div>
            </div>
          </SectionView>

          <SectionView name="review"
                       title="Let&rsquo;s make sure everything looks right"
                       showTop="true"
                       back="financial/bankruptcy"
                       backLabel={i18n.t('financial.destination.bankruptcy')}
                       next="history"
                       nextLabel={i18n.t('history.destination.residence')}>
            <h2>{i18n.t('financial.bankruptcy.title')}</h2>
            <Bankruptcies name="bankruptcy"
                        {...this.props.Bankruptcy}
                        onUpdate={this.onUpdate.bind(this, 'Bankruptcy')}
                        onValidate={this.onValidate.bind(this)}
                        />

            <h2>{i18n.t('financial.gambling.title')}</h2>
            <Gambling name="gambling"
                      {...this.props.Gambling}
                      onUpdate={this.onUpdate.bind(this, 'Gambling')}
                      onValidate={this.onValidate.bind(this)}
                      />

            <h2>{i18n.t('financial.taxes.title')}</h2>
            <Taxes name="taxes"
                   {...this.props.Taxes}
                   onUpdate={this.onUpdate.bind(this, 'Taxes')}
                   onValidate={this.onValidate.bind(this)}
                   />

            <h2>{i18n.t('financial.card.title')}</h2>
            <Card name="card"
                  {...this.props.Card}
                  onUpdate={this.onUpdate.bind(this, 'Card')}
                  onValidate={this.onValidate.bind(this)}
                  />

            <h2>{i18n.t('financial.credit.title')}</h2>
            <Credit name="credit"
                    {...this.props.Credit}
                    onUpdate={this.onUpdate.bind(this, 'Credit')}
                    onValidate={this.onValidate.bind(this)}
                    />

            <h2>{i18n.t('financial.delinquent.title')}</h2>
            {i18n.m('financial.delinquent.para.details')}
            <ul>
              <li>{i18n.m('financial.delinquent.para.alimony')}</li>
              <li>{i18n.m('financial.delinquent.para.judgement')}</li>
              <li>{i18n.m('financial.delinquent.para.lien')}</li>
              <li>{i18n.m('financial.delinquent.para.federal')}</li>
            </ul>
            <Delinquent name="delinquent"
                        {...this.props.Delinquent}
                        onUpdate={this.onUpdate.bind(this, 'Delinquent')}
                        onValidate={this.onValidate.bind(this)}
                        />

            <h2>{i18n.t('financial.nonpayment.title')}</h2>
            <ul>
              <li>{i18n.m('financial.nonpayment.para.repo')}</li>
              <li>{i18n.m('financial.nonpayment.para.defaulted')}</li>
              <li>{i18n.m('financial.nonpayment.para.collections')}</li>
              <li>{i18n.m('financial.nonpayment.para.cancelled')}</li>
              <li>{i18n.m('financial.nonpayment.para.evicted')}</li>
              <li>{i18n.m('financial.nonpayment.para.garnished')}</li>
              <li>{i18n.m('financial.nonpayment.para.delinquent')}</li>
              <li>{i18n.m('financial.nonpayment.para.any')}</li>
            </ul>
            <Nonpayment name="nonpayment"
                        {...this.props.Nonpayment}
                        onUpdate={this.onUpdate.bind(this, 'Nonpayment')}
                        onValidate={this.onValidate.bind(this)}
                        />
          </SectionView>

          <SectionView name="bankruptcy"
                       back="financial/gambling"
                       backLabel={i18n.t('financial.destination.gambling')}
                       next="financial/taxes"
                       nextLabel={i18n.t('financial.destination.taxes')}>
            <h2>{i18n.t('financial.bankruptcy.title')}</h2>
            <Bankruptcies name="bankruptcy"
                        {...this.props.Bankruptcy}
                        onUpdate={this.onUpdate.bind(this, 'Bankruptcy')}
                        onValidate={this.onValidate.bind(this)}
                        />
          </SectionView>

          <SectionView name="gambling"
                       back="identification"
                       backLabel={i18n.t('identification.destination.physical')}
                       next="financial/bankruptcy"
                       nextLabel={i18n.t('financial.destination.bankruptcy')}>
            <h2>{i18n.t('financial.gambling.title')}</h2>
            <Gambling name="gambling"
                      {...this.props.Gambling}
                      onUpdate={this.onUpdate.bind(this, 'Gambling')}
                      onValidate={this.onValidate.bind(this)}
                      />
          </SectionView>

          <SectionView name="taxes"
                       back="financial/bankruptcy"
                       backLabel={i18n.t('financial.destination.bankruptcy')}
                       next="financial/card"
                       nextLabel={i18n.t('financial.destination.card')}>
            <h2>{i18n.t('financial.taxes.title')}</h2>
            <Taxes name="taxes"
                   {...this.props.Taxes}
                   onUpdate={this.onUpdate.bind(this, 'Taxes')}
                   onValidate={this.onValidate.bind(this)}
                   />
          </SectionView>

          <SectionView name="card"
                       back="financial/taxes"
                       backLabel={i18n.t('financial.destination.taxes')}
                       next="financial/credit"
                       nextLabel={i18n.t('financial.destination.credit')}>
            <h2>{i18n.t('financial.card.title')}</h2>
            <Card name="card"
                  {...this.props.Card}
                  onUpdate={this.onUpdate.bind(this, 'Card')}
                  onValidate={this.onValidate.bind(this)}
                  />
          </SectionView>

          <SectionView name="credit"
                       back="financial/card"
                       backLabel={i18n.t('financial.destination.card')}
                       next="financial/delinquent"
                       nextLabel={i18n.t('financial.destination.delinquent')}>
            <h2>{i18n.t('financial.credit.title')}</h2>
            <Credit name="credit"
                    {...this.props.Credit}
                    onUpdate={this.onUpdate.bind(this, 'Credit')}
                    onValidate={this.onValidate.bind(this)}
                    />
          </SectionView>

          <SectionView name="delinquent"
                       back="financial/credit"
                       backLabel={i18n.t('financial.destination.credit')}
                       next="financial/nonpayment"
                       nextLabel={i18n.t('financial.destination.nonpayment')}>
            <h2>{i18n.t('financial.delinquent.title')}</h2>
            {i18n.m('financial.delinquent.para.details')}
            <ul>
              <li>{i18n.m('financial.delinquent.para.alimony')}</li>
              <li>{i18n.m('financial.delinquent.para.judgement')}</li>
              <li>{i18n.m('financial.delinquent.para.lien')}</li>
              <li>{i18n.m('financial.delinquent.para.federal')}</li>
            </ul>
            <Delinquent name="delinquent"
                        {...this.props.Delinquent}
                        onUpdate={this.onUpdate.bind(this, 'Delinquent')}
                        onValidate={this.onValidate.bind(this)}
                        />
          </SectionView>

          <SectionView name="nonpayment"
                       back="financial/delinquent"
                       backLabel={i18n.t('financial.destination.delinquent')}
                       next="financial/review"
                       nextLabel={i18n.t('financial.destination.review')}>
            <h2>{i18n.t('financial.nonpayment.title')}</h2>
            <ul>
              <li>{i18n.m('financial.nonpayment.para.repo')}</li>
              <li>{i18n.m('financial.nonpayment.para.defaulted')}</li>
              <li>{i18n.m('financial.nonpayment.para.collections')}</li>
              <li>{i18n.m('financial.nonpayment.para.cancelled')}</li>
              <li>{i18n.m('financial.nonpayment.para.evicted')}</li>
              <li>{i18n.m('financial.nonpayment.para.garnished')}</li>
              <li>{i18n.m('financial.nonpayment.para.delinquent')}</li>
              <li>{i18n.m('financial.nonpayment.para.any')}</li>
            </ul>
            <Nonpayment name="nonpayment"
                        {...this.props.Nonpayment}
                        onUpdate={this.onUpdate.bind(this, 'Nonpayment')}
                        onValidate={this.onValidate.bind(this)}
                        />
          </SectionView>
        </SectionViews>
      </div>
    )
  }
}

function mapStateToProps (state) {
  let section = state.section || {}
  let app = state.application || {}
  let financial = app.Financial || {}
  let errors = app.Errors || {}
  let completed = app.Completed || {}
  return {
    Section: section,
    Financial: financial,
    Gambling: financial.Gambling || {},
    Bankruptcy: financial.Bankruptcy || {},
    Taxes: financial.Taxes || {},
    Card: financial.Card || {},
    Credit: financial.Credit || {},
    Delinquent: financial.Delinquent || {},
    Nonpayment: financial.Nonpayment || {},
    Errors: errors.financial || [],
    Completed: completed.financial || []
  }
}

Financial.defaultProps = {
  subsection: ''
}

export default connect(mapStateToProps)(AuthenticatedView(Financial))
