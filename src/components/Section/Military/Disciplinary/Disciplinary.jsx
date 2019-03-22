import React from 'react'

import i18n from 'util/i18n'

import { MILITARY, MILITARY_DISCIPLINARY } from 'config/formSections/military'
import * as formConfig from 'config/forms'

import schema from 'schema'
import validate, { ProcedureValidator } from 'validators'

import { Summary, DateSummary } from 'components/Summary'
import { Branch, Show, Accordion } from 'components/Form'
import Subsection from 'components/Section/shared/Subsection'
import Procedure from 'components/Section/Military/Disciplinary/Procedure'

import connectMilitarySection from 'components/Section/Military/MilitaryConnector'

const sectionConfig = {
  section: MILITARY.name,
  store: MILITARY.store,
  subsection: MILITARY_DISCIPLINARY.name,
  storeKey: MILITARY_DISCIPLINARY.storeKey,
}

class Disciplinary extends Subsection {
  constructor(props) {
    super(props)

    const {
      section, subsection, store, storeKey,
    } = sectionConfig

    this.section = section
    this.subsection = subsection
    this.store = store
    this.storeKey = storeKey

    this.update = this.update.bind(this)
    this.updateDisciplinary = this.updateDisciplinary.bind(this)
    this.updateList = this.updateList.bind(this)
  }

  update(queue) {
    this.props.onUpdate(this.storeKey, {
      HasDisciplinary: this.props.HasDisciplinary,
      List: this.props.List,
      ...queue,
    })
  }

  updateDisciplinary(values) {
    // If there is no history clear out any previously entered data
    this.update({
      HasDisciplinary: values,
      List: values.value === 'Yes' ? this.props.List : { items: [], branch: {} },
    })
  }

  updateList(values) {
    this.update({
      List: values,
    })
  }

  /**
   * Assists in rendering the summary section.
   */
  summary = (item, index) => {
    const itemProperties = (item || {}).Item || {}
    const dates = DateSummary(itemProperties.Date)
    const service = itemProperties.Name && itemProperties.Name.value
      ? itemProperties.Name.value
      : ''

    return Summary({
      type: i18n.t('military.disciplinary.collection.summary.item'),
      index,
      left: service,
      right: dates,
      placeholder: i18n.t('military.disciplinary.collection.summary.unknown'),
    })
  }

  render() {
    const { formType } = this.props
    const formTypeConfig = formType && formConfig[formType]
    const years = formTypeConfig && formTypeConfig.MILITARY_DISCIPLINARY_RECORD_YEARS

    return (
      <div
        className="section-content disciplinary"
        {...super.dataAttributes(this.props)}
      >
        <h1 className="section-header">{i18n.t('military.destination.disciplinary')}</h1>
        <Branch
          name="has_disciplinary"
          label={i18n.t('military.disciplinary.para.info', { years })}
          labelSize="h4"
          {...this.props.HasDisciplinary}
          weight
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
              'military.disciplinary.collection.summary.title',
            )}
            appendTitle={i18n.t('military.disciplinary.collection.appendTitle', { years })}
            appendLabel={i18n.t('military.disciplinary.collection.append', { years })}
            required={this.props.required}
            scrollIntoView={this.props.scrollIntoView}
          >
            <Procedure
              name="Item"
              bind
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
  onUpdate: () => {},
  onError: (value, arr) => arr,
  section: 'military',
  subsection: 'disciplinary',
  dispatch: () => {},
  validator: data => validate(schema('military.disciplinary', data)),
  defaultState: true,
}

export default connectMilitarySection(Disciplinary, sectionConfig)
