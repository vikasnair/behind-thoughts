import { create } from 'zustand';

type MessageState = {
  message: string;
  setMessage: (message: string) => void;
};

const useMessage = create<MessageState>((set) => ({
  message: '',
  setMessage: (message: string) => set({ message }),
}));

export default useMessage;
