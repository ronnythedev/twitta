import { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import { modalState } from "../../state/atoms/modalAtom";
import { selectedPostId } from "../../state/atoms/postAtom";
import Modal from "react-modal";
import {
  EmojiHappyIcon,
  PhotographIcon,
  XIcon,
} from "@heroicons/react/outline";
import { db } from "../../firebase";
import { doc, onSnapshot } from "firebase/firestore";
import { TwittaPost } from "../../models/TwittaPost";
import Moment from "react-moment";
import { useSession } from "next-auth/react";

export default function CommentModal() {
  const [open, setOpen] = useRecoilState(modalState);
  const [postId] = useRecoilState(selectedPostId);
  const [post, setPost] = useState<TwittaPost>();
  const { data: session } = useSession();
  const [input, setInput] = useState("");

  useEffect(() => {
    onSnapshot(doc(db, "posts", postId), (document: any) => {
      if (document && document.data()) {
        let tPost: TwittaPost = {
          documentId: document.id,
          id: document.data().id,
          image: document.data().image,
          name: document.data().name,
          text: document.data().text,
          timestamp: document.data().timestamp,
          userImg: document.data().userImg,
          username: document.data().username,
        };
        setPost(tPost);
      }
    });
  }, [postId, db]);

  const sendComment = () => {
    return null;
  };

  return (
    <div>
      {open && (
        <Modal
          isOpen={open}
          onRequestClose={() => {
            setOpen(false);
          }}
          className="max-w-lg w-[90%]  absolute top-24 left-[50%] translate-x-[-50%] bg-white border-2 border-gray-200 rounded-xl shadow-md"
        >
          <div className="p-1">
            <div className="border-b border-gray-200 py-2 px-1.5">
              <div
                onClick={() => {
                  setOpen(false);
                }}
                className="hoverEffect w-10 h-10 flex items-center justify-center"
              >
                <XIcon className="h-[23px] text-gray-700 p-0" />
              </div>
            </div>
            <div className="p-2 flex items-center space-x-1 relative">
              <span className="w-0.5 h-full z-[-1] absolute left-8 top-11 bg-gray-300" />
              <img
                className="h-11 w-11 rounded-full mr-4"
                src={post?.userImg}
                alt="user-img"
              />
              <h4 className="font-bold text-[15px] sm:text-[16px] hover:underline">
                {post?.name}
              </h4>
              <span className="text-sm sm:text-[15px]">
                @{post?.username} -{" "}
              </span>
              <span className="text-sm sm:text-[15px] hover:underline">
                <Moment fromNow>
                  {post?.timestamp === null || post?.timestamp === undefined
                    ? new Date()
                    : new Date(post.timestamp.seconds * 1000)}
                </Moment>
              </span>
            </div>
            <p className="text-gray-500 text-[15px] sm:text-[16px] ml-16 mb-2">
              {post?.text}
            </p>

            <div className="flex p-3 space-x-3">
              <img
                src={session?.user?.image ?? "/images/profile.png"}
                alt="user-image"
                className="h-11 w-11 rounded-full cursor-pointer hover:brightness-95"
              />
              <div className="w-full divide-y divide-gray-200">
                <div className="">
                  <textarea
                    className="w-full border-none focus:ring-0 text-lg placeholder-gray-700 tracking-wide min-h-[50px] text-gray-700"
                    rows={2}
                    placeholder="Tweet your reply"
                    value={input}
                    onChange={(e) => {
                      setInput(e.target.value);
                    }}
                  ></textarea>
                </div>

                <div className="flex items-center justify-between pt-2.5">
                  <div className="flex">
                    <div
                      className=""
                      onClick={() => {
                        // if (filePickerRef.current) {
                        //   filePickerRef.current.click();
                        // }
                      }}
                    >
                      <PhotographIcon className="h-10 w-10 hoverEffect p-2 text-sky-500 hover:bg-sky-100" />
                      {/* <input
                        type="file"
                        hidden
                        ref={filePickerRef}
                        onChange={(e) => {
                          addImageToPost(e);
                        }}
                      /> */}
                    </div>

                    <EmojiHappyIcon className="h-10 w-10 hoverEffect p-2 text-sky-500 hover:bg-sky-100" />
                  </div>
                  <button
                    className="bg-blue-400 text-white px-4 py-1.5 rounded-full font-bold shadow-md hover:brightness-95 disabled:opacity-50"
                    disabled={!input.trim()}
                    onClick={() => {
                      sendComment();
                    }}
                  >
                    Reply
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
