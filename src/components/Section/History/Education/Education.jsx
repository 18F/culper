import React from 'react'

import i18n from 'util/i18n'

import { HISTORY, HISTORY_EDUCATION } from 'config/formSections/history'

import { Accordion } from 'components/Form'
import { openState } from 'components/Form/Accordion/Accordion'

import connectSubsection from 'components/Section/shared/SubsectionConnector'
import Subsection from 'components/Section/shared/Subsection'

import { EducationCustomSummary } from '../summaries'
import EducationItem from './EducationItem'

const sectionConfig = {
  key: HISTORY_EDUCATION.key,
  section: HISTORY.name,
  store: HISTORY.store,
  subsection: HISTORY_EDUCATION.name,
  storeKey: HISTORY_EDUCATION.storeKey,
}

const byline = (item, index, initial, translation, required, isValid) => {
  switch (true) {
    // If item is required and not currently opened and is not valid, show message
    case required && !item.open && !isValid:
    case !item.open && !initial && item.Item && !isValid:
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
    const { required, errors, overrideInitial } = this.props

    const newInitial = overrideInitial ? false : initial
    const itemHasErrors = errors && errors.filter(e => e.indexOf(item.uuid) > -1).length > 0

    return byline(
      item,
      index,
      newInitial,
      'history.education.collection.school.summary.incomplete',
      required,
      !itemHasErrors,
    )
  }

  render() {
    const { totalYears, errors } = this.props
    const accordionErrors = errors && errors.filter(e => e.indexOf('List.accordion') === 0)

    return (
      <div>
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
            { years: totalYears },
          )}
          appendLabel={i18n.t('history.education.collection.school.append')}
          required={this.props.required}
          scrollIntoView={this.props.scrollIntoView}
          errors={accordionErrors}
        >
          <EducationItem
            bind={true}
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
  overrideInitial: false,
  caption: null,
  onUpdate: () => {},
  onError: (value, arr) => arr,
  section: 'history',
  subsection: 'education',
  dispatch: () => {},
  errors: [],
}

export default connectSubsection(Education, sectionConfig)
