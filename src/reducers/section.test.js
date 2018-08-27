import section from './section'
import SectionConstants from '../actions/SectionConstants'

describe('Section Reducer', function() {
  it('should handle section updates', function() {
    const tests = [
      {
        state: {},
        action: {
          section: 'Foo',
          property: 'Bar',
          type: SectionConstants.SECTION_UPDATE
        },
        expected: {
          section: 'Foo'
        }
      }
    ]
    tests.forEach(test => {
      expect(section(test.state, test.action)).toEqual(test.expected)
    })
  })
})
