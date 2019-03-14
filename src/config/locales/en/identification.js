/* eslint import/prefer-default-export: 0 */

export const identification = {
  intro: {
    title: 'Information about you',
    body:
      'You will be asked questions about your personal information and be asked to provide details if necessary.',
  },
  tour: {
    para: 'Take a guided tour through the section',
  },
  review: {
    para: 'View all the sections associated with identification at once',
  },
  section: {
    name: 'Information about you',
  },
  subsection: {
    intro: 'Introduction',
    name: 'Full name',
    birthdate: 'Date of birth',
    birthplace: 'Place of birth',
    ssn: 'Social security number',
    othernames: 'Other names used',
    contacts: 'Your contact information',
    physical: 'Your identifying information',
    review: 'Review',
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
    physical: 'Your identifying information',
  },
  name: {
    title: 'Provide your full name',
    last: {
      help: {
        title: 'Enter a valid last name.',
        message:
          'Please enter your entire last name. If your last name if a single letter, select the "Initial only" checkbox and type the letter below.',
        note: '',
      },
    },
    first: {
      help: {
        title: 'Enter a valid first name.',
        message:
          'Please enter your entire first name. If your first name is a single letter, select the "Initial only" checkbox and type the letter below.',
        note: '',
      },
    },
    middle: {
      help: {
        title: 'Enter a valid middle name.',
        message: [
          'Please enter your entire middle name.',
          'If your middle name is a single letter, select the "initial only" checkbox and type the letter below. If you don\'t have a middle name, select the "No middle name" checkbox and leave the field below blank.',
        ],
        note: '',
      },
    },
    suffix: {
      help: {
        title: 'Use "Other" if your suffix isn\'t listed',
        message:
          'If the suffix does not appear in this list, select "Other" and enter the suffix in the provided field.',
        note: '',
      },
    },
  },
  othernames: {
    title: 'Provide your other names used and the period of time you used them',
    info:
      'For example: your maiden name, name(s) by a former marriage, former name(s), alias(es), or nickname(s).',
    branch: {
      help: {
        title: 'List all other names you have used no matter how long ago',
        message: [
          'Input names one at a time, you will have the ability to add multiple other names.',
        ],
        note:
          'Example: Full name is Michael and nickname Mike. "Mike" would be the other name used.',
      },
      question: 'Have you used any other names?',
    },
    collection: {
      summary: {
        title: 'Summary of other names used',
        name: 'Name',
        present: 'Now',
        nodates: 'NA',
        unknown: 'Provide your full name below',
      },
      append: 'Add another name',
      appendTitle: 'Do you have additional names to enter?',
    },
    heading: {
      name: 'Provide other name used',
      maiden: 'Was this your maiden name?',
      used: 'Dates used',
      reason: 'Provide the reasons why the name was changed',
    },
    label: {
      maiden: 'Was this your maiden name?',
      reason: 'Provide the reasons why the name changed',
    },
  },
  birthdate: {
    title: 'Provide your date of birth',
    confirmation: 'I confirm this date is correct',
    help: {
      title: 'Check "Estimated" if date of birth is unknown',
      message:
        'If you are not sure of your exact date of birth estimate it as best you can and check the "Estimated" checkbox. ',
      note: '',
    },
  },
  birthplace: {
    title: 'Provide your place of birth',
    question: {
      label: 'Were you born in the United States of America?',
      yes: 'Yes',
      no: 'No',
    },
    branch: {
      help: {
        title: 'This is your physical place of birth',
        message:
          'Example: United States citizens born in another country would list that other country.',
        note: '',
      },
    },
    help: {
      city: {
        title: 'Need help with the city?',
        message: 'City where you were born',
        note: '',
      },
      state: {
        title: 'Need help with the state?',
        message: 'State where you were born',
        note: '',
      },
      country: {
        title: 'Need help with the country?',
        message: 'Country where you were born',
        note: '',
      },
      county: {
        title: 'Need help with the county?',
        message: 'County where you were born',
        note: '',
      },
    },
    label: {
      state: 'State or territory',
      city: 'City',
      county: 'County or province',
      country: 'Country',
      location: 'Were you born in the United States?',
    },
  },
  contacts: {
    title: 'Provide your contact information',
    help: {
      email: {
        title: 'Email addresses are not required',
        message:
          'Email addresses are not required but may assist in the completion of your background investigation.',
        note: 'Email format example: name@example.com',
      },
      phoneNumber: {
        title: 'Enter only current phone numbers',
        message:
          'Additional numbers provided may assist in the completion of your background investigation.',
        note: '',
      },
    },
    collection: {
      summary: {
        unknownPhone: 'Provide your telephone number below',
        phoneNumber: 'Phone number',
      },
      phoneNumbers: {
        summary: {
          title: 'Summary of phone numbers',
        },
        append: 'Add another phone number',
      },
    },
    heading: {
      email: 'Your email addresses',
      emailHome: 'Home email address',
      emailWork: 'Work email address',
      phoneNumber: 'Your phone numbers',
      comments: 'Add optional comments',
    },
    para: {
      email:
        'Providing email addresses may assist in the completion of your background investigation. Email addresses may be used as contact method, and identify subject in records.',
      phoneNumber:
        'Provide three contact numbers. **At least one number is required**. Additional numbers may assist in the completion of your background investigation.',
    },
    label: {
      email: 'Email address',
      comments:
        'If you need to provide any additional comments about this information enter them below',
      phoneNumber: 'Phone number',
    },
  },
  ssn: {
    title: 'Provide your U.S. Social Security Number',
    heading: {
      verify: 'Please confirm your social security number',
      verified: 'Thank you for confirming your social security number!',
    },
    help: {
      title: 'Check "Not applicable" if no SSN',
      message:
        'If a U.S. Social Security Number isn\'t present check the "Not applicable" checkbox.',
      note: '',
    },
    label: {
      notApplicable: 'Not applicable',
      last: '',
      middle: '',
      first: '',
      verify: 'Please verify your social security number',
    },
  },
  traits: {
    title: 'Provide your identifying information',
    heading: {
      hair: 'Hair color',
      eye: 'Eye color',
      height: 'Height',
      weight: 'Weight',
      sex: 'Select your sex',
      comments: 'Add your comment about sex',
    },
    help: {
      feet: {
        title: 'Need help with your height?',
        message: 'Feet must be a number between 1 and 9',
        note: '',
      },
      inches: {
        title: 'Need help with your height?',
        message: 'Inches must be a number between 0 and 11',
        note: '',
      },
      height: {
        title: 'Use feet and inches only',
        message: [
          'Feet must be a number between 1 and 9. Inches must be between 0 and 11.',
        ],
        note: '',
      },
      weight: {
        title: 'Use pounds and whole numbers only',
        message: ['Weight must be a number between 10 and 999.'],
        note: '',
      },
      eye: {
        title: 'Select your natural eye color?',
        message: 'Choose the eye color that most closely represents your eyes.',
        note: '',
      },
      hair: {
        title: 'Select your current hair color or style',
        message:
          'Choose the hair color that most closely represents your hair today.',
        note: '',
      },
      sex: {
        title: 'Provide more information',
        message:
          'To add more information regarding your gender, select “Add a comment” below.',
        note: '',
      },
    },
    label: {
      sex: 'Select your sex at the time of birth',
      feet: 'Feet',
      inches: 'Inches',
      pounds: 'Pounds',
      comments: 'Add a comment about sex',
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
      unknown: 'Unspecified or unknown',
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
      unknown: 'Unknown',
    },
    sex: {
      female: 'Female',
      male: 'Male',
    },
  },
}
