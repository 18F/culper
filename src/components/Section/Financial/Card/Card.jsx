import React from 'react'
import { i18n } from '../../../../config'
import { Summary, DateSummary } from '../../../Summary'
import schema from '../../../../schema'
import validate from '../../../../validators'
import { CardAbuseValidator, CardAbuseItemValidator } from '../../../../validators'
import SubsectionElement from '../../SubsectionElement'
import { Branch, Show, Accordion } from '../../../Form'
import CardItem from './CardItem'

export default class Card extends SubsectionElement {
  constructor (props) {
    super(props)

    this.state = {
      HasCardAbuse: props.HasCardAbuse,
      List: props.List,
      ListBranch: props.ListBranch
    }

    this.updateBranch = this.updateBranch.bind(this)
    this.updateList = this.updateList.bind(this)
    this.summary = this.summary.bind(this)
  }

  /**
   * Updates triggered by the branching component.
   */
  updateBranch (val, event) {
    this.setState({ HasCardAbuse: val }, () => {
      this.updateList({
        items: val === 'Yes' ? this.state.List : [],
        branch: ''
      })
    })
  }

  /**
   * Dispatch callback initiated from the collection to notify of any new
   * updates to the items.
   */
  updateList (values) {
    this.setState({ List: values.items, ListBranch: values.branch }, () => {
      if (this.props.onUpdate) {
        this.props.onUpdate({
          List: this.state.List,
          ListBranch: this.state.ListBranch,
          HasCardAbuse: this.state.HasCardAbuse
        })
      }
    })
  }

  /**
   * Assists in rendering the summary section.
   */
  summary (item, index) {
    const obj = (item.Item || {})
    const date = (obj.Date || {})
    const from = DateSummary({date: date})
    const agency = (obj.Agency || {}).value || ''

    return Summary({
      type: i18n.t('financial.card.collection.summary.item'),
      index: index,
      left: agency,
      right: from,
      placeholder: i18n.m('financial.card.collection.summary.unknown')
    })
  }

  render () {
    return (
      <div className="card-abuse">
        <Branch name="has_cardabuse"
                label={i18n.t('financial.card.title')}
                labelSize="h2"
                className="card-branch"
                value={this.state.HasCardAbuse}
                warning={true}
                onUpdate={this.updateBranch}
                required={this.props.required}
                scrollIntoView={this.props.scrollIntoView}
                onError={this.handleError}>
        </Branch>
        <Show when={this.state.HasCardAbuse === 'Yes'}>
          <Accordion items={this.state.List}
                     defaultState={this.props.defaultState}
                     scrollToBottom={this.props.scrollToBottom}
                     branch={this.state.ListBranch}
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
  HasCardAbuse: '',
  List: [],
  ListBranch: '',
  onError: (value, arr) => { return arr },
  section: 'financial',
  subsection: 'card',
  dispatch: () => {},
  validator: (state, props) => {
    return validate(schema('financial.card', props))
  },
  defaultState: true
}
