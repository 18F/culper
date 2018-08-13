import React from 'react'
import FileSaver from 'file-saver'
import { connect } from 'react-redux'
import { i18n, env } from '../../../config'
import { api } from '../../../services'
import SectionElement from '../SectionElement'
import { Show, Field, Text, RadioGroup, Radio, Svg } from '../../Form'

export default class Attachments extends SectionElement {
  constructor(props) {
    super(props)
    this.state = {
      attachments: [],
      errorMessage: this.props.errorMessage
    }

    this.supportsBlobs = false
    try {
      this.supportsBlobs = !!new window.Blob()
    } catch (e) {
      this.supportsBlobs = false
    }

    this.update = this.update.bind(this)
    this.updateAttachmentType = this.updateAttachmentType.bind(this)
    this.updateUploadDescription = this.updateUploadDescription.bind(this)
    this.updateOtherMethod = this.updateOtherMethod.bind(this)
    this.uploadFile = this.uploadFile.bind(this)
    this.delete = this.delete.bind(this)
    this.getStoredAttachments = this.getStoredAttachments.bind(this)
    this.displayAttachments = this.displayAttachments.bind(this)
  }

  componentDidMount() {
    this.getStoredAttachments()
  }

  update(queue) {
    this.props.onUpdate({
      AttachmentType: this.props.AttachmentType,
      UploadDescription: this.props.UploadDescription,
      OtherMethod: this.props.OtherMethod,
      ...queue
    })
  }

  updateAttachmentType(values) {
    this.update({ AttachmentType: values })
  }

  updateUploadDescription(values) {
    this.update({ UploadDescription: values })
  }

  updateOtherMethod(values) {
    this.update({ OtherMethod: values })
  }

  uploadFile(event) {
    const set = attachment => {
      // reset the file input
      this.refs.form.reset()

      // add the attachment
      const attachments = this.state.attachments
      attachments.push(attachment)
      this.setState({ attachments: attachments, errorMessage: '' }, () => {
        // clear out description value
        this.updateUploadDescription({ value: '' })
      })
    }

    const description = (this.props.UploadDescription || {}).value
    const file = this.refs.file.files[0]
    let formData = new window.FormData()
    formData.append('file', file)

    api
      .saveAttachment(formData)
      .then(response => {
        const attachmentID = response.data || 0
        if (attachmentID === 0) {
          return
        }
        if (!description) {
          set({
            id: attachmentID,
            filename: file.name,
            size: file.size,
            description: description
          })
          return
        }
        api
          .updateAttachment(attachmentID, description)
          .then(response => {
            set({
              id: attachmentID,
              filename: file.name,
              size: file.size,
              description: description
            })
          })
          .catch(() => {
            this.setState({
              errorMessage: i18n.t(
                'application.attachments.upload.error.update'
              )
            })
          })
      })
      .catch(() => {
        this.setState({
          errorMessage: i18n.t('application.attachments.upload.error.save')
        })
      })
    event.preventDefault()
  }

  download(id) {
    if (!this.supportsBlobs) {
      return
    }

    const attachment = this.state.attachments.find(x => x.id === id)
    api
      .getAttachment(id)
      .then(response => {
        const blob = blobFromBase64(response.data, 'application/octet-stream')
        FileSaver.saveAs(blob, attachment.filename)
      })
      .catch(() => {
        this.setState({
          errorMessage: i18n.t('application.attachments.upload.error.download')
        })
      })
  }

  delete(id) {
    api
      .deleteAttachment(id)
      .then(response => {
        let attachments = this.state.attachments
        attachments = attachments.filter(x => x.id !== id)
        this.setState({ attachments: attachments, errorMessage: '' })
      })
      .catch(() => {
        this.setState({
          errorMessage: i18n.t('application.attachments.upload.error.delete')
        })
      })
  }

  getStoredAttachments() {
    api.listAttachments().then(response => {
      this.setState({ attachments: response.data || [], errorMessage: '' })
    })
  }

  displayAttachments(items) {
    return items.map((x, i) => {
      return (
        <tr key={`attachment-${x.id}`}>
          <td>
            <Show when={this.supportsBlobs}>
              <a
                href="javascript:;;"
                aria-label={`Download ${x.filename}`}
                onClick={this.download.bind(this, x.id)}>
                <strong>
                  {`${i + 1}. `}
                  {x.description ? `${x.description} - ` : ''}
                </strong>
                {x.filename}
              </a>
            </Show>
            <Show when={!this.supportsBlobs}>
              <strong>
                {`${i + 1}. `}
                {x.description ? `${x.description} - ` : ''}
              </strong>
              {x.filename}
            </Show>
          </td>
          <td>
            <button onClick={this.delete.bind(this, x.id)}>
              <i className="fa fa-trash" aria-hidden="true" />
              <span>
                {i18n.t('application.attachments.upload.files.remove')}
              </span>
            </button>
          </td>
        </tr>
      )
    })
  }

  limits() {
    const fileMax = env.FileMaximumSize()

    const fileTypes = env.FileTypes()
    fileTypes[fileTypes.length - 1] = `or ${fileTypes[fileTypes.length - 1]}`

    const message = i18n
      .t('application.attachments.upload.limits')
      .replace('{types}', fileTypes.join(', '))
      .replace('{max_size}', humanReadableFileSize(fileMax))

    return (
      <p>
        <strong>{message}</strong>
      </p>
    )
  }

