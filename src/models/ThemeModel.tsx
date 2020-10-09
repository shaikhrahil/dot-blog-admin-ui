import {ThemeProps as Themed} from 'styled-components'

export type ThemeProps = Themed<Theme>

export interface Theme {
  primary: string
  secondary: string
  dark: string
  light: string
  error: string
  space: Record<SpanSize, string>
  nm: {
    background: string
    boxShadow: string
    borderRadius: string
    border: string
  }
  font: Record<FontSize, Font>
}
// secondary: darken(primary, 10);

export type SpanSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'
export type FontSize = 'title' | 'subtitle' | 'content' | 'caption'

export interface Font {
  fontFamily?: string
  fontWeight?: number
  fontSize?: string
  lineHeight?: string
  margin?: string
}
