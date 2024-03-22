import { create } from 'zustand';

type ImageGeneratingState = {
  generating: boolean;
  setGenerating: (generating: boolean) => void;
};

const useImageGenerating = create<ImageGeneratingState>((set) => ({
  generating: false,
  setGenerating: (generating: boolean) => set({ generating }),
}));

export default useImageGenerating;
