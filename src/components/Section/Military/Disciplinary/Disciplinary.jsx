import React from 'react'
import { i18n } from '../../../../config'
import schema from '../../../../schema'
import validate from '../../../../validators'
import { Summary, DateSummary } from '../../../Summary'
import { MilitaryDisciplinaryValidator, ProcedureValidator } from '../../../../validators'
import SubsectionElement from '../../SubsectionElement'
import { Branch, Show, Accordion } from '../../../Form'
import Procedure from './Procedure'

export default class Disciplinary extends SubsectionElement {
  constructor (props) {
    super(props)

    this.update = this.update.bind(this)
    this.updateDisciplinary = this.updateDisciplinary.bind(this)
    this.updateList = this.updateList.bind(this)
  }

  update (queue) {
    this.props.onUpdate({
      HasDisciplinary: this.props.HasDisciplinary,
      List: this.props.List,
      ListBranch: this.props.ListBranch,
      ...queue
    })
  }

  updateDisciplinary (value, event) {
    // If there is no history clear out any previously entered data
    this.update({
      HasDisciplinary: value,
      List: value === 'Yes' ? this.props.List : [],
      ListBranch: value === 'Yes' ? this.props.ListBranch : ''
    })
  }

  updateList (values) {
    this.update({
      List: values.items,
      ListBranch: values.branch
    })
  }

  /**
   * Assists in rendering the summary section.
   */
  summary (item, index) {
    const itemProperties = (item || {}).Item || {}
    const dates = DateSummary(itemProperties.Date)
    const service = itemProperties.Name && itemProperties.Name.value ? itemProperties.Name.value : ''

    return Summary({
      type: i18n.t('military.disciplinary.collection.summary.item'),
      index: index,
      left: service,
      right: dates,
      placeholder: i18n.m('military.disciplinary.collection.summary.unknown')
    })
  }

  render () {
    return (
      <div className="disciplinary">
        <Branch name="has_disciplinary"
                label={i18n.t('military.disciplinary.heading.title')}
                labelSize="h2"
                value={this.props.HasDisciplinary}
                weight={true}
                onUpdate={this.updateDisciplinary}
                required={this.props.required}
                onError={this.handleError}
                scrollIntoView={this.props.scrollIntoView}>
            {i18n.m('military.disciplinary.para.info')}
        </Branch>

        <Show when={this.props.HasDisciplinary === 'Yes'}>
          <Accordion items={this.props.List}
                     defaultState={this.props.defaultState}
                     scrollToBottom={this.props.scrollToBottom}
                     branch={this.props.ListBranch}
                     onUpdate={this.updateList}
                     onError={this.handleError}
                     validator={ProcedureValidator}
                     summary={this.summary}
                     description={i18n.t('military.disciplinary.collection.summary.title')}
                     appendTitle={i18n.t('military.disciplinary.collection.appendTitle')}
                     appendLabel={i18n.t('military.disciplinary.collection.append')}
                     required={this.props.required}
                     scrollIntoView={this.props.scrollIntoView}>
            <Procedure name="Item"
                       bind={true}
                       required={this.props.required}
                       scrollIntoView={this.props.scrollIntoView}
                       />
          </Accordion>
        </Show>
      </div>
    )
  }
}

Disciplinary.defaultProps = {
  onUpdate: (queue) => {},
  onError: (value, arr) => { return arr },
  section: 'military',
  subsection: 'disciplinary',
  dispatch: () => {},
  validator: (state, props) => {
    return validate(schema('military.disciplinary', props))
  },
  defaultState: true
}
