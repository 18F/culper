import React from 'react'
import { i18n } from '../../../../config'
import { RelativesValidator } from '../../../../validators'
import { ValidationElement, Show, Accordion, Checkbox, CheckboxGroup, Field } from '../../../Form'
import Relative from './Relative'

/**
 * Convenience function to send updates along their merry way
 */
const sendUpdate = (fn, name, props) => {
  if (fn) {
    fn({
      name: name,
      ...props
    })
  }
}

export default class Relatives extends ValidationElement {
  constructor (props) {
    super(props)
    this.state = {
      List: props.List,
      ListBranch: props.ListBranch,
      errorCodes: []
    }

    this.onUpdate = this.onUpdate.bind(this)
    this.updateList = this.updateList.bind(this)
  }

  onUpdate (name, values, fn) {
    this.setState({ [name]: values }, () => {
      sendUpdate(this.props.onUpdate, this.props.name, this.state)

      if (fn) {
        fn()
      }
    })
  }

  updateList (values) {
    this.onUpdate('List', values.items)
    this.onUpdate('ListBranch', values.branch)
  }

  /**
   * Handle the validation event.
   */
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
      if (this.state.error === false || this.state.valid === true) {
        super.handleValidation(event, statusObject, errorObject)
        return
      }

      super.handleValidation(event, statusObject, errorObject)
    })
  }

  /**
   * Determine if all items in the collection are considered to be in
   * a valid state.
   */
  isValid () {
    return new RelativesValidator(this.status, null).isValid()
  }

  /**
   * Assists in rendering the summary section.
   */
  summary (item, index) {
    const o = (item || {}).Item || {}
    const relation = (o.Relations || []).length > 0
          ? o.Relations[0]
          : i18n.t('relationships.relatives.collection.summary.item')
    const name = o.Name
          ? `${o.Name.first || ''} ${o.Name.middle || ''} ${o.Name.last || ''}`.trim()
          : i18n.t('relationships.relatives.collection.summary.unknown')

    return (
      <span>
        <span className="index">{relation}:</span>
        <span className="info"><strong>{name}</strong></span>
      </span>
    )
  }

  render () {
    return (
      <div className="relatives">
        <h2>{i18n.t('relationships.relatives.heading.title')}</h2>
        {i18n.m('relationships.relatives.para.opportunity')}

        <Accordion minimum="1"
                   items={this.state.List}
                   branch={this.state.ListBranch}
                   onUpdate={this.updateList}
                   onValidate={this.handleValidation}
                   summary={this.summary}
                   description={i18n.t('relationships.relatives.collection.summary.title')}
                   appendTitle={i18n.t('relationships.relatives.collection.appendTitle')}
                   appendLabel={i18n.t('relationships.relatives.collection.append')}>
          <Relative name="Item"
                    bind={true}
                    />
        </Accordion>
      </div>
    )
  }
}

Relatives.defaultProps = {
  List: [],
  ListBranch: ''
}
