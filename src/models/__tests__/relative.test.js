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
    const expectedErrors = ['Name.required']

    expect(validateModel(testData, relative))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('Name must be a valid name', () => {
    const testData = {
      Name: 'My Name',
    }
    const expectedErrors = ['Name.model']

    expect(validateModel(testData, relative))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('Relation is required', () => {
    const testData = {}
    const expectedErrors = ['Relation.required']

    expect(validateModel(testData, relative))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('Relation must have a value', () => {
    const testData = {
      Relation: { value: '' },
    }
    const expectedErrors = ['Relation.hasValue']

    expect(validateModel(testData, relative))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('Birthdate is required', () => {
    const testData = {}
    const expectedErrors = ['Birthdate.required']

    expect(validateModel(testData, relative))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('Birthdate must be a valid date', () => {
    const testData = {
      Birthdate: { day: '2', month: 'July' },
    }
    const expectedErrors = ['Birthdate.date']

    expect(validateModel(testData, relative))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('Birthplace is required', () => {
    const testData = {}
    const expectedErrors = ['Birthplace.required']

    expect(validateModel(testData, relative))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('Birthplace must be a valid location', () => {
    const testData = {
      Birthplace: { country: 'United States' },
    }
    const expectedErrors = ['Birthplace.location']

    expect(validateModel(testData, relative))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('Citizenship is required', () => {
    const testData = {}
    const expectedErrors = ['Citizenship.required']

    expect(validateModel(testData, relative))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('Citizenship must have a valid value', () => {
    const testData = {
      Citizenship: { value: true },
    }
    const expectedErrors = ['Citizenship.country']

    expect(validateModel(testData, relative))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('IsDeceased is required', () => {
    const testData = {}
    const expectedErrors = ['IsDeceased.required']

    expect(validateModel(testData, relative))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('IsDeceased must have a valid value', () => {
    const testData = {
      IsDeceased: { value: 'Test' },
    }
    const expectedErrors = ['IsDeceased.hasValue']

    expect(validateModel(testData, relative))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  describe('if relation is Mother', () => {
    it('MaidenName is required', () => {
      const testData = {
        Relation: { value: 'Mother' },
      }

      const expectedErrors = ['MaidenName.required']

      expect(validateModel(testData, relative))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('MaidenName can be same as listed', () => {
      const testData = {
        Relation: { value: 'Mother' },
        MaidenSameAsListed: { value: 'Yes' },
      }

      const expectedErrors = ['MaidenName.required']

      expect(validateModel(testData, relative))
        .not.toEqual(expect.arrayContaining(expectedErrors))
    })

    it('MaidenName must be a valid name', () => {
      const testData = {
        Relation: { value: 'Mother' },
        MaidenName: 'Myname',
      }

      const expectedErrors = ['MaidenName.model']

      expect(validateModel(testData, relative))
        .toEqual(expect.arrayContaining(expectedErrors))
    })
  })

  describe('if relation isn’t Mother', () => {
    it('MaidenName is not required', () => {
      const testData = {
        Relation: { value: 'Father' },
      }

      const expectedErrors = ['MaidenName.required']

      expect(validateModel(testData, relative))
        .not.toEqual(expect.arrayContaining(expectedErrors))
    })
  })

  describe('for immediate relations', () => {
    it('Aliases are required', () => {
      const testData = {
        Relation: { value: 'Father' },
      }

      const expectedErrors = ['Aliases.required']

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

      const expectedErrors = ['Aliases.branchCollection']

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

        const expectedErrors = ['Aliases.branchCollection']

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

      const expectedErrors = ['Aliases.required']

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
      const expectedErrors = ['Address.required']

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
      const expectedErrors = ['Address.required']

      expect(validateModel(testData, relative))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('Address must be a valid location', () => {
      const testData = {
        IsDeceased: { value: 'No' },
        Address: { country: 'United States' },
      }
      const expectedErrors = ['Address.location']

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
        const expectedErrors = ['CitizenshipDocumentation.required']

        expect(validateModel(testData, relative))
          .not.toEqual(expect.arrayContaining(expectedErrors))
      })

      it('DocumentNumber is not required', () => {
        const testData = {
          Citizenship: { value: ['United States'] },
          Birthplace: { country: 'United States' },
        }
        const expectedErrors = ['DocumentNumber.required']

        expect(validateModel(testData, relative))
          .not.toEqual(expect.arrayContaining(expectedErrors))
      })

      it('CourtName is not required', () => {
        const testData = {
          Citizenship: { value: ['United States'] },
          Birthplace: { country: 'United States' },
        }
        const expectedErrors = ['CourtName.required']

        expect(validateModel(testData, relative))
          .not.toEqual(expect.arrayContaining(expectedErrors))
      })

      it('CourtAddress is not required', () => {
        const testData = {
          Citizenship: { value: ['United States'] },
          Birthplace: { country: 'United States' },
        }
        const expectedErrors = ['CourtAddress.required']

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
        const expectedErrors = ['CitizenshipDocumentation.required']

        expect(validateModel(testData, relative))
          .toEqual(expect.arrayContaining(expectedErrors))
      })

      it('CitizenshipDocumentation must be a valid value', () => {
        const testData = {
          Citizenship: { value: ['United States'] },
          Birthplace: { country: 'Canada' },
          CitizenshipDocumentation: { value: 'Invalid' },
        }
        const expectedErrors = ['CitizenshipDocumentation.hasValue']

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
          const expectedErrors = ['OtherCitizenshipDocumentation.required']

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
          const expectedErrors = ['OtherCitizenshipDocumentation.hasValue']

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
        const expectedErrors = ['DocumentNumber.required']

        expect(validateModel(testData, relative))
          .toEqual(expect.arrayContaining(expectedErrors))
      })

      it('DocumentNumber must have a valid value', () => {
        const testData = {
          Citizenship: { value: ['United States'] },
          Birthplace: { country: 'Canada' },
          DocumentNumber: '12345',
        }
        const expectedErrors = ['DocumentNumber.hasValue']

        expect(validateModel(testData, relative))
          .toEqual(expect.arrayContaining(expectedErrors))
      })

      it('CourtName is required', () => {
        const testData = {
          Citizenship: { value: ['United States'] },
          Birthplace: { country: 'Canada' },
        }
        const expectedErrors = ['CourtName.required']

        expect(validateModel(testData, relative))
          .toEqual(expect.arrayContaining(expectedErrors))
      })

      it('CourtName must have a valid value', () => {
        const testData = {
          Citizenship: { value: ['United States'] },
          Birthplace: { country: 'Canada' },
          CourtName: 'something',
        }
        const expectedErrors = ['CourtName.hasValue']

        expect(validateModel(testData, relative))
          .toEqual(expect.arrayContaining(expectedErrors))
      })

      it('CourtAddress is required', () => {
        const testData = {
          Citizenship: { value: ['United States'] },
          Birthplace: { country: 'Canada' },
        }
        const expectedErrors = ['CourtAddress.required']

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
        const expectedErrors = ['CourtAddress.location']

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
      const expectedErrors = ['CitizenshipDocumentation.required']

      expect(validateModel(testData, relative))
        .not.toEqual(expect.arrayContaining(expectedErrors))
    })

    it('DocumentNumber is not required', () => {
      const testData = {
        Citizenship: { value: ['Canada'] },
        Birthplace: { country: 'Canada' },
      }
      const expectedErrors = ['DocumentNumber.required']

      expect(validateModel(testData, relative))
        .not.toEqual(expect.arrayContaining(expectedErrors))
    })

    it('CourtName is not required', () => {
      const testData = {
        Citizenship: { value: ['Canada'] },
        Birthplace: { country: 'Canada' },
      }
      const expectedErrors = ['CourtName.required']

      expect(validateModel(testData, relative))
        .not.toEqual(expect.arrayContaining(expectedErrors))
    })

    it('CourtAddress is not required', () => {
      const testData = {
        Citizenship: { value: ['Canada'] },
        Birthplace: { country: 'Canada' },
      }
      const expectedErrors = ['CourtAddress.required']

      expect(validateModel(testData, relative))
        .not.toEqual(expect.arrayContaining(expectedErrors))
    })

    describe('if deceased', () => {
      it('FirstContact is not required', () => {
        const testData = {
          Citizenship: { value: ['Canada'] },
          IsDeceased: { value: 'Yes' },
        }
        const expectedErrors = ['FirstContact.required']

        expect(validateModel(testData, relative))
          .not.toEqual(expect.arrayContaining(expectedErrors))
      })

      it('LastContact is not required', () => {
        const testData = {
          Citizenship: { value: ['Canada'] },
          IsDeceased: { value: 'Yes' },
        }
        const expectedErrors = ['LastContact.required']

        expect(validateModel(testData, relative))
          .not.toEqual(expect.arrayContaining(expectedErrors))
      })

      it('Methods is not required', () => {
        const testData = {
          Citizenship: { value: ['Canada'] },
          IsDeceased: { value: 'Yes' },
        }
        const expectedErrors = ['Methods.required']

        expect(validateModel(testData, relative))
          .not.toEqual(expect.arrayContaining(expectedErrors))
      })

      it('Frequency is not required', () => {
        const testData = {
          Citizenship: { value: ['Canada'] },
          IsDeceased: { value: 'Yes' },
        }
        const expectedErrors = ['Frequency.required']

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
        const expectedErrors = ['FirstContact.required']

        expect(validateModel(testData, relative))
          .toEqual(expect.arrayContaining(expectedErrors))
      })

      it('FirstContact must be a valid date', () => {
        const testData = {
          Citizenship: { value: ['Canada'] },
          IsDeceased: { value: 'No' },
          FirstContact: 'invalid',
        }
        const expectedErrors = ['FirstContact.date']

        expect(validateModel(testData, relative))
          .toEqual(expect.arrayContaining(expectedErrors))
      })

      it('LastContact is required', () => {
        const testData = {
          Citizenship: { value: ['Canada'] },
          IsDeceased: { value: 'No' },
        }
        const expectedErrors = ['LastContact.required']

        expect(validateModel(testData, relative))
          .toEqual(expect.arrayContaining(expectedErrors))
      })

      it('LastContact must be a valid date', () => {
        const testData = {
          Citizenship: { value: ['Canada'] },
          IsDeceased: { value: 'No' },
          LastContact: 'invalid',
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
        const expectedErrors = ['Methods.required']

        expect(validateModel(testData, relative))
          .toEqual(expect.arrayContaining(expectedErrors))
      })

      it('Methods must have at least one value', () => {
        const testData = {
          Citizenship: { value: ['Canada'] },
          IsDeceased: { value: 'No' },
          Methods: { values: [] },
        }
        const expectedErrors = ['Methods.array']

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
          const expectedErrors = ['MethodsComments.required']

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
          const expectedErrors = ['MethodsComments.hasValue']

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
        const expectedErrors = ['Frequency.required']

        expect(validateModel(testData, relative))
          .toEqual(expect.arrayContaining(expectedErrors))
      })

      it('Frequency must have a value', () => {
        const testData = {
          Citizenship: { value: ['Canada'] },
          IsDeceased: { value: 'No' },
          Frequency: { value: '' },
        }
        const expectedErrors = ['Frequency.hasValue']

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
          const expectedErrors = ['FrequencyComments.required']

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
          const expectedErrors = ['FrequencyComments.hasValue']

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
        const expectedErrors = ['Document.required']

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
          const expectedErrors = ['Employer.required']

          expect(validateModel(testData, relative))
            .not.toEqual(expect.arrayContaining(expectedErrors))
        })

        it('EmployerAddress is not required', () => {
          const testData = {
            Citizenship: { value: ['Canada'] },
            Address: { country: 'Canada' },
            IsDeceased: { value: 'Yes' },
          }
          const expectedErrors = ['EmployerAddress.required']

          expect(validateModel(testData, relative))
            .not.toEqual(expect.arrayContaining(expectedErrors))
        })

        it('EmployerRelationship is not required', () => {
          const testData = {
            Citizenship: { value: ['Canada'] },
            Address: { country: 'Canada' },
            IsDeceased: { value: 'Yes' },
          }
          const expectedErrors = ['EmployerRelationship.required']

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
          const expectedErrors = ['Employer.required']

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
          const expectedErrors = ['Employer.hasValue']

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
            const expectedErrors = ['Employer.required']

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
          const expectedErrors = ['EmployerAddress.required']

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
          const expectedErrors = ['EmployerAddress.location']

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
            const expectedErrors = ['EmployerAddress.required']

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
          const expectedErrors = ['HasAffiliation.required']

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
          const expectedErrors = ['HasAffiliation.hasValue']

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
            const expectedErrors = ['HasAffiliation.required']

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
            const expectedErrors = ['EmployerRelationship.required']

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
            const expectedErrors = ['EmployerRelationship.hasValue']

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
            const expectedErrors = ['EmployerRelationship.required']

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
          const expectedErrors = ['Document.required']

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
          const expectedErrors = ['Document.required']

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
          const expectedErrors = ['Document.hasValue']

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
            const expectedErrors = ['DocumentComments.required']

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
            const expectedErrors = ['DocumentComments.hasValue']

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
          const expectedErrors = ['ResidenceDocumentNumber.required']

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
          const expectedErrors = ['ResidenceDocumentNumber.hasValue']

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
          const expectedErrors = ['Expiration.required']

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
          const expectedErrors = ['Expiration.date']

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
