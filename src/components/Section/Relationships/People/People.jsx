import React from 'react'
import { i18n } from '../../../../config'
import { Accordion, Svg } from '../../../Form'
import { newGuid } from '../../../Form/ValidationElement'
import Person from './Person'
import PeopleValidator, { PersonValidator } from '../../../../validators/people'
import SubsectionElement from '../../SubsectionElement'
import SummaryProgress from '../../History/SummaryProgress'
import PeopleCounter from './PeopleCounter'
import { DateSummary, NameSummary } from '../../../Summary'
import { today, daysAgo } from '../../History/dateranges'
import { InjectGaps } from '../../History/summaries'
import { Gap } from '../../History/Gap'
import { openState, chevron } from '../../../Form/Accordion/Accordion'

export default class People extends SubsectionElement {
  constructor (props) {
    super(props)

    this.state = {
      List: props.List,
      ListBranch: props.ListBranch
    }

    this.update = this.update.bind(this)
    this.updateList = this.updateList.bind(this)
    this.peopleSummaryList = this.peopleSummaryList.bind(this)
    this.fillGap = this.fillGap.bind(this)
    this.inject = this.inject.bind(this)
    this.summary = this.summary.bind(this)
    this.customDetails = this.customDetails.bind(this)
  }

  update (field, values) {
    this.setState({[field]: values}, () => {
      if (this.props.onUpdate) {
        this.props.onUpdate({
          List: this.state.List,
          ListBranch: this.state.ListBranch
        })
      }
    })
  }

  updateList (values) {
    this.update('List', values.items)
    this.update('ListBranch', values.branch)
  }

  excludeGaps (items) {
    return items.filter(item => !item.type || (item.type && item.type !== 'Gap'))
  }

  sort (a, b) {
    // Helper to find the date value or default it to 0
    const getOptionalDate = (obj) => {
      return ((((obj || {}).Item || {}).Dates || {}).to || {}).date || 0
    }

    const first = getOptionalDate(a)
    const second = getOptionalDate(b)

    if (first < second) {
      return 1
    } else if (first > second) {
      return -1
    }

    return 0
  }

  fillGap (dates) {
    let items = [...this.state.List]
    items.push({
      uuid: newGuid(),
      open: true,
      Item: {
        Dates: {
          receiveProps: true,
          from: dates.from,
          to: dates.to
        }
      }
    })

    this.update('List', this.inject(items).sort(this.sort))
  }

  summary (item, index) {
    const o = (item || {}).Item || {}
    const name = NameSummary(o.Name, i18n.t('relationships.people.person.collection.summary.unknown'))
    const date = DateSummary(o.Dates)
    const type = i18n.t('relationships.people.person.collection.itemType')

    return (
      <span>
        <span className="index">{type} {index + 1}:</span>
        <span className="info"><strong>{name}</strong></span>
        <span className="dates"><strong>{date}</strong></span>
      </span>
    )
  }

  customDetails (item, index, initial, callback) {
    if (item.type === 'Gap') {
      const dates = (item.Item || {}).Dates || {}
      return (
        <Gap title={i18n.t('relationships.people.person.gap.title')}
             para={i18n.t('relationships.people.person.gap.para')}
             btnText={i18n.t('relationships.people.person.gap.button')}
             first={index === 0}
             dates={dates}
             onClick={this.fillGap.bind(this, dates)}
             />
      )
    }

    return callback()
  }

  peopleSummaryList () {
    return this.excludeGaps(this.state.List).reduce((dates, item) => {
      if (!item || !item.Item || !item.Item.Dates) {
        return dates
      }

      const knownDates = item.Item.Dates
      if (knownDates.from.date && knownDates.to.date) {
        return dates.concat(item.Item.Dates)
      }
      return dates
    }, [])
  }

  inject (items) {
    return InjectGaps(items, daysAgo(today, 365 * this.props.totalYears))
  }

  render () {
    return (
      <div className="people">
        <h2>{i18n.t('relationships.people.heading.title')}</h2>
        {i18n.m('relationships.people.para.intro')}

        <span id="scrollToPeople"></span>
        <div className="summaryprogress progress">
          <SummaryProgress className="people-summary"
                           List={this.peopleSummaryList}
                           title={i18n.t('relationships.people.summaryProgress.title')}
                           unit={i18n.t('relationships.people.summaryProgress.unit')}
                           total={7}
                           >
            <div className="summary-icon">
              <Svg src="/img/people-who-know-you.svg" />
            </div>
          </SummaryProgress>
        </div>
        <div className="summaryprogress counter">
          <PeopleCounter List={this.state.List} />
        </div>

        <Accordion minimum="1"
                   scrollTo="scrollToPeople"
                   items={this.state.List}
                   defaultState={this.props.defaultState}
                   realtime={true}
                   sort={this.sort}
                   inject={this.inject}
                   branch={this.state.ListBranch}
                   summary={this.summary}
                   customDetails={this.customDetails}
                   validator={(props) => new PersonValidator(props, null).isValid() }
                   onUpdate={this.updateList}
                   onError={this.handleError}
                   description={i18n.t('relationships.people.person.collection.description')}
                   appendTitle={i18n.t('relationships.people.person.collection.appendTitle')}
                   appendLabel={i18n.t('relationships.people.person.collection.appendLabel')}>
          <Person name="Item" bind={true} />
        </Accordion>
      </div>
    )
  }
}

People.defaultProps = {
  List: [],
  ListBranch: '',
  onError: (value, arr) => { return arr },
  section: 'relationships',
  subsection: 'people',
  dispatch: () => {},
  validator: (state, props) => {
    return new PeopleValidator(state, props).isValid()
  },
  defaultState: true,
  totalYears: 7
}
