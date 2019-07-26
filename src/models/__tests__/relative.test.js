import { validateModel } from 'models/validate'
import relative, {
  isCitizen, requireCitizenshipDocumentation, requireResidenceDocumentation,
  isLivingNonCitizen,
} from '../relative'

describe('The isCitizen function', () => {
  it('returns false if there is no Citizenship attribute', () => {
    expect(isCitizen({})).toEqual(false)
  })

  it('returns false if there is no Citizenship value', () => {
    expect(isCitizen({ Citizenship: 'United States' })).toEqual(false)
  })

  it('returns false if the Citizenship value does not include United States', () => {
    expect(isCitizen({ Citizenship: { value: ['test'] } })).toEqual(false)
  })

  it('returns true if the Citizenship value includes United States', () => {
    expect(isCitizen({ Citizenship: { value: ['United States'] } })).toEqual(true)
  })
})

describe('The requireCitizenshipDocumentation function', () => {
  it('returns false if there is no Citizenship attribute', () => {
    expect(requireCitizenshipDocumentation({})).toEqual(false)
  })

  it('returns false if the relation is not a US citizen', () => {
    expect(requireCitizenshipDocumentation({ Citizenship: { value: ['Canada'] } }))
      .toEqual(false)
  })

  it('returns false if the relation was born in the US', () => {
    expect(requireCitizenshipDocumentation({
      Citizenship: { value: ['United States', 'Canada'] },
      Birthplace: { country: { value: 'United States' } },
    }))
      .toEqual(false)
  })

  it('returns true if the relation was born outside the US', () => {
    expect(requireCitizenshipDocumentation({
      Citizenship: { value: ['United States', 'Canada'] },
      Birthplace: { country: { value: 'Canada' } },
    }))
      .toEqual(true)
  })
})

describe('The requireResidenceDocumentation function', () => {
  it('returns false if the relation is a US citizen', () => {
    expect(requireResidenceDocumentation({
      Citizenship: { value: ['United States', 'Canada'] },
    })).toEqual(false)
  })

  it('returns false if the relation is not a current US resident', () => {
    expect(requireResidenceDocumentation({
      Citizenship: { value: ['Canada'] },
      Address: {
        country: 'Canada',
      },
    })).toEqual(false)
  })

  it('returns false if the relation is deceased', () => {
    expect(requireResidenceDocumentation({
      Citizenship: { value: ['Canada'] },
      Address: { country: 'United States' },
      IsDeceased: { value: 'Yes' },
    })).toEqual(false)
  })

  it('returns true if the relation is a living non-US citizen residing in the US', () => {
    expect(requireResidenceDocumentation({
      Citizenship: { value: ['Canada'] },
      Address: { country: 'United States' },
      IsDeceased: { value: 'No' },
    })).toEqual(true)
  })
})

describe('The isLivingNonCitizen function', () => {
  it('returns false if the relation is deceased', () => {
    expect(isLivingNonCitizen({
      IsDeceased: { value: 'Yes' },
    })).toEqual(false)
  })

  it('returns false if the relation is a US citizen', () => {
    expect(isLivingNonCitizen({
      IsDeceased: { value: 'No' },
      Citizenship: { value: ['United States'] },
    })).toEqual(false)
  })

  it('returns true if the relation is a living non-US citizen', () => {
    expect(isLivingNonCitizen({
      IsDeceased: { value: 'No' },
      Citizenship: { value: ['Canada'] },
    })).toEqual(true)
  })
})

