/**
 * This file defines min/max limits for a person's birthdate based on their
 * relationship to the applicant.
 */
import { DateTime } from 'luxon'

const TODAY = DateTime.local()

export const DEFAULT_LATEST = TODAY
export const DEFAULT_EARLIEST = TODAY.minus({ years: 200 })

/**
 * Applicant birthdate must be:
 * - less than 130 years, 1 day ago
 * - more than 16 years ago
 */
export const SELF = {
  earliest: TODAY.minus({ years: 130, days: 1 }),
  latest: TODAY.minus({ years: 16 }),
}

/**
 * Applicant's parent birthdate must be:
 * - no more than 200 years ago
 * - older than the applicant
 */
export const PARENT = applicantBirthdate => ({
  earliest: DEFAULT_EARLIEST,
  latest: applicantBirthdate,
})

/**
 * Applicant's child birthdate must be:
 * - younger than the applicant
 * - not in the future
 */
export const CHILD = applicantBirthdate => ({
  earliest: applicantBirthdate,
  latest: DEFAULT_LATEST,
})

/**
 * Other person's birthdate must be:
 * - no more than 200 years ago
 * - not in the future
 */
export const OTHER = {
  earliest: DEFAULT_EARLIEST,
  latest: DEFAULT_LATEST,
}

export const DEFAULT_LIMITS = applicantBirthdate => ({
  earliest: applicantBirthdate || DEFAULT_EARLIEST,
  latest: DEFAULT_LATEST,
})
