import {EditorEmbedBlock} from 'models'
import React from 'react'

export const EmbedBlock = (props: EditorEmbedBlock) => {
  return (
    <div className="block-embed">
      <iframe src={props.embed} width={props.width} height={props.height}></iframe>
      <span className="caption"> {props.caption} </span>
    </div>
  )
}
