import { GraphQLResolveInfo } from 'graphql';
import { Context } from '../context/Context.js';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type GQLComment = {
  __typename?: 'Comment';
  commentId: Scalars['String']['output'];
  message: Scalars['String']['output'];
};

export type GQLPagination = {
  __typename?: 'Pagination';
  hasNext: Scalars['Boolean']['output'];
  hasPrevious: Scalars['Boolean']['output'];
  page: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
};

export type GQLPaginationInput = {
  page: Scalars['Int']['input'];
  perPage: Scalars['Int']['input'];
};

export type GQLPost = {
  __typename?: 'Post';
  comments?: Maybe<Array<GQLComment>>;
  postId: Scalars['String']['output'];
  title: Scalars['String']['output'];
};

export type GQLQuery = {
  __typename?: 'Query';
  users?: Maybe<Array<GQLUser>>;
};


export type GQLQueryUsersArgs = {
  filter?: InputMaybe<GQLUserFilter>;
  pagination: GQLPaginationInput;
};

export type GQLUser = {
  __typename?: 'User';
  name: Scalars['String']['output'];
  posts?: Maybe<Array<GQLPost>>;
  userId: Scalars['String']['output'];
};

export type GQLUserFilter = {
  name?: InputMaybe<Scalars['String']['input']>;
};

export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;



/** Mapping between all available schema types and the resolvers types */
export type GQLResolversTypes = ResolversObject<{
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  Comment: ResolverTypeWrapper<GQLComment>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  Pagination: ResolverTypeWrapper<GQLPagination>;
  PaginationInput: GQLPaginationInput;
  Post: ResolverTypeWrapper<GQLPost>;
  Query: ResolverTypeWrapper<{}>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  User: ResolverTypeWrapper<GQLUser>;
  UserFilter: GQLUserFilter;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type GQLResolversParentTypes = ResolversObject<{
  Boolean: Scalars['Boolean']['output'];
  Comment: GQLComment;
  Int: Scalars['Int']['output'];
  Pagination: GQLPagination;
  PaginationInput: GQLPaginationInput;
  Post: GQLPost;
  Query: {};
  String: Scalars['String']['output'];
  User: GQLUser;
  UserFilter: GQLUserFilter;
}>;

export type GQLCommentResolvers<ContextType = Context, ParentType extends GQLResolversParentTypes['Comment'] = GQLResolversParentTypes['Comment']> = ResolversObject<{
  commentId?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  message?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type GQLPaginationResolvers<ContextType = Context, ParentType extends GQLResolversParentTypes['Pagination'] = GQLResolversParentTypes['Pagination']> = ResolversObject<{
  hasNext?: Resolver<GQLResolversTypes['Boolean'], ParentType, ContextType>;
  hasPrevious?: Resolver<GQLResolversTypes['Boolean'], ParentType, ContextType>;
  page?: Resolver<GQLResolversTypes['Int'], ParentType, ContextType>;
  total?: Resolver<GQLResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type GQLPostResolvers<ContextType = Context, ParentType extends GQLResolversParentTypes['Post'] = GQLResolversParentTypes['Post']> = ResolversObject<{
  comments?: Resolver<Maybe<Array<GQLResolversTypes['Comment']>>, ParentType, ContextType>;
  postId?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  title?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type GQLQueryResolvers<ContextType = Context, ParentType extends GQLResolversParentTypes['Query'] = GQLResolversParentTypes['Query']> = ResolversObject<{
  users?: Resolver<Maybe<Array<GQLResolversTypes['User']>>, ParentType, ContextType, RequireFields<GQLQueryUsersArgs, 'pagination'>>;
}>;

export type GQLUserResolvers<ContextType = Context, ParentType extends GQLResolversParentTypes['User'] = GQLResolversParentTypes['User']> = ResolversObject<{
  name?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  posts?: Resolver<Maybe<Array<GQLResolversTypes['Post']>>, ParentType, ContextType>;
  userId?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type GQLResolvers<ContextType = Context> = ResolversObject<{
  Comment?: GQLCommentResolvers<ContextType>;
  Pagination?: GQLPaginationResolvers<ContextType>;
  Post?: GQLPostResolvers<ContextType>;
  Query?: GQLQueryResolvers<ContextType>;
  User?: GQLUserResolvers<ContextType>;
}>;

