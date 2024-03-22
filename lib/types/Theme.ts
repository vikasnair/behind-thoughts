import { Theme } from '@emotion/react';
import ThemeName from '../enums/ThemeName';

namespace BHTheme {
  export const Dark: Theme = {
    background: '#EDEEF0',
    foreground: '#1B1D1E',
    name: ThemeName.Dark,
  };

  export const Light: Theme = {
    background: '#1B1D1E',
    foreground: '#EDEEF0',
    name: ThemeName.Light,
  };
}

export default BHTheme;
