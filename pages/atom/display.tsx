import { atom, useRecoilState } from "recoil";

const displayAtom = atom<string[] | number[]>({
  key: "displayAtom",
  default: [0],
});

const memoryAtom = atom<string[] | number[]>({
  key: "memory",
  default: [],
});

const buttonsPressedAtom = atom<string[] | number[]>({
  key: "buttonsPressed",
  default: [],
});

export const useDisplay = () => {
  const [displayState, setDisplayState] = useRecoilState(displayAtom);
  const [memoryState, setMemoryState] = useRecoilState(memoryAtom);
  const [buttonsPressed, setButtonsPressed] =
    useRecoilState(buttonsPressedAtom);
  return {
    displayState,
    setDisplayState,
    memoryState,
    setMemoryState,
    buttonsPressed,
    setButtonsPressed,
  };
};
