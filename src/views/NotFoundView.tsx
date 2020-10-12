import { Col, Row } from 'components'
import NotFoundImage from 'images/page_not_found.svg'
import React from 'react'

export const NotFoundView = () => {
  return (
    <Row direction="column" gutter={['lg', 'lg']} justify="center" align="center" style={{marginTop: '100px'}}>
      <Col xs={8} md={5}>
        <img src={NotFoundImage} width="100%" alt="Under Construction" />
      </Col>
      <p>This page is under construction</p>
    </Row>
  )
}
