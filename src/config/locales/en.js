const en = {
  identification: {
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
      help: 'Provide your date of birth, or the closest possible estimate you can provide'
    },
    birthplace: {
      help: 'Provide the place of birth'
    },
    ssn: {
      help: 'If you have a Social Security number, please provide it here.  If you do not, please select Not Applicable'
    }
  },
  traits: {
    hair: {
      help: 'Select the hair color that most closely represents your hair color'
    },
    eye: {
      help: 'Select an eye color that most closely represents your eye color'
    },
    sex: {
      help: 'Select your sex at the time of birth'
    }
  },
  alias: {
    reason: {
      help: 'Provide the explanation for why you use an alias.  For example, privacy in business dealings, a pen name, etc...'
    }
  }
}

export default en
