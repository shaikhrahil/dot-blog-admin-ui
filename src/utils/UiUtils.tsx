import {CSSProperties} from 'react'

export const classNames = (input: Record<string, boolean | undefined | null>): string => {
  let className = ''
  Object.keys(input).forEach((k) => {
    if (input[k]) {
      className += ` ${k}`
    }
  })
  return className
}

export const blockCenter: Partial<CSSProperties> = {
  marginRight: 'auto',
  marginLeft: 'auto',
  display: 'block',
}

export const hexToRgbA = (hex: string, opacity?: number): string => {
  let c: any
  if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
    c = hex.substring(1).split('')
    if (c.length === 3) {
      c = [c[0], c[0], c[1], c[1], c[2], c[2]]
    }
    c = '0x' + c.join('')
    return 'rgba(' + [(c >> 16) & 255, (c >> 8) & 255, c & 255].join(',') + `,${opacity || 1})`
  }
  throw new Error('Bad Hex')
}

export const getThumbnail = (url: string) => {
  const domain = url.split('/').slice(0, 3).join('/')
  if (domain.includes('unsplash')) {
    return `${url}&fit=crop&w=100&q=10&fm=jpg`
  } else if (domain.includes('cloudinary')) {
    const urlArray = url.split('/upload/')
    return `${urlArray[0]}/upload/c_scale,w_300/${urlArray[1]}`
  }
  return url
}
