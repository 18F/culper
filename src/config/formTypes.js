import formSections from './formSections/index'

export const SF85 = [
  {
    ...formSections.IDENTIFICATION,
    subsections: [
      formSections.IDENTIFICATION_INTRO,
      formSections.IDENTIFICATION_NAME,
      formSections.IDENTIFICATION_BIRTH_DATE,
      formSections.IDENTIFICATION_BIRTH_PLACE,
      formSections.IDENTIFICATION_SSN,
      formSections.IDENTIFICATION_OTHER_NAMES,
      formSections.IDENTIFICATION_CONTACTS,
      formSections.IDENTIFICATION_PHYSICAL,
      formSections.IDENTIFICATION_REVIEW,
    ],
  },
  {
    ...formSections.HISTORY,
    subsections: [
      formSections.HISTORY_INTRO,
      formSections.HISTORY_RESIDENCE,
      formSections.HISTORY_EMPLOYMENT,
      formSections.HISTORY_EDUCATION,
      formSections.HISTORY_REVIEW,
    ],
  },
  {
    ...formSections.CITIZENSHIP,
    subsections: [
      formSections.CITIZENSHIP_INTRO,
      formSections.CITIZENSHIP_STATUS,
      formSections.CITIZENSHIP_MULTIPLE,
      formSections.CITIZENSHIP_PASSPORTS,
      formSections.CITIZENSHIP_REVIEW,
    ],
  },
  {
    ...formSections.MILITARY,
    subsections: [
      formSections.MILITARY_INTRO,
      formSections.MILITARY_SELECTIVE,
      formSections.MILITARY_HISTORY,
      formSections.MILITARY_FOREIGN,
      formSections.MILITARY_REVIEW,
    ],
  },
  {
    ...formSections.FOREIGN,
    subsections: [
      formSections.FOREIGN_INTRO,
      formSections.FOREIGN_PASSPORT,
      formSections.FOREIGN_REVIEW,
    ],
  },
  {
    ...formSections.FOREIGN,
    subsections: [
      formSections.FINANCIAL_INTRO,
      formSections.FINANCIAL_BANKRUPTCY,
      formSections.FINANCIAL_GAMBLING,
      formSections.FINANCIAL_TAXES,
      formSections.FINANCIAL_CARD,
      formSections.FINANCIAL_CREDIT,
      formSections.FINANCIAL_DELINQUENT,
      formSections.FINANCIAL_NONPAYMENT,
      formSections.FINANCIAL_REVIEW,
    ],
  },
  {
    ...formSections.SUBSTANCE_USE,
    subsections: [
      formSections.SUBSTANCE_USE_INTRO,
      {
        ...formSections.SUBSTANCE_USE_DRUGS,
        subsections: [
          formSections.SUBSTANCE_USE_DRUGS_USAGE,
          formSections.SUBSTANCE_USE_DRUGS_PURCHASE,
          formSections.SUBSTANCE_USE_DRUGS_CLEARANCE,
          formSections.SUBSTANCE_USE_DRUGS_PUBLIC_SAFETY,
          formSections.SUBSTANCE_USE_DRUGS_MISUSE,
          formSections.SUBSTANCE_USE_DRUGS_ORDERED,
          formSections.SUBSTANCE_USE_DRUGS_VOLUNTARY,
        ],
      },
      formSections.SUBSTANCE_USE_REVIEW,
    ],
  },
  {
    ...formSections.LEGAL,
    subsections: [
      formSections.LEGAL_INTRO,
      {
        ...formSections.LEGAL_POLICE,
        subsections: [
          formSections.LEGAL_POLICE_INTRO,
          formSections.LEGAL_POLICE_OFFENSES,
          formSections.LEGAL_POLICE_ADDITIONAL_OFFENSES,
          formSections.LEGAL_POLICE_DOMESTIC_VIOLENCE,
        ],
      },
      {
        ...formSections.LEGAL_INVESTIGATIONS,
        subsections: [
          formSections.LEGAL_INVESTIGATIONS_HISTORY,
          formSections.LEGAL_INVESTIGATIONS_REVOKED,
          formSections.LEGAL_INVESTIGATIONS_DEBARRED,
        ],
      },
      {
        ...formSections.LEGAL_ASSOCIATIONS,
        subsections: [
          formSections.LEGAL_ASSOCIATIONS_TERRORIST_ORGANIZATION,
          formSections.LEGAL_ASSOCIATIONS_ENGAGED_IN_TERRORISM,
          formSections.LEGAL_ASSOCIATIONS_ADVOCATING,
          formSections.LEGAL_ASSOCIATIONS_MEMBERSHIP_OVERTHROW,
          formSections.LEGAL_ASSOCIATIONS_MEMBERSHIP_VIOLENCE,
          formSections.LEGAL_ASSOCIATIONS_ACTIVITIES_TO_OVERTHROW,
          formSections.LEGAL_ASSOCIATIONS_TERRORISM_ASSOCIATION,
        ],
      },
      formSections.LEGAL_REVIEW,

    ],
  },
]

