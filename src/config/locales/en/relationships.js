export const relationships = {
  intro: {
    title: 'Section 3: Relationships',
    body: 'You will be asked questions about your personal relationships and be asked to provide details if necessary.'
  },
  tour: {
    para: 'Take a guided tour through the section'
  },
  review: {
    para: 'View all the sections associated with relationships at once',
    comments: 'Add a comment to clarify any of your responses in the relationships section'
  },
  destination: {
    intro: 'Relationships intro',
    review: 'Review Relationships',
    relatives: 'Relatives',
    marital: 'Marital status',
    people: 'People who know you well',
    cohabitant: 'Cohabitant'
  },
  relatives: {
    collection: {
      summary: {
        title: 'Summary of relatives',
        unknown: 'Click to provide details',
        item: 'Relative'
      },
      appendTitle: 'Do you have an additional relative to enter?',
      append: 'Add another relative'
    },
    heading: {
      title: 'Add each relative applicable to you, regardless if they are living or deceased.',
      needmore: 'Since you answered yes we need more information',
      relation: 'Provide relative type',
      name: 'Provide your relative\'s full name',
      birthdate: 'Provide your relative\'s date of birth',
      birthplace: 'Provide your relative\'s place of birth',
      citizenship: 'Provide your relative\'s country(ies) of citizenship',
      maiden: 'Provide your mother\'s maiden name',
      alias: {
        branch: 'Has this relative used any additional names?',
        title: 'Provide other names used and the period of time that your relative used them.',
        maiden: 'Was this their maiden name?',
        reason: 'Provide the reason(s) why the name changed.',
        additional: 'Has this relative used any additional names?'
      },
      deceased: {
        branch: 'Is your relative deceased?',
        address: 'Provide your relative\'s current address'
      },
      us: {
        title: 'U.S. Citizenship Documentation',
        documentation: 'Provide one type of citizenship documentation and document number below:',
        number: 'Provide the document number',
        name: 'Provide the name of the court that issued the Certificate of Naturalization',
        address: 'Provide the address of the court that issued the Certificate of Naturalization'
      },
      address: {
        title: 'Provide type of documentation he or she possesses to support U.S. residence:',
        number: 'Provide the document number',
        expiration: 'Provide document expiration date',
        firstcontact: 'Provide approximate date of first contact',
        lastcontact: 'Provide approximate date of last contact',
        methods: 'Provide methods of contact',
        frequency: 'Provide approximate frequency of contact'
      },
      employer: {
        name: 'Provide name of current employer, or provide the name of their most recent employer if not currently employed (if known)',
        address: 'Provide the address of current employer, or provide the address of their most recent employer if not currently employed',
        affiliated: 'Is this relative affiliated with a foreign government, military, security, defense industry, foreign movement, or intelligence service?',
        relationship: 'Describe the relative\'s relationship with the foreign government, military, security, defense industry, foreign movement, or intelligence service.'
      }
    },
    para: {
      opportunity: 'An opportunity will be provided to list multiple relatives for each type.',
      checkall: 'Check all that apply.',
      alias: 'Such as maiden, name by former marriage, former name, alias, or nickname.',
      abroad: 'Born abroad to U.S. Parents:',
      naturalized: 'Naturalized:',
      derived: 'Derived:',
      notcitizen: 'Not a U.S. Citizen:',
      or: 'or'
    },
    label: {
      idk: 'I don\'t know',
      relation: {
        mother: 'Mother',
        father: 'Father',
        stepmother: 'Stepmother',
        stepfather: 'Stepfather',
        fosterparent: 'Foster parent',
        child: [
          'Child',
          '(including adopted/foster)'
        ],
        stepchild: 'Stepchild',
        brother: 'Brother',
        sister: 'Sister',
        stepbrother: 'Stepbrother',
        stepsister: 'Stepsister',
        halfbrother: 'Half-brother',
        halfsister: 'Half-sister',
        fatherinlaw: 'Father-in-law',
        motherinlaw: 'Mother-in-law',
        guardian: 'Guardian'
      },
      abroad: {
        fs: 'FS 240 or 545',
        ds: 'DS 1350'
      },
      naturalized: {
        alien: [
          'Alien Registration',
          '(on Certification of Naturalization - utilize USCIS, CIS, or INS registration number)'
        ],
        permanent: [
          'Permanent resident card',
          '(I-551)'
        ],
        certificate: [
          'Certificate of naturalization',
          '(N550 or N570)'
        ]
      },
      derived: {
        alien: [
          'Alien Registration',
          '(on Certification of Naturalization - utilize USCIS, CIS, or INS registration number)'
        ],
        permanent: [
          'Permanent resident card',
          '(I-551)'
        ],
        certificate: [
          'Certificate of naturalization',
          '(N550 or N570)'
        ],
        other: [
          'Other',
          '(provide explanation)'
        ]
      },
      methods: {
        inperson: 'In person',
        telephone: 'Telephone',
        electronic: [
          'Electronic',
          '(such as e-mail, texting, chat rooms, etc.)'
        ],
        written: 'Written correspondence',
        other: [
          'Other',
          '(provide explanation)'
        ]
      },
      frequency: {
        daily: 'Daily',
        weekly: 'Weekly',
        monthly: 'Monthly',
        quarterly: 'Quarterly',
        annually: 'Annually',
        other: [
          'Other',
          '(provide explanation)'
        ]
      },
      document: {
        permanent: 'I-551 Permanent Resident',
        employment: 'I-766 Employment Authorization',
        arrival: 'I-94 Arrival-Departure Record',
        visa: [
          'U.S. Visa',
          '(red foil number)'
        ],
        f1: [
          'I-20 Certificate of Eligibility',
          '(non-immigrant F1 student)'
        ],
        j1: [
          'DS-2019 Certificate of Eligibility',
          '(exchange visitor J1 status)'
        ],
        other: [
          'Other',
          '(provide explanation)'
        ]
      },
      maiden: {
        same: 'Same as listed',
        diff: 'Different name'
      },
      estimated: 'Estimated',
      birthplace: 'Was this person born in the United States of America?'
    },
    placeholder: {
      city: 'Please enter the city of birth',
      country: 'Please enter the country of birth'
    },
    help: {
      relation: {
        title: 'Need help selecting relatives?',
        message: 'Select the relatives relationship to you',
        note: ''
      },
      birthdate: {
        title: 'Estimate the date if unsure',
          message: 'If you are not sure of the exact date give us your best guess and check the "Estimated" checkbox.',
        note: ''
      },
      birthplace: {
        title: 'Need help with the place of birth?',
        message: 'Provide the place of birth',
        note: ''
      },
      citizenship: {
        title: 'List all citizenships this person has',
        message: 'You can provide multiple citizenships in this question.',
        note: ''
      },
      maiden: {
        title: 'Need help with the maiden name?',
        message: 'Provide the maiden name of your mother',
        note: ''
      },
      deceased: {
        title: 'Need help with the deceased?',
        message: 'If your relative is no longer living please answer "Yes"',
        note: ''
      },
      address: {
        title: 'Acronyms:',
          message: 'APO - Army Post Office, FPO - Fleet Post Office, DPO - Diplomatic Post Office.',
        note: ''
      },
      abroad: {
        title: 'Need help if the relative was born abroad?',
        message: 'Select the appropriate type of documentation.',
        note: ''
      },
      naturalized: {
        title: 'Need help if the relative was naturalized?',
        message: 'Select the appropriate type of documentation',
        note: ''
      },
      derived: {
        title: 'Need help if the relative is a derived citizen?',
        message: 'Select the appropriate type of documentation',
        note: ''
      },
      documentnumber: {
        title: 'Need help with the document number?',
        message: 'Provide the document number for the citizenship',
        note: ''
      },
      documentexpiration: {
        title: 'Need help with the date of expiration?',
        message: 'Provide the approximate date of expiration',
        note: ''
      },
      courtname: {
        title: 'Need help with the court name?',
        message: 'Provide the court name that issued the Certificate of Naturalization',
        note: ''
      },
      courtaddress: {
        title: 'Need help with the court address?',
        message: 'Provide the address of the court that issued the Certificate of Naturalization',
        note: ''
      },
      document: {
        title: 'Need help if the relative has documentation to support U.S. residence?',
        message: 'If the relative resides in the U.S. but is not a citizen provide the documentation',
        note: ''
      },
      residencedocumentnumber: {
        title: 'Need help with the residence document number?',
        message: 'Provide the residence document number',
        note: ''
      },
      expiration: {
        title: 'Need help with the expiration date?',
        message: 'Provide the expiration date',
        note: ''
      },
      firstcontact: {
        title: 'Need help with the date of first contact?',
        message: 'Provide the approximate date of first contact',
        note: ''
      },
      lastcontact: {
        title: 'Need help with the date of last contact?',
        message: 'Provide the approximate date of last contact',
        note: ''
      },
      methods: {
        title: 'Need help with the methods of correspondence with the relative?',
        message: 'Select all types of correspondence used with the relative',
        note: ''
      },
      frequency: {
        title: 'Need help with the frequency of correspondence?',
        message: 'Provide the best response to how often you correspond with the relative',
        note: ''
      },
      employer: {
        title: 'Need help with the relative\'s employer name?',
        message: 'Provide the employer name or select "I don\'t know" if unknown',
        note: ''
      },
      employeraddress: {
        title: 'Need help with the relative\'s employer\'s address?',
        message: 'Provide the employer address or select "I don\'t know" if unknown',
        note: ''
      },
      affiliation: {
        title: 'Need help if the relative has any foreign affiliations?',
        message: 'If the relative is affiliated with a foreign government, military, security, defense industry, foreign movement, or intelligence service answer "Yes"',
        note: ''
      },
      employerrelationship: {
        title: 'Need help with the relative\'s relationships to foreign affiliates?',
        message: 'Describe the affiliation with the foreign government, military, security, defense industry, foreign movement, or intelligence service answer "Yes"',
        note: ''
      },
      aliasdates: {
        title: 'Need help with the date range the other name was used?',
        message: 'Provide the approximate date range the name was used',
        note: ''
      }
    }
  },
  marital: {
    heading: {
      title: 'Provide your current marital/relationship status with regard to civil marriage, legally recognized civil union, or legally recognized domestic partnership.'
    },
    label: {
      status: {
        never: 'Never entered into a civil marriage, legally recognized civil union, or legally recognized domestic partnership',
        married: 'Currently in a civil marriage',
        inCivilUnion: 'Currently in a legally recognized domestic partnership or legally recognized civil union',
        separated: 'Separated',
        annulled: 'Annulled',
        divorced: 'Divorced/dissolved',
        widowed: 'Widowed'
      }
    }
  },
  civilUnion: {
    heading: {
      name: 'Provide this person\'s full name',
      birthdate: 'Provide this person\'s date of birth',
      birthplace: 'Provide this person\'s place of birth',
      foreignBornDocument: 'If the person is foreign born, provide one type of documentation that he or she possesses and the document number.',
      ssn: 'Provide this person\'s U.S. Social Security Number',
      othernames: 'Has this person used another name?',
      appendOthernames: 'Has this person used any other names?',
      citizenship: 'Provide this person\'s country(ies) of citizenship',
      location: 'Provide the location',
      address: 'Provide this person\'s current address, if different than your current address',
      addressWithoutCurrent: 'Provide this person\'s current address',
      telephone: 'Provide this person\'s telephone number',
      email: 'Provide this person\'s email address',
      separated: 'Are you separated?',
      dateSeparated: 'Provide date of separation',
      enteredCivilUnion: 'Provide date when you entered into your civil marriage, civil union, or domestic partnership.',
      locationSeparated: 'If legally separated, provide the location of the record',
      divorced: 'Do you have a person from whom you are divorced/dissolved, annulled, or widowed to report?',
      addressSeparated: 'If legally separated, provide the location of the record.'
    },
    notApplicable: {
      or: 'or',
      label: 'Not applicable'
    },
    useCurrentAddress: {
      or: 'or',
      label: 'Use my current address'
    },
    deceasedAddressNotApplicable: {
      or: 'or',
      label: 'I don\'t know'
    },
    para: {
      never: 'Complete the following about the person with whom you are in a civil marriage, legally recognized civil union, or legally recognized domestic partnership, or the person from whom you are currently separated.',
      othernames: 'Such as maiden name, names by other marriages, civil marriages, legally recognized civil unions, or legally recognized domestic partnerships, nicknames, etc., and provide dates used for each name.'
    },
    label: {
      birthplace: 'Was this person born in the United States of America?',
      location: 'Was this location in the United States?',
      addressSeparated: 'Was this location in the United States?'
    },
    divorce: {
      heading: {
        name: 'Provide this person\'s full name',
        address: 'Provide the location',
        birthdate: 'Provide this person\'s date of birth',
        citizenship: 'Provide the country(ies) of citizenship',
        telephone: 'Provide this person\'s telephone number',
        birthplace: 'Provide this person\'s place of birth',
        dateDivorced: 'Provide the date divorced/dissolved, annulled or widowed',
        recognized: 'Provide the date your civil marriage, civil union, or domestic partnership was legally recognized',
        deceased: 'Is this person deceased?',
        deceasedAddress: 'Provide last known address of the person from whom you are divorced/dissolved or annulled',
        status: 'Provide status'
      },
      label: {
        divorced: 'Divorced/Dissolved',
        widowed: 'Widowed',
        annulled: 'Annulled',
        birthplace: 'Was this person born in the United States of America?'
      },
      para: {
        intro: 'Provide information about any person from whom you are divorced/dissolved, annulled, or widowed.'
      },
      deceased: {
        label: {
          yes: 'Yes',
          no: 'No',
          dontKnow: 'I don\'t know'
        }
      },
      collection: {
        description: 'Summary of divorcees',
        appendTitle: 'Do you have any additional person(s) from whom you are divorced/dissolved, annulled, or widowed to report?',
        appendLabel: 'Add another person',
        itemType: 'Person'
      },
      help: {
        birthdate: {
          title: 'Estimate the date if unsure',
          message: 'If you are not sure of the exact date give us your best guess and check the "Estimated" checkbox.',
          note: ''
        },
        birthplace: {
          title: 'Need help with the birth place?',
          message: 'Provide the place of birth',
          note: ''
        },
        recognized: {
          title: 'Estimate the date if unsure',
          message: 'If you are not sure of the exact date give us your best guess and check the "Estimated" checkbox.',
          note: ''
        },
        separated: {
          title: 'Need help with separated?',
          message: 'Mark whether you are separated',
          note: ''
        },
        divorced: {
          title: 'Need help with this question?',
          message: 'Mark whether you are currently divorced',
          note: ''
        },
        email: {
          title: 'Need help with providing email?',
          message: 'Enter the email of the person',
          note: ''
        },
        telephone: {
          title: 'Need help with providing a telephone number?',
          message: 'Enter the telephone number of the person',
          note: ''
        },
        address: {
          title: 'Acronyms:',
          message: 'APO - Army Post Office, FPO - Fleet Post Office, DPO - Diplomatic Post Office.',
          note: ''
        },
        dateDivorced: {
          title: 'Estimate the date if unsure',
          message: 'If you are not sure of the exact date give us your best guess and check the "Estimated" checkbox.',
          note: ''
        }
      }
    },
    othernames: {
      heading: {
        name: 'Provide full name',
        maiden: 'Is this their maiden name?',
        used: 'Provide dates name was used'
      }
    },
    help: {
      address: {
        title: 'Acronyms:',
        message: 'APO - Army Post Office, FPO - Fleet Post Office, DPO - Diplomatic Post Office.',
        note: ''
      },
      addressSeparated: {
        title: 'Need help with the marital address?',
        message: 'Provide the location of the record if legally separated',
        note: ''
      },
      telephone: {
        title: 'Need help with the telephone number?',
        message: 'Provide the telephone number',
        note: ''
      },
      dateSeparated: {
        title: 'Estimate the date if unsure',
        message: 'If you are not sure of the exact date give us your best guess and check the "Estimated" checkbox.',
        note: ''
      },
      birthdate: {
        title: 'Estimate the date if unsure',
        message: 'If you are not sure of the exact date give us your best guess and check the "Estimated" checkbox.',
        note: ''
      },
      birthplace: {
        title: 'Need help with the birth place?',
        message: 'Provide the place of birth',
        note: ''
      },
      foreignBornDocument: {
        title: 'Find the documentation',
        message: 'The document type and number will be on the documentation.',
        note: ''
      },
      othernames: {
        title: 'Need help with other names used?',
        message: 'Such as maiden name, names by other marriages, civil marriages, legally recognized civil unions, or legally recognized domestic partnerships, nicknames, etc., and provide dates used for each name.',
        note: ''
      },
      separated: {
        title: 'Need help with separated?',
        message: 'Mark whether you are separated',
        note: ''
      },
      divorced: {
        title: 'Need help with this question?',
        message: 'Mark whether you are currently divorced',
        note: ''
      },
      email: {
        title: 'Need help with providing email?',
        message: 'Enter the email of the person',
        note: ''
      },
      hasCohabitant: {
        title: 'Need help with this question?',
        message: 'Do you presently reside with a person, other than a spouse or legally recognized civil union/domestic partner, with whom you share bonds of affection, obligation, or other commitment, as opposed to a person with whom you live for reasons of convenience?',
        note: ''
      },
      citizenship: {
        title: 'List all citizenships this person has',
        message: 'You can provide multiple citizenships in this question.',
        note: ''
      }
    }
  },
  cohabitant: {
    heading: {
      hasCohabitant: 'Do you presently reside with a person, other than a spouse or legally recognized civil union/domestic partner, with whom you share bonds of affection, obligation, or other commitment, as opposed to a person with whom you live for reasons of convenience?',
      name: 'Provide your cohabitant\'s full name',
      address: 'Provide location',
      birthdate: 'Provide your cohabitant\'s birthdate',
      telephone: 'Provide your cohabitant\'s telephone number',
      birthplace: 'Provide your cohabitant\'s the place of birth',
      foreignBornDocument: 'If the person is foreign born, provide one type of documentation that he or she possesses and the document number',
      ssn: 'Provide your cohabitant’s U.S. Social Security Number',
      othernames: 'Has your cohabitant used another name?',
      appendOthernames: 'Has your cohabitant used any other names?',
      citizenship: 'Provide your cohabitant\'s country(ies) of citizenship',
      cohabitationBegan: 'Provide date cohabitation residing with person began'
    },
    suggestion: {
      title: 'Looks like you\'ve entered this person before',
      paragraph: 'This name matches a spouse entered under the marital section.\n\nEnter only people who you presently reside with a person, other than a spouse or legally recognized civil union/domestic partner, with whom you share bonds of affection, obligation, or other commitment, as opposed to a person with whom you live for reasons of convenience (e.g. a roommate).',
      dismissLabel: 'This is not my spouse',
      label: 'Spouse match',
      useLabel: 'This is my spouse'
    },
    othernames: {
      heading: {
        name: 'Provide full name',
        maiden: 'Is this your cohabitant\'s maiden name?',
        used: 'Provide dates name was used'
      }
    },
    label: {
      divorced: 'Divorced/Dissolved',
      widowed: 'Widowed',
      annulled: 'Annulled',
      birthplace: 'Was this person born in the United States of America?'
    },
    collection: {
      description: 'Summary of cohabitants',
      appendTitle: 'Do you have an additional cohabitant to report?',
      appendLabel: 'Add another cohabitant',
      itemType: 'Cohabitant'
    },
    help: {
      birthdate: {
        title: 'Estimate the date if unsure',
        message: 'If you are not sure of the exact date give us your best guess and check the "Estimated" checkbox.',
        note: ''
      },
      birthplace: {
        title: 'Need help with the birth place?',
        message: 'Provide the place of birth',
        note: ''
      },
      recognized: {
        title: 'Need help with providing date your civil marriage, civil union, or domestic partnership was legally recognized?',
        message: 'Provide the date your civil marriage, civil union, or domestic partnership was legally recognized',
        note: ''
      },
      separated: {
        title: 'Need help with separated?',
        message: 'Mark whether you are separated',
        note: ''
      },
      divorced: {
        title: 'Need help with this question?',
        message: 'Mark whether you are currently divorced',
        note: ''
      },
      email: {
        title: 'Need help with providing email?',
        message: 'Enter the email of the person',
        note: ''
      },
      telephone: {
        title: 'Need help with providing a telephone number?',
        message: 'Enter the telephone number of the person',
        note: ''
      },
      address: {
        title: 'Need help with providing address?',
        message: 'Acronyms: APO - Army Post Office, FPO - Fleet Post Office, DPO - Diplomatic Post Office.',
        note: ''
      },
      dateDivorced: {
        title: 'Estimate the date if unsure',
        message: 'If you are not sure of the exact date give us your best guess and check the "Estimated" checkbox.',
        note: ''
      },
      foreignBornDocument: {
        title: 'Need help with selecting the appropriate documentation?',
        message: 'If the person is foreign born, provide one type of documentation that he or she possesses and the document number',
        note: ''
      },
      ssn: {
        title: 'Need help with social security number?',
        message: 'Provide the social security number of the person',
        note: ''
      },
      cohabitationBegan: {
        title: 'When did you start living with this person?',
        message: 'If you are not sure of the exact date give us your best guess and check the "Estimated" checkbox.',
        note: ''
      },
      hasCohabitant: {
        title: 'The reason you live with this person',
        message: 'If you live with your cohabitant for reasons of convenience (e.g. a roommate) your answer would be "No". If you share any type of bonds of affection, obligation, or other commitment your answer would be "Yes".',
        note: ''
      },
      citizenship: {
        title: 'List all citizenships this person has',
        message: 'You can provide multiple citizenships in this question.',
        note: ''
      }
    }
  },
  people: {
    label: {
      unit: 'People added'
    },
    summaryProgress: {
      title: 'People who know you well 7 year coverage',
      unit: 'Years covered'
    },
    para: {
      intro: '### Provide three people who know you well and who preferably live in the U.S.\n\nThey should be friends, peers, colleagues, college roommates, associates, etc., who are collectively aware of your activities outside of your workplace, school, or neighborhood, and whose combined association with you **covers at least the last seven (7) years.**\n\n **Do not list your spouse, former spouse (s), other relatives, or anyone listed elsewhere on this form.**'
    },
    person: {
      heading: {
        knownDates: 'Provide dates known',
        name: 'Provide this person\'s  full name',
        rank: 'Provide this person\'s  rank/title',
        relationship: 'Provide this person\'s  relationship to you',
        mobileTelephone: 'Provide mobile/cell phone number for this person',
        otherTelephone: 'Provide another phone number for this person',
        email: 'Provide e-mail address for this person',
        address: 'Provide home or work address for this person'
      },
      label: {
        address: 'This address is',
        or: 'or',
        emailNotApplicable: 'I don\'t know',
        rankNotApplicable: 'Not applicable',
        relationship: {
          title: 'Check all that apply.',
          neighbor: 'Neighbor',
          friend: 'Friend',
          workAssociate: 'Work Associate',
          schoolmate: 'Schoolmate',
          other: 'Other',
          explanation: 'Provide explanation'
        }
      },
      gap: {
        title: 'Coverage gap',
        para: 'There is a gap in your 7 year period. The entire 7 years should be covered with no gaps.',
        button: 'Add another person'
      },
      help: {
        knownDates: {
          title: 'Tell us the entire time you have known this person',
          message: 'If you are not sure of the exact dates give us your best guess and check the "Estimated" checkbox.',
          note: ''
        },
        rank: {
          title: 'Need help with the rank/title?',
          message: 'Provide the rank/title of the person who knows you well',
          note: ''
        },
        relationship: {
          title: 'Need help with the relationship?',
          message: 'Provide relationship to you for the person who knows you well',
          note: ''
        },
        mobileTelephone: {
          title: 'Need help with the mobile telephone?',
          message: 'Provide a mobile number for the person who knows you well',
          note: ''
        },
        otherTelephone: {
          title: 'Need help with the other telephone?',
          message: 'Provide another number for the person who knows you well',
          note: ''
        },
        email: {
          title: 'Need help with the email?',
          message: 'Provide the email for the person who knows you well',
          note: ''
        },
        address: {
          title: 'Acronyms:',
          message: 'APO - Army Post Office, FPO - Fleet Post Office, DPO - Diplomatic Post Office.',
          note: ''
        }
      },
      collection: {
        summary: {
          unknown: 'Provide the person\'s information below'
        },
        description: 'Summary of people who know you',
        appendLabel: 'Add another person',
        appendTitle: 'Do you have an additional person who knows you well to list?',
        itemType: 'Person'
      }
    }
  }
}
