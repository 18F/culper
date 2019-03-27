import { totalSections, completedSections } from './navigation'

describe('Navigation helpers', () => {
  describe('totalSections function', () => {
    it('returns the number of top-level form sections', () => {
      const state = {
        authentication: { formType: 'SF86' },
      }

      expect(totalSections(state)).toEqual(10)
    })
  })

  describe('completedSections function', () => {
    it('returns the number of completed top-level form sections', () => {
      const state = {
        authentication: { formType: 'SF86' },
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
        },
      }

      expect(completedSections(state)).toEqual(2)
    })
  })
})
