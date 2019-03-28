/* eslint import/prefer-default-export: 0 */

export const legal = {
  intro: {
    title: 'Section 9: Investigative and criminal history',
    body:
      'You will be asked questions about your investigative and criminal background and be asked to provide details if necessary.',
  },
  tour: {
    para: 'Take a guided tour through the section',
  },
  review: {
    para:
      'View all the sections associated with investigative & criminal history at once',
  },
  section: {
    name: 'Investigative and criminal history',
  },
  subsection: {
    intro: 'Introduction',
    police: {
      label: 'Police record',
      intro: 'Introduction',
      offenses: 'Offenses',
      additionalOffenses: 'Additional offenses',
      domesticViolence: 'Domestic violence',
    },
    investigations: {
      label: 'Investigations and clearance record',
      history: 'Ever been investigated',
      revoked: 'Denied',
      debarred: 'Debarment',
    },
    court: 'Involvement in non-criminal court actions',
    technology: {
      label: 'Use of information technology systems',
      unauthorized: 'Unauthorized access',
      manipulating: 'Manipulating access',
      unlawful: 'Unlawful use',
    },
    associations: {
      label: 'Association record',
      terroristOrganization: 'Terrorist organization',
      engagedTerrorism: 'Engaged in terrorism',
      advocating: 'Advocating',
      overthrow: 'Membership - overthrow',
      violence: 'Membership - violence or force',
      activitiesOverthrow: 'Activities to overthrow',
      terrorismAssociation: 'Terrorism association',
    },
    review: 'Review',
  },
  destination: {
    intro: 'Investigative and criminal history intro',
    'police/intro': 'Police record',
    'police/offenses': 'Offenses',
    'police/additionalOffenses': 'Additional offenses',
    'police/domesticViolence': 'Domestic violence',
    court: 'Non-criminal court actions',
    'investigations/history': 'Ever been investigated',
    'investigations/revoked': 'Denied',
    'investigations/debarred': 'Debarment',
    'technology/unauthorized': 'Unauthorized access',
    'technology/manipulating': 'Manipulating access',
    'technology/unlawful': 'Unlawful use',
    'associations/terrorist-organization': 'Terrorist organization',
    'associations/engaged-in-terrorism': 'Engaged in terrorism',
    'associations/advocating': 'Advocating',
    'associations/membership-overthrow': 'Membership - overthrow',
    'associations/membership-violence-or-force': 'Membership - violence or force',
    'associations/activities-to-overthrow': 'Activities to overthrow',
    'associations/terrorism-association': 'Terrorism association',
    review: 'Review investigative & criminal history',
  },

  police: {
    heading: {
      title: 'Police record',
      questions: 'Have any of the following happened?',
      date: 'Provide the date of the offense',
      description:
        'Provide a description of the specific nature of the offense',
      involvement: 'Did this offense involve any of the following?',
      address: 'Provide the location where the offense occurred',
      cited:
        'Were you arrested, summoned, cited, or did you receive a ticket to appear as a result of this offense by any police officer, sheriff, marshal or any other type of law enforcement official?',
      citedagency: 'Arresting/citing/summoning agency',
      citedby:
        'Provide the name of the law enforcement agency that arrested/cited/summoned you.',
      agencyaddress: 'Provide the location of the law enforcement agency',
      charged:
        'As a result of this offense were you charged, convicted, currently awaiting trial, and/or ordered to appear in court in a criminal proceeding against you?',
      courtinfo: 'Court Information',
      courtname: 'Provide the name of the court',
      courtaddress: 'Provide the location of the court',
      chargedetails:
        'Provide all the charges brought against you for this offense, and the outcome of each charged offense',
      chargeType: 'Type of charge',
      courtdate: 'Date of outcome',
      sentenced: 'Were you sentenced as a result of this offense?',
      needmore: 'Since you answered yes we need more information',
      sentenceDescription: 'Provide a description of the sentence',
      exceedsYear:
        'Were you sentenced to imprisonment for a term exceeding 1 year?',
      incarcerated:
        'Were you incarcerated as a result of that sentence for not less than 1 year?',
      incarcerationDates:
        'If the conviction resulted in imprisonment, provide the dates that you actually were incarcerated',
      probationDates:
        'If conviction resulted in probation or parole, provide the  dates of probation or parole',
      awaitingTrial:
        'Are you currently on trial, awaiting a trial, or awaiting sentencing on criminal charges for this offense?',
      awaitingTrialExplanation: 'Provide explanation',
      domesticExplanation: 'Provide explanation',
      domesticCourtName:
        'Provide the name of the court or agency that issued the order',
      domesticCourtAddress:
        'Provide the location of the court or agency that issued the order',
      domesticCourtDate: 'Provide the date the order was issued',
      otherOffenseSentenced: 'Were you sentenced as a result of these charges?',
    },
    para: {
      intro1:
        'For this section report information regardless of whether the record in your case has been sealed, expunged, or otherwise stricken from the court record, or the charge was dismissed.',
      intro2:
        'You need not report convictions under the Federal Controlled Substances Act for which the court issued an expungement order under the authority of 21 U.S.C 844 or 18 U.S.C. 3607.',
      intro3:
        '**Be sure to include all incidents whether occurring in the U.S. or abroad.**',
      chargedetails:
        'Such as found guilty, found not-guilty, charge dropped or "nolle pros," etc. If you were found guilty of or pleaded guilty to lesser offense, list separately both the original charge and the lesser offense.',
      otherOffense: {
        intro:
          'Other than those offenses already listed, have you EVER had the following happen to you?',
        first:
          '**Have you EVER been convicted** in any court of the United States of a crime, sentenced to imprisonment for a term exceeding 1 year for that crime, and incarcerated as a result of that sentence for not less than 1 year? Include all qualifying convictions in Federal, state, local, or military court, even if previously listed on this form',
        second:
          '**Have you EVER been charged** with any felony offense? Include those under the Uniform Code of Military Justice and non-military/civilian offenses',
        third:
          '**Have you EVER been convicted** of an offense involving domestic violence or a crime of violence (such as battery or assault) against your child, dependent, cohabitant, spouse or legally recognized civil union/domestic partner, former spouse or legally recognized civil union/domestic partner, or someone with whom you share a child in common?',
        fourth:
          '**Have you EVER been charged** with an offense involving firearms or explosives?',
        fifth:
          '**Have you EVER been charged** with an offense involving alcohol or drugs?',
      },
      or: 'or',
    },
    label: {
      summons:
        '**In the last {{numberOfYearsString}}** have you been issued a summons, citation, or ticket to appear in court in a criminal proceeding against you? Do not check if all the citations involved traffic infractions where the fine was less than $300 and did not include alcohol or drugs.',
      arrests:
        '**In the last {{numberOfYearsString}}** have you been arrested by any police officer, sheriff, marshal or any other type of law enforcement official?',
      charges:
        '**In the last {{numberOfYearsString}}** have you been charged with, convicted of, or sentenced for a crime in any court? Include all qualifying charges, convictions or sentences in any federal, state, local, military, or non-U.S. court, even if previously listed on this form.',
      probation:
        '**In the last {{numberOfYearsString}}** have you been or are you currently on probation or parole?',
      trial:
        'Are you currently on trial or awaiting a trial on criminal charges?',
      violence:
        '**Domestic violence or a crime of violence** (such as battery or assault) against your child, dependent, cohabitant, spouse or legally recognized civil union/domestic partner, former spouse or legally recognized civil union/domestic partner, or someone with whom you share a child in common?',
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
      domesticViolence:
        'Is there currently a domestic violence protective order or restraining order issued against you?',
      domesticViolenceAppend:
        'Do you have another domestic violence protective order or restraining order currently issued against you to report?',
      notApplicable: 'Not applicable',
    },
    help: {
      summons: {
        title: 'Need help with a summons, citation, or ticket?',
        message:
          'Answer "No" if all the citations involved traffic infractions where the fine was less than $300 and did not include alcohol or drugs.',
        note: '',
      },
      arrests: {
        title: 'Need help with an arrest?',
        message:
          'If you were arrested answer "Yes" and provide the required information',
        note: '',
      },
      charges: {
        title: 'Need help with a criminal charge?',
        message:
          'Include all qualifying charges, convictions or sentences in any federal, state, local, military, or non-U.S. court, even if previously listed on this form.',
        note: '',
      },
      probation: {
        title: 'Need help with a current probation or parole?',
        message:
          'If you are currently on probation or parole answer "Yes" and provide the required information',
        note: '',
      },
      trial: {
        title: 'Need help if on or awaiting trial?',
        message:
          'If you currently awaiting or on trial please answer "Yes" and provide the required information',
        note: '',
      },
      date: {
        title: 'Tell us the date the actual offense happened',
        message:
          'If you are not sure of the exact date give us your best guess and check the "Estimated" checkbox.',
        note: '',
      },
      description: {
        title: 'Details about how this offense happened',
        message: 'Be as clear and in depth as you can.',
        note: '',
      },
      violence: {
        title: 'Need help if this offense involved violence?',
        message:
          'Indicate if the offense involved domestic or criminal violence',
        note: '',
      },
      firearms: {
        title: 'Need help if this offense involved firearms or explosives?',
        message: 'Indicate if the offense involved firearms or explosives',
        note: '',
      },
      substances: {
        title: 'Need help if this offense involved alcohol or drugs?',
        message: 'Indicate if the offense involved alcohol or drugs',
        note: '',
      },
      address: {
        title: 'Need help with this address?',
        message: 'Tell us where the event happened.',
        note: '',
      },
      cited: {
        title:
          'Need help if you were arrested, summoned, or cited for this offense?',
        message:
          'If you were arrested, summoned, or cited please answer "Yes" and provide the required information',
        note: '',
      },
      citedby: {
        title: 'Need help with the law enforcement agency name?',
        message:
          'Provide the name of the law enforcement agency who handled this offense',
        note: '',
      },
      agencyaddress: {
        title:
          'Try looking up the agency name, this could help you find the address',
        message:
          'If you can only find a phone number try calling and asking for the address',
        note:
          'Acronyms: APO - Army Post Office, FPO - Fleet Post Office, DPO - Diplomatic Post Office.',
      },
      charged: {
        title: 'Need help if you were charged, convicted, or awaiting trial?',
        message:
          'If you were charged, convicted, currently awaiting trial, or due to appear in court answer "Yes" and provide the required information',
        note: '',
      },
      courtname: {
        title: 'Need help with the name of the court?',
        message: 'Provide the name of the court',
        note: '',
      },
      courtaddress: {
        title:
          'Try looking up the court name, this could help you find the address',
        message:
          'If you can only find a phone number try calling and asking for the address.',
        note:
          'Acronyms: APO - Army Post Office, FPO - Fleet Post Office, DPO - Diplomatic Post Office.',
      },
      chargeType: {
        title: 'Need help with the type of charge?',
        message: 'Provide the type of charge issued by the court',
        note: '',
      },
      courtcharge: {
        title: 'Need help with the court charge(s)?',
        message: 'Provide the charge(s)',
        note: '',
      },
      courtoutcome: {
        title: 'Need help with the court outcome?',
        message: 'Provide the outcome of the court proceedings',
        note: '',
      },
      courtdate: {
        title: 'Estimate the date if unsure',
        message:
          'If you are not sure of the exact date give us your best guess and check the "Estimated" checkbox.',
        note: '',
      },
      sentenced: {
        title: 'Need help if you were sentenced for this offense?',
        message:
          'If you were sentenced by the court for this offense please click "Yes" and provide the necessary information',
        note: '',
      },
      sentenceDescription: {
        title: 'Need help with the sentence description?',
        message: 'Provide a description of your sentencing',
        note: '',
      },
      exceedsYear: {
        title: 'Need help?',
        message:
          'If you were sentenced for a term exceeding 1 year, please click "Yes"',
        note: '',
      },
      incarcerationDates: {
        title: 'Estimate the date if unsure',
        message:
          'If you are not sure of the exact dates give us your best guess and check the "Estimated" checkbox.',
        note: '',
      },
      probationDates: {
        title: 'Estimate the date if unsure',
        message:
          'If you are not sure of the exact dates give us your best guess and check the "Estimated" checkbox.',
        note: '',
      },
      awaitingTrial: {
        title: 'Need help with this question?',
        message:
          'Are you currently on trial, awaiting a trial, or awaiting sentencing on criminal charges for this offense?',
        note: '',
      },
      awaitingTrialExplanation: {
        title: 'Need help with awaiting trial explanation',
        message: 'Provide explanation',
        note: '',
      },
      otherConviction: {
        title: 'Need help with this conviction question?',
        message:
          'Include all qualifying convictions in Federal, state, local, or military court, even if previously listed on this form.',
        note: '',
      },
      otherFelony: {
        title: 'Need help with this charge question?',
        message:
          'Include those under the Uniform Code of Military Justice and non-military/civilian felony offenses.',
        note: '',
      },
      domesticExplanation: {
        title: 'Explain the order against you',
        message: 'Go into as much detail as you need to fully explain.',
        note: '',
      },
    },
    branchCollection: {
      domesticViolence: {
        title: 'Need help?',
        message:
          'Is there currently a domestic violence protective order or restraining order issued against you?',
      },
    },
    collection: {
      summary: {
        title: 'Summary of offenses',
        item: 'Offense',
        unknown: 'Provide offense below',
      },
      appendTitle:
        'Do you have any other offenses where any of the following has happened to you?',
      appendMessage: [
        '- **In the last {{numberOfYearsString}}** have you been issued a summons, citation, or ticket to appear in court in a criminal proceeding against you? Do not check if all the citations involved traffic infractions where the fine was than $300 and did not include alcohol or drugs.',
        '- **In the last {{numberOfYearsString}}** have you been arrested by any police officer, sheriff, marshal or any other type of law enforcement official?',
        '- **In the last {{numberOfYearsString}}** have you been charged with, convicted of, or sentenced for a crime in any court? Include all qualifying charges, convictions or sentences in any federal, state, local, military, or non-U.S. court, even if previously listed on this form.',
        '- **In the last {{numberOfYearsString}}** have you been or are you currently on probation or parole?',
        '- Are you currently on trial or awaiting a trial on criminal charges?',
      ],
      append: 'Add another offense',
    },
  },
  investigations: {
    history: {
      heading: {
        title:
          'Has the U.S. Government (or a foreign government) EVER investigated your background and/or granted you a security clearance eligibility/access?',
        agency: 'Provide the investigating agency',
        completed: 'Date the investigation was completed',
        issued:
          'Provide the name of agency that issued the clearance eligibility/access if different from the investigating agency',
        granted: 'Provide the date clearance eligibility/access was granted',
        clearance: 'Provide the level of clearance eligibility/access granted',
        agencyExplanation:
          'Provide the name of the bureau, government, or explanation',
        clearanceExplanation: 'Provide an explanation',
      },
      label: {
        idk: "I don't know",
        agency: {
          dod: 'U.S. Department of Defense',
          dos: 'U.S. Department of State',
          opm: 'U.S. Office of Personnel Management',
          fbi: 'Federal Bureau of Investigation',
          dot: 'U.S. Department of Treasury (provide name of bureau)',
          dhs: 'U.S. Department of Homeland Security',
          foreign: 'Foreign government (provide name of government)',
          other: 'Other (provide explanation)',
        },
        level: {
          none: 'None',
          confidential: 'Confidential',
          secret: 'Secret',
          topsecret: 'Top Secret',
          sci: 'Sensitive Compartmented Information (SCI)',
          q: 'Q',
          l: 'L',
          foreign: 'Issued by foreign country',
          other: 'Other (provide explanation)',
        },
      },
      para: {
        or: 'or',
      },
      collection: {
        description: 'Summary of investigations',
        item: 'Investigation',
        unknown: 'Provide investigation details below',
        appendTitle: 'Do you have another investigation to enter?',
        appendLabel: 'Add another investigation',
      },
      help: {
        agency: {
          title: 'Need help with this investigative agency?',
          message:
            'If you are not sure of the agency issuing the investigation click "I don\'t know".',
          note: '',
        },
        agencyExplanation: {
          title: 'Need help explaining this agency?',
          message: 'Provide any further explanation or name(s) required.',
          note: '',
        },
        completed: {
          title: 'Estimate the date if unsure',
          message:
            'If you are not sure of the exact date give us your best guess and check the "Estimated" checkbox.',
          note: '',
        },
        issued: {
          title: 'Need help with who issued this clearance?',
          message:
            'If an agency besides the one who initiated the investigation issued your clearance please tell us.',
          note: '',
        },
        granted: {
          title: 'Estimate the date if unsure',
          message:
            'If you are not sure of the exact date give us your best guess and check the "Estimated" checkbox.',
          note: '',
        },
        clearance: {
          title: 'Need help with which clearance was granted?',
          message:
            'If you are not sure of the clearance being issued click "I don\'t know".',
          note: '',
        },
        clearanceExplanation: {
          title: 'Need help explaining this clearance?',
          message: 'Provide any further explanation regarding the clearance.',
          note: '',
        },
      },
    },
    revoked: {
      heading: {
        title:
          'In the last {{numberOfYearsString}} have you had a security clearance eligibility/access authorization denied, suspended, or revoked?',
        titleEver:
          'Have you EVER had a security clearance eligibility/access authorization denied, suspended, or revoked?',
        date:
          'Provide the date security clearance eligibility/access authorization was denied, suspended or revoked',
        agency: 'Provide the name of the agency that took the action',
        explanation:
          'Provide an explanation of the circumstances of the denial, suspension or revocation action',
      },
      para: {
        downgrade:
          'Note: An administrative downgrade or administrative termination of a security clearance is not a revocation.',
      },
      collection: {
        description: 'Summary of denials',
        item: 'Denial',
        unknown: 'Provide denial details below',
        appendTitle:
          'Do you have another denied, revoked, or suspended security clearance eligibility/access authorization to enter?',
        appendLabel: 'Add another denial',
      },
      help: {
        date: {
          title: 'Estimate the date if unsure',
          message:
            'If you are not sure of the exact date give us your best guess and check the "Estimated" checkbox.',
          note: '',
        },
        agency: {
          title: 'Need help with the agency authorization this termination?',
          message:
            'Provide the agency name to the best of your abilities responsible for authorizing this action.',
          note: '',
        },
        explanation: {
          title: 'Details of this denial, suspension or revocation action',
          message: 'Go into as much detail as necessary.',
          note: '',
        },
      },
    },
    debarred: {
      heading: {
        title: 'In the last {{numberOfYearsString}} have you been debarred from government employment?',
        titleEver: 'Have you EVER been debarred from government employment?',
        agency:
          'Provide the name of the government agency taking debarment action',
        date: 'Provide the date the debarment occurred',
        explanation:
          'Provide an explanation of the circumstances of the debarment',
      },
      collection: {
        description: 'Summary of debarments',
        item: 'Debarment',
        unknown: 'Provide debarment details below',
        appendTitle: 'Do you have another Government debarment to enter?',
        appendLabel: 'Add another debarment',
      },
      help: {
        date: {
          title: 'Estimate the date if unsure',
          message:
            'If you are not sure of the exact date give us your best guess and check the "Estimated" checkbox.',
          note: '',
        },
        agency: {
          title: 'Need help with the agency taking the debarment action?',
          message:
            'Provide the agency name to the best of your abilities responsible for this action.',
          note: '',
        },
        explanation: {
          title: 'Details of this denial, suspension or revocation action',
          message: 'Go into as much detail as necessary.',
          note: '',
        },
      },
    },
  },
  nonCriminalAction: {
    heading: {
      hasCourtActions:
        'In the last ten (10) years, have you been a party to any public record civil court action not listed elsewhere on this form?',
      civilActionDate: 'Provide the date of the civil action',
      courtName: 'Provide the court name',
      courtAddress: 'Provide the address of the court',
      natureOfAction: 'Provide details of the nature of the action',
      resultsOfAction: 'Provide a description of the results of the action',
      principalPartyNames:
        'Provide the name(s) of the principal parties involved in the court action',
    },
    collection: {
      description: 'Summary of court actions',
      summary: 'Provide your court action details below',
      appendTitle:
        'Are there any other civil court actions in the last ten (10) years to report?',
      appendLabel: 'Add another court action',
      itemType: 'Court Action',
    },
    help: {
      civilActionDate: {
        title: "Can't remember the exact date?",
        message: 'Give us your best guess and check the "Estimated" checkbox.',
        note: '',
      },
      courtName: {
        title: 'Need help with the court name?',
        message: 'Provide the name of the court',
        note: '',
      },
      courtAddress: {
        title:
          'Try looking up the court name, this could help you find the address',
        message:
          'If you can only find a phone number try calling and asking for the address.',
        note:
          'Acronyms: APO - Army Post Office, FPO - Fleet Post Office, DPO - Diplomatic Post Office.',
      },
      natureOfAction: {
        title: 'Need help with the nature of the action?',
        message: 'Provide the address of the court',
        note: '',
      },
      resultsOfAction: {
        title: 'Need help with the results of the action?',
        message: 'Provide a description of the results of the action',
        note: '',
      },
      principalPartyNames: {
        title: 'Need help with the principal parties involved?',
        message:
          'Provide the name(s) of the principal parties involved in the court action',
        note: '',
      },
    },
  },
  technology: {
    unauthorized: {
      heading: {
        title:
          'In the last seven (7) years have you illegally or without proper authorization accessed or attempted to access any information technology system?',
        date: 'Provide the date of the incident',
        incident:
          'Provide a description of the nature of the incident or offense',
        location: 'Provide the location where the incident took place',
        action:
          'Provide a description of the action (administrative, criminal or other) taken as a result of this incident',
      },
      para: {
        intro: [
          'We note, with reference to this section, that neither your truthful responses nor information derived from your responses to this section will be used as evidence against you in a subsequent criminal proceeding.',
          'As to this particular section, this applies whether or not you are currently employed by the Federal government. The following questions ask about your use of information technology systems. Information technology systems include all related computer hardware, software, firmware, and data used for the communication, transmission, processing, manipulation, storage or protection of information.',
        ],
      },
      collection: {
        description: 'Summary of unauthorized access',
        item: 'Access',
        unknown: 'Provide unauthorized access details below',
        appendTitle: 'Are there any other incidents to report?',
        appendLabel: 'Add another unauthorized access',
      },
      help: {
        date: {
          title: 'Estimate the date if unsure',
          message:
            'If you are not sure of the exact date give us your best guess and check the "Estimated" checkbox.',
          note: '',
        },
        incident: {
          title: 'Need help with the nature of this offense?',
          message: 'Provide a description of the offense.',
          note: '',
        },
        location: {
          title: 'Acronyms:',
          message:
            'APO - Army Post Office, FPO - Fleet Post Office, DPO - Diplomatic Post Office.',
          note: '',
        },
        action: {
          title: 'Need help with any actions as a result of this incident?',
          message:
            'Provide all actions which took place as a result of this incident.',
          note: '',
        },
      },
    },
    manipulating: {
      heading: {
        title:
          'In the last seven (7) years have you illegally or without authorization, modified, destroyed, manipulated, or denied others access to information residing on an information technology system or attempted any of the above?',
        date: 'Provide the date of the incident',
        incident:
          'Provide a description of the nature of the incident or offense',
        location: 'Provide the location where the incident took place',
        action:
          'Provide a description of the action (administrative, criminal or other) taken as a result of this incident',
      },
      collection: {
        description:
          'Summary of modified, destroyed, manipulated, or denied access',
        item: 'Incident',
        unknown: 'Provide details below',
        appendTitle: 'Are there any other incidents to report?',
        appendLabel: 'Add another incident',
      },
      help: {
        date: {
          title: 'Estimate the date if unsure',
          message:
            'If you are not sure of the exact date give us your best guess and check the "Estimated" checkbox.',
          note: '',
        },
        incident: {
          title: 'Need help with the nature of this offense?',
          message: 'Provide a description of the offense.',
          note: '',
        },
        location: {
          title: 'Acronyms:',
          message:
            'APO - Army Post Office, FPO - Fleet Post Office, DPO - Diplomatic Post Office.',
          note: '',
        },
        action: {
          title: 'Need help with any actions as a result of this incident?',
          message:
            'Provide all actions which took place as a result of this incident.',
          note: '',
        },
      },
    },
    unlawful: {
      heading: {
        title:
          'In the last seven (7) years have you introduced, removed, or used hardware, software, or media in connection with any information technology system without authorization, when specifically prohibited by rules, procedures, guidelines, or regulations or attempted any of the above?',
        date: 'Provide the date of the incident',
        incident:
          'Provide a description of the nature of the incident or offense',
        location: 'Provide the location where the incident took place',
        action:
          'Provide a description of the action (administrative, criminal or other) taken as a result of this incident',
      },
      collection: {
        description: 'Summary of unlawful use',
        item: 'Use',
        unknown: 'Provide details below',
        appendTitle: 'Are there any other incidents to report?',
        appendLabel: 'Add another unlawful use',
      },
      help: {
        date: {
          title: 'Estimate the date if unsure',
          message:
            'If you are not sure of the exact date give us your best guess and check the "Estimated" checkbox.',
          note: '',
        },
        incident: {
          title: 'Need help with the nature of this offense?',
          message: 'Provide a description of the offense.',
          note: '',
        },
        location: {
          title: 'Acronyms:',
          message:
            'APO - Army Post Office, FPO - Fleet Post Office, DPO - Diplomatic Post Office.',
          note: '',
        },
        action: {
          title: 'Need help with any actions as a result of this incident?',
          message:
            'Provide all actions which took place as a result of this incident.',
          note: '',
        },
      },
    },
  },
  associations: {
    terrorist: {
      heading: {
        title:
          "Are you now or have you EVER been a member of an organization dedicated to terrorism, either with an awareness of the organization's dedication to that end, or with the specific intent to further such activities?",
        organization: 'Provide the full name of the organization',
        address: 'Provide the address/location of the organization',
        dates: 'Provide the dates of your involvement with the organization',
        positions: 'Provide all positions held in the organization, if any',
        contributions:
          'Provide all contributions made to the organization, if any',
        reasons:
          'Provide a description of the nature of and reasons for your involvement with the organization',
      },
      para: {
        intro: [
          'The following pertain to your associations. You are required to answer the questions fully and truthfully, and your failure to do so could be grounds for an adverse employment, security, or credentialing decision.',
          'For the purpose of this question, terrorism is defined as any criminal acts that involve violence or are dangerous to human life and appear to be intended to intimidate or coerce a civilian population to influence the policy of a government by intimidation or coercion or to affect the conduct of a government by mass destruction, assassination or kidnapping.',
        ],
        introWithoutSecurity: [
          'The following pertain to your associations. You are required to answer the questions fully and truthfully, and your failure to do so could be grounds for an adverse employment or credentialing decision.',
          'For the purpose of this question, terrorism is defined as any criminal acts that involve violence or are dangerous to human life and appear to be intended to intimidate or coerce a civilian population to influence the policy of a government by intimidation or coercion or to affect the conduct of a government by mass destruction, assassination or kidnapping.',
        ],
        or: 'or',
      },
      label: {
        noposition: 'No positions held',
        nocontribs: 'No contributions made',
      },
      collection: {
        description: 'Summary of terrorist organizations',
        item: 'Organization',
        unknown: 'Provide details of organization below',
        appendTitle:
          "Do you have any other instances of being a member of an organization dedicated to terrorism, either with an awareness of the organization's dedication to that end, or with the specific intent to further such activities to report?",
        appendLabel: 'Add another terrorist organization',
      },
      help: {
        organization: {
          title: 'Need help with this organization name?',
          message: 'Provide the name of the organization.',
          note: '',
        },
        address: {
          title: 'Acronyms:',
          message:
            'APO - Army Post Office, FPO - Fleet Post Office, DPO - Diplomatic Post Office.',
          note: '',
        },
        dates: {
          title: 'Estimate the date if unsure',
          message:
            'If you are not sure of the exact dates give us your best guess and check the "Estimated" checkbox.',
          note: '',
        },
        positions: {
          title: 'Need help with positions held?',
          message: 'Provide any positions held during this time.',
          note:
            'Note: If you didn\'t hold a position please click "No positions held."',
        },
        contributions: {
          title: 'Need help with contributions?',
          message: 'Provide any contributions made to organization.',
          note:
            'Note: If you didn\'t provide any contributions click "No contributions made."',
        },
        reasons: {
          title: 'Need help with the nature and reasons of this incident?',
          message:
            'Provide an explanation of events surrounding this incident to the best of your knowledge.',
          note: '',
        },
      },
    },
    engaged: {
      heading: {
        title: 'Have you EVER knowingly engaged in any acts of terrorism?',
        reasons: 'Describe the nature and reasons for the activity',
        dates: 'Provide the dates for any such activities',
      },
      collection: {
        description: 'Summary of acts of terrorism',
        item: 'Act',
        unknown: 'Provide details for the terrorism below',
        appendTitle:
          'Do you have any other instances of knowingly engaging in acts of terrorism to report?',
        appendLabel: 'Add another act of terrorism',
      },
      help: {
        reasons: {
          title: 'Need help with the nature and reasons of this incident?',
          message:
            'Provide an explanation of events surrounding this incident to the best of your knowledge.',
          note: '',
        },
        dates: {
          title: 'Estimate the date if unsure',
          message:
            'If you are not sure of the exact dates give us your best guess and check the "Estimated" checkbox.',
          note: '',
        },
      },
    },
    advocating: {
      heading: {
        title:
          'Have you EVER advocated any acts of terrorism or activities designed to overthrow the U.S. Government by force?',
        reasons: 'Provide the reason(s) for advocating acts of terrorism',
        dates: 'Provide the dates of advocating acts of terrorism',
      },
      collection: {
        description: 'Summary of advocating terrorism',
        item: 'Instance',
        unknown: 'Provide details of the instance below',
        appendTitle:
          'Do you have any other instances of advocating acts of terrorism or activities designed to overthrow the U.S. Government by force to report?',
        appendLabel: 'Add another instance',
      },
      help: {
        reasons: {
          title: 'Need help with the nature and reasons of this incident?',
          message:
            'Provide an explanation of events surrounding this incident to the best of your knowledge.',
          note: '',
        },
        dates: {
          title: 'Estimate the date if unsure',
          message:
            'If you are not sure of the exact dates give us your best guess and check the "Estimated" checkbox.',
          note: '',
        },
      },
    },
    overthrow: {
      heading: {
        title:
          "Have you EVER been a member of an organization dedicated to the use of violence or force to overthrow the United States Government, and which engaged in activities to that end with an awareness of the organization's dedication to that end or with the specific intent to further such activities?",
        organization: 'Provide the full name of the organization',
        address: 'Provide the address/location of the organization',
        dates: 'Provide the dates of your involvement with the organization',
        positions: 'Provide all positions held in the organization, if any',
        contributions:
          'Provide all contributions made to the organization, if any',
        reasons:
          'Provide a description of the nature of and reasons for your involvement with the organization',
      },
      para: {
        or: 'or',
      },
      label: {
        noposition: 'No positions held',
        nocontribs: 'No contributions made',
      },
      collection: {
        description: 'Summary of memberships',
        item: 'Membership',
        unknown: 'Please provide membership details below',
        appendTitle:
          'Do you have any other instances of being a member of an organization dedicated to the use of violence or force to overthrow the United States Government, which engaged in activities to that end with an awareness of the organization’s dedication to that end or with the specific intent to further such activities to report?',
        appendLabel: 'Add another membership',
      },
      help: {
        organization: {
          title: 'Need help with this organization name?',
          message: 'Provide the name of the organization.',
          note: '',
        },
        address: {
          title: 'Acronyms:',
          message:
            'APO - Army Post Office, FPO - Fleet Post Office, DPO - Diplomatic Post Office.',
          note: '',
        },
        dates: {
          title: 'Estimate the date if unsure',
          message:
            'If you are not sure of the exact dates give us your best guess and check the "Estimated" checkbox.',
          note: '',
        },
        positions: {
          title: 'Need help with positions held?',
          message: 'Provide any positions held during this time.',
          note:
            'Note: If you didn\'t hold a position please click "No positions held."',
        },
        contributions: {
          title: 'Need help with contributions?',
          message: 'Provide any contributions made to organization.',
          note:
            'Note: If you didn\'t provide any contributions click "No contributions made."',
        },
        reasons: {
          title: 'Need help with the nature and reasons of this incident?',
          message:
            'Provide an explanation of events surrounding this incident to the best of your knowledge.',
          note: '',
        },
      },
    },
    violence: {
      heading: {
        title:
          'Have you EVER been a member of an organization that advocates or practices commission of acts of force or violence to discourage others from exercising their rights under the U.S. Constitution or any state of the United States with the specific intent to further such action?',
        organization: 'Provide the full name of the organization',
        address: 'Provide the address/location of the organization',
        dates: 'Provide the dates of your involvement with the organization',
        positions: 'Provide all positions held in the organization, if any',
        contributions:
          'Provide all contributions (in U.S. dollars) made to the organization, if any',
        reasons:
          'Provide a description of the nature of and reasons for your involvement with the organization',
      },
      para: {
        or: 'or',
      },
      label: {
        noposition: 'No positions held',
        nocontribs: 'No contributions made',
      },
      collection: {
        description: 'Summary of memberships',
        item: 'Membership',
        unknown: 'Provide membership details below',
        appendTitle:
          'Do you have any other instances of being a member of an organization that advocates or practices commission of acts of force or violence to discourage others from exercising their rights under the U.S. Constitution or any state of the United States with the specific intent to further such action to report',
        appendLabel: 'Add another membership',
      },
      help: {
        organization: {
          title: 'Need help with this organization name?',
          message: 'Provide the name of the organization.',
          note: '',
        },
        address: {
          title: 'Acronyms:',
          message:
            'APO - Army Post Office, FPO - Fleet Post Office, DPO - Diplomatic Post Office.',
          note: '',
        },
        dates: {
          title: 'Estimate the date if unsure',
          message:
            'If you are not sure of the exact date give us your best guess and check the "Estimated" checkbox.',
          note: '',
        },
        positions: {
          title: 'Need help with positions held?',
          message: 'Provide any positions held during this time.',
          note:
            'Note: If you didn\'t hold a position please click "No positions held."',
        },
        contributions: {
          title: 'Need help with contributions?',
          message: 'Provide any contributions made to organization.',
          note:
            'Note: If you didn\'t provide any contributions click "No contributions made."',
        },
        reasons: {
          title: 'Need help with the nature and reasons of this incident?',
          message:
            'Provide an explanation of events surrounding this incident to the best of your knowledge.',
          note: '',
        },
      },
    },
    activities: {
      heading: {
        title:
          'Have you EVER knowingly engaged in activities designed to overthrow the U.S. Government by force?',
        reasons: 'Describe the nature and reasons for the activity',
        dates: 'Provide the dates of such activities',
      },
      collection: {
        description: 'Summary of acts of terrorism',
        item: 'Activity',
        unknown: 'Provide details below',
        appendTitle:
          'Do you have any other instances of having knowingly engaged in activities designed to overthrow the U.S. Government by force to report?',
        appendLabel: 'Add another activity',
      },
      help: {
        reasons: {
          title: 'Need help with the nature and reasons of this activity?',
          message:
            'Provide an explanation of events surrounding this activity to the best of your knowledge.',
          note: '',
        },
        dates: {
          title: 'Estimate the date if unsure',
          message:
            'If you are not sure of the exact date give us your best guess and check the "Estimated" checkbox.',
          note: '',
        },
      },
    },
    terrorism: {
      heading: {
        title:
          'Have you EVER associated with anyone involved in activities to further terrorism?',
        explanation: 'Provide explanation',
      },
      help: {
        explanation: {
          title: 'Need help with this explanation?',
          message:
            'If you have ever known or been in association with anyone who was involved in terrorist activities provide an explanation of the circumstances.',
          note: '',
        },
      },
    },
  },
}
