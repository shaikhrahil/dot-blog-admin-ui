import MasonryPack from 'react-masonry-css'
import styled from 'styled-components'

export const Masonry = styled(MasonryPack)`
  > * {
    margin: 0px 20px;
    > * {
      margin: 35px 0px;
    }
  }
`
