# SF-86 test scenarios

Multiple test scenarios in JSON format are archived under:
[`api/testdata/complete-scenarios`](../api/testdata/complete-scenarios)

The `test*.json` files contain the same JSON structures that the user interface generates and saves to the database. Each file represents a complete, valid SF-86 application that can be loaded into eApp and submitted to e-QIP, or other downstream investigation system.

The automated test code in [`api/xml/xml_test.go`](../api/xml/xml_test.go) generates SF-86 XML from the JSON files and compares the output with the known-good `test*.xml` file. All the XML test fixtures have been validated against the e-QIP XML Schema Definition (XSD) files and have been successfully submitted to e-QIP. 

In addition to the XSD validation and automated e-QIP service validation, the content of test cases 2,3,4,5,7,8,9 have been manually reviewed by an OPM user acceptance testing (UAT) team after submission to e-QIP (Fall 2018). For a description of each test scenario, see the comments for the corresponding unit tests in [`xml_test.go`](../api/xml/xml_test.go).

## Prerequisites

* Access to [e-QIP API and SF-86 XSDs](https://drive.google.com/open?id=1XMm8ZiKANYDoDL63DshXChpLqbHdEsLH) **not approved for public release**
* Access to [OPM Validation Matrix](https://drive.google.com/open?id=1m1MNu7D0E39gHUSjqyHzt1infWNMlkbI) **not approved for public release**
* Run `make build-cmd` to build `api/bin/form`, `api/bin/load-scenario`, and `api/bin/submit`.

## Maintaining existing test JSON files

As the internal JSON data structures within the form are modified over time, the `api/testdata/complete-scenarios/test*.json` files should be modified accordingly, so that they continuously reflect how the frontend serializes the form content to the api backend.

After an update to a scenario file, re-run `make test-go`. If a scenario test fails, as in the example below:
```
--- FAIL: TestScenario1 (0.08s)
  xml_test.go:334: Generated XML `testdata/complete-scenarios/test1.xml.713758700` does not match reference XML for `test1`
```
use `diff` to inspect the differences and validate that the change is expected:
```
$ pushd api/testdata/complete-scenarios
$ diff -u test1.xml test1.xml.713758700
```
If the differences in the XML match expectations and are consistent with the [e-QIP SF-86 Incoming XSDs](https://drive.google.com/drive/folders/1SDCa2LxlzEmNn6uHhnVYfIQYPt8esOmk) and guidance in the [OPM Validation Matrix](https://drive.google.com/open?id=1m1MNu7D0E39gHUSjqyHzt1infWNMlkbI), update the known-good XML test fixture:
```
$ mv test1.xml.713758700 test1.xml
```

In the absence of mechanisms to automatically:
1. revalidate the XML test fixtures against the e-QIP XSDs, and 
1. resubmit them to the e-QIP direct test instance
these steps must be done manually for any significant change to a known-good XML test fixture. See below.

## Validate XML against e-QIP XSDs

1. Download the [e-QIP SF-86 Incoming XSDs](https://drive.google.com/drive/folders/1SDCa2LxlzEmNn6uHhnVYfIQYPt8esOmk). **These files have not been approved for release.**
1. Install the `xmllint` tool. On RedHat Enterprise Linux or CentOS, this is in `libxml2` package: `yum install libxml2`.
1. Execute against `SF86_2017-07_ImportFormat.xsd`:
```
$ cd e-QIP_SF86_2017-07_Incoming_Schema_2017_05_10_17_29
$ xmllint --noout --schema Incoming/SF86_2017-07_ImportFormat.xsd PATH-TO-TEST-SCENARIOS/test1.xml
```

If the XML file validates, then `xmllint` output will be:
```
PATH-TO-TEST-SCENARIOS/test1.xml validates
```

The e-QIP XSD is very permissive – `minOccurs=0` is on almost every element. Validation against it is necessary, but not sufficient to determine if the XML file is valid (i.e., will be accepted by e-QIP).
 

## Submiting XML to e-QIP direct test connection

While not used for production workflows, eApp contains test code that can generate and submit SF-86 XML to the e-QIP web service API. This is used to verify eApp XML generation, using the complete scenarios (`api/testdata/complete-scenarios/test*.json`). e-QIP has extensive validation logic, ensuring the submitted XML is consistent with business rules and policies and does not have extraneous XPaths.

It should be noted that in general, the SF-86 PDF form, the OPM validation matrix, and the e-QIP implementation are all consistent with each other. However, deviations occur, and in the end, what e-QIP flags or accepts is the ultimate source of truth guiding eApp implementation, at least for the SF-86, and so long as e-QIP is part of the investigation process downstream of eApp.

### Related e-QIP terminology

* eApp collects form data for an *incoming investigation request*
* Requests are sent to e-QIP by a *submitting agency*; i.e., the government agency making the web service call (the "caller"). See `WS_CALLERINFO*` configuration variables in eApp.
* Requests are directed to a particular *investigation service provider (ISP)* and group. See `WS_AGENCY*` configuration variables in eApp.

### `submit` tool

To submit SF-86 XML to the e-QIP test service, use the `api/bin/submit` tool. It takes a specified JSON test scenario, generates the corresponding SF-86 XML, and makes the e-QIP SOAP call. It is built through the top-level `make build-cmd`.

`submit` requires that the following environment variables be set in its execution environment (i.e., shell):

* [WS_URL](https://github.com/18F/e-QIP-prototype/blob/develop/docs/CONFIGURATION.md#ws_url)
* [WS_KEY](https://github.com/18F/e-QIP-prototype/blob/develop/docs/CONFIGURATION.md#ws_key)
* [WS_CALLERINFO_AGENCY_ID](https://github.com/18F/e-QIP-prototype/blob/develop/docs/CONFIGURATION.md#ws_callerinfo_agency_id)
* [WS_CALLERINFO_AGENCY_USER_SSN](https://github.com/18F/e-QIP-prototype/blob/develop/docs/CONFIGURATION.md#ws_callerinfo_agency_user_ssn)
* [WS_CALLERINFO_AGENCY_USER_PSEUDOSSN](https://github.com/18F/e-QIP-prototype/blob/develop/docs/CONFIGURATION.md#ws_callerinfo_agency_user_pseudossn)
* [WS_AGENCY_ID](https://github.com/18F/e-QIP-prototype/blob/develop/docs/CONFIGURATION.md#ws_agency_id)
* [WS_AGENCY_GROUP_ID](https://github.com/18F/e-QIP-prototype/blob/develop/docs/CONFIGURATION.md#ws_agency_group_id)

For our purposes, `WS_CALLERINFO_AGENCY_USER_PSEUDOSSN` must always be set to `0`. For appropriate values for the other configuration values and network restrictions, see:
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


## Generating new test JSON files

1. Sign into eApp with one of the test accounts (e.g., `test01`). 
1. Populate the form with a scenario, ensuring that it passes eApp validation.
1. Export the application data using `form`, specifying the same account and replacing `CONTAINERID` with the container id for the API backend. When prompted for a URL, specify `http://localhost:3000` or `https://localhost:3000`, depending if you have configured HTTPS.
```
docker exec -it CONTAINERID bin/form output.json
```


Note: The files in [`api/testdata/complete-scenarios`](../api/testdata/complete-scenarios) have been formated with the `jq` tool.

## Loading existing test JSON files

1. Clear the database of existing form data using `purge-all-user-data.sql`, replacing `CONTAINERID` with the container id for PostgreSQL. This will purge **ALL** user form data, but leave accounts and passwords intact. All accounts are unlocked.
```
docker cp api/bin/purge-all-user-data.sql CONTAINERID:/tmp
docker exec --user postgres -it CONTAINERID psql -f /tmp/purge-all-user-data.sql
```

2. Load a test file with `load-scenario`, specifying one of the test accounts (e.g., `test01`) and replacing `CONTAINERID` with the container id for the API backend. When prompted for a URL, specify `http://localhost:3000` or `https://localhost:3000`, depending if you have configured HTTPS.
```
docker exec -it CONTAINERID bin/load-scenario testdata/complete-scenarios/test1.json
```
