import { useRecoilState } from "recoil";
import atomInt from "./atom_int";

function AtomInt(props: { uid: string }) {
  const [counter, _setCounter] = useRecoilState(atomInt(props.uid));
  return (<div>&gt;&gt;{counter}&lt;&lt;</div>);
}

export default AtomInt;