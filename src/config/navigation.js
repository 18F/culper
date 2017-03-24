const navigation = [
  {
    name: 'Information about you',
    title: 'Information about you',
    url: 'identification',
    subsections: [
      { name: 'Full name', url: 'name' },
      { name: 'Your contact information', url: 'contacts' },
      { name: 'Other names used', url: 'othernames' },
      { name: 'Date of birth', url: 'birthdate' },
      { name: 'Place of birth', url: 'birthplace' },
      { name: 'SSN', url: 'ssn' },
      { name: 'Physical attributes', url: 'physical' },
      { hidden: true, name: 'Psychological and emotional health', url: 'psychological' }
    ]
  },
  {
    name: 'Financial record',
    title: 'Financial record',
    url: 'financial',
    hidden: false,
    subsections: [
      { name: 'Gambling debt', url: 'gambling' },
      { name: 'Bankruptcy', url: 'bankruptcy' },
      { hidden: true, name: 'Taxes', url: 'taxes' },
      { hidden: true, name: 'Employer card abuse', url: 'card' },
      { hidden: true, name: 'Credit counseling', url: 'credit' },
      { hidden: true, name: 'Deliquent payments', url: 'deliquent' },
      { hidden: true, name: 'Non-payment consequence', url: 'nonpayment' }
    ]
  },
  {
    name: 'Family & friends',
    title: 'Family & friends',
    url: 'family',
    hidden: false,
    subsections: [
      { hidden: true, name: 'Marital status', url: 'marital' },
      { hidden: true, name: 'People who know you well', url: 'friends' },
      { name: 'Relatives', url: 'relatives' }
    ]
  },
  {
    name: 'Citizenship',
    title: 'Citizenship',
    url: 'citizenship',
    hidden: true,
    subsections: [
      { name: 'Citizenship Status', url: 'status' },
      { name: 'Dual/Multiple Citizenship', url: 'multiple' }
    ]
  },
  {
    name: 'Military history',
    title: 'Military history',
    url: 'military',
    hidden: false,
    subsections: [
      { name: 'Selective service record', url: 'selective' },
      { name: 'U.S. military', url: 'history' },
      { name: 'Disciplinary procedures', url: 'disciplinary' },
      { name: 'Foreign military', url: 'foreign' }
    ]
  },
  {
    name: 'Your history',
    title: 'Your history',
    url: 'history',
    hidden: false,
    subsections: [
      { name: 'Where have you lived', url: 'residence' },
      { name: 'Employment activities', url: 'employment' },
      { name: 'Where you went to school', url: 'education' },
      { name: 'Former federal service', url: 'federal' },
      { hidden: true, name: 'Employment record', url: 'employment' }
    ]
  },
  {
    name: 'Foreign activities',
    title: 'Foreign activities',
    url: 'foreign',
    hidden: false,
    subsections: [
      { name: 'U.S. passport information', url: 'passport' },
      { hidden: true, name: 'Foreign contacs', url: 'contacts' },
      { hidden: true, name: 'Foreign activities', url: 'activities' },
      { hidden: true, name: 'Foreign business, professional activities, and government contacts', url: 'business' },
      { hidden: true, name: 'Foreign countries you have visited', url: 'travel' }
    ]
  },
  {
    name: 'TBD', // Recreation
    title: 'TBD',
    url: 'tbd',
    hidden: true,
    subsections: [
      { name: 'Illegal use of drugs and drug activity', url: 'drugs' },
      { name: 'Use of alcohol', url: 'alcohol' }
    ]
  },
  {
    name: 'Investigative and criminal history',
    title: 'Investigative and criminal history',
    url: 'legal',
    hidden: false,
    subsections: [
      { name: 'Police record', url: 'police' },
      { hidden: true, name: 'Involvement in non-criminal court actions', url: 'court' },
      { hidden: true, name: 'Investigations and clearance record', url: 'investigations' },
      { hidden: true, name: 'Financial record', url: 'financial' },
      { hidden: true, name: 'Use of information technology systems', url: 'technology' },
      { hidden: true, name: 'Association record', url: 'associations' }
    ]
  }
]

export default navigation
