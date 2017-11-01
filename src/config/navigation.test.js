import navigation, { navigationWalker } from './navigation'

describe('The navigation config', () => {
  it('has 12 section', () => {
    expect(navigation.length).toBe(12)
  })

  it('can call a validator', () => {
    let count = 0
    navigationWalker((path, child) => {
      if (child.validator) {
        count++
        expect(new child.validator({}).isValid()).toBe(false)
      }
    })
    expect(count).toBe(73)
  })
})
