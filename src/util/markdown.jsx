import React from 'react'
import ReactMarkdown from 'react-markdown'
import removeMd from 'remove-markdown'

const customRenderers = {
  link: (props, key) => {
    const { title, href, children } = props /* eslint react/prop-types: 0 */
    return (
      <a
        key={key}
        target="_blank"
        title={title || undefined}
        href={href}
        rel="noopener noreferrer"
      >
        {children}
      </a>
    )
  },
}

export const renderMarkdown = (text, key) => (
  <ReactMarkdown
    source={text}
    key={key}
    renderers={customRenderers}
  />
)

export const removeMarkdown = text => removeMd(text)
