const en = {
  temp: {
    intro: {
      title: 'Introduction title placeholder',
      body: [
        'Introduction body placeholder'
      ]
    }
  },
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
    action: 'Save now',
    saving: 'Saving',
    saved: 'Saved',
    now: 'Just now',
    second: 'sec',
    seconds: 'sec',
    minute: 'min',
    minutes: 'min',
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
    close: 'Close',
    incomplete: 'This information is incomplete.'
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
      initialOnly: 'Initial only',
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
          title: 'There is a problem with the last name',
          message: [
            'You are only allowed 100 characters.',
            '*and/or*',
            'If the last name is an initial then check the "Initial only" checkbox.'
          ],
          note: ''
        },
        pattern: {
          title: 'There is a problem with the last name',
          message: 'Some of these characters aren\'t allowed.',
          note: 'Only use letters, hyphens (-), periods (.), apostrophes (\'), and spaces.'
        }
      },
      first: {
        length: {
          title: 'There is a problem with the first name',
          message: [
            'You are only allowed 100 characters.',
            '*and/or*',
            'If the first name is an initial then check the "Initial only" checkbox.'
          ],
          note: ''
        },
        pattern: {
          title: 'There is a problem with the first name',
          message: 'Some of these characters aren\'t allowed.',
          note: 'Only use letters, hyphens (-), periods (.), apostrophes (\'), and spaces.'
        }
      },
      middle: {
        required: {
          title: 'There is a problem with the middle name',
          message: 'If there is no middle name then check the "No middle name" checkbox.',
          note: ''
        },
        length: {
          title: 'There is a problem with the middle name',
          message: [
            'You are only allowed 100 characters.',
            '*and/or*',
            'If the middle name is an initial then check the "Initial only" checkbox.'
          ],
          note: ''
        },
        pattern: {
          title: 'There is a problem with the middle name',
          message: 'Some of these characters aren\'t allowed.',
          note: 'Only use letters, hyphens (-), periods (.), apostrophes (\'), and spaces.'
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
      mismatch: {
        title: 'Verification mismatch',
        message: 'The two U.S. Social Security Numbers need to match to pass verification.',
        note: ''
      }
    },
    date: {
      month: {
        notfound: {
          title: 'There is a problem with the Month',
          message: 'The month should be between 1(January) and 12(December).',
          note: ''
        },
        max: {
          title: 'There is a problem with the Month',
          message: 'The month should be between 1(January) and 12(December).',
          note: ''
        }
      },
      day: {
        length: {
          title: 'There is a problem with the Day',
          message: 'There is not that many days in this month.',
          note: ''
        },
        max: {
          title: 'There is a problem with the Day',
          message: 'There is not that many days in this month.',
          note: ''
        }
      },
      year: {
        max: {
          title: 'There is a problem with the Year',
          message: 'The year can\'t be in the future.',
          note: ''
        },
        min: {
          title: 'There is a problem with the Year',
          message: 'This year is too far in the past.',
          note: ''
        }
      },
      max: {
        title: 'There is a problem with the date',
        message: 'The date can\'t be in the future.'
      },
      min: {
        title: 'There is a problem with the date',
        message: 'The date should be on or after your date of birth.'
      }
    },
    daterange: {
      to: {
        month: {
          notfound: {
            title: 'There is a problem with the Month',
            message: 'For the **to** date, the month should be between 1(January) and 12(December).',
            note: ''
          },
          max: {
            title: 'There is a problem with the Month',
            message: 'For the **to** date, the month should be between 1(January) and 12(December).',
            note: ''
          }
        },
        day: {
          length: {
            title: 'There is a problem with the Day',
            message: 'For the **to** date, there are not that many days in this month.',
            note: ''
          },
          max: {
            title: 'There is a problem with the Day',
            message: 'For the **to** date, there are not that many days in this month.',
            note: ''
          }
        },
        year: {
          max: {
            title: 'There is a problem with the Year',
            message: 'For the **to** date, the year can\'t be in the future.',
            note: ''
          },
          min: {
            title: 'There is a problem with the Year',
            message: 'For the **to** date, this year is too far in the past.',
            note: ''
          }
        },
        max: {
          title: 'There is a problem with the date',
          message: 'For the **to** date, the date can\'t be in the future.'
        },
        min: {
          title: 'There is a problem with the date',
          message: 'For the **to** date, the date should be on or after your date of birth.'
        }
      },
      from: {
        month: {
          notfound: {
            title: 'There is a problem with the Month',
            message: 'For the **from** date, the month should be between 1(January) and 12(December).',
            note: ''
          },
          max: {
            title: 'There is a problem with the Month',
            message: 'For the **from** date, the month should be between 1(January) and 12(December).',
            note: ''
          }
        },
        day: {
          length: {
            title: 'There is a problem with the Day',
            message: 'For the **from** date, there are not that many days in this month.',
            note: ''
          },
          max: {
            title: 'There is a problem with the Day',
            message: 'For the **from** date, there are not that many days in this month.',
            note: ''
          }
        },
        year: {
          max: {
            title: 'There is a problem with the Year',
            message: 'For the **from** date, the year can\'t be in the future.',
            note: ''
          },
          min: {
            title: 'There is a problem with the Year',
            message: 'For the **from** date, this year is too far in the past.',
            note: ''
          }
        },
        max: {
          title: 'There is a problem with the date',
          message: 'For the **from** date, the date can\'t be in the future.'
        },
        min: {
          title: 'There is a problem with the date',
          message: 'For the **from** date, the date should be on or after your date of birth.'
        }
      },
      order: {
        title: 'There is a problem with the date range',
        message: 'The **from** date should be before the **to** date.',
        note: ''
      }
    },
    weight: {
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
    address: {
      city: {
        length: {
          title: 'There is a problem with the City',
          message: 'City name should be between 2 and 100 characters.',
          note: ''
        }
      },
      state: {
        notfound: {
          title: 'There is a problem with the State',
          message: [
            'State name must be one of the available options.',
            '*and/or*',
            'The state name is too long.'
          ],
          note: ''
        }
      },
      county: {
        length: {
          title: 'There is a problem with the County',
          message: 'County name must be between 2 and 100 characters',
          note: ''
        }
      },
      zipcode: {
        pattern: {
          title: 'There is a problem with the ZIP Code',
          message: 'The ZIP Code should be either 5 or 9 digits.',
          note: ''
        }
      },
      country: {
        notfound: {
          title: 'This country is not one of the options',
          message: 'Please enter the country that your city of birth is in now.',
          note: ''
        }
      },
      apofpo: {
        pattern: {
          title: 'There is a problem with the State Code',
          message: 'APO/FPO state code must be 2 letters',
          note: 'Note: Typically the value is either AA, AE, or AP.'
        }
      }
    },
    city: {
      length: {
        title: 'There is a problem with the City',
        message: 'City name should be between 2 and 100 characters.',
        note: ''
      }
    },
    state: {
      notfound: {
        title: 'There is a problem with the State',
        message: [
          'State name must be one of the available options.',
          '*and/or*',
          'The state name is too long.'
        ],
        note: ''
      }
    },
    county: {
      length: {
        title: 'There is a problem with the County',
        message: 'County name must be between 2 and 100 characters',
        note: ''
      }
    },
    zipcode: {
      pattern: {
        title: 'There is a problem with the ZIP Code',
        message: 'The ZIP Code should be either 5 or 9 digits.',
        note: ''
      }
    },
    country: {
      notfound: {
        title: 'There is a problem with the Country',
        message: 'Country name should be one of the available options.',
        note: ''
      }
    },
    passport: {
      pattern: {
        title: 'There is a problem with the passport number',
        message: [
          'For passport books the number will start with a letter and then 6 to 9 digits.',
          'For passport cards the number begins with a "C" and followed by 8 digits.'
        ],
        note: ''
      }
    },
    currency: {
      min: {
        title: 'There is a problem with the losses',
        message: 'The reported losses should have a dollar value.',
        note: ''
      }
    },
    telephone: {
      domestic: {
        first: {
          pattern: {
            title: 'There is a problem with the area code',
            message: 'The area code should be 3 numbers long and between 0 and 9.',
            note: ''
          },
          length: {
            title: 'There is a problem with the area code',
            message: 'The area code should be 3 numbers long and between 0 and 9.',
            note: ''
          }
        },
        second: {
          pattern: {
            title: 'There is a problem with the phone number',
            message: 'The first part of the phone number should be 3 numbers long and between 0 and 9.',
            note: ''
          },
          length: {
            title: 'There is a problem with the phone number',
            message: 'The first part of the phone number should be 3 numbers long and between 0 and 9.',
            note: ''
          }
        },
        third: {
          pattern: {
            title: 'There is a problem with the phone number',
            message: 'The last part of the phone number should be 4 numbers long and between 0 and 9.',
            note: ''
          },
          length: {
            title: 'There is a problem with the phone number',
            message: 'The last part of the phone number should be 4 numbers long and between 0 and 9.',
            note: ''
          }
        },
        extension: {
          pattern: {
            title: 'There is a problem with the extension',
            message: 'Extensions should be between 0 and 10.',
            note: ''
          },
          length: {
            title: 'There is a problem with the extension',
            message: 'Extensions should be between 0 and 10.',
            note: ''
          }
        }
      },
      dsn: {
        first: {
          pattern: {
            title: 'This field must have 3 digits',
            message: 'The first part of the DSN number must be 3 digits between 0 and 9.',
            note: ''
          },
          length: {
            title: 'This field must have 3 digits',
            message: 'The first part of the DSN number must be 3 digits between 0 and 9.',
            note: ''
          }
        },
        second: {
          pattern: {
            title: 'This field must have 4 digits',
            message: 'The last part of the DSN number must be 4 digits between 0 and 9.',
            note: ''
          },
          length: {
            title: 'This field must have 4 digits',
            message: 'The last part of the DSN number must be 4 digits between 0 and 9.',
            note: ''
          }
        }
      },
      international: {
        first: {
          pattern: {
            title: 'There is a problem with this country code',
            message: 'The country code of the international number should be 3 digits between 0 and 9.',
            note: ''
          },
          length: {
            title: 'There is a problem with this country code',
            message: 'The country code of the international number should be 3 digits between 0 and 9.',
            note: ''
          }
        },
        second: {
          pattern: {
            title: 'There is a problem with this number',
            message: 'The international number should be 10 digits between 0 and 9.',
            note: ''
          },
          length: {
            title: 'There is a problem with this number',
            message: 'The international number should be 10 digits between 0 and 9.',
            note: ''
          }
        }
      }
    },
    geocode: {
      original: {
        title: 'Original address'
      },
      partial: {
        title: 'Alternate address found',
        label: 'Suggested Address',
        para: 'Consider the highlighted change below. Using the US Postal Service suggested address will help us process your case more quickly.'
      },
      city: {
        title: 'City could not be found',
        para: 'There is a city-state mismatch. Have you entered the correct city and state?'
      },
      notfound: {
        title: 'Address not found',
        para: 'The address provided could not be found. Please ensure you have correctly typed all address fields correctly.'
      },
      generic: {
        title: 'Unable to validate address',
        para: 'The address provided cannot be properly validated.'
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
    email: {
      pattern: {
        title: 'This email isn\'t valid',
        message: 'Check for any spelling mistakes in your email address.',
        note: 'Example of valid email format: name@domain.com'
      }
    },
    treatment: {
      began: {
        max: {
          title: 'There is a problem with the date',
          message: 'The date can\'t be in the future.'
        },
        min: {
          title: 'There is a problem with the date',
          message: 'The date should be on or after your date of birth.'
        }
      },
      end: {
        max: {
          title: 'There is a problem with the date',
          message: 'The date can\'t be in the future.'
        },
        min: {
          title: 'There is a problem with the date',
          message: 'The date should be after the date treatment began.'
        }
      }
    }
    // order: {
    //   datecontrol: {
    //     max: {
    //       title: 'There is a problem with the date',
    //       message: 'The order date can\'t be in the future.'
    //     },
    //     min: {
    //       title: 'There is a problem with the date',
    //       message: 'The order date value should be on or after your date of birth.'
    //     }
    //   }
    // },
    // hospitalization: {
    //   to: {
    //     datecontrol: {
    //       max: {
    //         title: 'There is a problem with the "to" date',
    //         message: 'The hospitalization **to** date can\'t be in the future.'
    //       },
    //       min: {
    //         title: 'There is a problem with the "to" date',
    //         message: 'The hospitalization **to** date value should be on or after your date of birth.'
    //       }
    //     }
    //   },
    //   from: {
    //     datecontrol: {
    //       max: {
    //         title: 'There is a problem with the "from" date',
    //         message: 'The hospitalization **from** date can\'t be in the future.'
    //       },
    //       min: {
    //         title: 'There is a problem with the "from" date',
    //         message: 'The hospitalization **from** date value should be on or after your date of birth.'
    //       }
    //     }
    //   }
    // },
    // diagnosis: {
    //   to: {
    //     datecontrol: {
    //       max: {
    //         title: 'There is a problem with the "to" date',
    //         message: 'The diagnosis **to** date can\'t be in the future.'
    //       },
    //       min: {
    //         title: 'There is a problem with the "to" date',
    //         message: 'Diagnosis **to** date value should be on or after your date of birth.'
    //       }
    //     }
    //   },
    //   from: {
    //     datecontrol: {
    //       max: {
    //         title: 'There is a problem with the "from" date',
    //         message: 'Diagnosis **from** date can\'t be in the future.'
    //       },
    //       min: {
    //         title: 'There is a problem with the "from" date',
    //         message: 'Diagnosis **from** date value should be on or after your date of birth.'
    //       }
    //     }
    //   }
    // },
    // bankruptcy: {
    //   datefiled: {
    //     datecontrol: {
    //       max: {
    //         title: 'There is a problem with the "date filed" date',
    //         message: 'Bankruptcy **date filed** can\'t be in the future.'
    //       },
    //       min: {
    //         title: 'There is a problem with the "date filed" date',
    //         message: 'Bankruptcy **date filed** date value should be on or after your date of birth.'
    //       }
    //     }
    //   },
    //   datedischarged: {
    //     datecontrol: {
    //       max: {
    //         title: 'There is a problem with the "date discharged" date',
    //         message: 'Bankruptcy **date discharged** can\'t be in the future.'
    //       },
    //       min: {
    //         title: 'There is a problem with the "to" date',
    //         message: 'Bankruptcy **date discharged** date value should be on or after your date of birth.'
    //       }
    //     }
    //   }
    // }
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
    intro: {
      title: 'Section 1: Information about you',
      body: 'You will be asked questions about your personal information and be asked to provide details if necessary.'
    },
    tour: {
      para: 'Take a guided tour through the section'
    },
    review: {
      para: 'View all the sections associated with identification at once'
    },
    destination: {
      intro: 'Intro',
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
          title: 'Need help with this last name?',
          message: 'If this last name is a single initial letter only type that initial and check the "Initial only" checkbox.',
          note: 'Note: "Initial only" is for single letter names only, not for the initial of this full name.'
        }
      },
      first: {
        help: {
          title: 'Need help with this first name?',
          message: 'If this first name is a single initial letter only type that initial and check the "Initial only" checkbox.',
          note: 'Note: "Initial only" is for single letter names only, not for the initial of this full name.'
        }
      },
      middle: {
        help: {
          title: 'Need help with this middle name?',
          message: [
            'If this middle name is a single initial letter only type that initial and check the "Initial only" checkbox.',
            'If no middle name leave this field empty and check the "No middle name" checkbox.'
          ],
          note: 'Note: "Initial only" is for single letter names only, not for the initial of your full name.'
        }
      },
      suffix: {
        help: {
          title: 'Need help with this suffix?',
          message: 'If the suffix does not appear in this list, select "Other" and enter the suffix in the provided field',
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
          nodates: 'NA',
          unknown: '*Provide your full name below*'
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
        country: 'Country',
        location: 'Were you born in the United States?'
      },
      placeholder: {
        state: 'Please enter state or territory within the United States',
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
          message: 'Provide at least 2 email addresses, preferably your home (personal) email and your work email.',
          note: 'Note: More than 2 email addresses are not required but may assist in the completion of your background investigation. \nEmail format example: name@example.com'
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
          unknownEmail: '*Provide your email address below*',
          unknownPhone: '*Provide your telephone number below*',
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
        phoneNumber: 'Provide your phone numbers. At least one number is required, but providing additional numbers may assist in the completion of your background investigation.'
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
      heading: {
        verify: 'Please enter your U.S. Social Security Number again for verification'
      },
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
        sex: 'Select your sex',
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
          message: 'If additional information is appropriate please use "Add a comment" above to detail it.',
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
    intro: {
      title: 'Section 2: Financial record',
      body: 'You will be asked questions about your financial history and be asked to provide details if necessary.'
    },
    tour: {
      para: 'Take a guided tour through the section'
    },
    review: {
      para: 'View all the sections associated with identification at once'
    },
    destination: {
      intro: 'Intro',
      gambling: 'Gambling',
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
          title: 'Summary of financial problems',
          unknownlosses: '*Provide your financial problem details*',
          present: 'Now',
          nodates: 'NA',
          debt: 'Debt'
        },
        append: 'Add another financial problem',
        appendTitle: 'Have you EVER experienced additional financial problems due to gambling?'
      },
      heading: {
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
          title: 'Need help with this description?',
          message: 'We are looking for a full explanation of this financial problem. Go into as much detail as you need to fully explain.',
          note: ''
        },
        actions: {
          title: 'Need help with the actions taken?',
          message: 'Tell us if you have starting trying to fix this problem. If you haven\'t started yet tell us why.',
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
          item: 'Petition',
          unknown: '*Provide your petition details below*',
          nodates: 'NA',
          chapter: 'Chapter',
          appendTitle: 'In the last seven (7) years, have you filed any additional petitions under any chapter of the bankruptcy code?'
        },
        append: 'Add another petition'
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
        comments: 'Add optional comments',
        dischargeExplanation: 'Were you discharged of all debts claimed in the bankruptcy?'
      },
      label: {
        dischargeExplanation: 'Provide explanation'
      },
      title: 'In the last seven (7) years have you filed a petition under any chapter of the bankruptcy code?',
      notApplicable: 'Not applicable',
      help: {
        title: 'We are asking about the following bankruptcy petition types.',
        message: 'Answer yes if you filed a petition under Chapter 7, Chapter 11, Chapter 12, or Chapter 13.',
        note: 'Note: You will be asked to provide details of the petition or petitions.'
      },
      petitionType: {
        label: {
          chapter7: 'Chapter 7',
          chapter11: 'Chapter 11',
          chapter12: 'Chapter 12',
          chapter13: 'Chapter 13'
        },
        help: {
          title: 'Need help with the details of your bankruptcy petition?',
          message: [
            'If you don\'t have paperwork you may be able to find your details here:',
            '[www.pacer.gov](https://www.pacer.gov/)'
          ],
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
        title: 'Provide the name of the trustee for this bankruptcy',
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
          title: 'Not sure of the facility address?',
          message: 'Try looking up the facility name, this could help you find the address.',
          note: 'Note: If you can only find a phone number try calling and asking for the address.'
        }
      }
    },
    taxes: {
      title: 'In the last seven (7) years have you failed to file or pay Federal, state, or other taxes when required by law or ordinance?',
      heading: {
        failure: 'Did you fail to file, pay as required, or both?',
        year: 'Provide the year you failed to file or pay your federal, state, or other taxes (Estimated)',
        reason: 'Provide the reason(s) for your failure to file or pay required taxes',
        agency: 'Provide the Federal, state, or other agency to which you failed to file or pay taxes',
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
          message: 'Tell us if you have starting trying to fix this issue. If you haven\'t started yet tell us why.',
          note: ''
        }
      },
      collection: {
        summary: {
          title: 'Summary of failed tax filings',
          unknown: '*Provide your tax filing information below*',
          item: 'Agency'
        },
        appendTitle: 'Are there any other instances in the last seven (7) years where you failed to file or pay Federal, state, or other taxes when required by law or ordinance?',
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
          title: 'Not sure of the agency or company address?',
          message: 'Try looking up the agency or company name, this could help you find the address.',
          note: 'Note: If you can only find a phone number try calling and asking for the address.'
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
          message: 'Tell us if you have starting trying to fix this issue. If you haven\'t started yet tell us why.',
          note: ''
        }
      },
      collection: {
        summary: {
          title: 'Summary of employer card abuses',
          unknown: '*Provide your card abuse information below*',
          item: 'Employer'
        },
        appendTitle: 'Are there any other instances in the last seven (7) years where you have been counseled, warned, or disciplined for violating the term of agreement for a travel or credit card provided by your employer?',
        append: 'Add another card abuse/counseling issue'
      }
    },
    credit: {
      title: 'Are you currently utilizing, or seeking assistance from, a credit counseling service or other similar resource to resolve your financial difficulties?',
      heading: {
        explanation: 'Provide explanation',
        name: 'Provide the name of the credit counseling organization or resource',
        telephone: 'Provide the phone number of the credit counseling organization',
        address: 'Provide the location of the credit counseling organization',
        description: 'As a result of this counseling provide a description of any action(s) you have taken to resolve your financial difficulties. If you have not taken any action(s) provide explanation.'
      },
      placeholder: {
        city: 'Please enter the city',
        state: 'Please enter state or territory within the United States'

      },
      help: {
        branch: {
          title: 'Need help with credit counseling?',
          message: 'If you currently utilizing, or seeking assistance from, a credit counseling service or other similar resource to resolve your financial difficulties then click "Yes"',
          note: ''
        },
        explanation: {
          title: 'Need help with the explanation?',
          message: 'We are looking for a full explanation of this credit counseling. Go into as much detail as you need to fully explain.',
          note: ''
        },
        name: {
          title: 'Need help with the counseling organization name?',
          message: 'Provide the name of the counseling organization',
          note: ''
        },
        telephone: {
          title: 'Not sure of this organization\'s phone number?',
          message: 'Try looking up their name, this could help you find their number. ',
          note: ''
        },
        address: {
          title: 'Not sure of this organization\'s address?',
          message: 'Try looking up the organization\'s name, this could help you find the address.',
          note: 'Note: If you can only find a phone number try calling and asking for the address.'
        },
        description: {
          title: 'Need help providing a description?',
          message: 'Tell us if you have starting trying to fix this issue. If you haven\'t started yet tell us why.',
          note: ''
        }
      },
      collection: {
        summary: {
          title: 'Summary of credit counseling',
          unknown: '*Provide your credit counseling details below*',
          item: 'Service'
        },
        appendTitle: 'Are you currently utilizing, or seeking assistance from any other credit counseling service or similar resource to resolve your financial difficulties?',
        append: 'Add another credit counseling entry'
      }
    },
    delinquent: {
      title: 'Other than previously listed, have any of the following happened to you?',
      para: {
        details: 'You will be asked to provide details about each financial obligation that pertains to the items identified below.',
        alimony: '**In the last seven (7) years,** you have been delinquent on alimony or child support payments.',
        judgement: '**In the last seven (7) years,** you had a judgement entered against you. (Include financial obligations for which you were the sole debtor, as well as those for which you were a cosigner or guarantor).',
        lien: '**In the last seven (7) years,** you had a lien placed against your property for failing to pay taxes or other debts. (Include financial obligations for which you were the sole debtor, as well as those for which you were a cosigner or guarantor).',
        federal: 'You are currently delinquent on any Federal debt. (Include financial obligations for which you were the sole debtor, as well as those for which you were a cosigner or guarantor).',
        or: 'or',
        checkAll: 'Check all that apply'
      },
      heading: {
        name: 'Provide the name of agency/organization/individual to which debt is/was owed',
        infractions: 'Did/does this financial issue include any of the following:',
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
          message: 'We are looking for a full explanation of this issue. Go into as much detail as you need to fully explain.',
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
          title: 'Not sure of the court address?',
          message: 'Try looking up the court name, this could help you find the address.',
          note: 'Note: If you can only find a phone number try calling and asking for the address.'
        },
        description: {
          title: 'Need help providing a description?',
          message: 'Tell us if you have starting trying to fix this issue. If you haven\'t started yet tell us why.',
          note: ''
        }
      },
      collection: {
        summary: {
          title: 'Summary of delinquent payment issues',
          unknown: '*Provide your payment issue details below*',
          item: 'Service'
        },
        appendTitle: 'Other than previously listed, are there any other instances of the following occurrences?',
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
        or: 'or',
        checkAll: 'Check all that apply'
      },
      heading: {
        name: 'Provide the name of agency/organization/individual to which debt is/was owed',
        infractions: 'Did/does this financial issue include any of the following:',
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
          message: 'We are looking for a full explanation of this issue. Go into as much detail as you need to fully explain.',
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
          message: 'Tell us if you have starting trying to fix this issue. If you haven\'t started yet tell us why.',
          note: ''
        }
      },
      collection: {
        summary: {
          title: 'Summary of non-payment issues',
          unknown: '*Provide your non-payment details below*',
          item: 'Service'
        },
        appendTitle: 'Other than previously listed, are there any other instances of the following occurrences?',
        append: 'Add another non-payment or excessive late payment'
      }
    }
  },

  citizenship: {
    intro: {
      title: 'Section 5: Citizenship',
      body: 'You will be asked questions about your citizenship status and history and be asked to provide details if necessary.'
    },
    tour: {
      para: 'Take a guided tour through the section'
    },
    review: {
      para: 'View all the sections associated with citizenship at once'
    },
    destination: {
      intro: 'Intro',
      review: 'Review Citizenship',
      status: 'Citizenship status',
      multiple: 'Dual/multiple citizenship',
      passports: 'Foreign passports'
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
          derived: 'Provide your alien registration number (on Certificate of Citizenship - utilize USCIC, CIS, or INS registration number)',
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
          message: 'If you are not sure of the exact date give us your best guess and check the "Estimated" checkbox.',
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
          title: 'Need help with your entry date to the U.S.?',
          message: 'If you are not sure of the exact date give us your best guess and check the "Estimated" checkbox.',
          note: ''
        },
        entrylocation: {
          title: 'Need help with the location of entry?',
          message: 'Provide the location of entry in to the U.S.',
          note: ''
        },
        priorcitizenship: {
          title: 'Need help with this question?',
          message: 'Tell us all of your prior citizenship(s).',
          note: 'Note: You can provide multiple citizenships in this question.'
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
          title: 'Not sure of the court address?',
          message: 'Try looking up the court name, this could help you find the address.',
          note: 'Note: If you can only find a phone number try calling and asking for the address.'
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
          title: 'Need help with your permanent resident card?',
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
        title: 'Dual/Multiple citizenship',
        hasmultiple: 'Do you now or have you EVER held dual/multiple citizenships?',
        citizenship: {
          country: 'Provide country of citizenship',
          dates: 'Provide the date range that you held this citizenship, beginning with the date it was acquired through its termination or "Present," whichever is appropriate',
          how: 'How did you acquire this non-U.S. citizenship you now have or previously had?',
          renounced: 'Have you taken any action to renounce your foreign citizenship?',
          renouncedexplanation: 'Provide explanation',
          current: 'Do you currently hold citizenship with this country?',
          currentexplanation: 'Provide explanation'
        },
        hasforeignpassport: 'Have you EVER been issued a passport (or identity card for travel) by a country other than the U.S.?',
        passport: {
          title: 'Foreign passport information',
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
            unknown: '*Provide citizenship details below*'
          },
          appendTitle: 'Do you have an additional citizenship to provide?',
          append: 'Add another citizenship'
        },
        passport: {
          summary: {
            title: 'Summary of foreign passports',
            item: 'Country',
            unknown: '*Provide passport details below*'
          },
          appendTitle: 'Do you have an additional foreign passport (or identity card) to report?',
          append: 'Add another foreign passport'
        },
        travel: {
          summary: {
            title: 'Summary of foreign travel',
            item: 'Country',
            unknown: '*Provide travel details below*'
          },
          append: 'Add another foreign travel'
        }
      },
      help: {
        hasmultiple: {
          title: 'Need help with multiple citizenships?',
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
            message: 'Tell us the full date range you held this citizenship.',
            note: 'Note: If you are not sure of the exact date give us your best guess and check the "Estimated" checkbox.'
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
    intro: {
      title: 'Section 4: Relationships',
      body: 'You will be asked questions about your personal relationships and be asked to provide details if necessary.'
    },
    tour: {
      para: 'Take a guided tour through the section'
    },
    review: {
      para: 'View all the sections associated with relationships at once'
    },
    destination: {
      intro: 'Intro',
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
          unknown: '*Click to provide details*',
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
          montherinlaw: 'Mother-in-law',
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
          message: 'Tell us all of the citizenships for this person.',
          note: 'Note: You can provide multiple citizenships in this question.'
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
        othernames: 'Has this person used another name?',
        appendOthernames: 'Has this person used any other names?',
        citizenship: 'Provide country(ies) of citizenship',
        location: 'Provide location',
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
        or: 'or',
        label: 'Not applicable'
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
          birthplace: 'Was this person born in the United States of America?'
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
          name: 'Provide full name',
          maiden: 'Is this your cohabitant\'s maiden name?',
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
        },
        citizenship: {
          title: 'Need help with their citizenship?',
          message: 'Tell us all of the citizenships this person has.',
          note: 'Note: You can provide multiple citizenships in this question.'
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
        },
        citizenship: {
          title: 'Need help with their citizenship?',
          message: 'Tell us all of the citizenships this person has.',
          note: 'Note: You can provide multiple citizenships in this question.'
        }
      }
    },
    people: {
      heading: {
        title: 'People who know you well'
      },
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
            title: 'Need help with this date range?',
            message: 'Tell us the entire time you have known this person.',
            note: 'Note: If you are not sure of the exact dates give us your best guess and check the "Estimated" checkbox.'
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
            unknown: '*Provide the person\'s information below*'
          },
          description: 'Summary of people who know you',
          appendLabel: 'Add another person',
          appendTitle: 'Do you have an additional person who knows you well to list?',
          itemType: 'Person'
        }
      }
    }
  },

  branch: {
    value: {
      yes: 'Yes',
      no: 'No'
    },
    label: {
      yes: 'Yes',
      no: 'No'
    },
    confirmation: 'Are you sure you would like to change your answer? This will remove any data currently entered.'
  },

  address: {
    label: 'This address is',
    spinner: 'Verifying your address',
    options: {
      us: {
        label: 'In the<br>United States'
      },
      apoFpo: {
        label: 'APO/FPO/DPO'
      },
      international: {
        label: 'Outside of the<br>United States'
      }
    },
    us: {
      street: {
        label: 'Street address',
        placeholder: 'Enter street address'
      },
      street2: {
        label: 'Apt, suite, building, floor, etc.',
        optional: '(Optional)'
      },
      city: {
        label: 'City',
        placeholder: 'Enter city'
      },
      state: {
        label: 'State',
        placeholder: 'Enter state'
      },
      county: {
        label: 'County',
        placeholder: 'Enter county'
      },
      zipcode: {
        label: 'ZIP Code',
        placeholder: 'Enter ZIP Code'
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
        label: 'Select APO, FPO or DPO'
      },
      street: {
        label: 'Address',
        placeholder: 'Enter address'
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
        label: 'APO/FPO/DPO State Code',
        placeholder: 'Enter state code (AA, AE, AP)'
      },
      apoFpoType: {
        apo: {
          label: 'APO'
        },
        fpo: {
          label: 'FPO'
        },
        dpo: {
          label: 'DPO'
        },
        apoFpo: {
          label: 'APO/FPO/DPO',
          placeholder: 'Enter APO/FPO/DPO'
        }
      }
    }
  },

  spinner: {
    label: 'Verifying'
  },

  suggestions: {
    name: {
      title: 'Alternate names found',
      para: 'Please consider one of the previous names you have used.<p>Using a consistent name helps us to process your case more quickly and eliminate potential misspellings.</p>',
      label: 'Suggested name',
      use: 'Use this name',
      dismiss: 'Use a different name instead'
    },
    address: {
      title: 'Alternate address found',
      para: 'Please consider the highlighted change below.<p>Using the US Postal Service suggested address will help us process your case more quickly.</p>',
      label: 'Suggested address',
      use: 'Use this address',
      dismiss: 'Keep original address',
      alternate: 'Manually correct this address',
      more: 'Add more information'
    }
  },

  intro: {
    tour: {
      title: 'One piece at a time',
      para: 'Go through the form one piece at a time, each subsection on it\'s own page.',
      button: 'Take me to the first section'
    },
    review: {
      title: 'Full section view',
      para: 'See the entire section including all subsections on one page.',
      button: 'Show me the full section'
    },
    errors: 'Looks like we have a few issues, how would you like to fix them?',
    neutral: 'Looks like you still have some items left, how would you like to finish them?',
    complete: 'Everything looks good here but you can still review your answers.'
  },
  review: {
    title: 'Review your answers',
    para: 'View the full section to make sure everything looks right and make changes if needed. You can also skip ahead to the next section and review later.'
  },

  military: {
    intro: {
      title: 'Section 6: Military history',
      body: 'You will be asked questions about your military history and be asked to provide details if necessary.'
    },
    tour: {
      para: 'Take a guided tour through the section'
    },
    review: {
      para: 'View all the sections associated with military history at once'
    },
    destination: {
      intro: 'Intro',
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
          title: 'Why are we asking?',
          message: 'The selective service only applies to men born before after this date.',
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
          title: 'Need help with this explanation?',
          message: 'To help the investigation let us know why you haven\'t registered.',
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
          title: 'Need help with this question?',
          message: 'If you have ever served in the Air Force, Air National Guard, Army, Army National Guard, Coast Guard, Marine Corps, or Navy answer "Yes".',
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
          message: 'If you are not sure of the exact date give us your best guess and check the "Estimated" checkbox.',
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
            message: 'If you are not sure of the exact date give us your best guess and check the "Estimated" checkbox.',
            note: ''
          }
        }
      },
      collection: {
        summary: {
          title: 'Summary of military history',
          item: 'Branch',
          unknown: '*Provide your military history below*'
        },
        appendTitle: 'Do you have additional military service to report?',
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
          title: 'Need help with this date?',
          message: 'If you are not sure of the exact date give us your best guess and check the "Estimated" checkbox.',
          note: ''
        },
        offenses: {
          title: 'Need help with this description?',
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
          unknown: '*Provide the disciplinary procedure below*'
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
          military: [
            'Military',
            '(Army, Navy, Air Force, Marines, etc.)'
          ],
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
          message: 'If you are not sure of the exact dates give us your best guess and check the "Estimated" checkbox.',
          note: ''
        },
        country: {
          title: 'Need help with the name of the country?',
          message: 'The country name',
          note: ''
        },
        rank: {
          title: 'Need help with the highest position/rank held?',
          message: 'The highest rank or position held within the service',
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
          message: 'If you are still in contact with any current or former foreign associates answer "Yes" and provide their contact information below.',
          note: ''
        },
        contact: {
          dates: {
            title: 'Need help with this date range?',
            message: 'Tell us the full time range you were in contact with this person.',
            note: 'Note: If you are not sure of the exact dates give us your best guess and check the "Estimated" checkbox.'
          },
          frequency: {
            title: 'Need help with this question?',
            message: 'Tell us how often you were in contact with this person.',
            note: ''
          }
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
            unknown: '*Provide foreign military contact below*'
          },
          appendTitle: 'Do you have an additional foreign military service contact to report?',
          append: 'Add another contact'
        }
      }
    }
  },

  history: {
    intro: {
      title: 'Section 3: Your history',
      body: 'You will be asked questions about your history and be asked to provide details if necessary. This section includes where you have lived, where you have worked, and where you went to school.'
    },
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
      intro: 'Intro',
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
          unknown: '*Provide residence details*',
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
            unknown: '*Provide employer details*',
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
            title: 'Need help with the physical address?',
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
            title: 'Need help with the physical address?',
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
            unknown: '*Provide your education details*',
            incomplete: 'This education\'s information is incomplete',
            item2: 'Diploma'
          },
          append: 'Add another school'
        },
        diploma: {
          summary: {
            title: 'Summary of degrees/diplomas',
            item: 'Degree',
            unknown: '*Provide your degree/diploma details*'
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
          title: 'Need help with the date of achievement?',
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
          nodates: 'NA',
          unknown: '*Provide federal service below*'
        },
        append: 'Add another former federal service'
      }
    }
  },
  foreign: {
    intro: {
      title: 'Section 7: Foriegn activities',
      body: 'You will be asked questions about your current and previous foreign activities and be asked to provide details if necessary.'
    },
    tour: {
      para: 'Take a guided tour through the section'
    },
    review: {
      para: 'View all the sections associated with foreign activities at once'
    },
    destination: {
      intro: 'Intro',
      review: 'Review Foreign Activities',
      history: 'Your History',
      tbd: 'TBD',
      contacts: 'Foreign Contacts',
      passport: 'U.S. passport information',
      activities: {
        activity: 'Foreign activities',
        direct: 'Direct control',
        indirect: 'Indirect control',
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
          intro: ['Foreign financial interest examples:  stocks, property, investments, bank accounts, ownership of corporate entities, corporate interests or exchange traded funds (ETFs) held in specific geographical or economic sectors.',
            '**Exclude financial interests in companies or diversified mutual funds or diversified ETFs that are publicly traded on a U.S. exchange.**'],
          howAcquired: 'Such as purchase, gift, etc.'
        },
        collection: {
          summary: '*Provide your direct financial interests here*',
          description: 'Summary of financial interests',
          appendTitle: 'Do you, your spouse or legally recognized civil union/domestic partner, cohabitant, or dependent children have any additional foreign financial interests?',
          appendLabel: 'Add another direct interest',
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
            value: 'Provide the current value (in U.S. dollars) or the value at the time control or ownership was sold, lost or otherwise disposed of',
            relinquished: 'Provide the date control or ownership was relinquished',
            explanation: 'Provide explanation of how interest control or ownership was sold, lost or otherwise disposed of'
          },
          label: {
            relinquishedNotApplicable: 'Not applicable',
            or: 'or',
            costEstimated: 'Estimated',
            valueEstimated: 'Estimated',
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
              title: 'Specify everyone who had a foreign financial interests?',
              message: 'Select all people involved with this specific foreign financial interests.',
              note: ''
            },
            acquired: {
              title: 'Need help with when the interest was acquired?',
              message: 'If you are not sure of the exact date give us your best guess and check the "Estimated" checkbox.',
              note: ''
            },
            howAcquired: {
              title: 'Need help with how the interest was acquired?',
              message: 'Provide how the financial interest was acquired',
              note: ''
            },
            cost: {
              title: 'Need help with the cost?',
              message: 'If you are not sure of the exact amount give us your best guess and check the "Estimated" checkbox.',
              note: ''
            },
            value: {
              title: 'Need help with the value?',
              message: 'If you are not sure of the exact amount give us your best guess and check the "Estimated" checkbox.',
              note: ''
            },
            relinquished: {
              title: 'Need help with date relinquished?',
              message: 'Tell us when you were no longer in control or an owner of this foreign financial interest.',
              note: 'Note: If you are not sure of the exact date give us your best guess and check the "Estimated" checkbox.'
            },
            explanation: {
              title: 'Need help with this explanation?',
              message: 'Tell us how you got rid of your ownership or control of this financial interest.',
              note: ''
            }
          },
          coOwner: {
            heading: {
              name: 'Provide full name of co-owner',
              address: 'Provide co-owner\'s current address',
              countries: 'Provide co-owner’s country(ies) of citizenship',
              relationshipNature: 'Provide the nature of your relationship with the co-owner'
            },
            label: {
              address: 'This address is'
            },
            help: {
              countries: {
                title: 'Need help with co-owner\'s country(ies) of citizenship?',
                message: 'Tell us all of the citizenships this person has.',
                note: 'Note: You can provide multiple citizenships in this question.'
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
      },
      indirect: {
        heading: {
          title: 'Have you, your spouse or legally recognized civil union/domestic partner, cohabitant, or dependent children EVER had any foreign financial interests that someone controlled on your behalf?'
        },
        collection: {
          summary: '*Provide your indirect financial interests here*',
          description: 'Summary of financial interests',
          appendTitle: 'Do you, your spouse or legally recognized civil union/domestic partner, cohabitant, or dependent children have any additional foreign financial interests controlled on your behalf?',
          appendLabel: 'Add another indirect interest',
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
            name: 'Provide the name of the individual who controls this financial interest on your behalf',
            relationship: 'Provide this individual’s relationship to you',
            acquired: 'Provide the date the financial interest was acquired',
            howAcquired: 'Provide details regarding how it was acquired',
            cost: 'Provide the cost (in U.S. dollars) at time of acquisition',
            value: 'Provide the current value (in U.S. dollars) or the value at the time control or ownership was sold, lost or otherwise disposed of',
            sold: 'Provide the date interest was sold, lost, or otherwise disposed of',
            explanation: 'Provide explanation if interest was sold, lost, or otherwise disposed of'
          },
          label: {
            firstname: 'First name',
            lastname: 'Last name',
            soldNotApplicable: 'Not applicable',
            or: 'or',
            costEstimated: 'Estimated',
            valueEstimated: 'Estimated',
            interestTypes: {
              yourself: 'Yourself',
              spouse: 'Spouse or legally recognized civil union/domestic partner',
              cohabitant: 'Cohabitant',
              dependentChildren: 'Dependent children'
            }
          },
          help: {
            interestTypes: {
              title: 'Specify everyone who had a foreign financial interests',
              message: 'Select all people involved with this specific foreign financial interest.',
              note: ''
            },
            interestType: {
              title: 'Need help with the indirect interest type?',
              message: 'Provide the type of financial interest',
              note: ''
            },
            name: {
              title: 'Need help with the name of the person?',
              message: 'Provide the name of the individual who controls this financial interest on your behalf',
              note: ''
            },
            acquired: {
              title: 'Need help with this date?',
              message: 'If you are not sure of the exact date give us your best guess and check the "Estimated" checkbox.',
              note: ''
            },
            howAcquired: {
              title: 'Need help with how the interest was acquired?',
              message: 'Provide how the financial interest was acquired',
              note: ''
            },
            cost: {
              title: 'Need help with the cost?',
              message: 'If you are not sure of the exact amount give us your best guess and check the "Estimated" checkbox.',
              note: ''
            },
            value: {
              title: 'Need help with the value?',
              message: 'If you are not sure of the exact amount give us your best guess and check the "Estimated" checkbox.',
              note: ''
            },
            sold: {
              title: 'Need help with date relinquished?',
              message: 'Tell us when you got rid of of this foreign financial interest.',
              note: 'Note: If you are not sure of the exact date give us your best guess and check the "Estimated" checkbox.'
            },
            explanation: {
              title: 'Need help with this explanation?',
              message: 'Tell us how you got rid of of this foreign financial interest.',
              note: ''
            },
            relationship: {
              title: 'Need help with this relationship question?',
              message: 'Let us know how you know this person and give us details of your relationship with them.',
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
                title: 'Need help with co-owner\'s country(ies) of citizenship?',
                message: 'Tell us all of the citizenships this person has.',
                note: 'Note: You can provide multiple citizenships in this question.'
              },
              relationshipNature: {
                title: 'Need help with the nature of this relationship?',
                message: 'Let us know how you know this person and give us details of your relationship with them.',
                note: ''
              }
            }
          },
          coOwners: {
            heading: {
              hasCoOwners: 'Are there any co-owners of the foreign financial interest controlled on your behalf?',
              hasCoOwnersAppend: 'Are there any additional co-owners for this foreign financial interest controlled on your behalf to report?'
            }
          }
        }
      },
      realestate: {
        heading: {
          title: 'Have you, your spouse or legally recognized civil union/domestic partner, cohabitant, or dependent children EVER owned, or do you anticipate owning, or plan to purchase real estate in a foreign country?'
        },
        collection: {
          summary: '*Provide your real estate purchase here*',
          description: 'Summary of financial purchase',
          appendTitle: 'Do you, your spouse or legally recognized civil union/domestic partner, cohabitant, or dependent children have any additional foreign financial interests?',
          appendLabel: 'Add another real estate purchase',
          itemType: 'Purchase'
        },
        interest: {
          para: {
            checkAll: 'Check all that apply',
            howAcquired: 'Such as purchase, gift, etc.',
            realEstateType: 'Such as home, business, etc'
          },
          heading: {
            interestTypes: 'Specify',
            realEstateType: 'Provide the type of real estate property',
            address: 'Provide the location/address of property',
            acquired: 'Provide the date of purchase or to be acquired',
            howAcquired: 'Provide how the foreign real estate was or is to be acquired',
            cost: 'Provide the cost (in U.S. dollars) when sold or expected at time of acquisition',
            sold: 'Provide the date sold, if applicable'
          },
          label: {
            address: 'This address is',
            soldNotApplicable: 'Not applicable',
            or: 'or',
            costEstimated: 'Estimated',
            interestTypes: {
              yourself: 'Yourself',
              spouse: 'Spouse or legally recognized civil union/domestic partner',
              cohabitant: 'Cohabitant',
              dependentChildren: 'Dependent children'
            }
          },
          help: {
            interestTypes: {
              title: 'Specify everyone who had a foreign financial interests',
              message: 'Select all people involved with this specific foreign financial interest.',
              note: ''
            },
            realEstateType: {
              title: 'Need help with the real estate interest type?',
              message: 'Provide the type of real estate interest',
              note: ''
            },
            acquired: {
              title: 'Need help with this date?',
              message: 'If you are not sure of the exact date give us your best guess and check the "Estimated" checkbox.',
              note: ''
            },
            howAcquired: {
              title: 'Need help with how the interest was acquired?',
              message: 'Provide how the financial interest was acquired',
              note: ''
            },
            cost: {
              title: 'Need help with the cost?',
              message: 'If you are not sure of the exact amount give us your best guess and check the "Estimated" checkbox.',
              note: ''
            },
            sold: {
              title: 'Need help with this date?',
              message: 'If the real estate in question was sold tell us when.',
              note: 'Note: If you are not sure of the exact date give us your best guess and check the "Estimated" checkbox.'
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
                title: 'Need help with co-owner\'s country(ies) of citizenship?',
                message: 'Tell us all of the citizenships this person has.',
                note: 'Note: You can provide multiple citizenships in this question.'
              },
              relationshipNature: {
                title: 'Need help with the nature of this relationship?',
                message: 'Let us know how you know this person and give us details of your relationship with them.',
                note: ''
              }
            }
          },
          coOwners: {
            heading: {
              hasCoOwners: 'Are/were/will there any co-owners of this foreign real estate?',
              hasCoOwnersAppend: 'Are there any additional co-owners for this foreign financial interest controlled on your behalf to report?'
            }
          }
        }
      },
      support: {
        heading: {
          title: 'Have you EVER provided financial support for any foreign national?',
          name: 'Provide the name of the foreign national you support or have supported financially',
          address: 'Provide the address of the foreign national listed above',
          relationship: 'Provide the nature of your relationship with the foreign national listed above',
          amount: 'Provide the amount (in U.S. dollars) of all financial support provided',
          frequency: 'Provide the frequency of your support',
          citizenship: 'Provide this foreign national\'s country(ies) of citizenship'
        },
        label: {
          estimated: 'Estimated'
        },
        help: {
          branch: {
            title: 'Need help determining if you have provided financial support to a foreign national?',
            message: 'If you have provided any financial support to a foreign national then select "yes".',
            note: ''
          },
          address: {
            title: 'Need help with the foreign national\'s address?',
            message: 'Provide the current address of the foreign national',
            note: ''
          },
          relationship: {
            title: 'Need help with the relation to the foreign national?',
            message: 'Provide the relationship to the foreign national',
            note: ''
          },
          amount: {
            title: 'Need help with this amount?',
            message: 'If you are not sure of the exact amount give us your best guess and check the "Estimated" checkbox.',
            note: ''
          },
          frequency: {
            title: 'Need help with the frequency?',
            message: 'Provide the frequency of support',
            note: 'Note: Monthly, yearly, once, etc.'
          },
          citizenship: {
            title: 'Need help with the citizenship(s) of this foreign national?',
            message: 'Tell us all of the citizenships this person has.',
            note: 'Note: You can provide multiple citizenships in this question.'
          }
        },
        collection: {
          summary: {
            title: 'Summary of foreign financial support',
            item: 'Support',
            unknown: '*Provide details of foreign financial support below*'
          },
          appendTitle: 'Have you additionally provided financial support for any foreign national?',
          append: 'Add another instance'
        }
      },
      benefit: {
        heading: {
          title: 'As a U.S. citizen, have you, your spouse or legally recognized civil union/domestic partner, cohabitant, or dependent children received in the last seven (7) years, or are eligible to receive in the future, any educational, medical, retirement, social welfare, or other such benefit from a foreign country?',
          interestTypes: 'Specify',
          benefitType: 'Provide the type of benefit',
          benefitFrequency: 'Provide the frequency of the benefit',
          received: 'Provide the date the benefit was received',
          country: 'Provide the name of the country providing the benefit',
          value: 'Provide the total value (in U.S. dollars) of the benefit received.'
        },
        para: {
          checkAll: 'Check all that apply'
        },
        label: {
          otherBenefit: 'Provide explanation',
          otherBenefitType: 'Provide explanation',
          interestTypes: {
            yourself: 'Yourself',
            spouse: 'Spouse or legally recognized civil union/domestic partner',
            cohabitant: 'Cohabitant',
            dependentChildren: 'Dependent children'
          },
          benefitTypes: {
            educational: 'Educational',
            medical: 'Medical',
            retirement: 'Retirement social welfare',
            other: 'Other such benefit (Provide explanation)'
          },
          benefitFrequency: {
            oneTime: 'Onetime benefit',
            future: 'Future benefit',
            continuing: 'Continuing benefit',
            other: 'Other (Provide explanation)'
          }
        },
        collection: {
          summary: '*Provide your financial benefits here*',
          description: 'Summary of financial benefits',
          appendTitle: 'Do you, your spouse or legally recognized civil union/domestic partner, cohabitant, or dependent children receive any additional benefits from a foreign country?',
          appendLabel: 'Add another benefit',
          itemType: 'Benefit'
        },
        help: {
          benefit: {
            title: 'Need help with determining if you have received foreign benefits?',
            message: 'As a U.S. citizen, have you, your spouse or legally recognized civil union/domestic partner, cohabitant, or dependent children received in the last seven (7) years, or are eligible to receive in the future, any educational, medical, retirement, social welfare, or other such benefit from a foreign country?',
            note: ''
          },
          interestType: {
            title: 'Need help with the interest type?',
            message: 'Provide the interest type',
            note: ''
          },
          benefitType: {
            title: 'Need help with the benefit type?',
            message: 'Provide the type of benefit',
            note: ''
          },
          benefitFrequency: {
            title: 'Need help with the benefit frequency?',
            message: 'Provide the frequency of the benefit',
            note: ''
          }
        },
        oneTime: {
          heading: {
            received: 'Provide the date the benefit was received',
            country: 'Provide the name of the country providing the benefit',
            value: 'Provide the total value (in U.S. dollars) of the benefit received.',
            reason: 'Provide the reason this benefit was received',
            obligated: 'As a result of this benefit are you, your spouse or legally recognized civil union/domestic partner, your cohabitant, or dependent children obligated in any way to this foreign country?'
          },
          label: {
            obligatedExplanation: 'If yes provide explanation',
            valueEstimated: 'Estimated'
          },
          para: {
            obligated: 'If yes provide explanation'
          },
          help: {
            received: {
              title: 'Need help with this date?',
              message: 'If you are not sure of the exact date give us your best guess and check the "Estimated" checkbox.',
              note: ''
            },
            country: {
              title: 'Need help with the country?',
              message: 'Provide the name of the country providing the benefit',
              note: ''
            },
            value: {
              title: 'Need help with the value?',
              message: 'Provide the total value (in U.S. dollars) of the benefit received',
              note: ''
            },
            reason: {
              title: 'Need help with the reason?',
              message: 'Provide the reason this benefit was received',
              note: ''
            },
            obligated: {
              title: 'Need help with knowing if you are obligated?',
              message: 'As a result of this benefit are you, your spouse or legally recognized civil union/domestic partner, your cohabitant, or dependent children obligated in any way to this foreign country',
              note: ''
            }
          }
        },
        future: {
          heading: {
            begin: 'Provide the date the benefit will begin',
            frequency: 'Provide the frequency the benefit will be received',
            country: 'Provide the name of the country providing the benefit',
            value: 'Provide the total value (in U.S. dollars) of the benefit to be received.',
            reason: 'Provide the reason this benefit will be received',
            obligated: 'As a result of this benefit are you, your spouse or legally recognized civil union/domestic partner, your cohabitant, or dependent children obligated in any way to this foreign country?'
          },
          label: {
            obligatedExplanation: 'If yes provide explanation',
            valueEstimated: 'Estimated',
            frequency: {
              annually: 'Annually',
              quarterly: 'Quarterly',
              monthly: 'Monthly',
              weekly: 'Weekly',
              other: 'Other (Provide explanation)'
            }
          },
          para: {
            obligated: 'If yes provide explanation',
            frequencyOther: 'Provide explanation'
          },
          help: {
            begin: {
              title: 'Need help with this date?',
              message: 'If you are not sure of the exact date give us your best guess and check the "Estimated" checkbox.',
              note: ''
            },
            frequency: {
              title: 'Need help with the benefit frequency?',
              message: 'Provide the frequency the benefit will be received',
              note: ''
            },
            country: {
              title: 'Need help with the country?',
              message: 'Provide the name of the country providing the benefit',
              note: ''
            },
            value: {
              title: 'Need help with the value?',
              message: 'Provide the total value (in U.S. dollars) of the benefit to be received',
              note: ''
            },
            reason: {
              title: 'Need help with the reason?',
              message: 'Provide the reason this benefit will be received',
              note: ''
            },
            obligated: {
              title: 'Need help with knowing if you are obligated?',
              message: 'As a result of this benefit are you, your spouse or legally recognized civil union/domestic partner, your cohabitant, or dependent children obligated in any way to this foreign country',
              note: ''
            }
          }
        },
        continuing: {
          heading: {
            began: 'Provide the date the benefit began',
            end: 'Provide the date the benefit is expected to end',
            frequency: 'Provide the frequency that this benefit is received',
            country: 'Provide the name of the country providing the benefit',
            value: 'Provide the total value (in U.S. dollars) of the benefit to be received',
            reason: 'Provide the reason this benefit will be received',
            obligated: 'As a result of this benefit are you, your spouse or legally recognized civil union/domestic partner, your cohabitant, or dependent children obligated in any way to this foreign country?'
          },
          label: {
            obligatedExplanation: 'If yes provide explanation',
            valueEstimated: 'Estimated',
            frequency: {
              annually: 'Annually',
              quarterly: 'Quarterly',
              monthly: 'Monthly',
              weekly: 'Weekly',
              other: 'Other (Provide explanation)'
            }
          },
          para: {
            obligated: 'If yes provide explanation',
            frequencyOther: 'Provide explanation'
          },
          help: {
            began: {
              title: 'Need help with this date?',
              message: 'If you are not sure of the exact date give us your best guess and check the "Estimated" checkbox.',
              note: ''
            },
            end: {
              title: 'Need help with this date?',
              message: 'If you are not sure of the exact date give us your best guess and check the "Estimated" checkbox.',
              note: ''
            },
            frequency: {
              title: 'Need help with the benefit frequency?',
              message: 'Provide the frequency the benefit will be received',
              note: ''
            },
            country: {
              title: 'Need help with the country?',
              message: 'Provide the name of the country providing the benefit',
              note: ''
            },
            value: {
              title: 'Need help with the value?',
              message: 'Provide the total value (in U.S. dollars) of the benefit to be received',
              note: ''
            },
            reason: {
              title: 'Need help with the reason?',
              message: 'Provide the reason this benefit will be received',
              note: ''
            },
            obligated: {
              title: 'Need help with knowing if you are obligated?',
              message: 'As a result of this benefit are you, your spouse or legally recognized civil union/domestic partner, your cohabitant, or dependent children obligated in any way to this foreign country',
              note: ''
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
        employeraddress: 'Provide the address of the foreign national\'s current employer, or provide the address of their most recent employer if not currently employed',
        hasaffiliations: 'Is this foreign national affiliated with a foreign government, military, security, defense industry, or intelligence service?',
        affiliations: 'Describe the contact\'s relationship with the foreign government, military, security, defense industry, or intelligence service',
        explanation: 'Explanation'
      },
      para: {
        includes: 'Include associates as well as relatives, not previously listed in the relatives section.',
        definition: 'A foreign national is defined as any person who is not a citizen or national of the U.S.',
        or: 'or',
        checkall: 'Check all that apply'
      },
      label: {
        idk: 'I don\'t know',
        yes: 'Yes',
        no: 'No',
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
          message: 'Let us know when you first met this person.',
          note: 'Note: If you are not sure of the exact date give us your best guess and check the "Estimated" checkbox.'
        },
        lastcontact: {
          title: 'Need help with the date of your last contact?',
          message: 'Tell us when you last had contact with this person.',
          note: 'Note: If you are not sure of the exact date give us your best guess and check the "Estimated" checkbox.'
        },
        methods: {
          title: 'Need help with the methods of your communication?',
          message: 'Let us know all of the ways you communicated with this person.',
          note: 'Note: Electronic includes social media.'
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
          title: 'Has this person used any other names or nicknames?',
          message: 'If this person has a nickname, has a different maiden name, or has used any other names answer "Yes".',
          note: 'Note: If this person has multiple names you will list each one separately.'
        },
        citizenship: {
          title: 'Need help with their citizenship(s)?',
          message: 'Tell us all of the citizenships this person has.',
          note: 'Note: You can provide multiple citizenships in this question.'
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
          unknown: '*Provide the foreign national below*'
        },
        appendTitle: 'Do you have, or have you had, close and/or continuing contact with any additional foreign national within the last seven (7) years with whom you, or your spouse, or cohabitant are bound by affection, influence, common interests, and/or obligation?',
        appendMessage: [
          'Include associates as well as relatives, not previously listed in the relatives section.'
        ],
        append: 'Add another association'
      }
    },

    business: {
      advice: {
        heading: {
          title: 'Have you in the last seven (7) years provided advice or support to any individual associated with a foreign business or other foreign organization that you have not previously listed as a former employer?',
          description: 'Provide a description of advice/support provided',
          name: 'Provide the name of the individual to whom advice or support was provided',
          organization: 'Provide the name of the foreign organization or foreign business with whom the individual is associated',
          country: 'Provide the country of origin for the organization or business',
          dates: 'Provide the date(s) during which this advice or support was provided',
          compensation: 'Describe what compensation, if any, was provided for your service'
        },
        para: {
          branch: 'Answer "No" if **all** your advice or support was authorized pursuant to official U.S. Government business.'
        },
        help: {
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
            title: 'Need help with the dates the advice or support was provided?',
            message: 'Tell us the date or date range when this happened.',
            note: 'Note: If you are not sure of the exact date give us your best guess and check the "Estimated" checkbox.'
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
            unknown: '*Provide details of foreign business advice below*'
          },
          appendTitle: 'Have you in the last seven (7) years provided advice or support to any other individual associated with a foreign business or other foreign organization that you have not previously listed as a former employer?',
          appendMessage: [
            'Answer **"No"** if all your advice or support was authorized pursuant to official U.S. Government business.'
          ],
          append: 'Add another instance of advice/support'
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
            'For this question, "Immediate Family" means your spouse or legally recognized civil union/domestic partner, parents, step-parents, siblings, half and step-siblings, children, step-children, and cohabitant.',
            'Answer **"No"** if all the advice or support was authorized pursuant to official U.S. Government business.'
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
            message: 'Tell us when someone or an agency asked you to provide advice or serve as a consultant.',
            note: 'Note: If you are not sure of the exact date give us your best guess and check the "Estimated" checkbox.'
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
            unknown: '*Provide details of family foreign business advice below*'
          },
          appendTitle: 'Have you, your spouse or legally recognized civil union/domestic partner, cohabitant, or any member of your immediate family in the last seven (7) years been asked to provide advice or serve as a consultant, even informally, by any other foreign government official or agency?',
          appendMessage: [
            'Answer **"No"** if all the advice or support was authorized pursuant to official U.S. Government business.'
          ],
          append: 'Add another instance of advice/support'
        }
      },
      employment: {
        heading: {
          title: 'Has any foreign national in the last seven (7) years offered you a job, asked you to work as a consultant, or consider employment with them?',
          name: 'Provide the name of the foreign national who made the offer',
          description: 'Provide a description of the position offered',
          date: 'Provide the date when this offer was extended',
          address: 'Provide the location where this occurred',
          accepted: 'Did you accept the offer?'
        },
        label: {
          explanation: 'Explanation',
          address: 'Did this occur in the United States?'
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
            message: 'Tell us when the offer was extended to you.',
            note: 'Note: If you are not sure of the exact date give us your best guess and check the "Estimated" checkbox.'
          },
          address: {
            title: 'Need help with the location?',
            message: 'Provide the address of the location where the offer took place',
            note: ''
          },
          accepted: {
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
            unknown: '*Provide details of foreign business job below*'
          },
          appendTitle: 'Has any additional foreign national, in the last seven (7) years, offered you a job, asked you to work a consultant, or consider employment with them?',
          append: 'Add another job offer'
        }
      },
      ventures: {
        heading: {
          title: 'Have you in the last seven (7) years been involved in any other type of business venture with a foreign national not described above?',
          name: 'Provide the full name of this foreign national',
          address: 'Provide the full current address of this foreign national',
          citizenship: 'Provide the citizenship(s) of this foreign national',
          description: 'Provide a description of the business venture',
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
            note: 'Note: You can provide multiple citizenships in this question.'
          },
          description: {
            title: 'Need help describing the business venture?',
            message: 'Provide an accurate description of the business venture',
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
            title: 'Need help with the association to the venture?',
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
            unknown: '*Provide details of foreign business ventures below*'
          },
          appendTitle: 'Have you, in the last seven (7) years, been involved in any other type of business venture with a foreign national not described above?',
          appendMessage: [
            'Own, co-own, serve as a business consultant, provide financial support, etc.'
          ],
          append: 'Add another business venture'
        }
      },
      conferences: {
        heading: {
          title: 'Have you in the last seven (7) years attended or participated in any conferences, trade shows, seminars, or meetings outside the U.S.?',
          description: 'Provide the name and description of the event',
          sponsor: 'Provide the name of sponsoring organization',
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
            unknown: '*Provide details of conference below*'
          },
          appendTitle: 'Have you in the last seven (7) years, attended or participated in any additional conferences, trade shows, seminars, or meetings outside the U.S.?',
          appendMessage: [
            'Do not include those you attended or participated in on official business for the U.S. government.'
          ],
          append: 'Add another event'
        }
      },
      contact: {
        heading: {
          title: 'Have you or any member of your immediate family in the last seven (7) years had any contact with a foreign government, its establishment or its representatives, whether inside or outside the U.S.?',
          name: 'Provide the name of the individual involved in the contact',
          location: 'Provide the location of the contact',
          date: 'Provide the date of contact',
          governments: 'Provide the foreign government(s) involved',
          establishment: 'Provide the type of establishment (such as embassy, consulate, agency, military service, intelligence or security service, etc.) involved',
          representatives: 'Provide the names of foreign representatives involved in contact',
          purpose: 'Provide the purpose/circumstances of contact',
          hassubsequent: 'Was there any subsequent contact initiated by you, your immediate family member, or a representative of the foreign organization?',
          hassubsequent2: 'Do you have another subsequent contact to report for this event?',
          subsequent: 'Provide the purpose of the subsequent contact',
          recent: 'Provide the date of most recent contact',
          future: 'Provide plans for future contact'
        },
        para: {
          intro: 'For Section 7, "Immediate Family" means your spouse, parents, step-parents, siblings, half and step-siblings, children, stepchildren, and cohabitant.',
          branch: [
            'Such as  embassy, consulate, agency, military service, intelligence or security service, etc.',
            'Answer "No" if the contact was for routine visa applications and border crossings related to either official U.S.  Government travel, foreign travel on a U.S. passport, or as a U.S. military service member in conjunction with a U.S. Government military duty.'
          ]
        },
        label: {
          location: 'Did this contact take place in the United States of America?'
        },
        placeholder: {
          city: 'Please enter the city',
          country: 'Please enter the country'
        },
        help: {
          branch: {
            title: 'Need help determining if you have any foreign government contact?',
            message: 'If you have any foreign government contact then select "yes".',
            note: ''
          },
          location: {
            title: 'Need help with the location?',
            message: 'Provide the location of the contact.',
            note: ''
          },
          date: {
            title: 'Need help with the date of contact?',
            message: 'Provide the approximate date of contact.',
            note: ''
          },
          governments: {
            title: 'Need help with the governments associated?',
            message: 'Provide the governments associated with this contact.',
            note: 'Note: You can provide multiple government in this question.'
          },
          establishment: {
            title: 'Need help with the establishment?',
            message: 'Provide the establishment.',
            note: ''
          },
          representatives: {
            title: 'Need help with the representatives?',
            message: 'Provide the representatives.',
            note: ''
          },
          purpose: {
            title: 'Need help with the purpose of contact?',
            message: 'Provide the purpose/circumstances of the contact.',
            note: ''
          },
          hassubsequent: {
            title: 'Need help with any subsequent contacts?',
            message: 'If there were any subsequent contact initiated by you or your immediate family select "Yes".',
            note: ''
          },
          subsequent: {
            title: 'Need help with the purpose of the subsequent contact?',
            message: 'Provide the purpose of the subsequent contact.',
            note: ''
          },
          recent: {
            title: 'Need help with the recent date of contact?',
            message: 'Provide the approximate date of the most recent contact.',
            note: ''
          },
          future: {
            title: 'Need help explaining future plans of contact?',
            message: 'Provide a description of any future plans of contact.',
            note: ''
          }
        },
        collection: {
          summary: {
            title: 'Summary of foreign government contacts',
            item: 'Contact',
            unknown: '*Provide details of contact below*'
          },
          appendTitle: 'Have you or any member of your immediate family in the last seven (7) years had any additional contact with a foreign government, its establishment or its representatives, whether inside or outside the U.S.?',
          appendMessage: [
            'Such as embassy, consulate, agency, military service, intelligence or security service, etc.',
            'Answer "No" if the contact was for routine visa applications and border crossings related to either official U.S. Government travel, foreign travel on a U.S. passport, or as a U.S. military service member in conjunction with a U.S. Government military duty.'
          ],
          append: 'Add another contact'
        }
      },
      sponsorship: {
        heading: {
          title: 'Have you in the last seven (7) years sponsored any foreign national to come to the U.S. as a student, for work, or for permanent residence?',
          name: 'Provide the name of the sponsored foreign national',
          birthdate: 'Provide the date of birth for the sponsored foreign national',
          birthplace: 'Provide the place of birth for the sponsored foreign national',
          address: 'Provide the current street address of the sponsored foreign national',
          citizenship: 'Provide the country(ies) of citizenship for the sponsored foreign national',
          organization: 'Provide the name of the organization through which sponsorship was arranged, if applicable',
          organizationaddress: 'Provide the address of the organization through which the sponsorship was arranged, if applicable',
          dates: 'Provide the dates of stay in the U.S. for the sponsored foreign national',
          residence: 'Provide the address of the sponsored foreign national while residing in the U.S.',
          stay: 'Provide the purpose of the stay in the U.S. for the sponsored foreign national',
          sponsorship: 'Provide the purpose of your sponsorship for the sponsored foreign national'
        },
        label: {
          idk: 'I don\'t know',
          birthplace: 'Was this person born in the United States of America?'
        },
        para: {
          or: 'or'
        },
        placeholder: {
          city: 'Please enter the city of birth',
          country: 'Please enter the country of birth'
        },
        help: {
          branch: {
            title: 'What is a foreign national?',
            message: 'A foreign national is defined as any person who is not a citizen or national of the U.S.',
            note: ''
          },
          birthdate: {
            title: 'Need help with the foreign national\'s date of birth?',
            message: 'If you are not sure of the exact date give us your best guess and check the "Estimated" checkbox.',
            note: ''
          },
          birthplace: {
            title: 'Need help with the place of birth?',
            message: 'Provide the foreign nationals place of birth.',
            note: ''
          },
          address: {
            title: 'Need help with the current street address?',
            message: 'Provide the current street address of the foreign national.',
            note: ''
          },
          citizenship: {
            title: 'Need help with the foreign nationals citizenship(s)?',
            message: 'Tell us all of the citizenships this foreign national has.',
            note: 'Note: You can provide multiple citizenships in this question.'
          },
          organization: {
            title: 'Need help with the organization?',
            message: 'Provide the organization name through which the sponsorship was arranged.',
            note: ''
          },
          organizationaddress: {
            title: 'Not sure of the organization\'s address?',
            message: 'Try looking up the organization\'s name, this could help you find the address.',
            note: 'Note: If you can only find a phone number try calling and asking for the address'
          },
          dates: {
            title: 'Need help with the dates of stay?',
            message: 'Tell us the full date range the sponsored foreign national was in the U.S.',
            note: 'Note: If you are not sure of the exact dates give us your best guess and check the "Estimated" checkbox.'
          },
          residence: {
            title: 'Need help with the residence?',
            message: 'Provide the address of the sponsored foreign national.',
            note: ''
          },
          stay: {
            title: 'Need help with the purpose of the stay?',
            message: 'Provide the purpose for the stay within the U.S.',
            note: ''
          },
          sponsorship: {
            title: 'Need help with the purpose of the sponsorship?',
            message: 'Provide the purpose of the sponsorship.',
            note: ''
          }
        },
        collection: {
          summary: {
            title: 'Summary of foreign national sponsorship',
            item: 'Sponsorship',
            unknown: '*Provide details of sponsorship below*'
          },
          appendTitle: 'Have you in the last seven (7) years sponsored any additional foreign national to come to the U.S. as a student, for work, or for permanent residence?',
          appendMessage: [],
          append: 'Add another sponsorship'
        }
      },
      political: {
        heading: {
          title: 'Have you EVER held political office in a foreign country?',
          position: 'Provide the position held',
          dates: 'Provide the dates you held political office',
          country: 'Provide the name of the country involved',
          reason: 'Provide the reason(s) for these activities',
          eligibility: 'Provide your current eligibility to hold political office in a foreign country'
        },
        label: {
          idk: 'I don\'t know',
          birthplace: 'Was this person born in the United States of America?'
        },
        para: {
          or: 'or'
        },
        placeholder: {
          city: 'Please enter the city of birth',
          country: 'Please enter the country of birth'
        },
        help: {
          branch: {
            title: 'Need help determining if you have any foreign government sponsorship?',
            message: 'If you have any foreign government sponsorship then select "yes".',
            note: ''
          },
          position: {
            title: 'Need help with the position?',
            message: 'Provide the position held.',
            note: ''
          },
          dates: {
            title: 'Need help with this date range?',
            message: 'Tell us the full date range you held this political office.',
            note: 'Note: If you are not sure of the exact dates give us your best guess and check the "Estimated" checkbox.'
          },
          country: {
            title: 'Need help with the country involved?',
            message: 'Provide the country involved.',
            note: ''
          },
          reason: {
            title: 'Need help with the reason?',
            message: 'Describe the reason for these activities.',
            note: ''
          },
          eligibility: {
            title: 'Need help with your current eligibility?',
            message: 'Provide your current eligibility for the political office.',
            note: ''
          }
        },
        collection: {
          summary: {
            title: 'Summary of foreign political office',
            item: 'Office',
            unknown: '*Provide details of political office below*'
          },
          appendTitle: 'Have you EVER held any additional political office in a foreign country?',
          appendMessage: [],
          append: 'Add another political office'
        }
      },
      voting: {
        heading: {
          title: 'Have you EVER voted in the election of a foreign country?',
          date: 'Provide the date you voted in the foreign election',
          country: 'Provide the name of the country involved',
          reason: 'Provide the reason(s) for these activities',
          eligibility: 'Provide your current eligibility to vote in a foreign country'
        },
        help: {
          branch: {
            title: 'Need help determining if you have any foreign government sponsorship?',
            message: 'If you have any foreign government sponsorship then select "yes".',
            note: ''
          },
          date: {
            title: 'Need help with this date?',
            message: 'If you are not sure of the exact date give us your best guess and check the "Estimated" checkbox.',
            note: ''
          },
          country: {
            title: 'Need help with the country you voted in?',
            message: 'Provide the country name.',
            note: ''
          },
          reason: {
            title: 'Need help with the reason?',
            message: 'Describe the reason for these activities.',
            note: ''
          },
          eligibility: {
            title: 'Need help with your current eligibility?',
            message: 'Provide your current eligibility for voting.',
            note: ''
          }
        },
        collection: {
          summary: {
            title: 'Summary of foreign elections',
            item: 'Election',
            unknown: '*Provide details of election below*'
          },
          appendTitle: 'Do you have other instances of voting in the election of a foreign country to report?',
          appendMessage: [],
          append: 'Add another election'
        }
      }
    },
    travel: {
      heading: {
        outside: 'Have you traveled outside the U.S. in the last past seven (7) years?',
        official: 'Has your travel in the last (7) years been solely for U.S. Government business/military overseas assignment on official government orders?',
        country: 'Provide the country visited',
        dates: 'Provide the dates of your travel to this country',
        days: 'Provide the total number of days involved in the visit(s)',
        purpose: 'Provide the purpose of the travel to this country',
        questioned: 'While traveling to, or in this country, were you questioned, searched, or otherwise detained (other than for normal customs requirements) by the local customs or security service officials when entering or leaving this country?',
        encounter: 'While traveling to or in this country, were you involved in any encounter with the police?',
        contacted: 'While traveling to or in this country, were you contacted by, or in contact with any person known or suspected of being involved or associated with foreign intelligence, terrorist, security, or military organizations?',
        counter: 'While traveling to, or in this country, were you involved in any counterintelligence or security issues not reported?',
        interest: 'While traveling to or in this country, were you contacted by, or in contact with anyone exhibiting excessive knowledge of or undue interest in you or your job?',
        sensitive: 'While traveling to or in this country, were you contacted by, or in contact with anyone attempting to obtain classified information or unclassified, sensitive information?',
        threatened: 'While traveling to, or in this country, were you threatened, coerced, or pressured in any way to cooperate with a foreign government official or foreign intelligence or security service?',
        explanation: 'Provide explanation'
      },
      para: {
        personal: 'I.e., no personal trips in conjunction with the official U.S. Government business.',
        checkall: 'Check all that apply',
        explanation: 'If yes provide explanation.',
        timeframe: [
          'Respond for the time frame of the last seven (7) years, beginning with the most recent and working backwards.',
          'Do not list trips that ONLY involved travel on official U.S. Government business on official government orders, but you must include any personal trips made in conjunction with the official U.S. Government travel.'
        ]
      },
      label: {
        one: '1-5',
        six: '6-10',
        eleven: '11-20',
        twentyone: '21-30',
        more: 'More than 30',
        many: 'Many short trips',
        business: 'Business/professional',
        volunteer: 'Volunteer activities',
        education: 'Education',
        tourism: 'Tourism',
        conference: 'Trade shows, conferences, and seminars',
        family: 'Visit family or friends',
        other: 'Other'
      },
      help: {
        outside: {
          title: 'Have you traveled outside the U.S.?',
          message: 'This includes many short trips to the same country.',
          note: ''
        },
        official: {
          title: 'Need help with this question?',
          message: 'You will need to enter an item for each trip. <br />Respond for the time frame of the last seven (7) years, beginning with the most recent and working backwards. <br />Do not list trips that ONLY involved travel on official U.S. Government business on official government orders, but you must include any personal trips made in conjunction with the official U.S. Government travel.',
          note: ''
        },
        country: {
          title: 'Need help with the country?',
          message: 'Provide the name of the country you visited.',
          note: ''
        },
        dates: {
          title: 'Need help with this date range?',
          message: 'Tell us the full date range you visited this country including many short trips.',
          note: 'Note: This date range can cover many trips to the same country.'
        },
        days: {
          title: 'Need help with how many days?',
          message: 'Let us know how long your travel was.',
          note: 'Note: Many short trips means a gap between trips that is less than 6 months. For a travel gap longer than 6 months add another travel item.'
        },
        purpose: {
          title: 'Need help with the purpose?',
          message: 'Provide the purpose of the visit.',
          note: ''
        },
        questioned: {
          title: 'Were you questioned during the visit?',
          message: 'Provide an explanation for the questioning.',
          note: ''
        },
        encounter: {
          title: 'Did you encounter the police during the visit?',
          message: 'Provide an explanation for police involvement.',
          note: ''
        },
        contacted: {
          title: 'Were you contacted of any suspicious people?',
          message: 'Provide an explanation of the contact.',
          note: ''
        },
        counter: {
          title: 'Were you involved in any security issues?',
          message: 'Provide a description of your participation or experience.',
          note: ''
        },
        interest: {
          title: 'Did anyone seem to have a strong interest in your visit?',
          message: 'Provide a description detailing the circumstances.',
          note: ''
        },
        sensitive: {
          title: 'Did anyone attempt to obtain sensitive information from you?',
          message: 'Provide an accurate description.',
          note: ''
        },
        threatened: {
          title: 'Any coercion or pressure from the foreign government?',
          message: 'Provide a detailed account of the circumstances.',
          note: ''
        }
      },
      collection: {
        summary: {
          title: 'Summary of foreign travel',
          item: 'Travel',
          unknown: '*Provide details of your travel below*'
        },
        appendTitle: 'Do you have additional travel outside the U.S. in the last seven (7) years for other than solely U.S. Government business on official government orders?',
        appendMessage: [],
        append: 'Add another travel'
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
      intro: 'Intro',
      police: 'Police record',
      offenses: 'Offenses',
      additionalOffenses: 'Additional offenses',
      domesticViolence: 'Domestic violence',
      court: 'Non-criminal court actions',
      investigations: {
        history: 'Ever been investigated',
        revoked: 'Denied',
        debarred: 'Debarment'
      },
      technology: {
        unauthorized: 'Unauthorized access',
        manipulating: 'Manipulating access',
        unlawful: 'Unlawful use'
      },
      associations: {
        terrorist: 'Terrorist organization',
        engaged: 'Engaged in terrorism',
        advocating: 'Advocating',
        overthrow: 'Membership - overthrow',
        violence: 'Membership - violence or force',
        activities: 'Activities to overthrow',
        terrorism: 'Terrorism association'
      },
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
        chargedetails: 'Provide all the charges brought against you for this offense, and the outcome of each charged offense',
        chargeType: 'Type of charge',
        courtdate: 'Date of outcome',
        sentenced: 'Were you sentenced as a result of this offense?',
        needmore: 'Since you answered yes we need more information',
        sentenceDescription: 'Provide a description of the sentence',
        exceedsYear: 'Were you sentenced to imprisonment for a term exceeding 1 year?',
        incarcerated: 'Were you incarcerated as a result of that sentence for not less than 1 year?',
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
        intro1: 'For this section report information regardless of whether the record in your case has been sealed, expunged, or otherwise stricken from the court record, or the charge was dismissed.',
        intro2: 'You need not report convictions under the Federal Controlled Substances Act for which the court issued an expungement order under the authority of 21 U.S.C 844 or 18 U.S.C. 3607.',
        intro3: '**Be sure to include all incidents whether occurring in the U.S. or abroad.**',
        chargedetails: 'Such as found guilty, found not-guilty, charge dropped or "nolle pros," etc. If you were found guilty of or pleaded guilty to lesser offense, list separately both the original charge and the lesser offense.',
        otherOffense: {
          intro: 'Other than those offenses already listed, have you EVER had the following happen to you?',
          first: '**Have you EVER been convicted** in any court of the United States of a crime, sentenced to imprisonment for a term exceeding 1 year for that crime, and incarcerated as a result of that sentence for not less than 1 year? Include all qualifying convictions in Federal, state, local, or military court, even if previously listed on this form',
          second: '**Have you EVER been charged** with any felony offense? Include those under the Uniform Code of Military Justice and non-military/civilian offenses',
          third: '**Have you EVER been convicted** of an offense involving domestic violence or a crime of violence (such as battery or assault) against your child, dependent, cohabitant, spouse or legally recognized civil union/domestic partner, former spouse or legally recognized civil union/domestic partner, or someone with whom you share a child in common?',
          fourth: '**Have you EVER been charged** with an offense involving firearms or explosives?',
          fifth: '**Have you EVER been charged** with an offense involving alcohol or drugs?'
        },
        or: 'or'
      },
      label: {
        summons: '**In the last seven (7) years** have you been issued a summons, citation, or ticket to appear in court in a criminal proceeding against you? Do not check if all the citations involved traffic infractions where the fine was than $300 and did not include alcohol or drugs.',
        arrests: '**In the last seven (7) years** have you been arrested by any police officer, sheriff, marshal or any other type of law enforcement official?',
        charges: '**In the last seven (7) years** have you been charged with, convicted of, or sentenced for a crime in any court? Include all qualifying charges, convictions or sentences in any federal, state, local, military, or non-U.S. court, even if previously listed on this form.',
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
        domesticViolenceAppend: 'Do you have another domestic violence protective order or restraining order currently issued against you to report?',
        notApplicable: 'Not applicable'
      },
      help: {
        summons: {
          title: 'Need help with a summons, citation, or ticket?',
          message: 'Answer "No" if all the citations involved traffic infractions where the fine was less than $300 and did not include alcohol or drugs.',
          note: ''
        },
        arrests: {
          title: 'Need help with an arrest?',
          message: 'If you were arrested answer "Yes" and provide the required information',
          note: ''
        },
        charges: {
          title: 'Need help with a criminal charge?',
          message: 'Include all qualifying charges, convictions or sentences in any federal, state, local, military, or non-U.S. court, even if previously listed on this form.',
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
          title: 'Need help with the date this offense?',
          message: 'Tell us the date the actual offense happened.',
          note: 'If you are not sure of the exact date give us your best guess and check the "Estimated" checkbox.'
        },
        description: {
          title: 'Need help describing this offense?',
          message: 'Give us details about how this offense happened. Be as clear and in depth as you can.',
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
          title: 'Need help with this address?',
          message: 'Tell us where the event happened.',
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
          title: 'Not sure of the agency address?',
          message: 'Try looking up the agency name, this could help you find the address.',
          note: 'Note: If you can only find a phone number try calling and asking for the address.'
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
          title: 'Not sure of the court address?',
          message: 'Try looking up the court name, this could help you find the address.',
          note: 'Note: If you can only find a phone number try calling and asking for the address.'
        },
        chargeType: {
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
          title: 'Need help with the outcome date?',
          message: 'Tell us when the outcome was given (such as found guilty, found...).',
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
        },
        otherConviction: {
          title: 'Need help with this conviction question?',
          message: 'Include all qualifying convictions in Federal, state, local, or military court, even if previously listed on this form.',
          note: ''
        },
        otherFelony: {
          title: 'Need help with this charge question?',
          message: 'Include those under the Uniform Code of Military Justice and non-military/civilian felony offenses.',
          note: ''
        },
        domesticExplanation: {
          title: 'Not sure what to put here?',
          message: 'Tell us about the order against you.',
          note: 'Note: Go into as much detail as you need to fully explain.'
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
          unknown: '*Provide offense below*'
        },
        appendTitle: 'Do you have any other offenses where any of the following has happened to you?',
        appendMessage: [
          '- **In the last seven (7) years** have you been issued a summons, citation, or ticket to appear in court in a criminal proceeding against you? Do not check if all the citations involved traffic infractions where the fine was than $300 and did not include alcohol or drugs.',
          '- **In the last seven (7) years** have you been arrested by any police officer, sheriff, marshal or any other type of law enforcement official?',
          '- **In the last seven (7) years** have you been charged with, convicted of, or sentenced for a crime in any court? Include all qualifying charges, convictions or sentences in any federal, state, local, military, or non-U.S. court, even if previously listed on this form.',
          '- **In the last seven (7) years** have you been or are you currently on probation or parole?',
          '- Are you currently on trial or awaiting a trial on criminal charges?'
        ],
        append: 'Add another offense'
      }
    },
    investigations: {
      history: {
        heading: {
          title: 'Has the U.S. Government (or a foreign government) EVER investigated your background and/or granted you a security clearance eligibility/access?',
          agency: 'Provide the investigating agency',
          completed: 'Date the investigation was completed',
          issued: 'Provide the name of agency that issued the clearance eligibility/access if different from the investigating agency',
          granted: 'Provide the date clearance eligibility/access was granted',
          clearance: 'Provide the level of clearance eligibility/access granted',
          agencyExplanation: 'Provide the name of the bureau, government, or explanation',
          clearanceExplanation: 'Provide an explanation'
        },
        label: {
          idk: 'I don\'t know',
          agency: {
            dod: 'U.S. Department of Defense',
            dos: 'U.S. Department of State',
            opm: 'U.S. Office of Personnel Management',
            fbi: 'Federal Bureau of Investigation',
            dot: [
              'U.S. Department of Treasury',
              '(provide name of bureau)'
            ],
            dhs: 'U.S. Department of Homeland Security',
            foreign: [
              'Foreign government',
              '(provide name of government)'
            ],
            other: [
              'Other',
              '(provide explanation)'
            ]
          },
          level: {
            none: 'None',
            confidential: 'Confidential',
            secret: 'Secret',
            topsecret: 'Top Secret',
            sci: [
              'Sensitive Compartmented Information',
              '(SCI)'
            ],
            q: 'Q',
            l: 'L',
            foreign: 'Issued by foreign country',
            other: [
              'Other',
              '(provide explanation)'
            ]
          }
        },
        para: {
          or: 'or'
        },
        collection: {
          description: 'Summary of investigations',
          item: 'Investigation',
          unknown: '*Provide investigation details below*',
          appendTitle: 'Do you have another investigation to enter?',
          appendLabel: 'Add another investigation'
        },
        help: {
          agency: {
            title: 'Need help with this investigative agency?',
            message: 'If you are not sure of the agency issuing the investigation click "I don\'t know".',
            note: ''
          },
          agencyExplanation: {
            title: 'Need help explaining this agency?',
            message: 'Provide any further explanation or name(s) required.',
            note: ''
          },
          completed: {
            title: 'Need help when this investigation was completed?',
            message: 'If you are not sure of the exact date give us your best guess and check the "Estimated" checkbox.',
            note: ''
          },
          issued: {
            title: 'Need help with who issued this clearance?',
            message: 'If an agency besides the one who initiated the investigation issued your clearance please tell us.',
            note: ''
          },
          granted: {
            title: 'Need help with when this clearance was granted?',
            message: 'If you are not sure of the exact date give us your best guess and check the "Estimated" checkbox.',
            note: ''
          },
          clearance: {
            title: 'Need help with which clearance was granted?',
            message: 'If you are not sure of the clearance being issued click "I don\'t know".',
            note: ''
          },
          clearanceExplanation: {
            title: 'Need help explaining this clearance?',
            message: 'Provide any further explanation regarding the clearance.',
            note: ''
          }
        }
      },
      revoked: {
        heading: {
          title: 'Have you EVER had a security clearance eligibility/access authorization denied, suspended, or revoked?',
          date: 'Provide the date security clearance eligibility/access authorization was denied, suspended or revoked',
          agency: 'Provide the name of the agency that took the action',
          explanation: 'Provide an explanation of the circumstances of the denial, suspension or revocation action'
        },
        para: {
          downgrade: 'Note: An administrative downgrade or administrative termination of a security clearance is not a revocation.'
        },
        collection: {
          description: 'Summary of revocations',
          item: 'Revoked',
          unknown: '*Provide revocation details below*',
          appendTitle: 'Do you have another denied, revoked, or suspended security clearance eligibility/access authorizations to enter?',
          appendLabel: 'Add another revocation'
        },
        help: {
          date: {
            title: 'Need help with the date of this revocation, denial, or suspension?',
            message: 'If you are not sure of the exact date give us your best guess and check the "Estimated" checkbox.',
            note: ''
          },
          agency: {
            title: 'Need help with the agency authorization this termination?',
            message: 'Provide the agency name to the best of your abilities responsible for authorizing this action.',
            note: ''
          },
          explanation: {
            title: 'Need help providing an explanation of events?',
            message: 'Provide any circumstances leading to this action.',
            note: ''
          }
        }
      },
      debarred: {
        heading: {
          title: 'Have you EVER been debarred from government employment?',
          agency: 'Provide the name of the government agency taking debarment action',
          date: 'Provide the date the debarment occurred',
          explanation: 'Provide an explanation of the circumstances of the debarment'
        },
        collection: {
          description: 'Summary of debarments',
          item: 'Debarment',
          unknown: '*Provide debarment details below*',
          appendTitle: 'Do you have another Government debarment to enter?',
          appendLabel: 'Add another debarment'
        },
        help: {
          date: {
            title: 'Need help with the date of this debarment?',
            message: 'If you are not sure of the exact date give us your best guess and check the "Estimated" checkbox.',
            note: ''
          },
          agency: {
            title: 'Need help with the agency taking the debarment action?',
            message: 'Provide the agency name to the best of your abilities responsible for this action.',
            note: ''
          },
          explanation: {
            title: 'Need help providing an explanation of events?',
            message: 'Provide any circumstances leading to this action.',
            note: ''
          }
        }
      }
    },
    nonCriminalAction: {
      heading: {
        hasCourtActions: 'In the last ten (10) years, have you been a party to any public record civil court action not listed elsewhere on this form?',
        civilActionDate: 'Provide the date of the civil action',
        courtName: 'Provide the court name',
        courtAddress: 'Provide the address of the court',
        natureOfAction: 'Provide details of the nature of the action',
        resultsOfAction: 'Provide a description of the results of the action',
        principalPartyNames: 'Provide the name(s) of the principal parties involved in the court action'
      },
      collection: {
        description: 'Summary of court actions',
        summary: '*Provide your court action details below*',
        appendTitle: 'Are there any other civil court actions in the last ten (10) years to report?',
        appendLabel: 'Add another court action',
        itemType: 'Court Action'
      },
      help: {
        civilActionDate: {
          title: 'Need help with the civil action date?',
          message: 'Provide the date of the civil action',
          note: ''
        },
        courtName: {
          title: 'Need help with the court name?',
          message: 'Provide the name of the court',
          note: ''
        },
        courtAddress: {
          title: 'Need help with the court address?',
          message: 'Provide the address of the court',
          note: ''
        },
        natureOfAction: {
          title: 'Need help with the nature of the action?',
          message: 'Provide the address of the court',
          note: ''
        },
        resultsOfAction: {
          title: 'Need help with the results of the action?',
          message: 'Provide a description of the results of the action',
          note: ''
        },
        principalPartyNames: {
          title: 'Need help with the principal parties involved?',
          message: 'Provide the name(s) of the principal parties involved in the court action',
          note: ''
        }
      }
    },
    technology: {
      unauthorized: {
        heading: {
          title: 'In the last seven (7) years have you illegally or without proper authorization accessed or attempted to access any information technology system?',
          date: 'Provide the date of the incident',
          incident: 'Provide a description of the nature of the incident or offense',
          location: 'Provide the location where the incident took place',
          action: 'Provide a description of the action (administrative, criminal or other) taken as a result of this incident'
        },
        para: {
          intro: [
            'We note, with reference to this section, that neither your truthful responses nor information derived from your responses to this section will be used as evidence against you in a subsequent criminal proceeding.',
            'As to this particular section, this applies whether or not you are currently employed by the Federal government. The following questions ask about your use of information technology systems. Information technology systems include all related computer hardware, software, firmware, and data used for the communication, transmission, processing, manipulation, storage or protection of information.'
          ]
        },
        collection: {
          description: 'Summary of unauthorized access',
          item: 'Access',
          unknown: '*Provide unauthorized access details below*',
          appendTitle: 'Are there any other incidents to report?',
          appendLabel: 'Add another unauthorized access'
        },
        help: {
          date: {
            title: 'Need help with this date?',
            message: 'If you are not sure of the exact date give us your best guess and check the "Estimated" checkbox.',
            note: ''
          },
          incident: {
            title: 'Need help with the nature of this offense?',
            message: 'Provide a description of the offense.',
            note: ''
          },
          location: {
            title: 'Need help where this incident took place?',
            message: 'Provide the address where this incident occurred.',
            note: ''
          },
          action: {
            title: 'Need help with any actions as a result of this incident?',
            message: 'Provide all actions which took place as a result of this incident.',
            note: ''
          }
        }
      },
      manipulating: {
        heading: {
          title: 'In the last seven (7) years have you illegally or without authorization, modified, destroyed, manipulated, or denied others access to information residing on an information technology system or attempted any of the above?',
          date: 'Provide the date of the incident',
          incident: 'Provide a description of the nature of the incident or offense',
          location: 'Provide the location where the incident took place',
          action: 'Provide a description of the action (administrative, criminal or other) taken as a result of this incident'
        },
        collection: {
          description: 'Summary of modified, destroyed, manipulated, or denied access',
          item: 'Incident',
          unknown: '*Provide details below*',
          appendTitle: 'Are there any other incidents to report?',
          appendLabel: 'Add another incident'
        },
        help: {
          date: {
            title: 'Need help with this date?',
            message: 'If you are not sure of the exact date give us your best guess and check the "Estimated" checkbox.',
            note: ''
          },
          incident: {
            title: 'Need help with the nature of this offense?',
            message: 'Provide a description of the offense.',
            note: ''
          },
          location: {
            title: 'Need help where this incident took place?',
            message: 'Provide the address where this incident occurred.',
            note: ''
          },
          action: {
            title: 'Need help with any actions as a result of this incident?',
            message: 'Provide all actions which took place as a result of this incident.',
            note: ''
          }
        }
      },
      unlawful: {
        heading: {
          title: 'In the last seven (7) years have you introduced, removed, or used hardware, software, or media in connection with any information technology system without authorization, when specifically prohibited by rules, procedures, guidelines, or regulations or attempted any of the above?',
          date: 'Provide the date of the incident',
          incident: 'Provide a description of the nature of the incident or offense',
          location: 'Provide the location where the incident took place',
          action: 'Provide a description of the action (administrative, criminal or other) taken as a result of this incident'
        },
        collection: {
          description: 'Summary of unlawful use',
          item: 'Use',
          unknown: '*Provide details below*',
          appendTitle: 'Are there any other incidents to report?',
          appendLabel: 'Add another unlawful use'
        },
        help: {
          date: {
            title: 'Need help with this date?',
            message: 'If you are not sure of the exact date give us your best guess and check the "Estimated" checkbox.',
            note: ''
          },
          incident: {
            title: 'Need help with the nature of this offense?',
            message: 'Provide a description of the offense.',
            note: ''
          },
          location: {
            title: 'Need help where this incident took place?',
            message: 'Provide the address where this incident occurred.',
            note: ''
          },
          action: {
            title: 'Need help with any actions as a result of this incident?',
            message: 'Provide all actions which took place as a result of this incident.',
            note: ''
          }
        }
      }
    },
    associations: {
      terrorist: {
        heading: {
          title: 'Are you now or have you EVER been a member of an organization dedicated to terrorism, either with an awareness of the organization\'s dedication to that end, or with the specific intent to further such activities?',
          organization: 'Provide the full name of the organization',
          address: 'Provide the address/location of the organization',
          dates: 'Provide the dates of your involvement with the organization',
          positions: 'Provide all positions held in the organization, if any',
          contributions: 'Provide all contributions made to the organization, if any',
          reasons: 'Provide a description of the nature of and reasons for your involvement with the organization'
        },
        para: {
          intro: [
            'The following pertain to your associations. You required to answer the questions fully and truthfully, and your failure to do so could be grounds for an adverse employment, security, or credentialing decision.',
            'For the purpose of this question, terrorism is defined as any criminal acts that involve violence or are dangerous to human life and appear to be intended to intimidate or coerce a civilian population to influence the policy of a government by intimidation or coercion or to affect the conduct of a government by mass destruction, assassination or kidnapping.'
          ],
          or: 'or'
        },
        label: {
          noposition: 'No positions held',
          nocontribs: 'No contributions made'
        },
        collection: {
          description: 'Summary of terrorist organizations',
          item: 'Organization',
          unknown: '*Provide details of organization below*',
          appendTitle: 'Do you have any other instances of being a member of an organization dedicated to terrorism, either with an awareness of the organization\'s dedication to that end, or with the specific intent to further such activities to report?',
          appendLabel: 'Add another terrorist organization'
        },
        help: {
          organization: {
            title: 'Need help with this organization name?',
            message: 'Provide the name of the organization.',
            note: ''
          },
          address: {
            title: 'Need help with this address?',
            message: 'Provide the address of the organization.',
            note: ''
          },
          dates: {
            title: 'Need help with the dates?',
            message: 'If you are not sure of the exact date give us your best guess and check the "Estimated" checkbox.',
            note: ''
          },
          positions: {
            title: 'Need help with positions held?',
            message: 'Provide any positions held during this time.',
            note: 'Note: If you didn\'t hold a position please click "No positions held."'
          },
          contributions: {
            title: 'Need help with contributions?',
            message: 'Provide any contributions made to organization.',
            note: 'Note: If you didn\'t provide any contributions click "No contributions made."'
          },
          reasons: {
            title: 'Need help with the nature and reasons of this incident?',
            message: 'Provide an explanation of events surrounding this incident to the best of your knowledge.',
            note: ''
          }
        }
      },
      engaged: {
        heading: {
          title: 'Have you EVER knowingly engaged in any acts of terrorism?',
          reasons: 'Describe the nature and reasons for the activity',
          dates: 'Provide the dates for any such activities'
        },
        collection: {
          description: 'Summary of acts of terrorism',
          item: 'Act',
          unknown: '*Provide details for the terrorism below*',
          appendTitle: 'Do you have any other instances of knowingly engaging in acts of terrorism to report?',
          appendLabel: 'Add another act of terrorism'
        },
        help: {
          reasons: {
            title: 'Need help with the nature and reasons of this incident?',
            message: 'Provide an explanation of events surrounding this incident to the best of your knowledge.',
            note: ''
          },
          dates: {
            title: 'Need help with the dates?',
            message: 'If you are not sure of the exact date give us your best guess and check the "Estimated" checkbox.',
            note: ''
          }
        }
      },
      advocating: {
        heading: {
          title: 'Have you EVER advocated any acts of terrorism or activities designed to overthrow the U.S. Government by force?',
          reasons: 'Provide the reason(s) for advocating acts of terrorism',
          dates: 'Provide the dates of advocating acts of terrorism'
        },
        collection: {
          description: 'Summary of advocating terrorism',
          item: 'Instance',
          unknown: '*Provide details of the instance below*',
          appendTitle: 'Do you have any other instances of advocating acts of terrorism or activities designed to overthrow the U.S. Government by force to report?',
          appendLabel: 'Add another instance'
        },
        help: {
          reasons: {
            title: 'Need help with the nature and reasons of this incident?',
            message: 'Provide an explanation of events surrounding this incident to the best of your knowledge.',
            note: ''
          },
          dates: {
            title: 'Need help with the dates?',
            message: 'If you are not sure of the exact date give us your best guess and check the "Estimated" checkbox.',
            note: ''
          }
        }
      },
      overthrow: {
        heading: {
          title: 'Have you EVER been a member of an organization dedicated to the use of violence or force to overthrow the United States Government, and which engaged in activities to that end with an awareness of the organization\'s dedication to that end or with the specific intent to further such activities?',
          organization: 'Provide the full name of the organization',
          address: 'Provide the address/location of the organization',
          dates: 'Provide the dates of your involvement with the organization',
          positions: 'Provide all positions held in the organization, if any',
          contributions: 'Provide all contributions made to the organization, if any',
          reasons: 'Provide a description of the nature of and reasons for your involvement with the organization'
        },
        para: {
          or: 'or'
        },
        label: {
          noposition: 'No positions held',
          nocontribs: 'No contributions made'
        },
        collection: {
          description: 'Summary of memberships',
          item: 'Membership',
          unknown: '*Please provide membership details below*',
          appendTitle: 'Do you have any other instances of being a member of an organization dedicated to the use of violence or force to overthrow the United States Government, which engaged in activities to that end with an awareness of the organization’s dedication to that end or with the specific intent to further such activities to report?',
          appendLabel: 'Add another membership'
        },
        help: {
          organization: {
            title: 'Need help with this organization name?',
            message: 'Provide the name of the organization.',
            note: ''
          },
          address: {
            title: 'Need help with this address?',
            message: 'Provide the address of the organization.',
            note: ''
          },
          dates: {
            title: 'Need help with the dates?',
            message: 'If you are not sure of the exact date give us your best guess and check the "Estimated" checkbox.',
            note: ''
          },
          positions: {
            title: 'Need help with positions held?',
            message: 'Provide any positions held during this time.',
            note: 'Note: If you didn\'t hold a position please click "No positions held."'
          },
          contributions: {
            title: 'Need help with contributions?',
            message: 'Provide any contributions made to organization.',
            note: 'Note: If you didn\'t provide any contributions click "No contributions made."'
          },
          reasons: {
            title: 'Need help with the nature and reasons of this incident?',
            message: 'Provide an explanation of events surrounding this incident to the best of your knowledge.',
            note: ''
          }
        }
      },
      violence: {
        heading: {
          title: 'Have you EVER been a member of an organization that advocates or practices commission of acts of force or violence to discourage others from exercising their rights under the U.S. Constitution or any state of the United States with the specific intent to further such action?',
          organization: 'Provide the full name of the organization',
          address: 'Provide the address/location of the organization',
          dates: 'Provide the dates of your involvement with the organization',
          positions: 'Provide all positions held in the organization, if any',
          contributions: 'Provide all contributions (in U.S. dollars) made to the organization, if any',
          reasons: 'Provide a description of the nature of and reasons for your involvement with the organization'
        },
        para: {
          or: 'or'
        },
        label: {
          noposition: 'No positions held',
          nocontribs: 'No contributions made'
        },
        collection: {
          description: 'Summary of memberships',
          item: 'Membership',
          unknown: '*Provide membership details below*',
          appendTitle: 'Do you have any other instances of being a member of an organization that advocates or practices commission of acts of force or violence to discourage others from exercising their rights under the U.S. Constitution or any state of the United States with the specific intent to further such action to report',
          appendLabel: 'Add another membership'
        },
        help: {
          organization: {
            title: 'Need help with this organization name?',
            message: 'Provide the name of the organization.',
            note: ''
          },
          address: {
            title: 'Need help with this address?',
            message: 'Provide the address of the organization.',
            note: ''
          },
          dates: {
            title: 'Need help with the dates?',
            message: 'If you are not sure of the exact date give us your best guess and check the "Estimated" checkbox.',
            note: ''
          },
          positions: {
            title: 'Need help with positions held?',
            message: 'Provide any positions held during this time.',
            note: 'Note: If you didn\'t hold a position please click "No positions held."'
          },
          contributions: {
            title: 'Need help with contributions?',
            message: 'Provide any contributions made to organization.',
            note: 'Note: If you didn\'t provide any contributions click "No contributions made."'
          },
          reasons: {
            title: 'Need help with the nature and reasons of this incident?',
            message: 'Provide an explanation of events surrounding this incident to the best of your knowledge.',
            note: ''
          }
        }
      },
      activities: {
        heading: {
          title: 'Have you EVER knowingly engaged in activities designed to overthrow the U.S. Government by force?',
          reasons: 'Describe the nature and reasons for the activity',
          dates: 'Provide the dates of such activities'
        },
        collection: {
          description: 'Summary of acts of terrorism',
          item: 'Activity',
          unknown: '*Provide details below*',
          appendTitle: 'Do you have any other instances of having knowingly engaged in activities designed to overthrow the U.S. Government by force to report?',
          appendLabel: 'Add another activity'
        },
        help: {
          reasons: {
            title: 'Need help with the nature and reasons of this activity?',
            message: 'Provide an explanation of events surrounding this activity to the best of your knowledge.',
            note: ''
          },
          dates: {
            title: 'Need help with the dates?',
            message: 'If you are not sure of the exact date give us your best guess and check the "Estimated" checkbox.',
            note: ''
          }
        }
      },
      terrorism: {
        heading: {
          title: 'Have you EVER associated with anyone involved in activities to further terrorism?',
          explanation: 'Provide explanation'
        },
        help: {
          explanation: {
            title: 'Need help with this explanation?',
            message: 'If you have ever known or been in association with anyone who was involved in terrorist activities provide an explanation of the circumstances.',
            note: ''
          }
        }
      }
    }
  },
  substance: {
    intro: {
      title: 'Section 8: Substance use',
      body: 'You will be asked questions about your substance use and be asked to provide details if necessary.'
    },
    tour: {
      para: 'Take a guided tour through the section'
    },
    review: {
      title: 'Let\'s make sure everything looks right',
      para: 'View all the sections associated with substance abuse'
    },
    destination: {
      intro: 'Intro',
      police: {
        negative: 'Negative impact',
        ordered: 'Mandatory counseling or treatment',
        voluntary: 'Voluntary counseling or treatment',
        additional: 'Additional instances'
      },
      drugs: {
        usage: 'Usage',
        purchase: 'Purchase',
        clearance: 'Security clearance position',
        publicsafety: 'Public safety position',
        misuse: 'Misuse',
        ordered: 'Mandatory counseling or treatment',
        voluntary: 'Voluntary counseling or treatment'
      },
      review: 'Review substance use'
    },
    alcohol: {
      heading: {
        negativeImpact: 'In the last seven (7) years has your use of alcohol had a negative impact on your work performance, your professional or personal relationships, your finances, or resulted in intervention by law enforcement/public safety personnel?',
        orderedCounseling: 'Have you EVER been ordered, advised, or asked to seek counseling or treatment as a result of your use of alcohol?',
        voluntaryCounseling: 'Have you EVER voluntarily sought counseling or treatment as a result of your use of alcohol?',
        receivedCounseling: 'Have you EVER received counseling or treatment as a result of your use of alcohol in addition to what you have already listed on this form?'
      },
      negativeImpact: {
        heading: {
          occurred: 'Provide the month/year when this negative impact occurred',
          circumstances: 'Provide an explanation of the circumstances and the negative impact',
          used: 'Provide dates of involvement or use'
        },
        label: {
          circumstances: 'Circumstances',
          negativeImpact: 'Negative impact'
        },
        help: {
          occurred: {
            title: 'Need help with this date?',
            message: 'Provide the month/year when this negative impact occurred',
            note: 'Note: If you are not sure of the exact date give us your best guess and check the "Estimated" checkbox.'
          },
          circumstances: {
            title: 'Need help with the circumstances?',
            message: 'Provide an explanation of the circumstances and the negative impact',
            note: ''
          },
          used: {
            title: 'Need help with the dates of involvement?',
            message: 'Tell us the full date range of the involvement or use',
            note: 'Note: If you are not sure of the exact date give us your best guess and check the "Estimated" checkbox.'
          }
        },
        collection: {
          description: 'Summary of negative impacts',
          summary: '*Provide your negative impact details below*',
          appendTitle: 'Has the use of alcohol had other negative impacts on your work performance, your professional or personal relationships, your finances, or resulted in intervention by law enforcement/public safety personnel?',
          appendLabel: 'Add another negative impact',
          itemType: 'Negative impact'
        }
      },
      orderedCounseling: {
        heading: {
          seekers: 'Have any of the following ordered, advised, or asked you to seek counseling or treatment as a result of your use of alcohol?',
          actionTaken: 'Did you take action to seek counseling or treatment?',
          noActionTakenExplanation: 'You responded ‘No’ to having taken action to seek counseling or treatment. Explain the reasons for not taking action to seek counseling or treatment',
          counselingDates: 'Provide the dates of counseling or treatment',
          treatmentProviderName: 'Provide the name of the individual counselor or treatment provider',
          treatmentProviderAddress: 'Provide the full address of the counseling/treatment provider',
          treatmentProviderTelephone: 'Provide telephone number',
          completedTreatment: 'Did you successfully complete the treatment program?',
          noCompletedTreatment: 'You responded “No” to having successfully completed the treatment program. Provide explanation.'
        },
        label: {
          seekers: 'Check all that apply',
          otherSeeker: 'Provide explanation'
        },
        seekers: {
          label: {
            employer: 'An employer, military commander, or employee assistance program',
            medicalProfessional: 'A medical professional',
            mentalHealthProfessional: 'A mental health professional',
            courtOfficial: 'A court official / judge',
            notOrdered: 'I have not been ordered, advised, or asked to seek counseling or treatment by any of the above',
            other: ['Other', '(provide explanation)']
          }
        },
        collection: {
          description: 'Summary of counselings',
          summary: '*Provide your counseling details below*',
          appendTitle: 'Do you have additional instances of having been ordered, advised or asked to seek counseling or treatment as a result of your use of alcohol to enter?',
          appendLabel: 'Add another counseling',
          itemType: 'Counseling'
        },
        help: {
          seekers: {
            title: 'Need help with determining who has ordered you to seek treatment?',
            message: 'Check all who ordered, advised, or asked you to seek counseling or treatment as a result of your use of alcohol',
            note: ''
          },
          counselingDates: {
            title: 'Need help with the counseling dates?',
            message: 'Tell us the dates when you were in counseling or treatment',
            note: 'Note: If you are not sure of the exact date give us your best guess and check the "Estimated" checkbox.'
          },
          actionTaken: {
            title: 'Need help with action taken to seek counseling or treatment',
            message: 'Select if you have taken action to seek counseling or treatment.',
            note: ''
          },
          treatmentProviderName: {
            title: 'Need help with the treatment provider name?',
            message: 'Provide the name of the individual counselor or treatment provider',
            note: ''
          },
          treatmentProviderAddress: {
            title: 'Not sure of the treatment provider\'s address?',
            message: 'Try looking up the ctreatment provider\'s name, this could help you find the address.',
            note: 'Note: If you can only find a phone number try calling and asking for the address.'
          },
          treatmentProviderTelephone: {
            title: 'Not sure of the treatment provider\'s telephone?',
            message: 'Try looking up the treatment provider\'s name, this could help you find the phone number.',
            note: ''
          },
          completedTreatment: {
            title: 'Need help with your treatment completion?',
            message: 'Mark if you successfully completed a treatment program',
            note: ''
          }
        }
      },
      voluntaryCounseling: {
        heading: {
          counselingDates: 'Provide the dates of counseling or treatment',
          treatmentProviderName: 'Provide the name of the individual counselor or treatment provider',
          treatmentProviderAddress: 'Provide the full address of the counseling/treatment provider',
          treatmentProviderTelephone: 'Provide telephone number',
          completedTreatment: 'Did you successfully complete the treatment program?',
          noCompletedTreatment: 'You responded “No” to having successfully completed the treatment program. Provide explanation.'
        },
        collection: {
          description: 'Summary of counselings',
          summary: '*Provide your counseling details below*',
          appendTitle: 'Do you have additional instances where you have voluntarily sought counseling or treatment as a result of your use of alcohol to enter?',
          appendLabel: 'Add another counseling',
          itemType: 'Counseling'
        },
        help: {
          counselingDates: {
            title: 'Need help with the counseling dates?',
            message: 'Tell us the full range of counseling or treatment',
            note: 'Note: If you are not sure of the exact date give us your best guess and check the "Estimated" checkbox.'
          },
          treatmentProviderName: {
            title: 'Need help with the treatment provider name?',
            message: 'Provide the name of the individual counselor or treatment provider',
            note: ''
          },
          treatmentProviderAddress: {
            title: 'Not sure of the treatment provider\'s address?',
            message: 'Try looking up the ctreatment provider\'s name, this could help you find the address.',
            note: 'Note: If you can only find a phone number try calling and asking for the address.'
          },
          treatmentProviderTelephone: {
            title: 'Not sure of the treatment provider\'s telephone?',
            message: 'Try looking up the treatment provider\'s name, this could help you find the phone number.',
            note: ''
          },
          completedTreatment: {
            title: 'Need help with your treatment completion?',
            message: 'Mark if you successfully completed a treatment program',
            note: ''
          },
          noCompletedTreatment: {
            title: 'Need help with this explanation?',
            message: 'Provide details as to why you responded No to having successfully completed the treatment program',
            note: ''
          }
        }
      },
      receivedCounseling: {
        heading: {
          counselingDates: 'Provide the dates of counseling or treatment',
          treatmentProviderName: 'Provide the name of the individual counselor or treatment provider',
          treatmentProviderAddress: 'Provide the full address of the counseling/treatment provider',
          agencyName: 'Provide the name of agency/organization where counseling/treatment was provided',
          agencyAddress: 'Provide the address of agency/organization where counseling/treatment was provided',
          completedTreatment: 'Did you successfully complete your counseling or treatment?',
          treatmentBeganDate: 'Provide the date counseling or treatment began',
          treatmentEndDate: 'Provide the date counseling or treatment ended',
          noCompletedTreatment: 'Provide explanation'
        },
        collection: {
          description: 'Summary of counselings',
          summary: '*Provide your counseling details below*',
          appendTitle: 'Did you receive alcohol-related counseling or treatment another time?',
          appendLabel: 'Add another counseling',
          itemType: 'Counseling'
        },
        help: {
          treatmentProviderName: {
            title: 'Need help with the treatment provider name?',
            message: 'Provide the name of the individual counselor or treatment provider',
            note: ''
          },
          treatmentProviderAddress: {
            title: 'Not sure of the treatment provider\'s address?',
            message: 'Try looking up the ctreatment provider\'s name, this could help you find the address.',
            note: 'Note: If you can only find a phone number try calling and asking for the address.'
          },
          agencyName: {
            title: 'Need help with the agency name?',
            message: 'Provide the name of agency/organization where counseling/treatment was provided',
            note: ''
          },
          agencyAddress: {
            title: 'Not sure of the agency\'s address?',
            message: 'Try looking up the agency\'s name, this could help you find the address.',
            note: 'Note: If you can only find a phone number try calling and asking for the address.'
          },
          treatmentBeganDate: {
            title: 'Need help with this date?',
            message: 'Tell us when the treatment started',
            note: ''
          },
          treatmentEndDate: {
            title: 'Need help with this date?',
            message: 'Tell us when the treatment ended',
            note: ''
          },
          completedTreatment: {
            title: 'Need help with your treatment completion?',
            message: 'Mark if you successfully completed a treatment program',
            note: ''
          },
          noCompletedTreatment: {
            title: 'Need help with this explanation?',
            message: 'Provide details as to why you responded No to having successfully completed the treatment program',
            note: ''
          }
        }
      }
    },
    drugs: {
      heading: {
        drugUses: '**In the last seven (7) years**, have you illegally used any drugs or controlled substances?',
        drugInvolvement: 'In the last seven (7) years, have you been involved in the illegal purchase, manufacture, cultivation, trafficking, production, transfer, shipping, receiving, handling or sale of any drug or controlled substance?',
        drugClearanceUses: 'Have you EVER illegally used or otherwise been illegally involved with a drug or controlled substance while possessing a security clearance other than previously listed?',
        drugPublicSafetyUses: 'Have you EVER illegally used or otherwise been involved with a drug or controlled substance while employed as a law enforcement officer, prosecutor, or courtroom official; or while in a position directly and immediately affecting the public safety other than previously listed?',
        prescriptionUses: 'In the last seven (7) years have you intentionally engaged in the misuse of prescription drugs, regardless of whether or not the drugs were prescribed for you or someone else?',
        orderedTreatments: 'Have you EVER been ordered, advised, or asked to seek counseling or treatment as a result of your illegal use of drugs or controlled substances?',
        voluntaryTreatments: 'Have you EVER voluntarily sought counseling or treatment as a result of your use of a drug or controlled substance?'
      },
      para: {
        drugUses: 'We note, with reference to this section, that neither your truthful responses nor information derived from your responses to this section will be used as evidence against you in a subsequent criminal proceeding. As to this particular section, this applies whether or not you are currently employed by the Federal government. The following questions pertain to the illegal use of drugs or controlled substances or drug or controlled substance activity in accordance with Federal laws, even though permissible under state laws.'
      },
      use: {
        heading: {
          drugType: 'Provide the type of drug or controlled substance',
          firstUse: 'Provide an estimate of the month and year of first use',
          recentUse: 'Provide an estimate of the month and year of most recent use',
          natureOfUse: 'Provide nature of use, frequency, and number of times used',
          useWhileEmployed: 'Was your use while you were employed as a law enforcement officer, prosecutor, or courtroom official, or while in a position directly and immediately affecting the public?',
          useWithClearance: 'Was your use while possessing a security clearance?',
          useInFuture: 'Do you intend to use this drug or controlled substance in the future?',
          explanation: 'Provide explanation of why you intend or do not intend to use this drug or controlled substance in the future'
        },
        para: {
          drugUses: 'Use of a drug or controlled substance includes injecting, snorting, inhaling, swallowing, experimenting with or otherwise consuming any drug or controlled substance.'
        },
        help: {
          drugType: {
            title: 'Need help with the drug type?',
            message: 'Provide the type of drug or controlled substance used',
            note: ''
          },
          firstUse: {
            title: 'Need help with the date of first use?',
            message: 'Provide an estimate of the month and year of first use',
            note: ''
          },
          recentUse: {
            title: 'Need help with the date of most recent use?',
            message: 'Provide an estimate of the month and year of first use',
            note: ''
          },
          natureOfUse: {
            title: 'Need help with the nature of drug use?',
            message: 'Provide nature of use, frequency, and number of times used',
            note: ''
          },
          useWhileEmployed: {
            title: 'Need help with the use?',
            message: 'Was your use while you were employed as a law enforcement officer, prosecutor, or courtroom official, or while in a position directly and immediately affecting the public',
            note: ''
          },
          useWithClearance: {
            title: 'Need help with the drug use with a security clearance?',
            message: 'Was your use while possessing a security clearance?',
            note: ''
          },
          useInFuture: {
            title: 'Need help with the drug use in the future?',
            message: 'Mark if you intend to use this drug or controlled substance in the future',
            note: ''
          },
          explanation: {
            title: 'Need help with the explanation?',
            message: 'Provide explanation of why you intend or do not intend to use this drug or controlled substance in the future',
            note: ''
          }
        },
        collection: {
          description: 'Summary of drug uses',
          summary: '*Provide your drug use details below*',
          appendTitle: 'Do you have an additional instance(s) of illegal use of a drug or controlled substance to enter?',
          appendLabel: 'Add another drug use',
          itemType: 'Drug Use'
        }
      },
      involvement: {
        heading: {
          drugType: 'Provide the type of drug or controlled substance',
          firstInvolvement: 'Provide an estimate of the month and year of first involvement',
          recentInvolvement: 'Provide an estimate of the month and year of most recent involvement',
          natureOfInvolvement: 'Provide nature of and frequency of activity',
          involvementWhileEmployed: 'Was your involvement while you were employed as a law enforcement officer, prosecutor, or courtroom official, or while in a position directly and immediately affecting the public safety?',
          involvementWithClearance: 'Was your involvement while possessing a security clearance?',
          involvementInFuture: 'Do you intend to engage in this activity in the future?',
          reasons: 'Provide the reason(s) why you engaged in the activity',
          explanation: 'You have indicated that you plan to engage in the illegal purchase, manufacture, cultivation, trafficking, production, transfer, shipping, receiving, handling or sale of a drug or controlled substance in the future. Provide explanation.'
        },
        help: {
          drugType: {
            title: 'Need help with the drug type?',
            message: 'Provide the type of drug or controlled substance used',
            note: ''
          },
          firstInvolvement: {
            title: 'Need help with the date of first involvement?',
            message: 'Provide an estimate of the month and year of first involvement',
            note: ''
          },
          recentInvolvement: {
            title: 'Need help with the date of most recent involvement?',
            message: 'Provide an estimate of the month and year of first involvement',
            note: ''
          },
          natureOfInvolvement: {
            title: 'Need help with the nature of drug involvement?',
            message: 'Provide nature of use, frequency, and number of times used',
            note: ''
          },
          involvementWhileEmployed: {
            title: 'Need help with the use?',
            message: 'Was your use while you were employed as a law enforcement officer, prosecutor, or courtroom official, or while in a position directly and immediately affecting the public',
            note: ''
          },
          involvementWithClearance: {
            title: 'Need help with the drug use with a security clearance?',
            message: 'Was your use while possessing a security clearance?',
            note: ''
          },
          involvementInFuture: {
            title: 'Need help with the drug use in the future?',
            message: 'Mark if you intend to use this drug or controlled substance in the future',
            note: ''
          },
          reasons: {
            title: 'Need help with the reasoning?',
            message: 'Provide the reason(s) why you engaged in the activity',
            note: ''
          },
          explanation: {
            title: 'Need help with the explanation?',
            message: 'Provide explanation of why you intend or do not intend to use this drug or controlled substance in the future',
            note: ''
          }
        },
        collection: {
          description: 'Summary of drug involvement',
          summary: '*Provide your drug involvement details below*',
          appendTitle: 'Do you have an additional instance(s) of having been involved in the illegal purchase, manufacture, cultivation, trafficking, production, transfer, shipping, receiving, handling or sale of a drug or controlled substance to enter?',
          appendLabel: 'Add another drug involvement',
          itemType: 'Drug involvement'
        }
      },
      clearance: {
        heading: {
          description: 'Provide a description of your involvement',
          involvementDates: 'Provide the dates of involvement/use',
          estimatedUse: 'Provide an estimate of the number of times you used and/or were involved with this drug or controlled substance while possessing a security clearance'
        },
        help: {
          description: {
            title: 'Need help with the description?',
            message: 'Provide a description of your involvement',
            note: ''
          },
          involvementDates: {
            title: 'Need help with the dates of involvement?',
            message: 'Tell us the full date range of your involvement.',
            note: 'Note: If you are not sure of the exact date give us your best guess and check the "Estimated" checkbox.'
          },
          estimatedUse: {
            title: 'Need help with the estimated times used?',
            message: 'Provide an estimate of the number of times you used and/or were involved with this drug or controlled substance while possessing a security clearance',
            note: ''
          }
        },
        collection: {
          description: 'Summary of drug involvement',
          summary: '*Provide your drug involvement details below*',
          appendTitle: 'Do you have an additional instance(s) of the illegal use or involvement with a drug or controlled substance while possessing a security clearance to enter?',
          appendLabel: 'Add another drug involvement',
          itemType: 'Drug involvement'
        }

      },
      publicSafety: {
        heading: {
          description: 'Provide a description of the drugs or controlled substances used and your involvement',
          involvementDates: 'Provide the dates of involvement/use',
          estimatedUse: 'Provide an estimate of the number of times you used and/or were involved with this drug or controlled substance while employed in this capacity'
        },
        help: {
          description: {
            title: 'Need help with the description?',
            message: 'Provide a description of your involvement',
            note: ''
          },
          involvementDates: {
            title: 'Need help with the dates of involvement/use?',
            message: 'Tell us the full date range of your involvement/use.',
            note: 'Note: If you are not sure of the exact date give us your best guess and check the "Estimated" checkbox.'
          },
          estimatedUse: {
            title: 'Need help with the estimated times used?',
            message: 'Provide an estimate of the number of times you used and/or were involved with this drug or controlled substance while possessing a security clearance',
            note: ''
          }
        },
        collection: {
          description: 'Summary of drug involvement',
          summary: '*Provide your drug involvement details below*',
          appendTitle: 'Do you have an additional instance(s) of illegal use or involvement with a drug or controlled substance while employed as a law enforcement officer, prosecutor, or courtroom official; or while in a position directly and immediately affecting the public safety to enter?',
          appendLabel: 'Add another drug involvement',
          itemType: 'Drug involvement'
        }
      },
      prescription: {
        heading: {
          prescriptionName: 'Provide the name of the prescription drug that you misused',
          involvementDates: 'Provide the dates of involvement in the above',
          reason: 'Provide the reason(s) for and circumstances of the misuse of the prescription drug',
          useWhileEmployed: 'Was your involvement while you were employed as a law enforcement officer, prosecutor, or courtroom official, or while in a position directly and immediately affecting the public safety?',
          useWithClearance: 'Was your involvement while possessing a security clearance?'
        },
        help: {
          prescriptionName: {
            title: 'Need help with the prescriptin name?',
            message: 'Provide the name of the prescription drug that you misused',
            note: ''
          },
          reason: {
            title: 'Need help with the reason?',
            message: 'Provide the reason(s) for and circumstances of the misuse of the prescription drug',
            note: ''
          },
          involvementDates: {
            title: 'Need help with the dates of involvement?',
            message: 'Tell us the full date range of your involvement.',
            note: 'Note: If you are not sure of the exact date give us your best guess and check the "Estimated" checkbox.'
          },
          useWhileEmployed: {
            title: 'Need help with the use?',
            message: 'Was your involvement while you were employed as a law enforcement officer, prosecutor, or courtroom official, or while in a position directly and immediately affecting the public safety?',
            note: ''
          },
          useWithClearance: {
            title: 'Need help with the drug use with a security clearance?',
            message: 'Was your involvement while possessing a security clearance?',
            note: ''
          }
        },
        collection: {
          description: 'Summary of drug misuse',
          summary: '*Provide your drug misuse details below**',
          appendTitle: 'Do you have an additional instance(s) of intentionally engaging in the misuse of prescription drugs in the last seven (7) years to enter?',
          appendLabel: 'Add another drug misuse',
          itemType: 'Drug misuse'
        }
      },
      ordered: {
        heading: {
          orderedBy: 'Have any of the following ordered, advised, or asked you to seek counseling or treatment as a result of your illegal use of drugs or controlled substances?',
          explanation: 'Provide explanation',
          actionTaken: 'Did you take action to receive counseling or treatment?',
          noActionTakenExplanation: 'You have indicated that you did not receive treatment. Provide explanation',
          drugType: 'Provide the type of drug or controlled substance for which you were treated',
          treatmentProvider: 'Provide the name of the treatment provider',
          treatmentProviderAddress: 'Provide the address for this treatment provider',
          treatmentProviderTelephone: 'Provide a telephone number for the treatment provider',
          treatmentDates: 'Provide the dates of treatment',
          treatmentCompleted: 'Did you successfully complete the treatment?',
          noTreatmentExplanation: 'You have indicated that you did not successfully complete the treatment. Provide explanation.'
        },
        para: {
          orderedBy: 'Check all that apply',
          treatmentProvider: 'Last name, First name'
        },
        help: {
          drugType: {
            title: 'Need help with the drug type?',
            message: 'Provide the type of drug or controlled substance used',
            note: ''
          },
          orderedBy: {
            title: 'Need help with who ordered treatment?',
            message: 'Have any of the following ordered, advised, or asked you to seek counseling or treatment as a result of your illegal use of drugs or controlled substances?',
            note: ''
          },
          explanation: {
            title: 'Need help with the explanation?',
            message: 'Provide explanation',
            note: ''
          },
          actionTaken: {
            title: 'Need help with taking action to receive counseling or treatment?',
            message: 'Mark if you took action to receive counseling or treatment',
            note: ''
          },
          noActionTakenExplanation: {
            title: 'Need help with not having taken action?',
            message: 'Provide explanation as to why you did not receive treatment',
            note: ''
          },
          treatmentProvider: {
            title: 'Need help with the treatment provider?',
            message: 'Provide the name of the treatment provider',
            note: ''
          },
          treatmentProviderAddress: {
            title: 'Not sure of the treatment provider\'s address?',
            message: 'Try looking up the provider\'s name, this could help you find the address.',
            note: 'Note: If you can only find a phone number try calling and asking for the address.'
          },
          treatmentProviderTelephone: {
            title: 'Need help with the treatment provider\'s telephone?',
            message: 'Try looking up the provider\'s name, this could help you find the phone number.',
            note: ''
          },
          treatmentDates: {
            title: 'Need help with the treatment dates?',
            message: 'Tell us the full date range you were in treatment.',
            note: 'Note: If you are not sure of the exact date give us your best guess and check the "Estimated" checkbox.'
          },
          treatmentCompleted: {
            title: 'Need help with the treatment completion?',
            message: 'Mark yes if you successfully completed the treatment',
            note: ''
          },
          noTreatmentExplanation: {
            title: 'Need help with the explanation for not completing treatment?',
            message: 'Explain why you did not complete treatment',
            note: ''
          }
        },
        collection: {
          description: 'Summary of treatments',
          summary: '*Provide your treatment details below*',
          appendTitle: 'Do you have another instance of having been ordered, advised, or asked to seek drug or controlled substance counseling or treatment to enter?',
          appendLabel: 'Add another treatment',
          itemType: 'Treatment'
        },
        orderedBy: {
          label: {
            employer: 'An employer, military commander, or employee assistance program',
            medicalProfessional: 'A medical professional',
            mentalHealthProfessional: 'A mental health professional',
            judge: 'A court official / judge',
            none: 'I have not been ordered, advised, or asked to seek counseling or treatment by any of the above.'
          }
        }
      },
      voluntary: {
        heading: {
          drugType: 'Provide the type of drug or controlled substance for which you were treated',
          treatmentProvider: 'Provide the name of the treatment provider',
          treatmentProviderAddress: 'Provide the address for this treatment provider',
          treatmentProviderTelephone: 'Provide a telephone number for the treatment provider',
          treatmentDates: 'Provide the dates of treatment',
          treatmentCompleted: 'Did you successfully complete the treatment?',
          noTreatmentExplanation: 'You have indicated that you did not you successfully complete the treatment. Provide explanation.'
        },
        para: {
          treatmentProvider: 'Last name, First name'
        },
        help: {
          drugType: {
            title: 'Need help with the drug type?',
            message: 'Provide the type of drug or controlled substance used',
            note: ''
          },
          treatmentProvider: {
            title: 'Need help with the treatment provider?',
            message: 'Provide the name of the treatment provider',
            note: ''
          },
          treatmentProviderAddress: {
            title: 'Not sure of the treatment provider\'s address?',
            message: 'Try looking up the provider\'s name, this could help you find the address.',
            note: 'Note: If you can only find a phone number try calling and asking for the address.'
          },
          treatmentProviderTelephone: {
            title: 'Need help with the treatment provider\'s telephone?',
            message: 'Try looking up the provider\'s name, this could help you find the phone number.',
            note: ''
          },
          treatmentDates: {
            title: 'Need help with the treatment dates?',
            message: 'Tell us the full date range you were in treatment.',
            note: 'Note: If you are not sure of the exact date give us your best guess and check the "Estimated" checkbox.'
          },
          treatmentCompleted: {
            title: 'Need help with the treatment completion?',
            message: 'Mark yes if you successfully completed the treatment',
            note: ''
          },
          noTreatmentExplanation: {
            title: 'Need help with the explanation for not completing treatment?',
            message: 'Explain why you did not complete treatment',
            note: ''
          }
        },
        collection: {
          description: 'Summary of treatments',
          summary: '*Provide your treatment details below*',
          appendTitle: 'Do you have another instance of EVER voluntarily seeking counseling or treatment as a result of your use of a drug or controlled substance?',
          appendLabel: 'Add another treatment',
          itemType: 'Treatment'
        },
        orderedBy: {
          label: {
            employer: 'An employer, military commander, or employee assistance program',
            medicalProfessional: 'A medical professional',
            mentalHealthProfessional: 'A mental health professional',
            judge: 'A court official / judge',
            none: 'I have not been ordered, advised, or asked to seek counseling or treatment by any of the above.'
          }
        }
      },
      drugType: {
        label: {
          cocaine: [
            'Cocaine or crack cocaine',
            '(Such as rock, freebase, etc.)'
          ],
          stimulants: [
            'Stimulants',
            '(Such as amphetamines, speed, crystal meth, ecstasy, etc.)'
          ],
          thc: [
            'THC',
            '(Such as marijuana, weed, pot, hashish, etc.)'
          ],
          depressants: [
            'Depressants',
            '(Such as barbiturates, methaqualone, tranquilizers, etc.)'
          ],
          ketamine: [
            'Ketamine',
            '(Such as special K, jet, etc.)'
          ],
          narcotics: [
            'Narcotics',
            '(Such as opium, morphine, codeine, heroin, etc.)'
          ],
          hallucinogenic: [
            'Hallucinogenic',
            '(Such as LSD, PCP, mushrooms, etc.)'
          ],
          steroids: [
            'Steroids',
            '(Such as the clear, juice, etc.)'
          ],
          inhalants: [
            'Inhalants',
            '(Such as toluene, amyl nitrate, etc.)'
          ],
          other: [
            'Other',
            '(Provide explanation)'
          ],
          drugTypeOther: 'Provide explanation'
        }
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
      or: 'or'
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
        initialOnly: 'Initial only',
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
      intro: 'Intro',
      psychological: 'Psychological and emotional health',
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
          message: 'Tell us the month and year when a court or agency declared you mentally incompetent.',
          note: 'Note: If you are not sure of the exact date give us your best guess and check the "Estimated" checkbox.'
        },
        courtName: {
          title: 'Need help with this court or agency name?',
          message: 'Tell us the name of the court or administrative agency that issued the order.',
          note: ''
        },
        courtAddress: {
          title: 'Not sure of the court or agency address?',
          message: 'Try looking up the court or agency name, this could help you find the address.',
          note: 'Note: If you can only find a phone number try calling and asking for the address.'
        },
        incompetent: {
          title: 'Need help with this question?',
          message: 'Has a court or administrative agency EVER ordered you to consult with a mental health professional?'
        },
        disposition: {
          title: 'Need help entering the final disposition?',
          message: 'Tell us the ruling regarding the court or agency\'s decision.',
          note: 'Note: If you can’t remember your disposition a family member or the court/agency may be able to help you.'
        }
      },
      collection: {
        summaryCourtName: '*Provide your order details below*',
        description: 'Summary of orders',
        appendTitle: 'Do you have an additional instance where a court or administrative agency EVER issued an order declaring you mentally incompetent?',
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
          title: 'Need help with the date this occurred?',
          message: 'Tell us the month and year when a court or agency ordered you to consult with a professional.',
          note: 'Note: If you are not sure of the exact date give us your best guess and check the "Estimated" checkbox.'
        },
        courtName: {
          title: 'Need help with this court or agency name?',
          message: 'Tell us the name of the court or administrative agency that issued the order.',
          note: ''
        },
        courtAddress: {
          title: 'Not sure of the court or agency address?',
          message: 'Try looking up the court or agency name, this could help you find the address.',
          note: 'Note: If you can only find a phone number try calling and asking for the address.'
        },
        disposition: {
          title: 'Need help with the disposition?',
          message: 'Tell us the ruling regarding the court or agency\'s decision.',
          note: 'Note: If you can’t remember your disposition a family member or the court/agency may be able to help you.'
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
        summaryCourtName: '*Provide your order details below*',
        description: 'Summary of orders',
        appendTitle: 'Do you have an additional instance where a court or administrative agency EVER issued an order declaring you mentally incompetent?',
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
        summary: '*Provide your hospitalization details below*',
        appendTitle: 'Do you have an additional instance where you have EVER been hospitalized for a mental health condition?',
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
          message: 'Tell us the full date range (admission to release) of your hospitalization.',
          note: 'If you are not sure of the exact date range give us your best guess and check the "Estimated" checkbox.'
        },
        facility: {
          title: 'Need help with this facility name?',
          message: 'Tell us the name of the facility where you were hospitalized.',
          note: ''
        },
        address: {
          title: 'Not sure of the facility address?',
          message: 'Try looking up the facility name, this could help you find the address.',
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
      label: {
        psychotic: 'Psychotic disorder',
        schizophrenia: 'Schizophrenia',
        schizoaffective: 'Schizoaffective disorder',
        delusional: 'Delusional disorder',
        bipolar: 'Bipolar mood disorder',
        borderline: 'Borderline personality disorder',
        antisocial: 'Antisocial personality disorder'
      },
      help: {
        condition: {
          title: 'Need help with health condition',
          message: 'Provide the name of the diagnosis or health condition',
          note: ''
        },
        diagnosed: {
          title: 'Need help the date range of your diagnosis or health condition?',
          message: 'Tell us the full date range you have had this diagnosis or health condition.',
          note: 'Note: If this is a current diagnosis or health condition enter the start date and click the "Present" button for the "To date".'
        },
        explanation: {
          title: 'Tell us more about why the counseling/treatment wasn\'t effective?',
          message: 'Let us know why this counseling/treatment didn\'t improve your symptoms.',
          note: 'Go into as much detail as you need to full explain.'
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
            title: 'Not sure of the health care professional\'s address?',
            message: 'Try looking up their name, this could help you find the address.',
            note: 'Note: If you can only find a phone number try calling and asking for the address.'
          },
          name: {
            title: 'Need help the name of the healthcare professional?',
            message: 'Tell us the full name of the healthcare professional.',
            note: 'Note: If you can’t remember this name a family member may be able to help you.'
          }
        }
      },
      facility: {
        heading: {
          name: 'Provide the name and telephone number of any agency/organization/facility where counseling/treatment was provided',
          address: 'Provide the address of any agency/organization/facility where counseling/treatment was provided'
        },
        label: {
          name: 'Name',
          phone: 'Telephone',
          address: 'This address is'
        },
        help: {
          address: {
            title: 'Not sure of the agency/organization/facility\'s address?',
            message: 'Try looking up the name, this could help you find the address.',
            note: 'Note: If you can only find a phone number try calling and asking for the address.'
          },
          name: {
            title: 'Need help entering name of the facility where treatment was provided?',
            message: 'Tell us the full name of the facility.',
            note: 'Note: If you can’t remember this facility name a family member may be able to help you.'
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
        summary: '*Provide your diagnosis details below*',
        appendTitle: 'Do you have an additional instance where you EVER had been diagnosed by a physician or other health professional (for example, a psychiatrist, psychologist, licensed clinical social worker, or nurse practitioner) with psychotic disorder, schizophrenia, schizoaffective disorder, delusional disorder, bipolar mood disorder, borderline personality disorder, or antisocial personality disorder?',
        appendMessage: 'Health professional examples: a psychiatrist, psychologist, licensed clinical social worker, or nurse practitioner.',
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
        },
        help: {
          name: {
            title: 'Need help the name of the healthcare professional?',
            message: 'Tell us the full name of the healthcare professional.',
            note: 'Note: If you can’t remember this name a family member may be able to help you.'
          },
          address: {
            title: 'Not sure of the health care professional\'s address?',
            message: 'Try looking up their name, this could help you find the address.',
            note: 'Note: If you can only find a phone number try calling and asking for the address.'
          }
        }
      },
      treatment: {
        collection: {
          description: 'Summary of treatments',
          summary: '*Provide your treatment details below*',
          appendTitle: 'Do you have an additional instance where you are currently in treatment?',
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
            title: 'Need help the name of the healthcare professional?',
            message: 'Tell us the full name of the healthcare professional.'
          },
          address: {
            title: 'Not sure of the health care professional\'s address?',
            message: 'Try looking up their name, this could help you find the address.',
            note: 'Note: If you can only find a phone number try calling and asking for the address.'
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
          summary: '*Provide your treatment details below*',
          appendTitle: 'Do you have an additional instance where you ever received are you currently receiving counseling or treatment for that condition',
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
            note: 'If you are not sure of the exact date range give us your best guess and check the "Estimated" checkbox.'
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
              title: 'Need help the name and number of this healthcare professional?',
              message: 'Tell us the full name of the healthcare professional and a current phone number for them.',
              note: 'Note: If you can’t remember these a family member may be able to help you.'
            }
          }
        },
        facility: {
          heading: {
            name: 'Provide the name and telephone number of any agency/organization/facility where counseling/treatment was provided',
            address: 'Provide the address of any agency/organization/facility where counseling/treatment was provided'
          },
          label: {
            address: 'This address is',
            name: 'Name',
            phone: 'Telephone'
          },
          help: {
            address: {
              title: 'Not sure of the treatment facility\'s address?',
              message: 'Try looking up their name, this could help you find the address.',
              note: 'Note: If you can only find a phone number try calling and asking for the address.'
            },
            name: {
              title: 'Need help the facility where treatment was provided?',
              message: 'Tell us the name of the facility where your treatment was.',
              note: 'Note: If you can’t remember this name a family member may be able to help you.'
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
  },
  introduction: {
    contents: [
      '# Questionnaire for National Security Positions',
      '**Follow instructions completely or your form will be unable to be processed. If you have any questions, contact the office that provided you the form.**',
      'All questions on this form must be answered **completely and truthfully** in order that the Government may make the determinations described below on a complete record. Penalties for inaccurate or false statements are discussed below. **If you are a current civilian employee of the federal government:** failure to answer any questions completely and truthfully could result in an adverse personnel action against you, including loss of employment; with respect to Sections 23, 27, and 29, however, neither your truthful responses nor information derived from those responses will be used as evidence against you in a subsequent criminal proceeding.',
      '---',
      '# How to save your progress',
      '**This form will auto save your progress continuously throughout.** Each input will be validated and save as you enter your information.',
      'To confirm your auto saving and find out when the last save was look for the icon below at the bottom of each screen.',
      '---',
      '# Purpose of this Form',
      'This form will be used by the United States (U.S.) Government in conducting background investigations, reinvestigations, and continuous evaluations of persons under consideration for, or retention of, national security positions as defined in 5 CFR 732, and for individuals requiring eligibility for access to classified information under Executive Order 12968. This form may also be used by agencies in determining whether a subject performing work for, or on behalf of, the Government under a contract should be deemed eligible for logical or physical access when the nature of the work to be performed is sensitive and could bring about an adverse effect on the national security.',
      'Providing this information is voluntary. If you do not provide each item of requested information, however, we will not be able to complete your investigation, which will adversely affect your eligibility for a national security position, eligibility for access to classified information, or logical or physical access. It is imperative that the information provided be true and accurate, to the best of your knowledge. Any information that you provide is evaluated on the basis of its currency, seriousness, relevance to the position and duties, and consistency with all other information about you. Withholding, misrepresenting, or falsifying information may affect your eligibility for access to classified information, eligibility for a sensitive position, or your ability to obtain or retain Federal or contract employment. In addition, withholding, misrepresenting, or falsifying information may affect your eligibility for physical and logical access to federally controlled facilities or information systems. Withholding, misrepresenting, or falsifying information may also negatively affect your employment prospects and job status, and the potential consequences include, but are not limited to, removal, debarment from Federal service, loss of eligibility for access to classified information, or prosecution.',
      'This form may become a permanent document that may be used as the basis for future investigations, eligibility determinations for access to classified information, or to hold a sensitive position, suitability or fitness for Federal employment, fitness for contract employment, or eligibility for physical and logical access to federally controlled facilities or information systems. Your responses to this form may be compared with your responses to previous SF-86 questionnaires.',
      'The investigation conducted on the basis of information provided on this form may be selected for studies and analyses in support of evaluating and improving the effectiveness and efficiency of the investigative and adjudicative methodologies. All study results released to the general public will delete personal identifiers such as name, Social Security Number, and date and place of birth.',
      '---',
      '# Authority to Request this Information',
      'Depending upon the purpose of your investigation, the U.S. Government is authorized to ask for this information under Executive Orders 10450, 10865, 12333, and 12968; sections 3301, 3302, and 9101 of title 5, United States Code (U.S.C.); sections 2165 and 2201 of title 42, U.S.C.; chapter 23 of title 50, U.S.C.; and parts 2, 5, 731, 732, and 736 of title 5, Code of Federal Regulations (CFR).',
      'Your Social Security Number (SSN) is needed to identify records unique to you. Although disclosure of your SSN is not mandatory, failure to disclose your SSN may prevent or delay the processing of your background investigation. The authority for soliciting and verifying your SSN is Executive Order 9397, as amended by EO 13478.',
      '---',
      '# The Investigative Process',
      'Background investigations for national security positions are conducted to gather information to determine whether you are reliable, trustworthy, of good conduct and character, and loyal to the U.S. The information that you provide on this form may be confirmed during the investigation. The investigation may extend beyond the time covered by this form, when necessary to resolve issues. Your current employer may be contacted as part of the investigation, although you may have previously indicated on applications or other forms that you do not want your current employer to be contacted. If you have a security freeze on your consumer or credit report file, then we may not be able to complete your investigation, which can adversely affect your eligibility for a national security position. To avoid such delays, you should request that the consumer reporting agencies lift the freeze in these instances.',
      'In addition to the questions on this form, inquiry also is made about your adherence to security requirements, your honesty and integrity, vulnerability to exploitation or coercion, falsification, misrepresentation, and any other behavior, activities, or associations that tend to demonstrate a person is not reliable, trustworthy, or loyal. Federal agency records checks may be conducted on your spouse or legally recognized civil union/domestic partner, cohabitant(s), and immediate family members. After an eligibility determination has been completed, you also may be subject to continuous evaluation, which may include periodic reinvestigations, to determine whether retention in your position is clearly consistent with the interests of national security.',
      'The information you provide on this form may be confirmed during the investigation, and may be used for identification purposes throughout the investigation process.',
      '---',
      '# Your Personal Interview',
      'Some investigations will include an interview with you as a routine part of the investigative process. The investigator may ask you to explain your answers to any question on this form. This provides you the opportunity to update, clarify, and explain information on your form more completely, which often assists in completing your investigation. It is imperative that the interview be conducted as soon as possible after you are contacted. Postponements will delay the processing of your investigation, and declining to be interviewed may result in your investigation being delayed or canceled.',
      'For the interview, you will be required to provide photo identification, such as a valid state driver\'s license. You may be required to provide other documents to verify your identity, as instructed by your investigator. These documents may include certification of any legal name change, Social Security card, passport, and/or your birth certificate. You may also be asked to provide documents regarding information that you provide on this form, or about other matters requiring specific attention. These matters include (a) alien registration or naturalization documentation; (b) delinquent loans or taxes, bankruptcies, judgments, liens, or other financial obligations; (c) agreements involving child custody or support, alimony, or property settlements; (d) arrests, convictions, probation, and/or parole; or (e) other matters described in court records.',
      '---',
      '# Instructions for Completing this Form ',
      '1. Follow the instructions provided to you by the office that gave you this form and any other clarifying instructions, provided by that office, to assist you with completion of this form. You must sign and date, in ink, the original and each copy you submit. You should retain a copy of the completed form for your records.',
      '2. All questions on this form must be answered. If no response is necessary or applicable, indicate this on the form by checking the associated "Not Applicable" box, unless otherwise noted.',
      '3. Do not abbreviate the names of cities or foreign countries. Whenever you are asked to supply a country name, you may select the country name by using the country dropdown feature.',
      '4. When entering a U.S. address or location, select the state or territory from the "States" dropdown list that will be provided. For locations outside of the U.S. and its territories, select the country in the "Country" dropdown list and leave the "State" field blank.',
      '5. The 5-digit postal ZIP Codes are required to process your investigation more rapidly. Refer to an automated system approved by the U.S. Postal Service to assist you with ZIP Codes.',
      '6. For telephone numbers in the U.S., ensure that the area code is included.',
      '7. All dates provided in this form must be in Month/Day/Year or Month/Year format. Use the dropdown lists to select the month and day. The year should be entered as a four character number (i.e. 1978 or 2001.), or selected from a dropdown list. If you are unable to report an exact date, approximate or estimate the date to the best of your ability, and indicate this by checking the "Est." box.',
      '---',
      '# Final Determination on Your Eligibility',
      'Final determination on your eligibility for a national security position is the responsibility of the Federal agency that requested your investigation and the agency that conducted your investigation. You will be provided the opportunity to explain, refute, or clarify any information before a final decision is made, if an unfavorable decision is considered. The United States Government does not discriminate on the basis of prohibited categories, including but not limited to race, color, religion, sex (including pregnancy and gender identity), national origin, disability, or sexual orientation when granting access to classified information.',
      '---',
      '# Penalties for Inaccurate or False Statements',
      'The U.S. Criminal Code (title 18, section 1001) provides that knowingly falsifying or concealing a material fact is a felony which may result in fines and/or up to five (5) years imprisonment. In addition, Federal agencies generally fire, do not grant a security clearance, or disqualify individuals who have materially and deliberately falsified these forms, and this remains a part of the permanent record for future placements. Your prospects of placement or security clearance are better if you answer all questions truthfully and completely. You will have adequate opportunity to explain any information you provide on this form and to make your comments part of the record.',
      '---',
      '# Disclosure Information',
      'The information you provide is for the purpose of investigating you for a national security position, and the information will be protected from unauthorized disclosure. The collection, maintenance, and disclosure of background investigative information are governed by the Privacy Act. The agency that requested the investigation and the agency that conducted the investigation have published notices in the Federal Register describing the systems of records in which your records will be maintained. The information you provide on this form, and information collected during an investigation, may be disclosed without your consent by an agency maintaining the information in a system of records as permitted by the Privacy Act [5 U.S.C. 552a(b)], and by routine uses, a list of which are published by the agency in the Federal Register. The office that gave you this form will provide you a copy of its routine uses.',
      'You will not receive prior notice of such disclosures under a routine use.',
      'In addition to those disclosures generally permitted under the Privacy Act, all or a portion of the records or information you provide on this form or during your investigation may be disclosed outside of OPM as a routine use as outlined below.',
      '---',
      '# Office of Personnel Management (OPM) Routine Uses',
      'OPM has published the following Privacy Act routine uses for its system of records for background investigations:',
      '**a.** To designated officers and employees of agencies, offices, and other establishments in the executive, legislative, and judicial branches of the Federal Government or the Government of the District of Columbia having a need to investigate, evaluate, or make a determination regarding loyalty to the United States; qualifications, suitability, or fitness for Government employment or military service; eligibility for logical or physical access to federally-controlled facilities or information systems; eligibility for access to classified information or to hold a sensitive position; qualifications or fitness to perform work for or on behalf of the Government under contract, grant, or other agreement; or access to restricted areas.',
      '**b.** To an element of the U.S. Intelligence Community as identified in E.O. 12333, as amended, for use in intelligence activities for the purpose of protecting United States national security interests.',
      '**c.** To any source from which information is requested in the course of an investigation, to the extent necessary to identify the individual, inform the source of the nature and purpose of the investigation, and to identify the type of information requested.',
      '**d.** To the appropriate Federal, state, local, tribal, foreign, or other public authority responsible for investigating, prosecuting, enforcing, or implementing a statute, rule, regulation, or order where OPM becomes aware of an indication of a violation or potential violation of civil or criminal law or regulation.',
      '**e.** To an agency, office, or other establishment in the executive, legislative, or judicial branches of the Federal Government in response to its request, in connection with its current employee’s, contractor employee’s, or military member’s retention; loyalty; qualifications, suitability, or fitness for employment; eligibility for logical or physical access to federallycontrolled facilities or information systems; eligibility for access to classified information or to hold a sensitive position; qualifications or fitness to perform work for or on behalf of the Government under contract, grant, or other agreement; or access to restricted areas.',
      '**f.** To provide information to a congressional office from the record of an individual in response to an inquiry from the congressional office made at the request of that individual. However, the investigative file, or parts thereof, will only be released to a congressional office if OPM receives a notarized authorization or signed statement under 28 U.S.C. 1746 from the subject of the investigation.',
      '**g.** To disclose information to contractors, grantees, or volunteers performing or working on a contract, service, grant, cooperative agreement, or job for the Federal Government.',
      '**h.** For agencies that use adjudicative support services of another agency, at the request of the original agency, the results will be furnished to the agency providing the adjudicative support.',
      '**i.** To provide criminal history record information to the FBI, to help ensure the accuracy and completeness of FBI and OPM records.',
      '**j.** To appropriate agencies, entities, and persons when (1) OPM suspects or has confirmed that there has been a breach of the system of records; (2) OPM has determined that as a result of the suspected or confirmed breach there is a risk of harm to individuals, the agency (including its information systems, programs and operations), the Federal Government, or national security; and (3) the disclosure made to such agencies, entities, and persons is reasonably necessary to assist in connection with OPM’s efforts to respond to the suspected or confirmed breach or to prevent, minimize, or remedy such harm.',
      '**k.** To another Federal agency or Federal entity, when OPM determines that information from this system of records is reasonably necessary to assist the recipient agency or entity in (1) responding to a suspected or confirmed breach or (2) preventing, minimizing, or remedying the risk of harm to individuals, the agency (including its information systems, programs and operations), the Federal Government, or national security, resulting from a suspected or confirmed breach.',
      '**l.** To disclose information to another Federal agency, to a court, or a party in litigation before a court or in an administrative proceeding being conducted by a Federal agency, when the Government is a party to the judicial or administrative proceeding. In those cases where the Government is not a party to the proceeding, records may be disclosed if a subpoena has been signed by a judge.',
      '**m.** To disclose information to the National Archives and Records Administration for use in records management inspections.',
      '**n.** To disclose information to the Department of Justice, or in a proceeding before a court, adjudicative body, or other administrative body before which OPM is authorized to appear, when:',
      '1. OPM, or any component thereof; or',
      '2. Any employee of OPM in his or her official capacity; or',
      '3. Any employee of OPM in his or her individual capacity where the Department of Justice or OPM has agreed to represent the employee; or',
      '4. The United States, when OPM determines that litigation is likely to affect OPM or any of its components; is a party to litigation or has an interest in such litigation, and the use of such records by the Department of Justice or OPM is deemed by OPM to be relevant and necessary to the litigation, provided, however, that the disclosure is compatible with the purpose for which records were collected.',
      '**o.** For the Merit Systems Protection Board--To disclose information to officials of the Merit Systems Protection Board or the Office of the Special Counsel, when requested in connection with appeals, special studies of the civil service and other merit systems, review of OPM rules and regulations, investigations of alleged or possible prohibited personnel practices, and such other functions, e.g., as promulgated in 5 U.S.C. 1205 and 1206, or as may be authorized by law.',
      '**p.** To disclose information to an agency Equal Employment Opportunity (EEO) office or to the Equal Employment Opportunity Commission when requested in connection with investigations into alleged or possible discrimination practices in the Federal sector, or in the processing of a Federal-sector EEO complaint.',
      '**q.** To disclose information to the Federal Labor Relations Authority or its General Counsel when requested in connection with investigations of allegations of unfair labor practices or matters before the Federal Service Impasses Panel.',
      '**r.** To another Federal agency’s Office of Inspector General when OPM becomes aware of an indication of misconduct or fraud during the applicant’s submission of the standard forms.',
      '**s.** To another Federal agency’s Office of Inspector General in connection with its inspection or audit activity of the investigative or adjudicative processes and procedures of its agency as authorized by the Inspector General Act of 1978, as amended, exclusive of requests for civil or criminal law enforcement activities.',
      '**t.** To a Federal agency or state unemployment compensation office upon its request in order to adjudicate a claim for unemployment compensation benefits when the claim for benefits is made as the result of a qualifications, suitability, fitness, security, identity credential, or access determination.',
      '**u.** To appropriately cleared individuals in Federal agencies, to determine whether information obtained in the course of processing the background investigation is or should be classified.',
      '**v.** To the Office of the Director of National Intelligence for inclusion in its Scattered Castles system in order to facilitate reciprocity of background investigations and security clearances within the intelligence community or assist agencies in obtaining information required by the Federal Investigative Standards.',
      '**w.** To the Director of National Intelligence, or assignee, such information as may be requested and relevant to implement the responsibilities of the Security Executive Agent for personnel security, and pertinent personnel security research and oversight, consistent with law or executive order.',
      '**x.** To Executive Branch Agency insider threat, counterintelligence, and counterterrorism officials to fulfill their responsibilities under applicable Federal law and policy, including but not limited to E.O. 12333, 13587 and the National Insider Threat Policy and Minimum Standards.',
      '**y.** To the appropriate Federal, State, local, tribal, foreign, or other public authority in the event of a natural or manmade disaster. The record will be used to provide leads to assist in locating missing subjects or assist in determining the health and safety of the subject. The record will also be used to assist in identifying victims and locating any surviving next of kin.',
      '**z.** To Federal, State, and local government agencies, if necessary, to obtain information from them which will assist OPM in its responsibilities as the authorized Investigation Service Provider in conducting studies and analyses in support of evaluating and improving the effectiveness and efficiency of the background investigation methodologies.',
      '**aa.** To an agency, office, or other establishment in the executive, legislative, or judicial branches of the Federal Government in response to its request, in connection with the classifying of jobs, the letting of a contract, or the issuance of a license, grant, or other benefit by the requesting agency, to the extent that the information is relevant and necessary to the requesting agency’s decision on the matter.',
      '---',
      '# Public Burden Information',
      'Public burden reporting for this collection of information is **estimated to average 150 minutes per response**, including time for reviewing instructions, searching existing data sources, gathering and maintaining the data needed, and completing and reviewing the collection of information. Send comments regarding the burden estimate or any other aspect of this collection of information, including suggestions for reducing this burden, to U.S. Office of Personnel Management, Federal Investigative Services, Attn: OMB Number 3206-0005, 1900 E Street, N.W., Washington, DC 20415. The OMB clearance number, 3206-0005, is currently valid. OPM may not collect this information, and you are not required to respond, unless this number is displayed.'
    ],
    acceptance: {
      title: 'Persons completing this form should begin after carefully reading the preceding instructions',
      para: [
        'I have read the instructions and I understand that if I withhold, misrepresent, or falsify information on this form, I am subject to the penalties for inaccurate or false statement (per U. S. Criminal Code, Title 18, section 1001), denial or revocation of a security clearance, and/or removal and debarment from Federal Service.'
      ]
    }
  },
  releases: {
    destination: {
      comments: 'Additional comments',
      generalMedical: 'Release of information/HIPPA',
      credit: 'Credit reporting disclosure'
    },
    verify: {
      heading: {
        title: 'Verify your information is correct',
        changeInformation: 'Need to change your information?',
        name: 'Your full name',
        otherNamesUsed: 'Other names used',
        dateOfBirth: 'Date of birth',
        ssn: 'Social Security Number',
        currentAddress: 'Current street address',
        telephoneNumber: 'Telephone number',
        changeAddress: 'Need to change your address?'
      },
      label: {
        name: 'Type your name below to sign',
        changeInformation: 'Back to Information about you',
        changeAddress: 'Back to where you have lived',
        none: 'Not entered'
      }
    },
    additionalComments: {
      contents: [
        '## Additional Comments',
        'After completing this form and any attachments, you should review your answers to all questions to make sure the form is complete and accurate, and then sign and date the following certification and the attached release(s).'
      ],
      certificationContents: [
        '## Certification',
        'My statements on this form, and on any attachments to it, are true, complete, and correct to the best of my knowledge and belief and are made in good faith. I further affirm that, to the best of my knowledge, I have not included any classified information herein. I have carefully read the foregoing instructions to complete this form. I understand that a knowing and willful false statement on this form can be punished by fine or imprisonment or both (18 U.S.C. 1001). I understand that intentionally withholding, misrepresenting, falsifying, or including classified information may have a negative effect on my security clearance, employment prospects, or job status, up to and including denial or revocation of my security clearance, or my removal and debarment from Federal service.'
      ]
    },
    general: {
      contents: [
        '## Questionnaire for National Security Positions',
        '### United States of America Authorization for Release of Information',
        '**Carefully read this authorization to release information about you, then sign and date it in ink.**',
        '**I Authorize** any investigator, special agent, or other duly accredited representative of the authorized Federal agency conducting my background investigation, reinvestigation or ongoing evaluation (i.e. continuous evaluation) of my eligibility for access to classified information or, when applicable, eligibility to hold a national security sensitive position to obtain any information relating to my activities from individuals, schools, residential management agents, employers, criminal justice agencies, credit bureaus, consumer reporting agencies, collection agencies, retail business establishments, or other sources of information. This information may include, but is not limited to current and historic, academic, residential, achievement, performance, attendance, disciplinary, employment, criminal, financial, and credit information, and publicly available social media information. I authorize the Federal agency conducting my investigation, reinvestigation, or ongoing evaluation (i.e. continuous evaluation) of eligibility to disclose the record of investigation or ongoing evaluation to the requesting agency for the purpose of making a determination of suitability or initial or continued eligibility for a national security position or eligibility for access to classified information.',
        '**I Understand** that, for these purposes, publicly available social media information includes any electronic social media information that has been published or broadcast for public consumption, is available on request to the public, is accessible on-line to the public, is available to the public by subscription or purchase, or is otherwise lawfully accessible to the public. I further understand that this authorization does not require me to provide passwords; log into a private account; or take any action that would disclose non-publicly available social media information.',
        '**I Authorize** the Social Security Administration (SSA) to verify my Social Security Number (to match my name, Social Security Number, and date of birth with information in SSA records and provide the results of the match) to the United States Office of Personnel Management (OPM) or other Federal agency requesting or conducting my investigation for the purposes outlined above. I authorize SSA to provide explanatory information to OPM, or to the other Federal agency requesting or conducting my investigation, in the event of a discrepancy.',
        '**I Understand** that, for financial or lending institutions, medical institutions, hospitals, health care professionals, and other sources of information, separate specific releases may be needed, and I may be contacted for such releases at a later date.',
        '**I Authorize** any investigator, special agent, or other duly accredited representative of the OPM, the Federal Bureau of Investigation, the Department of Defense, the Department of Homeland Security, the Office of the Director of National Intelligence, the Department of State, and any other authorized Federal agency, to request criminal record information about me from criminal justice agencies for the purpose of determining my eligibility for assignment to, or retention in, a national security position, in accordance with 5 U.S.C. 9101. I understand that I may request a copy of such records as may be available to me under the law.',
        '**I Authorize** custodians of records and other sources of information pertaining to me to release such information upon request of the investigator, special agent, or other duly accredited representative of any Federal agency authorized above regardless of any previous agreement to the contrary',
        '**I Understand** that the information released by records custodians and sources of information is for official use by the Federal Government only for the purposes provided in this Standard Form 86, and that it may be disclosed by the Government only as authorized by law.',
        '**I Authorize** the information to be used to conduct officially sanctioned and approved personnel security-related studies and analyses, which will be maintained in accordance with the Privacy Act.',
        'Photocopies of this authorization with my signature are valid. This authorization shall remain in effect so long as I occupy a national security sensitive position or require eligibility for access to classified information'
      ]
    },
    credit: {
      contents: [
        '## United States of America Fair Credit Reporting Disclosure and Authorization',
        '### Disclosure',
        'One or more reports from consumer reporting agencies may be obtained for employment purposes pursuant to the Fair Credit Reporting Act, codified at 15 U.S.C. § 1681 et seq.',
        '### Purpose',
        'The Federal government requires information from one or more consumer reporting agencies in order to obtain information in connection with a background investigation, reinvestigation, or ongoing evaluation (i.e. continuous evaluation) of eligibility for access to classified information, or when applicable, eligibility to hold a national security sensitive position. The information obtained may be disclosed to other Federal agencies for the above purposes in fulfillment of official responsibilities to the extent that such disclosure is permitted by law. Information from the consumer report will not be used in violation of any applicable Federal or state equal employment opportunity law or regulation',
        '### Authorization',
        'I hereby authorize any investigator, special agent, or other duly accredited representative of the authorized Federal agency conducting my initial background investigation, reinvestigation, or ongoing evaluation (i.e. continuous evaluation) of my eligibility for access to classified information, or when applicable, eligibility to hold a national security sensitive position to request, and any consumer reporting agency to provide, such reports for purposes described above.',
        '**Note:** If you have a security freeze on your consumer or credit report file, we will not be able to access the information necessary to complete your investigation, which can adversely affect your eligibility for a national security position. To avoid such delays, you should expeditiously respond to any requests made to release the credit freeze for the purposes as described above',
        'Photocopies of this authorization with my signature are valid. This authorization shall remain in effect so long as I occupy a national security sensitive position or require eligibility for access to classified information.'
      ]
    },
    medical: {
      contents: [
        '## United States of America Authorization for Release of Medical Information pursuant to the Health Insurance Portability and Accountability Act (HIPAA)',
        'If you answered "Yes" to Section 21 of the Standard Form 86 (SF-86), carefully read this authorization to release information about you, then sign and date it in ink.',
        '**Authorization**',
        'This is an authorization for the investigator to ask your health practitioner(s) the questions below concerning your mental health consultations. The U.S. government recognizes the critical importance of mental health and advocates proactive management of mental health conditions to support the wellness and recovery of Federal employees and others. The government recognizes that mental health counseling and treatment may provide important support for those who have experienced traumatic events, as well as for those with other mental health conditions. While most individuals with mental health conditions do not present security risks, there may be times when such a condition can affect a person’s eligibility for a security clearance. Seeking or receiving mental health care for personal wellness and recovery may contribute favorably to decisions about your eligibility. Your signature will allow the practitioner(s) to answer only those questions identified below.',
        'I am seeking assignment to or retention in a national security sensitive position. As part of the clearance investigative process, I hereby authorize the investigator, special agent, or duly accredited representative of the authorized Federal agency conducting my background investigation, reinvestigation, or ongoing evaluation (i.e.  continuous evaluation) of eligibility for access to classified information or eligibility to hold a national security sensitive position to request, and my health practitioner(s) to provide, the information requested below, relating to my mental health consultations. ',
        'In accordance with HIPAA, I understand that I have the right to revoke this authorization at any time by writing to my health care provider/entity. Revocation of this authorization is not effective until received by my health care provider/entity. I understand that I may revoke this authorization, except to the extent that action has already been taken based on this authorization. Further, I understand that this authorization is voluntary. My treatment, payment, enrollment in a health plan, or eligibility for benefits will not be conditioned upon my authorization of this disclosure.',
        'I understand the information disclosed pursuant to this authorization for use by the Federal Government only for purposes provided in the Standard Form 86 will no longer be covered by the HIPAA Privacy Rule, and that the Federal Government may redisclose the information as authorized by law, subject to Privacy Act safeguards.',
        'Photocopies of this authorization with my signature are valid. This authorization is valid for one (1) year from the date signed or upon termination of my affiliation with the Federal Government, whichever is sooner.'
      ]
    }
  }
}

export default en

//  LocalWords:  citizenships
