import React from 'react'
import i18n from 'util/i18n'

import { HISTORY, HISTORY_RESIDENCE } from 'config/formSections/history'
import { INCOMPLETE_DURATION } from 'constants/errors'

import connectSubsection from 'components/Section/shared/SubsectionConnector'
import { findTimelineGaps } from 'helpers/date'
import { validateModel } from 'models/validate'

import Subsection from 'components/Section/shared/Subsection'

import { Accordion } from 'components/Form'
import { openState } from 'components/Form/Accordion/Accordion'

import { ResidenceCustomSummary } from '../summaries'
import ResidenceItem from './ResidenceItem'
import { Gap } from '../Gap'

const sectionConfig = {
  key: HISTORY_RESIDENCE.key,
  section: HISTORY.name,
  store: HISTORY.store,
  subsection: HISTORY_RESIDENCE.name,
  storeKey: HISTORY_RESIDENCE.storeKey,
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

export class Residence extends Subsection {
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

  handleUpdate = (values) => {
    this.props.onUpdate('Residence', { List: values })
  }

  customResidenceByline = (item, index, initial) => {
    const { required, errors, overrideInitial } = this.props

    const newInitial = overrideInitial ? false : initial
    const itemHasErrors = errors && errors.filter(e => e.indexOf(item.uuid) > -1).length > 0

    return byline(
      item,
      index,
      newInitial,
      'history.residence.collection.summary.incomplete',
      required,
      !itemHasErrors,
    )
  }

  render() {
    const { List, errors, totalYears } = this.props
    const { items, branch } = List

    const dateRanges = items
      .filter(i => i.Item && i.Item.Dates && validateModel(
        { Dates: i.Item.Dates },
        { Dates: { presence: true, daterange: true } }
      ) === true)
      .map(i => i.Item.Dates)

    const gaps = findTimelineGaps({ years: totalYears }, dateRanges)

    const showGapError = branch
      && branch.value === 'No'
      && gaps.length > 0
      && errors.filter(e => e.indexOf(INCOMPLETE_DURATION) > -1).length > 0

    const accordionErrors = errors && errors.filter(e => e.indexOf('List.accordion') === 0)

    return (
      <div
        className="section-content residence"
        data-section={HISTORY.key}
        data-subsection={HISTORY_RESIDENCE.key}
      >
        <Accordion
          scrollToTop={this.props.scrollToTop}
          defaultState={this.props.defaultState}
          {...this.props.List}
          sort={this.props.sort}
          realtime={this.props.realtime}
          onUpdate={this.handleUpdate}
          onError={this.handleError}
          caption={this.props.caption}
          byline={this.customResidenceByline}
          customSummary={ResidenceCustomSummary}
          description={i18n.t('history.residence.collection.summary.title')}
          appendTitle={i18n.t('history.residence.collection.appendTitle')}
          appendLabel={i18n.t('history.residence.collection.append')}
          required={this.props.required}
          scrollIntoView={this.props.scrollIntoView}
          errors={accordionErrors}
        >
          <ResidenceItem
            bind={true}
            name="Item"
            addressBooks={this.props.addressBooks}
            dispatch={this.props.dispatch}
            required={this.props.required}
            scrollIntoView={this.props.scrollIntoView}
          />
        </Accordion>

        {showGapError && (
          <Gap
            title={i18n.t('history.residence.gap.title')}
            para={i18n.t('history.residence.gap.para', { years: totalYears })}
            gaps={gaps}
          />
        )}
      </div>
    )
  }
}

Residence.defaultProps = {
  List: Accordion.defaultList,
  scrollToTop: '',
  defaultState: true,
  realtime: false,
  required: false,
  sort: null,
  totalYears: 10,
  overrideInitial: false,
  caption: null,
  onUpdate: () => {},
  onError: (value, arr) => arr,
  addressBooks: {},
  dispatch: () => {},
  errors: [],
}

export default connectSubsection(Residence, sectionConfig)
