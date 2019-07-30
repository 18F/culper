/* eslint import/prefer-default-export: 0 */
import * as form from '../form'

export const comments = (data = {}) => ({
  HasComments: form.branch(data.HasComments),
  Comments: form.textarea(data.Comments),
})
