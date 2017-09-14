import React from 'react'
import { i18n } from '../../../config'
import { LegalNonCriminalCourtActionsValidator, NonCriminalCourtActionValidator } from '../../../validators'
import SubsectionElement from '../SubsectionElement'
import { Accordion, Branch, Show } from '../../Form'
import NonCriminalCourtAction from './NonCriminalCourtAction'
import { Summary, DateSummary } from '../../Summary'

export default class NonCriminalCourtActions extends SubsectionElement {
  constructor (props) {
    super(props)
    this.update = this.update.bind(this)
    this.updateHasCourtActions = this.updateHasCourtActions.bind(this)
    this.updateList = this.updateList.bind(this)
  }

  update (queue) {
    this.props.onUpdate({
      HasCourtActions: this.props.HasCourtActions,
      List: this.props.List,
      ListBranch: this.props.ListBranch,
      ...queue
    })
  }

  updateList (values) {
    this.update({
      List: values.items,
      ListBranch: values.branch
    })
  }

  updateHasCourtActions (values) {
    this.update({
      HasCourtActions: values,
      List: values === 'Yes' ? this.props.List : [],
      ListBranch: values === 'Yes' ? this.props.ListBranch : ''
    })
  }

  summary (item, index) {
    const o = (item || {}).Item || {}
    const date = DateSummary(o.CivilActionDate)
    const courtName = (o.CourtName || {}).value || ''

    return Summary({
      type: i18n.t('legal.nonCriminalAction.collection.itemType'),
      index: index,
      left: courtName,
      right: date,
      placeholder: i18n.m('legal.nonCriminalAction.collection.summary')
    })
  }

  render () {
    return (
      <div className="non-criminal-court-actions">
        <h2>{i18n.t('legal.nonCriminalAction.heading.hasCourtActions')}</h2>
        <Branch name="HasCourtActions"
                className="has-court-actions"
                value={this.props.HasCourtActions}
                warning={true}
                onError={this.handleError}
                required={this.props.required}
                onUpdate={this.updateHasCourtActions}
                scrollIntoView={this.props.scrollIntoView}>
        </Branch>

        <Show when={this.props.HasCourtActions === 'Yes'}>
          <Accordion defaultState={this.props.defaultState}
                     items={this.props.List}
                     scrollToBottom={this.props.scrollToBottom}
                     branch={this.props.ListBranch}
                     summary={this.summary}
                     onUpdate={this.updateList}
                     onError={this.handleError}
                     validator={NonCriminalCourtActionValidator}
                     description={i18n.t('legal.nonCriminalAction.collection.description')}
                     appendTitle={i18n.t('legal.nonCriminalAction.collection.appendTitle')}
                     appendLabel={i18n.t('legal.nonCriminalAction.collection.appendLabel')}
                     required={this.props.required}
                     scrollIntoView={this.props.scrollIntoView}>
        <NonCriminalCourtAction name="Item"
                                bind={true}
                                addressBooks={this.props.addressBooks}
                                dispatch={this.props.dispatch}
                                required={this.props.required}
                                scrollIntoView={this.props.scrollIntoView} />
          </Accordion>
        </Show>
      </div>
    )
  }
}

NonCriminalCourtActions.defaultProps = {
  List: [],
  ListBranch: '',
  onUpdate: (queue) => {},
  onError: (value, arr) => { return arr },
  section: 'legal',
  subsection: 'court',
  addressBooks: {},
  dispatch: (action) => {},
  validator: (state, props) => {
    return new LegalNonCriminalCourtActionsValidator(props).isValid()
  },
  scrollToBottom: ''
}
