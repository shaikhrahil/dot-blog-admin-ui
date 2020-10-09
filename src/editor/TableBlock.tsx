import {EditorTableBlock} from 'models'
import React from 'react'
import shortid from 'shortid'

export const TableBlock = (props: EditorTableBlock) => {
  console.log({props})
  return (
    <div className='block-table'>
      <table>
        <thead>
          <tr>
            {props.content[0].map((x) => (
              <td key={shortid()}>{x}</td>
            ))}
          </tr>
        </thead>
        <tbody>
          {(props.content.slice(1) || []).map((x) => (
            <tr key={shortid()}>
              {x.map((y) => (
                <td key={shortid()}> {y} </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
