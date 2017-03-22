import React from 'react'
import { i18n } from '../../../../config'
import { ValidationElement, DateControl, Text, RadioGroup, Radio, Help, HelpIcon, Show } from '../../../Form'

export class DiplomaItem extends ValidationElement {
  constructor (props) {
    super(props)
    this.state = {
      Diploma: this.props.Diploma,
      DiplomaOther: this.props.DiplomaOther,
      Date: this.props.Date
    }

    this.onUpdate = this.onUpdate.bind(this)
    this.updateDiploma = this.updateDiploma.bind(this)
    this.updateDiplomaOther = this.updateDiplomaOther.bind(this)
    this.updateDate = this.updateDate.bind(this)
  }

  /**
   * Handle any updates and bubble them up.
   */
  onUpdate (name, values) {
    this.setState({ [name]: values }, () => {
      if (this.props.onUpdate) {
        this.props.onUpdate({
          name: this.props.name,
          Diploma: this.state.Diploma,
          DiplomaOther: this.state.DiplomaOther,
          Date: this.state.Date
        })
      }
    })
  }

  updateDiploma (event) {
    this.onUpdate('Diploma', event.target.value)
  }

  updateDiplomaOther (values) {
    this.onUpdate('DiplomaOther', values)
  }

  updateDate (values) {
    this.onUpdate('Date', values)
  }

  render () {
    return (
      <div>
        <h3>{i18n.t('history.education.heading.diploma')}</h3>
        <div className="eapp-field-wrap">
          <Help id="history.education.help.diploma">
            <RadioGroup className="diploma option-list"
                        selectedValue={this.state.Diploma}>
              <Radio name="diploma-highschool"
                     label={i18n.t('history.education.label.diploma.highschool')}
                     value="High School Diploma"
                     onChange={this.updateDiploma}
                     />
              <Radio name="diploma-associate"
                     label={i18n.t('history.education.label.diploma.associate')}
                     value="Associate"
                     onChange={this.updateDiploma}
                     />
              <Radio name="diploma-bachelor"
                     label={i18n.t('history.education.label.diploma.bachelor')}
                     value="Bachelor"
                     onChange={this.updateDiploma}
                     />
              <Radio name="diploma-master"
                     label={i18n.t('history.education.label.diploma.master')}
                     value="Master"
                     onChange={this.updateDiploma}
                     />
              <Radio name="diploma-doctorate"
                     label={i18n.t('history.education.label.diploma.doctorate')}
                     value="Doctorate"
                     onChange={this.updateDiploma}
                     />
              <Radio name="diploma-professional"
                     label={i18n.t('history.education.label.diploma.professional')}
                     value="Professional"
                     onChange={this.updateDiploma}
                     />
              <Radio name="diploma-other"
                     label={i18n.t('history.education.label.diploma.other')}
                     value="Other"
                     onChange={this.updateDiploma}
                     />
            </RadioGroup>
            <HelpIcon className="diploma-help-icon" />
            <Show when={this.state.Diploma === 'Other'}>
              <Text name="DiplomaOther"
                    {...this.state.DiplomaOther}
                    label={i18n.t('history.residence.label.diploma.other')}
                    className="other"
                    maxlength="100"
                    onUpdate={this.onUpdate.bind(this, 'OtherRole')}
                    onValidate={this.props.onValidate}
                    />
            </Show>
          </Help>
        </div>

        <h3>{i18n.t('history.education.heading.date')}</h3>
        <div className="eapp-field-wrap">
          <label className="info-label">{i18n.t('history.education.label.date')}</label>
          <Help id="history.education.help.date">
            <DateControl name="Date"
                         {...this.state.Date}
                         label={i18n.t('history.education.label.date')}
                         hideDay={true}
                         onUpdate={this.updateDate}
                         onValidate={this.props.onValidate}
                         />
            <HelpIcon className="date-help-icon" />
          </Help>
        </div>
      </div>
    )
  }
}
