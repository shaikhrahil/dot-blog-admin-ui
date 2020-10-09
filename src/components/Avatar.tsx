import styled from 'styled-components'

const avatarSizes = {
  small: 30,
  medium: 50,
  large: 100,
}

export const Avatar = styled.img<{size: keyof typeof avatarSizes}>`
  width: ${({size}) => `${avatarSizes[size]}px`};
  height: ${({size}) => `${avatarSizes[size]}px`};
  border-radius: 50%;
  margin-right: 10px;
`
