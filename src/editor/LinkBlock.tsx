import {EditorLinkBlock} from 'models'
import React from 'react'

export const LinkBlock = (props: EditorLinkBlock) => {
  return (
    <a className="block-link" target="_blank" rel="noopener noreferrer" href={props.link}>
      <div className="content">
        <p className="title">{props.meta.title}</p>
        <p className="description">{props.meta.description}</p>
      </div>
      {props.meta.image.url && (
        <div className="cover">
          <img src={props.meta.image.url} width="100%" alt={props.meta.title} />
        </div>
      )}
    </a>
  )
}
