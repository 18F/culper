import connectInput from 'components/Inputs/InputConnector'

import TextInput from 'components/Inputs/TextInput/TextInput'
import CheckboxInput from 'components/Inputs/CheckboxInput/CheckboxInput'
import SelectInput from 'components/Inputs/SelectInput/SelectInput'

const ConnectedTextInput = connectInput(TextInput, false)
const ConnectedCheckboxInput = connectInput(CheckboxInput, false)
const ConnectedSelectInput = connectInput(SelectInput, false)

const ConnectedTextFormField = connectInput(TextInput)
const ConnectedCheckboxFormField = connectInput(CheckboxInput)
const ConnectedSelectFormField = connectInput(SelectInput)

export {
  ConnectedTextInput,
  ConnectedCheckboxInput,
  ConnectedSelectInput,
  ConnectedTextFormField,
  ConnectedCheckboxFormField,
  ConnectedSelectFormField,
}
