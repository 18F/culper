import React from 'react'
import { i18n } from '../../../../config'
import schema from '../../../../schema'
import validate, {
  CitizenshipMultipleValidator,
  CitizenshipMultiple85Validator,
  CitizenshipItemValidator,
  CitizenshipItem85Validator
} from '../../../../validators'
import { countryString } from '../../../../validators/location'
import SubsectionElement from '../../SubsectionElement'
import { Field, Branch, Show, Accordion } from '../../../Form'
import { Summary, DateSummary } from '../../../Summary'
import CitizenshipItem from './CitizenshipItem'

export default class Multiple extends SubsectionElement {
  constructor(props) {
    super(props)

    this.update = this.update.bind(this)
    this.updateHasMultiple = this.updateHasMultiple.bind(this)
    this.updateList = this.updateList.bind(this)
  }

  update(queue) {
    this.props.onUpdate({
      List: this.props.List,
      HasMultiple: this.props.HasMultiple,
      ...queue
    })
  }

  updateHasMultiple(values) {
    this.update({
      HasMultiple: values,
      List: values.value === 'Yes' ? this.props.List : []
    })
  }

  updateList(values) {
    this.update({
      List: values
    })
  }

  summaryList(item, index) {
    const itemProperties = (item || {}).Item || {}
    const dates = DateSummary(itemProperties.Dates)
    const country = countryString(itemProperties.Country) || ''
    return Summary({
      type: i18n.t('citizenship.multiple.collection.citizenship.summary.item'),
      index: index,
      left: country,
      right: dates,
      placeholder: i18n.t(
        'citizenship.multiple.collection.citizenship.summary.unknown'
      )
    })
  }

  validMinimumCitizenships() {
    const { formType } = this.props
    if (formType === '85') {
      return new CitizenshipMultiple85Validator(
        this.props
      ).validMinimumCitizenships()
    }

    return new CitizenshipMultipleValidator(
      this.props
    ).validMinimumCitizenships()
  }

  render() {
    const { formType } = this.props
    return (
      <div
        className="section-content multiple"
        {...super.dataAttributes(this.props)}>

        <Branch
          name="has_multiple"
          label={i18n.t('citizenship.multiple.heading.hasmultiple')}
          labelSize="h4"
          className="has-multiple"
          {...this.props.HasMultiple}
          warning={true}
          onUpdate={this.updateHasMultiple}
          onError={this.handleError}
          required={this.props.required}
          scrollIntoView={this.props.scrollIntoView}
        />

        <Show when={this.props.HasMultiple.value === 'Yes'}>
          <Field
            errors={[
              {
                code: 'validMinimumCitizenships',
                valid: this.validMinimumCitizenships()
              }
            ]}
            className={this.validMinimumCitizenships() && 'hidden'}
          />

          <Accordion
            {...this.props.List}
            defaultState={this.props.defaultState}
            scrollToBottom={this.props.scrollToBottom}
            onUpdate={this.updateList}
            onError={this.handleError}
            validator={{
              85: CitizenshipItem85Validator,
              86: CitizenshipItemValidator
            }[formType]}
            summary={this.summaryList}
            description={i18n.t(
              'citizenship.multiple.collection.citizenship.summary.title'
            )}
            appendTitle={i18n.t(
              'citizenship.multiple.collection.citizenship.appendTitle'
            )}
            appendLabel={i18n.t(
              'citizenship.multiple.collection.citizenship.append'
            )}
            required={this.props.required}
            scrollIntoView={this.props.scrollIntoView}>
            <CitizenshipItem
              name="Item"
              bind={true}
              required={this.props.required}
              scrollIntoView={this.props.scrollIntoView}
              formType={formType}
            />
          </Accordion>
        </Show>
      </div>
    )
  }
}

Multiple.defaultProps = {
  HasMultiple: {},
  List: { items: [], branch: {} },
  onUpdate: queue => {},
  onError: (value, arr) => {
    return arr
  },
  section: 'citizenship',
  subsection: 'multiple',
  dispatch: () => {},
  validator: data => {
    return validate(schema('citizenship.multiple', data))
  },
  defaultState: true
}
