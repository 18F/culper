import React from 'react'
import { i18n } from '../../../../config'
import { ValidationElement, Branch, Name, DateRange, Textarea, Help, HelpIcon } from '../../../Form'

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
        <h3>{i18n.t('family.relatives.heading.alias.title')}</h3>
        {i18n.m('family.relatives.para.alias')}
        <Name name="Name"
              className="alias-name"
              {...this.state.Name}
              onUpdate={this.updateName}
              />

        <h4>{i18n.t('family.relatives.heading.alias.maiden')}</h4>
        <Branch name="MaidenName"
                className="alias-maiden"
                value={this.state.MaidenName}
                onUpdate={this.updateMaidenName} >
        </Branch>

        <div className="eapp-field-wrap">
          <Help id="family.relatives.help.aliasdates">
            <DateRange name="Dates"
                       className="alias-dates"
                       {...this.state.Dates}
                       onUpdate={this.updateDates}
                       />
            <HelpIcon />
          </Help>
        </div>

        <h4>{i18n.t('family.relatives.heading.alias.reason')}</h4>
        <div className="eapp-field-wrap no-label">
          <Help id="family.relatives.help.reason">
            <Textarea name="Reason"
                      className="alias-reason"
                      {...this.state.Reason}
                      onUpdate={this.updateReason}
                      />
            <HelpIcon />
          </Help>
        </div>
      </div>
    )
  }
}

Alias.defaultProps = {
  Name: {},
  MaidenName: '',
  Dates: {},
  Reason: {}
}
