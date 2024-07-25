import { Post } from "@prisma/client";

// type Post = {
//   id: string;
//   title: string | null;
//   content: string;
//   authorId: string;
// };

export interface IPostRepository {
  create(title: string, content: string, authorId: string): Promise<Post>;
}
