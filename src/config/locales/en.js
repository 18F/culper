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
    remove: 'Remove',
    close: 'Close'
  },
  comments: {
    add: 'Add a comment',
    addpaired: 'Add a comment to this question',
    remove: 'Remove comment'
  },
  help: {
    close: 'Close info block'
  },
  error: {
    name: {
      last: {
        required: {
          title: 'The last name is required',
          message: '',
          note: ''
        },
        length: {
          title: 'The last name does not meet length requirements',
          message: 'The last name cannot exceed 100 characters or 1 character if it is an initial',
          note: ''
        },
        pattern: {
          title: 'The last name has unsupported characters',
          message: 'We only support letters, hyphens (-), periods (.), apostrophes (\'), and spaces',
          note: ''
        }
      },
      first: {
        length: {
          title: 'The first name does not meet the length requirements',
          message: 'The first name cannot exceed 100 characters or 1 character if it is an initial',
          note: ''
        },
        pattern: {
          title: 'The first name has unsupported characters',
          message: 'We only support letters, hyphens (-), periods (.), apostrophes (\'), and spaces',
          note: ''
        }
      },
      middle: {
        length: {
          title: 'The middle name does not meet the length requirements',
          message: 'The middle name cannot exceed 100 characters or 1 character if it is an initial',
          note: ''
        },
        pattern: {
          title: 'The middle name has unsupported characters',
          message: 'We only support letters, hyphens (-), periods (.), apostrophes (\'), and spaces',
          note: ''
        }
      }
    },
    birthdate: {
      age: {
        title: 'The applicant age is not approved',
        message: 'Applicants must be older than 16 and less than 130 years of age',
        note: ''
      }
    },
    ssn: {
      first: {
        pattern: {
          title: 'This field must have 3 digits',
          message: 'The first part of the social security number must be 3 digits between 0 and 9',
          note: ''
        }
      },
      middle: {
        pattern: {
          title: 'This field must have 2 digits',
          message: 'The middle part of the social security number must be 2 digits between 0 and 9',
          note: ''
        }
      },
      last: {
        pattern: {
          title: 'This field must have 4 digits',
          message: 'The last part of the social security number must be 4 digits between 0 and 9',
          note: ''
        }
      },
      verifyFirst: {
        pattern: {
          title: 'This field must have 3 digits',
          message: 'The first part of the social security number must be 3 digits between 0 and 9',
          note: ''
        }
      },
      verifyMiddle: {
        pattern: {
          title: 'This field must have 2 digits',
          message: 'The middle part of the social security number must be 2 digits between 0 and 9',
          note: ''
        }
      },
      verifyLast: {
        pattern: {
          title: 'This field must have 4 digits',
          message: 'The last part of the social security number must be 4 digits between 0 and 9',
          note: ''
        }
      }
    },
    month: {
      max: {
        title: 'Month is not recognized',
        message: 'The month must be between 1 (January) and 12 (December)',
        note: ''
      }
    },
    day: {
      length: {
        title: 'Day falls outside of allowable range',
        message: 'The day must be a valid day for the month',
        note: ''
      },
      max: {
        title: '',
        message: 'Cannot exceed the number of days within the month',
        note: ''
      }
    },
    year: {
      max: {
        title: 'The year must be four digits',
        message: 'The year must be a valid year',
        note: ''
      }
    },
    weight: {
      pounds: {
        min: {
          title: 'Weight below accepted limits',
          message: 'We only accept a value between 10 and 999 pounds',
          note: ''
        },
        max: {
          title: 'Weight exceeds accepted limits',
          message: 'We only accept a value between 10 and 999 pounds',
          note: ''
        }
      }
    },
    height: {
      feet: {
        min: {
          title: 'Feet is under the accepted limits',
          message: 'Feet must be between 1 and 9',
          note: ''
        },
        max: {
          title: 'Feet is above the accepted limits',
          message: 'Feet must be between 1 and 9',
          note: ''
        }
      },
      inches: {
        min: {
          title: 'Inches is below the accepted limits',
          message: 'Inches must be between 0 and 11',
          note: ''
        },
        max: {
          title: 'Inches is above the accepted limits',
          message: 'Inches must be between 0 and 11',
          note: ''
        }
      }
    },
    city: {
      length: {
        title: 'City name length',
        message: 'City name must be between 2 and 100 characters',
        note: ''
      }
    },
    state: {
      notfound: {
        title: 'State option not supported',
        message: 'The state name must be one of the available options',
        note: ''
      }
    },
    county: {
      length: {
        title: 'County length',
        message: 'County name must be between 2 and 100 characters',
        note: ''
      }
    },
    zipcode: {
      pattern: {
        title: 'Zipcode not in accepted format',
        message: 'The zipcode can be either the 5 or 9 digit variation',
        note: ''
      }
    },
    country: {
      notfound: {
        title: 'Country option not supported',
        message: 'The country name must be one of the available options',
        note: ''
      }
    },
    passport: {
      number: {
        pattern: {
          title: 'Passport number not in acceptable format',
          message: 'For passport books the number will start with a letter and then 6 to 9 digits.<br>For passport cards the number begins with a "C" and followed by 8 digits.',
          note: ''
        }
      }
    },
    Losses: {
      min: {
        title: 'Losses below accepted limits',
        message: 'Reported losses must have a value',
        note: ''
      }
    },
    daterange: {
      order: {
        title: 'Date range order',
        message: 'The **from** date must precede the **to** date',
        note: ''
      }
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
      title: 'Provide your full name',
      last: {
        help: {
          title: 'Need help with the last name?',
          message: 'Your last name is required.  If you have only 1 name, enter it in the last name field',
          note: ''
        }
      },
      first: {
        help: {
          title: 'Need help with the first name?',
          message: 'If your first name is an initial place the initial in this field.  If you do not have a first name leave this field empty.',
          note: ''
        }
      },
      middle: {
        help: {
          title: 'Need help with the middle name?',
          message: 'Enter all of your middle names here.  If your middle name is an initial place the initial in the field.  If you do not have a middle name leave this field empty.',
          note: ''
        }
      },
      suffix: {
        help: {
          title: 'Need help with the suffix?',
          message: 'If you are a Jr., Sr., etc. select your Suffix from the list provided.  If your suffix does not appear in this list, select Other and enter your suffix in the provided field',
          note: ''
        }
      }
    },
    othernames: {
      title: 'Provide your other names used and the period of time you used them',
      info: 'For example: your maiden name, name(s) by a former marriage, former name(s), alias(es), or nickname(s).',
      branch: {
        help: {
          title: 'Need information on other names?',
          message: 'Provide your other names used and the period of time you used them',
          note: ''
        },
        question: 'Have you used any other names?'
      },
      collection: {
        summary: {
          title: 'Summary of other names used',
          name: 'Name',
          present: 'Now',
          nodates: 'No dates',
          unknown: 'Click to provide details'
        },
        append: 'Add another name'
      },
      heading: {
        name: 'Provide other name used',
        maiden: 'Was this your maiden name?',
        used: 'Dates used',
        reason: 'Provide the reasons why the name was changed'
      },
      label: {
        maiden: 'Was this your maiden name?',
        reason: 'Provide the reasons why the name changed'
      }
    },
    birthdate: {
      title: 'Provide your date of birth',
      help: {
        title: 'Need help with the birthdate?',
        message: 'Provide your date of birth, or the closest possible estimate you can provide',
        note: ''
      }
    },
    birthplace: {
      title: 'Provide your place of birth',
      question: {
        label: 'Were you born in the United States of America?',
        yes: 'Yes',
        no: 'No'
      },
      branch: {
        help: {
          title: 'Need help with your place of birth?',
          message: 'Enter information regarding your place of birth',
          note: ''
        }
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
      title: 'Provide your contact information',
      help: {
        email: {
          title: 'Need help with an email address?',
          message: 'Enter your email address',
          note: ''
        },
        phoneNumber: {
          title: 'Need help with a phone number?',
          message: 'Enter your phone number',
          note: ''
        }
      },
      collection: {
        summary: {
          title: 'Summary of e-mail addresses',
          email: 'E-mail',
          unknown: 'Click to provide details',
          phoneNumber: 'Phone number'
        },
        phoneNumbers: {
          summary: {
            title: 'Summary of phone numbers'
          },
          append: 'Add another phone number'
        },
        append: 'Add another e-mail'
      },
      heading: {
        email: 'Your e-mail addresses',
        phoneNumber: 'Your phone numbers',
        comments: 'Add optional comments'
      },
      para: {
        email: 'Email addresses may be used as contact method, and identify subject in records.',
        phoneNumber: 'Provide at least two phone numbers (one is required). Additional numbers provided may assist in the completion of your background investigation.'
      },
      label: {
        email: 'Email address',
        comments: 'If you need to provide any additional comments about this information enter them below',
        phoneNumber: 'Phone number'
      },
      placeholder: {
        email: 'Enter an email address',
        phoneNumber: 'Enter a phone number'
      }
    },
    ssn: {
      title: 'Provide your U.S. Social Security Number',
      help: {
        title: 'Need help with your U.S. Social Security Number?',
        message: 'If you have a Social Security number, please provide it here.  If you do not, please select Not Applicable',
        note: ''
      },
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
      title: 'Provide your physical attributes',
      heading: {
        hair: 'Hair color',
        eye: 'Eye color',
        height: 'Height',
        weight: 'Weight',
        sex: 'Select your sex at the time of birth',
        comments: 'Add your comment about sex'
      },
      help: {
        feet: {
          title: 'Need help with your height?',
          message: 'Feet must be a number between 1 and 9',
          note: ''
        },
        inches: {
          title: 'Need help with your height?',
          message: 'Inches must be a number between 0 and 11',
          note: ''
        },
        height: {
          title: 'Need help with your height?',
          message: 'Height must be a number between 1 and 9',
          note: ''
        },
        weight: {
          title: 'Need help with your weight?',
          message: 'Weight must be a number between 10 and 999',
          note: ''
        },
        eye: {
          title: 'Need help with your eye color?',
          message: 'Select an eye color',
          note: ''
        },
        hair: {
          title: 'Need help with your hair color?',
          message: 'Select the hair color that most closely represents your hair color',
          note: ''
        },
        sex: {
          title: 'Need help with you sex?',
          message: 'This is the sex at time of birth. If additional information is appropriate please include these within the comments.',
          note: ''
        }
      },
      label: {
        sex: 'Select your sex at the time of birth',
        feet: 'Feet',
        inches: 'Inches',
        pounds: 'Pounds',
        comments: 'Add a comment about sex'
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
      title: 'Have your ever experienced financial problems due to gambling?',
      branch: {
        help: {
          title: 'Need more information on gambling?',
          message: 'Select whether you have experienced any financial problems due to gambling',
          note: ''
        }
      },
      collection: {
        summary: {
          title: 'Summary of gambling debt',
          unknownlosses: 'Click to provide details',
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
        dates: {
          title: 'Need help with the dates?',
          message: 'Provide the date range of your financial problems due to gambling',
          note: ''
        },
        losses: {
          title: 'Need help gambling losses?',
          message: 'Enter estimate of the amount (in U.S. dollars) of gambling losses incurred',
          note: ''
        },
        description: {
          title: 'Need help with the description?',
          message: 'Enter description of your financial problems due to gambling',
          note: ''
        },
        actions: {
          title: 'Need help with the actions taken?',
          message: 'Enter any action(s) taken to rectify your financial problems due to gambling, provide a description of your actions. If you have not taken any action(s) provide an explanation.',
          note: ''
        },
        comments: {
          title: 'Need help providing additional information?',
          message: 'If you need to provide any additional comments about this information enter them below',
          note: ''
        }
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
          unknown: 'Click to provide details',
          nodates: 'No date',
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
      title: 'In the last seven (7) years have you filed a petition under any chapter of the bankruptcy code?',
      help: {
        title: 'Need help with bankruptcy?',
        message: 'Note: If you need to provide any additional comments about this information, enter them below.',
        note: ''
      },
      petitionType: {
        help: {
          title: 'Need help with the applicable bankruptcy petition type?',
          message: 'Select the applicable bankruptcy petition type. If Chapter 13 is selected, you must provide additional information.',
          note: ''
        }
      },
      dateDischarged: {
        help: {
          title: 'Need help with the date of bankruptcy discharge?',
          message: 'Provide the date of bankruptcy discharge',
          note: ''
        }
      },
      dateFiled: {
        help: {
          title: 'Need help with the date the bankruptcy was filed?',
          message: 'Provide the date bankruptcy was filed',
          note: ''
        }
      },
      courtNumber: {
        title: 'Court docket/account number',
        label: 'Number',
        placeholder: 'Court docket/account number',
        help: {
          title: 'Need help with the docker or account number?',
          message: 'Provide the docket/account number',
          note: ''
        }
      },
      totalAmount: {
        label: 'Amount',
        placeholder: 'Total amount',
        help: {
          title: 'Need help with the total amount?',
          message: 'Provide the total amount (in U.S. dollars) involved in the bankruptcy',
          note: ''
        },
        estimated: 'Estimated'
      },
      courtInvolved: {
        label: 'Court name',
        help: {
          title: 'Need help with the court name?',
          message: 'Provide the name of the court involved',
          note: ''
        },
        placeholder: 'Provide court involved'
      },
      trustee: {
        title: 'Provide the trustee',
        label: 'Trustee name',
        placeholder: 'Provide name of trustee',
        help: {
          title: 'Need help with the trustee name?',
          message: 'The trustee refers to the person who holds authority or a position of trust or responsibility appointed to the bankruptcy',
          note: ''
        },
        address: {
          title: 'Provide the address of the trustee for this bankruptcy',
          label: 'Trustee address',
          help: {
            title: 'Need help with the trustee address?',
            message: 'The address of the trustee involved for this bankruptcy',
            note: ''
          }
        }
      },
      comments: {
        label: 'Add comment'
      },
      courtAddress: {
        label: 'This address is',
        help: {
          title: 'Need help with the address of the court involved?',
          message: 'Enter the address of the court involved',
          note: ''
        }
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
    timeline: {
      title: 'Let\'s cover your last 10 years',
      para1: 'List the places where you have lived and worked beginning with your present residence or employer and working back 10 years. **Residences and employers for the entire period must be accounted for without breaks.**',
      para2: 'You will also list any school attended in the last 10 years and all diplomas & degrees earned at any point in your life.',
      start: {
        residence: {
          title: 'Start with your present residence',
          button: 'Add residence'
        },
        employment: {
          title: 'Start with your present employer',
          button: 'Add employer'
        }
      }
    },
    review: {
      title: 'Full section view',
      para: 'View all the sections associated with your history at once',
      button: 'Show me the full section'
    },
    destination: {
      review: 'Review your history',
      timeline: 'Timeline',
      residence: 'Places you lived',
      employment: 'Employment history',
      education: 'Schools & diplomas',
      federal: 'Former federal service'
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
          unknown: 'Unknown',
          incomplete: 'This residence\'s information is complete'
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
        dates: {
          title: 'Need help with the date range?',
          message: 'Provide the date range of your residence',
          note: ''
        },
        address: {
          title: 'Need help with the address?',
          message: 'The address of the residence during this time period',
          note: ''
        },
        role: {
          title: 'Need help with the role?',
          message: 'Provide your role at this residence as closely as possible',
          note: ''
        },
        comments: {
          title: 'Need help providing additional information?',
          message: 'If you need to provide any additional comments about this information enter them below',
          note: ''
        }
      }
    },

    employment: {
      summary: {
        title: 'Where you have worked',
        unit: 'Years covered'
      },
      heading: {
        employment: 'List where you have worked',
        exiting: 'Before you leave this section'
      },
      para: {
        exiting: '**The full 10 year period of employment history is not covered.** Your SF86 cannot be submitted until all 10 years are covered with no gaps.<br><br>We will mark the gaps and highlight them for you when you come back.',
        employment: 'List all of your employment activities, including unemployment and self-employment, beginning with the present and working back 10 years. The entire period must be accounted for without breaks. If the employment activity was military duty, list separate employment activity periods to show each change of military duty station.',
        employment2: 'Do not list employment before your 18th birthday unless to provide a minimum of 2 years employment history.'
      },

      default: {
        noDate: {
          label: 'NA'
        },
        collection: {
          append: 'Save and add another job',
          summary: {
            title: 'Summary of your work history',
            employer: 'Employer',
            incomplete: 'This employer\'s information is complete'
          }
        },
        activity: {
          title: 'Government employment',
          help: {
            title: 'Need help with your employment activity?',
            message: 'Select your employment activity',
            note: ''
          },
          other: {
            label: 'Explanation for other',
            help: {
              title: '',
              message: '',
              note: ''
            }
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
        left: {
          title: 'Provide the reason for leaving the employment activity',
          para: 'For this employment have any of the following happened to you in the last seven (7) years?',
          comments: 'Provide any additional comments for why you left this employment activity',
          help: {
            title: '',
            message: '',
            note: ''
          },
          fired: {
            option: 'Fired',
            text: 'Provide the reason for being fired',
            date: 'Provide the date you were fired'
          },
          quit: {
            option: 'Quit',
            text: 'Provide the reason for quitting',
            date: 'Provide the date you quit after being told you would be fired'
          },
          charges: {
            option: 'Charges',
            text: 'Provide the charges or allegations of misconduct',
            date: 'Provide the date you left following the charges or allegations of misconduct'
          },
          performance: {
            option: 'Unsatisfactory performance',
            text: 'Provide the reason(s) for unsatisfactory performance',
            date: 'Provide the date you left by mutual agreement following a notice of unsatisfactory performance'
          },
          other: {
            option: 'Other',
            text: 'Do you have another reason for leaving to report for this employment?',
            date: 'Provide the date you left'
          }
        },
        datesEmployed: {
          help: {
            title: 'Need help with the dates you were employed?',
            message: 'Select the dates you were employed',
            note: ''
          }
        },
        address: {
          label: 'This address is',
          help: {
            title: 'Need help with the address?',
            message: 'Provide the address',
            note: ''
          }
        },
        status: {
          help: {
            title: 'Need help with the employment status?',
            message: 'Select the employment status',
            note: ''
          },
          fullTime: 'Full-time',
          partTime: 'Part-time'
        },
        telephone: {
          label: '',
          help: {
            title: 'Need help with the telephone number?',
            message: 'Provide the telephone number',
            note: ''
          }
        },
        title: {
          label: 'Title',
          help: {
            title: 'Need help with the position title?',
            message: 'Provide the name of your position title',
            note: ''
          }
        },
        employer: {
          label: 'Employer name',
          help: {
            title: 'Need help with the employer name?',
            message: 'Provide the name of your employer',
            note: ''
          }
        },
        physicalAddress: {
          help: {
            title: 'Need help with the physical addresss?',
            message: 'Is/was your physical work address different than your employer\'s address?',
            note: ''
          },
          address: {
            label: 'This address is'
          },
          heading: {
            telephone: 'Provide telephone number',
            address: 'Provide the address of physical location'
          }
        },
        additionalActivity: {
          help: {
            title: 'Need help with any additional periods of activity?',
            message: 'Do you have any additional periods of activity to add?',
            note: ''
          },
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
            help: {
              title: 'Need help with the position title?',
              message: 'Provide the position title',
              note: ''
            }
          },
          supervisor: {
            label: 'Supervisor',
            help: {
              title: 'Need help with the supervisor?',
              message: 'Provide the supervisor name',
              note: ''
            }
          },
          datesEmployed: {
            help: {
              title: 'Need help with the dates of employment?',
              message: 'Provide dates of employment',
              note: ''
            }
          }
        },
        supervisor: {
          name: {
            label: 'Supervisor name',
            help: {
              title: 'Need help with the supervisor name?',
              message: 'Provide the name of this supervisor',
              note: ''
            }
          },
          title: {
            label: 'Supervisor position title',
            help: {
              title: 'Need help with the position title?',
              message: 'Provide the position title of this supervisor',
              note: ''
            }
          },
          email: {
            label: 'Supervisor email',
            help: {
              title: 'Need help with the email?',
              message: 'Provide the email of this supervisor',
              note: ''
            }
          },
          address: {
            label: 'This address is',
            help: {
              title: 'Need help with the address?',
              message: 'Provide the address of this supervisors work location',
              note: ''
            }
          },
          telephone: {
            help: {
              title: 'Need help with the telephone number?',
              message: 'Provide the telephone number for this supervisor',
              note: ''
            }
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
          employment: 'List where you have worked',
          done: 'Done! Now let\'s add more',
          exiting: 'Before you leave this section',
          activity: 'Select your employment activity',
          datesEmployed: 'Provide dates of employment',
          employer: 'Provide the name of your employer',
          title: 'Provide the most recent position title',
          reference: 'Provide a reference',
          status: 'Select the employment status for this position',
          address: 'Provide the address of employment',
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
      },

      activemilitary: {
        heading: {
          title: 'Provide your most recent rank/position title',
          status: 'Select the employment status for this position',
          address: 'Provide address of duty station',
          telephone: 'Provide your employment telephone number',
          supervisor: 'Your Supervisor',
          reference: 'Provide a reference',
          physicalAddress: 'Is/was your physical work address different than your employer\'s address?',
          additionalActivity: 'Additional periods of activity with this employer'
        },
        title: {
          label: 'Title',
          help: {
            title: 'Need help with the position title?',
            message: 'Provide the name of your position title',
            note: ''
          }
        },
        status: {
          help: {
            title: 'Need help with the employment status?',
            message: 'Select the employment status',
            note: ''
          }
        },
        address: {
          label: 'This address is',
          help: {
            title: 'Need help with the address?',
            message: 'Provide the address',
            note: ''
          }
        },
        telephone: {
          label: '',
          help: {
            title: 'Need help with the telephone number?',
            message: 'Provide the telephone number',
            note: ''
          }
        },
        supervisor: {
          name: {
            label: 'Supervisor name',
            help: {
              title: 'Need help with the supervisor name?',
              message: 'Provide the name of this supervisor',
              note: ''
            }
          },
          title: {
            label: 'Supervisor position title',
            help: {
              title: 'Need help with the position title?',
              message: 'Provide the position title of this supervisor',
              note: ''
            }
          },
          email: {
            label: 'Supervisor email',
            help: {
              title: 'Need help with the email address?',
              message: 'Provide the email of this supervisor',
              note: ''
            }
          },
          address: {
            label: 'This address is',
            help: {
              title: 'Need help with the address?',
              message: 'Provide the address of this supervisors work location',
              note: ''
            }
          },
          telephone: {
            help: {
              title: 'Need help with the telephone number?',
              message: 'Provide the telephone number for this supervisor',
              note: ''
            }
          },
          heading: {
            name: 'Provide the name of your supervisor',
            title: 'Provide the position title of your supervisor',
            email: 'Provide the email address of your supervisor',
            address: 'Provide the physical work location of your supervisor',
            telephone: 'Provide the telephone number for this supervisor'
          }
        },
        additionalActivity: {
          help: {
            title: 'Need help with additional periods of activity?',
            message: 'Do you have any additional periods of activity to add?',
            note: ''
          },
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
            help: {
              title: 'Need help with the position title?',
              message: 'Provide the position title',
              note: ''
            }
          },
          supervisor: {
            label: 'Supervisor',
            help: {
              title: 'Need help with the name?',
              message: 'Provide the supervisor name',
              note: ''
            }
          },
          datesEmployed: {
            help: {
              title: 'Need help with the dates of employment?',
              message: 'Provide dates of employment',
              note: ''
            }
          }
        },
        para: {
          additionalActivity: 'List all of your employment activities, including unemployment and self-employment, beginning with the present and working back 10 years. The entire period must be accounted for without breaks. If the employment activity was military duty, list separate employment activity periods to show each change of military duty station.\n\nDo not list employment before your 18th birthday unless to provide a minimum of 2 years employment history.'
        }
      },

      nationalguard: {
        heading: {
          title: 'Provide your most recent rank/position title',
          status: 'Select the employment status for this position',
          address: 'Provide address of duty station',
          telephone: 'Provide your employment telephone number',
          supervisor: 'Your Supervisor',
          reference: 'Provide a reference',
          physicalAddress: 'Is/was your physical work address different than your employer\'s address?',
          additionalActivity: 'Additional periods of activity with this employer'
        },
        title: {
          label: 'Title',
          help: {
            title: 'Need help with the rank/position title?',
            message: 'Provide your most recent rank/position title',
            note: ''
          }
        },
        status: {
          help: {
            title: 'Need help with the employment status?',
            message: 'Select the employment status',
            note: ''
          }
        },
        address: {
          label: 'This address is',
          help: {
            title: 'Need help with the address?',
            message: 'Provide the address',
            note: ''
          }
        },
        telephone: {
          label: '',
          help: {
            title: 'Need help with the phone number?',
            message: 'Provide the telephone number',
            note: ''
          }
        },
        supervisor: {
          name: {
            label: 'Supervisor name',
            help: {
              title: 'Need help with the supervisor name?',
              message: 'Provide the name of this supervisor',
              note: ''
            }
          },
          title: {
            label: 'Supervisor position title',
            help: {
              title: 'Need help with the position title?',
              message: 'Provide the position title of this supervisor',
              note: ''
            }
          },
          email: {
            label: 'Supervisor email',
            help: {
              title: 'Need help with the email address?',
              message: 'Provide the email of this supervisor',
              note: ''
            }
          },
          address: {
            label: 'This address is',
            help: {
              title: 'Need help with the address?',
              message: 'Provide the address of this supervisors work location',
              note: ''
            }
          },
          telephone: {
            help: {
              title: 'Need help with the telephone number?',
              message: 'Provide the telephone number for this supervisor',
              note: ''
            }
          },
          heading: {
            name: 'Provide the name of your supervisor',
            title: 'Provide the position title of your supervisor',
            email: 'Provide the email address of your supervisor',
            address: 'Provide the physical work location of your supervisor',
            telephone: 'Provide the telephone number for this supervisor'
          }
        },
        additionalActivity: {
          help: {
            title: 'Need help with additional periods of activity?',
            message: 'Do you have any additional periods of activity to add?',
            note: ''
          },
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
            help: {
              title: 'Need help with the position title?',
              message: 'Provide the position title',
              note: ''
            }
          },
          supervisor: {
            label: 'Supervisor',
            help: {
              title: 'Need help with the supervisor name?',
              message: 'Provide the supervisor name',
              note: ''
            }
          },
          datesEmployed: {
            help: {
              title: 'Need help with the dates of employment?',
              message: 'Provide dates of employment',
              note: ''
            }
          }
        },
        para: {
          additionalActivity: 'List all of your employment activities, including unemployment and self-employment, beginning with the present and working back 10 years. The entire period must be accounted for without breaks. If the employment activity was military duty, list separate employment activity periods to show each change of military duty station.\n\nDo not list employment before your 18th birthday unless to provide a minimum of 2 years employment history.'
        }
      },

      usphs: {
        heading: {
          title: 'Provide your most recent rank/position title',
          status: 'Select the employment status for this position',
          address: 'Provide address of duty station',
          telephone: 'Provide your employment telephone number',
          supervisor: 'Your Supervisor',
          reference: 'Provide a reference',
          physicalAddress: 'Is/was your physical work address different than your employer\'s address?',
          additionalActivity: 'Additional periods of activity with this employer'
        },
        title: {
          label: 'Title',
          help: {
            title: 'Need help with the rank/position title?',
            message: 'Provide your most recent rank/position title',
            note: ''
          }
        },
        status: {
          help: {
            title: 'Need help with the employment status?',
            message: 'Select the employment status',
            note: ''
          }
        },
        address: {
          label: 'This address is',
          help: {
            title: 'Need help with the address?',
            message: 'Provide the address',
            note: ''
          }
        },
        telephone: {
          label: '',
          help: {
            title: 'Need help with the telephone number?',
            message: 'Provide the telephone number',
            note: ''
          }
        },
        supervisor: {
          name: {
            label: 'Supervisor name',
            help: {
              title: 'Need help with the supervisor name?',
              message: 'Provide the name of this supervisor',
              note: ''
            }
          },
          title: {
            label: 'Supervisor position title',
            help: {
              title: 'Need help with the position title?',
              message: 'Provide the position title of this supervisor',
              note: ''
            }
          },
          email: {
            label: 'Supervisor email',
            help: {
              title: 'Need help with the email address?',
              message: 'Provide the email of this supervisor',
              note: ''
            }
          },
          address: {
            label: 'This address is',
            help: {
              title: 'Need help with the address?',
              message: 'Provide the address of this supervisors work location',
              note: ''
            }
          },
          telephone: {
            help: {
              title: 'Need help with the telephone number?',
              message: 'Provide the telephone number for this supervisor',
              note: ''
            }
          },
          heading: {
            name: 'Provide the name of your supervisor',
            title: 'Provide the position title of your supervisor',
            email: 'Provide the email address of your supervisor',
            address: 'Provide the physical work location of your supervisor',
            telephone: 'Provide the telephone number for this supervisor'
          }
        },
        additionalActivity: {
          help: {
            title: 'Need help with additional periods of activity?',
            message: 'Do you have any additional periods of activity to add?',
            note: ''
          },
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
            help: {
              title: 'Need help with the position title?',
              message: 'Provide the position title',
              note: ''
            }
          },
          supervisor: {
            label: 'Supervisor',
            help: {
              title: 'Need help with the supervisor name?',
              message: 'Provide the supervisor name',
              note: ''
            }
          },
          datesEmployed: {
            help: {
              title: 'Need help with the dates of employment?',
              message: 'Provide dates of employment',
              note: ''
            }
          }
        },
        para: {
          additionalActivity: 'List all of your employment activities, including unemployment and self-employment, beginning with the present and working back 10 years. The entire period must be accounted for without breaks. If the employment activity was military duty, list separate employment activity periods to show each change of military duty station.\n\nDo not list employment before your 18th birthday unless to provide a minimum of 2 years employment history.'
        }
      },

      otherfederal: {
        heading: {
          employer: 'Provide the name of your employer',
          title: 'Provide the most recent position title',
          status: 'Select the employment status for this position',
          address: 'Provide the address of employment',
          telephone: 'Provide your employment telephone number',
          reference: 'Provide a reference',
          physicalAddress: 'Is/was your physical work address different than your employer\'s address?',
          additionalActivity: 'Additional periods of activity with this employer'
        },
        para: {
          additionalActivity: 'List all of your employment activities, including unemployment and self-employment, beginning with the present and working back 10 years. The entire period must be accounted for without breaks. If the employment activity was military duty, list separate employment activity periods to show each change of military duty station.\n\nDo not list employment before your 18th birthday unless to provide a minimum of 2 years employment history.'
        },
        employer: {
          label: 'Employer name',
          help: {
            title: 'Need help with the employer name?',
            message: 'Provide the name of your employer',
            note: ''
          }
        },
        title: {
          label: 'Title',
          help: {
            title: 'Need help with the position title?',
            message: 'Provide the name of your position title',
            note: ''
          }
        },
        status: {
          help: {
            title: 'Need help with the employment status?',
            message: 'Select the employment status',
            note: ''
          }
        },
        address: {
          label: 'This address is',
          help: {
            title: 'Need help with the address?',
            message: 'Provide the address',
            note: ''
          }
        },
        telephone: {
          label: '',
          help: {
            title: 'Need help with the telephone number?',
            message: 'Provide the telephone number',
            note: ''
          }
        },
        physicalAddress: {
          help: {
            title: 'Need help with the physical work address?',
            message: 'Is/was your physical work address different than your employer\'s address?',
            note: ''
          },
          address: {
            label: 'This address is'
          },
          heading: {
            telephone: 'Provide telephone number',
            address: 'Provide the address of physical location'
          }
        },
        additionalActivity: {
          help: {
            title: 'Need help with additional periods of activity?',
            message: 'Do you have any additional periods of activity to add?',
            note: ''
          },
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
            help: {
              title: 'Need help with the position title?',
              message: 'Provide the position title',
              note: ''
            }
          },
          supervisor: {
            label: 'Supervisor',
            help: {
              title: 'Need help with the supervisor name?',
              message: 'Provide the supervisor name',
              note: ''
            }
          },
          datesEmployed: {
            help: {
              title: 'Need help with the dates of employment?',
              message: 'Provide dates of employment',
              note: ''
            }
          }
        }
      },

      stategovernment: {
        heading: {
          employer: 'Provide the name of your employer',
          title: 'Provide the most recent position title',
          status: 'Select the employment status for this position',
          address: 'Provide the address of employment',
          telephone: 'Provide your employment telephone number',
          reference: 'Provide a reference',
          physicalAddress: 'Is/was your physical work address different than your employer\'s address?',
          additionalActivity: 'Additional periods of activity with this employer'
        },
        para: {
          additionalActivity: 'List all of your employment activities, including unemployment and self-employment, beginning with the present and working back 10 years. The entire period must be accounted for without breaks. If the employment activity was military duty, list separate employment activity periods to show each change of military duty station.\n\nDo not list employment before your 18th birthday unless to provide a minimum of 2 years employment history.'
        },
        employer: {
          label: 'Employer name',
          help: {
            title: 'Need help with the employer name?',
            message: 'Provide the name of your employer',
            note: ''
          }
        },
        title: {
          label: 'Title',
          help: {
            title: 'Need help with the position title?',
            message: 'Provide the name of your position title',
            note: ''
          }
        },
        status: {
          help: {
            title: 'Need help with the employment status?',
            message: 'Select the employment status',
            note: ''
          }
        },
        address: {
          label: 'This address is',
          help: {
            title: 'Need help with the address?',
            message: 'Provide the address',
            note: ''
          }
        },
        telephone: {
          label: '',
          help: {
            title: 'Need help with the telephone number?',
            message: 'Provide the telephone number',
            note: ''
          }
        },
        physicalAddress: {
          help: {
            title: 'Need help with the physical work address?',
            message: 'Is/was your physical work address different than your employer\'s address?',
            note: ''
          },
          address: {
            label: 'This address is'
          },
          heading: {
            telephone: 'Provide telephone number',
            address: 'Provide the address of physical location'
          }
        },
        additionalActivity: {
          help: {
            title: 'Need help with additional periods of activity?',
            message: 'Do you have any additional periods of activity to add?',
            note: ''
          },
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
            help: {
              title: 'Need help with the position title?',
              message: 'Provide the position title',
              note: ''
            }
          },
          supervisor: {
            label: 'Supervisor',
            help: {
              title: 'Need help with the supervisor name?',
              message: 'Provide the supervisor name',
              note: ''
            }
          },
          datesEmployed: {
            help: {
              title: 'Need help with the dates of employment?',
              message: 'Provide dates of employment',
              note: ''
            }
          }
        }
      },

      federalcontractor: {
        heading: {
          employer: 'Provide the name of your employer',
          title: 'Provide the most recent position title',
          status: 'Select the employment status for this position',
          address: 'Provide the address of employment',
          telephone: 'Provide your employment telephone number',
          reference: 'Provide a reference',
          physicalAddress: 'Is/was your physical work address different than your employer\'s address?',
          additionalActivity: 'Additional periods of activity with this employer'
        },
        para: {
          additionalActivity: 'List all of your employment activities, including unemployment and self-employment, beginning with the present and working back 10 years. The entire period must be accounted for without breaks. If the employment activity was military duty, list separate employment activity periods to show each change of military duty station.\n\nDo not list employment before your 18th birthday unless to provide a minimum of 2 years employment history.'
        },
        employer: {
          label: 'Employer name',
          help: {
            title: 'Need help with the employer name?',
            message: 'Provide the name of your employer',
            note: ''
          }
        },
        title: {
          label: 'Title',
          help: {
            title: 'Need help with the position title?',
            message: 'Provide the name of your position title',
            note: ''
          }
        },
        status: {
          help: {
            title: 'Need help with the employment status?',
            message: 'Select the employment status',
            note: ''
          }
        },
        address: {
          label: 'This address is',
          help: {
            title: 'Need help with the address?',
            message: 'Provide the address',
            note: ''
          }
        },
        telephone: {
          label: '',
          help: {
            title: 'Need help with the telephone number?',
            message: 'Provide the telephone number',
            note: ''
          }
        },
        physicalAddress: {
          help: {
            title: 'Need help withe the physical work address?',
            message: 'Is/was your physical work address different than your employer\'s address?',
            note: ''
          },
          address: {
            label: 'This address is'
          },
          heading: {
            telephone: 'Provide telephone number',
            address: 'Provide the address of physical location'
          }
        },
        additionalActivity: {
          help: {
            title: 'Need help with additional periods of activity?',
            message: 'Do you have any additional periods of activity to add?',
            note: ''
          },
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
            help: {
              title: 'Need help with position title?',
              message: 'Provide the position title',
              note: ''
            }
          },
          supervisor: {
            label: 'Supervisor',
            help: {
              title: 'Need help with the supervisor name?',
              message: 'Provide the supervisor name',
              note: ''
            }
          },
          datesEmployed: {
            help: {
              title: 'Need help with the dates of employment?',
              message: 'Provide dates of employment',
              note: ''
            }
          }
        }
      },

      nongovernment: {
        heading: {
          employer: 'Provide the name of your employer',
          title: 'Provide the most recent position title',
          status: 'Select the employment status for this position',
          address: 'Provide the address of employment',
          telephone: 'Provide your employment telephone number',
          reference: 'Provide a reference',
          physicalAddress: 'Is/was your physical work address different than your employer\'s address?',
          additionalActivity: 'Additional periods of activity with this employer'
        },
        para: {
          additionalActivity: 'List all of your employment activities, including unemployment and self-employment, beginning with the present and working back 10 years. The entire period must be accounted for without breaks. If the employment activity was military duty, list separate employment activity periods to show each change of military duty station.\n\nDo not list employment before your 18th birthday unless to provide a minimum of 2 years employment history.'
        },
        employer: {
          label: 'Employer name',
          help: {
            title: 'Need help with the employer name?',
            message: 'Provide the name of your employer',
            note: ''
          }
        },
        title: {
          label: 'Title',
          help: {
            title: 'Need help with the position title?',
            message: 'Provide the name of your position title',
            note: ''
          }
        },
        status: {
          help: {
            title: 'Need help with employment status?',
            message: 'Select the employment status',
            note: ''
          }
        },
        address: {
          label: 'This address is',
          help: {
            title: 'Need help with the address?',
            message: 'Provide the address',
            note: ''
          }
        },
        telephone: {
          label: '',
          help: {
            title: 'Need help with the telephone number?',
            message: 'Provide the telephone number',
            note: ''
          }
        },
        physicalAddress: {
          help: {
            title: 'Need help with the physical work address?',
            message: 'Is/was your physical work address different than your employer\'s address?',
            note: ''
          },
          address: {
            label: 'This address is'
          },
          heading: {
            telephone: 'Provide telephone number',
            address: 'Provide the address of physical location'
          }
        },
        additionalActivity: {
          help: {
            title: 'Need help with additional periods of activity?',
            message: 'Do you have any additional periods of activity to add?',
            note: ''
          },
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
            help: {
              title: 'Need help with the position title?',
              message: 'Provide the position title',
              note: ''
            }
          },
          supervisor: {
            label: 'Supervisor',
            help: {
              title: 'Need help with the supervisor name?',
              message: 'Provide the supervisor name',
              note: ''
            }
          },
          datesEmployed: {
            help: {
              title: 'Need help with the dates of employment?',
              message: 'Provide dates of employment',
              note: ''
            }
          }
        }
      },

      selfemployment: {
        heading: {
          employer: 'Provide the name of your employer',
          title: 'Provide the most recent position title',
          status: 'Select the employment status for this position',
          address: 'Provide the address of employment',
          telephone: 'Provide your employment telephone number',
          reference: 'Provide a reference',
          physicalAddress: 'Is/was your physical work address different than your employer\'s address?',
          additionalActivity: 'Additional periods of activity with this employer'
        },
        employer: {
          label: 'Employer name',
          help: {
            title: 'Need help with the employer name?',
            message: 'Provide the name of your employer',
            note: ''
          }
        },
        title: {
          label: 'Title',
          help: {
            title: 'Need help with the position title?',
            message: 'Provide the name of your position title',
            note: ''
          }
        },
        status: {
          help: {
            title: 'Need help with the employment status?',
            message: 'Select the employment status',
            note: ''
          }
        },
        address: {
          label: 'This address is',
          help: {
            title: 'Need help with the address?',
            message: 'Provide the address',
            note: ''
          }
        },
        telephone: {
          label: '',
          help: {
            title: 'Need help with the telephone number?',
            message: 'Provide the telephone number',
            note: ''
          }
        },
        physicalAddress: {
          help: {
            title: 'Need help with the physical work address?',
            message: 'Is/was your physical work address different than your employer\'s address?',
            note: ''
          },
          address: {
            label: 'This address is'
          },
          heading: {
            telephone: 'Provide telephone number',
            address: 'Provide the address of physical location'
          }
        },
        additionalActivity: {
          help: {
            title: 'Need help with additional periods of activity?',
            message: 'Do you have any additional periods of activity to add?',
            note: ''
          },
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
            help: {
              title: 'Need help with position title?',
              message: 'Provide the position title',
              note: ''
            }
          },
          supervisor: {
            label: 'Supervisor',
            help: {
              title: 'Need help with the supervisor name?',
              message: 'Provide the supervisor name',
              note: ''
            }
          },
          datesEmployed: {
            help: {
              title: 'Need help with the dates of employment?',
              message: 'Provide dates of employment',
              note: ''
            }
          }
        },
        para: {
          additionalActivity: 'List all of your employment activities, including unemployment and self-employment, beginning with the present and working back 10 years. The entire period must be accounted for without breaks. If the employment activity was military duty, list separate employment activity periods to show each change of military duty station.\n\nDo not list employment before your 18th birthday unless to provide a minimum of 2 years employment history.'
        }
      },

      unemployment: {
        heading: {
          reference: 'Provide the name of someone who can verify your unemployment activities and means of support'
        }
      },

      other: {
        heading: {
          employer: 'Provide the name of your employer',
          title: 'Provide the most recent position title',
          status: 'Select the employment status for this position',
          address: 'Provide the address of employment',
          telephone: 'Provide your employment telephone number',
          reference: 'Provide the name of someone who can verify your unemployment activities and means of support',
          physicalAddress: 'Is/was your physical work address different than your employer\'s address?',
          additionalActivity: 'Additional periods of activity with this employer'
        },
        activity: {
          other: {
            help: {
              title: 'Need help with employment activity?',
              message: 'Please explain the type of employment activity',
              note: ''
            }
          }
        },
        employer: {
          label: 'Employer name',
          help: {
            title: 'Need help with the employer name?',
            message: 'Provide the name of your employer',
            note: ''
          }
        },
        title: {
          label: 'Title',
          help: {
            title: 'Need help with the position title?',
            message: 'Provide the name of your position title',
            note: ''
          }
        },
        status: {
          help: {
            title: 'Need help with the employment status?',
            message: 'Select the employment status',
            note: ''
          },
          fullTime: 'Full-time',
          partTime: 'Part-time'
        },
        address: {
          label: 'This address is',
          help: {
            title: 'Need help with the address?',
            message: 'Provide the address',
            note: ''
          }
        },
        telephone: {
          label: '',
          help: {
            title: 'Need help with the telephone number?',
            message: 'Provide the telephone number',
            note: ''
          }
        },
        physicalAddress: {
          help: {
            title: 'Need help with the physical addresss?',
            message: 'Is/was your physical work address different than your employer\'s address?',
            note: ''
          },
          address: {
            label: 'This address is'
          },
          heading: {
            telephone: 'Provide telephone number',
            address: 'Provide the address of physical location'
          }
        },
        additionalActivity: {
          help: {
            title: 'Need help with any additional periods of activity?',
            message: 'Do you have any additional periods of activity to add?',
            note: ''
          },
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
            help: {
              title: 'Need help with the position title?',
              message: 'Provide the position title',
              note: ''
            }
          },
          supervisor: {
            label: 'Supervisor',
            help: {
              title: 'Need help with the supervisor?',
              message: 'Provide the supervisor name',
              note: ''
            }
          },
          datesEmployed: {
            help: {
              title: 'Need help with the dates of employment?',
              message: 'Provide dates of employment',
              note: ''
            }
          }
        },
        para: {
          additionalActivity: 'List all of your employment activities, including unemployment and self-employment, beginning with the present and working back 10 years. The entire period must be accounted for without breaks. If the employment activity was military duty, list separate employment activity periods to show each change of military duty station.\n\nDo not list employment before your 18th birthday unless to provide a minimum of 2 years employment history.'
        }
      }
    },

    education: {
      title: 'List the places you went to school',
      info: 'Do not list education before your 18th birthday, unless to provide a minimum of two years education history.',
      summary: {
        title: 'Where you went to school',
        schools: 'Schools attended',
        diplomas: 'Degrees/Diplomas earned'
      },
      collection: {
        school: {
          summary: {
            title: 'Summary of education',
            item: 'School',
            unknown: 'Unknown',
            incomplete: 'This education\'s information is complete'
          },
          append: 'Save and add another school'
        },
        diploma: {
          summary: {
            title: 'Summary of degrees/diplomas',
            item: 'Degree',
            unknown: 'Unknown'
          },
          append: 'Add another diploma/degree'
        }
      },
      heading: {
        done: 'Done! Now let\'s add more',
        exiting: 'Before you leave this section',
        degrees: 'Degrees/diplomas',
        degree: 'Did you receive a degree/diploma?',
        details: 'Enter your school information',
        dates: 'Provide dates of attendance',
        name: 'Provide the name of the school',
        address: 'Provide the street address of the school',
        comments: 'If you need to provide additional comments about this information enter them below',
        type: 'Select the most appropriate code to describe your school',
        reference: 'Add a person that knows you',
        diploma: 'Provide type of degree(s)/diploma(s) received',
        date: 'Date awarded'
      },
      para: {
        exiting: '',
        reference: 'For any school in the last 3 years, provide a person who knew you at the address, and who preferably still lives in that area. Do not list people who knew you well for education completely outside this 3-year period, and do not list your spouse, cohabitant or other relatives.'
      },
      label: {
        attendance: 'Have you attended any schools in the last 10 years?',
        degree10: 'Have you received a degree or diploma more than 10 years ago?',
        dates: 'You are not required to list temporary locations of less than 90 days that did not serve as your permanent or mailing address.',
        name: 'School name',
        address: 'This address is',
        comments: 'Add optional comment',
        type: {
          highschool: 'High school',
          college: 'College, university, or military college',
          vocational: 'Vocational, technical, or trade school',
          correspondence: 'Correspondence, distance, extension, or online school'
        },
        diploma: {
          received: 'Type of degree(s)/diploma(s) received',
          highschool: 'High School Diploma',
          associate: 'Associate\'s',
          bachelor: 'Bachelor\'s',
          master: 'Master\'s',
          doctorate: 'Doctorate',
          professional: 'Professional Degree (eg. MD, DVM, JD)',
          other: 'Other',
          otherDiploma: 'Other degree/diploma'
        }
      },
      help: {
        attendance: {
          title: 'Need help the attendance of school?',
          message: 'If you have attended within the last 10 years a high school, college, vocational, or correspondence course',
          note: ''
        },
        degree10: {
          title: 'Need help with a degree or diploma?',
          message: 'If you have received a degree or diploma within the last 10 years',
          note: ''
        },
        dates: {
          title: 'Need help with the dates of attendance?',
          message: 'Provide the dates of attendance',
          note: ''
        },
        school: {
          title: 'Need help with the school name?',
          message: 'Provide the school name',
          note: ''
        },
        address: {
          title: 'Need help with the school address?',
          message: 'Provide the street address of the school',
          note: ''
        },
        type: {
          title: 'Need help with the school code?',
          message: 'Select the most appropriate code to describe your school',
          note: ''
        },
        comments: {
          title: 'Need help providing more information?',
          message: 'If you need to provide any additional comments about this information enter them below',
          note: ''
        },
        degree: {
          title: 'Need help with a degree or diploma?',
          message: 'If you have received one or more degrees or diplomas from this school please provide the required information',
          note: ''
        },
        diploma: {
          title: 'Need help selecting a degree or diploma?',
          message: 'Select the most appropriate degree or diploma received',
          note: ''
        },
        date: {
          title: 'Need help with the date of acheivement?',
          message: 'The date the degree or diploma was awarded',
          note: ''
        }
      }
    },

    federal: {
      title: 'Provide all former federal service',
      heading: {
        branch: 'Do you have former federal civilian employment, excluding military service, NOT indicated previously, to report?',
        dates: 'Provide dates of federal civilian employment',
        name: 'Provide the name of the federal agency for which you are/were employed',
        position: 'Provide your position title',
        address: 'Provide the location of the agency'
      },
      help: {
        branch: {
          title: 'Need more information about former federal service?',
          message: 'To assist in quick processing all federal service must be declared even if outside the maximum requirement of the 10 years of employment',
          note: ''
        },
        dates: {
          title: 'Need help with the dates employed?',
          message: 'The dates you were employed',
          note: ''
        },
        name: {
          title: 'Need help with the agency name?',
          message: 'The name of the federal service',
          note: ''
        },
        position: {
          title: 'Need help with the position title?',
          message: 'The most recent position title during this employment',
          note: ''
        },
        address: {
          title: 'Need help with the address?',
          message: 'The address of the agency',
          note: ''
        }
      },
      collection: {
        summary: {
          title: 'Summary of former federal service',
          item: 'Federal service',
          present: 'Now',
          nodates: 'No dates',
          unknown: 'Click to provide details'
        },
        append: 'Add another former federal service'
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
        number: {
          title: 'Need help with the passport number?',
          message: 'Enter your passport number. If you possess a card, select the Passport card option',
          note: ''
        },
        issued: {
          title: 'Need help with the date issued?',
          message: 'Enter the date your passport was issued',
          note: ''
        },
        expiration: {
          title: 'Need help with the date expired?',
          message: 'Enter the date your passport expired',
          note: ''
        }
      },
      branch: {
        help: {
          title: 'Need more information about the U.S. passport?',
          message: 'Select whether you possess a U.S. passport',
          note: ''
        }
      }
    }
  },
  alias: {
    maiden: {
      help: {
        title: 'Need help with the maiden name?',
        message: 'Select if this is your maiden name',
        note: ''
      }
    },
    reason: {
      help: {
        title: 'Need help with the explanation?',
        message: 'Provide the explanation for why you use an alias.  For example, privacy in business dealings, a pen name, etc.',
        note: ''
      }
    },
    used: {
      help: {
        title: 'Need help with the dates of use?',
        message: 'Provide the full range of dates this name was used',
        note: ''
      }
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
      contact: {
        title: 'Need help with the date of last contact?',
        message: 'Please provide the date of last contact with this person',
        note: ''
      },
      relationship: {
        title: 'Need help defining your relationship?',
        message: 'Please define your relationship with the person during this period',
        note: ''
      },
      email: {
        title: 'Need help with the email address?',
        message: 'A current e-mail address to contact this character reference',
        note: ''
      },
      phone: {
        title: 'Need help with a telephone number?',
        message: 'One or more telephone numbers to contact this character reference',
        note: ''
      },
      address: {
        title: 'Need help with the address?',
        message: 'The current address of the character reference',
        note: ''
      }
    }
  }
}

export default en
