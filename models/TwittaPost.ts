export type TwittaPost = {
    documentId: string;
    id: string;
    image?: string;
    name: string;
    text: string;
    timestamp?: PostTimestamp;
    userImg: string;
    username: string;
  }

  export type PostTimestamp = {
    seconds:number;
    nanoseconds:number;
  }