# Review

  Overview of the general eApp pull request review process

## Requester

  Create your pull request via GitHub UI. Assign one to two members of the eApp team to review your code. Include as much detail as you feel is needed for reviewers to understand the fix. Be sure to include the note `Fixes #123` with the GitHub Issue id to make sure GitHub auto links the issue to the PR, and when the PR is merged it will close the linked ticket.

## Reviewer
### A) Review code changes

  Review code changes for style, naming, bugs, etc.

### B) Review change for DB effects

  Data model and database changes need to be handled well. Changes to data field names, structure, and other types of changes can cause data previously saved to fail to load in the UI resulting in blank screens. In light of this changes to the data model that is saved to the database or the database structure need to be supported in a backwards compatible fashion. Two choices are available.

#### Ensure old structure is migrated to new by a script

  To handle the data changes a migration should be done to update any old data in the database to the new format or column. This migration should be intended to be run once during the deploy process, and preferably have a script to undo the change if we need to roll back.

#### Ensure old structure is supported by code

  If the above is not possible then the code should be made to detect that the data loading is an older version, perhaps by checking for a data version field that contains the version of eApp that was used to save. If the data is old then the code can update the format and version and sent on. Ideally this would be good to do in the backend api before the frontend sees the issue.

### C) Verify in IE

  Download an instance of [Modern IE](https://developer.microsoft.com/en-us/microsoft-edge/tools/vms/) for the vm platform you have available. Currently eApp needs to be verified in at least IE 11 or newer.

#### VM Setup

  Once the vm is downloaded and started edit the `C:\Windows\system32\drivers\etc\hosts` file and add the following. Note the IP may change and can be verified by checking what the **Default Gateway** is when running `ipconfig` in the cmd prompt. Also you will need to replace **web** and **api** with what values you have in `.env` for **API\_REDIRECT** and **API\_BASE\_URL**

  > 10.0.2.2 api web

  Check the PR feature / bug fix works as expected in IE 11 is important as many government employees, e.g. our army pilot users, use IE 11 as their primary browser where as developers are commonly developing in Chrome or Firefox.
