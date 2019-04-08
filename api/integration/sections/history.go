package sections

// HistResidenceSingle contains a single residence
const HistResidenceSingle = `
{
	"type": "history.residence",
	"props": {
	  "List": {
	    "type": "collection",
	    "props": {
	      "branch": {
	        "type": "branch",
	        "props": {
	          "value": "No"
	        }
	      },
	      "items": [
	        {
	          "Item": {
	            "Address": {
	              "type": "location",
	              "props": {
	                "layout": "Address",
	                "street": "316 Washington Ave",
	                "city": "Wheeling",
	                "state": "WV",
	                "zipcode": "26003",
	                "country": "United States",
	                "validated": true
	              }
	            },
	            "Comments": {
	              "type": "textarea",
	              "props": {
	                "value": ""
	              }
	            },
	            "Dates": {
	              "type": "daterange",
	              "props": {
	                "from": {
	                  "type": "datecontrol",
	                  "props": {
	                    "month": "12",
	                    "day": "13",
	                    "year": "1990",
	                    "estimated": false
	                  }
	                },
	                "to": {
	                  "type": "datecontrol",
	                  "props": {
	                    "month": "8",
	                    "day": "24",
	                    "year": "2018",
	                    "estimated": false
	                  }
	                },
	                "present": true
	              }
	            },
	            "ReferenceAddress": {
	              "type": "location",
	              "props": {
	                "layout": "Address",
	                "street": "317 WASHINGTON AVE",
	                "city": "WHEELING",
	                "state": "WV",
	                "zipcode": "26003",
	                "country": "United States",
	                "validated": true
	              }
	            },
	            "ReferenceEmail": {
	              "type": "email",
	              "props": {
	                "value": "ashley.Emily@testemail.com"
	              }
	            },
	            "ReferenceEmailNotApplicable": {
	              "type": "notapplicable",
	              "props": {
	                "applicable": false
	              }
	            },
	            "ReferenceLastContact": {
	              "type": "datecontrol",
	              "props": {
	                "month": "08",
	                "day": "01",
	                "year": "2018",
	                "estimated": false
	              }
	            },
	            "ReferenceName": {
	              "type": "name",
	              "props": {
	                "first": "Ashley",
	                "firstInitialOnly": false,
	                "middle": "",
	                "middleInitialOnly": false,
	                "noMiddleName": true,
	                "last": "Emily",
	                "suffix": "",
	                "suffixOther": ""
	              }
	            },
	            "ReferencePhoneDay": {
	              "type": "telephone",
	              "props": {
	                "timeOfDay": "Both",
	                "type": "Domestic",
	                "numberType": "",
	                "number": "7245555551",
	                "extension": "",
	                "noNumber": false
	              }
	            },
	            "ReferencePhoneEvening": {
	              "type": "telephone",
	              "props": {
	                "timeOfDay": "Both",
	                "type": "Domestic",
	                "numberType": "",
	                "number": "7245555551",
	                "extension": "",
	                "noNumber": false
	              }
	            },
	            "ReferencePhoneMobile": {
	              "type": "telephone",
	              "props": {
	                "timeOfDay": "Both",
	                "type": "Domestic",
	                "numberType": "",
	                "number": "7245555551",
	                "extension": "",
	                "noNumber": false
	              }
	            },
	            "ReferenceRelationship": {
	              "type": "checkboxgroup",
	              "props": {
	                "values": [
	                  "Neighbor",
	                  "Friend"
	                ]
	              }
	            },
	            "ReferenceRelationshipComments": {
	              "type": "checkboxgroup",
	              "props": {
	                "values": null
	              }
	            },
	            "ReferenceRelationshipOther": {
	              "type": "text",
	              "props": {
	                "value": ""
	              }
	            },
	            "Role": {
	              "type": "radio",
	              "props": {
	                "value": "Own",
	                "checked": true
	              }
	            },
	            "RoleOther": {
	              "type": "text",
	              "props": {
	                "value": ""
	              }
	            }
	          }
	        }
	      ]
	    }
	  }
	}
}
`

