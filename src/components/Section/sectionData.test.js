import { SF85, SF85P, SF86 } from 'config/formTypes'
import sectionData, { getForm, getSubsections, getLegalPoliceSubsections } from './sectionData'

describe('Retrieving section data', () => {
  it('can get section data', () => {
    const application = {
      Identification: {
        ApplicantName: true,
        Contacts: true,
        OtherNames: true,
        ApplicantBirthDate: true,
        ApplicantBirthPlace: true,
        ApplicantSSN: true,
        Physical: true,
      },
      Financial: {
        Bankruptcy: true,
        Gambling: true,
        Taxes: true,
        Card: true,
        Credit: true,
        Delinquent: true,
        Nonpayment: true,
      },
      History: {
        Residence: true,
        Employment: true,
        Education: true,
        Federal: true,
      },
      Relationships: {
        Marital: true,
        Cohabitants: true,
        People: true,
        Relatives: true,
      },
      Citizenship: {
        Status: true,
        Multiple: true,
        Passports: true,
      },
      Military: {
        Selective: true,
        History: true,
        Disciplinary: true,
        Foreign: true,
      },
      Foreign: {
        Passport: true,
        Contacts: true,
        DirectActivity: true,
        IndirectActivity: true,
        RealEstateActivity: true,
        BenefitActivity: true,
        Support: true,
        Advice: true,
        Family: true,
        Employment: true,
        Ventures: true,
        Conferences: true,
        Contact: true,
        Sponsorship: true,
        Political: true,
        Voting: true,
        Travel: true,
      },
      Substance: {
        DrugUses: true,
        DrugInvolvements: true,
        DrugClearanceUses: true,
        DrugPublicSafetyUses: true,
        PrescriptionUses: true,
        OrderedTreatments: true,
        VoluntaryTreatments: true,
        NegativeImpacts: true,
        OrderedCounselings: true,
        VoluntaryCounselings: true,
        ReceivedCounselings: true,
      },
      Legal: {
        PoliceOffenses: true,
        PoliceOtherOffenses: true,
        PoliceDomesticViolence: true,
        History: true,
        Revoked: true,
        Debarred: true,
        NonCriminalCourtActions: true,
        Unauthorized: true,
        Manipulating: true,
        Unlawful: true,
        TerroristOrganization: true,
        EngagedInTerrorism: true,
        Advocating: true,
        MembershipOverthrow: true,
        MembershipViolence: true,
        ActivitiesToOverthrow: true,
        TerrorismAssociation: true,
      },
      Psychological: {
        Competence: true,
        Consultations: true,
        Hospitalizations: true,
        Diagnoses: true,
        ExistingConditions: true,
      },
    }

    const tests = [
      {
        section: 'identification',
        subsection: 'name',
        application,
      },
      {
        section: 'identification',
        subsection: 'contacts',
        application,
      },
      {
        section: 'identification',
        subsection: 'othernames',
        application,
      },
      {
        section: 'identification',
        subsection: 'birthdate',
        application,
      },
      {
        section: 'identification',
        subsection: 'birthplace',
        application,
      },
      {
        section: 'identification',
        subsection: 'ssn',
        application,
      },
      {
        section: 'identification',
        subsection: 'physical',
        application,
      },
      {
        section: 'financial',
        subsection: 'bankruptcy',
        application,
      },
      {
        section: 'financial',
        subsection: 'gambling',
        application,
      },
      {
        section: 'financial',
        subsection: 'taxes',
        application,
      },
      {
        section: 'financial',
        subsection: 'card',
        application,
      },
      {
        section: 'financial',
        subsection: 'credit',
        application,
      },
      {
        section: 'financial',
        subsection: 'delinquent',
        application,
      },
      {
        section: 'financial',
        subsection: 'nonpayment',
        application,
      },
      {
        section: 'history',
        subsection: 'residence',
        application,
      },
      {
        section: 'history',
        subsection: 'employment',
        application,
      },
      {
        section: 'history',
        subsection: 'education',
        application,
      },
      {
        section: 'history',
        subsection: 'federal',
        application,
      },
      {
        section: 'relationships',
        subsection: 'status/marital',
        application,
      },
      {
        section: 'relationships',
        subsection: 'status/cohabitant',
        application,
      },
      {
        section: 'relationships',
        subsection: 'people',
        application,
      },
      {
        section: 'relationships',
        subsection: 'relatives',
        application,
      },
      {
        section: 'citizenship',
        subsection: 'status',
        application,
      },
      {
        section: 'citizenship',
        subsection: 'multiple',
        application,
      },
      {
        section: 'citizenship',
        subsection: 'passports',
        application,
      },
      {
        section: 'military',
        subsection: 'selective',
        application,
      },
      {
        section: 'military',
        subsection: 'history',
        application,
      },
      {
        section: 'military',
        subsection: 'disciplinary',
        application,
      },
      {
        section: 'military',
        subsection: 'foreign',
        application,
      },
      {
        section: 'foreign',
        subsection: 'passport',
        application,
      },
      {
        section: 'foreign',
        subsection: 'contacts',
        application,
      },
      {
        section: 'foreign',
        subsection: 'activities/direct',
        application,
      },
      {
        section: 'foreign',
        subsection: 'activities/indirect',
        application,
      },
      {
        section: 'foreign',
        subsection: 'activities/realestate',
        application,
      },
      {
        section: 'foreign',
        subsection: 'activities/benefits',
        application,
      },
      {
        section: 'foreign',
        subsection: 'activities/support',
        application,
      },
      {
        section: 'foreign',
        subsection: 'business/advice',
        application,
      },
      {
        section: 'foreign',
        subsection: 'business/family',
        application,
      },
      {
        section: 'foreign',
        subsection: 'business/employment',
        application,
      },
      {
        section: 'foreign',
        subsection: 'business/ventures',
        application,
      },
      {
        section: 'foreign',
        subsection: 'business/conferences',
        application,
      },
      {
        section: 'foreign',
        subsection: 'business/contact',
        application,
      },
      {
        section: 'foreign',
        subsection: 'business/sponsorship',
        application,
      },
      {
        section: 'foreign',
        subsection: 'business/political',
        application,
      },
      {
        section: 'foreign',
        subsection: 'business/voting',
        application,
      },
      {
        section: 'foreign',
        subsection: 'travel',
        application,
      },
      {
        section: 'substance',
        subsection: 'drugs/usage',
        application,
      },
      {
        section: 'substance',
        subsection: 'drugs/purchase',
        application,
      },
      {
        section: 'substance',
        subsection: 'drugs/clearance',
        application,
      },
      {
        section: 'substance',
        subsection: 'drugs/publicsafety',
        application,
      },
      {
        section: 'substance',
        subsection: 'drugs/misuse',
        application,
      },
      {
        section: 'substance',
        subsection: 'drugs/ordered',
        application,
      },
      {
        section: 'substance',
        subsection: 'drugs/voluntary',
        application,
      },
      {
        section: 'substance',
        subsection: 'alcohol/negative',
        application,
      },
      {
        section: 'substance',
        subsection: 'alcohol/ordered',
        application,
      },
      {
        section: 'substance',
        subsection: 'alcohol/voluntary',
        application,
      },
      {
        section: 'substance',
        subsection: 'alcohol/additional',
        application,
      },
      {
        section: 'legal',
        subsection: 'police/offenses',
        application,
      },
      {
        section: 'legal',
        subsection: 'police/additionaloffenses',
        application,
      },
      {
        section: 'legal',
        subsection: 'police/domesticviolence',
        application,
      },
      {
        section: 'legal',
        subsection: 'investigations/history',
        application,
      },
      {
        section: 'legal',
        subsection: 'investigations/revoked',
        application,
      },
      {
        section: 'legal',
        subsection: 'investigations/debarred',
        application,
      },
      {
        section: 'legal',
        subsection: 'court',
        application,
      },
      {
        section: 'legal',
        subsection: 'technology/unauthorized',
        application,
      },
      {
        section: 'legal',
        subsection: 'technology/manipulating',
        application,
      },
      {
        section: 'legal',
        subsection: 'technology/unlawful',
        application,
      },
      {
        section: 'legal',
        subsection: 'associations/terrorist-organization',
        application,
      },
      {
        section: 'legal',
        subsection: 'associations/engaged-in-terrorism',
        application,
      },
      {
        section: 'legal',
        subsection: 'associations/advocating',
        application,
      },
      {
        section: 'legal',
        subsection: 'associations/membership-overthrow',
        application,
      },
      {
        section: 'legal',
        subsection: 'associations/membership-violence-or-force',
        application,
      },
      {
        section: 'legal',
        subsection: 'associations/activities-to-overthrow',
        application,
      },
      {
        section: 'legal',
        subsection: 'associations/terrorism-association',
        application,
      },
      {
        section: 'psychological',
        subsection: 'competence',
        application,
      },
      {
        section: 'psychological',
        subsection: 'consultations',
        application,
      },
      {
        section: 'psychological',
        subsection: 'hospitalizations',
        application,
      },
      {
        section: 'psychological',
        subsection: 'diagnoses',
        application,
      },
      {
        section: 'psychological',
        subsection: 'conditions',
        application,
      },
    ]

    tests.forEach((test) => {
      const results = sectionData(
        test.section,
        test.subsection,
        test.application
      )
      for (const r of results) {
        if (r.data !== true) {
          console.log(`Failure on ${test.section} and ${test.subsection}`)
        }
        expect(r.data).toBe(true)
      }
    })
  })
})

