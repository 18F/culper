import React from 'react'
import MockAdapter from 'axios-mock-adapter'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import { mount } from 'enzyme'
import SavedIndicator, { bits } from './SavedIndicator'

describe('The saved indicator component', () => {
  // Setup
  const middlewares = [ thunk ]
  const mockStore = configureMockStore(middlewares)

  it('hidden when not authenticated', () => {
    const store = mockStore({ authentication: [] })
    const component = mount(<Provider store={store}><SavedIndicator /></Provider>)
    expect(component.find('button').length).toEqual(0)
  })

  it('visible when authenticated', () => {
    const store = mockStore({ authentication: { authenticated: true, twofactor: true } })
    const component = mount(<Provider store={store}><SavedIndicator /></Provider>)
    expect(component.find('button').length).toEqual(1)
  })

  it('displays in seconds if under a minute', () => {
    const elapsed = 10 * 1000
    const store = mockStore({ authentication: { authenticated: true, twofactor: true } })
    const component = mount(<Provider store={store}><SavedIndicator elapsed={elapsed} /></Provider>)
    expect(component.find('.time').text()).toContain('sec')
  })

  it('displays in minutes if under an hour', () => {
    const elapsed = 60 * 1000
    const store = mockStore({ authentication: { authenticated: true, twofactor: true } })
    const component = mount(<Provider store={store}><SavedIndicator elapsed={elapsed} /></Provider>)
    expect(component.find('.time').text()).toContain('min')
  })

  it('displays in hours if under a day', () => {
    const elapsed = 60 * 60 * 1000
    const store = mockStore({ authentication: { authenticated: true, twofactor: true } })
    const component = mount(<Provider store={store}><SavedIndicator elapsed={elapsed} /></Provider>)
    expect(component.find('.time').text()).toContain('hour')
  })

  it('displays in days if greater than 24 hours', () => {
    const elapsed = 24 * 60 * 60 * 1000
    const store = mockStore({ authentication: { authenticated: true, twofactor: true } })
    const component = mount(<Provider store={store}><SavedIndicator elapsed={elapsed} /></Provider>)
    expect(component.find('.time').text()).toContain('day')
  })

  it('mouse in and out', () => {
    const store = mockStore({ authentication: { authenticated: true, twofactor: true } })
    const component = mount(<Provider store={store}><SavedIndicator interval={1} /></Provider>)
    component.find('button').simulate('mouseenter')
    expect(component.find('SavedIndicator').getNode().state.hover).toBe(true)
    component.find('button').simulate('mouseleave')
    expect(component.find('SavedIndicator').getNode().state.hover).toBe(false)
  })

  it('can get bits', () => {
    const application = {
      Identification: {
        ApplicantName: true,
        Contacts: true,
        OtherNames: true,
        ApplicantBirthDate: true,
        ApplicantBirthPlace: true,
        ApplicantSSN: true,
        Physical: true
      },
      Financial: {
        Bankruptcy: true,
        Gambling: true,
        Taxes: true,
        Card: true,
        Credit: true,
        Delinquent: true,
        Nonpayment: true
      },
      History: {
        Residence: true,
        Employment: true,
        Education: true,
        Federal: true
      },
      Relationships: {
        Marital: true,
        Cohabitants: true,
        People: true,
        Relatives: true
      },
      Citizenships: {
        Status: true,
        Multiple: true,
        Passports: true
      },
      Military: {
        Selective: true,
        History: true,
        Disciplinary: true,
        Foreign: true
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
        Travel: true
      },
      SubstanceUse: {
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
        ReceivedCounselings: true
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
        TerrorismAssociation: true
      },
      Psychological: {
        Competence: true,
        Consultations: true,
        Hospitalizations: true,
        Diagnoses: true,
        ExistingConditions: true
      }
    }

    const tests = [
      { section: 'identification', subsection: 'name', application: application },
      { section: 'identification', subsection: 'contacts', application: application },
      { section: 'identification', subsection: 'othernames', application: application },
      { section: 'identification', subsection: 'birthdate', application: application },
      { section: 'identification', subsection: 'birthplace', application: application },
      { section: 'identification', subsection: 'ssn', application: application },
      { section: 'identification', subsection: 'physical', application: application },
      { section: 'financial', subsection: 'bankruptcy', application: application },
      { section: 'financial', subsection: 'gambling', application: application },
      { section: 'financial', subsection: 'taxes', application: application },
      { section: 'financial', subsection: 'card', application: application },
      { section: 'financial', subsection: 'credit', application: application },
      { section: 'financial', subsection: 'delinquent', application: application },
      { section: 'financial', subsection: 'nonpayment', application: application },
      { section: 'history', subsection: 'residence', application: application },
      { section: 'history', subsection: 'employment', application: application },
      { section: 'history', subsection: 'education', application: application },
      { section: 'history', subsection: 'federal', application: application },
      { section: 'relationships', subsection: 'status/marital', application: application },
      { section: 'relationships', subsection: 'status/cohabitant', application: application },
      { section: 'relationships', subsection: 'people', application: application },
      { section: 'relationships', subsection: 'relatives', application: application },
      { section: 'citizenships', subsection: 'status', application: application },
      { section: 'citizenships', subsection: 'multiple', application: application },
      { section: 'citizenships', subsection: 'passports', application: application },
      { section: 'military', subsection: 'selective', application: application },
      { section: 'military', subsection: 'history', application: application },
      { section: 'military', subsection: 'disciplinary', application: application },
      { section: 'military', subsection: 'foreign', application: application },
      { section: 'foreign', subsection: 'passport', application: application },
      { section: 'foreign', subsection: 'contacts', application: application },
      { section: 'foreign', subsection: 'activities/direct', application: application },
      { section: 'foreign', subsection: 'activities/indirect', application: application },
      { section: 'foreign', subsection: 'activities/realestate', application: application },
      { section: 'foreign', subsection: 'activities/benefits', application: application },
      { section: 'foreign', subsection: 'activities/support', application: application },
      { section: 'foreign', subsection: 'business/advice', application: application },
      { section: 'foreign', subsection: 'business/family', application: application },
      { section: 'foreign', subsection: 'business/employment', application: application },
      { section: 'foreign', subsection: 'business/ventures', application: application },
      { section: 'foreign', subsection: 'business/conferences', application: application },
      { section: 'foreign', subsection: 'business/contact', application: application },
      { section: 'foreign', subsection: 'business/sponsorships', application: application },
      { section: 'foreign', subsection: 'business/political', application: application },
      { section: 'foreign', subsection: 'business/voting', application: application },
      { section: 'foreign', subsection: 'travel', application: application },
      { section: 'substance', subsection: 'drugs/usage', application: application },
      { section: 'substance', subsection: 'drugs/purchase', application: application },
      { section: 'substance', subsection: 'drugs/clearance', application: application },
      { section: 'substance', subsection: 'drugs/publicsafety', application: application },
      { section: 'substance', subsection: 'drugs/misuse', application: application },
      { section: 'substance', subsection: 'drugs/ordered', application: application },
      { section: 'substance', subsection: 'drugs/voluntary', application: application },
      { section: 'substance', subsection: 'alcohol/negative', application: application },
      { section: 'substance', subsection: 'alcohol/ordered', application: application },
      { section: 'substance', subsection: 'alcohol/voluntary', application: application },
      { section: 'substance', subsection: 'alcohol/additional', application: application },
      { section: 'legal', subsection: 'police/offenses', application: application },
      { section: 'legal', subsection: 'police/additionaloffenses', application: application },
      { section: 'legal', subsection: 'police/domesticviolence', application: application },
      { section: 'legal', subsection: 'investigations/history', application: application },
      { section: 'legal', subsection: 'investigations/revoked', application: application },
      { section: 'legal', subsection: 'investigations/debarred', application: application },
      { section: 'legal', subsection: 'court', application: application },
      { section: 'legal', subsection: 'technology/unauthorized', application: application },
      { section: 'legal', subsection: 'technology/manipulating', application: application },
      { section: 'legal', subsection: 'technology/unlawful', application: application },
      { section: 'legal', subsection: 'associations/terrorist-organization', application: application },
      { section: 'legal', subsection: 'associations/engaged-in-terrorism', application: application },
      { section: 'legal', subsection: 'associations/advocating', application: application },
      { section: 'legal', subsection: 'associations/membership-overthrow', application: application },
      { section: 'legal', subsection: 'associations/membership-violence-or-force', application: application },
      { section: 'legal', subsection: 'associations/activities-to-overthrow', application: application },
      { section: 'legal', subsection: 'associations/terrorism-association', application: application },
      { section: 'psycholigical', subsection: 'competence', application: application },
      { section: 'psycholigical', subsection: 'consultation', application: application },
      { section: 'psycholigical', subsection: 'hospitalizations', application: application },
      { section: 'psycholigical', subsection: 'diagnoses', application: application },
      { section: 'psycholigical', subsection: 'conditions', application: application }
    ]

    tests.forEach(test => {
      expect(bits(test.section, test.subsection, test.application)).toBe(true)
    })
  })
})
