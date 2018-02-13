import React from 'react'
import { i18n } from '../../../../config'
import schema from '../../../../schema'
import { Summary, NameSummary, DateSummary } from '../../../Summary'
import validate, { OtherNameValidator } from '../../../../validators'
import SubsectionElement from '../../SubsectionElement'
import { Field, Accordion, Textarea, DateRange, Branch, Show } from '../../../Form'
import OtherNameItem from './OtherNameItem'

export default class OtherNames extends SubsectionElement {
  constructor (props) {
    super(props)

    this.update = this.update.bind(this)
    this.updateBranch = this.updateBranch.bind(this)
    this.updateList = this.updateList.bind(this)
  }

  update (queue) {
    this.props.onUpdate({
      List: this.props.List,
      HasOtherNames: this.props.HasOtherNames,
      ...queue
    })
  }

  updateBranch (values) {
    this.update({
      HasOtherNames: values,
      List: values.value === 'Yes' ? this.props.List : { items: [], branch: {} }
    })
  }

  updateList (values) {
    this.update({
      List: values
    })
  }

  /**
   * Assists in rendering the summary section.
   */
  summary (item, index) {
    const itemObj = item.Item || {}
    const dates = DateSummary(itemObj.DatesUsed)
    const name = NameSummary(itemObj.Name)

    return Summary({
      type: i18n.t('identification.othernames.collection.summary.name'),
      index: index,
      left: name,
      right: dates,
      placeholder: i18n.m('identification.othernames.collection.summary.unknown')
    })
  }

  render () {
    return (
      <div className="other-names">
        <Field title={i18n.t('identification.othernames.title')}
               titleSize="h2"
               optional={true}
               help="identification.othernames.branch.help"
               className="no-margin-bottom">
          {i18n.m('identification.othernames.info')}
        </Field>

        <Branch name="has_othernames"
                label={i18n.t('identification.othernames.branch.question')}
                labelSize="h3"
                {...this.props.HasOtherNames}
                warning={true}
                onUpdate={this.updateBranch}
                required={this.props.required}
                scrollIntoView={this.props.scrollIntoView}
                onError={this.handleError}>
        </Branch>
        <Show when={this.props.HasOtherNames.value === 'Yes'}>
          <Accordion {...this.props.List}
                     defaultState={this.props.defaultState}
                     onUpdate={this.updateList}
                     onError={this.handleError}
                     required={this.props.required}
                     scrollIntoView={this.props.scrollIntoView}
                     validator={OtherNameValidator}
                     summary={this.summary}
                     description={i18n.t('identification.othernames.collection.summary.title')}
                     appendTitle={i18n.t('identification.othernames.collection.appendTitle')}
                     appendLabel={i18n.t('identification.othernames.collection.append')}>
            <OtherNameItem name="Item"
                           required={this.props.required}
                           scrollIntoView={this.props.scrollIntoView}
                           bind={true}
                           />
          </Accordion>
        </Show>
      </div>
    )
  }
}

OtherNames.defaultProps = {
  List: Accordion.defaulList,
  HasOtherNames: {},
  onUpdate: (queue) => {},
  onError: (value, arr) => { return arr },
  section: 'identification',
  subsection: 'othernames',
  dispatch: () => {},
  validator: (data) => {
    return validate(schema('identification.othernames', data))
  },
  defaultState: true,
  required: false
}
