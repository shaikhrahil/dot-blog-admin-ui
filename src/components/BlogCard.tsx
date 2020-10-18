import {Card, CardActionsOverlay, Image as AppImage, Text} from 'components'
import {BlogDto} from 'models'
import React, {ReactElement, useEffect, useRef, useState} from 'react'
import {classNames, getThumbnail} from 'utils'
import {Avatar} from './Avatar'
import {Row} from './Row'

interface Props {
  blog: BlogDto
  onClick?: () => void
  actionOverlay?: ReactElement
}

export function BlogCard({blog, onClick, actionOverlay}: Props): ReactElement {
  const [imageUrl, setImageUrl] = useState(blog.cover ? getThumbnail(blog.cover) : '')
  const ref = useRef<any>(null)
  useEffect(() => {
    const observer = new IntersectionObserver((x) => {
      if (x[0].isIntersecting) {
        const buffer = new Image()
        buffer.src = blog.cover || ''
        buffer.onload = () => {
          if (observer) {
            setImageUrl(blog.cover || '')
            observer.disconnect()
          }
        }
      }
    })
    observer.observe(ref.current)
    return () => {
      observer.disconnect()
    }
  }, [])

  return (
    <Card ref={ref} clickable onClick={onClick} overlay={!!actionOverlay}>
      {blog.cover && (
        <AppImage
          className={classNames({
            'blog-card-image': true,
            'blurred-image': blog.cover !== imageUrl,
          })}
          src={imageUrl}
        />
      )}
      <Text className="title" level="title">
        {blog.title}
      </Text>
      <Text level="content" truncate={2}>
        {blog.subtitle}
      </Text>
      <Row gutter={['xs', 'md']} style={{marginTop: '10px'}}>
        <Avatar src={blog.author.profilePic} size="medium" />
        <div>
          <span> {blog.author.name} </span>
          <Text level="caption" bold>
            {new Date(parseInt(blog.createdAt)).toLocaleDateString()}
          </Text>
        </div>
      </Row>
      <CardActionsOverlay onClick={(e) => e.stopPropagation()}>{actionOverlay}</CardActionsOverlay>
    </Card>
  )
}
