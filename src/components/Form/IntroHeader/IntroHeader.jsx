import React from 'react'

export default function IntroHeader (props) {
  if (props.Errors && props.Errors.length > 0) {
    return (
      <h1>Looks like we have a few issues, here is how to fix them.</h1>
    )
  }

  if (props.Completed.status === 'neutral') {
    return (
      <div>
        <h1>Looks like you still have some items left, here is how to finish them.</h1>
      </div>
    )
  }

  if (props.Completed.status === 'completed') {
    return (
      <div>
        <div className="text-center"><i className="fa fa-check-circle"></i></div>
        <h1>Everything looks good here but you can still review your answers</h1>
      </div>
    )
  }

  return null
}
