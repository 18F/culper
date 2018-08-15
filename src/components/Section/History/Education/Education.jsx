import React from 'react'
import { i18n } from '../../../../config'
import schema from '../../../../schema'
import validate, { EducationItemValidator } from '../../../../validators'
import SubsectionElement from '../../SubsectionElement'
import { Accordion } from '../../../Form'
import { openState } from '../../../Form/Accordion/Accordion'
import { EducationCustomSummary } from '../summaries'
import EducationItem from './EducationItem'

const byline = (item, index, initial, translation, required, validator) => {
  switch (true) {
    // If item is required and not currently opened and is not valid, show message
  case required && !item.open && !validator(item.Item):
  case !item.open && !initial && item.Item && !validator(item.Item):
    return (<div className={`byline ${openState(item, initial)} fade in`.trim()}>
            <div className="usa-alert usa-alert-error">
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
      <div className="section-content education" {...super.dataAttributes(this.props)}>
        <Accordion scrollToTop={this.props.scrollToTop}
                   defaultState={this.props.defaultState}
                   {...this.props.List}
                   sort={this.props.sort}
                   realtime={this.props.realtime}
                   onUpdate={this.props.onUpdate}
                   onError={this.handleError}
                   caption={this.props.caption}
                   byline={this.customEducationByline}
                   customSummary={EducationCustomSummary}
                   description={i18n.t('history.education.collection.school.summary.title')}
                   appendTitle={i18n.t('history.education.collection.school.appendTitle')}
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
  List: Accordion.defaultList,
  scrollToTop: '',
  defaultState: true,
  realtime: false,
  sort: null,
  totalYears: 10,
  overrideInitial: (initial) => { return initial },
  caption: null,
  onUpdate: () => {},
  onError: (value, arr) => { return arr },
  section: 'history',
  subsection: 'education',
  dispatch: () => {},
  validator: (data) => {
    return validate(schema('history.education', data))
  }
}
