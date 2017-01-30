import React from 'react'
import { connect } from 'react-redux'
import { i18n } from '../../../../config'
import { ValidationElement, Help, HelpIcon, Collection, MaidenName, Name, Textarea, DateRange, Radio, RadioGroup, Branch } from '../../../Form'

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
    for (let item of this.state.List) {
      if (!item.Name || !item.Name.first || !item.Name.last) {
        return false
      }

      if (!item.MaidenName || !item.MaidenName.value) {
        return false
      }

      if (!item.DatesUsed || !item.DatesUsed.from || (!item.DatesUsed.to && !item.DatesUsed.present)) {
        return false
      }
    }
    return true
  }

  addOtherName () {
    let list = this.state.List
    list.push({
      index: new Date().getTime(),
      Name: {},
      MaidenName: '',
      DatesUsed: {},
      Reason: ''
    })

    this.setState({ List: [...list] }, () => {
      if (this.props.onUpdate) {
        this.props.onUpdate({
          List: this.state.List,
          HasOtherNames: this.state.HasOtherNames
        })
      }
    })
  }

  clear () {
    this.setState({ List: [] }, () => {
      if (this.props.onUpdate) {
        this.props.onUpdate({
          List: this.state.List,
          HasOtherNames: this.state.HasOtherNames
        })
      }
    })
  }

  onUpdate (val) {
    this.setState({ HasOtherNames: val }, () => {
      if (val === 'Yes') {
        if (this.state.List.length === 0) {
          this.addOtherName()
        }
      } else if (val === 'No') {
        if (this.state.List.length > 0) {
          this.clear()
        }
      }
      this.props.onUpdate({
        List: this.state.List,
        HasOtherNames: this.state.HasOtherNames
      })
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
      name = `${item.Name.first} ${item.Name.middle} ${item.Name.last}`.trim()
    }

    let from = ''
    if (item.DatesUsed && item.DatesUsed.from) {
      from = '' + item.DatesUsed.from.getFullYear()
    }

    let to = ''
    if (item.DatesUsed && item.DatesUsed.present) {
      to = i18n.t('identification.othernames.collection.summary.present')
    } else if (item.DatesUsed && item.DatesUsed.to) {
      to = '' + item.DatesUsed.to.getFullYear()
    }

    const dates = from === '' && to === ''
          ? i18n.t('identification.othernames.collection.summary.nodates')
          : `${from} - ${to}`

    return (
      <div className="table">
        <div className="table-cell index">
          {i18n.t('identification.othernames.collection.summary.name')} {index + 1}:
        </div>
        <div className="table-cell index">
          {name}
        </div>
        <div className="table-cell dates">
          {dates}
        </div>
      </div>
    )
  }

  /**
   * Render children only when we explicit state there are aliases
   */
  visibleComponents () {
    if (this.state.HasOtherNames !== 'Yes') {
      return ''
    }

    return (
      <Collection minimum="1"
                  items={this.state.List}
                  dispatch={this.myDispatch}
                  summary={this.summary}
                  summaryTitle={i18n.t('identification.othernames.collection.summary.title')}
                  appendClass="eapp-field-wrap"
                  appendLabel={i18n.t('identification.othernames.collection.append')}>

        <h3>{i18n.t('identification.othernames.heading.name')}</h3>
        <Name name="Name"
              className="eapp-field-wrap"
              onValidate={this.handleValidation}
              />

        <h3>{i18n.t('identification.othernames.heading.maiden')}</h3>
        <Help id="alias.maiden.help">
          <MaidenName name="MaidenName"
                      className="eapp-field-wrap"
                      onValidate={this.handleValidation}
                      />
          <HelpIcon className="maiden-help-icon" />
        </Help>

        <h3>{i18n.t('identification.othernames.heading.used')}</h3>
        <Help id="alias.used.help">
          <DateRange name="DatesUsed"
                     className="eapp-field-wrap"
                     onValidate={this.handleValidation}
                     />
          <HelpIcon className="used-help-icon" />
        </Help>

        <h3>{i18n.t('identification.othernames.heading.reason')}</h3>
        <Help id="alias.reason.help">
          <Textarea name="Reason"
                    className="reason eapp-field-wrap"
                    onValidate={this.handleValidation}
                    label={i18n.t('identification.othernames.label.reason')}
                    />
          <HelpIcon className="reason-help-icon" />
        </Help>
      </Collection>
    )
  }

  render () {
    return (
      <div className="other-names">
        <p>{i18n.t('identification.othernames.info')}</p>
        <Branch name="has_othernames"
                className="eapp-field-wrap"
                value={this.state.HasOtherNames}
                onUpdate={this.onUpdate.bind(this)}>
          <div>{i18n.t('identification.othernames.branch.question')}</div>
        </Branch>
        {this.visibleComponents()}
      </div>
    )
  }
}
