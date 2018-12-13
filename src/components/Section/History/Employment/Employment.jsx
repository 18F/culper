import React from 'react'
import { i18n } from '../../../../config'
import schema from '../../../../schema'
import validate, { EmploymentValidator } from '../../../../validators'
import SubsectionElement from '../../SubsectionElement'
import { Accordion, Branch } from '../../../Form'
import { openState } from '../../../Form/Accordion/Accordion'
import { newGuid } from '../../../Form/ValidationElement'
import { today, daysAgo } from '../dateranges'
import { InjectGaps, EmploymentCustomSummary } from '../summaries'
import EmploymentItem from './EmploymentItem'
import { Gap } from '../Gap'
import { extractDate } from '../dateranges'

const byline = (item, index, initial, translation, required, validator) => {
  // If item is required and not currently opened and is not valid, show message
  switch (true) {
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

export default class Employment extends SubsectionElement {
  constructor(props) {
    super(props)

    this.customEmploymentByline = this.customEmploymentByline.bind(this)
    this.customEmploymentDetails = this.customEmploymentDetails.bind(this)
    this.fillGap = this.fillGap.bind(this)
    this.inject = this.inject.bind(this)
    this.update = this.update.bind(this)
    this.updateList = this.updateList.bind(this)
    this.updateEmploymentRecord = this.updateEmploymentRecord.bind(this)
    this.sortEmploymentItems = this.sortEmploymentItems.bind(this)
  }

  customEmploymentByline(item, index, initial) {
    return byline(
      item,
      index,
      this.props.overrideInitial(initial),
      'history.employment.default.collection.summary.incomplete',
      this.props.required,
      item => {
        return new EmploymentValidator(item, null).isValid()
      }
    )
  }

  sortEmploymentItems(employmentItems) {
    return employmentItems.sort((a, b) => {
      if (a.Item && a.Item.Dates && a.Item.Dates.to) {
        const aDateObj = a.Item.Dates.to
        const bDateObj = b.Item.Dates.to
        const aDate = extractDate(aDateObj)
        const bDate = extractDate(bDateObj)

        return bDate.getTime() - aDate.getTime()
      }
      return 0
    })
  }

  update(queue) {
    const updatedValues = {
      List: this.props.List,
      EmploymentRecord: this.props.EmploymentRecord,
      ...queue
    }

    if (queue.List) {
      updatedValues.List = {
        ...queue.List,
        items: this.sortEmploymentItems(queue.List.items)
      }
    }

    this.props.onUpdate(updatedValues)
  }

  updateList(values) {
    this.update({
      List: values
    })
  }

  updateEmploymentRecord(values) {
    if (values.value === 'Yes') {
      this.refs.employment.add()
      return
    }

    this.update({
      EmploymentRecord: values
    })
  }

  fillGap(dates) {
    let items = [...this.props.List.items]
    items.push({
      uuid: newGuid(),
      open: true,
      Item: {
        name: 'Item',
        Dates: {
          name: 'Dates',
          receiveProps: true,
          present: false,
          from: dates.from,
          to: dates.to
        }
      }
    })

    this.update({
      List: {
        items: InjectGaps(items, daysAgo(365 * this.props.totalYears)).sort(
          this.sort
        ),
        branch: {}
      }
    })
  }

  customEmploymentDetails(item, index, initial, callback) {
    if (item.type === 'Gap') {
      const dates = (item.Item || {}).Dates || {}
      return (
        <Gap
          title={i18n.t('history.employment.gap.title')}
          para={i18n.t('history.employment.gap.para')}
          btnText={i18n.t('history.employment.gap.btnText')}
          first={index === 0}
          dates={dates}
          onClick={this.fillGap.bind(this, dates)}
        />
      )
    }

    return callback()
  }

  inject(items) {
    return InjectGaps(items, daysAgo(today, 365 * this.props.totalYears))
  }

  render() {
    return (
      <div
        className="section-content employment"
        {...super.dataAttributes(this.props)}>
        <Accordion
          scrollToTop={this.props.scrollToTop}
          defaultState={this.props.defaultState}
          {...this.props.List}
          ref="employment"
          sort={this.props.sort}
          inject={this.inject}
          realtime={this.props.realtime}
          onUpdate={this.updateList}
          onError={this.handleError}
          caption={this.props.caption}
          byline={this.customEmploymentByline}
          customSummary={EmploymentCustomSummary}
          customDetails={this.customEmploymentDetails}
          description={i18n.t(
            'history.employment.default.collection.summary.title'
          )}
          appendTitle={i18n.t(
            'history.employment.default.collection.appendTitle'
          )}
          appendLabel={i18n.t('history.employment.default.collection.append')}
          appendClass="no-margin-bottom"
          required={this.props.required}
          scrollIntoView={this.props.scrollIntoView}>
          <EmploymentItem
            bind
            name="Item"
            addressBooks={this.props.addressBooks}
            dispatch={this.props.dispatch}
            required={this.props.required}
            scrollIntoView={this.props.scrollIntoView}
          />
        </Accordion>
        <hr className="section-divider" />
        <Branch
          label={i18n.t('history.employment.default.employmentRecord.title')}
          className="employment-record"
          labelSize="h3"
          {...this.props.EmploymentRecord}
          onUpdate={this.updateEmploymentRecord}
          onError={this.handleError}
          required={this.props.required}
          scrollIntoView={this.props.scrollIntoView}>
          {i18n.m('history.employment.default.employmentRecord.list')}
          {i18n.m('history.employment.default.employmentRecord.para')}
        </Branch>
      </div>
    )
  }
}

Employment.defaultProps = {
  List: Accordion.defaultList,
  EmploymentRecord: {},
  scrollToTop: '',
  defaultState: true,
  realtime: false,
  sort: null,
  totalYears: 10,
  overrideInitial: initial => {
    return initial
  },
  caption: null,
  onUpdate: () => {},
  onError: (value, arr) => {
    return arr
  },
  section: 'history',
  subsection: 'employment',
  addressBooks: {},
  dispatch: () => {},
  validator: data => {
    return validate(schema('history.employment', data))
  }
}
