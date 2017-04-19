import React from 'react'
import { i18n } from '../../../../config'
import { ValidationElement, Branch, Name, DateRange, Field, Textarea } from '../../../Form'

export default class Person extends ValidationElement {
  constructor (props) {
    super(props)

    this.state = {
      Name: props.Name,
      KnownDates: props.KnownDates,
      Rank: props.Rank
    }

    this.onUpdate = this.onUpdate.bind(this)
    this.updateName = this.updateName.bind(this)
    this.updateKnownDates = this.updateKnownDates.bind(this)
    this.updateRank = this.updateKnownDates.bind(this)
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

  updateKnownDates (values) {
    this.update('KnownDates', values)
  }

  updateRank (values) {
    this.update('Rank', values)
  }

  render () {
    return (
      <div className="person">
        <Field title={i18n.t('relationships.person.heading.alias.title')}>
          {i18n.m('relationships.relatives.para.alias')}
          <DateRange name="KnownDates"
            className="known-dates"
            {...this.state.KnownDates}
            onUpdate={this.updateKnownDates}
            onValidate={this.props.onValidate}
          />
        </Field>

        <Field title={i18n.t('relationships.person.heading.alias.title')}>
          {i18n.m('relationships.relatives.para.alias')}
          <Name name="Name"
            className="alias-name"
            {...this.state.Name}
            onUpdate={this.updateName}
            onValidate={this.props.onValidate}
          />
        </Field>

        <Field title={i18n.t('relationships.person.heading.rank.title')}>
          <Text name="Rank"
            className="rank"
            {...this.state.Rank}
            onUpdate={this.updateRank}
            onValidate={this.props.onValidate}
          />
        </Field>
      </div>
    )
  }
}

Person.defaultProps = {}
