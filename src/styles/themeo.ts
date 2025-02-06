import { error } from 'console';
import styled from 'styled-components';

const PrimitiveToken = {
  color: {
    green: {
      50: '#ESF5ED',
      100: '#C1E6DD1',
      200: '#98D6B5',
      300: '#6CC798',
      400: '48BB83',
      500: '#17AF6DD',
      600: '#0EAF6D',
      700: '#038356',
      800: '#007C4A',
      900: '#00535',
    },
  },
};

export const theme = {
  color: {
    primary: {
      default: PrimitiveToken.color.green[500],
      dark: PrimitiveToken.color.green[700],
    },
    secondary: {},
    system: {
      error: '#FF485E',
    },
  },
};
