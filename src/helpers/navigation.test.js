import { totalSections, completedSections } from './navigation'

describe('Navigation helpers', () => {
  describe('totalSections function', () => {
    it('returns the number of top-level form sections', () => {
      const state = {
        application: {
          Settings: {
            formType: 'SF86',
          },
        },
      }

      expect(totalSections(state)).toEqual(10)
    })
  })

  describe('completedSections function', () => {
    it('returns the number of completed top-level form sections', () => {
      const state = {
        form: {
          IDENTIFICATION_NAME: { complete: true },
          CITIZENSHIP_US_PASSPORT: { complete: true },
          CITIZENSHIP_STATUS: { complete: true },
          CITIZENSHIP_MULTIPLE: { complete: true },
          CITIZENSHIP_PASSPORTS: { complete: true },
          HISTORY_RESIDENCE: { complete: false },
          HISTORY_EMPLOYMENT: { complete: false },
          HISTORY_EDUCATION: { complete: true },
          RELATIONSHIPS_STATUS_MARITAL: { complete: true },
          RELATIONSHIPS_STATUS_COHABITANTS: { complete: true },
          RELATIONSHIPS_PEOPLE: { complete: true },
          RELATIONSHIPS_RELATIVES: { complete: true },
        },
        application: {
          Completed: {
            citizenship: [
              { subsection: 'status', valid: true },
              { subsection: 'multiple', valid: true },
              { subsection: 'passports', valid: true },
            ],
            history: [
              { subsection: 'residence', valid: false },
              { subsection: 'employment', valid: false },
              { subsection: 'education', valid: true },
              { subsection: 'federal', valid: false },
            ],
            relationships: [
              { subsection: 'status/marital', valid: true },
              { subsection: 'status/cohabitant', valid: true },
              { subsection: 'people', valid: true },
              { subsection: 'relatives', valid: true },
            ],
          },
          Settings: {
            formType: 'SF86',
          },
        },
      }

      expect(completedSections(state)).toEqual(2)
    })
  })
})
