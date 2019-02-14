export const military = {
  intro: {
    title: 'Section 5: Military history',
    body:
      'You will be asked questions about your military history and be asked to provide details if necessary.'
  },
  tour: {
    para: 'Take a guided tour through the section'
  },
  review: {
    para: 'View all the sections associated with military history at once'
  },
  subsection: {
    intro: 'Introduction',
    selective: 'Selective service record',
    history: 'U.S. military',
    disciplinary: 'Disciplinary procedures',
    foreign: 'Foreign military',
    review: 'Review'
  },
  destination: {
    intro: 'Military intro',
    selective: 'Selective service record',
    history: 'U.S. military',
    disciplinary: 'Disciplinary procedures',
    foreign: 'Foreign military',
    review: 'Review military history'
  },
  selective: {
    heading: {
      born: 'Were you born a male after December 31, 1959?',
      registered:
        'Have you registered with the Selective Service System (SSS)?',
      number: 'Provide registration number'
    },
    para: {
      or: 'or'
    },
    label: {
      idk: "I don't know",
      number:
        'Note: Selective Service Number is not your Social Security Number',
      explanation: 'Provide an explanation'
    },
    help: {
      born: {
        title: 'Why are we asking?',
        message:
          'The selective service only applies to men born before after this date.',
        note: ''
      },
      registered: {
        title: 'Need help with whether you have registered?',
        message:
          'The Selective Service website (see link below) provides additional resources which may assist in finding your registration number or eligibility',
        note: ''
      },
      number: {
        title: 'Need help with your registration number?',
        message:
          'If additional assistance in determining your registration number is required please refer to the Selective Service information below',
        note: ''
      },
      explanation: {
        title: 'Need help with this explanation?',
        message:
          "To help the investigation let us know why you haven't registered.",
        note: ''
      },
      remember: {
        title: "Can't remember your registration number?",
        message:
          'The Selective Service website can help provide the registration number for persons who have registered. Use this link to look up your registration number then come back and enter it above.',
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
      servicestate: 'State of service',
      discharged:
        'Were you discharged from this instance of U.S. military service, to include Reserves, or National Guard?',
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
        title: 'Any U.S. Military branch',
        message:
          'If you have ever served in the Air Force, Air National Guard, Army, Army National Guard, Coast Guard, Marine Corps, or Navy answer "Yes".',
        note: ''
      },
      service: {
        title: 'Need help with the branch of service?',
        message:
          'Please provide the branch of service you belonged to during this period',
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
        title: 'Service number or SSN',
        message:
          'Depending on the time of your service you may have been assigned a service number. If not then use your social security number.',
        note: ''
      },
      dates: {
        title: 'Estimate the date if unsure',
        message:
          'If you are not sure of the exact dates give us your best guess and check the "Estimated" checkbox.',
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
          title: 'Estimate the date if unsure',
          message:
            'If you are not sure of the exact date give us your best guess and check the "Estimated" checkbox.',
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
      append: 'Add additional military history'
    }
  },
  disciplinary: {
    heading: {
      title: 'Disciplinary procedures',
      date:
        'Provide the date of the court martial or other disciplinary procedure',
      offenses:
        'Provide a description of the Uniform Code of Military Justice (UCMJ) offense(s) for which you were charged',
      name: 'Provide the name of the disciplinary procedure',
      court:
        'Provide the description of the military court or other authority in which you were charged',
      outcome:
        'Provide the description of the final outcome of the disciplinary procedure'
    },
    para: {
      info:
        "In the last 7 years, have you been subject to court martial or other disciplinary procedure under the Uniform Code of Military Justice (UCMJ), such as Article 15, Captain's mast, Article 135 Court of Inquiry, etc?"
    },
    label: {
      name:
        "Such as Court Martial, Article 15, Captain's mast, Article 135 Court of Inquiry, etc.",
      court:
        'Title of court or convening authority, address, to include city and state or country if overseas',
      outcome:
        'Such as found guilty, found not guilty, fine, reduction in rank, imprisonment, etc.'
    },
    help: {
      branch: {
        title: 'Need help determining disciplinary procedures?',
        message:
          'Have you been subject to court martial or other disciplinary procedure under the Uniform Code of Military Justice (UCMJ), such as Article 15, Captain&rsquo;s mast, Article 135 Court of Inquiry, etc?',
        note: ''
      },
      date: {
        title: 'Estimate the date if unsure',
        message:
          'If you are not sure of the exact date give us your best guess and check the "Estimated" checkbox.',
        note: ''
      },
      offenses: {
        title: 'Need help with this description?',
        message:
          'Provide a description of the Uniform Code of Military Justice (UCMJ) offense(s) for which you were charged',
        note: ''
      },
      name: {
        title: 'Need help with the procedure name?',
        message:
          'Such as Court Martial, Article 15, Captain&rsquo;s mast, Article 135 Court of Inquiry, etc.',
        note: ''
      },
      court: {
        title: 'Need help with the court information?',
        message:
          'Title of court or convening authority, address, to include city and state or country if overseas',
        note: ''
      },
      outcome: {
        title: 'Need help with the outcome?',
        message:
          'Such as found guilty, found not guilty, fine, reduction in rank, imprisonment, etc.',
        note: ''
      }
    },
    collection: {
      summary: {
        title: 'Summary of disciplinary procedures',
        item: 'Procedure',
        unknown: 'Provide the disciplinary procedure below'
      },
      appendTitle:
        'In the last 7 years do you have additional military disciplinary procedures to report?',
      appendMessage:
        'In the last 7 years do you have additional military disciplinary procedures to report?',
      append: 'Add additional disciplinary procedures'
    }
  },
  foreign: {
    heading: {
      title: 'Foreign military',
      organization:
        'During your foreign service, which organization were you serving under?',
      name: 'Provide the name of the foreign organization',
      dates: 'Provide your period of service',
      country: 'Provide the name of the country',
      rank: 'Provide your highest position/rank held',
      division: 'Provide the division/department/office in which you served',
      circumstances:
        'Provide a description of the circumstances of your association with this organization',
      left: 'Provide a description of the reason for leaving this service',
      maintainscontact:
        'Do you maintain contact with current or former associates, colleagues, or acquaintances from your service in this organization?',
      contact: {
        details: 'Acquaintance contact details',
        name: "Provide the contact's full name",
        address: "Provide the contact's address",
        title: "Provide the contact's official title",
        dates: 'Provide the length of your association with the contact',
        frequency: 'Provide the frequency of contact'
      }
    },
    para: {
      served:
        "Have you ever served, as a civilian or military member in a foreign country's military, intelligence, diplomatic, security forces, militia, other defense force, or government agency?",
      contact:
        'Please provide full name, address (if known), official title, length of association, and frequency of contact for each former associate, colleague or acquaintance with whom you maintain contact.'
    },
    label: {
      organization: {
        military: 'Military (Army, Navy, Air Force, Marines, etc.)',
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
        message:
          'If you have served in a foreign military or service it will help in processing your application',
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
        title: 'Estimate the date if unsure',
        message:
          'If you are not sure of the exact dates give us your best guess and check the "Estimated" checkbox.',
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
        message:
          'Additional information regarding the circumstances of this foreign service',
        note: ''
      },
      left: {
        title: 'Need help with the reason for leaving?',
        message: 'Please provide any reasons for leaving this service',
        note: ''
      },
      maintainscontact: {
        title: 'Still in contact?',
        message:
          'If you are still in contact with any current or former foreign associates answer "Yes" and provide their contact information below.',
        note: ''
      },
      contact: {
        dates: {
          title:
            'Tell us the full time range you were in contact with this person',
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
        frequency: {
          title: 'How often?',
          message: 'Tell us how often you were in contact with this person.',
          note: ''
        }
      }
    },
    collection: {
      foreign: {
        appendTitle:
          'Do you have an additional foreign military service to report?',
        append: 'Add another foreign military service'
      },
      contacts: {
        summary: {
          title: 'Summary of foreign military contacts',
          item: 'Name',
          unknown: 'Provide foreign military contact below'
        },
        appendTitle:
          'Do you have an additional foreign military service contact to report?',
        append: 'Add another contact'
      }
    }
  }
}
