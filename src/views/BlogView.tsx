import {Col, Row} from 'components'
import {EditorBlockConfig} from 'editor/EditorBlockConfig'
import {EditorBlock} from 'models'
import React from 'react'
import shortid from 'shortid'
import 'styles/editor.scss'

export const BlogView = () => {
  const blog = JSON.parse(sessionStorage.getItem('blog')!)
  return (
    <Row id="blogViewSection" direction="column" align="center" justify="center">
      {blog.sections.map((x: EditorBlock) => {
        const props = x.data
        const Component = EditorBlockConfig[x.type]
        return props.stretched ? (
          <Col>
            <Component key={shortid()} {...props} />
          </Col>
        ) : (
          <Col xs={10} md={6}>
            <Component key={shortid()} {...props} />
          </Col>
        )
      })}
    </Row>
  )
}