// HistResidenceUnfinishedList contains an unfinished list
const HistResidenceUnfinishedList = `
{
	"type": "history.residence",
	"props": {
	  "List": {
	    "type": "collection",
	    "props": {
	      "branch": {
	        "type": "branch",
	        "props": {
	          "value": ""
	        }
	      },
	      "items": [
	        {
	          "Item": {
	            "Address": {
	              "type": "location",
	              "props": {
	                "layout": "Address",
	                "street": "316 Washington Ave",
	                "city": "Wheeling",
	                "state": "WV",
	                "zipcode": "26003",
	                "country": "United States",
	                "validated": true
	              }
	            },
	            "Comments": {
	              "type": "textarea",
	              "props": {
	                "value": ""
	              }
	            },
	            "Dates": {
	              "type": "daterange",
	              "props": {
	                "from": {
	                  "type": "datecontrol",
	                  "props": {
	                    "month": "12",
	                    "day": "13",
	                    "year": "1990",
	                    "estimated": false
	                  }
	                },
	                "to": {
	                  "type": "datecontrol",
	                  "props": {
	                    "month": "8",
	                    "day": "24",
	                    "year": "2018",
	                    "estimated": false
	                  }
	                },
	                "present": true
	              }
	            },
	            "ReferenceAddress": {
	              "type": "location",
	              "props": {
	                "layout": "Address",
	                "street": "317 WASHINGTON AVE",
	                "city": "WHEELING",
	                "state": "WV",
	                "zipcode": "26003",
	                "country": "United States",
	                "validated": true
	              }
	            },
	            "ReferenceEmail": {
	              "type": "email",
	              "props": {
	                "value": "ashley.Emily@testemail.com"
	              }
	            },
	            "ReferenceEmailNotApplicable": {
	              "type": "notapplicable",
	              "props": {
	                "applicable": false
	              }
	            },
	            "ReferenceLastContact": {
	              "type": "datecontrol",
	              "props": {
	                "month": "08",
	                "day": "01",
	                "year": "2018",
	                "estimated": false
	              }
	            },
	            "ReferenceName": {
	              "type": "name",
	              "props": {
	                "first": "Ashley",
	                "firstInitialOnly": false,
	                "middle": "",
	                "middleInitialOnly": false,
	                "noMiddleName": true,
	                "last": "Emily",
	                "suffix": "",
	                "suffixOther": ""
	              }
	            },
	            "ReferencePhoneDay": {
	              "type": "telephone",
	              "props": {
	                "timeOfDay": "Both",
	                "type": "Domestic",
	                "numberType": "",
	                "number": "7245555551",
	                "extension": "",
	                "noNumber": false
	              }
	            },
	            "ReferencePhoneEvening": {
	              "type": "telephone",
	              "props": {
	                "timeOfDay": "Both",
	                "type": "Domestic",
	                "numberType": "",
	                "number": "7245555551",
	                "extension": "",
	                "noNumber": false
	              }
	            },
	            "ReferencePhoneMobile": {
	              "type": "telephone",
	              "props": {
	                "timeOfDay": "Both",
	                "type": "Domestic",
	                "numberType": "",
	                "number": "7245555551",
	                "extension": "",
	                "noNumber": false
	              }
	            },
	            "ReferenceRelationship": {
	              "type": "checkboxgroup",
	              "props": {
	                "values": [
	                  "Neighbor",
	                  "Friend"
	                ]
	              }
	            },
	            "ReferenceRelationshipComments": {
	              "type": "checkboxgroup",
	              "props": {
	                "values": null
	              }
	            },
	            "ReferenceRelationshipOther": {
	              "type": "text",
	              "props": {
	                "value": ""
	              }
	            },
	            "Role": {
	              "type": "radio",
	              "props": {
	                "value": "Own",
	                "checked": true
	              }
	            },
	            "RoleOther": {
	              "type": "text",
	              "props": {
	                "value": ""
	              }
	            }
	          }
	        }
	      ]
	    }
	  }
	}
}
`

