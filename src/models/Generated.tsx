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

export type CommentDto = {
  __typename?: 'CommentDTO';
  _id: Scalars['ID'];
  text: Scalars['String'];
  by: Scalars['String'];
  replyTo: Scalars['String'];
  pinned: Scalars['Boolean'];
};

export type BlogDto = {
  __typename?: 'BlogDTO';
  _id: Scalars['ID'];
  user: Scalars['String'];
  title: Scalars['String'];
  subtitle: Scalars['String'];
  published: Scalars['Boolean'];
  sections: Scalars['String'];
  comments: Array<CommentDto>;
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  blogs: Array<BlogDto>;
  blog?: Maybe<BlogDto>;
};


export type QueryBlogsArgs = {
  before: Scalars['String'];
  first: Scalars['Int'];
};


export type QueryBlogArgs = {
  id: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addBlog: BlogDto;
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
  title: Scalars['String'];
  subtitle: Scalars['String'];
  published: Scalars['Boolean'];
  sections: Scalars['String'];
};

export type UpdateBlog = {
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
