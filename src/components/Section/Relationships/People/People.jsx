import React from 'react'
import { i18n } from '../../../../config'
import { Accordion, ValidationElement, Svg } from '../../../Form'
import Person from './Person'
import { PeopleValidator } from '../../../../validators'
import SummaryProgress from '../../History/SummaryProgress'
import PeopleCounter from './PeopleCounter'
import { dateRangeFormat } from './../../Psychological/summaryHelper'

export default class People extends ValidationElement {
  constructor (props) {
    super(props)

    this.state = {
      List: props.List,
      ListBranch: props.ListBranch,
      errorCodes: []
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

  isValid () {
    return new PeopleValidator(this.state).isValid()
  }

  handleValidation (event, status, error) {
    let codes = super.mergeError(this.state.errorCodes, super.flattenObject(error))
    let complexStatus = null
    if (codes.length > 0) {
      complexStatus = false
    } else if (this.isValid()) {
      complexStatus = true
    }

    this.setState({error: complexStatus === false, valid: complexStatus === true, errorCodes: codes}, () => {
      const errorObject = { [this.props.name]: codes }
      const statusObject = { [this.props.name]: { status: complexStatus } }
      super.handleValidation(event, statusObject, errorObject)
    })
  }

  summary (item, index) {
    const o = (item || {}).Person || {}
    const date = dateRangeFormat(o.KnownDates)
    const name = o.Name
          ? `${o.Name.first || ''} ${o.Name.middle || ''} ${o.Name.last || ''} ${date}`.trim()
          : i18n.t('relationships.people.person.collection.summary.unknown')
    const type = i18n.t('relationships.people.person.collection.itemType')

    return (
      <span>
        <span className="index">{type} {index + 1}:</span>
        <span className="info"><strong>{name}</strong></span>
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
                   items={this.state.List}
                   branch={this.state.ListBranch}
                   onUpdate={this.updateList}
                   summary={this.summary}
                   onValidate={this.handleValidation}
                   appendTitle={i18n.t('relationships.people.person.collection.appendTitle')}
                   appendMessage={i18n.m('relationships.people.person.collection.appendMessage')}
                   appendLabel={i18n.t('relationships.people.person.collection.appendLabel')}>
          <Person name="Person" bind={true} />
        </Accordion>
      </div>
    )
  }
}

People.defaultProps = {
  List: [],
  ListBranch: ''
}
