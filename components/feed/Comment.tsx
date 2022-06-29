import { useEffect, useState } from "react";
import {
  ChartBarIcon,
  ChatIcon,
  DotsHorizontalIcon,
  HeartIcon,
  ShareIcon,
  TrashIcon,
} from "@heroicons/react/outline";
import { HeartIcon as HeartSolid } from "@heroicons/react/solid";
import {
  setDoc,
  doc,
  onSnapshot,
  collection,
  deleteDoc,
} from "firebase/firestore";
import { db, storage } from "../../firebase";
import Moment from "react-moment";
import { TwittaPost } from "../../models/TwittaPost";
import { Like } from "../../models/Like";
import { Comment } from "../../models/Comment";
import { signIn, useSession } from "next-auth/react";
import { deleteObject, ref } from "firebase/storage";
import { useRecoilState } from "recoil";
import { modalState } from "../../state/atoms/modalAtom";
import { selectedPostId } from "../../state/atoms/postAtom";
import { useRouter } from "next/router";

interface EnumLikes extends Array<Like> {}
interface EnumComments extends Array<Comment> {}

type Props = {
  commentId: string;
  originalPostId: string;
  comment: Comment;
};

export default function CommentComponent({
  commentId,
  originalPostId,
  comment,
}: Props) {
  const { data: session } = useSession();
  const [likes, setLikes] = useState<EnumLikes>([]);

  const [hasLiked, setHasLiked] = useState(false);
  const [open, setOpen] = useRecoilState(modalState);
  const [statePostId, setPostId] = useRecoilState(selectedPostId);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "posts", originalPostId, "comments", commentId, "likes"),
      (snapshot: any) => {
        let localCollection: EnumLikes = [];

        snapshot.docs.forEach((document: any) => {
          let tLike: Like = {
            likeId: document.id,
            username: document.data().username,
          };

          localCollection.push(tLike);
        });

        setLikes(localCollection);
      }
    );
  }, [db, originalPostId, commentId]);

  useEffect(() => {
    if (session) {
      setHasLiked(
        likes.findIndex((like) => like.likeId === session?.user.uid) !== -1
      );
    }
  }, [likes]);

  const likeComment = async () => {
    if (session) {
      if (hasLiked) {
        await deleteDoc(
          doc(
            db,
            "posts",
            originalPostId,
            "comments",
            commentId,
            "likes",
            session.user.uid
          )
        );
      } else {
        await setDoc(
          doc(
            db,
            "posts",
            originalPostId,
            "comments",
            commentId,
            "likes",
            session.user.uid
          ),
          {
            username: session.user.username,
          }
        );
      }
    } else {
      signIn();
    }
  };

  const deleteComment = async () => {
    if (window.confirm("Are you sure you want to delete this comment?")) {
      //TODO: Still need to remove "likes" collection inside the document
      await deleteDoc(doc(db, "posts", originalPostId, "comments", commentId));
    }
  };

  return (
    <div className="flex p-3 cursor-pointer border-b border-gray-200 pl-20">
      {/* post user image */}
      <img
        src={comment.userImg}
        alt="user-image"
        className="h-11 w-11 rounded-full mr-4"
      />

      <div className="flex-1">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-1 whitespace-nowrap">
            <h4 className="font-bold text-[15px] sm:text-[16px] hover:underline">
              {comment.name}
            </h4>
            <span className="text-sm sm:text-[15px]">
              @{comment.username} -{" "}
            </span>
            <span className="text-sm sm:text-[15px] hover:underline">
              <Moment fromNow>
                {comment.timestamp === null || comment.timestamp === undefined
                  ? new Date()
                  : new Date(comment.timestamp.seconds * 1000)}
              </Moment>
            </span>
          </div>

          <DotsHorizontalIcon className="h-10 hoverEffect w-10 hover:bg-sky-100 hover:text-sky-500 p-2" />
        </div>

        <p className="text-gray-800 text-[15px sm:text-[16px] mb-2">
          {comment.comment}
        </p>

        <div className="flex justify-between text-gray-500 p-2">
          <div className="flex items-center select-none">
            <ChatIcon
              onClick={() => {
                if (!session) {
                  signIn();
                } else {
                  setPostId(originalPostId);
                  setOpen(!open);
                }
              }}
              className="h-9 w-9 hoverEffect p-2 hover:text-sky-500 hover:bg-sky-100"
            />
          </div>

          {/* //TODO: fix this */}
          {session?.user.uid === comment.userId && (
            <TrashIcon
              onClick={() => {
                deleteComment();
              }}
              className="h-9 w-9 hoverEffect p-2 hover:text-red-600 hover:bg-red-100"
            />
          )}

          <div className="flex items-center">
            {hasLiked ? (
              <HeartSolid
                onClick={() => {
                  likeComment();
                }}
                className="h-9 w-9 hoverEffect p-2 text-red-600 hover:bg-red-100"
              />
            ) : (
              <HeartIcon
                onClick={() => {
                  likeComment();
                }}
                className="h-9 w-9 hoverEffect p-2 hover:text-red-600 hover:bg-red-100"
              />
            )}
            {likes.length > 0 && (
              <span
                className={`${hasLiked && "text-red-600 text-sm select-none"}`}
              >
                {likes.length}
              </span>
            )}
          </div>
          <ShareIcon className="h-9 w-9 hoverEffect p-2 hover:text-sky-500 hover:bg-sky-100" />
          <ChartBarIcon className="h-9 w-9 hoverEffect p-2 hover:text-sky-500 hover:bg-sky-100" />
        </div>
      </div>
    </div>
  );
}
