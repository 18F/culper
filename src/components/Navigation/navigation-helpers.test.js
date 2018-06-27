import { validations, isActive, hasErrors, isValid, sectionsTotal, sectionsCompleted, findPosition } from './navigation-helpers'

describe('Navigation component validation', function () {
  it('can count number of validations', () => {
    const section = {
      subsections: [
        { hidden: true, url: 'one' },
        { url: 'two' },
        {
          url: 'three',
          subsections: [
            { url: 'four' },
            { url: 'five' }
          ]
        },
        {
          url: 'six',
          subsections: [
            { url: 'seven' },
            { url: 'eight', hiddenFunc: () => { return true } }
          ]
        }
      ]
    }

    expect(validations(section, {})).toBe(4)
  })

  it('can determine if a path is active', () => {
    expect(isActive('/form/identification', '/form/foreign/activities/direct')).toBe(false)
    expect(isActive('/form/foreign', '/form/foreign/activities/direct')).toBe(true)
    expect(isActive('/form/foreign/activities', '/form/foreign/activities/direct')).toBe(true)
    expect(isActive('/form/foreign/activities/direct', '/form/foreign/activities/direct')).toBe(true)
  })

  it('can determine a section has errors', () => {
    const props = {
      errors: {
        foreign: [
          { section: 'foreign', subsection: 'activities/direct', valid: false, code: 'date.month.notfound' },
          { section: 'foreign', subsection: 'activities/direct', valid: true, code: 'acquired.length' },
          { section: 'foreign', subsection: 'activities/indirect', valid: false, code: 'date.month.notfound' }
        ],
        identification: []
      }
    }

    expect(hasErrors('/form/foreign', props)).toBe(true)
    expect(hasErrors('/form/foreign/activities/direct', props)).toBe(true)
    expect(hasErrors('/form/identification', props)).toBe(false)
  })

  it('can determine if a section is valid', () => {
    const props = {
      completed: {
        foreign: [
          { section: 'foreign', subsection: 'activities/direct', valid: false },
          { section: 'foreign', subsection: 'activities/direct', valid: true },
          { section: 'foreign', subsection: 'activities/indirect', valid: false }
        ],
        identification: [],
        citizenship: [
          { section: 'citizenship', subsection: 'status', valid: true },
          { section: 'citizenship', subsection: 'multiple', valid: true },
          { section: 'citizenship', subsection: 'passports', valid: true }
        ]
      }
    }

    expect(isValid('/form/foreign', props)).toBe(false)
    expect(isValid('/form/identification', props)).toBe(false)
    expect(isValid('/form/citizenship', props)).toBe(true)
    expect(isValid('/form/citizenship/multiple', props)).toBe(true)
    expect(isValid('/form/citizenship/passports', props)).toBe(true)
  })

  it('can get total number of sections', () => {
    expect(sectionsTotal()).toBe(10)
  })

  it('can get number of sections completed', () => {
    const store = {
      completed: {
        foreign: [
          { section: 'foreign', subsection: 'activities/direct', valid: false },
          { section: 'foreign', subsection: 'activities/direct', valid: true },
          { section: 'foreign', subsection: 'activities/indirect', valid: false }
        ],
        identification: [],
        citizenship: [
          { section: 'citizenship', subsection: 'status', valid: true },
          { section: 'citizenship', subsection: 'multiple', valid: true },
          { section: 'citizenship', subsection: 'passports', valid: true }
        ]
      }
    }

    expect(sectionsCompleted(store.completed, { application: store })).toBe(1)
  })
})

describe('UI helpers', () => {
  it('should find the position', function () {
    const el = {
      offsetTop: 10,
      offsetParent: {
        offsetTop: 2
      }
    }
    const top = findPosition(el)
    expect(top).toEqual([12])
  })
})
