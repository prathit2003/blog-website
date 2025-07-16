interface Comment {
  content: string;
  authorId: number;
}

interface Media {
  name: string;
  mimeType: string;
  data: string;
}

interface Likes {
  authorId: number;
  postId: number;
}

export interface Blog {
  id: number;
  title: string;
  author: {
    username: string;
    profilepictureurl: string;
  };
  authorId: number;
  content: string;
  createdAt: string;
  updatedAt: string;
  media: Media[];
  likes: Likes[];
  comments: Comment[];
  published: boolean;
  tags: { name: string; id: number }[];
}
