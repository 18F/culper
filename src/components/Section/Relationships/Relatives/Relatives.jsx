import React from 'react'
import { i18n } from '../../../../config'
import { RelativesValidator } from '../../../../validators'
import SubsectionElement from '../../SubsectionElement'
import { Accordion } from '../../../Form'
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

export default class Relatives extends SubsectionElement {
  constructor (props) {
    super(props)

    this.state = {
      List: props.List,
      ListBranch: props.ListBranch
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
                   defaultState={this.props.defaultState}
                   branch={this.state.ListBranch}
                   onUpdate={this.updateList}
                   onError={this.handleError}
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
  ListBranch: '',
  onError: (value, arr) => { return arr },
  section: 'relationships',
  subsection: 'relatives',
  dispatch: () => {},
  validator: (state, props) => {
    return new RelativesValidator(state, props).isValid()
  },
  defaultState: true
}
