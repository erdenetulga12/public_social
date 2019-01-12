module.exports = {
        typeDefs: /* GraphQL */ `type AggregateComment {
  count: Int!
}

type AggregateLike {
  count: Int!
}

type AggregatePost {
  count: Int!
}

type AggregateUser {
  count: Int!
}

type BatchPayload {
  count: Long!
}

type Comment {
  id: ID!
  author: User!
  content: String!
  post: Post!
  likes(where: LikeWhereInput, orderBy: LikeOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Like!]
}

type CommentConnection {
  pageInfo: PageInfo!
  edges: [CommentEdge]!
  aggregate: AggregateComment!
}

input CommentCreateInput {
  author: UserCreateOneWithoutCommentsInput!
  content: String!
  post: PostCreateOneWithoutCommentsInput!
  likes: LikeCreateManyWithoutCommentInput
}

input CommentCreateManyWithoutAuthorInput {
  create: [CommentCreateWithoutAuthorInput!]
  connect: [CommentWhereUniqueInput!]
}

input CommentCreateManyWithoutPostInput {
  create: [CommentCreateWithoutPostInput!]
  connect: [CommentWhereUniqueInput!]
}

input CommentCreateOneWithoutLikesInput {
  create: CommentCreateWithoutLikesInput
  connect: CommentWhereUniqueInput
}

input CommentCreateWithoutAuthorInput {
  content: String!
  post: PostCreateOneWithoutCommentsInput!
  likes: LikeCreateManyWithoutCommentInput
}

input CommentCreateWithoutLikesInput {
  author: UserCreateOneWithoutCommentsInput!
  content: String!
  post: PostCreateOneWithoutCommentsInput!
}

input CommentCreateWithoutPostInput {
  author: UserCreateOneWithoutCommentsInput!
  content: String!
  likes: LikeCreateManyWithoutCommentInput
}

type CommentEdge {
  node: Comment!
  cursor: String!
}

enum CommentOrderByInput {
  id_ASC
  id_DESC
  content_ASC
  content_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type CommentPreviousValues {
  id: ID!
  content: String!
}

input CommentScalarWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  content: String
  content_not: String
  content_in: [String!]
  content_not_in: [String!]
  content_lt: String
  content_lte: String
  content_gt: String
  content_gte: String
  content_contains: String
  content_not_contains: String
  content_starts_with: String
  content_not_starts_with: String
  content_ends_with: String
  content_not_ends_with: String
  AND: [CommentScalarWhereInput!]
  OR: [CommentScalarWhereInput!]
  NOT: [CommentScalarWhereInput!]
}

type CommentSubscriptionPayload {
  mutation: MutationType!
  node: Comment
  updatedFields: [String!]
  previousValues: CommentPreviousValues
}

input CommentSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: CommentWhereInput
  AND: [CommentSubscriptionWhereInput!]
  OR: [CommentSubscriptionWhereInput!]
  NOT: [CommentSubscriptionWhereInput!]
}

input CommentUpdateInput {
  author: UserUpdateOneRequiredWithoutCommentsInput
  content: String
  post: PostUpdateOneRequiredWithoutCommentsInput
  likes: LikeUpdateManyWithoutCommentInput
}

input CommentUpdateManyDataInput {
  content: String
}

input CommentUpdateManyMutationInput {
  content: String
}

input CommentUpdateManyWithoutAuthorInput {
  create: [CommentCreateWithoutAuthorInput!]
  delete: [CommentWhereUniqueInput!]
  connect: [CommentWhereUniqueInput!]
  disconnect: [CommentWhereUniqueInput!]
  update: [CommentUpdateWithWhereUniqueWithoutAuthorInput!]
  upsert: [CommentUpsertWithWhereUniqueWithoutAuthorInput!]
  deleteMany: [CommentScalarWhereInput!]
  updateMany: [CommentUpdateManyWithWhereNestedInput!]
}

input CommentUpdateManyWithoutPostInput {
  create: [CommentCreateWithoutPostInput!]
  delete: [CommentWhereUniqueInput!]
  connect: [CommentWhereUniqueInput!]
  disconnect: [CommentWhereUniqueInput!]
  update: [CommentUpdateWithWhereUniqueWithoutPostInput!]
  upsert: [CommentUpsertWithWhereUniqueWithoutPostInput!]
  deleteMany: [CommentScalarWhereInput!]
  updateMany: [CommentUpdateManyWithWhereNestedInput!]
}

input CommentUpdateManyWithWhereNestedInput {
  where: CommentScalarWhereInput!
  data: CommentUpdateManyDataInput!
}

input CommentUpdateOneWithoutLikesInput {
  create: CommentCreateWithoutLikesInput
  update: CommentUpdateWithoutLikesDataInput
  upsert: CommentUpsertWithoutLikesInput
  delete: Boolean
  disconnect: Boolean
  connect: CommentWhereUniqueInput
}

input CommentUpdateWithoutAuthorDataInput {
  content: String
  post: PostUpdateOneRequiredWithoutCommentsInput
  likes: LikeUpdateManyWithoutCommentInput
}

input CommentUpdateWithoutLikesDataInput {
  author: UserUpdateOneRequiredWithoutCommentsInput
  content: String
  post: PostUpdateOneRequiredWithoutCommentsInput
}

input CommentUpdateWithoutPostDataInput {
  author: UserUpdateOneRequiredWithoutCommentsInput
  content: String
  likes: LikeUpdateManyWithoutCommentInput
}

input CommentUpdateWithWhereUniqueWithoutAuthorInput {
  where: CommentWhereUniqueInput!
  data: CommentUpdateWithoutAuthorDataInput!
}

input CommentUpdateWithWhereUniqueWithoutPostInput {
  where: CommentWhereUniqueInput!
  data: CommentUpdateWithoutPostDataInput!
}

input CommentUpsertWithoutLikesInput {
  update: CommentUpdateWithoutLikesDataInput!
  create: CommentCreateWithoutLikesInput!
}

input CommentUpsertWithWhereUniqueWithoutAuthorInput {
  where: CommentWhereUniqueInput!
  update: CommentUpdateWithoutAuthorDataInput!
  create: CommentCreateWithoutAuthorInput!
}

input CommentUpsertWithWhereUniqueWithoutPostInput {
  where: CommentWhereUniqueInput!
  update: CommentUpdateWithoutPostDataInput!
  create: CommentCreateWithoutPostInput!
}

input CommentWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  author: UserWhereInput
  content: String
  content_not: String
  content_in: [String!]
  content_not_in: [String!]
  content_lt: String
  content_lte: String
  content_gt: String
  content_gte: String
  content_contains: String
  content_not_contains: String
  content_starts_with: String
  content_not_starts_with: String
  content_ends_with: String
  content_not_ends_with: String
  post: PostWhereInput
  likes_every: LikeWhereInput
  likes_some: LikeWhereInput
  likes_none: LikeWhereInput
  AND: [CommentWhereInput!]
  OR: [CommentWhereInput!]
  NOT: [CommentWhereInput!]
}

input CommentWhereUniqueInput {
  id: ID
}

scalar DateTime

type Like {
  id: ID!
  createdAt: DateTime!
  author: User!
  post: Post
  comment: Comment
}

type LikeConnection {
  pageInfo: PageInfo!
  edges: [LikeEdge]!
  aggregate: AggregateLike!
}

input LikeCreateInput {
  author: UserCreateOneWithoutLikesInput!
  post: PostCreateOneWithoutLikesInput
  comment: CommentCreateOneWithoutLikesInput
}

input LikeCreateManyWithoutAuthorInput {
  create: [LikeCreateWithoutAuthorInput!]
  connect: [LikeWhereUniqueInput!]
}

input LikeCreateManyWithoutCommentInput {
  create: [LikeCreateWithoutCommentInput!]
  connect: [LikeWhereUniqueInput!]
}

input LikeCreateManyWithoutPostInput {
  create: [LikeCreateWithoutPostInput!]
  connect: [LikeWhereUniqueInput!]
}

input LikeCreateWithoutAuthorInput {
  post: PostCreateOneWithoutLikesInput
  comment: CommentCreateOneWithoutLikesInput
}

input LikeCreateWithoutCommentInput {
  author: UserCreateOneWithoutLikesInput!
  post: PostCreateOneWithoutLikesInput
}

input LikeCreateWithoutPostInput {
  author: UserCreateOneWithoutLikesInput!
  comment: CommentCreateOneWithoutLikesInput
}

type LikeEdge {
  node: Like!
  cursor: String!
}

enum LikeOrderByInput {
  id_ASC
  id_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type LikePreviousValues {
  id: ID!
  createdAt: DateTime!
}

input LikeScalarWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  createdAt: DateTime
  createdAt_not: DateTime
  createdAt_in: [DateTime!]
  createdAt_not_in: [DateTime!]
  createdAt_lt: DateTime
  createdAt_lte: DateTime
  createdAt_gt: DateTime
  createdAt_gte: DateTime
  AND: [LikeScalarWhereInput!]
  OR: [LikeScalarWhereInput!]
  NOT: [LikeScalarWhereInput!]
}

type LikeSubscriptionPayload {
  mutation: MutationType!
  node: Like
  updatedFields: [String!]
  previousValues: LikePreviousValues
}

input LikeSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: LikeWhereInput
  AND: [LikeSubscriptionWhereInput!]
  OR: [LikeSubscriptionWhereInput!]
  NOT: [LikeSubscriptionWhereInput!]
}

input LikeUpdateInput {
  author: UserUpdateOneRequiredWithoutLikesInput
  post: PostUpdateOneWithoutLikesInput
  comment: CommentUpdateOneWithoutLikesInput
}

input LikeUpdateManyWithoutAuthorInput {
  create: [LikeCreateWithoutAuthorInput!]
  delete: [LikeWhereUniqueInput!]
  connect: [LikeWhereUniqueInput!]
  disconnect: [LikeWhereUniqueInput!]
  update: [LikeUpdateWithWhereUniqueWithoutAuthorInput!]
  upsert: [LikeUpsertWithWhereUniqueWithoutAuthorInput!]
  deleteMany: [LikeScalarWhereInput!]
}

input LikeUpdateManyWithoutCommentInput {
  create: [LikeCreateWithoutCommentInput!]
  delete: [LikeWhereUniqueInput!]
  connect: [LikeWhereUniqueInput!]
  disconnect: [LikeWhereUniqueInput!]
  update: [LikeUpdateWithWhereUniqueWithoutCommentInput!]
  upsert: [LikeUpsertWithWhereUniqueWithoutCommentInput!]
  deleteMany: [LikeScalarWhereInput!]
}

input LikeUpdateManyWithoutPostInput {
  create: [LikeCreateWithoutPostInput!]
  delete: [LikeWhereUniqueInput!]
  connect: [LikeWhereUniqueInput!]
  disconnect: [LikeWhereUniqueInput!]
  update: [LikeUpdateWithWhereUniqueWithoutPostInput!]
  upsert: [LikeUpsertWithWhereUniqueWithoutPostInput!]
  deleteMany: [LikeScalarWhereInput!]
}

input LikeUpdateWithoutAuthorDataInput {
  post: PostUpdateOneWithoutLikesInput
  comment: CommentUpdateOneWithoutLikesInput
}

input LikeUpdateWithoutCommentDataInput {
  author: UserUpdateOneRequiredWithoutLikesInput
  post: PostUpdateOneWithoutLikesInput
}

input LikeUpdateWithoutPostDataInput {
  author: UserUpdateOneRequiredWithoutLikesInput
  comment: CommentUpdateOneWithoutLikesInput
}

input LikeUpdateWithWhereUniqueWithoutAuthorInput {
  where: LikeWhereUniqueInput!
  data: LikeUpdateWithoutAuthorDataInput!
}

input LikeUpdateWithWhereUniqueWithoutCommentInput {
  where: LikeWhereUniqueInput!
  data: LikeUpdateWithoutCommentDataInput!
}

input LikeUpdateWithWhereUniqueWithoutPostInput {
  where: LikeWhereUniqueInput!
  data: LikeUpdateWithoutPostDataInput!
}

input LikeUpsertWithWhereUniqueWithoutAuthorInput {
  where: LikeWhereUniqueInput!
  update: LikeUpdateWithoutAuthorDataInput!
  create: LikeCreateWithoutAuthorInput!
}

input LikeUpsertWithWhereUniqueWithoutCommentInput {
  where: LikeWhereUniqueInput!
  update: LikeUpdateWithoutCommentDataInput!
  create: LikeCreateWithoutCommentInput!
}

input LikeUpsertWithWhereUniqueWithoutPostInput {
  where: LikeWhereUniqueInput!
  update: LikeUpdateWithoutPostDataInput!
  create: LikeCreateWithoutPostInput!
}

input LikeWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  createdAt: DateTime
  createdAt_not: DateTime
  createdAt_in: [DateTime!]
  createdAt_not_in: [DateTime!]
  createdAt_lt: DateTime
  createdAt_lte: DateTime
  createdAt_gt: DateTime
  createdAt_gte: DateTime
  author: UserWhereInput
  post: PostWhereInput
  comment: CommentWhereInput
  AND: [LikeWhereInput!]
  OR: [LikeWhereInput!]
  NOT: [LikeWhereInput!]
}

input LikeWhereUniqueInput {
  id: ID
}

scalar Long

type Mutation {
  createComment(data: CommentCreateInput!): Comment!
  updateComment(data: CommentUpdateInput!, where: CommentWhereUniqueInput!): Comment
  updateManyComments(data: CommentUpdateManyMutationInput!, where: CommentWhereInput): BatchPayload!
  upsertComment(where: CommentWhereUniqueInput!, create: CommentCreateInput!, update: CommentUpdateInput!): Comment!
  deleteComment(where: CommentWhereUniqueInput!): Comment
  deleteManyComments(where: CommentWhereInput): BatchPayload!
  createLike(data: LikeCreateInput!): Like!
  updateLike(data: LikeUpdateInput!, where: LikeWhereUniqueInput!): Like
  upsertLike(where: LikeWhereUniqueInput!, create: LikeCreateInput!, update: LikeUpdateInput!): Like!
  deleteLike(where: LikeWhereUniqueInput!): Like
  deleteManyLikes(where: LikeWhereInput): BatchPayload!
  createPost(data: PostCreateInput!): Post!
  updatePost(data: PostUpdateInput!, where: PostWhereUniqueInput!): Post
  updateManyPosts(data: PostUpdateManyMutationInput!, where: PostWhereInput): BatchPayload!
  upsertPost(where: PostWhereUniqueInput!, create: PostCreateInput!, update: PostUpdateInput!): Post!
  deletePost(where: PostWhereUniqueInput!): Post
  deleteManyPosts(where: PostWhereInput): BatchPayload!
  createUser(data: UserCreateInput!): User!
  updateUser(data: UserUpdateInput!, where: UserWhereUniqueInput!): User
  updateManyUsers(data: UserUpdateManyMutationInput!, where: UserWhereInput): BatchPayload!
  upsertUser(where: UserWhereUniqueInput!, create: UserCreateInput!, update: UserUpdateInput!): User!
  deleteUser(where: UserWhereUniqueInput!): User
  deleteManyUsers(where: UserWhereInput): BatchPayload!
}

enum MutationType {
  CREATED
  UPDATED
  DELETED
}

interface Node {
  id: ID!
}

type PageInfo {
  hasNextPage: Boolean!
  hasPreviousPage: Boolean!
  startCursor: String
  endCursor: String
}

type Post {
  id: ID!
  createdAt: DateTime!
  updatedAt: DateTime!
  published: Boolean!
  title: String!
  content: String!
  author: User!
  comments(where: CommentWhereInput, orderBy: CommentOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Comment!]
  likes(where: LikeWhereInput, orderBy: LikeOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Like!]
}

type PostConnection {
  pageInfo: PageInfo!
  edges: [PostEdge]!
  aggregate: AggregatePost!
}

input PostCreateInput {
  published: Boolean
  title: String!
  content: String!
  author: UserCreateOneWithoutPostsInput!
  comments: CommentCreateManyWithoutPostInput
  likes: LikeCreateManyWithoutPostInput
}

input PostCreateManyWithoutAuthorInput {
  create: [PostCreateWithoutAuthorInput!]
  connect: [PostWhereUniqueInput!]
}

input PostCreateOneWithoutCommentsInput {
  create: PostCreateWithoutCommentsInput
  connect: PostWhereUniqueInput
}

input PostCreateOneWithoutLikesInput {
  create: PostCreateWithoutLikesInput
  connect: PostWhereUniqueInput
}

input PostCreateWithoutAuthorInput {
  published: Boolean
  title: String!
  content: String!
  comments: CommentCreateManyWithoutPostInput
  likes: LikeCreateManyWithoutPostInput
}

input PostCreateWithoutCommentsInput {
  published: Boolean
  title: String!
  content: String!
  author: UserCreateOneWithoutPostsInput!
  likes: LikeCreateManyWithoutPostInput
}

input PostCreateWithoutLikesInput {
  published: Boolean
  title: String!
  content: String!
  author: UserCreateOneWithoutPostsInput!
  comments: CommentCreateManyWithoutPostInput
}

type PostEdge {
  node: Post!
  cursor: String!
}

enum PostOrderByInput {
  id_ASC
  id_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
  published_ASC
  published_DESC
  title_ASC
  title_DESC
  content_ASC
  content_DESC
}

type PostPreviousValues {
  id: ID!
  createdAt: DateTime!
  updatedAt: DateTime!
  published: Boolean!
  title: String!
  content: String!
}

input PostScalarWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  createdAt: DateTime
  createdAt_not: DateTime
  createdAt_in: [DateTime!]
  createdAt_not_in: [DateTime!]
  createdAt_lt: DateTime
  createdAt_lte: DateTime
  createdAt_gt: DateTime
  createdAt_gte: DateTime
  updatedAt: DateTime
  updatedAt_not: DateTime
  updatedAt_in: [DateTime!]
  updatedAt_not_in: [DateTime!]
  updatedAt_lt: DateTime
  updatedAt_lte: DateTime
  updatedAt_gt: DateTime
  updatedAt_gte: DateTime
  published: Boolean
  published_not: Boolean
  title: String
  title_not: String
  title_in: [String!]
  title_not_in: [String!]
  title_lt: String
  title_lte: String
  title_gt: String
  title_gte: String
  title_contains: String
  title_not_contains: String
  title_starts_with: String
  title_not_starts_with: String
  title_ends_with: String
  title_not_ends_with: String
  content: String
  content_not: String
  content_in: [String!]
  content_not_in: [String!]
  content_lt: String
  content_lte: String
  content_gt: String
  content_gte: String
  content_contains: String
  content_not_contains: String
  content_starts_with: String
  content_not_starts_with: String
  content_ends_with: String
  content_not_ends_with: String
  AND: [PostScalarWhereInput!]
  OR: [PostScalarWhereInput!]
  NOT: [PostScalarWhereInput!]
}

type PostSubscriptionPayload {
  mutation: MutationType!
  node: Post
  updatedFields: [String!]
  previousValues: PostPreviousValues
}

input PostSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: PostWhereInput
  AND: [PostSubscriptionWhereInput!]
  OR: [PostSubscriptionWhereInput!]
  NOT: [PostSubscriptionWhereInput!]
}

input PostUpdateInput {
  published: Boolean
  title: String
  content: String
  author: UserUpdateOneRequiredWithoutPostsInput
  comments: CommentUpdateManyWithoutPostInput
  likes: LikeUpdateManyWithoutPostInput
}

input PostUpdateManyDataInput {
  published: Boolean
  title: String
  content: String
}

input PostUpdateManyMutationInput {
  published: Boolean
  title: String
  content: String
}

input PostUpdateManyWithoutAuthorInput {
  create: [PostCreateWithoutAuthorInput!]
  delete: [PostWhereUniqueInput!]
  connect: [PostWhereUniqueInput!]
  disconnect: [PostWhereUniqueInput!]
  update: [PostUpdateWithWhereUniqueWithoutAuthorInput!]
  upsert: [PostUpsertWithWhereUniqueWithoutAuthorInput!]
  deleteMany: [PostScalarWhereInput!]
  updateMany: [PostUpdateManyWithWhereNestedInput!]
}

input PostUpdateManyWithWhereNestedInput {
  where: PostScalarWhereInput!
  data: PostUpdateManyDataInput!
}

input PostUpdateOneRequiredWithoutCommentsInput {
  create: PostCreateWithoutCommentsInput
  update: PostUpdateWithoutCommentsDataInput
  upsert: PostUpsertWithoutCommentsInput
  connect: PostWhereUniqueInput
}

input PostUpdateOneWithoutLikesInput {
  create: PostCreateWithoutLikesInput
  update: PostUpdateWithoutLikesDataInput
  upsert: PostUpsertWithoutLikesInput
  delete: Boolean
  disconnect: Boolean
  connect: PostWhereUniqueInput
}

input PostUpdateWithoutAuthorDataInput {
  published: Boolean
  title: String
  content: String
  comments: CommentUpdateManyWithoutPostInput
  likes: LikeUpdateManyWithoutPostInput
}

input PostUpdateWithoutCommentsDataInput {
  published: Boolean
  title: String
  content: String
  author: UserUpdateOneRequiredWithoutPostsInput
  likes: LikeUpdateManyWithoutPostInput
}

input PostUpdateWithoutLikesDataInput {
  published: Boolean
  title: String
  content: String
  author: UserUpdateOneRequiredWithoutPostsInput
  comments: CommentUpdateManyWithoutPostInput
}

input PostUpdateWithWhereUniqueWithoutAuthorInput {
  where: PostWhereUniqueInput!
  data: PostUpdateWithoutAuthorDataInput!
}

input PostUpsertWithoutCommentsInput {
  update: PostUpdateWithoutCommentsDataInput!
  create: PostCreateWithoutCommentsInput!
}

input PostUpsertWithoutLikesInput {
  update: PostUpdateWithoutLikesDataInput!
  create: PostCreateWithoutLikesInput!
}

input PostUpsertWithWhereUniqueWithoutAuthorInput {
  where: PostWhereUniqueInput!
  update: PostUpdateWithoutAuthorDataInput!
  create: PostCreateWithoutAuthorInput!
}

input PostWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  createdAt: DateTime
  createdAt_not: DateTime
  createdAt_in: [DateTime!]
  createdAt_not_in: [DateTime!]
  createdAt_lt: DateTime
  createdAt_lte: DateTime
  createdAt_gt: DateTime
  createdAt_gte: DateTime
  updatedAt: DateTime
  updatedAt_not: DateTime
  updatedAt_in: [DateTime!]
  updatedAt_not_in: [DateTime!]
  updatedAt_lt: DateTime
  updatedAt_lte: DateTime
  updatedAt_gt: DateTime
  updatedAt_gte: DateTime
  published: Boolean
  published_not: Boolean
  title: String
  title_not: String
  title_in: [String!]
  title_not_in: [String!]
  title_lt: String
  title_lte: String
  title_gt: String
  title_gte: String
  title_contains: String
  title_not_contains: String
  title_starts_with: String
  title_not_starts_with: String
  title_ends_with: String
  title_not_ends_with: String
  content: String
  content_not: String
  content_in: [String!]
  content_not_in: [String!]
  content_lt: String
  content_lte: String
  content_gt: String
  content_gte: String
  content_contains: String
  content_not_contains: String
  content_starts_with: String
  content_not_starts_with: String
  content_ends_with: String
  content_not_ends_with: String
  author: UserWhereInput
  comments_every: CommentWhereInput
  comments_some: CommentWhereInput
  comments_none: CommentWhereInput
  likes_every: LikeWhereInput
  likes_some: LikeWhereInput
  likes_none: LikeWhereInput
  AND: [PostWhereInput!]
  OR: [PostWhereInput!]
  NOT: [PostWhereInput!]
}

input PostWhereUniqueInput {
  id: ID
}

type Query {
  comment(where: CommentWhereUniqueInput!): Comment
  comments(where: CommentWhereInput, orderBy: CommentOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Comment]!
  commentsConnection(where: CommentWhereInput, orderBy: CommentOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): CommentConnection!
  like(where: LikeWhereUniqueInput!): Like
  likes(where: LikeWhereInput, orderBy: LikeOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Like]!
  likesConnection(where: LikeWhereInput, orderBy: LikeOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): LikeConnection!
  post(where: PostWhereUniqueInput!): Post
  posts(where: PostWhereInput, orderBy: PostOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Post]!
  postsConnection(where: PostWhereInput, orderBy: PostOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): PostConnection!
  user(where: UserWhereUniqueInput!): User
  users(where: UserWhereInput, orderBy: UserOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [User]!
  usersConnection(where: UserWhereInput, orderBy: UserOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): UserConnection!
  node(id: ID!): Node
}

type Subscription {
  comment(where: CommentSubscriptionWhereInput): CommentSubscriptionPayload
  like(where: LikeSubscriptionWhereInput): LikeSubscriptionPayload
  post(where: PostSubscriptionWhereInput): PostSubscriptionPayload
  user(where: UserSubscriptionWhereInput): UserSubscriptionPayload
}

type User {
  id: ID!
  email: String!
  password: String!
  name: String!
  createdAt: DateTime!
  posts(where: PostWhereInput, orderBy: PostOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Post!]
  comments(where: CommentWhereInput, orderBy: CommentOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Comment!]
  likes(where: LikeWhereInput, orderBy: LikeOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Like!]
}

type UserConnection {
  pageInfo: PageInfo!
  edges: [UserEdge]!
  aggregate: AggregateUser!
}

input UserCreateInput {
  email: String!
  password: String!
  name: String!
  posts: PostCreateManyWithoutAuthorInput
  comments: CommentCreateManyWithoutAuthorInput
  likes: LikeCreateManyWithoutAuthorInput
}

input UserCreateOneWithoutCommentsInput {
  create: UserCreateWithoutCommentsInput
  connect: UserWhereUniqueInput
}

input UserCreateOneWithoutLikesInput {
  create: UserCreateWithoutLikesInput
  connect: UserWhereUniqueInput
}

input UserCreateOneWithoutPostsInput {
  create: UserCreateWithoutPostsInput
  connect: UserWhereUniqueInput
}

input UserCreateWithoutCommentsInput {
  email: String!
  password: String!
  name: String!
  posts: PostCreateManyWithoutAuthorInput
  likes: LikeCreateManyWithoutAuthorInput
}

input UserCreateWithoutLikesInput {
  email: String!
  password: String!
  name: String!
  posts: PostCreateManyWithoutAuthorInput
  comments: CommentCreateManyWithoutAuthorInput
}

input UserCreateWithoutPostsInput {
  email: String!
  password: String!
  name: String!
  comments: CommentCreateManyWithoutAuthorInput
  likes: LikeCreateManyWithoutAuthorInput
}

type UserEdge {
  node: User!
  cursor: String!
}

enum UserOrderByInput {
  id_ASC
  id_DESC
  email_ASC
  email_DESC
  password_ASC
  password_DESC
  name_ASC
  name_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type UserPreviousValues {
  id: ID!
  email: String!
  password: String!
  name: String!
  createdAt: DateTime!
}

type UserSubscriptionPayload {
  mutation: MutationType!
  node: User
  updatedFields: [String!]
  previousValues: UserPreviousValues
}

input UserSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: UserWhereInput
  AND: [UserSubscriptionWhereInput!]
  OR: [UserSubscriptionWhereInput!]
  NOT: [UserSubscriptionWhereInput!]
}

input UserUpdateInput {
  email: String
  password: String
  name: String
  posts: PostUpdateManyWithoutAuthorInput
  comments: CommentUpdateManyWithoutAuthorInput
  likes: LikeUpdateManyWithoutAuthorInput
}

input UserUpdateManyMutationInput {
  email: String
  password: String
  name: String
}

input UserUpdateOneRequiredWithoutCommentsInput {
  create: UserCreateWithoutCommentsInput
  update: UserUpdateWithoutCommentsDataInput
  upsert: UserUpsertWithoutCommentsInput
  connect: UserWhereUniqueInput
}

input UserUpdateOneRequiredWithoutLikesInput {
  create: UserCreateWithoutLikesInput
  update: UserUpdateWithoutLikesDataInput
  upsert: UserUpsertWithoutLikesInput
  connect: UserWhereUniqueInput
}

input UserUpdateOneRequiredWithoutPostsInput {
  create: UserCreateWithoutPostsInput
  update: UserUpdateWithoutPostsDataInput
  upsert: UserUpsertWithoutPostsInput
  connect: UserWhereUniqueInput
}

input UserUpdateWithoutCommentsDataInput {
  email: String
  password: String
  name: String
  posts: PostUpdateManyWithoutAuthorInput
  likes: LikeUpdateManyWithoutAuthorInput
}

input UserUpdateWithoutLikesDataInput {
  email: String
  password: String
  name: String
  posts: PostUpdateManyWithoutAuthorInput
  comments: CommentUpdateManyWithoutAuthorInput
}

input UserUpdateWithoutPostsDataInput {
  email: String
  password: String
  name: String
  comments: CommentUpdateManyWithoutAuthorInput
  likes: LikeUpdateManyWithoutAuthorInput
}

input UserUpsertWithoutCommentsInput {
  update: UserUpdateWithoutCommentsDataInput!
  create: UserCreateWithoutCommentsInput!
}

input UserUpsertWithoutLikesInput {
  update: UserUpdateWithoutLikesDataInput!
  create: UserCreateWithoutLikesInput!
}

input UserUpsertWithoutPostsInput {
  update: UserUpdateWithoutPostsDataInput!
  create: UserCreateWithoutPostsInput!
}

input UserWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  email: String
  email_not: String
  email_in: [String!]
  email_not_in: [String!]
  email_lt: String
  email_lte: String
  email_gt: String
  email_gte: String
  email_contains: String
  email_not_contains: String
  email_starts_with: String
  email_not_starts_with: String
  email_ends_with: String
  email_not_ends_with: String
  password: String
  password_not: String
  password_in: [String!]
  password_not_in: [String!]
  password_lt: String
  password_lte: String
  password_gt: String
  password_gte: String
  password_contains: String
  password_not_contains: String
  password_starts_with: String
  password_not_starts_with: String
  password_ends_with: String
  password_not_ends_with: String
  name: String
  name_not: String
  name_in: [String!]
  name_not_in: [String!]
  name_lt: String
  name_lte: String
  name_gt: String
  name_gte: String
  name_contains: String
  name_not_contains: String
  name_starts_with: String
  name_not_starts_with: String
  name_ends_with: String
  name_not_ends_with: String
  createdAt: DateTime
  createdAt_not: DateTime
  createdAt_in: [DateTime!]
  createdAt_not_in: [DateTime!]
  createdAt_lt: DateTime
  createdAt_lte: DateTime
  createdAt_gt: DateTime
  createdAt_gte: DateTime
  posts_every: PostWhereInput
  posts_some: PostWhereInput
  posts_none: PostWhereInput
  comments_every: CommentWhereInput
  comments_some: CommentWhereInput
  comments_none: CommentWhereInput
  likes_every: LikeWhereInput
  likes_some: LikeWhereInput
  likes_none: LikeWhereInput
  AND: [UserWhereInput!]
  OR: [UserWhereInput!]
  NOT: [UserWhereInput!]
}

input UserWhereUniqueInput {
  id: ID
  email: String
}
`
      }
    