import React from 'react'
import { i18n } from '../../../../config'
import { EducationValidator } from '../../../../validators'
import SubsectionElement from '../../SubsectionElement'
import { Accordion } from '../../../Form'
import { openState } from '../../../Form/Accordion/Accordion'
import { EducationCustomSummary, EducationCaption } from '../summaries'
import EducationItem from './EducationItem'

const byline = (item, index, initial, translation, validator) => {
  if (!item.open && !initial && item.Item && !validator(item.Item)) {
    return (
      <div className={`byline ${openState(item, initial)} fade in`.trim()}>
        <div className="incomplete">{i18n.t(translation)}</div>
      </div>
    )
  }

  return null
}

export default class Education extends SubsectionElement {
  constructor (props) {
    super(props)

    this.customEducationByline = this.customEducationByline.bind(this)
  }

  customEducationByline (item, index, initial) {
    return byline(item, index, this.props.overrideInitial(initial), 'history.education.collection.school.summary.incomplete', (item) => {
      return new EducationValidator(item, null).isValid()
    })
  }

  render () {
    return (
      <div className="education">
        <Accordion scrollTo={this.props.scrollTo}
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
                   scrollIntoView={this.props.scrollIntoView}>
          <EducationItem name="Item" bind={true} required={this.props.required} scrollIntoView={this.props.scrollIntoView} />
        </Accordion>
      </div>
    )
  }
}

Education.defaultProps = {
  value: [],
  scrollTo: '',
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
    return new EducationValidator(props.value, props.value).isValid()
  }
}
