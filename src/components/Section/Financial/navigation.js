import * as validators from '../../../validators/index'

const navigation = {
  name: 'Financial record',
  title: 'Financial record',
  url: 'financial',
  store: 'Financial',
  showNumber: true,
  locked: validators.formIsLocked,
  subsections: [
    {
      exclude: true,
      name: 'Introduction',
      url: 'intro'
    },
    {
      name: 'Bankruptcy',
      url: 'bankruptcy',
      store: 'Bankruptcy',
      validator: validators.BankruptcyValidator
    },
    {
      name: 'Gambling',
      url: 'gambling',
      store: 'Gambling',
      validator: validators.GamblingValidator
    },
    {
      name: 'Taxes',
      url: 'taxes',
      store: 'Taxes',
      validator: validators.TaxesValidator
    },
    {
      name: 'Employer card abuse',
      url: 'card',
      store: 'Card',
      validator: validators.CardAbuseValidator
    },
    {
      name: 'Credit counseling',
      url: 'credit',
      store: 'Credit',
      validator: validators.CreditValidator
    },
    {
      name: 'Delinquent payments',
      url: 'delinquent',
      store: 'Delinquent',
      validator: validators.DelinquentValidator
    },
    {
      name: 'Non-payment consequence',
      url: 'nonpayment',
      store: 'Nonpayment',
      validator: validators.NonpaymentValidator
    },
    {
      exclude: true,
      name: 'Review',
      url: 'review'
    }
  ]
}

export default navigation
