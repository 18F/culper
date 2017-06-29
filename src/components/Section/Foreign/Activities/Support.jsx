import React from 'react'
import { i18n } from '../../../../config'
import { ForeignActivitiesSupportValidator } from '../../../../validators'
import SubsectionElement from '../../SubsectionElement'
import { Branch, Show, Accordion, Field,
         Text, Textarea, Currency, Name, Address, Country,
         Checkbox } from '../../../Form'

export default class Support extends SubsectionElement {
  constructor (props) {
    super(props)

    this.update = this.update.bind(this)
    this.updateHasForeignSupport = this.updateHasForeignSupport.bind(this)
    this.updateList = this.updateList.bind(this)
  }

  update (queue) {
    this.props.onUpdate({
      HasForeignSupport: this.props.HasForeignSupport,
      List: this.props.List,
      ListBranch: this.props.ListBranch,
      ...queue
    })
  }

  updateHasForeignSupport (value) {
    this.update({
      HasForeignSupport: value,
      List: value === 'Yes' ? this.props.List : [],
      ListBranch: value === 'Yes' ? this.props.ListBranch : ''
    })
  }

  updateList (values) {
    this.update({
      List: values.items,
      ListBranch: values.branch
    })
  }

  summary (item, index) {
    const obj = item || {}
    const name = obj.Name || {}
    const display = `${name.first || ''} ${name.middle || ''} ${name.last || ''}`.trim() || i18n.t('foreign.activities.support.collection.summary.unknown')

    return (
      <span>
        <span className="index">{i18n.t('foreign.activities.support.collection.summary.item')} {index + 1}:</span>
        <span><strong>{display}</strong></span>
      </span>
    )
  }

  render () {
    return (
      <div className="foreign-activities-support">
        <Branch name="has_foreign_support"
                label={i18n.t('foreign.activities.support.heading.title')}
                labelSize="h3"
                value={this.props.HasForeignSupport}
                warning={true}
                onUpdate={this.updateHasForeignSupport}
                onError={this.handleError}
                />

        <Show when={this.props.HasForeignSupport === 'Yes'}>
          <Accordion minimum="1"
                     items={this.props.List}
                     defaultState={this.props.defaultState}
                     branch={this.props.ListBranch}
                     onUpdate={this.updateList}
                     onError={this.handleError}
                     summary={this.summary}
                     description={i18n.t('foreign.activities.support.collection.summary.title')}
                     appendTitle={i18n.t('foreign.activities.support.collection.appendTitle')}
                     appendLabel={i18n.t('foreign.activities.support.collection.append')}>
            <h3>{i18n.t('foreign.activities.support.heading.name')}</h3>
            <Name name="Name"
                  className="foreign-activities-support-name"
                  bind={true}
                  />

            <Field title={i18n.t('foreign.activities.support.heading.address')}
                   adjustFor="address">
              <Address name="Address"
                       className="foreign-activities-support-address"
                       bind={true}
                       />
            </Field>

            <Field title={i18n.t('foreign.activities.support.heading.relationship')}
                   adjustFor="textarea">
              <Textarea name="Relationship"
                        className="foreign-activities-support-relationship"
                        bind={true}
                        />
            </Field>

            <Field title={i18n.t('foreign.activities.support.heading.amount')}
                   help="foreign.activities.support.help.amount"
                   adjustFor="currency">
              <Currency name="Amount"
                        className="foreign-activities-support-amount"
                        bind={true}
                        min="0"
                        />
              <div className="flags">
                <Checkbox name="AmountEstimated"
                          ref="estimated"
                          label={i18n.t('foreign.activities.support.label.estimated')}
                          toggle="false"
                          bind={true}
                          />
              </div>
            </Field>

            <Field title={i18n.t('foreign.activities.support.heading.frequency')}
                   adjustFor="text">
              <Text name="Frequency"
                    className="foreign-activities-support-frequency"
                    bind={true}
                    />
            </Field>

            <Field title={i18n.t('foreign.activities.support.heading.citizenship')}
                   help="foreign.activities.support.help.citizenship"
                   adjustFor="country">
              <Country name="Citizenship"
                       className="foreign-activities-support-citizenship"
                       multiple={true}
                       bind={true}
                       />
            </Field>
          </Accordion>
        </Show>
      </div>
    )
  }
}

Support.defaultProps = {
  name: 'Support',
  HasForeignSupport: '',
  List: [],
  ListBranch: '',
  onUpdate: (queue) => {},
  onError: (value, arr) => { return arr },
  section: 'foreign',
  subsection: 'activities/support',
  dispatch: () => {},
  validator: (state, props) => {
    return new ForeignActivitiesSupportValidator(props, props).isValid()
  },
  defaultState: true
}
