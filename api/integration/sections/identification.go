package sections

const IDOtherNamesNo = `
{
  "type": "identification.othernames",
  "props": {
    "HasOtherNames": {
      "type": "branch",
      "props": {
        "value": "No"
      }
    },
    "List": {
      "type": "collection",
      "props": {
        "branch": {
          "type": "branch",
          "props": {
            "value": ""
          }
        },
        "items": []
      }
    }
  }
}
`

const IDOtherNamesYes = `
{
  "type": "identification.othernames",
  "props": {
    "HasOtherNames": {
      "type": "branch",
      "props": {
        "value": "Yes"
      }
    },
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
              "DatesUsed": {
                "type": "daterange",
                "props": {
                  "from": {
                    "type": "datecontrol",
                    "props": {
                      "month": "01",
                      "day": "02",
                      "year": "1992",
                      "estimated": false
                    }
                  },
                  "to": {
                    "type": "datecontrol",
                    "props": {
                      "month": "01",
                      "day": "01",
                      "year": "1993",
                      "estimated": false
                    }
                  },
                  "present": false
                }
              },
              "MaidenName": {
                "type": "radio",
                "props": {
                  "value": "No"
                }
              },
              "Name": {
                "type": "name",
                "props": {
                  "first": "Kirk",
                  "firstInitialOnly": false,
                  "middle": "Enzo",
                  "middleInitialOnly": false,
                  "noMiddleName": false,
                  "last": "James",
                  "suffix": "",
                  "suffixOther": ""
                }
              },
              "Reason": {
                "type": "textarea",
                "props": {
                  "value": "For a good reason."
                }
              }
            }
          },
          {
            "Item": {
              "DatesUsed": {
                "type": "daterange",
                "props": {
                  "from": {
                    "type": "datecontrol",
                    "props": {
                      "month": "01",
                      "day": "01",
                      "year": "1996",
                      "estimated": false
                    }
                  },
                  "to": {
                    "type": "datecontrol",
                    "props": {
                      "month": "01",
                      "day": "01",
                      "year": "1997",
                      "estimated": false
                    }
                  },
                  "present": false
                }
              },
              "MaidenName": {
                "type": "radio",
                "props": {
                  "value": "No"
                }
              },
              "Name": {
                "type": "name",
                "props": {
                  "first": "Kirk",
                  "firstInitialOnly": false,
                  "middle": "Enzo",
                  "middleInitialOnly": false,
                  "noMiddleName": false,
                  "last": "Riker",
                  "suffix": "",
                  "suffixOther": ""
                }
              },
              "Reason": {
                "type": "textarea",
                "props": {
                  "value": "Another good reason."
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

const IDOtherNamesUnfinishedList = `
{
  "type": "identification.othernames",
  "props": {
    "HasOtherNames": {
      "type": "branch",
      "props": {
        "value": "Yes"
      }
    },
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
              "DatesUsed": {
                "type": "daterange",
                "props": {
                  "from": {
                    "type": "datecontrol",
                    "props": {
                      "month": "01",
                      "day": "02",
                      "year": "1992",
                      "estimated": false
                    }
                  },
                  "to": {
                    "type": "datecontrol",
                    "props": {
                      "month": "01",
                      "day": "01",
                      "year": "1993",
                      "estimated": false
                    }
                  },
                  "present": false
                }
              },
              "MaidenName": {
                "type": "radio",
                "props": {
                  "value": "No"
                }
              },
              "Name": {
                "type": "name",
                "props": {
                  "first": "Kirk",
                  "firstInitialOnly": false,
                  "middle": "Enzo",
                  "middleInitialOnly": false,
                  "noMiddleName": false,
                  "last": "James",
                  "suffix": "",
                  "suffixOther": ""
                }
              },
              "Reason": {
                "type": "textarea",
                "props": {
                  "value": "For a good reason."
                }
              }
            }
          },
          {
            "Item": {
              "DatesUsed": {
                "type": "daterange",
                "props": {
                  "from": {
                    "type": "datecontrol",
                    "props": {
                      "month": "01",
                      "day": "01",
                      "year": "1996",
                      "estimated": false
                    }
                  },
                  "to": {
                    "type": "datecontrol",
                    "props": {
                      "month": "01",
                      "day": "01",
                      "year": "1997",
                      "estimated": false
                    }
                  },
                  "present": false
                }
              },
              "MaidenName": {
                "type": "radio",
                "props": {
                  "value": "No"
                }
              },
              "Name": {
                "type": "name",
                "props": {
                  "first": "Kirk",
                  "firstInitialOnly": false,
                  "middle": "Enzo",
                  "middleInitialOnly": false,
                  "noMiddleName": false,
                  "last": "Riker",
                  "suffix": "",
                  "suffixOther": ""
                }
              },
              "Reason": {
                "type": "textarea",
                "props": {
                  "value": "Another good reason."
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
