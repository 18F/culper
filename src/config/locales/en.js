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
      middle: 'Middle name or initial',
      initialOnly: 'Initial Only',
      noMiddle: 'No middle name',
      other: 'Other',
      suffix: 'Suffix',
      optional: 'Optional',
      jr: 'Jr',
      sr: 'Sr',
      i: 'I',
      ii: 'II',
      iii: 'III',
      iv: 'IV',
      v: 'V',
      vi: 'VI',
      vii: 'VII',
      viii: 'VIII',
      ix: 'IX',
      x: 'X'
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
    apoFpo: {
      length: {
        title: 'APO/FPO length',
        message: 'APO/FPO state code must be 2 letters',
        note: ''
      },
      pattern: {
        title: 'APO/FPO not in an acceptable format',
        message: 'APO/FPO state code must be 2 letters',
        note: 'Note: Typically the value is either AA, AE, or AP.'
      }
    },
    passport: {
      number: {
        pattern: {
          title: 'Passport number not in acceptable format',
          message: [
            'For passport books the number will start with a letter and then 6 to 9 digits.',
            'For passport cards the number begins with a "C" and followed by 8 digits.'
          ],
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
    domestic_extension: {
      pattern: {
        title: 'Invalid telephone extension',
        message: 'The extension must be between 0 and 10 digits',
        note: ''
      },
      length: {
        title: 'Invalid telephone extension',
        message: 'The extension must be between 0 and 10 digits',
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
    },
    Year: {
      min: {
        title: 'The year is below the accepted limits',
        message: 'The year must be four (4) digit year',
        note: ''
      }
    },
    order: {
      datecontrol: {
        max: {
          title: 'Invalid date provided',
          message: 'Order date value cannot exceed todays date'
        },
        min: {
          title: 'Invalid date provided',
          message: 'Order date value must be on or after your date of birth'
        }
      }
    },
    hospitalization: {
      to: {
        datecontrol: {
          max: {
            title: 'Invalid date provided',
            message: 'Hospitalization to date value cannot exceed todays date'
          },
          min: {
            title: 'Invalid date provided',
            message: 'Hospitalization to date value must be on or after your date of birth'
          }
        }
      },
      from: {
        datecontrol: {
          max: {
            title: 'Invalid date provided',
            message: 'Hospitalization from date value cannot exceed todays date'
          },
          min: {
            title: 'Invalid date provided',
            message: 'Hospitalization from date value must be on or after your date of birth'
          }
        }
      }
    },
    diagnosis: {
      to: {
        datecontrol: {
          max: {
            title: 'Invalid date provided',
            message: 'Diagnosis to date value cannot exceed todays date'
          },
          min: {
            title: 'Invalid date provided',
            message: 'Diagnosis to date value must be on or after your date of birth'
          }
        }
      },
      from: {
        datecontrol: {
          max: {
            title: 'Invalid date provided',
            message: 'Diagnosis from date value cannot exceed todays date'
          },
          min: {
            title: 'Invalid date provided',
            message: 'Diagnosis from date value must be on or after your date of birth'
          }
        }
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
      night: 'Night only',
      both: 'Both'
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
      relationships: 'Relationships',
      othernames: 'Other names used',
      name: 'Full name',
      birthdate: 'Birth date',
      birthplace: 'Birth place',
      contacts: 'Contacts',
      ssn: 'Social security number',
      physical: 'Identifying information',
      psychological: 'Psychological and emotional health'
    },
    name: {
      title: 'Provide your full name',
      last: {
        help: {
          title: 'Need help with your last name?',
          message: 'If your last name is a single initial letter only type that initial and check the "Initial only" checkbox.',
          note: 'Note: "Initial only" is for single letter names only, not for the initial of your full name.'
        }
      },
      first: {
        help: {
          title: 'Need help with your first name?',
          message: 'If your first name is a single initial letter only type that initial and check the "Initial only" checkbox.',
          note: 'Note: "Initial only" is for single letter names only, not for the initial of your full name.'
        }
      },
      middle: {
        help: {
          title: 'Need help with your middle name?',
          message: [
            'If your middle name is a single initial letter only type that initial and check the "Initial only" checkbox.',
            'If you do not have a middle name leave this field empty and check the "No middle name" checkbox.'
          ],
          note: 'Note: "Initial only" is for single letter names only, not for the initial of your full name.'
        }
      },
      suffix: {
        help: {
          title: 'Need help with your suffix?',
          message: 'If your suffix does not appear in this list, select "Other" and enter your suffix in the provided field',
          note: ''
        }
      }
    },
    othernames: {
      title: 'Provide your other names used and the period of time you used them',
      info: 'For example: your maiden name, name(s) by a former marriage, former name(s), alias(es), or nickname(s).',
      branch: {
        help: {
          title: 'Need help with your other names used?',
          message: [
            'List all other names you have used no matter how long ago.',
            'Input names one at a time, you will have the ability to add multiple other names.'
          ],
          note: 'Example: Full name is Michael and nickname Mike. "Mike" would be the other name used.'
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
        title: 'Need help with your birthdate?',
        message: 'If you are not sure of your exact date of birth estimate it as best you can and check the "Estimated" checkbox. ',
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
          message: 'This is your physical place of birth.',
          note: 'Example: United States citizens born in another country would list that other country.'
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
          title: 'Need help with your email addresses?',
          message: 'Provide at least 2 email addresses, preferrably your home (personal) email and your work email.',
          note: 'Note: More than 2 email addresses are not required but may assist in the completion of your background investigation.'
        },
        phoneNumber: {
          title: 'Need help with your phone numbers?',
          message: 'Enter only current phone numbers.',
          note: 'Note: Additional numbers provided may assist in the completion of your background investigation.'
        }
      },
      collection: {
        summary: {
          title: 'Summary of email addresses',
          email: 'Email',
          unknownEmail: 'Provide your email address below',
          unknownPhone: 'Provide your telephone number below',
          phoneNumber: 'Phone number'
        },
        phoneNumbers: {
          summary: {
            title: 'Summary of phone numbers'
          },
          append: 'Add another phone number'
        },
        append: 'Add another email'
      },
      heading: {
        email: 'Your email addresses',
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
        message: 'If you do not have a U.S. Social Security Number check the "Not Applicable" checkbox',
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
      title: 'Provide your identifying information',
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
          title: 'Need help entering your height?',
          message: [
            'Please use feet and inches only.',
            'Feet must be a number between 1 and 9. Inches must be between 0 and 11.'
          ],
          note: ''
        },
        weight: {
          title: 'Need help entering your weight?',
          message: [
            'Please use pounds and whole numbers only.',
            'Weight must be a number between 10 and 999.'
          ],
          note: ''
        },
        eye: {
          title: 'Need help selecting your eye color?',
          message: 'Choose the eye color that most closely represents your eyes.',
          note: ''
        },
        hair: {
          title: 'Need help selecting your hair color?',
          message: 'Choose the hair color that most closely represents your hair.',
          note: ''
        },
        sex: {
          title: 'Need help with your sex?',
          message: 'Please select the sex at your time of birth.',
          note: 'Note: If additional information is appropriate please use "Add a comment" above to detail it.'
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
      taxes: 'Taxes',
      card: 'Employer card abuse',
      credit: 'Credit counseling',
      delinquent: 'Delinquent payments',
      nonpayment: 'Non-payment consequence',
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
        petitionType: 'Select the applicable bankruptcy petition type',
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
    },
    taxes: {
      title: 'In the last seven (7) years have you failed to file or pay Federal, state, or other taxes when required by law or ordinance?',
      heading: {
        failure: 'Did you fail to file, pay as required, or both?',
        year: 'Provide the year you failed to file or pay your federal, state, or other taxes (Estimated)',
        reason: 'Provide the reason(s) for your failure to file or pay required taxes',
        agency: 'Provide the federal, state, or other agency to which you failed to file or pay taxes',
        taxtype: 'Provide the type of taxes you failed to file or pay (such as property, income, sales, etc.)',
        amount: 'Provide the amount (in U.S. dollars) of the taxes',
        date: 'Provide the date satisfied',
        description: 'Provide a description of any action(s) you have taken to satisfy this debt (such as withholdings, frequency and amount of payments, etc.). If you have not taken any action(s) provide explanation.'
      },
      label: {
        file: 'File',
        pay: 'Pay',
        both: 'Both',
        estimated: 'Estimated',
        notapplicable: 'Not applicable'
      },
      para: {
        or: 'or'
      },
      placeholder: {
        year: '2016',
        amount: '1000'
      },
      help: {
        branch: {
          title: 'Need help with the type of tax failure?',
          message: 'If you have failed to file or pay any federal, state, or other taxes required by law or ordinance within the last seven (7) years click "Yes"',
          note: ''
        },
        failure: {
          title: 'Need help with the type of tax failure?',
          message: 'Provide the type of tax failure',
          note: ''
        },
        year: {
          title: 'Need help with the year?',
          message: 'Provide the year you failed to file or pay your taxes',
          note: ''
        },
        reason: {
          title: 'Need help with the reason?',
          message: 'Provide the reason for the failure to file or pay the required taxes',
          note: ''
        },
        agency: {
          title: 'Need help with the agency?',
          message: 'Provide the name of the agency to which the taxes were failed to file or pay to',
          note: ''
        },
        taxtype: {
          title: 'Need help with tax type?',
          message: 'Provide the type of taxes you failed to file or pay such as property, income, sales, etc.',
          note: ''
        },
        amount: {
          title: 'Need help with the amount?',
          message: 'Provide the amount, in U.S. dollars, of taxes',
          note: ''
        },
        date: {
          title: 'Need help with the date satisfied?',
          message: 'Provide the date, if any, the tax issue was satisfied',
          note: ''
        },
        description: {
          title: 'Need help providing a description?',
          message: 'Provide a description or explanation taken concerning this debt',
          note: ''
        }
      },
      collection: {
        summary: {
          title: 'Summary of failed tax filings',
          unknown: 'Provide your tax filing information below',
          item: 'Agency'
        },
        appendTitle: 'Are there any other instances in the last seven (7) years where you failed to file or pay Federal, state, or other taxes when required by law or ordinance?',
        appendMessage: 'If yes use the button below to add another tax filing/payment issue',
        append: 'Add another tax filing/payment issue'
      }
    },
    card: {
      title: 'In the last seven (7) years have you been counseled, warned, or disciplined for violating the terms of agreement for your travel or credit card provided by your employer?',
      heading: {
        agency: 'Provide the name of the agency or company',
        address: 'Provide the address of the agency or company',
        date: 'Provide the date of your counseling, warning, or disciplinary action',
        reason: 'Provide the reason(s) for the counseling, warning, or disciplinary action',
        amount: 'Provide the amount (in U.S. dollars) of violation',
        description: 'Provide a description of any action(s) you have taken to rectify this situation. If you have not taken any action(s) provide explanation.'
      },
      label: {
        estimated: 'Estimated'
      },
      placeholder: {
        amount: '1000'
      },
      help: {
        branch: {
          title: 'Need help with the employer card abuse?',
          message: 'If in the last seven (7) years have you been counseled, warned, or disciplined for violating the terms of agreement for your travel or credit card provided by your employer then click "Yes"',
          note: ''
        },
        agency: {
          title: 'Need help with the agency or company name?',
          message: 'Provide the name of the agency or company involved',
          note: ''
        },
        address: {
          title: 'Need help with the agency or company address?',
          message: 'Provide the last known address of the agency or company involved',
          note: ''
        },
        date: {
          title: 'Need help with the date?',
          message: 'Provide the approximate date of the violation',
          note: ''
        },
        reason: {
          title: 'Need help with the reason?',
          message: 'Provide the reason for the violation',
          note: ''
        },
        amount: {
          title: 'Need help with the amount?',
          message: 'Provide the amount, in U.S. dollars, of violation',
          note: ''
        },
        description: {
          title: 'Need help providing a description?',
          message: 'Provide a description or explanation taken concerning this issue',
          note: ''
        }
      },
      collection: {
        summary: {
          title: 'Summary of employer card abuses',
          unknown: 'Provide your card abuse information below',
          item: 'Employer'
        },
        appendTitle: 'Are there any other instances in the last seven (7) years where you have been counseled, warned, or disciplined for violating the term of agreement for a travel or credit card provided by your employer?',
        appendMessage: 'If yes use the button below to add another card abuse/counseling issue',
        append: 'Add another card abuse/counseling issue'
      }
    },
    credit: {
      title: 'Are you currently utilizing, or seeking assistance from, a credit counseling service or other similar resource to resolve yoyur financial difficulties?',
      heading: {
        explanation: 'Provide explanation',
        name: 'Provide the name of the credit counseling organization or resource',
        telephone: 'Provide the phone number of the credit counseling organization',
        address: 'Provide the location of the credit counseling organization',
        description: 'As a result of this counseling provide a description of any action(s) you have taken to resolve your financial difficulties. If you have not taken any action(s) provide explanation.'
      },
      help: {
        branch: {
          title: 'Need help with credit counseling?',
          message: 'If you currently utilizing, or seeking assistance from, a credit counseling service or other similar resource to resolve yoyur financial difficulties then click "Yes"',
          note: ''
        },
        explanation: {
          title: 'Need help with the explanation?',
          message: 'Provide an explanation for the counseling',
          note: ''
        },
        name: {
          title: 'Need help with the counseling organization name?',
          message: 'Provide the name of the counseling organization',
          note: ''
        },
        telephone: {
          title: 'Need help with the telephone number?',
          message: 'Provide the contact phone number for the counseling organization',
          note: ''
        },
        address: {
          title: 'Need help with the counseling organization address?',
          message: 'Provide the last known address for the counseling organization',
          note: ''
        },
        description: {
          title: 'Need help providing a description?',
          message: 'Provide a description or explanation taken concerning this issue',
          note: ''
        }
      },
      collection: {
        summary: {
          title: 'Summary of credit counseling',
          unknown: 'Provide your counseling details below',
          item: 'Service'
        },
        appendTitle: 'Are you currently utilizing, or seeking assistance from any other credit counseling service or similar resource to resolve your financial difficulties?',
        appendMessage: 'If yes use the button below to add another credit counseling entry',
        append: 'Add another credit counseling entry'
      }
    },
    delinquent: {
      title: 'Other than previously listed, have any of the following happened to you? (You will be asked to provide details about each financial obligation that pertains to the items identified below)',
      para: {
        alimony: '**In the last seven (7) years,** you have been delinquent on alimony or child support payments.',
        judgement: '**In the last seven (7) years,** you had a judgement entered against you. (Include financial obligations for which you were the sole debtor, as well as those for which you were a cosigner or guarantor).',
        lien: '**In the last seven (7) years,** you had a lien placed against your property for failing to pay taxes or other debts. (Include financial obligations for which you were the sole debtor, as well as those for which you were a cosigner or guarantor).',
        federal: 'You are currently delinquent on any Federal debt. (Include financial obligations for which you were the sole debtor, as well as those for which you were a cosigner or guarantor).',
        or: 'Or'
      },
      heading: {
        name: 'Provide the name of agency/organization/individual to which debt is/was owed',
        infractions: 'Did/does this financial issue include any of the following: (Check all that apply)',
        accountnumber: 'Provide the associated loan / account number(s) involved',
        propertytype: 'Identify/describe the type of property involved (if any)',
        amount: 'Provide the amount (in U.S. dollars) of the financial issue',
        reason: 'Provide the reason(s) for the financial issue',
        status: 'Provide the current status of the financial issue',
        date: 'Provide the date the financial issue began',
        resolved: 'Provide the date the financial issue was resolved',
        courtname: 'Provide the name of the court involved',
        courtaddress: 'Provide the address of the court involved',
        description: 'Provide a description of any action(s) you have taken to satisfy this debt (such as withholdings, frequency and amount of payments, etc.). If you have not taken any provide explanation.'
      },
      label: {
        notresolved: 'Not resolved',
        estimated: 'Estimated'
      },
      placeholder: {
        amount: '10000'
      },
      help: {
        branch: {
          title: 'Need help with delinquent payments?',
          message: 'If you have had in of the listed items happen to you then select "Yes"',
          note: ''
        },
        name: {
          title: 'Need help with the name of the agency, organization, or individual?',
          message: 'Provide the name of the agency, organization, or individual',
          note: ''
        },
        infractions: {
          title: 'Need help with types of financial issues?',
          message: 'Select all of the financial issues which applies to this issue',
          note: ''
        },
        accountnumber: {
          title: 'Need help with the associated loan or account number(s)?',
          message: 'Provide the associated loan or account number(s)',
          note: ''
        },
        propertytype: {
          title: 'Need help with the type of property?',
          message: 'Provide a description of the type of property involved, if any',
          note: ''
        },
        amount: {
          title: 'Need help with the financial issue amount?',
          message: 'Provide the approximate amount of the financial issue',
          note: ''
        },
        reason: {
          title: 'Need help with the reason(s) for the financial issue?',
          message: 'Provide the reason(s) for the financial issue',
          note: ''
        },
        status: {
          title: 'Need help with the current status?',
          message: 'Provide a description of the current status of the financial issue',
          note: ''
        },
        date: {
          title: 'Need help with the beginning date?',
          message: 'Provide the approximate date the financial issue began',
          note: ''
        },
        resolved: {
          title: 'Need help with the resolved date?',
          message: 'Provide the approximate date, if available, the financial issue was resolved',
          note: ''
        },
        courtname: {
          title: 'Need help with the court name?',
          message: 'Provide the name of the court involved',
          note: ''
        },
        courtaddress: {
          title: 'Need help with the court address?',
          message: 'Provide the address of the court involved',
          note: ''
        },
        description: {
          title: 'Need help providing a description?',
          message: 'Provide a description or explanation taken concerning this issue',
          note: ''
        }
      },
      collection: {
        summary: {
          title: 'Summary of delinquent payment issues',
          unknown: 'Provide your delinquent payment details below',
          item: 'Service'
        },
        appendTitle: 'Other than previously listed, are there any other instances of the following occurrences?',
        appendMessage: 'If yes use the button below to add another payment issue',
        append: 'Add another payment issue'
      }
    },
    nonpayment: {
      title: 'Other than previously listed, have any of the following happened?',
      para: {
        repo: '**In the last seven (7) years,** you had any possessions or property voluntarily or involuntarily repossessed or foreclosed? (Include financial obligations for which you were the sole debtor, as well as those for which you were a cosigner or guarantor).',
        defaulted: '**In the last seven (7) years,** you defaulted on any type of loan? (Include financial obligations for which you were the sole debtor, as well as those for which you were a cosigner or guarantor).',
        collections: '**In the last seven (7) years,** you had bills or debts turned over to a collection agency? (Include financial obligations for which you were the sole debtor, as well as those for which you were a cosigner or guarantor).',
        cancelled: '**In the last seven (7) years,** you had any account or credit card suspended, charged off, or cancelled for failing to pay as agreed? (Include financial obligations for which you were the sole debtor, as well as those for which you were a cosigner or guarantor).',
        evicted: '**In the last seven (7) years,** you were evicted for non-payment?',
        garnished: '**In the last seven (7) years,** you had your wages, benefits, or assets garnished or attached for any reason?',
        delinquent: '**In the last seven (7) years,** you have been over 120 days delinquent on any debt not previously entered? (Include financial obligations for which you were the sole debtor, as well as those for which you were a cosigner or guarantor).',
        any: 'You are currently over 120 days delinquent on any debt? (Include financial obligations for which you were the sole debtor, as well as those for which you were a cosigner or guarantor).',
        or: 'Or'
      },
      heading: {
        name: 'Provide the name of agency/organization/individual to which debt is/was owed',
        infractions: 'Did/does this financial issue include any of the following: (Check all that apply)',
        accountnumber: 'Provide the associated loan / account number(s) involved',
        propertytype: 'Identify/describe the type of property involved (if any)',
        amount: 'Provide the amount (in U.S. dollars) of the financial issue',
        reason: 'Provide the reason(s) for the financial issue',
        status: 'Provide the current status of the financial issue',
        date: 'Provide the date the financial issue began',
        resolved: 'Provide the date the financial issue was resolved',
        description: 'Provide a description of any action(s) you have taken to satisfy this debt (such as withholdings, frequency and amount of payments, etc.). If you have not taken any provide explanation.'
      },
      label: {
        notresolved: 'Not resolved',
        estimated: 'Estimated'
      },
      placeholder: {
        amount: '10000'
      },
      help: {
        branch: {
          title: 'Need help with nonpayment consequences?',
          message: 'If you have had in of the listed items happen to you then select "Yes"',
          note: ''
        },
        name: {
          title: 'Need help with the name of the agency, organization, or individual?',
          message: 'Provide the name of the agency, organization, or individual',
          note: ''
        },
        infractions: {
          title: 'Need help with types of financial issues?',
          message: 'Select all of the financial issues which applies to this issue',
          note: ''
        },
        accountnumber: {
          title: 'Need help with the associated loan or account number(s)?',
          message: 'Provide the associated loan or account number(s)',
          note: ''
        },
        propertytype: {
          title: 'Need help with the type of property?',
          message: 'Provide a description of the type of property involved, if any',
          note: ''
        },
        amount: {
          title: 'Need help with the financial issue amount?',
          message: 'Provide the approximate amount of the financial issue',
          note: ''
        },
        reason: {
          title: 'Need help with the reason(s) for the financial issue?',
          message: 'Provide the reason(s) for the financial issue',
          note: ''
        },
        status: {
          title: 'Need help with the current status?',
          message: 'Provide a description of the current status of the financial issue',
          note: ''
        },
        date: {
          title: 'Need help with the beginning date?',
          message: 'Provide the approximate date the financial issue began',
          note: ''
        },
        resolved: {
          title: 'Need help with the resolved date?',
          message: 'Provide the approximate date, if available, the financial issue was resolved',
          note: ''
        },
        description: {
          title: 'Need help providing a description?',
          message: 'Provide a description or explanation taken concerning this issue',
          note: ''
        }
      },
      collection: {
        summary: {
          title: 'Summary of non-payment issues',
          unknown: 'Provide your non-payment details below',
          item: 'Service'
        },
        appendTitle: 'Other than previously listed, are there any other instances of the following occurrences?',
        appendMessage: 'If yes use the button below to add another non-payment or excessive late payment',
        append: 'Add another non-payment or excessive late payment'
      }
    }
  },

  citizenship: {
    tour: {
      para: 'Take a guided tour through the section'
    },
    review: {
      para: 'View all the sections associated with citizenship at once'
    },
    destination: {
      review: 'Review Citizenship',
      status: 'Citizenship status',
      multiple: 'Dual/multiple citizenship'
    },
    status: {
      heading: {
        title: 'Citizenship Status',
        citizenshipstatus: 'Provide your current citizenship status',
        abroad: 'Provide type of documentation of U.S. citizen born abroad',
        documentnumber: {
          foreignborn: 'Provide document number for U.S. citizen born abroad',
          notcitizen: 'Provide document number'
        },
        documentissued: 'Provide the date the document was issued',
        placeissued: 'Provide the place of issuance',
        documentname: 'Provide the name in which document was issued',
        certificatenumber: {
          foreignborn: 'Provide your Certificate of Citizenship number',
          naturalized: 'Provide your Certificate of Naturalization number (N550 or N570)',
          derived: 'Provide your Certificate of Citizenship number (N560 or N561)'
        },
        certificateissued: {
          foreignborn: 'Provide the date the certificate was issued',
          naturalized: 'Provide the date the Certificate of Naturalization was issued',
          derived: 'Provide the date the certificate was issued'
        },
        certificatename: {
          foreignborn: 'Provide the name in which the certificate was issued',
          naturalized: 'Provide the name in which the Certificate of Naturalization was issued',
          derived: 'Provide the name in which the document was issued'
        },
        certificatecourtname: 'Provide the name of the court that issued the Certificate of Naturalization',
        certificatecourtaddress: 'Provide the address of the court that issued the Certificate of Naturalization',
        bornonmilitaryinstallation: 'Were you born on a U.S. military installation?',
        militarybase: 'Provide the name of the base',
        entrydate: 'Provide the date of entry into the U.S.',
        entrylocation: 'Provide the location of entry into the U.S.',
        priorcitizenship: {
          naturalized: 'Provide country(ies) of prior citizenship',
          notcitizen: 'Provide your countr(ies) of citizenship'
        },
        hasalienregistration: 'Do/did you have a U.S. alien registration number?',
        alienregistrationnumber: {
          naturalized: 'Provide your U.S. alien registration number on Certificate of Naturalization USCIS, CIS, or INS registration, I-551, I-766',
          derived: 'Provide your alien registration number (on Certificate of Citizenship - utilize USCIC, CIS, or INS regristration number)',
          notcitizen: 'Provide your alien registration number (I-551, I-766)'
        },
        alienregistrationexpiration: 'Provide document expiration date (I-776 ONLY)',
        basis: {
          naturalized: 'Provide the basis of naturalization',
          derived: 'Provide the basis of derived citizenship'
        },
        permanentresidentcardnumber: 'Provide your Permanent Resident Card number (I-551)',
        residencestatus: 'Provide your residence status',
        documentexpiration: 'Provide document expiration date',
        documenttype: 'Provide type of document issued'
      },
      label: {
        citizenshipstatus: {
          citizen: 'I am a U.S. citizen or national by birth in the U.S. or U.S. territory/commonwealth',
          foreignborn: 'I am a U.S. citizen or national by birth, born to U.S. parent(s), in a foreign country',
          naturalized: 'I am a naturalized U.S. citizen',
          derived: 'I am a derived U.S. citizen',
          notcitizen: 'I am not a U.S. citizen'
        },
        abroad: {
          fs240: 'FS-240',
          ds1350: 'DS-1350',
          fs545: 'FS-545',
          other: 'Other'
        },
        basis: {
          naturalized: 'Based on my own individual naturalization application',
          derived: 'By operation of law through my U.S. citizen parent',
          other: 'Other'
        },
        documenttype: {
          i94: 'I-94',
          visa: 'U.S. Visa',
          i20: 'I-20',
          ds2019: 'DS-2019',
          other: 'Other'
        }
      },
      help: {
        citizenshipstatus: {
          title: 'Need help with your citizenship status?',
          message: 'Select the box that reflects your current citizenship status',
          note: ''
        },
        abroad: {
          title: 'Need help with documentation of U.S. citizen born abroad?',
          message: 'Select the type of documentation',
          note: ''
        },
        documentnumber: {
          title: 'Need help with the document number?',
          message: 'Provide the document number',
          note: ''
        },
        documentissued: {
          title: 'Need help with the date the documentation was issued?',
          message: 'Provide the approximate date the documenation was issued',
          note: ''
        },
        placeissued: {
          title: 'Need help with the place the documentation was issued?',
          message: 'Provide the place where the documentation was issued',
          note: ''
        },
        documentname: {
          title: 'Need help with the name on the documentation?',
          message: 'Provide the name on the documentation',
          note: ''
        },
        certificatenumber: {
          title: 'Need help with the certificate number?',
          message: 'Provide the certificate number',
          note: ''
        },
        certificateissued: {
          title: 'Need help with the date the certificate was issued?',
          message: 'Provide the approximate date the certificate was issued',
          note: ''
        },
        certificatename: {
          title: 'Need help with the name on the certificate?',
          message: 'Provide the name on the certificate',
          note: ''
        },
        bornonmilitaryinstallation: {
          title: 'Need help with if you were born on a military installation?',
          message: 'If you were born on a military installation select "yes"',
          note: ''
        },
        militarybase: {
          title: 'Need help with military base?',
          message: 'Provide the name of the military base',
          note: ''
        },
        entrydate: {
          title: 'Need help with the date of entry in to the U.S.?',
          message: 'Provide the approximate date of entry',
          note: ''
        },
        entrylocation: {
          title: 'Need help with the location of entry?',
          message: 'Provide the location of entry in to the U.S.',
          note: ''
        },
        priorcitizenship: {
          title: 'Need help with prior citizenship(s)?',
          message: 'Provide any prior citizenships',
          note: ''
        },
        hasalienregistration: {
          title: 'Need help if you have an alien registration number?',
          message: 'If you have an alien registration number select "Yes"',
          note: ''
        },
        alienregistrationnumber: {
          title: 'Need help with your alien registration number?',
          message: 'Provide the alien registration number',
          note: ''
        },
        alienregistrationexpiration: {
          title: 'Need help with your alien registration expiration date?',
          message: 'Provide the date of expiration for the alien registration',
          note: ''
        },
        certificatecourtname: {
          title: 'Need help with the court name?',
          message: 'Provide the court name',
          note: ''
        },
        certificatecourtaddress: {
          title: 'Need help with address of the court who issued the certificate?',
          message: 'Provide the address of the court who issued the certificate',
          note: ''
        },
        basis: {
          naturalized: {
            title: 'Need help with the basis of naturalization?',
            message: 'Provide the basis of naturalization',
            note: ''
          },
          derived: {
            title: 'Need help with the basis of derived citizenship?',
            message: 'Provide the basis of the derive citizenship',
            note: ''
          }
        },
        permanentresidentcardnumber: {
          title: 'Need help with your permaenent resident card?',
          message: 'Provide your permanent resident card number',
          note: ''
        },
        residencestatus: {
          title: 'Need help with your residence status?',
          message: 'Provide your residence status',
          note: ''
        },
        documentexpiration: {
          title: 'Need help with the documentation expiration date?',
          message: 'Provide the approximate date of expiration',
          note: ''
        },
        documenttype: {
          title: 'Need help with the type of documentation?',
          message: 'Provide the type of documentation',
          note: ''
        }
      }
    },

    multiple: {
      heading: {
        title: 'Dual/Multiple citizenship & foreign passport information',
        hasmultiple: 'Do you now or have you EVER held dual/multiple citizenships',
        citizenship: {
          country: 'Provide country of citizenship',
          dates: 'Provide the date range that you held this citizenship, beginning with the date it was acquired through its termination or "Present," whichever is appropriate',
          how: 'How did ou acquire this non-U.S. citizenship you now have or previously had?',
          renounced: 'Have you taken any action to renounce your foreign citizenship?',
          renouncedexplanation: 'Provide explanation',
          current: 'Do you currently hold citizenship with this country?',
          currentexplanation: 'Provide explanation'
        },
        hasforeignpassport: 'Have you EVER been issued a passport (or identity card for travel) by a country other than the U.S.?',
        passport: {
          country: 'Provide the country in which the passport (or identity card) was issued',
          issued: 'Provide the date the passport (or identity card) was issued',
          location: 'Provide the place the passport (or identity card) was issued',
          name: 'Provide the name in which passport (or identity card) was issued',
          number: 'Provide the passport (or identity card) number',
          expiration: 'Provide the passport (or identity card) expiration date',
          used: 'Have you EVER used this passport (or identity card) for foreign travel?'
        },
        travel: {
          country: 'Provide the country to which you traveled on this passport (or identity card)',
          dates: 'Provide the dates involved'
        }
      },
      collection: {
        citizenship: {
          summary: {
            title: 'Summary of dual/multiple citizenships',
            item: 'Country',
            unknown: 'Provide citizenship details below'
          },
          appendTitle: 'Do you have an additional citizenship to provide?',
          appendMessage: 'If yes use the button below to add another',
          append: 'Add another citizenship'
        },
        passport: {
          summary: {
            title: 'Summary of foreign passports',
            item: 'Country',
            unknown: 'Provide passport details below'
          },
          appendTitle: 'Do you have an additional foreign passport (or identity card) to report?',
          appendMessage: 'If yes use the button below to add another foreign passport',
          append: 'Add another foreign passport'
        },
        travel: {
          summary: {
            title: 'Summary of foreign travel',
            item: 'Country',
            unknown: 'Provide travel details below'
          },
          append: 'Add another foreign travel'
        }
      },
      help: {
        hasmultiple: {
          title: 'Need help with multilpe citizenships?',
          message: 'If you have ever had a non-U.S. citizenship then select "yes"',
          note: ''
        },
        citizenship: {
          country: {
            title: 'Need help with the country?',
            message: 'Provide the country',
            note: ''
          },
          dates: {
            title: 'Need help with the dates?',
            message: 'Provide the dates',
            note: ''
          },
          how: {
            title: 'Need help with the how you acquired this citizenship?',
            message: 'Provide the how you acquired this citizenship',
            note: ''
          },
          renounced: {
            title: 'Need help with the renouncement?',
            message: 'If you have renounced this citizenship select "yes"',
            note: ''
          },
          renouncedexplanation: {
            title: 'Need help explaining your renouncement?',
            message: 'Provide the explanation for the renouncement',
            note: ''
          },
          current: {
            title: 'Need help with the current citizenship?',
            message: 'If you still retain citizenship select "yes"',
            note: ''
          },
          currentexplanation: {
            title: 'Need help explaining your current citizenship?',
            message: 'Provide the explanation for the current citizenship',
            note: ''
          }
        },
        hasforeignpassport: {
          title: 'Need help with foreign passports or identity cards?',
          message: 'If you have ever had a foreign passport or identity card then select "yes"',
          note: ''
        },
        passport: {
          country: {
            title: 'Need help with the country?',
            message: 'Provide the country',
            note: ''
          },
          issued: {
            title: 'Need help with the dates issued?',
            message: 'Provide the approximate date the item was issued',
            note: ''
          },
          location: {
            title: 'Need help with the place it was issued?',
            message: 'Provide the location the passport (or identity card) was issued',
            note: ''
          },
          name: {
            title: 'Need help with the name?',
            message: 'Provide the name on the passport (or identity card)',
            note: ''
          },
          number: {
            title: 'Need help with the passport number?',
            message: 'Provide the passport (or identity card) number',
            note: ''
          },
          expiration: {
            title: 'Need help with the expiration date?',
            message: 'Provide the approximate date the item expires',
            note: ''
          },
          used: {
            title: 'Need help determining if the passport was used?',
            message: 'If you have used the passport for travel then select "yes"',
            note: ''
          }
        },
        travel: {
          country: {
            title: 'Need help with the country?',
            message: 'Provide the country',
            note: ''
          },
          dates: {
            title: 'Need help with the dates?',
            message: 'Provide the dates',
            note: ''
          }
        }
      }
    }
  },

  relationships: {
    tour: {
      para: 'Take a guided tour through the section'
    },
    review: {
      para: 'View all the sections associated with relationships at once'
    },
    destination: {
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
        appendMessage: 'If **Yes** use the button below to add another',
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
          maiden: 'Maiden name?',
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
        },
        maiden: {
          same: 'Same as listed',
          diff: 'Different name'
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
    },
    marital: {
      heading: {
        title: 'Provide your current marital/relationship status with regard to civil marriage, legally recognized civil union, or legally recognized domestic partnership.'
      },
      label: {
        status: {
          never: 'Never entered into a civil marriage, legally recognized civil union, or legally recognized domestic partnership',
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
        name: 'Provide full name',
        birthdate: 'Provide birthdate',
        birthplace: 'Provide place of birth',
        foreignBornDocument: 'If the person is foreign born, provide one type of documentation that he or she possesses and the document number.',
        ssn: 'Provide U.S. Social Security Number',
        othernames: 'Provide other names used',
        address: 'Provide current address, if different than your current address',
        telephone: 'Provide telephone number',
        email: 'Provide email address',
        separated: 'Are you separated?',
        dateSeparated: 'Provide date of separation',
        enteredCivilUnion: 'Provide date when you entered into your civil marriage, civil union, or domestic partnership.',
        locationSeparated: 'If legally separated, provide the location of the record',
        divorced: 'Do you have a person from whom you are divorced/dissolved, annulled, or widowed to report?',
        addressSeparated: 'If legally separated, provide the location of the record.'
      },
      notApplicable: {
        or: 'Or',
        label: 'Not applicable'
      },
      para: {
        never: 'Complete the following about the person with whom you are in a civil marriage, legally recognized civil union, or legally recognized domestic partnership, or the person from whom you are currently separated.',
        othernames: 'Such as maiden name, names by other marriages, civil marriages, legally recognized civil unions, or legally recognized domestic partnerships, nicknames, etc., and provide dates used for each name.'
      },
      label: {
        birthplace: 'Was this person born in the United States of America?'
      },
      divorce: {
        heading: {
          name: 'Provide the full name',
          address: 'Provide location',
          birthdate: 'Provide birthdate',
          telephone: 'Provide telephone number',
          birthplace: 'Provide the place of birth.',
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
          birthplace: 'Was this person born in the United States of America'
        },
        deceased: {
          label: {
            yes: 'Yes',
            no: 'No',
            dontKnow: 'I don\'t know'
          }
        },
        collection: {
          description: '',
          appendTitle: 'Do you have any additional person(s) from whom you are divorced/dissolved, annulled, or widowed to report?',
          appendMessage: 'If yes please use the button below to add another person',
          appendLabel: 'Add another person',
          itemType: 'Person'
        },
        help: {
          birthdate: {
            title: 'Need help with the birthdate?',
            message: 'Provide the date of birth',
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
            message: 'Provide the address of the person',
            note: ''
          },
          dateDivorced: {
            title: 'Need help with providing date divorced/dissolved?',
            message: 'Provide the date divorced/dissolved, annulled or widowed',
            note: ''
          }
        }
      },
      othernames: {
        heading: {
          maiden: 'Provide maiden name',
          used: 'Provide dates name was used'
        }
      },
      help: {
        address: {
          title: 'Need help with the marital address?',
          message: 'Provide the last known address ',
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
          title: 'Need help with the date of separation?',
          message: 'Provide the date of separation',
          note: ''
        },
        birthdate: {
          title: 'Need help with the birthdate?',
          message: 'Provide the date of birth',
          note: ''
        },
        birthplace: {
          title: 'Need help with the birth place?',
          message: 'Provide the place of birth',
          note: ''
        },
        foreignBornDocument: {
          title: 'Need help with selecting the appropriate documentation?',
          message: 'If the person is foreign born, provide one type of documentation that he or she possesses and the document number',
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
        }
      }
    },
    cohabitant: {
      heading: {
        hasCohabitant: 'Do you presently reside with a person, other than a spouse or legally recognized civil union/domestic partner, with whom you share bonds of affection, obligation, or other commitment, as opposed to a person with whom you live for reasons of convenience?',
        name: 'Provide the cohabitant full name',
        address: 'Provide location',
        birthdate: 'Provide birthdate',
        telephone: 'Provide telephone number',
        birthplace: 'Provide the place of birth.',
        foreignBornDocument: 'If the person is foreign born, provide one type of documentation that he or she possesses and the document number.',
        ssn: 'Provide your cohabitant’s U.S. Social Security Number.',
        othernames: 'Provide other names used by your cohabitant (such as maiden name, names by other marriages, etc., and provide dates each name was used)',
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
          maiden: 'Provide maiden name',
          used: 'Provide dates name was used'
        }
      },
      label: {
        divorced: 'Divorced/Dissolved',
        widowed: 'Widowed',
        annulled: 'Annulled',
        birthplace: 'Was this person born in the United States of America'
      },
      collection: {
        description: '',
        appendTitle: 'Do you have an additional cohabitant to report?',
        appendMessage: 'If yes please use the button below to add another cohabitant.',
        appendLabel: 'Add another cohabitant',
        itemType: 'Cohabitant'
      },
      help: {
        birthdate: {
          title: 'Need help with the birthdate?',
          message: 'Provide the date of birth',
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
          message: 'Provide the address of the person',
          note: ''
        },
        dateDivorced: {
          title: 'Need help with providing date divorced/dissolved?',
          message: 'Provide the date divorced/dissolved, annulled or widowed',
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
          title: 'Need help with when cohabitation began?',
          message: 'Provide date cohabitation residing with person began',
          note: ''
        },
        hasCohabitant: {
          title: 'Need help with when deciding if you have had a cohabitant?',
          message: 'Mark yes if you presently reside with a person, other than a spouse or legally recognized civil union/domestic partner, with whom you share bonds of affection, obligation, or other commitment, as opposed to a person with whom you live for reasons of convenience',
          note: ''
        }
      }
    },
    people: {
      heading: {
        title: 'People know who you well'
      },
      label: {
        unit: 'People added'
      },
      summaryProgress: {
        title: 'People who know you well 7 year coverage',
        unit: 'Years'
      },
      para: {
        intro: '### Provide three people who know you well and who preferably live in the U.S.\n\nThey should be friends, peers, colleagues, college roommates, associates, etc., who are collectively aware of your activities outside of your workplace, school, or neighborhood, and whose combined association with you **covers at least the last seven (7) years.**\n\n **Do not list your spouse, former spouse (s), other relatives, or anyone listed elsewhere on this form.**'
      },
      person: {
        heading: {
          knownDates: 'Provide dates known',
          name: 'Provide full name',
          rank: 'Provide rank/title',
          relationship: 'Provide relationship to you',
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
            landlord: 'Landlord',
            business: 'Business',
            other: 'Other'
          }
        },
        help: {
          knownDates: {
            title: 'Need help with known dates',
            message: 'Provide the dates known for the person who knows you well',
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
            title: 'Need help with the address?',
            message: 'Provide the address for the person who knows you well',
            note: ''
          }
        },
        collection: {
          summary: {
            unknown: 'Provide the person\'s information below'
          },
          appendLabel: 'Add another person',
          appendMessage: 'If yes use the button below to add another instance',
          appendTitle: 'Do you have an additional person who knows you well to list?',
          itemType: 'Person'
        }
      }
    }
  },

  address: {
    label: 'This address is',
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
        label: 'ZIP Code',
        placeholder: 'Enter ZIP Code'
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
        label: 'ZIP Code',
        placeholder: 'Enter ZIP Code'
      },
      apoFpo: {
        label: 'APO/FPO State Code',
        placeholder: 'Enter state code (AA, AE, AP)'
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
      dismiss: 'Use this address instead',
      alternate: 'Manually correct this address'
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
        caption: 'Where you have lived',
        summary: {
          title: 'Summary of places you have lived',
          item: 'Address',
          unknown: 'Provide residence details',
          incomplete: 'This residence\'s information is incomplete',
          item2: 'Person'
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
          caption: 'Employment activities',
          append: 'Add another employer',
          summary: {
            title: 'Summary of your work history',
            employer: 'Employer',
            incomplete: 'This employer\'s information is incomplete',
            unknown: 'Provide employer details',
            item2: 'Title'
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
            usphs: 'USPHS Commissioned Corps',
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
          branch: 'For this employment have any of the following happened to you in the last seven (7) years?',
          append: 'In the last seven (7) years do you have another reason for leaving to report for this employment?',
          list: [
            '- Fired',
            '- Quit after being told you would be fired',
            '- Left by mutual agreement following charges or allegations of misconduct',
            '- Left by mutual agreement following notice of unsatisfactory performance'
          ],
          comments: 'Provide any additional comments for why you left this employment activity',
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
          }
        },
        reprimand: {
          label: 'For this employment, in the last seven (7) years have you received a written warning, been officially reprimanded, suspended, or disciplined for misconduct in the workplace, such as a violation of security policy?',
          append: 'Do you have another instance of discipline or a warning to provide?',
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
        caption: 'Where you went to school',
        school: {
          summary: {
            title: 'Summary of education',
            item: 'School',
            unknown: 'Provide your education details',
            incomplete: 'This education\'s information is incomplete',
            item2: 'Diploma'
          },
          append: 'Add another school'
        },
        diploma: {
          summary: {
            title: 'Summary of degrees/diplomas',
            item: 'Degree',
            unknown: 'Provide your degree/diploma details'
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
      activities: {
        direct: 'Direct control',
        indirect: 'Indirect conttrol',
        realestate: 'Real estate purchase',
        benefits: 'Foreign benefits',
        support: 'Foreign national support'
      },
      business: {
        advice: 'Support provided',
        family: 'Immediate family foreign support',
        employment: 'Employment',
        ventures: 'Other business ventures',
        events: 'Event participation',
        contact: 'Immediate family contact',
        sponsorship: 'Foreign national sponsorship',
        political: 'Held political office',
        voting: 'Voting'
      },
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
      name: 'Provide the name in which passport was first issued',
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
    },
    activities: {
      direct: {
        heading: {
          title: 'Have you, your spouse or legally recognized civil union/domestic partner, cohabitant, or dependent children EVER had any foreign financial interests in which you or they have direct control or direct ownership?'
        },
        para: {
          intro: 'Foreign financial interest examples:  stocks, property, investments, bank accounts, ownership of corporate entities, corporate interests or exchange traded funds (ETFs) held in specific geographical or economic sectors.\n\n**Exclude financial interests in companies or diversified mutual funds or diversified ETFs that are publicly traded on a U.S. exchange.**'
        },
        collection: {
          summary: 'Provide your direct financial interests here',
          description: 'Summary of financial interests',
          appendTitle: 'Do you, your spouse or legally recognized civil union/domestic partner, cohabitant, or dependent children have any additional foreign financial interests?',
          appendMessage: 'If yes use the button below to add another interest.',
          appendLabel: 'Add another interest',
          itemType: 'Interest'
        },
        interest: {
          para: {
            checkAll: 'Check all that apply',
            howAcquired: 'Such as purchase, gift, etc.'
          },
          heading: {
            interestTypes: 'Specify',
            interestType: 'Provide the type of financial interest',
            acquired: 'Provide the date acquired',
            howAcquired: 'Provide how the financial interest was acquired',
            cost: 'Provide the cost (in U.S. dollars) at time of acquisition',
            value: 'Provide the current value (in U.S. dollars) or the value at the time control or ownership was sold, lost or otherwise disposed of.',
            relinquished: 'Provide the date control or ownership was relinquished.',
            explanation: 'Provide explanation of how interest control or ownership was sold, lost or otherwise disposed of. '
          },
          label: {
            relinquishedNotApplicable: 'Not applicable',
            or: 'or',
            interestTypes: {
              yourself: 'Yourself',
              spouse: 'Spouse or legally recognized civil union/domestic partner',
              cohabitant: 'Cohabitant',
              dependentChildren: 'Dependent children'
            }
          },
          help: {
            interestTypes: {
              title: 'Need help with the interest type field?',
              message: 'Check all that apply',
              note: ''
            },
            interestType: {
              title: 'Need help with the direct interest type?',
              message: 'Provide the type of financial interest',
              note: ''
            },
            acquired: {
              title: 'Need help with when the interest was acquired?',
              message: 'Provide the date acquired',
              note: ''
            },
            howAcquired: {
              title: 'Need help with how the interest was acquired?',
              message: 'Provide how the financial interest was acquired',
              note: ''
            },
            cost: {
              title: 'Need help with the cost?',
              message: 'Provide the cost (in U.S. dollars) at time of acquisition',
              note: ''
            },
            value: {
              title: 'Need help with the value?',
              message: 'Provide the current value (in U.S. dollars) or the value at the time control or ownership was sold, lost or otherwise disposed of.',
              note: ''
            },
            relinquished: {
              title: 'Need help with date reqlinquished?',
              message: 'Provide the date control or ownership was relinquished',
              note: ''
            },
            explanation: {
              title: 'Need help with this field?',
              message: 'Provide explanation of how interest control or ownership was sold, lost or otherwise disposed of.',
              note: ''
            }
          },
          coOwner: {
            heading: {
              name: 'Provide full name of co-owner',
              address: 'Provide co-owner current address',
              countries: 'Provide co-owner’s country(ies) of citizenship',
              relationshipNature: 'Provide the nature of your relationship with the co-owner'
            },
            label: {
              address: 'This address is'
            },
            help: {
              countries: {
                title: 'Need help with co-owners countries of citizenship?',
                message: 'Provide the co-owners countries of citizenship',
                note: ''
              },
              relationshipNature: {
                title: 'Need help with the nature of the relationship?',
                message: 'Provide the nature of your relationship with the co-owner',
                note: ''
              }
            }
          },
          coOwners: {
            heading: {
              hasCoOwners: 'Are there any co-owners of this foreign financial interest?',
              hasCoOwnersAppend: 'Are there any additional co-owners of this foreign financial interest?'
            }
          }
        }
      }
    },
    contacts: {
      heading: {
        title: 'Do you have, or have you had, close and/or continuing contact with a foreign national within the last seven (7) years with whom you, or your spouse, or legally recognized civil union/domestic partner, or cohabitant are bound by affection, influence, common interests, and/or obligation?',
        name: 'Provide the full name of the foreign national, if known',
        firstcontact: 'Provide the approximate date of first contact',
        lastcontact: 'Provide the approximate date of last contact',
        methods: 'Provide methods of contact',
        frequency: 'Provide approximate frequency of contact',
        relationship: 'Provide the nature of relationship',
        aliases: 'Has this foreign national used any other names and/or nicknames?',
        aliases2: 'Any additional other names and/or nicknames for this foreign national?',
        aliasname: 'Provide the other name or nickname',
        citizenship: 'Provide country(ies) of citizenship',
        birthdate: 'Provide date of birth',
        birthplace: 'Provide place of birth',
        address: 'Provide current address',
        employer: 'Provide the name of the foreign national\'s current employer, or provide the name of their most recent employer if not currently employed',
        employeraddress: 'Provid the address of the foreign national\'s current employer, or provide the address of their most recent employer if not currently employed',
        hasaffiliations: 'Is this foreign national affiliated with a foreign government, military, security, defense industry, or intelligence service?',
        affiliations: 'Describe the contact\'s relationship with the foreign government, military, security, defense industry, or intelligence service',
        explanation: 'Explanation'
      },
      para: {
        includes: 'Include associates as well as relatives, not previously listed in the relatives section.',
        definition: 'A foreign national is defined as any person who is not a citizen or national of the U.S.',
        or: 'Or',
        checkall: 'Check all that apply'
      },
      label: {
        idk: 'I don\'t know',
        inperson: 'In person',
        telephone: 'Telephone',
        electronic: [
          'Electronic',
          '(such as e-mail, texting, chat rooms, etc)'
        ],
        written: 'Written correspondence',
        daily: 'Daily',
        weekly: 'Weekly',
        monthly: 'Monthly',
        quarterly: 'Quarterly',
        annually: 'Annually',
        professional: 'Professional or business',
        personal: [
          'Personal',
          '(such as family ties, friendship, affection, common interests, etc)'
        ],
        obligation: [
          'Obligation',
          '(provide explanation)'
        ],
        other: [
          'Other',
          '(provide explanation)'
        ]
      },
      help: {
        branch: {
          title: 'Need help determining if you know any foreign nationals?',
          message: 'If you know anyone who is not a U.S. citizen or national then please click "yes"',
          note: 'Note: A foreign national is defined as any person who is not a citizen or national of the U.S.'
        },
        firstcontact: {
          title: 'Need help with the date of your first contact?',
          message: 'Provide the approximate date of our first contact with the individual',
          note: ''
        },
        lastcontact: {
          title: 'Need help with the date of your last contact?',
          message: 'Provide the approximate date of the last contact you had with the individual',
          note: ''
        },
        methods: {
          title: 'Need help with the methods of your communication?',
          message: 'Check all the communication methods you may use in your correspondence',
          note: ''
        },
        frequency: {
          title: 'Need help with the frequency of your communication?',
          message: 'Select the appropriate frequency of your correspondence',
          note: ''
        },
        relationship: {
          title: 'Need help with your relationship with this foreign national?',
          message: 'Check all the which apply to your relationship with the individual',
          note: ''
        },
        aliases: {
          title: 'Need help with any other names or nicknames?',
          message: 'If you are aware of any nicknames or other names the individual may have used then pleas provide them',
          note: ''
        },
        citizenship: {
          title: 'Need help with their citizenship?',
          message: 'Provide one or more citizenships the foreign natural has',
          note: ''
        },
        birthdate: {
          title: 'Need help with their date of birth?',
          message: 'Provide the approximate date of birth of the individual',
          note: 'Note: If you do not know then you may select "I don\'t know"'
        },
        birthplace: {
          title: 'Need help with their place of birth?',
          message: 'Provide the place of birth of the individual',
          note: 'Note: If you do not know then you may select "I don\'t know"'
        },
        address: {
          title: 'Need help with their current address?',
          message: 'Provide their most recent address',
          note: 'Note: If you do not know then you may select "I don\'t know"'
        },
        employer: {
          title: 'Need help with the employer?',
          message: 'Provide the name of their most recent employer',
          note: 'Note: If you do not know then you may select "I don\'t know"'
        },
        employeraddress: {
          title: 'Need help with the employer address?',
          message: 'Provide the address of their most recent employer',
          note: 'Note: If you do not know then you may select "I don\'t know"'
        },
        hasaffiliations: {
          title: 'Does this person have any affiliations?',
          message: 'If the person has a relationship with a foreign government, military, security, defense industry, or intelligence service then select "yes"',
          note: ''
        },
        affiliations: {
          title: 'Need help describing their affiliations?',
          message: 'Describe the individuals relationship(s) with the foreign affiliations',
          note: ''
        }
      },
      collection: {
        summary: {
          title: 'Summary of foreign contacts',
          item: 'Foreign national',
          unknown: 'Provide the foreign national below'
        },
        appendTitle: 'Do you have, or have you had, close and/or continuing contact with any additional foreign national within the last seven (7) years with whom you, or your spouse, or cohabitant are bound by affection, influence, common interests, and/or obligation?',
        appendMessage: [
          'Include associates as well as relatives, not previously listed in the relatives section.',
          'If yes use the button below to add another association.'
        ],
        append: 'Add another association'
      }
    },

    business: {
      advice: {
        heading: {
          title: 'Have you in the last seven (7) years provided advice or support to any individual associated with a foreign business or other foreign organization that you have not previously listed as a former employer?',
          description: 'Provide how the financial interest was acquired',
          name: 'Provide the name of the individual to whom advice or support was provided',
          organization: 'Provide the name of the foreign organization or foreign business with whom the individual is associated',
          country: 'Provide the country of origin for the organization or business',
          dates: 'Provide the date(s) during which this advice or support was provided',
          compensation: 'Describe what compensation, if any, was provided for your service'
        },
        para: {
          branch: 'Provide a description of advice/support provided'
        },
        help: {
          branch: {
            title: 'Need help determining if you have provided advice to foreign businesses?',
            message: 'If you have provided any advice to a foreign individual or business then select "yes"',
            note: 'Note: Answer "no" if **all** your advice or support was authorized pursuant to official U.S. Government business.'
          },
          description: {
            title: 'Need help with the description?',
            message: 'Provide how the support was provided',
            note: ''
          },
          organization: {
            title: 'Need help with the organization name?',
            message: 'Provide the name of the business',
            note: ''
          },
          country: {
            title: 'Need help with the country of origin?',
            message: 'Provide the country where the business is based',
            note: ''
          },
          dates: {
            title: 'Need help with the dates the service was provided?',
            message: 'Provide the approximate date range your services your provided',
            note: ''
          },
          compensation: {
            title: 'Need help with compensation?',
            message: 'Any monetary, favor, trade, or other type of exchange for services render constitutes as compensation',
            note: ''
          }
        },
        collection: {
          summary: {
            title: 'Summary of foreign business advice',
            item: 'Advice',
            unknown: 'Provide details of foreign business advice below'
          },
          appendTitle: 'Have you in the last seven (7) years provided advice or support to any other individual associated with a foreign business or other foreign organization that you have not previously listed as a former employer?',
          appendMessage: [
            'Answer **"No"** if all your advice or support was authorized pursuant to official U.S. Government business.',
            'If yes use the button below to add another interest'
          ],
          append: 'Add another interest'
        }
      },

      family: {
        heading: {
          title: 'Have you, your spouse or legally recognized civil union/domestic partner, cohabitant, or any member of your immediate family in the last seven (7) years been asked to provide advice or serve as a consultant, even informally, by any foreign government official or agency?',
          name: 'Provide the name of the government official',
          agency: 'Provide the name of the agency',
          country: 'Provide the country with which the government official or agency is affiliated',
          date: 'Provide the date of the request',
          circumstances: 'Provide the circumstances of request'
        },
        para: {
          branch: [
            'Answer **"No"** if all the advice or support was authorized pursuant to official U.S. Government business.',
            'If yes use the button below to add another interest'
          ]
        },
        help: {
          branch: {
            title: 'Need help determining if you have provided advice to foreign businesses?',
            message: 'If you have provided any advice to a foreign individual or business then select "yes"',
            note: 'Note: Answer "no" if **all** your advice or support was authorized pursuant to official U.S. Government business.'
          },
          agency: {
            title: 'Need help with the agency name?',
            message: 'Provide the agency name',
            note: ''
          },
          country: {
            title: 'Need help with the affiliated country?',
            message: 'Provide the country the request was affiliated with',
            note: ''
          },
          date: {
            title: 'Need help with the date of the request?',
            message: 'Provide the approximate date the request was made',
            note: ''
          },
          circumstances: {
            title: 'Need help with the circumstances?',
            message: 'Provide all circumstances of the request',
            note: ''
          }
        },
        collection: {
          summary: {
            title: 'Summary of family foreign business advice',
            item: 'Advice',
            unknown: 'Provide details of family foreign business advice below'
          },
          appendTitle: 'Have you, your spouse or legally recognized civil union/domestic partner, cohabitant, or any member of your immediate family in the last seven (7) years been asked to provide advice or serve as a consultant, even informally, by any other foreign government official or agency?',
          appendMessage: [
            'Answer **"No"** if all the advice or support was authorized pursuant to official U.S. Government business.',
            'If yes use the button below to add another interest'
          ],
          append: 'Add another interest'
        }
      },

      employment: {
        heading: {
          title: 'Has any foreign national in the last seven (7) years offered you a job, asked you to work as a consultant, or consider employment with them?',
          name: 'Provide the name of the foreign national who made the offer',
          description: 'Provide a description of the position offered',
          date: 'Provide the date when this offer was extended',
          address: 'Provide the location where this occurred',
          acceptance: 'Did you accept the offer?'
        },
        help: {
          branch: {
            title: 'Need help determining if you were offered a job?',
            message: 'If you were offered a foreign job select "yes"',
            note: ''
          },
          description: {
            title: 'Need help describing the offer?',
            message: 'Describe the position offered.',
            note: ''
          },
          date: {
            title: 'Need help with the date of the offer?',
            message: 'Provide the approximate date the offer was extended to you',
            note: ''
          },
          address: {
            title: 'Need help with the location?',
            message: 'Provide the address of the location where the offer took place',
            note: ''
          },
          acceptance: {
            title: 'Need help with describing the acceptance?',
            message: [
              'If you did not accept the offer please state this.',
              'If you did accept the offer please describe why it was accepted.'
            ],
            note: ''
          }
        },
        collection: {
          summary: {
            title: 'Summary of foreign business job offers',
            item: 'Offer',
            unknown: 'Provide details of foreign business job below'
          },
          appendTitle: 'Has any additional foreign national, in the last seven (7) years, offered you a job, asked you to work a consultant, or consider employment with them?',
          appendMessage: [
            'If yes use the button below to add another interest'
          ],
          append: 'Add another interest'
        }
      },

      ventures: {
        heading: {
          title: 'Have you in the last seven (7) years been involved in any other type of business venture with a foreign national no described above?',
          name: 'Provide the name of the foreign national',
          address: 'Provide the full current address of this foreign national',
          citizenship: 'Provide the citizenship(s) of this foreign national',
          description: 'Provide the description of the business venture',
          relationship: 'Provide your relationship to this foreign national',
          dates: 'Provide the length of time you have been involved in the business venture',
          association: 'Provide the nature of the association with this business venture',
          position: 'Provide the position you held',
          service: 'Provide the service you provided',
          support: 'Provide the financial support involved',
          compensation: 'Provide a description of what compensation was provided for your service'
        },
        para: {
          branch: [
            'Own, co-own, serve as a business consultant, provide financial support, etc.'
          ]
        },
        help: {
          branch: {
            title: 'Need help with the business venture?',
            message: 'If you have, or are currently, associated with a foreign business venture select "yes"',
            note: ''
          },
          address: {
            title: 'Need help with the foreign national\'s address?',
            message: 'Provide the current address of the foreign national',
            note: ''
          },
          citizenship: {
            title: 'Need help with the foreign national\'s citizenship?',
            message: 'Provide the country(ies) the foreign national has citizenship',
            note: ''
          },
          description: {
            title: 'Need help describing the business venture?',
            message: 'Provide an accurate descsription of the business venture',
            note: ''
          },
          relationship: {
            title: 'Need help with the relation to the foreign national?',
            message: 'Provide the relationship to the foreign national',
            note: ''
          },
          dates: {
            title: 'Need help with the dates involved?',
            message: 'Provide the approximate date range you were involved with the business venture',
            note: ''
          },
          association: {
            title: 'Need help with the assocition to the venture?',
            message: 'Provide a description of how you were associated to the business venture',
            note: ''
          },
          position: {
            title: 'Need help with the position?',
            message: 'Provide the position you held',
            note: ''
          },
          service: {
            title: 'Need help with the service provided?',
            message: 'Provide how the service you provided',
            note: ''
          },
          support: {
            title: 'Need help describing the financial support?',
            message: 'Provide any financial support that was provided',
            note: ''
          },
          compensation: {
            title: 'Need help describing the compensation?',
            message: 'Any monetary, favor, trade, or other type of exchange for services render constitutes as compensation',
            note: ''
          }
        },
        collection: {
          summary: {
            title: 'Summary of foreign business ventures',
            item: 'Venture',
            unknown: 'Provide details of foreign business ventures below'
          },
          appendTitle: 'Have you, in the last seven (7) years, been involved in any other type of business venture with a foreign national not described above?',
          appendMessage: [
            'Own, co-own, serve as a business consultant, provide financial support, etc.',
            'If yes use the button below to add another interest'
          ],
          append: 'Add another interest'
        }
      },

      conferences: {
        heading: {
          title: 'Have you in the last seven (7) years attended or participated in any conferences, trade shows, seminars, or meetings outside the U.S.?',
          description: 'Provide the name and description of the event',
          sponsor: 'Provide the name of the sponsoring organization',
          city: 'Provide the city where the event was held',
          country: 'Provide the country where the event was held',
          dates: 'Provide the dates for the event',
          purpose: 'Provide the purpose of the event',
          contact: 'Was there any subsequent contact with any foreign nationals as a result of the event?',
          contact2: 'Do you have another subsequent contact to report for this event?',
          explanation: 'Provide explanation'
        },
        para: {
          branch: [
            'Do not include those you attended or participated in on official business for the U.S. government.'
          ]
        },
        help: {
          branch: {
            title: 'Need help determining if you have been to a foreign conference?',
            message: 'If you have to been to a conference not in the U.S. outside of official U.S. government business select "yes".',
            note: ''
          },
          description: {
            title: 'Need help with the description?',
            message: 'Provide the name of the conference as well as a general description.',
            note: ''
          },
          sponsor: {
            title: 'Need help with the sponsoring organization?',
            message: 'Provide the name(s) of the sponsoring organizations of the conference.',
            note: ''
          },
          city: {
            title: 'Need help with the city?',
            message: 'Provide the city the conference was located.',
            note: ''
          },
          country: {
            title: 'Need help with the country?',
            message: 'Provide the country the conference was located.',
            note: ''
          },
          dates: {
            title: 'Need help with the dates of the conference?',
            message: 'Provide the approximate date range of the conference.',
            note: ''
          },
          purpose: {
            title: 'Need help with the purpose of the conference?',
            message: 'Describe the purpose of the event.',
            note: ''
          },
          contact: {
            title: 'Need help concerning contact with a foreign national?',
            message: 'If you had contact with foreign nationals directly due to the conference select "yes".',
            note: ''
          },
          explanation: {
            title: 'Need help with the explanation?',
            message: 'Describe the circumstances and/or outcome of the contact.',
            note: ''
          }
        },
        collection: {
          summary: {
            title: 'Summary of foreign business conferences',
            item: 'Conference',
            unknown: 'Provide details of conference below'
          },
          appendTitle: 'Have you in the last seven (7) years, attended or participated in any additional conferences, trade shows, seminars, or meetings oustide the U.S.?',
          appendMessage: [
            'Do not include those you attended or participated in on official business for the U.S. government.',
            'If yes use the button below to add another interest.'
          ],
          append: 'Add another interest'
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
        title: 'Need help with the maiden name question?',
        message: 'Select "Yes" if this was your surname used from birth before it was legally changed at marriage.',
        note: ''
      }
    },
    reason: {
      help: {
        title: 'Need help with the explanation?',
        message: 'We want to understand why this other name was used and/or changed.',
        note: 'Examples: Nickname used since birth, changed when married, pen name. '
      }
    },
    used: {
      help: {
        title: 'Need help with the dates used range?',
        message: 'This date range is for the full time period you used the name or people knew you by it.',
        note: 'Example: If the name was used from your birth until the present use your birthdate for "From" and select "Present"'
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
      address: 'Provide street address for this person (including apartment number).',
      or: 'Or'
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
      idk: 'I don\'t know',
      address: 'The address of your contact during this time period'
    },
    name: {
      label: {
        first: 'First name',
        last: 'Last name',
        middle: 'Middle name or initial',
        initialOnly: 'Initial Only',
        noMiddle: 'No middle name',
        other: 'Other',
        suffix: 'Suffix',
        optional: 'Optional',
        jr: 'Jr',
        sr: 'Sr',
        i: 'I',
        ii: 'II',
        iii: 'III',
        iv: 'IV',
        v: 'V',
        vi: 'VI',
        vii: 'VII',
        viii: 'VIII',
        ix: 'IX',
        x: 'X'
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
  },
  psychological: {
    heading: {
      intro: 'Why we are asking',
      competence: 'Has a court or administrative agency ever issued an order declaring you mentally incompetent?',
      consultation: 'Has a court or administrative agency EVER ordered you to consult with a mental health professional?',
      consultation2: '**For example, a psychiatrist, psychologist, licensed clinical social worker, etc.**\n\nAn order to a military member by a superior officer is not within the scope of this question, and therefore would not require an affirmative response.',
      hospitalization: 'Have you EVER been hospitalized for a mental health condition?',
      diagnoses: 'The following question asks whether you have been diagnosed with a specified mental health condition that may, particularly if untreated, impact your judgment, reliability, or trustworthiness. If you answer in the affirmative, we will seek additional information about the seriousness and symptoms of the condition, as well as any applicable course of treatment.\n\nIt is important to note that any such diagnosis, in and of itself, **is not a reason** to revoke or deny eligibility/or access to classified information or for holding a sensitive position, suitability or fitness to obtain or retain Federal or contract employment, or eligibility for physical or logical access to federally controlled facilities or information systems.'
    },
    destination: {
      intro: 'Introduction',
      competence: 'Competence',
      consultation: 'Consultations',
      hospitalization: 'Hospitalizations',
      diagnoses: 'Diagnoses',
      existingConditions: 'Existing conditions',
      review: 'Review'
    },
    default: {
      label: {
        toDate: 'N/A',
        fromDate: 'N/A'
      }
    },
    intro: {
      para1: 'The U.S. government recognizes the critical importance of mental health and advocates proactive management of mental health conditions to support the wellness and recovery of Federal employees and others. Every day individuals with mental health conditions carry out their duties without presenting a security risk. While most individuals with mental health conditions do not present security risks, there may be times when such a condition can affect a person’s eligibility for a security clearance.',
      para2: 'Individuals experience a range of reactions to traumatic events. For example, the death of a loved one, divorce, major injury, service in a military combat environment, sexual assault, domestic violence, or other difficult work-related, family, personal, or medical issues may lead to grief, depression, or other responses. The government recognizes that mental health counseling and treatment may provide important support for those who have experienced such events, as well as for those with other mental health conditions. Nothing in this questionnaire is intended to discourage those who might benefit from such treatment from seeking it.',
      para3: '**Mental health treatment and counseling, in and of itself, is not a reason to revoke or deny eligibility** for access to classified information or for holding a sensitive position, suitability or fitness to obtain or retain Federal or contract employment, or eligibility for physical or logical access to federally controlled facilities or information systems.',
      para4: '**Seeking or receiving mental health care for personal wellness and recovery may contribute favorably to decisions about your eligibility.**'

    },
    tour: {
      para: 'Take a guided tour through the section'
    },
    review: {
      para: 'View all the sections associated with psychological and emotional health at once'
    },
    competence: {
      heading: {
        occurred: 'Provide the date this occurred',
        courtName: 'Provide the name of the court or administrative agency that declared you mentally incompetent',
        courtAddress: 'Provide the address of the court or administrative agency',
        disposition: 'Provide the final disposition',
        appealCourtName: 'Provide the name of the higher court or administrative agency',
        appealCourtAddress: 'Provide the address of the court or administrative agency',
        appealed: 'Was this matter appealed to a higher  court or administrative agency?',
        appealedAnother: 'Do you have an additional instance where this matter was appealed to a higher court or administrative agency?',
        needMore: 'Since you answered yes, we need more information'
      },
      label: {
        courtAddress: 'This address is',
        disposition: 'Provide the final disposition'
      },
      help: {
        occurred: {
          title: 'Need help with the date this occurred?',
          message: 'Enter the date this official order was issued.',
          note: 'Note: If you are not sure of the exact date estimate it and check the "Estimated" checkbox.'
        },
        courtName: {
          title: 'Need help with this court or agency name?',
          message: 'Enter the name of the court or administrative agency that issued the order.',
          note: ''
        },
        courtAddress: {
          title: 'Not sure of the court or agency address?',
          message: 'Try looking up the court or agency name, a physical or mailing address should be associated with it.',
          note: 'Note: If you can only find a phone number try calling and asking for the address.'
        },
        incompetent: {
          title: 'Need help with this question?',
          message: 'Has a court or administrative agency EVER ordered you to consult with a mental health professional?'
        }
      },
      collection: {
        summaryCourtName: 'Provide your order details below',
        description: 'Summary of orders',
        appendTitle: 'Do you have an additional instance where a court or administrative agency EVER issued an order declaring you mentally incompetent?',
        appendMessage: 'If yes, use the button below to add another instance',
        appendLabel: 'Add another order',
        itemType: 'Order'
      }
    },
    consultation: {
      heading: {
        occurred: 'Provide the date this occurred',
        courtName: 'Provide the name of the court or administrative agency that declared you mentally incompetent',
        courtAddress: 'Provide the address of the court or administrative agency',
        disposition: 'Provide the final disposition',
        appealCourtName: 'Name of court or administrative agency',
        appealCourtAddress: 'Provide the address of the court or administrative agency',
        appealed: 'Was this matter appealed to a higher  court or administrative agency?',
        appealedAnother: 'Do you have an additional instance where this matter was appealed to a higher court or administrative agency?',
        needMore: 'Since you answered yes, we need more information'
      },
      label: {
        courtAddress: 'This address is',
        disposition: 'Provide the final disposition'
      },
      help: {
        occurred: {
          title: 'Need help with this date?',
          message: 'Enter the date the court or agency ordered you to consult with a professional.',
          note: 'Note: If you are not sure of the exact date estimate it and check the "Estimated" checkbox.'
        },
        courtName: {
          title: 'Need help with this court or agency name?',
          message: 'Enter the name of the court or administrative agency that issued the order.',
          note: ''
        },
        courtAddress: {
          title: 'Not sure of the court or agency address?',
          message: 'Try looking up the court or agency name, a physical or mailing address should be associated with it.',
          note: 'Note: If you can only find a phone number try calling and asking for the address.'
        },
        disposition: {
          title: 'Need help with the disposition?',
          message: 'Enter the disposition for this order',
          note: ''
        },
        appealed: {
          title: 'Need help with whether this matter was appealed?',
          message: 'Was this matter appealed to a higher court or administrative agency?',
          note: ''
        },
        incompetent: {
          title: 'Need help with this question?',
          message: 'Has a court or administrative agency EVER ordered you to consult with a mental health professional'
        }
      },
      collection: {
        summaryCourtName: 'Provide your order details below',
        description: 'Summary of orders',
        appendTitle: 'Do you have an additional instance where a court or administrative agency EVER issued an order declaring you mentally incompetent?',
        appendMessage: 'If yes, use the button below to add another instance',
        appendLabel: 'Add another order',
        itemType: 'Order'
      }
    },
    hospitalization: {
      heading: {
        admission: 'Was the admission voluntary or involuntary?',
        treatment: 'Provide the dates of treatment',
        facility: 'Provide the name of the facility where treatment was provided',
        address: 'Provide the address of the facility where treatment was provided',
        explanation: 'Provide explanation'
      },
      label: {
        address: 'This address is',
        voluntaryAdmission: 'Voluntary',
        involuntaryAdmission: 'Involuntary'
      },
      collection: {
        description: 'Summary of hospitalizations',
        summary: 'Provide your hospitalization details below',
        appendTitle: 'Do you have an additional instance where you have EVER been hospitalized for a mental health condition?',
        appendMessage: 'If yes, use the button below to add another hospitalization',
        appendLabel: 'Add another hospitalization',
        itemType: 'Hospitalization'
      },
      help: {
        incompetent: {
          title: 'Need help with mental health hospitalization?',
          message: 'Have you EVER been hospitalized for a mental health condition?',
          note: ''
        },
        treatment: {
          title: 'Need help the date range of your hospitalization?',
          message: 'Provide the full date range (admission to release) of your hospitalization.',
          note: 'Note: If you are not sure of the exact dates estimate them and check the "Estimated" checkbox.'
        },
        facility: {
          title: 'Need help with this facility name?',
          message: 'Enter the name of the facility where you were hospitalized.',
          note: ''
        },
        address: {
          title: 'Not sure of the facility address?',
          message: 'Try looking up the facility name, a physical or mailing address should be associated with it.',
          note: 'Note: If you can only find a phone number try calling and asking for the address.'
        }
      }
    },
    diagnosis: {
      heading: {
        condition: 'Identify the diagnosis or health condition',
        diagnosed: 'Provide the dates of diagnosis',
        healthcareProfessional: 'Health care professional info',
        effective: 'Was the counseling/treatment effective in managing your symptoms?',
        facility: 'Agency/organization/facility',
        explanation: 'Provide explanation'
      },
      help: {
        condition: {
          title: 'Need help with health condition',
          message: 'Provide the name of the diagnosis or health condition',
          note: ''
        },
        diagnosed: {
          title: 'Need help the date range of your diagnosis or health condition?',
          message: 'Provide the full date range you have had this diagnosis or health condition.',
          note: 'Note: If this is a current diagnosis or health condition enter the start date and select the "Present" button for the "To date".'
        }
      },
      person: {
        heading: {
          name: 'Provide the name and telephone number of the health care professional who diagnosed you, or is currently treating you for such diagnosis, or with whom you have discussed such condition',
          address: 'Provide the address of the health care professional who diagnosed you, or is currently treating you for such diagnosis, or with whom you have discussed such condition'
        },
        label: {
          address: 'This address is',
          name: 'Name',
          phone: 'Telephone'
        },
        help: {
          address: {
            title: 'Need help with health care professional address',
            message: 'Provide the address of the health care professional',
            note: ''
          },
          name: {
            title: 'Need help the name of the healthcare professional?',
            message: 'Provide the name of the healthcare professional.',
            note: ''
          }
        }
      },
      facility: {
        heading: {
          name: 'Provide the name and telephone number of any agency/organization/facility where counseling/treatment was provided',
          address: 'Provide the address of any agency/organization/facility where couseling/treatment was provided'
        },
        label: {
          name: 'Name',
          phone: 'Telephone',
          address: 'This address is'
        },
        help: {
          address: {
            title: 'Not sure of the agency/organization/facility address?',
            message: 'Try looking up the agency/organization/facility, a physical or mailing address should be associated with it.',
            note: 'Note: If you can only find a phone number try calling and asking for the address.'
          },
          name: {
            title: 'Need help the facility where treatment was provided?',
            message: 'Provide the name of the facility where treatment was provided',
            note: ''
          }
        }
      }
    },
    diagnoses: {
      heading: {
        didNotConsult: 'In the last seven years, have there been any occasions when you did not consult with a medical professional before altering or discontinuing, or failing to start a prescribed course of treatment for any of the listed diagnoses?',
        diagnoses: 'Have you EVER been diagnosed by a physician or other health professional with psychotic disorder, schizophrenia, schizoaffective disorder, delusional disorder, bipolar mood disorder, borderline personality disorder, or antisocial personality disorder?',
        examples: 'Health professional examples: a psychiatrist, psychologist, licensed clinical social worker, or nurse practitioner.',
        inTreatment: 'Are you currently in treatment?'
      },
      collection: {
        description: 'Summary of diagnoses',
        summary: 'Provide your diagnosis details below',
        appendTitle: 'Do you have an additional instance where you EVER had been diagnosed by a physician or other health professional (for example, a psychiatrist, psychologist, licensed clinical social worker, or nurse practitioner) with psychotic disorder, schizophrenia, schizoaffective disorder, delusional disorder, bipolar mood disorder, borderline personality disorder, or antisocial personality disorder?',
        appendMessage: 'Health professional examples: a psychiatrist, psychologist, licensed clinical social worker, or nurse practitioner.\n\nIf yes, use the button below to add another hospitalization',
        appendLabel: 'Add another diagnosis',
        itemType: 'Diagnosis'
      },
      professional: {
        heading: {
          name: 'Provide the name and telephone number of the health care professional who diagnosed you, or is currently treating you for such diagnosis, or with whom you have discussed such condition',
          address: 'Provide the address of the health care professional who diagnosed you, or is currently treating you for such diagnosis, or with whom you have discussed such condition'
        },
        label: {
          address: 'This address is',
          name: 'Name',
          phone: 'Telephone'
        }
      },
      treatment: {
        collection: {
          description: 'Summary of treatments',
          summary: 'Provide your treatment details below',
          appendTitle: 'Do you have an additional instance where you are currently in treatment?',
          appendMessage: 'If yes, use the button below to add another treatment',
          appendLabel: 'Add another treatment',
          itemType: 'Treatment'
        }
      },
      help: {
        diagnosed: {
          title: 'Help with diagnoses',
          message: 'Have you EVER been diagnosed by a physician or other health professional (for example, a psychiatrist, psychologist, licensed clinical social worker, or nurse practitioner) with psychotic disorder, schizophrenia, schizoaffective disorder, delusional disorder, bipolar mood disorder, borderline personality disorder, or antisocial personality disorder?',
          note: ''
        },
        didNotConsult: {
          title: 'Help with occasions when not consulting',
          message: 'In the last seven years, have there been any occasions when you did not consult with a medical professional before altering or discontinuing, or failing to start a prescribed course of treatment for any of the listed diagnoses?',
          note: ''
        },
        inTreatment: {
          title: 'Help with current treatment',
          message: 'Are you currently in treatment?',
          note: ''
        },
        condition: {
          title: 'Help with diagnosis',
          message: 'Identify the diagnosis or health condition',
          note: ''
        }
      },
      person: {
        help: {
          name: {
            title: 'Help with healthcare professional',
            message: 'Provide the name and telephone number of the health care professional who diagnosed you, or is currently treating you for such diagnosis, or with whom you have discussed such condition'
          },
          address: {
            title: 'Help with healthcare professional address',
            message: 'Provide the address of the health care professional who diagnosed you, or is currently treating you for such diagnosis, or with whom you have discussed such condition'
          }
        }
      }
    },
    existingConditions: {
      heading: {
        hasCondition: 'Do you have a mental health or other health condition that substantially adversely affects your judgment, reliability, or trustworthiness even if you are not experiencing such symptoms today?',
        receivedTreatment: 'Did you ever receive or are you currently receiving counseling or treatment for that condition?',
        didNotFollow: 'Have you ever chosen not to follow a prescribed course of treatment for any of these conditions?',
        explanation: 'Provide explanation',
        didNotFollowExplanation: 'Provide explanation'
      },
      para: {
        hasCondition: 'Note: If your judgment, reliability, or trustworthiness is not substantially adversely affected by a mental health or other condition, then you should answer "no" even if you have a mental health or other condition requiring treatment. For example, if you are in need of emotional or mental health counseling as a result of service as a first responder, service in a military combat environment, having been sexually assaulted or a victim of domestic violence, or marital issues, but your judgment, reliability or trustworthiness is not substantially adversely affected, then answer "no."',
        receivedTreatment: 'You may choose not to answer this question. However, such consultation or treatment will not disqualify you and is considered to be a positive action.'
      },
      help: {
        receivedTreatment: {
          title: 'Help with counseling or treatment',
          message: 'Did you ever receive or are you currently receiving counseling or treatment for that condition?',
          note: ''
        },
        didNotFollow: {
          title: 'Help with following prescribed course of treatment',
          message: 'Have you ever chosen not to follow a prescribed course of treatment for any of these conditions?',
          note: ''
        },
        didNotFollowExplanation: {
          title: 'Help with not following prescribed course of action explanation',
          message: 'Provide explanation',
          note: ''
        }
      },
      receivedTreatment: {
        label: {
          yes: 'Yes',
          no: 'No',
          decline: 'I decline to answer'
        }
      },
      treatment: {
        collection: {
          description: 'Summary of treatments',
          summary: 'Provide your treatment details below',
          appendTitle: 'Do you have an additional instance where you ever received are you currently receiving counseling or treatment for that condition',
          appendMessage: 'If yes, use the button below to add another instance',
          appendLabel: 'Add another treatment',
          itemType: 'Treatment'
        }
      },
      diagnosis: {
        heading: {
          condition: 'Identify the diagnosis or health condition',
          diagnosed: 'Provide the dates of counseling or treatment',
          healthcareProfessional: 'Health care professional info',
          effective: 'Was the counseling/treatment effective in managing your symptoms?',
          facility: 'Agency/organization/facility',
          explanation: 'Provide explanation'
        },
        help: {
          condition: {
            title: 'Need help with health condition',
            message: 'Provide the name of the diagnosis or health condition',
            note: ''
          },
          diagnosed: {
            title: 'Need help the date range of your counseling or treatment?',
            message: 'Provide the full date range (start to finish) of your counseling or treatment.',
            note: 'Note: If you are not sure of the exact dates estimate them and check the "Estimated" checkbox.'
          }
        },
        person: {
          heading: {
            name: 'Provide the name and telephone number of the health care professional',
            address: 'Provide the address of the health care professional'
          },
          label: {
            address: 'This address is',
            name: 'Name',
            phone: 'Telephone'
          },
          help: {
            address: {
              title: 'Not sure of this health care professional\'s address?',
              message: 'Try looking up their name, a physical or mailing address should be associated with it.',
              note: 'Note: If you can only find a phone number try calling and asking for the address.'
            },
            name: {
              title: 'Need help the name and phone number of this healthcare professional?',
              message: 'Please enter their full name and a current telephone number.',
              note: ''
            }
          }
        },
        facility: {
          heading: {
            name: 'Provide the name and telephone number of any agency/organization/facility where counseling/treatment was provided',
            address: 'Provide the address of any agency/organization/facility where couseling/treatment was provided'
          },
          label: {
            address: 'This address is',
            name: 'Name',
            phone: 'Telephone'
          },
          help: {
            address: {
              title: 'Need help with treatment facility?',
              message: 'Provide the address of the facility where treatment was provided',
              note: ''
            },
            name: {
              title: 'Need help the facility where treatment was provided?',
              message: 'Provide the name of the facility where treatment was provided',
              note: ''
            }
          }
        }
      }
    }
  },
  foreignBornDocuments: {
    heading: {
      documentNumber: 'Provide document number',
      documentExpiration: 'Provide document expiration date, if applicable'
    },
    para: {
      bornToUSParents: 'Born Abroad to U.S. Parents:',
      naturalized: 'Naturalized:',
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
        alien: 'Alien Registration (on Certificate of Naturalization—utilize USCIS, CIS, or INS Registration number)',
        permanentResident: 'Permanent Resident Card (I-551)',
        certificateOfNaturalization: 'Certificate of Naturalization (N550 or N570)'
      }
    },
    derived: {
      label: {
        alien: 'Alien Registration (on Certificate of Naturalization—utilize USCIS, CIS, or INS Registration number)',
        permanentResident: 'Permanent Resident Card (I-551)',
        certificateOfNaturalization: 'Certificate of Naturalization (N560 or N561)'
      }
    },
    notCitizen: {
      label: {
        permanentResident: 'I-551 Permanent Resident',
        employmentAuthorization: 'I-766 Employment Authorization',
        arrivalDepartureRecord: 'I-94 Arrival-Departure Record',
        visa: 'U.S. Visa (red foil number)',
        nonImmigrantStudent: 'I-20 Certificate of Eligibility for Non-Immigrant-F1-Student',
        exchangeVisitor: 'DS-2019 Certificate of Eligibility of Exchange Visitor-J1-Status'
      }
    },
    other: {
      label: {
        other: 'Other (Provide explanation)'
      }
    }
  },
  countries: {
    unitedStates: 'United States',
    afghanistan: 'Afghanistan',
    akrotiriSovereignBaseArea: 'Akrotiri Sovereign Base Area',
    albania: 'Albania',
    algeria: 'Algeria',
    andorra: 'Andorra',
    angola: 'Angola',
    anguilla: 'Anguilla',
    antarctica: 'Antarctica',
    antiguaAndBarbuda: 'Antigua and Barbuda',
    argentina: 'Argentina',
    armenia: 'Armenia',
    aruba: 'Aruba',
    ashmoreAndCartierIslands: 'Ashmore and Cartier Islands',
    australia: 'Australia',
    austria: 'Austria',
    azerbaijan: 'Azerbaijan',
    bahamas: 'Bahamas, The',
    bahrain: 'Bahrain',
    bangladesh: 'Bangladesh',
    barbados: 'Barbados',
    bassasDaIndia: 'Bassas da India',
    belarus: 'Belarus',
    belgium: 'Belgium',
    belize: 'Belize',
    benin: 'Benin',
    bermuda: 'Bermuda',
    bhutan: 'Bhutan',
    bolivia: 'Bolivia',
    bosniaAndHerzegovina: 'Bosnia and Herzegovina',
    botswana: 'Botswana',
    bouvetIsland: 'Bouvet Island',
    brazil: 'Brazil',
    britishIndianOceanTerritory: 'British Indian Ocean Territory',
    britishVirginIslands: 'British Virgin Islands',
    brunei: 'Brunei',
    bulgaria: 'Bulgaria',
    burkinaFaso: 'Burkina Faso',
    burma: 'Burma',
    burundi: 'Burundi',
    cambodia: 'Cambodia',
    cameroon: 'Cameroon',
    canada: 'Canada',
    capeVerde: 'Cape Verde',
    caymanIslands: 'Cayman Islands',
    centralAfricanRepublic: 'Central African Republic',
    chad: 'Chad',
    chile: 'Chile',
    china: 'China',
    christmasIsland: 'Christmas Island',
    clippertonIsland: 'Clipperton Island',
    cocosKeelingIslands: 'Cocos Keeling Islands',
    colombia: 'Colombia',
    comoros: 'Comoros',
    congo: 'Congo',
    congoDemocraticRepublic: 'Congo, Democratic Republic of the',
    cookIslands: 'Cook Islands',
    coralSeaIslands: 'Coral Sea Islands',
    costaRica: 'Costa Rica',
    coteIvoire: 'Cote d\'Ivoire',
    croatia: 'Croatia',
    cuba: 'Cuba',
    cyprus: 'Cyprus',
    czechRepublic: 'Czech Republic',
    denmark: 'Denmark',
    dhekeliaSovereignBaseArea: 'Dhekelia Sovereign Base Area',
    djibouti: 'Djibouti',
    dominica: 'Dominica',
    dominicanRepublic: 'Dominican Republic',
    eastTimor: 'East Timor',
    ecuador: 'Ecuador',
    egypt: 'Egypt',
    elSalvador: 'El Salvador',
    equatorialGuinea: 'Equatorial Guinea',
    eritrea: 'Eritrea',
    estonia: 'Estonia',
    ethiopia: 'Ethiopia',
    etorofuHabomaiKunashiriAndShikotanIslands: 'Etorofu, Habomai, Kunashiri And Shikotan Islands',
    europaIsland: 'Europa Island',
    falklandIslandsIslasMalvinas: 'Falkland Islands Islas Malvinas',
    faroeIslands: 'Faroe Islands',
    fiji: 'Fiji',
    finland: 'Finland',
    france: 'France',
    frenchGuiana: 'French Guiana',
    frenchPolynesia: 'French Polynesia',
    frenchSouthernAndAntarcticLands: 'French Southern and Antarctic Lands',
    gabon: 'Gabon',
    gambia: 'Gambia, The',
    gazaStrip: 'Gaza Strip',
    georgia: 'Georgia',
    germany: 'Germany',
    ghana: 'Ghana',
    gibraltar: 'Gibraltar',
    gloriosoIslands: 'Glorioso Islands',
    greece: 'Greece',
    greenland: 'Greenland',
    grenada: 'Grenada',
    guadeloupe: 'Guadeloupe',
    guatemala: 'Guatemala',
    guernsey: 'Guernsey',
    guinea: 'Guinea',
    guineaBissau: 'Guinea-Bissau',
    guyana: 'Guyana',
    haiti: 'Haiti',
    heardIslandAndMcDonaldIslands: 'Heard Island and McDonald Islands',
    honduras: 'Honduras',
    hongKong: 'Hong Kong',
    hungary: 'Hungary',
    iceland: 'Iceland',
    india: 'India',
    indonesia: 'Indonesia',
    iran: 'Iran',
    iraq: 'Iraq',
    ireland: 'Ireland',
    isleOfMan: 'Isle of Man',
    israel: 'Israel',
    italy: 'Italy',
    jamaica: 'Jamaica',
    janMayen: 'Jan Mayen',
    japan: 'Japan',
    jersey: 'Jersey',
    jordan: 'Jordan',
    juanDeNovaIsland: 'Juan de Nova Island',
    kazakhstan: 'Kazakhstan',
    kenya: 'Kenya',
    kiribati: 'Kiribati',
    kosovo: 'Kosovo',
    kuwait: 'Kuwait',
    kyrgyzstan: 'Kyrgyzstan',
    laos: 'Laos',
    latvia: 'Latvia',
    lebanon: 'Lebanon',
    lesotho: 'Lesotho',
    liberia: 'Liberia',
    libya: 'Libya',
    liechtenstein: 'Liechtenstein',
    lithuania: 'Lithuania',
    luxembourg: 'Luxembourg',
    macau: 'Macau',
    macedonia: 'Macedonia',
    madagascar: 'Madagascar',
    malawi: 'Malawi',
    malaysia: 'Malaysia',
    maldives: 'Maldives',
    mali: 'Mali',
    malta: 'Malta',
    marshallIslands: 'Marshall Islands',
    martinique: 'Martinique',
    mauritania: 'Mauritania',
    mauritius: 'Mauritius',
    mayotte: 'Mayotte',
    mexico: 'Mexico',
    micronesiaFederatedStates: 'Micronesia, Federated States of',
    moldova: 'Moldova',
    monaco: 'Monaco',
    mongolia: 'Mongolia',
    montenegro: 'Montenegro',
    montserrat: 'Montserrat',
    morocco: 'Morocco',
    mozambique: 'Mozambique',
    namibia: 'Namibia',
    nauru: 'Nauru',
    nepal: 'Nepal',
    netherlands: 'Netherlands',
    netherlandsAntilles: 'Netherlands Antilles',
    newCaledonia: 'New Caledonia',
    newZealand: 'New Zealand',
    nicaragua: 'Nicaragua',
    niger: 'Niger',
    nigeria: 'Nigeria',
    niue: 'Niue',
    norfolkIsland: 'Norfolk Island',
    northKorea: 'North Korea',
    norway: 'Norway',
    oman: 'Oman',
    pakistan: 'Pakistan',
    palau: 'Palau',
    panama: 'Panama',
    papuaNewGuinea: 'Papua New Guinea',
    paracelIslands: 'Paracel Islands',
    paraguay: 'Paraguay',
    peru: 'Peru',
    philippines: 'Philippines',
    pitcairnIslands: 'Pitcairn Islands',
    poland: 'Poland',
    portugal: 'Portugal',
    qatar: 'Qatar',
    reunion: 'Reunion',
    romania: 'Romania',
    russia: 'Russia',
    rwanda: 'Rwanda',
    saintBarthelemy: 'Saint Barthelemy',
    saintHelena: 'Saint Helena',
    saintKittsAndNevis: 'Saint Kitts and Nevis',
    saintLucia: 'Saint Lucia',
    saintMartin: 'Saint Martin',
    saintPierreAndMiquelon: 'Saint Pierre and Miquelon',
    saintVincentAndTheGrenadines: 'Saint Vincent and the Grenadines',
    samoa: 'Samoa',
    sanMarino: 'San Marino',
    saoTomeAndPrincipe: 'Sao Tome and Principe',
    saudiArabia: 'Saudi Arabia',
    senegal: 'Senegal',
    serbia: 'Serbia',
    seychelles: 'Seychelles',
    sierraLeone: 'Sierra Leone',
    singapore: 'Singapore',
    slovakia: 'Slovakia',
    slovenia: 'Slovenia',
    solomonIslands: 'Solomon Islands',
    somalia: 'Somalia',
    southAfrica: 'South Africa',
    southGeorgiaAndTheSouthSandwichIslands: 'South Georgia and the South Sandwich Islands',
    southKorea: 'South Korea',
    spain: 'Spain',
    spratlyIslands: 'Spratly Islands',
    sriLanka: 'Sri Lanka',
    sudan: 'Sudan',
    suriname: 'Suriname',
    svalbard: 'Svalbard',
    swaziland: 'Swaziland',
    sweden: 'Sweden',
    switzerland: 'Switzerland',
    syria: 'Syria',
    taiwan: 'Taiwan',
    tajikistan: 'Tajikistan',
    tanzania: 'Tanzania',
    thailand: 'Thailand',
    togo: 'Togo',
    tokelau: 'Tokelau',
    tonga: 'Tonga',
    trinidadAndTobago: 'Trinidad and Tobago',
    tromelinIsland: 'Tromelin Island',
    tunisia: 'Tunisia',
    turkey: 'Turkey',
    turkmenistan: 'Turkmenistan',
    turksAndCaicosIslands: 'Turks and Caicos Islands',
    tuvalu: 'Tuvalu',
    uganda: 'Uganda',
    ukraine: 'Ukraine',
    unitedArabEmirates: 'United Arab Emirates',
    unitedKingdom: 'United Kingdom',
    uruguay: 'Uruguay',
    uzbekistan: 'Uzbekistan',
    vanuatu: 'Vanuatu',
    vaticanCity: 'Vatican City',
    venezuela: 'Venezuela',
    vietnam: 'Vietnam',
    wallisAndFutuna: 'Wallis and Futuna',
    westBank: 'West Bank',
    westernSahara: 'Western Sahara',
    yemen: 'Yemen',
    zambia: 'Zambia',
    zimbabwe: 'Zimbabwe'
  }
}

export default en