export const SF85P = [
  {
    ...formSections.IDENTIFICATION,
    subsections: [
      formSections.IDENTIFICATION_INTRO,
      formSections.IDENTIFICATION_NAME,
      formSections.IDENTIFICATION_BIRTH_DATE,
      formSections.IDENTIFICATION_BIRTH_PLACE,
      formSections.IDENTIFICATION_SSN,
      formSections.IDENTIFICATION_OTHER_NAMES,
      formSections.IDENTIFICATION_CONTACTS,
      formSections.IDENTIFICATION_PHYSICAL,
      formSections.IDENTIFICATION_REVIEW,
    ],
  },

  {
    ...formSections.HISTORY,
    subsections: [
      formSections.HISTORY_INTRO,
      formSections.HISTORY_RESIDENCE,
      formSections.HISTORY_EMPLOYMENT,
      formSections.HISTORY_EDUCATION,
      formSections.HISTORY_FEDERAL,
      formSections.HISTORY_REVIEW,
    ],
  },
  {
    ...formSections.RELATIONSHIPS,
    subsections: [
      formSections.RELATIONSHIPS_INTRO,
      {
        ...formSections.RELATIONSHIPS_STATUS,
        subsections: [
          formSections.RELATIONSHIPS_STATUS_MARITAL,
          formSections.RELATIONSHIPS_STATUS_COHABITANTS,
        ],
      },
      formSections.RELATIONSHIPS_PEOPLE,
      formSections.RELATIONSHIPS_RELATIVES,
      formSections.RELATIONSHIPS_REVIEW,
    ],
  },
  {
    ...formSections.CITIZENSHIP,
    subsections: [
      formSections.CITIZENSHIP_INTRO,
      formSections.CITIZENSHIP_STATUS,
      formSections.CITIZENSHIP_MULTIPLE,
      formSections.CITIZENSHIP_PASSPORTS,
      formSections.CITIZENSHIP_REVIEW,
    ],
  },
  {
    ...formSections.MILITARY,
    subsections: [
      formSections.MILITARY_INTRO,
      formSections.MILITARY_SELECTIVE,
      formSections.MILITARY_HISTORY,
      formSections.MILITARY_FOREIGN,
      formSections.MILITARY_REVIEW,
    ],
  },
  {
    ...formSections.FOREIGN,
    subsections: [
      formSections.FOREIGN_INTRO,
      formSections.FOREIGN_PASSPORT,
      formSections.FOREIGN_TRAVEL,
      formSections.FOREIGN_REVIEW,
    ],
  },
  {
    ...formSections.FINANCIAL,
    subsections: [
      formSections.FINANCIAL_INTRO,
      formSections.FINANCIAL_BANKRUPTCY,
      formSections.FINANCIAL_GAMBLING,
      formSections.FINANCIAL_TAXES,
      formSections.FINANCIAL_CARD,
      formSections.FINANCIAL_CREDIT,
      formSections.FINANCIAL_DELINQUENT,
      formSections.FINANCIAL_NONPAYMENT,
      formSections.FINANCIAL_REVIEW,
    ],
  },
  {
    ...formSections.SUBSTANCE_USE,
    subsections: [
      formSections.SUBSTANCE_USE_INTRO,
      {
        ...formSections.SUBSTANCE_USE_DRUGS,
        subsections: [
          formSections.SUBSTANCE_USE_DRUGS_USAGE,
          formSections.SUBSTANCE_USE_DRUGS_PURCHASE,
          formSections.SUBSTANCE_USE_DRUGS_CLEARANCE,
          formSections.SUBSTANCE_USE_DRUGS_PUBLIC_SAFETY,
          formSections.SUBSTANCE_USE_DRUGS_MISUSE,
          formSections.SUBSTANCE_USE_DRUGS_ORDERED,
          formSections.SUBSTANCE_USE_DRUGS_VOLUNTARY,
        ],
      },
      {
        ...formSections.SUBSTANCE_USE_ALCOHOL,
        subsections: [
          formSections.SUBSTANCE_USE_ALCOHOL,
          formSections.SUBSTANCE_USE_ALCOHOL_NEGATIVE,
          formSections.SUBSTANCE_USE_ALCOHOL_ORDERED,
          formSections.SUBSTANCE_USE_ALCOHOL_VOLUNTARY,
          formSections.SUBSTANCE_USE_ALCOHOL_ADDITIONAL,
        ],
      },
      formSections.SUBSTANCE_USE_REVIEW,
    ],
  },
  {
    ...formSections.LEGAL,
    subsections: [
      formSections.LEGAL_INTRO,
      {
        ...formSections.LEGAL_POLICE,
        subsections: [
          formSections.LEGAL_POLICE_INTRO,
          formSections.LEGAL_POLICE_OFFENSES,
          formSections.LEGAL_POLICE_ADDITIONAL_OFFENSES,
          formSections.LEGAL_POLICE_DOMESTIC_VIOLENCE,
        ],
      },
      {
        ...formSections.LEGAL_INVESTIGATIONS,
        subsections: [
          formSections.LEGAL_INVESTIGATIONS_HISTORY,
          formSections.LEGAL_INVESTIGATIONS_REVOKED,
          formSections.LEGAL_INVESTIGATIONS_DEBARRED,
        ],
      },
      formSections.LEGAL_COURT,
      {
        ...formSections.LEGAL_TECHNOLOGY,
        subsections: [
          formSections.LEGAL_TECHNOLOGY_UNAUTHORIZED,
          formSections.LEGAL_TECHNOLOGY_MANIPULATING,
          formSections.LEGAL_TECHNOLOGY_UNLAWFUL,
        ],
      },
      {
        ...formSections.LEGAL_ASSOCIATIONS,
        subsections: [
          formSections.LEGAL_ASSOCIATIONS_TERRORIST_ORGANIZATION,
          formSections.LEGAL_ASSOCIATIONS_ENGAGED_IN_TERRORISM,
          formSections.LEGAL_ASSOCIATIONS_ADVOCATING,
          formSections.LEGAL_ASSOCIATIONS_MEMBERSHIP_OVERTHROW,
          formSections.LEGAL_ASSOCIATIONS_MEMBERSHIP_VIOLENCE,
          formSections.LEGAL_ASSOCIATIONS_ACTIVITIES_TO_OVERTHROW,
          formSections.LEGAL_ASSOCIATIONS_TERRORISM_ASSOCIATION,
        ],
      },
      formSections.LEGAL_REVIEW,
    ],
  },
]

