import { atom, AtomEffect } from 'recoil';

// LocalStorage와 동기화하는 Effect
const localStorageEffect =
  (key: string): AtomEffect<boolean> =>
  ({ setSelf, onSet }) => {
    const savedValue = localStorage.getItem(key);
    if (savedValue != null) {
      setSelf(JSON.parse(savedValue));
    }

    // 값이 변경될 때마다 LocalStorage에 저장
    onSet((newValue, _, isReset) => {
      if (isReset) {
        localStorage.removeItem(key);
      } else {
        localStorage.setItem(key, JSON.stringify(newValue));
      }
    });
  };

const isLoginAtom = atom({
  key: 'isLogin',
  default: false,
  effects: [localStorageEffect('isLogin')],
});

export default isLoginAtom;
