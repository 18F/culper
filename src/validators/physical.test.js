import PhysicalValidator from './physical'

describe('Physical attributes validation', function () {
  it('should validate height', function () {
    const heights = [
      {
        state: {
          Height: {
            feet: 1,
            inches: 0
          }
        },
        expected: true
      },
      {
        state: {
          Height: {
            feet: 5,
            inches: 0
          }
        },
        expected: true
      },
      {
        state: {
          Height: {
            feet: 0,
            inches: 2
          }
        },
        expected: false
      },
      {
        state: {
          Height: null
        },
        expected: false
      }
    ]

    heights.forEach(test => {
      expect(new PhysicalValidator(test.state, null).validHeight()).toBe(test.expected)
    })
  })

  it('should validate weight', function () {
    const heights = [
      {
        state: {
          Weight: 0
        },
        expected: false
      },
      {
        state: {
          Weight: 6
        },
        expected: false
      },
      {
        state: {
          Weight: 10
        },
        expected: true
      }
    ]

    heights.forEach(test => {
      expect(new PhysicalValidator(test.state, null).validWeight()).toBe(test.expected)
    })
  })
})

