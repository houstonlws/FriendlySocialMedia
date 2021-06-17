import { User } from "./user";

export interface Post {
    id: number;
    user: User;
    message: string;
    dateCreated: string;
    refPost: Post;
    comments: Array<Post>;
    likes: Array<User>;
    image: string;
}