import { useRecoilState } from "recoil";
import { modalState } from "../../state/atoms/modalAtom";

export default function CommentModal() {
  const [open, setOpen] = useRecoilState(modalState);

  return (
    <div>
      <h1></h1>
    </div>
  );
}
