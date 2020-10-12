import {Theme} from 'models'

export const LightTheme: Theme = {
  primary: '#39FF14',
  secondary: '#23e100',
  dark: '#08080b',
  light: '#ffffff',
  error: 'orangered',
  nm: {
    border: 'none',
    background: '#f0f0f5',
    borderRadius: '15px',
    boxShadow: '6px 6px 16px 0px #dde4ef, -6px -6px 16px 0px #fff, inset 0px 0px 0px 0px #dde4ef, inset 0px 0px 0px 0px #fff',
  },
  space: {
    xs: '5px',
    sm: '10px',
    md: '15px',
    lg: '20px',
    xl: '30px',
  },
  font: {
    caption: {
      fontSize: '15px',
      fontWeight: 300,
    },
    content: {},
    subtitle: {
      fontSize: '18px',
      fontWeight: 700,
    },
    title: {
      fontSize: '25px',
      fontWeight: 700,
      fontFamily: 'system-ui,sans-serif;',
      margin: '15px 0px',
      lineHeight: '30px',
    },
  },
}

export const DarkTheme: Theme = {
  ...LightTheme,
  primary: '#fdaf26',
  secondary: '#f8c400',
  dark: '#08080b',
  light: '#ffffff',
}
