import React from 'react'
import { i18n } from '../../../../config'
import { FederalServiceValidator } from '../../../../validators'
import SubsectionElement from '../../SubsectionElement'
import { Branch, Show, Accordion, Field, DateRange, Text, Address } from '../../../Form'
import { DateSummary } from '../../../Summary'

export default class Federal extends SubsectionElement {
  constructor (props) {
    super(props)

    this.update = this.update.bind(this)
    this.updateBranch = this.updateBranch.bind(this)
    this.updateCollection = this.updateCollection.bind(this)
  }

  update (queue) {
    this.props.onUpdate({
      HasFederalService: this.props.HasFederalService,
      List: this.props.List,
      ...queue
    })
  }

  updateBranch (value, event) {
    this.update({
      HasFederalService: value,
      List: value === 'Yes' ? this.props.List : []
    })
  }

  updateCollection (values) {
    this.update({
      List: values.items
    })
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
                help="history.federal.help.branch"
                value={this.props.HasFederalService}
                warning={true}
                onUpdate={this.updateBranch}
                onError={this.handleError}>
        </Branch>
        <Show when={this.props.HasFederalService === 'Yes'}>
          <Accordion items={this.props.List}
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
                   help="history.federal.help.name">
              <Text name="Name"
                    bind={true}
                    />
            </Field>

            <Field title={i18n.t('history.federal.heading.position')}
                   help="history.federal.help.position">
              <Text name="Position"
                    bind={true}
                    />
            </Field>

            <Field title={i18n.t('history.federal.heading.address')}
                   help="history.federal.help.address"
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
  HasFederalService: '',
  List: [],
  onUpdate: (queue) => {},
  onError: (value, arr) => { return arr },
  section: 'history',
  subsection: 'federal',
  dispatch: () => {},
  validator: (state, props) => {
    return new FederalServiceValidator(props, props).isValid()
  },
  defaultState: true
}
