import {useField} from 'formik'
import React, {InputHTMLAttributes, ReactElement} from 'react'
import styled from 'styled-components'
import {classNames} from 'utils'

const StyledInput = styled.input`
  width: calc(100% - 15px);
  padding: 15px;
  margin: 15px 5px;
  :focus {
    outline: none;
  }
  ${({theme}) => theme.nm}
  &.error {
    margin: 12px 5px 0px 5px;
  }
  & + label {
    margin-left: 10px;
    font-size: 13px;
    font-weight: 500;
    color: ${({theme}) => theme.error};
  }
`

export function Input(props: InputHTMLAttributes<HTMLInputElement> & {name: string}): ReactElement {
  const [field, meta] = useField(props)
  const error = !!(meta.touched && meta.error)
  return (
    <>
      <StyledInput {...field} className={classNames({error})} placeholder={props.placeholder} />
      {error && <label> {meta.error} </label>}
    </>
  )
}
