import {
  collection,
  onSnapshot,
  orderBy,
  query,
  QueryDocumentSnapshot,
} from "firebase/firestore";

import { useEffect, useState } from "react";
import { db } from "../../firebase";
import { TwittaPost } from "../../models/TwittaPost";
import Header from "./Header";
import Input from "./Input";
import PostCard from "./PostCard";

interface EnumPosts extends Array<TwittaPost> {}

export default function Index() {
  const [posts, setPosts] = useState<EnumPosts>([]);

  useEffect(
    () =>
      onSnapshot(
        query(collection(db, "posts"), orderBy("timestamp", "desc")),
        (snapshot: any) => {
          let localCollection: EnumPosts = [];
          snapshot.docs.forEach((document: any) => {
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

            localCollection.push(tPost);
          });

          setPosts(localCollection);
        }
      ),
    []
  );

  return (
    <div className="xl:ml-[370px] border-l border-r border-gray-200 xl:min-w-[576px] sm:ml-[73px] flex-grow max-w-xl">
      <Header />
      <Input />
      <>
        {posts.map((post) => {
          return <PostCard key={post.documentId} post={post} />;
        })}
      </>
    </div>
  );
}
