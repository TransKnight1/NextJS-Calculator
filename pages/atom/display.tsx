import { atom, useRecoilState } from "recoil";

const displayAtom = atom<string[] | number[]>({
  key: "displayAtom",
  default: [],
});

const memoryAtom = atom<string[] | number[]>({
  key: "memory",
  default: [],
});

export const useDisplay = () => {
  const [displayState, setDisplayState] = useRecoilState(displayAtom);
  const [memoryState, setMemoryState] = useRecoilState(memoryAtom);
  return { displayState, setDisplayState, memoryState, setMemoryState };
};
