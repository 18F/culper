# SF-86 test scenarios

Multiple test scenarios in JSON format are archived under:
[`api/testdata/complete-scenarios`](../api/testdata/complete-scenarios)

The `test*.json` files contain the same JSON structures that the user interface generates and saves to the database. Each file represents a complete, valid SF-86 form that can be loaded into eApp and submitted to e-QIP, or other downstream investigation systems.

The automated test code in [`api/xml/xml_test.go`](../api/xml/xml_test.go) generates SF-86 XML from the JSON files and compares the output with corresponding, known-good `test*.xml` files. All of these XML test fixtures have been validated against the e-QIP XML Schema Definition (XSD) files and have been successfully submitted to e-QIP.

In addition to automated XSD and e-QIP service validation, the content of test cases 2,3,4,5,7,8,9 have been manually reviewed by an OPM user acceptance testing (UAT) team after submission to e-QIP (Fall 2018). For a description of each test scenario, see the comments for the corresponding unit tests in [`xml_test.go`](../api/xml/xml_test.go). It is recommended that the scope and intent of the manually reviewed test cases remain as-is. Data that tests additional aspects of the form are best addressed in a new test case, or in test case 6.

Additional documentation is published on an [internal wiki](https://docs.google.com/document/d/1q8uvcc4S9gql4cr8LEJt5wy36Db75e37qzpzJYyGi-w).


## Prerequisites

* Access to [e-QIP API and SF-86 XSDs](https://drive.google.com/open?id=1XMm8ZiKANYDoDL63DshXChpLqbHdEsLH). *These files are not approved for public release.*
* Access to [OPM Validation Matrix](https://drive.google.com/open?id=1m1MNu7D0E39gHUSjqyHzt1infWNMlkbI). *This file is not approved for public release.*
* Run `make build-cmd` to build `api/bin/form`, `api/bin/load-scenario`, and `api/bin/submit`.

## Maintaining existing test JSON files

As the internal JSON data structures within the form are modified over time, the `api/testdata/complete-scenarios/test*.json` files should be modified accordingly, so that they continuously reflect how the frontend serializes the form content to the api backend.

After an update to a scenario file is made, re-run `make test-go`. If a scenario test fails, as in the example below:
```
--- FAIL: TestScenario1 (0.08s)
  xml_test.go:334: Generated XML `testdata/complete-scenarios/test1.xml.713758700` does not match reference XML for `test1`
```
use `diff` to inspect the differences and validate that the XML change is expected:
```
$ pushd api/testdata/complete-scenarios
$ diff -u test1.xml test1.xml.713758700
```
If the differences in the XML match expectations and are consistent with the [e-QIP SF-86 Incoming XSDs](https://drive.google.com/drive/folders/1SDCa2LxlzEmNn6uHhnVYfIQYPt8esOmk) and guidance in the [OPM Validation Matrix](https://drive.google.com/open?id=1m1MNu7D0E39gHUSjqyHzt1infWNMlkbI), update the known-good XML test fixture:
```
$ mv test1.xml.713758700 test1.xml
```

For any significant change to a known-good XML test fixture, it should also be revalidated against:
1. the e-QIP XSDs, and
1. the e-QIP direct test instance

Currently, these revalidation steps must be done manually given the public nature of our GitHub repo and logistics of our use of CircleCI. See below.

### Golden Files

The integration tests treat the JSON testdata files as "golden files". For example, the series of tests in the save_section_test.go file go through each of the individual section json files, save it, and then confirm that what was received back is the same as what was originally sent. To make updating these files easier in the future, there is a `-update-golden` flag that can be passed into a `go test` invocation. When passed, instead of checking that the response is the same as what was sent, it will instead write the response to the file instead. The next run of the tests should then pass since the "golden" file will have been updated. This is intended to make it easier to make changes to the JSON format and quickly update all the tests to match.

### Maintenance challenges

#### Dates and the passing of time
Test scenarios have **a lot** of dates and date ranges. e-QIP and the SF-86, SF-85, SF-85p have a lot of conditional rules surrounding dates. This causes a valid test scenario to eventually become invalid simply through the passing of time. For example:

1. An applicant cannot be over 100 years old. A test scenario written in 2018 with a 99-year-old applicant will become invalid sometime in 2019.
1. Residences within 3 years must have a verifier. Additionally, e-QIP will reject an application if it has verifier information for residences greater than 3 years in the past. A test scenario written in 2018, with a residence entry ending in 2016 will become invalid sometime in 2019 (e.g., `test9.json`).

Currently, test scenarios are manually updated after a failure in regular validation testing.

## Validate XML against e-QIP XSDs

1. Download the [e-QIP SF-86 Incoming XSDs](https://drive.google.com/drive/folders/1SDCa2LxlzEmNn6uHhnVYfIQYPt8esOmk).
1. Install the `xmllint` tool. On RedHat Enterprise Linux or CentOS, this is in the `libxml2` package: `yum install libxml2`.
1. Execute against `SF86_2017-07_ImportFormat.xsd`, replacing `PATH-TO-TEST-SCENARIOS` as appropriate:
```
$ cd e-QIP_SF86_2017-07_Incoming_Schema_2017_05_10_17_29
$ xmllint --noout --schema Incoming/SF86_2017-07_ImportFormat.xsd PATH-TO-TEST-SCENARIOS/test1.xml
```

If the XML file validates, then `xmllint` output will be:
```
PATH-TO-TEST-SCENARIOS/test1.xml validates
```

The e-QIP XSDs are very permissive – the `minOccurs=0` attribute is on almost every element. Validation against it is necessary, but not sufficient to determine if the XML file is valid (i.e., will be accepted by e-QIP).


## Validate XML against e-QIP

While not used for production workflows, eApp contains test code that can generate and submit SF-86 XML to the e-QIP web service API. This is used to verify eApp XML generation, using the complete scenarios (`api/testdata/complete-scenarios/test*.json`) as input. e-QIP has extensive validation logic, ensuring the submitted XML is consistent with NBIB business rules and policies and does not have extraneous XPaths.

It should be noted that in general, the SF-86 PDF form, the OPM validation matrix, and the e-QIP implementation are all consistent with each other. However, deviations occur, and in the end, what e-QIP flags or accepts is the ultimate source of truth guiding eApp implementation, at least for the SF-86, and so long as e-QIP is part of the investigation process downstream of eApp.

### e-QIP terminology

Some e-QIP terminology knowledge is useful when interacting with the e-QIP web service:

* eApp collects form data for an *incoming investigation request*.
* Requests are sent to e-QIP by a *submitting agency*; i.e., the government agency making the web service call (the "caller"). See `WS_CALLERINFO*` [configuration variables](https://github.com/18F/e-QIP-prototype/blob/develop/docs/CONFIGURATION.md) in eApp.
* Requests are directed to a particular *investigation service provider (ISP)* and *group*. See `WS_AGENCY*` [configuration variables](https://github.com/18F/e-QIP-prototype/blob/develop/docs/CONFIGURATION.md) in eApp.

### `submit` tool

To submit SF-86 XML to the e-QIP test service, use the `api/bin/submit` tool from an approved network. It takes a specified JSON test scenario, generates the corresponding SF-86 XML, and makes the e-QIP SOAP call. It is built through the top-level `make build-cmd`.

`submit` requires that the following environment variables be set in its execution environment:

* [WS_URL](https://github.com/18F/e-QIP-prototype/blob/develop/docs/CONFIGURATION.md#ws_url)
* [WS_KEY](https://github.com/18F/e-QIP-prototype/blob/develop/docs/CONFIGURATION.md#ws_key)
* [WS_CALLERINFO_AGENCY_ID](https://github.com/18F/e-QIP-prototype/blob/develop/docs/CONFIGURATION.md#ws_callerinfo_agency_id)
* [WS_CALLERINFO_AGENCY_USER_SSN](https://github.com/18F/e-QIP-prototype/blob/develop/docs/CONFIGURATION.md#ws_callerinfo_agency_user_ssn)
* [WS_CALLERINFO_AGENCY_USER_PSEUDOSSN](https://github.com/18F/e-QIP-prototype/blob/develop/docs/CONFIGURATION.md#ws_callerinfo_agency_user_pseudossn)
* [WS_AGENCY_ID](https://github.com/18F/e-QIP-prototype/blob/develop/docs/CONFIGURATION.md#ws_agency_id)
* [WS_AGENCY_GROUP_ID](https://github.com/18F/e-QIP-prototype/blob/develop/docs/CONFIGURATION.md#ws_agency_group_id)

For our purposes, `WS_CALLERINFO_AGENCY_USER_PSEUDOSSN` must always be set to `0`. For appropriate values for the other configuration settings, plus network requirements for access, see:
https://docs.google.com/document/d/1q8uvcc4S9gql4cr8LEJt5wy36Db75e37qzpzJYyGi-w

A configuration file similar to one below can be useful and be read into the shell environment via `source`:
```
export WS_CALLERINFO_AGENCY_USER_PSEUDOSSN=0
export WS_URL=INSERT-URL-HERE
export WS_KEY=INSERT-FULL-PATH-TO-KEY-FILE
export WS_CALLERINFO_AGENCY_ID=INSERT-ID-HERE
export WS_CALLERINFO_AGENCY_USER_SSN=INSERT-SSN-HERE
export WS_AGENCY_ID=INSERT-ID-HERE
export WS_AGENCY_GROUP_ID=INSERT-ID-HERE
```

Example invocation:
```
$ pushd api
$ source /tmp/submit-config
$ bin/submit testdata/complete-scenarios/test1.json
```

If successful, `submit` output will look similar to:
```
submit: import into e-QIP successful: agencyKey=XXXXX, requestKey=XXXXX
```

(`requestKey` is the unique identifier that e-QIP assigns to the incoming investigation request.)

Finally, it should be noted that the `submit` tool does not currently generate nor submit any of the digital signature forms (e.g., medical release, general release, certification, credit release). These attachments to the incoming request are required if eApp was actually directly submitting requests to e-QIP in a true production workflow, but as the current use is limited to using the test e-QIP instance as an XML validation tool, that feature is no longer present.


## Generating new test JSON files

1. Sign into eApp with one of the test accounts (e.g., `test01`).
1. Populate the form with a scenario, ensuring that it passes eApp validation.
1. Export the application data using `form`, specifying the same account and replacing `CONTAINERID` with the container id for the API backend. When prompted for a URL, specify `http://localhost:3000` or `https://localhost:3000`, depending if you have configured HTTPS.
```
docker exec -it CONTAINERID bin/form output.json
```


Note: The files in [`api/testdata/complete-scenarios`](../api/testdata/complete-scenarios) have been formated with the `jq` tool.

## Loading existing test JSON files
1. Load a test file with `load-scenario`, specifying one of the test accounts (e.g., `test01`) and replacing `CONTAINERID` with the container id for the API backend. When prompted for a URL, specify `http://localhost:3000` or `https://localhost:3000`, depending if you have configured HTTPS.
```
docker exec -it CONTAINERID bin/load-scenario testdata/complete-scenarios/test1.json
```

## Clearing account data
1. You can use the `flush` script to delete all the application data for a given user. See [dev-tools](./dev-tools.md)
