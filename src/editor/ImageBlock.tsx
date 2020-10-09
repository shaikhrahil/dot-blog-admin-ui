import {EditorImageBlock} from 'models'
import React from 'react'
import {classNames} from 'utils'

export const ImageBlock = (props: EditorImageBlock) => {
  return (
    <div
      className={classNames({
        'block-image': true,
        'full-width': props.stretched,
        bordered: props.withBorder,
        'with-bg': props.withBackground,
      })}
    >
      <div className="image">
        <img src={props.url} width="100%" alt={props.caption || props.url} />
      </div>
      <span className="caption">
        Photo By
        <a target="_blank" rel="noopener noreferrer" href={props.unsplash?.profileLink}>
          {props.unsplash?.author}
        </a>
      </span>
      <span className="caption"> {props.caption} </span>
    </div>
  )
}
