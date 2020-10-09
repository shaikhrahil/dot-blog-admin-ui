import {useField} from 'formik'
import React, {InputHTMLAttributes, ReactElement} from 'react'
import styled from 'styled-components'

export const StyledCheckbox = styled.input.attrs(() => ({
  type: 'checkbox',
}))`
  cursor: pointer;
  padding: 20px;
  border: none;
  margin: 12px 10px;
  outline: none;
  :focus {
    border: none;
    outline: none;
  }
  ${({theme}) => theme.nm}
  + label {
    cursor: pointer;
  }
`

export function Checkbox(props: InputHTMLAttributes<HTMLInputElement> & {name: string; label: string}): ReactElement {
  const [fields] = useField(props)
  return (
    <div>
      <StyledCheckbox {...fields} id={props.id} />
      <label htmlFor={props.id}> {props.label} </label>
    </div>
  )
}
