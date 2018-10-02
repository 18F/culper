export const foreign = {
  intro: {
    title: 'Section 6: Foreign associations',
    body:
      'You will be asked questions about your current and previous foreign associations and be asked to provide details if necessary.'
  },
  tour: {
    para: 'Take a guided tour through the section'
  },
  review: {
    para: 'View all the sections associated with foreign associations at once',
    comments:
      'Add a comment to clarify any of your responses in the foreign associations section'
  },
  destination: {
    intro: 'Foreign intro',
    review: 'Review Foreign Associations',
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
      text:
        'Provide the following information for the most recent U.S. passport you currently possess.',
      link: 'U.S. State Department passport help'
    },
    question: {
      title: 'Do you possess a U.S. passport (current or expired)?',
      yes: 'Yes',
      no: 'No'
    },
    label: {
      bookNumber: 'Passport number',
      book: 'Passport'
    },
    name: 'Provide the name in which passport was first issued',
    number: 'Provide your U.S. passport number',
    issued: 'Provide the issue date of the passport',
    expiration: 'Provide the expiration date of the passport',
    comment: {
      title: 'Add optional comment',
      label:
        'If you need to provide any additional comments about this information enter them below'
    },
    help: {
      number: {
        title: 'Passport',
        message:
          'U.S. Passport numbers must be nine alphanumeric characters (letters and numbers).',
        note: ''
      },
      issued: {
        title: 'Use the exact date',
        message: 'Enter the date on your passport.',
        note: ''
      },
      expiration: {
        title: 'Use the exact date',
        message: 'Enter the date on your passport.',
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
        title:
          'Have you, your spouse or legally recognized civil union/domestic partner, cohabitant, or dependent children EVER had any foreign financial interests in which you or they have direct control or direct ownership?'
      },
      para: {
        intro: [
          'Foreign financial interest examples:  stocks, property, investments, bank accounts, ownership of corporate entities, corporate interests or exchange traded funds (ETFs) held in specific geographical or economic sectors.',
          '**Exclude financial interests in companies or diversified mutual funds or diversified ETFs that are publicly traded on a U.S. exchange.**'
        ],
        howAcquired: 'Such as purchase, gift, etc.'
      },
      collection: {
        summary: 'Provide your direct financial interests here',
        description: 'Summary of financial interests',
        appendTitle:
          'Do you, your spouse or legally recognized civil union/domestic partner, cohabitant, or dependent children have any additional foreign financial interests?',
        appendLabel: 'Add another direct interest',
        itemType: 'Interest'
      },
      help: {
        directControl: {
          title: '"Direct control" defined:',
          message:
            'Direct control means there are *no* intermediary or intervening factors between the foreign financial interest and the owner/controller.',
          note:
            'Example: You own a bakery in a foreign country and you directly control all aspects of the business such as pricing, baking, etc.'
        }
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
          value:
            'Provide the current value (in U.S. dollars) or the value at the time control or ownership was sold, lost or otherwise disposed of',
          relinquished:
            'Provide the date control or ownership was relinquished',
          explanation:
            'Provide explanation of how interest control or ownership was sold, lost or otherwise disposed of'
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
            message:
              'Select all people involved with this specific foreign financial interests.',
            note: ''
          },
          acquired: {
            title: 'Estimate the date if unsure',
            message:
              'If you are not sure of the exact date give us your best guess and check the "Estimated" checkbox.',
            note: ''
          },
          howAcquired: {
            title: 'Need help with how the interest was acquired?',
            message: 'Provide how the financial interest was acquired',
            note: ''
          },
          cost: {
            title: 'Need help with the cost?',
            message:
              'If you are not sure of the exact amount give us your best guess.',
            note: ''
          },
          value: {
            title: 'Need help with the value?',
            message:
              'If you are not sure of the exact amount give us your best guess.',
            note: ''
          },
          relinquished: {
            title:
              'When you were no longer in control or an owner of this foreign financial interest',
            message:
              'If you are not sure of the exact date give us your best guess and check the "Estimated" checkbox.',
            note: ''
          },
          explanation: {
            title: 'Need help with this explanation?',
            message:
              'Tell us how you got rid of your ownership or control of this financial interest.',
            note: ''
          }
        },
        coOwner: {
          heading: {
            name: 'Provide full name of co-owner',
            address: "Provide co-owner's current address",
            countries: 'Provide co-owner’s country(ies) of citizenship',
            relationshipNature:
              'Provide the nature of your relationship with the co-owner'
          },
          label: {
            address: 'This address is'
          },
          help: {
            countries: {
              title: "Need help with co-owner's country(ies) of citizenship?",
              message: 'Tell us all of the citizenships this person has.',
              note:
                'Note: You can provide multiple citizenships in this question.'
            },
            relationshipNature: {
              title: 'Need help with the nature of the relationship?',
              message:
                'Provide the nature of your relationship with the co-owner',
              note: ''
            }
          }
        },
        coOwners: {
          heading: {
            hasCoOwners:
              'Are there any co-owners of this foreign financial interest?',
            hasCoOwnersAppend:
              'Are there any additional co-owners of this foreign financial interest?'
          }
        }
      }
    },
    indirect: {
      heading: {
        title:
          'Have you, your spouse or legally recognized civil union/domestic partner, cohabitant, or dependent children EVER had any foreign financial interests that someone controlled on your behalf?'
      },
      collection: {
        summary: 'Provide your indirect financial interests here',
        description: 'Summary of financial interests',
        appendTitle:
          'Do you, your spouse or legally recognized civil union/domestic partner, cohabitant, or dependent children have any additional foreign financial interests controlled on your behalf?',
        appendLabel: 'Add another indirect interest',
        itemType: 'Interest'
      },
      help: {
        indirectControl: {
          title: '"Indirect control" defined:',
          message:
            'Indirect control means there *are* intermediary or intervening factors between the foreign financial interest and the owner/controller.',
          note:
            'Example: You own a bakery in a foreign country and have an employee directly control aspects of the business such as pricing, baking, etc.'
        }
      },
      interest: {
        para: {
          checkAll: 'Check all that apply',
          howAcquired: 'Such as purchase, gift, etc.'
        },
        heading: {
          interestTypes: 'Specify',
          interestType: 'Provide the type of financial interest',
          name:
            'Provide the name of the individual who controls this financial interest on your behalf',
          relationship: 'Provide this individual’s relationship to you',
          acquired: 'Provide the date the financial interest was acquired',
          howAcquired: 'Provide details regarding how it was acquired',
          cost: 'Provide the cost (in U.S. dollars) at time of acquisition',
          value:
            'Provide the current value (in U.S. dollars) or the value at the time control or ownership was sold, lost or otherwise disposed of',
          sold:
            'Provide the date interest was sold, lost, or otherwise disposed of',
          explanation:
            'Provide explanation if interest was sold, lost, or otherwise disposed of'
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
            message:
              'Select all people involved with this specific foreign financial interest.',
            note: ''
          },
          interestType: {
            title: 'Need help with the indirect interest type?',
            message: 'Provide the type of financial interest',
            note: ''
          },
          name: {
            title: 'Need help with the name of the person?',
            message:
              'Provide the name of the individual who controls this financial interest on your behalf',
            note: ''
          },
          acquired: {
            title: 'Estimate the date if unsure',
            message:
              'If you are not sure of the exact date give us your best guess and check the "Estimated" checkbox.',
            note: ''
          },
          howAcquired: {
            title: 'Need help with how the interest was acquired?',
            message: 'Provide how the financial interest was acquired',
            note: ''
          },
          cost: {
            title: 'Need help with the cost?',
            message:
              'If you are not sure of the exact amount give us your best guess and check the "Estimated" checkbox.',
            note: ''
          },
          value: {
            title: 'Need help with the value?',
            message:
              'If you are not sure of the exact amount give us your best guess and check the "Estimated" checkbox.',
            note: ''
          },
          sold: {
            title: 'When you got rid of of this foreign financial interest',
            message:
              'If you are not sure of the exact date give us your best guess and check the "Estimated" checkbox.',
            note: ''
          },
          explanation: {
            title: 'Need help with this explanation?',
            message:
              'Tell us how you got rid of of this foreign financial interest.',
            note: ''
          },
          relationship: {
            title: 'How do you know this person',
            message:
              'Let us know how you know this person and give us details of your relationship with them.',
            note: ''
          }
        },
        coOwner: {
          heading: {
            name: 'Provide full name of co-owner',
            address: 'Provide co-owner current address',
            countries: 'Provide co-owner’s country(ies) of citizenship',
            relationshipNature:
              'Provide the nature of your relationship with the co-owner'
          },
          label: {
            address: 'This address is'
          },
          help: {
            countries: {
              title: "Need help with co-owner's country(ies) of citizenship?",
              message: 'Tell us all of the citizenships this person has.',
              note:
                'Note: You can provide multiple citizenships in this question.'
            },
            relationshipNature: {
              title: 'Need help with the nature of this relationship?',
              message:
                'Let us know how you know this person and give us details of your relationship with them.',
              note: ''
            }
          }
        },
        coOwners: {
          heading: {
            hasCoOwners:
              'Are there any co-owners of the foreign financial interest controlled on your behalf?',
            hasCoOwnersAppend:
              'Are there any additional co-owners for this foreign financial interest controlled on your behalf to report?'
          }
        }
      }
    },
    realestate: {
      heading: {
        title:
          'Have you, your spouse or legally recognized civil union/domestic partner, cohabitant, or dependent children EVER owned, or do you anticipate owning, or plan to purchase real estate in a foreign country?'
      },
      collection: {
        summary: 'Provide your real estate purchase here',
        description: 'Summary of financial purchase',
        appendTitle:
          'Do you have an additional instance of you, your spouse or legally recognized civil union/domestic partner, cohabitant, or dependent children EVER having owned, or anticipate owning, or planning to purchase real estate in a foreign country?',
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
          howAcquired:
            'Provide how the foreign real estate was or is to be acquired',
          cost:
            'Provide the cost (in U.S. dollars) when sold or expected at time of acquisition',
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
            message:
              'Select all people involved with this specific foreign financial interest.',
            note: ''
          },
          realEstateType: {
            title: 'Need help with the real estate interest type?',
            message: 'Provide the type of real estate interest',
            note: ''
          },
          acquired: {
            title: 'Estimate the date if unsure',
            message:
              'If you are not sure of the exact date give us your best guess and check the "Estimated" checkbox.',
            note: ''
          },
          howAcquired: {
            title: 'Need help with how the interest was acquired?',
            message: 'Provide how the financial interest was acquired',
            note: ''
          },
          cost: {
            title: 'Estimate the cost if unsure',
            message:
              'If you are not sure of the exact amount give us your best guess and check the "Estimated" checkbox.',
            note: ''
          },
          sold: {
            title: 'If the real estate in question was sold tell us when',
            message:
              'If you are not sure of the exact date give us your best guess and check the "Estimated" checkbox.',
            note: ''
          }
        },
        coOwner: {
          heading: {
            name: 'Provide full name of co-owner',
            address: 'Provide co-owner current address',
            countries: 'Provide co-owner’s country(ies) of citizenship',
            relationshipNature:
              'Provide the nature of your relationship with the co-owner'
          },
          label: {
            address: 'This address is'
          },
          help: {
            countries: {
              title: 'List all citizenships this person has',
              message:
                'You can provide multiple citizenships in this question.',
              note: ''
            },
            relationshipNature: {
              title: 'Need help with the nature of this relationship?',
              message:
                'Let us know how you know this person and give us details of your relationship with them.',
              note: ''
            }
          }
        },
        coOwners: {
          heading: {
            hasCoOwners:
              'Are/were/will there any co-owners of this foreign real estate?',
            hasCoOwnersAppend:
              'Are there any additional co-owners for this foreign real estate?'
          }
        }
      }
    },
    support: {
      heading: {
        title:
          'Have you EVER provided financial support for any foreign national?',
        name:
          'Provide the name of the foreign national you support or have supported financially',
        address: 'Provide the address of the foreign national listed above',
        relationship:
          'Provide the nature of your relationship with the foreign national listed above',
        amount:
          'Provide the amount (in U.S. dollars) of all financial support provided',
        frequency: 'Provide the frequency of your support',
        citizenship:
          "Provide this foreign national's country(ies) of citizenship"
      },
      label: {
        estimated: 'Estimated'
      },
      help: {
        branch: {
          title:
            'Need help determining if you have provided financial support to a foreign national?',
          message:
            'If you have provided any financial support to a foreign national then select "yes".',
          note: ''
        },
        address: {
          title: "Need help with the foreign national's address?",
          message: 'Provide the current address of the foreign national',
          note: ''
        },
        relationship: {
          title: 'Need help with the relation to the foreign national?',
          message: 'Provide the relationship to the foreign national',
          note: ''
        },
        amount: {
          title: 'Estimate the ammount if unsure',
          message:
            'If you are not sure of the exact amount give us your best guess and check the "Estimated" checkbox.',
          note: ''
        },
        frequency: {
          title: 'Need help with the frequency?',
          message: 'Provide the frequency of support',
          note: 'Note: Monthly, yearly, once, etc.'
        },
        citizenship: {
          title: 'List all citizenships this person has',
          message: 'You can provide multiple citizenships in this question.',
          note: ''
        }
      },
      collection: {
        summary: {
          title: 'Summary of foreign financial support',
          item: 'Support',
          unknown: 'Provide details of foreign financial support below'
        },
        appendTitle:
          'Have you additionally provided financial support for any foreign national?',
        append: 'Add another instance'
      }
    },
    benefit: {
      heading: {
        title:
          'As a U.S. citizen, have you, your spouse or legally recognized civil union/domestic partner, cohabitant, or dependent children received in the last seven (7) years, or are eligible to receive in the future, any educational, medical, retirement, social welfare, or other such benefit from a foreign country?',
        interestTypes: 'Specify',
        benefitType: 'Provide the type of benefit',
        benefitFrequency: 'Provide the frequency of the benefit',
        received: 'Provide the date the benefit was received',
        country: 'Provide the name of the country providing the benefit',
        value:
          'Provide the total value (in U.S. dollars) of the benefit received.'
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
          retirement: 'Retirement',
          socialWelfare: 'Social Welfare',
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
        summary: 'Provide your financial benefits here',
        description: 'Summary of financial benefits',
        appendTitle:
          'Do you, your spouse or legally recognized civil union/domestic partner, cohabitant, or dependent children receive any additional benefits from a foreign country?',
        appendLabel: 'Add another benefit',
        itemType: 'Benefit'
      },
      help: {
        benefit: {
          title:
            'Need help with determining if you have received foreign benefits?',
          message:
            'As a U.S. citizen, have you, your spouse or legally recognized civil union/domestic partner, cohabitant, or dependent children received in the last seven (7) years, or are eligible to receive in the future, any educational, medical, retirement, social welfare, or other such benefit from a foreign country?',
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
          value:
            'Provide the total value (in U.S. dollars) of the benefit received.',
          reason: 'Provide the reason this benefit was received',
          obligated:
            'As a result of this benefit are you, your spouse or legally recognized civil union/domestic partner, your cohabitant, or dependent children obligated in any way to this foreign country?'
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
            title: 'Estimate the date if unsure',
            message:
              'If you are not sure of the exact date give us your best guess and check the "Estimated" checkbox.',
            note: ''
          },
          country: {
            title: 'Need help with the country?',
            message: 'Provide the name of the country providing the benefit',
            note: ''
          },
          value: {
            title: 'Need help with the value?',
            message:
              'Provide the total value (in U.S. dollars) of the benefit received',
            note: ''
          },
          reason: {
            title: 'Need help with the reason?',
            message: 'Provide the reason this benefit was received',
            note: ''
          },
          obligated: {
            title: 'Need help with knowing if you are obligated?',
            message:
              'As a result of this benefit are you, your spouse or legally recognized civil union/domestic partner, your cohabitant, or dependent children obligated in any way to this foreign country',
            note: ''
          }
        }
      },
      future: {
        heading: {
          begin: 'Provide the date the benefit will begin',
          frequency: 'Provide the frequency the benefit will be received',
          country: 'Provide the name of the country providing the benefit',
          value:
            'Provide the total value (in U.S. dollars) of the benefit to be received.',
          reason: 'Provide the reason this benefit will be received',
          obligated:
            'As a result of this benefit are you, your spouse or legally recognized civil union/domestic partner, your cohabitant, or dependent children obligated in any way to this foreign country?'
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
            title: 'Estimate the date if unsure',
            message:
              'If you are not sure of the exact date give us your best guess and check the "Estimated" checkbox.',
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
            message:
              'Provide the total value (in U.S. dollars) of the benefit to be received',
            note: ''
          },
          reason: {
            title: 'Need help with the reason?',
            message: 'Provide the reason this benefit will be received',
            note: ''
          },
          obligated: {
            title: 'Need help with knowing if you are obligated?',
            message:
              'As a result of this benefit are you, your spouse or legally recognized civil union/domestic partner, your cohabitant, or dependent children obligated in any way to this foreign country',
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
          value:
            'Provide the total value (in U.S. dollars) of the benefit to be received',
          reason: 'Provide the reason this benefit will be received',
          obligated:
            'As a result of this benefit are you, your spouse or legally recognized civil union/domestic partner, your cohabitant, or dependent children obligated in any way to this foreign country?'
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
            title: 'Estimate the date if unsure',
            message:
              'If you are not sure of the exact date give us your best guess and check the "Estimated" checkbox.',
            note: ''
          },
          end: {
            title: 'Estimate the date if unsure',
            message:
              'If you are not sure of the exact date give us your best guess and check the "Estimated" checkbox.',
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
            message:
              'Provide the total value (in U.S. dollars) of the benefit to be received',
            note: ''
          },
          reason: {
            title: 'Need help with the reason?',
            message: 'Provide the reason this benefit will be received',
            note: ''
          },
          obligated: {
            title: 'Need help with knowing if you are obligated?',
            message:
              'As a result of this benefit are you, your spouse or legally recognized civil union/domestic partner, your cohabitant, or dependent children obligated in any way to this foreign country',
            note: ''
          }
        }
      }
    }
  },
  contacts: {
    heading: {
      title:
        'Do you have, or have you had, close and/or continuing contact with a foreign national within the last seven (7) years with whom you, or your spouse, or legally recognized civil union/domestic partner, or cohabitant are bound by affection, influence, common interests, and/or obligation?',
      name: 'Provide the full name of the foreign national, if known',
      firstcontact: 'Provide the approximate date of first contact',
      lastcontact: 'Provide the approximate date of last contact',
      methods: 'Provide methods of contact',
      frequency: 'Provide approximate frequency of contact',
      relationship: 'Provide the nature of relationship',
      aliases:
        'Has this foreign national used any other names and/or nicknames?',
      aliases2:
        'Any additional other names and/or nicknames for this foreign national?',
      aliasname: 'Provide the other name or nickname',
      citizenship:
        "Provide this foreign national's country(ies) of citizenship",
      birthdate: "Provide this foreign national's date of birth",
      birthplace: "Provide this foreign national's place of birth",
      address: "Provide this foreign national's current address",
      employer:
        "Provide the name of the foreign national's current employer, or provide the name of their most recent employer if not currently employed",
      employeraddress:
        "Provide the address of the foreign national's current employer, or provide the address of their most recent employer if not currently employed",
      hasaffiliations:
        'Is this foreign national affiliated with a foreign government, military, security, defense industry, or intelligence service?',
      affiliations:
        "Describe the contact's relationship with the foreign government, military, security, defense industry, or intelligence service",
      explanation: 'Explanation'
    },
    para: {
      includes:
        'Include associates as well as relatives, not previously listed in the relatives section.',
      definition:
        'A foreign national is defined as any person who is not a citizen or national of the U.S.',
      or: 'or',
      checkall: 'Check all that apply'
    },
    label: {
      idk: "I don't know",
      yes: 'Yes',
      no: 'No',
      inperson: 'In person',
      telephone: 'Telephone',
      electronic: ['Electronic', '(such as email, texting, chat rooms, etc)'],
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
      obligation: ['Obligation', '(provide explanation)'],
      other: ['Other', '(provide explanation)']
    },
    help: {
      branch: {
        title: 'Need help determining if you know any foreign nationals?',
        message:
          'If you know anyone who is not a U.S. citizen or national then please click "yes"',
        note:
          'Note: A foreign national is defined as any person who is not a citizen or national of the U.S.'
      },
      firstcontact: {
        title: 'Let us know when you first met this person',
        message:
          'If you are not sure of the exact date give us your best guess and check the "Estimated" checkbox.',
        note: ''
      },
      lastcontact: {
        title: 'Tell us when you last had contact with this person',
        message:
          'Note: If you are not sure of the exact date give us your best guess and check the "Estimated" checkbox',
        note: ''
      },
      methods: {
        title: 'All of the ways you communicated with this person',
        message: 'Electronic includes social media.',
        note: ''
      },
      frequency: {
        title: 'Need help with the frequency of your communication?',
        message: 'Select the appropriate frequency of your correspondence',
        note: ''
      },
      relationship: {
        title: 'Need help with your relationship with this foreign national?',
        message:
          'Check all the which apply to your relationship with the individual',
        note: ''
      },
      aliases: {
        title:
          'If this person has a nickname, a different maiden name, or used any other names answer "Yes"',
        message:
          'If this person used multiple other names you will list each one separately.',
        note: ''
      },
      citizenship: {
        title: 'List all citizenships this person has',
        message: 'You can provide multiple citizenships in this question.',
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
        title: 'Provide the address of their most recent employer',
        message:
          'Note: If you do not know then you may select "I don\'t know".',
        note: ''
      },
      hasaffiliations: {
        title: 'Does this person have any affiliations?',
        message:
          'If the person has a relationship with a foreign government, military, security, defense industry, or intelligence service then select "yes"',
        note: ''
      },
      affiliations: {
        title: 'Need help describing their affiliations?',
        message:
          'Describe the individuals relationship(s) with the foreign affiliations',
        note: ''
      }
    },
    collection: {
      summary: {
        title: 'Summary of foreign contacts',
        item: 'Foreign national',
        unknown: 'Provide the foreign national below'
      },
      appendTitle:
        'Do you have, or have you had, close and/or continuing contact with any additional foreign national within the last seven (7) years with whom you, or your spouse, or cohabitant are bound by affection, influence, common interests, and/or obligation?',
      appendMessage: [
        'Include associates as well as relatives, not previously listed in the relatives section.'
      ],
      append: 'Add another association'
    }
  },
  business: {
    advice: {
      heading: {
        title:
          'Have you in the last seven (7) years provided advice or support to any individual associated with a foreign business or other foreign organization that you have not previously listed as a former employer?',
        description: 'Provide a description of advice/support provided',
        name:
          'Provide the name of the individual to whom advice or support was provided',
        organization:
          'Provide the name of the foreign organization or foreign business with whom the individual is associated',
        country:
          'Provide the country of origin for the organization or business',
        dates:
          'Provide the date(s) during which this advice or support was provided',
        compensation:
          'Describe what compensation, if any, was provided for your service'
      },
      para: {
        branch:
          'Answer "No" if **all** your advice or support was authorized pursuant to official U.S. Government business.'
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
          title: 'Estimate the date if unsure',
          message:
            'If you are not sure of the exact dates give us your best guess and check the "Estimated" checkbox.',
          note: ''
        },
        compensation: {
          title: 'Need help with compensation?',
          message:
            'Any monetary, favor, trade, or other type of exchange for services render constitutes as compensation',
          note: ''
        }
      },
      collection: {
        summary: {
          title: 'Summary of foreign business advice',
          item: 'Advice',
          unknown: 'Provide details of foreign business advice below'
        },
        appendTitle:
          'Have you in the last seven (7) years provided advice or support to any other individual associated with a foreign business or other foreign organization that you have not previously listed as a former employer?',
        appendMessage: [
          'Answer **"No"** if all your advice or support was authorized pursuant to official U.S. Government business.'
        ],
        append: 'Add another instance of advice/support'
      }
    },
    family: {
      heading: {
        title:
          'Have you, your spouse or legally recognized civil union/domestic partner, cohabitant, or any member of your immediate family in the last seven (7) years been asked to provide advice or serve as a consultant, even informally, by any foreign government official or agency?',
        name: 'Provide the name of the government official',
        agency: 'Provide the name of the agency',
        country:
          'Provide the country with which the government official or agency is affiliated',
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
          title:
            'Need help determining if you have provided advice to foreign businesses?',
          message:
            'If you have provided any advice to a foreign individual or business then select "yes"',
          note:
            'Note: Answer "no" if **all** your advice or support was authorized pursuant to official U.S. Government business.'
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
          title: 'Estimate the date if unsure',
          message:
            'If you are not sure of the exact date give us your best guess and check the "Estimated" checkbox.',
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
        appendTitle:
          'Have you, your spouse or legally recognized civil union/domestic partner, cohabitant, or any member of your immediate family in the last seven (7) years been asked to provide advice or serve as a consultant, even informally, by any other foreign government official or agency?',
        appendMessage: [
          'Answer **"No"** if all the advice or support was authorized pursuant to official U.S. Government business.'
        ],
        append: 'Add another instance of advice/support'
      }
    },
    employment: {
      heading: {
        title:
          'Has any foreign national in the last seven (7) years offered you a job, asked you to work as a consultant, or consider employment with them?',
        name: 'Provide the name of the foreign national who made the offer',
        description: 'Provide a description of the position offered',
        date: 'Provide the date when this offer was extended',
        address: 'Provide the location where this occurred',
        accepted: 'Did you accept the offer?'
      },
      label: {
        explanation: 'Provide explanation',
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
          title: 'Estimate the date if unsure',
          message:
            'If you are not sure of the exact date give us your best guess and check the "Estimated" checkbox.',
          note: ''
        },
        address: {
          title: 'Need help with the location?',
          message:
            'Provide the address of the location where the offer took place',
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
          unknown: 'Provide details of foreign business job below'
        },
        appendTitle:
          'Has any additional foreign national, in the last seven (7) years, offered you a job, asked you to work a consultant, or consider employment with them?',
        append: 'Add another job offer'
      }
    },
    ventures: {
      heading: {
        title:
          'Have you in the last seven (7) years been involved in any other type of business venture with a foreign national not described above?',
        name: 'Provide the full name of this foreign national',
        address: 'Provide the full current address of this foreign national',
        citizenship: 'Provide the citizenship(s) of this foreign national',
        description: 'Provide a description of the business venture',
        relationship: 'Provide your relationship to this foreign national',
        dates:
          'Provide the length of time you have been involved in the business venture',
        association:
          'Provide the nature of the association with this business venture',
        position: 'Provide the position you held',
        service: 'Provide the service you provided',
        support: 'Provide the financial support involved',
        compensation:
          'Provide a description of what compensation was provided for your service'
      },
      para: {
        branch: [
          'Own, co-own, serve as a business consultant, provide financial support, etc.'
        ]
      },
      help: {
        branch: {
          title: 'Need help with the business venture?',
          message:
            'If you have, or are currently, associated with a foreign business venture select "yes"',
          note: ''
        },
        address: {
          title: "Need help with the foreign national's address?",
          message: 'Provide the current address of the foreign national',
          note: ''
        },
        citizenship: {
          title: 'List all citizenships this person has',
          message: 'You can provide multiple citizenships in this question.',
          note: ''
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
          title: 'Estimate the date if unsure',
          message:
            'If you are not sure of the exact date give us your best guess and check the "Estimated" checkbox.',
          note: ''
        },
        association: {
          title: 'Need help with the association to the venture?',
          message:
            'Provide a description of how you were associated to the business venture',
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
          message:
            'Any monetary, favor, trade, or other type of exchange for services render constitutes as compensation',
          note: ''
        }
      },
      collection: {
        summary: {
          title: 'Summary of foreign business ventures',
          item: 'Venture',
          unknown: 'Provide details of foreign business ventures below'
        },
        appendTitle:
          'Have you, in the last seven (7) years, been involved in any other type of business venture with a foreign national not described above?',
        appendMessage: [
          'Own, co-own, serve as a business consultant, provide financial support, etc.'
        ],
        append: 'Add another business venture'
      }
    },
    conferences: {
      heading: {
        title:
          'Have you in the last seven (7) years attended or participated in any conferences, trade shows, seminars, or meetings outside the U.S.?',
        description: 'Provide the name and description of the event',
        sponsor: 'Provide the name of sponsoring organization',
        city: 'Provide the city where the event was held',
        country: 'Provide the country where the event was held',
        dates: 'Provide the dates for the event',
        purpose: 'Provide the purpose of the event',
        contact:
          'Was there any subsequent contact with any foreign nationals as a result of the event?',
        contact2:
          'Do you have another subsequent contact to report for this event?',
        explanation: 'Provide explanation'
      },
      para: {
        branch: [
          'Do not include those you attended or participated in on official business for the U.S. government.'
        ]
      },
      help: {
        branch: {
          title:
            'Need help determining if you have been to a foreign conference?',
          message:
            'If you have to been to a conference not in the U.S. outside of official U.S. government business select "yes".',
          note: ''
        },
        description: {
          title: 'Need help with the description?',
          message:
            'Provide the name of the conference as well as a general description.',
          note: ''
        },
        sponsor: {
          title: 'Need help with the sponsoring organization?',
          message:
            'Provide the name(s) of the sponsoring organizations of the conference.',
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
          title: 'Try looking up the event, this could help you find the dates',
          message:
            'If you can\'t find the exact date give us your best guess and check the "Estimated" checkbox.',
          note: ''
        },
        purpose: {
          title: 'Need help with the purpose of the conference?',
          message: 'Describe the purpose of the event.',
          note: ''
        },
        contact: {
          title: 'Contact after the event',
          message:
            'Did you have contact with any foreign nationals after this event? If so answer "Yes".',
          note: ''
        },
        explanation: {
          title: 'Need help with this explanation?',
          message:
            'Tell us all the circumstances and/or outcome of the contact.',
          note: ''
        }
      },
      collection: {
        summary: {
          title: 'Summary of foreign business conferences',
          item: 'Event',
          unknown: 'Provide details of the event below'
        },
        appendTitle:
          'Have you in the last seven (7) years, attended or participated in any additional conferences, trade shows, seminars, or meetings outside the U.S.?',
        appendMessage: [
          'Do not include those you attended or participated in on official business for the U.S. government.'
        ],
        append: 'Add another event'
      }
    },
    contact: {
      heading: {
        title:
          'Have you or any member of your immediate family in the last seven (7) years had any contact with a foreign government, its establishment or its representatives, whether inside or outside the U.S.?',
        name: 'Provide the name of the individual involved in the contact',
        location: 'Provide the location of the contact',
        date: 'Provide the date of contact',
        governments: 'Provide the foreign government(s) involved',
        establishment:
          'Provide the type of establishment (such as embassy, consulate, agency, military service, intelligence or security service, etc.) involved',
        representatives:
          'Provide the names of foreign representatives involved in contact',
        purpose: 'Provide the purpose/circumstances of contact',
        hassubsequent:
          'Was there any subsequent contact initiated by you, your immediate family member, or a representative of the foreign organization?',
        hassubsequent2:
          'Do you have another subsequent contact to report for this event?',
        subsequent: 'Provide the purpose of the subsequent contact',
        recent: 'Provide the date of most recent contact',
        future: 'Provide plans for future contact'
      },
      para: {
        intro:
          'For Section 7, "Immediate Family" means your spouse, parents, step-parents, siblings, half and step-siblings, children, stepchildren, and cohabitant.',
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
          title:
            'Need help determining if you have any foreign government contact?',
          message:
            'If you have any foreign government contact then select "yes".',
          note: ''
        },
        location: {
          title: 'Need help with the location?',
          message: 'Provide the location of the contact.',
          note: ''
        },
        date: {
          title: 'Estimate the date if unsure',
          message:
            'If you are not sure of the exact date give us your best guess and check the "Estimated" checkbox.',
          note: ''
        },
        governments: {
          title: 'All governments involved in this contact',
          message: 'You can provide multiple governments in this question.',
          note: ''
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
          title: 'Any other contacts?',
          message:
            'If there were any other contacts with the foreign organization select "Yes".',
          note: ''
        },
        subsequent: {
          title: 'Need help with the purpose of the subsequent contact?',
          message: 'Provide the purpose of the subsequent contact.',
          note: ''
        },
        recent: {
          title: 'Estimate the date if unsure',
          message:
            'If you are not sure of the exact date give us your best guess and check the "Estimated" checkbox.',
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
          unknown: 'Provide details of contact below'
        },
        appendTitle:
          'Have you or any member of your immediate family in the last seven (7) years had any additional contact with a foreign government, its establishment or its representatives, whether inside or outside the U.S.?',
        appendMessage: [
          'Such as embassy, consulate, agency, military service, intelligence or security service, etc.',
          'Answer "No" if the contact was for routine visa applications and border crossings related to either official U.S. Government travel, foreign travel on a U.S. passport, or as a U.S. military service member in conjunction with a U.S. Government military duty.'
        ],
        append: 'Add another contact'
      }
    },
    sponsorship: {
      heading: {
        title:
          'Have you in the last seven (7) years sponsored any foreign national to come to the U.S. as a student, for work, or for permanent residence?',
        name: 'Provide the name of the sponsored foreign national',
        birthdate:
          'Provide the date of birth for the sponsored foreign national',
        birthplace:
          'Provide the place of birth for the sponsored foreign national',
        address:
          'Provide the current street address of the sponsored foreign national',
        citizenship:
          'Provide the country(ies) of citizenship for the sponsored foreign national',
        organization:
          'Provide the name of the organization through which sponsorship was arranged, if applicable',
        organizationaddress:
          'Provide the address of the organization through which the sponsorship was arranged, if applicable',
        dates:
          'Provide the dates of stay in the U.S. for the sponsored foreign national',
        residence:
          'Provide the address of the sponsored foreign national while residing in the U.S.',
        stay:
          'Provide the purpose of the stay in the U.S. for the sponsored foreign national',
        sponsorship:
          'Provide the purpose of your sponsorship for the sponsored foreign national'
      },
      label: {
        idk: "I don't know",
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
          title: 'Foreign national defined:',
          message:
            'A foreign national is defined as any person who is not a citizen or national of the U.S.',
          note: ''
        },
        birthdate: {
          title: 'Estimate the date if unsure',
          message:
            'If you are not sure of the exact date give us your best guess and check the "Estimated" checkbox.',
          note: ''
        },
        birthplace: {
          title: 'Need help with the place of birth?',
          message: 'Provide the foreign nationals place of birth.',
          note: ''
        },
        address: {
          title: 'Acronyms:',
          message:
            'APO - Army Post Office, FPO - Fleet Post Office, DPO - Diplomatic Post Office.',
          note: ''
        },
        citizenship: {
          title: 'List all citizenships this person has',
          message: 'You can provide multiple citizenships in this question.',
          note: ''
        },
        organization: {
          title: 'Need help with the organization?',
          message:
            'Provide the organization name through which the sponsorship was arranged.',
          note: ''
        },
        organizationaddress: {
          title:
            "Try looking up the organization's name, this could help you find the address",
          message:
            'If you can only find a phone number try calling and asking for the address.',
          note:
            'Acronyms: APO - Army Post Office, FPO - Fleet Post Office, DPO - Diplomatic Post Office.'
        },
        dates: {
          title:
            'Full date range the sponsored foreign national was in the U.S.',
          message:
            'If you are not sure of the exact dates give us your best guess and check the "Estimated" checkbox.',
          note: ''
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
          unknown: 'Provide details of sponsorship below'
        },
        appendTitle:
          'Have you in the last seven (7) years sponsored any additional foreign national to come to the U.S. as a student, for work, or for permanent residence?',
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
        eligibility:
          'Provide your current eligibility to hold political office in a foreign country'
      },
      label: {
        idk: "I don't know",
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
          title:
            'Need help determining if you have any foreign government sponsorship?',
          message:
            'If you have any foreign government sponsorship then select "yes".',
          note: ''
        },
        position: {
          title: 'Need help with the position?',
          message: 'Provide the position held.',
          note: ''
        },
        dates: {
          title: 'Full date range you held this political office',
          message:
            'If you are not sure of the exact dates give us your best guess and check the "Estimated" checkbox.',
          note: ''
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
          unknown: 'Provide details of political office below'
        },
        appendTitle:
          'Have you EVER held any additional political office in a foreign country?',
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
        eligibility:
          'Provide your current eligibility to vote in a foreign country'
      },
      help: {
        branch: {
          title:
            'Need help determining if you have any foreign government sponsorship?',
          message:
            'If you have any foreign government sponsorship then select "yes".',
          note: ''
        },
        date: {
          title: 'Estimate the date if unsure',
          message:
            'If you are not sure of the exact date give us your best guess and check the "Estimated" checkbox.',
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
          unknown: 'Provide details of election below'
        },
        appendTitle:
          'Do you have other instances of voting in the election of a foreign country to report?',
        appendMessage: [],
        append: 'Add another election'
      }
    }
  },
  travel: {
    heading: {
      outside:
        'Have you traveled outside the U.S. in the last past seven (7) years?',
      official:
        'Has your travel in the last (7) years been solely for U.S. Government business/military overseas assignment on official government orders?',
      country: 'Provide the country visited',
      dates: 'Provide the dates of your travel to this country',
      days: 'Provide the total number of days involved in the visit(s)',
      purpose: 'Provide the purpose of the travel to this country',
      questioned:
        'While traveling to, or in this country, were you questioned, searched, or otherwise detained (other than for normal customs requirements) by the local customs or security service officials when entering or leaving this country?',
      encounter:
        'While traveling to or in this country, were you involved in any encounter with the police?',
      contacted:
        'While traveling to or in this country, were you contacted by, or in contact with any person known or suspected of being involved or associated with foreign intelligence, terrorist, security, or military organizations?',
      counter:
        'While traveling to, or in this country, were you involved in any counterintelligence or security issues not reported?',
      interest:
        'While traveling to or in this country, were you contacted by, or in contact with anyone exhibiting excessive knowledge of or undue interest in you or your job?',
      sensitive:
        'While traveling to or in this country, were you contacted by, or in contact with anyone attempting to obtain classified information or unclassified, sensitive information?',
      threatened:
        'While traveling to, or in this country, were you threatened, coerced, or pressured in any way to cooperate with a foreign government official or foreign intelligence or security service?',
      explanation: 'Provide explanation'
    },
    para: {
      personal:
        'I.e., no personal trips in conjunction with the official U.S. Government business.',
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
        title: 'Please enter each trip over the past seven (7) years.',
        message:
          'List the places you’ve travel to over the past seven (7) years, starting with your most recent trip and working backwards.',
        note:
          'Be sure to include any personal trips made in conjunction with the official federal government travel. Do not list trips that ONLY involved travel on official federal government business on official government orders.'
      },
      country: {
        title: 'Need help with the country?',
        message: 'Provide the name of the country you visited.',
        note: ''
      },
      dates: {
        title: 'Estimate the date if unsure',
        message:
          'If you are not sure of the exact dates give us your best guess and check the "Estimated" checkbox.',
        note: ''
      },
      days: {
        title: 'How long your travel was',
        message:
          'Many short trips means a gap between trips that is less than 6 months. For a travel gap longer than 6 months add another travel item.',
        note: ''
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
        unknown: 'Provide details of your travel below'
      },
      appendTitle:
        'Do you have additional travel outside the U.S. in the last seven (7) years for other than solely U.S. Government business on official government orders?',
      appendMessage: [],
      append: 'Add another travel'
    }
  }
}
