import React from 'react'

import i18n from 'util/i18n'

import schema from 'schema'
import validate, { PersonValidator } from 'validators'

import { RELATIONSHIPS, RELATIONSHIPS_PEOPLE } from 'config/formSections/relationships'

import Subsection from 'components/Section/shared/Subsection'
import connectSubsection from 'components/Section/shared/SubsectionConnector'
import { Accordion, Svg } from 'components/Form'
import { newGuid } from 'components/Form/ValidationElement'
import { Summary, DateSummary, NameSummary } from 'components/Summary'
import SummaryProgress from 'components/Section/History/SummaryProgress'
import { extractDate, today, daysAgo } from 'components/Section/History/dateranges'
import { InjectGaps } from 'components/Section/History/summaries'
import { Gap } from 'components/Section/History/Gap'
import { sort } from 'components/Section/History/helpers'

import Person from './Person'

import PeopleCounter from './PeopleCounter'

const sectionConfig = {
  key: RELATIONSHIPS_PEOPLE.key,
  section: RELATIONSHIPS.name,
  store: RELATIONSHIPS.store,
  subsection: RELATIONSHIPS_PEOPLE.name,
  storeKey: RELATIONSHIPS_PEOPLE.storeKey,
}

export class People extends Subsection {
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

  update = (queue) => {
    this.props.onUpdate(this.storeKey, {
      List: this.props.List,
      ...queue,
    })
  }

  updateList = (values) => {
    this.update({
      List: values,
    })
  }

  excludeGaps = items => (items || [])
    .filter(item => !item.type || (item.type && item.type !== 'Gap'))

  fillGap = () => {
    const items = [...(this.props.List || {}).items]

    items.push({
      uuid: newGuid(),
      open: true,
      Item: {
        name: 'Item',
        Dates: {
          Name: 'Dates',
          present: false,
          receiveProps: true,
        },
      },
    })

    this.update({
      List: {
        ...this.props.List,
        items: this.excludeGaps(this.inject(items).sort(sort)),
      },
    })
  }

  summary = (item, index) => {
    const o = (item || {}).Item || {}
    const date = DateSummary(o.Dates)
    const name = NameSummary(o.Name)
    const type = i18n.t('relationships.people.person.collection.itemType')

    return Summary({
      type,
      index,
      left: name,
      right: date,
      placeholder: i18n.t(
        'relationships.people.person.collection.summary.unknown'
      ),
    })
  }

  customDetails = (item, index, initial, callback) => {
    if (item.type === 'Gap') {
      const dates = (item.Item || {}).Dates || {}
      return (
        <Gap
          title={i18n.t('relationships.people.person.gap.title')}
          para={i18n.t('relationships.people.person.gap.para')}
          btnText={i18n.t('relationships.people.person.gap.button')}
          first={index === 0}
          dates={dates}
          onClick={() => this.fillGap(dates)}
        />
      )
    }

    return callback()
  }

  peopleSummaryList = () => (
    this.excludeGaps(this.props.List.items).reduce((dates, item) => {
      if (!item || !new PersonValidator(item.Item).isValid() === true) {
        return dates
      }

      const knownDates = item.Item.Dates
      const kfrom = extractDate(knownDates.from)
      const kto = extractDate(knownDates.to)
      const present = (knownDates || {}).present || false
      if (kfrom && (present || kto)) {
        return dates.concat(item.Item.Dates)
      }
      return dates
    }, [])
  )

  inject = items => InjectGaps(items, daysAgo(today, 365 * this.props.totalYears))

  render() {
    return (
      <div
        className="section-content people"
        data-section={RELATIONSHIPS.key}
        data-subsection={RELATIONSHIPS_PEOPLE.key}
      >
        <h1 className="section-header">{i18n.t('relationships.people.sectionTitle.title')}</h1>

        {i18n.m('relationships.people.para.intro')}

        <span id="scrollToPeople" />
        <div className="summary-progress">
          <div className="summaryprogress progress">
            <SummaryProgress
              className="people-summary"
              List={this.peopleSummaryList}
              title={i18n.t('relationships.people.summaryProgress.title')}
              unit={i18n.t('relationships.people.summaryProgress.unit')}
              total={7}
            >
              <div className="summary-icon">
                <Svg
                  src="/img/people-who-know-you.svg"
                  alt={i18n.t('relationships.people.summaryProgress.svgAlt')}
                />
              </div>
            </SummaryProgress>
          </div>
          <div className="summaryprogress counter">
            <PeopleCounter List={this.props.List} />
          </div>
        </div>

        <Accordion
          scrollTo="scrollToPeople"
          {...this.props.List}
          defaultState={this.props.defaultState}
          scrollToBottom={this.props.scrollToBottom}
          realtime={true}
          sort={sort}
          inject={this.inject}
          summary={this.summary}
          customDetails={this.customDetails}
          validator={PersonValidator}
          onUpdate={this.updateList}
          onError={this.handleError}
          required={this.props.required}
          scrollIntoView={this.props.scrollIntoView}
          description={i18n.t('relationships.people.person.collection.description')}
          appendTitle={i18n.t('relationships.people.person.collection.appendTitle')}
          appendLabel={i18n.t('relationships.people.person.collection.appendLabel')}
        >
          <Person
            name="Item"
            bind={true}
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

People.defaultProps = {
  List: { items: [] },
  onUpdate: () => {},
  onError: (value, arr) => arr,
  addressBooks: {},
  dispatch: () => {},
  validator: data => validate(schema('relationships.people', data)),
  defaultState: true,
  totalYears: 7,
  scrollToBottom: '.bottom-btns',
  scrollIntoView: false,
}

export default connectSubsection(People, sectionConfig)