describe('sectionData', () => {
  const defaultApplication = {
    Identification: {},
    Financial: {},
    Relationships: {},
    Citizenship: {},
    Military: {},
    History: {},
    Foreign: {},
    Legal: {},
    Psychological: {},
    Substance: {},
  }

  describe('SF86', () => {
    const application = {
      ...defaultApplication,
      Settings: { formType: 'SF86' },
    }

    it('has correct identification sections', () => {
      expect(sectionData('identification', 'review', application).length)
        .toEqual(7)
    })

    it('has correct history sections', () => {
      expect(sectionData('history', 'review', application).length)
        .toEqual(4)
    })

    it('has correct relationships sections', () => {
      expect(sectionData('relationships', 'review', application).length)
        .toEqual(4)
    })

    it('has correct citizenship sections', () => {
      expect(sectionData('citizenship', 'review', application).length)
        .toEqual(4)
    })

    it('has correct military sections', () => {
      expect(sectionData('military', 'review', application).length)
        .toEqual(4)
    })

    it('has correct foreign sections', () => {
      expect(sectionData('foreign', 'review', application).length)
        .toEqual(16)
    })

    it('has correct financial sections', () => {
      expect(sectionData('financial', 'review', application).length)
        .toEqual(7)
    })

    it('has correct substance sections', () => {
      expect(sectionData('substance', 'review', application).length)
        .toEqual(11)
    })

    it('has correct psychological sections', () => {
      expect(sectionData('psychological', 'review', application).length)
        .toEqual(5)
    })

    it('has correct legal sections', () => {
      expect(sectionData('legal', 'review', application).length)
        .toEqual(17)
    })
  })

  describe('SF85', () => {
    const application = {
      ...defaultApplication,
      Settings: { formType: 'SF85' },
    }

    it('has correct identification sections', () => {
      expect(sectionData('identification', 'review', application).length)
        .toEqual(7)
    })

    it('has correct history sections', () => {
      expect(sectionData('history', 'review', application).length)
        .toEqual(3)
    })

    it('has correct citizenship sections', () => {
      expect(sectionData('citizenship', 'review', application).length)
        .toEqual(3)
    })

    it('has correct military sections', () => {
      expect(sectionData('military', 'review', application).length)
        .toEqual(4)
    })

    it('has correct financial sections', () => {
      expect(sectionData('financial', 'review', application).length)
        .toEqual(2)
    })

    it('has correct substance sections', () => {
      expect(sectionData('substance', 'review', application).length)
        .toEqual(5)
    })

    it('has correct legal sections', () => {
      expect(sectionData('legal', 'review', application).length)
        .toEqual(12)
    })
  })
})

