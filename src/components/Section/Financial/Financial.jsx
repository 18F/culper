import React from 'react'
import { connect } from 'react-redux'
import { i18n } from '../../../config'
import { SectionViews, SectionView } from '../SectionView'
import SectionElement from '../SectionElement'
import AuthenticatedView from '../../../views/AuthenticatedView'
import IntroHeader from '../../Form/IntroHeader'
import Gambling from './Gambling'
import Bankruptcies from './Bankruptcy'
import Taxes from './Taxes'
import Card from './Card'
import Credit from './Credit'
import Delinquent from './Delinquent'
import Nonpayment from './Nonpayment'

class Financial extends SectionElement {
  render () {
    return (
      <div>
        <SectionViews current={this.props.subsection} dispatch={this.props.dispatch}>
          <SectionView name="">
            <div className="financial intro review-screen">
              <div className="usa-grid-full">
                <IntroHeader errors={() => { return this.props.Errors.some(x => x.valid === false) }}
                             completed={() => { return this.props.Completed.length === 7 && this.props.Completed.every(x => x.valid === true) }}
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
                          dispatch={this.props.dispatch}
                          onUpdate={this.handleUpdate.bind(this, 'Bankruptcy')}
                          onError={this.handleError}
                          defaultState={false}
                          />

            <hr />
            <h2>{i18n.t('financial.gambling.title')}</h2>
            <Gambling name="gambling"
                      {...this.props.Gambling}
                      dispatch={this.props.dispatch}
                      onUpdate={this.handleUpdate.bind(this, 'Gambling')}
                      onError={this.handleError}
                      defaultState={false}
                    />

            <hr />
            <h2>{i18n.t('financial.taxes.title')}</h2>
            <Taxes name="taxes"
                   {...this.props.Taxes}
                   dispatch={this.props.dispatch}
                   onUpdate={this.handleUpdate.bind(this, 'Taxes')}
                   onError={this.handleError}
                   defaultState={false}
                   />

            <hr />
            <h2>{i18n.t('financial.card.title')}</h2>
            <Card name="card"
                  {...this.props.Card}
                  dispatch={this.props.dispatch}
                  onUpdate={this.handleUpdate.bind(this, 'Card')}
                  onError={this.handleError}
                  defaultState={false}
                  />

            <hr />
            <h2>{i18n.t('financial.credit.title')}</h2>
            <Credit name="credit"
                    {...this.props.Credit}
                    dispatch={this.props.dispatch}
                    onUpdate={this.handleUpdate.bind(this, 'Credit')}
                    onError={this.handleError}
                    defaultState={false}
                    />

            <hr />
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
                        dispatch={this.props.dispatch}
                        onUpdate={this.handleUpdate.bind(this, 'Delinquent')}
                        onError={this.handleError}
                        defaultState={false}
                        />

            <hr />
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
                        dispatch={this.props.dispatch}
                        onUpdate={this.handleUpdate.bind(this, 'Nonpayment')}
                        onError={this.handleError}
                        defaultState={false}
                        />
          </SectionView>

          <SectionView name="bankruptcy"
                       back="identification/physical"
                       backLabel={i18n.t('identification.destination.physical')}
                       next="financial/gambling"
                       nextLabel={i18n.t('financial.destination.gambling')}>
            <h2>{i18n.t('financial.bankruptcy.title')}</h2>
            <Bankruptcies name="bankruptcy"
                          {...this.props.Bankruptcy}
                          dispatch={this.props.dispatch}
                          onUpdate={this.handleUpdate.bind(this, 'Bankruptcy')}
                          onError={this.handleError}
                          />
          </SectionView>

          <SectionView name="gambling"
                       back="financial/bankruptcy"
                       backLabel={i18n.t('financial.destination.bankruptcy')}
                       next="financial/taxes"
                       nextLabel={i18n.t('financial.destination.taxes')}>
            <h2>{i18n.t('financial.gambling.title')}</h2>
            <Gambling name="gambling"
                      {...this.props.Gambling}
                      dispatch={this.props.dispatch}
                      onUpdate={this.handleUpdate.bind(this, 'Gambling')}
                      onError={this.handleError}
                      />
          </SectionView>

          <SectionView name="taxes"
                       back="financial/gambling"
                       backLabel={i18n.t('financial.destination.gambling')}
                       next="financial/card"
                       nextLabel={i18n.t('financial.destination.card')}>
            <h2>{i18n.t('financial.taxes.title')}</h2>
            <Taxes name="taxes"
                   {...this.props.Taxes}
                   dispatch={this.props.dispatch}
                   onUpdate={this.handleUpdate.bind(this, 'Taxes')}
                   onError={this.handleError}
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
                  dispatch={this.props.dispatch}
                  onUpdate={this.handleUpdate.bind(this, 'Card')}
                  onError={this.handleError}
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
                    dispatch={this.props.dispatch}
                    onUpdate={this.handleUpdate.bind(this, 'Credit')}
                    onError={this.handleError}
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
                        dispatch={this.props.dispatch}
                        onUpdate={this.handleUpdate.bind(this, 'Delinquent')}
                        onError={this.handleError}
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
                        dispatch={this.props.dispatch}
                        onUpdate={this.handleUpdate.bind(this, 'Nonpayment')}
                        onError={this.handleError}
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
  defaultView: 'bankruptcy',
  store: 'Financial'
}

export default connect(mapStateToProps)(AuthenticatedView(Financial))
