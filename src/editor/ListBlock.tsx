import {EditorListBlock} from 'models'
import React, {ReactElement} from 'react'
import shortid from 'shortid'

interface Props {
  children: ReactElement[]
}

const Ordered = ({children}: Props) => {
  return <ol> {children} </ol>
}

const Unordered = ({children}: Props) => {
  return <ul> {children} </ul>
}

export const ListBlock = (props: EditorListBlock) => {
  const Wrapper = props.style === 'ordered' ? Ordered : Unordered
  return (
    <div>
      <Wrapper>
        {props.items.map((x) => (
          <li key={shortid()}> {x} </li>
        ))}
      </Wrapper>
    </div>
  )
}
