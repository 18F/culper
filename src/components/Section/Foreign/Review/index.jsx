import React from 'react'
import Passport from '../Passport'
import Contacts from '../Contacts'
import {
  DirectActivity,
  IndirectActivity,
  RealEstateActivity,
  BenefitActivity,
  Support,
} from '../Activities'
import {
  Advice,
  Family,
  Employment,
  Ventures,
  Conferences,
  Contact,
  Sponsorship,
  Political,
  Voting,
} from '../Business'
import Travel from '../Travel'

const Review = () => (
  <div>
    <Passport
      name="passport"
      section="foreign"
      subsection="passport"
      required
      scrollIntoView={false}
    />
    <hr className="section-divider" />
    <Contacts
      name="contacts"
      section="foreign"
      subsection="contacts"
      required
      scrollIntoView={false}
    />
    <hr className="section-divider" />
    <DirectActivity
      name="directActivity"
      section="foreign"
      subsection="activities/direct"
      required
      scrollIntoView={false}
    />
    <hr className="section-divider" />
    <IndirectActivity
      name="indirectActivity"
      section="foreign"
      subsection="activities/indirect"
      required
      scrollIntoView={false}
    />
    <hr className="section-divider" />
    <RealEstateActivity
      name="realEstateActivity"
      section="foreign"
      subsection="activities/realestate"
      required
      scrollIntoView={false}
    />
    <hr className="section-divider" />
    <BenefitActivity
      name="benefitActivity"
      section="foreign"
      subsection="activities/benefits"
      required
      scrollIntoView={false}
    />
    <hr className="section-divider" />
    <Support
      name="support"
      section="foreign"
      subsection="activities/support"
      required
      scrollIntoView={false}
    />
    <hr className="section-divider" />
    <Advice
      name="advice"
      section="foreign"
      subsection="business/advice"
      required
      scrollIntoView={false}
    />
    <hr className="section-divider" />
    <Family
      name="family"
      section="foreign"
      subsection="business/family"
      required
      scrollIntoView={false}
    />
    <hr className="section-divider" />
    <Employment
      name="employment"
      section="foreign"
      subsection="business/employment"
      required
      scrollIntoView={false}
    />
    <hr className="section-divider" />
    <Ventures
      name="ventures"
      section="foreign"
      subsection="business/ventures"
      required
      scrollIntoView={false}
    />
    <hr className="section-divider" />
    <Conferences
      name="Conferences"
      section="foreign"
      subsection="business/conferences"
      required
      scrollIntoView={false}
    />
    <hr className="section-divider" />
    <Contact
      name="Contact"
      section="foreign"
      subsection="business/contact"
      required
      scrollIntoView={false}
    />
    <hr className="section-divider" />
    <Sponsorship
      name="Sponsorship"
      section="foreign"
      subsection="business/sponsorship"
      required
      scrollIntoView={false}
    />
    <hr className="section-divider" />
    <Political
      name="Political"
      section="foreign"
      subsection="business/political"
      required
      scrollIntoView={false}
    />
    <hr className="section-divider" />
    <Voting
      name="Voting"
      section="foreign"
      subsection="business/voting"
      required
      scrollIntoView={false}
    />
    <hr className="section-divider" />
    <Travel
      name="Travel"
      section="foreign"
      subsection="business/travel"
      required
      scrollIntoView={false}
    />
  </div>
)

export default Review
