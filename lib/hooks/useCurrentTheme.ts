import { useEffect } from 'react';
import ColorMode from '../enums/ColorMode';
import MediaQuery from '../enums/MediaQuery';
import Theme from '../types/Theme';
import useColorMode from './useColorMode';
import useMediaQuery from './useMediaQuery';

const useCurrentTheme = () => {
  const osColorModeIsDark = useMediaQuery(MediaQuery.PrefersDarkColorScheme);
  const { colorMode } = useColorMode();

  const currentTheme =
    colorMode === ColorMode.Dark ||
    (colorMode === ColorMode.OS && osColorModeIsDark)
      ? Theme.Dark
      : Theme.Light;

  useEffect(() => {
    document.body.style.backgroundColor = currentTheme.background;
  }, [osColorModeIsDark, colorMode]);

  return currentTheme;
};

export default useCurrentTheme;
