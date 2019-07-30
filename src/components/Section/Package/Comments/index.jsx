import React from 'react'
import { Branch, Show, Field, Textarea } from 'components/Form'

const PackageComments = (props) => {
  const { HasComments, Comments, required } = props

  const updateBranch = (values) => {
    console.log('update branch', values)
  }

  const updateComments = (values) => {
    console.log('update comments', values)
  }

  return (
    <div className="section-content">
      <h1 className="section-header">
        Additional Comments
      </h1>
      <Branch
        name="has_comments"
        label="Do you have additional comments to provide about any of the information you provided?"
        labelSize="h4"
        warning={true}
        required={required}
        onUpdate={updateBranch}
      />
      <Show when={HasComments.value === 'Yes'}>
        <Field
          title="Use the space below to continue your responses from previous sections and provide any other information you would like to add."

        >
          <label>
            Please identify the number and title of the relevant section and question before each comment.
          </label>
          <Textarea
            name="Comments"
            {...Comments}
            required={required}
            onUpdate={updateComments}
          />
        </Field>
      </Show>
    </div>
  )
}

PackageComments.defaultProps = {
  HasComments: { value: 'Yes' },
}

export default PackageComments
