import { atom, useRecoilState } from "recoil";

interface upperDisplayItem {
  type: "number" | "operator";
  value: string | number;
}

const displayAtom = atom<number[]>({
  key: "displayAtom",
  default: [0],
});

const upperDisplayAtom = atom<number[] | string[]>({
  key: "upperDisplayAtom",
  default: [],
});

const partialResultAtom = atom<number[]>({
  key: "partialResult",
  default: [],
});

const directManipulationAtom = atom<string[] | number[]>({
  key: "directManipulation",
  default: [],
});

const buttonsPressedAtom = atom<string[] | number[]>({
  key: "buttonsPressed",
  default: [],
});

export const useDisplay = () => {
  const [display, setDisplay] = useRecoilState(displayAtom);
  const [upperDisplay, setUpperDisplay] = useRecoilState(upperDisplayAtom);
  const [partialResult, setPartialResult] = useRecoilState(partialResultAtom);
  const [directManipulation, setDirectManipulation] = useRecoilState(
    directManipulationAtom
  );
  const [buttonsPressed, setButtonsPressed] =
    useRecoilState(buttonsPressedAtom);

  return {
    display,
    setDisplay,
    upperDisplay,
    setUpperDisplay,
    partialResult,
    setPartialResult,
    directManipulation,
    setDirectManipulation,
    buttonsPressed,
    setButtonsPressed,
  };
};
