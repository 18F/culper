import FormConstants from './FormConstants'

	export function handleUpdateForm(form) {
    return {
      type: FormConstants.UPDATE_FORM,
      form
    }
	}

	export function handleUpdateTotalSectionTotal(total) {
    return {
      type: FormConstants.UPDATE_SECTION_TOTAL,
      total
    }
	}

	export function handleUpdateCompletedSectionTotal(completed) {
    return {
      type: FormConstants.UPDATE_COMPLETED_SECTION_TOTAL,
      completed
    }
	}
