import {Card, CardActionsOverlay, Image, Text} from 'components'
import {BlogDto} from 'models'
import React, {ReactElement} from 'react'
import shortid from 'shortid'
import {CSSProperties} from 'styled-components'

interface Props {
  blog: BlogDto
  onClick?: () => void
  className?: string
  style?: Partial<CSSProperties>
  actionOverlay?: ReactElement
}

export function BlogCard({blog, onClick, style, className, actionOverlay}: Props): ReactElement {
  return (
    <Card key={shortid()} clickable onClick={onClick} style={style} className={className} overlay={!!actionOverlay}>
      {blog.cover && <Image src={blog.cover} />}
      <Text level="title">{blog.title}</Text>
      <Text level="subtitle" truncate={2}>
        {blog.subtitle}
      </Text>
      <CardActionsOverlay onClick={(e) => e.stopPropagation()}>{actionOverlay}</CardActionsOverlay>
    </Card>
  )
}
