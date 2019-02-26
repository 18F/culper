import { reduceSubsections } from './formTypes'

describe('reduceSubsections', () => {
  it('should count the correct number of subsections in 1 section', () => {
    const fixture = [
      {
        subsections: [
          1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
        ],
      },
    ]

    expect(reduceSubsections(fixture).length).toEqual(10)
  })

  it('should count the correct number of subsections in multiple sections', () => {
    const fixture = [
      {
        subsections: [
          1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
        ],
      },
      {
        subsections: [
          11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
        ],
      },
    ]

    expect(reduceSubsections(fixture).length).toEqual(20)
  })

  it('should count the correct number of subsections in nested sections', () => {
    const fixture = [
      {
        subsections: [
          {
            subsections: [1, 2, 3],
          },
          4,
          5,
          6,
        ],
      },
      {
        subsections: [
          7,
          8,
          9,
          10,
        ],
      },
    ]

    expect(reduceSubsections(fixture).length).toEqual(10)
  })

  it('should count the correct number of subsections in super nested sections', () => {
    const fixture = [
      {
        subsections: [
          {
            subsections: [
              {
                subsections: [
                  1,
                  2,
                  {
                    subsections: [
                      3,
                      4,
                    ],
                  },
                ],
              },
              5,
              6,
              7,
            ],
          },
          8,
          9,
          10,
        ],
      },
    ]

    expect(reduceSubsections(fixture).length).toEqual(10)
  })
})
