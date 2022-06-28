import { PostTimestamp } from "./TwittaPost";

export type Comment = {
    commentId:string;
    name: string;
    userImg:string;
    username:string;
    timestamp?:PostTimestamp
}

