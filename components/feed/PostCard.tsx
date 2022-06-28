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
import { signIn, useSession } from "next-auth/react";
import { deleteObject, ref } from "firebase/storage";
import { useRecoilState } from "recoil";
import { modalState } from "../../state/atoms/modalAtom";
import { selectedPostId } from "../../state/atoms/postAtom";

type Props = {
  post: TwittaPost;
};

interface EnumLikes extends Array<Like> {}

export default function PostCard({ post }: Props) {
  const { data: session } = useSession();
  const [likes, setLikes] = useState<EnumLikes>([]);
  const [hasLiked, setHasLiked] = useState(false);
  const [open, setOpen] = useRecoilState(modalState);
  const [postId, setPostId] = useRecoilState(selectedPostId);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "posts", post.documentId, "likes"),
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
  }, [db]);

  useEffect(() => {
    if (session) {
      setHasLiked(
        likes.findIndex((like) => like.likeId === session?.user.uid) !== -1
      );
    }
  }, [likes]);

  const likePost = async () => {
    if (session) {
      if (hasLiked) {
        await deleteDoc(
          doc(db, "posts", post.documentId, "likes", session.user.uid)
        );
      } else {
        await setDoc(
          doc(db, "posts", post.documentId, "likes", session.user.uid),
          {
            username: session.user.username,
          }
        );
      }
    } else {
      signIn();
    }
  };

  const deletePost = async () => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      //TODO: Still need to remove "likes" collection inside the document
      await deleteDoc(doc(db, "posts", post.documentId));
      if (post.image) {
        await deleteObject(ref(storage, `posts/${post.documentId}/image`));
      }
    }
  };

  return (
    <div className="flex p-3 cursor-pointer border-b border-gray-200">
      {/* post user image */}
      <img
        src={post.userImg}
        alt="user-image"
        className="h-11 w-11 rounded-full mr-4"
      />

      <div className="">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-1 whitespace-nowrap">
            <h4 className="font-bold text-[15px] sm:text-[16px] hover:underline">
              {post.name}
            </h4>
            <span className="text-sm sm:text-[15px]">@{post.username} - </span>
            <span className="text-sm sm:text-[15px] hover:underline">
              <Moment fromNow>
                {post.timestamp === null || post.timestamp === undefined
                  ? new Date()
                  : new Date(post.timestamp.seconds * 1000)}
              </Moment>
            </span>
          </div>

          <DotsHorizontalIcon className="h-10 hoverEffect w-10 hover:bg-sky-100 hover:text-sky-500 p-2" />
        </div>

        <p className="text-gray-800 text-[15px sm:text-[16px] mb-2">
          {post.text}
        </p>

        <img className="rounded-2xl mr-2" src={post.image} alt="" />

        <div className="flex justify-between text-gray-500 p-2">
          <ChatIcon
            onClick={() => {
              if (!session) {
                signIn();
              } else {
                setPostId(post.documentId);
                setOpen(!open);
              }
            }}
            className="h-9 w-9 hoverEffect p-2 hover:text-sky-500 hover:bg-sky-100"
          />

          {session?.user.uid === post.id && (
            <TrashIcon
              onClick={() => {
                deletePost();
              }}
              className="h-9 w-9 hoverEffect p-2 hover:text-red-600 hover:bg-red-100"
            />
          )}

          <div className="flex items-center">
            {hasLiked ? (
              <HeartSolid
                onClick={() => {
                  likePost();
                }}
                className="h-9 w-9 hoverEffect p-2 text-red-600 hover:bg-red-100"
              />
            ) : (
              <HeartIcon
                onClick={() => {
                  likePost();
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
