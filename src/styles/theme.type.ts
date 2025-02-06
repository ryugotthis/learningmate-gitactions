import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    color: {
      primary: {
        default: string;
        dark: string;
      };
      secondary: Record<string, string>;
      system: {
        error: string;
      };
    };
  }
}
