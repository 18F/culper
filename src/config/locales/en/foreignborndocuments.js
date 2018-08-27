export const foreignBornDocuments = {
  heading: {
    documentNumber: 'Provide document number',
    documentExpiration: 'Provide document expiration date, if applicable'
  },
  para: {
    bornToUSParents: 'Born Abroad to U.S. Parents',
    naturalized: 'Naturalized',
    derived: 'Derived',
    notCitizen: 'Not a U.S. Citizen',
    other: 'Other'
  },
  bornToUSParents: {
    label: {
      fs240: 'FS 240 or 545',
      ds1350: 'DS 1350'
    }
  },
  naturalized: {
    label: {
      alien:
        'Alien Registration (on Certificate of Naturalization—utilize USCIS, CIS, or INS Registration number)',
      permanentResident: 'Permanent Resident Card (I-551)',
      certificateOfNaturalization:
        'Certificate of Naturalization (N550 or N570)'
    }
  },
  derived: {
    label: {
      alien:
        'Alien Registration (on Certificate of Naturalization—utilize USCIS, CIS, or INS Registration number)',
      permanentResident: 'Permanent Resident Card (I-551)',
      certificateOfNaturalization:
        'Certificate of Naturalization (N560 or N561)'
    }
  },
  notCitizen: {
    label: {
      permanentResident: 'I-551 Permanent Resident',
      employmentAuthorization: 'I-766 Employment Authorization',
      arrivalDepartureRecord: 'I-94 Arrival-Departure Record',
      visa: 'U.S. Visa (red foil number)',
      nonImmigrantStudent:
        'I-20 Certificate of Eligibility for Non-Immigrant-F1-Student',
      exchangeVisitor:
        'DS-2019 Certificate of Eligibility of Exchange Visitor-J1-Status'
    }
  },
  other: {
    label: {
      other: 'Other (Provide explanation)'
    }
  }
}
