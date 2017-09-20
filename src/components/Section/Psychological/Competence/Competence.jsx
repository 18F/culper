import React from 'react'
import { i18n } from '../../../../config'
import schematize from '../../../../schema'
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
      ListBranch: this.props.ListBranch,
      IsIncompetent: this.props.IsIncompetent,
      ...queue
    })
  }

  updateList (values) {
    this.update({
      List: values.items,
      ListBranch: values.branch
    })
  }

  updateIsIncompentent (values) {
    this.update({
      IsIncompetent: values,
      List: values === 'Yes' ? this.props.List : [],
      ListBranch: values === 'Yes' ? this.props.ListBranch : ''
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
                value={this.props.IsIncompetent}
                warning={true}
                onError={this.handleError}
                required={this.props.required}
                onUpdate={this.updateIsIncompentent}
                scrollIntoView={this.props.scrollIntoView}>
        </Branch>

        <Show when={this.props.IsIncompetent === 'Yes'}>
          <Accordion defaultState={this.props.defaultState}
                     items={this.props.List}
                     scrollToBottom={this.props.scrollToBottom}
                     branch={this.props.ListBranch}
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
                   ApplicantBirthDate={this.props.ApplicantBirthDate}
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
  IsIncompetent: '',
  List: [],
  ListBranch: '',
  defaultState: true,
  onUpdate: (queue) => {},
  onError: (value, arr) => { return arr },
  section: 'psychological',
  subsection: 'competence',
  addressBooks: {},
  dispatch: () => {},
  validator: (state, props) => {
    return validate(schematize('psychological.competence', props))
  },
  scrollToBottom: ''
}
