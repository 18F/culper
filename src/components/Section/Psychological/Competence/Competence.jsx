import React from 'react'
import { i18n } from '../../../../config'
import { Accordion, ValidationElement, Branch, Show } from '../../../Form'
import CompetenceItem from './CompetenceItem'

export default class Competence extends ValidationElement {
  constructor (props) {
    super(props)

    this.state = {
      IsIncompetent: props.IsIncompetent,
      List: props.List
    }

    this.update = this.update.bind(this)
    this.updateIsIncompentent = this.updateIsIncompentent.bind(this)
    this.updateList = this.updateList.bind(this)
  }

  update (field, values) {
    this.setState({[field]: values}, () => {
      if (this.props.onUpdate) {
        this.props.onUpdate({
          IsIncompetent: this.state.IsIncompetent,
          List: this.state.List
        })
      }
    })
  }

  updateList (values) {
    this.update('List', values)
  }

  updateIsIncompentent (values) {
    this.update('IsIncompetent', values)
  }

  summary (item, index) {
    const o = (item || {}).Competence || {}
    const occurred = (o.Occurred || {}).date ? `${o.Occurred.month}/${o.Occurred.year}` : ''
    const courtName = (o.CourtName || {}).value ? `${o.CourtName.value} ${occurred}` : i18n.t('psychological.competence.collection.summaryCourtName')

    return (
      <span>
        <span className="index">Order:</span>
        <span className="info"><strong>{courtName}</strong></span>
      </span>
    )
  }

  render () {
    return (
      <div className="competence">
        <h2>{i18n.t('psychological.heading.competence')}</h2>
        <Branch name="is_incompetent"
          className="eapp-field-wrap no-label "
          value={this.state.IsIncompetent}
          help="psychological.competence.help.incompetent"
          onUpdate={this.updateIsIncompentent}>
        </Branch>

        <Show when={this.state.IsIncompetent === 'Yes'}>
          <Accordion minimum="1"
            items={this.state.List}
            onUpdate={this.updateList}
            summary={this.summary}
            description={i18n.t('psychological.competence.collection.description')}
            appendTitle={i18n.t('psychological.competence.collection.appendTitle')}
            appendMessage={i18n.m('psychological.competence.collection.appendMessage')}
            appendLabel={i18n.t('psychological.competence.collection.appendLabel')}>
            <CompetenceItem name="Competence" bind={true} />
          </Accordion>

        </Show>
      </div>
    )
  }
}

Competence.defaultProps = {
  List: []
}
