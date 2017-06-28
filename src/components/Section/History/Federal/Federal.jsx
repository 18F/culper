import React from 'react'
import { i18n } from '../../../../config'
import { FederalServiceValidator } from '../../../../validators'
import SubsectionElement from '../../SubsectionElement'
import { Branch, Show, Accordion, Field, DateRange, Text, Address } from '../../../Form'
import { DateSummary } from '../../../Summary'

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

export default class Federal extends SubsectionElement {
  constructor (props) {
    super(props)

    this.state = {
      HasFederalService: props.HasFederalService,
      List: props.List || []
    }

    this.onUpdate = this.onUpdate.bind(this)
    this.updateBranch = this.updateBranch.bind(this)
    this.updateCollection = this.updateCollection.bind(this)
  }

  onUpdate (name, values) {
    this.setState({ [name]: values }, () => {
      sendUpdate(this.props.onUpdate, this.props.name, this.state)
    })
  }

  updateBranch (value, event) {
    this.onUpdate('HasFederalService', value)

    // If there is no history clear out any previously entered data
    if (value === 'No') {
      this.onUpdate('List', [])
    }
  }

  updateCollection (values) {
    this.onUpdate('List', values.items)
  }

  /**
   * Assists in rendering the summary section.
   */
  summary (item, index) {
    const agency = item && item.Name && item.Name.value
          ? item.Name.value
          : i18n.t('history.federal.collection.summary.unknown')
    const dates = DateSummary(item.Dates)

    return (
      <span>
        <span className="index">{i18n.t('history.federal.collection.summary.item')} {index + 1}:</span>
        <span className=""><strong>{agency}</strong></span>
        <span className="dates"><strong>{dates}</strong></span>
      </span>
    )
  }

  render () {
    return (
      <div className="federal">
        <h3>{i18n.t('history.federal.heading.branch')}</h3>
        <Branch name="has_federalservice"
                value={this.state.HasFederalService}
                help="history.federal.help.branch"
                onUpdate={this.updateBranch}
                onError={this.handleError}>
        </Branch>
        <Show when={this.state.HasFederalService === 'Yes'}>
          <Accordion minimum="1"
                     items={this.state.List}
                     defaultState={this.props.defaultState}
                     onUpdate={this.updateCollection}
                     onError={this.handleError}
                     summary={this.summary}
                     description={i18n.t('history.federal.collection.summary.title')}
                     appendLabel={i18n.t('history.federal.collection.append')}>
            <Field title={i18n.t('history.federal.heading.dates')}
                   help="history.federal.help.dates"
                   adjustFor="daterange">
              <DateRange name="Dates"
                         bind={true}
                         />
            </Field>

            <Field title={i18n.t('history.federal.heading.name')}
                   className="federal-agency"
                   help="history.federal.help.name">
              <Text name="Name"
                    bind={true}
                    />
            </Field>

            <Field title={i18n.t('history.federal.heading.position')}
                   className="federal-position"
                   help="history.federal.help.position">
              <Text name="Position"
                    bind={true}
                    />
            </Field>

            <Field title={i18n.t('history.federal.heading.address')}
                   help="history.federal.help.address"
                   className="federal-agency-address"
                   adjustFor="address">
              <Address name="Address"
                       bind={true}
                       />
            </Field>
          </Accordion>
        </Show>
      </div>
    )
  }
}

Federal.defaultProps = {
  onError: (value, arr) => { return arr },
  section: 'history',
  subsection: 'federal',
  dispatch: () => {},
  validator: (state, props) => {
    return new FederalServiceValidator(state, props).isValid()
  },
  defaultState: true
}
