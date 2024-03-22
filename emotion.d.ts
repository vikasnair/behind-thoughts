import '@emotion/react';
import ThemeName from './lib/enums/ThemeName';

declare module '@emotion/react' {
  export interface Theme {
    background: string;
    foreground: string;
    name: ThemeName;
  }
}
