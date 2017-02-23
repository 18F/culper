import React from 'react'
import { i18n } from '../../../../config'
import { ValidationElement, Branch, Show, Collection, DateRange } from '../../../Form'
import { dateSummary } from '../HistoryCollection/summaries'

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

export default class Federal extends ValidationElement {
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

  /**
   * Handle any updates and bubble them up.
   */
  onUpdate (name, values) {
    this.setState({ [name]: values }, () => {
      sendUpdate(this.props.onUpdate, this.props.name, this.state)
    })
  }

  updateBranch (value) {
    this.onUpdate('HasFederalService', value)
    if (value === 'No') {
      this.onUpdate('List', [])
    }
  }

  updateCollection (collection) {
    this.onUpdate('List', collection)
  }

  /**
   * Assists in rendering the summary section.
   */
  summary (item, index) {
    const agency = item && item.Name && item.Name.value
          ? item.Name.value
          : i18n.t('history.federal.collection.summary.unknown')
    const dates = dateSummary(item)

    return (
      <div className="table">
        <div className="table-cell index">{i18n.t('history.federal.collection.summary.item')} {index + 1}:</div>
        <div className="table-cell">{agency}</div>
        <div className="table-cell dates">{dates}</div>
      </div>
    )
  }

  render () {
    return (
      <div className="federal">
        <h3>{i18n.t('history.federal.heading.branch')}</h3>
        <Branch name="has_federalservice"
                className="eapp-field-wrap"
                value={this.state.HasFederalService}
                help="history.federal.help.branch"
                onUpdate={this.updateBranch}>
        </Branch>
        <Show when={this.state.HasFederalService === 'Yes'}>
          <Collection minimum="1"
                      items={this.state.List}
                      dispatch={this.updateCollection}
                      summary={this.summary}
                      summaryTitle={i18n.t('history.federal.collection.summary.title')}
                      appendLabel={i18n.t('history.federal.collection.append')}>
          </Collection>
        </Show>
      </div>
    )
  }
}
