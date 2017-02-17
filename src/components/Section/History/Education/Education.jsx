import React from 'react'
import { i18n } from '../../../../config'
import { ValidationElement, Branch, Collection, Comments, DateRange, DateControl, Reference, Text, RadioGroup, Radio, Help, HelpIcon, Address, Svg, Show } from '../../../Form'
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
export class EducationItem extends ValidationElement {
  constructor (props) {
    super(props)
    this.state = {
      HasAttended: props.HasAttended,
      HasDegree: props.HasDegree,
      HasDegree10: props.HasDegree10,
      Dates: props.Dates,
      Type: props.Type,
      Name: props.Name,
      Address: props.Address,
      Comments: props.Comments,
      Reference: props.Reference
    }

    this.onUpdate = this.onUpdate.bind(this)
    this.handleTypeChange = this.handleTypeChange.bind(this)
    this.updateBranchAttendance = this.updateBranchAttendance.bind(this)
    this.updateBranchDegree10 = this.updateBranchDegree10.bind(this)
    this.updateBranchDegree = this.updateBranchDegree.bind(this)
    this.updateName = this.updateName.bind(this)
    this.updateReference = this.updateReference.bind(this)
    this.updateDates = this.updateDates.bind(this)
    this.updateComments = this.updateComments.bind(this)
    this.updateAddress = this.updateAddress.bind(this)
  }

  /**
   * Handle any updates and bubble them up.
   */
  onUpdate (name, values) {
    this.setState({ [name]: values }, () => {
      if (this.props.onUpdate) {
        this.props.onUpdate({
          name: this.props.name,
          HasAttended: this.state.HasAttended,
          HasDegree: this.state.HasDegree,
          HasDegree10: this.state.HasDegree10,
          Dates: this.state.Dates,
          Type: this.state.Type,
          Name: this.state.Name,
          Address: this.state.Address,
          Comments: this.state.Comments,
          Reference: this.state.Reference
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

  updateBranchAttendance (values) {
    this.onUpdate('HasAttended', values)
  }

  updateBranchDegree10 (values) {
    this.onUpdate('HasDegree10', values)
  }

  updateBranchDegree (values) {
    this.onUpdate('HasDegree', values)
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

  /**
   * Certain elements are present if the date range of the attendance was
   * within the last 3 years.
   */
  reference () {
    // Some shortcuts so our conditional isn't unreadable
    const dates = this.state.Dates || {}
    const from = dates.from
    const to = dates.to

    if (withinThreeYears(from, to)) {
      return (
        <div>
          <h3>{i18n.t('history.education.heading.reference')}</h3>
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
      <div className="table">
        <div className="table-cell index">
          {i18n.t('history.education.collection.diploma.summary.item')} {index + 1}:
        </div>
        <div className="table-cell">{ text }</div>
        <div className="table-cell dates">{ dd }</div>
      </div>
    )
  }

  school () {
    return (
      <div>
        <div className="content">
          <h4>{i18n.t('history.education.heading.dates')}</h4>
          <div className="eapp-field-wrap">
            <label className="info-label">{i18n.t('history.education.label.dates')}</label>
            <Help id="history.education.help.dates">
              <DateRange name="Dates"
                         {...this.state.Dates}
                         label={i18n.t('history.education.label.dates')}
                         onUpdate={this.updateDates}
                         onValidate={this.props.onValidate}
                         />
              <HelpIcon className="dates-help-icon" />
            </Help>
          </div>

          <h4>{i18n.t('history.education.heading.name')}</h4>
          <div className="eapp-field-wrap">
            <Help id="history.education.help.name">
              <Text name="Name"
                    {...this.state.Name}
                    label={i18n.t('history.education.label.name')}
                    className="school-name"
                    maxlength="100"
                    onUpdate={this.updateName}
                    onValidate={this.props.handleValidation}
                    />
              <HelpIcon />
            </Help>
          </div>

          <Comments name="Comments"
                    {...this.state.Comments}
                    addLabel="history.education.label.comments"
                    title={i18n.t('history.education.heading.comments')}
                    className="eapp-field-wrap"
                    onUpdate={this.updateComments}
                    onValidate={this.props.onValidate}>
            <h4>{i18n.t('history.education.heading.address')}</h4>
            <div className="eapp-field-wrap">
              <Help id="history.education.help.address">
                <Address name="Address"
                         {...this.state.Address}
                         label={i18n.t('history.education.label.address')}
                         onUpdate={this.updateAddress}
                         onValidate={this.props.onValidate}
                         />
                <HelpIcon className="address-help-icon" />
              </Help>
            </div>
          </Comments>

          <h4>{i18n.t('history.education.heading.type')}</h4>
          <div className="eapp-field-wrap">
            <Help id="history.education.help.type">
              <RadioGroup className="type option-list"
                          selectedValue={this.state.Type}>
                <Radio name="type-highschool"
                       label={i18n.t('history.education.label.type.highschool')}
                       value="High School"
                       onChange={this.handleTypeChange}
                       />
                <Radio name="type-college"
                       label={i18n.t('history.education.label.type.college')}
                       value="College"
                       onChange={this.handleTypeChange}
                       />
                <Radio name="type-vocational"
                       label={i18n.t('history.education.label.type.vocational')}
                       value="Vocational"
                       onChange={this.handleTypeChange}
                       />
                <Radio name="type-correspondence"
                       label={i18n.t('history.education.label.type.correspondence')}
                       value="Correspondence"
                       onChange={this.handleTypeChange}
                       />
              </RadioGroup>
              <HelpIcon className="type-help-icon" />
            </Help>
          </div>

          {this.reference()}

          <h3>{i18n.t('history.education.heading.degrees')}</h3>
          <h4>{i18n.t('history.education.heading.degree')}</h4>
          <Branch name="branch_degree"
                  className="eapp-field-wrap"
                  value={this.state.HasDegree}
                  help="history.education.help.degree"
                  onUpdate={this.updateBranchDegree}
                  >
          </Branch>

          <Show when={this.state.HasDegree === 'Yes'}>
            <Collection minimum="1"
                        items={this.state.Diplomas}
                        summary={this.diplomaSummary}
                        summaryTitle={i18n.t('history.education.collection.diploma.title')}
                        appendLabel={i18n.t('history.education.collection.diploma.append')}>
              <DiplomaItem name="Diploma"
                           onUpdate={this.onUpdate}
                           />
            </Collection>
          </Show>
        </div>
      </div>
    )
  }

  render () {
    return (
      <div className="education">
        <Branch name="branch_school"
                className="eapp-field-wrap"
                value={this.state.HasAttended}
                help="history.education.help.attendance"
                label={i18n.t('history.education.label.attendance')}
                onUpdate={this.updateBranchAttendance}
                >
        </Branch>
        <Show when={this.state.HasAttended === 'No'}>
          <div>
            <Branch name="branch_degree10"
                    className="eapp-field-wrap"
                    value={this.state.HasDegree10}
                    help="history.education.help.degree10"
                    label={i18n.t('history.education.label.degree10')}
                    onUpdate={this.updateBranchDegree10}
                    >
            </Branch>
          </div>
        </Show>
        <Show when={this.state.HasAttended === 'Yes' || this.state.HasDegree10 === 'Yes'}>
          {this.school()}
        </Show>
      </div>
    )
  }
}
