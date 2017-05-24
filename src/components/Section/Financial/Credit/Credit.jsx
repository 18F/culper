import React from 'react'
import { i18n } from '../../../../config'
import { CreditValidator } from '../../../../validators'
import { ValidationElement, Branch, Show, Accordion, Field,
         Telephone, Address, Text, Textarea } from '../../../Form'

export default class Credit extends ValidationElement {
  constructor (props) {
    super(props)

    this.state = {
      HasCreditCounseling: props.HasCreditCounseling,
      List: props.List,
      ListBranch: props.ListBranch,
      errorCodes: []
    }

    this.updateBranch = this.updateBranch.bind(this)
    this.updateList = this.updateList.bind(this)
    this.summary = this.summary.bind(this)
  }

  // /**
  //  * Handle the validation event.
  //  */
  // handleValidation (event, status, error) {
  //   if (!event) {
  //     return
  //   }

  //   let codes = super.mergeError(this.state.errorCodes, super.flattenObject(error))
  //   let complexStatus = null
  //   if (codes.length > 0) {
  //     complexStatus = false
  //   } else if (this.isValid()) {
  //     complexStatus = true
  //   }

  //   this.setState({error: complexStatus === false, valid: complexStatus === true, errorCodes: codes}, () => {
  //     const errorObject = { [this.props.name]: codes }
  //     const statusObject = { [this.props.name]: { status: complexStatus } }
  //     super.handleValidation(event, statusObject, errorObject)
  //   })
  // }

  // /**
  //  * Determine if all items in the collection are considered to be in
  //  * a valid state.
  //  */
  // isValid () {
  //   return new CreditValidator(this.state, null).isValid()
  // }

  /**
   * Updates triggered by the branching component.
   */
  updateBranch (val, event) {
    this.setState({ HasCreditCounseling: val }, () => {
      this.updateList({
        items: val === 'No' ? [] : this.state.List,
        branch: ''
      })
      this.handleValidation(event, null, null)
    })
  }

  /**
   * Dispatch callback initiated from the collection to notify of any new
   * updates to the items.
   */
  updateList (values) {
    this.setState({ List: values.items, ListBranch: values.branch }, () => {
      if (this.props.onUpdate) {
        this.props.onUpdate({
          List: this.state.List,
          ListBranch: this.state.ListBranch,
          HasCreditCounseling: this.state.HasCreditCounseling
        })
      }
    })
  }

  /**
   * Assists in rendering the summary section.
   */
  summary (item, index) {
    const obj = (item || {})
    const name = (obj.Name || {}).value || i18n.t('financial.credit.collection.summary.unknown')

    return (
      <span>
        <span className="index">{i18n.t('financial.credit.collection.summary.item')} {index + 1}:</span>
        <span><strong>{name}</strong></span>
      </span>
    )
  }

  render () {
    return (
      <div className="credit-counseling">
        <Branch name="has_credit"
                className="credit-branch"
                value={this.state.HasCreditCounseling}
                help="financial.credit.help.branch"
                onUpdate={this.updateBranch}
                onError={this.props.onError}>
        </Branch>
        <Show when={this.state.HasCreditCounseling === 'Yes'}>
          <Accordion minimum="1"
                     items={this.state.List}
                     branch={this.state.ListBranch}
                     onUpdate={this.updateList}
                     onError={this.props.onError}
                     summary={this.summary}
                     description={i18n.t('financial.credit.collection.summary.title')}
                     appendTitle={i18n.t('financial.credit.collection.appendTitle')}
                     appendLabel={i18n.t('financial.credit.collection.append')}>

            <Field title={i18n.t('financial.credit.heading.explanation')}
                   help="financial.credit.help.explanation">
              <Textarea name="Explanation"
                        className="credit-explanation"
                        bind={true}
                        />
            </Field>

            <Field title={i18n.t('financial.credit.heading.name')}
                   help="financial.credit.help.name">
              <Text name="Name"
                    className="credit-name"
                    bind={true}
                    />
            </Field>

            <Field title={i18n.t('financial.credit.heading.telephone')}
                   help="financial.credit.help.telephone">
              <Telephone name="Telephone"
                         className="credit-telephone"
                         bind={true}
                         />
            </Field>

            <Field title={i18n.t('financial.credit.heading.address')}
                   help="financial.credit.help.address"
                   adjustFor="address">
              <Address name="Address"
                       className="credit-address"
                       bind={true}
                       />
            </Field>

            <Field title={i18n.t('financial.credit.heading.description')}
                   help="financial.credit.help.description">
              <Textarea name="Description"
                        className="credit-description"
                        bind={true}
                        />
            </Field>

          </Accordion>
        </Show>
      </div>
    )
  }
}

Credit.defaultProps = {
  HasCreditCounseling: '',
  List: [],
  ListBranch: '',
  onError: (value, arr) => { return arr }
}
