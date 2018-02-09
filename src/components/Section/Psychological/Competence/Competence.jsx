import React from 'react'
import { i18n } from '../../../../config'
import schema from '../../../../schema'
import validate from '../../../../validators'
import { Summary, DateSummary } from '../../../Summary'
import { CompetenceValidator, CompetenceOrderValidator } from '../../../../validators'
import SubsectionElement from '../../SubsectionElement'
import { Accordion, Branch, Show } from '../../../Form'
import Order from '../Order'

export default class Competence extends SubsectionElement {
  constructor (props) {
    super(props)

    this.update = this.update.bind(this)
    this.updateIsIncompentent = this.updateIsIncompentent.bind(this)
    this.updateList = this.updateList.bind(this)
  }

  update (queue) {
    this.props.onUpdate({
      List: this.props.List,
      IsIncompetent: this.props.IsIncompetent,
      ...queue
    })
  }

  updateList (values) {
    this.update({
      List: values
    })
  }

  updateIsIncompentent (values) {
    this.update({
      IsIncompetent: values,
      List: values.value === 'Yes' ? this.props.List : []
    })
  }

  summary (item, index) {
    const o = (item || {}).Item || {}
    const occurred = DateSummary(o.Occurred || {})
    const courtName = (o.CourtName || {}).value || ''

    return Summary({
      type: i18n.t('psychological.competence.collection.itemType'),
      index: index,
      left: courtName,
      right: occurred,
      placeholder: i18n.m('psychological.competence.collection.summaryCourtName')
    })
  }

  render () {
    return (
      <div className="competence">
        <Branch name="is_incompetent"
                label={i18n.t('psychological.heading.competence')}
                labelSize="h2"
                {...this.props.IsIncompetent}
                warning={true}
                onError={this.handleError}
                required={this.props.required}
                onUpdate={this.updateIsIncompentent}
                scrollIntoView={this.props.scrollIntoView}>
        </Branch>

        <Show when={this.props.IsIncompetent.value === 'Yes'}>
          <Accordion defaultState={this.props.defaultState}
                     {...this.props.List}
                     scrollToBottom={this.props.scrollToBottom}
                     summary={this.summary}
                     onUpdate={this.updateList}
                     onError={this.handleError}
                     validator={CompetenceOrderValidator}
                     description={i18n.t('psychological.competence.collection.description')}
                     appendTitle={i18n.t('psychological.competence.collection.appendTitle')}
                     appendLabel={i18n.t('psychological.competence.collection.appendLabel')}
                     required={this.props.required}
                     scrollIntoView={this.props.scrollIntoView}>
            <Order name="Item"
                   prefix="competence"
                   addressBooks={this.props.addressBooks}
                   dispatch={this.props.dispatch}
                   required={this.props.required}
                   scrollIntoView={this.props.scrollIntoView}
                   bind={true} />
          </Accordion>
        </Show>
      </div>
    )
  }
}

Competence.defaultProps = {
  IsIncompetent: {},
  List: Accordion.defaultList,
  defaultState: true,
  onUpdate: (queue) => {},
  onError: (value, arr) => { return arr },
  section: 'psychological',
  subsection: 'competence',
  addressBooks: {},
  dispatch: () => {},
  validator: (state, props) => {
    return validate(schema('psychological.competence', props))
  },
  scrollToBottom: ''
}
