import {EditorCodeBlock} from 'models'
import React, {useEffect, useRef} from 'react'
import hljs from 'highlight.js'
import 'highlight.js/styles/dracula.css' // import your preferred style

export const CodeBlock = (props: EditorCodeBlock) => {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (ref.current) {
      hljs.highlightBlock(ref.current)
    }
  })

  return (
    <div className="block-code">
      {/* <pre>
        <code ref={ref}>{props.code}</code>
      </pre> */}
      {/* {props.code} */}
      <pre>
        <code
          ref={ref}
          dangerouslySetInnerHTML={{
            __html: props.code,
          }}
        ></code>
      </pre>
    </div>
  )
}