describe('The relative model', () => {
  it('Name is required', () => {
    const testData = {}
    const expectedErrors = ['Name.presence.REQUIRED']

    expect(validateModel(testData, relative))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('Name must be a valid name', () => {
    const testData = {
      Name: 'My Name',
    }
    const expectedErrors = [
      'Name.model.first.presence.REQUIRED',
      'Name.model.middle.presence.REQUIRED',
      'Name.model.last.presence.REQUIRED',
    ]

    expect(validateModel(testData, relative))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('Relation is required', () => {
    const testData = {}
    const expectedErrors = ['Relation.presence.REQUIRED']

    expect(validateModel(testData, relative))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('Relation must have a value', () => {
    const testData = {
      Relation: { value: '' },
    }
    const expectedErrors = ['Relation.hasValue.MISSING_VALUE']

    expect(validateModel(testData, relative))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('Birthdate is required', () => {
    const testData = {}
    const expectedErrors = ['Birthdate.presence.REQUIRED']

    expect(validateModel(testData, relative))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('Birthdate must be a valid date', () => {
    const testData = {
      Birthdate: { day: '2', month: 'July' },
    }
    const expectedErrors = [
      'Birthdate.date.year.presence.REQUIRED',
      'Birthdate.date.date.datetime.INVALID_DATE',
    ]

    expect(validateModel(testData, relative))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  describe('if relation is mother or father', () => {
    it('Birthdate must be no more than 200 years ago', () => {
      const testData = {
        Relation: { value: 'Father' },
        Birthdate: { day: 10, month: 10, year: 1800 },
      }

      const expectedErrors = ['Birthdate.date']
      expect(validateModel(testData, relative))
        .toEqual(expect.arrayContaining(expectedErrors))
    })
  })

  describe('if relation is other', () => {
    it('Birthdate must be no more than 200 years ago', () => {
      const testData = {
        Relation: { value: 'Half-sister' },
        Birthdate: { day: 10, month: 10, year: 1800 },
      }

      const expectedErrors = ['Birthdate.date']
      expect(validateModel(testData, relative))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('Birthdate cannot be in the future', () => {
      const testData = {
        Relation: { value: 'Guardian' },
        Birthdate: { day: 10, month: 10, year: 2050 },
      }

      const expectedErrors = ['Birthdate.date']
      expect(validateModel(testData, relative))
        .toEqual(expect.arrayContaining(expectedErrors))
    })
  })

  it('Birthplace is required', () => {
    const testData = {}
    const expectedErrors = ['Birthplace.presence.REQUIRED']

    expect(validateModel(testData, relative))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('Birthplace must be a valid location', () => {
    const testData = {
      Birthplace: { country: 'United States' },
    }
    const expectedErrors = [
      'Birthplace.location.city.presence.REQUIRED',
      'Birthplace.location.state.presence.REQUIRED',
    ]

    expect(validateModel(testData, relative))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('Citizenship is required', () => {
    const testData = {}
    const expectedErrors = ['Citizenship.presence.REQUIRED']

    expect(validateModel(testData, relative))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('Citizenship must have a valid value', () => {
    const testData = {
      Citizenship: { value: true },
    }
    const expectedErrors = ['Citizenship.country.INVALID_COUNTRY']

    expect(validateModel(testData, relative))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('IsDeceased is required', () => {
    const testData = {}
    const expectedErrors = ['IsDeceased.presence.REQUIRED']

    expect(validateModel(testData, relative))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('IsDeceased must have a valid value', () => {
    const testData = {
      IsDeceased: { value: 'Test' },
    }
    const expectedErrors = ['IsDeceased.hasValue.value.inclusion.INCLUSION']

    expect(validateModel(testData, relative))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  describe('if relation is Mother', () => {
    it('MaidenName is required', () => {
      const testData = {
        Relation: { value: 'Mother' },
      }

      const expectedErrors = ['MaidenName.presence.REQUIRED']

      expect(validateModel(testData, relative))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('MaidenName can be same as listed', () => {
      const testData = {
        Relation: { value: 'Mother' },
        MaidenSameAsListed: { value: 'Yes' },
      }

      const expectedErrors = ['MaidenName.presence.REQUIRED']

      expect(validateModel(testData, relative))
        .not.toEqual(expect.arrayContaining(expectedErrors))
    })

    it('MaidenName must be a valid name', () => {
      const testData = {
        Relation: { value: 'Mother' },
        MaidenName: 'Myname',
      }

      const expectedErrors = [
        'MaidenName.model.first.presence.REQUIRED',
        'MaidenName.model.middle.presence.REQUIRED',
        'MaidenName.model.last.presence.REQUIRED',
      ]

      expect(validateModel(testData, relative))
        .toEqual(expect.arrayContaining(expectedErrors))
    })
  })

  describe('if relation isn’t Mother', () => {
    it('MaidenName is not required', () => {
      const testData = {
        Relation: { value: 'Father' },
      }

      const expectedErrors = ['MaidenName.presence.REQUIRED']

      expect(validateModel(testData, relative))
        .not.toEqual(expect.arrayContaining(expectedErrors))
    })
  })

  describe('for immediate relations', () => {
    it('Aliases are required', () => {
      const testData = {
        Relation: { value: 'Father' },
      }

      const expectedErrors = ['Aliases.presence.REQUIRED']

      expect(validateModel(testData, relative))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('Aliases must be a valid branch collection', () => {
      const testData = {
        Relation: { value: 'Father' },
        Aliases: {
          items: [],
        },
      }

      const expectedErrors = ['Aliases.branchCollection.MISSING_ITEMS']

      expect(validateModel(testData, relative))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    describe('without Aliases', () => {
      it('passes a valid relative', () => {
        const testData = {
          Relation: { value: 'Father' },
          Aliases: {
            items: [
              { Item: { Has: { value: 'No' } } },
            ],
          },
        }

        const expectedErrors = ['Aliases.branchCollection']

        expect(validateModel(testData, relative))
          .not.toEqual(expect.arrayContaining(expectedErrors))
      })
    })

    describe('with Aliases', () => {
      it('Aliases must be valid', () => {
        const testData = {
          Relation: { value: 'Father' },
          Aliases: {
            items: [
              { Item: { Has: { value: 'Yes' }, Name: 'Invalid name' } },
              { Item: { Has: { value: 'No' } } },
            ],
          },
        }

        const expectedErrors = [
          'Aliases.branchCollection.0.Name.model.first.presence.REQUIRED',
        ]

        expect(validateModel(testData, relative))
          .toEqual(expect.arrayContaining(expectedErrors))
      })

      it('Aliases cannot be before birthdate', () => {
        const testData = {
          Relation: { value: 'Father' },
          Birthdate: { year: 1950, month: 5, day: 3 },
          Aliases: {
            items: [
              {
                Item: {
                  Has: { value: 'Yes' },
                  Name: { first: 'Alias', middle: 'Name', last: 'Something' },
                  Dates: {
                    from: { year: 1930, month: 1, day: 30 },
                    to: { year: 2018, month: 8, day: 10 },
                  },
                  MaidenName: { value: 'No' },
                  Reason: { value: 'Because' },
                },
              },
              { Item: { Has: { value: 'No' } } },
            ],
          },
        }

        const expectedErrors = [
          'Aliases.branchCollection.0.Dates.daterange.from.date.date.datetime.DATE_TOO_EARLY',
        ]

        expect(validateModel(testData, relative))
          .toEqual(expect.arrayContaining(expectedErrors))
      })

      it('passes a valid alias', () => {
        const testData = {
          Relation: { value: 'Father' },
          Aliases: {
            items: [
              {
                Item: {
                  Has: { value: 'Yes' },
                  Name: { first: 'Alias', noMiddleName: true, last: 'Name' },
                  MaidenName: { value: 'No' },
                  Dates: {
                    from: { year: 2011, month: 1, day: 1 },
                    present: true,
                  },
                  Reason: { value: 'Because' },
                },
              },
              { Item: { Has: { value: 'No' } } },
            ],
          },
        }

        const expectedErrors = ['Aliases.branchCollection']

        expect(validateModel(testData, relative))
          .not.toEqual(expect.arrayContaining(expectedErrors))
      })

      describe('if relation is Mother', () => {
        it('Aliases hide maiden name', () => {
          const testData = {
            Relation: { value: 'Mother' },
            Aliases: {
              items: [
                {
                  Item: {
                    Has: { value: 'Yes' },
                    Name: { first: 'Alias', noMiddleName: true, last: 'Name' },
                    Dates: {
                      from: { year: 2011, month: 1, day: 1 },
                      present: true,
                    },
                    Reason: { value: 'Because' },
                  },
                },
                { Item: { Has: { value: 'No' } } },
              ],
            },
          }

          const expectedErrors = ['Aliases.branchCollection']

          expect(validateModel(testData, relative))
            .not.toEqual(expect.arrayContaining(expectedErrors))
        })
      })
    })
  })

  describe('for non-immediate relations', () => {
    it('Aliases are not required', () => {
      const testData = {
        Relation: { value: 'Guardian' },
      }

      const expectedErrors = ['Aliases.presence.REQUIRED']

      expect(validateModel(testData, relative))
        .not.toEqual(expect.arrayContaining(expectedErrors))
    })

    it('passes a valid relative', () => {
      const testData = {
        Name: { first: 'Relative', noMiddleName: true, last: 'Person' },
        Relation: { value: 'Father-in-law' },
        Birthdate: { year: 1960, month: 2, day: 10 },
        Citizenship: { value: ['Canada', 'United States'] },
        Birthplace: {
          city: 'New York',
          state: 'NY',
          country: 'United States',
        },
        Address: {
          street: '123 Street',
          city: 'New York',
          state: 'NY',
          zipcode: '10001',
          country: 'United States',
        },
        AlternateAddress: {
          HasDifferentAddress: { value: 'No' },
        },
        IsDeceased: { value: 'No' },
      }

      expect(validateModel(testData, relative)).toEqual(true)
    })
  })

  describe('if deceased', () => {
    it('Address is not required', () => {
      const testData = {
        IsDeceased: { value: 'Yes' },
      }
      const expectedErrors = ['Address.presence.REQUIRED']

      expect(validateModel(testData, relative))
        .not.toEqual(expect.arrayContaining(expectedErrors))
    })

    it('passes a valid relative', () => {
      const testData = {
        Name: { first: 'Relative', noMiddleName: true, last: 'Person' },
        Relation: { value: 'Father' },
        Birthdate: { year: 1960, month: 2, day: 10 },
        Citizenship: { value: ['Canada', 'United States'] },
        Birthplace: {
          city: 'New York',
          state: 'NY',
          country: 'United States',
        },
        Aliases: { items: [{ Item: { Has: { value: 'No' } } }] },
        IsDeceased: { value: 'Yes' },
      }

      expect(validateModel(testData, relative)).toEqual(true)
    })
  })

  describe('if not deceased', () => {
    it('Address is required', () => {
      const testData = {
        IsDeceased: { value: 'No' },
      }
      const expectedErrors = ['Address.presence.REQUIRED']

      expect(validateModel(testData, relative))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('Address must be a valid location', () => {
      const testData = {
        IsDeceased: { value: 'No' },
        Address: { country: 'United States' },
      }
      const expectedErrors = [
        'Address.location.street.presence.REQUIRED',
        'Address.location.city.presence.REQUIRED',
        'Address.location.state.presence.REQUIRED',
        'Address.location.zipcode.presence.REQUIRED',
      ]

      expect(validateModel(testData, relative))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('AlternateAddress is required', () => {
      const testData = {
        IsDeceased: { value: 'No' },
      }
      const expectedErrors = ['AlternateAddress.required']

      expect(validateModel(testData, relative))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('AlternateAddress must be a valid physical address', () => {
      const testData = {
        IsDeceased: { value: 'No' },
        AlternateAddress: {
          HasDifferentAddress: false,
        },
      }
      const expectedErrors = ['AlternateAddress.model']

      expect(validateModel(testData, relative))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('AlternateAddress must be a military address', () => {
      const testData = {
        IsDeceased: { value: 'No' },
        AlternateAddress: {
          HasDifferentAddress: { value: 'Yes' },
          Address: {
            street: '123 Main ST',
            city: 'New York',
            state: 'NY',
            zipcode: '10003',
            country: 'United States',
          },
        },
      }
      const expectedErrors = ['AlternateAddress.model']

      expect(validateModel(testData, relative))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('passes a valid relative', () => {
      const testData = {
        Name: { first: 'Relative', noMiddleName: true, last: 'Person' },
        Relation: { value: 'Father' },
        Birthdate: { year: 1960, month: 2, day: 10 },
        Citizenship: { value: ['Canada', 'United States'] },
        Birthplace: {
          city: 'New York',
          state: 'NY',
          country: 'United States',
        },
        Address: {
          street: '123 Street',
          city: 'New York',
          state: 'NY',
          zipcode: '10001',
          country: 'United States',
        },
        Aliases: { items: [{ Item: { Has: { value: 'No' } } }] },
        IsDeceased: { value: 'No' },
        AlternateAddress: {
          HasDifferentAddress: { value: 'Yes' },
          Address: {
            street: '123 Main ST',
            city: 'FPO',
            state: 'AA',
            zipcode: '34035',
            country: 'POSTOFFICE',
          },
        },
      }

      expect(validateModel(testData, relative)).toEqual(true)
    })
  })

  describe('if US citizen', () => {
    describe('if born in the US', () => {
      it('CitizenshipDocumentation is not required', () => {
        const testData = {
          Citizenship: { value: ['United States'] },
          Birthplace: { country: 'United States' },
        }
        const expectedErrors = ['CitizenshipDocumentation.presence.REQUIRED']

        expect(validateModel(testData, relative))
          .not.toEqual(expect.arrayContaining(expectedErrors))
      })

      it('DocumentNumber is not required', () => {
        const testData = {
          Citizenship: { value: ['United States'] },
          Birthplace: { country: 'United States' },
        }
        const expectedErrors = ['DocumentNumber.presence.REQUIRED']

        expect(validateModel(testData, relative))
          .not.toEqual(expect.arrayContaining(expectedErrors))
      })

      it('CourtName is not required', () => {
        const testData = {
          Citizenship: { value: ['United States'] },
          Birthplace: { country: 'United States' },
        }
        const expectedErrors = ['CourtName.presence.REQUIRED']

        expect(validateModel(testData, relative))
          .not.toEqual(expect.arrayContaining(expectedErrors))
      })

      it('CourtAddress is not required', () => {
        const testData = {
          Citizenship: { value: ['United States'] },
          Birthplace: { country: 'United States' },
        }
        const expectedErrors = ['CourtAddress.presence.REQUIRED']

        expect(validateModel(testData, relative))
          .not.toEqual(expect.arrayContaining(expectedErrors))
      })

      it('passes a valid relative', () => {
        const testData = {
          Name: { first: 'Relative', noMiddleName: true, last: 'Person' },
          Relation: { value: 'Father' },
          Birthdate: { year: 1960, month: 2, day: 10 },
          Citizenship: { value: ['Canada', 'United States'] },
          Birthplace: {
            city: 'New York',
            state: 'NY',
            country: 'United States',
          },
          Address: {
            street: '123 Street',
            city: 'New York',
            state: 'NY',
            zipcode: '10001',
            country: 'United States',
          },
          AlternateAddress: {
            HasDifferentAddress: { value: 'No' },
          },
          Aliases: { items: [{ Item: { Has: { value: 'No' } } }] },
          IsDeceased: { value: 'No' },
        }

        expect(validateModel(testData, relative)).toEqual(true)
      })
    })

    describe('if not born in the US', () => {
      it('CitizenshipDocumentation is required', () => {
        const testData = {
          Citizenship: { value: ['United States'] },
          Birthplace: { country: 'Canada' },
        }
        const expectedErrors = ['CitizenshipDocumentation.presence.REQUIRED']

        expect(validateModel(testData, relative))
          .toEqual(expect.arrayContaining(expectedErrors))
      })

      it('CitizenshipDocumentation must be a valid value', () => {
        const testData = {
          Citizenship: { value: ['United States'] },
          Birthplace: { country: 'Canada' },
          CitizenshipDocumentation: { value: 'Invalid' },
        }
        const expectedErrors = ['CitizenshipDocumentation.hasValue.value.inclusion.INCLUSION']

        expect(validateModel(testData, relative))
          .toEqual(expect.arrayContaining(expectedErrors))
      })

      describe('if CitizenshipDocumentation is "Other"', () => {
        it('OtherCitizenshipDocumentation is required', () => {
          const testData = {
            Citizenship: { value: ['United States'] },
            Birthplace: { country: 'Canada' },
            CitizenshipDocumentation: { value: 'Other' },
          }
          const expectedErrors = ['OtherCitizenshipDocumentation.presence.REQUIRED']

          expect(validateModel(testData, relative))
            .toEqual(expect.arrayContaining(expectedErrors))
        })

        it('OtherCitizenshipDocumentation must have a valid value', () => {
          const testData = {
            Citizenship: { value: ['United States'] },
            Birthplace: { country: 'Canada' },
            CitizenshipDocumentation: { value: 'Other' },
            OtherCitizenshipDocumentation: { value: '' },
          }
          const expectedErrors = ['OtherCitizenshipDocumentation.hasValue.MISSING_VALUE']

          expect(validateModel(testData, relative))
            .toEqual(expect.arrayContaining(expectedErrors))
        })

        it('passes a valid relative', () => {
          const testData = {
            Name: { first: 'Relative', noMiddleName: true, last: 'Person' },
            Relation: { value: 'Father' },
            Birthdate: { year: 1960, month: 2, day: 10 },
            Citizenship: { value: ['Canada', 'United States'] },
            Birthplace: { city: 'Toronto', country: 'Canada' },
            Address: {
              street: '123 Street',
              city: 'New York',
              state: 'NY',
              zipcode: '10001',
              country: 'United States',
            },
            AlternateAddress: {
              HasDifferentAddress: { value: 'No' },
            },
            Aliases: { items: [{ Item: { Has: { value: 'No' } } }] },
            IsDeceased: { value: 'No' },
            CitizenshipDocumentation: { value: 'Other' },
            OtherCitizenshipDocumentation: { value: 'Some explanation' },
            DocumentNumber: { value: 'abc123' },
            CourtName: { value: 'Test Court' },
            CourtAddress: {
              street: '123 Court St',
              city: 'New York',
              state: 'NY',
              zipcode: '10002',
              country: 'United States',
            },
          }

          expect(validateModel(testData, relative)).toEqual(true)
        })
      })

      it('DocumentNumber is required', () => {
        const testData = {
          Citizenship: { value: ['United States'] },
          Birthplace: { country: 'Canada' },
        }
        const expectedErrors = ['DocumentNumber.presence.REQUIRED']

        expect(validateModel(testData, relative))
          .toEqual(expect.arrayContaining(expectedErrors))
      })

      it('DocumentNumber must have a valid value', () => {
        const testData = {
          Citizenship: { value: ['United States'] },
          Birthplace: { country: 'Canada' },
          DocumentNumber: '12345',
        }
        const expectedErrors = ['DocumentNumber.hasValue.MISSING_VALUE']

        expect(validateModel(testData, relative))
          .toEqual(expect.arrayContaining(expectedErrors))
      })

      it('CourtName is required', () => {
        const testData = {
          Citizenship: { value: ['United States'] },
          Birthplace: { country: 'Canada' },
        }
        const expectedErrors = ['CourtName.presence.REQUIRED']

        expect(validateModel(testData, relative))
          .toEqual(expect.arrayContaining(expectedErrors))
      })

      it('CourtName must have a valid value', () => {
        const testData = {
          Citizenship: { value: ['United States'] },
          Birthplace: { country: 'Canada' },
          CourtName: 'something',
        }
        const expectedErrors = ['CourtName.hasValue.MISSING_VALUE']

        expect(validateModel(testData, relative))
          .toEqual(expect.arrayContaining(expectedErrors))
      })

      it('CourtAddress is required', () => {
        const testData = {
          Citizenship: { value: ['United States'] },
          Birthplace: { country: 'Canada' },
        }
        const expectedErrors = ['CourtAddress.presence.REQUIRED']

        expect(validateModel(testData, relative))
          .toEqual(expect.arrayContaining(expectedErrors))
      })

      it('CourtAddress must be a valid US address', () => {
        const testData = {
          Citizenship: { value: ['United States'] },
          Birthplace: { country: 'Canada' },
          CourtAddress: {
            street: '123 Test St',
            city: 'Some City',
            country: { value: 'Canada' },
          },
        }
        const expectedErrors = [
          'CourtAddress.location.country.inclusion.INCLUSION',
        ]

        expect(validateModel(testData, relative))
          .toEqual(expect.arrayContaining(expectedErrors))
      })

      it('passes a valid relative', () => {
        const testData = {
          Name: { first: 'Relative', noMiddleName: true, last: 'Person' },
          Relation: { value: 'Father' },
          Birthdate: { year: 1960, month: 2, day: 10 },
          Citizenship: { value: ['Canada', 'United States'] },
          Birthplace: { city: 'Toronto', country: 'Canada' },
          Address: {
            street: '123 Street',
            city: 'New York',
            state: 'NY',
            zipcode: '10001',
            country: 'United States',
          },
          AlternateAddress: {
            HasDifferentAddress: { value: 'No' },
          },
          Aliases: { items: [{ Item: { Has: { value: 'No' } } }] },
          IsDeceased: { value: 'No' },
          CitizenshipDocumentation: { value: 'NaturalizedAlien' },
          DocumentNumber: { value: 'abc123' },
          CourtName: { value: 'Test Court' },
          CourtAddress: {
            street: '123 Court St',
            city: 'New York',
            state: 'NY',
            zipcode: '10002',
            country: 'United States',
          },
        }

        expect(validateModel(testData, relative)).toEqual(true)
      })
    })
  })

  describe('if not US citizen', () => {
    it('CitizenshipDocumentation is not required', () => {
      const testData = {
        Citizenship: { value: ['Canada'] },
        Birthplace: { country: 'Canada' },
      }
      const expectedErrors = ['CitizenshipDocumentation.presence.REQUIRED']

      expect(validateModel(testData, relative))
        .not.toEqual(expect.arrayContaining(expectedErrors))
    })

    it('DocumentNumber is not required', () => {
      const testData = {
        Citizenship: { value: ['Canada'] },
        Birthplace: { country: 'Canada' },
      }
      const expectedErrors = ['DocumentNumber.presence.REQUIRED']

      expect(validateModel(testData, relative))
        .not.toEqual(expect.arrayContaining(expectedErrors))
    })

    it('CourtName is not required', () => {
      const testData = {
        Citizenship: { value: ['Canada'] },
        Birthplace: { country: 'Canada' },
      }
      const expectedErrors = ['CourtName.presence.REQUIRED']

      expect(validateModel(testData, relative))
        .not.toEqual(expect.arrayContaining(expectedErrors))
    })

    it('CourtAddress is not required', () => {
      const testData = {
        Citizenship: { value: ['Canada'] },
        Birthplace: { country: 'Canada' },
      }
      const expectedErrors = ['CourtAddress.presence.REQUIRED']

      expect(validateModel(testData, relative))
        .not.toEqual(expect.arrayContaining(expectedErrors))
    })

    describe('if deceased', () => {
      it('FirstContact is not required', () => {
        const testData = {
          Citizenship: { value: ['Canada'] },
          IsDeceased: { value: 'Yes' },
        }
        const expectedErrors = ['FirstContact.presence.REQUIRED']

        expect(validateModel(testData, relative))
          .not.toEqual(expect.arrayContaining(expectedErrors))
      })

      it('LastContact is not required', () => {
        const testData = {
          Citizenship: { value: ['Canada'] },
          IsDeceased: { value: 'Yes' },
        }
        const expectedErrors = ['LastContact.presence.REQUIRED']

        expect(validateModel(testData, relative))
          .not.toEqual(expect.arrayContaining(expectedErrors))
      })

      it('Methods is not required', () => {
        const testData = {
          Citizenship: { value: ['Canada'] },
          IsDeceased: { value: 'Yes' },
        }
        const expectedErrors = ['Methods.presence.REQUIRED']

        expect(validateModel(testData, relative))
          .not.toEqual(expect.arrayContaining(expectedErrors))
      })

      it('Frequency is not required', () => {
        const testData = {
          Citizenship: { value: ['Canada'] },
          IsDeceased: { value: 'Yes' },
        }
        const expectedErrors = ['Frequency.presence.REQUIRED']

        expect(validateModel(testData, relative))
          .not.toEqual(expect.arrayContaining(expectedErrors))
      })

      it('passes a valid relative', () => {
        const testData = {
          Name: { first: 'Relative', noMiddleName: true, last: 'Person' },
          Relation: { value: 'Father' },
          Birthdate: { year: 1960, month: 2, day: 10 },
          Citizenship: { value: ['Canada'] },
          Birthplace: { city: 'Toronto', country: 'Canada' },
          Aliases: { items: [{ Item: { Has: { value: 'No' } } }] },
          IsDeceased: { value: 'Yes' },
        }

        expect(validateModel(testData, relative)).toEqual(true)
      })
    })

    describe('if not deceased', () => {
      it('FirstContact is required', () => {
        const testData = {
          Citizenship: { value: ['Canada'] },
          IsDeceased: { value: 'No' },
        }
        const expectedErrors = ['FirstContact.presence.REQUIRED']

        expect(validateModel(testData, relative))
          .toEqual(expect.arrayContaining(expectedErrors))
      })

      it('FirstContact must be a valid date', () => {
        const testData = {
          Citizenship: { value: ['Canada'] },
          IsDeceased: { value: 'No' },
          FirstContact: 'invalid',
        }
        const expectedErrors = [
          'FirstContact.date.day.presence.REQUIRED',
          'FirstContact.date.month.presence.REQUIRED',
          'FirstContact.date.year.presence.REQUIRED',
        ]

        expect(validateModel(testData, relative))
          .toEqual(expect.arrayContaining(expectedErrors))
      })

      it('LastContact is required', () => {
        const testData = {
          Citizenship: { value: ['Canada'] },
          IsDeceased: { value: 'No' },
        }
        const expectedErrors = ['LastContact.presence.REQUIRED']

        expect(validateModel(testData, relative))
          .toEqual(expect.arrayContaining(expectedErrors))
      })

      it('LastContact must be a valid date', () => {
        const testData = {
          Citizenship: { value: ['Canada'] },
          IsDeceased: { value: 'No' },
          LastContact: 'invalid',
        }
        const expectedErrors = [
          'LastContact.date.day.presence.REQUIRED',
          'LastContact.date.month.presence.REQUIRED',
          'LastContact.date.year.presence.REQUIRED',
        ]

        expect(validateModel(testData, relative))
          .toEqual(expect.arrayContaining(expectedErrors))
      })

      it('LastContact must be after FirstContact', () => {
        const testData = {
          Citizenship: { value: ['Canada'] },
          IsDeceased: { value: 'No' },
          FirstContact: { day: 8, month: 5, year: 2015 },
          LastContact: { day: 2, month: 3, year: 2015 },
        }
        const expectedErrors = ['LastContact.date']

        expect(validateModel(testData, relative))
          .toEqual(expect.arrayContaining(expectedErrors))
      })

      it('Methods is required', () => {
        const testData = {
          Citizenship: { value: ['Canada'] },
          IsDeceased: { value: 'No' },
        }
        const expectedErrors = ['Methods.presence.REQUIRED']

        expect(validateModel(testData, relative))
          .toEqual(expect.arrayContaining(expectedErrors))
      })

      it('Methods must have at least one value', () => {
        const testData = {
          Citizenship: { value: ['Canada'] },
          IsDeceased: { value: 'No' },
          Methods: { values: [] },
        }
        const expectedErrors = ['Methods.array.array.length.LENGTH_TOO_SHORT']

        expect(validateModel(testData, relative))
          .toEqual(expect.arrayContaining(expectedErrors))
      })

      describe('if any Methods are "Other"', () => {
        it('MethodsComments is required', () => {
          const testData = {
            Citizenship: { value: ['Canada'] },
            IsDeceased: { value: 'No' },
            Methods: { values: ['Written', 'Other'] },
          }
          const expectedErrors = ['MethodsComments.presence.REQUIRED']

          expect(validateModel(testData, relative))
            .toEqual(expect.arrayContaining(expectedErrors))
        })

        it('MethodsComments must have a value', () => {
          const testData = {
            Citizenship: { value: ['Canada'] },
            IsDeceased: { value: 'No' },
            Methods: { values: ['Other'] },
            MethodsComments: { value: '' },
          }
          const expectedErrors = ['MethodsComments.hasValue.MISSING_VALUE']

          expect(validateModel(testData, relative))
            .toEqual(expect.arrayContaining(expectedErrors))
        })

        it('passes a valid relative', () => {
          const testData = {
            Name: { first: 'Relative', noMiddleName: true, last: 'Person' },
            Relation: { value: 'Father' },
            Birthdate: { year: 1960, month: 2, day: 10 },
            Citizenship: { value: ['Canada'] },
            Birthplace: { city: 'Toronto', country: 'Canada' },
            Address: {
              street: '123 Street',
              city: 'New York',
              state: 'NY',
              zipcode: '10001',
              country: 'United States',
            },
            AlternateAddress: {
              HasDifferentAddress: { value: 'No' },
            },
            Aliases: { items: [{ Item: { Has: { value: 'No' } } }] },
            IsDeceased: { value: 'No' },
            Document: { value: 'Permanent' },
            ResidenceDocumentNumber: { value: 'abc' },
            Expiration: { year: 2015, month: 8, day: 2 },
            Employer: { value: 'Boss' },
            EmployerAddressNotApplicable: { applicable: false },
            HasAffiliation: { value: 'No' },
            FirstContact: { year: 1980, month: 1, day: 1 },
            LastContact: { year: 2019, month: 2, day: 10 },
            Methods: { values: ['Other'] },
            MethodsComments: { value: 'Internet' },
            Frequency: { value: 'Daily' },
          }

          expect(validateModel(testData, relative)).toEqual(true)
        })
      })

      it('Frequency is required', () => {
        const testData = {
          Citizenship: { value: ['Canada'] },
          IsDeceased: { value: 'No' },
        }
        const expectedErrors = ['Frequency.presence.REQUIRED']

        expect(validateModel(testData, relative))
          .toEqual(expect.arrayContaining(expectedErrors))
      })

      it('Frequency must have a value', () => {
        const testData = {
          Citizenship: { value: ['Canada'] },
          IsDeceased: { value: 'No' },
          Frequency: { value: '' },
        }
        const expectedErrors = ['Frequency.hasValue.MISSING_VALUE']

        expect(validateModel(testData, relative))
          .toEqual(expect.arrayContaining(expectedErrors))
      })

      it('passes a valid relative', () => {
        const testData = {
          Name: { first: 'Relative', noMiddleName: true, last: 'Person' },
          Relation: { value: 'Father' },
          Birthdate: { year: 1960, month: 2, day: 10 },
          Citizenship: { value: ['Canada'] },
          Birthplace: { city: 'Toronto', country: 'Canada' },
          Address: {
            street: '123 Street',
            city: 'New York',
            state: 'NY',
            zipcode: '10001',
            country: 'United States',
          },
          AlternateAddress: {
            HasDifferentAddress: { value: 'No' },
          },
          Aliases: { items: [{ Item: { Has: { value: 'No' } } }] },
          IsDeceased: { value: 'No' },
          Document: { value: 'Permanent' },
          ResidenceDocumentNumber: { value: 'abc' },
          Expiration: { year: 2015, month: 8, day: 2 },
          Employer: { value: 'Boss' },
          EmployerAddressNotApplicable: { applicable: false },
          HasAffiliation: { value: 'No' },
          FirstContact: { year: 1980, month: 1, day: 1 },
          LastContact: { year: 2019, month: 2, day: 10 },
          Methods: { values: ['Telephone'] },
          Frequency: { value: 'Daily' },
        }

        expect(validateModel(testData, relative)).toEqual(true)
      })

      describe('if Frequency is "Other"', () => {
        it('FrequencyComments is required', () => {
          const testData = {
            Citizenship: { value: ['Canada'] },
            IsDeceased: { value: 'No' },
            Frequency: { value: 'Other' },
          }
          const expectedErrors = ['FrequencyComments.presence.REQUIRED']

          expect(validateModel(testData, relative))
            .toEqual(expect.arrayContaining(expectedErrors))
        })

        it('FrequencyComments must have a value', () => {
          const testData = {
            Citizenship: { value: ['Canada'] },
            IsDeceased: { value: 'No' },
            Frequency: { value: 'Other' },
            FrequencyComments: { value: '' },
          }
          const expectedErrors = ['FrequencyComments.hasValue.MISSING_VALUE']

          expect(validateModel(testData, relative))
            .toEqual(expect.arrayContaining(expectedErrors))
        })

        it('passes a valid relative', () => {
          const testData = {
            Name: { first: 'Relative', noMiddleName: true, last: 'Person' },
            Relation: { value: 'Father' },
            Birthdate: { year: 1960, month: 2, day: 10 },
            Citizenship: { value: ['Canada'] },
            Birthplace: { city: 'Toronto', country: 'Canada' },
            Address: {
              street: '123 Street',
              city: 'New York',
              state: 'NY',
              zipcode: '10001',
              country: 'United States',
            },
            AlternateAddress: {
              HasDifferentAddress: { value: 'No' },
            },
            Aliases: { items: [{ Item: { Has: { value: 'No' } } }] },
            IsDeceased: { value: 'No' },
            Document: { value: 'Permanent' },
            ResidenceDocumentNumber: { value: 'abc' },
            Expiration: { year: 2015, month: 8, day: 2 },
            Employer: { value: 'Boss' },
            EmployerAddressNotApplicable: { applicable: false },
            HasAffiliation: { value: 'No' },
            FirstContact: { year: 1980, month: 1, day: 1 },
            LastContact: { year: 2019, month: 2, day: 10 },
            Methods: { values: ['Telephone'] },
            Frequency: { value: 'Other' },
            FrequencyComments: { value: 'Sometimes' },
          }

          expect(validateModel(testData, relative)).toEqual(true)
        })
      })
    })

    describe('if not residing in the US', () => {
      it('Document is not required', () => {
        const testData = {
          Citizenship: { value: ['Canada'] },
          Address: { country: 'Canada' },
        }
        const expectedErrors = ['Document.presence.REQUIRED']

        expect(validateModel(testData, relative))
          .not.toEqual(expect.arrayContaining(expectedErrors))
      })

      describe('if deceased', () => {
        it('Employer is not required', () => {
          const testData = {
            Citizenship: { value: ['Canada'] },
            Address: { country: 'Canada' },
            IsDeceased: { value: 'Yes' },
          }
          const expectedErrors = ['Employer.presence.REQUIRED']

          expect(validateModel(testData, relative))
            .not.toEqual(expect.arrayContaining(expectedErrors))
        })

        it('EmployerAddress is not required', () => {
          const testData = {
            Citizenship: { value: ['Canada'] },
            Address: { country: 'Canada' },
            IsDeceased: { value: 'Yes' },
          }
          const expectedErrors = ['EmployerAddress.presence.REQUIRED']

          expect(validateModel(testData, relative))
            .not.toEqual(expect.arrayContaining(expectedErrors))
        })

        it('EmployerRelationship is not required', () => {
          const testData = {
            Citizenship: { value: ['Canada'] },
            Address: { country: 'Canada' },
            IsDeceased: { value: 'Yes' },
          }
          const expectedErrors = ['EmployerRelationship.presence.REQUIRED']

          expect(validateModel(testData, relative))
            .not.toEqual(expect.arrayContaining(expectedErrors))
        })

        it('passes a valid relative', () => {
          const testData = {
            Name: { first: 'Relative', noMiddleName: true, last: 'Person' },
            Relation: { value: 'Father' },
            Birthdate: { year: 1960, month: 2, day: 10 },
            Citizenship: { value: ['Canada'] },
            Birthplace: { city: 'Toronto', country: 'Canada' },
            Aliases: { items: [{ Item: { Has: { value: 'No' } } }] },
            IsDeceased: { value: 'Yes' },
          }

          expect(validateModel(testData, relative)).toEqual(true)
        })
      })

      describe('if not deceased', () => {
        it('Employer is required', () => {
          const testData = {
            Citizenship: { value: ['Canada'] },
            Address: { country: 'Canada' },
            IsDeceased: { value: 'No' },
          }
          const expectedErrors = ['Employer.presence.REQUIRED']

          expect(validateModel(testData, relative))
            .toEqual(expect.arrayContaining(expectedErrors))
        })

        it('Employer must have a value', () => {
          const testData = {
            Citizenship: { value: ['Canada'] },
            Address: { country: 'Canada' },
            IsDeceased: { value: 'No' },
            Employer: 'invalid',
          }
          const expectedErrors = ['Employer.hasValue.MISSING_VALUE']

          expect(validateModel(testData, relative))
            .toEqual(expect.arrayContaining(expectedErrors))
        })

        describe('if Employer is not applicable', () => {
          it('Employer is not required', () => {
            const testData = {
              Citizenship: { value: ['Canada'] },
              Address: { country: 'Canada' },
              IsDeceased: { value: 'No' },
              EmployerNotApplicable: { applicable: false },
            }
            const expectedErrors = ['Employer.presence.REQUIRED']

            expect(validateModel(testData, relative))
              .not.toEqual(expect.arrayContaining(expectedErrors))
          })

          it('passes a valid relative', () => {
            const testData = {
              Name: { first: 'Relative', noMiddleName: true, last: 'Person' },
              Relation: { value: 'Father' },
              Birthdate: { year: 1960, month: 2, day: 10 },
              Citizenship: { value: ['Canada'] },
              Birthplace: { city: 'Toronto', country: 'Canada' },
              Address: {
                street: '123 Street',
                city: 'Toronto',
                country: 'Canada',
              },
              AlternateAddress: {
                HasDifferentAddress: { value: 'No' },
              },
              Aliases: { items: [{ Item: { Has: { value: 'No' } } }] },
              IsDeceased: { value: 'No' },
              EmployerNotApplicable: { applicable: false },
              EmployerAddressNotApplicable: { applicable: false },
              HasAffiliation: { value: 'No' },
              FirstContact: { year: 1980, month: 1, day: 1 },
              LastContact: { year: 2019, month: 2, day: 10 },
              Methods: { values: ['Telephone'] },
              Frequency: { value: 'Daily' },
            }

            expect(validateModel(testData, relative)).toEqual(true)
          })
        })

        it('EmployerAddress is required', () => {
          const testData = {
            Citizenship: { value: ['Canada'] },
            Address: { country: 'Canada' },
            IsDeceased: { value: 'No' },
          }
          const expectedErrors = ['EmployerAddress.presence.REQUIRED']

          expect(validateModel(testData, relative))
            .toEqual(expect.arrayContaining(expectedErrors))
        })

        it('EmployerAddress must be a valid address', () => {
          const testData = {
            Citizenship: { value: ['Canada'] },
            Address: { country: 'Canada' },
            IsDeceased: { value: 'No' },
            EmployerAddress: 'invalid',
          }
          const expectedErrors = [
            'EmployerAddress.location.street.presence.REQUIRED',
            'EmployerAddress.location.city.presence.REQUIRED',
            'EmployerAddress.location.country.presence.REQUIRED',
          ]

          expect(validateModel(testData, relative))
            .toEqual(expect.arrayContaining(expectedErrors))
        })

        describe('if EmployerAddress is not applicable', () => {
          it('EmployerAddress is not required', () => {
            const testData = {
              Citizenship: { value: ['Canada'] },
              Address: { country: 'Canada' },
              IsDeceased: { value: 'No' },
              EmployerAddressNotApplicable: { applicable: false },
            }
            const expectedErrors = ['EmployerAddress.presence.REQUIRED']

            expect(validateModel(testData, relative))
              .not.toEqual(expect.arrayContaining(expectedErrors))
          })

          it('passes a valid relative', () => {
            const testData = {
              Name: { first: 'Relative', noMiddleName: true, last: 'Person' },
              Relation: { value: 'Father' },
              Birthdate: { year: 1960, month: 2, day: 10 },
              Citizenship: { value: ['Canada'] },
              Birthplace: { city: 'Toronto', country: 'Canada' },
              Address: {
                street: '123 Street',
                city: 'Toronto',
                country: 'Canada',
              },
              AlternateAddress: {
                HasDifferentAddress: { value: 'No' },
              },
              Aliases: { items: [{ Item: { Has: { value: 'No' } } }] },
              IsDeceased: { value: 'No' },
              Employer: { value: 'Boss' },
              EmployerAddressNotApplicable: { applicable: false },
              HasAffiliation: { value: 'No' },
              FirstContact: { year: 1980, month: 1, day: 1 },
              LastContact: { year: 2019, month: 2, day: 10 },
              Methods: { values: ['Telephone'] },
              Frequency: { value: 'Daily' },
            }

            expect(validateModel(testData, relative)).toEqual(true)
          })
        })

        it('HasAffiliation is required', () => {
          const testData = {
            Citizenship: { value: ['Canada'] },
            Address: { country: 'Canada' },
            IsDeceased: { value: 'No' },
          }
          const expectedErrors = ['HasAffiliation.presence.REQUIRED']

          expect(validateModel(testData, relative))
            .toEqual(expect.arrayContaining(expectedErrors))
        })

        it('HasAffiliation must have a valid value', () => {
          const testData = {
            Citizenship: { value: ['Canada'] },
            Address: { country: 'Canada' },
            IsDeceased: { value: 'No' },
            HasAffiliation: { value: 'invalid' },
          }
          const expectedErrors = ['HasAffiliation.hasValue.value.inclusion.INCLUSION']

          expect(validateModel(testData, relative))
            .toEqual(expect.arrayContaining(expectedErrors))
        })

        describe('if EmployerRelationship is not applicable', () => {
          it('HasAffiliation is not required', () => {
            const testData = {
              Citizenship: { value: ['Canada'] },
              Address: { country: 'Canada' },
              IsDeceased: { value: 'No' },
              EmployerRelationshipNotApplicable: { applicable: false },
            }
            const expectedErrors = ['HasAffiliation.presence.REQUIRED']

            expect(validateModel(testData, relative))
              .not.toEqual(expect.arrayContaining(expectedErrors))
          })

          it('passes a valid relative', () => {
            const testData = {
              Name: { first: 'Relative', noMiddleName: true, last: 'Person' },
              Relation: { value: 'Father' },
              Birthdate: { year: 1960, month: 2, day: 10 },
              Citizenship: { value: ['Canada'] },
              Birthplace: { city: 'Toronto', country: 'Canada' },
              Address: {
                street: '123 Street',
                city: 'Toronto',
                country: 'Canada',
              },
              AlternateAddress: {
                HasDifferentAddress: { value: 'No' },
              },
              Aliases: { items: [{ Item: { Has: { value: 'No' } } }] },
              IsDeceased: { value: 'No' },
              Employer: { value: 'Boss' },
              EmployerAddressNotApplicable: { applicable: false },
              EmployerRelationshipNotApplicable: { applicable: false },
              FirstContact: { year: 1980, month: 1, day: 1 },
              LastContact: { year: 2019, month: 2, day: 10 },
              Methods: { values: ['Telephone'] },
              Frequency: { value: 'Daily' },
            }

            expect(validateModel(testData, relative)).toEqual(true)
          })
        })

        describe('if HasAffiliation is "Yes"', () => {
          it('EmployerRelationship is required', () => {
            const testData = {
              Citizenship: { value: ['Canada'] },
              Address: { country: 'Canada' },
              IsDeceased: { value: 'No' },
              HasAffiliation: { value: 'Yes' },
            }
            const expectedErrors = ['EmployerRelationship.presence.REQUIRED']

            expect(validateModel(testData, relative))
              .toEqual(expect.arrayContaining(expectedErrors))
          })

          it('EmployerRelationship must have a value', () => {
            const testData = {
              Citizenship: { value: ['Canada'] },
              Address: { country: 'Canada' },
              IsDeceased: { value: 'No' },
              HasAffiliation: { value: 'Yes' },
              EmployerRelationship: 'something',
            }
            const expectedErrors = ['EmployerRelationship.hasValue.MISSING_VALUE']

            expect(validateModel(testData, relative))
              .toEqual(expect.arrayContaining(expectedErrors))
          })

          it('passes a valid relative', () => {
            const testData = {
              Name: { first: 'Relative', noMiddleName: true, last: 'Person' },
              Relation: { value: 'Father' },
              Birthdate: { year: 1960, month: 2, day: 10 },
              Citizenship: { value: ['Canada'] },
              Birthplace: { city: 'Toronto', country: 'Canada' },
              Address: {
                street: '123 Street',
                city: 'Toronto',
                country: 'Canada',
              },
              AlternateAddress: {
                HasDifferentAddress: { value: 'No' },
              },
              Aliases: { items: [{ Item: { Has: { value: 'No' } } }] },
              IsDeceased: { value: 'No' },
              Employer: { value: 'Boss' },
              EmployerAddressNotApplicable: { applicable: false },
              HasAffiliation: { value: 'Yes' },
              EmployerRelationship: { value: 'Test' },
              FirstContact: { year: 1980, month: 1, day: 1 },
              LastContact: { year: 2019, month: 2, day: 10 },
              Methods: { values: ['Telephone'] },
              Frequency: { value: 'Daily' },
            }

            expect(validateModel(testData, relative)).toEqual(true)
          })
        })

        describe('if HasAffiliation is "No"', () => {
          it('EmployerRelationship not is required', () => {
            const testData = {
              Citizenship: { value: ['Canada'] },
              Address: { country: 'Canada' },
              IsDeceased: { value: 'No' },
              HasAffiliation: { value: 'No' },
            }
            const expectedErrors = ['EmployerRelationship.presence.REQUIRED']

            expect(validateModel(testData, relative))
              .not.toEqual(expect.arrayContaining(expectedErrors))
          })

          it('passes a valid relative', () => {
            const testData = {
              Name: { first: 'Relative', noMiddleName: true, last: 'Person' },
              Relation: { value: 'Father' },
              Birthdate: { year: 1960, month: 2, day: 10 },
              Citizenship: { value: ['Canada'] },
              Birthplace: { city: 'Toronto', country: 'Canada' },
              Address: {
                street: '123 Street',
                city: 'Toronto',
                country: 'Canada',
              },
              AlternateAddress: {
                HasDifferentAddress: { value: 'No' },
              },
              Aliases: { items: [{ Item: { Has: { value: 'No' } } }] },
              IsDeceased: { value: 'No' },
              Employer: { value: 'Boss' },
              EmployerAddress: {
                street: '123 Work Street',
                city: 'Toronto',
                country: 'Canada',
              },
              HasAffiliation: { value: 'No' },
              FirstContact: { year: 1980, month: 1, day: 1 },
              LastContact: { year: 2019, month: 2, day: 10 },
              Methods: { values: ['Telephone'] },
              Frequency: { value: 'Daily' },
            }

            expect(validateModel(testData, relative)).toEqual(true)
          })
        })
      })
    })

    describe('if residing in the US', () => {
      describe('if deceased', () => {
        it('Document is not required', () => {
          const testData = {
            Citizenship: { value: ['Canada'] },
            Birthplace: { country: 'Canada' },
            Address: { country: 'United States' },
            IsDeceased: { value: 'Yes' },
          }
          const expectedErrors = ['Document.presence.REQUIRED']

          expect(validateModel(testData, relative))
            .not.toEqual(expect.arrayContaining(expectedErrors))
        })

        it('passes a valid relative', () => {
          const testData = {
            Name: { first: 'Relative', noMiddleName: true, last: 'Person' },
            Relation: { value: 'Father' },
            Birthdate: { year: 1960, month: 2, day: 10 },
            Citizenship: { value: ['Canada'] },
            Birthplace: { city: 'Toronto', country: 'Canada' },
            Aliases: { items: [{ Item: { Has: { value: 'No' } } }] },
            IsDeceased: { value: 'Yes' },
          }

          expect(validateModel(testData, relative)).toEqual(true)
        })
      })

      describe('if not deceased', () => {
        it('Document is required', () => {
          const testData = {
            Citizenship: { value: ['Canada'] },
            Birthplace: { country: 'Canada' },
            Address: { country: 'United States' },
            IsDeceased: { value: 'No' },
          }
          const expectedErrors = ['Document.presence.REQUIRED']

          expect(validateModel(testData, relative))
            .toEqual(expect.arrayContaining(expectedErrors))
        })

        it('Document must have a valid value', () => {
          const testData = {
            Citizenship: { value: ['Canada'] },
            Birthplace: { country: 'Canada' },
            Address: { country: 'United States' },
            IsDeceased: { value: 'No' },
            Document: { value: 'invalid' },
          }
          const expectedErrors = ['Document.hasValue.value.inclusion.INCLUSION']

          expect(validateModel(testData, relative))
            .toEqual(expect.arrayContaining(expectedErrors))
        })

        describe('if Document is "Other"', () => {
          it('DocumentComments is required', () => {
            const testData = {
              Citizenship: { value: ['Canada'] },
              Birthplace: { country: 'Canada' },
              Address: { country: 'United States' },
              IsDeceased: { value: 'No' },
              Document: { value: 'Other' },
            }
            const expectedErrors = ['DocumentComments.presence.REQUIRED']

            expect(validateModel(testData, relative))
              .toEqual(expect.arrayContaining(expectedErrors))
          })

          it('DocumentComments must have a valid value', () => {
            const testData = {
              Citizenship: { value: ['Canada'] },
              Birthplace: { country: 'Canada' },
              Address: { country: 'United States' },
              IsDeceased: { value: 'No' },
              Document: { value: 'Other' },
              DocumentComments: { value: '' },
            }
            const expectedErrors = ['DocumentComments.hasValue.MISSING_VALUE']

            expect(validateModel(testData, relative))
              .toEqual(expect.arrayContaining(expectedErrors))
          })
        })

        it('ResidenceDocumentNumber is required', () => {
          const testData = {
            Citizenship: { value: ['Canada'] },
            Birthplace: { country: 'Canada' },
            Address: { country: 'United States' },
            IsDeceased: { value: 'No' },
          }
          const expectedErrors = ['ResidenceDocumentNumber.presence.REQUIRED']

          expect(validateModel(testData, relative))
            .toEqual(expect.arrayContaining(expectedErrors))
        })

        it('ResidenceDocumentNumber must have a valid value', () => {
          const testData = {
            Citizenship: { value: ['Canada'] },
            Birthplace: { country: 'Canada' },
            Address: { country: 'United States' },
            IsDeceased: { value: 'No' },
            ResidenceDocumentNumber: { value: '' },
          }
          const expectedErrors = ['ResidenceDocumentNumber.hasValue.MISSING_VALUE']

          expect(validateModel(testData, relative))
            .toEqual(expect.arrayContaining(expectedErrors))
        })

        it('Expiration is required', () => {
          const testData = {
            Citizenship: { value: ['Canada'] },
            Birthplace: { country: 'Canada' },
            Address: { country: 'United States' },
            IsDeceased: { value: 'No' },
          }
          const expectedErrors = ['Expiration.presence.REQUIRED']

          expect(validateModel(testData, relative))
            .toEqual(expect.arrayContaining(expectedErrors))
        })

        it('Expiration must be a valid date', () => {
          const testData = {
            Citizenship: { value: ['Canada'] },
            Birthplace: { country: 'Canada' },
            Address: { country: 'United States' },
            IsDeceased: { value: 'No' },
            Expiration: 'someday',
          }
          const expectedErrors = [
            'Expiration.date.day.presence.REQUIRED',
            'Expiration.date.month.presence.REQUIRED',
            'Expiration.date.year.presence.REQUIRED',
          ]

          expect(validateModel(testData, relative))
            .toEqual(expect.arrayContaining(expectedErrors))
        })

        it('passes a valid relative', () => {
          const testData = {
            Name: { first: 'Relative', noMiddleName: true, last: 'Person' },
            Relation: { value: 'Father' },
            Birthdate: { year: 1960, month: 2, day: 10 },
            Citizenship: { value: ['Canada'] },
            Birthplace: { city: 'Toronto', country: 'Canada' },
            Address: {
              street: '123 Street',
              city: 'New York',
              state: 'NY',
              zipcode: '10002',
              country: 'United States',
            },
            AlternateAddress: {
              HasDifferentAddress: { value: 'No' },
            },
            Aliases: { items: [{ Item: { Has: { value: 'No' } } }] },
            IsDeceased: { value: 'No' },
            Document: { value: 'Permanent' },
            ResidenceDocumentNumber: { value: 'abc' },
            Expiration: { year: 2015, month: 8, day: 2 },
            FirstContact: { year: 1980, month: 1, day: 1 },
            LastContact: { year: 2019, month: 2, day: 10 },
            Methods: { values: ['Telephone'] },
            Frequency: { value: 'Daily' },
          }

          expect(validateModel(testData, relative)).toEqual(true)
        })
      })
    })
  })
})
