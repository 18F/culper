import React from 'react'
import { i18n } from '../../../config'
import { LegalNonCriminalCourtActionsValidator } from '../../../validators'
import SubsectionElement from '../SubsectionElement'
import { Accordion, Branch, Show } from '../../Form'
import NonCriminalCourtAction from './NonCriminalCourtAction'
import { DateSummary } from '../../Summary'

export default class NonCriminalCourtActions extends SubsectionElement {
  constructor (props) {
    super(props)
    this.update = this.update.bind(this)
    this.updateHasCourtActions = this.updateHasCourtActions.bind(this)
    this.updateList = this.updateList.bind(this)
  }

  update (updateValues) {
    if (this.props.onUpdate) {
      this.props.onUpdate({
        HasCourtActions: this.props.HasCourtActions,
        List: this.props.List,
        ListBranch: this.props.ListBranch,
        ...updateValues
      })
    }
  }

  updateList (values) {
    this.update({
      List: values.items,
      ListBranch: values.branch
    })
  }

  updateHasCourtActions (values) {
    this.update({HasCourtActions: values})
  }

  summary (item, index) {
    const o = (item || {}).CourtAction || {}
    const courtName = (o.CourtName || {}).value
    const date = DateSummary(o.CivilActionDate)
    const type = i18n.t('legal.nonCriminalAction.collection.itemType')

    return (
      <span className="content">
        <span className="index">{type} {index + 1}:</span>
        <span className="courtname">
          <strong>{courtName}</strong>
        </span>
        <span className="dates"><strong>{date}</strong></span>
      </span>
    )
  }

  render () {
    return (
      <div className="non-criminal-court-actions">
        <h2>{i18n.t('legal.nonCriminalAction.heading.hasCourtActions')}</h2>
        <Branch name="HasCourtActions"
          className="has-court-actions"
          value={this.props.HasCourtActions}
          onError={this.handleError}
          onUpdate={this.updateHasCourtActions}>
        </Branch>

        <Show when={this.props.HasCourtActions === 'Yes'}>
          <Accordion minimum="1"
            defaultState={this.props.defaultState}
            items={this.props.List}
            branch={this.props.ListBranch}
            summary={this.summary}
            onUpdate={this.updateList}
            onError={this.handleError}
            description={i18n.t('legal.nonCriminalAction.collection.description')}
            appendTitle={i18n.t('legal.nonCriminalAction.collection.appendTitle')}
            appendLabel={i18n.t('legal.nonCriminalAction.collection.appendLabel')}>
            <NonCriminalCourtAction name="CourtAction" bind={true} />
          </Accordion>
        </Show>
      </div>
    )
  }
}

NonCriminalCourtActions.defaultProps = {
  List: [],
  ListBranch: '',
  onError: (value, arr) => { return arr },
  section: 'legal',
  subsection: 'court',
  dispatch: () => {},
  validator: (state, props) => {
    return new LegalNonCriminalCourtActionsValidator(props).isValid()
  }
}
