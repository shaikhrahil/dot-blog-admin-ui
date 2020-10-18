import {ChevronLeft, ChevronRight} from '@styled-icons/boxicons-regular'
import React, {ReactElement, useState} from 'react'
import styled from 'styled-components'
import {Button} from './Button'

const StyledCarousel = styled.div`
  position: relative;
  ${Button} {
    opacity: 0;
    transition: opacity 0.3s;
  }
  &:hover {
    ${Button} {
      opacity: 1;
    }
  }
  .left-button {
    position: absolute;
    left: -30px;
    top: 50%;
    transform: translateY(-50%);
    z-index: 1;
  }
  .right-button {
    position: absolute;
    right: -30px;
    top: 50%;
    transform: translateY(-50%);
    z-index: 1;
  }
`

interface Props {
  children: (index: number, setIndex?: (index: number) => void) => ReactElement
  max: number
}

export const Carousel = ({children, max}: Props) => {
  const [index, setIndex] = useState(0)
  const elements = children(index)
  return (
    <StyledCarousel>
      <Button className="left-button" onClick={() => setIndex(index - 1)} disabled={index === 0}>
        <ChevronLeft size="20px" />
      </Button>
      {elements}
      <Button className="right-button" onClick={() => setIndex(index + 1)} disabled={index === max - 1}>
        <ChevronRight size="20px" />
      </Button>
    </StyledCarousel>
  )
}
