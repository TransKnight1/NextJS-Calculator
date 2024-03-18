import { atom, useRecoilState } from "recoil";

const displayAtom = atom({
  key: "displayAtom",
  default: 0,
});

export const useDisplay = () => {
  const [displayState, setDisplayState] = useRecoilState(displayAtom);
  return { displayState, setDisplayState };
};
