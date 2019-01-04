export const history = {
  intro: {
    title: 'Section 2: Your history',
    body:
      'You will be asked questions about your history and be asked to provide details if necessary. This section includes where you have lived, where you have worked, and where you went to school.'
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
    title: "Let's cover your last 10 years",
    para1:
      'List the places where you have lived and worked beginning with your present residence or employer and working back 10 years. **Residences and employers for the entire period must be accounted for without breaks.**',
    para2:
      'You will also list any school attended in the last 10 years and all diplomas & degrees earned at any point in your life.',
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
      exiting:
        '**The full 10 year period of residence and employment history is not covered.** Your SF86 cannot be submitted until all 10 years are covered with no gaps.<br><br>We will mark the gaps and highlight them for you when you come back.'
    }
  },
  destination: {
    intro: 'History intro',
    review: 'Review your history',
    timeline: 'Timeline',
    residence: 'Places you lived',
    employment: 'Employment history',
    education: 'Schools & diplomas',
    federal: 'Former federal service'
  },
  residence: {
    title: 'Where you have lived',
    info:
      'List the places where you have lived beginning with your present residence and working back 10 years.',
    info2:
      'Residences for the entire period must be accounted for without breaks.',
    info3a:
      ' - **Indicate the actual physical location of your residence**, not a Post Office box or a permanent residence when you were not physically located there.',
    info3b:
      ' - **If you split your time between one or more residences during a time period**, you must list all residences.',
    info3c:
      ' - **Do not list residences before your 18th birthday** unless to provide a minimum of 2 years residence history.',
    summary: {
      title: 'Where you have lived',
      unit: 'Years covered',
      svgAlt: 'Years covered for locations you have lived'
    },
    collection: {
      caption: 'Where you have lived',
      summary: {
        title: 'Summary of places you have lived',
        item: 'Address',
        unknown: 'Provide residence details',
        incomplete: "This residence's information is incomplete",
        item2: 'Person'
      },
      append: 'Add another residence',
      appendTitle: 'Do you have an additional residence to report?'
    },
    gap: {
      title: 'Residence gap',
      para:
        'There is a gap in your residence history. The entire 10 year period must be covered with no gaps',
      btnText: 'Add an address'
    },
    heading: {
      done: "Done! Now let's add more",
      exiting: 'Before you leave this section',
      details: 'Enter your residence information',
      dates: 'Provide dates of residence',
      address: 'Provide the street address',
      comments:
        'If you need to provide additional comments about this information enter them below',
      role: 'Is/was this residence',
      reference: 'Add a person that knows you'
    },
    para: {
      done:
        'Use the button below to save your history entry and start another.',
      exiting:
        '**The full 10 year period of residence history is not covered.** Your SF86 cannot be submitted until all 10 years are covered with no gaps.<br><br>We will mark the gaps and highlight them for you when you come back.',
      details:
        'Indicate the actual physical location of your residence, not a Post Office box or a permanent residence when you were not physically located there. If you split your time between one or more residences during a time period, you must list all residences. Do not list residences before your 18th birthday unless to provide a minimum of 2 years residence history.',
      reference:
        'For any address in the last 3 years, provide a person who knew you at the address, and who preferably still lives in that area. Do not list people who knew you well for residences completely outside this 3-year period, and do not list your spouse, cohabitant or other relatives.'
    },
    label: {
      dates:
        'You are not required to list temporary locations of less than 90 days that did not serve as your permanent or mailing address.',
      address: 'This address is',
      comments: 'Add optional comment',
      role: {
        owned: 'Owned by you',
        rented: 'Rented or leased by you',
        military: 'Military housing',
        other: 'Other',
        explanation: 'Please provide an explanation'
      }
    },
    help: {
      dates: {
        title: 'Estimate the date if unsure',
        message:
          'If you are not sure of the exact dates give us your best guess and check the "Estimated" checkbox.',
        note: ''
      },
      address: {
        title: 'Acronyms:',
        message:
          'APO - Army Post Office, FPO - Fleet Post Office, DPO - Diplomatic Post Office.',
        note: ''
      },
      role: {
        title: 'Need help with the role?',
        message: 'Provide your role at this residence as closely as possible',
        note: ''
      },
      comments: {
        title: 'Need help providing additional information?',
        message:
          'If you need to provide any additional comments about this information enter them below',
        note: ''
      }
    }
  },
  employment: {
    summary: {
      title: 'Employment activities',
      unit: 'Years covered',
      svgAlt: 'Years covered for your employment activities'
    },
    gap: {
      title: 'Employment gap',
      para:
        'There is a gap in your employment. The entire 10 year period must be covered with no gaps',
      btnText: 'Add an employer'
    },
    heading: {
      employment: 'List where you have worked',
      exiting: 'Before you leave this section'
    },
    para: {
      exiting:
        '**The full 10 year period of employment history is not covered.** Your SF86 cannot be submitted until all 10 years are covered with no gaps.<br><br>We will mark the gaps and highlight them for you when you come back.',
      employment:
        'List all of your employment activities, including unemployment and self-employment, beginning with the present and working back 10 years. The entire period must be accounted for without breaks. If the employment activity was military duty, list separate employment activity periods to show each change of military duty station.',
      employment2:
        'Do not list employment before your 18th birthday unless to provide a minimum of 2 years employment history.'
    },
    default: {
      noDate: {
        label: 'NA'
      },
      collection: {
        caption: 'Employment activities',
        append: 'Add another employer',
        appendTitle: 'Do you have an additional employment activity to enter?',
        summary: {
          title: 'Summary of your work history',
          employer: 'Employer',
          incomplete: "This employer's information is incomplete",
          unknown: 'Provide employer details',
          item2: 'Title'
        }
      },
      employmentRecord: {
        title:
          'Have any of the following happened to you in the last seven (7) years at employment activities that you have not previously listed?',
        list: [
          '- Fired from a job?',
          '- Quit a job after being told you would be fired?',
          '- Have you left a job by mutual agreement following charges or allegations of misconduct?',
          '- Left a job by mutual agreement following notice of unsatisfactory performance?',
          '- Received a written warning, been officially reprimanded, suspended, or disciplined for misconduct in the workplace, such as violation of security policy?'
        ],
        para:
          'If you answer "Yes", you will be required to add an additional employment record above.'
      },
      activity: {
        title: 'Government employment',
        help: {
          title: 'Specifics:',
          message:
            'Non-government employment represents all employment outside of the government excluding self-employment. If you were self employed, please choose self-employment. ',
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
          stateGovernment: 'State Government (Non-Federal employment)',
          federalContractor: 'Federal contractor',
          nonGovernment: 'Non-government employment (excluding self-employment)',
          selfEmployment: 'Self-employment',
          unemployment: 'Unemployment',
          other: 'Other',
          otherEmployment: 'Other employment'
        }
      },
      reasonDescription: {
        title: 'Reason for leaving employment',
        message: 'Explain why you left your last employment'
      },
      reasonOptions: {
        title: 'Reason for leaving employment',
        message:
          'For this employment have any of the following happened to you in the last seven (7) years?'
      },
      left: {
        title: 'Provide the reason for leaving the employment activity',
        branch:
          'For this employment have any of the following happened to you in the last seven (7) years?',
        append:
          'In the last seven (7) years do you have another reason for leaving to report for this employment?',
        list: [
          '- Fired',
          '- Quit after being told you would be fired',
          '- Left by mutual agreement following charges or allegations of misconduct',
          '- Left by mutual agreement following notice of unsatisfactory performance'
        ],
        comments:
          'Provide any additional comments for why you left this employment activity',
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
          option: 'Misconduct',
          text: 'Provide the charges or allegations of misconduct',
          date:
            'Provide the date you left following the charges or allegations of misconduct'
        },
        performance: {
          option: 'Unsatisfactory performance',
          text: 'Provide the reason(s) for unsatisfactory performance',
          date:
            'Provide the date you left by mutual agreement following a notice of unsatisfactory performance'
        }
      },
      reprimand: {
        label:
          'For this employment, in the last seven (7) years have you received a written warning, been officially reprimanded, suspended, or disciplined for misconduct in the workplace, such as a violation of security policy?',
        append:
          'Do you have another instance of discipline or a warning to provide?',
        description: {
          label:
            'Provide the reason(s) for being warned, reprimanded, suspended or disciplined'
        },
        date: {
          label:
            'Provide the month and year you were warned, reprimanded, suspended or disciplined'
        },
        help: {
          title: 'Have you received a written warning',
          message:
            'Explain if you have you received a written warning, been officially reprimanded, suspended, or disciplined for misconduct in the workplace, such as a violation of security policy'
        }
      },
      datesEmployed: {
        help: {
          title: 'Estimate the date if unsure',
          message:
            'If you are not sure of the exact dates give us your best guess and check the "Estimated" checkbox.',
          note: ''
        }
      },
      address: {
        label: 'This address is',
        help: {
          title: 'Acronyms:',
          message:
            'APO - Army Post Office, FPO - Fleet Post Office, DPO - Diplomatic Post Office.',
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
          title: 'Are/were you working from another location?',
          message:
            'Are/were you physically working from an different location than your employer\'s address? If so answer "Yes".',
          note: ''
        },
        address: {
          label: 'This address is',
          help: {
            title: 'Acronyms:',
            message:
              'APO - Army Post Office, FPO - Fleet Post Office, DPO - Diplomatic Post Office.',
            note: ''
          }
        },
        heading: {
          telephone: 'Provide telephone number',
          address:
            'Provide the work address where you are/were physically located'
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
            message:
              'If you are not sure of the exact dates give us your best guess and check the "Estimated" checkbox.',
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
            title: 'Tell us where your supervisor works/worked',
            message:
              "Provide the physical address of this supervisor's work location.",
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
          title: 'Provide the rank/position title of your supervisor',
          email: 'Provide the email address of your supervisor',
          address: 'Provide the physical work location of your supervisor',
          telephone: 'Provide the telephone number for this supervisor'
        }
      },
      heading: {
        employment: 'List where you have worked',
        done: "Done! Now let's add more",
        exiting: 'Before you leave this section',
        activity: 'Select your employment activity',
        datesEmployed: 'Provide dates of employment',
        employer: 'Provide the name of your employer',
        title: 'Provide the most recent position title',
        reference: 'Provide a reference',
        status: 'Select the employment status for this position',
        address: 'Provide the address of employer',
        supervisor: 'Your Supervisor',
        telephone: 'Provide your employment telephone number',
        physicalAddress:
          "Is/was your physical work address different than your employer's address?",
        additionalActivity: 'Additional periods of activity with this employer'
      },
      para: {
        done:
          'Use the button below to save your history entry and start another.',
        exiting:
          '**The full 10 year period of employment history is not covered.** Your SF86 cannot be submitted until all 10 years are covered with no gaps.<br><br>We will mark the gaps and highlight them for you when you come back.',
        employment:
          'List all of your employment activities, including unemployment and self-employment, beginning with the present and working back 10 years. The entire period must be accounted for without breaks. If the employment activity was military duty, list separate employment activity periods to show each change of military duty station. \n\nDo not list employment before your 18th birthday unless to provide a minimum of 2 years employment history.',
        additionalActivity:
          'List all of your employment activities, including unemployment and self-employment, beginning with the present and working back 10 years. The entire period must be accounted for without breaks. If the employment activity was military duty, list separate employment activity periods to show each change of military duty station.\n\nDo not list employment before your 18th birthday unless to provide a minimum of 2 years employment history.'
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
        physicalAddress:
          "Is/was your physical work address different than your employer's address?",
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
          title: 'Acronyms:',
          message:
            'APO - Army Post Office, FPO - Fleet Post Office, DPO - Diplomatic Post Office.',
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
            title: 'Provide the email of this supervisor',
            message:
              'Only provide an active email address where this supervisor can be reached.',
            note: ''
          }
        },
        address: {
          label: 'This address is',
          help: {
            title: 'Acronyms:',
            message:
              'APO - Army Post Office, FPO - Fleet Post Office, DPO - Diplomatic Post Office.',
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
        additionalActivity:
          'List all of your employment activities, including unemployment and self-employment, beginning with the present and working back 10 years. The entire period must be accounted for without breaks. If the employment activity was military duty, list separate employment activity periods to show each change of military duty station.\n\nDo not list employment before your 18th birthday unless to provide a minimum of 2 years employment history.'
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
        physicalAddress:
          "Is/was your physical work address different than your employer's address?",
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
          title: 'Acronyms:',
          message:
            'APO - Army Post Office, FPO - Fleet Post Office, DPO - Diplomatic Post Office.',
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
            title: 'Tell us where your supervisor works/worked',
            message:
              "Provide the physical address of this supervisor's work location.",
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
        additionalActivity:
          'List all of your employment activities, including unemployment and self-employment, beginning with the present and working back 10 years. The entire period must be accounted for without breaks. If the employment activity was military duty, list separate employment activity periods to show each change of military duty station.\n\nDo not list employment before your 18th birthday unless to provide a minimum of 2 years employment history.'
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
        physicalAddress:
          "Is/was your physical work address different than your employer's address?",
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
          title: 'Acronyms:',
          message:
            'APO - Army Post Office, FPO - Fleet Post Office, DPO - Diplomatic Post Office.',
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
            title: 'Tell us where your supervisor works/worked',
            message:
              "Provide the physical address of this supervisor's work location.",
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
        additionalActivity:
          'List all of your employment activities, including unemployment and self-employment, beginning with the present and working back 10 years. The entire period must be accounted for without breaks. If the employment activity was military duty, list separate employment activity periods to show each change of military duty station.\n\nDo not list employment before your 18th birthday unless to provide a minimum of 2 years employment history.'
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
        physicalAddress:
          "Is/was your physical work address different than your employer's address?",
        additionalActivity: 'Additional periods of activity with this employer'
      },
      para: {
        additionalActivity:
          'List all of your employment activities, including unemployment and self-employment, beginning with the present and working back 10 years. The entire period must be accounted for without breaks. If the employment activity was military duty, list separate employment activity periods to show each change of military duty station.\n\nDo not list employment before your 18th birthday unless to provide a minimum of 2 years employment history.'
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
          title: 'Acronyms:',
          message:
            'Acronyms: APO - Army Post Office, FPO - Fleet Post Office, DPO - Diplomatic Post Office.',
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
          title: 'Are/were you working from another location?',
          message:
            'Are/were you physically working from an different location than your employer\'s address? If so answer "Yes".',
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
        physicalAddress:
          "Is/was your physical work address different than your employer's address?",
        additionalActivity: 'Additional periods of activity with this employer'
      },
      para: {
        additionalActivity:
          'List all of your employment activities, including unemployment and self-employment, beginning with the present and working back 10 years. The entire period must be accounted for without breaks. If the employment activity was military duty, list separate employment activity periods to show each change of military duty station.\n\nDo not list employment before your 18th birthday unless to provide a minimum of 2 years employment history.'
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
          title: 'Acronyms:',
          message:
            'APO - Army Post Office, FPO - Fleet Post Office, DPO - Diplomatic Post Office.',
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
          title: 'Are/were you working from another location?',
          message:
            'Are/were you physically working from an different location than your employer\'s address? If so answer "Yes".',
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
        physicalAddress:
          "Is/was your physical work address different than your employer's address?",
        additionalActivity: 'Additional periods of activity with this employer'
      },
      para: {
        additionalActivity:
          'List all of your employment activities, including unemployment and self-employment, beginning with the present and working back 10 years. The entire period must be accounted for without breaks. If the employment activity was military duty, list separate employment activity periods to show each change of military duty station.\n\nDo not list employment before your 18th birthday unless to provide a minimum of 2 years employment history.'
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
          title: 'Acronyms:',
          message:
            'APO - Army Post Office, FPO - Fleet Post Office, DPO - Diplomatic Post Office.',
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
          title: 'Are/were you working from another location?',
          message:
            'Are/were you physically working from an different location than your employer\'s address? If so answer "Yes".',
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
        physicalAddress:
          "Is/was your physical work address different than your employer's address?",
        additionalActivity: 'Additional periods of activity with this employer'
      },
      para: {
        additionalActivity:
          'List all of your employment activities, including unemployment and self-employment, beginning with the present and working back 10 years. The entire period must be accounted for without breaks. If the employment activity was military duty, list separate employment activity periods to show each change of military duty station.\n\nDo not list employment before your 18th birthday unless to provide a minimum of 2 years employment history.'
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
          title: 'Acronyms:',
          message:
            'APO - Army Post Office, FPO - Fleet Post Office, DPO - Diplomatic Post Office.',
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
          title: 'Are/were you working from another location?',
          message:
            'Are/were you physically working from an different location than your employer\'s address? If so answer "Yes".',
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
        employer: 'Provide the name of your employment',
        title: 'Provide the most recent position title',
        status: 'Select the employment status for this position',
        address: 'Provide the address of employment',
        telephone: 'Provide your employment telephone number',
        reference:
          'Provide the name of someone that can verify your self-employment',
        physicalAddress:
          'Is your physical work address different than your employment address?',
        militaryAddress: 'Does your self-employment verifier have an APO/FPO address?',
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
          title: 'Acronyms:',
          message:
            'APO - Army Post Office, FPO - Fleet Post Office, DPO - Diplomatic Post Office.',
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
          title: 'Are/were you working from another location?',
          message:
            'Are/were you physically working from an different location than your employer\'s address? If so answer "Yes".',
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
        additionalActivity:
          'List all of your employment activities, including unemployment and self-employment, beginning with the present and working back 10 years. The entire period must be accounted for without breaks. If the employment activity was military duty, list separate employment activity periods to show each change of military duty station.\n\nDo not list employment before your 18th birthday unless to provide a minimum of 2 years employment history.'
      }
    },
    unemployment: {
      heading: {
        militaryAddress: 'Does your unemployment verifier have an APO/FPO address?',
        reference:
          'Provide the name of someone who can verify your unemployment activities and means of support'
      }
    },
    other: {
      heading: {
        employer: 'Provide the name of your employer',
        title: 'Provide the most recent position title',
        status: 'Select the employment status for this position',
        address: 'Provide the address of employment',
        telephone: 'Provide your employment telephone number',
        reference:
          'Provide the name of someone who can verify your unemployment activities and means of support',
        physicalAddress:
          "Is/was your physical work address different than your employer's address?",
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
          title: 'Acronyms:',
          message:
            'APO - Army Post Office, FPO - Fleet Post Office, DPO - Diplomatic Post Office.',
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
          title: 'Are/were you working from another location?',
          message:
            'Are/were you physically working from an different location than your employer\'s address? If so answer "Yes".',
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
        additionalActivity:
          'List all of your employment activities, including unemployment and self-employment, beginning with the present and working back 10 years. The entire period must be accounted for without breaks. If the employment activity was military duty, list separate employment activity periods to show each change of military duty station.\n\nDo not list employment before your 18th birthday unless to provide a minimum of 2 years employment history.'
      }
    }
  },
  education: {
    title: 'List the places you went to school',
    info:
      'Do not list education before your 18th birthday, unless to provide a minimum of two years education history.',
    summary: {
      title: 'Where you went to school',
      schools: 'Schools attended',
      diplomas: 'Degrees/Diplomas earned',
      svgAlt: 'Years covered for schools attended'
    },
    collection: {
      caption: 'Where you went to school',
      school: {
        summary: {
          title: 'Summary of education',
          item: 'School',
          unknown: 'Provide your education details',
          incomplete: "This education's information is incomplete",
          item2: 'Diploma'
        },
        append: 'Add another school',
        appendTitle:
          'Do you have additional education (include education within the last 10 years, as well as degrees or diplomas more than 10 years ago)?'
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
      done: "Done! Now let's add more",
      exiting: 'Before you leave this section',
      degrees: 'Degrees/diplomas',
      degree: 'Did you receive a degree/diploma?',
      degreeTail: 'Do you have another degree/diploma from this school to add?',
      details: 'Enter your school information',
      dates: 'Provide dates of attendance',
      name: 'Provide the name of the school',
      address: 'Provide the street address of the school',
      comments:
        'If you need to provide additional comments about this information enter them below',
      type: 'Select the most appropriate code to describe your school',
      reference: 'Add a person that knows you',
      diploma: 'Provide type of degree(s)/diploma(s) received',
      date: 'Date awarded'
    },
    para: {
      exiting: '',
      reference:
        'For any school in the last 3 years, provide a person who knew you at the address, and who preferably still lives in that area. Do not list people who knew you well for education completely outside this 3-year period, and do not list your spouse, cohabitant or other relatives.'
    },
    label: {
      attendance: 'Have you attended any schools in the last 10 years?',
      degree10: 'Have you received a degree or diploma more than 10 years ago?',
      dates:
        'You are not required to list temporary locations of less than 90 days that did not serve as your permanent or mailing address.',
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
        associate: "Associate's",
        bachelor: "Bachelor's",
        master: "Master's",
        doctorate: 'Doctorate',
        professional: 'Professional Degree (eg. MD, DVM, JD)',
        other: 'Other',
        otherDiploma: 'Other degree/diploma'
      }
    },
    help: {
      attendance: {
        title: 'Including all schools you attended',
        message:
          'If within the last 10 years you have attended a high school, college, vocational, or correspondence course answer "Yes".',
        note: ''
      },
      degree10: {
        title: 'Any degree/diploma you have received in your life',
        message:
          'If you a degree or diploma from any point in your life answer "Yes".',
        note: ''
      },
      dates: {
        title: 'Estimate the date if unsure',
        message:
          'If you are not sure of the exact dates give us your best guess and check the "Estimated" checkbox.',
        note: ''
      },
      address: {
        title:
          'For correspondence/distance/extension/online schools, provide the address where the records are maintained',
        message:
          'For assistance determining the school address, refer to [https://ope.ed.gov/accreditation/search.aspx](https://ope.ed.gov/accreditation/search.aspx).',
        note:
          'Acronyms: APO - Army Post Office, FPO - Fleet Post Office, DPO - Diplomatic Post Office.'
      },
      type: {
        title: 'Need help with the school code?',
        message: 'Select the most appropriate code to describe your school',
        note: ''
      },
      comments: {
        title: 'Need help providing more information?',
        message:
          'If you need to provide any additional comments about this information enter them below',
        note: ''
      },
      degree: {
        title: 'Need help with a degree or diploma?',
        message:
          'If you have received one or more degrees or diplomas from this school please provide the required information',
        note: ''
      },
      diploma: {
        title: 'Select the most appropriate degree or diploma received',
        message: 'If your option isn\'t listed select "Other" then provide it.',
        note: ''
      },
      date: {
        title: 'Estimate the date if unsure',
        message:
          'If you are not sure of the exact date give us your best guess and check the "Estimated" checkbox.',
        note: ''
      }
    }
  },
  federal: {
    heading: {
      branch:
        'Do you have former federal civilian employment, excluding military service, NOT indicated previously, to report?',
      dates: 'Provide dates of federal civilian employment',
      name:
        'Provide the name of the federal agency for which you are/were employed',
      position: 'Provide your position title',
      address: 'Provide the location of the agency'
    },
    help: {
      branch: {
        title: 'List all federal service even if older than 10 years',
        message: 'Inclue all former federal service at any point in your life.',
        note: ''
      },
      dates: {
        title: 'Estimate the date if unsure',
        message:
          'If you are not sure of the exact dates give us your best guess and check the "Estimated" checkbox.',
        note: ''
      },
      name: {
        title: 'Need help with the agency name?',
        message: 'The name of the federal service',
        note: ''
      },
      position: {
        title: 'Need help with the position title?',
        message: 'The most recent position title during this employment.',
        note: ''
      },
      address: {
        title:
          'Try looking up the agency name, this could help you find the address',
        message:
          'Acronyms: APO - Army Post Office, FPO - Fleet Post Office, DPO - Diplomatic Post Office.',
        note: ''
      }
    },
    collection: {
      summary: {
        title: 'Summary of former federal service',
        item: 'Federal service',
        present: 'Now',
        nodates: 'NA',
        unknown: 'Provide federal service below'
      },
      appendTitle:
        'Do you have additional former federal civilian employment, excluding military service, NOT indicated previously, to report?',
      append: 'Add another former federal service'
    }
  },
  85: {
    residence: {
      gap: {
        para: 'There is a gap in your residence history. The entire 5 year period must be covered with no gaps'
      }
    }
  }
}
