import React from 'react'
import { i18n } from '../../../../config'
import { Accordion, ValidationElement, Svg } from '../../../Form'
import Person from './Person'
import { PeopleValidator } from '../../../../validators'
import SubsectionElement from '../../SubsectionElement'
import SummaryProgress from '../../History/SummaryProgress'
import PeopleCounter from './PeopleCounter'
import { DateSummary, NameSummary } from '../../../Summary'

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

  summary (item, index) {
    const o = (item || {}).Person || {}
    const name = NameSummary(o.Name, i18n.t('relationships.people.person.collection.summary.unknown'))
    const date = DateSummary(o.KnownDates)
    const type = i18n.t('relationships.people.person.collection.itemType')

    return (
      <span>
        <span className="index">{type} {index + 1}:</span>
        <span className="info"><strong>{name}</strong></span>
        <span className="dates"><strong>{date}</strong></span>
      </span>
    )
  }

  peopleSummaryList () {
    return this.state.List.reduce((dates, item) => {
      if (!item || !item.Person || !item.Person.KnownDates) {
        return dates
      }

      const knownDates = item.Person.KnownDates
      if (knownDates.from.date && knownDates.to.date) {
        return dates.concat(item.Person.KnownDates)
      }
      return dates
    }, [])
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
              <Svg src="img/people-who-know-you.svg" />
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
                   branch={this.state.ListBranch}
                   summary={this.summary}
                   onUpdate={this.updateList}
                   onError={this.handleError}
                   appendTitle={i18n.t('relationships.people.person.collection.appendTitle')}
                   appendLabel={i18n.t('relationships.people.person.collection.appendLabel')}>
          <Person name="Person" bind={true} />
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
  defaultState: true
}
