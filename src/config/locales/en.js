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
    saved: 'Auto saved',
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
    append: 'Add another item',
    remove: 'Remove',
    warning: 'Are you sure you would like to remove this item?',
    open: 'Open',
    close: 'Close'
  },
  comments: {
    add: 'Add a comment',
    addpaired: 'Add a comment to this question',
    remove: 'Remove comment'
  },
  name: {
    label: {
      first: 'First name',
      last: 'Last name',
      middle: 'Middle name or initial'
    },
    placeholder: {
      first: 'Please enter your first name or initial',
      middle: 'Please enter your middle name or initial',
      last: 'Please enter your last name'
    }
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
      notfound: {
        title: 'Month is not recognized',
        message: 'The month must be between 1 (January) and 12 (December)',
        note: ''
      },
      max: {
        title: 'Month is not recognized',
        message: 'The month must be between 1 (January) and 12 (December)',
        note: ''
      }
    },
    day: {
      length: {
        title: 'Day falls outside of the allowable range',
        message: 'The day must be a valid day for the month',
        note: ''
      },
      max: {
        title: 'Day falls outside of the allowable range',
        message: 'Cannot exceed the number of days within the month',
        note: ''
      }
    },
    year: {
      max: {
        title: 'The year must be four digits',
        message: 'The year must be a valid year',
        note: ''
      },
      min: {
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
      },
      length: {
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
    },
    domestic_first: {
      pattern: {
        title: 'This field must have 3 digits',
        message: 'The area code must be 3 digits between 0 and 9',
        note: ''
      },
      length: {
        title: 'This field must have 3 digits',
        message: 'The area code must be 3 digits between 0 and 9',
        note: ''
      }
    },
    domestic_second: {
      pattern: {
        title: 'This field must have 3 digits',
        message: 'The first part of the telephone number must be 3 digits between 0 and 9',
        note: ''
      },
      length: {
        title: 'This field must have 3 digits',
        message: 'The first part of the telephone number must be 3 digits between 0 and 9',
        note: ''
      }
    },
    domestic_third: {
      pattern: {
        title: 'This field must have 4 digits',
        message: 'The last part of the telephone number must be 4 digits between 0 and 9',
        note: ''
      },
      length: {
        title: 'This field must have 4 digits',
        message: 'The last part of the telephone number must be 4 digits between 0 and 9',
        note: ''
      }
    },
    dsn_first: {
      pattern: {
        title: 'This field must have 3 digits',
        message: 'The first part of the DSN number must be 3 digits between 0 and 9',
        note: ''
      },
      length: {
        title: 'This field must have 3 digits',
        message: 'The first part of the DSN number must be 3 digits between 0 and 9',
        note: ''
      }
    },
    dsn_second: {
      pattern: {
        title: 'This field must have 4 digits',
        message: 'The last part of the DSN number must be 4 digits between 0 and 9',
        note: ''
      },
      length: {
        title: 'This field must have 4 digits',
        message: 'The last part of the DSN number must be 4 digits between 0 and 9',
        note: ''
      }
    },
    int_first: {
      pattern: {
        title: 'This field must have 3 digits',
        message: 'The country code of the international number must be 3 digits between 0 and 9',
        note: ''
      },
      length: {
        title: 'This field must have 3 digits',
        message: 'The country code of the international number must be 3 digits between 0 and 9',
        note: ''
      }
    },
    int_second: {
      pattern: {
        title: 'This field must have 10 digits',
        message: 'The international number must be 10 digits between 0 and 9',
        note: ''
      },
      length: {
        title: 'This field must have 10 digits',
        message: 'The international number must be 10 digits between 0 and 9',
        note: ''
      }
    },
    geocode: {
      original: {
        title: 'Original address'
      },
      partial: {
        title: 'Alternate address found',
        label: 'Suggested Address',
        para: 'Consider the highlighted change below. Using the US Postal Service suggested address will help us process your case more quickly'
      },
      city: {
        title: 'City could not be found',
        para: 'The city entered could not be found. Please ensure you have correctly typed the city associated to this address'
      },
      notfound: {
        title: 'Address not found',
        para: 'The address provided could not be found. Please ensure you have correctly typed all address fields correctly'
      },
      generic: {
        title: 'Unable to validate address',
        para: 'The address provided cannot be properly validated'
      },
      multiple: {
        title: 'Multiple address found',
        para: 'Multiple addresses were found for the information you entered, and no default exists.'
      },
      defaultAddress: {
        title: 'More information required',
        para: 'The address you entered was found but more information is needed (such as an apartment, suite, or box number) to match to a specific address.'
      }
    },
    Email: {
      pattern: {
        title: 'A valid email address is required',
        message: 'Email addresses may contain alphanumeric characters separated by an the "at" (@) symbol followed by the domain name',
        note: 'Note: Underscores (_) and periods (.) are valid characters'
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
      para: 'Take a guided tour through the section'
    },
    review: {
      para: 'View all the sections associated with identification at once'
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
          unknown: 'Provide your full name below'
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
        city: {
          title: 'Need help with the city?',
          message: 'City where you were born',
          note: ''
        },
        state: {
          title: 'Need help with the state?',
          message: 'State where you were born',
          note: ''
        },
        country: {
          title: 'Need help with the country?',
          message: 'Country where you were born',
          note: ''
        },
        county: {
          title: 'Need help with the county?',
          message: 'County where you were born',
          note: ''
        }
      },
      label: {
        state: 'State or territory',
        city: 'City',
        county: 'County or province',
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
          unknownEmail: 'Provide your e-mail address below',
          unknownPhone: 'Provide your telephone number below',
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
      para: 'Take a guided tour through the section'
    },
    review: {
      para: 'View all the sections associated with identification at once'
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
          unknownlosses: 'Provide your gambling debt below',
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
          unknown: 'Provide your bankruptcy below',
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
      notApplicable: 'Not applicable',
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

  family: {
    tour: {
      para: 'Take a guided tour through the section'
    },
    review: {
      para: 'View all the sections associated with family & friends at once'
    },
    destination: {
      review: 'Review Family & Friends',
      relatives: 'Relatives',
      marital: 'Marital status',
      friends: 'People who know you well'
    },
    relatives: {
      collection: {
        summary: {
          title: 'Summary of relatives',
          unknown: 'Click to provide details',
          item: 'Relative'
        },
        appendTitle: 'Do you have an additional relative to enter?',
        appendMessage: 'If **Yes** use the button below to add another',
        append: 'Add another relative'
      },
      heading: {
        title: 'Select each type of relative applicable to you, regardless if they are living or deceased.',
        needmore: 'Since you answered yes we need more information',
        relation: 'Provide relative type',
        name: 'Provide your relative\'s name',
        birthdate: 'Provide your relative\'s date of birth',
        birthplace: 'Provide your relative\'s place of birth',
        citizenship: 'Provide your relative\'s country(ies) of citizenship',
        maiden: 'Provide your mother\'s maiden name',
        alias: {
          branch: 'Has this relative used any other names?',
          title: 'Provide other names used and the period of time that your relative used them.',
          maiden: 'Maiden name?',
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
        abroad: 'Born abroad to U.S. Parents',
        naturalized: 'Naturalized:',
        derived: 'Derived:',
        notcitizen: 'Not a U.S. Citizen:',
        or: 'Or'
      },
      label: {
        idk: 'I don\'t know',
        relation: {
          mother: 'Mother',
          father: 'Father',
          stepmother: 'Stepmother',
          stepfather: 'Stepfather',
          fosterparent: 'Foster parent',
          child: {
            text: 'Child',
            subtext: '(including adopted/foster)'
          },
          stepchild: 'Stepchild',
          brother: 'Brother',
          sister: 'Sister',
          stepbrother: 'Stepbrother',
          stepsister: 'Stepsister',
          halfbrother: 'Half-brother',
          halfsister: 'Half-sister',
          fatherinlaw: 'Father-in-law',
          montherinlaw: 'Mother-in-law',
          guardian: 'Guardian'
        },
        abroad: {
          fs: 'FS 240 or 545',
          ds: 'DS 1350'
        },
        naturalized: {
          alien: {
            text: 'Alien Registration',
            subtext: '(on Certification of Naturalization - utilize USCIS, CIS, or INS registration number)'
          },
          permanent: {
            text: 'Permanent resident card',
            subtext: '(I-551)'
          },
          certificate: {
            text: 'Certificate of naturalization',
            subtext: '(N550 or N570)'
          }
        },
        derived: {
          alien: {
            text: 'Alien Registration',
            subtext: '(on Certification of Naturalization - utilize USCIS, CIS, or INS registration number)'
          },
          permanent: {
            text: 'Permanent resident card',
            subtext: '(I-551)'
          },
          certificate: {
            text: 'Certificate of naturalization',
            subtext: '(N550 or N570)'
          },
          other: {
            text: 'Other',
            subtext: '(provide explanation)'
          }
        },
        methods: {
          inperson: 'In person',
          telephone: 'Telephone',
          electronic: {
            text: 'Electronic',
            subtext: '(such as e-mail, texting, chat rooms, etc.)'
          },
          written: 'Written correspondence',
          other: {
            text: 'Other',
            subtext: '(provide explanation)'
          }
        },
        frequency: {
          daily: 'Daily',
          weekly: 'Weekly',
          monthly: 'Monthly',
          quarterly: 'Quarterly',
          annually: 'Annually',
          other: {
            text: 'Other',
            subtext: '(provide explanation)'
          }
        },
        document: {
          permanent: 'I-551 Permanent Resident',
          employment: 'I-766 Employment Authorization',
          arrival: 'I-94 Arrival-Departure Record',
          visa: {
            text: 'U.S. Visa',
            subtext: '(red foil number)'
          },
          f1: {
            text: 'I-20 Certificate of Eligibility',
            subtext: '(non-immigrant F1 status)'
          },
          j1: {
            text: 'DS-2019 Certificate of Eligibility',
            subtext: '(exchange visitor J1 status)'
          },
          other: {
            text: 'Other',
            subtext: '(provide explanation)'
          }
        }
      },
      help: {
        relation: {
          title: 'Need help selecting relatives?',
          message: 'Select the relatives relationship to you',
          note: ''
        },
        birthdate: {
          title: 'Need help with the date of birth?',
          message: 'Provide the closest date of birth',
          note: ''
        },
        birthplace: {
          title: 'Need help with the place of birth?',
          message: 'Provide the place of birth',
          note: ''
        },
        citizenship: {
          title: 'Need help with the citizenship?',
          message: 'Provide all of the citizenships',
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
          title: 'Need help with the address?',
          message: 'Provide the address of the relative',
          note: ''
        },
        abroad: {
          title: 'Need help if the relative was born abroad?',
          message: 'Select the appropriate type of documentation',
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
    }
  },

  address: {
    options: {
      us: {
        label: 'In the<br>United States'
      },
      apoFpo: {
        label: 'APO/FPO'
      },
      international: {
        label: 'Outside of the<br>United States'
      }
    },
    us: {
      street: {
        label: 'Street',
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
        label: 'Zip Code',
        placeholder: 'Enter zipcode'
      }
    },
    international: {
      street: {
        label: 'Address',
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
        label: 'Zip Code',
        placeholder: 'Enter zipcode'
      }
    },
    apoFpo: {
      select: {
        label: 'Select APO or FPO'
      },
      street: {
        label: 'Address',
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
        label: 'Zip Code',
        placeholder: 'Enter zipcode'
      },
      apoFpo: {
        label: 'APO/FPO State Code'
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

  suggestions: {
    name: {
      title: 'Alternate names found',
      para: 'Please consider one of the previous names you have used.<p>Using a consistent name helps us to process your case more quickly and eliminate potential mispellings.</p>',
      label: 'Suggested name',
      use: 'Use this name',
      dismiss: 'Use a different name instead'
    },
    address: {
      title: 'Alternate address found',
      para: 'Please consider the highlighted change below.<p>Using the US Postal Service suggested address will help us process your case more quickly.</p>',
      label: 'Suggested address',
      use: 'Use this address',
      dismiss: 'Use this address instead'
    }
  },

  intro: {
    tour: {
      title: 'One piece at a time',
      button: 'Take me on the tour!'
    },
    review: {
      title: 'Full section view',
      button: 'Show me the full section'
    },
    errors: 'Looks like we have a few issues, here is how to fix them.',
    neutral: 'Looks like you still have some items left, here is how to finish them.',
    complete: 'Everything looks good here but you can still review your answers.'
  },

  military: {
    tour: {
      para: 'Take a guided tour through the section'
    },
    review: {
      para: 'View all the sections associated with military history at once'
    },
    destination: {
      selective: 'Selective service record',
      history: 'U.S. military',
      disciplinary: 'Disciplinary procedures',
      foreign: 'Foreign military',
      review: 'Review military history'
    },
    selective: {
      heading: {
        born: 'Were you born a male after December 31, 1959?',
        registered: 'Have you registered with the Selective Service System (SSS)?',
        number: 'Provide registration number'
      },
      label: {
        number: 'Note: Selective Service Number is not your Social Security Number',
        explanation: 'Provide an explanation'
      },
      help: {
        born: {
          title: 'Need help with when you were born?',
          message: 'The selective service only applies to males born before a cerain date.',
          note: ''
        },
        registered: {
          title: 'Need help with whether you have registered?',
          message: 'The Selective Service website (see link below) provides additional resources which may assist in finding your registration number or eligibility',
          note: ''
        },
        number: {
          title: 'Need help with your registration number?',
          message: 'If additional assistance in determining your registration number is required please refer to the Selective Service information below',
          note: ''
        },
        explanation: {
          title: 'Need help providing an explanation?',
          message: 'To assist in the investigation please provide an explanation why you may be unregistered',
          note: ''
        },
        remember: {
          title: 'Can&rsquo;t remember your registration number?',
          message: 'The Selective Service website can help provide the registration number for persons who have registered. Use this link to look up your registration number then come back and enter it above.',
          note: ''
        }
      }
    },
    history: {
      heading: {
        served: 'Have you ever served in the U.S. Military?',
        service: 'Provide the branch of service you served in',
        status: 'Provide your status',
        officer: 'Officer or enlisted',
        number: 'Provide your service number',
        dates: 'Provide your dates of service',
        discharged: 'Were you discharged from this instance of U.S. military service, to include Reserves, or National Guard?',
        details: 'Discharge details',
        discharge: {
          type: 'Provide the type of discharge you received',
          date: 'Provide the date of discharge listed above'
        }
      },
      label: {
        airforce: 'Air Force',
        airnationalguard: 'Air National Guard',
        army: 'Army',
        armynationalguard: 'Army National Guard',
        coastguard: 'Coast Guard',
        marinecorps: 'Marine Corps',
        navy: 'Navy',
        activeduty: 'Active Duty',
        activereserve: 'Active Reserve',
        inactivereserve: 'Inactive Reserve',
        officer: 'Officer',
        enlisted: 'Enlisted',
        na: 'Not applicable',
        discharge: {
          type: {
            honorable: 'Honorable',
            dishonorable: 'Dishonorable',
            lessthan: 'Under other than honorable conditions',
            general: 'General',
            badconduct: 'Bad conduct',
            other: 'Other<br>(provide type)',
            otherex: 'Provide other type of discharge'
          },
          reason: 'Provide the reason(s) for the discharge'
        }
      },
      help: {
        served: {
          title: 'Need help determining if you have served?',
          message: 'If at any point you have served with the active military then you need to report those activities',
          note: ''
        },
        service: {
          title: 'Need help with the branch of service?',
          message: 'Please provide the branch of service you belonged to during this period',
          note: ''
        },
        status: {
          title: 'Need help with your status?',
          message: 'Provide your current status with this service',
          note: ''
        },
        officer: {
          title: 'Need help with your enlistment?',
          message: 'Select the most accurate option for your time in service',
          note: ''
        },
        number: {
          title: 'Need help with your service number?',
          message: 'Depending on the time of your service you may have been assigned a service number. If not then use your social security number.',
          note: ''
        },
        dates: {
          title: 'Need help with your dates of service?',
          message: 'Provide the closest dates of service',
          note: ''
        },
        discharged: {
          title: 'Need help determining if you have been discharged?',
          message: 'Provide the type of discharge and the corresponding details',
          note: ''
        },
        discharge: {
          type: {
            title: 'Need help with the type of discharge?',
            message: 'Please select the most appropriate type of discharge',
            note: ''
          },
          reason: {
            title: 'Need help with the reason for discharge?',
            message: 'Provide the reasons or circumstances of the discharge',
            note: ''
          },
          date: {
            title: 'Need help with the date of discharge?',
            message: 'Provide the closest date of your military discharge',
            note: ''
          }
        }
      },
      collection: {
        summary: {
          title: 'Summary of military history',
          item: 'Branch',
          unknown: 'Provide your military history below'
        },
        appendTitle: 'Do you have additional military service to report?',
        appendMessage: 'If yes use the button below to add more',
        append: 'Add additional military history'
      }
    },
    disciplinary: {
      heading: {
        title: 'Disciplinary procedures',
        date: 'Provide the date of the court martial or other disciplinary procedure',
        offenses: 'Provide a description of the Uniform Code of Military Justice (UCMJ) offense(s) for which you were charged',
        name: 'Provide the name of the disciplinary procedure',
        court: 'Provide the description of the military court or other authority in which you were charged',
        outcome: 'Provide the description of the final outcome of the disciplinary procedure'
      },
      para: {
        info: '**In the last 7 years**, have you been subject to court martial or other disciplinary procedure under the Uniform Code of Military Justice (UCMJ), such as Article 15, Captain&rsquo;s mast, Article 135 Court of Inquiry, etc?'
      },
      label: {
        name: 'Such as Court Martial, Article 15, Captain&rsquo;s mast, Article 135 Court of Inquiry, etc.',
        court: 'Title of court or convening authority, address, to include city and state or country if overseas',
        outcome: 'Such as found guilty, found not guilty, reduction in rank, imprisonment, etc.'
      },
      help: {
        branch: {
          title: 'Need help determining disciplinary procedures?',
          message: 'Have you been subject to court martial or other disciplinary procedure under the Uniform Code of Military Justice (UCMJ), such as Article 15, Captain&rsquo;s mast, Article 135 Court of Inquiry, etc?',
          note: ''
        },
        date: {
          title: 'Need help with the date?',
          message: 'Provide the date of the disciplinary procedures',
          note: ''
        },
        offenses: {
          title: 'Need help with the offenses?',
          message: 'Provide a description of the Uniform Code of Military Justice (UCMJ) offense(s) for which you were charged',
          note: ''
        },
        name: {
          title: 'Need help with the procedure name?',
          message: 'Such as Court Martial, Article 15, Captain&rsquo;s mast, Article 135 Court of Inquiry, etc.',
          note: ''
        },
        court: {
          title: 'Need help with the court information?',
          message: 'Title of court or convening authority, address, to include city and state or country if overseas',
          note: ''
        },
        outcome: {
          title: 'Need help with the outcome?',
          message: 'Such as found guilty, found not guilty, reduction in rank, imprisonment, etc.',
          note: ''
        }
      },
      collection: {
        summary: {
          title: 'Summary of disciplinary procedures',
          item: 'Procedure',
          unknown: 'Provide the disciplinary procedure below'
        },
        appendTitle: 'Additional disciplinary procedures',
        appendMessage: 'In the last 7 years do you have additional military disciplinary procedures to report?',
        append: 'Add additional disciplinary procedures'
      }
    },
    foreign: {
      heading: {
        title: 'Foreign military',
        organization: 'During your foreign service, which organization were you serving under?',
        name: 'Provide the name of the foreign organization',
        dates: 'Provide your period of service',
        country: 'Provide the name of the country',
        rank: 'Provide your highest position/rank held',
        division: 'Provide the division/department/office in which you served',
        circumstances: 'Provide a description of the circumstances of your association with this organization',
        left: 'Provide a description of the reason for leaving this service',
        maintainscontact: 'Do you maintain contact with current or former associates, colleagues, or acquaintances from your service in this organization?',
        contact: {
          details: 'Acquaintance contact details',
          name: 'Provide the full name',
          address: 'Provide the contact\'s address',
          title: 'Provide the contact\'s official title',
          dates: 'Provide the length of your association with the contact',
          frequency: 'Provide the frequency of contact'
        }
      },
      para: {
        served: 'Have you **ever** served, as a civilian or military member in a foreign country\'s military, intelligence, diplomatic, security forces, militia, other defense force, or government agency?',
        contact: 'Please provide full name, address (if known), official title, length of association, and frequency of contact for each former associate, colleague or acquaintance with whom you maintain contact.'
      },
      label: {
        organization: {
          military: 'Military',
          military2: '(Army, Navy, Air Force, Marines, etc.)',
          intelligence: 'Intelligence Service',
          diplomatic: 'Diplomatic Service',
          security: 'Security Forces',
          militia: 'Militia',
          defense: 'Other Defense Forces',
          other: 'Other Government Agency'
        }
      },
      help: {
        served: {
          title: 'Need help with foreign military?',
          message: 'If you have served in a foreign military or service it will help in processing your application',
          note: ''
        },
        organization: {
          title: 'Need help with foreign service?',
          message: 'The type of foreign service',
          note: ''
        },
        name: {
          title: 'Need help with the name of the foreign organization?',
          message: 'The organization name',
          note: ''
        },
        dates: {
          title: 'Need help with the period of service?',
          message: 'The date range you served',
          note: ''
        },
        country: {
          title: 'Need help with the name of the country?',
          message: 'The country name',
          note: ''
        },
        rank: {
          title: 'Need help with the highest position/rank held?',
          message: 'The hightest rank or position held within the service',
          note: ''
        },
        division: {
          title: 'Need help with the division/department/office?',
          message: 'The name for the division, department, or office',
          note: ''
        },
        circumstances: {
          title: 'Need help describing the circumstances?',
          message: 'Additional information regarding the circumstances of this foreign service',
          note: ''
        },
        left: {
          title: 'Need help with the reason for leaving?',
          message: 'Please provide any reasons for leaving this service',
          note: ''
        },
        maintainscontact: {
          title: 'Need help with contacts with current or former associates?',
          message: 'If you maintain contact with any current or former foreign associates please provide their contact information',
          note: ''
        }
      },
      collection: {
        foreign: {
          appendTitle: 'Do you have an additional foreign military service to report?',
          append: 'Add another foreign military service'
        },
        contacts: {
          summary: {
            title: 'Summary of foreign military contacts',
            item: 'Name',
            unknown: 'Provide foreign military contact below'
          },
          appendTitle: 'Do you have an additional foreign military service contact to report?',
          appendMessage: 'If yes use the button below to add another contact',
          append: 'Add another contact'
        }
      }
    }
  },

  history: {
    tour: {
      para: 'Take a guided tour through the section'
    },
    review: {
      title: 'Full section view',
      para: 'View all the sections associated with your history at once',
      button: 'Show me the full section'
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
      },
      heading: {
        exiting: 'Before you leave this section'
      },
      para: {
        exiting: '**The full 10 year period of residence and employment history is not covered.** Your SF86 cannot be submitted until all 10 years are covered with no gaps.<br><br>We will mark the gaps and highlight them for you when you come back.'
      }
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
      title: 'Where you have lived',
      info: 'List the places where your have lived beginning with your present residence and working back 10 years.',
      info2: 'Residences for the entire period must be accounted for without breaks.',
      info3a: ' - **Indicate the actual physical location of your residence**, not a Post Office box or a permanent residence when you were not physically located there.',
      info3b: ' - **If you split your time between one or more residences during a time period**, you must list all residences.',
      info3c: ' - **Do not list residences before your 18th birthday** unless to provide a minimum of 2 years residence history.',
      summary: {
        title: 'Where you have lived',
        unit: 'Years covered'
      },
      collection: {
        summary: {
          title: 'Summary of places you have lived',
          item: 'Address',
          unknown: 'Unknown',
          incomplete: 'This residence\'s information is incomplete'
        },
        append: 'Add another residence'
      },
      gap: {
        title: 'Residence gap',
        para: 'There is a gap in your residence history. The entire 10 year period must be covered with no gaps',
        btnText: 'Add an address'
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
      gap: {
        title: 'Employment gap',
        para: 'There is a gap in your employment. The entire 10 year period must be covered with no gaps',
        btnText: 'Add an employer'
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
          append: 'Add another employer',
          summary: {
            title: 'Summary of your work history',
            employer: 'Employer',
            incomplete: 'This employer\'s information is incomplete'
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
        reasonDescription: {
          title: 'Reason for leaving employment',
          message: 'Explain why you left your last employment'
        },
        reasonOptions: {
          title: 'Reason for leaving employment',
          message: 'For this employment have any of the following happened to you in the last seven (7) years?'
        },
        left: {
          title: 'Provide the reason for leaving the employment activity',
          para: 'For this employment have any of the following happened to you in the last seven (7) years?',
          list: '- Fired\n- Quit after being told you would be fired\n- Left by mutual agreement following charges or allegations of misconduct\n- Left by mutual agreement following notice of unsatisfactory performance',
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
        reprimand: {
          para: 'For this employment, in the last seven (7) years have you received a written warning, been officially reprimanded, suspended, or disciplined for misconduct in the workplace, such as a violation of security policy?',
          description: {
            label: 'Provide the reason(s) for being warned, reprimanded, suspended or disciplined'
          },
          date: {
            label: 'Provide the month and year you were warned, reprimanded, suspended or disciplined'
          },
          help: {
            title: 'Have you received a written warning',
            message: 'Explain if you have you received a written warning, been officially reprimanded, suspended, or disciplined for misconduct in the workplace, such as a violation of security policy'
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
          additionalActivity: 'Additional periods of activity with this employer',
          dutyStation: 'Provide your assigned duty station during this period'
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
        dutyStation: {
          label: 'Duty station'
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
          additionalActivity: 'Additional periods of activity with this employer',
          dutyStation: 'Provide your assigned duty station during this period'
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
        dutyStation: {
          label: 'Duty station'
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
          additionalActivity: 'Additional periods of activity with this employer',
          dutyStation: 'Provide your assigned duty station during this period'
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
        dutyStation: {
          label: 'Duty station'
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
          reference: 'Provide the name of someone that can verify your self-employment',
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
            incomplete: 'This education\'s information is incomplete'
          },
          append: 'Add another school'
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
        degreeTail: 'Do you have another degree/diploma to add?',
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
          unknown: 'Provide federal service below'
        },
        append: 'Add another former federal service'
      }
    }
  },

  foreign: {
    tour: {
      para: 'Take a guided tour through the section'
    },
    review: {
      para: 'View all the sections associated with foreign activities at once'
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

  legal: {
    tour: {
      para: 'Take a guided tour through the section'
    },
    review: {
      para: 'View all the sections associated with investigative & criminal history at once'
    },
    destination: {
      police: 'Police record',
      review: 'Review investigative & criminal history'
    },
    police: {
      heading: {
        title: 'Police record',
        questions: 'Have any of the following happened?',
        date: 'Provide the date of the offense',
        description: 'Provide a description of the specific nature of the offense',
        involvement: 'Did this offense involve any of the following?',
        address: 'Provide the location where the offense occurred',
        cited: 'Were you arrested, summoned, cited, or did you receive a ticket to appear as a result of this offense by any police officer, sheriff, marshal or any other type of law enforcement official?',
        citedagency: 'Arresting/citing/summoning agency',
        citedby: 'Provide the name of the law enforcement agency that arrested/cited/summoned you.',
        agencyaddress: 'Provide the location of the law enforcement agency',
        charged: 'As a result of this offense were you charged, convicted, currently awaiting trial, and/or ordered to appear in court in a criminal proceeding against you?',
        courtinfo: 'Court Information',
        courtname: 'Provide the name of the court',
        courtaddress: 'Provide the location of the court',
        chargedetails: 'Charges detail',
        courttype: 'Type of charge',
        courtdate: 'Date',
        sentenced: 'Were you sentenced as a result of this offense?',
        needmore: 'Since you answered yes we need more information',
        sentenceDescription: 'Provide a description of the sentence',
        exceedsYear: 'Were you sentenced to imprisonment for a term exceeding 1 year?',
        incarcerated: 'Were you incarcerated as aresult of that sentence for not less than 1 year?',
        incarcerationDates: 'If the conviction resulted in imprisonment, provide the dates that you actually were incarcerated',
        probationDates: 'If conviction resulted in probation or parole, provide the  dates of probation or parole',
        awaitingTrial: 'Are you currently on trial, awaiting a trial, or awaiting sentencing on criminal charges for this offense?',
        awaitingTrialExplanation: 'Provide explanation',
        domesticExplanation: 'Provide explanation',
        domesticCourtName: 'Provide the name of the court or agency that issued the order',
        domesticCourtAddress: 'Provide the location of the court or agency that issued the order',
        domesticCourtDate: 'Provide the date the order was issued',
        otherOffenseSentenced: 'Were you sentenced as a result of these charges?'
      },
      para: {
        intro1: 'For this section report information regardless of whether the record in your case has b een sealed, expunged, or otherwise stricken from the court record, or the charge was dismissed.',
        intro2: 'You need not report convictions under the Federal Controlled Substances Act for which the court issued an expungement order under the authority of 21 U.S.C 844 or 18 U.S.C. 3607.',
        intro3: '**Be sure to include all incidents whether occurring in the U.S. or abroad.**',
        summons: '(Answer no if all the citations involved traffic infractions where the fine was less than $300 and did not include alcohol or drugs.)',
        charges: '(Include all qualifying charges, convictions or sentences in any federal, state, local, military, or non-U.S. court, even if previously listed on this form.)',
        chargedetails: '**Provide all the charges brought against you for this offense**, and the outcome of each charged offense (such as found guilty, found not-guilty, charge dropped or "nolle pros," etc). If you were found guilty of or pleaded guilty to lesser offense, list separately both the original charge and the lesser offense.',
        otherOffense: {
          intro: 'Other than those offenses already listed, have you EVER had the following happen to you?',
          first: '**Have you EVER been convicted** in any court of the United States of a crime, sentenced to imprisonment for a term exceeding 1 year for that crime, and incarcerated as a result of that sentence for not less than 1 year? (Include all qualifying convictions in Federal, state, local, or military court, even if previously listed on this form.)',
          second: '**Have you EVER been charged** with any felony offense? (Include those under the Uniform Code of Military Justice and non-military/civilian felony offenses.)',
          third: '**Have you EVER been convicted** of an offense involving domestic violence or a crime of violence (such as battery or assault) against your child, dependent, cohabitant, spouse or legally recognized civil union/domestic partner, former spouse or legally recognized civil union/domestic partner, or someone with whom you share a child in common?',
          fourth: '**Have you EVER been charged** with an offense involving firearms or explosives?',
          fifth: '**Have you EVER been charged** with an offense involving alcohol or drugs?'
        }
      },
      label: {
        summons: '**In the last seven (7) years** have you been issued a summons, citation, or ticket to appear in court in a criminal proceeding against you?',
        arrests: '**In the last seven (7) years** have you been arrested by any police officer, sheriff, marshal or any other type of law enforcement official?',
        charges: '**In the last seven (7) years** have you been charged with, convicted of, or sentenced for a crime in any court?',
        probation: '**In the last seven (7) years** have you been or are you currently on probation or parole?',
        trial: 'Are you currently on trial or awaiting a trial on criminal charges?',
        violence: '**Domestic violence or a crime of violence** (such as battery or assault) against your child, dependent, cohabitant, spouse or legally recognized civil union/domestic partner, former spouse or legally recognized civil union/domestic partner, or someone with whom you share a child in common?',
        firearms: '**Involve firearms or explosives?**',
        substances: '**Involve alcohol or drugs?**',
        address: 'This address is',
        explanation: 'Provide explanation',
        courtname: 'Name of court',
        felony: 'Felony',
        misdemeanor: 'Misdemeanor',
        other: 'Other',
        courtcharge: 'Charge',
        courtoutcome: 'Outcome',
        domesticViolence: 'Is there currently a domestic violence protective order or restraining order issued against you?',
        notApplicable: 'Not applicable',
        or: 'or add date range'
      },
      help: {
        summons: {
          title: 'Need help with a summons, citation, or ticket?',
          message: 'If you were issued a summons, citation, or ticket answer "Yes" and provide the required information',
          note: ''
        },
        arrests: {
          title: 'Need help with an arrest?',
          message: 'If you were arrested answer "Yes" and provide the required information',
          note: ''
        },
        charges: {
          title: 'Need help with a criminal charge?',
          message: 'If you were charged answer "Yes" and provide the required information',
          note: ''
        },
        probation: {
          title: 'Need help with a current probation or parole?',
          message: 'If you are currently on probation or parole answer "Yes" and provide the required information',
          note: ''
        },
        trial: {
          title: 'Need help if on or awaiting trial?',
          message: 'If you currently awaiting or on trial please answer "Yes" and provide the required information',
          note: ''
        },
        date: {
          title: 'Need help withe the date of offense?',
          message: 'Provide the closest date of the offense',
          note: ''
        },
        description: {
          title: 'Need help with the description of the offense?',
          message: 'Provide an account of the nature of the offense',
          note: ''
        },
        violence: {
          title: 'Need help if this offense involved violence?',
          message: 'Indicate if the offense involved domestic or criminal violence',
          note: ''
        },
        firearms: {
          title: 'Need help if this offense involved firearms or explosives?',
          message: 'Indicate if the offense involved firearms or explosives',
          note: ''
        },
        substances: {
          title: 'Need help if this offense involved alcohol or drugs?',
          message: 'Indicate if the offense involved alcohol or drugs',
          note: ''
        },
        address: {
          title: 'Need help with the location of the offense?',
          message: 'Provide the address where the offense took place',
          note: ''
        },
        cited: {
          title: 'Need help if you were arrested, summoned, or cited for this offense?',
          message: 'If you were arrested, summoned, or cited please answer "Yes" and provide the required information',
          note: ''
        },
        citedby: {
          title: 'Need help with the law enforcement agency name?',
          message: 'Provide the name of the law enforcement agency who handled this offense',
          note: ''
        },
        agencyaddress: {
          title: 'Need help with the law enforcement agency address?',
          message: 'Provide the address of the law enforcement agency who handled this offense',
          note: ''
        },
        charged: {
          title: 'Need help if you were charged, convicted, or awaiting trial?',
          message: 'If you were charged, convicted, currently awaiting trial, or due to appear in court answer "Yes" and provide the required information',
          note: ''
        },
        courtname: {
          title: 'Need help with the name of the court?',
          message: 'Provide the name of the court',
          note: ''
        },
        courtaddress: {
          title: 'Need help with the court address?',
          message: 'Provide the address of the court',
          note: ''
        },
        courttype: {
          title: 'Need help with the type of charge?',
          message: 'Provide the type of charge issued by the court',
          note: ''
        },
        courtcharge: {
          title: 'Need help with the court charge(s)?',
          message: 'Provide the charge(s)',
          note: ''
        },
        courtoutcome: {
          title: 'Need help with the court outcome?',
          message: 'Provide the outcome of the court proceedings',
          note: ''
        },
        courtdate: {
          title: 'Need help with the court date?',
          message: 'Provide the court date',
          note: ''
        },
        sentenced: {
          title: 'Need help if you were sentenced for this offense?',
          message: 'If you were sentenced by the court for this offense please click "Yes" and provide the necessary information',
          note: ''
        },
        sentenceDescription: {
          title: 'Need help with the sentence description?',
          message: 'Provide a description of your sentencing',
          note: ''
        },
        exceedsYear: {
          title: 'Need help?',
          message: 'If you were sentenced for a term exceeding 1 year, please click "Yes"',
          note: ''
        },
        incarcerationDates: {
          title: 'Need help with incarceration dates?',
          message: 'If the conviction resulted in imprisonment, provide the dates that you actually were incarcerated',
          note: ''
        },
        probationDates: {
          title: 'Need help with probation dates?',
          message: 'If conviction resulted in probation or parole, provide the dates of probation or parole',
          note: ''
        },
        awaitingTrial: {
          title: 'Need help with this question?',
          message: 'Are you currently on trial, awaiting a trial, or awaiting sentencing on criminal charges for this offense?',
          note: ''
        },
        awaitingTrialExplanation: {
          title: 'Need help with awaiting trial explanation',
          message: 'Provide explanation',
          note: ''
        }
      },
      branchCollection: {
        domesticViolence: {
          title: 'Need help?',
          message: 'Is there currently a domestic violence protective order or restraining order issued against you?'
        }
      },
      collection: {
        summary: {
          title: 'Summary of offenses',
          item: 'Offense',
          unknown: 'Provide offense below'
        },
        appendTitle: 'Do you have any other offenses where any of the following has happened to you?',
        appendMessage: '- **In the last seven (7) years** have you been issued a summons, citation, or ticket to appear in court in a criminal proceeding against you? (Do not check if all the citations involved traffic infractions where the fine was than $300 and did not include alcohol or drugs.)\n- **In the last seven (7) years** have you been arrested by any police officer, sheriff, marshal or any other type of law enforcement official?\n- **In the last seven (7) years** have you been charged with, convicted of, or sentenced for a crime in any court? (Include all qualifying charges, convictions or sentences in any federal, state, local, military, or non-U.S. court, even if previously listed on this form.)\n- **In the last seven (7) years** have you been or are you currently on probation or parole?\nAre you currently on trial or awaiting a trial on criminal charges?\n<p>If yes use the button below to add add another offense.</p>',
        append: 'Add another offense'
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
    name: {
      label: {
        first: 'First name',
        last: 'Last name',
        middle: 'Middle name or initial'
      },
      placeholder: {
        first: 'Enter first name of the person who knows you',
        middle: 'Enter middle name of the person who knows you',
        last: 'Enter last name of the person who knows you'
      }
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
