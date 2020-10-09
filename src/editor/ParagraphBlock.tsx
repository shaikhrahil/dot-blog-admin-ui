import {EditorParagraphBlock} from 'models'
import React from 'react'

export const ParagraphBlock = (props: EditorParagraphBlock) => {
  return <p>{props.text}</p>
}
