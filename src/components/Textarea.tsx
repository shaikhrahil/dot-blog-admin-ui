import {useField} from 'formik'
import React, {ReactElement, TextareaHTMLAttributes} from 'react'
import styled from 'styled-components'
import {classNames} from 'utils'

const StyledTextarea = styled.textarea`
  width: calc(100% - 15px);
  max-width: 100%;
  padding: 15px;
  margin: 12px 5px;
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
    display: block;
  }
`

export function Textarea(props: TextareaHTMLAttributes<{}> & {name: string}): ReactElement {
  const [fields, meta] = useField(props)
  const error = !!(meta.touched && meta.error)
  return (
    <div>
      <StyledTextarea {...fields} placeholder={props.placeholder} className={classNames({error})} />
      {error && <label> {meta.error} </label>}
    </div>
  )
}
