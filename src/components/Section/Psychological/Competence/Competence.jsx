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

  render () {
    return (
      <div className="competence">
        <h2>Has a court or administrative agency ever issued an order declaring you mentally incompetent</h2>
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
            summary={() => { return <div>SUmmary</div> } }
            description={i18n.t('legal.police.collection.summary.title')}
            appendTitle={i18n.t('legal.police.collection.appendTitle')}
            appendMessage={<span>Append message</span>}
            appendLabel={<span>Label</span>}>

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
