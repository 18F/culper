# Frontend Roadmap

The following are efforts to refactor, clean up the code base, and improve user experience and reduce bugs.

|Project|Description|Status|Notes|
|-------|-----------|-----|------|
|Validation Refactor (Redux)|Consolidate validation rules for data structures in one place, store definitive valid status and error keys in Redux|95% complete|Some artifacts of this refactor remain in `src/validators` and can be cleaned up/deprecated as needed. See WIP branch `sr-finish-validation-migration` for some progress/direction on this.|
|Validation Refactor (UI)|Make error messages and UI consistent with validation status and errors stored in Redux|Not started|Because of the tightly coupled nature of the Form UI components, this project will be a significant undertaking that may require rewriting UI components, and should be planned out strategically.|
|i18next|Replace homegrown internationalization code with 3rd-party library|In progress|https://www.i18next.com/|
|luxon|Replace homegrown datetime handling code with 3rd-party library|In progress|https://moment.github.io/luxon/|
