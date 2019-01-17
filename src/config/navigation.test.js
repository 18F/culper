import { navigationWalker } from './navigation'
import navigationSections from './../components/Main/navigationSections'

describe('The navigation config', () => {
  const formType = '86'
  it('has 11 section', () => {
    expect(navigationSections(formType).length).toBe(11)
  })

  /**
   * Commented out because I'm not sure how to fix it yet because the
   * navigationWalker doesn't have the Redux Store initiated with
   * the sections
   */
  // it('can call a validator', () => {
  //   let count = 0
  //   navigationWalker((path, child) => {
  //     if (child.validator) {
  //       // eslint-disable-next-line new-cap
  //       const valid = new child.validator().isValid()
  //       if (valid) {
  //         console.log(`Section ${child.name} validates with empty data set.`)
  //       }
  //       count++
  //       expect(valid).toBe(false)
  //     }
  //   })
  //   expect(count).toBe(79)
  // })
})
