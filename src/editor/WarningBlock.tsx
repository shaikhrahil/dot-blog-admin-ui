import {EditorWarningBlock} from 'models'
import React from 'react'

export const WarningBlock = (props: EditorWarningBlock) => {
  return (
    <div className="block-warning">
      <p className="title"> {props.title} </p>
      <p className="message"> {props.message} </p>
    </div>
  )
}
