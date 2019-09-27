import {
  selectState,
  selectForm,
  selectSubsection,
  formTypeSelector,
} from './selectors'

describe('selectState', () => {
  it('returns the entire state', () => {
    const state = { test: 'test data' }

    expect(selectState(state)).toEqual(state)
  })
})

describe('selectForm', () => {
  it('returns the form state', () => {
    const state = {
      test: 'test data',
      form: { data: 'form data' },
    }

    expect(selectForm(state)).toEqual(state.form)
  })
})

describe('selectSubsection', () => {
  it('returns the given subsection from form state', () => {
    const state = {
      test: 'test data',
      form: {
        sectionOne: 'form data',
        sectionTwo: 'test data',
      },
    }

    expect(selectSubsection(state, 'sectionTwo')).toEqual(state.form.sectionTwo)
  })

  it('returns an empty object if the given subsection is not found', () => {
    const state = {
      test: 'test data',
      form: {
        sectionOne: 'form data',
        sectionTwo: 'test data',
      },
    }

    expect(selectSubsection(state, 'sectionThree')).toEqual({})
  })
})

describe('formTypeSelector', () => {
  it('returns the formType from application Settings', () => {
    const state = {
      form: {
        sectionOne: 'form data',
        sectionTwo: 'test data',
      },
      application: {
        Settings: {
          formType: 'SF-86',
        },
      },
    }

    expect(formTypeSelector(state)).toEqual('SF-86')
  })
})
