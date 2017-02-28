import NavigationValidator from './navigation'

describe('Navigation component validation', function () {
  it('should validate if route is considered complete and valid', function () {
    const tests = [
      {
        props: {
          completed: {
            identification: {
              name: {
                status: true
              },
              status: 'complete'
            }
          },
          crumbs: ['identification']
        },
        expected: true
      },
      {
        props: {
          completed: {
            identification: {
              name: {
                status: true
              },
              status: 'neutral'
            }
          },
          crumbs: ['identification']
        },
        expected: false
      },
      {
        props: {
          completed: {
            history: {
              name: {
                status: true
              },
              status: 'neutral'
            }
          },
          crumbs: ['identification']
        },
        expected: false
      }
    ]

    tests.forEach(test => {
      expect(new NavigationValidator(null, test.props).isValid()).toBe(test.expected)
    })
  })
})
