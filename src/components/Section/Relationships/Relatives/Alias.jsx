import React from 'react'
import { i18n } from '../../../../config'
import { ValidationElement, Branch, Name, DateRange, Field, Textarea, Show } from '../../../Form'

export default class Alias extends ValidationElement {
  constructor (props) {
    super(props)

    this.state = {
      Name: props.Name,
      MaidenName: props.MaidenName,
      Dates: props.Birthdate,
      Reason: props.Reason
    }

    this.onUpdate = this.onUpdate.bind(this)
    this.updateName = this.updateName.bind(this)
    this.updateMaidenName = this.updateMaidenName.bind(this)
    this.updateDates = this.updateDates.bind(this)
    this.updateReason = this.updateReason.bind(this)
  }

  onUpdate (name, values, fn) {
    this.setState({ [name]: values }, () => {
      if (this.props.onUpdate) {
        this.props.onUpdate({
          name: this.props.name,
          ...this.state
        })
      }
    })
  }

  updateName (values) {
    this.onUpdate('Name', values)
  }

  updateMaidenName (values) {
    this.onUpdate('MaidenName', values)
  }

  updateDates (values) {
    this.onUpdate('Dates', values)
  }

  updateReason (values) {
    this.onUpdate('Reason', values)
  }

  render () {
    return (
      <div className="relative-alias">
        <h3>{i18n.t('relationships.relatives.heading.alias.title')}</h3>
        {i18n.m('relationships.relatives.para.alias')}
        <Name name="Name"
              className="alias-name"
              {...this.state.Name}
              onUpdate={this.updateName}
              onValidate={this.props.onValidate}
              />

        <Show when={this.props.hideMaiden === false}>
          <Branch name="MaidenName"
                  label={i18n.t('relationships.relatives.heading.alias.maiden')}
                  labelSize="h4"
                  className="alias-maiden"
                  value={this.state.MaidenName}
                  onUpdate={this.updateMaidenName}
                  onValidate={this.props.onValidate}>
          </Branch>
        </Show>

        <Field help="relationships.relatives.help.aliasdates"
               adjustFor="daterange"
               shrink={true}>
          <DateRange name="Dates"
                     className="alias-dates"
                     {...this.state.Dates}
                     onUpdate={this.updateDates}
                     onValidate={this.props.onValidate}
                     />
        </Field>

        <Field title={i18n.t('relationships.relatives.heading.alias.reason')}
               titleSize="h4">
          <Textarea name="Reason"
                    className="alias-reason"
                    {...this.state.Reason}
                    onUpdate={this.updateReason}
                    onValidate={this.props.onValidate}
                    />
        </Field>
      </div>
    )
  }
}

Alias.defaultProps = {
  Name: {},
  MaidenName: '',
  Dates: {},
  Reason: {},
  hideMaiden: false
}
