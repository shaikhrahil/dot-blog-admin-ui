import EditorJS, {API} from '@editorjs/editorjs'
import {EditorConfig} from 'configs'

export enum LogLevels {
  VERBOSE = 'VERBOSE',
  INFO = 'INFO',
  WARN = 'WARN',
  ERROR = 'ERROR',
}

export const getEditorjsInstance = (holder: any, onChange: (api: API) => void = () => {}): EditorJS => {
  const instance = new EditorJS({
    holder,
    tools: EditorConfig,
    autofocus: true,
    placeholder: 'Write your story ...',
    logLevel: LogLevels.ERROR,
    onChange,
  })
  return instance
}
