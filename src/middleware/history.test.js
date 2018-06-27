import { findPosition } from './history'

describe('history middleware', function () {
  it('should find the position', function () {
    const el = {
      offsetTop: 10,
      offsetParent: {
        offsetTop: 2
      }
    }
    const top = findPosition(el)
    expect(top).toEqual([12])
  })
})
