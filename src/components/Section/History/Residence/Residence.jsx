import React from 'react'
import i18n from 'util/i18n'

import { HISTORY, HISTORY_RESIDENCE } from 'config/formSections/history'

import {
  HistoryResidenceValidator,
  ResidenceValidator,
} from 'validators'

import connectSubsection from 'components/Section/shared/SubsectionConnector'
import Subsection from 'components/Section/shared/Subsection'

import { Accordion } from 'components/Form'
import { newGuid } from 'components/Form/ValidationElement'
import { openState } from 'components/Form/Accordion/Accordion'
import { today, daysAgo } from 'components/Section/History/dateranges'

import { InjectGaps, ResidenceCustomSummary } from '../summaries'
import ResidenceItem from './ResidenceItem'
import { Gap } from '../Gap'

const sectionConfig = {
  key: HISTORY_RESIDENCE.key,
  section: HISTORY.name,
  store: HISTORY.store,
  subsection: HISTORY_RESIDENCE.name,
  storeKey: HISTORY_RESIDENCE.storeKey,
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
    const overrideInitial = this.props.overrideInitial ? false : initial

    return byline(
      item,
      index,
      overrideInitial,
      'history.residence.collection.summary.incomplete',
      this.props.required,
      i => new ResidenceValidator(i, null).isValid() === true,
    )
  }

  customResidenceDetails = (item, index, initial, callback) => {
    const { totalYears } = this.props

    if (item.type === 'Gap') {
      const dates = (item.Item || {}).Dates || {}
      return (
        <Gap
          title={i18n.t('history.residence.gap.title')}
          para={i18n.t('history.residence.gap.para', { years: totalYears })}
          btnText={i18n.t('history.residence.gap.btnText')}
          first={index === 0}
          dates={dates}
          onClick={() => this.fillGap(dates)}
        />
      )
    }

    return callback()
  }

  fillGap = () => {
    const items = [...this.props.List.items]

    items.push({
      uuid: newGuid(),
      open: true,
      Item: {
        name: 'Item',
        Dates: {
          name: 'Dates',
          present: false,
          receiveProps: true,
        },
      },
    })

    this.handleUpdate({
      items: InjectGaps(items, daysAgo(365 * this.props.totalYears))
        .sort(this.sort)
        .filter(item => !item.type || (item.type && item.type !== 'Gap')),
      branch: {},
    })
  }

  inject = items => InjectGaps(items, daysAgo(today, 365 * this.props.totalYears))

  render() {
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
          inject={this.inject}
          realtime={this.props.realtime}
          onUpdate={this.handleUpdate}
          onError={this.handleError}
          caption={this.props.caption}
          byline={this.customResidenceByline}
          customSummary={ResidenceCustomSummary}
          customDetails={this.customResidenceDetails}
          description={i18n.t('history.residence.collection.summary.title')}
          appendTitle={i18n.t('history.residence.collection.appendTitle')}
          appendLabel={i18n.t('history.residence.collection.append')}
          required={this.props.required}
          scrollIntoView={this.props.scrollIntoView}
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
  validator: data => new HistoryResidenceValidator(data).isValid() === true,
}

export default connectSubsection(Residence, sectionConfig)
