import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

export interface SimpleDOMRect {
    height: number;
    width: number;
    x: number;
    y: number;
}

export const defBbox = { x: 0, y: 0, width: 0, height: 0 };

export const atomBbox = (uid: string) => atom<SimpleDOMRect>({
    key: uid,
    default: defBbox
})
