import React from 'react'
import { i18n } from '../../../../config'
import { OtherNamesValidator } from '../../../../validators'
import { ValidationElement, Help, HelpIcon, Accordion, MaidenName, Name, Textarea, DateRange, Branch, Show } from '../../../Form'

export default class OtherNames extends ValidationElement {
  constructor (props) {
    super(props)
    this.state = {
      List: props.List || [],
      HasOtherNames: props.HasOtherNames,
      errorCodes: []
    }
    this.myDispatch = this.myDispatch.bind(this)
  }

  handleValidation (event, status, error) {
    if (!event) {
      return
    }

    let codes = super.mergeError(this.state.errorCodes, super.flattenObject(error))
    let complexStatus = null
    if (codes.length > 0) {
      complexStatus = false
    } else if (this.isValid()) {
      complexStatus = true
    }

    this.setState({error: complexStatus === false, valid: complexStatus === true, errorCodes: codes}, () => {
      let e = { [this.props.name]: codes }
      let s = { [this.props.name]: { status: complexStatus } }
      if (this.state.error === false || this.state.valid === true) {
        super.handleValidation(event, s, e)
        return
      }

      super.handleValidation(event, s, e)
    })
  }

  isValid () {
    return new OtherNamesValidator(this.state, null).isValid()
  }

  onUpdate (val, event) {
    this.setState({ HasOtherNames: val }, () => {
      this.myDispatch(val === 'No' ? [] : this.state.List)
      this.handleValidation(event, null, null)
    })
  }

  myDispatch (collection) {
    this.setState({ List: collection }, () => {
      if (this.props.onUpdate) {
        this.props.onUpdate({
          List: this.state.List,
          HasOtherNames: this.state.HasOtherNames
        })
      }
    })
  }

  /**
   * Assists in rendering the summary section.
   */
  summary (item, index) {
    let name = i18n.t('identification.othernames.collection.summary.unknown')
    if (item.Name) {
      name = `${item.Name.first || ''} ${item.Name.middle || ''} ${item.Name.last || ''}`.trim()
    }

    let from = ''
    if (item.DatesUsed && item.DatesUsed.from && item.DatesUsed.from.date) {
      from = '' + item.DatesUsed.from.date.getFullYear()
    }

    let to = ''
    if (item.DatesUsed && item.DatesUsed.present) {
      to = i18n.t('identification.othernames.collection.summary.present')
    } else if (item.DatesUsed && item.DatesUsed.to && item.DatesUsed.to.date) {
      to = '' + item.DatesUsed.to.date.getFullYear()
    }

    const dates = from === '' && to === ''
          ? i18n.t('identification.othernames.collection.summary.nodates')
          : `${from} - ${to}`

    return (
      <span>
        <span className="index">
          {i18n.t('identification.othernames.collection.summary.name')} {index + 1}:
        </span>
        <span>
          {name}
        </span>
        <span className="dates">
          {dates}
        </span>
      </span>
    )
  }

  render () {
    return (
      <div className="other-names">
        <p>{i18n.t('identification.othernames.info')}</p>
        <h3>{i18n.t('identification.othernames.branch.question')}</h3>
        <Branch name="has_othernames"
                className="eapp-field-wrap"
                value={this.state.HasOtherNames}
                help="identification.othernames.branch.help"
                onUpdate={this.onUpdate.bind(this)}>
        </Branch>
        <Show when={this.state.HasOtherNames === 'Yes'}>
          <Accordion minimum="1"
                     items={this.state.List}
                     onUpdate={this.myDispatch}
                     onValidate={this.handleValidation}
                     summary={this.summary}
                     description={i18n.t('identification.othernames.collection.summary.title')}
                     appendClass="eapp-field-wrap"
                     appendLabel={i18n.t('identification.othernames.collection.append')}>

            <h3>{i18n.t('identification.othernames.heading.name')}</h3>
            <Name name="Name"
                  key="name"
                  className="eapp-field-wrap"
                  bind={true}
                  />

            <h3>{i18n.t('identification.othernames.heading.maiden')}</h3>
            <div className="eapp-field-wrap">
              <Help id="alias.maiden.help">
                <MaidenName name="MaidenName"
                            bind={true}
                            />
                <HelpIcon className="maiden-help-icon" />
              </Help>
            </div>

            <h3>{i18n.t('identification.othernames.heading.used')}</h3>
            <div className="eapp-field-wrap">
              <Help id="alias.used.help">
                <DateRange name="DatesUsed"
                           bind={true}
                           />
                <HelpIcon className="used-help-icon" />
              </Help>
            </div>

            <h3>{i18n.t('identification.othernames.heading.reason')}</h3>
            <div className="eapp-field-wrap">
              <Help id="alias.reason.help">
                <Textarea name="Reason"
                          className="reason"
                          bind={true}
                          />
                <HelpIcon className="reason-help-icon" />
              </Help>
            </div>
          </Accordion>
        </Show>
      </div>
    )
  }
}
