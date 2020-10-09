import {EditorEmbedBlock} from 'models'
import React from 'react'

export const EmbedBlock = (props: EditorEmbedBlock) => {
  return <div>{JSON.stringify(props)}</div>
}
