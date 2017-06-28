import React from 'react'
import { i18n } from '../../../../config'
import { ValidationElement, Branch, Name, DateRange, Field, Textarea, Show } from '../../../Form'

export default class Alias extends ValidationElement {
  constructor (props) {
    super(props)

    this.update = this.update.bind(this)
    this.updateName = this.updateName.bind(this)
    this.updateMaidenName = this.updateMaidenName.bind(this)
    this.updateDates = this.updateDates.bind(this)
    this.updateReason = this.updateReason.bind(this)
  }

  update (queue) {
    if (this.props.onUpdate) {
      let obj = {
        Name: this.props.Name,
        MaidenName: this.props.MaidenName,
        Dates: this.props.Dates,
        Reason: this.props.Reason
      }

      for (const q of queue) {
        obj = { ...obj, [q.name]: q.value }
      }

      this.props.onUpdate(obj)
    }
  }

  updateName (values) {
    this.update([
      { name: 'Name', value: values }
    ])
  }

  updateMaidenName (values) {
    this.update([
      { name: 'MaidenName', value: values }
    ])
  }

  updateDates (values) {
    this.update([
      { name: 'Dates', value: values }
    ])
  }

  updateReason (values) {
    this.update([
      { name: 'Reason', value: values }
    ])
  }

  render () {
    return (
      <div className="relative-alias">
        <h3>{i18n.t('relationships.relatives.heading.alias.title')}</h3>
        {i18n.m('relationships.relatives.para.alias')}
        <Name name="Name"
              className="alias-name"
              {...this.props.Name}
              onUpdate={this.updateName}
              onError={this.props.onError}
              />

        <Show when={this.props.hideMaiden === false}>
          <Branch name="MaidenName"
                  label={i18n.t('relationships.relatives.heading.alias.maiden')}
                  labelSize="h4"
                  className="alias-maiden"
                  value={this.props.MaidenName}
                  onUpdate={this.updateMaidenName}
                  onError={this.props.onError}>
          </Branch>
        </Show>

        <Field help="relationships.relatives.help.aliasdates"
               adjustFor="daterange"
               shrink={true}>
          <DateRange name="Dates"
                     className="alias-dates"
                     {...this.props.Dates}
                     onUpdate={this.updateDates}
                     onError={this.props.onError}
                     />
        </Field>

        <Field title={i18n.t('relationships.relatives.heading.alias.reason')}
               titleSize="h4">
          <Textarea name="Reason"
                    className="alias-reason"
                    {...this.props.Reason}
                    onUpdate={this.updateReason}
                    onError={this.props.onError}
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
  hideMaiden: false,
  onError: (value, arr) => { return arr }
}
