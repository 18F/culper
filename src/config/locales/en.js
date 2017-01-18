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
  section: {
    back: 'Back',
    next: 'Next'
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
      last: {
        help: 'Your last name is required.  If you have only 1 name, enter it in the last name field',
        error: {
          required: '',
          length: 'The last name cannot exceed 100 characters',
          pattern: 'We only support letters, hyphens (-), periods (.), apostrophes (\'), and spaces'
        }
      },
      first: {
        help: 'If your first name is an initial place the initial in this field.  If you do not have a first name leave this field empty.',
        error: {
          length: 'The first name cannot exceed 100 characters',
          pattern: 'We only support letters, hyphens (-), periods (.), apostrophes (\'), and spaces'
        }
      },
      middle: {
        help: 'Enter all of your middle names here.  If your middle name is an initial place the initial in the field.  If you do not have a middle name leave this field empty.',
        error: {
          length: 'The middle name cannot exceed 100 characters',
          pattern: 'We only support letters, hyphens (-), periods (.), apostrophes (\'), and spaces'
        }
      },
      suffix: {
        help: 'If you are a Jr., Sr., etc. select your Suffix from the list provided.  If your suffix does not appear in this list, select Other and enter your suffix in the provided field'
      }
    },
    birthdate: {
      title: 'Date of birth',
      help: 'Provide your date of birth, or the closest possible estimate you can provide',
      error: {
        age: 'Applicants must be older than 16 and less than 130 years of age'
      }
    },
    birthplace: {
      title: 'Place of birth',
      question: {
        label: 'Were you born in the United States of America',
        yes: 'Yes',
        no: 'No'
      },
      help: 'Provide the place of birth',
      label: {
        state: 'State',
        city: 'City',
        county: 'County',
        country: 'Country'
      },
      placeholder: {
        state: 'State',
        city: 'Please enter your city of birth',
        county: 'Please enter your county of birth'
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
      help: {
        hair: 'Select the hair color that most closely represents your hair color',
        eye: 'Select an eye color that most closely represents your eye color',
        sex: 'Select your sex at the time of birth',
        feet: 'Feet must be a number between 1 and 9',
        inches: 'Inches must be a number between 0 and 11',
        pounds: 'Weight must be a number between 10 and 999'
      },
      label: {
        height: 'Height',
        weight: 'Weight',
        hair: 'Hair color',
        eye: 'Eye color',
        sex: 'Sex',
        feet: 'Feet',
        inches: 'Inches',
        pounds: 'Pounds'
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
      number: 'Provide your U.S. passport number',
      issued: 'Provide the issue date of the passport',
      expiration: 'Provide the expiration date of the passport',
      comment: {
        title: 'Add optional comment',
        label: 'If you need to provide any additional comments about this information enter them below'
      }
    }
  },
  alias: {
    reason: {
      help: 'Provide the explanation for why you use an alias.  For example, privacy in business dealings, a pen name, etc...'
    }
  }
}

export default en
