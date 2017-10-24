import PhysicalValidator from './physical'

describe('Physical attributes validation', function () {
  it('should validate height', function () {
    const tests = [
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

    tests.forEach(test => {
      expect(new PhysicalValidator(test.state, null).validHeight()).toBe(test.expected)
    })
  })

  it('should validate weight', function () {
    const tests = [
      {
        state: {
          Weight: { value: 0 }
        },
        expected: false
      },
      {
        state: {
          Weight: { value: 6 }
        },
        expected: false
      },
      {
        state: {
          Weight: { value: 10 }
        },
        expected: true
      }
    ]

    tests.forEach(test => {
      expect(new PhysicalValidator(test.state, null).validWeight()).toBe(test.expected)
    })
  })

  it('should validate hair color', function () {
    const tests = [
      {
        state: {
          HairColor: { value: '' }
        },
        expected: false
      },
      {
        state: {
          HairColor: { value: 'Brown' }
        },
        expected: true
      },
      {
        state: {
          HairColor: null
        },
        expected: false
      },
      {
        state: {
          HairColor: { value: 'SomethingDifferent' }
        },
        expected: false
      }
    ]

    tests.forEach(test => {
      expect(new PhysicalValidator(test.state, null).validHairColor()).toBe(test.expected)
    })
  })

  it('should validate eye color', function () {
    const tests = [
      {
        state: {
          EyeColor: { value: 'Black' }
        },
        expected: true
      },
      {
        state: {
          EyeColor: { value: '' }
        },
        expected: false
      },
      {
        state: {
          EyeColor: null
        },
        expected: false
      },
      {
        state: {
          EyeColor: { value: 'SomethingDifferent' }
        },
        expected: false
      }
    ]

    tests.forEach(test => {
      expect(new PhysicalValidator(test.state, null).validEyeColor()).toBe(test.expected)
    })
  })

  it('should validate sex', function () {
    const tests = [
      {
        state: {
          Sex: { value: 'female' }
        },
        expected: true
      },
      {
        state: {
          Sex: { value: 'male' }
        },
        expected: true
      },
      {
        state: {
          Sex: null
        },
        expected: false
      }
    ]

    tests.forEach(test => {
      expect(new PhysicalValidator(test.state, null).validSex()).toBe(test.expected)
    })
  })

  it('should validate physical attributes', function () {
    const tests = [
      {
        state: {
          Height: {
            feet: 5,
            inches: 0
          },
          Weight: { value: 100 },
          HairColor: { value: 'Brown' },
          EyeColor: { value: 'Black' },
          Sex: { value: 'female' }
        },
        expected: true
      },
      {
        state: {
          Height: {
            feet: 5,
            inches: 0
          },
          Weight: { value: -1 },
          HairColor: { value: 'Brown' },
          EyeColor: { value: 'Black' },
          Sex: { value: 'female' }
        },
        expected: false
      }
    ]

    tests.forEach(test => {
      expect(new PhysicalValidator(test.state, null).isValid()).toBe(test.expected)
    })
  })
})