describe('getForm', () => {
  it('gets the correct form', () => {
    expect(getForm({ formType: 'SF86' })).toEqual(SF86)
    expect(getForm({ formType: 'SF85P' })).toEqual(SF85P)
    expect(getForm({ formType: 'SF85' })).toEqual(SF85)
  })

  it('defaults to the SF86', () => {
    expect(getForm({ formType: '' })).toEqual(SF86)
  })
})

describe('getSubsections', () => {
  describe('SF86', () => {
    it('filters down to only get the correct subsections', () => {
      expect(getSubsections('financial', { Settings: { formType: 'SF86' } }).length)
        .toEqual(7)
    })
  })

  describe('SF85', () => {
    it('filters down to only get the correct subsections', () => {
      expect(getSubsections('financial', { Settings: { formType: 'SF85' } }).length)
        .toEqual(2)
    })
  })
})

describe('getLegalPoliceSubsections', () => {
  describe('SF86', () => {
    it('filters down to only get the correct subsections', () => {
      expect(getLegalPoliceSubsections({ Settings: { formType: 'SF86' } }).length)
        .toEqual(3)
    })
  })

  describe('SF85', () => {
    it('filters down to only get the correct subsections', () => {
      expect(getLegalPoliceSubsections({ Settings: { formType: 'SF85' } }).length)
        .toEqual(2)
    })
  })
})
