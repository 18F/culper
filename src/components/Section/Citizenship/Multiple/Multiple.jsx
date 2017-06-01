import React from 'react'
import { i18n } from '../../../../config'
import { CitizenshipMultipleValidator } from '../../../../validators'
import SubsectionElement from '../../SubsectionElement'
import { Branch, Show, Accordion, BranchCollection } from '../../../Form'
import { DateSummary } from '../../../Summary'
import CitizenshipItem from './CitizenshipItem'
import PassportItem from './PassportItem'

/**
 * Convenience function to send updates along their merry way
 */
export const sendUpdate = (fn, name, props) => {
  if (fn) {
    fn({
      name: name,
      ...props
    })
  }
}

export default class Multiple extends SubsectionElement {
  constructor (props) {
    super(props)

    this.state = {
      HasMultiple: props.HasMultiple,
      Citizenships: props.Citizenships,
      CitizenshipsBranch: props.CitizenshipsBranch,
      Passports: props.Passports
    }

    this.onUpdate = this.onUpdate.bind(this)
    this.updateHasMultiple = this.updateHasMultiple.bind(this)
    this.updateCitizenships = this.updateCitizenships.bind(this)
    this.updatePassports = this.updatePassports.bind(this)
  }

  onUpdate (name, values) {
    this.setState({ [name]: values }, () => {
      sendUpdate(this.props.onUpdate, this.props.name, this.state)
    })
  }

  updateHasMultiple (values) {
    this.onUpdate('HasMultiple', values)
  }

  updateCitizenships (values) {
    this.onUpdate('Citizenships', values.items)
    this.onUpdate('CitizenshipsBranch', values.branch)
  }

  updatePassports (values) {
    this.onUpdate('Passports', values)
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

  summaryPassports (item, index) {
    const itemProperties = (item || {}).Item || {}
    const country = itemProperties.Country && itemProperties.Country.value
          ? itemProperties.Country.value
          : i18n.t('citizenship.multiple.collection.passport.summary.unknown')
    const dates = DateSummary(itemProperties.Issued)

    return (
      <span>
        <span className="index">{i18n.t('citizenship.multiple.collection.passport.summary.item')} {index + 1}:</span>
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
                value={this.state.HasMultiple}
                help="citizenship.multiple.help.hasmultiple"
                onUpdate={this.updateHasMultiple}
                onError={this.handleError}
                />

        <Show when={this.state.HasMultiple === 'Yes'}>
          <Accordion minimum="1"
                     items={this.state.Citizenships}
                     branch={this.state.CitizenshipsBranch}
                     onUpdate={this.updateCitizenships}
                     onError={this.handleError}
                     summary={this.summaryCitizenships}
                     description={i18n.t('citizenship.multiple.collection.citizenship.summary.title')}
                     appendTitle={i18n.t('citizenship.multiple.collection.citizenship.appendTitle')}
                     appendLabel={i18n.t('citizenship.multiple.collection.citizenship.append')}>
            <CitizenshipItem name="Item" bind={true} />
          </Accordion>
        </Show>

        <BranchCollection label={i18n.t('citizenship.multiple.heading.hasforeignpassport')}
                          appendLabel={i18n.t('citizenship.multiple.collection.passport.appendTitle')}
                          help="citizenship.multiple.help.hasforeignpassport"
                          className="has-foreignpassport"
                          items={this.state.Passports}
                          onUpdate={this.updatePassports}
                          onError={this.handleError}>
          <PassportItem name="Item" bind={true} />
        </BranchCollection>
      </div>
    )
  }
}

Multiple.defaultProps = {
  HasMultiple: '',
  Citizenships: [],
  CitizenshipsBranch: '',
  Passports: [],
  onError: (value, arr) => { return arr },
  section: 'citizenship',
  subsection: 'multiple',
  dispatch: () => {},
  validator: (state, props) => {
    return new CitizenshipMultipleValidator(state, props).isValid()
  }
}
