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
    this.props.onUpdate({
      Name: this.props.Name,
      MaidenName: this.props.MaidenName,
      Dates: this.props.Dates,
      Reason: this.props.Reason,
      ...queue
    })
  }

  updateName (values) {
    this.update({
      Name: values
    })
  }

  updateMaidenName (values) {
    this.update({
      MaidenName: values
    })
  }

  updateDates (values) {
    this.update({
      Dates: values
    })
  }

  updateReason (values) {
    this.update({
      Reason: values
    })
  }

  render () {
    return (
      <div className="relative-alias">
        <Field title={i18n.t('relationships.relatives.heading.alias.title')}
               scrollIntoView={this.props.scrollIntoView}
               titleSize="h3">
          {i18n.m('relationships.relatives.para.alias')}
          <Name name="Name"
                className="alias-name"
                {...this.props.Name}
                onUpdate={this.updateName}
                onError={this.props.onError}
                required={this.props.required}
                scrollIntoView={this.props.scrollIntoView}
                />
        </Field>

        <Show when={this.props.hideMaiden === false}>
          <Branch name="MaidenName"
                  label={i18n.t('relationships.relatives.heading.alias.maiden')}
                  labelSize="h4"
                  className="alias-maiden"
                  value={this.props.MaidenName}
                  onUpdate={this.updateMaidenName}
                  required={this.props.required}
                  scrollIntoView={this.props.scrollIntoView}
                  onError={this.props.onError}>
          </Branch>
        </Show>

        <Field help="relationships.relatives.help.aliasdates"
               adjustFor="daterange"
               scrollIntoView={this.props.scrollIntoView}
               shrink={true}>
          <DateRange name="Dates"
                     className="alias-dates"
                     {...this.props.Dates}
                     onUpdate={this.updateDates}
                     onError={this.props.onError}
                     required={this.props.required}
                     />
        </Field>

        <Field title={i18n.t('relationships.relatives.heading.alias.reason')}
               scrollIntoView={this.props.scrollIntoView}
               titleSize="h4">
          <Textarea name="Reason"
                    className="alias-reason"
                    {...this.props.Reason}
                    onUpdate={this.updateReason}
                    onError={this.props.onError}
                    required={this.props.required}
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
  onUpdate: (queue) => {},
  onError: (value, arr) => { return arr }
}