// HistEmployment contains an employment
const HistEmployment = `
{
	"type": "history.employment",
	"props": {
	  "List": {
	    "type": "collection",
	    "props": {
	      "branch": {
	        "type": "branch",
	        "props": {
	          "value": "No"
	        }
	      },
	      "items": [
	        {
	          "Item": {
	            "Additional": {
	              "type": "collection",
	              "props": {
	                "branch": {
	                  "type": ""
	                },
	                "items": [
	                  {
	                    "Item": {
	                      "DatesEmployed": {
	                        "type": "daterange",
	                        "props": {
	                          "from": {
	                            "type": "datecontrol",
	                            "props": {
	                              "month": "",
	                              "day": "",
	                              "year": "",
	                              "estimated": false
	                            }
	                          },
	                          "to": {
	                            "type": "datecontrol",
	                            "props": {
	                              "month": "",
	                              "day": "",
	                              "year": "",
	                              "estimated": false
	                            }
	                          },
	                          "present": false
	                        }
	                      },
	                      "Has": {
	                        "type": "branch",
	                        "props": {
	                          "value": "No"
	                        }
	                      },
	                      "Position": {
	                        "type": "text",
	                        "props": {
	                          "value": ""
	                        }
	                      },
	                      "Supervisor": {
	                        "type": "text",
	                        "props": {
	                          "value": ""
	                        }
	                      }
	                    }
	                  }
	                ]
	              }
	            },
	            "Address": {
	              "type": "location",
	              "props": {
	                "layout": "Address",
	                "street": "345 NATIONAL RD",
	                "city": "WHEELING",
	                "state": "WV",
	                "zipcode": "26003",
	                "country": "United States",
	                "validated": true
	              }
	            },
	            "Dates": {
	              "type": "daterange",
	              "props": {
	                "from": {
	                  "type": "datecontrol",
	                  "props": {
	                    "month": "06",
	                    "day": "12",
	                    "year": "2006",
	                    "estimated": false
	                  }
	                },
	                "to": {
	                  "type": "datecontrol",
	                  "props": {
	                    "month": "8",
	                    "day": "24",
	                    "year": "2018",
	                    "estimated": false
	                  }
	                },
	                "present": true
	              }
	            },
	            "DutyStation": {
	              "type": "text",
	              "props": {
	                "value": ""
	              }
	            },
	            "Employment": {
	              "type": "text",
	              "props": {
	                "value": "FBI"
	              }
	            },
	            "EmploymentActivity": {
	              "type": "employmentactivity",
	              "props": {
	                "value": "OtherFederal"
	              }
	            },
	            "PhysicalAddress": {
	              "type": "physicaladdress",
	              "props": {
	                "HasDifferentAddress": {
	                  "type": "branch",
	                  "props": {
	                    "value": "No"
	                  }
	                },
	                "Address": {
	                  "type": "location",
	                  "props": {
	                    "layout": "",
	                    "country": ""
	                  }
	                },
	                "Telephone": {
	                  "type": "telephone",
	                  "props": {
	                    "timeOfDay": "",
	                    "type": "",
	                    "numberType": "",
	                    "number": "",
	                    "extension": "",
	                    "noNumber": false
	                  }
	                }
	              }
	            },
	            "ReasonLeft": {
	              "type": "reasonleft",
	              "props": {
	                "Comments": {
	                  "type": "textarea",
	                  "props": {
	                    "value": ""
	                  }
	                },
	                "Reasons": {
	                  "type": "collection",
	                  "props": {
	                    "branch": {
	                      "type": ""
	                    },
	                    "items": [
	                      {
	                        "Item": {
	                          "Date": {
	                            "type": "datecontrol",
	                            "props": {
	                              "month": "",
	                              "day": "",
	                              "year": "",
	                              "estimated": false
	                            }
	                          },
	                          "Has": {
	                            "type": "branch",
	                            "props": {
	                              "value": "No"
	                            }
	                          },
	                          "Reason": {
	                            "type": "textarea",
	                            "props": {
	                              "value": ""
	                            }
	                          },
	                          "Text": {
	                            "type": "textarea",
	                            "props": {
	                              "value": ""
	                            }
	                          }
	                        }
	                      }
	                    ]
	                  }
	                },
	                "ReasonDescription": {
	                  "type": "textarea",
	                  "props": {
	                    "value": ""
	                  }
	                }
	              }
	            },
	            "ReferenceAddress": {
	              "type": "location",
	              "props": {
	                "layout": "",
	                "country": ""
	              }
	            },
	            "ReferenceName": {
	              "type": "name",
	              "props": {
	                "first": "",
	                "firstInitialOnly": false,
	                "middle": "",
	                "middleInitialOnly": false,
	                "noMiddleName": false,
	                "last": "",
	                "suffix": "",
	                "suffixOther": ""
	              }
	            },
	            "ReferencePhone": {
	              "type": "telephone",
	              "props": {
	                "timeOfDay": "",
	                "type": "",
	                "numberType": "",
	                "number": "",
	                "extension": "",
	                "noNumber": false
	              }
	            },
	            "Reprimand": {
	              "type": "collection",
	              "props": {
	                "branch": {
	                  "type": ""
	                },
	                "items": [
	                  {
	                    "Item": {
	                      "Date": {
	                        "type": "datecontrol",
	                        "props": {
	                          "month": "",
	                          "day": "",
	                          "year": "",
	                          "estimated": false
	                        }
	                      },
	                      "Has": {
	                        "type": "branch",
	                        "props": {
	                          "value": "No"
	                        }
	                      },
	                      "Text": {
	                        "type": "textarea",
	                        "props": {
	                          "value": ""
	                        }
	                      }
	                    }
	                  }
	                ]
	              }
	            },
	            "Status": {
	              "type": "radio",
	              "props": {
	                "value": "FullTime"
	              }
	            },
	            "Supervisor": {
	              "type": "supervisor",
	              "props": {
	                "SupervisorName": {
	                  "type": "text",
	                  "props": {
	                    "value": "Gail Shannon"
	                  }
	                },
	                "Title": {
	                  "type": "text",
	                  "props": {
	                    "value": "Lead Analyst"
	                  }
	                },
	                "Email": {
	                  "type": "email",
	                  "props": {
	                    "value": "gail.shannon@testemail.gov"
	                  }
	                },
	                "EmailNotApplicable": {
	                  "type": "notapplicable",
	                  "props": {
	                    "applicable": true
	                  }
	                },
	                "Address": {
	                  "type": "location",
	                  "props": {
	                    "layout": "Address",
	                    "street": "345 NATIONAL RD",
	                    "city": "WHEELING",
	                    "state": "WV",
	                    "zipcode": "26003",
	                    "country": "United States"
	                  }
	                },
	                "Telephone": {
	                  "type": "telephone",
	                  "props": {
	                    "timeOfDay": "Both",
	                    "type": "Domestic",
	                    "numberType": "",
	                    "number": "3163170345",
	                    "extension": "067",
	                    "noNumber": false
	                  }
	                }
	              }
	            },
	            "Telephone": {
	              "type": "telephone",
	              "props": {
	                "timeOfDay": "Both",
	                "type": "Domestic",
	                "numberType": "",
	                "number": "3163170345",
	                "extension": "",
	                "noNumber": false
	              }
	            },
	            "Title": {
	              "type": "text",
	              "props": {
	                "value": "Analyst"
	              }
	            }
	          }
	        }
	      ]
	    }
	  },
	  "EmploymentRecord": {
	    "type": "branch",
	    "props": {
	      "value": "No"
	    }
	  }
	}
}
`

