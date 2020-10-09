export interface EditorBlock<T = any> {
  data: T
  type: EditorBlockTypes
}

export type EditorBlockTypes = 'header' | 'paragraph' | 'table' | 'image' | 'code' | 'quote' | 'list' | 'warning' | 'delimiter' | 'embed'

// header

export interface EditorHeaderBlock {
  level: EditorHeaderSize
  text: string
}

export type EditorHeaderSize = 1 | 2 | 3 | 4

// image

export interface EditorImageBlock {
  caption: string
  stretched: boolean
  unsplash?: UnSplashImage
  url: string
  withBackground: boolean
  withBorder: boolean
}

export interface UnSplashImage {
  author: string
  profileLink: string
}

// paragraph

export interface EditorParagraphBlock {
  text: string
}

// code

export interface EditorCodeBlock {
  code: string
}

// quote

export interface EditorQuoteBlock {
  text: string
  caption: string
}

// table

export interface EditorTableBlock {
  content: string[][]
}

// list

export interface EditorListBlock {
  style: 'ordered' | 'unordered'
  items: string[]
}

// warning
export interface EditorWarningBlock {
  title: string
  message: string
}

// delimiter
export interface EditorDelimiterBlock {}

// embed
export interface EditorEmbedBlock {
  caption: string
  embed: string
  height: number
  service: string
  source: string
  width: number
}
