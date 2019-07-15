import { validateModel } from 'models/validate'
import foreignTravel from '../foreignTravel'

describe('The foreignTravel model', () => {
  const SF86Options = {
    requireForeignCounterIntelligence: true,
    requireForeignExcessiveKnowledge: true,
    requireForeignSensitiveInformation: true,
    requireForeignThreatened: true,
  }
  it('validates required fields', () => {
    const testData = {}
    const expectedErrors = [
      'Country.required',
      'Dates.required',
      'Days.required',
      'Purpose.required',
      'Questioned.required',
      'Encounter.required',
      'Contacted.required',
      'Counter.required',
      'Interest.required',
      'Sensitive.required',
      'Threatened.required',
    ]
    expect(validateModel(testData, foreignTravel, SF86Options))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('Country must have a value', () => {
    const testData = {
      Country: { values: 'test' },
    }
    const expectedErrors = ['Country.hasValue']
    expect(validateModel(testData, foreignTravel, SF86Options))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('Dates must be a valid date range', () => {
    const testData = {
      Dates: 'invalid date',
    }
    const expectedErrors = ['Dates.daterange']
    expect(validateModel(testData, foreignTravel, SF86Options))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('Days must have a valid value', () => {
    const testData = {
      Days: { value: 'invalid' },
    }
    const expectedErrors = ['Days.hasValue']
    expect(validateModel(testData, foreignTravel, SF86Options))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('Purpose must have at least one value', () => {
    const testData = {
      Purpose: { values: [] },
    }
    const expectedErrors = ['Purpose.array']
    expect(validateModel(testData, foreignTravel, SF86Options))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('Purpose must have valid values', () => {
    const testData = {
      Purpose: { values: ['invalid', 'test'] },
    }
    const expectedErrors = ['Purpose.array']
    expect(validateModel(testData, foreignTravel, SF86Options))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('Questioned must have a valid value', () => {
    const testData = {
      Questioned: { value: false },
    }
    const expectedErrors = ['Questioned.hasValue']
    expect(validateModel(testData, foreignTravel, SF86Options))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  describe('if Questioned is "Yes"', () => {
    it('QuestionedExplanation is required', () => {
      const testData = {
        Questioned: { value: 'Yes' },
      }
      const expectedErrors = ['QuestionedExplanation.required']
      expect(validateModel(testData, foreignTravel, SF86Options))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('QuestionedExplanation must have a value', () => {
      const testData = {
        Questioned: { value: 'Yes' },
        QuestionedExplanation: 'Test',
      }
      const expectedErrors = ['QuestionedExplanation.hasValue']
      expect(validateModel(testData, foreignTravel, SF86Options))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('passes a valid foreign travel', () => {
      const testData = {
        Country: { value: 'United Kingdom' },
        Dates: {
          from: { year: 2012, month: 8, day: 2 },
          to: { year: 2012, month: 8, day: 28 },
        },
        Days: { value: '21-30' },
        Purpose: { values: ['Business', 'Other'] },
        Questioned: { value: 'Yes' },
        QuestionedExplanation: { value: 'Test' },
        Encounter: { value: 'No' },
        Contacted: { value: 'No' },
        Counter: { value: 'No' },
        Interest: { value: 'No' },
        Sensitive: { value: 'No' },
        Threatened: { value: 'No' },
      }

      expect(validateModel(testData, foreignTravel, SF86Options)).toEqual(true)
    })
  })

  it('Encounter must have a valid value', () => {
    const testData = {
      Encounter: { value: false },
    }
    const expectedErrors = ['Encounter.hasValue']
    expect(validateModel(testData, foreignTravel, SF86Options))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  describe('if Encounter is "Yes"', () => {
    it('EncounterExplanation is required', () => {
      const testData = {
        Encounter: { value: 'Yes' },
      }
      const expectedErrors = ['EncounterExplanation.required']
      expect(validateModel(testData, foreignTravel, SF86Options))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('EncounterExplanation must have a value', () => {
      const testData = {
        Encounter: { value: 'Yes' },
        EncounterExplanation: 'Test',
      }
      const expectedErrors = ['EncounterExplanation.hasValue']
      expect(validateModel(testData, foreignTravel, SF86Options))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('passes a valid foreign travel', () => {
      const testData = {
        Country: { value: 'United Kingdom' },
        Dates: {
          from: { year: 2012, month: 8, day: 2 },
          to: { year: 2012, month: 8, day: 28 },
        },
        Days: { value: '21-30' },
        Purpose: { values: ['Business', 'Other'] },
        Questioned: { value: 'No' },
        Encounter: { value: 'Yes' },
        EncounterExplanation: { value: 'Test' },
        Contacted: { value: 'No' },
        Counter: { value: 'No' },
        Interest: { value: 'No' },
        Sensitive: { value: 'No' },
        Threatened: { value: 'No' },
      }

      expect(validateModel(testData, foreignTravel, SF86Options)).toEqual(true)
    })
  })

  it('Contacted must have a valid value', () => {
    const testData = {
      Contacted: { value: false },
    }
    const expectedErrors = ['Contacted.hasValue']
    expect(validateModel(testData, foreignTravel, SF86Options))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  describe('if Contacted is "Yes"', () => {
    it('ContactedExplanation is required', () => {
      const testData = {
        Contacted: { value: 'Yes' },
      }
      const expectedErrors = ['ContactedExplanation.required']
      expect(validateModel(testData, foreignTravel, SF86Options))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('ContactedExplanation must have a value', () => {
      const testData = {
        Contacted: { value: 'Yes' },
        ContactedExplanation: 'Test',
      }
      const expectedErrors = ['ContactedExplanation.hasValue']
      expect(validateModel(testData, foreignTravel, SF86Options))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('passes a valid foreign travel', () => {
      const testData = {
        Country: { value: 'United Kingdom' },
        Dates: {
          from: { year: 2012, month: 8, day: 2 },
          to: { year: 2012, month: 8, day: 28 },
        },
        Days: { value: '21-30' },
        Purpose: { values: ['Business', 'Other'] },
        Questioned: { value: 'No' },
        Encounter: { value: 'No' },
        Contacted: { value: 'Yes' },
        ContactedExplanation: { value: 'Test' },
        Counter: { value: 'No' },
        Interest: { value: 'No' },
        Sensitive: { value: 'No' },
        Threatened: { value: 'No' },
      }

      expect(validateModel(testData, foreignTravel, SF86Options)).toEqual(true)
    })
  })

  it('Counter must have a valid value', () => {
    const testData = {
      Counter: { value: false },
    }
    const expectedErrors = ['Counter.hasValue']
    expect(validateModel(testData, foreignTravel, SF86Options))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  describe('if Counter is "Yes"', () => {
    it('CounterExplanation is required', () => {
      const testData = {
        Counter: { value: 'Yes' },
      }
      const expectedErrors = ['CounterExplanation.required']
      expect(validateModel(testData, foreignTravel, SF86Options))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('CounterExplanation must have a value', () => {
      const testData = {
        Counter: { value: 'Yes' },
        CounterExplanation: 'Test',
      }
      const expectedErrors = ['CounterExplanation.hasValue']
      expect(validateModel(testData, foreignTravel, SF86Options))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('passes a valid foreign travel', () => {
      const testData = {
        Country: { value: 'United Kingdom' },
        Dates: {
          from: { year: 2012, month: 8, day: 2 },
          to: { year: 2012, month: 8, day: 28 },
        },
        Days: { value: '21-30' },
        Purpose: { values: ['Business', 'Other'] },
        Questioned: { value: 'No' },
        Encounter: { value: 'No' },
        Contacted: { value: 'No' },
        Counter: { value: 'Yes' },
        CounterExplanation: { value: 'Test' },
        Interest: { value: 'No' },
        Sensitive: { value: 'No' },
        Threatened: { value: 'No' },
      }

      expect(validateModel(testData, foreignTravel, SF86Options)).toEqual(true)
    })
  })

  it('Interest must have a valid value', () => {
    const testData = {
      Interest: { value: false },
    }
    const expectedErrors = ['Interest.hasValue']
    expect(validateModel(testData, foreignTravel, SF86Options))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  describe('if Interest is "Yes"', () => {
    it('InterestExplanation is required', () => {
      const testData = {
        Interest: { value: 'Yes' },
      }
      const expectedErrors = ['InterestExplanation.required']
      expect(validateModel(testData, foreignTravel, SF86Options))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('InterestExplanation must have a value', () => {
      const testData = {
        Interest: { value: 'Yes' },
        InterestExplanation: 'Test',
      }
      const expectedErrors = ['InterestExplanation.hasValue']
      expect(validateModel(testData, foreignTravel, SF86Options))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('passes a valid foreign travel', () => {
      const testData = {
        Country: { value: 'United Kingdom' },
        Dates: {
          from: { year: 2012, month: 8, day: 2 },
          to: { year: 2012, month: 8, day: 28 },
        },
        Days: { value: '21-30' },
        Purpose: { values: ['Business', 'Other'] },
        Questioned: { value: 'No' },
        Encounter: { value: 'No' },
        Contacted: { value: 'No' },
        Counter: { value: 'No' },
        Interest: { value: 'Yes' },
        InterestExplanation: { value: 'Test' },
        Sensitive: { value: 'No' },
        Threatened: { value: 'No' },
      }

      expect(validateModel(testData, foreignTravel, SF86Options)).toEqual(true)
    })
  })

  it('Sensitive must have a valid value', () => {
    const testData = {
      Sensitive: { value: false },
    }
    const expectedErrors = ['Sensitive.hasValue']
    expect(validateModel(testData, foreignTravel, SF86Options))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  describe('if Sensitive is "Yes"', () => {
    it('SensitiveExplanation is required', () => {
      const testData = {
        Sensitive: { value: 'Yes' },
      }
      const expectedErrors = ['SensitiveExplanation.required']
      expect(validateModel(testData, foreignTravel, SF86Options))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('SensitiveExplanation must have a value', () => {
      const testData = {
        Sensitive: { value: 'Yes' },
        SensitiveExplanation: 'Test',
      }
      const expectedErrors = ['SensitiveExplanation.hasValue']
      expect(validateModel(testData, foreignTravel, SF86Options))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('passes a valid foreign travel', () => {
      const testData = {
        Country: { value: 'United Kingdom' },
        Dates: {
          from: { year: 2012, month: 8, day: 2 },
          to: { year: 2012, month: 8, day: 28 },
        },
        Days: { value: '21-30' },
        Purpose: { values: ['Business', 'Other'] },
        Questioned: { value: 'No' },
        Encounter: { value: 'No' },
        Contacted: { value: 'No' },
        Counter: { value: 'No' },
        Interest: { value: 'No' },
        Sensitive: { value: 'Yes' },
        SensitiveExplanation: { value: 'Test' },
        Threatened: { value: 'No' },
      }

      expect(validateModel(testData, foreignTravel, SF86Options)).toEqual(true)
    })
  })

  it('Threatened must have a valid value', () => {
    const testData = {
      Threatened: { value: false },
    }
    const expectedErrors = ['Threatened.hasValue']
    expect(validateModel(testData, foreignTravel, SF86Options))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  describe('if Threatened is "Yes"', () => {
    it('ThreatenedExplanation is required', () => {
      const testData = {
        Threatened: { value: 'Yes' },
      }
      const expectedErrors = ['ThreatenedExplanation.required']
      expect(validateModel(testData, foreignTravel, SF86Options))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('ThreatenedExplanation must have a value', () => {
      const testData = {
        Threatened: { value: 'Yes' },
        ThreatenedExplanation: 'Test',
      }
      const expectedErrors = ['ThreatenedExplanation.hasValue']
      expect(validateModel(testData, foreignTravel, SF86Options))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('passes a valid foreign travel', () => {
      const testData = {
        Country: { value: 'United Kingdom' },
        Dates: {
          from: { year: 2012, month: 8, day: 2 },
          to: { year: 2012, month: 8, day: 28 },
        },
        Days: { value: '21-30' },
        Purpose: { values: ['Business', 'Other'] },
        Questioned: { value: 'No' },
        Encounter: { value: 'No' },
        Contacted: { value: 'No' },
        Counter: { value: 'No' },
        Interest: { value: 'No' },
        Sensitive: { value: 'No' },
        Threatened: { value: 'Yes' },
        ThreatenedExplanation: { value: 'Test' },
      }

      expect(validateModel(testData, foreignTravel, SF86Options)).toEqual(true)
    })
  })

  it('passes a valid foreign travel', () => {
    const testData = {
      Country: { value: 'United Kingdom' },
      Dates: {
        from: { year: 2012, month: 8, day: 2 },
        to: { year: 2012, month: 8, day: 28 },
      },
      Days: { value: '21-30' },
      Purpose: { values: ['Business', 'Other'] },
      Questioned: { value: 'No' },
      Encounter: { value: 'No' },
      Contacted: { value: 'No' },
      Counter: { value: 'No' },
      Interest: { value: 'No' },
      Sensitive: { value: 'No' },
      Threatened: { value: 'No' },
    }

    expect(validateModel(testData, foreignTravel, SF86Options)).toEqual(true)
  })

  describe('SF85P', () => {
    const SF85POptions = {
      requireForeignCounterIntelligence: false,
      requireForeignExcessiveKnowledge: false,
      requireForeignSensitiveInformation: false,
      requireForeignThreatened: false,
    }

    it('passes a valid foreign travel', () => {
      const testData = {
        Country: { value: 'United Kingdom' },
        Dates: {
          from: { year: 2012, month: 8, day: 2 },
          to: { year: 2012, month: 8, day: 28 },
        },
        Days: { value: '21-30' },
        Purpose: { values: ['Business', 'Other'] },
        Questioned: { value: 'No' },
        Encounter: { value: 'No' },
        Contacted: { value: 'No' },
      }
      expect(validateModel(testData, foreignTravel, SF85POptions)).toEqual(true)
    })
  })
})