// HistEducationDegrees has several degree entries.
const HistEducationDegrees = `
{
  "type": "history.education",
  "props": {
    "HasAttended": {
      "type": "branch",
      "props": {
        "value": "No"
      }
    },
    "HasDegree10": {
      "type": "branch",
      "props": {
        "value": "Yes"
      }
    },
    "List": {
      "type": "collection",
      "props": {
        "items": [
          {
            "Item": {
              "Dates": {
                "type": "daterange",
                "props": {
                  "from": {
                    "type": "datecontrol",
                    "props": {
                      "month": "7",
                      "day": "1",
                      "year": "2017",
                      "estimated": false,
                      "date": "2017-07-01T00:00:00Z"
                    }
                  },
                  "to": {
                    "type": "datecontrol",
                    "props": {
                      "month": "7",
                      "day": "25",
                      "year": "2017",
                      "estimated": false,
                      "date": "2017-07-25T00:00:00Z"
                    }
                  },
                  "present": false
                }
              },
              "Type": {
                "type": "radio",
                "props": {
                  "value": "College"
                }
              },
              "Name": {
                "type": "text",
                "props": {
                  "value": "my name"
                }
              },
              "Address": {
                "type": "location",
                "props": {
                  "layout": "Address",
                  "street": "123 Some Rd",
                  "street2": "",
                  "city": "Arlington",
                  "state": "VA",
                  "zipcode": "22202",
                  "county": "",
                  "country": "United States",
                  "validated": false
                }
              },
              "Comments": {
                "type": "textarea",
                "props": {
                  "value": "my comments"
                }
              },
              "ReferenceName": {
                "type": "name",
                "props": {
                  "first": "John",
                  "firstInitialOnly": false,
                  "last": "Smith",
                  "middle": "H",
                  "middleInitialOnly": true,
                  "noMiddleName": false,
                  "suffix": "Other",
                  "suffixOther": "XX"
                }
              },
              "ReferenceNameNotApplicable": {
                "type": "notapplicable",
                "props": {
                  "applicable": true
                }
              },
              "ReferencePhone": {
                "type": "telephone",
                "props": {
                  "timeOfDay": "Both",
                  "type": "Domestic",
                  "numberType": "",
                  "number": "2128675309",
                  "extension": "",
                  "noNumber": false
                }
              },
              "ReferenceEmail": {
                "type": "email",
                "props": {
                  "value": "test@abc.com"
                }
              },
              "ReferenceEmailNotApplicable": {
                "type": "notapplicable",
                "props": {
                  "applicable": true
                }
              },
              "ReferenceAddress": {
                "type": "location",
                "props": {
                  "layout": "Address",
                  "street": "123 Some Rd",
                  "street2": "",
                  "city": "Arlington",
                  "state": "VA",
                  "zipcode": "22202",
                  "county": "",
                  "country": "United States",
                  "validated": false
                }
              },
              "Diplomas": {
                "type": "collection",
                "props": {
                  "branch": {
                    "type": "branch",
                    "props": {
                      "value": ""
                    }
                  },
                  "items": [
                    {
                      "Item": {
                        "Has": {
                          "type": "branch",
                          "props": {
                            "value": "Yes"
                          }
                        },
                        "Diploma": {
                          "type": "radio",
                          "props": {
                            "value": "Other"
                          }
                        },
                        "DiplomaOther": {
                          "type": "text",
                          "props": {
                            "value": "other type of degree"
                          }
                        },
                        "Date": {
                          "type": "datecontrol",
                          "props": {
                            "month": "7",
                            "day": "25",
                            "year": "2017",
                            "estimated": false,
                            "date": "2017-07-25T00:00:00Z"
                          }
                        }
                      },
                      "Item": {
                        "Has": {
                          "type": "branch",
                          "props": {
                            "value": "No"
                          }
                        }
                      }
                    }
                  ]
                }
              }
            }
          }
        ],
        "branch": {
          "type": "branch",
          "props": {
            "value": "No"
          }
        }
      }
    }
  }
}
`
