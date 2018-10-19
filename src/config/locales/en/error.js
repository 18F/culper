export const error = {
  name: {
    last: {
      required: {
        title: 'Oops, there’s a problem.',
        message: 'The last name must be provided.',
        note: ''
      },
      length: {
        title: 'Oops, there’s a problem.',
        message: '',
        note: ''
      },
      pattern: {
        title: 'There is a problem with the last name',
        message: "Some of these characters aren't allowed.",
        note:
          "Only use letters, hyphens (-), periods (.), apostrophes ('), and spaces."
      }
    },
    first: {
      required: {
        title: 'Oops, there’s a problem.',
        message:
          'If your first name is a single letter, please select the "Initial only" checkbox and type the letter. 100 character limit.',
        note: ''
      },
      length: {
        title: 'Oops, there’s a problem.',
        message:
          'If your first name is a single letter, please select the "Initial only" checkbox and type the letter. 100 character limit.',
        note: ''
      },
      pattern: {
        title: 'Oops, there’s a problem.',
        message:
          'If your first name is a single letter, please select the "Initial only" checkbox and type the letter. 100 character limit.',
        note: ''
      }
    },
    middle: {
      required: {
        title: 'Oops, there’s a problem.',
        message:
          'If your middle name is a single letter, please select the "Initial only" checkbox and type the letter. 100 character limit.',
        note: ''
      },
      length: {
        title: 'Oops, there’s a problem.',
        message:
          'If your middle name is a single letter, please select the "Initial only" checkbox and type the letter. 100 character limit.',
        note: ''
      },
      pattern: {
        title: 'Oops, there’s a problem.',
        message:
          'If your middle name is a single letter, please select the "Initial only" checkbox and type the letter. 100 character limit.',
        note: ''
      }
    },
    suffix: {
      required: {
        title: 'Your response is required',
        message: ''
      }
    },
    required: {
      title: 'Your response is required',
      message: ''
    }
  },
  birthdate: {
    age: {
      title: 'The applicant age is not approved',
      message: [
        'Your date of birth indicates you are under the age of 16, please confirm the date is correct using the button above.',
        '*or*',
        'Applicants must be younger than 130 years old.'
      ],
      note: ''
    }
  },
  ssn: {
    first: {
      pattern: {
        title: 'This field must have 3 digits',
        message:
          'The first part of the social security number must be 3 digits between 0 and 9',
        note: ''
      }
    },
    middle: {
      pattern: {
        title: 'This field must have 2 digits',
        message:
          'The middle part of the social security number must be 2 digits between 0 and 9',
        note: ''
      }
    },
    last: {
      pattern: {
        title: 'This field must have 4 digits',
        message:
          'The last part of the social security number must be 4 digits between 0 and 9',
        note: ''
      }
    },
    mismatch: {
      title: 'Confirmation mismatch',
      message: 'The two U.S. Social Security Numbers you entered do not match.',
      note: ''
    },
    required: {
      title: 'Your response is required',
      message: ''
    },
    invalid: {
      title: 'Invalid social security number',
      message: 'The social security number is considered invalid.'
    }
  },
  selective: {
    pattern: {
      title: 'Oops, there’s a problem.',
      message: 'Your Selective Service Number should only be numbers.',
      note: ''
    }
  },
  date: {
    month: {
      notfound: {
        title: 'There is a problem with the Month',
        message: 'The month should be between 01 (January) and 12 (December).',
        note: ''
      },
      min: {
        title: 'There is a problem with the Month',
        message: 'The month should be between 01 (January) and 12 (December).',
        note: ''
      },
      max: {
        title: 'There is a problem with the Month',
        message: 'The month should be between 01 (January) and 12 (December).',
        note: ''
      }
    },
    day: {
      length: {
        title: 'There is a problem with the Day',
        message: 'There is not that many days in this month.',
        note: ''
      },
      min: {
        title: 'There is a problem with the Day',
        message: 'There are not that many days in this month.',
        note: ''
      },
      max: {
        title: 'There is a problem with the Day',
        message: 'There are not that many days in this month.',
        note: ''
      }
    },
    year: {
      max: {
        title: 'There is a problem with the Year',
        message: "The year can't be in the future.",
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
      message: "The date can't be in the future."
    },
    min: {
      title: 'There is a problem with the date',
      message: 'The date should be after your date of birth.'
    },
    required: {
      title: 'Your response is required',
      message: 'All parts of the date are required even if it is **estimated**.'
    }
  },
  relative: {
    month: {
      notfound: {
        title: 'There is a problem with the Month',
        message: 'The month should be between 01 (January) and 12 (December).',
        note: ''
      },
      min: {
        title: 'There is a problem with the Month',
        message: 'The month should be between 01 (January) and 12 (December).',
        note: ''
      },
      max: {
        title: 'There is a problem with the Month',
        message: 'The month should be between 01 (January) and 12 (December).',
        note: ''
      }
    },
    day: {
      length: {
        title: 'There is a problem with the Day',
        message: 'There is not that many days in this month.',
        note: ''
      },
      min: {
        title: 'There is a problem with the Day',
        message: 'There are not that many days in this month.',
        note: ''
      },
      max: {
        title: 'There is a problem with the Day',
        message: 'There are not that many days in this month.',
        note: ''
      }
    },
    year: {
      max: {
        title: 'There is a problem with the Year',
        message: "The year can't be in the future.",
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
      message: "The date can't be in the future."
    },
    min: {
      title: 'There is a problem with the date',
      message: "The date should be after this person's date of birth."
    },
    required: {
      title: 'Your response is required',
      message: 'All parts of the date are required even if it is **estimated**.'
    }
  },
  daterange: {
    to: {
      month: {
        notfound: {
          title: 'There is a problem with the Month',
          message:
            'For the **to** date, the month should be between 1(January) and 12(December).',
          note: ''
        },
        min: {
          title: 'There is a problem with the Month',
          message:
            'For the **to** date, the month should be between 1(January) and 12(December).',
          note: ''
        },
        max: {
          title: 'There is a problem with the Month',
          message:
            'For the **to** date, the month should be between 1(January) and 12(December).',
          note: ''
        }
      },
      day: {
        length: {
          title: 'There is a problem with the Day',
          message:
            'For the **to** date, there are not that many days in this month.',
          note: ''
        },
        min: {
          title: 'There is a problem with the Day',
          message:
            'For the **to** date, there are not that many days in this month.',
          note: ''
        },
        max: {
          title: 'There is a problem with the Day',
          message:
            'For the **to** date, there are not that many days in this month.',
          note: ''
        }
      },
      year: {
        max: {
          title: 'There is a problem with the Year',
          message: "For the **to** date, the year can't be in the future.",
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
        message: "For the **to** date, the date can't be in the future."
      },
      min: {
        title: 'There is a problem with the date',
        message:
          'For the **to** date, the date should be after your date of birth.'
      },
      relative: {
        month: {
          notfound: {
            title: 'There is a problem with the Month',
            message:
              'For the **to** date, the month should be between 1(January) and 12(December).',
            note: ''
          },
          min: {
            title: 'There is a problem with the Month',
            message:
              'For the **to** date, the month should be between 1(January) and 12(December).',
            note: ''
          },
          max: {
            title: 'There is a problem with the Month',
            message:
              'For the **to** date, the month should be between 1(January) and 12(December).',
            note: ''
          }
        },
        day: {
          length: {
            title: 'There is a problem with the Day',
            message:
              'For the **to** date, there are not that many days in this month.',
            note: ''
          },
          min: {
            title: 'There is a problem with the Day',
            message:
              'For the **to** date, there are not that many days in this month.',
            note: ''
          },
          max: {
            title: 'There is a problem with the Day',
            message:
              'For the **to** date, there are not that many days in this month.',
            note: ''
          }
        },
        year: {
          max: {
            title: 'There is a problem with the Year',
            message: "For the **to** date, the year can't be in the future.",
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
          message: "For the **to** date, the date can't be in the future."
        },
        min: {
          title: 'There is a problem with the date',
          message:
            "For the **to** date, the date should be after this person's date of birth."
        }
      }
    },
    from: {
      month: {
        notfound: {
          title: 'There is a problem with the Month',
          message:
            'For the **from** date, the month should be between 1(January) and 12(December).',
          note: ''
        },
        min: {
          title: 'There is a problem with the Month',
          message:
            'For the **from** date, the month should be between 1(January) and 12(December).',
          note: ''
        },
        max: {
          title: 'There is a problem with the Month',
          message:
            'For the **from** date, the month should be between 1(January) and 12(December).',
          note: ''
        }
      },
      day: {
        length: {
          title: 'There is a problem with the Day',
          message:
            'For the **from** date, there are not that many days in this month.',
          note: ''
        },
        min: {
          title: 'There is a problem with the Day',
          message:
            'For the **from** date, there are not that many days in this month.',
          note: ''
        },
        max: {
          title: 'There is a problem with the Day',
          message:
            'For the **from** date, there are not that many days in this month.',
          note: ''
        }
      },
      year: {
        max: {
          title: 'There is a problem with the Year',
          message: "For the **from** date, the year can't be in the future.",
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
        message: "For the **from** date, the date can't be in the future."
      },
      min: {
        title: 'There is a problem with the date',
        message:
          'For the **from** date, the date should be after your date of birth.'
      },
      relative: {
        month: {
          notfound: {
            title: 'There is a problem with the Month',
            message:
              'For the **from** date, the month should be between 1(January) and 12(December).',
            note: ''
          },
          min: {
            title: 'There is a problem with the Month',
            message:
              'For the **from** date, the month should be between 1(January) and 12(December).',
            note: ''
          },
          max: {
            title: 'There is a problem with the Month',
            message:
              'For the **from** date, the month should be between 1(January) and 12(December).',
            note: ''
          }
        },
        day: {
          length: {
            title: 'There is a problem with the Day',
            message:
              'For the **from** date, there are not that many days in this month.',
            note: ''
          },
          min: {
            title: 'There is a problem with the Day',
            message:
              'For the **from** date, there are not that many days in this month.',
            note: ''
          },
          max: {
            title: 'There is a problem with the Day',
            message:
              'For the **from** date, there are not that many days in this month.',
            note: ''
          }
        },
        year: {
          max: {
            title: 'There is a problem with the Year',
            message: "For the **from** date, the year can't be in the future.",
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
          message: "For the **from** date, the date can't be in the future."
        },
        min: {
          title: 'There is a problem with the date',
          message:
            "For the **from** date, the date should be after this person's date of birth."
        }
      }
    },
    order: {
      title: 'There is a problem with the date range',
      message: 'The **from** date should be before the **to** date.',
      note: ''
    },
    required: {
      title: 'Your response is required',
      message:
        'All parts of the date(s) are required even if it is **estimated**.'
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
    },
    required: {
      title: 'Your response is required',
      message: ''
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
    },
    required: {
      title: 'Your response is required',
      message: ''
    }
  },
  location: {
    required: {
      title: 'Your response is required',
      message: ''
    },
    street: {
      required: {
        title: 'Your response is required',
        message: ''
      }
    },
    state: {
      required: {
        title: 'Your response is required',
        message: ''
      },
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
    city: {
      required: {
        title: 'Your response is required',
        message: ''
      },
      length: {
        title: 'There is a problem with the City',
        message: 'City name should be between 2 and 100 characters.',
        note: ''
      }
    },
    zipcode: {
      required: {
        title: 'Your response is required',
        message: ''
      },
      pattern: {
        title: 'There is a problem with the ZIP Code',
        message: 'The ZIP Code should be either 5 or 9 digits.',
        note: ''
      }
    },
    toggleablelocation: {
      required: {
        title: 'Your response is required',
        message: ''
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
        },
        status: {
          title: 'There is a problem with the ZIP Code',
          message: 'The ZIP Code must be from the state in the address.',
          note:
            'Note: Please make sure you also entered the correct state code.'
        }
      },
      country: {
        required: {
          title: 'Your response is required',
          message: ''
        },
        notfound: {
          title: 'This country is not on our current list',
          message: [
            "If you don't see your country in the list, select the country that presently governs the location you are referring to. Add a comment to clarify your response."
          ],
          note: ''
        }
      },
      apofpo: {
        notfound: {
          title: 'There is a problem with the State Code',
          message: 'APO/FPO state code must be 2 letters',
          note: 'Note: Typically the value is either AA, AE, or AP.'
        }
      }
    },
    address: {
      required: {
        title: 'Your response is required',
        message: ''
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
          note:
            'Note: A 9 digit zip code should be in the following format #####-####.'
        },
        status: {
          title: 'There is a problem with the ZIP Code',
          message: 'The ZIP Code must be from the state in the address.',
          note:
            'Note: Please make sure you also entered the correct state code.'
        }
      },
      country: {
        notfound: {
          title: 'This country is not on our current list',
          message: [
            "If you don't see your country in the list, select the country that presently governs the location you are referring to. Add a comment to clarify your response."
          ],
          note: ''
        }
      },
      apofpo: {
        notfound: {
          title: 'There is a problem with the State Code',
          message: 'APO/FPO state code must be 2 letters',
          note: 'Note: Typically the value is either AA, AE, or AP.'
        }
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
    required: {
      title: 'Your response is required',
      message: ''
    },
    notfound: {
      title: 'This Country is not on our current list',
      message: [
        "If you don't see your country in the list, select the country that presently governs the location you are referring to. Add a comment to clarify your response."
      ],
      note: ''
    }
  },
  passport: {
    length: {
      title: ''
    },
    required: {
      title: 'Your response is required',
      message: ''
    },
    pattern: {
      title: 'There is a problem with the passport number',
      message: [
        'U.S. Passport numbers must be nine alphanumeric characters (letters and numbers).'
      ],
      note: ''
    },
    expiration: {
      min: {
        title: 'There is a problem with the date',
        message: 'The date should be after the passport was issued.'
      }
    }
  },
  currency: {
    max: {
      title: 'Currency value is too large',
      message: 'Currency amounts over $2,147,483,647 are not supported.'
    },
    min: {
      title: 'There is a problem with the losses',
      message: 'The reported losses should have a dollar value.',
      note: ''
    },
    required: {
      title: 'Your response is required',
      message: ''
    }
  },
  telephone: {
    domestic: {
      first: {
        pattern: {
          title: 'There is a problem with the area code',
          message:
            'The area code should be 3 numbers long and between 0 and 9.',
          note: ''
        },
        length: {
          title: 'There is a problem with the area code',
          message:
            'The area code should be 3 numbers long and between 0 and 9.',
          note: ''
        },
        required: {
          title: 'Your response is required',
          message: ''
        }
      },
      second: {
        pattern: {
          title: 'There is a problem with the phone number',
          message:
            'The first part of the phone number should be 3 numbers long and between 0 and 9.',
          note: ''
        },
        length: {
          title: 'There is a problem with the phone number',
          message:
            'The first part of the phone number should be 3 numbers long and between 0 and 9.',
          note: ''
        },
        required: {
          title: 'Your response is required',
          message: ''
        }
      },
      third: {
        pattern: {
          title: 'There is a problem with the phone number',
          message:
            'The last part of the phone number should be 4 numbers long and between 0 and 9.',
          note: ''
        },
        length: {
          title: 'There is a problem with the phone number',
          message:
            'The last part of the phone number should be 4 numbers long and between 0 and 9.',
          note: ''
        },
        required: {
          title: 'Your response is required',
          message: ''
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
          message:
            'The first part of the DSN number must be 3 digits between 0 and 9.',
          note: ''
        },
        length: {
          title: 'This field must have 3 digits',
          message:
            'The first part of the DSN number must be 3 digits between 0 and 9.',
          note: ''
        },
        required: {
          title: 'Your response is required',
          message: ''
        }
      },
      second: {
        pattern: {
          title: 'This field must have 4 digits',
          message:
            'The last part of the DSN number must be 4 digits between 0 and 9.',
          note: ''
        },
        length: {
          title: 'This field must have 4 digits',
          message:
            'The last part of the DSN number must be 4 digits between 0 and 9.',
          note: ''
        },
        required: {
          title: 'Your response is required',
          message: ''
        }
      }
    },
    international: {
      first: {
        pattern: {
          title: 'There is a problem with this country code',
          message:
            'The country code of the international number should be 3 digits between 0 and 9.',
          note: ''
        },
        length: {
          title: 'There is a problem with this country code',
          message:
            'The country code of the international number should be 3 digits between 0 and 9.',
          note: ''
        },
        required: {
          title: 'Your response is required',
          message: ''
        }
      },
      second: {
        pattern: {
          title: 'There is a problem with this number',
          message:
            'The international number should be 10 digits between 0 and 9.',
          note: ''
        },
        length: {
          title: 'There is a problem with this number',
          message:
            'The international number should be 10 digits between 0 and 9.',
          note: ''
        },
        required: {
          title: 'Your response is required',
          message: ''
        }
      }
    },
    numberType: {
      required: {
        title: 'Your response is required',
        message: ''
      }
    },
    required: {
      title: 'Your response is required',
      message: ''
    }
  },
  geocode: {
    original: {
      title: 'Original address'
    },
    partial: {
      title: 'Alternate address found',
      label: 'Suggested Address',
      para:
        'Consider the highlighted change below. Using the US Postal Service suggested address will help us process your case more quickly.'
    },
    city: {
      title: 'City could not be found',
      para:
        'There is a city-state mismatch. Have you entered the correct city and state?'
    },
    notfound: {
      title: 'Address not found',
      para:
        'The address provided could not be found. Please ensure you have correctly typed all address fields correctly.'
    },
    generic: {
      title: 'Unable to validate address',
      para: 'The address provided cannot be properly validated.'
    },
    multiple: {
      title: 'Multiple address found',
      para:
        'Multiple addresses were found for the information you entered, and no default exists.'
    },
    defaultAddress: {
      title: 'More information required',
      para:
        'The address you entered was found but more information is needed (such as an apartment, suite, or box number) to match to a specific address.'
    }
  },
  email: {
    pattern: {
      title: "This email isn't valid",
      message:
        'Check for any spelling and/or format mistakes in your email address.',
      note: 'Example of valid email format: name@domain.com'
    },
    required: {
      title: 'Your response is required',
      message: ''
    }
  },
  treatment: {
    began: {
      max: {
        title: 'There is a problem with the date',
        message: "The date can't be in the future."
      },
      min: {
        title: 'There is a problem with the date',
        message: 'The date should be after your date of birth.'
      }
    },
    end: {
      max: {
        title: 'There is a problem with the date',
        message: "The date can't be in the future."
      },
      min: {
        title: 'There is a problem with the date',
        message: 'The date should be after the date treatment began.'
      }
    }
  },
  contact: {
    last: {
      max: {
        title: 'There is a problem with the date',
        message: "The date can't be in the future."
      },
      min: {
        title: 'There is a problem with the date',
        message: 'The date should be after the first contact.'
      }
    }
  },
  parent: {
    dob: {
      max: {
        title: 'There is a problem with the date',
        message:
          "The date can't be in the future and must be before your date of birth."
      },
      min: {
        title: 'There is a problem with the date',
        message: 'The age may not exceed 200 years.'
      }
    }
  },
  required: {
    title: 'Your response is required',
    message: ''
  },
  submission: {
    message:
      'There was a problem submitting your SF-86. Please contact support for additional information.'
  },
  validMaritalRelation: {
    title: 'Mother-in-law and father-in-law must be provided',
    message:
      'You indicated that you are married or separated, please provide entries for mother-in-law and father-in-law.'
  },
  validRelation: {
    title: 'Mother and father must be provided',
    message:
      'If you do not know your mother or father, please enter "I don\'t know" and provide a comment explaining your relationship.'
  },
  validPhoneTypes: {
    title: 'There is a problem with your phone numbers',
    message: 'Please provide only one of each phone number type.'
  },
  civilUnion: {
    min: {
      title: 'There is a problem with the date',
      message: "The date should be after you and your partners\' date of birth."
    },
    max: {
      title: 'There is a problem with the date',
      message: "The date can't be in the future."
    },
    required: {
      title: 'Your response is required',
      message: ''
    }
  }
}
