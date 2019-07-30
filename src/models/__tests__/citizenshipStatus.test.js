import { validateModel } from 'models/validate'
import citizenshipStatus, {
  certificateIsEmpty,
  documentationIsEmpty,
} from '../citizenshipStatus'

describe('The certificateIsEmpty function', () => {
  it('returns false if any of the fields have a value', () => {
    const attributes = {
      CertificateNumber: { value: '' },
      CertificateIssued: {},
      CertificateName: {
        first: '', firstInitialOnly: true, middle: '', last: '',
      },
    }

    expect(certificateIsEmpty(attributes)).toEqual(false)
  })

  it('returns true if all of the fields are empty', () => {
    const attributes = {
      CertificateNumber: { value: '' },
      CertificateIssued: {
        day: '',
        month: '',
        year: '',
      },
      CertificateName: {
        first: '',
        firstInitialOnly: false,
        middle: '',
        middleInitialOnly: false,
        last: '',
        suffix: '',
      },
    }

    expect(certificateIsEmpty(attributes)).toEqual(true)
  })
})

describe('The documentationIsEmpty function', () => {
  it('returns false if any of the fields have a value', () => {
    const attributes = {
      AbroadDocumentation: { value: '' },
      Explanation: { value: '' },
      DocumentNumber: { value: '' },
      DocumentIssued: {},
      PlaceIssued: {
        country: { value: 'United States' },
      },
      DocumentName: {
        first: '', firstInitialOnly: false, middle: '', last: '',
      },
    }

    expect(documentationIsEmpty(attributes)).toEqual(false)
  })

  it('returns true if all of the fields are empty', () => {
    const attributes = {
      AbroadDocumentation: { value: '' },
      DocumentNumber: { value: '' },
      DocumentIssued: {},
      PlaceIssued: {
        country: { value: '' },
      },
      DocumentName: {
        first: '', firstInitialOnly: false, middle: '', last: '',
      },
    }

    expect(documentationIsEmpty(attributes)).toEqual(true)
  })
})

