import navigation, { navigationWalker } from './navigation'

describe('The navigation config', () => {
  it('has 11 section', () => {
    expect(navigation.length).toBe(11)
  })

  it('can call a validator', () => {
    let count = 0
    navigationWalker((path, child) => {
      if (child.validator) {
        // eslint-disable-next-line new-cap
        const valid = new child.validator().isValid()
        if (valid) {
          console.log(`Section ${child.name} validates with empty data set.`)
        }
        count++
        expect(valid).toBe(false)
      }
    })
    expect(count).toBe(79)
  })
})
