import React from 'react'
import { i18n } from '../../../../config'
import { HistoryEducationValidator, EducationItemValidator } from '../../../../validators'
import SubsectionElement from '../../SubsectionElement'
import { Accordion } from '../../../Form'
import { openState } from '../../../Form/Accordion/Accordion'
import { EducationCustomSummary, EducationCaption } from '../summaries'
import EducationItem from './EducationItem'

const byline = (item, index, initial, translation, required, validator) => {
  switch (true) {
    // If item is required and not currently opened and is not valid, show message
    case required && !item.open && !validator(item.Item):
    case !item.open && !initial && item.Item && !validator(item.Item):
      return (<div className={`byline ${openState(item, initial)} fade in`.trim()}>
        <div className="incomplete">{i18n.m(translation)}</div>
      </div>
      )
    default:
      return null
  }
}

export default class Education extends SubsectionElement {
  constructor (props) {
    super(props)

    this.customEducationByline = this.customEducationByline.bind(this)
  }

  customEducationByline (item, index, initial) {
    return byline(item, index, this.props.overrideInitial(initial), 'history.education.collection.school.summary.incomplete', this.props.required, (item) => {
      return new EducationItemValidator(item).isValid()
    })
  }

  render () {
    return (
      <div className="education">
        <Accordion scrollToTop={this.props.scrollToTop}
                   defaultState={this.props.defaultState}
                   items={this.props.value.List}
                   sort={this.props.sort}
                   realtime={this.props.realtime}
                   onUpdate={this.props.onUpdate}
                   onError={this.handleError}
                   caption={EducationCaption}
                   byline={this.customEducationByline}
                   customSummary={EducationCustomSummary}
                   description={i18n.t('history.education.collection.school.summary.title')}
                   appendLabel={i18n.t('history.education.collection.school.append')}
                   required={this.props.required}
                   scrollIntoView={this.props.scrollIntoView}>
                   <EducationItem name="Item"
                     bind={true}
                     required={this.props.required}
                     scrollIntoView={this.props.scrollIntoView}
                     addressBooks={this.props.addressBooks}
                     dispatch={this.props.dispatch}
                   />
        </Accordion>
      </div>
    )
  }
}

Education.defaultProps = {
  value: [],
  scrollToTop: '',
  defaultState: true,
  realtime: false,
  sort: null,
  totalYears: 10,
  overrideInitial: (initial) => { return initial },
  onUpdate: () => {},
  onError: (value, arr) => { return arr },
  section: 'history',
  subsection: 'education',
  dispatch: () => {},
  validator: (state, props) => {
    return new HistoryEducationValidator(props).isValid()
  }
}