describe('The citizenshipStatus model', () => {
  it('CitizenshipStatus is required', () => {
    const testData = {}
    const expectedErrors = ['CitizenshipStatus.presence.REQUIRED']
    expect(validateModel(testData, citizenshipStatus))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('CitizenshipStatus must be a valid value', () => {
    const testData = {
      CitizenshipStatus: { value: 'invalid' },
    }
    const expectedErrors = ['CitizenshipStatus.hasValue.value.inclusion.INCLUSION']
    expect(validateModel(testData, citizenshipStatus))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  describe('if CitizenshipStatus is "Citizen"', () => {
    it('passes a valid citizenship status', () => {
      const testData = {
        CitizenshipStatus: { value: 'Citizen' },
      }
      expect(validateModel(testData, citizenshipStatus)).toEqual(true)
    })
  })

  describe('if CitizenshipStatus is "ForeignBorn"', () => {
    it('BornOnMilitaryInstallation is required', () => {
      const testData = {
        CitizenshipStatus: { value: 'ForeignBorn' },
      }
      const expectedErrors = ['BornOnMilitaryInstallation.presence.REQUIRED']
      expect(validateModel(testData, citizenshipStatus))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('BornOnMilitaryInstallation must be a valid value', () => {
      const testData = {
        CitizenshipStatus: { value: 'ForeignBorn' },
        BornOnMilitaryInstallation: { value: false },
      }
      const expectedErrors = ['BornOnMilitaryInstallation.hasValue.MISSING_VALUE']
      expect(validateModel(testData, citizenshipStatus))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    describe('if BornOnMilitaryInstallation is "No"', () => {
      it('MilitaryBase is not required', () => {
        const testData = {
          CitizenshipStatus: { value: 'ForeignBorn' },
          BornOnMilitaryInstallation: { value: 'No' },
        }
        const expectedErrors = ['MilitaryBase.presence.REQUIRED']
        expect(validateModel(testData, citizenshipStatus))
          .not.toEqual(expect.arrayContaining(expectedErrors))
      })
    })

    describe('if BornOnMilitaryInstallation is "Yes"', () => {
      it('MilitaryBase is required', () => {
        const testData = {
          CitizenshipStatus: { value: 'ForeignBorn' },
          BornOnMilitaryInstallation: { value: 'Yes' },
        }
        const expectedErrors = ['MilitaryBase.presence.REQUIRED']
        expect(validateModel(testData, citizenshipStatus))
          .toEqual(expect.arrayContaining(expectedErrors))
      })

      it('MilitaryBase must have a value', () => {
        const testData = {
          CitizenshipStatus: { value: 'ForeignBorn' },
          BornOnMilitaryInstallation: { value: 'Yes' },
          MilitaryBase: 'testing',
        }
        const expectedErrors = ['MilitaryBase.hasValue.MISSING_VALUE']
        expect(validateModel(testData, citizenshipStatus))
          .toEqual(expect.arrayContaining(expectedErrors))
      })
    })

    describe('if documentation is not required', () => {
      it('no documentation fields and certificate fields are required', () => {
        const testData = {
          CitizenshipStatus: { value: 'ForeignBorn' },
        }
        const expectedErrors = [
          'AbroadDocumentation.presence.REQUIRED',
          'DocumentNumber.presence.REQUIRED',
          'DocumentIssued.presence.REQUIRED',
          'PlaceIssued.presence.REQUIRED',
          'DocumentName.presence.REQUIRED',
          'CertificateNumber.presence.REQUIRED',
          'CertificateIssued.presence.REQUIRED',
          'CertificateName.presence.REQUIRED',
        ]

        expect(validateModel(testData, citizenshipStatus, {
          requireForeignBornDocumentation: false,
        }))
          .not.toEqual(expect.arrayContaining(expectedErrors))
      })

      it('passes a valid citizenship status', () => {
        const testData = {
          CitizenshipStatus: { value: 'ForeignBorn' },
          BornOnMilitaryInstallation: { value: 'No' },
        }

        expect(validateModel(testData, citizenshipStatus, {
          requireForeignBornDocumentation: false,
        })).toEqual(true)
      })
    })

    describe('if documentation is required', () => {
      describe('if there is no partial data', () => {
        it('all documentation fields and certificate fields are required', () => {
          const testData = {
            CitizenshipStatus: { value: 'ForeignBorn' },
          }
          const expectedErrors = [
            'AbroadDocumentation.presence.REQUIRED',
            'DocumentNumber.presence.REQUIRED',
            'DocumentIssued.presence.REQUIRED',
            'PlaceIssued.presence.REQUIRED',
            'DocumentName.presence.REQUIRED',
            'CertificateNumber.presence.REQUIRED',
            'CertificateIssued.presence.REQUIRED',
            'CertificateName.presence.REQUIRED',
          ]

          expect(validateModel(testData, citizenshipStatus, {
            requireForeignBornDocumentation: true,
          }))
            .toEqual(expect.arrayContaining(expectedErrors))
        })
      })

      describe('if there is only certificate data', () => {
        it('certificate fields are required', () => {
          const testData = {
            CitizenshipStatus: { value: 'ForeignBorn' },
            CertificateNumber: { value: '123' },
          }
          const expectedErrors = [
            'CertificateIssued.presence.REQUIRED',
            'CertificateName.presence.REQUIRED',
          ]

          expect(validateModel(testData, citizenshipStatus, {
            requireForeignBornDocumentation: true,
          }))
            .toEqual(expect.arrayContaining(expectedErrors))
        })

        it('documentation fields are not required', () => {
          const testData = {
            CitizenshipStatus: { value: 'ForeignBorn' },
            CertificateNumber: { value: '123' },
          }
          const expectedErrors = [
            'AbroadDocumentation.presence.REQUIRED',
            'DocumentNumber.presence.REQUIRED',
            'DocumentIssued.presence.REQUIRED',
            'PlaceIssued.presence.REQUIRED',
            'DocumentName.presence.REQUIRED',
          ]

          expect(validateModel(testData, citizenshipStatus, {
            requireForeignBornDocumentation: true,
          }))
            .not.toEqual(expect.arrayContaining(expectedErrors))
        })

        it('CertificateNumber must have a valid value', () => {
          const testData = {
            CitizenshipStatus: { value: 'ForeignBorn' },
            CertificateNumber: '123',
          }
          const expectedErrors = [
            'CertificateNumber.hasValue.MISSING_VALUE',
          ]

          expect(validateModel(testData, citizenshipStatus, {
            requireForeignBornDocumentation: true,
          }))
            .toEqual(expect.arrayContaining(expectedErrors))
        })

        it('CertificateIssued must be a valid date', () => {
          const testData = {
            CitizenshipStatus: { value: 'ForeignBorn' },
            CertificateIssued: 'january',
          }
          const expectedErrors = [
            'CertificateIssued.date.day.presence.REQUIRED',
            'CertificateIssued.date.month.presence.REQUIRED',
          ]

          expect(validateModel(testData, citizenshipStatus, {
            requireForeignBornDocumentation: true,
          }))
            .toEqual(expect.arrayContaining(expectedErrors))
        })

        it('CertificateName must be a valid name', () => {
          const testData = {
            CitizenshipStatus: { value: 'ForeignBorn' },
            CertificateName: '123',
          }
          const expectedErrors = [
            'CertificateName.model.first.presence.REQUIRED',
            'CertificateName.model.middle.presence.REQUIRED',
            'CertificateName.model.last.presence.REQUIRED',
          ]

          expect(validateModel(testData, citizenshipStatus, {
            requireForeignBornDocumentation: true,
          }))
            .toEqual(expect.arrayContaining(expectedErrors))
        })

        it('passes a valid citizenship status', () => {
          const testData = {
            CitizenshipStatus: { value: 'ForeignBorn' },
            BornOnMilitaryInstallation: { value: 'Yes' },
            MilitaryBase: { value: 'Some Base' },
            CertificateNumber: { value: '123' },
            CertificateIssued: { year: 2005, month: 1, day: 1 },
            CertificateName: {
              first: 'My',
              noMiddleName: true,
              last: 'Name',
            },
          }

          expect(validateModel(testData, citizenshipStatus, {
            requireForeignBornDocumentation: true,
          })).toEqual(true)
        })
      })

      describe('if there is only documentation data', () => {
        it('certificate fields are not required', () => {
          const testData = {
            CitizenshipStatus: { value: 'ForeignBorn' },
            DocumentNumber: { value: '123' },
          }
          const expectedErrors = [
            'CertificateNumber.presence.REQUIRED',
            'CertificateIssued.presence.REQUIRED',
            'CertificateName.presence.REQUIRED',
          ]

          expect(validateModel(testData, citizenshipStatus, {
            requireForeignBornDocumentation: true,
          }))
            .not.toEqual(expect.arrayContaining(expectedErrors))
        })

        it('AbroadDocumentation is required', () => {
          const testData = {
            CitizenshipStatus: { value: 'ForeignBorn' },
          }
          const expectedErrors = [
            'AbroadDocumentation.presence.REQUIRED',
          ]

          expect(validateModel(testData, citizenshipStatus, {
            requireForeignBornDocumentation: true,
          }))
            .toEqual(expect.arrayContaining(expectedErrors))
        })

        it('AbroadDocumentation must have a valid value', () => {
          const testData = {
            CitizenshipStatus: { value: 'ForeignBorn' },
            AbroadDocumentation: { value: 'blah' },
          }
          const expectedErrors = [
            'AbroadDocumentation.hasValue.value.inclusion.INCLUSION',
          ]

          expect(validateModel(testData, citizenshipStatus, {
            requireForeignBornDocumentation: true,
          }))
            .toEqual(expect.arrayContaining(expectedErrors))
        })

        describe('if AbroadDocumentation is "Other"', () => {
          it('Explanation is required', () => {
            const testData = {
              CitizenshipStatus: { value: 'ForeignBorn' },
              AbroadDocumentation: { value: 'Other' },
            }
            const expectedErrors = [
              'Explanation.presence.REQUIRED',
            ]

            expect(validateModel(testData, citizenshipStatus, {
              requireForeignBornDocumentation: true,
            }))
              .toEqual(expect.arrayContaining(expectedErrors))
          })

          it('other documentation fields are not required', () => {
            const testData = {
              CitizenshipStatus: { value: 'ForeignBorn' },
              AbroadDocumentation: { value: 'Other' },
            }
            const expectedErrors = [
              'DocumentNumber.presence.REQUIRED',
              'DocumentIssued.presence.REQUIRED',
              'PlaceIssued.presence.REQUIRED',
              'DocumentName.presence.REQUIRED',
            ]

            expect(validateModel(testData, citizenshipStatus, {
              requireForeignBornDocumentation: true,
            }))
              .not.toEqual(expect.arrayContaining(expectedErrors))
          })

          it('Explanation must be a valid value', () => {
            const testData = {
              CitizenshipStatus: { value: 'ForeignBorn' },
              AbroadDocumentation: { value: 'Other' },
              Explanation: 'test',
            }
            const expectedErrors = [
              'Explanation.hasValue.MISSING_VALUE',
            ]

            expect(validateModel(testData, citizenshipStatus, {
              requireForeignBornDocumentation: true,
            }))
              .toEqual(expect.arrayContaining(expectedErrors))
          })

          it('passes a valid citizenship status', () => {
            const testData = {
              CitizenshipStatus: { value: 'ForeignBorn' },
              BornOnMilitaryInstallation: { value: 'No' },
              AbroadDocumentation: { value: 'Other' },
              Explanation: { value: 'My explanation is here' },
            }

            expect(validateModel(testData, citizenshipStatus, {
              requireForeignBornDocumentation: true,
            })).toEqual(true)
          })
        })

        describe('if AbroadDocumentation is not "Other"', () => {
          it('Explanation is not required', () => {
            const testData = {
              CitizenshipStatus: { value: 'ForeignBorn' },
              AbroadDocumentation: { value: 'FS-240' },
            }
            const expectedErrors = [
              'Explanation.presence.REQUIRED',
            ]

            expect(validateModel(testData, citizenshipStatus, {
              requireForeignBornDocumentation: true,
            }))
              .not.toEqual(expect.arrayContaining(expectedErrors))
          })

          it('other documentation fields are required', () => {
            const testData = {
              CitizenshipStatus: { value: 'ForeignBorn' },
              AbroadDocumentation: { value: 'FS-240' },
            }
            const expectedErrors = [
              'DocumentNumber.presence.REQUIRED',
              'DocumentIssued.presence.REQUIRED',
              'PlaceIssued.presence.REQUIRED',
              'DocumentName.presence.REQUIRED',
            ]

            expect(validateModel(testData, citizenshipStatus, {
              requireForeignBornDocumentation: true,
            }))
              .toEqual(expect.arrayContaining(expectedErrors))
          })

          it('DocumentNumber must be a valid value', () => {
            const testData = {
              CitizenshipStatus: { value: 'ForeignBorn' },
              AbroadDocumentation: { value: 'FS-240' },
              DocumentNumber: { value: '' },
            }
            const expectedErrors = [
              'DocumentNumber.hasValue.MISSING_VALUE',
            ]

            expect(validateModel(testData, citizenshipStatus, {
              requireForeignBornDocumentation: true,
            }))
              .toEqual(expect.arrayContaining(expectedErrors))
          })

          it('DocumentIssued must be a valid date', () => {
            const testData = {
              CitizenshipStatus: { value: 'ForeignBorn' },
              AbroadDocumentation: { value: 'FS-240' },
              DocumentIssued: { year: '200' },
            }
            const expectedErrors = [
              'DocumentIssued.date.day.presence.REQUIRED',
              'DocumentIssued.date.month.presence.REQUIRED',
            ]

            expect(validateModel(testData, citizenshipStatus, {
              requireForeignBornDocumentation: true,
            }))
              .toEqual(expect.arrayContaining(expectedErrors))
          })

          it('PlaceIssued must be a valid location', () => {
            const testData = {
              CitizenshipStatus: { value: 'ForeignBorn' },
              AbroadDocumentation: { value: 'FS-240' },
              PlaceIssued: {
                country: 'testing',
              },
            }
            const expectedErrors = [
              'PlaceIssued.location.city.presence.REQUIRED',
            ]

            expect(validateModel(testData, citizenshipStatus, {
              requireForeignBornDocumentation: true,
            }))
              .toEqual(expect.arrayContaining(expectedErrors))
          })

          it('DocumentName must be a valid name', () => {
            const testData = {
              CitizenshipStatus: { value: 'ForeignBorn' },
              AbroadDocumentation: { value: 'FS-240' },
              DocumentName: 'My Name',
            }
            const expectedErrors = [
              'DocumentName.model.first.presence.REQUIRED',
              'DocumentName.model.middle.presence.REQUIRED',
              'DocumentName.model.last.presence.REQUIRED',
            ]

            expect(validateModel(testData, citizenshipStatus, {
              requireForeignBornDocumentation: true,
            }))
              .toEqual(expect.arrayContaining(expectedErrors))
          })

          it('passes a valid citizenship status', () => {
            const testData = {
              CitizenshipStatus: { value: 'ForeignBorn' },
              BornOnMilitaryInstallation: { value: 'No' },
              AbroadDocumentation: { value: 'FS-240' },
              DocumentNumber: { value: 'abc123' },
              DocumentIssued: { year: 2000, month: 9, day: 2 },
              PlaceIssued: { country: 'United States', city: 'New York', state: 'NY' },
              DocumentName: {
                first: 'My',
                noMiddleName: true,
                last: 'Name',
              },
            }

            expect(validateModel(testData, citizenshipStatus, {
              requireForeignBornDocumentation: true,
            })).toEqual(true)
          })
        })
      })

      describe('if there is both documentation and certificate data', () => {
        it('all documentation fields and certificate fields are required', () => {
          const testData = {
            CitizenshipStatus: { value: 'ForeignBorn' },
            CertificateNumber: { value: '123' },
            DocumentNumber: { value: '123' },
          }
          const expectedErrors = [
            'AbroadDocumentation.presence.REQUIRED',
            'DocumentIssued.presence.REQUIRED',
            'PlaceIssued.presence.REQUIRED',
            'DocumentName.presence.REQUIRED',
            'CertificateIssued.presence.REQUIRED',
            'CertificateName.presence.REQUIRED',
          ]

          expect(validateModel(testData, citizenshipStatus, {
            requireForeignBornDocumentation: true,
          }))
            .toEqual(expect.arrayContaining(expectedErrors))
        })

        it('passes a valid citizenship status', () => {
          const testData = {
            CitizenshipStatus: { value: 'ForeignBorn' },
            BornOnMilitaryInstallation: { value: 'No' },
            AbroadDocumentation: { value: 'FS-240' },
            DocumentNumber: { value: 'abc123' },
            DocumentIssued: { year: 2000, month: 9, day: 2 },
            PlaceIssued: { country: 'United States', city: 'New York', state: 'NY' },
            DocumentName: {
              first: 'My',
              noMiddleName: true,
              last: 'Name',
            },
            CertificateNumber: { value: '123' },
            CertificateIssued: { year: 2005, month: 1, day: 1 },
            CertificateName: {
              first: 'My',
              noMiddleName: true,
              last: 'Name',
            },
          }

          expect(validateModel(testData, citizenshipStatus, {
            requireForeignBornDocumentation: true,
          })).toEqual(true)
        })
      })
    })
  })

  describe('if CitizenshipStatus is "Naturalized"', () => {
    it('Naturalized fields are required', () => {
      const testData = {
        CitizenshipStatus: { value: 'Naturalized' },
      }
      const expectedErrors = [
        'EntryDate.presence.REQUIRED',
        'EntryLocation.presence.REQUIRED',
        'PriorCitizenship.presence.REQUIRED',
        'HasAlienRegistration.presence.REQUIRED',
        'CertificateNumber.presence.REQUIRED',
        'CertificateCourtName.presence.REQUIRED',
        'CertificateCourtAddress.presence.REQUIRED',
        'CertificateIssued.presence.REQUIRED',
        'CertificateName.presence.REQUIRED',
        'Basis.presence.REQUIRED',
      ]

      expect(validateModel(testData, citizenshipStatus))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('EntryDate must be a valid date', () => {
      const testData = {
        CitizenshipStatus: { value: 'Naturalized' },
        EntryDate: 'May 1',
      }
      const expectedErrors = [
        'EntryDate.date.day.presence.REQUIRED',
        'EntryDate.date.month.presence.REQUIRED',
        'EntryDate.date.year.presence.REQUIRED',
      ]

      expect(validateModel(testData, citizenshipStatus))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('EntryLocation must be a valid location', () => {
      const testData = {
        CitizenshipStatus: { value: 'Naturalized' },
        EntryLocation: {
          city: 'New York',
          state: 'XX',
          country: { value: 'Canada' },
        },
      }
      const expectedErrors = [
        'EntryLocation.location.state.inclusion.INCLUSION',
      ]

      expect(validateModel(testData, citizenshipStatus))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('PriorCitizenship must have at least one value', () => {
      const testData = {
        CitizenshipStatus: { value: 'Naturalized' },
        PriorCitizenship: { value: true },
      }

      const expectedErrors = [
        'PriorCitizenship.country.INVALID_COUNTRY',
      ]

      expect(validateModel(testData, citizenshipStatus))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('PriorCitizenship values must be valid', () => {
      const testData = {
        CitizenshipStatus: { value: 'Naturalized' },
        PriorCitizenship: { value: ['Germany', 'Invalid country'] },
      }

      const expectedErrors = [
        'PriorCitizenship.country.INVALID_COUNTRY',
      ]

      expect(validateModel(testData, citizenshipStatus))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('HasAlienRegistration must be a valid value', () => {
      const testData = {
        CitizenshipStatus: { value: 'Naturalized' },
        HasAlienRegistration: true,
      }
      const expectedErrors = [
        'HasAlienRegistration.hasValue.MISSING_VALUE',
      ]

      expect(validateModel(testData, citizenshipStatus))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    describe('if HasAlienRegistration is "No"', () => {
      it('AlienRegistrationNumber is not required', () => {
        const testData = {
          CitizenshipStatus: { value: 'Naturalized' },
          HasAlienRegistration: { value: 'No' },
        }
        const expectedErrors = [
          'AlienRegistrationNumber.presence.REQUIRED',
        ]

        expect(validateModel(testData, citizenshipStatus))
          .not.toEqual(expect.arrayContaining(expectedErrors))
      })
    })

    describe('if HasAlienRegistration is "Yes"', () => {
      it('AlienRegistrationNumber is required', () => {
        const testData = {
          CitizenshipStatus: { value: 'Naturalized' },
          HasAlienRegistration: { value: 'Yes' },
        }
        const expectedErrors = [
          'AlienRegistrationNumber.presence.REQUIRED',
        ]

        expect(validateModel(testData, citizenshipStatus))
          .toEqual(expect.arrayContaining(expectedErrors))
      })

      it('AlienRegistrationNumber must be a valid value', () => {
        const testData = {
          CitizenshipStatus: { value: 'Naturalized' },
          HasAlienRegistration: { value: 'Yes' },
          AlienRegistrationNumber: '123',
        }
        const expectedErrors = [
          'AlienRegistrationNumber.hasValue.MISSING_VALUE',
        ]

        expect(validateModel(testData, citizenshipStatus))
          .toEqual(expect.arrayContaining(expectedErrors))
      })
    })

    it('CertificateNumber must be valid', () => {
      const testData = {
        CitizenshipStatus: { value: 'Naturalized' },
        CertificateNumber: '123',
      }
      const expectedErrors = [
        'CertificateNumber.hasValue.MISSING_VALUE',
      ]

      expect(validateModel(testData, citizenshipStatus))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('CertificateCourtName must be valid', () => {
      const testData = {
        CitizenshipStatus: { value: 'Naturalized' },
        CertificateCourtName: { name: 'Court' },
      }
      const expectedErrors = [
        'CertificateCourtName.hasValue.MISSING_VALUE',
      ]

      expect(validateModel(testData, citizenshipStatus))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('CertificateCourtAddress must be a valid location', () => {
      const testData = {
        CitizenshipStatus: { value: 'Naturalized' },
        CertificateCourtAddress: { country: { value: 'Canada' } },
      }
      const expectedErrors = [
        'CertificateCourtAddress.location.street.presence.REQUIRED',
        'CertificateCourtAddress.location.city.presence.REQUIRED',
        'CertificateCourtAddress.location.country.inclusion.INCLUSION',
      ]

      expect(validateModel(testData, citizenshipStatus))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('CertificateIssued must be a valid date', () => {
      const testData = {
        CitizenshipStatus: { value: 'Naturalized' },
        CertificateIssued: { day: 1, month: 2 },
      }
      const expectedErrors = [
        'CertificateIssued.date.year.presence.REQUIRED',
      ]

      expect(validateModel(testData, citizenshipStatus))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('CertificateName must be a valid name', () => {
      const testData = {
        CitizenshipStatus: { value: 'Naturalized' },
        CertificateName: { name: 'Name' },
      }
      const expectedErrors = [
        'CertificateName.model.first.presence.REQUIRED',
        'CertificateName.model.middle.presence.REQUIRED',
        'CertificateName.model.last.presence.REQUIRED',
      ]

      expect(validateModel(testData, citizenshipStatus))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('Basis must be valid', () => {
      const testData = {
        CitizenshipStatus: { value: 'Naturalized' },
        Basis: 'something',
      }
      const expectedErrors = [
        'Basis.hasValue.MISSING_VALUE',
      ]

      expect(validateModel(testData, citizenshipStatus))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    describe('if Basis is "Other"', () => {
      it('Explanation is required', () => {
        const testData = {
          CitizenshipStatus: { value: 'Naturalized' },
          Basis: { value: 'Other' },
        }
        const expectedErrors = [
          'Explanation.presence.REQUIRED',
        ]

        expect(validateModel(testData, citizenshipStatus))
          .toEqual(expect.arrayContaining(expectedErrors))
      })

      it('Explanation must have a value', () => {
        const testData = {
          CitizenshipStatus: { value: 'Naturalized' },
          Basis: { value: 'Other' },
          Explanation: 'something',
        }
        const expectedErrors = [
          'Explanation.hasValue.MISSING_VALUE',
        ]

        expect(validateModel(testData, citizenshipStatus))
          .toEqual(expect.arrayContaining(expectedErrors))
      })
    })

    it('passes a valid citizenship status', () => {
      const testData = {
        CitizenshipStatus: { value: 'Naturalized' },
        EntryDate: { year: 2010, month: 2, day: 13 },
        EntryLocation: { city: 'Boston', state: 'MA' },
        PriorCitizenship: { value: ['Canada'] },
        HasAlienRegistration: { value: 'No' },
        CertificateNumber: { value: '123' },
        CertificateCourtName: { value: 'Test Court' },
        CertificateCourtAddress: {
          street: '123 Court St',
          city: 'New York',
          state: 'NY',
          zipcode: '11211',
          country: 'United States',
        },
        CertificateIssued: { year: 2015, month: 10, day: 23 },
        CertificateName: { first: 'Tester', noMiddleName: true, last: 'Name' },
        Basis: { value: 'Something' },
      }

      expect(validateModel(testData, citizenshipStatus)).toEqual(true)
    })
  })

  describe('if CitizenshipStatus is "Derived"', () => {
    it('Derived fields are required', () => {
      const testData = {
        CitizenshipStatus: { value: 'Derived' },
      }
      const expectedErrors = [
        'PermanentResidentCardNumber.presence.REQUIRED',
        'AlienRegistrationNumber.presence.REQUIRED',
        'CertificateNumber.presence.REQUIRED',
        'CertificateIssued.presence.REQUIRED',
        'CertificateName.presence.REQUIRED',
        'Basis.presence.REQUIRED',
      ]

      expect(validateModel(testData, citizenshipStatus))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('CertificateIssued must be a valid date', () => {
      const testData = {
        CitizenshipStatus: { value: 'Derived' },
        CertificateIssued: { day: 1, month: 2 },
      }
      const expectedErrors = [
        'CertificateIssued.date.year.presence.REQUIRED',
      ]

      expect(validateModel(testData, citizenshipStatus))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('CertificateName must be a valid name', () => {
      const testData = {
        CitizenshipStatus: { value: 'Derived' },
        CertificateName: { name: 'Name' },
      }
      const expectedErrors = [
        'CertificateName.model.first.presence.REQUIRED',
        'CertificateName.model.middle.presence.REQUIRED',
        'CertificateName.model.last.presence.REQUIRED',
      ]

      expect(validateModel(testData, citizenshipStatus))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('Basis must be valid', () => {
      const testData = {
        CitizenshipStatus: { value: 'Derived' },
        Basis: 'something',
      }
      const expectedErrors = [
        'Basis.hasValue.MISSING_VALUE',
      ]

      expect(validateModel(testData, citizenshipStatus))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    describe('if Basis is "Other"', () => {
      it('Explanation is required', () => {
        const testData = {
          CitizenshipStatus: { value: 'Derived' },
          Basis: { value: 'Other' },
        }
        const expectedErrors = [
          'Explanation.presence.REQUIRED',
        ]

        expect(validateModel(testData, citizenshipStatus))
          .toEqual(expect.arrayContaining(expectedErrors))
      })

      it('Explanation must have a value', () => {
        const testData = {
          CitizenshipStatus: { value: 'Derived' },
          Basis: { value: 'Other' },
          Explanation: 'something',
        }
        const expectedErrors = [
          'Explanation.hasValue.MISSING_VALUE',
        ]

        expect(validateModel(testData, citizenshipStatus))
          .toEqual(expect.arrayContaining(expectedErrors))
      })
    })

    describe('if PermanentResidentCardNumber is provided', () => {
      it('AlienRegistrationNumber is not required', () => {
        const testData = {
          CitizenshipStatus: { value: 'Derived' },
          PermanentResidentCardNumber: { value: '123' },
        }
        const expectedErrors = [
          'AlienRegistrationNumber.presence.REQUIRED',
        ]

        expect(validateModel(testData, citizenshipStatus))
          .not.toEqual(expect.arrayContaining(expectedErrors))
      })

      it('CertificateNumber is not required', () => {
        const testData = {
          CitizenshipStatus: { value: 'Derived' },
          PermanentResidentCardNumber: { value: '123' },
        }
        const expectedErrors = [
          'CertificateNumber.presence.REQUIRED',
        ]

        expect(validateModel(testData, citizenshipStatus))
          .not.toEqual(expect.arrayContaining(expectedErrors))
      })

      it('passes a valid citizenship status', () => {
        const testData = {
          CitizenshipStatus: { value: 'Derived' },
          CertificateIssued: { year: 2013, month: 8, day: 12 },
          CertificateName: { first: 'Tester', noMiddleName: true, last: 'Person' },
          PermanentResidentCardNumber: { value: '123' },
          Basis: { value: 'Testing' },
        }

        expect(validateModel(testData, citizenshipStatus)).toEqual(true)
      })
    })

    describe('if AlienRegistrationNumber is provided', () => {
      it('PermanentResidentCardNumber is not required', () => {
        const testData = {
          CitizenshipStatus: { value: 'Derived' },
          AlienRegistrationNumber: { value: '123' },
        }
        const expectedErrors = [
          'PermanentResidentCardNumber.presence.REQUIRED',
        ]

        expect(validateModel(testData, citizenshipStatus))
          .not.toEqual(expect.arrayContaining(expectedErrors))
      })

      it('CertificateNumber is not required', () => {
        const testData = {
          CitizenshipStatus: { value: 'Derived' },
          AlienRegistrationNumber: { value: '123' },
        }
        const expectedErrors = [
          'CertificateNumber.presence.REQUIRED',
        ]

        expect(validateModel(testData, citizenshipStatus))
          .not.toEqual(expect.arrayContaining(expectedErrors))
      })

      it('passes a valid citizenship status', () => {
        const testData = {
          CitizenshipStatus: { value: 'Derived' },
          CertificateIssued: { year: 2013, month: 8, day: 12 },
          CertificateName: { first: 'Tester', noMiddleName: true, last: 'Person' },
          AlienRegistrationNumber: { value: '123' },
          Basis: { value: 'Testing' },
        }

        expect(validateModel(testData, citizenshipStatus)).toEqual(true)
      })
    })

    describe('if CertificateNumber is provided', () => {
      it('AlienRegistrationNumber is not required', () => {
        const testData = {
          CitizenshipStatus: { value: 'Derived' },
          CertificateNumber: { value: '123' },
        }
        const expectedErrors = [
          'AlienRegistrationNumber.presence.REQUIRED',
        ]

        expect(validateModel(testData, citizenshipStatus))
          .not.toEqual(expect.arrayContaining(expectedErrors))
      })

      it('PermanentResidentCardNumber is not required', () => {
        const testData = {
          CitizenshipStatus: { value: 'Derived' },
          CertificateNumber: { value: '123' },
        }
        const expectedErrors = [
          'PermanentResidentCardNumber.presence.REQUIRED',
        ]

        expect(validateModel(testData, citizenshipStatus))
          .not.toEqual(expect.arrayContaining(expectedErrors))
      })

      it('passes a valid citizenship status', () => {
        const testData = {
          CitizenshipStatus: { value: 'Derived' },
          CertificateIssued: { year: 2013, month: 8, day: 12 },
          CertificateName: { first: 'Tester', noMiddleName: true, last: 'Person' },
          CertificateNumber: { value: '123' },
          Basis: { value: 'Testing' },
        }

        expect(validateModel(testData, citizenshipStatus)).toEqual(true)
      })
    })
  })

  describe('if CitizenshipStatus is "NotCitizen"', () => {
    it('NotCitizen fields are required', () => {
      const testData = {
        CitizenshipStatus: { value: 'NotCitizen' },
      }
      const expectedErrors = [
        'ResidenceStatus.presence.REQUIRED',
        'EntryDate.presence.REQUIRED',
        'EntryLocation.presence.REQUIRED',
        'PriorCitizenship.presence.REQUIRED',
        'AlienRegistrationNumber.presence.REQUIRED',
        'AlienRegistrationExpiration.presence.REQUIRED',
        'DocumentType.presence.REQUIRED',
        'DocumentNumber.presence.REQUIRED',
        'DocumentName.presence.REQUIRED',
        'DocumentIssued.presence.REQUIRED',
        'DocumentExpiration.presence.REQUIRED',
      ]

      expect(validateModel(testData, citizenshipStatus))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('ResidenceStatus must be a valid value', () => {
      const testData = {
        CitizenshipStatus: { value: 'NotCitizen' },
        ResidenceStatus: 'something',
      }
      const expectedErrors = [
        'ResidenceStatus.hasValue.MISSING_VALUE',
      ]

      expect(validateModel(testData, citizenshipStatus))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('EntryDate must be a valid date', () => {
      const testData = {
        CitizenshipStatus: { value: 'NotCitizen' },
        EntryDate: 'May 1',
      }
      const expectedErrors = [
        'EntryDate.date.day.presence.REQUIRED',
        'EntryDate.date.month.presence.REQUIRED',
        'EntryDate.date.year.presence.REQUIRED',
      ]

      expect(validateModel(testData, citizenshipStatus))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('EntryLocation must be a valid location', () => {
      const testData = {
        CitizenshipStatus: { value: 'NotCitizen' },
        EntryLocation: {
          city: 'New York',
          state: 'XX',
          country: { value: 'Canada' },
        },
      }
      const expectedErrors = [
        'EntryLocation.location.state.inclusion.INCLUSION',
      ]

      expect(validateModel(testData, citizenshipStatus))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('PriorCitizenship must have at least one value', () => {
      const testData = {
        CitizenshipStatus: { value: 'NotCitizen' },
        PriorCitizenship: { value: true },
      }

      const expectedErrors = [
        'PriorCitizenship.country.INVALID_COUNTRY',
      ]

      expect(validateModel(testData, citizenshipStatus))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('AlienRegistrationNumber must be a valid value', () => {
      const testData = {
        CitizenshipStatus: { value: 'NotCitizen' },
        AlienRegistrationNumber: 'something',
      }
      const expectedErrors = [
        'AlienRegistrationNumber.hasValue.MISSING_VALUE',
      ]

      expect(validateModel(testData, citizenshipStatus))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('AlienRegistrationExpiration must be a valid date', () => {
      const testData = {
        CitizenshipStatus: { value: 'NotCitizen' },
        AlienRegistrationExpiration: 'something',
      }
      const expectedErrors = [
        'AlienRegistrationExpiration.date.day.presence.REQUIRED',
        'AlienRegistrationExpiration.date.month.presence.REQUIRED',
        'AlienRegistrationExpiration.date.year.presence.REQUIRED',
      ]

      expect(validateModel(testData, citizenshipStatus))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('DocumentType must be a valid value', () => {
      const testData = {
        CitizenshipStatus: { value: 'NotCitizen' },
        DocumentType: { value: 'invalid' },
      }
      const expectedErrors = [
        'DocumentType.hasValue.value.inclusion.INCLUSION',
      ]

      expect(validateModel(testData, citizenshipStatus))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    describe('if DocumentType is "other"', () => {
      it('Explanation is required', () => {
        const testData = {
          CitizenshipStatus: { value: 'NotCitizen' },
          DocumentType: { value: 'Other' },
        }
        const expectedErrors = [
          'Explanation.presence.REQUIRED',
        ]

        expect(validateModel(testData, citizenshipStatus))
          .toEqual(expect.arrayContaining(expectedErrors))
      })

      it('Explanation must be a valid value', () => {
        const testData = {
          CitizenshipStatus: { value: 'NotCitizen' },
          DocumentType: { value: 'Other' },
          Explanation: 'Because',
        }
        const expectedErrors = [
          'Explanation.hasValue.MISSING_VALUE',
        ]

        expect(validateModel(testData, citizenshipStatus))
          .toEqual(expect.arrayContaining(expectedErrors))
      })
    })

    it('DocumentNumber must be a valid value', () => {
      const testData = {
        CitizenshipStatus: { value: 'NotCitizen' },
        DocumentNumber: { value: '' },
      }
      const expectedErrors = [
        'DocumentNumber.hasValue.MISSING_VALUE',
      ]

      expect(validateModel(testData, citizenshipStatus))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('DocumentIssued must be a valid date', () => {
      const testData = {
        CitizenshipStatus: { value: 'NotCitizen' },
        DocumentIssued: { year: '200' },
      }
      const expectedErrors = [
        'DocumentIssued.date.day.presence.REQUIRED',
        'DocumentIssued.date.month.presence.REQUIRED',
      ]

      expect(validateModel(testData, citizenshipStatus))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('DocumentName must be a valid name', () => {
      const testData = {
        CitizenshipStatus: { value: 'NotCitizen' },
        DocumentName: 'My Name',
      }
      const expectedErrors = [
        'DocumentName.model.first.presence.REQUIRED',
        'DocumentName.model.middle.presence.REQUIRED',
        'DocumentName.model.last.presence.REQUIRED',
      ]

      expect(validateModel(testData, citizenshipStatus))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('DocumentExpiration must be a valid date', () => {
      const testData = {
        CitizenshipStatus: { value: 'NotCitizen' },
        DocumentExpiration: { year: '200' },
      }
      const expectedErrors = [
        'DocumentExpiration.date.day.presence.REQUIRED',
        'DocumentExpiration.date.month.presence.REQUIRED',
      ]

      expect(validateModel(testData, citizenshipStatus))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('passes a valid citizenship status', () => {
      const testData = {
        CitizenshipStatus: { value: 'NotCitizen' },
        DocumentNumber: { value: '123' },
        DocumentIssued: { year: 2000, month: 8, day: 2 },
        DocumentName: { first: 'Tester', noMiddleName: true, last: 'Person' },
        EntryDate: { year: 2000, month: 9, day: 2 },
        EntryLocation: { city: 'New York', state: 'NY' },
        PriorCitizenship: { value: ['United Kingdom', 'Canada'] },
        AlienRegistrationNumber: { value: 'abc' },
        AlienRegistrationExpiration: { year: 2010, month: 3, day: 20 },
        ResidenceStatus: { value: 'testing' },
        DocumentType: { value: 'U.S. Visa' },
        DocumentExpiration: { year: 2020, month: 3, day: 20 },
      }

      expect(validateModel(testData, citizenshipStatus)).toEqual(true)
    })
  })
})
