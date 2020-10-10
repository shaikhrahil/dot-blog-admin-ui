import {Text} from 'components'
import {Card} from 'components/Card'
import {Image} from 'components/Image'
import {BlogDto} from 'models'
import React, {ReactElement, useCallback} from 'react'
import shortid from 'shortid'
import {history} from 'utils'

interface Props {
  blog: BlogDto
}

export function BlogCard({blog}: Props): ReactElement {
  const openBlog = useCallback(() => {
    history.push(`/blog/${blog.title.toLowerCase().replace(' ', '-')}-${blog._id}`)
  }, [])
  return (
    <Card key={shortid()} clickable onClick={openBlog}>
      {blog.cover && <Image src={blog.cover} />}
      <Text level="title"> {blog.title} </Text>
      <Text level="content" truncate={2}>
        {blog.subtitle}
      </Text>
    </Card>
  )
}
