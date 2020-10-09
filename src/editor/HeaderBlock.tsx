import {EditorHeaderBlock} from 'models'
import React from 'react'

export const HeaderBlock = (props: EditorHeaderBlock) => {
  return (
    <div className="block-header">
      <p className={`h${props.level}`}>{props.text}</p>
    </div>
  )
}
