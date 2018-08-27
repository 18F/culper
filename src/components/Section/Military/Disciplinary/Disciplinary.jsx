import React from 'react'
import { i18n } from '../../../../config'
import schema from '../../../../schema'
import validate from '../../../../validators'
import { Summary, DateSummary } from '../../../Summary'
import {
  MilitaryDisciplinaryValidator,
  ProcedureValidator
} from '../../../../validators'
import SubsectionElement from '../../SubsectionElement'
import { Branch, Show, Accordion } from '../../../Form'
import Procedure from './Procedure'

export default class Disciplinary extends SubsectionElement {
  constructor(props) {
    super(props)

    this.update = this.update.bind(this)
    this.updateDisciplinary = this.updateDisciplinary.bind(this)
    this.updateList = this.updateList.bind(this)
  }

  update(queue) {
    this.props.onUpdate({
      HasDisciplinary: this.props.HasDisciplinary,
      List: this.props.List,
      ...queue
    })
  }

  updateDisciplinary(values) {
    // If there is no history clear out any previously entered data
    this.update({
      HasDisciplinary: values,
      List: values.value === 'Yes' ? this.props.List : { items: [], branch: {} }
    })
  }

  updateList(values) {
    this.update({
      List: values
    })
  }

  /**
   * Assists in rendering the summary section.
   */
  summary(item, index) {
    const itemProperties = (item || {}).Item || {}
    const dates = DateSummary(itemProperties.Date)
    const service =
      itemProperties.Name && itemProperties.Name.value
        ? itemProperties.Name.value
        : ''

    return Summary({
      type: i18n.t('military.disciplinary.collection.summary.item'),
      index: index,
      left: service,
      right: dates,
      placeholder: i18n.t('military.disciplinary.collection.summary.unknown')
    })
  }

  render() {
    return (
      <div
        className="section-content disciplinary"
        {...super.dataAttributes(this.props)}>
        <Branch
          name="has_disciplinary"
          label={i18n.t('military.disciplinary.para.info')}
          labelSize="h2"
          {...this.props.HasDisciplinary}
          weight={true}
          onUpdate={this.updateDisciplinary}
          required={this.props.required}
          onError={this.handleError}
          scrollIntoView={this.props.scrollIntoView}
        />

        <Show when={this.props.HasDisciplinary.value === 'Yes'}>
          <Accordion
            {...this.props.List}
            defaultState={this.props.defaultState}
            scrollToBottom={this.props.scrollToBottom}
            onUpdate={this.updateList}
            onError={this.handleError}
            validator={ProcedureValidator}
            summary={this.summary}
            description={i18n.t(
              'military.disciplinary.collection.summary.title'
            )}
            appendTitle={i18n.t('military.disciplinary.collection.appendTitle')}
            appendLabel={i18n.t('military.disciplinary.collection.append')}
            required={this.props.required}
            scrollIntoView={this.props.scrollIntoView}>
            <Procedure
              name="Item"
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
  HasDisciplinary: {},
  List: { items: [] },
  onUpdate: queue => {},
  onError: (value, arr) => {
    return arr
  },
  section: 'military',
  subsection: 'disciplinary',
  dispatch: () => {},
  validator: data => {
    return validate(schema('military.disciplinary', data))
  },
  defaultState: true
}
