import EditorJS from '@editorjs/editorjs'
import {EditorConfig} from 'configs'
import {useEffect, useRef} from 'react'

export enum LogLevels {
  VERBOSE = 'VERBOSE',
  INFO = 'INFO',
  WARN = 'WARN',
  ERROR = 'ERROR',
}

interface Props {
  holder: any
}

function useEditor({holder}: Props): [EditorJS] {
  console.log('Creating an instance !')
  const instance = useRef(
    new EditorJS({
      holder,
      tools: EditorConfig,
      autofocus: true,
      placeholder: 'Write your story ...',
      logLevel: LogLevels.ERROR,
    }),
  )
  useEffect(() => {
    const test = instance.current
    return () => {
      test.isReady.then(() => {
        console.log('Destroying instance')
        test.destroy()
      })
    }
  })
  return [instance.current]
}

export default useEditor