  render() {
    return (
      <div className="attachments">
        <Field
          title={i18n.t('application.attachments.method.title')}
          help="application.attachments.help"
          className="attachment-type"
          optional={true}>
          {i18n.m('application.attachments.method.para')}
          <RadioGroup
            className="attachment-type option-list eapp-extend-labels"
            onError={this.props.onError}
            selectedValue={(this.props.AttachmentType || {}).value}>
            <Radio
              name="attachment-type-upload"
              label={i18n.m('application.attachments.type.upload')}
              value="Upload"
              onUpdate={this.updateAttachmentType}
              onError={this.props.onError}>
              <div className="attachment-icon upload">
                <Svg src="/img/attach-upload.svg" />
              </div>
            </Radio>
            <Radio
              name="attachment-type-fax"
              label={i18n.m('application.attachments.type.fax')}
              value="Fax"
              onUpdate={this.updateAttachmentType}
              onError={this.props.onError}>
              <div className="attachment-icon fax">
                <Svg src="/img/attach-fax.svg" />
              </div>
            </Radio>
            <Radio
              name="attachment-type-other"
              label={i18n.m('application.attachments.type.other')}
              value="Other"
              onUpdate={this.updateAttachmentType}
              onError={this.props.onError}>
              <div className="attachment-icon mail">
                <Svg src="/img/attach-mail.svg" />
              </div>
            </Radio>
          </RadioGroup>
        </Field>

        <Show when={(this.props.AttachmentType || {}).value === 'Upload'}>
          <Field
            title={i18n.t('application.attachments.upload.title')}
            optional={true}
            className={
              this.state.errorMessage
                ? 'no-margin-bottom upload-area'
                : 'upload-area'
            }>
            {i18n.m('application.attachments.upload.para')}
            {this.limits()}
            <form ref="form">
              <input id="file-upload" ref="file" type="file" />
            </form>
            <Text
              {...this.props.UploadDescription}
              name="UploadDescription"
              label={i18n.t('application.attachments.upload.description')}
              onUpdate={this.updateUploadDescription}
              onError={this.props.onError}
            />
            <button onClick={this.uploadFile}>
              {i18n.t('application.attachments.upload.send')}
            </button>
          </Field>

          <Show when={this.state.errorMessage}>
            <div className="field upload-error">
              <div className="table expand">
                <span className="messages error-messages">
                  <div className="message error">
                    <i className="fa fa-exclamation" />
                    <h3>
                      {i18n.t('application.attachments.upload.error.title')}
                    </h3>
                    <p>{this.state.errorMessage}</p>
                  </div>
                </span>
              </div>
            </div>
          </Show>

          <Show when={this.state.attachments.length > 0}>
            <Field
              title={i18n.t('application.attachments.upload.files.title')}
              optional={true}>
              {i18n.m('application.attachments.upload.files.para')}
              <table>
                <tbody>{this.displayAttachments(this.state.attachments)}</tbody>
              </table>
            </Field>
          </Show>
        </Show>

        <Show when={(this.props.AttachmentType || {}).value === 'Fax'}>
          <Field
            title={i18n.t('application.attachments.fax.title')}
            optional={true}
            className="fax-area">
            {i18n.m('application.attachments.fax.para')}
            <button>{i18n.t('application.attachments.fax.print')}</button>
          </Field>
        </Show>

        <Show when={(this.props.AttachmentType || {}).value === 'Other'}>
          <Field
            title={i18n.t('application.attachments.other.title')}
            optional={true}
            className="other-area">
            {i18n.m('application.attachments.other.para')}
            <Text
              {...this.props.OtherMethod}
              name="OtherMethod"
              label={i18n.t('application.attachments.other.method')}
              onUpdate={this.updateOtherMethod}
              onError={this.props.onError}
            />
          </Field>
        </Show>
      </div>
    )
  }
}

Attachments.defaultProps = {
  errorMessage: '',
  AttachmentType: {},
  UploadDescription: {},
  OtherMethod: {},
  section: 'releases',
  subsection: 'attachments',
  onUpdate: queue => {},
  onError: (value, arr) => {
    return arr
  }
}

const humanReadableFileSize = (bytes, si = true) => {
  const threshold = si ? 1000 : 1024
  if (Math.abs(bytes) < threshold) {
    return `${bytes} B`
  }

  const units = si
    ? ['kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
    : ['KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB']
  let u = -1
  do {
    bytes /= threshold
    u++
  } while (Math.abs(bytes) >= threshold && u < units.length - 1)

  return `${bytes.toFixed(1)} ${units[u]}`
}

const blobFromBase64 = (base64, contentType = '', size = 512) => {
  const binary = window.atob(base64)
  const buffer = []
  for (let offset = 0; offset < binary.length; offset += size) {
    let slice = binary.slice(offset, offset + size)
    let numbers = new Array(slice.length)
    for (let i = 0; i < slice.length; i++) {
      numbers[i] = slice.charCodeAt(i)
    }
    buffer.push(new Uint8Array(numbers))
  }
  return new window.Blob(buffer, { type: contentType })
}
