export const financial = {
  intro: {
    title: 'Section 7: Financial record',
    body: 'You will be asked questions about your financial history and be asked to provide details if necessary.'
  },
  tour: {
    para: 'Take a guided tour through the section'
  },
  review: {
    para: 'View all the sections associated with identification at once',
    comments: 'Add a comment to clarify any of your responses in the financial record section'
  },
  destination: {
    intro: 'Financial intro',
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
    title: 'Have you ever experienced financial problems due to gambling?',
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
        title: 'Full explanation of this financial problem',
        message: 'Go into as much detail as you need to fully explain.',
        note: ''
      },
      actions: {
        title: 'Have you started trying to fix this problem?',
        message: 'Explain what you have done to fix this problem. If you haven\'t started yet tell us why.',
        note: ''
      },
      comments: {
        title: 'Need help providing additional information?',
        message: 'If you need to provide any additional comments about this information enter them below',
        note: ''
      }
    },
    placeholder: {
      losses: '0'
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
      title: 'Chapter 7, Chapter 11, Chapter 12, or Chapter 13',
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
          'If you don\'t have paperwork you may be able to find your details here: [www.pacer.gov](https://www.pacer.gov/)',
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
      placeholder: '0',
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
        title: 'Try looking up the facility name, this could help you find the address',
        message: 'If you can only find a phone number try calling and asking for the address.',
        note: 'Acronyms: APO - Army Post Office, FPO - Fleet Post Office, DPO - Diplomatic Post Office.'
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
      year: '0000',
      amount: '0'
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
        title: 'Have you started trying to fix this problem?',
        message: 'Explain what you have done to fix this problem. If you haven\'t started yet tell us why.',
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
      amount: '0'
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
        title: 'Try looking up the agency or company name, this could help you find the address',
        message: 'If you can only find a phone number try calling and asking for the address.',
        note: 'Acronyms: APO - Army Post Office, FPO - Fleet Post Office, DPO - Diplomatic Post Office.'
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
        message: 'Tell us if you have started trying to fix this issue. If you haven\'t started yet tell us why.',
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
        title: 'Full explanation of this credit counseling',
        message: 'Go into as much detail as you need to fully explain.',
        note: ''
      },
      name: {
        title: 'Need help with the counseling organization name?',
        message: 'Provide the name of the counseling organization',
        note: ''
      },
      telephone: {
        title: 'Look up the organization',
        message: 'Try looking up the organization\'s name, this could help you find their number.',
        note: ''
      },
      address: {
        title: 'Look up the organization',
        message: 'Try looking up the organization\'s name, this could help you find the address.',
        note: 'Note: If you can only find a phone number try calling and asking for the address.'
      },
      description: {
        title: 'Have you started trying to fix this problem?',
        message: 'Explain what you have done to fix this problem. If you haven\'t started yet tell us why.',
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
      amount: '0'
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
        title: 'Full explanation of this issue',
        message: 'Go into as much detail as you need to fully explain.',
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
        title: 'Try looking up the court name, this could help you find the address',
        message: 'If you can only find a phone number try calling and asking for the address.',
        note: 'Acronyms: APO - Army Post Office, FPO - Fleet Post Office, DPO - Diplomatic Post Office.'
      },
      description: {
        title: 'Have you started trying to fix this problem?',
        message: 'Explain what you have done to fix this problem. If you haven\'t started yet tell us why.',
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
      amount: '0'
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
        title: 'Full explanation of this issue',
        message: 'Go into as much detail as you need to fully explain.',
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
        title: 'Have you started trying to fix this problem?',
        message: 'Explain what you have done to fix this problem. If you haven\'t started yet tell us why.',
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
}
