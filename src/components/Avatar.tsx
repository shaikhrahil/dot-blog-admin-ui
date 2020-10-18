import styled from 'styled-components'

const avatarSizes = {
  small: 30,
  medium: 50,
  large: 100,
}

export const Avatar = styled.img.attrs({
  referrerpolicy: 'no-referrer',
})<{size: keyof typeof avatarSizes; bordered?: boolean}>`
  width: ${({size}) => `${avatarSizes[size]}px`};
  height: ${({size}) => `${avatarSizes[size]}px`};
  border-radius: 50%;
  margin-right: 10px;
  border: ${({theme, bordered}) => (bordered ? `2px solid ${theme.primary}` : '')};
`
