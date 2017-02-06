const en = {
  app: {
    logout: 'Logout',
    skip: 'Skip to main content',
    banner: {
      title: 'An official website of the United States government',
      button: 'Here\'s how you know',
      witty: 'The .gov means it\'s official.',
      extension: 'Federal government websites always use a .gov or .mil domain. Before sharing sensitive information online, make sure you\'re on a .gov or .mil site by inspecting your browser\'s address (or "location") bar.',
      ssl: 'This site is also protected by an SSL (Secure Sockets Layer) certificate that\'s been signed by the U.S. government. The <strong>https://</strong> means all transmitted data is encrypted  — in other words, any information or browsing history that you provide is transmitted securely.'
    }
  },
  login: {
    title: 'Login',
    para: 'Enter your username and password, then click the "Submit" button to continue. If you do not remember your password click "Forgot Password". If you do not remember your username contact your sponsoring agency.',
    submit: 'Submit',
    twofactor: {
      title: 'Two-factor authentication',
      para: 'Two-factor authentication (also known as 2FA) is a method of confirming a user\'s claimed identity by utilizing a combination of two different components.'
    },
    placeholder: {
      username: 'Username',
      password: 'Password'
    },
    forgot: {
      title: 'Forgot password',
      text: 'Forgot password'
    }
  },
  twofactor: {
    verify: 'Verify',
    alt: 'Two factor authentication'
  },
  scorecard: {
    complete: 'Sections complete'
  },
  saved: {
    saved: 'Saved',
    now: 'now',
    second: 'second',
    seconds: 'seconds',
    minute: 'minute',
    minutes: 'minutes',
    hour: 'hour',
    hours: 'hours',
    day: 'day',
    days: 'days',
    ago: 'ago'
  },
  collection: {
    summary: 'Summary',
    remove: 'Remove'
  },
  comments: {
    add: 'Add comment',
    remove: 'Remove comment'
  },
  error: {
    name: {
      last: {
        required: '',
        length: 'The last name cannot exceed 100 characters',
        pattern: 'We only support letters, hyphens (-), periods (.), apostrophes (\'), and spaces'
      },
      first: {
        length: 'The first name cannot exceed 100 characters',
        pattern: 'We only support letters, hyphens (-), periods (.), apostrophes (\'), and spaces'
      },
      middle: {
        length: 'The middle name cannot exceed 100 characters',
        pattern: 'We only support letters, hyphens (-), periods (.), apostrophes (\'), and spaces'
      }
    },
    birthdate: {
      age: 'Applicants must be older than 16 and less than 130 years of age'
    },
    ssn: {
      first: {
        pattern: 'The first part of the social security number must be 3 digits between 0 and 9'
      },
      middle: {
        pattern: 'The middle part of the social security number must be 2 digits between 0 and 9'
      },
      last: {
        pattern: 'The last part of the social security number must be 4 digits between 0 and 9'
      },
      verifyFirst: {
        pattern: 'The first part of the social security number must be 3 digits between 0 and 9'
      },
      verifyMiddle: {
        pattern: 'The middle part of the social security number must be 2 digits between 0 and 9'
      },
      verifyLast: {
        pattern: 'The last part of the social security number must be 4 digits between 0 and 9'
      }
    },
    month: {
      length: 'The month must be between 1 (January) and 12 (December)'
    },
    day: {
      length: 'The day must be a valid day for the month'
    },
    year: {
      length: 'The year must be a valid year'
    },
    weight: {
      pounds: {
        length: 'We only accept a value between 10 and 999 pounds'
      }
    },
    height: {
      feet: {
        length: 'Feet must be between 1 and 9'
      },
      inches: {
        length: 'Inches must be between 0 and 11'
      }
    },
    zipcode: {
      pattern: 'The zipcode can be either the 5 or 9 digit variation'
    }
  },
  section: {
    back: 'Back',
    next: 'Next'
  },
  telephone: {
    domestic: {
      label: 'United States telephone number',
      extension: {
        label: 'Extension'
      }
    },
    international: {
      label: 'International telephone number',
      extension: {
        label: 'Extension'
      }
    },
    dsn: {
      label: 'DSN telephone number'
    },
    noNumber: {
      label: 'I don\'t know'
    },
    type: {
      domestic: 'United States number',
      dsn: 'DSN number',
      international: 'International number'
    },
    timeOfDay: {
      day: 'Day only',
      night: 'Night only'
    },
    numberType: {
      cell: 'Cell',
      home: 'Home',
      work: 'Work',
      other: 'Other'
    }
  },
  identification: {
    tour: {
      title: 'One piece at a time',
      para: 'Take a guided tour through the section',
      button: 'Take me one the tour!'
    },
    review: {
      title: 'Full section view',
      para: 'View all the sections associated with identification at once',
      button: 'Show me the full section'
    },
    destination: {
      review: 'Review Identification',
      family: 'Family & friends',
      othernames: 'Other names used',
      name: 'Full name',
      birthdate: 'Birth date',
      birthplace: 'Birth place',
      contacts: 'Contacts',
      ssn: 'Social security number',
      physical: 'Physical attributes',
      psychological: 'Psychological and emotional health'
    },
    name: {
      title: 'Your full name',
      last: {
        help: 'Your last name is required.  If you have only 1 name, enter it in the last name field'
      },
      first: {
        help: 'If your first name is an initial place the initial in this field.  If you do not have a first name leave this field empty.'
      },
      middle: {
        help: 'Enter all of your middle names here.  If your middle name is an initial place the initial in the field.  If you do not have a middle name leave this field empty.'
      },
      suffix: {
        help: 'If you are a Jr., Sr., etc. select your Suffix from the list provided.  If your suffix does not appear in this list, select Other and enter your suffix in the provided field'
      }
    },
    othernames: {
      title: 'Other names used',
      info: 'Provide your other names used and the period of time you used them (for example: your maiden name, name(s) by a former marriage, former name(s), alias(es), or nickname(s)).',
      branch: {
        help: 'Provide your other names used and the period of time you used them',
        question: 'Have you used any other names?'
      },
      collection: {
        summary: {
          title: 'Summary of other names used',
          name: 'Name',
          present: 'Now',
          nodates: 'No dates',
          unknown: 'Unknown'
        },
        append: 'Add another name'
      },
      heading: {
        name: 'Provide other name used',
        maiden: 'Maiden name',
        used: 'Dates used',
        reason: 'Reason for change'
      },
      label: {
        maiden: 'Was this your maiden name?',
        reason: 'Provide the reasons why the name changed'
      }
    },
    birthdate: {
      title: 'Date of birth',
      help: 'Provide your date of birth, or the closest possible estimate you can provide'
    },
    birthplace: {
      title: 'Place of birth',
      question: {
        label: 'Were you born in the United States of America?',
        yes: 'Yes',
        no: 'No'
      },
      branch: {
        help: 'Enter information regarding your place of birth'
      },
      help: {
        city: 'City where you were born',
        state: 'State where you were born',
        country: 'Country where you were born',
        county: 'County where you were born'
      },
      label: {
        state: 'State',
        city: 'City',
        county: 'County or providence',
        country: 'Country'
      },
      placeholder: {
        state: 'Please enter state within the United States',
        city: 'Please enter your city of birth',
        county: 'Please enter your county or province of birth',
        country: 'Please enter your country of birth'
      }
    },
    contacts: {
      title: 'Your contact information',
      collection: {
        summary: {
          title: 'Summary of e-mail addresses',
          email: 'E-mail',
          unknown: 'Unknown'
        },
        append: 'Add another e-mail'
      },
      heading: {
        email: 'Your e-mail addresses',
        comments: 'Add optional comments'
      },
      label: {
        email: 'Email address',
        comments: 'If you need to provide any additional comments about this information enter them below'
      },
      placeholder: {
        email: 'Enter an email address'
      }
    },
    ssn: {
      title: 'U.S. Social Security Number',
      help: 'If you have a Social Security number, please provide it here.  If you do not, please select Not Applicable',
      label: {
        notApplicable: 'Not applicable',
        last: '',
        middle: '',
        first: '',
        verify: 'Please verify your social security number'
      },
      placeholder: {
        last: '0000',
        middle: '00',
        first: '000'
      }
    },
    traits: {
      title: 'Physical attributes',
      heading: {
        hair: 'Hair color',
        eye: 'Eye color',
        height: 'Height',
        weight: 'Weight',
        sex: 'Sex',
        comments: 'Add your comment about sex'
      },
      help: {
        feet: 'Feet must be a number between 1 and 9',
        inches: 'Inches must be a number between 0 and 11',
        height: 'Height must be a number between 1 and 9',
        weight: 'Weight must be a number between 10 and 999',
        eye: 'Select an eye color',
        hair: 'Select the hair color that most closely represents your hair color',
        sex: 'This is the sex at time of birth. If additional information is appropriate please include these within the comments.'
      },
      label: {
        sex: 'Select your sex at the time of birth',
        feet: 'Feet',
        inches: 'Inches',
        pounds: 'Pounds',
        comments: 'Put your comment/explanation in the box below'
      },
      placeholder: {
        feet: '0',
        inches: '0',
        pounds: '0'
      },
      hair: {
        bald: 'Bald',
        black: 'Black',
        blonde: 'Blonde or strawberry',
        brown: 'Brown',
        gray: 'Gray or partially gray',
        red: 'Red or auburn',
        sandy: 'Sandy',
        white: 'White',
        blue: 'Blue',
        green: 'Green',
        orange: 'Orange',
        pink: 'Pink',
        purple: 'Purple',
        unknown: 'Unspecified or unknown'
      },
      eye: {
        black: 'Black',
        blue: 'Blue',
        brown: 'Brown',
        gray: 'Gray',
        green: 'Green',
        hazel: 'Hazel',
        maroon: 'Maroon',
        multi: 'Multicolored',
        pink: 'Pink',
        unknown: 'Unknown'
      },
      sex: {
        female: 'Female',
        male: 'Male'
      }
    }
  },
  financial: {
    tour: {
      title: 'One piece at a time',
      para: 'Take a guided tour through the section',
      button: 'Take me on the tour!'
    },
    review: {
      title: 'Full section view',
      para: 'View all the sections associated with identification at once',
      button: 'Show me the full section'
    },
    destination: {
      gambling: 'Gambling debts',
      bankruptcy: 'Bankruptcy',
      review: 'Review Financial record'
    },
    gambling: {
      title: 'Gambling debt',
      branch: {
        help: 'Select whether you have experienced any financial problems due to gambling',
        question: 'Have your ever experienced financial problems due to gambling?'
      },
      collection: {
        summary: {
          title: 'Summary of gambling debt',
          unknownlosses: 'Unknown losses',
          present: 'Now',
          nodates: 'No dates',
          debt: 'Debt'
        },
        append: 'Add another gambling debt'
      },
      heading: {
        details: 'Enter your gambling debt',
        dates: 'Provide the date range of your financial problems due to gambling',
        losses: 'Provide an estimate of the amount (in U.S. dollars) of gambling losses incurred',
        description: 'Provide a description of your financial problems due to gambling',
        actions: 'If you have taken any action(s) to rectify your financial problems due to gambling, provide a description of your actions. If you have not taken any action(s) provide an explanation.',
        comments: 'Add optional comment'
      },
      label: {
        dates: 'Dates of debt',
        losses: 'Losses',
        description: 'Description',
        actions: 'Action(s) taken or explanation',
        comments: 'Add optional comment'
      },
      help: {
        dates: 'Provide the date range of your financial problems due to gambling',
        losses: 'Enter estimate of the amount (in U.S. dollars) of gambling losses incurred',
        description: 'Enter description of your financial problems due to gambling',
        actions: 'Enter any action(s) taken to rectify your financial problems due to gambling, provide a description of your actions. If you have not taken any action(s) provide an explanation.',
        comments: 'If you need to provide any additional comments about this information enter them below'
      },
      placeholder: {
        losses: '1000'
      }
    },
    bankruptcy: {
      collection: {
        summary: {
          title: 'Summary of Bankruptcy',
          item: 'Bankruptcy',
          unknown: 'Unknown',
          chapter: 'Chapter'
        },
        append: 'Add bankruptcy'
      },
      heading: {
        petitionType: 'Petition Type',
        courtNumber: 'Provide the bankruptcy court docket/account number',
        dateFiled: 'Provide the date bankruptcy was filed',
        dateDischarged: 'Provide the date of bankruptcy discharge',
        totalAmount: 'Provide the total amount (in U.S. dollars) involved in the bankruptcy',
        nameDebt: 'Provide the name debt is recorded under',
        courtInvolved: 'Provide the name of the court involved',
        courtAddress: 'Provide the address of the court involved',
        comments: 'Add optional comments'
      },
      title: 'Bankruptcy',
      help: 'Note: If you need to provide any additional comments about this information, enter them below.',
      branch: {
        question: 'In the last seven (7) years have you filed a petition under any chapter of the bankruptcy code?'
      },
      petitionType: {
        help: 'Select the applicable bankruptcy petition type. If Chapter 13 is selected, you must provide additional information.'
      },
      dateDischarged: {
        help: 'Provide the date of bankruptcy discharge'
      },
      dateFiled: {
        help: 'Provide the date bankruptcy was filed'
      },
      courtNumber: {
        title: 'Court docket/account number',
        label: 'Number',
        placeholder: 'Court docket/account number',
        help: 'Provide the docket/account number'
      },
      totalAmount: {
        label: 'Amount',
        placeholder: 'Total amount',
        help: 'Provide the total amount (in U.S. dollars) involved in the bankruptcy'
      },
      courtInvolved: {
        label: 'Court name',
        help: 'Provide the name of the court involved',
        placeholder: 'Provide court involved'
      },
      trustee: {
        title: 'Provide the trustee',
        label: 'Trustee name',
        placeholder: 'Provide name of trustee',
        help: 'The trustee refers to the person who holds authority or a position of trust or responsibility appointed to the bankruptcy',
        address: {
          title: 'Provide the address of the trustee for this bankruptcy',
          label: 'Trustee address',
          help: 'The address of the trustee involved for this bankruptcy'
        }
      },
      comments: {
        label: 'Add comment'
      },
      courtAddress: {
        label: 'This address is',
        help: 'Enter the address of the court involved'
      }
    }
  },
  address: {
    options: {
      us: {
        label: 'In the United States'
      },
      apoFpo: {
        label: 'APO/FPO'
      },
      international: {
        label: 'International'
      }
    },
    us: {
      street: {
        label: 'Mailing address',
        placeholder: 'Enter mailing address'
      },
      city: {
        label: 'City',
        placeholder: 'Enter city'
      },
      state: {
        label: 'State',
        placeholder: 'Enter state'
      },
      zipcode: {
        label: 'Zipcode',
        placeholder: 'Enter zipcode'
      }
    },
    international: {
      street: {
        label: 'Mailing address',
        placeholder: 'Enter mailing address'
      },
      city: {
        label: 'City',
        placeholder: 'Enter city'
      },
      country: {
        label: 'Country',
        placeholder: 'Enter country'
      },
      zipcode: {
        label: 'Zipcode',
        placeholder: 'Enter zipcode'
      }
    },
    apoFpo: {
      select: {
        label: 'Select APO or FPO'
      },
      street: {
        label: 'Mailing address',
        placeholder: 'Enter mailing address'
      },
      city: {
        label: 'City',
        placeholder: 'Enter city'
      },
      state: {
        label: 'State',
        placeholder: 'Enter state'
      },
      zipcode: {
        label: 'Zipcode',
        placeholder: 'Enter zipcode'
      },
      apoFpo: {
        label: 'APO/FPO'
      },
      apoFpoType: {
        apo: {
          label: 'APO'
        },
        fpo: {
          label: 'FPO'
        },
        apoFpo: {
          label: 'APO/FPO',
          placeholder: 'Enter APO/FPO'
        }
      }
    }
  },
  history: {
    tour: {
      title: 'One piece at a time',
      para: 'Take a guided tour through the section',
      button: 'Take me one the tour!'
    },
    review: {
      title: 'Full section view',
      para: 'View all the sections associated with your history at once',
      button: 'Show me the full section'
    },
    destination: {
      review: 'Review your history',
      residence: 'Places you lived',
      employment: 'Employment history',
      education: 'Schools & diplomas',
      timeline: 'Timeline'
    },
    residence: {
      title: 'Places you have lived',
      info: 'List the places where your have lived beginning with your present residence and working back 10 years. Residences for the entire period must be accounted for without breaks.',
      summary: {
        title: 'Where you have lived',
        unit: 'Years covered'
      },
      collection: {
        summary: {
          title: 'Summary of places you have lived',
          item: 'Address',
          unknown: 'Unknown'
        },
        append: 'Save and add another address'
      },
      heading: {
        done: 'Done! Now let\'s add more',
        exiting: 'Before you leave this section',
        details: 'Enter your residence information',
        dates: 'Provide dates of residence',
        address: 'Provide the street address',
        comments: 'If you need to provide additional comments about this information enter them below',
        role: 'Is/was this residence',
        reference: 'Add a person that knows you'
      },
      para: {
        done: 'Use the button below to save your history entry and start another.',
        exiting: '**The full 10 year period of residence history is not covered.** Your SF86 cannot be submitted until all 10 years are covered with no gaps.<br><br>We will mark the gaps and highlight them for you when you come back.',
        details: 'Indicate the actual physical location of your residence, not a Post Office box or a permanent residence when you were not physically located there. If you split your time between one or more residences during a time period, you must list all residences. Do not list residences before your 18th birthday unless to provide a minimum of 2 years residence history.',
        reference: 'For any address in the last 3 years, provide a person who knew you at the address, and who preferably still lives in that area. Do not list people who knew you well for residences completely outside this 3-year period, and do not list your spouse, cohabitant or other relatives.'
      },
      label: {
        dates: 'You are not required to list temporary locations of less than 90 days that did not serve as your permanent or mailing address.',
        address: 'This address is',
        comments: 'Add optional comment',
        role: {
          owned: 'Owned by you',
          rented: 'Rented or leased by you',
          military: 'Military housing',
          other: 'Other',
          explanation: 'Please provide an explanation...'
        }
      },
      help: {
        dates: 'Provide the date range of your residence',
        address: 'The address of the residence during this time period',
        role: 'Provide your role at this residence as closely as possible',
        comments: 'If you need to provide any additional comments about this information enter them below'
      }
    },
    employment: {
      noDate: {
        label: 'NA'
      },
      summary: {
        title: 'Where you have worked',
        unit: 'Years'
      },
      collection: {
        append: 'Save and add another job',
        summary: {
          title: 'Summary of your work history',
          employer: 'Employer'
        }
      },
      activity: {
        title: 'Government employment',
        help: 'Select your employment activity',
        other: {
          label: 'Explanation for other',
          help: ''
        },
        type: {
          activeMilitary: 'Active military duty station',
          nationalGuard: 'National Guard/Reserve',
          usphs: 'USPHS Commisioned Corps',
          otherFederal: 'Other federal employment',
          stateGovernment: 'State Government',
          federalContractor: 'Federal contractor',
          nonGovernment: 'Non-government employment',
          selfEmployment: 'Self-employment',
          unemployment: 'Unemployment',
          other: 'Other'
        }
      },
      datesEmployed: {
        help: 'Select the dates you were employed'
      },
      address: {
        label: 'This address is',
        help: 'Provide the address'
      },
      status: {
        help: 'Select the employment status',
        fullTime: 'Full-time',
        partTime: 'Part-time'
      },
      telephone: {
        label: '',
        help: 'Provide the telephone number'
      },
      title: {
        label: 'Title',
        help: 'Provide the name of your position title'
      },
      employer: {
        label: 'Employer name',
        help: 'Provide the name of your employer'
      },
      physicalAddress: {
        help: 'Is/was your physical work address different than your employer\'s address?',
        address: {
          label: 'This address is'
        },
        heading: {
          telephone: 'Provide telephone number',
          address: 'Provide the address of physical location'
        }
      },
      additionalActivity: {
        help: 'Do you have any additional periods of activity to add?',
        label: 'Do you have any additional periods of activity to add?',
        collection: {
          append: 'Add additional periods'
        },
        heading: {
          position: 'Provide position title',
          supervisor: 'Provide supervisor',
          datesEmployed: 'Provide dates of employment'
        },
        position: {
          label: 'Position',
          help: 'Provide the position title'
        },
        supervisor: {
          label: 'Supervisor',
          help: 'Provide the supervisor name'
        },
        datesEmployed: {
          help: 'Provide dates of employment'
        }
      },
      supervisor: {
        name: {
          label: 'Supervisor name',
          help: 'Provide the name of this supervisor'
        },
        title: {
          label: 'Supervisor position title',
          help: 'Provide the position title of this supervisor'
        },
        email: {
          label: 'Supervisor email',
          help: 'Provide the email of this supervisor'
        },
        address: {
          label: 'This address is',
          help: 'Provide the address of this supervisors work location'
        },
        telephone: {
          help: 'Provide the telephone number for this supervisor'
        },
        heading: {
          name: 'Provide the name of your supervisor',
          title: 'Provide the position title of your supervisor',
          email: 'Provide the email address of your supervisor',
          address: 'Provide the physical work location of your supervisor',
          telephone: 'Provide the telephone number for this supervisor'
        }
      },
      heading: {
        done: 'Done! Now let\'s add more',
        exiting: 'Before you leave this section',
        activity: 'Select your employment activity',
        employment: 'List where you have worked',
        datesEmployed: 'Provide dates of employment',
        employer: 'Provide the name of your employer',
        title: 'Provide the most recent position title',
        reference: 'Provide a reference',
        status: 'Select the employment status for this position',
        address: 'Provide the address of employer',
        supervisor: 'Your Supervisor',
        telephone: 'Provide your employment telephone number',
        physicalAddress: 'Is/was your physical work address different than your employer\'s address?',
        additionalActivity: 'Additional periods of activity with this employer'
      },
      para: {
        done: 'Use the button below to save your history entry and start another.',
        exiting: '**The full 10 year period of employment history is not covered.** Your SF86 cannot be submitted until all 10 years are covered with no gaps.<br><br>We will mark the gaps and highlight them for you when you come back.',
        employment: 'List all of your employment activities, including unemployment and self-employment, beginning with the present and working back 10 years. The entire period must be accounted for without breaks. If the employment activity was military duty, list separate employment activity periods to show each change of military duty station. \n\nDo not list employment before your 18th birthday unless to provide a minimum of 2 years employment history.',
        additionalActivity: 'List all of your employment activities, including unemployment and self-employment, beginning with the present and working back 10 years. The entire period must be accounted for without breaks. If the employment activity was military duty, list separate employment activity periods to show each change of military duty station.\n\nDo not list employment before your 18th birthday unless to provide a minimum of 2 years employment history.'

      }
    }
  },
  foreign: {
    tour: {
      title: 'One piece at a time',
      para: 'Take a guided tour through the section',
      button: 'Take me one the tour!'
    },
    review: {
      title: 'Full section view',
      para: 'View all the sections associated with foreign activities at once',
      button: 'Show me the full section'
    },
    destination: {
      review: 'Review Foreign Actitivies',
      history: 'Your History',
      tbd: 'TBD',
      contacts: 'Foreign Contacts',
      passport: 'U.S. passport information',
      activities: 'Foreign activities',
      business: 'Foreign business, professional activities, and government contacts',
      travel: 'Foreign countries you have visited'
    },
    passport: {
      title: 'U.S. passport information',
      info: {
        text: 'Provide the following information for the most recent U.S. passport you currently possess.',
        link: 'U.S. State Department passport help'
      },
      question: {
        title: 'Do you possess a U.S. passport (current or expired)?',
        yes: 'Yes',
        no: 'No'
      },
      label: {
        number: 'Passport number',
        book: 'Passport',
        card: 'Passport card'
      },
      placeholder: {
        number: 'A########'
      },
      number: 'Provide your U.S. passport number',
      card: 'Passport card',
      issued: 'Provide the issue date of the passport',
      expiration: 'Provide the expiration date of the passport',
      comment: {
        title: 'Add optional comment',
        label: 'If you need to provide any additional comments about this information enter them below'
      },
      help: {
        number: 'Enter your passport number. If you possess a card, check the Passport card option',
        issued: 'Enter the date your passport was issued',
        expiration: 'Enter the date your passport expired'
      },
      branch: {
        help: 'Select whether you possess a U.S. passport'
      }
    }
  },
  alias: {
    maiden: {
      help: 'Provide if this is your maiden name'
    },
    reason: {
      help: 'Provide the explanation for why you use an alias.  For example, privacy in business dealings, a pen name, etc...'
    },
    used: {
      help: 'Provide dates this name was used'
    }
  },
  reference: {
    heading: {
      name: 'Provide the full name',
      contact: 'Provide date of last contact',
      relationship: 'Relationship',
      phone: 'Phone numbers',
      email: 'Email address',
      correspondence: 'Their contact information',
      address: 'Street address'
    },
    para: {
      correspondence: 'Provide the following contact information for this person.',
      address: 'Provide street address for this person (including apartment number).'
    },
    label: {
      relationship: {
        title: 'Provide your relationship to this person (check all that apply):',
        neighbor: 'Neighbor',
        friend: 'Friend',
        landlord: 'Landlord',
        business: 'Business associate',
        other: 'Other',
        explanation: 'Please provide an explanation...',
        comments: 'Add a comment to this question'
      },
      email: 'Provide e-mail address for this person',
      address: 'The address of your contact during this time period'
    },
    help: {
      contact: 'Please provide the date of last contact with this person',
      relationship: 'Please define your relationship with the person during this period',
      email: 'A current e-mail address to contact this character reference',
      phone: 'One or more telephone numbers to contact this character reference',
      address: 'The current address of the character reference'
    }
  }
}

export default en
