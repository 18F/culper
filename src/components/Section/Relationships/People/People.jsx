import React from 'react'
import { i18n } from '../../../../config'
import { Accordion, ValidationElement, Branch, Show } from '../../../Form'
//import { PeopleValidator } from '../../../../validators'

export default class People extends ValidationElement {
  constructor (props) {
    super(props)

    this.state = {
      IsIncompetent: props.IsIncompetent,
      List: props.List,
      errorCodes: []
    }

    this.update = this.update.bind(this)
  }

  update (field, values) {
    this.setState({[field]: values}, () => {
      if (this.props.onUpdate) {
        this.props.onUpdate({
          List: this.state.List
        })
      }
    })
  }

  isValid () {
    return true
    //return new PeopleValidator(this.state).isValid()
  }

  handleValidation (event, status, error) {
    if (!event) {
      return
    }

    let codes = super.mergeError(this.state.errorCodes, super.flattenObject(error))
    let complexStatus = null
    if (codes.length > 0) {
      complexStatus = false
    } else if (this.isValid()) {
      complexStatus = true
    }

    this.setState({error: complexStatus === false, valid: complexStatus === true, errorCodes: codes}, () => {
      const errorObject = { [this.props.name]: codes }
      const statusObject = { [this.props.name]: { status: complexStatus } }
      super.handleValidation(event, statusObject, errorObject)
    })
  }

  summary (item, index) {
    const o = (item || {}).Person || {}
    const occurred = (o.Occurred || {}).date ? `${o.Occurred.month}/${o.Occurred.year}` : ''
    const courtName = (o.CourtName || {}).value ? `${o.CourtName.value} ${occurred}` : i18n.t('relationships.people.collection.summaryCourtName')
    const type = i18n.t('relationships.people.collection.itemType')

    return (
      <span>
        <span className="index">{type}</span>
        <span className="info"><strong>{courtName}</strong></span>
      </span>
    )
  }

  render () {
    return (
      <div className="competence">
        <h2>{i18n.t('relationships.heading.people')}</h2>
          <Accordion minimum="1"
            items={this.state.List}
            onUpdate={this.updateList}
            summary={this.summary}
            onValidate={this.handleValidation}
            description={i18n.t('relationships.people.collection.description')}
            appendTitle={i18n.t('relationships.people.collection.appendTitle')}
            appendMessage={i18n.m('relationships.people.collection.appendMessage')}
            appendLabel={i18n.t('relationships.people.collection.appendLabel')}>
            <div>Stuff</div>
          </Accordion>
      </div>
    )
  }
}

People.defaultProps = {
  List: []
}

const help = {
  heading: {
    people: 'People who know you well'
  }
}
