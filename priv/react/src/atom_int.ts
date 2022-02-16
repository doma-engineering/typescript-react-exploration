import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

const atomInt = (uid: string) => atom<number>({
  key: uid,
  default: 0,
  effects_UNSTABLE: [persistAtom]
})

export default atomInt;