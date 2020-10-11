export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type AppResponse = {
  __typename?: 'AppResponse';
  success: Scalars['Boolean'];
  message: Scalars['String'];
};

export type PageInfo = {
  __typename?: 'PageInfo';
  length: Scalars['Float'];
  hasNextPage: Scalars['Boolean'];
  hasPerviousPage: Scalars['Boolean'];
  startCursor: Scalars['String'];
  endCursor: Scalars['String'];
};

export type Comment = {
  __typename?: 'Comment';
  _id: Scalars['ID'];
  text: Scalars['String'];
  by: Scalars['String'];
  replyTo: Scalars['String'];
  pinned: Scalars['Boolean'];
};

export type Author = {
  __typename?: 'Author';
  authId: Scalars['String'];
  name: Scalars['String'];
  profilePic: Scalars['String'];
};

export type BlogDto = {
  __typename?: 'BlogDTO';
  _id: Scalars['ID'];
  author: Author;
  title: Scalars['String'];
  subtitle: Scalars['String'];
  cover: Scalars['String'];
  published: Scalars['Boolean'];
  sections: Scalars['String'];
  comments: Array<Comment>;
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type Blog = {
  __typename?: 'Blog';
  success: Scalars['Boolean'];
  message: Scalars['String'];
  data?: Maybe<BlogDto>;
};

export type BlogEdge = {
  __typename?: 'BlogEdge';
  node: BlogDto;
  cursor: Scalars['String'];
};

export type PaginatedBlog = {
  __typename?: 'PaginatedBlog';
  edges: Array<BlogEdge>;
  pageInfo: PageInfo;
};

export type PaginatedBlogs = {
  __typename?: 'PaginatedBlogs';
  success: Scalars['Boolean'];
  message: Scalars['String'];
  data?: Maybe<PaginatedBlog>;
};

export type Query = {
  __typename?: 'Query';
  stories: PaginatedBlogs;
  story?: Maybe<Blog>;
  myBlogs: PaginatedBlogs;
  myBlog?: Maybe<Blog>;
};


export type QueryStoriesArgs = {
  filters: GetBlogs;
};


export type QueryStoryArgs = {
  id: Scalars['String'];
};


export type QueryMyBlogsArgs = {
  filters: GetMyBlogs;
};


export type QueryMyBlogArgs = {
  id: Scalars['String'];
};

export type GetBlogs = {
  first: Scalars['Float'];
  pageCursor: Scalars['String'];
};

export type GetMyBlogs = {
  first: Scalars['Float'];
  pageCursor: Scalars['String'];
  drafts: Scalars['Boolean'];
  published: Scalars['Boolean'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addBlog: Blog;
  updateBlog: AppResponse;
  deleteBlog: AppResponse;
  comment: AppResponse;
  editComment: AppResponse;
  deleteComment: AppResponse;
  like: AppResponse;
  unlike: AppResponse;
};


export type MutationAddBlogArgs = {
  blog: AddBlog;
};


export type MutationUpdateBlogArgs = {
  blog: UpdateBlog;
};


export type MutationDeleteBlogArgs = {
  blogId: Scalars['String'];
};


export type MutationCommentArgs = {
  blogId: Scalars['String'];
  comment: AddComment;
};


export type MutationEditCommentArgs = {
  blogId: Scalars['String'];
  comment: UpdateComment;
};


export type MutationDeleteCommentArgs = {
  blogId: Scalars['String'];
  commentId: Scalars['String'];
};


export type MutationLikeArgs = {
  by: Scalars['String'];
  assetId: Scalars['String'];
};


export type MutationUnlikeArgs = {
  by: Scalars['String'];
  assetId: Scalars['String'];
};

export type AddBlog = {
  username: Scalars['String'];
  profilePicture: Scalars['String'];
  cover: Scalars['String'];
  title: Scalars['String'];
  subtitle: Scalars['String'];
  published: Scalars['Boolean'];
  sections: Scalars['String'];
};

export type UpdateBlog = {
  username?: Maybe<Scalars['String']>;
  profilePicture?: Maybe<Scalars['String']>;
  cover?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  subtitle?: Maybe<Scalars['String']>;
  published?: Maybe<Scalars['Boolean']>;
  sections?: Maybe<Scalars['String']>;
  _id: Scalars['ID'];
};

export type AddComment = {
  text: Scalars['String'];
  by: Scalars['String'];
  replyTo: Scalars['String'];
  pinned: Scalars['Boolean'];
};

export type UpdateComment = {
  text?: Maybe<Scalars['String']>;
  by?: Maybe<Scalars['String']>;
  replyTo?: Maybe<Scalars['String']>;
  pinned?: Maybe<Scalars['Boolean']>;
  _id: Scalars['String'];
};
