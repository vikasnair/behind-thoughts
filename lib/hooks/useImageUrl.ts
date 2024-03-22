import { create } from 'zustand';

type ImageUrlState = {
  imageUrl: string;
  setImageUrl: (imageUrl: string) => void;
};

const useImageUrl = create<ImageUrlState>((set) => ({
  imageUrl: '',
  setImageUrl: (imageUrl: string) => set({ imageUrl }),
}));

export default useImageUrl;
