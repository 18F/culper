import React from 'react'
import { i18n } from 'config'
import { HISTORY, HISTORY_EDUCATION } from 'config/formSections/history'

import schema from 'schema'
import validate, { EducationItemValidator } from 'validators'

import Subsection from 'components/Section/shared/Subsection'
import { Accordion } from 'components/Form'
import { openState } from 'components/Form/Accordion/Accordion'

import connectHistorySection from '../HistoryConnector'

import { EducationCustomSummary } from '../summaries'
import EducationItem from './EducationItem'

const sectionConfig = {
  section: HISTORY.name,
  store: HISTORY.store,
  subsection: HISTORY_EDUCATION.name,
  storeKey: HISTORY_EDUCATION.storeKey,
}

const byline = (item, index, initial, translation, required, validator) => {
  switch (true) {
    // If item is required and not currently opened and is not valid, show message
    case required && !item.open && !validator(item.Item):
    case !item.open && !initial && item.Item && !validator(item.Item):
      return (
        <div className={`byline ${openState(item, initial)} fade in`.trim()}>
          <div className="usa-alert usa-alert-error" role="alert">
            <div className="usa-alert-body">
              <h5 className="usa-alert-heading">{i18n.m(translation)}</h5>
            </div>
          </div>
        </div>
      )

    default:
      return null
  }
}

export class Education extends Subsection {
  constructor(props) {
    super(props)

    const {
      section, subsection, store, storeKey,
    } = sectionConfig

    this.section = section
    this.subsection = subsection
    this.store = store
    this.storeKey = storeKey
  }

  customEducationByline = (item, index, initial) => {
    const overrideInitial = this.props.overrideInitial ? false : initial

    return byline(
      item,
      index,
      overrideInitial,
      'history.education.collection.school.summary.incomplete',
      this.props.required,
      i => new EducationItemValidator(i).isValid(),
    )
  }

  render() {
    return (
      <div
        className="section-content education"
        {...super.dataAttributes()}
      >
        <Accordion
          scrollToTop={this.props.scrollToTop}
          defaultState={this.props.defaultState}
          {...this.props.List}
          sort={this.props.sort}
          realtime={this.props.realtime}
          onUpdate={this.props.onUpdate}
          onError={this.handleError}
          caption={this.props.caption}
          byline={this.customEducationByline}
          customSummary={EducationCustomSummary}
          description={i18n.t(
            'history.education.collection.school.summary.title',
          )}
          appendTitle={i18n.t(
            'history.education.collection.school.appendTitle',
          )}
          appendLabel={i18n.t('history.education.collection.school.append')}
          required={this.props.required}
          scrollIntoView={this.props.scrollIntoView}
        >
          <EducationItem
            bind
            name="Item"
            addressBooks={this.props.addressBooks}
            dispatch={this.props.dispatch}
            required={this.props.required}
            scrollIntoView={this.props.scrollIntoView}
          />
        </Accordion>
      </div>
    )
  }
}

Education.defaultProps = {
  List: Accordion.defaultList,
  scrollIntoView: false,
  scrollToTop: '',
  defaultState: true,
  realtime: false,
  sort: null,
  totalYears: 10,
  overrideInitial: initial => initial,
  caption: null,
  onUpdate: () => {},
  onError: (value, arr) => arr,
  section: 'history',
  subsection: 'education',
  dispatch: () => {},
  validator: data => validate(schema('history.education', data)),
}

export default connectHistorySection(Education, sectionConfig)
