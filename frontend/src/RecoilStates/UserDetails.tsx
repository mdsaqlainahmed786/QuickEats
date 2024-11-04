import { atom } from 'recoil';

export const usernameState = atom<string | null>({
  key: 'usernameState', // unique ID (with respect to other atoms/selectors)
  default: null // default value (aka initial value)
});