import React from 'react'
import { connect } from 'react-redux'
import { ValidationElement, Help, MaidenName, Name, Textarea, DateRange, Radio, RadioGroup } from '../../../Form'

export default class OtherNames extends ValidationElement {
  constructor (props) {
    super(props)
    this.state = {
      List: props.List || [],
      yesNo: props.HasOtherNames,
      errorCodes: []
    }
  }

  handleUpdate (id, field, values) {
    let list = this.state.List
    for (let x = 0; x < list.length; x++) {
      if (list[x].ID === id) {
        list[x][field] = values
      }
    }

    this.setState({ List: list }, () => {
      if (this.props.onUpdate) {
        this.props.onUpdate({
          List: this.state.List,
          HasOtherNames: this.state.yesNo
        })
      }
    })
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
      if (!item.Name.first || !item.Name.last) {
        return false
      }

      if (!item.MaidenName.first || !item.MaidenName.last) {
        return false
      }

      if (!item.DatesUsed.from || (!item.DatesUsed.to && !item.DatesUsed.present)) {
        return false
      }
    }
    return true
  }

  addOtherName () {
    let list = this.state.List
    list.push({
      ID: new Date().getTime(),
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

  keyName (id, bit) {
    return '' + id + '-' + bit
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

  /**
   * Render children only when we explicit state there are aliases
   */
  visibleComponents () {
    if (this.state.yesNo !== 'Yes') {
      return ''
    }

    return this.state.List.map((x) => {
      return (
        <div key={x.ID}>
          <Name name="name"
                {...x.Name}
                key={this.keyName(x.ID, 'name')}
                onUpdate={this.handleUpdate.bind(this, x.ID, 'Name')}
                onValidate={this.handleValidation.bind(this)}
                />

          <MaidenName name="maiden"
                      key={this.keyName(x.ID, 'maiden')}
                      value={x.MaidenName}
                      onUpdate={this.handleUpdate.bind(this, x.ID, 'MaidenName')}
                      onValidate={this.handleValidation.bind(this)}
                      />

          <DateRange name="dates"
                     {...x.DatesUsed}
                     key={this.keyName(x.ID, 'used')}
                     title="Provide dates used"
                     onUpdate={this.handleUpdate.bind(this, x.ID, 'DatesUsed')}
                     onValidate={this.handleValidation.bind(this)}
                     />

          <div>
            <h2>Reason for change</h2>
            <Help id="alias.reason.help">
              <Textarea name="reason"
                        key={this.keyName(x.ID, 'reason')}
                        value={x.Reasons}
                        onUpdate={this.handleUpdate.bind(this, x.ID, 'Reasons')}
                        onValidate={this.handleValidation.bind(this)}
                        label={'Provide the reasons why the name changed'}
                        />
            </Help>
          </div>
        </div>
      )
    })
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
        <div className="text-center">
          <button className="add" onClick={this.addOtherName.bind(this)}>
            <span>Add another name used</span>
            <i className="fa fa-plus-circle"></i>
          </button>
        </div>
      </div>
    )
  }
}
