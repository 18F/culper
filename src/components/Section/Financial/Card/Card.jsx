import React from 'react'
import { i18n } from '../../../../config'
import { Summary, DateSummary } from '../../../Summary'
import schema from '../../../../schema'
import validate from '../../../../validators'
import {
  CardAbuseValidator,
  CardAbuseItemValidator
} from '../../../../validators'
import SubsectionElement from '../../SubsectionElement'
import { Branch, Show, Accordion } from '../../../Form'
import CardItem from './CardItem'

export default class Card extends SubsectionElement {
  constructor(props) {
    super(props)

    this.updateBranch = this.updateBranch.bind(this)
    this.updateList = this.updateList.bind(this)
    this.summary = this.summary.bind(this)
  }

  update(queue) {
    this.props.onUpdate({
      HasCardAbuse: this.props.HasCardAbuse,
      List: this.props.List,
      ...queue
    })
  }

  /**
   * Updates triggered by the branching component.
   */
  updateBranch(values) {
    this.update({
      HasCardAbuse: values,
      List: values.value === 'Yes' ? this.props.List : {}
    })
  }

  /**
   * Dispatch callback initiated from the collection to notify of any new
   * updates to the items.
   */
  updateList(values) {
    this.update({
      List: values
    })
  }

  /**
   * Assists in rendering the summary section.
   */
  summary(item, index) {
    const obj = item.Item || {}
    const date = obj.Date || {}
    const from = DateSummary(date)
    const agency = (obj.Agency || {}).value || ''

    return Summary({
      type: i18n.t('financial.card.collection.summary.item'),
      index: index,
      left: agency,
      right: from,
      placeholder: i18n.t('financial.card.collection.summary.unknown')
    })
  }

  render() {
    return (
      <div
        className="section-content card-abuse"
        {...super.dataAttributes(this.props)}>
        <Branch
          name="has_cardabuse"
          label={i18n.t('financial.card.title')}
          labelSize="h2"
          className="card-branch"
          {...this.props.HasCardAbuse}
          warning={true}
          onUpdate={this.updateBranch}
          required={this.props.required}
          scrollIntoView={this.props.scrollIntoView}
          onError={this.handleError}
        />
        <Show when={(this.props.HasCardAbuse || {}).value === 'Yes'}>
          <Accordion
            {...this.props.List}
            defaultState={this.props.defaultState}
            scrollToBottom={this.props.scrollToBottom}
            onUpdate={this.updateList}
            onError={this.handleError}
            summary={this.summary}
            description={i18n.t('financial.card.collection.summary.title')}
            required={this.props.required}
            validator={CardAbuseItemValidator}
            scrollIntoView={this.props.scrollIntoView}
            appendTitle={i18n.t('financial.card.collection.appendTitle')}
            appendLabel={i18n.t('financial.card.collection.append')}>
            <CardItem
              name="Item"
              bind={true}
              dispatch={this.props.dispatch}
              addressBooks={this.props.addressBooks}
              required={this.props.required}
              scrollIntoView={this.props.scrollIntoView}
            />
          </Accordion>
        </Show>
      </div>
    )
  }
}

Card.defaultProps = {
  HasCardAbuse: {},
  List: {},
  onUpdate: queue => {},
  onError: (value, arr) => {
    return arr
  },
  section: 'financial',
  subsection: 'card',
  dispatch: () => {},
  validator: data => {
    return validate(schema('financial.card', data))
  },
  defaultState: true
}
