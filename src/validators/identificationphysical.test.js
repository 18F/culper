import IdentificationPhysicalValidator from './identificationphysical'

describe('Physical attributes validation', function() {
  it('should validate height', function() {
    const tests = [
      {
        data: {
          Height: {
            feet: 1,
            inches: 0
          }
        },
        expected: true
      },
      {
        data: {
          Height: {
            feet: 5,
            inches: 0
          }
        },
        expected: true
      },
      {
        data: {
          Height: {
            feet: 0,
            inches: 2
          }
        },
        expected: false
      },
      {
        data: {
          Height: null
        },
        expected: false
      }
    ]

    tests.forEach(test => {
      expect(new IdentificationPhysicalValidator(test.data).validHeight()).toBe(
        test.expected
      )
    })
  })

  it('should validate weight', function() {
    const tests = [
      {
        data: {
          Weight: { value: 0 }
        },
        expected: false
      },
      {
        data: {
          Weight: { value: 6 }
        },
        expected: false
      },
      {
        data: {
          Weight: { value: 10 }
        },
        expected: true
      }
    ]

    tests.forEach(test => {
      expect(new IdentificationPhysicalValidator(test.data).validWeight()).toBe(
        test.expected
      )
    })
  })

  it('should validate hair color', function() {
    const tests = [
      {
        data: {
          HairColor: { value: '' }
        },
        expected: false
      },
      {
        data: {
          HairColor: { value: 'Brown' }
        },
        expected: true
      },
      {
        data: {
          HairColor: null
        },
        expected: false
      },
      {
        data: {
          HairColor: { value: 'SomethingDifferent' }
        },
        expected: false
      }
    ]

    tests.forEach(test => {
      expect(
        new IdentificationPhysicalValidator(test.data).validHairColor()
      ).toBe(test.expected)
    })
  })

  it('should validate eye color', function() {
    const tests = [
      {
        data: {
          EyeColor: { value: 'Black' }
        },
        expected: true
      },
      {
        data: {
          EyeColor: { value: '' }
        },
        expected: false
      },
      {
        data: {
          EyeColor: null
        },
        expected: false
      },
      {
        data: {
          EyeColor: { value: 'SomethingDifferent' }
        },
        expected: false
      }
    ]

    tests.forEach(test => {
      expect(
        new IdentificationPhysicalValidator(test.data).validEyeColor()
      ).toBe(test.expected)
    })
  })

  it('should validate sex', function() {
    const tests = [
      {
        data: {
          Sex: { value: 'Female' }
        },
        expected: true
      },
      {
        data: {
          Sex: { value: 'Male' }
        },
        expected: true
      },
      {
        data: {
          Sex: null
        },
        expected: false
      }
    ]

    tests.forEach(test => {
      expect(new IdentificationPhysicalValidator(test.data).validSex()).toBe(
        test.expected
      )
    })
  })

  it('should validate physical attributes', function() {
    const tests = [
      {
        data: {
          Height: {
            feet: 5,
            inches: 0
          },
          Weight: { value: 100 },
          HairColor: { value: 'Brown' },
          EyeColor: { value: 'Black' },
          Sex: { value: 'Female' }
        },
        expected: true
      },
      {
        data: {
          Height: {
            feet: 5,
            inches: 0
          },
          Weight: { value: -1 },
          HairColor: { value: 'Brown' },
          EyeColor: { value: 'Black' },
          Sex: { value: 'Female' }
        },
        expected: false
      }
    ]

    tests.forEach(test => {
      expect(new IdentificationPhysicalValidator(test.data).isValid()).toBe(
        test.expected
      )
    })
  })
})
