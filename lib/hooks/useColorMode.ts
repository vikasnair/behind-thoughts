import { create } from 'zustand';
import ColorMode from '../enums/ColorMode';

type ColorModeState = {
  colorMode?: ColorMode;
  setColorMode: (colorMode: ColorMode) => void;
};

const useColorMode = create<ColorModeState>((set) => ({
  colorMode: undefined,
  setColorMode: (colorMode: ColorMode) => set({ colorMode }),
}));

export default useColorMode;
