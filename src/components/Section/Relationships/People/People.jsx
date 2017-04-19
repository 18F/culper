import React from 'react'
import { i18n } from '../../../../config'
import { Accordion, ValidationElement }  from '../../../Form'
import Person from './Person'
//import { PeopleValidator } from '../../../../validators'

export default class People extends ValidationElement {
  constructor (props) {
    super(props)

    this.state = {
      List: props.List,
      errorCodes: []
    }

    this.update = this.update.bind(this)
    this.updateList = this.updateList.bind(this)
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

  updateList (values) {
    this.update('List', values)
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
    const name = o.Name
      ? `${o.Name.first || ''} ${o.Name.middle || ''} ${o.Name.last || ''}`.trim()
      : i18n.t('relationships.people.person.collection.summary.unknown')
    const type = i18n.t('relationships.people.person.collection.itemType')

    return (
      <span>
        <span className="index">{type} {index + 1}:</span>
        <span className="info"><strong>{name}</strong></span>
      </span>
    )
  }

  render () {
    return (
      <div className="competence">
        <h2>{i18n.t('relationships.people.heading.title')}</h2>
        {i18n.m('relationships.people.para.intro')}
          <Accordion minimum="1"
            items={this.state.List}
            onUpdate={this.updateList}
            summary={this.summary}
            onValidate={this.handleValidation}
            description={i18n.t('relationships.people.person.collection.description')}
            appendTitle={i18n.t('relationships.people.person.collection.appendTitle')}
            appendMessage={i18n.m('relationships.people.person.collection.appendMessage')}
            appendLabel={i18n.t('relationships.people.person.collection.appendLabel')}>
            <Person name="Person" bind={true} />
          </Accordion>
      </div>
    )
  }
}

People.defaultProps = {
  List: []
}
