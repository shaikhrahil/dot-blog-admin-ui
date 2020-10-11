import {Col, Row} from 'components'
import {EditorBlockConfig} from 'editor/EditorBlockConfig'
import {BlogDto, EditorBlock} from 'models'
import React from 'react'
import shortid from 'shortid'
import 'styles/editor.scss'

interface Props {
  data: BlogDto
}

export const BlogPreviewModal = ({data}: Props) => {
  const sections = JSON.parse(data?.sections)
  return (
    <Row id="blogViewSection" direction="column" align="center" justify="center">
      {sections.map((x: EditorBlock) => {
        const props = x.data
        const Component = EditorBlockConfig[x.type]
        return props.stretched ? (
          <Col key={shortid()}>
            <Component {...props} />
          </Col>
        ) : (
          <Col xs={10} md={6} key={shortid()}>
            <Component {...props} />
          </Col>
        )
      })}
    </Row>
  )
}
