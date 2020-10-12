import {Row} from 'components'
import UnderConstructionImg from 'images/under_construction.svg'
import React from 'react'
import {Col} from '../components/Col'

export const UnderConstruction = () => {
  return (
    <Row direction="column" gutter={['lg', 'lg']} justify="center" align="center" style={{marginTop: '100px'}}>
      <Col xs={8} md={5}>
        <img src={UnderConstructionImg} width="100%" alt="Under Construction" />
      </Col>
      <p>This page is under construction</p>
    </Row>
  )
}