export const SF86 = [
  {
    ...formSections.IDENTIFICATION,
    subsections: [
      formSections.IDENTIFICATION_INTRO,
      formSections.IDENTIFICATION_NAME,
      formSections.IDENTIFICATION_BIRTH_DATE,
      formSections.IDENTIFICATION_BIRTH_PLACE,
      formSections.IDENTIFICATION_SSN,
      formSections.IDENTIFICATION_OTHER_NAMES,
      formSections.IDENTIFICATION_CONTACTS,
      formSections.IDENTIFICATION_PHYSICAL,
      formSections.IDENTIFICATION_REVIEW,
    ],
  },
  {
    ...formSections.HISTORY,
    subsections: [
      formSections.HISTORY_INTRO,
      formSections.HISTORY_RESIDENCE,
      formSections.HISTORY_EMPLOYMENT,
      formSections.HISTORY_EDUCATION,
      formSections.HISTORY_FEDERAL,
      formSections.HISTORY_REVIEW,
    ],
  },
  {
    ...formSections.RELATIONSHIPS,
    subsections: [
      formSections.RELATIONSHIPS_INTRO,
      {
        ...formSections.RELATIONSHIPS_STATUS,
        subsections: [
          formSections.RELATIONSHIPS_STATUS_MARITAL,
          formSections.RELATIONSHIPS_STATUS_COHABITANTS,
        ],
      },
      formSections.RELATIONSHIPS_PEOPLE,
      formSections.RELATIONSHIPS_RELATIVES,
      formSections.RELATIONSHIPS_REVIEW,
    ],
  },
  {
    ...formSections.CITIZENSHIP,
    subsections: [
      formSections.CITIZENSHIP_INTRO,
      formSections.CITIZENSHIP_STATUS,
      formSections.CITIZENSHIP_MULTIPLE,
      formSections.CITIZENSHIP_PASSPORTS,
      formSections.CITIZENSHIP_REVIEW,
    ],
  },
  {
    ...formSections.MILITARY,
    subsections: [
      formSections.MILITARY_INTRO,
      formSections.MILITARY_SELECTIVE,
      formSections.MILITARY_HISTORY,
      formSections.MILITARY_DISCIPLINARY,
      formSections.MILITARY_FOREIGN,
      formSections.MILITARY_REVIEW,
    ],
  },
  {
    ...formSections.FOREIGN,
    subsections: [
      formSections.FOREIGN_INTRO,
      formSections.FOREIGN_PASSPORT,
      formSections.FOREIGN_CONTACTS,
      {
        ...formSections.FOREIGN_ACTIVITIES,
        subsections: [
          formSections.FOREIGN_ACTIVITIES_DIRECT,
          formSections.FOREIGN_ACTIVITIES_INDIRECT,
          formSections.FOREIGN_ACTIVITIES_REAL_ESTATE,
          formSections.FOREIGN_ACTIVITIES_BENEFITS,
          formSections.FOREIGN_ACTIVITIES_SUPPORT,
        ],
      },
      {
        ...formSections.FOREIGN_BUSINESS,
        susections: [
          formSections.FOREIGN_BUSINESS_ADVICE,
          formSections.FOREIGN_BUSINESS_FAMILY,
          formSections.FOREIGN_BUSINESS_EMPLOYMENT,
          formSections.FOREIGN_BUSINESS_VENTURES,
          formSections.FOREIGN_BUSINESS_CONFERENCES,
          formSections.FOREIGN_BUSINESS_CONTACT,
          formSections.FOREIGN_BUSINESS_SPONSORSHIP,
          formSections.FOREIGN_BUSINESS_POLITICAL,
          formSections.FOREIGN_BUSINESS_VOTING,
        ],
      },
      formSections.FOREIGN_TRAVEL,
      formSections.FOREIGN_REVIEW,
    ],
  },
  {
    ...formSections.FINANCIAL,
    subsections: [
      formSections.FINANCIAL_INTRO,
      formSections.FINANCIAL_BANKRUPTCY,
      formSections.FINANCIAL_GAMBLING,
      formSections.FINANCIAL_TAXES,
      formSections.FINANCIAL_CARD,
      formSections.FINANCIAL_CREDIT,
      formSections.FINANCIAL_DELINQUENT,
      formSections.FINANCIAL_NONPAYMENT,
      formSections.FINANCIAL_REVIEW,
    ],
  },
  {
    ...formSections.SUBSTANCE_USE,
    subsections: [
      formSections.SUBSTANCE_USE_INTRO,
      {
        ...formSections.SUBSTANCE_USE_DRUGS,
        subsections: [
          formSections.SUBSTANCE_USE_DRUGS_USAGE,
          formSections.SUBSTANCE_USE_DRUGS_PURCHASE,
          formSections.SUBSTANCE_USE_DRUGS_CLEARANCE,
          formSections.SUBSTANCE_USE_DRUGS_PUBLIC_SAFETY,
          formSections.SUBSTANCE_USE_DRUGS_MISUSE,
          formSections.SUBSTANCE_USE_DRUGS_ORDERED,
          formSections.SUBSTANCE_USE_DRUGS_VOLUNTARY,
        ],
      },
      {
        ...formSections.SUBSTANCE_USE_ALCOHOL,
        subsections: [
          formSections.SUBSTANCE_USE_ALCOHOL,
          formSections.SUBSTANCE_USE_ALCOHOL_NEGATIVE,
          formSections.SUBSTANCE_USE_ALCOHOL_ORDERED,
          formSections.SUBSTANCE_USE_ALCOHOL_VOLUNTARY,
          formSections.SUBSTANCE_USE_ALCOHOL_ADDITIONAL,
        ],
      },
      formSections.SUBSTANCE_USE_REVIEW,
    ],
  },
  {
    ...formSections.LEGAL,
    subsections: [
      formSections.LEGAL_INTRO,
      {
        ...formSections.LEGAL_POLICE,
        subsections: [
          formSections.LEGAL_POLICE_INTRO,
          formSections.LEGAL_POLICE_OFFENSES,
          formSections.LEGAL_POLICE_ADDITIONAL_OFFENSES,
          formSections.LEGAL_POLICE_DOMESTIC_VIOLENCE,
        ],
      },
      {
        ...formSections.LEGAL_INVESTIGATIONS,
        subsections: [
          formSections.LEGAL_INVESTIGATIONS_HISTORY,
          formSections.LEGAL_INVESTIGATIONS_REVOKED,
          formSections.LEGAL_INVESTIGATIONS_DEBARRED,
        ],
      },
      formSections.LEGAL_COURT,
      {
        ...formSections.LEGAL_TECHNOLOGY,
        subsections: [
          formSections.LEGAL_TECHNOLOGY_UNAUTHORIZED,
          formSections.LEGAL_TECHNOLOGY_MANIPULATING,
          formSections.LEGAL_TECHNOLOGY_UNLAWFUL,
        ],
      },
      {
        ...formSections.LEGAL_ASSOCIATIONS,
        subsections: [
          formSections.LEGAL_ASSOCIATIONS_TERRORIST_ORGANIZATION,
          formSections.LEGAL_ASSOCIATIONS_ENGAGED_IN_TERRORISM,
          formSections.LEGAL_ASSOCIATIONS_ADVOCATING,
          formSections.LEGAL_ASSOCIATIONS_MEMBERSHIP_OVERTHROW,
          formSections.LEGAL_ASSOCIATIONS_MEMBERSHIP_VIOLENCE,
          formSections.LEGAL_ASSOCIATIONS_ACTIVITIES_TO_OVERTHROW,
          formSections.LEGAL_ASSOCIATIONS_TERRORISM_ASSOCIATION,
        ],
      },
      formSections.LEGAL_REVIEW,
    ],
  },
  {
    ...formSections.PSYCHOLOGICAL,
    subsections: [
      formSections.PSYCHOLOGICAL_INTRO,
      formSections.PSYCHOLOGICAL_COMPETENCE,
      formSections.PSYCHOLOGICAL_CONSULTATIONS,
      formSections.PSYCHOLOGICAL_HOSPITALIZATIONS,
      formSections.PSYCHOLOGICAL_DIAGNOSES,
      formSections.PSYCHOLOGICAL_CONDITIONS,
      formSections.PSYCHOLOGICAL_REVIEW,
    ],
  },
]

export const reduceSubsections = sections => (
  sections.reduce((accumulator, section) => {
    if (section.subsections && section.subsections.length) {
      accumulator = accumulator.concat(reduceSubsections(section.subsections))
    } else {
      accumulator.push(section)
    }

    return accumulator
  }, [])
)
