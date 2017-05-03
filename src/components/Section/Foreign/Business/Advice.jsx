import React from 'react'
import { i18n } from '../../../../config'
import { ForeignBusinessAdviceValidator } from '../../../../validators'
import { ValidationElement, Branch, Show, Accordion, Field,
         Text, Textarea, Name, Country, DateRange } from '../../../Form'

export default class Advice extends ValidationElement {
  constructor (props) {
    super(props)

    this.state = {
      HasForeignAdvice: props.HasForeignAdvice,
      List: props.List,
      error: false,
      valid: false,
      errorCodes: []
    }

    this.updateHasForeignAdvice = this.updateHasForeignAdvice.bind(this)
    this.updateList = this.updateList.bind(this)
  }

  onUpdate (name, value) {
    this.setState({ [name]: value }, () => {
      if (this.props.onUpdate) {
        this.props.onUpdate({
          HasForeignAdvice: this.state.HasForeignAdvice,
          List: this.state.List
        })
      }
    })
  }

  updateHasForeignAdvice (value) {
    this.onUpdate('HasForeignAdvice', value)
  }

  updateList (items) {
    this.onUpdate('List', items)
  }

  /**
   * Handle the validation event.
   */
  handleValidation (event, status, error) {
    if (!event) {
      return
    }

    const codes = super.mergeError(this.state.errorCodes, super.flattenObject(error))
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
    return new ForeignBusinessAdviceValidator(this.state, null).isValid()
  }

  summary (item, index) {
    const obj = item || {}
    const name = obj.Name || {}
    const display = `${name.first || ''} ${name.middle || ''} ${name.last || ''}`.trim() || i18n.t('foreign.business.advice.collection.summary.unknown')
    const country = (obj.Country || {}).value

    return (
      <span>
        <span className="index">{i18n.t('foreign.business.advice.collection.summary.item')} {index + 1}:</span>
        <span><strong>{display}</strong></span>
        <span className="dates"><strong>{country}</strong></span>
      </span>
    )
  }

  render () {
    return (
      <div className="foreign-business-advice">
        <Branch name="has_foreign_advice"
                label={i18n.t('foreign.business.advice.heading.title')}
                labelSize="h3"
                help="foreign.business.advice.help.branch"
                value={this.state.HasForeignAdvice}
                onUpdate={this.updateHasForeignAdvice}
                onValidate={this.handleValidation}>
          {i18n.m('foreign.business.advice.para.branch')}
        </Branch>

        <Show when={this.state.HasForeignAdvice === 'Yes'}>
          <Accordion minimum="1"
                     items={this.state.List}
                     onUpdate={this.updateList}
                     onValidate={this.handleValidation}
                     summary={this.summary}
                     description={i18n.t('foreign.business.advice.collection.summary.title')}
                     appendTitle={i18n.t('foreign.business.advice.collection.appendTitle')}
                     appendMessage={i18n.m('foreign.business.advice.collection.appendMessage')}
                     appendLabel={i18n.t('foreign.business.advice.collection.append')}>
            <Field title={i18n.t('foreign.business.advice.heading.description')}
                   help="foreign.business.advice.help.description">
              <Textarea name="Description"
                        className="advice-description"
                        bind={true}
                        />
            </Field>

            <h3>{i18n.t('foreign.business.advice.heading.name')}</h3>
            <Name name="Name"
                  className="advice-name"
                  bind={true}
                  />

            <Field title={i18n.t('foreign.business.advice.heading.organization')}
                   help="foreign.business.advice.help.organization">
              <Text name="Organization"
                    className="advice-organization"
                    bind={true}
                    />
            </Field>

            <Field title={i18n.t('foreign.business.advice.heading.country')}
                   help="foreign.business.advice.help.country">
              <Country name="Country"
                       className="advice-country"
                       bind={true}
                       />
            </Field>

            <Field title={i18n.t('foreign.business.advice.heading.dates')}
                   help="foreign.business.advice.help.dates">
              <DateRange name="Dates"
                         className="advice-dates"
                         bind={true}
                         />
            </Field>

            <Field title={i18n.t('foreign.business.advice.heading.compensation')}
                   help="foreign.business.advice.help.compensation">
              <Textarea name="Compensation"
                        className="advice-compensation"
                        bind={true}
                        />
            </Field>
          </Accordion>
        </Show>
      </div>
    )
  }
}

Advice.defaultProps = {
  name: 'Advice',
  HasForeignAdvice: '',
  List: []
}
