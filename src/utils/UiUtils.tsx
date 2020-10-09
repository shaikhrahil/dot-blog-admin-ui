import {CSSProperties} from 'react'

export const classNames = (input: Record<string, boolean>): string => {
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
