// tools.js
// import CheckList from '@editorjs/checklist'
import Code from '@editorjs/code'
import Delimiter from '@editorjs/delimiter'
import Embed from '@editorjs/embed'
import Header from '@editorjs/header'
// import Image from '@editorjs/image'
import InlineCode from '@editorjs/inline-code'
import LinkTool from '@editorjs/link'
import List from '@editorjs/list'
import Marker from '@editorjs/marker'
import Paragraph from '@editorjs/paragraph'
import Quote from '@editorjs/quote'
import Raw from '@editorjs/raw'
import SimpleImage from '@editorjs/simple-image'
import Table from '@editorjs/table'
import Warning from '@editorjs/warning'
import {ToolConfig} from '@editorjs/editorjs'
// const ImageTool = window.Image
import InlineImage from 'editorjs-inline-image'
// import {EditorBlockTypes} from 'models'
import CodeMirror from '@bomdi/codebox'
// import * as test from 'highlight.js/styles/hopscotch.css' // import your preferred style

export const EditorConfig: ToolConfig = {
  embed: {
    class: Embed,
    config: {
      services: {
        youtube: true,
        facebook: true,
      },
    },
  },
  table: Table,
  paragraph: {
    class: Paragraph,
    inlineToolbar: true,
  },
  list: List,
  warning: Warning,
  code: {
    class: CodeMirror,
    config: {
      themeURL: 'https://cdn.jsdelivr.net/gh/highlightjs/cdn-release@9.18.1/build/styles/dracula.min.css', // Optional
      themeName: 'atom-one-dark', // Optional
      useDefaultTheme: 'dark', // Optional. This also determines the background color of the language select drop-down
    },
  },
  linkTool: {
    class: LinkTool,
    config: {
      endpoint: `${process.env.REACT_APP_SERVER_URL}/meta-data`, // Your backend endpoint for url data fetching
    },
  },
  image: {
    class: InlineImage,
    inlineToolbar: true,
    config: {
      unsplash: {
        appName: 'Dot-Blog',
        clientId: 'WQRdeAgIOqp1pF-bV_FYS3mXJ1kxXctv_lzdbpyFRzU',
      },
    },
  },
  raw: Raw,
  header: {
    class: Header,
    config: {
      placeholder: 'Enter a header',
      levels: [1, 2, 3, 4],
      defaultLevel: 2,
    },
  },
  quote: {
    class: Quote,
    inlineToolbar: true,
    config: {
      quotePlaceholder: 'Enter a quote',
      captionPlaceholder: "Quote's author",
      // alignment: 'left',
    },
  },
  marker: Marker,
  // checklist: CheckList,
  delimiter: Delimiter,
  inlineCode: InlineCode,
  simpleImage: SimpleImage,
}
