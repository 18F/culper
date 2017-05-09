import React from 'react'
import { i18n } from '../../../../config'
import { ForeignBusinessFamilyValidator } from '../../../../validators'
import { ValidationElement, Branch, Show, Accordion, Field,
         Text, Textarea, Name, Country, DateControl } from '../../../Form'

export default class Family extends ValidationElement {
  constructor (props) {
    super(props)

    this.state = {
      HasForeignFamily: props.HasForeignFamily,
      List: props.List,
      error: false,
      valid: false,
      errorCodes: []
    }

    this.updateHasForeignFamily = this.updateHasForeignFamily.bind(this)
    this.updateList = this.updateList.bind(this)
  }

  onUpdate (name, value) {
    this.setState({ [name]: value }, () => {
      if (this.props.onUpdate) {
        this.props.onUpdate({
          HasForeignFamily: this.state.HasForeignFamily,
          List: this.state.List
        })
      }
    })
  }

  updateHasForeignFamily (value) {
    this.onUpdate('HasForeignFamily', value)
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
    return new ForeignBusinessFamilyValidator(this.state, null).isValid()
  }

  summary (item, index) {
    const obj = item || {}
    const name = obj.Name || {}
    const display = `${name.first || ''} ${name.middle || ''} ${name.last || ''}`.trim() || i18n.t('foreign.business.family.collection.summary.unknown')
    const country = (obj.Country || {}).value

    return (
      <span>
        <span className="index">{i18n.t('foreign.business.family.collection.summary.item')} {index + 1}:</span>
        <span><strong>{display}</strong></span>
        <span className="dates"><strong>{country}</strong></span>
      </span>
    )
  }

  render () {
    return (
      <div className="foreign-business-family">
        <Branch name="has_foreign_family"
                label={i18n.t('foreign.business.family.heading.title')}
                labelSize="h3"
                adjustFor="p"
                help="foreign.business.family.help.branch"
                value={this.state.HasForeignFamily}
                onUpdate={this.updateHasForeignFamily}
                onValidate={this.handleValidation}>
          {i18n.m('foreign.business.family.para.branch')}
        </Branch>

        <Show when={this.state.HasForeignFamily === 'Yes'}>
          <Accordion minimum="1"
                     items={this.state.List}
                     onUpdate={this.updateList}
                     onValidate={this.handleValidation}
                     summary={this.summary}
                     description={i18n.t('foreign.business.family.collection.summary.title')}
                     appendTitle={i18n.t('foreign.business.family.collection.appendTitle')}
                     appendMessage={i18n.m('foreign.business.family.collection.appendMessage')}
                     appendLabel={i18n.t('foreign.business.family.collection.append')}>
            <h3>{i18n.t('foreign.business.family.heading.name')}</h3>
            <Name name="Name"
                  className="family-name"
                  bind={true}
                  />

            <Field title={i18n.t('foreign.business.family.heading.agency')}
                   help="foreign.business.family.help.agency">
              <Text name="Agency"
                    className="family-agency"
                    bind={true}
                    />
            </Field>

            <Field title={i18n.t('foreign.business.family.heading.country')}
                   help="foreign.business.family.help.country">
              <Country name="Country"
                       className="family-country"
                       bind={true}
                       />
            </Field>

            <Field title={i18n.t('foreign.business.family.heading.date')}
                   help="foreign.business.family.help.date"
                   adjustFor="label">
              <DateControl name="Date"
                           className="family-date"
                           bind={true}
                           />
            </Field>

            <Field title={i18n.t('foreign.business.family.heading.circumstances')}
                   help="foreign.business.family.help.circumstances">
              <Textarea name="Circumstances"
                        className="family-circumstances"
                        bind={true}
                        />
            </Field>
          </Accordion>
        </Show>
      </div>
    )
  }
}

Family.defaultProps = {
  name: 'Family',
  HasForeignFamily: '',
  List: []
}
