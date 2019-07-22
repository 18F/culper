import employment from 'models/employment'

const historyEmployment = {
  EmploymentRecord: {
    presence: true,
    hasValue: {
      validator: { inclusion: ['No'] },
    },
  },
  List: {
    presence: true,
    accordion: { validator: employment },
  },
}

export default historyEmployment
