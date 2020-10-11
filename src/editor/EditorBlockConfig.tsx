import {EditorBlockTypes} from 'models'
import {FC} from 'react'
import {CodeBlock} from './CodeBlock'
import {DelimiterBlock} from './DelimiterBlock'
import {EmbedBlock} from './EmbedBlock'
import {HeaderBlock} from './HeaderBlock'
import {ImageBlock} from './ImageBlock'
import {LinkBlock} from './LinkBlock'
import {ListBlock} from './ListBlock'
import {ParagraphBlock} from './ParagraphBlock'
import {QuoteBlock} from './QuoteBlock'
import {TableBlock} from './TableBlock'
import {WarningBlock} from './WarningBlock'

export const EditorBlockConfig: Record<EditorBlockTypes, FC<any>> = {
  code: CodeBlock,
  delimiter: DelimiterBlock,
  header: HeaderBlock,
  image: ImageBlock,
  list: ListBlock,
  paragraph: ParagraphBlock,
  quote: QuoteBlock,
  table: TableBlock,
  warning: WarningBlock,
  embed: EmbedBlock,
  linkTool: LinkBlock,
}
