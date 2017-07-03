import React from 'react'
import { i18n } from '../../../../config'
import { CitizenshipMultipleValidator } from '../../../../validators'
import SubsectionElement from '../../SubsectionElement'
import { Branch, Show, Accordion } from '../../../Form'
import { DateSummary } from '../../../Summary'
import CitizenshipItem from './CitizenshipItem'

export default class Multiple extends SubsectionElement {
  constructor (props) {
    super(props)

    this.update = this.update.bind(this)
    this.updateHasMultiple = this.updateHasMultiple.bind(this)
    this.updateCitizenships = this.updateCitizenships.bind(this)
  }

  update (queue) {
    this.props.onUpdate({
      Citizenships: this.props.Citizenships,
      CitizenshipsBranch: this.props.CitizenshipsBranch,
      HasMultiple: this.props.HasMultiple,
      ...queue
    })
  }

  updateHasMultiple (values) {
    this.update({
      HasMultiple: values,
      Citizenships: values === 'Yes' ? this.props.Citizenships : [],
      CitizenshipsBranch: values === 'Yes' ? this.props.CitizenshipsBranch : ''
    })
  }

  updateCitizenships (values) {
    this.update({
      Citizenships: values.items,
      CitizenshipsBranch: values.branch
    })
  }

  summaryCitizenships (item, index) {
    const itemProperties = (item || {}).Item || {}
    const country = itemProperties.Country && itemProperties.Country.value
          ? itemProperties.Country.value
          : i18n.t('citizenship.multiple.collection.citizenship.summary.unknown')
    const dates = DateSummary(itemProperties.Dates)

    return (
      <span>
        <span className="index">{i18n.t('citizenship.multiple.collection.citizenship.summary.item')} {index + 1}:</span>
        <span><strong>{country}</strong></span>
        <span className="dates"><strong>{dates}</strong></span>
      </span>
    )
  }

  render () {
    return (
      <div className="multiple">
        <Branch name="has_multiple"
                label={i18n.t('citizenship.multiple.heading.hasmultiple')}
                labelSize="h3"
                className="has-multiple"
                value={this.props.HasMultiple}
                warning={true}
                onUpdate={this.updateHasMultiple}
                onError={this.handleError}
                />

        <Show when={this.props.HasMultiple === 'Yes'}>
          <Accordion items={this.props.Citizenships}
                     defaultState={this.props.defaultState}
                     branch={this.props.CitizenshipsBranch}
                     onUpdate={this.updateCitizenships}
                     onError={this.handleError}
                     summary={this.summaryCitizenships}
                     description={i18n.t('citizenship.multiple.collection.citizenship.summary.title')}
                     appendTitle={i18n.t('citizenship.multiple.collection.citizenship.appendTitle')}
                     appendLabel={i18n.t('citizenship.multiple.collection.citizenship.append')}>
            <CitizenshipItem name="Item" bind={true} />
          </Accordion>
        </Show>
      </div>
    )
  }
}

Multiple.defaultProps = {
  HasMultiple: '',
  Citizenships: [],
  CitizenshipsBranch: '',
  Passports: [],
  onUpdate: (queue) => {},
  onError: (value, arr) => { return arr },
  section: 'citizenship',
  subsection: 'multiple',
  dispatch: () => {},
  validator: (state, props) => {
    return new CitizenshipMultipleValidator(props, props).isValid()
  },
  defaultState: true
}
