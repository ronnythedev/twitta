import { PostTimestamp } from "./TwittaPost";

export type Comment = {
    commentId:string;
    comment:string;
    name: string;
    timestamp?:PostTimestamp
    userImg:string;
    username:string;
    userId:string;
}

