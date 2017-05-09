import React from 'react'
import { i18n } from '../../../../config'
import { ForeignActivitiesSupportValidator } from '../../../../validators'
import { ValidationElement, Branch, Show, Accordion, Field,
         Text, Textarea, Currency, Name, Address, Country,
         Checkbox } from '../../../Form'

export default class Support extends ValidationElement {
  constructor (props) {
    super(props)

    this.state = {
      HasForeignSupport: props.HasForeignSupport,
      List: props.List,
      error: false,
      valid: false,
      errorCodes: []
    }

    this.updateHasForeignSupport = this.updateHasForeignSupport.bind(this)
    this.updateList = this.updateList.bind(this)
    this.isValid = this.isValid.bind(this)
  }

  onUpdate (name, value) {
    this.setState({ [name]: value }, () => {
      if (this.props.onUpdate) {
        this.props.onUpdate({
          HasForeignSupport: this.state.HasForeignSupport,
          List: this.state.List
        })
      }
    })
  }

  updateHasForeignSupport (value) {
    this.onUpdate('HasForeignSupport', value)
  }

  updateList (items) {
    this.onUpdate('List', items)
  }

  /**
   * Handle the validation event.
   */
  handleValidation (event, status, error) {
    let codes = super.mergeError(this.state.errorCodes, super.flattenObject(error))
    let complexStatus = null
    if (codes.length > 0) {
      complexStatus = false
    } else if (this.isValid()) {
      complexStatus = true
    }

    this.setState({error: complexStatus === false, valid: complexStatus === true, errorCodes: codes}, () => {
      const errorObject = { [this.props.name]: codes }
      const statusObject = { [this.props.name]: { status: complexStatus } }
      super.handleValidation(event, statusObject, errorObject)
    })
  }

  isValid () {
    return new ForeignActivitiesSupportValidator(this.state, null).isValid()
  }

  summary (item, index) {
    const obj = item || {}
    const name = obj.Name || {}
    const display = `${name.first || ''} ${name.middle || ''} ${name.last || ''}`.trim() || i18n.t('foreign.activities.support.collection.summary.unknown')
    const countries = ((obj.Citizenship || {}).value || []).map(x => {
      return x.name
    })

    return (
      <span>
        <span className="index">{i18n.t('foreign.activities.support.collection.summary.item')} {index + 1}:</span>
        <span><strong>{display}</strong></span>
        <span className="dates"><strong>{countries.shift()}</strong></span>
      </span>
    )
  }

  render () {
    return (
      <div className="foreign-activities-support">
        <Branch name="has_foreign_support"
                label={i18n.t('foreign.activities.support.heading.title')}
                labelSize="h3"
                help="foreign.activities.support.help.branch"
                value={this.state.HasForeignSupport}
                onUpdate={this.updateHasForeignSupport}
                onValidate={this.handleValidation}
                />

        <Show when={this.state.HasForeignSupport === 'Yes'}>
          <Accordion minimum="1"
                     items={this.state.List}
                     onUpdate={this.updateList}
                     onValidate={this.handleValidation}
                     summary={this.summary}
                     description={i18n.t('foreign.activities.support.collection.summary.title')}
                     appendTitle={i18n.t('foreign.activities.support.collection.appendTitle')}
                     appendMessage={i18n.m('foreign.activities.support.collection.appendMessage')}
                     appendLabel={i18n.t('foreign.activities.support.collection.append')}>
            <h3>{i18n.t('foreign.activities.support.heading.name')}</h3>
            <Name name="Name"
                  className="foreign-activities-support-name"
                  bind={true}
                  />

            <Field title={i18n.t('foreign.activities.support.heading.address')}
                   help="foreign.activities.support.help.address"
                   adjustFor="address">
              <Address name="Address"
                       className="foreign-activities-support-address"
                       bind={true}
                       />
            </Field>

            <Field title={i18n.t('foreign.activities.support.heading.relationship')}
                   help="foreign.activities.support.help.relationship"
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
                   help="foreign.activities.support.help.frequency"
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
  List: []
}
