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

const operationHistoryAtom = atom<string[] | number[]>({
  key: "operationHistory",
  default: [],
});

export const useDisplay = () => {
  const [display, setDisplay] = useRecoilState(displayAtom);
  const [memory, setMemory] = useRecoilState(memoryAtom);
  const [buttonsPressed, setButtonsPressed] =
    useRecoilState(buttonsPressedAtom);
  const [operationHistory, setOperationHistory] =
    useRecoilState(operationHistoryAtom);

  return {
    display,
    setDisplay,
    memory,
    setMemory,
    buttonsPressed,
    setButtonsPressed,
    operationHistory,
    setOperationHistory,
  };
};
