import React from 'react'
import { connect } from 'react-redux'
import { ValidationElement, Help, Collection, MaidenName, Name, Textarea, DateRange, Radio, RadioGroup } from '../../../Form'

export default class OtherNames extends ValidationElement {
  constructor (props) {
    super(props)
    this.state = {
      List: props.List || [],
      yesNo: props.HasOtherNames,
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
          HasOtherNames: this.state.yesNo
        })
      }
    })
  }

  clear () {
    this.setState({ List: [] }, () => {
      if (this.props.onUpdate) {
        this.props.onUpdate({
          List: this.state.List,
          HasOtherNames: this.state.yesNo
        })
      }
    })
  }

  yesNoClicked (val) {
    this.setState({ yesNo: val }, () => {
      if (val === 'Yes') {
        if (this.state.List.length === 0) {
          this.addOtherName()
        }
      } else if (val === 'No') {
        if (this.state.List.length > 0) {
          this.clear()
        }
      }
    })
  }

  options () {
    return (
      <RadioGroup className="option-list" selectedValue={this.state.yesNo}>
        <Radio name="has_othernames"
               label="Yes"
               value="Yes"
               onChange={this.yesNoClicked.bind(this, 'Yes')}
               onValidate={this.handleValidation}
               />
        <Radio name="has_othernames"
               label="No"
               value="No"
               onChange={this.yesNoClicked.bind(this, 'No')}
               onValidate={this.handleValidation}
               />
      </RadioGroup>
    )
  }

  myDispatch (collection) {
    this.setState({ List: collection }, () => {
      if (this.props.onUpdate) {
        this.props.onUpdate({
          List: this.state.List,
          HasOtherNames: this.state.yesNo
        })
      }
    })
  }

  /**
   * Render children only when we explicit state there are aliases
   */
  visibleComponents () {
    if (this.state.yesNo !== 'Yes') {
      return ''
    }

    return (
      <Collection minimum="1"
                  items={this.state.List}
                  dispatch={this.myDispatch}
                  appendLabel="Add another name">
        <Name name="Name"
              onValidate={this.handleValidation}
              />
        <MaidenName name="MaidenName"
                    onValidate={this.handleValidation}
                    />
        <DateRange name="DatesUsed"
                   onValidate={this.handleValidation}
                   />
        <div>
          <h2>Reason for change</h2>
          <Help id="alias.reason.help">
            <Textarea name="Reason"
                      onValidate={this.handleValidation}
                      label={'Provide the reasons why the name changed'}
                      />
          </Help>
        </div>
      </Collection>
    )
  }

  render () {
    return (
      <div className="other-names eapp-field-wrap">
        <h2>Other names used</h2>
        <p>Provide your other names used and the period of time you used them (for example: your maiden name, name(s) by a former marriage, former name(s), alias(es), or nickname(s)).</p>
        <div>
          Have you used any other names?
        </div>
        {this.options()}
        {this.visibleComponents()}
      </div>
    )
  }
}
