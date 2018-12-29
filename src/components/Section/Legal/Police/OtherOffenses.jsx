import React from 'react'
import { i18n } from '../../../../config'
import schema from '../../../../schema'
import validate, { OtherOffenseValidator } from '../../../../validators'
import SubsectionElement from '../../SubsectionElement'
import { Branch, Show, Accordion } from '../../../Form'
import { Summary, DateSummary } from '../../../Summary'
import OtherOffense from './OtherOffense'

export default class OtherOffenses extends SubsectionElement {
  constructor(props) {
    super(props)

    this.update = this.update.bind(this)
    this.updateList = this.updateList.bind(this)
    this.updateHasOtherOffenses = this.updateHasOtherOffenses.bind(this)
  }

  update(queue) {
    this.props.onUpdate({
      List: this.props.List,
      HasOtherOffenses: this.props.HasOtherOffenses,
      ...queue
    })
  }

  updateList(values) {
    this.update({
      List: values
    })
  }

  updateHasOtherOffenses(values) {
    this.update({
      HasOtherOffenses: values,
      List: values.value === 'Yes' ? this.props.List : []
    })
  }

  /**
   * Assists in rendering the summary section.
   */
  summary(item, index) {
    const o = (item || {}).Item || {}
    const dates = DateSummary(o.Date)
    const description =
      o.Description && o.Description.value ? o.Description.value : ''

    return Summary({
      type: i18n.t('legal.police.collection.summary.item'),
      index: index,
      left: description,
      right: dates,
      placeholder: i18n.t('legal.police.collection.summary.unknown')
    })
  }

  otherOffenseBranch() {
    return (
      <div>
        <ul className="other-offenses">
          <li>{i18n.m('legal.police.para.otherOffense.first')}</li>
          <li>{i18n.m('legal.police.para.otherOffense.second')}</li>
          <li>{i18n.m('legal.police.para.otherOffense.third')}</li>
          <li>{i18n.m('legal.police.para.otherOffense.fourth')}</li>
          <li>{i18n.m('legal.police.para.otherOffense.fifth')}</li>
        </ul>
      </div>
    )
  }

  render() {
    return (
      <div
        className="section-content police-other-offenses"
        {...super.dataAttributes(this.props)}>
        <h1 className="section-header">{i18n.t('legal.destination.additionalOffenses')}</h1>
        <Branch
          name="has_otheroffenses"
          label={i18n.t('legal.police.para.otherOffense.intro')}
          labelSize="h4"
          className="has-otheroffenses"
          {...this.props.HasOtherOffenses}
          warning={true}
          onUpdate={this.updateHasOtherOffenses}
          required={this.props.required}
          onError={this.handleError}
          scrollIntoView={this.props.scrollIntoView}>
          <ul>
            <li>{i18n.m('legal.police.para.otherOffense.first')}</li>
            <li>{i18n.m('legal.police.para.otherOffense.second')}</li>
            <li>{i18n.m('legal.police.para.otherOffense.third')}</li>
            <li>{i18n.m('legal.police.para.otherOffense.fourth')}</li>
            <li>{i18n.m('legal.police.para.otherOffense.fifth')}</li>
          </ul>
        </Branch>

        <Show when={this.props.HasOtherOffenses.value === 'Yes'}>
          <Accordion
            {...this.props.List}
            defaultState={this.props.defaultState}
            scrollToBottom={this.props.scrollToBottom}
            onUpdate={this.updateList}
            onError={this.handleError}
            validator={OtherOffenseValidator}
            summary={this.summary}
            description={i18n.t('legal.police.collection.summary.title')}
            appendTitle={i18n.t('legal.police.collection.appendTitle')}
            appendMessage={this.otherOffenseBranch()}
            appendLabel={i18n.t('legal.police.collection.append')}
            required={this.props.required}
            scrollIntoView={this.props.scrollIntoView}>
            <OtherOffense
              name="Item"
              addressBooks={this.props.addressBooks}
              dispatch={this.props.dispatch}
              bind={true}
              required={this.props.required}
              scrollIntoView={this.props.scrollIntoView}
            />
          </Accordion>
        </Show>
      </div>
    )
  }
}

OtherOffenses.defaultProps = {
  List: Accordion.defaultList,
  HasOtherOffenses: {},
  onUpdate: queue => {},
  onError: (value, arr) => {
    return arr
  },
  section: 'legal',
  subsection: 'police/additionaloffenses',
  addressBooks: {},
  dispatch: action => {},
  validator: data => {
    return validate(schema('legal.police.additionaloffenses', data))
  },
  defaultState: true,
  scrollToBottom: ''
}
