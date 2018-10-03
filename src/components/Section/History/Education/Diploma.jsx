import React from 'react'
import { i18n } from '../../../../config'
import {
  ValidationElement,
  DateControl,
  Text,
  RadioGroup,
  Radio,
  Field,
  Show
} from '../../../Form'

export class DiplomaItem extends ValidationElement {
  constructor(props) {
    super(props)

    this.update = this.update.bind(this)
    this.updateDiploma = this.updateDiploma.bind(this)
    this.updateDiplomaOther = this.updateDiplomaOther.bind(this)
    this.updateDate = this.updateDate.bind(this)
  }

  update(queue) {
    this.props.onUpdate({
      Diploma: this.props.Diploma,
      DiplomaOther: this.props.DiplomaOther,
      Date: this.props.Date,
      ...queue
    })
  }

  updateDiploma(values) {
    this.update({
      Diploma: values
    })
  }

  updateDiplomaOther(values) {
    this.update({
      DiplomaOther: values
    })
  }

  updateDate(values) {
    this.update({
      Date: values
    })
  }

  render() {
    return (
      <div>
        <Field
          title={i18n.t('history.education.heading.diploma')}
          help="history.education.help.diploma"
          adjustFor="big-buttons"
          shrink={true}
          scrollIntoView={this.props.scrollIntoView}>
          <RadioGroup
            className="diploma option-list"
            required={this.props.required}
            onError={this.props.onError}
            selectedValue={(this.props.Diploma || {}).value}>
            <Radio
              name="diploma-highschool"
              className="diploma-highschool"
              label={i18n.m('history.education.label.diploma.highschool')}
              value="High School Diploma"
              onUpdate={this.updateDiploma}
              onError={this.props.onError}
            />
            <Radio
              name="diploma-associate"
              className="diploma-associate"
              label={i18n.m('history.education.label.diploma.associate')}
              value="Associate"
              onUpdate={this.updateDiploma}
              onError={this.props.onError}
            />
            <Radio
              name="diploma-bachelor"
              className="diploma-bachelor"
              label={i18n.m('history.education.label.diploma.bachelor')}
              value="Bachelor"
              onUpdate={this.updateDiploma}
              onError={this.props.onError}
            />
            <Radio
              name="diploma-master"
              className="diploma-master"
              label={i18n.m('history.education.label.diploma.master')}
              value="Master"
              onUpdate={this.updateDiploma}
              onError={this.props.onError}
            />
            <Radio
              name="diploma-doctorate"
              className="diploma-doctorate"
              label={i18n.m('history.education.label.diploma.doctorate')}
              value="Doctorate"
              onUpdate={this.updateDiploma}
              onError={this.props.onError}
            />
            <Radio
              name="diploma-professional"
              className="diploma-professional"
              label={i18n.m('history.education.label.diploma.professional')}
              value="Professional"
              onUpdate={this.updateDiploma}
              onError={this.props.onError}
            />
            <Radio
              name="diploma-other"
              className="diploma-other"
              label={i18n.m('history.education.label.diploma.other')}
              value="Other"
              onUpdate={this.updateDiploma}
              onError={this.props.onError}
            />
          </RadioGroup>
          <Show when={(this.props.Diploma || {}).value === 'Other'}>
            <Field
              title={i18n.t('history.education.label.diploma.other')}
              titleSize="label"
              adjustFor="text"
              scrollIntoView={this.props.scrollIntoView}>
              <Text
                name="DiplomaOther"
                {...this.props.DiplomaOther}
                className="other"
                maxlength="100"
                onUpdate={this.updateDiplomaOther}
                onError={this.props.onError}
                required={this.props.required}
              />
            </Field>
          </Show>
        </Field>

        <Field
          title={i18n.t('history.education.heading.date')}
          help="history.education.help.date"
          adjustFor="label"
          shrink={true}
          scrollIntoView={this.props.scrollIntoView}>
          <DateControl
            name="Date"
            {...this.props.Date}
            className="date-awarded"
            minDate={(this.props.Birthdate || {}).date}
            minDateEqualTo={true}
            hideDay={true}
            onUpdate={this.updateDate}
            onError={this.props.onError}
            required={this.props.required}
          />
        </Field>
      </div>
    )
  }
}

DiplomaItem.defaultProps = {
  Diploma: {},
  DiplomaOther: {},
  Date: {},
  onUpdate: queue => {},
  onError: (value, arr) => {
    return arr
  }
}
