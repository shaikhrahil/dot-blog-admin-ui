import {EditorQuoteBlock} from 'models'
import React from 'react'
import styled from 'styled-components'

const Quote = styled.blockquote``

export const QuoteBlock = (props: EditorQuoteBlock) => {
  return (
    <div className="block-quote">
      <Quote>{props.text}</Quote>
      <p className="author"> {props.caption} </p>
    </div>
  )
}
