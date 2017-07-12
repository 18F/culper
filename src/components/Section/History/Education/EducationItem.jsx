import React from 'react'
import { i18n } from '../../../../config'
import { ValidationElement, BranchCollection, DateRange, Reference, Text, RadioGroup, Radio, Field, Location } from '../../../Form'
import { DiplomaItem } from './Diploma'
import { today, daysAgo } from '../dateranges'

// We need to determine how far back 3 years ago was
const threeYearsAgo = daysAgo(today, 365 * 3)
const withinThreeYears = (from, to) => {
  return (from && from >= threeYearsAgo) || (to && to >= threeYearsAgo)
}

/**
 * Education item in a collection
 *
 * This was broken apart so it could manage minor local state in determining
 * when particular portions of this should be rendered.
 */
export default class EducationItem extends ValidationElement {
  constructor (props) {
    super(props)
    this.state = {
      Dates: props.Dates,
      Type: props.Type,
      Name: props.Name,
      Address: props.Address,
      Comments: props.Comments,
      Reference: props.Reference,
      Diplomas: props.Diplomas
    }

    this.onUpdate = this.onUpdate.bind(this)
    this.handleTypeChange = this.handleTypeChange.bind(this)
    this.updateName = this.updateName.bind(this)
    this.updateReference = this.updateReference.bind(this)
    this.updateDates = this.updateDates.bind(this)
    this.updateComments = this.updateComments.bind(this)
    this.updateAddress = this.updateAddress.bind(this)
    this.updateDiplomas = this.updateDiplomas.bind(this)
  }

  /**
   * Handle any updates and bubble them up.
   */
  onUpdate (name, values) {
    this.setState({ [name]: values }, () => {
      if (this.props.onUpdate) {
        this.props.onUpdate({
          name: this.props.name,
          Dates: this.state.Dates,
          Type: this.state.Type,
          Name: this.state.Name,
          Address: this.state.Address,
          Comments: this.state.Comments,
          Reference: this.state.Reference,
          Diplomas: this.state.Diplomas
        })
      }
    })
  }

  /**
   * Handle the change event for type of school
   */
  handleTypeChange (event) {
    this.onUpdate('Type', event.target.value)
  }

  updateName (values) {
    this.onUpdate('Name', values)
  }

  updateReference (values) {
    this.onUpdate('Reference', values)
  }

  updateDates (values) {
    this.onUpdate('Dates', values)
  }

  updateComments (values) {
    this.onUpdate('Comments', values)
  }

  updateAddress (values) {
    this.onUpdate('Address', values)
  }

  updateDiplomas (values) {
    this.onUpdate('Diplomas', values)
  }

  /**
   * Certain elements are present if the date range of the attendance was
   * within the last 3 years.
   */
  reference () {
    // Some shortcuts so our conditional isn't unreadable
    const dates = this.state.Dates || {}
    const from = (dates.from || {}).date
    const to = (dates.to || {}).date

    if (withinThreeYears(from, to)) {
      return (
        <div>
          <h2>{i18n.t('history.education.heading.reference')}</h2>
          <p>{i18n.t('history.education.para.reference')}</p>
          <Reference name="Reference"
                     {...this.state.Reference}
                     onUpdate={this.updateReference}
                     onValidate={this.props.onValidate}
                     />
        </div>
      )
    }

    return null
  }

  diplomaSummary (item, index) {
    const unk = i18n.t('history.education.collection.diploma.summary.unknown')
    const diploma = item.Diploma || {}
    const d = diploma.Date || {}
    const text = (diploma.Diploma === 'Other' ? diploma.DiplomaOther : diploma.Diploma) || unk
    const dd = d.date
          ? `${d.month}/${d.year}`
          : unk

    return (
      <span>
        <span className="index">
          {i18n.t('history.education.collection.diploma.summary.item')} {index + 1}:
        </span>
        <span className=""><strong>{ text }</strong></span>
        <span className="dates"><strong>{ dd }</strong></span>
      </span>
    )
  }

  school () {
    return (
      <div>
        <div className="content">
          <Field title={i18n.t('history.education.heading.name')}
                 help="history.education.help.name"
                 adjustFor="labels">
            <Text name="Name"
                  {...this.state.Name}
                  label={i18n.t('history.education.label.name')}
                  className="school-name"
                  maxlength="100"
                  onUpdate={this.updateName}
                  onError={this.props.onError}
                  />
          </Field>

          <Field title={i18n.t('history.education.heading.dates')}
                 help="history.education.help.dates"
                 adjustFor="daterange"
                 shrink={true}>
            <label className="info-label">{i18n.t('history.education.label.dates')}</label>
            <DateRange name="Dates"
                       {...this.state.Dates}
                       label={i18n.t('history.education.label.dates')}
                       onUpdate={this.updateDates}
                       onError={this.props.onError}
                       />
          </Field>

          <Field title={i18n.t('history.education.heading.address')}
                 help="history.education.help.address"
                 comments={true}
                 commentsName="Comments"
                 commentsValue={this.state.Comments}
                 onUpdate={this.updateComments}
                 onError={this.props.onError}
                 adjustFor="address"
                 shrink={true}>
            <Location name="Address"
                      {...this.state.Address}
                      label={i18n.t('history.education.label.address')}
                      layout={Location.ADDRESS}
                      geocode={true}
                      onUpdate={this.updateAddress}
                      onError={this.props.onError}
                      />
          </Field>

          <Field title={i18n.t('history.education.heading.type')}
                 help="history.education.help.type"
                 adjustFor="big-buttons"
                 shrink={true}>
            <RadioGroup className="type option-list"
                        selectedValue={this.state.Type}>
              <Radio name="type-highschool"
                     className="type-highschool"
                     label={i18n.m('history.education.label.type.highschool')}
                     value="High School"
                     onChange={this.handleTypeChange}
                     onError={this.props.onError}
                     />
              <Radio name="type-college"
                     className="type-college"
                     label={i18n.m('history.education.label.type.college')}
                     value="College"
                     onChange={this.handleTypeChange}
                     onError={this.props.onError}
                     />
              <Radio name="type-vocational"
                     className="type-vocational"
                     label={i18n.m('history.education.label.type.vocational')}
                     value="Vocational"
                     onChange={this.handleTypeChange}
                     onError={this.props.onError}
                     />
              <Radio name="type-correspondence"
                     className="type-correspondence"
                     label={i18n.m('history.education.label.type.correspondence')}
                     value="Correspondence"
                     onChange={this.handleTypeChange}
                     onError={this.props.onError}
                     />
            </RadioGroup>
          </Field>

          {this.reference()}

          <BranchCollection help="history.education.help.degree"
                            label={i18n.t('history.education.heading.degree')}
                            appendLabel={i18n.t('history.education.heading.degreeTail')}
                            items={this.state.Diplomas}
                            onUpdate={this.updateDiplomas}
                            onError={this.props.onError}>
            <DiplomaItem name="Diploma" bind={true} />
          </BranchCollection>
        </div>
      </div>
    )
  }

  render () {
    return (
      <div className="education">
        {this.school()}
      </div>
    )
  }
}

EducationItem.defaultProps = {
  onError: (value, arr) => { return arr }
}
