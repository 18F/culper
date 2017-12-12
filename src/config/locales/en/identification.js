export const identification = {
  intro: {
    title: 'Section 1: Information about you',
    body: 'You will be asked questions about your personal information and be asked to provide details if necessary.'
  },
  tour: {
    para: 'Take a guided tour through the section'
  },
  review: {
    para: 'View all the sections associated with identification at once',
    comments: 'Would you like to add a comment about any of your responses relating to information about you?'
  },
  destination: {
    intro: 'Identification intro',
    review: 'Review Identification',
    othernames: 'Other names used',
    name: 'Full name',
    birthdate: 'Date of birth',
    birthplace: 'Place of birth',
    contacts: 'Your contact information',
    ssn: 'Social security number',
    physical: 'Your identifying information'
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
        message: 'More than 2 email addresses are not required but may assist in the completion of your background investigation.',
        note: 'Note: Email format example: name@example.com'
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
      email: '**At least one email address is required**, but providing additional email addresses may assist in the completion of your background investigation. Email addresses may be used as contact method, and identify subject in records.',
      phoneNumber: 'Provide your phone numbers. **At least one number is required**, but providing additional numbers may assist in the completion of your background investigation.'
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
      verify: 'Please confirm your social security number',
      verified: 'Thank you for confirming your social security number!'
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
        message: 'If additional information is appropriate please use "Add a comment" below to detail it.',
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
}
