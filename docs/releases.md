# Releases

## Versioning nomenclature

Versions of this project are intended to align with the NBIS program increment (PI) cycle, where at the end of a PI, a major release of NBIS is prepared for release. For PI4, the NBIS program designated that as `2.1.0`. For PI5, it is `2.2.0`.

Each PI has a series of numbered sprints, laid out according to a master schedule distributed across the program. For example, in PI5, you have sprint 5.1, 5.2, 5.3, etc. 

While the intent of each sprint is to produce a potentially shippable release, it is not necessarily the offical, coordinated NBIS program release, so we designate each end-of-sprint tag as a "preview".

The convention for each tag is:
`v${PROGRAM_INCREMENT_VERSION}-preview.${SPRINT-NUMBER}`

For an official, coordinated NBIS program release, hypothetically the most recent tag for that PI could be re-tagged as simply `v${PROGRAM_INCREMENT_VERSION}`.


## Tagging the release

Tagging process:

```
git checkout develop
git checkout -b release-xxx (e.g., release-106)
git tag vx.x.x (e.g., v1.0.6)
git push origin vx.x.x
git push origin release-xxx
```

Once tagged, go to GitHub:

- Click `New pull request`
- Change base to `master`, set compare to `release-xxx`
- Create pull request
- Review commits you may not have had an opportunity to review during the sprint.
- Wait for tests to finish running
- Merge, delete branch

## Creating the release

- Go to Releases tab from main page.
- Create new release, type in the tag name – v1.0.6. It will appear in drop down. (i.e., you won't be creating it in this UI, you wont specify any particular branch)
- Type in release notes (see other releases for template). You can get a template by going to previous release and click Edit, then copy the text there. Keep the highlights high-level, consolidating similar tickets into a basic description.

## Closing out the sprint

At the end of the sprint, on the sprint project page:

- Ensure that all cards in `To Do` are moved to next sprint or removed from the project.
- Ensure that all cards In Progress are moved to next sprint, then moved to In Progress from To Do
- Close sprint project (via hamburger menu on far right)

## Announce the release

Once you publish the release, post an announcement to the `#acq-eqip-partners` channel, tagging the appropriate folks. The announcement has a link to the release on GitHub, and the release notes.
