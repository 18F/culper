import { updateApplication } from '../../actions/ApplicationActions'

export const preload = (username, dispatch) => {
  if (username !== 'test02') {
    return
  }

  if (application.Identification && application.Identification.ApplicantBirthDate) {
    dispatch(updateApplication('Identification', 'ApplicantBirthDate', application.Identification.ApplicantBirthDate))
  }
  if (application.Identification && application.Identification.ApplicantBirthPlace) {
    dispatch(updateApplication('Identification', 'ApplicantBirthPlace', application.Identification.ApplicantBirthPlace))
  }
  if (application.Identification && application.Identification.Contacts) {
    dispatch(updateApplication('Identification', 'Contacts', application.Identification.Contacts))
  }
  if (application.Identification && application.Identification.ApplicantName) {
    dispatch(updateApplication('Identification', 'ApplicantName', application.Identification.ApplicantName))
  }
  if (application.Identification && application.Identification.OtherNames) {
    dispatch(updateApplication('Identification', 'OtherNames', application.Identification.OtherNames))
  }
  if (application.Identification && application.Identification.Physical) {
    dispatch(updateApplication('Identification', 'Physical', application.Identification.Physical))
  }
  if (application.Identification && application.Identification.ApplicantSSN) {
    dispatch(updateApplication('Identification', 'ApplicantSSN', application.Identification.ApplicantSSN))
  }
  if (application.Financial && application.Financial.Bankruptcy) {
    dispatch(updateApplication('Financial', 'Bankruptcy', application.Financial.Bankruptcy))
  }
  if (application.Financial && application.Financial.Gambling) {
    dispatch(updateApplication('Financial', 'Gambling', application.Financial.Gambling))
  }
  if (application.Financial && application.Financial.Taxes) {
    dispatch(updateApplication('Financial', 'Taxes', application.Financial.Taxes))
  }
  if (application.Financial && application.Financial.Card) {
    dispatch(updateApplication('Financial', 'Card', application.Financial.Card))
  }
  if (application.Financial && application.Financial.Credit) {
    dispatch(updateApplication('Financial', 'Credit', application.Financial.Credit))
  }
  if (application.Financial && application.Financial.Delinquent) {
    dispatch(updateApplication('Financial', 'Delinquent', application.Financial.Delinquent))
  }
  if (application.Financial && application.Financial.Nonpayment) {
    dispatch(updateApplication('Financial', 'Nonpayment', application.Financial.Nonpayment))
  }
  if (application.History && application.History.Education) {
    dispatch(updateApplication('History', 'Education', application.History.Education))
  }
  if (application.History && application.History.Employment) {
    dispatch(updateApplication('History', 'Employment', application.History.Employment))
  }
  if (application.History && application.History.Federal) {
    dispatch(updateApplication('History', 'Federal', application.History.Federal))
  }
  if (application.History && application.History.Residence) {
    dispatch(updateApplication('History', 'Residence', application.History.Residence))
  }
  if (application.Relationships && application.Relationships.Marital) {
    dispatch(updateApplication('Relationships', 'Marital', application.Relationships.Marital))
  }
  if (application.Relationships && application.Relationships.Cohabitants) {
    dispatch(updateApplication('Relationships', 'Cohabitants', application.Relationships.Cohabitants))
  }
  if (application.Relationships && application.Relationships.People) {
    dispatch(updateApplication('Relationships', 'People', application.Relationships.People))
  }
  if (application.Relationships && application.Relationships.Relatives) {
    dispatch(updateApplication('Relationships', 'Relatives', application.Relationships.Relatives))
  }
  if (application.Citizenship && application.Citizenship.Multiple) {
    dispatch(updateApplication('Citizenship', 'Multiple', application.Citizenship.Multiple))
  }
  if (application.Citizenship && application.Citizenship.Passports) {
    dispatch(updateApplication('Citizenship', 'Passports', application.Citizenship.Passports))
  }
  if (application.Citizenship && application.Citizenship.Status) {
    dispatch(updateApplication('Citizenship', 'Status', application.Citizenship.Status))
  }
  if (application.Military && application.Military.Selective) {
    dispatch(updateApplication('Military', 'Selective', application.Military.Selective))
  }
  if (application.Military && application.Military.History) {
    dispatch(updateApplication('Military', 'History', application.Military.History))
  }
  if (application.Military && application.Military.Disciplinary) {
    dispatch(updateApplication('Military', 'Disciplinary', application.Military.Disciplinary))
  }
  if (application.Military && application.Military.Foreign) {
    dispatch(updateApplication('Military', 'Foreign', application.Military.Foreign))
  }
  if (application.Foreign && application.Foreign.BenefitActivity) {
    dispatch(updateApplication('Foreign', 'BenefitActivity', application.Foreign.BenefitActivity))
  }
  if (application.Foreign && application.Foreign.DirectActivity) {
    dispatch(updateApplication('Foreign', 'DirectActivity', application.Foreign.DirectActivity))
  }
  if (application.Foreign && application.Foreign.IndirectActivity) {
    dispatch(updateApplication('Foreign', 'IndirectActivity', application.Foreign.IndirectActivity))
  }
  if (application.Foreign && application.Foreign.RealEstateActivity) {
    dispatch(updateApplication('Foreign', 'RealEstateActivity', application.Foreign.RealEstateActivity))
  }
  if (application.Foreign && application.Foreign.Support) {
    dispatch(updateApplication('Foreign', 'Support', application.Foreign.Support))
  }
  if (application.Foreign && application.Foreign.Advice) {
    dispatch(updateApplication('Foreign', 'Advice', application.Foreign.Advice))
  }
  if (application.Foreign && application.Foreign.Conferences) {
    dispatch(updateApplication('Foreign', 'Conferences', application.Foreign.Conferences))
  }
  if (application.Foreign && application.Foreign.Contact) {
    dispatch(updateApplication('Foreign', 'Contact', application.Foreign.Contact))
  }
  if (application.Foreign && application.Foreign.Employment) {
    dispatch(updateApplication('Foreign', 'Employment', application.Foreign.Employment))
  }
  if (application.Foreign && application.Foreign.Family) {
    dispatch(updateApplication('Foreign', 'Family', application.Foreign.Family))
  }
  if (application.Foreign && application.Foreign.Political) {
    dispatch(updateApplication('Foreign', 'Political', application.Foreign.Political))
  }
  if (application.Foreign && application.Foreign.Sponsorship) {
    dispatch(updateApplication('Foreign', 'Sponsorship', application.Foreign.Sponsorship))
  }
  if (application.Foreign && application.Foreign.Ventures) {
    dispatch(updateApplication('Foreign', 'Ventures', application.Foreign.Ventures))
  }
  if (application.Foreign && application.Foreign.Voting) {
    dispatch(updateApplication('Foreign', 'Voting', application.Foreign.Voting))
  }
  if (application.Foreign && application.Foreign.Contacts) {
    dispatch(updateApplication('Foreign', 'Contacts', application.Foreign.Contacts))
  }
  if (application.Foreign && application.Foreign.Passport) {
    dispatch(updateApplication('Foreign', 'Passport', application.Foreign.Passport))
  }
  if (application.Foreign && application.Foreign.Travel) {
    dispatch(updateApplication('Foreign', 'Travel', application.Foreign.Travel))
  }
  if (application.SubstanceUse && application.SubstanceUse.ReceivedCounselings) {
    dispatch(updateApplication('SubstanceUse', 'ReceivedCounselings', application.SubstanceUse.ReceivedCounselings))
  }
  if (application.SubstanceUse && application.SubstanceUse.NegativeImpacts) {
    dispatch(updateApplication('SubstanceUse', 'NegativeImpacts', application.SubstanceUse.NegativeImpacts))
  }
  if (application.SubstanceUse && application.SubstanceUse.OrderedCounselings) {
    dispatch(updateApplication('SubstanceUse', 'OrderedCounselings', application.SubstanceUse.OrderedCounselings))
  }
  if (application.SubstanceUse && application.SubstanceUse.VoluntaryCounselings) {
    dispatch(updateApplication('SubstanceUse', 'VoluntaryCounselings', application.SubstanceUse.VoluntaryCounselings))
  }
  if (application.SubstanceUse && application.SubstanceUse.DrugClearanceUses) {
    dispatch(updateApplication('SubstanceUse', 'DrugClearanceUses', application.SubstanceUse.DrugClearanceUses))
  }
  if (application.SubstanceUse && application.SubstanceUse.PrescriptionUses) {
    dispatch(updateApplication('SubstanceUse', 'PrescriptionUses', application.SubstanceUse.PrescriptionUses))
  }
  if (application.SubstanceUse && application.SubstanceUse.OrderedTreatments) {
    dispatch(updateApplication('SubstanceUse', 'OrderedTreatments', application.SubstanceUse.OrderedTreatments))
  }
  if (application.SubstanceUse && application.SubstanceUse.DrugPublicSafetyUses) {
    dispatch(updateApplication('SubstanceUse', 'DrugPublicSafetyUses', application.SubstanceUse.DrugPublicSafetyUses))
  }
  if (application.SubstanceUse && application.SubstanceUse.DrugInvolvements) {
    dispatch(updateApplication('SubstanceUse', 'DrugInvolvements', application.SubstanceUse.DrugInvolvements))
  }
  if (application.SubstanceUse && application.SubstanceUse.DrugUses) {
    dispatch(updateApplication('SubstanceUse', 'DrugUses', application.SubstanceUse.DrugUses))
  }
  if (application.SubstanceUse && application.SubstanceUse.VoluntaryTreatments) {
    dispatch(updateApplication('SubstanceUse', 'VoluntaryTreatments', application.SubstanceUse.VoluntaryTreatments))
  }
  if (application.Legal && application.Legal.ActivitiesToOverthrow) {
    dispatch(updateApplication('Legal', 'ActivitiesToOverthrow', application.Legal.ActivitiesToOverthrow))
  }
  if (application.Legal && application.Legal.Advocating) {
    dispatch(updateApplication('Legal', 'Advocating', application.Legal.Advocating))
  }
  if (application.Legal && application.Legal.EngagedInTerrorism) {
    dispatch(updateApplication('Legal', 'EngagedInTerrorism', application.Legal.EngagedInTerrorism))
  }
  if (application.Legal && application.Legal.MembershipOverthrow) {
    dispatch(updateApplication('Legal', 'MembershipOverthrow', application.Legal.MembershipOverthrow))
  }
  if (application.Legal && application.Legal.MembershipViolence) {
    dispatch(updateApplication('Legal', 'MembershipViolence', application.Legal.MembershipViolence))
  }
  if (application.Legal && application.Legal.TerrorismAssociation) {
    dispatch(updateApplication('Legal', 'TerrorismAssociation', application.Legal.TerrorismAssociation))
  }
  if (application.Legal && application.Legal.TerroristOrganization) {
    dispatch(updateApplication('Legal', 'TerroristOrganization', application.Legal.TerroristOrganization))
  }
  if (application.Legal && application.Legal.NonCriminalCourtActions) {
    dispatch(updateApplication('Legal', 'NonCriminalCourtActions', application.Legal.NonCriminalCourtActions))
  }
  if (application.Legal && application.Legal.Debarred) {
    dispatch(updateApplication('Legal', 'Debarred', application.Legal.Debarred))
  }
  if (application.Legal && application.Legal.History) {
    dispatch(updateApplication('Legal', 'History', application.Legal.History))
  }
  if (application.Legal && application.Legal.Revoked) {
    dispatch(updateApplication('Legal', 'Revoked', application.Legal.Revoked))
  }
  if (application.Legal && application.Legal.PoliceOtherOffenses) {
    dispatch(updateApplication('Legal', 'PoliceOtherOffenses', application.Legal.PoliceOtherOffenses))
  }
  if (application.Legal && application.Legal.PoliceDomesticViolence) {
    dispatch(updateApplication('Legal', 'PoliceDomesticViolence', application.Legal.PoliceDomesticViolence))
  }
  if (application.Legal && application.Legal.PoliceOffenses) {
    dispatch(updateApplication('Legal', 'PoliceOffenses', application.Legal.PoliceOffenses))
  }
  if (application.Legal && application.Legal.Manipulating) {
    dispatch(updateApplication('Legal', 'Manipulating', application.Legal.Manipulating))
  }
  if (application.Legal && application.Legal.Unauthorized) {
    dispatch(updateApplication('Legal', 'Unauthorized', application.Legal.Unauthorized))
  }
  if (application.Legal && application.Legal.Unlawful) {
    dispatch(updateApplication('Legal', 'Unlawful', application.Legal.Unlawful))
  }
  if (application.Psychological && application.Psychological.Competence) {
    dispatch(updateApplication('Psychological', 'Competence', application.Psychological.Competence))
  }
  if (application.Psychological && application.Psychological.ExistingConditions) {
    dispatch(updateApplication('Psychological', 'ExistingConditions', application.Psychological.ExistingConditions))
  }
  if (application.Psychological && application.Psychological.Consultations) {
    dispatch(updateApplication('Psychological', 'Consultations', application.Psychological.Consultations))
  }
  if (application.Psychological && application.Psychological.Diagnoses) {
    dispatch(updateApplication('Psychological', 'Diagnoses', application.Psychological.Diagnoses))
  }
  if (application.Psychological && application.Psychological.Hospitalizations) {
    dispatch(updateApplication('Psychological', 'Hospitalizations', application.Psychological.Hospitalizations))
  }
}

const application =
  {
    'Settings': {
      'mobileNavigation': false,
      'acceptedTerms': 'Yes'
    },
    'Identification': {},
    'Financial': {
      'Bankruptcy': {
        'List': [],
        'ListBranch': '',
        'HasBankruptcy': 'No'
      },
      'Gambling': {
        'List': [],
        'ListBranch': '',
        'HasGamblingDebt': 'No'
      },
      'Taxes': {
        'List': [],
        'ListBranch': '',
        'HasTaxes': 'No'
      },
      'Card': {
        'List': [],
        'ListBranch': '',
        'HasCardAbuse': 'No'
      },
      'Credit': {
        'List': [],
        'ListBranch': '',
        'HasCreditCounseling': 'No'
      },
      'Delinquent': {
        'List': [],
        'ListBranch': '',
        'HasDelinquent': 'No'
      },
      'Nonpayment': {
        'List': [],
        'ListBranch': '',
        'HasNonpayment': 'No'
      }
    },
    'Relationships': {
      'Marital': {
        'Status': 'Never',
        'CivilUnion': {},
        'DivorcedList': [],
        'DivorcedListBranch': ''
      },
      'Cohabitants': {
        'HasCohabitant': 'No',
        'CohabitantList': [],
        'CohabitantListBranch': ''
      },
      'People': {
        'List': [
          {
            'uuid': 'dac2b0a8-684a-3e07-ebfa-7d5dd1bb041b',
            'open': false,
            'Item': {
              'Name': {
                'first': 'Fernando',
                'firstInitialOnly': false,
                'last': 'Jimenez',
                'lastInitialOnly': false,
                'middle': 'Jose',
                'middleInitialOnly': false,
                'noMiddleName': false,
                'suffix': '',
                'suffixOther': ''
              },
              'Dates': {
                'name': 'Dates',
                'from': {
                  'name': 'from',
                  'month': '1',
                  'day': '1',
                  'year': '1998',
                  'estimated': false,
                  'date': new Date('1998-01-01T05:00:00.000Z')
                },
                'to': {
                  'date': new Date('2017-10-31T17:36:01.000Z'),
                  'year': 2017,
                  'month': '8',
                  'day': 31,
                  'estimated': false
                },
                'present': true,
                'uid': 'Dates-5fd8754f-71f2-e11b-562e-91c8e2fbd126',
                'presentClicked': true,
                'title': 'Date Range',
                'error': false
              },
              'RankNotApplicable': {
                'name': 'RankNotApplicable',
                'applicable': false
              },
              'Relationship': [
                'Friend'
              ],
              'MobileTelephone': {
                'name': 'MobileTelephone',
                'timeOfDay': 'Both',
                'type': 'Domestic',
                'numberType': 'Cell',
                'number': '4431111111',
                'extension': '',
                'noNumber': ''
              },
              'OtherTelephone': {
                'name': 'OtherTelephone',
                'timeOfDay': '',
                'type': 'Domestic',
                'numberType': '',
                'number': '',
                'extension': '',
                'noNumber': 'NA'
              },
              'Email': {
                'name': 'Email',
                'value': 'fernando@gmail.com'
              },
              'Address': {
                'uid': 'Address-6988c5ff-3886-09b4-ef19-b2006100e035',
                'street': '555 PARK MANOR CIR',
                'street2': '',
                'city': 'BEL AIR',
                'zipcode': '21014',
                'state': 'MD',
                'country': {
                  'value': 'United States'
                },
                'layout': 'Address',
                'validated': true
              }
            }
          },
          {
            'uuid': 'cea08c2e-dd7a-9cee-54f7-e7a340551330',
            'open': false,
            'Item': {
              'Name': {
                'first': 'Brandi',
                'firstInitialOnly': false,
                'last': 'Understreet',
                'lastInitialOnly': false,
                'middle': 'Lynne',
                'middleInitialOnly': false,
                'noMiddleName': false,
                'suffix': '',
                'suffixOther': ''
              },
              'Dates': {
                'name': 'Dates',
                'from': {
                  'name': 'from',
                  'month': '1',
                  'day': '1',
                  'year': '2006',
                  'estimated': false,
                  'date': new Date('2006-01-01T05:00:00.000Z')
                },
                'to': {
                  'date': new Date('2017-10-31T17:36:01.000Z'),
                  'year': 2017,
                  'month': '8',
                  'day': 31,
                  'estimated': false
                },
                'present': true,
                'uid': 'Dates-b3dc9365-b857-a518-c2cb-95c5874578b8',
                'presentClicked': true,
                'title': 'Date Range',
                'error': false
              },
              'RankNotApplicable': {
                'name': 'RankNotApplicable',
                'applicable': false
              },
              'Relationship': [
                'Friend'
              ],
              'MobileTelephone': {
                'name': 'MobileTelephone',
                'timeOfDay': '',
                'type': 'Domestic',
                'numberType': '',
                'number': '',
                'extension': '',
                'noNumber': 'NA'
              },
              'OtherTelephone': {
                'name': 'OtherTelephone',
                'timeOfDay': '',
                'type': 'Domestic',
                'numberType': '',
                'number': '',
                'extension': '',
                'noNumber': 'NA'
              },
              'EmailNotApplicable': {
                'name': 'EmailNotApplicable',
                'applicable': true
              },
              'Address': {
                'uid': 'Address-27bafce6-64be-2630-60e1-ad0176342d2e',
                'street': '554 PARK MANOR CIR',
                'street2': '',
                'city': 'BEL AIR',
                'zipcode': '21014',
                'state': 'MD',
                'country': {
                  'value': 'United States'
                },
                'layout': 'Address',
                'validated': true
              }
            }
          },
          {
            'uuid': '7b42d7be-a5b0-6503-1789-3a36e067a5b1',
            'open': false,
            'Item': {
              'Name': {
                'first': 'Victoria',
                'firstInitialOnly': false,
                'last': 'Salvatoriello',
                'lastInitialOnly': false,
                'middle': 'Olive',
                'middleInitialOnly': false,
                'noMiddleName': false,
                'suffix': '',
                'suffixOther': ''
              },
              'Dates': {
                'name': 'Dates',
                'from': {
                  'name': 'from',
                  'month': '2',
                  'day': '2',
                  'year': '2002',
                  'estimated': false,
                  'date': new Date('2002-02-02T05:00:00.000Z')
                },
                'to': {
                  'date': new Date('2017-10-31T17:36:01.000Z'),
                  'year': 2017,
                  'month': '8',
                  'day': 31,
                  'estimated': false
                },
                'present': true,
                'uid': 'Dates-52bc7831-b053-ee96-4057-17bc1bf53584',
                'presentClicked': true,
                'title': 'Date Range',
                'error': false
              },
              'RankNotApplicable': {
                'name': 'RankNotApplicable',
                'applicable': false
              },
              'Relationship': [
                'Friend'
              ],
              'MobileTelephone': {
                'name': 'MobileTelephone',
                'timeOfDay': '',
                'type': 'Domestic',
                'numberType': '',
                'number': '',
                'extension': '',
                'noNumber': 'NA'
              },
              'OtherTelephone': {
                'name': 'OtherTelephone',
                'timeOfDay': '',
                'type': 'Domestic',
                'numberType': '',
                'number': '',
                'extension': '',
                'noNumber': 'NA'
              },
              'EmailNotApplicable': {
                'name': 'EmailNotApplicable',
                'applicable': false
              },
              'Address': {
                'uid': 'Address-b339c567-dba3-d672-fe98-46eb7ccd06c0',
                'street': '556 PARK MANOR CIR',
                'street2': '',
                'city': 'BEL AIR',
                'zipcode': '21014',
                'state': 'MD',
                'country': {
                  'value': 'United States'
                },
                'layout': 'Address',
                'validated': true
              }
            }
          }
        ],
        'ListBranch': 'No'
      },
      'Relatives': {
        'List': [
          {
            'uuid': 'df4f12db-00bb-693a-bcd9-7c9635726d5c',
            'open': false,
            'Item': {
              'Relation': 'Mother',
              'Name': {
                'first': 'Glenna',
                'firstInitialOnly': false,
                'last': 'Early',
                'lastInitialOnly': false,
                'middle': 'F',
                'middleInitialOnly': true,
                'noMiddleName': false,
                'suffix': '',
                'suffixOther': ''
              },
              'Birthdate': {
                'name': 'Birthdate',
                'month': '4',
                'day': '24',
                'year': '1954',
                'estimated': false,
                'date': new Date('1954-04-24T04:00:00.000Z')
              },
              'Birthplace': {
                'uid': 'Birthplace-b61ae6d7-de33-40af-5597-383b318a297a',
                'city': 'Baltimore',
                'state': 'MD',
                'country': {
                  'value': 'United States'
                },
                'layout': 'Birthplace without County',
                'validated': false
              },
              'Citizenship': {
                'name': 'Citizenship',
                'comments': '',
                'showComments': false,
                'value': [
                  'United States'
                ]
              },
              'MaidenSameAsListed': 'Yes',
              'MaidenName': {},
              'Aliases': [
                {
                  'Has': 'No',
                  'index': '948e9eed-6ddb-44b4-722e-58e108214bf1'
                }
              ],
              'IsDeceased': 'No',
              'Address': {
                'uid': 'Address-16a8d2ed-0be8-680a-4fbd-ef1bd5996de4',
                'street': '555 PARK MANOR CIR',
                'street2': '',
                'city': 'BEL AIR',
                'zipcode': '21014',
                'state': 'MD',
                'country': {
                  'value': 'United States'
                },
                'layout': 'Address',
                'validated': true
              },
              'DocumentNumber': {},
              'CourtName': {},
              'CourtAddress': {},
              'Document': '',
              'DocumentComments': {},
              'ResidenceDocumentNumber': {},
              'Expiration': {},
              'FirstContact': {},
              'LastContact': {},
              'Methods': [],
              'MethodsComments': {},
              'Frequency': '',
              'FrequencyComments': {},
              'EmployerNotApplicable': {},
              'EmployerAddressNotApplicable': {},
              'EmployerRelationshipNotApplicable': {},
              'Employer': {},
              'EmployerAddress': {},
              'HasAffiliation': '',
              'EmployerRelationship': {}
            }
          },
          {
            'uuid': '9201c587-384d-50fb-c1e1-64a26e5ec360',
            'open': false,
            'Item': {
              'Relation': 'Father',
              'Name': {
                'first': 'John',
                'firstInitialOnly': false,
                'last': 'Neighborts',
                'lastInitialOnly': false,
                'middle': 'Owen',
                'middleInitialOnly': false,
                'noMiddleName': false,
                'suffix': 'III',
                'suffixOther': ''
              },
              'Birthdate': {
                'name': 'Birthdate',
                'month': '5',
                'day': '5',
                'year': '1952',
                'estimated': false,
                'date': new Date('1952-05-05T04:00:00.000Z')
              },
              'Birthplace': {
                'uid': 'Birthplace-1c99a14c-d3c6-bb4f-26b1-d8c6d808a36f',
                'city': 'Hereford',
                'state': 'MD',
                'country': {
                  'value': 'United States'
                },
                'layout': 'Birthplace without County',
                'validated': false
              },
              'Citizenship': {
                'name': 'Citizenship',
                'comments': '',
                'showComments': false,
                'value': []
              },
              'MaidenSameAsListed': '',
              'MaidenName': {},
              'Aliases': [
                {
                  'Has': 'No',
                  'index': 'ef263374-ae95-a6b1-19b5-52b444bb1b1c'
                }
              ],
              'IsDeceased': 'No',
              'Address': {
                'uid': 'Address-3bdf90fa-b1ec-4825-b69f-647429030c39',
                'street': '555 PARK MANOR CIR',
                'street2': '',
                'city': 'BEL AIR',
                'zipcode': '21014',
                'state': 'MD',
                'country': {
                  'value': 'United States'
                },
                'layout': 'Address',
                'validated': false
              },
              'DocumentNumber': {},
              'CourtName': {},
              'CourtAddress': {},
              'Document': '',
              'DocumentComments': {},
              'ResidenceDocumentNumber': {},
              'Expiration': {},
              'FirstContact': {},
              'LastContact': {},
              'Methods': [],
              'MethodsComments': {},
              'Frequency': '',
              'FrequencyComments': {},
              'EmployerNotApplicable': {},
              'EmployerAddressNotApplicable': {},
              'EmployerRelationshipNotApplicable': {},
              'Employer': {},
              'EmployerAddress': {},
              'HasAffiliation': '',
              'EmployerRelationship': {}
            }
          }
        ],
        'ListBranch': 'No'
      }
    },
    'Citizenship': {
      'Status': {
        'CitizenshipStatus': 'Citizen',
        'AbroadDocumentation': '',
        'Explanation': {},
        'DocumentNumber': {},
        'DocumentIssued': {},
        'PlaceIssued': {},
        'DocumentName': {},
        'CertificateNumber': {},
        'CertificateIssued': {},
        'CertificateName': {},
        'BornOnMilitaryInstallation': '',
        'MilitaryBase': {},
        'EntryDate': {},
        'EntryLocation': {},
        'PriorCitizenship': {},
        'HasAlienRegistration': '',
        'AlienRegistrationNumber': {},
        'CertificateCourtName': {},
        'CertificateCourtAddress': {},
        'Basis': '',
        'PermanentResidentCardNumber': {},
        'ResidenceStatus': {},
        'DocumentType': '',
        'DocumentExpiration': {}
      },
      'Multiple': {
        'Citizenships': [],
        'CitizenshipsBranch': '',
        'HasMultiple': 'No'
      },
      'Passports': {
        'Passports': [
          {
            'Has': 'No',
            'index': '518abf04-c6d4-ec74-629e-cb43f5a0552a'
          }
        ]
      }
    },
    'Military': {
      'Selective': {
        'WasBornAfter': 'Yes',
        'HasRegistered': 'Yes',
        'RegistrationNumber': {
          'value': '123456789',
          'name': 'RegistrationNumber'
        },
        'Explanation': null
      },
      'History': {
        'HasServed': 'No',
        'List': [],
        'ListBranch': ''
      },
      'Foreign': {
        'List': [
          {
            'Has': 'No',
            'index': 'a368a22c-0138-f221-957a-ae9e6e5f4b25'
          }
        ]
      }
    },
    'History': {
      'Residence': [
        {
          'uuid': '599740b5-f282-cfce-1f8e-e7956d587127',
          'open': false,
          'Item': {
            'name': 'Item',
            'Dates': {
              'name': 'Dates',
              'from': {
                'name': 'from',
                'month': '8',
                'day': '1',
                'year': '1984',
                'estimated': false,
                'date': new Date('1984-08-01T04:00:00.000Z')
              },
              'to': {
                'date': new Date('2017-10-31T17:36:01.000Z'),
                'year': 2017,
                'month': '8',
                'day': 31,
                'estimated': false
              },
              'present': true,
              'uid': 'Dates-7ae79c78-8bd8-4ec3-bcb6-7f32f578fd5e',
              'presentClicked': true,
              'title': 'Date Range',
              'error': false
            },
            'Address': {
              'uid': 'Address-6a88f4fc-ecda-ba84-20a9-0b148115770c',
              'street': '555 PARK MANOR CIR',
              'street2': '',
              'city': 'BEL AIR',
              'zipcode': '21014',
              'state': 'MD',
              'country': {
                'value': 'United States'
              },
              'layout': 'Address',
              'validated': true
            },
            'Role': 'Owned',
            'Reference': {
              'name': 'Reference',
              'FullName': {
                'first': 'Jamal',
                'firstInitialOnly': false,
                'last': 'Blake',
                'lastInitialOnly': false,
                'middle': 'Niles',
                'middleInitialOnly': false,
                'noMiddleName': false,
                'suffix': '',
                'suffixOther': ''
              },
              'LastContact': {
                'name': 'LastContact',
                'month': '10',
                'day': '1',
                'year': '2017',
                'estimated': false,
                'date': new Date('2017-10-01T04:00:00.000Z')
              },
              'Comments': {},
              'Relationship': [
                'Friend'
              ],
              'RelationshipOther': '',
              'Phone': {
                'name': 'Phone',
                'timeOfDay': '',
                'type': 'Domestic',
                'numberType': '',
                'number': '',
                'extension': '',
                'noNumber': 'NA'
              },
              'Email': {},
              'EmailNotApplicable': {
                'name': 'EmailNotApplicable',
                'applicable': false
              },
              'Address': {
                'uid': 'Address-9bd9529b-eeb6-7a3b-6c6e-89ca1f59cff2',
                'street': '554 PARK MANOR CIR',
                'street2': '',
                'city': 'BEL AIR',
                'zipcode': '21014',
                'state': 'MD',
                'country': {
                  'value': 'United States'
                },
                'layout': 'Address',
                'validated': false
              }
            }
          }
        }
      ],
      'CurrentAddress': {
        'uid': 'Address-6a88f4fc-ecda-ba84-20a9-0b148115770c',
        'street': '555 PARK MANOR CIR',
        'street2': '',
        'city': 'BEL AIR',
        'zipcode': '21014',
        'state': 'MD',
        'country': {
          'value': 'United States'
        },
        'layout': 'Address',
        'validated': true
      },
      'Employment': {
        'List': [
          {
            'uuid': '045cd0e3-8beb-7b33-6668-7d6012dbdce3',
            'open': false,
            'Item': {
              'EmploymentActivity': {
                'name': 'EmploymentActivity',
                'value': 'NonGovernment',
                'otherExplanation': ''
              },
              'Employment': {
                'value': 'Ignition72',
                'name': 'Employment'
              },
              'Dates': {
                'name': 'Dates',
                'from': {
                  'name': 'from',
                  'month': '4',
                  'day': '1',
                  'year': '2004',
                  'estimated': false,
                  'date': new Date('2004-04-01T05:00:00.000Z')
                },
                'to': {
                  'date': new Date('2017-10-31T17:36:01.000Z'),
                  'year': 2017,
                  'month': '8',
                  'day': 31,
                  'estimated': false
                },
                'present': true,
                'uid': 'Dates-61b4125c-c8b7-c541-be21-55e711287724',
                'presentClicked': true,
                'title': 'Date Range',
                'error': false
              },
              'Title': {
                'value': 'Designer',
                'name': 'Title'
              },
              'Status': {
                'name': 'Status',
                'value': 'Fulltime'
              },
              'Address': {
                'uid': 'Address-9030b716-760b-0fca-a2b9-490530d63ef9',
                'street': '3000 CHESTNUT AVE',
                'street2': 'STE 100',
                'city': 'BALTIMORE',
                'zipcode': '21211',
                'state': 'MD',
                'country': {
                  'value': 'United States'
                },
                'layout': 'Address',
                'validated': true
              },
              'Telephone': {
                'name': 'Telephone',
                'timeOfDay': '',
                'type': 'Domestic',
                'numberType': '',
                'number': '',
                'extension': '',
                'noNumber': 'NA'
              },
              'Supervisor': {
                'name': 'Supervisor',
                'SupervisorName': {
                  'value': 'Stephen',
                  'name': 'SupervisorName'
                },
                'Title': {
                  'value': 'CEO',
                  'name': 'Title'
                },
                'Email': {},
                'EmailNotApplicable': {
                  'name': 'EmailNotApplicable',
                  'applicable': false
                },
                'Address': {
                  'uid': 'Address-a8bb279f-cd49-3e14-34eb-f6e5281e70a4',
                  'street': '3000 chestnut ave',
                  'street2': 'STe 100',
                  'city': 'baltimore',
                  'zipcode': '21211',
                  'state': 'MD',
                  'country': {
                    'value': 'United States'
                  },
                  'layout': 'Address',
                  'validated': true
                },
                'Telephone': {
                  'name': 'Telephone',
                  'timeOfDay': '',
                  'type': 'Domestic',
                  'numberType': '',
                  'number': '',
                  'extension': '',
                  'noNumber': 'NA'
                }
              },
              'PhysicalAddress': {
                'name': 'PhysicalAddress',
                'HasDifferentAddress': 'No'
              },
              'Additional': {
                'name': 'Additional',
                'List': [
                  {
                    'Has': 'No',
                    'index': '93bad3eb-7419-fd8f-4683-0249b38adb4b'
                  }
                ]
              },
              'ReasonLeft': {
                'name': 'ReasonLeft',
                'Reasons': [
                  {
                    'Has': 'No',
                    'index': '125abb43-47be-b9e6-8359-b6d6f9e76f5c'
                  }
                ],
                'ReasonDescription': {
                  'name': 'reason_description',
                  'value': 'Still there'
                }
              },
              'Reprimand': {
                'name': 'Reprimand',
                'Reasons': [
                  {
                    'Has': 'No',
                    'index': '1c2df732-c5bb-dfc0-30cc-471ad700f34d'
                  }
                ]
              }
            }
          }
        ],
        'ListBranch': 'No'
      },
      'Education': {
        'HasAttended': 'No',
        'HasDegree10': 'Yes',
        'List': [
          {
            'uuid': '83a0727a-41c6-4b65-134f-e8f776d2747a',
            'open': false,
            'Item': {
              'name': 'Item',
              'Dates': {
                'name': 'Dates',
                'from': {
                  'name': 'from',
                  'month': '2',
                  'day': '2',
                  'year': '2004',
                  'estimated': false,
                  'date': new Date('2004-02-02T05:00:00.000Z')
                },
                'to': {
                  'name': 'to',
                  'month': '2',
                  'day': '2',
                  'year': '2008',
                  'estimated': false,
                  'date': new Date('2008-02-02T05:00:00.000Z')
                },
                'present': false
              },
              'Type': 'College',
              'Name': {
                'value': 'Towson Universtiy',
                'name': 'Name'
              },
              'Address': {
                'uid': 'Address-3114d514-a8f8-ff92-3c74-2391b1b92c96',
                'street': '555 PARK MANOR CIR',
                'street2': '',
                'city': 'BEL AIR',
                'zipcode': '21014',
                'state': 'MD',
                'country': {
                  'value': 'United States'
                },
                'layout': 'Address',
                'validated': true
              },
              'Diplomas': [
                {
                  'Has': 'Yes',
                  'index': '324f51d6-fc28-7ea2-86c4-c76af148628e',
                  'Diploma': {
                    'name': 'Diploma',
                    'Diploma': 'Bachelor',
                    'DiplomaOther': {},
                    'Date': {
                      'name': 'Date',
                      'month': '2',
                      'day': 1,
                      'year': '2008',
                      'estimated': false,
                      'date': new Date('2008-02-01T05:00:00.000Z')
                    }
                  }
                },
                {
                  'Has': 'No',
                  'index': '4c37e307-e2bb-1827-0b36-ab150b8fc063'
                }
              ]
            }
          }
        ]
      },
      'Federal': {
        'HasFederalService': 'No',
        'List': [],
        'ListBranch': ''
      }
    },
    'Foreign': {
      'Passport': {
        'Name': {},
        'Number': '',
        'Card': 'Book',
        'Issued': {},
        'Expiration': {},
        'Comments': '',
        'HasPassport': 'No',
        'suggestedNames': [],
        'Expired': {}
      },
      'Contacts': {
        'HasForeignContacts': 'No',
        'List': [],
        'ListBranch': ''
      },
      'DirectActivity': {
        'HasInterests': 'No',
        'List': [],
        'ListBranch': ''
      },
      'IndirectActivity': {
        'List': [],
        'ListBranch': '',
        'HasInterests': 'No'
      },
      'RealEstateActivity': {
        'List': [],
        'ListBranch': '',
        'HasInterests': 'No'
      },
      'BenefitActivity': {
        'List': [],
        'ListBranch': '',
        'HasBenefits': 'No'
      },
      'Support': {
        'HasForeignSupport': 'No',
        'List': [],
        'ListBranch': ''
      },
      'Advice': {
        'List': [],
        'ListBranch': '',
        'HasForeignAdvice': 'No'
      },
      'Family': {
        'List': [],
        'ListBranch': '',
        'HasForeignFamily': 'No'
      },
      'Employment': {
        'List': [],
        'ListBranch': '',
        'HasForeignEmployment': 'No'
      },
      'Ventures': {
        'HasForeignVentures': 'No',
        'List': [],
        'ListBranch': ''
      },
      'Conferences': {
        'List': [],
        'ListBranch': '',
        'HasForeignConferences': 'No'
      },
      'Contact': {
        'List': [],
        'ListBranch': '',
        'HasForeignContact': 'No'
      },
      'Sponsorship': {
        'List': [],
        'ListBranch': '',
        'HasForeignSponsorship': 'No'
      },
      'Political': {
        'List': [],
        'ListBranch': '',
        'HasForeignPolitical': 'No'
      },
      'Voting': {
        'List': [],
        'ListBranch': '',
        'HasForeignVoting': 'No'
      },
      'Travel': {
        'List': [],
        'ListBranch': '',
        'HasForeignTravelOutside': 'No',
        'HasForeignTravelOfficial': 'No'
      }
    },
    'TBD': {},
    'Legal': {
      'PoliceOffenses': {
        'List': [],
        'ListBranch': '',
        'HasOffenses': 'No'
      },
      'PoliceOtherOffenses': {
        'List': [],
        'ListBranch': '',
        'HasOtherOffenses': 'No'
      },
      'PoliceDomesticViolence': {
        'List': [
          {
            'Has': 'No',
            'index': '1bf5af9b-73a1-99cd-1f7b-8ad8d375c7e1'
          }
        ]
      },
      'History': {
        'List': [],
        'ListBranch': '',
        'HasHistory': 'No'
      },
      'Revoked': {
        'List': [],
        'ListBranch': '',
        'HasRevocations': 'No'
      },
      'Debarred': {
        'List': [],
        'ListBranch': '',
        'HasDebarment': 'No'
      },
      'NonCriminalCourtActions': {
        'HasCourtActions': 'No',
        'List': [],
        'ListBranch': ''
      },
      'Unauthorized': {
        'List': [],
        'ListBranch': '',
        'HasUnauthorized': 'No'
      },
      'Manipulating': {
        'List': [],
        'ListBranch': '',
        'HasManipulating': 'No'
      },
      'Unlawful': {
        'List': [],
        'ListBranch': '',
        'HasUnlawful': 'No'
      },
      'TerroristOrganization': {
        'List': [],
        'ListBranch': '',
        'HasTerrorist': 'No'
      },
      'EngagedInTerrorism': {
        'List': [],
        'ListBranch': '',
        'HasEngaged': 'No'
      },
      'Advocating': {
        'List': [],
        'ListBranch': '',
        'HasAdvocated': 'No'
      },
      'MembershipOverthrow': {
        'List': [],
        'ListBranch': '',
        'HasOverthrow': 'No'
      },
      'MembershipViolence': {
        'List': [],
        'ListBranch': '',
        'HasViolence': 'No'
      },
      'ActivitiesToOverthrow': {
        'List': [],
        'ListBranch': '',
        'HasActivities': 'No'
      },
      'TerrorismAssociation': {
        'Explanation': {},
        'HasTerrorism': 'No'
      }
    },
    'Psychological': {
      'Competence': {
        'List': [],
        'ListBranch': '',
        'IsIncompetent': 'No'
      },
      'Consultations': {
        'List': [],
        'ListBranch': '',
        'Consulted': 'No'
      },
      'Hospitalizations': {
        'List': [],
        'ListBranch': '',
        'Hospitalized': 'No'
      },
      'Diagnoses': {
        'Diagnosed': 'No',
        'DidNotConsult': '',
        'InTreatment': '',
        'DiagnosisList': [],
        'DiagnosisListBranch': '',
        'TreatmentList': [],
        'TreatmentListBranch': ''
      },
      'ExistingConditions': {
        'HasCondition': 'No',
        'ReceivedTreatment': '',
        'Explanation': {},
        'TreatmentList': [],
        'TreatmentListBranch': '',
        'DidNotFollow': '',
        'DidNotFollowExplanation': {}
      }
    },
    'SubstanceUse': {
      'DrugUses': {
        'UsedDrugs': 'No',
        'List': [],
        'ListBranch': ''
      },
      'DrugInvolvements': {
        'Involved': 'No',
        'List': [],
        'ListBranch': ''
      },
      'DrugClearanceUses': {
        'UsedDrugs': 'No',
        'List': [],
        'ListBranch': ''
      },
      'DrugPublicSafetyUses': {
        'UsedDrugs': 'No',
        'List': [],
        'ListBranch': ''
      },
      'PrescriptionUses': {
        'MisusedDrugs': 'No',
        'List': [],
        'ListBranch': ''
      },
      'OrderedTreatments': {
        'TreatmentOrdered': 'No',
        'List': [],
        'ListBranch': ''
      },
      'VoluntaryTreatments': {
        'TreatmentVoluntary': 'No',
        'List': [],
        'ListBranch': ''
      },
      'NegativeImpacts': {
        'HasImpacts': 'No',
        'List': [],
        'ListBranch': ''
      },
      'OrderedCounselings': {
        'HasBeenOrdered': 'No',
        'List': [],
        'ListBranch': ''
      },
      'VoluntaryCounselings': {
        'SoughtTreatment': 'No',
        'List': [],
        'ListBranch': ''
      },
      'ReceivedCounselings': {
        'ReceivedTreatment': 'No',
        'List': [],
        'ListBranch': ''
      }
    },
    'Submission': {},
    'Completed': {
      'identification': [
        {
          'code': 'identification/name',
          'section': 'identification',
          'subsection': 'name',
          'valid': false
        }
      ],
      'relationships': [
        {
          'code': 'relationships/status/marital',
          'section': 'relationships',
          'subsection': 'status/marital',
          'valid': true
        },
        {
          'code': 'relationships/status/cohabitant',
          'section': 'relationships',
          'subsection': 'status/cohabitant',
          'valid': true
        },
        {
          'code': 'relationships/people',
          'section': 'relationships',
          'subsection': 'people',
          'valid': false
        },
        {
          'code': 'relationships/relatives',
          'section': 'relationships',
          'subsection': 'relatives',
          'valid': false
        }
      ],
      'history': [
        {
          'code': 'history/residence',
          'section': 'history',
          'subsection': 'residence',
          'valid': true
        },
        {
          'code': 'history/employment',
          'section': 'history',
          'subsection': 'employment',
          'valid': true
        },
        {
          'code': 'history/education',
          'section': 'history',
          'subsection': 'education',
          'valid': true
        },
        {
          'code': 'history/federal',
          'section': 'history',
          'subsection': 'federal',
          'valid': true
        }
      ],
      'citizenship': [
        {
          'code': 'citizenship/status',
          'section': 'citizenship',
          'subsection': 'status',
          'valid': true
        },
        {
          'code': 'citizenship/multiple',
          'section': 'citizenship',
          'subsection': 'multiple',
          'valid': true
        },
        {
          'code': 'citizenship/passports',
          'section': 'citizenship',
          'subsection': 'passports',
          'valid': true
        }
      ],
      'military': [
        {
          'code': 'military/selective',
          'section': 'military',
          'subsection': 'selective',
          'valid': true
        },
        {
          'code': 'military/history',
          'section': 'military',
          'subsection': 'history',
          'valid': true
        },
        {
          'code': 'military/foreign',
          'section': 'military',
          'subsection': 'foreign',
          'valid': true
        }
      ],
      'foreign': [
        {
          'code': 'foreign/passport',
          'section': 'foreign',
          'subsection': 'passport',
          'valid': true
        },
        {
          'code': 'foreign/contacts',
          'section': 'foreign',
          'subsection': 'contacts',
          'valid': true
        },
        {
          'code': 'foreign/activities/direct',
          'section': 'foreign',
          'subsection': 'activities/direct',
          'valid': true
        },
        {
          'code': 'foreign/activities/indirect',
          'section': 'foreign',
          'subsection': 'activities/indirect',
          'valid': true
        },
        {
          'code': 'foreign/activities/realestate',
          'section': 'foreign',
          'subsection': 'activities/realestate',
          'valid': true
        },
        {
          'code': 'foreign/activities/benefits',
          'section': 'foreign',
          'subsection': 'activities/benefits',
          'valid': true
        },
        {
          'code': 'foreign/activities/support',
          'section': 'foreign',
          'subsection': 'activities/support',
          'valid': true
        },
        {
          'code': 'foreign/business/advice',
          'section': 'foreign',
          'subsection': 'business/advice',
          'valid': true
        },
        {
          'code': 'foreign/business/family',
          'section': 'foreign',
          'subsection': 'business/family',
          'valid': true
        },
        {
          'code': 'foreign/business/employment',
          'section': 'foreign',
          'subsection': 'business/employment',
          'valid': true
        },
        {
          'code': 'foreign/business/ventures',
          'section': 'foreign',
          'subsection': 'business/ventures',
          'valid': true
        },
        {
          'code': 'foreign/business/conferences',
          'section': 'foreign',
          'subsection': 'business/conferences',
          'valid': true
        },
        {
          'code': 'foreign/business/contact',
          'section': 'foreign',
          'subsection': 'business/contact',
          'valid': true
        },
        {
          'code': 'foreign/business/sponsorship',
          'section': 'foreign',
          'subsection': 'business/sponsorship',
          'valid': true
        },
        {
          'code': 'foreign/business/political',
          'section': 'foreign',
          'subsection': 'business/political',
          'valid': true
        },
        {
          'code': 'foreign/business/voting',
          'section': 'foreign',
          'subsection': 'business/voting',
          'valid': true
        },
        {
          'code': 'foreign/travel',
          'section': 'foreign',
          'subsection': 'travel',
          'valid': false
        }
      ],
      'financial': [
        {
          'code': 'financial/bankruptcy',
          'section': 'financial',
          'subsection': 'bankruptcy',
          'valid': true
        },
        {
          'code': 'financial/gambling',
          'section': 'financial',
          'subsection': 'gambling',
          'valid': true
        },
        {
          'code': 'financial/taxes',
          'section': 'financial',
          'subsection': 'taxes',
          'valid': true
        },
        {
          'code': 'financial/card',
          'section': 'financial',
          'subsection': 'card',
          'valid': true
        },
        {
          'code': 'financial/credit',
          'section': 'financial',
          'subsection': 'credit',
          'valid': true
        },
        {
          'code': 'financial/delinquent',
          'section': 'financial',
          'subsection': 'delinquent',
          'valid': true
        },
        {
          'code': 'financial/nonpayment',
          'section': 'financial',
          'subsection': 'nonpayment',
          'valid': true
        }
      ],
      'substance': [
        {
          'code': 'substance/drugs/usage',
          'section': 'substance',
          'subsection': 'drugs/usage',
          'valid': true
        },
        {
          'code': 'substance/drugs/purchase',
          'section': 'substance',
          'subsection': 'drugs/purchase',
          'valid': true
        },
        {
          'code': 'substance/drugs/clearance',
          'section': 'substance',
          'subsection': 'drugs/clearance',
          'valid': true
        },
        {
          'code': 'substance/drugs/publicsafety',
          'section': 'substance',
          'subsection': 'drugs/publicsafety',
          'valid': true
        },
        {
          'code': 'substance/drugs/misuse',
          'section': 'substance',
          'subsection': 'drugs/misuse',
          'valid': true
        },
        {
          'code': 'substance/drugs/ordered',
          'section': 'substance',
          'subsection': 'drugs/ordered',
          'valid': true
        },
        {
          'code': 'substance/drugs/voluntary',
          'section': 'substance',
          'subsection': 'drugs/voluntary',
          'valid': true
        },
        {
          'code': 'substance/alcohol/negative',
          'section': 'substance',
          'subsection': 'alcohol/negative',
          'valid': true
        },
        {
          'code': 'substance/alcohol/ordered',
          'section': 'substance',
          'subsection': 'alcohol/ordered',
          'valid': true
        },
        {
          'code': 'substance/alcohol/voluntary',
          'section': 'substance',
          'subsection': 'alcohol/voluntary',
          'valid': true
        },
        {
          'code': 'substance/alcohol/additional',
          'section': 'substance',
          'subsection': 'alcohol/additional',
          'valid': true
        }
      ],
      'legal': [
        {
          'code': 'legal/police/offenses',
          'section': 'legal',
          'subsection': 'police/offenses',
          'valid': true
        },
        {
          'code': 'legal/police/additionaloffenses',
          'section': 'legal',
          'subsection': 'police/additionaloffenses',
          'valid': true
        },
        {
          'code': 'legal/police/domesticviolence',
          'section': 'legal',
          'subsection': 'police/domesticviolence',
          'valid': true
        },
        {
          'code': 'legal/investigations/history',
          'section': 'legal',
          'subsection': 'investigations/history',
          'valid': true
        },
        {
          'code': 'legal/investigations/revoked',
          'section': 'legal',
          'subsection': 'investigations/revoked',
          'valid': true
        },
        {
          'code': 'legal/investigations/debarred',
          'section': 'legal',
          'subsection': 'investigations/debarred',
          'valid': true
        },
        {
          'code': 'legal/court',
          'section': 'legal',
          'subsection': 'court',
          'valid': true
        },
        {
          'code': 'legal/technology/unauthorized',
          'section': 'legal',
          'subsection': 'technology/unauthorized',
          'valid': true
        },
        {
          'code': 'legal/technology/manipulating',
          'section': 'legal',
          'subsection': 'technology/manipulating',
          'valid': true
        },
        {
          'code': 'legal/technology/unlawful',
          'section': 'legal',
          'subsection': 'technology/unlawful',
          'valid': true
        },
        {
          'code': 'legal/associations/terrorist-organization',
          'section': 'legal',
          'subsection': 'associations/terrorist-organization',
          'valid': true
        },
        {
          'code': 'legal/associations/engaged-in-terrorism',
          'section': 'legal',
          'subsection': 'associations/engaged-in-terrorism',
          'valid': true
        },
        {
          'code': 'legal/associations/advocating',
          'section': 'legal',
          'subsection': 'associations/advocating',
          'valid': true
        },
        {
          'code': 'legal/associations/membership-overthrow',
          'section': 'legal',
          'subsection': 'associations/membership-overthrow',
          'valid': true
        },
        {
          'code': 'legal/associations/membership-violence-or-force',
          'section': 'legal',
          'subsection': 'associations/membership-violence-or-force',
          'valid': true
        },
        {
          'code': 'legal/associations/activities-to-overthrow',
          'section': 'legal',
          'subsection': 'associations/activities-to-overthrow',
          'valid': true
        },
        {
          'code': 'legal/associations/terrorism-association',
          'section': 'legal',
          'subsection': 'associations/terrorism-association',
          'valid': true
        }
      ],
      'psychological': [
        {
          'code': 'psychological/competence',
          'section': 'psychological',
          'subsection': 'competence',
          'valid': true
        },
        {
          'code': 'psychological/consultations',
          'section': 'psychological',
          'subsection': 'consultations',
          'valid': true
        },
        {
          'code': 'psychological/hospitalizations',
          'section': 'psychological',
          'subsection': 'hospitalizations',
          'valid': true
        },
        {
          'code': 'psychological/diagnoses',
          'section': 'psychological',
          'subsection': 'diagnoses',
          'valid': true
        },
        {
          'code': 'psychological/conditions',
          'section': 'psychological',
          'subsection': 'conditions',
          'valid': true
        }
      ]
    },
    'Errors': {
      'identification': [],
      'relationships': [
        {
          'section': 'relationships',
          'subsection': 'status/marital',
          'code': 'required',
          'valid': true,
          'uid': 'status-c1a09718-a36f-1979-a03a-b9059403d73c'
        },
        {
          'section': 'relationships',
          'subsection': 'status/cohabitant',
          'code': 'required',
          'valid': true,
          'uid': 'undefined-8c72acb5-e26d-5ce9-832b-d056ea4f3378'
        },
        {
          'section': 'relationships',
          'subsection': 'relatives',
          'code': 'required',
          'valid': true,
          'uid': 'undefined-e67cabf4-274a-6308-e804-c8d85e2bbf4e'
        },
        {
          'section': 'relationships',
          'subsection': 'relatives',
          'code': 'name.required',
          'valid': true,
          'uid': 'Name-365e310f-bf93-3f3a-822e-b3117f7a7421'
        },
        {
          'section': 'relationships',
          'subsection': 'relatives',
          'code': 'location.toggleablelocation.required',
          'valid': true,
          'uid': 'Birthplace-50df37a1-0311-d7b6-2264-28ed1fec474c'
        },
        {
          'section': 'relationships',
          'subsection': 'relatives',
          'code': 'location.required',
          'valid': true,
          'uid': 'undefined-ba69bb39-1eed-9175-e6fe-f7e8d6aad5aa'
        },
        {
          'section': 'relationships',
          'subsection': 'relatives',
          'code': 'location.toggleablelocation.city.required',
          'valid': true,
          'uid': 'city-9be83ae3-25e4-e9c1-57b9-e8686ba792ed'
        },
        {
          'section': 'relationships',
          'subsection': 'relatives',
          'code': 'location.toggleablelocation.city.length',
          'valid': true,
          'uid': 'city-9be83ae3-25e4-e9c1-57b9-e8686ba792ed'
        },
        {
          'section': 'relationships',
          'subsection': 'relatives',
          'code': 'location.toggleablelocation.city.pattern',
          'valid': true,
          'uid': 'city-9be83ae3-25e4-e9c1-57b9-e8686ba792ed'
        },
        {
          'section': 'relationships',
          'subsection': 'relatives',
          'code': 'required',
          'valid': true,
          'uid': 'undefined-99261388-3240-5031-f12b-4bb3ad5aaa15'
        },
        {
          'section': 'relationships',
          'subsection': 'relatives',
          'code': 'required',
          'valid': true,
          'uid': 'undefined-99950675-647f-1738-a2ee-1cd1f3eac968'
        },
        {
          'section': 'relationships',
          'subsection': 'relatives',
          'code': 'required',
          'valid': true,
          'uid': 'undefined-545e5b0d-04ce-d342-efa8-60bfdabf65ed'
        },
        {
          'section': 'relationships',
          'subsection': 'relatives',
          'code': 'location.address.street.required',
          'valid': true,
          'uid': 'address-c3eca126-5b44-01ac-f3cc-5a5cf88705ba'
        },
        {
          'section': 'relationships',
          'subsection': 'relatives',
          'code': 'location.address.street.length',
          'valid': true,
          'uid': 'address-c3eca126-5b44-01ac-f3cc-5a5cf88705ba'
        },
        {
          'section': 'relationships',
          'subsection': 'relatives',
          'code': 'location.address.street.pattern',
          'valid': true,
          'uid': 'address-c3eca126-5b44-01ac-f3cc-5a5cf88705ba'
        },
        {
          'section': 'relationships',
          'subsection': 'relatives',
          'code': 'location.address.required',
          'valid': true,
          'uid': 'Address-57a08e0d-9d66-75f1-393d-6b4d1ff18f7e'
        },
        {
          'section': 'relationships',
          'subsection': 'relatives',
          'code': 'location.address.street.required',
          'valid': true,
          'uid': 'street2-6128ff63-82d6-bc37-e5d1-9076fa691d1e'
        },
        {
          'section': 'relationships',
          'subsection': 'relatives',
          'code': 'location.address.street.length',
          'valid': null,
          'uid': 'street2-6128ff63-82d6-bc37-e5d1-9076fa691d1e'
        },
        {
          'section': 'relationships',
          'subsection': 'relatives',
          'code': 'location.address.street.pattern',
          'valid': null,
          'uid': 'street2-6128ff63-82d6-bc37-e5d1-9076fa691d1e'
        },
        {
          'section': 'relationships',
          'subsection': 'relatives',
          'code': 'location.address.city.required',
          'valid': true,
          'uid': 'city-8f130399-d94d-54c5-14f1-9f13170cecb8'
        },
        {
          'section': 'relationships',
          'subsection': 'relatives',
          'code': 'location.address.city.length',
          'valid': true,
          'uid': 'city-8f130399-d94d-54c5-14f1-9f13170cecb8'
        },
        {
          'section': 'relationships',
          'subsection': 'relatives',
          'code': 'location.address.city.pattern',
          'valid': true,
          'uid': 'city-8f130399-d94d-54c5-14f1-9f13170cecb8'
        },
        {
          'section': 'relationships',
          'subsection': 'relatives',
          'code': 'location.address.zipcode.required',
          'valid': true,
          'uid': 'zipcode-8c0937f1-15ad-e3a7-d645-308c94815447'
        },
        {
          'section': 'relationships',
          'subsection': 'relatives',
          'code': 'location.address.zipcode.length',
          'valid': true,
          'uid': 'zipcode-8c0937f1-15ad-e3a7-d645-308c94815447'
        },
        {
          'section': 'relationships',
          'subsection': 'relatives',
          'code': 'location.address.zipcode.pattern',
          'valid': true,
          'uid': 'zipcode-8c0937f1-15ad-e3a7-d645-308c94815447'
        },
        {
          'section': 'relationships',
          'subsection': 'relatives',
          'code': 'required',
          'valid': true,
          'uid': 'undefined-52c7766a-d253-50bc-adf5-f593a64b6b2d'
        },
        {
          'section': 'relationships',
          'subsection': 'relatives',
          'code': 'name.required',
          'valid': true,
          'uid': 'Name-4dffba87-e1f0-1762-1617-a8ee870a82c5'
        },
        {
          'section': 'relationships',
          'subsection': 'relatives',
          'code': 'location.toggleablelocation.required',
          'valid': true,
          'uid': 'Birthplace-7859d5a6-23de-8e13-ffde-2d73c3512e21'
        },
        {
          'section': 'relationships',
          'subsection': 'relatives',
          'code': 'location.required',
          'valid': true,
          'uid': 'undefined-c3d0faba-d1f0-974f-f84e-c48f5295dd1d'
        },
        {
          'section': 'relationships',
          'subsection': 'relatives',
          'code': 'location.toggleablelocation.city.required',
          'valid': true,
          'uid': 'city-51b2a2f8-246f-2730-7e78-95a544a94670'
        },
        {
          'section': 'relationships',
          'subsection': 'relatives',
          'code': 'location.toggleablelocation.city.length',
          'valid': true,
          'uid': 'city-51b2a2f8-246f-2730-7e78-95a544a94670'
        },
        {
          'section': 'relationships',
          'subsection': 'relatives',
          'code': 'location.toggleablelocation.city.pattern',
          'valid': true,
          'uid': 'city-51b2a2f8-246f-2730-7e78-95a544a94670'
        },
        {
          'section': 'relationships',
          'subsection': 'relatives',
          'code': 'required',
          'valid': true,
          'uid': 'undefined-a7445179-2938-8a65-336c-5bbe5bb09a7e'
        },
        {
          'section': 'relationships',
          'subsection': 'relatives',
          'code': 'required',
          'valid': true,
          'uid': 'undefined-d0ffc990-0821-161c-aa1d-aaefa994e99d'
        },
        {
          'section': 'relationships',
          'subsection': 'relatives',
          'code': 'location.address.street.required',
          'valid': true,
          'uid': 'address-8598ed1d-11aa-0ba5-2755-f116ae78298b'
        },
        {
          'section': 'relationships',
          'subsection': 'relatives',
          'code': 'location.address.street.length',
          'valid': true,
          'uid': 'address-8598ed1d-11aa-0ba5-2755-f116ae78298b'
        },
        {
          'section': 'relationships',
          'subsection': 'relatives',
          'code': 'location.address.street.pattern',
          'valid': true,
          'uid': 'address-8598ed1d-11aa-0ba5-2755-f116ae78298b'
        },
        {
          'section': 'relationships',
          'subsection': 'relatives',
          'code': 'location.address.required',
          'valid': true,
          'uid': 'Address-dda8847c-ede2-1fe5-75fd-7c759b34f200'
        },
        {
          'section': 'relationships',
          'subsection': 'relatives',
          'code': 'location.address.street.required',
          'valid': true,
          'uid': 'street2-4144e251-6ccd-38b4-38bd-0e1495b222ef'
        },
        {
          'section': 'relationships',
          'subsection': 'relatives',
          'code': 'location.address.street.length',
          'valid': null,
          'uid': 'street2-4144e251-6ccd-38b4-38bd-0e1495b222ef'
        },
        {
          'section': 'relationships',
          'subsection': 'relatives',
          'code': 'location.address.street.pattern',
          'valid': null,
          'uid': 'street2-4144e251-6ccd-38b4-38bd-0e1495b222ef'
        },
        {
          'section': 'relationships',
          'subsection': 'relatives',
          'code': 'location.address.city.required',
          'valid': true,
          'uid': 'city-ade2a83f-f434-07b6-3c8c-ba897dbbfc82'
        },
        {
          'section': 'relationships',
          'subsection': 'relatives',
          'code': 'location.address.city.length',
          'valid': true,
          'uid': 'city-ade2a83f-f434-07b6-3c8c-ba897dbbfc82'
        },
        {
          'section': 'relationships',
          'subsection': 'relatives',
          'code': 'location.address.city.pattern',
          'valid': true,
          'uid': 'city-ade2a83f-f434-07b6-3c8c-ba897dbbfc82'
        },
        {
          'section': 'relationships',
          'subsection': 'relatives',
          'code': 'location.address.zipcode.required',
          'valid': true,
          'uid': 'zipcode-89706c07-c3cf-a077-7c82-656d3d822cf2'
        },
        {
          'section': 'relationships',
          'subsection': 'relatives',
          'code': 'location.address.zipcode.length',
          'valid': true,
          'uid': 'zipcode-89706c07-c3cf-a077-7c82-656d3d822cf2'
        },
        {
          'section': 'relationships',
          'subsection': 'relatives',
          'code': 'location.address.zipcode.pattern',
          'valid': true,
          'uid': 'zipcode-89706c07-c3cf-a077-7c82-656d3d822cf2'
        },
        {
          'section': 'relationships',
          'subsection': 'relatives',
          'code': 'required',
          'valid': true,
          'uid': 'undefined-7284ae77-f278-5b49-6aec-3ca6af4c756f'
        },
        {
          'section': 'relationships',
          'subsection': 'relatives',
          'code': 'required',
          'valid': true,
          'uid': 'ResidenceDocumentNumber-17b6e0a6-eae3-3c2c-00d7-a07295781988'
        },
        {
          'section': 'relationships',
          'subsection': 'relatives',
          'code': 'length',
          'valid': null,
          'uid': 'ResidenceDocumentNumber-17b6e0a6-eae3-3c2c-00d7-a07295781988'
        },
        {
          'section': 'relationships',
          'subsection': 'relatives',
          'code': 'pattern',
          'valid': null,
          'uid': 'ResidenceDocumentNumber-17b6e0a6-eae3-3c2c-00d7-a07295781988'
        },
        {
          'section': 'relationships',
          'subsection': 'relatives',
          'code': 'required',
          'valid': true,
          'uid': 'Employer-53f8f450-5fb4-fb81-b78c-08f57f59bc7d'
        },
        {
          'section': 'relationships',
          'subsection': 'relatives',
          'code': 'length',
          'valid': null,
          'uid': 'Employer-53f8f450-5fb4-fb81-b78c-08f57f59bc7d'
        },
        {
          'section': 'relationships',
          'subsection': 'relatives',
          'code': 'pattern',
          'valid': null,
          'uid': 'Employer-53f8f450-5fb4-fb81-b78c-08f57f59bc7d'
        },
        {
          'section': 'relationships',
          'subsection': 'relatives',
          'code': 'location.street.required',
          'valid': true,
          'uid': 'street-d1808a0e-6a32-0182-5389-7f0a6b8a9039'
        },
        {
          'section': 'relationships',
          'subsection': 'relatives',
          'code': 'location.street.length',
          'valid': null,
          'uid': 'street-d1808a0e-6a32-0182-5389-7f0a6b8a9039'
        },
        {
          'section': 'relationships',
          'subsection': 'relatives',
          'code': 'location.street.pattern',
          'valid': null,
          'uid': 'street-d1808a0e-6a32-0182-5389-7f0a6b8a9039'
        },
        {
          'section': 'relationships',
          'subsection': 'relatives',
          'code': 'location.city.required',
          'valid': true,
          'uid': 'city-6b8c861f-2f2e-ebe4-99ad-6d28da090383'
        },
        {
          'section': 'relationships',
          'subsection': 'relatives',
          'code': 'location.city.length',
          'valid': null,
          'uid': 'city-6b8c861f-2f2e-ebe4-99ad-6d28da090383'
        },
        {
          'section': 'relationships',
          'subsection': 'relatives',
          'code': 'location.city.pattern',
          'valid': null,
          'uid': 'city-6b8c861f-2f2e-ebe4-99ad-6d28da090383'
        },
        {
          'section': 'relationships',
          'subsection': 'relatives',
          'code': 'required',
          'valid': true,
          'uid': 'undefined-fa0b7660-ea30-d97b-2f89-68af008df123'
        },
        {
          'section': 'relationships',
          'subsection': 'relatives',
          'code': 'required',
          'valid': true,
          'uid': 'undefined-5f9f17dc-a2ee-a7ac-25f6-d604a63f142d'
        },
        {
          'section': 'relationships',
          'subsection': 'relatives',
          'code': 'location.toggleablelocation.state.required',
          'valid': true,
          'uid': 'state-ff22ec45-a1b0-27cc-9c7e-1292992be467'
        },
        {
          'section': 'relationships',
          'subsection': 'relatives',
          'code': 'location.toggleablelocation.state.notfound',
          'valid': true,
          'uid': 'state-ff22ec45-a1b0-27cc-9c7e-1292992be467'
        },
        {
          'section': 'relationships',
          'subsection': 'relatives',
          'code': 'country.required',
          'valid': true,
          'uid': 'Citizenship-50cf3852-6292-cf98-72ca-257e5df3b99a'
        },
        {
          'section': 'relationships',
          'subsection': 'relatives',
          'code': 'country.notfound',
          'valid': null,
          'uid': 'Citizenship-50cf3852-6292-cf98-72ca-257e5df3b99a'
        },
        {
          'section': 'relationships',
          'subsection': 'relatives',
          'code': 'location.address.state.required',
          'valid': true,
          'uid': 'state-31ac84c5-d375-3a0b-2af4-174a1f7b354a'
        },
        {
          'section': 'relationships',
          'subsection': 'relatives',
          'code': 'location.address.state.notfound',
          'valid': true,
          'uid': 'state-31ac84c5-d375-3a0b-2af4-174a1f7b354a'
        },
        {
          'section': 'relationships',
          'subsection': 'relatives',
          'code': 'location.toggleablelocation.state.required',
          'valid': true,
          'uid': 'state-74b49e6d-9eaa-e106-a22a-4ced49eb1694'
        },
        {
          'section': 'relationships',
          'subsection': 'relatives',
          'code': 'location.toggleablelocation.state.notfound',
          'valid': true,
          'uid': 'state-74b49e6d-9eaa-e106-a22a-4ced49eb1694'
        },
        {
          'section': 'relationships',
          'subsection': 'relatives',
          'code': 'country.required',
          'valid': true,
          'uid': 'Citizenship-d30ebde0-eb8a-4c52-139e-f885e8442a90'
        },
        {
          'section': 'relationships',
          'subsection': 'relatives',
          'code': 'country.notfound',
          'valid': null,
          'uid': 'Citizenship-d30ebde0-eb8a-4c52-139e-f885e8442a90'
        },
        {
          'section': 'relationships',
          'subsection': 'relatives',
          'code': 'location.address.state.required',
          'valid': true,
          'uid': 'state-ddf8c71f-6d57-d969-5b2f-e9de26128fa4'
        },
        {
          'section': 'relationships',
          'subsection': 'relatives',
          'code': 'location.address.state.notfound',
          'valid': true,
          'uid': 'state-ddf8c71f-6d57-d969-5b2f-e9de26128fa4'
        },
        {
          'section': 'relationships',
          'subsection': 'relatives',
          'code': 'date.month.required',
          'valid': true,
          'uid': 'month-a2cd931b-1ac0-3da3-0419-0f304674822a'
        },
        {
          'section': 'relationships',
          'subsection': 'relatives',
          'code': 'date.month.length',
          'valid': true,
          'uid': 'month-a2cd931b-1ac0-3da3-0419-0f304674822a'
        },
        {
          'section': 'relationships',
          'subsection': 'relatives',
          'code': 'date.month.pattern',
          'valid': true,
          'uid': 'month-a2cd931b-1ac0-3da3-0419-0f304674822a'
        },
        {
          'section': 'relationships',
          'subsection': 'relatives',
          'code': 'date.month.min',
          'valid': true,
          'uid': 'month-01393da2-8c5f-4d4a-334d-c9a643273526'
        },
        {
          'section': 'relationships',
          'subsection': 'relatives',
          'code': 'date.month.max',
          'valid': true,
          'uid': 'month-01393da2-8c5f-4d4a-334d-c9a643273526'
        },
        {
          'section': 'relationships',
          'subsection': 'relatives',
          'code': 'date.required',
          'valid': true,
          'uid': 'Birthdate-ec97ec68-a8ec-803a-b655-be534669eec5'
        },
        {
          'section': 'relationships',
          'subsection': 'relatives',
          'code': 'date.max',
          'valid': true,
          'uid': 'Birthdate-ec97ec68-a8ec-803a-b655-be534669eec5'
        },
        {
          'section': 'relationships',
          'subsection': 'relatives',
          'code': 'date.min',
          'valid': true,
          'uid': 'Birthdate-ec97ec68-a8ec-803a-b655-be534669eec5'
        },
        {
          'section': 'relationships',
          'subsection': 'relatives',
          'code': 'date.day.required',
          'valid': true,
          'uid': 'day-9d66df3c-0c66-3dc0-4ca6-cfe4ae86ded0'
        },
        {
          'section': 'relationships',
          'subsection': 'relatives',
          'code': 'date.day.length',
          'valid': true,
          'uid': 'day-9d66df3c-0c66-3dc0-4ca6-cfe4ae86ded0'
        },
        {
          'section': 'relationships',
          'subsection': 'relatives',
          'code': 'date.day.pattern',
          'valid': true,
          'uid': 'day-9d66df3c-0c66-3dc0-4ca6-cfe4ae86ded0'
        },
        {
          'section': 'relationships',
          'subsection': 'relatives',
          'code': 'date.day.min',
          'valid': true,
          'uid': 'day-9c832090-6ed6-96a6-ff04-9f4ade828339'
        },
        {
          'section': 'relationships',
          'subsection': 'relatives',
          'code': 'date.day.max',
          'valid': true,
          'uid': 'day-9c832090-6ed6-96a6-ff04-9f4ade828339'
        },
        {
          'section': 'relationships',
          'subsection': 'relatives',
          'code': 'date.year.required',
          'valid': true,
          'uid': 'year-23b8fc82-ba2b-0e88-4602-ddca3b8b27fb'
        },
        {
          'section': 'relationships',
          'subsection': 'relatives',
          'code': 'date.year.length',
          'valid': true,
          'uid': 'year-23b8fc82-ba2b-0e88-4602-ddca3b8b27fb'
        },
        {
          'section': 'relationships',
          'subsection': 'relatives',
          'code': 'date.year.pattern',
          'valid': true,
          'uid': 'year-23b8fc82-ba2b-0e88-4602-ddca3b8b27fb'
        },
        {
          'section': 'relationships',
          'subsection': 'relatives',
          'code': 'date.year.min',
          'valid': true,
          'uid': 'year-9e28379b-b146-3de2-90b4-6b241c50e37b'
        },
        {
          'section': 'relationships',
          'subsection': 'relatives',
          'code': 'date.year.max',
          'valid': true,
          'uid': 'year-9e28379b-b146-3de2-90b4-6b241c50e37b'
        },
        {
          'section': 'relationships',
          'subsection': 'relatives',
          'code': 'date.month.required',
          'valid': true,
          'uid': 'month-59de1260-57b0-d15d-7a12-9da5165b13c2'
        },
        {
          'section': 'relationships',
          'subsection': 'relatives',
          'code': 'date.month.length',
          'valid': true,
          'uid': 'month-59de1260-57b0-d15d-7a12-9da5165b13c2'
        },
        {
          'section': 'relationships',
          'subsection': 'relatives',
          'code': 'date.month.pattern',
          'valid': true,
          'uid': 'month-59de1260-57b0-d15d-7a12-9da5165b13c2'
        },
        {
          'section': 'relationships',
          'subsection': 'relatives',
          'code': 'date.month.min',
          'valid': true,
          'uid': 'month-c7bba9e1-5592-85e2-5780-53a7b3ef85e4'
        },
        {
          'section': 'relationships',
          'subsection': 'relatives',
          'code': 'date.month.max',
          'valid': true,
          'uid': 'month-c7bba9e1-5592-85e2-5780-53a7b3ef85e4'
        },
        {
          'section': 'relationships',
          'subsection': 'relatives',
          'code': 'date.required',
          'valid': true,
          'uid': 'Birthdate-49541582-371d-1b3a-5c36-ccd7fab007e6'
        },
        {
          'section': 'relationships',
          'subsection': 'relatives',
          'code': 'date.max',
          'valid': true,
          'uid': 'Birthdate-49541582-371d-1b3a-5c36-ccd7fab007e6'
        },
        {
          'section': 'relationships',
          'subsection': 'relatives',
          'code': 'date.min',
          'valid': true,
          'uid': 'Birthdate-49541582-371d-1b3a-5c36-ccd7fab007e6'
        },
        {
          'section': 'relationships',
          'subsection': 'relatives',
          'code': 'date.day.required',
          'valid': true,
          'uid': 'day-adbfafce-e726-37a7-57f8-ee7a912be8d9'
        },
        {
          'section': 'relationships',
          'subsection': 'relatives',
          'code': 'date.day.length',
          'valid': true,
          'uid': 'day-adbfafce-e726-37a7-57f8-ee7a912be8d9'
        },
        {
          'section': 'relationships',
          'subsection': 'relatives',
          'code': 'date.day.pattern',
          'valid': true,
          'uid': 'day-adbfafce-e726-37a7-57f8-ee7a912be8d9'
        },
        {
          'section': 'relationships',
          'subsection': 'relatives',
          'code': 'date.day.min',
          'valid': true,
          'uid': 'day-c38164fd-5455-86d3-57bc-3931bdc71481'
        },
        {
          'section': 'relationships',
          'subsection': 'relatives',
          'code': 'date.day.max',
          'valid': true,
          'uid': 'day-c38164fd-5455-86d3-57bc-3931bdc71481'
        },
        {
          'section': 'relationships',
          'subsection': 'relatives',
          'code': 'date.year.required',
          'valid': true,
          'uid': 'year-b6feb6cb-6540-38b1-1004-16a4a1cd2011'
        },
        {
          'section': 'relationships',
          'subsection': 'relatives',
          'code': 'date.year.length',
          'valid': true,
          'uid': 'year-b6feb6cb-6540-38b1-1004-16a4a1cd2011'
        },
        {
          'section': 'relationships',
          'subsection': 'relatives',
          'code': 'date.year.pattern',
          'valid': true,
          'uid': 'year-b6feb6cb-6540-38b1-1004-16a4a1cd2011'
        },
        {
          'section': 'relationships',
          'subsection': 'relatives',
          'code': 'date.year.min',
          'valid': true,
          'uid': 'year-5a945ef5-bd02-a9a1-6b79-68496ba25571'
        },
        {
          'section': 'relationships',
          'subsection': 'relatives',
          'code': 'date.year.max',
          'valid': true,
          'uid': 'year-5a945ef5-bd02-a9a1-6b79-68496ba25571'
        },
        {
          'section': 'relationships',
          'subsection': 'relatives',
          'code': 'date.month.required',
          'valid': true,
          'uid': 'month-774df5b1-424e-ec84-87ca-d20ad41287ea'
        },
        {
          'section': 'relationships',
          'subsection': 'relatives',
          'code': 'date.month.length',
          'valid': null,
          'uid': 'month-774df5b1-424e-ec84-87ca-d20ad41287ea'
        },
        {
          'section': 'relationships',
          'subsection': 'relatives',
          'code': 'date.month.pattern',
          'valid': null,
          'uid': 'month-774df5b1-424e-ec84-87ca-d20ad41287ea'
        },
        {
          'section': 'relationships',
          'subsection': 'relatives',
          'code': 'date.month.min',
          'valid': null,
          'uid': 'month-0effb788-fe0a-7cec-bece-2cc54132ef07'
        },
        {
          'section': 'relationships',
          'subsection': 'relatives',
          'code': 'date.month.max',
          'valid': null,
          'uid': 'month-0effb788-fe0a-7cec-bece-2cc54132ef07'
        },
        {
          'section': 'relationships',
          'subsection': 'relatives',
          'code': 'date.required',
          'valid': true,
          'uid': 'Expiration-6d0f77ca-d24f-4959-9331-318ff1413a91'
        },
        {
          'section': 'relationships',
          'subsection': 'relatives',
          'code': 'date.max',
          'valid': null,
          'uid': 'Expiration-6d0f77ca-d24f-4959-9331-318ff1413a91'
        },
        {
          'section': 'relationships',
          'subsection': 'relatives',
          'code': 'date.min',
          'valid': null,
          'uid': 'Expiration-6d0f77ca-d24f-4959-9331-318ff1413a91'
        },
        {
          'section': 'relationships',
          'subsection': 'relatives',
          'code': 'date.day.required',
          'valid': true,
          'uid': 'day-d95b0ce7-2d8a-896f-09f9-5d196c1df19a'
        },
        {
          'section': 'relationships',
          'subsection': 'relatives',
          'code': 'date.day.length',
          'valid': null,
          'uid': 'day-d95b0ce7-2d8a-896f-09f9-5d196c1df19a'
        },
        {
          'section': 'relationships',
          'subsection': 'relatives',
          'code': 'date.day.pattern',
          'valid': null,
          'uid': 'day-d95b0ce7-2d8a-896f-09f9-5d196c1df19a'
        },
        {
          'section': 'relationships',
          'subsection': 'relatives',
          'code': 'date.day.min',
          'valid': null,
          'uid': 'day-57eb897c-d163-33bd-b023-baff47be466f'
        },
        {
          'section': 'relationships',
          'subsection': 'relatives',
          'code': 'date.day.max',
          'valid': null,
          'uid': 'day-57eb897c-d163-33bd-b023-baff47be466f'
        },
        {
          'section': 'relationships',
          'subsection': 'relatives',
          'code': 'date.year.required',
          'valid': true,
          'uid': 'year-44beff77-3747-d307-d28c-2344672071c4'
        },
        {
          'section': 'relationships',
          'subsection': 'relatives',
          'code': 'date.year.length',
          'valid': null,
          'uid': 'year-44beff77-3747-d307-d28c-2344672071c4'
        },
        {
          'section': 'relationships',
          'subsection': 'relatives',
          'code': 'date.year.pattern',
          'valid': null,
          'uid': 'year-44beff77-3747-d307-d28c-2344672071c4'
        },
        {
          'section': 'relationships',
          'subsection': 'relatives',
          'code': 'date.year.min',
          'valid': null,
          'uid': 'year-d6afc1ba-c40e-3b68-132b-23bb1d14f89c'
        },
        {
          'section': 'relationships',
          'subsection': 'relatives',
          'code': 'date.year.max',
          'valid': null,
          'uid': 'year-d6afc1ba-c40e-3b68-132b-23bb1d14f89c'
        },
        {
          'section': 'relationships',
          'subsection': 'people',
          'code': 'name.required',
          'valid': true,
          'uid': 'Name-f7b2a60e-cd01-9d15-df67-c9192ac4195a'
        },
        {
          'section': 'relationships',
          'subsection': 'people',
          'code': 'required',
          'valid': true,
          'uid': 'Rank-aa5d5717-276e-c46e-b1c2-bc60266f9a1b'
        },
        {
          'section': 'relationships',
          'subsection': 'people',
          'code': 'length',
          'valid': null,
          'uid': 'Rank-aa5d5717-276e-c46e-b1c2-bc60266f9a1b'
        },
        {
          'section': 'relationships',
          'subsection': 'people',
          'code': 'pattern',
          'valid': null,
          'uid': 'Rank-aa5d5717-276e-c46e-b1c2-bc60266f9a1b'
        },
        {
          'section': 'relationships',
          'subsection': 'people',
          'code': 'required',
          'valid': true,
          'uid': 'undefined-3f2b95de-f522-6707-f118-ac3230c4a052'
        },
        {
          'section': 'relationships',
          'subsection': 'people',
          'code': 'telephone.domestic.first.required',
          'valid': true,
          'uid': 'domestic_first-e149b695-0a6e-dd26-23bd-64786ca2c925'
        },
        {
          'section': 'relationships',
          'subsection': 'people',
          'code': 'telephone.domestic.first.length',
          'valid': true,
          'uid': 'domestic_first-e149b695-0a6e-dd26-23bd-64786ca2c925'
        },
        {
          'section': 'relationships',
          'subsection': 'people',
          'code': 'telephone.domestic.first.pattern',
          'valid': true,
          'uid': 'domestic_first-e149b695-0a6e-dd26-23bd-64786ca2c925'
        },
        {
          'section': 'relationships',
          'subsection': 'people',
          'code': 'telephone.required',
          'valid': true,
          'uid': 'MobileTelephone-f7325323-361a-03ac-afa8-b05394a66cd4'
        },
        {
          'section': 'relationships',
          'subsection': 'people',
          'code': 'telephone.domestic.second.required',
          'valid': true,
          'uid': 'domestic_second-1ab2b380-53a4-46e4-9189-060f22f5012f'
        },
        {
          'section': 'relationships',
          'subsection': 'people',
          'code': 'telephone.domestic.second.length',
          'valid': true,
          'uid': 'domestic_second-1ab2b380-53a4-46e4-9189-060f22f5012f'
        },
        {
          'section': 'relationships',
          'subsection': 'people',
          'code': 'telephone.domestic.second.pattern',
          'valid': true,
          'uid': 'domestic_second-1ab2b380-53a4-46e4-9189-060f22f5012f'
        },
        {
          'section': 'relationships',
          'subsection': 'people',
          'code': 'telephone.domestic.third.required',
          'valid': true,
          'uid': 'domestic_third-2ef0dfc7-eea5-828c-1aaf-035e708cdb58'
        },
        {
          'section': 'relationships',
          'subsection': 'people',
          'code': 'telephone.domestic.third.length',
          'valid': true,
          'uid': 'domestic_third-2ef0dfc7-eea5-828c-1aaf-035e708cdb58'
        },
        {
          'section': 'relationships',
          'subsection': 'people',
          'code': 'telephone.domestic.third.pattern',
          'valid': true,
          'uid': 'domestic_third-2ef0dfc7-eea5-828c-1aaf-035e708cdb58'
        },
        {
          'section': 'relationships',
          'subsection': 'people',
          'code': 'telephone.domestic.extension.required',
          'valid': true,
          'uid': 'domestic_extension-06db7c75-8011-00dc-8f12-26dd3f5f958d'
        },
        {
          'section': 'relationships',
          'subsection': 'people',
          'code': 'telephone.domestic.extension.length',
          'valid': null,
          'uid': 'domestic_extension-06db7c75-8011-00dc-8f12-26dd3f5f958d'
        },
        {
          'section': 'relationships',
          'subsection': 'people',
          'code': 'telephone.domestic.extension.pattern',
          'valid': null,
          'uid': 'domestic_extension-06db7c75-8011-00dc-8f12-26dd3f5f958d'
        },
        {
          'section': 'relationships',
          'subsection': 'people',
          'code': 'telephone.numberType.required',
          'valid': true,
          'uid': 'undefined-529ddaf9-116b-090c-d8b5-a633b902be20'
        },
        {
          'section': 'relationships',
          'subsection': 'people',
          'code': 'telephone.domestic.first.required',
          'valid': true,
          'uid': 'domestic_first-22b1b7d7-25af-78ae-649a-3fa19069cdc8'
        },
        {
          'section': 'relationships',
          'subsection': 'people',
          'code': 'telephone.domestic.first.length',
          'valid': null,
          'uid': 'domestic_first-22b1b7d7-25af-78ae-649a-3fa19069cdc8'
        },
        {
          'section': 'relationships',
          'subsection': 'people',
          'code': 'telephone.domestic.first.pattern',
          'valid': null,
          'uid': 'domestic_first-22b1b7d7-25af-78ae-649a-3fa19069cdc8'
        },
        {
          'section': 'relationships',
          'subsection': 'people',
          'code': 'telephone.required',
          'valid': true,
          'uid': 'OtherTelephone-f0db549b-e0a1-2f54-bebe-bde7699ccbed'
        },
        {
          'section': 'relationships',
          'subsection': 'people',
          'code': 'telephone.domestic.second.required',
          'valid': true,
          'uid': 'domestic_second-a3c92356-b06b-2ee8-761a-abb1844b5a61'
        },
        {
          'section': 'relationships',
          'subsection': 'people',
          'code': 'telephone.domestic.second.length',
          'valid': null,
          'uid': 'domestic_second-a3c92356-b06b-2ee8-761a-abb1844b5a61'
        },
        {
          'section': 'relationships',
          'subsection': 'people',
          'code': 'telephone.domestic.second.pattern',
          'valid': null,
          'uid': 'domestic_second-a3c92356-b06b-2ee8-761a-abb1844b5a61'
        },
        {
          'section': 'relationships',
          'subsection': 'people',
          'code': 'telephone.domestic.third.required',
          'valid': true,
          'uid': 'domestic_third-51c5f8e9-ce03-a879-83b5-470b6fac9864'
        },
        {
          'section': 'relationships',
          'subsection': 'people',
          'code': 'telephone.domestic.third.length',
          'valid': null,
          'uid': 'domestic_third-51c5f8e9-ce03-a879-83b5-470b6fac9864'
        },
        {
          'section': 'relationships',
          'subsection': 'people',
          'code': 'telephone.domestic.third.pattern',
          'valid': null,
          'uid': 'domestic_third-51c5f8e9-ce03-a879-83b5-470b6fac9864'
        },
        {
          'section': 'relationships',
          'subsection': 'people',
          'code': 'telephone.domestic.extension.required',
          'valid': true,
          'uid': 'domestic_extension-4538dd70-e695-bb5b-b9fb-b32d8882008f'
        },
        {
          'section': 'relationships',
          'subsection': 'people',
          'code': 'telephone.domestic.extension.length',
          'valid': null,
          'uid': 'domestic_extension-4538dd70-e695-bb5b-b9fb-b32d8882008f'
        },
        {
          'section': 'relationships',
          'subsection': 'people',
          'code': 'telephone.domestic.extension.pattern',
          'valid': null,
          'uid': 'domestic_extension-4538dd70-e695-bb5b-b9fb-b32d8882008f'
        },
        {
          'section': 'relationships',
          'subsection': 'people',
          'code': 'telephone.numberType.required',
          'valid': true,
          'uid': 'undefined-16891877-f04f-1ceb-a44e-203b05027b45'
        },
        {
          'section': 'relationships',
          'subsection': 'people',
          'code': 'email.required',
          'valid': true,
          'uid': 'Email-8ce53864-873c-1a20-d2bc-a4ce723e30c7'
        },
        {
          'section': 'relationships',
          'subsection': 'people',
          'code': 'email.length',
          'valid': true,
          'uid': 'Email-8ce53864-873c-1a20-d2bc-a4ce723e30c7'
        },
        {
          'section': 'relationships',
          'subsection': 'people',
          'code': 'email.pattern',
          'valid': true,
          'uid': 'Email-8ce53864-873c-1a20-d2bc-a4ce723e30c7'
        },
        {
          'section': 'relationships',
          'subsection': 'people',
          'code': 'location.address.street.required',
          'valid': true,
          'uid': 'address-a4f53346-63e7-a7f1-de88-6d93cebd9885'
        },
        {
          'section': 'relationships',
          'subsection': 'people',
          'code': 'location.address.street.length',
          'valid': true,
          'uid': 'address-a4f53346-63e7-a7f1-de88-6d93cebd9885'
        },
        {
          'section': 'relationships',
          'subsection': 'people',
          'code': 'location.address.street.pattern',
          'valid': true,
          'uid': 'address-a4f53346-63e7-a7f1-de88-6d93cebd9885'
        },
        {
          'section': 'relationships',
          'subsection': 'people',
          'code': 'location.address.required',
          'valid': true,
          'uid': 'Address-a07bd69d-1269-d9ae-6169-62ae323ac382'
        },
        {
          'section': 'relationships',
          'subsection': 'people',
          'code': 'location.address.street.required',
          'valid': true,
          'uid': 'street2-0df8537f-7c2a-caa1-2bb9-c5232dd38a0c'
        },
        {
          'section': 'relationships',
          'subsection': 'people',
          'code': 'location.address.street.length',
          'valid': null,
          'uid': 'street2-0df8537f-7c2a-caa1-2bb9-c5232dd38a0c'
        },
        {
          'section': 'relationships',
          'subsection': 'people',
          'code': 'location.address.street.pattern',
          'valid': null,
          'uid': 'street2-0df8537f-7c2a-caa1-2bb9-c5232dd38a0c'
        },
        {
          'section': 'relationships',
          'subsection': 'people',
          'code': 'location.address.city.required',
          'valid': true,
          'uid': 'city-77547748-5423-f276-9497-cb1a5b01e921'
        },
        {
          'section': 'relationships',
          'subsection': 'people',
          'code': 'location.address.city.length',
          'valid': true,
          'uid': 'city-77547748-5423-f276-9497-cb1a5b01e921'
        },
        {
          'section': 'relationships',
          'subsection': 'people',
          'code': 'location.address.city.pattern',
          'valid': true,
          'uid': 'city-77547748-5423-f276-9497-cb1a5b01e921'
        },
        {
          'section': 'relationships',
          'subsection': 'people',
          'code': 'location.address.zipcode.required',
          'valid': true,
          'uid': 'zipcode-ba5a61e2-cfa9-4107-e0ac-cd3e0a9d84af'
        },
        {
          'section': 'relationships',
          'subsection': 'people',
          'code': 'location.address.zipcode.length',
          'valid': true,
          'uid': 'zipcode-ba5a61e2-cfa9-4107-e0ac-cd3e0a9d84af'
        },
        {
          'section': 'relationships',
          'subsection': 'people',
          'code': 'location.address.zipcode.pattern',
          'valid': true,
          'uid': 'zipcode-ba5a61e2-cfa9-4107-e0ac-cd3e0a9d84af'
        },
        {
          'section': 'relationships',
          'subsection': 'people',
          'code': 'name.required',
          'valid': true,
          'uid': 'Name-4073d5a3-adc0-c9be-665a-006bfa47d319'
        },
        {
          'section': 'relationships',
          'subsection': 'people',
          'code': 'required',
          'valid': true,
          'uid': 'Rank-4338dd7e-0e1e-a3da-e140-e0bb6bafb437'
        },
        {
          'section': 'relationships',
          'subsection': 'people',
          'code': 'length',
          'valid': null,
          'uid': 'Rank-4338dd7e-0e1e-a3da-e140-e0bb6bafb437'
        },
        {
          'section': 'relationships',
          'subsection': 'people',
          'code': 'pattern',
          'valid': null,
          'uid': 'Rank-4338dd7e-0e1e-a3da-e140-e0bb6bafb437'
        },
        {
          'section': 'relationships',
          'subsection': 'people',
          'code': 'required',
          'valid': true,
          'uid': 'undefined-f4edbad9-6f6e-8b83-ce7f-f1262b8b1630'
        },
        {
          'section': 'relationships',
          'subsection': 'people',
          'code': 'telephone.domestic.first.required',
          'valid': true,
          'uid': 'domestic_first-14718a09-0834-4115-becc-8b7699df8f3b'
        },
        {
          'section': 'relationships',
          'subsection': 'people',
          'code': 'telephone.domestic.first.length',
          'valid': null,
          'uid': 'domestic_first-14718a09-0834-4115-becc-8b7699df8f3b'
        },
        {
          'section': 'relationships',
          'subsection': 'people',
          'code': 'telephone.domestic.first.pattern',
          'valid': null,
          'uid': 'domestic_first-14718a09-0834-4115-becc-8b7699df8f3b'
        },
        {
          'section': 'relationships',
          'subsection': 'people',
          'code': 'telephone.required',
          'valid': true,
          'uid': 'MobileTelephone-6a526054-61d4-79fb-48ae-cb2d12b31f85'
        },
        {
          'section': 'relationships',
          'subsection': 'people',
          'code': 'telephone.domestic.second.required',
          'valid': true,
          'uid': 'domestic_second-0a257ec9-06fa-43b1-811d-84377cf5b150'
        },
        {
          'section': 'relationships',
          'subsection': 'people',
          'code': 'telephone.domestic.second.length',
          'valid': null,
          'uid': 'domestic_second-0a257ec9-06fa-43b1-811d-84377cf5b150'
        },
        {
          'section': 'relationships',
          'subsection': 'people',
          'code': 'telephone.domestic.second.pattern',
          'valid': null,
          'uid': 'domestic_second-0a257ec9-06fa-43b1-811d-84377cf5b150'
        },
        {
          'section': 'relationships',
          'subsection': 'people',
          'code': 'telephone.domestic.third.required',
          'valid': true,
          'uid': 'domestic_third-40f4978a-6114-a4b4-2c85-ab4a918b92a0'
        },
        {
          'section': 'relationships',
          'subsection': 'people',
          'code': 'telephone.domestic.third.length',
          'valid': null,
          'uid': 'domestic_third-40f4978a-6114-a4b4-2c85-ab4a918b92a0'
        },
        {
          'section': 'relationships',
          'subsection': 'people',
          'code': 'telephone.domestic.third.pattern',
          'valid': null,
          'uid': 'domestic_third-40f4978a-6114-a4b4-2c85-ab4a918b92a0'
        },
        {
          'section': 'relationships',
          'subsection': 'people',
          'code': 'telephone.domestic.extension.required',
          'valid': true,
          'uid': 'domestic_extension-9dbec72a-5548-696d-0faa-58e50ee50ffb'
        },
        {
          'section': 'relationships',
          'subsection': 'people',
          'code': 'telephone.domestic.extension.length',
          'valid': null,
          'uid': 'domestic_extension-9dbec72a-5548-696d-0faa-58e50ee50ffb'
        },
        {
          'section': 'relationships',
          'subsection': 'people',
          'code': 'telephone.domestic.extension.pattern',
          'valid': null,
          'uid': 'domestic_extension-9dbec72a-5548-696d-0faa-58e50ee50ffb'
        },
        {
          'section': 'relationships',
          'subsection': 'people',
          'code': 'telephone.numberType.required',
          'valid': true,
          'uid': 'undefined-70a7fa76-3295-1111-c02a-3b50ea2c15c7'
        },
        {
          'section': 'relationships',
          'subsection': 'people',
          'code': 'telephone.domestic.first.required',
          'valid': true,
          'uid': 'domestic_first-76301193-e32c-e706-b7db-4a92d7c666de'
        },
        {
          'section': 'relationships',
          'subsection': 'people',
          'code': 'telephone.domestic.first.length',
          'valid': null,
          'uid': 'domestic_first-76301193-e32c-e706-b7db-4a92d7c666de'
        },
        {
          'section': 'relationships',
          'subsection': 'people',
          'code': 'telephone.domestic.first.pattern',
          'valid': null,
          'uid': 'domestic_first-76301193-e32c-e706-b7db-4a92d7c666de'
        },
        {
          'section': 'relationships',
          'subsection': 'people',
          'code': 'telephone.required',
          'valid': true,
          'uid': 'OtherTelephone-578d75a5-5292-ad5c-8ead-8fc76b05c106'
        },
        {
          'section': 'relationships',
          'subsection': 'people',
          'code': 'telephone.domestic.second.required',
          'valid': true,
          'uid': 'domestic_second-1e06c7e8-35cc-eb68-204b-9e4ebe98d48a'
        },
        {
          'section': 'relationships',
          'subsection': 'people',
          'code': 'telephone.domestic.second.length',
          'valid': null,
          'uid': 'domestic_second-1e06c7e8-35cc-eb68-204b-9e4ebe98d48a'
        },
        {
          'section': 'relationships',
          'subsection': 'people',
          'code': 'telephone.domestic.second.pattern',
          'valid': null,
          'uid': 'domestic_second-1e06c7e8-35cc-eb68-204b-9e4ebe98d48a'
        },
        {
          'section': 'relationships',
          'subsection': 'people',
          'code': 'telephone.domestic.third.required',
          'valid': true,
          'uid': 'domestic_third-e3cdca0c-dbd9-6ddb-df50-6295486ad3fb'
        },
        {
          'section': 'relationships',
          'subsection': 'people',
          'code': 'telephone.domestic.third.length',
          'valid': null,
          'uid': 'domestic_third-e3cdca0c-dbd9-6ddb-df50-6295486ad3fb'
        },
        {
          'section': 'relationships',
          'subsection': 'people',
          'code': 'telephone.domestic.third.pattern',
          'valid': null,
          'uid': 'domestic_third-e3cdca0c-dbd9-6ddb-df50-6295486ad3fb'
        },
        {
          'section': 'relationships',
          'subsection': 'people',
          'code': 'telephone.domestic.extension.required',
          'valid': true,
          'uid': 'domestic_extension-4467c4e6-c6b8-62fc-a7d8-b6d3598b8f7b'
        },
        {
          'section': 'relationships',
          'subsection': 'people',
          'code': 'telephone.domestic.extension.length',
          'valid': null,
          'uid': 'domestic_extension-4467c4e6-c6b8-62fc-a7d8-b6d3598b8f7b'
        },
        {
          'section': 'relationships',
          'subsection': 'people',
          'code': 'telephone.domestic.extension.pattern',
          'valid': null,
          'uid': 'domestic_extension-4467c4e6-c6b8-62fc-a7d8-b6d3598b8f7b'
        },
        {
          'section': 'relationships',
          'subsection': 'people',
          'code': 'telephone.numberType.required',
          'valid': true,
          'uid': 'undefined-478b65ef-5481-ddb8-3ebd-a58fe0b2c99f'
        },
        {
          'section': 'relationships',
          'subsection': 'people',
          'code': 'email.required',
          'valid': true,
          'uid': 'Email-8e9b6c50-8351-c9c0-a017-d8e548290831'
        },
        {
          'section': 'relationships',
          'subsection': 'people',
          'code': 'email.length',
          'valid': null,
          'uid': 'Email-8e9b6c50-8351-c9c0-a017-d8e548290831'
        },
        {
          'section': 'relationships',
          'subsection': 'people',
          'code': 'email.pattern',
          'valid': null,
          'uid': 'Email-8e9b6c50-8351-c9c0-a017-d8e548290831'
        },
        {
          'section': 'relationships',
          'subsection': 'people',
          'code': 'location.address.street.required',
          'valid': true,
          'uid': 'address-59892f28-173e-525b-db35-1c0243a8e6a7'
        },
        {
          'section': 'relationships',
          'subsection': 'people',
          'code': 'location.address.street.length',
          'valid': true,
          'uid': 'address-59892f28-173e-525b-db35-1c0243a8e6a7'
        },
        {
          'section': 'relationships',
          'subsection': 'people',
          'code': 'location.address.street.pattern',
          'valid': true,
          'uid': 'address-59892f28-173e-525b-db35-1c0243a8e6a7'
        },
        {
          'section': 'relationships',
          'subsection': 'people',
          'code': 'location.address.required',
          'valid': true,
          'uid': 'Address-9c6d7284-faaf-a260-a26b-328d8a6d1ced'
        },
        {
          'section': 'relationships',
          'subsection': 'people',
          'code': 'location.address.street.required',
          'valid': true,
          'uid': 'street2-02496521-606c-e385-d552-cddf1d6c8e82'
        },
        {
          'section': 'relationships',
          'subsection': 'people',
          'code': 'location.address.street.length',
          'valid': null,
          'uid': 'street2-02496521-606c-e385-d552-cddf1d6c8e82'
        },
        {
          'section': 'relationships',
          'subsection': 'people',
          'code': 'location.address.street.pattern',
          'valid': null,
          'uid': 'street2-02496521-606c-e385-d552-cddf1d6c8e82'
        },
        {
          'section': 'relationships',
          'subsection': 'people',
          'code': 'location.address.city.required',
          'valid': true,
          'uid': 'city-35eba232-be81-1c30-608e-5feeb01c4e48'
        },
        {
          'section': 'relationships',
          'subsection': 'people',
          'code': 'location.address.city.length',
          'valid': true,
          'uid': 'city-35eba232-be81-1c30-608e-5feeb01c4e48'
        },
        {
          'section': 'relationships',
          'subsection': 'people',
          'code': 'location.address.city.pattern',
          'valid': true,
          'uid': 'city-35eba232-be81-1c30-608e-5feeb01c4e48'
        },
        {
          'section': 'relationships',
          'subsection': 'people',
          'code': 'location.address.zipcode.required',
          'valid': true,
          'uid': 'zipcode-04713797-0b46-7439-51f0-dc6f68da9032'
        },
        {
          'section': 'relationships',
          'subsection': 'people',
          'code': 'location.address.zipcode.length',
          'valid': true,
          'uid': 'zipcode-04713797-0b46-7439-51f0-dc6f68da9032'
        },
        {
          'section': 'relationships',
          'subsection': 'people',
          'code': 'location.address.zipcode.pattern',
          'valid': true,
          'uid': 'zipcode-04713797-0b46-7439-51f0-dc6f68da9032'
        },
        {
          'section': 'relationships',
          'subsection': 'people',
          'code': 'name.required',
          'valid': true,
          'uid': 'Name-040b8558-7fb6-8be3-cc94-8b9d6212d83d'
        },
        {
          'section': 'relationships',
          'subsection': 'people',
          'code': 'required',
          'valid': true,
          'uid': 'Rank-e5a173c0-d01b-3786-09c3-ebc2b2e80a77'
        },
        {
          'section': 'relationships',
          'subsection': 'people',
          'code': 'length',
          'valid': null,
          'uid': 'Rank-e5a173c0-d01b-3786-09c3-ebc2b2e80a77'
        },
        {
          'section': 'relationships',
          'subsection': 'people',
          'code': 'pattern',
          'valid': null,
          'uid': 'Rank-e5a173c0-d01b-3786-09c3-ebc2b2e80a77'
        },
        {
          'section': 'relationships',
          'subsection': 'people',
          'code': 'required',
          'valid': true,
          'uid': 'undefined-48582701-0a08-d9ca-f58b-c09b71588052'
        },
        {
          'section': 'relationships',
          'subsection': 'people',
          'code': 'telephone.domestic.first.required',
          'valid': true,
          'uid': 'domestic_first-d7425a05-a717-c9e2-d341-041aa85317e3'
        },
        {
          'section': 'relationships',
          'subsection': 'people',
          'code': 'telephone.domestic.first.length',
          'valid': null,
          'uid': 'domestic_first-d7425a05-a717-c9e2-d341-041aa85317e3'
        },
        {
          'section': 'relationships',
          'subsection': 'people',
          'code': 'telephone.domestic.first.pattern',
          'valid': null,
          'uid': 'domestic_first-d7425a05-a717-c9e2-d341-041aa85317e3'
        },
        {
          'section': 'relationships',
          'subsection': 'people',
          'code': 'telephone.required',
          'valid': true,
          'uid': 'MobileTelephone-45ba771e-f65f-b955-e81b-0bea72907538'
        },
        {
          'section': 'relationships',
          'subsection': 'people',
          'code': 'telephone.domestic.second.required',
          'valid': true,
          'uid': 'domestic_second-0c6e2eb7-4134-c0bc-502b-e27940b569ec'
        },
        {
          'section': 'relationships',
          'subsection': 'people',
          'code': 'telephone.domestic.second.length',
          'valid': null,
          'uid': 'domestic_second-0c6e2eb7-4134-c0bc-502b-e27940b569ec'
        },
        {
          'section': 'relationships',
          'subsection': 'people',
          'code': 'telephone.domestic.second.pattern',
          'valid': null,
          'uid': 'domestic_second-0c6e2eb7-4134-c0bc-502b-e27940b569ec'
        },
        {
          'section': 'relationships',
          'subsection': 'people',
          'code': 'telephone.domestic.third.required',
          'valid': true,
          'uid': 'domestic_third-466ee312-8eb8-9b34-e6a0-42c9db8a416c'
        },
        {
          'section': 'relationships',
          'subsection': 'people',
          'code': 'telephone.domestic.third.length',
          'valid': null,
          'uid': 'domestic_third-466ee312-8eb8-9b34-e6a0-42c9db8a416c'
        },
        {
          'section': 'relationships',
          'subsection': 'people',
          'code': 'telephone.domestic.third.pattern',
          'valid': null,
          'uid': 'domestic_third-466ee312-8eb8-9b34-e6a0-42c9db8a416c'
        },
        {
          'section': 'relationships',
          'subsection': 'people',
          'code': 'telephone.domestic.extension.required',
          'valid': true,
          'uid': 'domestic_extension-eeb0b2b4-3d01-d666-2474-c60f0052a400'
        },
        {
          'section': 'relationships',
          'subsection': 'people',
          'code': 'telephone.domestic.extension.length',
          'valid': null,
          'uid': 'domestic_extension-eeb0b2b4-3d01-d666-2474-c60f0052a400'
        },
        {
          'section': 'relationships',
          'subsection': 'people',
          'code': 'telephone.domestic.extension.pattern',
          'valid': null,
          'uid': 'domestic_extension-eeb0b2b4-3d01-d666-2474-c60f0052a400'
        },
        {
          'section': 'relationships',
          'subsection': 'people',
          'code': 'telephone.numberType.required',
          'valid': true,
          'uid': 'undefined-c5b50106-56c0-830e-881c-a3779904a7fe'
        },
        {
          'section': 'relationships',
          'subsection': 'people',
          'code': 'telephone.domestic.first.required',
          'valid': true,
          'uid': 'domestic_first-54f8a45a-9714-f0f0-cc3a-983de8880f07'
        },
        {
          'section': 'relationships',
          'subsection': 'people',
          'code': 'telephone.domestic.first.length',
          'valid': null,
          'uid': 'domestic_first-54f8a45a-9714-f0f0-cc3a-983de8880f07'
        },
        {
          'section': 'relationships',
          'subsection': 'people',
          'code': 'telephone.domestic.first.pattern',
          'valid': null,
          'uid': 'domestic_first-54f8a45a-9714-f0f0-cc3a-983de8880f07'
        },
        {
          'section': 'relationships',
          'subsection': 'people',
          'code': 'telephone.required',
          'valid': true,
          'uid': 'OtherTelephone-a0636fca-85dc-351e-ae89-b228a7378d84'
        },
        {
          'section': 'relationships',
          'subsection': 'people',
          'code': 'telephone.domestic.second.required',
          'valid': true,
          'uid': 'domestic_second-73365a32-86e8-378c-4216-172fc8afb50b'
        },
        {
          'section': 'relationships',
          'subsection': 'people',
          'code': 'telephone.domestic.second.length',
          'valid': null,
          'uid': 'domestic_second-73365a32-86e8-378c-4216-172fc8afb50b'
        },
        {
          'section': 'relationships',
          'subsection': 'people',
          'code': 'telephone.domestic.second.pattern',
          'valid': null,
          'uid': 'domestic_second-73365a32-86e8-378c-4216-172fc8afb50b'
        },
        {
          'section': 'relationships',
          'subsection': 'people',
          'code': 'telephone.domestic.third.required',
          'valid': true,
          'uid': 'domestic_third-f994d7f7-fd98-054c-6863-002ec6207c34'
        },
        {
          'section': 'relationships',
          'subsection': 'people',
          'code': 'telephone.domestic.third.length',
          'valid': null,
          'uid': 'domestic_third-f994d7f7-fd98-054c-6863-002ec6207c34'
        },
        {
          'section': 'relationships',
          'subsection': 'people',
          'code': 'telephone.domestic.third.pattern',
          'valid': null,
          'uid': 'domestic_third-f994d7f7-fd98-054c-6863-002ec6207c34'
        },
        {
          'section': 'relationships',
          'subsection': 'people',
          'code': 'telephone.domestic.extension.required',
          'valid': true,
          'uid': 'domestic_extension-a5683f71-685e-e325-5011-85d29062628c'
        },
        {
          'section': 'relationships',
          'subsection': 'people',
          'code': 'telephone.domestic.extension.length',
          'valid': null,
          'uid': 'domestic_extension-a5683f71-685e-e325-5011-85d29062628c'
        },
        {
          'section': 'relationships',
          'subsection': 'people',
          'code': 'telephone.domestic.extension.pattern',
          'valid': null,
          'uid': 'domestic_extension-a5683f71-685e-e325-5011-85d29062628c'
        },
        {
          'section': 'relationships',
          'subsection': 'people',
          'code': 'telephone.numberType.required',
          'valid': true,
          'uid': 'undefined-39e39229-95d6-a6a1-10fa-7e346009ea46'
        },
        {
          'section': 'relationships',
          'subsection': 'people',
          'code': 'email.required',
          'valid': true,
          'uid': 'Email-a0dee195-8751-a162-23c9-97acb0f3b2d2'
        },
        {
          'section': 'relationships',
          'subsection': 'people',
          'code': 'email.length',
          'valid': null,
          'uid': 'Email-a0dee195-8751-a162-23c9-97acb0f3b2d2'
        },
        {
          'section': 'relationships',
          'subsection': 'people',
          'code': 'email.pattern',
          'valid': null,
          'uid': 'Email-a0dee195-8751-a162-23c9-97acb0f3b2d2'
        },
        {
          'section': 'relationships',
          'subsection': 'people',
          'code': 'location.address.street.required',
          'valid': true,
          'uid': 'address-367b38da-0642-1a08-baf9-da8688215a87'
        },
        {
          'section': 'relationships',
          'subsection': 'people',
          'code': 'location.address.street.length',
          'valid': true,
          'uid': 'address-367b38da-0642-1a08-baf9-da8688215a87'
        },
        {
          'section': 'relationships',
          'subsection': 'people',
          'code': 'location.address.street.pattern',
          'valid': true,
          'uid': 'address-367b38da-0642-1a08-baf9-da8688215a87'
        },
        {
          'section': 'relationships',
          'subsection': 'people',
          'code': 'location.address.required',
          'valid': true,
          'uid': 'Address-19299210-6acc-e925-79cb-be033a5788de'
        },
        {
          'section': 'relationships',
          'subsection': 'people',
          'code': 'location.address.street.required',
          'valid': true,
          'uid': 'street2-b3561e3b-958c-c963-6574-096b5d14f063'
        },
        {
          'section': 'relationships',
          'subsection': 'people',
          'code': 'location.address.street.length',
          'valid': null,
          'uid': 'street2-b3561e3b-958c-c963-6574-096b5d14f063'
        },
        {
          'section': 'relationships',
          'subsection': 'people',
          'code': 'location.address.street.pattern',
          'valid': null,
          'uid': 'street2-b3561e3b-958c-c963-6574-096b5d14f063'
        },
        {
          'section': 'relationships',
          'subsection': 'people',
          'code': 'location.address.city.required',
          'valid': true,
          'uid': 'city-ac1d628d-59cf-20fb-dab1-122953713f8e'
        },
        {
          'section': 'relationships',
          'subsection': 'people',
          'code': 'location.address.city.length',
          'valid': true,
          'uid': 'city-ac1d628d-59cf-20fb-dab1-122953713f8e'
        },
        {
          'section': 'relationships',
          'subsection': 'people',
          'code': 'location.address.city.pattern',
          'valid': true,
          'uid': 'city-ac1d628d-59cf-20fb-dab1-122953713f8e'
        },
        {
          'section': 'relationships',
          'subsection': 'people',
          'code': 'location.address.zipcode.required',
          'valid': true,
          'uid': 'zipcode-e2a34d91-d774-7337-613b-ffbd79f60829'
        },
        {
          'section': 'relationships',
          'subsection': 'people',
          'code': 'location.address.zipcode.length',
          'valid': true,
          'uid': 'zipcode-e2a34d91-d774-7337-613b-ffbd79f60829'
        },
        {
          'section': 'relationships',
          'subsection': 'people',
          'code': 'location.address.zipcode.pattern',
          'valid': true,
          'uid': 'zipcode-e2a34d91-d774-7337-613b-ffbd79f60829'
        },
        {
          'section': 'relationships',
          'subsection': 'people',
          'code': 'required',
          'valid': true,
          'uid': 'undefined-3fa4c569-c1cf-7786-3ec6-25a77d22f5c5'
        },
        {
          'section': 'relationships',
          'subsection': 'people',
          'code': 'daterange.required',
          'valid': true,
          'uid': 'Dates-fbfeffc4-acc8-ec24-9fd7-f971cfc1197f'
        },
        {
          'section': 'relationships',
          'subsection': 'people',
          'code': 'daterange.order',
          'valid': true,
          'uid': 'Dates-fbfeffc4-acc8-ec24-9fd7-f971cfc1197f'
        },
        {
          'section': 'relationships',
          'subsection': 'people',
          'code': 'location.address.state.required',
          'valid': true,
          'uid': 'state-41137abd-a074-c45d-f5ce-b10e05edc6f7'
        },
        {
          'section': 'relationships',
          'subsection': 'people',
          'code': 'location.address.state.notfound',
          'valid': true,
          'uid': 'state-41137abd-a074-c45d-f5ce-b10e05edc6f7'
        },
        {
          'section': 'relationships',
          'subsection': 'people',
          'code': 'daterange.required',
          'valid': true,
          'uid': 'Dates-f75e08d1-d82f-52ca-0f3c-962d5d384654'
        },
        {
          'section': 'relationships',
          'subsection': 'people',
          'code': 'daterange.order',
          'valid': true,
          'uid': 'Dates-f75e08d1-d82f-52ca-0f3c-962d5d384654'
        },
        {
          'section': 'relationships',
          'subsection': 'people',
          'code': 'location.address.state.required',
          'valid': true,
          'uid': 'state-b14a795d-2696-2cd6-661a-6b252816c4b4'
        },
        {
          'section': 'relationships',
          'subsection': 'people',
          'code': 'location.address.state.notfound',
          'valid': true,
          'uid': 'state-b14a795d-2696-2cd6-661a-6b252816c4b4'
        },
        {
          'section': 'relationships',
          'subsection': 'people',
          'code': 'daterange.required',
          'valid': true,
          'uid': 'Dates-20c3780c-6931-5175-5c88-43648e303dcf'
        },
        {
          'section': 'relationships',
          'subsection': 'people',
          'code': 'daterange.order',
          'valid': true,
          'uid': 'Dates-20c3780c-6931-5175-5c88-43648e303dcf'
        },
        {
          'section': 'relationships',
          'subsection': 'people',
          'code': 'location.address.state.required',
          'valid': true,
          'uid': 'state-21c22189-b063-b914-c349-1daacafbd8e3'
        },
        {
          'section': 'relationships',
          'subsection': 'people',
          'code': 'location.address.state.notfound',
          'valid': true,
          'uid': 'state-21c22189-b063-b914-c349-1daacafbd8e3'
        },
        {
          'section': 'relationships',
          'subsection': 'people',
          'code': 'daterange.from.month.required',
          'valid': true,
          'uid': 'month-cbf9c797-e20b-f4ff-6fa8-61ca01a5e7ec'
        },
        {
          'section': 'relationships',
          'subsection': 'people',
          'code': 'daterange.from.month.length',
          'valid': true,
          'uid': 'month-cbf9c797-e20b-f4ff-6fa8-61ca01a5e7ec'
        },
        {
          'section': 'relationships',
          'subsection': 'people',
          'code': 'daterange.from.month.pattern',
          'valid': true,
          'uid': 'month-cbf9c797-e20b-f4ff-6fa8-61ca01a5e7ec'
        },
        {
          'section': 'relationships',
          'subsection': 'people',
          'code': 'daterange.from.month.min',
          'valid': true,
          'uid': 'month-6ff8ce31-5cfc-247d-0e97-4be6e7530a66'
        },
        {
          'section': 'relationships',
          'subsection': 'people',
          'code': 'daterange.from.month.max',
          'valid': true,
          'uid': 'month-6ff8ce31-5cfc-247d-0e97-4be6e7530a66'
        },
        {
          'section': 'relationships',
          'subsection': 'people',
          'code': 'daterange.from.required',
          'valid': true,
          'uid': 'from-051f5858-8bae-0d05-54f4-39b7c14f0fd6'
        },
        {
          'section': 'relationships',
          'subsection': 'people',
          'code': 'daterange.from.max',
          'valid': true,
          'uid': 'from-051f5858-8bae-0d05-54f4-39b7c14f0fd6'
        },
        {
          'section': 'relationships',
          'subsection': 'people',
          'code': 'daterange.from.min',
          'valid': true,
          'uid': 'from-051f5858-8bae-0d05-54f4-39b7c14f0fd6'
        },
        {
          'section': 'relationships',
          'subsection': 'people',
          'code': 'daterange.from.day.required',
          'valid': true,
          'uid': 'day-01ebfa60-f705-605a-fd96-9139ce9157d8'
        },
        {
          'section': 'relationships',
          'subsection': 'people',
          'code': 'daterange.from.day.length',
          'valid': true,
          'uid': 'day-01ebfa60-f705-605a-fd96-9139ce9157d8'
        },
        {
          'section': 'relationships',
          'subsection': 'people',
          'code': 'daterange.from.day.pattern',
          'valid': true,
          'uid': 'day-01ebfa60-f705-605a-fd96-9139ce9157d8'
        },
        {
          'section': 'relationships',
          'subsection': 'people',
          'code': 'daterange.from.day.min',
          'valid': true,
          'uid': 'day-1383307e-f10f-d196-eca1-a2cfffbe8750'
        },
        {
          'section': 'relationships',
          'subsection': 'people',
          'code': 'daterange.from.day.max',
          'valid': true,
          'uid': 'day-1383307e-f10f-d196-eca1-a2cfffbe8750'
        },
        {
          'section': 'relationships',
          'subsection': 'people',
          'code': 'daterange.from.year.required',
          'valid': true,
          'uid': 'year-5e441b8d-0080-ac10-663a-b30ef338a704'
        },
        {
          'section': 'relationships',
          'subsection': 'people',
          'code': 'daterange.from.year.length',
          'valid': true,
          'uid': 'year-5e441b8d-0080-ac10-663a-b30ef338a704'
        },
        {
          'section': 'relationships',
          'subsection': 'people',
          'code': 'daterange.from.year.pattern',
          'valid': true,
          'uid': 'year-5e441b8d-0080-ac10-663a-b30ef338a704'
        },
        {
          'section': 'relationships',
          'subsection': 'people',
          'code': 'daterange.from.year.min',
          'valid': true,
          'uid': 'year-8c1a00e7-65cc-edfc-34ca-bc6bf2df07dc'
        },
        {
          'section': 'relationships',
          'subsection': 'people',
          'code': 'daterange.from.year.max',
          'valid': true,
          'uid': 'year-8c1a00e7-65cc-edfc-34ca-bc6bf2df07dc'
        },
        {
          'section': 'relationships',
          'subsection': 'people',
          'code': 'daterange.to.month.required',
          'valid': true,
          'uid': 'month-acade1ba-4066-795c-3eb0-62020a298c2e'
        },
        {
          'section': 'relationships',
          'subsection': 'people',
          'code': 'daterange.to.month.length',
          'valid': true,
          'uid': 'month-acade1ba-4066-795c-3eb0-62020a298c2e'
        },
        {
          'section': 'relationships',
          'subsection': 'people',
          'code': 'daterange.to.month.pattern',
          'valid': true,
          'uid': 'month-acade1ba-4066-795c-3eb0-62020a298c2e'
        },
        {
          'section': 'relationships',
          'subsection': 'people',
          'code': 'daterange.to.month.min',
          'valid': true,
          'uid': 'month-2ecb3e30-d922-6b7a-0e3b-0c5cd6f2f8b2'
        },
        {
          'section': 'relationships',
          'subsection': 'people',
          'code': 'daterange.to.month.max',
          'valid': true,
          'uid': 'month-2ecb3e30-d922-6b7a-0e3b-0c5cd6f2f8b2'
        },
        {
          'section': 'relationships',
          'subsection': 'people',
          'code': 'daterange.to.required',
          'valid': true,
          'uid': 'to-226f31b0-dd14-ee4a-9165-bf68c8850338'
        },
        {
          'section': 'relationships',
          'subsection': 'people',
          'code': 'daterange.to.max',
          'valid': true,
          'uid': 'to-226f31b0-dd14-ee4a-9165-bf68c8850338'
        },
        {
          'section': 'relationships',
          'subsection': 'people',
          'code': 'daterange.to.min',
          'valid': true,
          'uid': 'to-226f31b0-dd14-ee4a-9165-bf68c8850338'
        },
        {
          'section': 'relationships',
          'subsection': 'people',
          'code': 'daterange.to.day.required',
          'valid': true,
          'uid': 'day-41efac35-c3c6-a55d-2049-e293ad96864e'
        },
        {
          'section': 'relationships',
          'subsection': 'people',
          'code': 'daterange.to.day.length',
          'valid': true,
          'uid': 'day-41efac35-c3c6-a55d-2049-e293ad96864e'
        },
        {
          'section': 'relationships',
          'subsection': 'people',
          'code': 'daterange.to.day.pattern',
          'valid': true,
          'uid': 'day-41efac35-c3c6-a55d-2049-e293ad96864e'
        },
        {
          'section': 'relationships',
          'subsection': 'people',
          'code': 'daterange.to.day.min',
          'valid': true,
          'uid': 'day-c58a3c63-b10d-11d5-d64a-ecc25f2c9ad4'
        },
        {
          'section': 'relationships',
          'subsection': 'people',
          'code': 'daterange.to.day.max',
          'valid': true,
          'uid': 'day-c58a3c63-b10d-11d5-d64a-ecc25f2c9ad4'
        },
        {
          'section': 'relationships',
          'subsection': 'people',
          'code': 'daterange.to.year.required',
          'valid': true,
          'uid': 'year-ba31e9ad-a8e7-e5c6-636c-eb9a5ac77aaa'
        },
        {
          'section': 'relationships',
          'subsection': 'people',
          'code': 'daterange.to.year.length',
          'valid': true,
          'uid': 'year-ba31e9ad-a8e7-e5c6-636c-eb9a5ac77aaa'
        },
        {
          'section': 'relationships',
          'subsection': 'people',
          'code': 'daterange.to.year.pattern',
          'valid': true,
          'uid': 'year-ba31e9ad-a8e7-e5c6-636c-eb9a5ac77aaa'
        },
        {
          'section': 'relationships',
          'subsection': 'people',
          'code': 'daterange.to.year.min',
          'valid': true,
          'uid': 'year-deef28ab-0084-4dde-733f-71b447eb447f'
        },
        {
          'section': 'relationships',
          'subsection': 'people',
          'code': 'daterange.to.year.max',
          'valid': true,
          'uid': 'year-deef28ab-0084-4dde-733f-71b447eb447f'
        },
        {
          'section': 'relationships',
          'subsection': 'people',
          'code': 'daterange.from.month.required',
          'valid': true,
          'uid': 'month-72f47126-b561-6545-527e-1914b75601ab'
        },
        {
          'section': 'relationships',
          'subsection': 'people',
          'code': 'daterange.from.month.length',
          'valid': true,
          'uid': 'month-72f47126-b561-6545-527e-1914b75601ab'
        },
        {
          'section': 'relationships',
          'subsection': 'people',
          'code': 'daterange.from.month.pattern',
          'valid': true,
          'uid': 'month-72f47126-b561-6545-527e-1914b75601ab'
        },
        {
          'section': 'relationships',
          'subsection': 'people',
          'code': 'daterange.from.month.min',
          'valid': true,
          'uid': 'month-58b0da48-0acb-6312-b14c-44a8b4855240'
        },
        {
          'section': 'relationships',
          'subsection': 'people',
          'code': 'daterange.from.month.max',
          'valid': true,
          'uid': 'month-58b0da48-0acb-6312-b14c-44a8b4855240'
        },
        {
          'section': 'relationships',
          'subsection': 'people',
          'code': 'daterange.from.required',
          'valid': true,
          'uid': 'from-8f97d1de-ac65-b8c1-1972-7c667faee4cc'
        },
        {
          'section': 'relationships',
          'subsection': 'people',
          'code': 'daterange.from.max',
          'valid': true,
          'uid': 'from-8f97d1de-ac65-b8c1-1972-7c667faee4cc'
        },
        {
          'section': 'relationships',
          'subsection': 'people',
          'code': 'daterange.from.min',
          'valid': true,
          'uid': 'from-8f97d1de-ac65-b8c1-1972-7c667faee4cc'
        },
        {
          'section': 'relationships',
          'subsection': 'people',
          'code': 'daterange.from.day.required',
          'valid': true,
          'uid': 'day-482e8816-e10c-9695-9398-8d9972329347'
        },
        {
          'section': 'relationships',
          'subsection': 'people',
          'code': 'daterange.from.day.length',
          'valid': true,
          'uid': 'day-482e8816-e10c-9695-9398-8d9972329347'
        },
        {
          'section': 'relationships',
          'subsection': 'people',
          'code': 'daterange.from.day.pattern',
          'valid': true,
          'uid': 'day-482e8816-e10c-9695-9398-8d9972329347'
        },
        {
          'section': 'relationships',
          'subsection': 'people',
          'code': 'daterange.from.day.min',
          'valid': true,
          'uid': 'day-167cc7ff-929e-1f4c-e911-bd38aeb89575'
        },
        {
          'section': 'relationships',
          'subsection': 'people',
          'code': 'daterange.from.day.max',
          'valid': true,
          'uid': 'day-167cc7ff-929e-1f4c-e911-bd38aeb89575'
        },
        {
          'section': 'relationships',
          'subsection': 'people',
          'code': 'daterange.from.year.required',
          'valid': true,
          'uid': 'year-701140e2-7619-8fc4-2648-5c76238498e6'
        },
        {
          'section': 'relationships',
          'subsection': 'people',
          'code': 'daterange.from.year.length',
          'valid': true,
          'uid': 'year-701140e2-7619-8fc4-2648-5c76238498e6'
        },
        {
          'section': 'relationships',
          'subsection': 'people',
          'code': 'daterange.from.year.pattern',
          'valid': true,
          'uid': 'year-701140e2-7619-8fc4-2648-5c76238498e6'
        },
        {
          'section': 'relationships',
          'subsection': 'people',
          'code': 'daterange.from.year.min',
          'valid': true,
          'uid': 'year-70791431-7fcd-e37b-25bd-2c9d541566dc'
        },
        {
          'section': 'relationships',
          'subsection': 'people',
          'code': 'daterange.from.year.max',
          'valid': true,
          'uid': 'year-70791431-7fcd-e37b-25bd-2c9d541566dc'
        },
        {
          'section': 'relationships',
          'subsection': 'people',
          'code': 'daterange.to.month.required',
          'valid': true,
          'uid': 'month-981015de-09bf-5717-3e76-a02eed76e761'
        },
        {
          'section': 'relationships',
          'subsection': 'people',
          'code': 'daterange.to.month.length',
          'valid': true,
          'uid': 'month-981015de-09bf-5717-3e76-a02eed76e761'
        },
        {
          'section': 'relationships',
          'subsection': 'people',
          'code': 'daterange.to.month.pattern',
          'valid': true,
          'uid': 'month-981015de-09bf-5717-3e76-a02eed76e761'
        },
        {
          'section': 'relationships',
          'subsection': 'people',
          'code': 'daterange.to.month.min',
          'valid': true,
          'uid': 'month-231fc3f6-8d3d-109e-ef5f-eacbb43f988a'
        },
        {
          'section': 'relationships',
          'subsection': 'people',
          'code': 'daterange.to.month.max',
          'valid': true,
          'uid': 'month-231fc3f6-8d3d-109e-ef5f-eacbb43f988a'
        },
        {
          'section': 'relationships',
          'subsection': 'people',
          'code': 'daterange.to.required',
          'valid': true,
          'uid': 'to-e8474fd3-f24f-1ba5-b9cb-dc0fdb965845'
        },
        {
          'section': 'relationships',
          'subsection': 'people',
          'code': 'daterange.to.max',
          'valid': true,
          'uid': 'to-e8474fd3-f24f-1ba5-b9cb-dc0fdb965845'
        },
        {
          'section': 'relationships',
          'subsection': 'people',
          'code': 'daterange.to.min',
          'valid': true,
          'uid': 'to-e8474fd3-f24f-1ba5-b9cb-dc0fdb965845'
        },
        {
          'section': 'relationships',
          'subsection': 'people',
          'code': 'daterange.to.day.required',
          'valid': true,
          'uid': 'day-d9b393a1-84b7-fc7d-9392-49a58cc4d71c'
        },
        {
          'section': 'relationships',
          'subsection': 'people',
          'code': 'daterange.to.day.length',
          'valid': true,
          'uid': 'day-d9b393a1-84b7-fc7d-9392-49a58cc4d71c'
        },
        {
          'section': 'relationships',
          'subsection': 'people',
          'code': 'daterange.to.day.pattern',
          'valid': true,
          'uid': 'day-d9b393a1-84b7-fc7d-9392-49a58cc4d71c'
        },
        {
          'section': 'relationships',
          'subsection': 'people',
          'code': 'daterange.to.day.min',
          'valid': true,
          'uid': 'day-aeca32c4-5e45-c727-618e-76efa73bbba8'
        },
        {
          'section': 'relationships',
          'subsection': 'people',
          'code': 'daterange.to.day.max',
          'valid': true,
          'uid': 'day-aeca32c4-5e45-c727-618e-76efa73bbba8'
        },
        {
          'section': 'relationships',
          'subsection': 'people',
          'code': 'daterange.to.year.required',
          'valid': true,
          'uid': 'year-28e977ed-b1d8-817d-1efa-4e590031f135'
        },
        {
          'section': 'relationships',
          'subsection': 'people',
          'code': 'daterange.to.year.length',
          'valid': true,
          'uid': 'year-28e977ed-b1d8-817d-1efa-4e590031f135'
        },
        {
          'section': 'relationships',
          'subsection': 'people',
          'code': 'daterange.to.year.pattern',
          'valid': true,
          'uid': 'year-28e977ed-b1d8-817d-1efa-4e590031f135'
        },
        {
          'section': 'relationships',
          'subsection': 'people',
          'code': 'daterange.to.year.min',
          'valid': true,
          'uid': 'year-6ca3f36c-915b-f5fe-a047-3c5ab2c2b9cc'
        },
        {
          'section': 'relationships',
          'subsection': 'people',
          'code': 'daterange.to.year.max',
          'valid': true,
          'uid': 'year-6ca3f36c-915b-f5fe-a047-3c5ab2c2b9cc'
        },
        {
          'section': 'relationships',
          'subsection': 'people',
          'code': 'daterange.from.month.required',
          'valid': true,
          'uid': 'month-1c1a5910-503b-7312-2bb5-ca2d3b7972bd'
        },
        {
          'section': 'relationships',
          'subsection': 'people',
          'code': 'daterange.from.month.length',
          'valid': true,
          'uid': 'month-1c1a5910-503b-7312-2bb5-ca2d3b7972bd'
        },
        {
          'section': 'relationships',
          'subsection': 'people',
          'code': 'daterange.from.month.pattern',
          'valid': true,
          'uid': 'month-1c1a5910-503b-7312-2bb5-ca2d3b7972bd'
        },
        {
          'section': 'relationships',
          'subsection': 'people',
          'code': 'daterange.from.month.min',
          'valid': true,
          'uid': 'month-82bf65e3-fc4c-794b-eff3-388a9f4fcb92'
        },
        {
          'section': 'relationships',
          'subsection': 'people',
          'code': 'daterange.from.month.max',
          'valid': true,
          'uid': 'month-82bf65e3-fc4c-794b-eff3-388a9f4fcb92'
        },
        {
          'section': 'relationships',
          'subsection': 'people',
          'code': 'daterange.from.required',
          'valid': true,
          'uid': 'from-333e42a2-5e82-0312-d7a4-e866c5cf4bbb'
        },
        {
          'section': 'relationships',
          'subsection': 'people',
          'code': 'daterange.from.max',
          'valid': true,
          'uid': 'from-333e42a2-5e82-0312-d7a4-e866c5cf4bbb'
        },
        {
          'section': 'relationships',
          'subsection': 'people',
          'code': 'daterange.from.min',
          'valid': true,
          'uid': 'from-333e42a2-5e82-0312-d7a4-e866c5cf4bbb'
        },
        {
          'section': 'relationships',
          'subsection': 'people',
          'code': 'daterange.from.day.required',
          'valid': true,
          'uid': 'day-1bb1257e-203d-3a9d-e84c-1d5263fc841d'
        },
        {
          'section': 'relationships',
          'subsection': 'people',
          'code': 'daterange.from.day.length',
          'valid': true,
          'uid': 'day-1bb1257e-203d-3a9d-e84c-1d5263fc841d'
        },
        {
          'section': 'relationships',
          'subsection': 'people',
          'code': 'daterange.from.day.pattern',
          'valid': true,
          'uid': 'day-1bb1257e-203d-3a9d-e84c-1d5263fc841d'
        },
        {
          'section': 'relationships',
          'subsection': 'people',
          'code': 'daterange.from.day.min',
          'valid': true,
          'uid': 'day-4cd56475-1c0f-9593-1060-a9f67ebc4350'
        },
        {
          'section': 'relationships',
          'subsection': 'people',
          'code': 'daterange.from.day.max',
          'valid': true,
          'uid': 'day-4cd56475-1c0f-9593-1060-a9f67ebc4350'
        },
        {
          'section': 'relationships',
          'subsection': 'people',
          'code': 'daterange.from.year.required',
          'valid': true,
          'uid': 'year-236fe918-0484-8adc-c502-cf69f05269db'
        },
        {
          'section': 'relationships',
          'subsection': 'people',
          'code': 'daterange.from.year.length',
          'valid': true,
          'uid': 'year-236fe918-0484-8adc-c502-cf69f05269db'
        },
        {
          'section': 'relationships',
          'subsection': 'people',
          'code': 'daterange.from.year.pattern',
          'valid': true,
          'uid': 'year-236fe918-0484-8adc-c502-cf69f05269db'
        },
        {
          'section': 'relationships',
          'subsection': 'people',
          'code': 'daterange.from.year.min',
          'valid': true,
          'uid': 'year-22684046-21e4-32e1-f4c7-c510aa776046'
        },
        {
          'section': 'relationships',
          'subsection': 'people',
          'code': 'daterange.from.year.max',
          'valid': true,
          'uid': 'year-22684046-21e4-32e1-f4c7-c510aa776046'
        },
        {
          'section': 'relationships',
          'subsection': 'people',
          'code': 'daterange.to.month.required',
          'valid': true,
          'uid': 'month-14e211a9-f873-e7a4-15d2-5a4329259416'
        },
        {
          'section': 'relationships',
          'subsection': 'people',
          'code': 'daterange.to.month.length',
          'valid': true,
          'uid': 'month-14e211a9-f873-e7a4-15d2-5a4329259416'
        },
        {
          'section': 'relationships',
          'subsection': 'people',
          'code': 'daterange.to.month.pattern',
          'valid': true,
          'uid': 'month-14e211a9-f873-e7a4-15d2-5a4329259416'
        },
        {
          'section': 'relationships',
          'subsection': 'people',
          'code': 'daterange.to.month.min',
          'valid': true,
          'uid': 'month-7fdc83e5-8ac3-a4f8-2ba6-ed0661723fcf'
        },
        {
          'section': 'relationships',
          'subsection': 'people',
          'code': 'daterange.to.month.max',
          'valid': true,
          'uid': 'month-7fdc83e5-8ac3-a4f8-2ba6-ed0661723fcf'
        },
        {
          'section': 'relationships',
          'subsection': 'people',
          'code': 'daterange.to.required',
          'valid': true,
          'uid': 'to-51bcd27a-7e0e-3def-33c6-6c682aaeef77'
        },
        {
          'section': 'relationships',
          'subsection': 'people',
          'code': 'daterange.to.max',
          'valid': true,
          'uid': 'to-51bcd27a-7e0e-3def-33c6-6c682aaeef77'
        },
        {
          'section': 'relationships',
          'subsection': 'people',
          'code': 'daterange.to.min',
          'valid': true,
          'uid': 'to-51bcd27a-7e0e-3def-33c6-6c682aaeef77'
        },
        {
          'section': 'relationships',
          'subsection': 'people',
          'code': 'daterange.to.day.required',
          'valid': true,
          'uid': 'day-42458293-dcc0-b1f5-39d8-dd44cfd35601'
        },
        {
          'section': 'relationships',
          'subsection': 'people',
          'code': 'daterange.to.day.length',
          'valid': true,
          'uid': 'day-42458293-dcc0-b1f5-39d8-dd44cfd35601'
        },
        {
          'section': 'relationships',
          'subsection': 'people',
          'code': 'daterange.to.day.pattern',
          'valid': true,
          'uid': 'day-42458293-dcc0-b1f5-39d8-dd44cfd35601'
        },
        {
          'section': 'relationships',
          'subsection': 'people',
          'code': 'daterange.to.day.min',
          'valid': true,
          'uid': 'day-11890633-9343-feeb-4e99-022f6155d160'
        },
        {
          'section': 'relationships',
          'subsection': 'people',
          'code': 'daterange.to.day.max',
          'valid': true,
          'uid': 'day-11890633-9343-feeb-4e99-022f6155d160'
        },
        {
          'section': 'relationships',
          'subsection': 'people',
          'code': 'daterange.to.year.required',
          'valid': true,
          'uid': 'year-2527560b-f382-6ee0-5e5e-88bedefb2534'
        },
        {
          'section': 'relationships',
          'subsection': 'people',
          'code': 'daterange.to.year.length',
          'valid': true,
          'uid': 'year-2527560b-f382-6ee0-5e5e-88bedefb2534'
        },
        {
          'section': 'relationships',
          'subsection': 'people',
          'code': 'daterange.to.year.pattern',
          'valid': true,
          'uid': 'year-2527560b-f382-6ee0-5e5e-88bedefb2534'
        },
        {
          'section': 'relationships',
          'subsection': 'people',
          'code': 'daterange.to.year.min',
          'valid': true,
          'uid': 'year-7adf841c-7d59-dee3-94fa-e48b4e86e179'
        },
        {
          'section': 'relationships',
          'subsection': 'people',
          'code': 'daterange.to.year.max',
          'valid': true,
          'uid': 'year-7adf841c-7d59-dee3-94fa-e48b4e86e179'
        },
        {
          'section': 'relationships',
          'subsection': 'review',
          'code': 'required',
          'valid': true,
          'uid': 'status-e52c5b74-2729-46fc-af88-19b0ee3276b1'
        },
        {
          'section': 'relationships',
          'subsection': 'review',
          'code': 'required',
          'valid': true,
          'uid': 'undefined-951ae1a7-c04b-bb47-4df2-42f07a3c1c94'
        },
        {
          'section': 'relationships',
          'subsection': 'review',
          'code': 'name.required',
          'valid': true,
          'uid': 'Name-2d6037f8-d4b4-b3b5-9589-6457c9b2370f'
        },
        {
          'section': 'relationships',
          'subsection': 'review',
          'code': 'required',
          'valid': false,
          'uid': 'Rank-1de8abae-c47b-f694-f012-9d67aaec226b'
        },
        {
          'section': 'relationships',
          'subsection': 'review',
          'code': 'length',
          'valid': null,
          'uid': 'Rank-1de8abae-c47b-f694-f012-9d67aaec226b'
        },
        {
          'section': 'relationships',
          'subsection': 'review',
          'code': 'pattern',
          'valid': null,
          'uid': 'Rank-1de8abae-c47b-f694-f012-9d67aaec226b'
        },
        {
          'section': 'relationships',
          'subsection': 'review',
          'code': 'required',
          'valid': true,
          'uid': 'undefined-a0e2d01d-ea78-4339-739a-ca394c8c16dc'
        },
        {
          'section': 'relationships',
          'subsection': 'review',
          'code': 'telephone.domestic.first.required',
          'valid': true,
          'uid': 'domestic_first-5ff6f9e0-6f6a-02f0-b026-4a93aa47f7bf'
        },
        {
          'section': 'relationships',
          'subsection': 'review',
          'code': 'telephone.domestic.first.length',
          'valid': true,
          'uid': 'domestic_first-5ff6f9e0-6f6a-02f0-b026-4a93aa47f7bf'
        },
        {
          'section': 'relationships',
          'subsection': 'review',
          'code': 'telephone.domestic.first.pattern',
          'valid': true,
          'uid': 'domestic_first-5ff6f9e0-6f6a-02f0-b026-4a93aa47f7bf'
        },
        {
          'section': 'relationships',
          'subsection': 'review',
          'code': 'telephone.required',
          'valid': true,
          'uid': 'MobileTelephone-4de7dfc9-bc76-6e93-f32a-7dc711b13b46'
        },
        {
          'section': 'relationships',
          'subsection': 'review',
          'code': 'telephone.domestic.second.required',
          'valid': true,
          'uid': 'domestic_second-818ae281-507c-2a86-0ed7-a7927b3ef07f'
        },
        {
          'section': 'relationships',
          'subsection': 'review',
          'code': 'telephone.domestic.second.length',
          'valid': true,
          'uid': 'domestic_second-818ae281-507c-2a86-0ed7-a7927b3ef07f'
        },
        {
          'section': 'relationships',
          'subsection': 'review',
          'code': 'telephone.domestic.second.pattern',
          'valid': true,
          'uid': 'domestic_second-818ae281-507c-2a86-0ed7-a7927b3ef07f'
        },
        {
          'section': 'relationships',
          'subsection': 'review',
          'code': 'telephone.domestic.third.required',
          'valid': true,
          'uid': 'domestic_third-cfde6df2-a3f3-5205-afdf-b79df2a18157'
        },
        {
          'section': 'relationships',
          'subsection': 'review',
          'code': 'telephone.domestic.third.length',
          'valid': true,
          'uid': 'domestic_third-cfde6df2-a3f3-5205-afdf-b79df2a18157'
        },
        {
          'section': 'relationships',
          'subsection': 'review',
          'code': 'telephone.domestic.third.pattern',
          'valid': true,
          'uid': 'domestic_third-cfde6df2-a3f3-5205-afdf-b79df2a18157'
        },
        {
          'section': 'relationships',
          'subsection': 'review',
          'code': 'telephone.domestic.extension.required',
          'valid': true,
          'uid': 'domestic_extension-de73d9d8-903a-7886-03de-4ed72875843e'
        },
        {
          'section': 'relationships',
          'subsection': 'review',
          'code': 'telephone.domestic.extension.length',
          'valid': null,
          'uid': 'domestic_extension-de73d9d8-903a-7886-03de-4ed72875843e'
        },
        {
          'section': 'relationships',
          'subsection': 'review',
          'code': 'telephone.domestic.extension.pattern',
          'valid': null,
          'uid': 'domestic_extension-de73d9d8-903a-7886-03de-4ed72875843e'
        },
        {
          'section': 'relationships',
          'subsection': 'review',
          'code': 'telephone.numberType.required',
          'valid': true,
          'uid': 'undefined-cd70a87f-76c0-69c3-d803-7ad17e914eab'
        },
        {
          'section': 'relationships',
          'subsection': 'review',
          'code': 'telephone.domestic.first.required',
          'valid': false,
          'uid': 'domestic_first-adbd1af2-f511-dde0-8dd6-47838e127c39'
        },
        {
          'section': 'relationships',
          'subsection': 'review',
          'code': 'telephone.domestic.first.length',
          'valid': null,
          'uid': 'domestic_first-adbd1af2-f511-dde0-8dd6-47838e127c39'
        },
        {
          'section': 'relationships',
          'subsection': 'review',
          'code': 'telephone.domestic.first.pattern',
          'valid': null,
          'uid': 'domestic_first-adbd1af2-f511-dde0-8dd6-47838e127c39'
        },
        {
          'section': 'relationships',
          'subsection': 'review',
          'code': 'telephone.required',
          'valid': false,
          'uid': 'OtherTelephone-29cc9cd1-bfa3-9eda-221b-1d057be1d53a'
        },
        {
          'section': 'relationships',
          'subsection': 'review',
          'code': 'telephone.domestic.second.required',
          'valid': false,
          'uid': 'domestic_second-5e920b10-b97c-aaf8-f237-ea9237506917'
        },
        {
          'section': 'relationships',
          'subsection': 'review',
          'code': 'telephone.domestic.second.length',
          'valid': null,
          'uid': 'domestic_second-5e920b10-b97c-aaf8-f237-ea9237506917'
        },
        {
          'section': 'relationships',
          'subsection': 'review',
          'code': 'telephone.domestic.second.pattern',
          'valid': null,
          'uid': 'domestic_second-5e920b10-b97c-aaf8-f237-ea9237506917'
        },
        {
          'section': 'relationships',
          'subsection': 'review',
          'code': 'telephone.domestic.third.required',
          'valid': false,
          'uid': 'domestic_third-a5ca8051-1ea9-e841-b1ec-97b0f37df78f'
        },
        {
          'section': 'relationships',
          'subsection': 'review',
          'code': 'telephone.domestic.third.length',
          'valid': null,
          'uid': 'domestic_third-a5ca8051-1ea9-e841-b1ec-97b0f37df78f'
        },
        {
          'section': 'relationships',
          'subsection': 'review',
          'code': 'telephone.domestic.third.pattern',
          'valid': null,
          'uid': 'domestic_third-a5ca8051-1ea9-e841-b1ec-97b0f37df78f'
        },
        {
          'section': 'relationships',
          'subsection': 'review',
          'code': 'telephone.domestic.extension.required',
          'valid': true,
          'uid': 'domestic_extension-27c41a03-ee01-4851-0dc4-a23098578a3d'
        },
        {
          'section': 'relationships',
          'subsection': 'review',
          'code': 'telephone.domestic.extension.length',
          'valid': null,
          'uid': 'domestic_extension-27c41a03-ee01-4851-0dc4-a23098578a3d'
        },
        {
          'section': 'relationships',
          'subsection': 'review',
          'code': 'telephone.domestic.extension.pattern',
          'valid': null,
          'uid': 'domestic_extension-27c41a03-ee01-4851-0dc4-a23098578a3d'
        },
        {
          'section': 'relationships',
          'subsection': 'review',
          'code': 'telephone.numberType.required',
          'valid': false,
          'uid': 'undefined-13d651f5-99a2-f45e-b261-910de706c97a'
        },
        {
          'section': 'relationships',
          'subsection': 'review',
          'code': 'email.required',
          'valid': true,
          'uid': 'Email-f98a560a-1367-0697-f14d-3d80ba2618e3'
        },
        {
          'section': 'relationships',
          'subsection': 'review',
          'code': 'email.length',
          'valid': true,
          'uid': 'Email-f98a560a-1367-0697-f14d-3d80ba2618e3'
        },
        {
          'section': 'relationships',
          'subsection': 'review',
          'code': 'email.pattern',
          'valid': true,
          'uid': 'Email-f98a560a-1367-0697-f14d-3d80ba2618e3'
        },
        {
          'section': 'relationships',
          'subsection': 'review',
          'code': 'location.address.street.required',
          'valid': true,
          'uid': 'address-15a39ef6-c31c-0e52-f062-62bb33700d43'
        },
        {
          'section': 'relationships',
          'subsection': 'review',
          'code': 'location.address.street.length',
          'valid': true,
          'uid': 'address-15a39ef6-c31c-0e52-f062-62bb33700d43'
        },
        {
          'section': 'relationships',
          'subsection': 'review',
          'code': 'location.address.street.pattern',
          'valid': true,
          'uid': 'address-15a39ef6-c31c-0e52-f062-62bb33700d43'
        },
        {
          'section': 'relationships',
          'subsection': 'review',
          'code': 'location.address.required',
          'valid': true,
          'uid': 'Address-fd1b01bc-9396-31cc-0668-b162428df031'
        },
        {
          'section': 'relationships',
          'subsection': 'review',
          'code': 'location.address.street.required',
          'valid': true,
          'uid': 'street2-9c60abfd-8446-e89e-b064-0e13b9263375'
        },
        {
          'section': 'relationships',
          'subsection': 'review',
          'code': 'location.address.street.length',
          'valid': null,
          'uid': 'street2-9c60abfd-8446-e89e-b064-0e13b9263375'
        },
        {
          'section': 'relationships',
          'subsection': 'review',
          'code': 'location.address.street.pattern',
          'valid': null,
          'uid': 'street2-9c60abfd-8446-e89e-b064-0e13b9263375'
        },
        {
          'section': 'relationships',
          'subsection': 'review',
          'code': 'location.address.city.required',
          'valid': true,
          'uid': 'city-fc8cf233-3261-3c1b-2ba0-0d3792a5f6b2'
        },
        {
          'section': 'relationships',
          'subsection': 'review',
          'code': 'location.address.city.length',
          'valid': true,
          'uid': 'city-fc8cf233-3261-3c1b-2ba0-0d3792a5f6b2'
        },
        {
          'section': 'relationships',
          'subsection': 'review',
          'code': 'location.address.city.pattern',
          'valid': true,
          'uid': 'city-fc8cf233-3261-3c1b-2ba0-0d3792a5f6b2'
        },
        {
          'section': 'relationships',
          'subsection': 'review',
          'code': 'location.address.zipcode.required',
          'valid': true,
          'uid': 'zipcode-8faa23a7-5ae4-6aae-9be2-5e0c7c8b7bdd'
        },
        {
          'section': 'relationships',
          'subsection': 'review',
          'code': 'location.address.zipcode.length',
          'valid': true,
          'uid': 'zipcode-8faa23a7-5ae4-6aae-9be2-5e0c7c8b7bdd'
        },
        {
          'section': 'relationships',
          'subsection': 'review',
          'code': 'location.address.zipcode.pattern',
          'valid': true,
          'uid': 'zipcode-8faa23a7-5ae4-6aae-9be2-5e0c7c8b7bdd'
        },
        {
          'section': 'relationships',
          'subsection': 'review',
          'code': 'name.required',
          'valid': true,
          'uid': 'Name-83d989b3-213d-89b5-278a-ae7038fb5bca'
        },
        {
          'section': 'relationships',
          'subsection': 'review',
          'code': 'required',
          'valid': false,
          'uid': 'Rank-a7f52ec1-81c6-be66-a821-b4029c9a6252'
        },
        {
          'section': 'relationships',
          'subsection': 'review',
          'code': 'length',
          'valid': null,
          'uid': 'Rank-a7f52ec1-81c6-be66-a821-b4029c9a6252'
        },
        {
          'section': 'relationships',
          'subsection': 'review',
          'code': 'pattern',
          'valid': null,
          'uid': 'Rank-a7f52ec1-81c6-be66-a821-b4029c9a6252'
        },
        {
          'section': 'relationships',
          'subsection': 'review',
          'code': 'required',
          'valid': true,
          'uid': 'undefined-ac408b27-5485-eda2-e8a8-3ef52ee97df4'
        },
        {
          'section': 'relationships',
          'subsection': 'review',
          'code': 'telephone.domestic.first.required',
          'valid': false,
          'uid': 'domestic_first-427619dd-e0f3-9cae-8efa-aaf4bb2fce2c'
        },
        {
          'section': 'relationships',
          'subsection': 'review',
          'code': 'telephone.domestic.first.length',
          'valid': null,
          'uid': 'domestic_first-427619dd-e0f3-9cae-8efa-aaf4bb2fce2c'
        },
        {
          'section': 'relationships',
          'subsection': 'review',
          'code': 'telephone.domestic.first.pattern',
          'valid': null,
          'uid': 'domestic_first-427619dd-e0f3-9cae-8efa-aaf4bb2fce2c'
        },
        {
          'section': 'relationships',
          'subsection': 'review',
          'code': 'telephone.required',
          'valid': false,
          'uid': 'MobileTelephone-dfcdef14-12ac-e5ab-42bd-f8dfb11101e4'
        },
        {
          'section': 'relationships',
          'subsection': 'review',
          'code': 'telephone.domestic.second.required',
          'valid': false,
          'uid': 'domestic_second-df080190-b612-c143-a25c-28bb76da811e'
        },
        {
          'section': 'relationships',
          'subsection': 'review',
          'code': 'telephone.domestic.second.length',
          'valid': null,
          'uid': 'domestic_second-df080190-b612-c143-a25c-28bb76da811e'
        },
        {
          'section': 'relationships',
          'subsection': 'review',
          'code': 'telephone.domestic.second.pattern',
          'valid': null,
          'uid': 'domestic_second-df080190-b612-c143-a25c-28bb76da811e'
        },
        {
          'section': 'relationships',
          'subsection': 'review',
          'code': 'telephone.domestic.third.required',
          'valid': false,
          'uid': 'domestic_third-3ee516fd-208b-101f-7655-d2e3ef692893'
        },
        {
          'section': 'relationships',
          'subsection': 'review',
          'code': 'telephone.domestic.third.length',
          'valid': null,
          'uid': 'domestic_third-3ee516fd-208b-101f-7655-d2e3ef692893'
        },
        {
          'section': 'relationships',
          'subsection': 'review',
          'code': 'telephone.domestic.third.pattern',
          'valid': null,
          'uid': 'domestic_third-3ee516fd-208b-101f-7655-d2e3ef692893'
        },
        {
          'section': 'relationships',
          'subsection': 'review',
          'code': 'telephone.domestic.extension.required',
          'valid': true,
          'uid': 'domestic_extension-ca5a5918-0e04-bc7b-f69c-a5669af6fb59'
        },
        {
          'section': 'relationships',
          'subsection': 'review',
          'code': 'telephone.domestic.extension.length',
          'valid': null,
          'uid': 'domestic_extension-ca5a5918-0e04-bc7b-f69c-a5669af6fb59'
        },
        {
          'section': 'relationships',
          'subsection': 'review',
          'code': 'telephone.domestic.extension.pattern',
          'valid': null,
          'uid': 'domestic_extension-ca5a5918-0e04-bc7b-f69c-a5669af6fb59'
        },
        {
          'section': 'relationships',
          'subsection': 'review',
          'code': 'telephone.numberType.required',
          'valid': false,
          'uid': 'undefined-9ba48aa0-0787-a153-7d0d-1570d1b29f1b'
        },
        {
          'section': 'relationships',
          'subsection': 'review',
          'code': 'telephone.domestic.first.required',
          'valid': false,
          'uid': 'domestic_first-5e734f4f-a84a-deef-9e20-52f9a7b44bd6'
        },
        {
          'section': 'relationships',
          'subsection': 'review',
          'code': 'telephone.domestic.first.length',
          'valid': null,
          'uid': 'domestic_first-5e734f4f-a84a-deef-9e20-52f9a7b44bd6'
        },
        {
          'section': 'relationships',
          'subsection': 'review',
          'code': 'telephone.domestic.first.pattern',
          'valid': null,
          'uid': 'domestic_first-5e734f4f-a84a-deef-9e20-52f9a7b44bd6'
        },
        {
          'section': 'relationships',
          'subsection': 'review',
          'code': 'telephone.required',
          'valid': false,
          'uid': 'OtherTelephone-e9a84708-6776-3c35-c20d-30535b2b06f5'
        },
        {
          'section': 'relationships',
          'subsection': 'review',
          'code': 'telephone.domestic.second.required',
          'valid': false,
          'uid': 'domestic_second-f28f5ad1-96c5-15a2-cffb-2e8ff66649f9'
        },
        {
          'section': 'relationships',
          'subsection': 'review',
          'code': 'telephone.domestic.second.length',
          'valid': null,
          'uid': 'domestic_second-f28f5ad1-96c5-15a2-cffb-2e8ff66649f9'
        },
        {
          'section': 'relationships',
          'subsection': 'review',
          'code': 'telephone.domestic.second.pattern',
          'valid': null,
          'uid': 'domestic_second-f28f5ad1-96c5-15a2-cffb-2e8ff66649f9'
        },
        {
          'section': 'relationships',
          'subsection': 'review',
          'code': 'telephone.domestic.third.required',
          'valid': false,
          'uid': 'domestic_third-23ff5570-925d-1afa-4cae-2f375ca0cbab'
        },
        {
          'section': 'relationships',
          'subsection': 'review',
          'code': 'telephone.domestic.third.length',
          'valid': null,
          'uid': 'domestic_third-23ff5570-925d-1afa-4cae-2f375ca0cbab'
        },
        {
          'section': 'relationships',
          'subsection': 'review',
          'code': 'telephone.domestic.third.pattern',
          'valid': null,
          'uid': 'domestic_third-23ff5570-925d-1afa-4cae-2f375ca0cbab'
        },
        {
          'section': 'relationships',
          'subsection': 'review',
          'code': 'telephone.domestic.extension.required',
          'valid': true,
          'uid': 'domestic_extension-c62d993b-5084-52a7-329c-32698f5f69eb'
        },
        {
          'section': 'relationships',
          'subsection': 'review',
          'code': 'telephone.domestic.extension.length',
          'valid': null,
          'uid': 'domestic_extension-c62d993b-5084-52a7-329c-32698f5f69eb'
        },
        {
          'section': 'relationships',
          'subsection': 'review',
          'code': 'telephone.domestic.extension.pattern',
          'valid': null,
          'uid': 'domestic_extension-c62d993b-5084-52a7-329c-32698f5f69eb'
        },
        {
          'section': 'relationships',
          'subsection': 'review',
          'code': 'telephone.numberType.required',
          'valid': false,
          'uid': 'undefined-f6c181c0-bfe9-3163-f8f2-23129a32afbe'
        },
        {
          'section': 'relationships',
          'subsection': 'review',
          'code': 'email.required',
          'valid': false,
          'uid': 'Email-6d3e4a71-2783-801a-5ec4-15a417ca9254'
        },
        {
          'section': 'relationships',
          'subsection': 'review',
          'code': 'email.length',
          'valid': null,
          'uid': 'Email-6d3e4a71-2783-801a-5ec4-15a417ca9254'
        },
        {
          'section': 'relationships',
          'subsection': 'review',
          'code': 'email.pattern',
          'valid': null,
          'uid': 'Email-6d3e4a71-2783-801a-5ec4-15a417ca9254'
        },
        {
          'section': 'relationships',
          'subsection': 'review',
          'code': 'location.address.street.required',
          'valid': true,
          'uid': 'address-5039c272-d177-95d5-48c3-9b30ac83dd32'
        },
        {
          'section': 'relationships',
          'subsection': 'review',
          'code': 'location.address.street.length',
          'valid': true,
          'uid': 'address-5039c272-d177-95d5-48c3-9b30ac83dd32'
        },
        {
          'section': 'relationships',
          'subsection': 'review',
          'code': 'location.address.street.pattern',
          'valid': true,
          'uid': 'address-5039c272-d177-95d5-48c3-9b30ac83dd32'
        },
        {
          'section': 'relationships',
          'subsection': 'review',
          'code': 'location.address.required',
          'valid': true,
          'uid': 'Address-37f3b175-8852-71de-90be-b02f811b2ef7'
        },
        {
          'section': 'relationships',
          'subsection': 'review',
          'code': 'location.address.street.required',
          'valid': true,
          'uid': 'street2-8c46f8ba-4924-d7b8-ceec-a876ce49b22e'
        },
        {
          'section': 'relationships',
          'subsection': 'review',
          'code': 'location.address.street.length',
          'valid': null,
          'uid': 'street2-8c46f8ba-4924-d7b8-ceec-a876ce49b22e'
        },
        {
          'section': 'relationships',
          'subsection': 'review',
          'code': 'location.address.street.pattern',
          'valid': null,
          'uid': 'street2-8c46f8ba-4924-d7b8-ceec-a876ce49b22e'
        },
        {
          'section': 'relationships',
          'subsection': 'review',
          'code': 'location.address.city.required',
          'valid': true,
          'uid': 'city-fe3aee61-94eb-17d1-7b69-09c6d91804b4'
        },
        {
          'section': 'relationships',
          'subsection': 'review',
          'code': 'location.address.city.length',
          'valid': true,
          'uid': 'city-fe3aee61-94eb-17d1-7b69-09c6d91804b4'
        },
        {
          'section': 'relationships',
          'subsection': 'review',
          'code': 'location.address.city.pattern',
          'valid': true,
          'uid': 'city-fe3aee61-94eb-17d1-7b69-09c6d91804b4'
        },
        {
          'section': 'relationships',
          'subsection': 'review',
          'code': 'location.address.zipcode.required',
          'valid': true,
          'uid': 'zipcode-e5514668-f1e4-e503-60ef-ca90c52c8630'
        },
        {
          'section': 'relationships',
          'subsection': 'review',
          'code': 'location.address.zipcode.length',
          'valid': true,
          'uid': 'zipcode-e5514668-f1e4-e503-60ef-ca90c52c8630'
        },
        {
          'section': 'relationships',
          'subsection': 'review',
          'code': 'location.address.zipcode.pattern',
          'valid': true,
          'uid': 'zipcode-e5514668-f1e4-e503-60ef-ca90c52c8630'
        },
        {
          'section': 'relationships',
          'subsection': 'review',
          'code': 'name.required',
          'valid': true,
          'uid': 'Name-010f7408-74a6-4ef5-be01-bf532da6c8b5'
        },
        {
          'section': 'relationships',
          'subsection': 'review',
          'code': 'required',
          'valid': false,
          'uid': 'Rank-e3fea354-13c0-54f9-2973-1219c5c1a1dc'
        },
        {
          'section': 'relationships',
          'subsection': 'review',
          'code': 'length',
          'valid': null,
          'uid': 'Rank-e3fea354-13c0-54f9-2973-1219c5c1a1dc'
        },
        {
          'section': 'relationships',
          'subsection': 'review',
          'code': 'pattern',
          'valid': null,
          'uid': 'Rank-e3fea354-13c0-54f9-2973-1219c5c1a1dc'
        },
        {
          'section': 'relationships',
          'subsection': 'review',
          'code': 'required',
          'valid': true,
          'uid': 'undefined-fd89d027-733a-e8ee-0957-4ef30cc5a408'
        },
        {
          'section': 'relationships',
          'subsection': 'review',
          'code': 'telephone.domestic.first.required',
          'valid': false,
          'uid': 'domestic_first-7d2e5e7e-f1ba-95db-9e3b-c42f3f18c7b1'
        },
        {
          'section': 'relationships',
          'subsection': 'review',
          'code': 'telephone.domestic.first.length',
          'valid': null,
          'uid': 'domestic_first-7d2e5e7e-f1ba-95db-9e3b-c42f3f18c7b1'
        },
        {
          'section': 'relationships',
          'subsection': 'review',
          'code': 'telephone.domestic.first.pattern',
          'valid': null,
          'uid': 'domestic_first-7d2e5e7e-f1ba-95db-9e3b-c42f3f18c7b1'
        },
        {
          'section': 'relationships',
          'subsection': 'review',
          'code': 'telephone.required',
          'valid': false,
          'uid': 'MobileTelephone-5e39517e-a2eb-638c-f44c-c41e380d8aae'
        },
        {
          'section': 'relationships',
          'subsection': 'review',
          'code': 'telephone.domestic.second.required',
          'valid': false,
          'uid': 'domestic_second-c7747694-e76f-c99f-e22d-153a4976e9b0'
        },
        {
          'section': 'relationships',
          'subsection': 'review',
          'code': 'telephone.domestic.second.length',
          'valid': null,
          'uid': 'domestic_second-c7747694-e76f-c99f-e22d-153a4976e9b0'
        },
        {
          'section': 'relationships',
          'subsection': 'review',
          'code': 'telephone.domestic.second.pattern',
          'valid': null,
          'uid': 'domestic_second-c7747694-e76f-c99f-e22d-153a4976e9b0'
        },
        {
          'section': 'relationships',
          'subsection': 'review',
          'code': 'telephone.domestic.third.required',
          'valid': false,
          'uid': 'domestic_third-2053d64b-5177-b003-db9f-329a46f53a01'
        },
        {
          'section': 'relationships',
          'subsection': 'review',
          'code': 'telephone.domestic.third.length',
          'valid': null,
          'uid': 'domestic_third-2053d64b-5177-b003-db9f-329a46f53a01'
        },
        {
          'section': 'relationships',
          'subsection': 'review',
          'code': 'telephone.domestic.third.pattern',
          'valid': null,
          'uid': 'domestic_third-2053d64b-5177-b003-db9f-329a46f53a01'
        },
        {
          'section': 'relationships',
          'subsection': 'review',
          'code': 'telephone.domestic.extension.required',
          'valid': true,
          'uid': 'domestic_extension-d233f693-2273-8d23-3f13-b43af4915387'
        },
        {
          'section': 'relationships',
          'subsection': 'review',
          'code': 'telephone.domestic.extension.length',
          'valid': null,
          'uid': 'domestic_extension-d233f693-2273-8d23-3f13-b43af4915387'
        },
        {
          'section': 'relationships',
          'subsection': 'review',
          'code': 'telephone.domestic.extension.pattern',
          'valid': null,
          'uid': 'domestic_extension-d233f693-2273-8d23-3f13-b43af4915387'
        },
        {
          'section': 'relationships',
          'subsection': 'review',
          'code': 'telephone.numberType.required',
          'valid': false,
          'uid': 'undefined-45e2b576-116b-3f36-9e2d-bd78ec3ed447'
        },
        {
          'section': 'relationships',
          'subsection': 'review',
          'code': 'telephone.domestic.first.required',
          'valid': false,
          'uid': 'domestic_first-dbafa2b9-cf42-063f-b428-41e303d01ddb'
        },
        {
          'section': 'relationships',
          'subsection': 'review',
          'code': 'telephone.domestic.first.length',
          'valid': null,
          'uid': 'domestic_first-dbafa2b9-cf42-063f-b428-41e303d01ddb'
        },
        {
          'section': 'relationships',
          'subsection': 'review',
          'code': 'telephone.domestic.first.pattern',
          'valid': null,
          'uid': 'domestic_first-dbafa2b9-cf42-063f-b428-41e303d01ddb'
        },
        {
          'section': 'relationships',
          'subsection': 'review',
          'code': 'telephone.required',
          'valid': false,
          'uid': 'OtherTelephone-17c65ece-0046-9924-fd68-7ae2e5f76fe4'
        },
        {
          'section': 'relationships',
          'subsection': 'review',
          'code': 'telephone.domestic.second.required',
          'valid': false,
          'uid': 'domestic_second-b1b1528a-bbf8-d391-f89f-7d5592d5bf23'
        },
        {
          'section': 'relationships',
          'subsection': 'review',
          'code': 'telephone.domestic.second.length',
          'valid': null,
          'uid': 'domestic_second-b1b1528a-bbf8-d391-f89f-7d5592d5bf23'
        },
        {
          'section': 'relationships',
          'subsection': 'review',
          'code': 'telephone.domestic.second.pattern',
          'valid': null,
          'uid': 'domestic_second-b1b1528a-bbf8-d391-f89f-7d5592d5bf23'
        },
        {
          'section': 'relationships',
          'subsection': 'review',
          'code': 'telephone.domestic.third.required',
          'valid': false,
          'uid': 'domestic_third-b3aea66e-7e0e-2f48-8f6f-e7f1652f96c4'
        },
        {
          'section': 'relationships',
          'subsection': 'review',
          'code': 'telephone.domestic.third.length',
          'valid': null,
          'uid': 'domestic_third-b3aea66e-7e0e-2f48-8f6f-e7f1652f96c4'
        },
        {
          'section': 'relationships',
          'subsection': 'review',
          'code': 'telephone.domestic.third.pattern',
          'valid': null,
          'uid': 'domestic_third-b3aea66e-7e0e-2f48-8f6f-e7f1652f96c4'
        },
        {
          'section': 'relationships',
          'subsection': 'review',
          'code': 'telephone.domestic.extension.required',
          'valid': true,
          'uid': 'domestic_extension-3fea7e1a-88ff-78e0-091a-59a3db73d2af'
        },
        {
          'section': 'relationships',
          'subsection': 'review',
          'code': 'telephone.domestic.extension.length',
          'valid': null,
          'uid': 'domestic_extension-3fea7e1a-88ff-78e0-091a-59a3db73d2af'
        },
        {
          'section': 'relationships',
          'subsection': 'review',
          'code': 'telephone.domestic.extension.pattern',
          'valid': null,
          'uid': 'domestic_extension-3fea7e1a-88ff-78e0-091a-59a3db73d2af'
        },
        {
          'section': 'relationships',
          'subsection': 'review',
          'code': 'telephone.numberType.required',
          'valid': false,
          'uid': 'undefined-26096bb2-aca8-6538-d73f-6925c3c92615'
        },
        {
          'section': 'relationships',
          'subsection': 'review',
          'code': 'email.required',
          'valid': false,
          'uid': 'Email-b5f5a0f0-a7f0-f936-33af-70228c4b3b6e'
        },
        {
          'section': 'relationships',
          'subsection': 'review',
          'code': 'email.length',
          'valid': null,
          'uid': 'Email-b5f5a0f0-a7f0-f936-33af-70228c4b3b6e'
        },
        {
          'section': 'relationships',
          'subsection': 'review',
          'code': 'email.pattern',
          'valid': null,
          'uid': 'Email-b5f5a0f0-a7f0-f936-33af-70228c4b3b6e'
        },
        {
          'section': 'relationships',
          'subsection': 'review',
          'code': 'location.address.street.required',
          'valid': true,
          'uid': 'address-ee92052b-23d4-c5fc-2a74-2acd4e3908a7'
        },
        {
          'section': 'relationships',
          'subsection': 'review',
          'code': 'location.address.street.length',
          'valid': true,
          'uid': 'address-ee92052b-23d4-c5fc-2a74-2acd4e3908a7'
        },
        {
          'section': 'relationships',
          'subsection': 'review',
          'code': 'location.address.street.pattern',
          'valid': true,
          'uid': 'address-ee92052b-23d4-c5fc-2a74-2acd4e3908a7'
        },
        {
          'section': 'relationships',
          'subsection': 'review',
          'code': 'location.address.required',
          'valid': true,
          'uid': 'Address-4c48ec0a-1b48-6b1a-f96b-4e54da7d7b4b'
        },
        {
          'section': 'relationships',
          'subsection': 'review',
          'code': 'location.address.street.required',
          'valid': true,
          'uid': 'street2-cd5e99f1-6a1d-f161-1925-afa52d7d9e64'
        },
        {
          'section': 'relationships',
          'subsection': 'review',
          'code': 'location.address.street.length',
          'valid': null,
          'uid': 'street2-cd5e99f1-6a1d-f161-1925-afa52d7d9e64'
        },
        {
          'section': 'relationships',
          'subsection': 'review',
          'code': 'location.address.street.pattern',
          'valid': null,
          'uid': 'street2-cd5e99f1-6a1d-f161-1925-afa52d7d9e64'
        },
        {
          'section': 'relationships',
          'subsection': 'review',
          'code': 'location.address.city.required',
          'valid': true,
          'uid': 'city-57a24593-0ec7-2493-c54d-35ab90d79a2d'
        },
        {
          'section': 'relationships',
          'subsection': 'review',
          'code': 'location.address.city.length',
          'valid': true,
          'uid': 'city-57a24593-0ec7-2493-c54d-35ab90d79a2d'
        },
        {
          'section': 'relationships',
          'subsection': 'review',
          'code': 'location.address.city.pattern',
          'valid': true,
          'uid': 'city-57a24593-0ec7-2493-c54d-35ab90d79a2d'
        },
        {
          'section': 'relationships',
          'subsection': 'review',
          'code': 'location.address.zipcode.required',
          'valid': true,
          'uid': 'zipcode-fb5363f2-49b0-e5a6-de13-c0a394c2c1a6'
        },
        {
          'section': 'relationships',
          'subsection': 'review',
          'code': 'location.address.zipcode.length',
          'valid': true,
          'uid': 'zipcode-fb5363f2-49b0-e5a6-de13-c0a394c2c1a6'
        },
        {
          'section': 'relationships',
          'subsection': 'review',
          'code': 'location.address.zipcode.pattern',
          'valid': true,
          'uid': 'zipcode-fb5363f2-49b0-e5a6-de13-c0a394c2c1a6'
        },
        {
          'section': 'relationships',
          'subsection': 'review',
          'code': 'required',
          'valid': true,
          'uid': 'undefined-774c12a7-6754-3097-2782-77a6250e5ab8'
        },
        {
          'section': 'relationships',
          'subsection': 'review',
          'code': 'required',
          'valid': true,
          'uid': 'undefined-0e16c41b-10b8-6229-405a-ae8b07071697'
        },
        {
          'section': 'relationships',
          'subsection': 'review',
          'code': 'name.required',
          'valid': true,
          'uid': 'Name-4e8c56e0-ca0b-8c77-7b5e-147add078943'
        },
        {
          'section': 'relationships',
          'subsection': 'review',
          'code': 'location.toggleablelocation.required',
          'valid': true,
          'uid': 'Birthplace-35e097ba-1393-25a9-aca9-588cd5bf6599'
        },
        {
          'section': 'relationships',
          'subsection': 'review',
          'code': 'location.required',
          'valid': true,
          'uid': 'undefined-cceaaf69-0489-0ea6-61b8-abb6f2224ef4'
        },
        {
          'section': 'relationships',
          'subsection': 'review',
          'code': 'location.toggleablelocation.city.required',
          'valid': true,
          'uid': 'city-552eeefd-d0cb-ca10-0fa8-4d1c98d33792'
        },
        {
          'section': 'relationships',
          'subsection': 'review',
          'code': 'location.toggleablelocation.city.length',
          'valid': true,
          'uid': 'city-552eeefd-d0cb-ca10-0fa8-4d1c98d33792'
        },
        {
          'section': 'relationships',
          'subsection': 'review',
          'code': 'location.toggleablelocation.city.pattern',
          'valid': true,
          'uid': 'city-552eeefd-d0cb-ca10-0fa8-4d1c98d33792'
        },
        {
          'section': 'relationships',
          'subsection': 'review',
          'code': 'required',
          'valid': true,
          'uid': 'undefined-b6094de8-c61d-a10a-794f-ea2cd223b0f8'
        },
        {
          'section': 'relationships',
          'subsection': 'review',
          'code': 'required',
          'valid': true,
          'uid': 'undefined-7b31eb9e-32d1-af39-59aa-cd334b43a88a'
        },
        {
          'section': 'relationships',
          'subsection': 'review',
          'code': 'required',
          'valid': true,
          'uid': 'undefined-4335ff0e-0432-afc9-abb4-f5f1800104df'
        },
        {
          'section': 'relationships',
          'subsection': 'review',
          'code': 'location.address.street.required',
          'valid': true,
          'uid': 'address-08e5e887-30e2-926b-a093-438b219791e0'
        },
        {
          'section': 'relationships',
          'subsection': 'review',
          'code': 'location.address.street.length',
          'valid': true,
          'uid': 'address-08e5e887-30e2-926b-a093-438b219791e0'
        },
        {
          'section': 'relationships',
          'subsection': 'review',
          'code': 'location.address.street.pattern',
          'valid': true,
          'uid': 'address-08e5e887-30e2-926b-a093-438b219791e0'
        },
        {
          'section': 'relationships',
          'subsection': 'review',
          'code': 'location.address.required',
          'valid': true,
          'uid': 'Address-ebbb2abb-d045-4e50-d521-684f1e138a68'
        },
        {
          'section': 'relationships',
          'subsection': 'review',
          'code': 'location.address.street.required',
          'valid': true,
          'uid': 'street2-2b063e44-4555-1610-18d0-b8852ec028a7'
        },
        {
          'section': 'relationships',
          'subsection': 'review',
          'code': 'location.address.street.length',
          'valid': null,
          'uid': 'street2-2b063e44-4555-1610-18d0-b8852ec028a7'
        },
        {
          'section': 'relationships',
          'subsection': 'review',
          'code': 'location.address.street.pattern',
          'valid': null,
          'uid': 'street2-2b063e44-4555-1610-18d0-b8852ec028a7'
        },
        {
          'section': 'relationships',
          'subsection': 'review',
          'code': 'location.address.city.required',
          'valid': true,
          'uid': 'city-964642ac-4944-f2bb-2a95-cf3437e9d04c'
        },
        {
          'section': 'relationships',
          'subsection': 'review',
          'code': 'location.address.city.length',
          'valid': true,
          'uid': 'city-964642ac-4944-f2bb-2a95-cf3437e9d04c'
        },
        {
          'section': 'relationships',
          'subsection': 'review',
          'code': 'location.address.city.pattern',
          'valid': true,
          'uid': 'city-964642ac-4944-f2bb-2a95-cf3437e9d04c'
        },
        {
          'section': 'relationships',
          'subsection': 'review',
          'code': 'location.address.zipcode.required',
          'valid': true,
          'uid': 'zipcode-28ac8708-29da-5d22-0841-efc35217f717'
        },
        {
          'section': 'relationships',
          'subsection': 'review',
          'code': 'location.address.zipcode.length',
          'valid': true,
          'uid': 'zipcode-28ac8708-29da-5d22-0841-efc35217f717'
        },
        {
          'section': 'relationships',
          'subsection': 'review',
          'code': 'location.address.zipcode.pattern',
          'valid': true,
          'uid': 'zipcode-28ac8708-29da-5d22-0841-efc35217f717'
        },
        {
          'section': 'relationships',
          'subsection': 'review',
          'code': 'required',
          'valid': true,
          'uid': 'undefined-dded116f-8314-fcba-c86c-8266a361d03a'
        },
        {
          'section': 'relationships',
          'subsection': 'review',
          'code': 'name.required',
          'valid': true,
          'uid': 'Name-4f75ed57-e5d6-6a9f-4c04-bcb6873e8eb6'
        },
        {
          'section': 'relationships',
          'subsection': 'review',
          'code': 'location.toggleablelocation.required',
          'valid': true,
          'uid': 'Birthplace-161c10a3-eb45-68b5-8184-4e793b2bb9dc'
        },
        {
          'section': 'relationships',
          'subsection': 'review',
          'code': 'location.required',
          'valid': true,
          'uid': 'undefined-7f3ecd02-547d-964c-659b-a2327770b580'
        },
        {
          'section': 'relationships',
          'subsection': 'review',
          'code': 'location.toggleablelocation.city.required',
          'valid': true,
          'uid': 'city-daaddab9-ff63-94b5-da0f-cda83f594794'
        },
        {
          'section': 'relationships',
          'subsection': 'review',
          'code': 'location.toggleablelocation.city.length',
          'valid': true,
          'uid': 'city-daaddab9-ff63-94b5-da0f-cda83f594794'
        },
        {
          'section': 'relationships',
          'subsection': 'review',
          'code': 'location.toggleablelocation.city.pattern',
          'valid': true,
          'uid': 'city-daaddab9-ff63-94b5-da0f-cda83f594794'
        },
        {
          'section': 'relationships',
          'subsection': 'review',
          'code': 'required',
          'valid': true,
          'uid': 'undefined-83ac0a80-6937-1164-e100-8fb8a26a9dad'
        },
        {
          'section': 'relationships',
          'subsection': 'review',
          'code': 'required',
          'valid': true,
          'uid': 'undefined-a830caae-23f1-4eda-a314-e9d90d4a9256'
        },
        {
          'section': 'relationships',
          'subsection': 'review',
          'code': 'location.address.street.required',
          'valid': true,
          'uid': 'address-80c40970-2e57-ddf8-318b-26b4ba26ddd8'
        },
        {
          'section': 'relationships',
          'subsection': 'review',
          'code': 'location.address.street.length',
          'valid': true,
          'uid': 'address-80c40970-2e57-ddf8-318b-26b4ba26ddd8'
        },
        {
          'section': 'relationships',
          'subsection': 'review',
          'code': 'location.address.street.pattern',
          'valid': true,
          'uid': 'address-80c40970-2e57-ddf8-318b-26b4ba26ddd8'
        },
        {
          'section': 'relationships',
          'subsection': 'review',
          'code': 'location.address.required',
          'valid': true,
          'uid': 'Address-0c07f36f-9fe4-9520-2b6f-0e61ef7bd283'
        },
        {
          'section': 'relationships',
          'subsection': 'review',
          'code': 'location.address.street.required',
          'valid': true,
          'uid': 'street2-9b7a03f4-dd1f-ef5f-3b31-6ce4e1aaf5a9'
        },
        {
          'section': 'relationships',
          'subsection': 'review',
          'code': 'location.address.street.length',
          'valid': null,
          'uid': 'street2-9b7a03f4-dd1f-ef5f-3b31-6ce4e1aaf5a9'
        },
        {
          'section': 'relationships',
          'subsection': 'review',
          'code': 'location.address.street.pattern',
          'valid': null,
          'uid': 'street2-9b7a03f4-dd1f-ef5f-3b31-6ce4e1aaf5a9'
        },
        {
          'section': 'relationships',
          'subsection': 'review',
          'code': 'location.address.city.required',
          'valid': true,
          'uid': 'city-c9cd80fc-5f32-b60d-2cea-042b09e38a3b'
        },
        {
          'section': 'relationships',
          'subsection': 'review',
          'code': 'location.address.city.length',
          'valid': true,
          'uid': 'city-c9cd80fc-5f32-b60d-2cea-042b09e38a3b'
        },
        {
          'section': 'relationships',
          'subsection': 'review',
          'code': 'location.address.city.pattern',
          'valid': true,
          'uid': 'city-c9cd80fc-5f32-b60d-2cea-042b09e38a3b'
        },
        {
          'section': 'relationships',
          'subsection': 'review',
          'code': 'location.address.zipcode.required',
          'valid': true,
          'uid': 'zipcode-8b1187cc-b7c6-984e-b4f1-db3a27840787'
        },
        {
          'section': 'relationships',
          'subsection': 'review',
          'code': 'location.address.zipcode.length',
          'valid': true,
          'uid': 'zipcode-8b1187cc-b7c6-984e-b4f1-db3a27840787'
        },
        {
          'section': 'relationships',
          'subsection': 'review',
          'code': 'location.address.zipcode.pattern',
          'valid': true,
          'uid': 'zipcode-8b1187cc-b7c6-984e-b4f1-db3a27840787'
        },
        {
          'section': 'relationships',
          'subsection': 'review',
          'code': 'required',
          'valid': false,
          'uid': 'undefined-1b32a718-e8b5-a744-c1d6-7ef4a84d49b3'
        },
        {
          'section': 'relationships',
          'subsection': 'review',
          'code': 'required',
          'valid': false,
          'uid': 'ResidenceDocumentNumber-45d8f888-bc42-7fd7-fc17-597ec1ba19cc'
        },
        {
          'section': 'relationships',
          'subsection': 'review',
          'code': 'length',
          'valid': null,
          'uid': 'ResidenceDocumentNumber-45d8f888-bc42-7fd7-fc17-597ec1ba19cc'
        },
        {
          'section': 'relationships',
          'subsection': 'review',
          'code': 'pattern',
          'valid': null,
          'uid': 'ResidenceDocumentNumber-45d8f888-bc42-7fd7-fc17-597ec1ba19cc'
        },
        {
          'section': 'relationships',
          'subsection': 'review',
          'code': 'required',
          'valid': false,
          'uid': 'Employer-dca1ec08-f452-e419-a13f-465f98017758'
        },
        {
          'section': 'relationships',
          'subsection': 'review',
          'code': 'length',
          'valid': null,
          'uid': 'Employer-dca1ec08-f452-e419-a13f-465f98017758'
        },
        {
          'section': 'relationships',
          'subsection': 'review',
          'code': 'pattern',
          'valid': null,
          'uid': 'Employer-dca1ec08-f452-e419-a13f-465f98017758'
        },
        {
          'section': 'relationships',
          'subsection': 'review',
          'code': 'location.street.required',
          'valid': false,
          'uid': 'street-8f0792fb-6fd2-d572-e6bb-455193ca9f3c'
        },
        {
          'section': 'relationships',
          'subsection': 'review',
          'code': 'location.street.length',
          'valid': null,
          'uid': 'street-8f0792fb-6fd2-d572-e6bb-455193ca9f3c'
        },
        {
          'section': 'relationships',
          'subsection': 'review',
          'code': 'location.street.pattern',
          'valid': null,
          'uid': 'street-8f0792fb-6fd2-d572-e6bb-455193ca9f3c'
        },
        {
          'section': 'relationships',
          'subsection': 'review',
          'code': 'location.city.required',
          'valid': false,
          'uid': 'city-5a1ca18d-c580-dec6-6d41-5a18d3366fee'
        },
        {
          'section': 'relationships',
          'subsection': 'review',
          'code': 'location.city.length',
          'valid': null,
          'uid': 'city-5a1ca18d-c580-dec6-6d41-5a18d3366fee'
        },
        {
          'section': 'relationships',
          'subsection': 'review',
          'code': 'location.city.pattern',
          'valid': null,
          'uid': 'city-5a1ca18d-c580-dec6-6d41-5a18d3366fee'
        },
        {
          'section': 'relationships',
          'subsection': 'review',
          'code': 'required',
          'valid': false,
          'uid': 'undefined-171459c2-bcbe-2599-4514-e425949377ca'
        },
        {
          'section': 'relationships',
          'subsection': 'review',
          'code': 'required',
          'valid': true,
          'uid': 'undefined-9c79aa05-5ae3-25d8-30a6-cdb46c2fc640'
        },
        {
          'section': 'relationships',
          'subsection': 'review',
          'code': 'daterange.required',
          'valid': true,
          'uid': 'Dates-85096b1e-a6f5-bac1-962e-3cd868a8eb57'
        },
        {
          'section': 'relationships',
          'subsection': 'review',
          'code': 'daterange.order',
          'valid': true,
          'uid': 'Dates-85096b1e-a6f5-bac1-962e-3cd868a8eb57'
        },
        {
          'section': 'relationships',
          'subsection': 'review',
          'code': 'location.address.state.required',
          'valid': true,
          'uid': 'state-020d7168-78dc-6739-d7bc-b5bac6c501eb'
        },
        {
          'section': 'relationships',
          'subsection': 'review',
          'code': 'location.address.state.notfound',
          'valid': true,
          'uid': 'state-020d7168-78dc-6739-d7bc-b5bac6c501eb'
        },
        {
          'section': 'relationships',
          'subsection': 'review',
          'code': 'daterange.required',
          'valid': true,
          'uid': 'Dates-5047adff-79f9-86a9-7b1f-1c5cb00c395a'
        },
        {
          'section': 'relationships',
          'subsection': 'review',
          'code': 'daterange.order',
          'valid': true,
          'uid': 'Dates-5047adff-79f9-86a9-7b1f-1c5cb00c395a'
        },
        {
          'section': 'relationships',
          'subsection': 'review',
          'code': 'location.address.state.required',
          'valid': true,
          'uid': 'state-62daae82-c56c-3ae0-b00d-ae320c004f30'
        },
        {
          'section': 'relationships',
          'subsection': 'review',
          'code': 'location.address.state.notfound',
          'valid': true,
          'uid': 'state-62daae82-c56c-3ae0-b00d-ae320c004f30'
        },
        {
          'section': 'relationships',
          'subsection': 'review',
          'code': 'daterange.required',
          'valid': true,
          'uid': 'Dates-6a830ff0-a806-bfbf-5257-616076b1745a'
        },
        {
          'section': 'relationships',
          'subsection': 'review',
          'code': 'daterange.order',
          'valid': true,
          'uid': 'Dates-6a830ff0-a806-bfbf-5257-616076b1745a'
        },
        {
          'section': 'relationships',
          'subsection': 'review',
          'code': 'location.address.state.required',
          'valid': true,
          'uid': 'state-5ed9e255-1313-4123-6407-a4e26aa063cf'
        },
        {
          'section': 'relationships',
          'subsection': 'review',
          'code': 'location.address.state.notfound',
          'valid': true,
          'uid': 'state-5ed9e255-1313-4123-6407-a4e26aa063cf'
        },
        {
          'section': 'relationships',
          'subsection': 'review',
          'code': 'location.toggleablelocation.state.required',
          'valid': true,
          'uid': 'state-95c7e65a-4502-723d-c13c-17205441101a'
        },
        {
          'section': 'relationships',
          'subsection': 'review',
          'code': 'location.toggleablelocation.state.notfound',
          'valid': true,
          'uid': 'state-95c7e65a-4502-723d-c13c-17205441101a'
        },
        {
          'section': 'relationships',
          'subsection': 'review',
          'code': 'country.required',
          'valid': false,
          'uid': 'Citizenship-956722e1-ee00-39e7-5371-baa3e5f98dd7'
        },
        {
          'section': 'relationships',
          'subsection': 'review',
          'code': 'country.notfound',
          'valid': null,
          'uid': 'Citizenship-956722e1-ee00-39e7-5371-baa3e5f98dd7'
        },
        {
          'section': 'relationships',
          'subsection': 'review',
          'code': 'location.address.state.required',
          'valid': true,
          'uid': 'state-cebf15b3-e2e9-f1ea-d5c1-23c15fdb32c8'
        },
        {
          'section': 'relationships',
          'subsection': 'review',
          'code': 'location.address.state.notfound',
          'valid': true,
          'uid': 'state-cebf15b3-e2e9-f1ea-d5c1-23c15fdb32c8'
        },
        {
          'section': 'relationships',
          'subsection': 'review',
          'code': 'location.toggleablelocation.state.required',
          'valid': true,
          'uid': 'state-349f49a1-308a-d49e-cc8f-b862a992f9ac'
        },
        {
          'section': 'relationships',
          'subsection': 'review',
          'code': 'location.toggleablelocation.state.notfound',
          'valid': true,
          'uid': 'state-349f49a1-308a-d49e-cc8f-b862a992f9ac'
        },
        {
          'section': 'relationships',
          'subsection': 'review',
          'code': 'country.required',
          'valid': false,
          'uid': 'Citizenship-d6c68196-c592-a80e-971a-f1c9db5d069f'
        },
        {
          'section': 'relationships',
          'subsection': 'review',
          'code': 'country.notfound',
          'valid': null,
          'uid': 'Citizenship-d6c68196-c592-a80e-971a-f1c9db5d069f'
        },
        {
          'section': 'relationships',
          'subsection': 'review',
          'code': 'location.address.state.required',
          'valid': true,
          'uid': 'state-88da9c5e-a597-8313-0384-3a0d57ae5514'
        },
        {
          'section': 'relationships',
          'subsection': 'review',
          'code': 'location.address.state.notfound',
          'valid': true,
          'uid': 'state-88da9c5e-a597-8313-0384-3a0d57ae5514'
        },
        {
          'section': 'relationships',
          'subsection': 'review',
          'code': 'date.month.required',
          'valid': true,
          'uid': 'month-5f0c66b0-9c4c-be65-43b4-e9f5706a209e'
        },
        {
          'section': 'relationships',
          'subsection': 'review',
          'code': 'date.month.length',
          'valid': true,
          'uid': 'month-5f0c66b0-9c4c-be65-43b4-e9f5706a209e'
        },
        {
          'section': 'relationships',
          'subsection': 'review',
          'code': 'date.month.pattern',
          'valid': true,
          'uid': 'month-5f0c66b0-9c4c-be65-43b4-e9f5706a209e'
        },
        {
          'section': 'relationships',
          'subsection': 'review',
          'code': 'date.month.min',
          'valid': true,
          'uid': 'month-d433b094-aa10-59a5-fc48-607cd5ebc38b'
        },
        {
          'section': 'relationships',
          'subsection': 'review',
          'code': 'date.month.max',
          'valid': true,
          'uid': 'month-d433b094-aa10-59a5-fc48-607cd5ebc38b'
        },
        {
          'section': 'relationships',
          'subsection': 'review',
          'code': 'date.required',
          'valid': true,
          'uid': 'Birthdate-86be4d95-f76d-2c06-f353-cd1b335d3a0f'
        },
        {
          'section': 'relationships',
          'subsection': 'review',
          'code': 'date.max',
          'valid': true,
          'uid': 'Birthdate-86be4d95-f76d-2c06-f353-cd1b335d3a0f'
        },
        {
          'section': 'relationships',
          'subsection': 'review',
          'code': 'date.min',
          'valid': true,
          'uid': 'Birthdate-86be4d95-f76d-2c06-f353-cd1b335d3a0f'
        },
        {
          'section': 'relationships',
          'subsection': 'review',
          'code': 'date.day.required',
          'valid': true,
          'uid': 'day-14100b5b-b6e0-8617-d988-c41826144267'
        },
        {
          'section': 'relationships',
          'subsection': 'review',
          'code': 'date.day.length',
          'valid': true,
          'uid': 'day-14100b5b-b6e0-8617-d988-c41826144267'
        },
        {
          'section': 'relationships',
          'subsection': 'review',
          'code': 'date.day.pattern',
          'valid': true,
          'uid': 'day-14100b5b-b6e0-8617-d988-c41826144267'
        },
        {
          'section': 'relationships',
          'subsection': 'review',
          'code': 'date.day.min',
          'valid': true,
          'uid': 'day-2164a526-fd74-c1bf-9fcf-8c2038b7e7a2'
        },
        {
          'section': 'relationships',
          'subsection': 'review',
          'code': 'date.day.max',
          'valid': true,
          'uid': 'day-2164a526-fd74-c1bf-9fcf-8c2038b7e7a2'
        },
        {
          'section': 'relationships',
          'subsection': 'review',
          'code': 'date.year.required',
          'valid': true,
          'uid': 'year-76b28df1-f74b-a986-7501-11381add90b5'
        },
        {
          'section': 'relationships',
          'subsection': 'review',
          'code': 'date.year.length',
          'valid': true,
          'uid': 'year-76b28df1-f74b-a986-7501-11381add90b5'
        },
        {
          'section': 'relationships',
          'subsection': 'review',
          'code': 'date.year.pattern',
          'valid': true,
          'uid': 'year-76b28df1-f74b-a986-7501-11381add90b5'
        },
        {
          'section': 'relationships',
          'subsection': 'review',
          'code': 'date.year.min',
          'valid': true,
          'uid': 'year-69b66120-8ac7-c434-9b64-8e10783514af'
        },
        {
          'section': 'relationships',
          'subsection': 'review',
          'code': 'date.year.max',
          'valid': true,
          'uid': 'year-69b66120-8ac7-c434-9b64-8e10783514af'
        },
        {
          'section': 'relationships',
          'subsection': 'review',
          'code': 'date.month.required',
          'valid': true,
          'uid': 'month-1466fc64-a7b8-05b4-0dd3-155f8bb08908'
        },
        {
          'section': 'relationships',
          'subsection': 'review',
          'code': 'date.month.length',
          'valid': true,
          'uid': 'month-1466fc64-a7b8-05b4-0dd3-155f8bb08908'
        },
        {
          'section': 'relationships',
          'subsection': 'review',
          'code': 'date.month.pattern',
          'valid': true,
          'uid': 'month-1466fc64-a7b8-05b4-0dd3-155f8bb08908'
        },
        {
          'section': 'relationships',
          'subsection': 'review',
          'code': 'date.month.min',
          'valid': true,
          'uid': 'month-375aa04d-7c2a-3f15-3770-eb27f3e9c2b3'
        },
        {
          'section': 'relationships',
          'subsection': 'review',
          'code': 'date.month.max',
          'valid': true,
          'uid': 'month-375aa04d-7c2a-3f15-3770-eb27f3e9c2b3'
        },
        {
          'section': 'relationships',
          'subsection': 'review',
          'code': 'date.required',
          'valid': true,
          'uid': 'Birthdate-308099a4-98ae-fe3f-e91c-568e4a49c51a'
        },
        {
          'section': 'relationships',
          'subsection': 'review',
          'code': 'date.max',
          'valid': true,
          'uid': 'Birthdate-308099a4-98ae-fe3f-e91c-568e4a49c51a'
        },
        {
          'section': 'relationships',
          'subsection': 'review',
          'code': 'date.min',
          'valid': true,
          'uid': 'Birthdate-308099a4-98ae-fe3f-e91c-568e4a49c51a'
        },
        {
          'section': 'relationships',
          'subsection': 'review',
          'code': 'date.day.required',
          'valid': true,
          'uid': 'day-6da56a50-8f2b-0a3a-9b6e-c9f35d42e41e'
        },
        {
          'section': 'relationships',
          'subsection': 'review',
          'code': 'date.day.length',
          'valid': true,
          'uid': 'day-6da56a50-8f2b-0a3a-9b6e-c9f35d42e41e'
        },
        {
          'section': 'relationships',
          'subsection': 'review',
          'code': 'date.day.pattern',
          'valid': true,
          'uid': 'day-6da56a50-8f2b-0a3a-9b6e-c9f35d42e41e'
        },
        {
          'section': 'relationships',
          'subsection': 'review',
          'code': 'date.day.min',
          'valid': true,
          'uid': 'day-45336489-761c-7869-09db-18bd76659929'
        },
        {
          'section': 'relationships',
          'subsection': 'review',
          'code': 'date.day.max',
          'valid': true,
          'uid': 'day-45336489-761c-7869-09db-18bd76659929'
        },
        {
          'section': 'relationships',
          'subsection': 'review',
          'code': 'date.year.required',
          'valid': true,
          'uid': 'year-29aa8495-86fc-a1fe-5b20-611626f7a60b'
        },
        {
          'section': 'relationships',
          'subsection': 'review',
          'code': 'date.year.length',
          'valid': true,
          'uid': 'year-29aa8495-86fc-a1fe-5b20-611626f7a60b'
        },
        {
          'section': 'relationships',
          'subsection': 'review',
          'code': 'date.year.pattern',
          'valid': true,
          'uid': 'year-29aa8495-86fc-a1fe-5b20-611626f7a60b'
        },
        {
          'section': 'relationships',
          'subsection': 'review',
          'code': 'date.year.min',
          'valid': true,
          'uid': 'year-4275d790-b8a2-798b-9246-60d09517a45e'
        },
        {
          'section': 'relationships',
          'subsection': 'review',
          'code': 'date.year.max',
          'valid': true,
          'uid': 'year-4275d790-b8a2-798b-9246-60d09517a45e'
        },
        {
          'section': 'relationships',
          'subsection': 'review',
          'code': 'date.month.required',
          'valid': false,
          'uid': 'month-70ab7544-4e12-4a96-1e24-5b1ffc313fc5'
        },
        {
          'section': 'relationships',
          'subsection': 'review',
          'code': 'date.month.length',
          'valid': null,
          'uid': 'month-70ab7544-4e12-4a96-1e24-5b1ffc313fc5'
        },
        {
          'section': 'relationships',
          'subsection': 'review',
          'code': 'date.month.pattern',
          'valid': null,
          'uid': 'month-70ab7544-4e12-4a96-1e24-5b1ffc313fc5'
        },
        {
          'section': 'relationships',
          'subsection': 'review',
          'code': 'date.month.min',
          'valid': null,
          'uid': 'month-c7013da9-250f-a894-62d0-ce067a0fa6c8'
        },
        {
          'section': 'relationships',
          'subsection': 'review',
          'code': 'date.month.max',
          'valid': null,
          'uid': 'month-c7013da9-250f-a894-62d0-ce067a0fa6c8'
        },
        {
          'section': 'relationships',
          'subsection': 'review',
          'code': 'date.required',
          'valid': false,
          'uid': 'Expiration-bbb98afa-b27f-128a-7af8-4781a4e80ad7'
        },
        {
          'section': 'relationships',
          'subsection': 'review',
          'code': 'date.max',
          'valid': null,
          'uid': 'Expiration-bbb98afa-b27f-128a-7af8-4781a4e80ad7'
        },
        {
          'section': 'relationships',
          'subsection': 'review',
          'code': 'date.min',
          'valid': null,
          'uid': 'Expiration-bbb98afa-b27f-128a-7af8-4781a4e80ad7'
        },
        {
          'section': 'relationships',
          'subsection': 'review',
          'code': 'date.day.required',
          'valid': false,
          'uid': 'day-9968e87c-2ea7-735c-7769-dda7b7bedb45'
        },
        {
          'section': 'relationships',
          'subsection': 'review',
          'code': 'date.day.length',
          'valid': null,
          'uid': 'day-9968e87c-2ea7-735c-7769-dda7b7bedb45'
        },
        {
          'section': 'relationships',
          'subsection': 'review',
          'code': 'date.day.pattern',
          'valid': null,
          'uid': 'day-9968e87c-2ea7-735c-7769-dda7b7bedb45'
        },
        {
          'section': 'relationships',
          'subsection': 'review',
          'code': 'date.day.min',
          'valid': null,
          'uid': 'day-b6f825fd-9d5c-e041-34e1-7da2c04121d5'
        },
        {
          'section': 'relationships',
          'subsection': 'review',
          'code': 'date.day.max',
          'valid': null,
          'uid': 'day-b6f825fd-9d5c-e041-34e1-7da2c04121d5'
        },
        {
          'section': 'relationships',
          'subsection': 'review',
          'code': 'date.year.required',
          'valid': false,
          'uid': 'year-7d071550-2ee7-e5a2-a55c-91fb67960dab'
        },
        {
          'section': 'relationships',
          'subsection': 'review',
          'code': 'date.year.length',
          'valid': null,
          'uid': 'year-7d071550-2ee7-e5a2-a55c-91fb67960dab'
        },
        {
          'section': 'relationships',
          'subsection': 'review',
          'code': 'date.year.pattern',
          'valid': null,
          'uid': 'year-7d071550-2ee7-e5a2-a55c-91fb67960dab'
        },
        {
          'section': 'relationships',
          'subsection': 'review',
          'code': 'date.year.min',
          'valid': null,
          'uid': 'year-5cb88fa5-cf42-8722-dfbf-8890d0ebb685'
        },
        {
          'section': 'relationships',
          'subsection': 'review',
          'code': 'date.year.max',
          'valid': null,
          'uid': 'year-5cb88fa5-cf42-8722-dfbf-8890d0ebb685'
        },
        {
          'section': 'relationships',
          'subsection': 'review',
          'code': 'daterange.from.month.required',
          'valid': true,
          'uid': 'month-b4e0fac8-292e-ca86-a2b7-b472aacf36be'
        },
        {
          'section': 'relationships',
          'subsection': 'review',
          'code': 'daterange.from.month.length',
          'valid': true,
          'uid': 'month-b4e0fac8-292e-ca86-a2b7-b472aacf36be'
        },
        {
          'section': 'relationships',
          'subsection': 'review',
          'code': 'daterange.from.month.pattern',
          'valid': true,
          'uid': 'month-b4e0fac8-292e-ca86-a2b7-b472aacf36be'
        },
        {
          'section': 'relationships',
          'subsection': 'review',
          'code': 'daterange.from.month.min',
          'valid': true,
          'uid': 'month-9ac37364-e69d-012c-e090-c91a816484aa'
        },
        {
          'section': 'relationships',
          'subsection': 'review',
          'code': 'daterange.from.month.max',
          'valid': true,
          'uid': 'month-9ac37364-e69d-012c-e090-c91a816484aa'
        },
        {
          'section': 'relationships',
          'subsection': 'review',
          'code': 'daterange.from.required',
          'valid': true,
          'uid': 'from-a0f13ebd-07aa-55d2-ec14-af5aa37a2654'
        },
        {
          'section': 'relationships',
          'subsection': 'review',
          'code': 'daterange.from.max',
          'valid': true,
          'uid': 'from-a0f13ebd-07aa-55d2-ec14-af5aa37a2654'
        },
        {
          'section': 'relationships',
          'subsection': 'review',
          'code': 'daterange.from.min',
          'valid': true,
          'uid': 'from-a0f13ebd-07aa-55d2-ec14-af5aa37a2654'
        },
        {
          'section': 'relationships',
          'subsection': 'review',
          'code': 'daterange.from.day.required',
          'valid': true,
          'uid': 'day-8bfa4f1a-e7ca-5ca2-605d-8eee568e21cc'
        },
        {
          'section': 'relationships',
          'subsection': 'review',
          'code': 'daterange.from.day.length',
          'valid': true,
          'uid': 'day-8bfa4f1a-e7ca-5ca2-605d-8eee568e21cc'
        },
        {
          'section': 'relationships',
          'subsection': 'review',
          'code': 'daterange.from.day.pattern',
          'valid': true,
          'uid': 'day-8bfa4f1a-e7ca-5ca2-605d-8eee568e21cc'
        },
        {
          'section': 'relationships',
          'subsection': 'review',
          'code': 'daterange.from.day.min',
          'valid': true,
          'uid': 'day-548e146f-6a4b-146b-7a61-0c494a522cca'
        },
        {
          'section': 'relationships',
          'subsection': 'review',
          'code': 'daterange.from.day.max',
          'valid': true,
          'uid': 'day-548e146f-6a4b-146b-7a61-0c494a522cca'
        },
        {
          'section': 'relationships',
          'subsection': 'review',
          'code': 'daterange.from.year.required',
          'valid': true,
          'uid': 'year-d750ffe8-ec00-cfda-de8a-b1e8249dd7e4'
        },
        {
          'section': 'relationships',
          'subsection': 'review',
          'code': 'daterange.from.year.length',
          'valid': true,
          'uid': 'year-d750ffe8-ec00-cfda-de8a-b1e8249dd7e4'
        },
        {
          'section': 'relationships',
          'subsection': 'review',
          'code': 'daterange.from.year.pattern',
          'valid': true,
          'uid': 'year-d750ffe8-ec00-cfda-de8a-b1e8249dd7e4'
        },
        {
          'section': 'relationships',
          'subsection': 'review',
          'code': 'daterange.from.year.min',
          'valid': true,
          'uid': 'year-9d9af578-41e1-9ef8-7c97-725db572f8c1'
        },
        {
          'section': 'relationships',
          'subsection': 'review',
          'code': 'daterange.from.year.max',
          'valid': true,
          'uid': 'year-9d9af578-41e1-9ef8-7c97-725db572f8c1'
        },
        {
          'section': 'relationships',
          'subsection': 'review',
          'code': 'daterange.to.month.required',
          'valid': true,
          'uid': 'month-b72cb067-128c-d234-cfb6-ed1a01044e13'
        },
        {
          'section': 'relationships',
          'subsection': 'review',
          'code': 'daterange.to.month.length',
          'valid': true,
          'uid': 'month-b72cb067-128c-d234-cfb6-ed1a01044e13'
        },
        {
          'section': 'relationships',
          'subsection': 'review',
          'code': 'daterange.to.month.pattern',
          'valid': true,
          'uid': 'month-b72cb067-128c-d234-cfb6-ed1a01044e13'
        },
        {
          'section': 'relationships',
          'subsection': 'review',
          'code': 'daterange.to.month.min',
          'valid': true,
          'uid': 'month-42d1f5ea-638b-123e-6b5b-66eb6d3892b9'
        },
        {
          'section': 'relationships',
          'subsection': 'review',
          'code': 'daterange.to.month.max',
          'valid': true,
          'uid': 'month-42d1f5ea-638b-123e-6b5b-66eb6d3892b9'
        },
        {
          'section': 'relationships',
          'subsection': 'review',
          'code': 'daterange.to.required',
          'valid': true,
          'uid': 'to-6cbdca71-81bc-c9d8-5e14-727a74af2dcb'
        },
        {
          'section': 'relationships',
          'subsection': 'review',
          'code': 'daterange.to.max',
          'valid': true,
          'uid': 'to-6cbdca71-81bc-c9d8-5e14-727a74af2dcb'
        },
        {
          'section': 'relationships',
          'subsection': 'review',
          'code': 'daterange.to.min',
          'valid': true,
          'uid': 'to-6cbdca71-81bc-c9d8-5e14-727a74af2dcb'
        },
        {
          'section': 'relationships',
          'subsection': 'review',
          'code': 'daterange.to.day.required',
          'valid': true,
          'uid': 'day-eb64ba86-335b-7578-3687-480b23f2df37'
        },
        {
          'section': 'relationships',
          'subsection': 'review',
          'code': 'daterange.to.day.length',
          'valid': true,
          'uid': 'day-eb64ba86-335b-7578-3687-480b23f2df37'
        },
        {
          'section': 'relationships',
          'subsection': 'review',
          'code': 'daterange.to.day.pattern',
          'valid': true,
          'uid': 'day-eb64ba86-335b-7578-3687-480b23f2df37'
        },
        {
          'section': 'relationships',
          'subsection': 'review',
          'code': 'daterange.to.day.min',
          'valid': true,
          'uid': 'day-59349b77-f56d-f2f0-5916-964c4efc8b5c'
        },
        {
          'section': 'relationships',
          'subsection': 'review',
          'code': 'daterange.to.day.max',
          'valid': true,
          'uid': 'day-59349b77-f56d-f2f0-5916-964c4efc8b5c'
        },
        {
          'section': 'relationships',
          'subsection': 'review',
          'code': 'daterange.to.year.required',
          'valid': true,
          'uid': 'year-06656e00-3f97-cf78-af4c-965f45b7be14'
        },
        {
          'section': 'relationships',
          'subsection': 'review',
          'code': 'daterange.to.year.length',
          'valid': true,
          'uid': 'year-06656e00-3f97-cf78-af4c-965f45b7be14'
        },
        {
          'section': 'relationships',
          'subsection': 'review',
          'code': 'daterange.to.year.pattern',
          'valid': true,
          'uid': 'year-06656e00-3f97-cf78-af4c-965f45b7be14'
        },
        {
          'section': 'relationships',
          'subsection': 'review',
          'code': 'daterange.to.year.min',
          'valid': true,
          'uid': 'year-fd7b2acc-cbe2-f501-82aa-7c832cf9575f'
        },
        {
          'section': 'relationships',
          'subsection': 'review',
          'code': 'daterange.to.year.max',
          'valid': true,
          'uid': 'year-fd7b2acc-cbe2-f501-82aa-7c832cf9575f'
        },
        {
          'section': 'relationships',
          'subsection': 'review',
          'code': 'daterange.from.month.required',
          'valid': true,
          'uid': 'month-f5454f10-e8e6-fccc-9497-63e282e31b6b'
        },
        {
          'section': 'relationships',
          'subsection': 'review',
          'code': 'daterange.from.month.length',
          'valid': true,
          'uid': 'month-f5454f10-e8e6-fccc-9497-63e282e31b6b'
        },
        {
          'section': 'relationships',
          'subsection': 'review',
          'code': 'daterange.from.month.pattern',
          'valid': true,
          'uid': 'month-f5454f10-e8e6-fccc-9497-63e282e31b6b'
        },
        {
          'section': 'relationships',
          'subsection': 'review',
          'code': 'daterange.from.month.min',
          'valid': true,
          'uid': 'month-4deef0c2-61d2-902a-3b42-d7ed0be4ac8d'
        },
        {
          'section': 'relationships',
          'subsection': 'review',
          'code': 'daterange.from.month.max',
          'valid': true,
          'uid': 'month-4deef0c2-61d2-902a-3b42-d7ed0be4ac8d'
        },
        {
          'section': 'relationships',
          'subsection': 'review',
          'code': 'daterange.from.required',
          'valid': true,
          'uid': 'from-a08458ba-30e6-d6a8-3eb0-c55924c19ab5'
        },
        {
          'section': 'relationships',
          'subsection': 'review',
          'code': 'daterange.from.max',
          'valid': true,
          'uid': 'from-a08458ba-30e6-d6a8-3eb0-c55924c19ab5'
        },
        {
          'section': 'relationships',
          'subsection': 'review',
          'code': 'daterange.from.min',
          'valid': true,
          'uid': 'from-a08458ba-30e6-d6a8-3eb0-c55924c19ab5'
        },
        {
          'section': 'relationships',
          'subsection': 'review',
          'code': 'daterange.from.day.required',
          'valid': true,
          'uid': 'day-d87e6ddc-780e-00a4-9ab2-94f48b0a0b6c'
        },
        {
          'section': 'relationships',
          'subsection': 'review',
          'code': 'daterange.from.day.length',
          'valid': true,
          'uid': 'day-d87e6ddc-780e-00a4-9ab2-94f48b0a0b6c'
        },
        {
          'section': 'relationships',
          'subsection': 'review',
          'code': 'daterange.from.day.pattern',
          'valid': true,
          'uid': 'day-d87e6ddc-780e-00a4-9ab2-94f48b0a0b6c'
        },
        {
          'section': 'relationships',
          'subsection': 'review',
          'code': 'daterange.from.day.min',
          'valid': true,
          'uid': 'day-2158ca11-e872-108f-a73b-b4ebc1d88232'
        },
        {
          'section': 'relationships',
          'subsection': 'review',
          'code': 'daterange.from.day.max',
          'valid': true,
          'uid': 'day-2158ca11-e872-108f-a73b-b4ebc1d88232'
        },
        {
          'section': 'relationships',
          'subsection': 'review',
          'code': 'daterange.from.year.required',
          'valid': true,
          'uid': 'year-db3a00f6-6d22-d71a-28d4-f86a14e75900'
        },
        {
          'section': 'relationships',
          'subsection': 'review',
          'code': 'daterange.from.year.length',
          'valid': true,
          'uid': 'year-db3a00f6-6d22-d71a-28d4-f86a14e75900'
        },
        {
          'section': 'relationships',
          'subsection': 'review',
          'code': 'daterange.from.year.pattern',
          'valid': true,
          'uid': 'year-db3a00f6-6d22-d71a-28d4-f86a14e75900'
        },
        {
          'section': 'relationships',
          'subsection': 'review',
          'code': 'daterange.from.year.min',
          'valid': true,
          'uid': 'year-1dc45f72-1b83-72ec-86b4-ca09c94c8b32'
        },
        {
          'section': 'relationships',
          'subsection': 'review',
          'code': 'daterange.from.year.max',
          'valid': true,
          'uid': 'year-1dc45f72-1b83-72ec-86b4-ca09c94c8b32'
        },
        {
          'section': 'relationships',
          'subsection': 'review',
          'code': 'daterange.to.month.required',
          'valid': true,
          'uid': 'month-d001bd8c-6a6e-7635-9a61-89512572d98e'
        },
        {
          'section': 'relationships',
          'subsection': 'review',
          'code': 'daterange.to.month.length',
          'valid': true,
          'uid': 'month-d001bd8c-6a6e-7635-9a61-89512572d98e'
        },
        {
          'section': 'relationships',
          'subsection': 'review',
          'code': 'daterange.to.month.pattern',
          'valid': true,
          'uid': 'month-d001bd8c-6a6e-7635-9a61-89512572d98e'
        },
        {
          'section': 'relationships',
          'subsection': 'review',
          'code': 'daterange.to.month.min',
          'valid': true,
          'uid': 'month-c7153e2e-798b-880f-7b4d-0afafccbb818'
        },
        {
          'section': 'relationships',
          'subsection': 'review',
          'code': 'daterange.to.month.max',
          'valid': true,
          'uid': 'month-c7153e2e-798b-880f-7b4d-0afafccbb818'
        },
        {
          'section': 'relationships',
          'subsection': 'review',
          'code': 'daterange.to.required',
          'valid': true,
          'uid': 'to-60dfade9-cd9e-17d4-c966-e3e3cc99347c'
        },
        {
          'section': 'relationships',
          'subsection': 'review',
          'code': 'daterange.to.max',
          'valid': true,
          'uid': 'to-60dfade9-cd9e-17d4-c966-e3e3cc99347c'
        },
        {
          'section': 'relationships',
          'subsection': 'review',
          'code': 'daterange.to.min',
          'valid': true,
          'uid': 'to-60dfade9-cd9e-17d4-c966-e3e3cc99347c'
        },
        {
          'section': 'relationships',
          'subsection': 'review',
          'code': 'daterange.to.day.required',
          'valid': true,
          'uid': 'day-405b9e2e-7160-0ad0-2a93-e87718a559b6'
        },
        {
          'section': 'relationships',
          'subsection': 'review',
          'code': 'daterange.to.day.length',
          'valid': true,
          'uid': 'day-405b9e2e-7160-0ad0-2a93-e87718a559b6'
        },
        {
          'section': 'relationships',
          'subsection': 'review',
          'code': 'daterange.to.day.pattern',
          'valid': true,
          'uid': 'day-405b9e2e-7160-0ad0-2a93-e87718a559b6'
        },
        {
          'section': 'relationships',
          'subsection': 'review',
          'code': 'daterange.to.day.min',
          'valid': true,
          'uid': 'day-05106192-97d3-902a-7893-ec519dd3743e'
        },
        {
          'section': 'relationships',
          'subsection': 'review',
          'code': 'daterange.to.day.max',
          'valid': true,
          'uid': 'day-05106192-97d3-902a-7893-ec519dd3743e'
        },
        {
          'section': 'relationships',
          'subsection': 'review',
          'code': 'daterange.to.year.required',
          'valid': true,
          'uid': 'year-9437ec0c-c320-bede-ec23-a624e149433c'
        },
        {
          'section': 'relationships',
          'subsection': 'review',
          'code': 'daterange.to.year.length',
          'valid': true,
          'uid': 'year-9437ec0c-c320-bede-ec23-a624e149433c'
        },
        {
          'section': 'relationships',
          'subsection': 'review',
          'code': 'daterange.to.year.pattern',
          'valid': true,
          'uid': 'year-9437ec0c-c320-bede-ec23-a624e149433c'
        },
        {
          'section': 'relationships',
          'subsection': 'review',
          'code': 'daterange.to.year.min',
          'valid': true,
          'uid': 'year-731e5860-e9c0-ad73-5ee4-101d6ab72346'
        },
        {
          'section': 'relationships',
          'subsection': 'review',
          'code': 'daterange.to.year.max',
          'valid': true,
          'uid': 'year-731e5860-e9c0-ad73-5ee4-101d6ab72346'
        },
        {
          'section': 'relationships',
          'subsection': 'review',
          'code': 'daterange.from.month.required',
          'valid': true,
          'uid': 'month-f3adfe38-1363-4fb9-87dd-f760e0fb1c6c'
        },
        {
          'section': 'relationships',
          'subsection': 'review',
          'code': 'daterange.from.month.length',
          'valid': true,
          'uid': 'month-f3adfe38-1363-4fb9-87dd-f760e0fb1c6c'
        },
        {
          'section': 'relationships',
          'subsection': 'review',
          'code': 'daterange.from.month.pattern',
          'valid': true,
          'uid': 'month-f3adfe38-1363-4fb9-87dd-f760e0fb1c6c'
        },
        {
          'section': 'relationships',
          'subsection': 'review',
          'code': 'daterange.from.month.min',
          'valid': true,
          'uid': 'month-43a5b073-2607-9ca6-4892-81b1ab10a546'
        },
        {
          'section': 'relationships',
          'subsection': 'review',
          'code': 'daterange.from.month.max',
          'valid': true,
          'uid': 'month-43a5b073-2607-9ca6-4892-81b1ab10a546'
        },
        {
          'section': 'relationships',
          'subsection': 'review',
          'code': 'daterange.from.required',
          'valid': true,
          'uid': 'from-e6a85bc4-445f-2df3-216c-f590ccaa787c'
        },
        {
          'section': 'relationships',
          'subsection': 'review',
          'code': 'daterange.from.max',
          'valid': true,
          'uid': 'from-e6a85bc4-445f-2df3-216c-f590ccaa787c'
        },
        {
          'section': 'relationships',
          'subsection': 'review',
          'code': 'daterange.from.min',
          'valid': true,
          'uid': 'from-e6a85bc4-445f-2df3-216c-f590ccaa787c'
        },
        {
          'section': 'relationships',
          'subsection': 'review',
          'code': 'daterange.from.day.required',
          'valid': true,
          'uid': 'day-c02a24b4-40cb-0cf6-abfb-23e8a0218f60'
        },
        {
          'section': 'relationships',
          'subsection': 'review',
          'code': 'daterange.from.day.length',
          'valid': true,
          'uid': 'day-c02a24b4-40cb-0cf6-abfb-23e8a0218f60'
        },
        {
          'section': 'relationships',
          'subsection': 'review',
          'code': 'daterange.from.day.pattern',
          'valid': true,
          'uid': 'day-c02a24b4-40cb-0cf6-abfb-23e8a0218f60'
        },
        {
          'section': 'relationships',
          'subsection': 'review',
          'code': 'daterange.from.day.min',
          'valid': true,
          'uid': 'day-f3c1a531-c835-dadc-fa16-599e326b01a7'
        },
        {
          'section': 'relationships',
          'subsection': 'review',
          'code': 'daterange.from.day.max',
          'valid': true,
          'uid': 'day-f3c1a531-c835-dadc-fa16-599e326b01a7'
        },
        {
          'section': 'relationships',
          'subsection': 'review',
          'code': 'daterange.from.year.required',
          'valid': true,
          'uid': 'year-4047eb4c-983e-d84f-fa17-4741b9ff737b'
        },
        {
          'section': 'relationships',
          'subsection': 'review',
          'code': 'daterange.from.year.length',
          'valid': true,
          'uid': 'year-4047eb4c-983e-d84f-fa17-4741b9ff737b'
        },
        {
          'section': 'relationships',
          'subsection': 'review',
          'code': 'daterange.from.year.pattern',
          'valid': true,
          'uid': 'year-4047eb4c-983e-d84f-fa17-4741b9ff737b'
        },
        {
          'section': 'relationships',
          'subsection': 'review',
          'code': 'daterange.from.year.min',
          'valid': true,
          'uid': 'year-10b0388c-c25b-4e24-c086-5c6a5f4ce2eb'
        },
        {
          'section': 'relationships',
          'subsection': 'review',
          'code': 'daterange.from.year.max',
          'valid': true,
          'uid': 'year-10b0388c-c25b-4e24-c086-5c6a5f4ce2eb'
        },
        {
          'section': 'relationships',
          'subsection': 'review',
          'code': 'daterange.to.month.required',
          'valid': true,
          'uid': 'month-3616a7dc-6f4b-e56c-f9d8-9bca96fe9e63'
        },
        {
          'section': 'relationships',
          'subsection': 'review',
          'code': 'daterange.to.month.length',
          'valid': true,
          'uid': 'month-3616a7dc-6f4b-e56c-f9d8-9bca96fe9e63'
        },
        {
          'section': 'relationships',
          'subsection': 'review',
          'code': 'daterange.to.month.pattern',
          'valid': true,
          'uid': 'month-3616a7dc-6f4b-e56c-f9d8-9bca96fe9e63'
        },
        {
          'section': 'relationships',
          'subsection': 'review',
          'code': 'daterange.to.month.min',
          'valid': true,
          'uid': 'month-b5b64888-5fa5-1cb8-76ae-1e019efa0555'
        },
        {
          'section': 'relationships',
          'subsection': 'review',
          'code': 'daterange.to.month.max',
          'valid': true,
          'uid': 'month-b5b64888-5fa5-1cb8-76ae-1e019efa0555'
        },
        {
          'section': 'relationships',
          'subsection': 'review',
          'code': 'daterange.to.required',
          'valid': true,
          'uid': 'to-d98b0993-4f53-1c76-b941-ffad125461b0'
        },
        {
          'section': 'relationships',
          'subsection': 'review',
          'code': 'daterange.to.max',
          'valid': true,
          'uid': 'to-d98b0993-4f53-1c76-b941-ffad125461b0'
        },
        {
          'section': 'relationships',
          'subsection': 'review',
          'code': 'daterange.to.min',
          'valid': true,
          'uid': 'to-d98b0993-4f53-1c76-b941-ffad125461b0'
        },
        {
          'section': 'relationships',
          'subsection': 'review',
          'code': 'daterange.to.day.required',
          'valid': true,
          'uid': 'day-62a38b70-591a-fc41-f778-d22a1fabaee2'
        },
        {
          'section': 'relationships',
          'subsection': 'review',
          'code': 'daterange.to.day.length',
          'valid': true,
          'uid': 'day-62a38b70-591a-fc41-f778-d22a1fabaee2'
        },
        {
          'section': 'relationships',
          'subsection': 'review',
          'code': 'daterange.to.day.pattern',
          'valid': true,
          'uid': 'day-62a38b70-591a-fc41-f778-d22a1fabaee2'
        },
        {
          'section': 'relationships',
          'subsection': 'review',
          'code': 'daterange.to.day.min',
          'valid': true,
          'uid': 'day-c4992c54-398c-336d-6272-ca1d578a7f5c'
        },
        {
          'section': 'relationships',
          'subsection': 'review',
          'code': 'daterange.to.day.max',
          'valid': true,
          'uid': 'day-c4992c54-398c-336d-6272-ca1d578a7f5c'
        },
        {
          'section': 'relationships',
          'subsection': 'review',
          'code': 'daterange.to.year.required',
          'valid': true,
          'uid': 'year-1dc91985-13ea-474c-2107-ae7d52c57f1c'
        },
        {
          'section': 'relationships',
          'subsection': 'review',
          'code': 'daterange.to.year.length',
          'valid': true,
          'uid': 'year-1dc91985-13ea-474c-2107-ae7d52c57f1c'
        },
        {
          'section': 'relationships',
          'subsection': 'review',
          'code': 'daterange.to.year.pattern',
          'valid': true,
          'uid': 'year-1dc91985-13ea-474c-2107-ae7d52c57f1c'
        },
        {
          'section': 'relationships',
          'subsection': 'review',
          'code': 'daterange.to.year.min',
          'valid': true,
          'uid': 'year-52e1e72c-840a-33dd-5f8e-c28364419e30'
        },
        {
          'section': 'relationships',
          'subsection': 'review',
          'code': 'daterange.to.year.max',
          'valid': true,
          'uid': 'year-52e1e72c-840a-33dd-5f8e-c28364419e30'
        }
      ],
      'history': [
        {
          'section': 'history',
          'subsection': 'residence',
          'code': 'location.address.street.required',
          'valid': true,
          'uid': 'address-ce449c2e-2787-76c1-a0ee-f7f4bbc02efd'
        },
        {
          'section': 'history',
          'subsection': 'residence',
          'code': 'location.address.street.length',
          'valid': true,
          'uid': 'address-ce449c2e-2787-76c1-a0ee-f7f4bbc02efd'
        },
        {
          'section': 'history',
          'subsection': 'residence',
          'code': 'location.address.street.pattern',
          'valid': true,
          'uid': 'address-ce449c2e-2787-76c1-a0ee-f7f4bbc02efd'
        },
        {
          'section': 'history',
          'subsection': 'residence',
          'code': 'location.address.required',
          'valid': true,
          'uid': 'Address-34e4caf8-db13-166e-ba24-30d56fb9d313'
        },
        {
          'section': 'history',
          'subsection': 'residence',
          'code': 'location.address.street.required',
          'valid': true,
          'uid': 'street2-9008431f-b846-662d-b33d-c9022511534e'
        },
        {
          'section': 'history',
          'subsection': 'residence',
          'code': 'location.address.street.length',
          'valid': null,
          'uid': 'street2-9008431f-b846-662d-b33d-c9022511534e'
        },
        {
          'section': 'history',
          'subsection': 'residence',
          'code': 'location.address.street.pattern',
          'valid': null,
          'uid': 'street2-9008431f-b846-662d-b33d-c9022511534e'
        },
        {
          'section': 'history',
          'subsection': 'residence',
          'code': 'location.address.city.required',
          'valid': true,
          'uid': 'city-0c602125-468d-a027-d088-51172b628616'
        },
        {
          'section': 'history',
          'subsection': 'residence',
          'code': 'location.address.city.length',
          'valid': true,
          'uid': 'city-0c602125-468d-a027-d088-51172b628616'
        },
        {
          'section': 'history',
          'subsection': 'residence',
          'code': 'location.address.city.pattern',
          'valid': true,
          'uid': 'city-0c602125-468d-a027-d088-51172b628616'
        },
        {
          'section': 'history',
          'subsection': 'residence',
          'code': 'location.address.zipcode.required',
          'valid': true,
          'uid': 'zipcode-0bfc01c8-7a9d-66d9-9934-46aec40b9ba2'
        },
        {
          'section': 'history',
          'subsection': 'residence',
          'code': 'location.address.zipcode.length',
          'valid': true,
          'uid': 'zipcode-0bfc01c8-7a9d-66d9-9934-46aec40b9ba2'
        },
        {
          'section': 'history',
          'subsection': 'residence',
          'code': 'location.address.zipcode.pattern',
          'valid': true,
          'uid': 'zipcode-0bfc01c8-7a9d-66d9-9934-46aec40b9ba2'
        },
        {
          'section': 'history',
          'subsection': 'residence',
          'code': 'required',
          'valid': true,
          'uid': 'undefined-74e00860-529d-aec6-2f77-e376b7fd75a1'
        },
        {
          'section': 'history',
          'subsection': 'residence',
          'code': 'location.address.state.required',
          'valid': true,
          'uid': 'state-12bbb665-f2e1-ac3e-2c19-ecae3a50ee78'
        },
        {
          'section': 'history',
          'subsection': 'residence',
          'code': 'location.address.state.notfound',
          'valid': true,
          'uid': 'state-12bbb665-f2e1-ac3e-2c19-ecae3a50ee78'
        },
        {
          'section': 'history',
          'subsection': 'residence',
          'code': 'daterange.required',
          'valid': true,
          'uid': 'Dates-7ae79c78-8bd8-4ec3-bcb6-7f32f578fd5e'
        },
        {
          'section': 'history',
          'subsection': 'residence',
          'code': 'daterange.order',
          'valid': null,
          'uid': 'Dates-7ae79c78-8bd8-4ec3-bcb6-7f32f578fd5e'
        },
        {
          'section': 'history',
          'subsection': 'residence',
          'code': 'daterange.from.month.required',
          'valid': true,
          'uid': 'month-44b3d68c-8724-03e6-5e90-566d4759dadf'
        },
        {
          'section': 'history',
          'subsection': 'residence',
          'code': 'daterange.from.month.length',
          'valid': true,
          'uid': 'month-44b3d68c-8724-03e6-5e90-566d4759dadf'
        },
        {
          'section': 'history',
          'subsection': 'residence',
          'code': 'daterange.from.month.pattern',
          'valid': true,
          'uid': 'month-44b3d68c-8724-03e6-5e90-566d4759dadf'
        },
        {
          'section': 'history',
          'subsection': 'residence',
          'code': 'daterange.from.month.min',
          'valid': true,
          'uid': 'month-4b6e40fc-6e56-9d9d-0409-f08a4f9df705'
        },
        {
          'section': 'history',
          'subsection': 'residence',
          'code': 'daterange.from.month.max',
          'valid': true,
          'uid': 'month-4b6e40fc-6e56-9d9d-0409-f08a4f9df705'
        },
        {
          'section': 'history',
          'subsection': 'residence',
          'code': 'daterange.from.required',
          'valid': true,
          'uid': 'from-f0ee2ef9-eeeb-3290-8323-8ae070e18151'
        },
        {
          'section': 'history',
          'subsection': 'residence',
          'code': 'daterange.from.max',
          'valid': true,
          'uid': 'from-f0ee2ef9-eeeb-3290-8323-8ae070e18151'
        },
        {
          'section': 'history',
          'subsection': 'residence',
          'code': 'daterange.from.min',
          'valid': true,
          'uid': 'from-f0ee2ef9-eeeb-3290-8323-8ae070e18151'
        },
        {
          'section': 'history',
          'subsection': 'residence',
          'code': 'daterange.from.day.required',
          'valid': true,
          'uid': 'day-15a04660-ccb1-85fe-cdce-a7c70226cfbb'
        },
        {
          'section': 'history',
          'subsection': 'residence',
          'code': 'daterange.from.day.length',
          'valid': true,
          'uid': 'day-15a04660-ccb1-85fe-cdce-a7c70226cfbb'
        },
        {
          'section': 'history',
          'subsection': 'residence',
          'code': 'daterange.from.day.pattern',
          'valid': true,
          'uid': 'day-15a04660-ccb1-85fe-cdce-a7c70226cfbb'
        },
        {
          'section': 'history',
          'subsection': 'residence',
          'code': 'daterange.from.day.min',
          'valid': true,
          'uid': 'day-131512b8-2b93-3c2f-8854-bf5c2a1d3e46'
        },
        {
          'section': 'history',
          'subsection': 'residence',
          'code': 'daterange.from.day.max',
          'valid': true,
          'uid': 'day-131512b8-2b93-3c2f-8854-bf5c2a1d3e46'
        },
        {
          'section': 'history',
          'subsection': 'residence',
          'code': 'daterange.from.year.required',
          'valid': true,
          'uid': 'year-9e5ba100-0024-cb90-7678-29915be0f126'
        },
        {
          'section': 'history',
          'subsection': 'residence',
          'code': 'daterange.from.year.length',
          'valid': true,
          'uid': 'year-9e5ba100-0024-cb90-7678-29915be0f126'
        },
        {
          'section': 'history',
          'subsection': 'residence',
          'code': 'daterange.from.year.pattern',
          'valid': true,
          'uid': 'year-9e5ba100-0024-cb90-7678-29915be0f126'
        },
        {
          'section': 'history',
          'subsection': 'residence',
          'code': 'daterange.from.year.min',
          'valid': true,
          'uid': 'year-85955abf-20fe-b335-3962-93510a8dcd5b'
        },
        {
          'section': 'history',
          'subsection': 'residence',
          'code': 'daterange.from.year.max',
          'valid': true,
          'uid': 'year-85955abf-20fe-b335-3962-93510a8dcd5b'
        },
        {
          'section': 'history',
          'subsection': 'residence',
          'code': 'daterange.to.month.required',
          'valid': null,
          'uid': 'month-c59b578a-8fd8-160a-0e18-cfdeb8f8d359'
        },
        {
          'section': 'history',
          'subsection': 'residence',
          'code': 'daterange.to.month.length',
          'valid': null,
          'uid': 'month-c59b578a-8fd8-160a-0e18-cfdeb8f8d359'
        },
        {
          'section': 'history',
          'subsection': 'residence',
          'code': 'daterange.to.month.pattern',
          'valid': null,
          'uid': 'month-c59b578a-8fd8-160a-0e18-cfdeb8f8d359'
        },
        {
          'section': 'history',
          'subsection': 'residence',
          'code': 'daterange.to.month.min',
          'valid': null,
          'uid': 'month-247854ab-676d-ac77-d524-e28eccc8f40a'
        },
        {
          'section': 'history',
          'subsection': 'residence',
          'code': 'daterange.to.month.max',
          'valid': null,
          'uid': 'month-247854ab-676d-ac77-d524-e28eccc8f40a'
        },
        {
          'section': 'history',
          'subsection': 'residence',
          'code': 'daterange.to.required',
          'valid': null,
          'uid': 'to-59d3b2f4-f654-7edb-497f-e25b9d241c4c'
        },
        {
          'section': 'history',
          'subsection': 'residence',
          'code': 'daterange.to.max',
          'valid': null,
          'uid': 'to-59d3b2f4-f654-7edb-497f-e25b9d241c4c'
        },
        {
          'section': 'history',
          'subsection': 'residence',
          'code': 'daterange.to.min',
          'valid': null,
          'uid': 'to-59d3b2f4-f654-7edb-497f-e25b9d241c4c'
        },
        {
          'section': 'history',
          'subsection': 'residence',
          'code': 'daterange.to.day.required',
          'valid': null,
          'uid': 'day-5818fc9e-3395-1d21-3687-a175e7fad8a6'
        },
        {
          'section': 'history',
          'subsection': 'residence',
          'code': 'daterange.to.day.length',
          'valid': null,
          'uid': 'day-5818fc9e-3395-1d21-3687-a175e7fad8a6'
        },
        {
          'section': 'history',
          'subsection': 'residence',
          'code': 'daterange.to.day.pattern',
          'valid': null,
          'uid': 'day-5818fc9e-3395-1d21-3687-a175e7fad8a6'
        },
        {
          'section': 'history',
          'subsection': 'residence',
          'code': 'daterange.to.day.min',
          'valid': null,
          'uid': 'day-450245cd-f51e-c463-0841-a198a37d6c01'
        },
        {
          'section': 'history',
          'subsection': 'residence',
          'code': 'daterange.to.day.max',
          'valid': null,
          'uid': 'day-450245cd-f51e-c463-0841-a198a37d6c01'
        },
        {
          'section': 'history',
          'subsection': 'residence',
          'code': 'daterange.to.year.required',
          'valid': null,
          'uid': 'year-92f9a85d-08b8-df81-e9d2-635ca9428c11'
        },
        {
          'section': 'history',
          'subsection': 'residence',
          'code': 'daterange.to.year.length',
          'valid': null,
          'uid': 'year-92f9a85d-08b8-df81-e9d2-635ca9428c11'
        },
        {
          'section': 'history',
          'subsection': 'residence',
          'code': 'daterange.to.year.pattern',
          'valid': null,
          'uid': 'year-92f9a85d-08b8-df81-e9d2-635ca9428c11'
        },
        {
          'section': 'history',
          'subsection': 'residence',
          'code': 'daterange.to.year.min',
          'valid': null,
          'uid': 'year-756c4e7e-3c43-c28d-2ca6-f3f44b96341c'
        },
        {
          'section': 'history',
          'subsection': 'residence',
          'code': 'daterange.to.year.max',
          'valid': null,
          'uid': 'year-756c4e7e-3c43-c28d-2ca6-f3f44b96341c'
        },
        {
          'section': 'history',
          'subsection': 'residence',
          'code': 'name.required',
          'valid': true,
          'uid': 'FullName-674b80fa-2b8a-2e57-281f-55a08103ee4c'
        },
        {
          'section': 'history',
          'subsection': 'residence',
          'code': 'required',
          'valid': true,
          'uid': 'undefined-05968104-f897-af06-ba16-e616bd747dd3'
        },
        {
          'section': 'history',
          'subsection': 'residence',
          'code': 'telephone.domestic.first.required',
          'valid': true,
          'uid': 'domestic_first-c763c62f-37d1-12e9-084f-99793ce387f1'
        },
        {
          'section': 'history',
          'subsection': 'residence',
          'code': 'telephone.domestic.first.length',
          'valid': null,
          'uid': 'domestic_first-c763c62f-37d1-12e9-084f-99793ce387f1'
        },
        {
          'section': 'history',
          'subsection': 'residence',
          'code': 'telephone.domestic.first.pattern',
          'valid': null,
          'uid': 'domestic_first-c763c62f-37d1-12e9-084f-99793ce387f1'
        },
        {
          'section': 'history',
          'subsection': 'residence',
          'code': 'telephone.required',
          'valid': true,
          'uid': 'Phone-3331fb6e-3fae-3a08-f88c-43d4ef6e97c7'
        },
        {
          'section': 'history',
          'subsection': 'residence',
          'code': 'telephone.domestic.second.required',
          'valid': true,
          'uid': 'domestic_second-1646dad2-a250-242b-f4d5-02474ab41212'
        },
        {
          'section': 'history',
          'subsection': 'residence',
          'code': 'telephone.domestic.second.length',
          'valid': null,
          'uid': 'domestic_second-1646dad2-a250-242b-f4d5-02474ab41212'
        },
        {
          'section': 'history',
          'subsection': 'residence',
          'code': 'telephone.domestic.second.pattern',
          'valid': null,
          'uid': 'domestic_second-1646dad2-a250-242b-f4d5-02474ab41212'
        },
        {
          'section': 'history',
          'subsection': 'residence',
          'code': 'telephone.domestic.third.required',
          'valid': true,
          'uid': 'domestic_third-12f10774-4435-0c48-d1e3-cbf726943664'
        },
        {
          'section': 'history',
          'subsection': 'residence',
          'code': 'telephone.domestic.third.length',
          'valid': null,
          'uid': 'domestic_third-12f10774-4435-0c48-d1e3-cbf726943664'
        },
        {
          'section': 'history',
          'subsection': 'residence',
          'code': 'telephone.domestic.third.pattern',
          'valid': null,
          'uid': 'domestic_third-12f10774-4435-0c48-d1e3-cbf726943664'
        },
        {
          'section': 'history',
          'subsection': 'residence',
          'code': 'telephone.domestic.extension.required',
          'valid': true,
          'uid': 'domestic_extension-c01b00fb-00ea-a2e6-4425-c32da2091451'
        },
        {
          'section': 'history',
          'subsection': 'residence',
          'code': 'telephone.domestic.extension.length',
          'valid': null,
          'uid': 'domestic_extension-c01b00fb-00ea-a2e6-4425-c32da2091451'
        },
        {
          'section': 'history',
          'subsection': 'residence',
          'code': 'telephone.domestic.extension.pattern',
          'valid': null,
          'uid': 'domestic_extension-c01b00fb-00ea-a2e6-4425-c32da2091451'
        },
        {
          'section': 'history',
          'subsection': 'residence',
          'code': 'telephone.numberType.required',
          'valid': true,
          'uid': 'undefined-3843ea69-4402-d56e-8389-2b688895df74'
        },
        {
          'section': 'history',
          'subsection': 'residence',
          'code': 'location.address.street.required',
          'valid': true,
          'uid': 'address-1e041e0b-d63e-68d6-abfb-bb5123c0b8ca'
        },
        {
          'section': 'history',
          'subsection': 'residence',
          'code': 'location.address.street.length',
          'valid': null,
          'uid': 'address-1e041e0b-d63e-68d6-abfb-bb5123c0b8ca'
        },
        {
          'section': 'history',
          'subsection': 'residence',
          'code': 'location.address.street.pattern',
          'valid': null,
          'uid': 'address-1e041e0b-d63e-68d6-abfb-bb5123c0b8ca'
        },
        {
          'section': 'history',
          'subsection': 'residence',
          'code': 'location.address.required',
          'valid': true,
          'uid': 'Address-0fb6c32f-6179-e5bd-d78b-adcbe2b30e42'
        },
        {
          'section': 'history',
          'subsection': 'residence',
          'code': 'location.address.street.required',
          'valid': true,
          'uid': 'street2-d0bb4bb1-5b1f-daf0-7ab7-526138df4665'
        },
        {
          'section': 'history',
          'subsection': 'residence',
          'code': 'location.address.street.length',
          'valid': null,
          'uid': 'street2-d0bb4bb1-5b1f-daf0-7ab7-526138df4665'
        },
        {
          'section': 'history',
          'subsection': 'residence',
          'code': 'location.address.street.pattern',
          'valid': null,
          'uid': 'street2-d0bb4bb1-5b1f-daf0-7ab7-526138df4665'
        },
        {
          'section': 'history',
          'subsection': 'residence',
          'code': 'location.address.city.required',
          'valid': true,
          'uid': 'city-2716515a-dc2e-c31c-6d6a-3aa96cd35a9f'
        },
        {
          'section': 'history',
          'subsection': 'residence',
          'code': 'location.address.city.length',
          'valid': null,
          'uid': 'city-2716515a-dc2e-c31c-6d6a-3aa96cd35a9f'
        },
        {
          'section': 'history',
          'subsection': 'residence',
          'code': 'location.address.city.pattern',
          'valid': null,
          'uid': 'city-2716515a-dc2e-c31c-6d6a-3aa96cd35a9f'
        },
        {
          'section': 'history',
          'subsection': 'residence',
          'code': 'location.address.zipcode.required',
          'valid': true,
          'uid': 'zipcode-af610045-548b-e231-c58d-488d05abef22'
        },
        {
          'section': 'history',
          'subsection': 'residence',
          'code': 'location.address.zipcode.length',
          'valid': null,
          'uid': 'zipcode-af610045-548b-e231-c58d-488d05abef22'
        },
        {
          'section': 'history',
          'subsection': 'residence',
          'code': 'location.address.zipcode.pattern',
          'valid': null,
          'uid': 'zipcode-af610045-548b-e231-c58d-488d05abef22'
        },
        {
          'section': 'history',
          'subsection': 'residence',
          'code': 'location.address.state.required',
          'valid': true,
          'uid': 'state-5ffc923f-d6e6-120a-2823-5dda7bb3d540'
        },
        {
          'section': 'history',
          'subsection': 'residence',
          'code': 'location.address.state.notfound',
          'valid': null,
          'uid': 'state-5ffc923f-d6e6-120a-2823-5dda7bb3d540'
        },
        {
          'section': 'history',
          'subsection': 'residence',
          'code': 'date.month.required',
          'valid': true,
          'uid': 'month-39d7b65f-01d4-1cce-dec9-97aae8d08279'
        },
        {
          'section': 'history',
          'subsection': 'residence',
          'code': 'date.month.length',
          'valid': true,
          'uid': 'month-39d7b65f-01d4-1cce-dec9-97aae8d08279'
        },
        {
          'section': 'history',
          'subsection': 'residence',
          'code': 'date.month.pattern',
          'valid': true,
          'uid': 'month-39d7b65f-01d4-1cce-dec9-97aae8d08279'
        },
        {
          'section': 'history',
          'subsection': 'residence',
          'code': 'date.month.min',
          'valid': true,
          'uid': 'month-3d70eeb2-7d81-8add-b301-6c8cd0d95447'
        },
        {
          'section': 'history',
          'subsection': 'residence',
          'code': 'date.month.max',
          'valid': true,
          'uid': 'month-3d70eeb2-7d81-8add-b301-6c8cd0d95447'
        },
        {
          'section': 'history',
          'subsection': 'residence',
          'code': 'date.required',
          'valid': true,
          'uid': 'LastContact-95f832c0-a9b4-63ed-9dab-1d9b2068d77d'
        },
        {
          'section': 'history',
          'subsection': 'residence',
          'code': 'date.max',
          'valid': true,
          'uid': 'LastContact-95f832c0-a9b4-63ed-9dab-1d9b2068d77d'
        },
        {
          'section': 'history',
          'subsection': 'residence',
          'code': 'date.min',
          'valid': true,
          'uid': 'LastContact-95f832c0-a9b4-63ed-9dab-1d9b2068d77d'
        },
        {
          'section': 'history',
          'subsection': 'residence',
          'code': 'date.day.required',
          'valid': true,
          'uid': 'day-a5ab87d6-738a-b8a8-b068-240176bfac48'
        },
        {
          'section': 'history',
          'subsection': 'residence',
          'code': 'date.day.length',
          'valid': true,
          'uid': 'day-a5ab87d6-738a-b8a8-b068-240176bfac48'
        },
        {
          'section': 'history',
          'subsection': 'residence',
          'code': 'date.day.pattern',
          'valid': true,
          'uid': 'day-a5ab87d6-738a-b8a8-b068-240176bfac48'
        },
        {
          'section': 'history',
          'subsection': 'residence',
          'code': 'date.day.min',
          'valid': true,
          'uid': 'day-f4f75d5e-57ef-82a7-ddbc-55183374e6dd'
        },
        {
          'section': 'history',
          'subsection': 'residence',
          'code': 'date.day.max',
          'valid': true,
          'uid': 'day-f4f75d5e-57ef-82a7-ddbc-55183374e6dd'
        },
        {
          'section': 'history',
          'subsection': 'residence',
          'code': 'date.year.required',
          'valid': true,
          'uid': 'year-ca31642d-9813-16c1-70ff-2ca678bcf14e'
        },
        {
          'section': 'history',
          'subsection': 'residence',
          'code': 'date.year.length',
          'valid': true,
          'uid': 'year-ca31642d-9813-16c1-70ff-2ca678bcf14e'
        },
        {
          'section': 'history',
          'subsection': 'residence',
          'code': 'date.year.pattern',
          'valid': true,
          'uid': 'year-ca31642d-9813-16c1-70ff-2ca678bcf14e'
        },
        {
          'section': 'history',
          'subsection': 'residence',
          'code': 'date.year.min',
          'valid': true,
          'uid': 'year-ffa6bb71-7a30-6d4c-81e8-5c03c6aa09a5'
        },
        {
          'section': 'history',
          'subsection': 'residence',
          'code': 'date.year.max',
          'valid': true,
          'uid': 'year-ffa6bb71-7a30-6d4c-81e8-5c03c6aa09a5'
        },
        {
          'section': 'history',
          'subsection': 'employment',
          'code': 'required',
          'valid': true,
          'uid': 'undefined-c749a9e0-d4c4-6bad-c272-8180e72be587'
        },
        {
          'section': 'history',
          'subsection': 'employment',
          'code': 'required',
          'valid': true,
          'uid': 'employment_activity-0429ade6-4288-6d61-d842-8d1746775a88'
        },
        {
          'section': 'history',
          'subsection': 'employment',
          'code': 'daterange.required',
          'valid': true,
          'uid': 'Dates-61b4125c-c8b7-c541-be21-55e711287724'
        },
        {
          'section': 'history',
          'subsection': 'employment',
          'code': 'daterange.order',
          'valid': null,
          'uid': 'Dates-61b4125c-c8b7-c541-be21-55e711287724'
        },
        {
          'section': 'history',
          'subsection': 'employment',
          'code': 'daterange.from.month.required',
          'valid': true,
          'uid': 'month-a0000fa8-36e7-9dd2-b87f-447a7487e142'
        },
        {
          'section': 'history',
          'subsection': 'employment',
          'code': 'daterange.from.month.length',
          'valid': true,
          'uid': 'month-a0000fa8-36e7-9dd2-b87f-447a7487e142'
        },
        {
          'section': 'history',
          'subsection': 'employment',
          'code': 'daterange.from.month.pattern',
          'valid': true,
          'uid': 'month-a0000fa8-36e7-9dd2-b87f-447a7487e142'
        },
        {
          'section': 'history',
          'subsection': 'employment',
          'code': 'daterange.from.month.min',
          'valid': true,
          'uid': 'month-6c248bf1-ff05-be4d-4cef-27b3882812e6'
        },
        {
          'section': 'history',
          'subsection': 'employment',
          'code': 'daterange.from.month.max',
          'valid': true,
          'uid': 'month-6c248bf1-ff05-be4d-4cef-27b3882812e6'
        },
        {
          'section': 'history',
          'subsection': 'employment',
          'code': 'daterange.from.required',
          'valid': true,
          'uid': 'from-7b07d550-5cfe-273e-0a9c-d3ef517b0c59'
        },
        {
          'section': 'history',
          'subsection': 'employment',
          'code': 'daterange.from.max',
          'valid': true,
          'uid': 'from-7b07d550-5cfe-273e-0a9c-d3ef517b0c59'
        },
        {
          'section': 'history',
          'subsection': 'employment',
          'code': 'daterange.from.min',
          'valid': true,
          'uid': 'from-7b07d550-5cfe-273e-0a9c-d3ef517b0c59'
        },
        {
          'section': 'history',
          'subsection': 'employment',
          'code': 'daterange.from.day.required',
          'valid': true,
          'uid': 'day-644a604c-a554-8739-cb1a-afe9ad279687'
        },
        {
          'section': 'history',
          'subsection': 'employment',
          'code': 'daterange.from.day.length',
          'valid': true,
          'uid': 'day-644a604c-a554-8739-cb1a-afe9ad279687'
        },
        {
          'section': 'history',
          'subsection': 'employment',
          'code': 'daterange.from.day.pattern',
          'valid': true,
          'uid': 'day-644a604c-a554-8739-cb1a-afe9ad279687'
        },
        {
          'section': 'history',
          'subsection': 'employment',
          'code': 'daterange.from.day.min',
          'valid': true,
          'uid': 'day-34a66838-24b3-8060-1b0d-6b3419517072'
        },
        {
          'section': 'history',
          'subsection': 'employment',
          'code': 'daterange.from.day.max',
          'valid': true,
          'uid': 'day-34a66838-24b3-8060-1b0d-6b3419517072'
        },
        {
          'section': 'history',
          'subsection': 'employment',
          'code': 'daterange.from.year.required',
          'valid': true,
          'uid': 'year-f7d95b56-ddeb-c127-0800-21694be39f44'
        },
        {
          'section': 'history',
          'subsection': 'employment',
          'code': 'daterange.from.year.length',
          'valid': true,
          'uid': 'year-f7d95b56-ddeb-c127-0800-21694be39f44'
        },
        {
          'section': 'history',
          'subsection': 'employment',
          'code': 'daterange.from.year.pattern',
          'valid': true,
          'uid': 'year-f7d95b56-ddeb-c127-0800-21694be39f44'
        },
        {
          'section': 'history',
          'subsection': 'employment',
          'code': 'daterange.from.year.min',
          'valid': true,
          'uid': 'year-ba829e74-c5ba-88a4-0190-9f25c575711c'
        },
        {
          'section': 'history',
          'subsection': 'employment',
          'code': 'daterange.from.year.max',
          'valid': true,
          'uid': 'year-ba829e74-c5ba-88a4-0190-9f25c575711c'
        },
        {
          'section': 'history',
          'subsection': 'employment',
          'code': 'daterange.to.month.required',
          'valid': null,
          'uid': 'month-731dfee8-d300-f9e5-7510-a69d8b8b425e'
        },
        {
          'section': 'history',
          'subsection': 'employment',
          'code': 'daterange.to.month.length',
          'valid': null,
          'uid': 'month-731dfee8-d300-f9e5-7510-a69d8b8b425e'
        },
        {
          'section': 'history',
          'subsection': 'employment',
          'code': 'daterange.to.month.pattern',
          'valid': null,
          'uid': 'month-731dfee8-d300-f9e5-7510-a69d8b8b425e'
        },
        {
          'section': 'history',
          'subsection': 'employment',
          'code': 'daterange.to.month.min',
          'valid': null,
          'uid': 'month-a6bb95ae-2e4c-b521-5484-9daccfd25c06'
        },
        {
          'section': 'history',
          'subsection': 'employment',
          'code': 'daterange.to.month.max',
          'valid': null,
          'uid': 'month-a6bb95ae-2e4c-b521-5484-9daccfd25c06'
        },
        {
          'section': 'history',
          'subsection': 'employment',
          'code': 'daterange.to.required',
          'valid': null,
          'uid': 'to-4291a9e5-f541-747f-d854-e2512b1afa73'
        },
        {
          'section': 'history',
          'subsection': 'employment',
          'code': 'daterange.to.max',
          'valid': null,
          'uid': 'to-4291a9e5-f541-747f-d854-e2512b1afa73'
        },
        {
          'section': 'history',
          'subsection': 'employment',
          'code': 'daterange.to.min',
          'valid': null,
          'uid': 'to-4291a9e5-f541-747f-d854-e2512b1afa73'
        },
        {
          'section': 'history',
          'subsection': 'employment',
          'code': 'daterange.to.day.required',
          'valid': null,
          'uid': 'day-748d3380-f8af-ea28-028e-f862d2f4c451'
        },
        {
          'section': 'history',
          'subsection': 'employment',
          'code': 'daterange.to.day.length',
          'valid': null,
          'uid': 'day-748d3380-f8af-ea28-028e-f862d2f4c451'
        },
        {
          'section': 'history',
          'subsection': 'employment',
          'code': 'daterange.to.day.pattern',
          'valid': null,
          'uid': 'day-748d3380-f8af-ea28-028e-f862d2f4c451'
        },
        {
          'section': 'history',
          'subsection': 'employment',
          'code': 'daterange.to.day.min',
          'valid': null,
          'uid': 'day-1fed47e3-0aa4-9bcd-95bd-c409aed20cc2'
        },
        {
          'section': 'history',
          'subsection': 'employment',
          'code': 'daterange.to.day.max',
          'valid': null,
          'uid': 'day-1fed47e3-0aa4-9bcd-95bd-c409aed20cc2'
        },
        {
          'section': 'history',
          'subsection': 'employment',
          'code': 'daterange.to.year.required',
          'valid': null,
          'uid': 'year-51d937d1-e372-954b-fc55-b5ada9c2e399'
        },
        {
          'section': 'history',
          'subsection': 'employment',
          'code': 'daterange.to.year.length',
          'valid': null,
          'uid': 'year-51d937d1-e372-954b-fc55-b5ada9c2e399'
        },
        {
          'section': 'history',
          'subsection': 'employment',
          'code': 'daterange.to.year.pattern',
          'valid': null,
          'uid': 'year-51d937d1-e372-954b-fc55-b5ada9c2e399'
        },
        {
          'section': 'history',
          'subsection': 'employment',
          'code': 'daterange.to.year.min',
          'valid': null,
          'uid': 'year-95ae95a9-2039-5a66-8ff6-7aa0133169cb'
        },
        {
          'section': 'history',
          'subsection': 'employment',
          'code': 'daterange.to.year.max',
          'valid': null,
          'uid': 'year-95ae95a9-2039-5a66-8ff6-7aa0133169cb'
        },
        {
          'section': 'history',
          'subsection': 'employment',
          'code': 'required',
          'valid': true,
          'uid': 'Employment-e8917bde-a4b3-9872-eaec-9a516303bc48'
        },
        {
          'section': 'history',
          'subsection': 'employment',
          'code': 'length',
          'valid': true,
          'uid': 'Employment-e8917bde-a4b3-9872-eaec-9a516303bc48'
        },
        {
          'section': 'history',
          'subsection': 'employment',
          'code': 'pattern',
          'valid': true,
          'uid': 'Employment-e8917bde-a4b3-9872-eaec-9a516303bc48'
        },
        {
          'section': 'history',
          'subsection': 'employment',
          'code': 'required',
          'valid': true,
          'uid': 'Title-8cba5148-36f5-45d9-560d-fe96c6ca96bb'
        },
        {
          'section': 'history',
          'subsection': 'employment',
          'code': 'length',
          'valid': true,
          'uid': 'Title-8cba5148-36f5-45d9-560d-fe96c6ca96bb'
        },
        {
          'section': 'history',
          'subsection': 'employment',
          'code': 'pattern',
          'valid': true,
          'uid': 'Title-8cba5148-36f5-45d9-560d-fe96c6ca96bb'
        },
        {
          'section': 'history',
          'subsection': 'employment',
          'code': 'required',
          'valid': true,
          'uid': 'undefined-97d6d99c-5258-0405-10e3-6f39d6b75afe'
        },
        {
          'section': 'history',
          'subsection': 'employment',
          'code': 'location.address.street.required',
          'valid': true,
          'uid': 'address-176fbea2-8632-eaaa-da90-919b3d5e2338'
        },
        {
          'section': 'history',
          'subsection': 'employment',
          'code': 'location.address.street.length',
          'valid': true,
          'uid': 'address-176fbea2-8632-eaaa-da90-919b3d5e2338'
        },
        {
          'section': 'history',
          'subsection': 'employment',
          'code': 'location.address.street.pattern',
          'valid': true,
          'uid': 'address-176fbea2-8632-eaaa-da90-919b3d5e2338'
        },
        {
          'section': 'history',
          'subsection': 'employment',
          'code': 'location.address.required',
          'valid': true,
          'uid': 'Address-9512ca12-b812-f18b-e162-152867e4a261'
        },
        {
          'section': 'history',
          'subsection': 'employment',
          'code': 'location.address.street.required',
          'valid': true,
          'uid': 'street2-ef351f56-25ad-c44b-5686-135fb1776baf'
        },
        {
          'section': 'history',
          'subsection': 'employment',
          'code': 'location.address.street.length',
          'valid': true,
          'uid': 'street2-ef351f56-25ad-c44b-5686-135fb1776baf'
        },
        {
          'section': 'history',
          'subsection': 'employment',
          'code': 'location.address.street.pattern',
          'valid': true,
          'uid': 'street2-ef351f56-25ad-c44b-5686-135fb1776baf'
        },
        {
          'section': 'history',
          'subsection': 'employment',
          'code': 'location.address.city.required',
          'valid': true,
          'uid': 'city-76b53b20-885c-d22c-4c92-fd9d74ef3761'
        },
        {
          'section': 'history',
          'subsection': 'employment',
          'code': 'location.address.city.length',
          'valid': true,
          'uid': 'city-76b53b20-885c-d22c-4c92-fd9d74ef3761'
        },
        {
          'section': 'history',
          'subsection': 'employment',
          'code': 'location.address.city.pattern',
          'valid': true,
          'uid': 'city-76b53b20-885c-d22c-4c92-fd9d74ef3761'
        },
        {
          'section': 'history',
          'subsection': 'employment',
          'code': 'location.address.zipcode.required',
          'valid': true,
          'uid': 'zipcode-416045b3-57f8-cc91-1a49-a1a13226ee9b'
        },
        {
          'section': 'history',
          'subsection': 'employment',
          'code': 'location.address.zipcode.length',
          'valid': true,
          'uid': 'zipcode-416045b3-57f8-cc91-1a49-a1a13226ee9b'
        },
        {
          'section': 'history',
          'subsection': 'employment',
          'code': 'location.address.zipcode.pattern',
          'valid': true,
          'uid': 'zipcode-416045b3-57f8-cc91-1a49-a1a13226ee9b'
        },
        {
          'section': 'history',
          'subsection': 'employment',
          'code': 'telephone.domestic.first.required',
          'valid': true,
          'uid': 'domestic_first-ec34a461-2069-f61c-8c44-4069636b9b6e'
        },
        {
          'section': 'history',
          'subsection': 'employment',
          'code': 'telephone.domestic.first.length',
          'valid': null,
          'uid': 'domestic_first-ec34a461-2069-f61c-8c44-4069636b9b6e'
        },
        {
          'section': 'history',
          'subsection': 'employment',
          'code': 'telephone.domestic.first.pattern',
          'valid': null,
          'uid': 'domestic_first-ec34a461-2069-f61c-8c44-4069636b9b6e'
        },
        {
          'section': 'history',
          'subsection': 'employment',
          'code': 'telephone.required',
          'valid': true,
          'uid': 'Telephone-a7ab75d9-768e-9100-dc0a-bf659c60073b'
        },
        {
          'section': 'history',
          'subsection': 'employment',
          'code': 'telephone.domestic.second.required',
          'valid': true,
          'uid': 'domestic_second-112e9749-169f-0fb6-201e-442963fb1feb'
        },
        {
          'section': 'history',
          'subsection': 'employment',
          'code': 'telephone.domestic.second.length',
          'valid': null,
          'uid': 'domestic_second-112e9749-169f-0fb6-201e-442963fb1feb'
        },
        {
          'section': 'history',
          'subsection': 'employment',
          'code': 'telephone.domestic.second.pattern',
          'valid': null,
          'uid': 'domestic_second-112e9749-169f-0fb6-201e-442963fb1feb'
        },
        {
          'section': 'history',
          'subsection': 'employment',
          'code': 'telephone.domestic.third.required',
          'valid': true,
          'uid': 'domestic_third-3ff55874-639f-bff7-5b2e-e24616868d2b'
        },
        {
          'section': 'history',
          'subsection': 'employment',
          'code': 'telephone.domestic.third.length',
          'valid': null,
          'uid': 'domestic_third-3ff55874-639f-bff7-5b2e-e24616868d2b'
        },
        {
          'section': 'history',
          'subsection': 'employment',
          'code': 'telephone.domestic.third.pattern',
          'valid': null,
          'uid': 'domestic_third-3ff55874-639f-bff7-5b2e-e24616868d2b'
        },
        {
          'section': 'history',
          'subsection': 'employment',
          'code': 'telephone.domestic.extension.required',
          'valid': true,
          'uid': 'domestic_extension-8f9671ae-7e39-0b3b-2360-fd7b6a110538'
        },
        {
          'section': 'history',
          'subsection': 'employment',
          'code': 'telephone.domestic.extension.length',
          'valid': null,
          'uid': 'domestic_extension-8f9671ae-7e39-0b3b-2360-fd7b6a110538'
        },
        {
          'section': 'history',
          'subsection': 'employment',
          'code': 'telephone.domestic.extension.pattern',
          'valid': null,
          'uid': 'domestic_extension-8f9671ae-7e39-0b3b-2360-fd7b6a110538'
        },
        {
          'section': 'history',
          'subsection': 'employment',
          'code': 'telephone.numberType.required',
          'valid': true,
          'uid': 'undefined-17679537-631f-9de1-2577-907fdc39b4ca'
        },
        {
          'section': 'history',
          'subsection': 'employment',
          'code': 'required',
          'valid': true,
          'uid': 'undefined-6095be17-04ce-2ec7-6f8c-4ed288d83238'
        },
        {
          'section': 'history',
          'subsection': 'employment',
          'code': 'required',
          'valid': true,
          'uid': 'SupervisorName-f87409f6-39b6-70ae-1896-1c862f59ab12'
        },
        {
          'section': 'history',
          'subsection': 'employment',
          'code': 'length',
          'valid': true,
          'uid': 'SupervisorName-f87409f6-39b6-70ae-1896-1c862f59ab12'
        },
        {
          'section': 'history',
          'subsection': 'employment',
          'code': 'pattern',
          'valid': true,
          'uid': 'SupervisorName-f87409f6-39b6-70ae-1896-1c862f59ab12'
        },
        {
          'section': 'history',
          'subsection': 'employment',
          'code': 'required',
          'valid': true,
          'uid': 'Title-590f0bb3-7a92-eb3d-20fc-6536f99f9f5e'
        },
        {
          'section': 'history',
          'subsection': 'employment',
          'code': 'length',
          'valid': true,
          'uid': 'Title-590f0bb3-7a92-eb3d-20fc-6536f99f9f5e'
        },
        {
          'section': 'history',
          'subsection': 'employment',
          'code': 'pattern',
          'valid': true,
          'uid': 'Title-590f0bb3-7a92-eb3d-20fc-6536f99f9f5e'
        },
        {
          'section': 'history',
          'subsection': 'employment',
          'code': 'email.required',
          'valid': true,
          'uid': 'Email-3fe31bb0-1dad-3a32-7252-d8cce65c1f5a'
        },
        {
          'section': 'history',
          'subsection': 'employment',
          'code': 'email.length',
          'valid': true,
          'uid': 'Email-3fe31bb0-1dad-3a32-7252-d8cce65c1f5a'
        },
        {
          'section': 'history',
          'subsection': 'employment',
          'code': 'email.pattern',
          'valid': true,
          'uid': 'Email-3fe31bb0-1dad-3a32-7252-d8cce65c1f5a'
        },
        {
          'section': 'history',
          'subsection': 'employment',
          'code': 'location.address.street.required',
          'valid': true,
          'uid': 'address-d35278de-e1fe-8acf-0539-62e312591447'
        },
        {
          'section': 'history',
          'subsection': 'employment',
          'code': 'location.address.street.length',
          'valid': true,
          'uid': 'address-d35278de-e1fe-8acf-0539-62e312591447'
        },
        {
          'section': 'history',
          'subsection': 'employment',
          'code': 'location.address.street.pattern',
          'valid': true,
          'uid': 'address-d35278de-e1fe-8acf-0539-62e312591447'
        },
        {
          'section': 'history',
          'subsection': 'employment',
          'code': 'location.address.required',
          'valid': true,
          'uid': 'Address-90923761-724b-8d12-6edc-da803eb5512a'
        },
        {
          'section': 'history',
          'subsection': 'employment',
          'code': 'location.address.street.required',
          'valid': true,
          'uid': 'street2-36fdc3f9-c06a-b72c-090f-0a7c04e6a6f1'
        },
        {
          'section': 'history',
          'subsection': 'employment',
          'code': 'location.address.street.length',
          'valid': true,
          'uid': 'street2-36fdc3f9-c06a-b72c-090f-0a7c04e6a6f1'
        },
        {
          'section': 'history',
          'subsection': 'employment',
          'code': 'location.address.street.pattern',
          'valid': true,
          'uid': 'street2-36fdc3f9-c06a-b72c-090f-0a7c04e6a6f1'
        },
        {
          'section': 'history',
          'subsection': 'employment',
          'code': 'location.address.city.required',
          'valid': true,
          'uid': 'city-a3ff888e-7d4e-6bcb-b186-4f5796e5d806'
        },
        {
          'section': 'history',
          'subsection': 'employment',
          'code': 'location.address.city.length',
          'valid': true,
          'uid': 'city-a3ff888e-7d4e-6bcb-b186-4f5796e5d806'
        },
        {
          'section': 'history',
          'subsection': 'employment',
          'code': 'location.address.city.pattern',
          'valid': true,
          'uid': 'city-a3ff888e-7d4e-6bcb-b186-4f5796e5d806'
        },
        {
          'section': 'history',
          'subsection': 'employment',
          'code': 'location.address.zipcode.required',
          'valid': true,
          'uid': 'zipcode-6b3cbb4b-21b5-cd5f-4642-a52c81aa6f50'
        },
        {
          'section': 'history',
          'subsection': 'employment',
          'code': 'location.address.zipcode.length',
          'valid': true,
          'uid': 'zipcode-6b3cbb4b-21b5-cd5f-4642-a52c81aa6f50'
        },
        {
          'section': 'history',
          'subsection': 'employment',
          'code': 'location.address.zipcode.pattern',
          'valid': true,
          'uid': 'zipcode-6b3cbb4b-21b5-cd5f-4642-a52c81aa6f50'
        },
        {
          'section': 'history',
          'subsection': 'employment',
          'code': 'telephone.domestic.first.required',
          'valid': true,
          'uid': 'domestic_first-e702e8f2-79c0-7302-411f-752146338f96'
        },
        {
          'section': 'history',
          'subsection': 'employment',
          'code': 'telephone.domestic.first.length',
          'valid': null,
          'uid': 'domestic_first-e702e8f2-79c0-7302-411f-752146338f96'
        },
        {
          'section': 'history',
          'subsection': 'employment',
          'code': 'telephone.domestic.first.pattern',
          'valid': null,
          'uid': 'domestic_first-e702e8f2-79c0-7302-411f-752146338f96'
        },
        {
          'section': 'history',
          'subsection': 'employment',
          'code': 'telephone.required',
          'valid': true,
          'uid': 'Telephone-3061e8b4-3f1b-379f-76ac-f37edbff057f'
        },
        {
          'section': 'history',
          'subsection': 'employment',
          'code': 'telephone.domestic.second.required',
          'valid': true,
          'uid': 'domestic_second-28797635-0f56-0f86-bdd5-26b8861d8019'
        },
        {
          'section': 'history',
          'subsection': 'employment',
          'code': 'telephone.domestic.second.length',
          'valid': null,
          'uid': 'domestic_second-28797635-0f56-0f86-bdd5-26b8861d8019'
        },
        {
          'section': 'history',
          'subsection': 'employment',
          'code': 'telephone.domestic.second.pattern',
          'valid': null,
          'uid': 'domestic_second-28797635-0f56-0f86-bdd5-26b8861d8019'
        },
        {
          'section': 'history',
          'subsection': 'employment',
          'code': 'telephone.domestic.third.required',
          'valid': true,
          'uid': 'domestic_third-6c3c6a54-9ee0-bce6-f414-b66641c2fff6'
        },
        {
          'section': 'history',
          'subsection': 'employment',
          'code': 'telephone.domestic.third.length',
          'valid': null,
          'uid': 'domestic_third-6c3c6a54-9ee0-bce6-f414-b66641c2fff6'
        },
        {
          'section': 'history',
          'subsection': 'employment',
          'code': 'telephone.domestic.third.pattern',
          'valid': null,
          'uid': 'domestic_third-6c3c6a54-9ee0-bce6-f414-b66641c2fff6'
        },
        {
          'section': 'history',
          'subsection': 'employment',
          'code': 'telephone.domestic.extension.required',
          'valid': true,
          'uid': 'domestic_extension-7a23fd8d-32a9-5ae8-6b8c-940d2d2f75b8'
        },
        {
          'section': 'history',
          'subsection': 'employment',
          'code': 'telephone.domestic.extension.length',
          'valid': null,
          'uid': 'domestic_extension-7a23fd8d-32a9-5ae8-6b8c-940d2d2f75b8'
        },
        {
          'section': 'history',
          'subsection': 'employment',
          'code': 'telephone.domestic.extension.pattern',
          'valid': null,
          'uid': 'domestic_extension-7a23fd8d-32a9-5ae8-6b8c-940d2d2f75b8'
        },
        {
          'section': 'history',
          'subsection': 'employment',
          'code': 'telephone.numberType.required',
          'valid': true,
          'uid': 'undefined-e2f54f0b-9a64-fd21-b4cf-59cd1c39b874'
        },
        {
          'section': 'history',
          'subsection': 'employment',
          'code': 'required',
          'valid': true,
          'uid': 'undefined-4805d2e2-7a32-7a38-8426-fbb32f0106e8'
        },
        {
          'section': 'history',
          'subsection': 'employment',
          'code': 'location.address.state.required',
          'valid': true,
          'uid': 'state-3cae3a24-e64c-3246-6b5f-bd5bb73e24f6'
        },
        {
          'section': 'history',
          'subsection': 'employment',
          'code': 'location.address.state.notfound',
          'valid': true,
          'uid': 'state-3cae3a24-e64c-3246-6b5f-bd5bb73e24f6'
        },
        {
          'section': 'history',
          'subsection': 'employment',
          'code': 'location.address.state.required',
          'valid': true,
          'uid': 'state-918e852f-6fd6-de00-ff31-ea5a80cf2f42'
        },
        {
          'section': 'history',
          'subsection': 'employment',
          'code': 'location.address.state.notfound',
          'valid': true,
          'uid': 'state-918e852f-6fd6-de00-ff31-ea5a80cf2f42'
        },
        {
          'section': 'history',
          'subsection': 'employment',
          'code': 'required',
          'valid': true,
          'uid': 'reason_description-9fd48fb5-0175-0e6f-ac40-8688cc0023d1'
        },
        {
          'section': 'history',
          'subsection': 'employment',
          'code': 'length',
          'valid': true,
          'uid': 'reason_description-9fd48fb5-0175-0e6f-ac40-8688cc0023d1'
        },
        {
          'section': 'history',
          'subsection': 'employment',
          'code': 'pattern',
          'valid': true,
          'uid': 'reason_description-9fd48fb5-0175-0e6f-ac40-8688cc0023d1'
        },
        {
          'section': 'history',
          'subsection': 'employment',
          'code': 'required',
          'valid': true,
          'uid': 'undefined-a44bdc23-b3bf-fd42-5517-b52543183041'
        },
        {
          'section': 'history',
          'subsection': 'employment',
          'code': 'required',
          'valid': true,
          'uid': 'undefined-8e708fda-fc5a-1065-a7db-271930344360'
        },
        {
          'section': 'history',
          'subsection': 'employment',
          'code': 'required',
          'valid': true,
          'uid': 'undefined-64a35f73-a36c-a64b-9bcf-92e10afb2d83'
        },
        {
          'section': 'history',
          'subsection': 'employment',
          'code': 'required',
          'valid': true,
          'uid': 'undefined-f192fdec-65ec-2444-0d54-4fa5725a7b30'
        },
        {
          'section': 'history',
          'subsection': 'employment',
          'code': 'required',
          'valid': true,
          'uid': 'undefined-50155c9a-4cc3-ece1-0a2b-721ace58b6c6'
        },
        {
          'section': 'history',
          'subsection': 'federal',
          'code': 'required',
          'valid': true,
          'uid': 'undefined-4e3a617e-428b-e37e-bdc9-ade099e0bf48'
        },
        {
          'section': 'history',
          'subsection': 'education',
          'code': 'required',
          'valid': true,
          'uid': 'Name-02c1370b-d5a1-1996-5ebd-bfc5a19247a5'
        },
        {
          'section': 'history',
          'subsection': 'education',
          'code': 'length',
          'valid': true,
          'uid': 'Name-02c1370b-d5a1-1996-5ebd-bfc5a19247a5'
        },
        {
          'section': 'history',
          'subsection': 'education',
          'code': 'pattern',
          'valid': true,
          'uid': 'Name-02c1370b-d5a1-1996-5ebd-bfc5a19247a5'
        },
        {
          'section': 'history',
          'subsection': 'education',
          'code': 'location.address.street.required',
          'valid': true,
          'uid': 'address-4e614f19-7afd-dc13-162a-c2d894130ce4'
        },
        {
          'section': 'history',
          'subsection': 'education',
          'code': 'location.address.street.length',
          'valid': true,
          'uid': 'address-4e614f19-7afd-dc13-162a-c2d894130ce4'
        },
        {
          'section': 'history',
          'subsection': 'education',
          'code': 'location.address.street.pattern',
          'valid': true,
          'uid': 'address-4e614f19-7afd-dc13-162a-c2d894130ce4'
        },
        {
          'section': 'history',
          'subsection': 'education',
          'code': 'location.address.required',
          'valid': true,
          'uid': 'Address-74e0cd75-1292-069e-a9a1-19af68d353f9'
        },
        {
          'section': 'history',
          'subsection': 'education',
          'code': 'location.address.street.required',
          'valid': true,
          'uid': 'street2-2d0d2326-eabf-e963-edd1-b64ca492367f'
        },
        {
          'section': 'history',
          'subsection': 'education',
          'code': 'location.address.street.length',
          'valid': null,
          'uid': 'street2-2d0d2326-eabf-e963-edd1-b64ca492367f'
        },
        {
          'section': 'history',
          'subsection': 'education',
          'code': 'location.address.street.pattern',
          'valid': null,
          'uid': 'street2-2d0d2326-eabf-e963-edd1-b64ca492367f'
        },
        {
          'section': 'history',
          'subsection': 'education',
          'code': 'location.address.city.required',
          'valid': true,
          'uid': 'city-f6d656e3-488c-b6e1-9b94-cfa638fd65af'
        },
        {
          'section': 'history',
          'subsection': 'education',
          'code': 'location.address.city.length',
          'valid': true,
          'uid': 'city-f6d656e3-488c-b6e1-9b94-cfa638fd65af'
        },
        {
          'section': 'history',
          'subsection': 'education',
          'code': 'location.address.city.pattern',
          'valid': true,
          'uid': 'city-f6d656e3-488c-b6e1-9b94-cfa638fd65af'
        },
        {
          'section': 'history',
          'subsection': 'education',
          'code': 'location.address.zipcode.required',
          'valid': true,
          'uid': 'zipcode-2f90f511-3227-0bfa-25f5-e3fb1b8e0dd9'
        },
        {
          'section': 'history',
          'subsection': 'education',
          'code': 'location.address.zipcode.length',
          'valid': true,
          'uid': 'zipcode-2f90f511-3227-0bfa-25f5-e3fb1b8e0dd9'
        },
        {
          'section': 'history',
          'subsection': 'education',
          'code': 'location.address.zipcode.pattern',
          'valid': true,
          'uid': 'zipcode-2f90f511-3227-0bfa-25f5-e3fb1b8e0dd9'
        },
        {
          'section': 'history',
          'subsection': 'education',
          'code': 'required',
          'valid': true,
          'uid': 'undefined-cda539c5-afb0-7af3-a5bc-6fbf1c63e3b2'
        },
        {
          'section': 'history',
          'subsection': 'education',
          'code': 'required',
          'valid': true,
          'uid': 'undefined-7fa2b2c9-2461-c179-1249-914faba42ea7'
        },
        {
          'section': 'history',
          'subsection': 'education',
          'code': 'daterange.required',
          'valid': true,
          'uid': 'Dates-75b6895c-b47a-d3ca-d8ec-509a2b0712c8'
        },
        {
          'section': 'history',
          'subsection': 'education',
          'code': 'daterange.order',
          'valid': true,
          'uid': 'Dates-75b6895c-b47a-d3ca-d8ec-509a2b0712c8'
        },
        {
          'section': 'history',
          'subsection': 'education',
          'code': 'location.address.state.required',
          'valid': true,
          'uid': 'state-fcb1caf1-f7b5-d04c-be89-c56ddf6fc194'
        },
        {
          'section': 'history',
          'subsection': 'education',
          'code': 'location.address.state.notfound',
          'valid': true,
          'uid': 'state-fcb1caf1-f7b5-d04c-be89-c56ddf6fc194'
        },
        {
          'section': 'history',
          'subsection': 'education',
          'code': 'daterange.from.month.required',
          'valid': true,
          'uid': 'month-34317272-12e3-f018-5edb-a337363c2a3c'
        },
        {
          'section': 'history',
          'subsection': 'education',
          'code': 'daterange.from.month.length',
          'valid': true,
          'uid': 'month-34317272-12e3-f018-5edb-a337363c2a3c'
        },
        {
          'section': 'history',
          'subsection': 'education',
          'code': 'daterange.from.month.pattern',
          'valid': true,
          'uid': 'month-34317272-12e3-f018-5edb-a337363c2a3c'
        },
        {
          'section': 'history',
          'subsection': 'education',
          'code': 'daterange.from.month.min',
          'valid': true,
          'uid': 'month-b9e5a5bd-9717-e2d9-4b91-4dd9b92ff5ee'
        },
        {
          'section': 'history',
          'subsection': 'education',
          'code': 'daterange.from.month.max',
          'valid': true,
          'uid': 'month-b9e5a5bd-9717-e2d9-4b91-4dd9b92ff5ee'
        },
        {
          'section': 'history',
          'subsection': 'education',
          'code': 'daterange.from.required',
          'valid': true,
          'uid': 'from-d10cd5c6-c194-5d6a-56f0-54d1194b69c3'
        },
        {
          'section': 'history',
          'subsection': 'education',
          'code': 'daterange.from.max',
          'valid': true,
          'uid': 'from-d10cd5c6-c194-5d6a-56f0-54d1194b69c3'
        },
        {
          'section': 'history',
          'subsection': 'education',
          'code': 'daterange.from.min',
          'valid': true,
          'uid': 'from-d10cd5c6-c194-5d6a-56f0-54d1194b69c3'
        },
        {
          'section': 'history',
          'subsection': 'education',
          'code': 'daterange.from.day.required',
          'valid': true,
          'uid': 'day-a2b4c35c-433a-688d-fd35-bdc6fb6c68d1'
        },
        {
          'section': 'history',
          'subsection': 'education',
          'code': 'daterange.from.day.length',
          'valid': true,
          'uid': 'day-a2b4c35c-433a-688d-fd35-bdc6fb6c68d1'
        },
        {
          'section': 'history',
          'subsection': 'education',
          'code': 'daterange.from.day.pattern',
          'valid': true,
          'uid': 'day-a2b4c35c-433a-688d-fd35-bdc6fb6c68d1'
        },
        {
          'section': 'history',
          'subsection': 'education',
          'code': 'daterange.from.day.min',
          'valid': true,
          'uid': 'day-9c5fc0fb-ac7e-bf8a-e544-8bb57e807236'
        },
        {
          'section': 'history',
          'subsection': 'education',
          'code': 'daterange.from.day.max',
          'valid': true,
          'uid': 'day-9c5fc0fb-ac7e-bf8a-e544-8bb57e807236'
        },
        {
          'section': 'history',
          'subsection': 'education',
          'code': 'daterange.from.year.required',
          'valid': true,
          'uid': 'year-d09ff350-b5de-8c41-566d-5533af07f144'
        },
        {
          'section': 'history',
          'subsection': 'education',
          'code': 'daterange.from.year.length',
          'valid': true,
          'uid': 'year-d09ff350-b5de-8c41-566d-5533af07f144'
        },
        {
          'section': 'history',
          'subsection': 'education',
          'code': 'daterange.from.year.pattern',
          'valid': true,
          'uid': 'year-d09ff350-b5de-8c41-566d-5533af07f144'
        },
        {
          'section': 'history',
          'subsection': 'education',
          'code': 'daterange.from.year.min',
          'valid': true,
          'uid': 'year-b37319ce-d30d-cf5a-80dc-1fd8b6cfd7b3'
        },
        {
          'section': 'history',
          'subsection': 'education',
          'code': 'daterange.from.year.max',
          'valid': true,
          'uid': 'year-b37319ce-d30d-cf5a-80dc-1fd8b6cfd7b3'
        },
        {
          'section': 'history',
          'subsection': 'education',
          'code': 'daterange.to.month.required',
          'valid': true,
          'uid': 'month-4229712d-4850-0626-9e22-f66eb971ed96'
        },
        {
          'section': 'history',
          'subsection': 'education',
          'code': 'daterange.to.month.length',
          'valid': true,
          'uid': 'month-4229712d-4850-0626-9e22-f66eb971ed96'
        },
        {
          'section': 'history',
          'subsection': 'education',
          'code': 'daterange.to.month.pattern',
          'valid': true,
          'uid': 'month-4229712d-4850-0626-9e22-f66eb971ed96'
        },
        {
          'section': 'history',
          'subsection': 'education',
          'code': 'daterange.to.month.min',
          'valid': true,
          'uid': 'month-f6525ea0-068f-d7b2-af58-afeb1bdb3891'
        },
        {
          'section': 'history',
          'subsection': 'education',
          'code': 'daterange.to.month.max',
          'valid': true,
          'uid': 'month-f6525ea0-068f-d7b2-af58-afeb1bdb3891'
        },
        {
          'section': 'history',
          'subsection': 'education',
          'code': 'daterange.to.required',
          'valid': true,
          'uid': 'to-3414853b-549a-7bd1-3737-92b58647b385'
        },
        {
          'section': 'history',
          'subsection': 'education',
          'code': 'daterange.to.max',
          'valid': true,
          'uid': 'to-3414853b-549a-7bd1-3737-92b58647b385'
        },
        {
          'section': 'history',
          'subsection': 'education',
          'code': 'daterange.to.min',
          'valid': true,
          'uid': 'to-3414853b-549a-7bd1-3737-92b58647b385'
        },
        {
          'section': 'history',
          'subsection': 'education',
          'code': 'daterange.to.day.required',
          'valid': true,
          'uid': 'day-8a7a9573-f911-7776-b661-86db65fc3a86'
        },
        {
          'section': 'history',
          'subsection': 'education',
          'code': 'daterange.to.day.length',
          'valid': true,
          'uid': 'day-8a7a9573-f911-7776-b661-86db65fc3a86'
        },
        {
          'section': 'history',
          'subsection': 'education',
          'code': 'daterange.to.day.pattern',
          'valid': true,
          'uid': 'day-8a7a9573-f911-7776-b661-86db65fc3a86'
        },
        {
          'section': 'history',
          'subsection': 'education',
          'code': 'daterange.to.day.min',
          'valid': true,
          'uid': 'day-4091b752-a21e-68ff-db22-cfb2cac3b306'
        },
        {
          'section': 'history',
          'subsection': 'education',
          'code': 'daterange.to.day.max',
          'valid': true,
          'uid': 'day-4091b752-a21e-68ff-db22-cfb2cac3b306'
        },
        {
          'section': 'history',
          'subsection': 'education',
          'code': 'daterange.to.year.required',
          'valid': true,
          'uid': 'year-24e9d37d-4433-2865-6114-460e6da9eab5'
        },
        {
          'section': 'history',
          'subsection': 'education',
          'code': 'daterange.to.year.length',
          'valid': true,
          'uid': 'year-24e9d37d-4433-2865-6114-460e6da9eab5'
        },
        {
          'section': 'history',
          'subsection': 'education',
          'code': 'daterange.to.year.pattern',
          'valid': true,
          'uid': 'year-24e9d37d-4433-2865-6114-460e6da9eab5'
        },
        {
          'section': 'history',
          'subsection': 'education',
          'code': 'daterange.to.year.min',
          'valid': true,
          'uid': 'year-5242f9c6-b2a0-36a0-8b72-8b6b2b84f798'
        },
        {
          'section': 'history',
          'subsection': 'education',
          'code': 'daterange.to.year.max',
          'valid': true,
          'uid': 'year-5242f9c6-b2a0-36a0-8b72-8b6b2b84f798'
        },
        {
          'section': 'history',
          'subsection': 'education',
          'code': 'required',
          'valid': true,
          'uid': 'undefined-87ec3aab-d759-b7cb-0b5a-f55e337c4117'
        },
        {
          'section': 'history',
          'subsection': 'education',
          'code': 'required',
          'valid': true,
          'uid': 'undefined-adc591b4-7b28-3211-83a5-29e2e6f3ea11'
        },
        {
          'section': 'history',
          'subsection': 'education',
          'code': 'date.month.required',
          'valid': true,
          'uid': 'month-14796811-6d01-f567-acf9-2d198c9b9dbc'
        },
        {
          'section': 'history',
          'subsection': 'education',
          'code': 'date.month.length',
          'valid': true,
          'uid': 'month-14796811-6d01-f567-acf9-2d198c9b9dbc'
        },
        {
          'section': 'history',
          'subsection': 'education',
          'code': 'date.month.pattern',
          'valid': true,
          'uid': 'month-14796811-6d01-f567-acf9-2d198c9b9dbc'
        },
        {
          'section': 'history',
          'subsection': 'education',
          'code': 'date.month.min',
          'valid': true,
          'uid': 'month-b3bde64e-9fa9-2125-4fe0-1b923eecde2c'
        },
        {
          'section': 'history',
          'subsection': 'education',
          'code': 'date.month.max',
          'valid': true,
          'uid': 'month-b3bde64e-9fa9-2125-4fe0-1b923eecde2c'
        },
        {
          'section': 'history',
          'subsection': 'education',
          'code': 'date.required',
          'valid': true,
          'uid': 'Date-c7236184-9f52-a4fa-eb62-03817cad0ffd'
        },
        {
          'section': 'history',
          'subsection': 'education',
          'code': 'date.max',
          'valid': true,
          'uid': 'Date-c7236184-9f52-a4fa-eb62-03817cad0ffd'
        },
        {
          'section': 'history',
          'subsection': 'education',
          'code': 'date.min',
          'valid': true,
          'uid': 'Date-c7236184-9f52-a4fa-eb62-03817cad0ffd'
        },
        {
          'section': 'history',
          'subsection': 'education',
          'code': 'date.day.required',
          'valid': true,
          'uid': 'day-9466ab99-2497-b1ff-84d0-558a595033aa'
        },
        {
          'section': 'history',
          'subsection': 'education',
          'code': 'date.day.length',
          'valid': true,
          'uid': 'day-9466ab99-2497-b1ff-84d0-558a595033aa'
        },
        {
          'section': 'history',
          'subsection': 'education',
          'code': 'date.day.pattern',
          'valid': true,
          'uid': 'day-9466ab99-2497-b1ff-84d0-558a595033aa'
        },
        {
          'section': 'history',
          'subsection': 'education',
          'code': 'date.day.min',
          'valid': true,
          'uid': 'day-dd039695-944d-6661-76b8-582af3d4328e'
        },
        {
          'section': 'history',
          'subsection': 'education',
          'code': 'date.day.max',
          'valid': true,
          'uid': 'day-dd039695-944d-6661-76b8-582af3d4328e'
        },
        {
          'section': 'history',
          'subsection': 'education',
          'code': 'date.year.required',
          'valid': true,
          'uid': 'year-894075c2-f780-416d-ba46-4bc43ce31699'
        },
        {
          'section': 'history',
          'subsection': 'education',
          'code': 'date.year.length',
          'valid': true,
          'uid': 'year-894075c2-f780-416d-ba46-4bc43ce31699'
        },
        {
          'section': 'history',
          'subsection': 'education',
          'code': 'date.year.pattern',
          'valid': true,
          'uid': 'year-894075c2-f780-416d-ba46-4bc43ce31699'
        },
        {
          'section': 'history',
          'subsection': 'education',
          'code': 'date.year.min',
          'valid': true,
          'uid': 'year-56332ef8-f2d6-f6c8-698a-88af897a67f9'
        },
        {
          'section': 'history',
          'subsection': 'education',
          'code': 'date.year.max',
          'valid': true,
          'uid': 'year-56332ef8-f2d6-f6c8-698a-88af897a67f9'
        },
        {
          'section': 'history',
          'subsection': 'education',
          'code': 'required',
          'valid': true,
          'uid': 'undefined-54cc56df-6db0-dbf9-0e0a-95200268d914'
        },
        {
          'section': 'history',
          'subsection': 'review',
          'code': 'location.address.street.required',
          'valid': true,
          'uid': 'address-d060aa33-0f97-aa74-17f0-e0c4d1b6d0ef'
        },
        {
          'section': 'history',
          'subsection': 'review',
          'code': 'location.address.street.length',
          'valid': true,
          'uid': 'address-d060aa33-0f97-aa74-17f0-e0c4d1b6d0ef'
        },
        {
          'section': 'history',
          'subsection': 'review',
          'code': 'location.address.street.pattern',
          'valid': true,
          'uid': 'address-d060aa33-0f97-aa74-17f0-e0c4d1b6d0ef'
        },
        {
          'section': 'history',
          'subsection': 'review',
          'code': 'location.address.required',
          'valid': true,
          'uid': 'Address-674465c7-85ab-264f-0c46-9634f96a37fa'
        },
        {
          'section': 'history',
          'subsection': 'review',
          'code': 'location.address.street.required',
          'valid': true,
          'uid': 'street2-019ba334-ba5c-7039-d6db-da363de4a396'
        },
        {
          'section': 'history',
          'subsection': 'review',
          'code': 'location.address.street.length',
          'valid': null,
          'uid': 'street2-019ba334-ba5c-7039-d6db-da363de4a396'
        },
        {
          'section': 'history',
          'subsection': 'review',
          'code': 'location.address.street.pattern',
          'valid': null,
          'uid': 'street2-019ba334-ba5c-7039-d6db-da363de4a396'
        },
        {
          'section': 'history',
          'subsection': 'review',
          'code': 'location.address.city.required',
          'valid': true,
          'uid': 'city-a413a80d-109c-5fd1-7e0f-5a3f85c6e8f4'
        },
        {
          'section': 'history',
          'subsection': 'review',
          'code': 'location.address.city.length',
          'valid': true,
          'uid': 'city-a413a80d-109c-5fd1-7e0f-5a3f85c6e8f4'
        },
        {
          'section': 'history',
          'subsection': 'review',
          'code': 'location.address.city.pattern',
          'valid': true,
          'uid': 'city-a413a80d-109c-5fd1-7e0f-5a3f85c6e8f4'
        },
        {
          'section': 'history',
          'subsection': 'review',
          'code': 'location.address.zipcode.required',
          'valid': true,
          'uid': 'zipcode-2cd26302-281a-43a2-0f5f-4c16cd37f734'
        },
        {
          'section': 'history',
          'subsection': 'review',
          'code': 'location.address.zipcode.length',
          'valid': true,
          'uid': 'zipcode-2cd26302-281a-43a2-0f5f-4c16cd37f734'
        },
        {
          'section': 'history',
          'subsection': 'review',
          'code': 'location.address.zipcode.pattern',
          'valid': true,
          'uid': 'zipcode-2cd26302-281a-43a2-0f5f-4c16cd37f734'
        },
        {
          'section': 'history',
          'subsection': 'review',
          'code': 'required',
          'valid': true,
          'uid': 'undefined-bc431375-5013-6b01-f398-1499824e20a3'
        },
        {
          'section': 'history',
          'subsection': 'review',
          'code': 'name.required',
          'valid': true,
          'uid': 'FullName-8f1653a6-d0e8-856a-7373-4ae1073890be'
        },
        {
          'section': 'history',
          'subsection': 'review',
          'code': 'required',
          'valid': true,
          'uid': 'undefined-cc4af311-b950-f5ff-9840-63ceff380e42'
        },
        {
          'section': 'history',
          'subsection': 'review',
          'code': 'telephone.domestic.first.required',
          'valid': false,
          'uid': 'domestic_first-df527f25-db24-4358-e09f-62f8ff7a2eea'
        },
        {
          'section': 'history',
          'subsection': 'review',
          'code': 'telephone.domestic.first.length',
          'valid': null,
          'uid': 'domestic_first-df527f25-db24-4358-e09f-62f8ff7a2eea'
        },
        {
          'section': 'history',
          'subsection': 'review',
          'code': 'telephone.domestic.first.pattern',
          'valid': null,
          'uid': 'domestic_first-df527f25-db24-4358-e09f-62f8ff7a2eea'
        },
        {
          'section': 'history',
          'subsection': 'review',
          'code': 'telephone.required',
          'valid': false,
          'uid': 'Phone-1c7d33eb-53f7-040b-2632-db9d44aa9705'
        },
        {
          'section': 'history',
          'subsection': 'review',
          'code': 'telephone.domestic.second.required',
          'valid': false,
          'uid': 'domestic_second-6086d769-6943-d3d1-c0bc-e2cfceb10d18'
        },
        {
          'section': 'history',
          'subsection': 'review',
          'code': 'telephone.domestic.second.length',
          'valid': null,
          'uid': 'domestic_second-6086d769-6943-d3d1-c0bc-e2cfceb10d18'
        },
        {
          'section': 'history',
          'subsection': 'review',
          'code': 'telephone.domestic.second.pattern',
          'valid': null,
          'uid': 'domestic_second-6086d769-6943-d3d1-c0bc-e2cfceb10d18'
        },
        {
          'section': 'history',
          'subsection': 'review',
          'code': 'telephone.domestic.third.required',
          'valid': false,
          'uid': 'domestic_third-c2db250a-4c0b-77ba-2cb2-d634ecc88f40'
        },
        {
          'section': 'history',
          'subsection': 'review',
          'code': 'telephone.domestic.third.length',
          'valid': null,
          'uid': 'domestic_third-c2db250a-4c0b-77ba-2cb2-d634ecc88f40'
        },
        {
          'section': 'history',
          'subsection': 'review',
          'code': 'telephone.domestic.third.pattern',
          'valid': null,
          'uid': 'domestic_third-c2db250a-4c0b-77ba-2cb2-d634ecc88f40'
        },
        {
          'section': 'history',
          'subsection': 'review',
          'code': 'telephone.domestic.extension.required',
          'valid': true,
          'uid': 'domestic_extension-6ea0de6e-ae05-a9b9-5729-819bc339e50f'
        },
        {
          'section': 'history',
          'subsection': 'review',
          'code': 'telephone.domestic.extension.length',
          'valid': null,
          'uid': 'domestic_extension-6ea0de6e-ae05-a9b9-5729-819bc339e50f'
        },
        {
          'section': 'history',
          'subsection': 'review',
          'code': 'telephone.domestic.extension.pattern',
          'valid': null,
          'uid': 'domestic_extension-6ea0de6e-ae05-a9b9-5729-819bc339e50f'
        },
        {
          'section': 'history',
          'subsection': 'review',
          'code': 'telephone.numberType.required',
          'valid': false,
          'uid': 'undefined-382d91a0-f9b2-8abd-892d-c2aff1818e2a'
        },
        {
          'section': 'history',
          'subsection': 'review',
          'code': 'location.address.street.required',
          'valid': true,
          'uid': 'address-8c411c7d-7557-06a5-2fc7-5077aebdb5d9'
        },
        {
          'section': 'history',
          'subsection': 'review',
          'code': 'location.address.street.length',
          'valid': true,
          'uid': 'address-8c411c7d-7557-06a5-2fc7-5077aebdb5d9'
        },
        {
          'section': 'history',
          'subsection': 'review',
          'code': 'location.address.street.pattern',
          'valid': true,
          'uid': 'address-8c411c7d-7557-06a5-2fc7-5077aebdb5d9'
        },
        {
          'section': 'history',
          'subsection': 'review',
          'code': 'location.address.required',
          'valid': true,
          'uid': 'Address-1443f8c0-738a-bedc-2ef8-c14fc380936f'
        },
        {
          'section': 'history',
          'subsection': 'review',
          'code': 'location.address.street.required',
          'valid': true,
          'uid': 'street2-ac41c878-2b90-8c09-f585-8683aa1370df'
        },
        {
          'section': 'history',
          'subsection': 'review',
          'code': 'location.address.street.length',
          'valid': null,
          'uid': 'street2-ac41c878-2b90-8c09-f585-8683aa1370df'
        },
        {
          'section': 'history',
          'subsection': 'review',
          'code': 'location.address.street.pattern',
          'valid': null,
          'uid': 'street2-ac41c878-2b90-8c09-f585-8683aa1370df'
        },
        {
          'section': 'history',
          'subsection': 'review',
          'code': 'location.address.city.required',
          'valid': true,
          'uid': 'city-8a37461e-ad86-dcf7-f7d2-970f8437c5b3'
        },
        {
          'section': 'history',
          'subsection': 'review',
          'code': 'location.address.city.length',
          'valid': true,
          'uid': 'city-8a37461e-ad86-dcf7-f7d2-970f8437c5b3'
        },
        {
          'section': 'history',
          'subsection': 'review',
          'code': 'location.address.city.pattern',
          'valid': true,
          'uid': 'city-8a37461e-ad86-dcf7-f7d2-970f8437c5b3'
        },
        {
          'section': 'history',
          'subsection': 'review',
          'code': 'location.address.zipcode.required',
          'valid': true,
          'uid': 'zipcode-40f50148-e937-36a0-fed8-b81722d50437'
        },
        {
          'section': 'history',
          'subsection': 'review',
          'code': 'location.address.zipcode.length',
          'valid': true,
          'uid': 'zipcode-40f50148-e937-36a0-fed8-b81722d50437'
        },
        {
          'section': 'history',
          'subsection': 'review',
          'code': 'location.address.zipcode.pattern',
          'valid': true,
          'uid': 'zipcode-40f50148-e937-36a0-fed8-b81722d50437'
        },
        {
          'section': 'history',
          'subsection': 'review',
          'code': 'required',
          'valid': true,
          'uid': 'employment_activity-41e2a6c7-55e1-2b41-e9b0-472eef7fd15e'
        },
        {
          'section': 'history',
          'subsection': 'review',
          'code': 'required',
          'valid': true,
          'uid': 'Employment-c0a1393a-392b-aced-6083-56eab18efa1f'
        },
        {
          'section': 'history',
          'subsection': 'review',
          'code': 'length',
          'valid': true,
          'uid': 'Employment-c0a1393a-392b-aced-6083-56eab18efa1f'
        },
        {
          'section': 'history',
          'subsection': 'review',
          'code': 'pattern',
          'valid': true,
          'uid': 'Employment-c0a1393a-392b-aced-6083-56eab18efa1f'
        },
        {
          'section': 'history',
          'subsection': 'review',
          'code': 'required',
          'valid': true,
          'uid': 'Title-b41ef8e5-7699-98b4-d739-7af7918e3f8d'
        },
        {
          'section': 'history',
          'subsection': 'review',
          'code': 'length',
          'valid': true,
          'uid': 'Title-b41ef8e5-7699-98b4-d739-7af7918e3f8d'
        },
        {
          'section': 'history',
          'subsection': 'review',
          'code': 'pattern',
          'valid': true,
          'uid': 'Title-b41ef8e5-7699-98b4-d739-7af7918e3f8d'
        },
        {
          'section': 'history',
          'subsection': 'review',
          'code': 'required',
          'valid': true,
          'uid': 'undefined-1d356402-996d-104d-7d8d-ebf2212a9ecb'
        },
        {
          'section': 'history',
          'subsection': 'review',
          'code': 'location.address.street.required',
          'valid': true,
          'uid': 'address-f5f359a1-4e05-0859-0246-fcaca4cf3476'
        },
        {
          'section': 'history',
          'subsection': 'review',
          'code': 'location.address.street.length',
          'valid': true,
          'uid': 'address-f5f359a1-4e05-0859-0246-fcaca4cf3476'
        },
        {
          'section': 'history',
          'subsection': 'review',
          'code': 'location.address.street.pattern',
          'valid': true,
          'uid': 'address-f5f359a1-4e05-0859-0246-fcaca4cf3476'
        },
        {
          'section': 'history',
          'subsection': 'review',
          'code': 'location.address.required',
          'valid': true,
          'uid': 'Address-0bdb1584-5eb4-4b81-cb79-9afca15fd1db'
        },
        {
          'section': 'history',
          'subsection': 'review',
          'code': 'location.address.street.required',
          'valid': true,
          'uid': 'street2-5a3e64bd-d64f-c064-42f7-0961a9cecdaf'
        },
        {
          'section': 'history',
          'subsection': 'review',
          'code': 'location.address.street.length',
          'valid': true,
          'uid': 'street2-5a3e64bd-d64f-c064-42f7-0961a9cecdaf'
        },
        {
          'section': 'history',
          'subsection': 'review',
          'code': 'location.address.street.pattern',
          'valid': true,
          'uid': 'street2-5a3e64bd-d64f-c064-42f7-0961a9cecdaf'
        },
        {
          'section': 'history',
          'subsection': 'review',
          'code': 'location.address.city.required',
          'valid': true,
          'uid': 'city-3b4c51fd-5cd3-9210-f99a-1012f73cbe0a'
        },
        {
          'section': 'history',
          'subsection': 'review',
          'code': 'location.address.city.length',
          'valid': true,
          'uid': 'city-3b4c51fd-5cd3-9210-f99a-1012f73cbe0a'
        },
        {
          'section': 'history',
          'subsection': 'review',
          'code': 'location.address.city.pattern',
          'valid': true,
          'uid': 'city-3b4c51fd-5cd3-9210-f99a-1012f73cbe0a'
        },
        {
          'section': 'history',
          'subsection': 'review',
          'code': 'location.address.zipcode.required',
          'valid': true,
          'uid': 'zipcode-d07ee3f6-a251-c381-40ae-032e0d15e7d3'
        },
        {
          'section': 'history',
          'subsection': 'review',
          'code': 'location.address.zipcode.length',
          'valid': true,
          'uid': 'zipcode-d07ee3f6-a251-c381-40ae-032e0d15e7d3'
        },
        {
          'section': 'history',
          'subsection': 'review',
          'code': 'location.address.zipcode.pattern',
          'valid': true,
          'uid': 'zipcode-d07ee3f6-a251-c381-40ae-032e0d15e7d3'
        },
        {
          'section': 'history',
          'subsection': 'review',
          'code': 'telephone.domestic.first.required',
          'valid': false,
          'uid': 'domestic_first-c745f008-44d2-c91a-c3e6-d07a3bf67976'
        },
        {
          'section': 'history',
          'subsection': 'review',
          'code': 'telephone.domestic.first.length',
          'valid': null,
          'uid': 'domestic_first-c745f008-44d2-c91a-c3e6-d07a3bf67976'
        },
        {
          'section': 'history',
          'subsection': 'review',
          'code': 'telephone.domestic.first.pattern',
          'valid': null,
          'uid': 'domestic_first-c745f008-44d2-c91a-c3e6-d07a3bf67976'
        },
        {
          'section': 'history',
          'subsection': 'review',
          'code': 'telephone.required',
          'valid': false,
          'uid': 'Telephone-bca003f7-fd20-28b9-d392-da0104414f31'
        },
        {
          'section': 'history',
          'subsection': 'review',
          'code': 'telephone.domestic.second.required',
          'valid': false,
          'uid': 'domestic_second-3759901d-f5ad-e1b3-ab3b-50ce18a90009'
        },
        {
          'section': 'history',
          'subsection': 'review',
          'code': 'telephone.domestic.second.length',
          'valid': null,
          'uid': 'domestic_second-3759901d-f5ad-e1b3-ab3b-50ce18a90009'
        },
        {
          'section': 'history',
          'subsection': 'review',
          'code': 'telephone.domestic.second.pattern',
          'valid': null,
          'uid': 'domestic_second-3759901d-f5ad-e1b3-ab3b-50ce18a90009'
        },
        {
          'section': 'history',
          'subsection': 'review',
          'code': 'telephone.domestic.third.required',
          'valid': false,
          'uid': 'domestic_third-2657a644-c741-5141-0d4f-f0966c72845c'
        },
        {
          'section': 'history',
          'subsection': 'review',
          'code': 'telephone.domestic.third.length',
          'valid': null,
          'uid': 'domestic_third-2657a644-c741-5141-0d4f-f0966c72845c'
        },
        {
          'section': 'history',
          'subsection': 'review',
          'code': 'telephone.domestic.third.pattern',
          'valid': null,
          'uid': 'domestic_third-2657a644-c741-5141-0d4f-f0966c72845c'
        },
        {
          'section': 'history',
          'subsection': 'review',
          'code': 'telephone.domestic.extension.required',
          'valid': true,
          'uid': 'domestic_extension-44186101-d824-fd77-8d1e-aa0a89366e8c'
        },
        {
          'section': 'history',
          'subsection': 'review',
          'code': 'telephone.domestic.extension.length',
          'valid': null,
          'uid': 'domestic_extension-44186101-d824-fd77-8d1e-aa0a89366e8c'
        },
        {
          'section': 'history',
          'subsection': 'review',
          'code': 'telephone.domestic.extension.pattern',
          'valid': null,
          'uid': 'domestic_extension-44186101-d824-fd77-8d1e-aa0a89366e8c'
        },
        {
          'section': 'history',
          'subsection': 'review',
          'code': 'telephone.numberType.required',
          'valid': false,
          'uid': 'undefined-8caec46b-7d2d-17d2-0099-fbc4515a9d3a'
        },
        {
          'section': 'history',
          'subsection': 'review',
          'code': 'required',
          'valid': true,
          'uid': 'undefined-e0579407-0187-d984-6390-de500df12622'
        },
        {
          'section': 'history',
          'subsection': 'review',
          'code': 'required',
          'valid': true,
          'uid': 'SupervisorName-f696cde0-2a6a-5972-cefa-f8b7a2727701'
        },
        {
          'section': 'history',
          'subsection': 'review',
          'code': 'length',
          'valid': true,
          'uid': 'SupervisorName-f696cde0-2a6a-5972-cefa-f8b7a2727701'
        },
        {
          'section': 'history',
          'subsection': 'review',
          'code': 'pattern',
          'valid': true,
          'uid': 'SupervisorName-f696cde0-2a6a-5972-cefa-f8b7a2727701'
        },
        {
          'section': 'history',
          'subsection': 'review',
          'code': 'required',
          'valid': true,
          'uid': 'Title-bd180e2d-c2ea-6da8-cf87-b72bee9d4dd5'
        },
        {
          'section': 'history',
          'subsection': 'review',
          'code': 'length',
          'valid': true,
          'uid': 'Title-bd180e2d-c2ea-6da8-cf87-b72bee9d4dd5'
        },
        {
          'section': 'history',
          'subsection': 'review',
          'code': 'pattern',
          'valid': true,
          'uid': 'Title-bd180e2d-c2ea-6da8-cf87-b72bee9d4dd5'
        },
        {
          'section': 'history',
          'subsection': 'review',
          'code': 'email.required',
          'valid': false,
          'uid': 'Email-e94a495f-622c-463c-5a60-f1654cd097e2'
        },
        {
          'section': 'history',
          'subsection': 'review',
          'code': 'email.length',
          'valid': null,
          'uid': 'Email-e94a495f-622c-463c-5a60-f1654cd097e2'
        },
        {
          'section': 'history',
          'subsection': 'review',
          'code': 'email.pattern',
          'valid': null,
          'uid': 'Email-e94a495f-622c-463c-5a60-f1654cd097e2'
        },
        {
          'section': 'history',
          'subsection': 'review',
          'code': 'location.address.street.required',
          'valid': true,
          'uid': 'address-3f901fc6-44f2-6d23-ed24-96d7af9937ce'
        },
        {
          'section': 'history',
          'subsection': 'review',
          'code': 'location.address.street.length',
          'valid': true,
          'uid': 'address-3f901fc6-44f2-6d23-ed24-96d7af9937ce'
        },
        {
          'section': 'history',
          'subsection': 'review',
          'code': 'location.address.street.pattern',
          'valid': true,
          'uid': 'address-3f901fc6-44f2-6d23-ed24-96d7af9937ce'
        },
        {
          'section': 'history',
          'subsection': 'review',
          'code': 'location.address.required',
          'valid': true,
          'uid': 'Address-28784057-af5f-db84-d46f-11051f29a082'
        },
        {
          'section': 'history',
          'subsection': 'review',
          'code': 'location.address.street.required',
          'valid': true,
          'uid': 'street2-840f49bf-11ec-d5b1-350a-8f95a48ac2cd'
        },
        {
          'section': 'history',
          'subsection': 'review',
          'code': 'location.address.street.length',
          'valid': true,
          'uid': 'street2-840f49bf-11ec-d5b1-350a-8f95a48ac2cd'
        },
        {
          'section': 'history',
          'subsection': 'review',
          'code': 'location.address.street.pattern',
          'valid': true,
          'uid': 'street2-840f49bf-11ec-d5b1-350a-8f95a48ac2cd'
        },
        {
          'section': 'history',
          'subsection': 'review',
          'code': 'location.address.city.required',
          'valid': true,
          'uid': 'city-7932a03f-ff2a-86d0-a837-ccdccbc33e97'
        },
        {
          'section': 'history',
          'subsection': 'review',
          'code': 'location.address.city.length',
          'valid': true,
          'uid': 'city-7932a03f-ff2a-86d0-a837-ccdccbc33e97'
        },
        {
          'section': 'history',
          'subsection': 'review',
          'code': 'location.address.city.pattern',
          'valid': true,
          'uid': 'city-7932a03f-ff2a-86d0-a837-ccdccbc33e97'
        },
        {
          'section': 'history',
          'subsection': 'review',
          'code': 'location.address.zipcode.required',
          'valid': true,
          'uid': 'zipcode-bd5ad58d-5f57-d48a-4e5a-e8459047985b'
        },
        {
          'section': 'history',
          'subsection': 'review',
          'code': 'location.address.zipcode.length',
          'valid': true,
          'uid': 'zipcode-bd5ad58d-5f57-d48a-4e5a-e8459047985b'
        },
        {
          'section': 'history',
          'subsection': 'review',
          'code': 'location.address.zipcode.pattern',
          'valid': true,
          'uid': 'zipcode-bd5ad58d-5f57-d48a-4e5a-e8459047985b'
        },
        {
          'section': 'history',
          'subsection': 'review',
          'code': 'telephone.domestic.first.required',
          'valid': false,
          'uid': 'domestic_first-861981e0-3be1-9f61-07ac-77de7ff0a7b6'
        },
        {
          'section': 'history',
          'subsection': 'review',
          'code': 'telephone.domestic.first.length',
          'valid': null,
          'uid': 'domestic_first-861981e0-3be1-9f61-07ac-77de7ff0a7b6'
        },
        {
          'section': 'history',
          'subsection': 'review',
          'code': 'telephone.domestic.first.pattern',
          'valid': null,
          'uid': 'domestic_first-861981e0-3be1-9f61-07ac-77de7ff0a7b6'
        },
        {
          'section': 'history',
          'subsection': 'review',
          'code': 'telephone.required',
          'valid': false,
          'uid': 'Telephone-383535d8-7db7-02ba-4c6a-c052a7195971'
        },
        {
          'section': 'history',
          'subsection': 'review',
          'code': 'telephone.domestic.second.required',
          'valid': false,
          'uid': 'domestic_second-4dedbda9-fbcb-e9da-3b08-1893cf3a713f'
        },
        {
          'section': 'history',
          'subsection': 'review',
          'code': 'telephone.domestic.second.length',
          'valid': null,
          'uid': 'domestic_second-4dedbda9-fbcb-e9da-3b08-1893cf3a713f'
        },
        {
          'section': 'history',
          'subsection': 'review',
          'code': 'telephone.domestic.second.pattern',
          'valid': null,
          'uid': 'domestic_second-4dedbda9-fbcb-e9da-3b08-1893cf3a713f'
        },
        {
          'section': 'history',
          'subsection': 'review',
          'code': 'telephone.domestic.third.required',
          'valid': false,
          'uid': 'domestic_third-7426e857-3301-4451-0fbc-95d6ee012124'
        },
        {
          'section': 'history',
          'subsection': 'review',
          'code': 'telephone.domestic.third.length',
          'valid': null,
          'uid': 'domestic_third-7426e857-3301-4451-0fbc-95d6ee012124'
        },
        {
          'section': 'history',
          'subsection': 'review',
          'code': 'telephone.domestic.third.pattern',
          'valid': null,
          'uid': 'domestic_third-7426e857-3301-4451-0fbc-95d6ee012124'
        },
        {
          'section': 'history',
          'subsection': 'review',
          'code': 'telephone.domestic.extension.required',
          'valid': true,
          'uid': 'domestic_extension-ae454221-7a74-d0e8-e433-510214fdc39e'
        },
        {
          'section': 'history',
          'subsection': 'review',
          'code': 'telephone.domestic.extension.length',
          'valid': null,
          'uid': 'domestic_extension-ae454221-7a74-d0e8-e433-510214fdc39e'
        },
        {
          'section': 'history',
          'subsection': 'review',
          'code': 'telephone.domestic.extension.pattern',
          'valid': null,
          'uid': 'domestic_extension-ae454221-7a74-d0e8-e433-510214fdc39e'
        },
        {
          'section': 'history',
          'subsection': 'review',
          'code': 'telephone.numberType.required',
          'valid': false,
          'uid': 'undefined-03b1b85f-32c7-328d-8804-0f452b148412'
        },
        {
          'section': 'history',
          'subsection': 'review',
          'code': 'required',
          'valid': true,
          'uid': 'undefined-02daa8c9-7bf5-f928-b0eb-341b076c0e42'
        },
        {
          'section': 'history',
          'subsection': 'review',
          'code': 'required',
          'valid': true,
          'uid': 'reason_description-bc01f37e-38f9-f0cb-e040-5348244fcd92'
        },
        {
          'section': 'history',
          'subsection': 'review',
          'code': 'length',
          'valid': true,
          'uid': 'reason_description-bc01f37e-38f9-f0cb-e040-5348244fcd92'
        },
        {
          'section': 'history',
          'subsection': 'review',
          'code': 'pattern',
          'valid': true,
          'uid': 'reason_description-bc01f37e-38f9-f0cb-e040-5348244fcd92'
        },
        {
          'section': 'history',
          'subsection': 'review',
          'code': 'required',
          'valid': true,
          'uid': 'undefined-2594e477-3518-ea7a-56f0-c5930b830c43'
        },
        {
          'section': 'history',
          'subsection': 'review',
          'code': 'required',
          'valid': true,
          'uid': 'undefined-834caae4-b35c-7143-ebe2-4d67b13e778c'
        },
        {
          'section': 'history',
          'subsection': 'review',
          'code': 'required',
          'valid': true,
          'uid': 'undefined-2effdaba-f2f6-8bd2-a839-21e33c992381'
        },
        {
          'section': 'history',
          'subsection': 'review',
          'code': 'required',
          'valid': true,
          'uid': 'Name-1c72daf2-f696-184f-7ace-f0c7eff942d3'
        },
        {
          'section': 'history',
          'subsection': 'review',
          'code': 'length',
          'valid': true,
          'uid': 'Name-1c72daf2-f696-184f-7ace-f0c7eff942d3'
        },
        {
          'section': 'history',
          'subsection': 'review',
          'code': 'pattern',
          'valid': true,
          'uid': 'Name-1c72daf2-f696-184f-7ace-f0c7eff942d3'
        },
        {
          'section': 'history',
          'subsection': 'review',
          'code': 'location.address.street.required',
          'valid': true,
          'uid': 'address-917ee537-ef7b-9bb1-ba57-042506f5316d'
        },
        {
          'section': 'history',
          'subsection': 'review',
          'code': 'location.address.street.length',
          'valid': true,
          'uid': 'address-917ee537-ef7b-9bb1-ba57-042506f5316d'
        },
        {
          'section': 'history',
          'subsection': 'review',
          'code': 'location.address.street.pattern',
          'valid': true,
          'uid': 'address-917ee537-ef7b-9bb1-ba57-042506f5316d'
        },
        {
          'section': 'history',
          'subsection': 'review',
          'code': 'location.address.required',
          'valid': true,
          'uid': 'Address-ff70aaee-fe9b-4ea7-7ea6-1bee7422a0f8'
        },
        {
          'section': 'history',
          'subsection': 'review',
          'code': 'location.address.street.required',
          'valid': true,
          'uid': 'street2-e710a422-9c45-3b5a-7364-a6c868e864f6'
        },
        {
          'section': 'history',
          'subsection': 'review',
          'code': 'location.address.street.length',
          'valid': null,
          'uid': 'street2-e710a422-9c45-3b5a-7364-a6c868e864f6'
        },
        {
          'section': 'history',
          'subsection': 'review',
          'code': 'location.address.street.pattern',
          'valid': null,
          'uid': 'street2-e710a422-9c45-3b5a-7364-a6c868e864f6'
        },
        {
          'section': 'history',
          'subsection': 'review',
          'code': 'location.address.city.required',
          'valid': true,
          'uid': 'city-88f5bc27-069f-4c30-c598-7d68705b6005'
        },
        {
          'section': 'history',
          'subsection': 'review',
          'code': 'location.address.city.length',
          'valid': true,
          'uid': 'city-88f5bc27-069f-4c30-c598-7d68705b6005'
        },
        {
          'section': 'history',
          'subsection': 'review',
          'code': 'location.address.city.pattern',
          'valid': true,
          'uid': 'city-88f5bc27-069f-4c30-c598-7d68705b6005'
        },
        {
          'section': 'history',
          'subsection': 'review',
          'code': 'location.address.zipcode.required',
          'valid': true,
          'uid': 'zipcode-4a2275b5-aca1-d848-51aa-1f1f7adcedbd'
        },
        {
          'section': 'history',
          'subsection': 'review',
          'code': 'location.address.zipcode.length',
          'valid': true,
          'uid': 'zipcode-4a2275b5-aca1-d848-51aa-1f1f7adcedbd'
        },
        {
          'section': 'history',
          'subsection': 'review',
          'code': 'location.address.zipcode.pattern',
          'valid': true,
          'uid': 'zipcode-4a2275b5-aca1-d848-51aa-1f1f7adcedbd'
        },
        {
          'section': 'history',
          'subsection': 'review',
          'code': 'required',
          'valid': true,
          'uid': 'undefined-15645f4a-afb1-7cd5-4781-721894cdc23a'
        },
        {
          'section': 'history',
          'subsection': 'review',
          'code': 'required',
          'valid': true,
          'uid': 'undefined-749a4a1b-87f3-849d-c3fe-2d912de96b5e'
        },
        {
          'section': 'history',
          'subsection': 'review',
          'code': 'required',
          'valid': true,
          'uid': 'undefined-42505513-736f-cc88-9f68-5197ca8b7b34'
        },
        {
          'section': 'history',
          'subsection': 'review',
          'code': 'required',
          'valid': true,
          'uid': 'undefined-9914a8d4-0376-2e0a-f65e-e8b2bd2fe3e6'
        },
        {
          'section': 'history',
          'subsection': 'review',
          'code': 'required',
          'valid': true,
          'uid': 'undefined-a73fb7e7-5743-dd40-8852-290577e667f2'
        },
        {
          'section': 'history',
          'subsection': 'review',
          'code': 'location.address.state.required',
          'valid': true,
          'uid': 'state-cf3eb162-ee5d-4019-2dac-24fad781602e'
        },
        {
          'section': 'history',
          'subsection': 'review',
          'code': 'location.address.state.notfound',
          'valid': true,
          'uid': 'state-cf3eb162-ee5d-4019-2dac-24fad781602e'
        },
        {
          'section': 'history',
          'subsection': 'review',
          'code': 'daterange.required',
          'valid': true,
          'uid': 'Dates-abda4625-4a89-a3a6-c4bd-46fe5ba79868'
        },
        {
          'section': 'history',
          'subsection': 'review',
          'code': 'daterange.order',
          'valid': true,
          'uid': 'Dates-abda4625-4a89-a3a6-c4bd-46fe5ba79868'
        },
        {
          'section': 'history',
          'subsection': 'review',
          'code': 'location.address.state.required',
          'valid': true,
          'uid': 'state-d2028f2a-b6c5-6738-4ac8-266f79d277bc'
        },
        {
          'section': 'history',
          'subsection': 'review',
          'code': 'location.address.state.notfound',
          'valid': true,
          'uid': 'state-d2028f2a-b6c5-6738-4ac8-266f79d277bc'
        },
        {
          'section': 'history',
          'subsection': 'review',
          'code': 'daterange.required',
          'valid': true,
          'uid': 'Dates-24321e6b-d6d1-6bd8-de13-595dd3dc1064'
        },
        {
          'section': 'history',
          'subsection': 'review',
          'code': 'daterange.order',
          'valid': true,
          'uid': 'Dates-24321e6b-d6d1-6bd8-de13-595dd3dc1064'
        },
        {
          'section': 'history',
          'subsection': 'review',
          'code': 'location.address.state.required',
          'valid': true,
          'uid': 'state-b1a6a33a-ad72-00d7-a762-2a62e74e1cb3'
        },
        {
          'section': 'history',
          'subsection': 'review',
          'code': 'location.address.state.notfound',
          'valid': true,
          'uid': 'state-b1a6a33a-ad72-00d7-a762-2a62e74e1cb3'
        },
        {
          'section': 'history',
          'subsection': 'review',
          'code': 'location.address.state.required',
          'valid': true,
          'uid': 'state-2810a3c5-2e04-96ee-2ab4-e57f956268f1'
        },
        {
          'section': 'history',
          'subsection': 'review',
          'code': 'location.address.state.notfound',
          'valid': true,
          'uid': 'state-2810a3c5-2e04-96ee-2ab4-e57f956268f1'
        },
        {
          'section': 'history',
          'subsection': 'review',
          'code': 'daterange.required',
          'valid': true,
          'uid': 'Dates-eb2a127e-1300-17c1-4de8-1182371df2dc'
        },
        {
          'section': 'history',
          'subsection': 'review',
          'code': 'daterange.order',
          'valid': true,
          'uid': 'Dates-eb2a127e-1300-17c1-4de8-1182371df2dc'
        },
        {
          'section': 'history',
          'subsection': 'review',
          'code': 'location.address.state.required',
          'valid': true,
          'uid': 'state-26d6a67f-7c80-3aa6-eaa3-b1980c9dd17f'
        },
        {
          'section': 'history',
          'subsection': 'review',
          'code': 'location.address.state.notfound',
          'valid': true,
          'uid': 'state-26d6a67f-7c80-3aa6-eaa3-b1980c9dd17f'
        },
        {
          'section': 'history',
          'subsection': 'review',
          'code': 'date.month.required',
          'valid': true,
          'uid': 'month-d30192af-acde-6150-7048-cc5648e9268e'
        },
        {
          'section': 'history',
          'subsection': 'review',
          'code': 'date.month.length',
          'valid': true,
          'uid': 'month-d30192af-acde-6150-7048-cc5648e9268e'
        },
        {
          'section': 'history',
          'subsection': 'review',
          'code': 'date.month.pattern',
          'valid': true,
          'uid': 'month-d30192af-acde-6150-7048-cc5648e9268e'
        },
        {
          'section': 'history',
          'subsection': 'review',
          'code': 'date.month.min',
          'valid': true,
          'uid': 'month-3171b28e-52cc-04bb-866f-e6c1d7f13e0e'
        },
        {
          'section': 'history',
          'subsection': 'review',
          'code': 'date.month.max',
          'valid': true,
          'uid': 'month-3171b28e-52cc-04bb-866f-e6c1d7f13e0e'
        },
        {
          'section': 'history',
          'subsection': 'review',
          'code': 'date.required',
          'valid': true,
          'uid': 'LastContact-61e231d7-7580-3b27-fc4f-eed0e3af00bf'
        },
        {
          'section': 'history',
          'subsection': 'review',
          'code': 'date.max',
          'valid': true,
          'uid': 'LastContact-61e231d7-7580-3b27-fc4f-eed0e3af00bf'
        },
        {
          'section': 'history',
          'subsection': 'review',
          'code': 'date.min',
          'valid': true,
          'uid': 'LastContact-61e231d7-7580-3b27-fc4f-eed0e3af00bf'
        },
        {
          'section': 'history',
          'subsection': 'review',
          'code': 'date.day.required',
          'valid': true,
          'uid': 'day-da56cae6-b6a8-1113-016f-fd5097b98108'
        },
        {
          'section': 'history',
          'subsection': 'review',
          'code': 'date.day.length',
          'valid': true,
          'uid': 'day-da56cae6-b6a8-1113-016f-fd5097b98108'
        },
        {
          'section': 'history',
          'subsection': 'review',
          'code': 'date.day.pattern',
          'valid': true,
          'uid': 'day-da56cae6-b6a8-1113-016f-fd5097b98108'
        },
        {
          'section': 'history',
          'subsection': 'review',
          'code': 'date.day.min',
          'valid': true,
          'uid': 'day-c6a7276e-d800-1594-8faa-d191c0545397'
        },
        {
          'section': 'history',
          'subsection': 'review',
          'code': 'date.day.max',
          'valid': true,
          'uid': 'day-c6a7276e-d800-1594-8faa-d191c0545397'
        },
        {
          'section': 'history',
          'subsection': 'review',
          'code': 'date.year.required',
          'valid': true,
          'uid': 'year-c665935e-6e70-996d-7519-76c55806a582'
        },
        {
          'section': 'history',
          'subsection': 'review',
          'code': 'date.year.length',
          'valid': true,
          'uid': 'year-c665935e-6e70-996d-7519-76c55806a582'
        },
        {
          'section': 'history',
          'subsection': 'review',
          'code': 'date.year.pattern',
          'valid': true,
          'uid': 'year-c665935e-6e70-996d-7519-76c55806a582'
        },
        {
          'section': 'history',
          'subsection': 'review',
          'code': 'date.year.min',
          'valid': true,
          'uid': 'year-636bdb42-1a91-914e-d720-28a1ff67066f'
        },
        {
          'section': 'history',
          'subsection': 'review',
          'code': 'date.year.max',
          'valid': true,
          'uid': 'year-636bdb42-1a91-914e-d720-28a1ff67066f'
        },
        {
          'section': 'history',
          'subsection': 'review',
          'code': 'date.month.required',
          'valid': true,
          'uid': 'month-bc73b084-bd72-bf01-b778-bfb05326892a'
        },
        {
          'section': 'history',
          'subsection': 'review',
          'code': 'date.month.length',
          'valid': true,
          'uid': 'month-bc73b084-bd72-bf01-b778-bfb05326892a'
        },
        {
          'section': 'history',
          'subsection': 'review',
          'code': 'date.month.pattern',
          'valid': true,
          'uid': 'month-bc73b084-bd72-bf01-b778-bfb05326892a'
        },
        {
          'section': 'history',
          'subsection': 'review',
          'code': 'date.month.min',
          'valid': true,
          'uid': 'month-824e98dc-d507-b4f2-369d-1daf424aec7f'
        },
        {
          'section': 'history',
          'subsection': 'review',
          'code': 'date.month.max',
          'valid': true,
          'uid': 'month-824e98dc-d507-b4f2-369d-1daf424aec7f'
        },
        {
          'section': 'history',
          'subsection': 'review',
          'code': 'date.required',
          'valid': true,
          'uid': 'Date-d4471dd3-b069-45b8-49bd-5153677886e8'
        },
        {
          'section': 'history',
          'subsection': 'review',
          'code': 'date.max',
          'valid': true,
          'uid': 'Date-d4471dd3-b069-45b8-49bd-5153677886e8'
        },
        {
          'section': 'history',
          'subsection': 'review',
          'code': 'date.min',
          'valid': true,
          'uid': 'Date-d4471dd3-b069-45b8-49bd-5153677886e8'
        },
        {
          'section': 'history',
          'subsection': 'review',
          'code': 'date.day.required',
          'valid': true,
          'uid': 'day-5333ea1b-25cd-1fa7-ab57-779dbe5831d2'
        },
        {
          'section': 'history',
          'subsection': 'review',
          'code': 'date.day.length',
          'valid': true,
          'uid': 'day-5333ea1b-25cd-1fa7-ab57-779dbe5831d2'
        },
        {
          'section': 'history',
          'subsection': 'review',
          'code': 'date.day.pattern',
          'valid': true,
          'uid': 'day-5333ea1b-25cd-1fa7-ab57-779dbe5831d2'
        },
        {
          'section': 'history',
          'subsection': 'review',
          'code': 'date.day.min',
          'valid': true,
          'uid': 'day-e2488b16-8428-d9d2-cce3-494746f921a3'
        },
        {
          'section': 'history',
          'subsection': 'review',
          'code': 'date.day.max',
          'valid': true,
          'uid': 'day-e2488b16-8428-d9d2-cce3-494746f921a3'
        },
        {
          'section': 'history',
          'subsection': 'review',
          'code': 'date.year.required',
          'valid': true,
          'uid': 'year-275f498f-8755-c3b5-900f-88f8bfc45cbe'
        },
        {
          'section': 'history',
          'subsection': 'review',
          'code': 'date.year.length',
          'valid': true,
          'uid': 'year-275f498f-8755-c3b5-900f-88f8bfc45cbe'
        },
        {
          'section': 'history',
          'subsection': 'review',
          'code': 'date.year.pattern',
          'valid': true,
          'uid': 'year-275f498f-8755-c3b5-900f-88f8bfc45cbe'
        },
        {
          'section': 'history',
          'subsection': 'review',
          'code': 'date.year.min',
          'valid': true,
          'uid': 'year-788abab4-9701-2e0a-8aaa-92c8c00c6927'
        },
        {
          'section': 'history',
          'subsection': 'review',
          'code': 'date.year.max',
          'valid': true,
          'uid': 'year-788abab4-9701-2e0a-8aaa-92c8c00c6927'
        },
        {
          'section': 'history',
          'subsection': 'review',
          'code': 'daterange.from.month.required',
          'valid': true,
          'uid': 'month-4834dec6-807f-44ea-7bf3-ac4acdfa918d'
        },
        {
          'section': 'history',
          'subsection': 'review',
          'code': 'daterange.from.month.length',
          'valid': true,
          'uid': 'month-4834dec6-807f-44ea-7bf3-ac4acdfa918d'
        },
        {
          'section': 'history',
          'subsection': 'review',
          'code': 'daterange.from.month.pattern',
          'valid': true,
          'uid': 'month-4834dec6-807f-44ea-7bf3-ac4acdfa918d'
        },
        {
          'section': 'history',
          'subsection': 'review',
          'code': 'daterange.from.month.min',
          'valid': true,
          'uid': 'month-3d8d065b-300b-26e6-b7d2-d8ddc1304e4a'
        },
        {
          'section': 'history',
          'subsection': 'review',
          'code': 'daterange.from.month.max',
          'valid': true,
          'uid': 'month-3d8d065b-300b-26e6-b7d2-d8ddc1304e4a'
        },
        {
          'section': 'history',
          'subsection': 'review',
          'code': 'daterange.from.required',
          'valid': true,
          'uid': 'from-68709322-39a9-740a-8cea-03b4e8317b2e'
        },
        {
          'section': 'history',
          'subsection': 'review',
          'code': 'daterange.from.max',
          'valid': true,
          'uid': 'from-68709322-39a9-740a-8cea-03b4e8317b2e'
        },
        {
          'section': 'history',
          'subsection': 'review',
          'code': 'daterange.from.min',
          'valid': true,
          'uid': 'from-68709322-39a9-740a-8cea-03b4e8317b2e'
        },
        {
          'section': 'history',
          'subsection': 'review',
          'code': 'daterange.from.day.required',
          'valid': true,
          'uid': 'day-2fad3e06-478d-33a7-6083-2a25aed12aa5'
        },
        {
          'section': 'history',
          'subsection': 'review',
          'code': 'daterange.from.day.length',
          'valid': true,
          'uid': 'day-2fad3e06-478d-33a7-6083-2a25aed12aa5'
        },
        {
          'section': 'history',
          'subsection': 'review',
          'code': 'daterange.from.day.pattern',
          'valid': true,
          'uid': 'day-2fad3e06-478d-33a7-6083-2a25aed12aa5'
        },
        {
          'section': 'history',
          'subsection': 'review',
          'code': 'daterange.from.day.min',
          'valid': true,
          'uid': 'day-44076e34-848d-3e73-4fc2-d7e242bc5b2d'
        },
        {
          'section': 'history',
          'subsection': 'review',
          'code': 'daterange.from.day.max',
          'valid': true,
          'uid': 'day-44076e34-848d-3e73-4fc2-d7e242bc5b2d'
        },
        {
          'section': 'history',
          'subsection': 'review',
          'code': 'daterange.from.year.required',
          'valid': true,
          'uid': 'year-84c847d7-f2ac-5d55-5dd0-9dfeb6e647bb'
        },
        {
          'section': 'history',
          'subsection': 'review',
          'code': 'daterange.from.year.length',
          'valid': true,
          'uid': 'year-84c847d7-f2ac-5d55-5dd0-9dfeb6e647bb'
        },
        {
          'section': 'history',
          'subsection': 'review',
          'code': 'daterange.from.year.pattern',
          'valid': true,
          'uid': 'year-84c847d7-f2ac-5d55-5dd0-9dfeb6e647bb'
        },
        {
          'section': 'history',
          'subsection': 'review',
          'code': 'daterange.from.year.min',
          'valid': true,
          'uid': 'year-97cf73de-65f1-5519-72b7-9ae89134b04e'
        },
        {
          'section': 'history',
          'subsection': 'review',
          'code': 'daterange.from.year.max',
          'valid': true,
          'uid': 'year-97cf73de-65f1-5519-72b7-9ae89134b04e'
        },
        {
          'section': 'history',
          'subsection': 'review',
          'code': 'daterange.to.month.required',
          'valid': true,
          'uid': 'month-0f0a3f0e-8cd8-d2a1-c378-819206e8205a'
        },
        {
          'section': 'history',
          'subsection': 'review',
          'code': 'daterange.to.month.length',
          'valid': true,
          'uid': 'month-0f0a3f0e-8cd8-d2a1-c378-819206e8205a'
        },
        {
          'section': 'history',
          'subsection': 'review',
          'code': 'daterange.to.month.pattern',
          'valid': true,
          'uid': 'month-0f0a3f0e-8cd8-d2a1-c378-819206e8205a'
        },
        {
          'section': 'history',
          'subsection': 'review',
          'code': 'daterange.to.month.min',
          'valid': true,
          'uid': 'month-49532d48-e0ce-3419-ad41-cd2cb6c3f1b1'
        },
        {
          'section': 'history',
          'subsection': 'review',
          'code': 'daterange.to.month.max',
          'valid': true,
          'uid': 'month-49532d48-e0ce-3419-ad41-cd2cb6c3f1b1'
        },
        {
          'section': 'history',
          'subsection': 'review',
          'code': 'daterange.to.required',
          'valid': true,
          'uid': 'to-c3fee85e-60f4-2aa5-0cc0-a513eba90093'
        },
        {
          'section': 'history',
          'subsection': 'review',
          'code': 'daterange.to.max',
          'valid': true,
          'uid': 'to-c3fee85e-60f4-2aa5-0cc0-a513eba90093'
        },
        {
          'section': 'history',
          'subsection': 'review',
          'code': 'daterange.to.min',
          'valid': true,
          'uid': 'to-c3fee85e-60f4-2aa5-0cc0-a513eba90093'
        },
        {
          'section': 'history',
          'subsection': 'review',
          'code': 'daterange.to.day.required',
          'valid': true,
          'uid': 'day-98e12dea-14ab-56d9-65ab-293a645954b5'
        },
        {
          'section': 'history',
          'subsection': 'review',
          'code': 'daterange.to.day.length',
          'valid': true,
          'uid': 'day-98e12dea-14ab-56d9-65ab-293a645954b5'
        },
        {
          'section': 'history',
          'subsection': 'review',
          'code': 'daterange.to.day.pattern',
          'valid': true,
          'uid': 'day-98e12dea-14ab-56d9-65ab-293a645954b5'
        },
        {
          'section': 'history',
          'subsection': 'review',
          'code': 'daterange.to.day.min',
          'valid': true,
          'uid': 'day-f8e7d1b8-dc69-0970-c1f6-f8028d031fe7'
        },
        {
          'section': 'history',
          'subsection': 'review',
          'code': 'daterange.to.day.max',
          'valid': true,
          'uid': 'day-f8e7d1b8-dc69-0970-c1f6-f8028d031fe7'
        },
        {
          'section': 'history',
          'subsection': 'review',
          'code': 'daterange.to.year.required',
          'valid': true,
          'uid': 'year-99c9cb57-d162-c246-9e97-a29a077852aa'
        },
        {
          'section': 'history',
          'subsection': 'review',
          'code': 'daterange.to.year.length',
          'valid': true,
          'uid': 'year-99c9cb57-d162-c246-9e97-a29a077852aa'
        },
        {
          'section': 'history',
          'subsection': 'review',
          'code': 'daterange.to.year.pattern',
          'valid': true,
          'uid': 'year-99c9cb57-d162-c246-9e97-a29a077852aa'
        },
        {
          'section': 'history',
          'subsection': 'review',
          'code': 'daterange.to.year.min',
          'valid': true,
          'uid': 'year-fd1759dd-4806-1c86-3839-2d8613d0af5c'
        },
        {
          'section': 'history',
          'subsection': 'review',
          'code': 'daterange.to.year.max',
          'valid': true,
          'uid': 'year-fd1759dd-4806-1c86-3839-2d8613d0af5c'
        },
        {
          'section': 'history',
          'subsection': 'review',
          'code': 'daterange.from.month.required',
          'valid': true,
          'uid': 'month-18910b88-c667-8812-10aa-f0083dae83d3'
        },
        {
          'section': 'history',
          'subsection': 'review',
          'code': 'daterange.from.month.length',
          'valid': true,
          'uid': 'month-18910b88-c667-8812-10aa-f0083dae83d3'
        },
        {
          'section': 'history',
          'subsection': 'review',
          'code': 'daterange.from.month.pattern',
          'valid': true,
          'uid': 'month-18910b88-c667-8812-10aa-f0083dae83d3'
        },
        {
          'section': 'history',
          'subsection': 'review',
          'code': 'daterange.from.month.min',
          'valid': true,
          'uid': 'month-a5e20838-d4ff-09a5-6b5a-05b7f8d898fc'
        },
        {
          'section': 'history',
          'subsection': 'review',
          'code': 'daterange.from.month.max',
          'valid': true,
          'uid': 'month-a5e20838-d4ff-09a5-6b5a-05b7f8d898fc'
        },
        {
          'section': 'history',
          'subsection': 'review',
          'code': 'daterange.from.required',
          'valid': true,
          'uid': 'from-62c345ae-b11f-f52d-a9da-03b2faf37a32'
        },
        {
          'section': 'history',
          'subsection': 'review',
          'code': 'daterange.from.max',
          'valid': true,
          'uid': 'from-62c345ae-b11f-f52d-a9da-03b2faf37a32'
        },
        {
          'section': 'history',
          'subsection': 'review',
          'code': 'daterange.from.min',
          'valid': true,
          'uid': 'from-62c345ae-b11f-f52d-a9da-03b2faf37a32'
        },
        {
          'section': 'history',
          'subsection': 'review',
          'code': 'daterange.from.day.required',
          'valid': true,
          'uid': 'day-0dca7129-caca-542b-4112-fca29b19b79b'
        },
        {
          'section': 'history',
          'subsection': 'review',
          'code': 'daterange.from.day.length',
          'valid': true,
          'uid': 'day-0dca7129-caca-542b-4112-fca29b19b79b'
        },
        {
          'section': 'history',
          'subsection': 'review',
          'code': 'daterange.from.day.pattern',
          'valid': true,
          'uid': 'day-0dca7129-caca-542b-4112-fca29b19b79b'
        },
        {
          'section': 'history',
          'subsection': 'review',
          'code': 'daterange.from.day.min',
          'valid': true,
          'uid': 'day-9d05878f-08a1-28bb-6b52-c1dce87ebc0a'
        },
        {
          'section': 'history',
          'subsection': 'review',
          'code': 'daterange.from.day.max',
          'valid': true,
          'uid': 'day-9d05878f-08a1-28bb-6b52-c1dce87ebc0a'
        },
        {
          'section': 'history',
          'subsection': 'review',
          'code': 'daterange.from.year.required',
          'valid': true,
          'uid': 'year-e75d2d0f-06cc-b0b9-a64d-1a852cd3ff58'
        },
        {
          'section': 'history',
          'subsection': 'review',
          'code': 'daterange.from.year.length',
          'valid': true,
          'uid': 'year-e75d2d0f-06cc-b0b9-a64d-1a852cd3ff58'
        },
        {
          'section': 'history',
          'subsection': 'review',
          'code': 'daterange.from.year.pattern',
          'valid': true,
          'uid': 'year-e75d2d0f-06cc-b0b9-a64d-1a852cd3ff58'
        },
        {
          'section': 'history',
          'subsection': 'review',
          'code': 'daterange.from.year.min',
          'valid': true,
          'uid': 'year-c57a746c-a002-3bf9-15b8-891f4ae258ab'
        },
        {
          'section': 'history',
          'subsection': 'review',
          'code': 'daterange.from.year.max',
          'valid': true,
          'uid': 'year-c57a746c-a002-3bf9-15b8-891f4ae258ab'
        },
        {
          'section': 'history',
          'subsection': 'review',
          'code': 'daterange.to.month.required',
          'valid': true,
          'uid': 'month-2a39dcf9-dbba-9b03-09cc-1c7a028ad175'
        },
        {
          'section': 'history',
          'subsection': 'review',
          'code': 'daterange.to.month.length',
          'valid': true,
          'uid': 'month-2a39dcf9-dbba-9b03-09cc-1c7a028ad175'
        },
        {
          'section': 'history',
          'subsection': 'review',
          'code': 'daterange.to.month.pattern',
          'valid': true,
          'uid': 'month-2a39dcf9-dbba-9b03-09cc-1c7a028ad175'
        },
        {
          'section': 'history',
          'subsection': 'review',
          'code': 'daterange.to.month.min',
          'valid': true,
          'uid': 'month-18aef01d-ecad-5fa7-1942-eefa779f147f'
        },
        {
          'section': 'history',
          'subsection': 'review',
          'code': 'daterange.to.month.max',
          'valid': true,
          'uid': 'month-18aef01d-ecad-5fa7-1942-eefa779f147f'
        },
        {
          'section': 'history',
          'subsection': 'review',
          'code': 'daterange.to.required',
          'valid': true,
          'uid': 'to-862dbf8d-caed-0898-741d-70adc16a0e1c'
        },
        {
          'section': 'history',
          'subsection': 'review',
          'code': 'daterange.to.max',
          'valid': true,
          'uid': 'to-862dbf8d-caed-0898-741d-70adc16a0e1c'
        },
        {
          'section': 'history',
          'subsection': 'review',
          'code': 'daterange.to.min',
          'valid': true,
          'uid': 'to-862dbf8d-caed-0898-741d-70adc16a0e1c'
        },
        {
          'section': 'history',
          'subsection': 'review',
          'code': 'daterange.to.day.required',
          'valid': true,
          'uid': 'day-84cfaa49-e236-de81-e0e3-6dd3b453991e'
        },
        {
          'section': 'history',
          'subsection': 'review',
          'code': 'daterange.to.day.length',
          'valid': true,
          'uid': 'day-84cfaa49-e236-de81-e0e3-6dd3b453991e'
        },
        {
          'section': 'history',
          'subsection': 'review',
          'code': 'daterange.to.day.pattern',
          'valid': true,
          'uid': 'day-84cfaa49-e236-de81-e0e3-6dd3b453991e'
        },
        {
          'section': 'history',
          'subsection': 'review',
          'code': 'daterange.to.day.min',
          'valid': true,
          'uid': 'day-85c1033f-0e95-48f5-2274-f624e80b13de'
        },
        {
          'section': 'history',
          'subsection': 'review',
          'code': 'daterange.to.day.max',
          'valid': true,
          'uid': 'day-85c1033f-0e95-48f5-2274-f624e80b13de'
        },
        {
          'section': 'history',
          'subsection': 'review',
          'code': 'daterange.to.year.required',
          'valid': true,
          'uid': 'year-7f7dd617-c923-5f84-ea38-f501f81f896b'
        },
        {
          'section': 'history',
          'subsection': 'review',
          'code': 'daterange.to.year.length',
          'valid': true,
          'uid': 'year-7f7dd617-c923-5f84-ea38-f501f81f896b'
        },
        {
          'section': 'history',
          'subsection': 'review',
          'code': 'daterange.to.year.pattern',
          'valid': true,
          'uid': 'year-7f7dd617-c923-5f84-ea38-f501f81f896b'
        },
        {
          'section': 'history',
          'subsection': 'review',
          'code': 'daterange.to.year.min',
          'valid': true,
          'uid': 'year-4e39aa25-41c9-1e81-0220-ff65ffdcf138'
        },
        {
          'section': 'history',
          'subsection': 'review',
          'code': 'daterange.to.year.max',
          'valid': true,
          'uid': 'year-4e39aa25-41c9-1e81-0220-ff65ffdcf138'
        },
        {
          'section': 'history',
          'subsection': 'review',
          'code': 'daterange.from.month.required',
          'valid': true,
          'uid': 'month-32029cac-2550-fcae-7f91-5dd8188e7022'
        },
        {
          'section': 'history',
          'subsection': 'review',
          'code': 'daterange.from.month.length',
          'valid': true,
          'uid': 'month-32029cac-2550-fcae-7f91-5dd8188e7022'
        },
        {
          'section': 'history',
          'subsection': 'review',
          'code': 'daterange.from.month.pattern',
          'valid': true,
          'uid': 'month-32029cac-2550-fcae-7f91-5dd8188e7022'
        },
        {
          'section': 'history',
          'subsection': 'review',
          'code': 'daterange.from.month.min',
          'valid': true,
          'uid': 'month-b2ec5201-1a00-f269-8c6b-fb1667b4d4fe'
        },
        {
          'section': 'history',
          'subsection': 'review',
          'code': 'daterange.from.month.max',
          'valid': true,
          'uid': 'month-b2ec5201-1a00-f269-8c6b-fb1667b4d4fe'
        },
        {
          'section': 'history',
          'subsection': 'review',
          'code': 'daterange.from.required',
          'valid': true,
          'uid': 'from-f0ae0405-5d6f-9028-b341-537a03e9e65a'
        },
        {
          'section': 'history',
          'subsection': 'review',
          'code': 'daterange.from.max',
          'valid': true,
          'uid': 'from-f0ae0405-5d6f-9028-b341-537a03e9e65a'
        },
        {
          'section': 'history',
          'subsection': 'review',
          'code': 'daterange.from.min',
          'valid': true,
          'uid': 'from-f0ae0405-5d6f-9028-b341-537a03e9e65a'
        },
        {
          'section': 'history',
          'subsection': 'review',
          'code': 'daterange.from.day.required',
          'valid': true,
          'uid': 'day-8c103272-69b0-22a1-5ba6-adbf9892a904'
        },
        {
          'section': 'history',
          'subsection': 'review',
          'code': 'daterange.from.day.length',
          'valid': true,
          'uid': 'day-8c103272-69b0-22a1-5ba6-adbf9892a904'
        },
        {
          'section': 'history',
          'subsection': 'review',
          'code': 'daterange.from.day.pattern',
          'valid': true,
          'uid': 'day-8c103272-69b0-22a1-5ba6-adbf9892a904'
        },
        {
          'section': 'history',
          'subsection': 'review',
          'code': 'daterange.from.day.min',
          'valid': true,
          'uid': 'day-70f83f9a-84a9-cab3-59c5-fbd68642c6fd'
        },
        {
          'section': 'history',
          'subsection': 'review',
          'code': 'daterange.from.day.max',
          'valid': true,
          'uid': 'day-70f83f9a-84a9-cab3-59c5-fbd68642c6fd'
        },
        {
          'section': 'history',
          'subsection': 'review',
          'code': 'daterange.from.year.required',
          'valid': true,
          'uid': 'year-6f8445b8-30f7-8898-9c5d-17cceb7ee9c0'
        },
        {
          'section': 'history',
          'subsection': 'review',
          'code': 'daterange.from.year.length',
          'valid': true,
          'uid': 'year-6f8445b8-30f7-8898-9c5d-17cceb7ee9c0'
        },
        {
          'section': 'history',
          'subsection': 'review',
          'code': 'daterange.from.year.pattern',
          'valid': true,
          'uid': 'year-6f8445b8-30f7-8898-9c5d-17cceb7ee9c0'
        },
        {
          'section': 'history',
          'subsection': 'review',
          'code': 'daterange.from.year.min',
          'valid': true,
          'uid': 'year-0acc45f1-a36f-2f13-d5b8-22b44415ed60'
        },
        {
          'section': 'history',
          'subsection': 'review',
          'code': 'daterange.from.year.max',
          'valid': true,
          'uid': 'year-0acc45f1-a36f-2f13-d5b8-22b44415ed60'
        },
        {
          'section': 'history',
          'subsection': 'review',
          'code': 'daterange.to.month.required',
          'valid': true,
          'uid': 'month-41d6c6f6-9cce-4c6f-320b-e2b3c0b812fc'
        },
        {
          'section': 'history',
          'subsection': 'review',
          'code': 'daterange.to.month.length',
          'valid': true,
          'uid': 'month-41d6c6f6-9cce-4c6f-320b-e2b3c0b812fc'
        },
        {
          'section': 'history',
          'subsection': 'review',
          'code': 'daterange.to.month.pattern',
          'valid': true,
          'uid': 'month-41d6c6f6-9cce-4c6f-320b-e2b3c0b812fc'
        },
        {
          'section': 'history',
          'subsection': 'review',
          'code': 'daterange.to.month.min',
          'valid': true,
          'uid': 'month-90afef9b-fffe-e43c-d3a6-e14c5fd48eef'
        },
        {
          'section': 'history',
          'subsection': 'review',
          'code': 'daterange.to.month.max',
          'valid': true,
          'uid': 'month-90afef9b-fffe-e43c-d3a6-e14c5fd48eef'
        },
        {
          'section': 'history',
          'subsection': 'review',
          'code': 'daterange.to.required',
          'valid': true,
          'uid': 'to-4da73e5c-83b1-be59-386c-a93d607276ab'
        },
        {
          'section': 'history',
          'subsection': 'review',
          'code': 'daterange.to.max',
          'valid': true,
          'uid': 'to-4da73e5c-83b1-be59-386c-a93d607276ab'
        },
        {
          'section': 'history',
          'subsection': 'review',
          'code': 'daterange.to.min',
          'valid': true,
          'uid': 'to-4da73e5c-83b1-be59-386c-a93d607276ab'
        },
        {
          'section': 'history',
          'subsection': 'review',
          'code': 'daterange.to.day.required',
          'valid': true,
          'uid': 'day-0a987cc1-e310-3a71-b87d-1dc08e1bfd89'
        },
        {
          'section': 'history',
          'subsection': 'review',
          'code': 'daterange.to.day.length',
          'valid': true,
          'uid': 'day-0a987cc1-e310-3a71-b87d-1dc08e1bfd89'
        },
        {
          'section': 'history',
          'subsection': 'review',
          'code': 'daterange.to.day.pattern',
          'valid': true,
          'uid': 'day-0a987cc1-e310-3a71-b87d-1dc08e1bfd89'
        },
        {
          'section': 'history',
          'subsection': 'review',
          'code': 'daterange.to.day.min',
          'valid': true,
          'uid': 'day-4b426002-8727-3aa8-4b7e-96b957488455'
        },
        {
          'section': 'history',
          'subsection': 'review',
          'code': 'daterange.to.day.max',
          'valid': true,
          'uid': 'day-4b426002-8727-3aa8-4b7e-96b957488455'
        },
        {
          'section': 'history',
          'subsection': 'review',
          'code': 'daterange.to.year.required',
          'valid': true,
          'uid': 'year-db13e701-02f6-5ff0-e06f-09cdc4eb7813'
        },
        {
          'section': 'history',
          'subsection': 'review',
          'code': 'daterange.to.year.length',
          'valid': true,
          'uid': 'year-db13e701-02f6-5ff0-e06f-09cdc4eb7813'
        },
        {
          'section': 'history',
          'subsection': 'review',
          'code': 'daterange.to.year.pattern',
          'valid': true,
          'uid': 'year-db13e701-02f6-5ff0-e06f-09cdc4eb7813'
        },
        {
          'section': 'history',
          'subsection': 'review',
          'code': 'daterange.to.year.min',
          'valid': true,
          'uid': 'year-c3d763e4-87da-b657-16fa-3e7a0fbb7463'
        },
        {
          'section': 'history',
          'subsection': 'review',
          'code': 'daterange.to.year.max',
          'valid': true,
          'uid': 'year-c3d763e4-87da-b657-16fa-3e7a0fbb7463'
        }
      ],
      'citizenship': [
        {
          'section': 'citizenship',
          'subsection': 'status',
          'code': 'required',
          'valid': true,
          'uid': 'undefined-1c30405d-4792-6edb-c6c2-18265db27faf'
        },
        {
          'section': 'citizenship',
          'subsection': 'multiple',
          'code': 'required',
          'valid': true,
          'uid': 'undefined-ab37de47-7237-bb77-ea10-12581555e0ce'
        },
        {
          'section': 'citizenship',
          'subsection': 'passports',
          'code': 'required',
          'valid': true,
          'uid': 'undefined-7257698f-0393-9c3e-0b25-7d9ba7f966e6'
        },
        {
          'section': 'citizenship',
          'subsection': 'passports',
          'code': 'required',
          'valid': true,
          'uid': 'undefined-955e2dd3-23cb-f0ad-0987-ce6ef43c302e'
        },
        {
          'section': 'citizenship',
          'subsection': 'review',
          'code': 'required',
          'valid': true,
          'uid': 'undefined-43feedea-eb1a-a7a5-0dfd-b0bc6abad352'
        },
        {
          'section': 'citizenship',
          'subsection': 'review',
          'code': 'required',
          'valid': true,
          'uid': 'undefined-0f7a6097-20f0-d8b5-6763-6a043a1a4ae4'
        },
        {
          'section': 'citizenship',
          'subsection': 'review',
          'code': 'required',
          'valid': true,
          'uid': 'undefined-cb6dc6f6-1e31-547a-b713-f64f71e01236'
        }
      ],
      'military': [
        {
          'section': 'military',
          'subsection': 'selective',
          'code': 'required',
          'valid': true,
          'uid': 'undefined-81407f54-df5b-e8c0-24f8-f5bf4eae6649'
        },
        {
          'section': 'military',
          'subsection': 'selective',
          'code': 'required',
          'valid': true,
          'uid': 'undefined-f952861d-0e8d-2d74-7255-6730f476a0d1'
        },
        {
          'section': 'military',
          'subsection': 'selective',
          'code': 'required',
          'valid': true,
          'uid': 'RegistrationNumber-951824e2-c05c-661d-c60c-88c63ae9fb02'
        },
        {
          'section': 'military',
          'subsection': 'selective',
          'code': 'length',
          'valid': true,
          'uid': 'RegistrationNumber-951824e2-c05c-661d-c60c-88c63ae9fb02'
        },
        {
          'section': 'military',
          'subsection': 'selective',
          'code': 'pattern',
          'valid': true,
          'uid': 'RegistrationNumber-951824e2-c05c-661d-c60c-88c63ae9fb02'
        },
        {
          'section': 'military',
          'subsection': 'history',
          'code': 'required',
          'valid': true,
          'uid': 'undefined-5c1865bc-0ae2-3340-ffd2-13283b54668c'
        },
        {
          'section': 'military',
          'subsection': 'foreign',
          'code': 'required',
          'valid': true,
          'uid': 'undefined-1b99167d-4a24-99e4-d396-9e1d6a71483c'
        },
        {
          'section': 'military',
          'subsection': 'foreign',
          'code': 'required',
          'valid': true,
          'uid': 'undefined-6682ab93-9df2-06c1-b2ea-eb1be06063d9'
        },
        {
          'section': 'military',
          'subsection': 'review',
          'code': 'required',
          'valid': true,
          'uid': 'undefined-8391002f-7035-b80a-6145-f115e294f40f'
        },
        {
          'section': 'military',
          'subsection': 'review',
          'code': 'required',
          'valid': true,
          'uid': 'undefined-c287f84a-6f37-09d8-8834-177192673f5b'
        },
        {
          'section': 'military',
          'subsection': 'review',
          'code': 'required',
          'valid': true,
          'uid': 'RegistrationNumber-cec27a82-2c1d-eaec-9d3d-d9c49114a636'
        },
        {
          'section': 'military',
          'subsection': 'review',
          'code': 'length',
          'valid': true,
          'uid': 'RegistrationNumber-cec27a82-2c1d-eaec-9d3d-d9c49114a636'
        },
        {
          'section': 'military',
          'subsection': 'review',
          'code': 'pattern',
          'valid': true,
          'uid': 'RegistrationNumber-cec27a82-2c1d-eaec-9d3d-d9c49114a636'
        },
        {
          'section': 'military',
          'subsection': 'review',
          'code': 'required',
          'valid': true,
          'uid': 'undefined-2ffedab7-8932-8835-5f67-0b68bfa184c7'
        },
        {
          'section': 'military',
          'subsection': 'review',
          'code': 'required',
          'valid': true,
          'uid': 'undefined-c8838eaf-9697-a8ec-f575-d510589d3082'
        }
      ],
      'foreign': [
        {
          'section': 'foreign',
          'subsection': 'passport',
          'code': 'required',
          'valid': true,
          'uid': 'undefined-b52ff68e-c89e-0ced-fe9b-aac1c4c5ddaa'
        },
        {
          'section': 'foreign',
          'subsection': 'contacts',
          'code': 'required',
          'valid': true,
          'uid': 'undefined-67137ce7-51aa-53f2-17f5-21039ae85e23'
        },
        {
          'section': 'foreign',
          'subsection': 'activities',
          'code': 'required',
          'valid': true,
          'uid': 'undefined-f5a89bb1-a1f1-3d14-0f86-8181b6690e8e'
        },
        {
          'section': 'foreign',
          'subsection': 'activities/direct',
          'code': 'required',
          'valid': true,
          'uid': 'undefined-abf498f0-2eba-87db-a71f-44d08521e82d'
        },
        {
          'section': 'foreign',
          'subsection': 'activities/indirect',
          'code': 'required',
          'valid': true,
          'uid': 'undefined-3964dfce-2dcb-09e0-58a3-3011c5dbbe68'
        },
        {
          'section': 'foreign',
          'subsection': 'activities/realestate',
          'code': 'required',
          'valid': true,
          'uid': 'undefined-8ca24579-118c-fc33-5c82-edafd64d95b9'
        },
        {
          'section': 'foreign',
          'subsection': 'activities/benefits',
          'code': 'required',
          'valid': true,
          'uid': 'undefined-ac37c540-f5f8-334c-e5c3-70c1d2c828d3'
        },
        {
          'section': 'foreign',
          'subsection': 'activities/support',
          'code': 'required',
          'valid': true,
          'uid': 'undefined-49cb20b9-8e0b-f1b5-efe1-76238b817370'
        },
        {
          'section': 'foreign',
          'subsection': 'business/advice',
          'code': 'required',
          'valid': true,
          'uid': 'undefined-e7e8c580-c419-b4f6-7ad0-3e7a4fa5eeee'
        },
        {
          'section': 'foreign',
          'subsection': 'business/family',
          'code': 'required',
          'valid': true,
          'uid': 'undefined-e6d854c4-5dfb-8013-e061-9f7926f16edf'
        },
        {
          'section': 'foreign',
          'subsection': 'business/employment',
          'code': 'required',
          'valid': true,
          'uid': 'undefined-b0467970-9fbd-0de2-4c68-76b54bb9ad4e'
        },
        {
          'section': 'foreign',
          'subsection': 'business/ventures',
          'code': 'required',
          'valid': true,
          'uid': 'undefined-6a64f629-d778-eff1-2a24-b43a09c13027'
        },
        {
          'section': 'foreign',
          'subsection': 'business/conferences',
          'code': 'required',
          'valid': true,
          'uid': 'undefined-c1a839e3-c866-dcba-ade1-e79f2b0aa371'
        },
        {
          'section': 'foreign',
          'subsection': 'business/contact',
          'code': 'required',
          'valid': true,
          'uid': 'undefined-c906261d-6a74-2fa6-637b-a8b1042a0c22'
        },
        {
          'section': 'foreign',
          'subsection': 'business/sponsorship',
          'code': 'required',
          'valid': true,
          'uid': 'undefined-5fa8ab5b-724b-2bb5-51b6-2e4f2a1c3d57'
        },
        {
          'section': 'foreign',
          'subsection': 'business/political',
          'code': 'required',
          'valid': true,
          'uid': 'undefined-b59b9334-5260-70e1-0dcd-79c0ec5827ff'
        },
        {
          'section': 'foreign',
          'subsection': 'business/voting',
          'code': 'required',
          'valid': true,
          'uid': 'undefined-47ccc574-365b-bef2-41ca-c8a7ccf29362'
        },
        {
          'section': 'foreign',
          'subsection': 'review',
          'code': 'required',
          'valid': true,
          'uid': 'undefined-6efbeb56-a4d8-a6a9-64ba-cacd4cb930b6'
        },
        {
          'section': 'foreign',
          'subsection': 'review',
          'code': 'required',
          'valid': true,
          'uid': 'undefined-ad5d8026-7f68-f859-30c4-a86a231e23e7'
        },
        {
          'section': 'foreign',
          'subsection': 'review',
          'code': 'required',
          'valid': true,
          'uid': 'undefined-b44c023d-1fb1-b9e7-b417-313bd32a815e'
        },
        {
          'section': 'foreign',
          'subsection': 'review',
          'code': 'required',
          'valid': true,
          'uid': 'undefined-5cd3546e-4a97-3934-84b3-b03433b080ad'
        },
        {
          'section': 'foreign',
          'subsection': 'review',
          'code': 'required',
          'valid': true,
          'uid': 'undefined-cb705dc3-7583-8f0d-d0f7-e3aa0b182c6c'
        },
        {
          'section': 'foreign',
          'subsection': 'review',
          'code': 'required',
          'valid': true,
          'uid': 'undefined-c4f759cd-41b0-b51e-43b2-b724ce424735'
        },
        {
          'section': 'foreign',
          'subsection': 'review',
          'code': 'required',
          'valid': true,
          'uid': 'undefined-6621f76f-9303-dc79-5ad9-387559aec0f4'
        },
        {
          'section': 'foreign',
          'subsection': 'review',
          'code': 'required',
          'valid': true,
          'uid': 'undefined-5afc138e-7f8a-e5b1-ae48-3054c4a7d4ee'
        },
        {
          'section': 'foreign',
          'subsection': 'review',
          'code': 'required',
          'valid': true,
          'uid': 'undefined-3c9e42e1-0ad1-4cbf-1c0c-4d89d18bf727'
        },
        {
          'section': 'foreign',
          'subsection': 'review',
          'code': 'required',
          'valid': true,
          'uid': 'undefined-8f0430be-49d1-3037-0077-a4d2e2a8ce99'
        },
        {
          'section': 'foreign',
          'subsection': 'review',
          'code': 'required',
          'valid': true,
          'uid': 'undefined-65ed93fa-ec8f-6031-9a74-8ee2c334565b'
        },
        {
          'section': 'foreign',
          'subsection': 'review',
          'code': 'required',
          'valid': true,
          'uid': 'undefined-b908355b-c935-95ca-a03f-c297f2ec2eeb'
        },
        {
          'section': 'foreign',
          'subsection': 'review',
          'code': 'required',
          'valid': true,
          'uid': 'undefined-9d6252c8-ee32-68c4-c73d-7f6903659edf'
        },
        {
          'section': 'foreign',
          'subsection': 'review',
          'code': 'required',
          'valid': true,
          'uid': 'undefined-db3e8446-e14c-2275-cda7-a154c4b1455e'
        },
        {
          'section': 'foreign',
          'subsection': 'review',
          'code': 'required',
          'valid': true,
          'uid': 'undefined-f1289c75-0d8b-668b-15b1-73bc431fdc26'
        },
        {
          'section': 'foreign',
          'subsection': 'review',
          'code': 'required',
          'valid': true,
          'uid': 'undefined-030ba79c-e284-c053-d91f-b69aac40a1b7'
        },
        {
          'section': 'foreign',
          'subsection': 'review',
          'code': 'required',
          'valid': true,
          'uid': 'undefined-46890c0d-feac-e318-9723-1e5213289982'
        },
        {
          'section': 'foreign',
          'subsection': 'review',
          'code': 'required',
          'valid': true,
          'uid': 'undefined-380fbffd-644f-c8a3-c067-b0bc385385d8'
        },
        {
          'section': 'foreign',
          'subsection': 'travel',
          'code': 'required',
          'valid': true,
          'uid': 'undefined-a782cbf5-bb5b-d00b-2ddc-73deeccfbe7c'
        },
        {
          'section': 'foreign',
          'subsection': 'travel',
          'code': 'required',
          'valid': true,
          'uid': 'undefined-7e75b282-26a9-4291-f38c-38dba4399ca7'
        }
      ],
      'financial': [
        {
          'section': 'financial',
          'subsection': 'bankruptcy',
          'code': 'required',
          'valid': true,
          'uid': 'undefined-b11739c3-17a2-5411-edfe-fcc0761f2d16'
        },
        {
          'section': 'financial',
          'subsection': 'gambling',
          'code': 'required',
          'valid': true,
          'uid': 'undefined-be0eeccf-bd86-b0e8-2d29-e3d588440722'
        },
        {
          'section': 'financial',
          'subsection': 'taxes',
          'code': 'required',
          'valid': true,
          'uid': 'undefined-c4463c93-e94e-d070-f23a-697f9cbf2e00'
        },
        {
          'section': 'financial',
          'subsection': 'card',
          'code': 'required',
          'valid': true,
          'uid': 'undefined-72f25b4e-9d04-4833-d64d-1ffe3ae49127'
        },
        {
          'section': 'financial',
          'subsection': 'credit',
          'code': 'required',
          'valid': true,
          'uid': 'undefined-563e35b7-3d8c-1e47-70c5-c35a2114a821'
        },
        {
          'section': 'financial',
          'subsection': 'delinquent',
          'code': 'required',
          'valid': true,
          'uid': 'undefined-25a0f211-97d1-3190-79b6-49815f98c5bd'
        },
        {
          'section': 'financial',
          'subsection': 'nonpayment',
          'code': 'required',
          'valid': true,
          'uid': 'undefined-aac6c72c-75bc-b382-6fa0-67bdcde86cdd'
        },
        {
          'section': 'financial',
          'subsection': 'review',
          'code': 'required',
          'valid': true,
          'uid': 'undefined-32dad2e7-9943-ed48-505a-42164866aa59'
        },
        {
          'section': 'financial',
          'subsection': 'review',
          'code': 'required',
          'valid': true,
          'uid': 'undefined-6bf8595a-c59b-6f54-977b-9e06bb55ac58'
        },
        {
          'section': 'financial',
          'subsection': 'review',
          'code': 'required',
          'valid': true,
          'uid': 'undefined-8e2f39fc-8cd9-3dbe-f1e8-bb21754268d4'
        },
        {
          'section': 'financial',
          'subsection': 'review',
          'code': 'required',
          'valid': true,
          'uid': 'undefined-faad0f23-9213-5b76-dc96-ceeaf4d431a8'
        },
        {
          'section': 'financial',
          'subsection': 'review',
          'code': 'required',
          'valid': true,
          'uid': 'undefined-21be4596-40f1-561e-3f3c-1b41878d7658'
        },
        {
          'section': 'financial',
          'subsection': 'review',
          'code': 'required',
          'valid': true,
          'uid': 'undefined-cdae069c-7118-e3d2-5701-597e3a47ca80'
        },
        {
          'section': 'financial',
          'subsection': 'review',
          'code': 'required',
          'valid': true,
          'uid': 'undefined-89b80a09-35da-f3e5-1241-edbf892cd145'
        }
      ],
      'substance': [
        {
          'section': 'substance',
          'subsection': 'drugs/usage',
          'code': 'required',
          'valid': true,
          'uid': 'undefined-2c35819e-17e4-fb7d-8c47-988ad777b992'
        },
        {
          'section': 'substance',
          'subsection': 'drugs/purchase',
          'code': 'required',
          'valid': true,
          'uid': 'undefined-98bde19d-0082-b767-6912-55adf9c6c435'
        },
        {
          'section': 'substance',
          'subsection': 'drugs/clearance',
          'code': 'required',
          'valid': true,
          'uid': 'undefined-5d54179a-d5e8-cd49-2120-c474cf2c14fd'
        },
        {
          'section': 'substance',
          'subsection': 'drugs/publicsafety',
          'code': 'required',
          'valid': true,
          'uid': 'undefined-70f00387-1856-87e8-998e-f496ec37575d'
        },
        {
          'section': 'substance',
          'subsection': 'drugs/misuse',
          'code': 'required',
          'valid': true,
          'uid': 'undefined-efcfe132-b109-4282-7660-7923e898c136'
        },
        {
          'section': 'substance',
          'subsection': 'drugs/ordered',
          'code': 'required',
          'valid': true,
          'uid': 'undefined-ee690583-89d6-fd7b-63b8-ab37ca89664a'
        },
        {
          'section': 'substance',
          'subsection': 'drugs/voluntary',
          'code': 'required',
          'valid': true,
          'uid': 'undefined-201088ba-253f-57cb-4511-06dfc64404e5'
        },
        {
          'section': 'substance',
          'subsection': 'alcohol/negative',
          'code': 'required',
          'valid': true,
          'uid': 'undefined-defd1dc4-6390-ddde-984a-0d7fcbbcd3e9'
        },
        {
          'section': 'substance',
          'subsection': 'alcohol/ordered',
          'code': 'required',
          'valid': true,
          'uid': 'undefined-71b1bc7b-a49b-9733-5629-5bf63af47fae'
        },
        {
          'section': 'substance',
          'subsection': 'alcohol/voluntary',
          'code': 'required',
          'valid': true,
          'uid': 'undefined-6a6625d5-c44b-68be-20f0-6e5166c1e37c'
        },
        {
          'section': 'substance',
          'subsection': 'alcohol/additional',
          'code': 'required',
          'valid': true,
          'uid': 'undefined-da85be43-561b-a447-af84-493907d02ae7'
        },
        {
          'section': 'substance',
          'subsection': 'review',
          'code': 'required',
          'valid': true,
          'uid': 'undefined-02227a3f-b916-bff1-cd41-cfd07f31a4f2'
        },
        {
          'section': 'substance',
          'subsection': 'review',
          'code': 'required',
          'valid': true,
          'uid': 'undefined-7337afe4-f8c9-7fc7-c158-30c548d7f945'
        },
        {
          'section': 'substance',
          'subsection': 'review',
          'code': 'required',
          'valid': true,
          'uid': 'undefined-93fdd544-bc45-aa7a-fe2f-2900c5499e27'
        },
        {
          'section': 'substance',
          'subsection': 'review',
          'code': 'required',
          'valid': true,
          'uid': 'undefined-40553570-7fa4-35f1-6678-93def0ac38b3'
        },
        {
          'section': 'substance',
          'subsection': 'review',
          'code': 'required',
          'valid': true,
          'uid': 'undefined-662600fa-91e8-edad-b83f-86acd5b99ce7'
        },
        {
          'section': 'substance',
          'subsection': 'review',
          'code': 'required',
          'valid': true,
          'uid': 'undefined-d090bf05-7445-8a44-4e34-8638bcce6490'
        },
        {
          'section': 'substance',
          'subsection': 'review',
          'code': 'required',
          'valid': true,
          'uid': 'undefined-e2f3e291-60df-dd49-77dc-df1583e5e93c'
        },
        {
          'section': 'substance',
          'subsection': 'review',
          'code': 'required',
          'valid': true,
          'uid': 'undefined-3a58ed92-cae8-a109-afae-0c7fcc89c690'
        },
        {
          'section': 'substance',
          'subsection': 'review',
          'code': 'required',
          'valid': true,
          'uid': 'undefined-df514a23-fcdb-c25a-7142-8459622f061d'
        },
        {
          'section': 'substance',
          'subsection': 'review',
          'code': 'required',
          'valid': true,
          'uid': 'undefined-4645acb4-3e00-96a2-f620-f47d7a4fa5b0'
        },
        {
          'section': 'substance',
          'subsection': 'review',
          'code': 'required',
          'valid': true,
          'uid': 'undefined-85c7eb66-3c4a-b218-26cb-72c964567cd1'
        }
      ],
      'legal': [
        {
          'section': 'legal',
          'subsection': 'police/offenses',
          'code': 'required',
          'valid': true,
          'uid': 'undefined-ee05f86a-f2b4-27c5-8756-62f1095f3773'
        },
        {
          'section': 'legal',
          'subsection': 'police/additionaloffenses',
          'code': 'required',
          'valid': true,
          'uid': 'undefined-f470b85d-cabf-5444-5a40-c2b6beece250'
        },
        {
          'section': 'legal',
          'subsection': 'police/domesticviolence',
          'code': 'required',
          'valid': true,
          'uid': 'undefined-9a2985f5-a030-85f4-f756-579ed3627775'
        },
        {
          'section': 'legal',
          'subsection': 'police/domesticviolence',
          'code': 'required',
          'valid': true,
          'uid': 'undefined-2f6cb295-4182-b6c7-44de-1fab982ccca3'
        },
        {
          'section': 'legal',
          'subsection': 'investigations/history',
          'code': 'required',
          'valid': true,
          'uid': 'undefined-980a1cf2-a886-f123-ae19-63043b6ce916'
        },
        {
          'section': 'legal',
          'subsection': 'investigations/revoked',
          'code': 'required',
          'valid': true,
          'uid': 'undefined-1c051485-5e9c-de52-83eb-75a4b0c05fb1'
        },
        {
          'section': 'legal',
          'subsection': 'investigations/debarred',
          'code': 'required',
          'valid': true,
          'uid': 'undefined-ee226831-a2a9-ff1b-36e3-36bde0ca6ebe'
        },
        {
          'section': 'legal',
          'subsection': 'court',
          'code': 'required',
          'valid': true,
          'uid': 'undefined-93f0a6f1-c363-076a-54fe-b49a2a11cbd6'
        },
        {
          'section': 'legal',
          'subsection': 'technology/unauthorized',
          'code': 'required',
          'valid': true,
          'uid': 'undefined-578dd474-5542-6e15-9b9d-91bab5559c21'
        },
        {
          'section': 'legal',
          'subsection': 'technology/manipulating',
          'code': 'required',
          'valid': true,
          'uid': 'undefined-f8621391-49c5-1962-e7ec-041fd1e9f0aa'
        },
        {
          'section': 'legal',
          'subsection': 'technology/unlawful',
          'code': 'required',
          'valid': true,
          'uid': 'undefined-9410b26b-8491-41ab-e33f-196208959752'
        },
        {
          'section': 'legal',
          'subsection': 'associations/terrorist-organization',
          'code': 'required',
          'valid': true,
          'uid': 'undefined-4cb6dbc7-7085-04c3-7010-02179ef6d50e'
        },
        {
          'section': 'legal',
          'subsection': 'associations/engaged-in-terrorism',
          'code': 'required',
          'valid': true,
          'uid': 'undefined-5962c29f-610b-2706-7a4b-359e8a5eaeb2'
        },
        {
          'section': 'legal',
          'subsection': 'associations/advocating',
          'code': 'required',
          'valid': true,
          'uid': 'undefined-43f88f6f-d6ea-575a-c1b1-ae403f5043f6'
        },
        {
          'section': 'legal',
          'subsection': 'associations/membership-overthrow',
          'code': 'required',
          'valid': true,
          'uid': 'undefined-430a60fd-faf7-b1d7-527c-38825cef5784'
        },
        {
          'section': 'legal',
          'subsection': 'associations/membership-violence-or-force',
          'code': 'required',
          'valid': true,
          'uid': 'undefined-7bef4bdf-e121-f7df-8c2c-f514e535a6a8'
        },
        {
          'section': 'legal',
          'subsection': 'associations/activities-to-overthrow',
          'code': 'required',
          'valid': true,
          'uid': 'undefined-692e3050-5baa-d42e-bc5b-820c331055f5'
        },
        {
          'section': 'legal',
          'subsection': 'associations/terrorism-association',
          'code': 'required',
          'valid': true,
          'uid': 'undefined-ebb7cbab-c205-c3a7-be70-b95b9160bcd6'
        },
        {
          'section': 'legal',
          'subsection': 'review',
          'code': 'required',
          'valid': true,
          'uid': 'undefined-9857f73c-73c6-b2c8-d3cf-8ab24654e537'
        },
        {
          'section': 'legal',
          'subsection': 'review',
          'code': 'required',
          'valid': true,
          'uid': 'undefined-690019eb-02cf-12f4-2cb2-e5142279ed0b'
        },
        {
          'section': 'legal',
          'subsection': 'review',
          'code': 'required',
          'valid': true,
          'uid': 'undefined-cd2cb333-9b37-4647-5173-958c6f80bc3a'
        },
        {
          'section': 'legal',
          'subsection': 'review',
          'code': 'required',
          'valid': true,
          'uid': 'undefined-4c3de165-f146-2072-b6a0-5029bb56c377'
        },
        {
          'section': 'legal',
          'subsection': 'review',
          'code': 'required',
          'valid': true,
          'uid': 'undefined-6d054d86-0853-baac-b318-0b7d637f91ac'
        },
        {
          'section': 'legal',
          'subsection': 'review',
          'code': 'required',
          'valid': true,
          'uid': 'undefined-b4e7fc58-2f7e-37e4-915b-d875473218eb'
        },
        {
          'section': 'legal',
          'subsection': 'review',
          'code': 'required',
          'valid': true,
          'uid': 'undefined-92916978-5713-7543-1f68-cc135c2bea4d'
        },
        {
          'section': 'legal',
          'subsection': 'review',
          'code': 'required',
          'valid': true,
          'uid': 'undefined-97dd825b-15eb-2997-68de-917d230143a4'
        },
        {
          'section': 'legal',
          'subsection': 'review',
          'code': 'required',
          'valid': true,
          'uid': 'undefined-2e73a010-7360-794e-4a39-5961593b00de'
        },
        {
          'section': 'legal',
          'subsection': 'review',
          'code': 'required',
          'valid': true,
          'uid': 'undefined-f8639403-2c37-2335-c0f4-72cfa7330a04'
        },
        {
          'section': 'legal',
          'subsection': 'review',
          'code': 'required',
          'valid': true,
          'uid': 'undefined-cb1a130c-e857-ad83-12bb-42198ddfd1f1'
        },
        {
          'section': 'legal',
          'subsection': 'review',
          'code': 'required',
          'valid': true,
          'uid': 'undefined-fbf0608b-21c2-3621-8a82-84af6eee3498'
        },
        {
          'section': 'legal',
          'subsection': 'review',
          'code': 'required',
          'valid': true,
          'uid': 'undefined-01b06d0d-0878-26ae-3034-c8568f182ebe'
        },
        {
          'section': 'legal',
          'subsection': 'review',
          'code': 'required',
          'valid': true,
          'uid': 'undefined-713ec46e-afe9-c067-f571-9799af8eb3da'
        },
        {
          'section': 'legal',
          'subsection': 'review',
          'code': 'required',
          'valid': true,
          'uid': 'undefined-3fa935ad-e38f-e46d-eb46-a3be5aaf20eb'
        },
        {
          'section': 'legal',
          'subsection': 'review',
          'code': 'required',
          'valid': true,
          'uid': 'undefined-0a0c25c1-d947-c963-cf96-9f3c8838492a'
        },
        {
          'section': 'legal',
          'subsection': 'review',
          'code': 'required',
          'valid': true,
          'uid': 'undefined-08c33458-2cd6-f2b7-5194-b0a2a28947ab'
        }
      ],
      'psychological': [
        {
          'section': 'psychological',
          'subsection': 'competence',
          'code': 'required',
          'valid': true,
          'uid': 'undefined-c78516de-4578-a9b1-1f51-7c07ed211160'
        },
        {
          'section': 'psychological',
          'subsection': 'consultations',
          'code': 'required',
          'valid': true,
          'uid': 'undefined-87338907-91c1-03a2-3caf-084add6c610b'
        },
        {
          'section': 'psychological',
          'subsection': 'hospitalizations',
          'code': 'required',
          'valid': true,
          'uid': 'undefined-32a7578d-26cf-1403-f991-cb9c10c9add4'
        },
        {
          'section': 'psychological',
          'subsection': 'diagnoses',
          'code': 'required',
          'valid': true,
          'uid': 'undefined-d2067006-9ff8-4dd8-dba7-a70e5e8f9369'
        },
        {
          'section': 'psychological',
          'subsection': 'conditions',
          'code': 'required',
          'valid': true,
          'uid': 'undefined-7a1c9d6d-8b82-fcb9-b694-1111d91d11f8'
        },
        {
          'section': 'psychological',
          'subsection': 'review',
          'code': 'required',
          'valid': true,
          'uid': 'undefined-26b683b5-c824-08d2-ddef-7940765e5ec0'
        },
        {
          'section': 'psychological',
          'subsection': 'review',
          'code': 'required',
          'valid': true,
          'uid': 'undefined-89f7784c-6acc-608d-36d5-b0cbbf1a29c7'
        },
        {
          'section': 'psychological',
          'subsection': 'review',
          'code': 'required',
          'valid': true,
          'uid': 'undefined-d4395972-5a0a-4bfa-962f-c036a6149f3f'
        },
        {
          'section': 'psychological',
          'subsection': 'review',
          'code': 'required',
          'valid': true,
          'uid': 'undefined-c21ca383-e671-5cf0-d499-01cc785732fc'
        },
        {
          'section': 'psychological',
          'subsection': 'review',
          'code': 'required',
          'valid': true,
          'uid': 'undefined-ccd91432-eb34-2d18-905b-f37ff9e16065'
        }
      ]
    },
    'AddressBooks': {
      'Reference': [
        {
          'uid': 'Address-6988c5ff-3886-09b4-ef19-b2006100e035',
          'street': '555 PARK MANOR CIR',
          'street2': '',
          'city': 'BEL AIR',
          'zipcode': '21014',
          'state': 'MD',
          'country': {
            'value': 'United States'
          },
          'layout': 'Address',
          'validated': true
        },
        {
          'uid': 'Address-27bafce6-64be-2630-60e1-ad0176342d2e',
          'street': '554 PARK MANOR CIR',
          'street2': '',
          'city': 'BEL AIR',
          'zipcode': '21014',
          'state': 'MD',
          'country': {
            'value': 'United States'
          },
          'layout': 'Address',
          'validated': true
        },
        {
          'uid': 'Address-b339c567-dba3-d672-fe98-46eb7ccd06c0',
          'street': '556 PARK MANOR CIR',
          'street2': '',
          'city': 'BEL AIR',
          'zipcode': '21014',
          'state': 'MD',
          'country': {
            'value': 'United States'
          },
          'layout': 'Address',
          'validated': true
        }
      ],
      'Relative': [
        {
          'uid': 'Address-16a8d2ed-0be8-680a-4fbd-ef1bd5996de4',
          'street': '555 PARK MANOR CIR',
          'street2': '',
          'city': 'BEL AIR',
          'zipcode': '21014',
          'state': 'MD',
          'country': {
            'value': 'United States'
          },
          'layout': 'Address',
          'validated': true
        }
      ],
      'Residence': [
        {
          'uid': 'Address-6a88f4fc-ecda-ba84-20a9-0b148115770c',
          'street': '555 PARK MANOR CIR',
          'street2': '',
          'city': 'BEL AIR',
          'zipcode': '21014',
          'state': 'MD',
          'country': {
            'value': 'United States'
          },
          'layout': 'Address',
          'validated': true
        }
      ],
      'Employment': [
        {
          'uid': 'Address-9030b716-760b-0fca-a2b9-490530d63ef9',
          'street': '3000 CHESTNUT AVE',
          'street2': 'STE 100',
          'city': 'BALTIMORE',
          'zipcode': '21211',
          'state': 'MD',
          'country': {
            'value': 'United States'
          },
          'layout': 'Address',
          'validated': true
        }
      ],
      'Supervisor': [
        {
          'uid': 'Address-a8bb279f-cd49-3e14-34eb-f6e5281e70a4',
          'street': '3000 chestnut ave',
          'street2': 'STe 100',
          'city': 'baltimore',
          'zipcode': '21211',
          'state': 'MD',
          'country': {
            'value': 'United States'
          },
          'layout': 'Address',
          'validated': true
        }
      ],
      'Education': [
        {
          'uid': 'Address-3114d514-a8f8-ff92-3c74-2391b1b92c96',
          'street': '555 PARK MANOR CIR',
          'street2': '',
          'city': 'BEL AIR',
          'zipcode': '21014',
          'state': 'MD',
          'country': {
            'value': 'United States'
          },
          'layout': 'Address',
          'validated': true
        }
      ]
    }
  }
