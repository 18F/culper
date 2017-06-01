import React from 'react'
import { i18n } from '../../../../config'
import { MilitaryDisciplinaryValidator } from '../../../../validators'
import SubsectionElement from '../../SubsectionElement'
import { Branch, Show, Accordion } from '../../../Form'
import Procedure from './Procedure'

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

export default class Disciplinary extends SubsectionElement {
  constructor (props) {
    super(props)

    this.state = {
      HasDisciplinary: props.HasDisciplinary,
      List: props.List,
      ListBranch: props.ListBranch
    }

    this.onUpdate = this.onUpdate.bind(this)
    this.updateDisciplinary = this.updateDisciplinary.bind(this)
    this.updateList = this.updateList.bind(this)
  }

  onUpdate (name, values) {
    this.setState({ [name]: values }, () => {
      sendUpdate(this.props.onUpdate, this.props.name, this.state)
    })
  }

  updateDisciplinary (value, event) {
    this.onUpdate('HasDisciplinary', value)

    // If there is no history clear out any previously entered data
    if (value === 'No') {
      this.onUpdate('List', [])
    }
  }

  updateList (values) {
    this.onUpdate('List', values.items)
    this.onUpdate('ListBranch', values.branch)
  }

  /**
   * Assists in rendering the summary section.
   */
  summary (item, index) {
    const itemProperties = (item || {}).Item || {}
    const service = itemProperties.Name && itemProperties.Name.value
          ? itemProperties.Name.value
          : i18n.t('military.disciplinary.collection.summary.unknown')
    const dates = itemProperties.Date && itemProperties.Date.date
          ? `${itemProperties.Date.month}/${itemProperties.Date.year}`
          : ''

    return (
      <span>
        <span className="index">{i18n.t('military.disciplinary.collection.summary.item')} {index + 1}:</span>
        <span><strong>{service}</strong></span>
        <span className="dates"><strong>{dates}</strong></span>
      </span>
    )
  }

  render () {
    return (
      <div className="disciplinary">
        <Branch name="has_disciplinary"
                value={this.state.HasDisciplinary}
                help="military.disciplinary.help.branch"
                onUpdate={this.updateDisciplinary}
                onError={this.handleError}>
        </Branch>

        <Show when={this.state.HasDisciplinary === 'Yes'}>
          <Accordion minimum="1"
                     items={this.state.List}
                     branch={this.state.ListBranch}
                     onUpdate={this.updateList}
                     onError={this.handleError}
                     summary={this.summary}
                     description={i18n.t('military.disciplinary.collection.summary.title')}
                     appendTitle={i18n.t('military.disciplinary.collection.appendTitle')}
                     appendMessage={i18n.m('military.disciplinary.collection.appendMessage')}
                     appendLabel={i18n.t('military.disciplinary.collection.append')}>
            <Procedure name="Item"
                       bind={true}
                       />
          </Accordion>
        </Show>
      </div>
    )
  }
}

Disciplinary.defaultProps = {
  onError: (value, arr) => { return arr },
  section: 'military',
  subsection: 'disciplinary',
  dispatch: () => {},
  validator: (state, props) => {
    return new MilitaryDisciplinaryValidator(state, props).isValid()
  }
}
