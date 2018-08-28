import * as validators from '../../../validators/index'

const navigation = {
  name: 'Relationships',
  title: 'Relationships',
  url: 'relationships',
  store: 'Relationships',
  showNumber: true,
  locked: validators.formIsLocked,
  subsections: [
    {
      exclude: true,
      name: 'Introduction',
      url: 'intro'
    },
    {
      name: 'Marital & relationship status',
      url: 'status',
      subsections: [
        {
          name: 'Marital',
          url: 'marital',
          store: 'Marital',
          validator: validators.MaritalValidator
        },
        {
          name: 'Cohabitants',
          url: 'cohabitant',
          store: 'Cohabitants',
          validator: validators.CohabitantsValidator
        }
      ]
    },
    {
      name: 'People who know you well',
      url: 'people',
      store: 'People',
      validator: validators.PeopleValidator
    },
    {
      name: 'Relatives',
      url: 'relatives',
      store: 'Relatives',
      validator: validators.RelativesValidator
    },
    {
      exclude: true,
      name: 'Review',
      url: 'review'
    }
  ]
}

export default navigation
