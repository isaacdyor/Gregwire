import { z } from 'zod';
import { Prisma } from '@prisma/client';

/////////////////////////////////////////
// HELPER FUNCTIONS
/////////////////////////////////////////

// JSON
//------------------------------------------------------

export type NullableJsonInput = Prisma.JsonValue | null | 'JsonNull' | 'DbNull' | Prisma.NullTypes.DbNull | Prisma.NullTypes.JsonNull;

export const transformJsonNull = (v?: NullableJsonInput) => {
  if (!v || v === 'DbNull') return Prisma.DbNull;
  if (v === 'JsonNull') return Prisma.JsonNull;
  return v;
};

export const JsonValueSchema: z.ZodType<Prisma.JsonValue> = z.lazy(() =>
  z.union([
    z.string(),
    z.number(),
    z.boolean(),
    z.literal(null),
    z.record(z.lazy(() => JsonValueSchema.optional())),
    z.array(z.lazy(() => JsonValueSchema)),
  ])
);

export type JsonValueType = z.infer<typeof JsonValueSchema>;

export const NullableJsonValue = z
  .union([JsonValueSchema, z.literal('DbNull'), z.literal('JsonNull')])
  .nullable()
  .transform((v) => transformJsonNull(v));

export type NullableJsonValueType = z.infer<typeof NullableJsonValue>;

export const InputJsonValueSchema: z.ZodType<Prisma.InputJsonValue> = z.lazy(() =>
  z.union([
    z.string(),
    z.number(),
    z.boolean(),
    z.object({ toJSON: z.function(z.tuple([]), z.any()) }),
    z.record(z.lazy(() => z.union([InputJsonValueSchema, z.literal(null)]))),
    z.array(z.lazy(() => z.union([InputJsonValueSchema, z.literal(null)]))),
  ])
);

export type InputJsonValueType = z.infer<typeof InputJsonValueSchema>;


/////////////////////////////////////////
// ENUMS
/////////////////////////////////////////

export const TransactionIsolationLevelSchema = z.enum(['ReadUncommitted','ReadCommitted','RepeatableRead','Serializable']);

export const UserScalarFieldEnumSchema = z.enum(['id','name','createdAt','updatedAt']);

export const IntegrationScalarFieldEnumSchema = z.enum(['id','userId','email','type','providerUserId','accessToken','refreshToken','tokenExpiration','recentHistoryId','scopes','createdAt','lastUsedAt','lastRefreshedAt','status','genericType','metadata']);

export const EmailScalarFieldEnumSchema = z.enum(['id','messageId','integrationId','subject','from','date','body','receivedAt','processed']);

export const MessageScalarFieldEnumSchema = z.enum(['id','messageId','integrationId','userId','channelId','text','timestamp','receivedAt','processed']);

export const SortOrderSchema = z.enum(['asc','desc']);

export const NullableJsonNullValueInputSchema = z.enum(['DbNull','JsonNull',]).transform((value) => value === 'JsonNull' ? Prisma.JsonNull : value === 'DbNull' ? Prisma.DbNull : value);

export const QueryModeSchema = z.enum(['default','insensitive']);

export const NullsOrderSchema = z.enum(['first','last']);

export const JsonNullValueFilterSchema = z.enum(['DbNull','JsonNull','AnyNull',]).transform((value) => value === 'JsonNull' ? Prisma.JsonNull : value === 'DbNull' ? Prisma.JsonNull : value === 'AnyNull' ? Prisma.AnyNull : value);

export const IntegrationTypeSchema = z.enum(['GMAIL','SLACK','OUTLOOK','GITHUB','GOOGLE_CALENDAR']);

export type IntegrationTypeType = `${z.infer<typeof IntegrationTypeSchema>}`

export const GenericTypeSchema = z.enum(['EMAIL','CALENDAR','TASK','CHAT']);

export type GenericTypeType = `${z.infer<typeof GenericTypeSchema>}`

export const IntegrationStatusSchema = z.enum(['ACTIVE','REVOKED','EXPIRED']);

export type IntegrationStatusType = `${z.infer<typeof IntegrationStatusSchema>}`

/////////////////////////////////////////
// MODELS
/////////////////////////////////////////

/////////////////////////////////////////
// USER SCHEMA
/////////////////////////////////////////

export const UserSchema = z.object({
  id: z.string(),
  name: z.string().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type User = z.infer<typeof UserSchema>

/////////////////////////////////////////
// INTEGRATION SCHEMA
/////////////////////////////////////////

export const IntegrationSchema = z.object({
  type: IntegrationTypeSchema,
  status: IntegrationStatusSchema,
  genericType: GenericTypeSchema,
  id: z.string(),
  userId: z.string(),
  email: z.string().nullable(),
  providerUserId: z.string().nullable(),
  accessToken: z.string(),
  refreshToken: z.string().nullable(),
  tokenExpiration: z.coerce.date().nullable(),
  recentHistoryId: z.string().nullable(),
  scopes: z.string().array(),
  createdAt: z.coerce.date(),
  lastUsedAt: z.coerce.date().nullable(),
  lastRefreshedAt: z.coerce.date().nullable(),
  metadata: JsonValueSchema.nullable(),
})

export type Integration = z.infer<typeof IntegrationSchema>

/////////////////////////////////////////
// EMAIL SCHEMA
/////////////////////////////////////////

export const EmailSchema = z.object({
  id: z.string(),
  messageId: z.string(),
  integrationId: z.string(),
  subject: z.string().nullable(),
  from: z.string().nullable(),
  date: z.coerce.date().nullable(),
  body: z.string().nullable(),
  receivedAt: z.coerce.date(),
  processed: z.boolean(),
})

export type Email = z.infer<typeof EmailSchema>

/////////////////////////////////////////
// MESSAGE SCHEMA
/////////////////////////////////////////

export const MessageSchema = z.object({
  id: z.string(),
  messageId: z.string(),
  integrationId: z.string(),
  userId: z.string(),
  channelId: z.string(),
  text: z.string(),
  timestamp: z.coerce.date(),
  receivedAt: z.coerce.date(),
  processed: z.boolean(),
})

export type Message = z.infer<typeof MessageSchema>

/////////////////////////////////////////
// SELECT & INCLUDE
/////////////////////////////////////////

// USER
//------------------------------------------------------

export const UserIncludeSchema: z.ZodType<Prisma.UserInclude> = z.object({
  integrations: z.union([z.boolean(),z.lazy(() => IntegrationFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => UserCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const UserArgsSchema: z.ZodType<Prisma.UserDefaultArgs> = z.object({
  select: z.lazy(() => UserSelectSchema).optional(),
  include: z.lazy(() => UserIncludeSchema).optional(),
}).strict();

export const UserCountOutputTypeArgsSchema: z.ZodType<Prisma.UserCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => UserCountOutputTypeSelectSchema).nullish(),
}).strict();

export const UserCountOutputTypeSelectSchema: z.ZodType<Prisma.UserCountOutputTypeSelect> = z.object({
  integrations: z.boolean().optional(),
}).strict();

export const UserSelectSchema: z.ZodType<Prisma.UserSelect> = z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  integrations: z.union([z.boolean(),z.lazy(() => IntegrationFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => UserCountOutputTypeArgsSchema)]).optional(),
}).strict()

// INTEGRATION
//------------------------------------------------------

export const IntegrationIncludeSchema: z.ZodType<Prisma.IntegrationInclude> = z.object({
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  emails: z.union([z.boolean(),z.lazy(() => EmailFindManyArgsSchema)]).optional(),
  messages: z.union([z.boolean(),z.lazy(() => MessageFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => IntegrationCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const IntegrationArgsSchema: z.ZodType<Prisma.IntegrationDefaultArgs> = z.object({
  select: z.lazy(() => IntegrationSelectSchema).optional(),
  include: z.lazy(() => IntegrationIncludeSchema).optional(),
}).strict();

export const IntegrationCountOutputTypeArgsSchema: z.ZodType<Prisma.IntegrationCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => IntegrationCountOutputTypeSelectSchema).nullish(),
}).strict();

export const IntegrationCountOutputTypeSelectSchema: z.ZodType<Prisma.IntegrationCountOutputTypeSelect> = z.object({
  emails: z.boolean().optional(),
  messages: z.boolean().optional(),
}).strict();

export const IntegrationSelectSchema: z.ZodType<Prisma.IntegrationSelect> = z.object({
  id: z.boolean().optional(),
  userId: z.boolean().optional(),
  email: z.boolean().optional(),
  type: z.boolean().optional(),
  providerUserId: z.boolean().optional(),
  accessToken: z.boolean().optional(),
  refreshToken: z.boolean().optional(),
  tokenExpiration: z.boolean().optional(),
  recentHistoryId: z.boolean().optional(),
  scopes: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  lastUsedAt: z.boolean().optional(),
  lastRefreshedAt: z.boolean().optional(),
  status: z.boolean().optional(),
  genericType: z.boolean().optional(),
  metadata: z.boolean().optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  emails: z.union([z.boolean(),z.lazy(() => EmailFindManyArgsSchema)]).optional(),
  messages: z.union([z.boolean(),z.lazy(() => MessageFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => IntegrationCountOutputTypeArgsSchema)]).optional(),
}).strict()

// EMAIL
//------------------------------------------------------

export const EmailIncludeSchema: z.ZodType<Prisma.EmailInclude> = z.object({
  integration: z.union([z.boolean(),z.lazy(() => IntegrationArgsSchema)]).optional(),
}).strict()

export const EmailArgsSchema: z.ZodType<Prisma.EmailDefaultArgs> = z.object({
  select: z.lazy(() => EmailSelectSchema).optional(),
  include: z.lazy(() => EmailIncludeSchema).optional(),
}).strict();

export const EmailSelectSchema: z.ZodType<Prisma.EmailSelect> = z.object({
  id: z.boolean().optional(),
  messageId: z.boolean().optional(),
  integrationId: z.boolean().optional(),
  subject: z.boolean().optional(),
  from: z.boolean().optional(),
  date: z.boolean().optional(),
  body: z.boolean().optional(),
  receivedAt: z.boolean().optional(),
  processed: z.boolean().optional(),
  integration: z.union([z.boolean(),z.lazy(() => IntegrationArgsSchema)]).optional(),
}).strict()

// MESSAGE
//------------------------------------------------------

export const MessageIncludeSchema: z.ZodType<Prisma.MessageInclude> = z.object({
  integration: z.union([z.boolean(),z.lazy(() => IntegrationArgsSchema)]).optional(),
}).strict()

export const MessageArgsSchema: z.ZodType<Prisma.MessageDefaultArgs> = z.object({
  select: z.lazy(() => MessageSelectSchema).optional(),
  include: z.lazy(() => MessageIncludeSchema).optional(),
}).strict();

export const MessageSelectSchema: z.ZodType<Prisma.MessageSelect> = z.object({
  id: z.boolean().optional(),
  messageId: z.boolean().optional(),
  integrationId: z.boolean().optional(),
  userId: z.boolean().optional(),
  channelId: z.boolean().optional(),
  text: z.boolean().optional(),
  timestamp: z.boolean().optional(),
  receivedAt: z.boolean().optional(),
  processed: z.boolean().optional(),
  integration: z.union([z.boolean(),z.lazy(() => IntegrationArgsSchema)]).optional(),
}).strict()


/////////////////////////////////////////
// INPUT TYPES
/////////////////////////////////////////

export const UserWhereInputSchema: z.ZodType<Prisma.UserWhereInput> = z.object({
  AND: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  integrations: z.lazy(() => IntegrationListRelationFilterSchema).optional()
}).strict();

export const UserOrderByWithRelationInputSchema: z.ZodType<Prisma.UserOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  integrations: z.lazy(() => IntegrationOrderByRelationAggregateInputSchema).optional()
}).strict();

export const UserWhereUniqueInputSchema: z.ZodType<Prisma.UserWhereUniqueInput> = z.object({
  id: z.string()
})
.and(z.object({
  id: z.string().optional(),
  AND: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  name: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  integrations: z.lazy(() => IntegrationListRelationFilterSchema).optional()
}).strict());

export const UserOrderByWithAggregationInputSchema: z.ZodType<Prisma.UserOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => UserCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => UserMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => UserMinOrderByAggregateInputSchema).optional()
}).strict();

export const UserScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.UserScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => UserScalarWhereWithAggregatesInputSchema),z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserScalarWhereWithAggregatesInputSchema),z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const IntegrationWhereInputSchema: z.ZodType<Prisma.IntegrationWhereInput> = z.object({
  AND: z.union([ z.lazy(() => IntegrationWhereInputSchema),z.lazy(() => IntegrationWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => IntegrationWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => IntegrationWhereInputSchema),z.lazy(() => IntegrationWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  email: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  type: z.union([ z.lazy(() => EnumIntegrationTypeFilterSchema),z.lazy(() => IntegrationTypeSchema) ]).optional(),
  providerUserId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  accessToken: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  refreshToken: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  tokenExpiration: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  recentHistoryId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  scopes: z.lazy(() => StringNullableListFilterSchema).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  lastUsedAt: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  lastRefreshedAt: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  status: z.union([ z.lazy(() => EnumIntegrationStatusFilterSchema),z.lazy(() => IntegrationStatusSchema) ]).optional(),
  genericType: z.union([ z.lazy(() => EnumGenericTypeFilterSchema),z.lazy(() => GenericTypeSchema) ]).optional(),
  metadata: z.lazy(() => JsonNullableFilterSchema).optional(),
  user: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
  emails: z.lazy(() => EmailListRelationFilterSchema).optional(),
  messages: z.lazy(() => MessageListRelationFilterSchema).optional()
}).strict();

export const IntegrationOrderByWithRelationInputSchema: z.ZodType<Prisma.IntegrationOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  email: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  providerUserId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  accessToken: z.lazy(() => SortOrderSchema).optional(),
  refreshToken: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  tokenExpiration: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  recentHistoryId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  scopes: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  lastUsedAt: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  lastRefreshedAt: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  genericType: z.lazy(() => SortOrderSchema).optional(),
  metadata: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  user: z.lazy(() => UserOrderByWithRelationInputSchema).optional(),
  emails: z.lazy(() => EmailOrderByRelationAggregateInputSchema).optional(),
  messages: z.lazy(() => MessageOrderByRelationAggregateInputSchema).optional()
}).strict();

export const IntegrationWhereUniqueInputSchema: z.ZodType<Prisma.IntegrationWhereUniqueInput> = z.union([
  z.object({
    id: z.string(),
    email: z.string(),
    providerUserId: z.string()
  }),
  z.object({
    id: z.string(),
    email: z.string(),
  }),
  z.object({
    id: z.string(),
    providerUserId: z.string(),
  }),
  z.object({
    id: z.string(),
  }),
  z.object({
    email: z.string(),
    providerUserId: z.string(),
  }),
  z.object({
    email: z.string(),
  }),
  z.object({
    providerUserId: z.string(),
  }),
])
.and(z.object({
  id: z.string().optional(),
  email: z.string().optional(),
  providerUserId: z.string().optional(),
  AND: z.union([ z.lazy(() => IntegrationWhereInputSchema),z.lazy(() => IntegrationWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => IntegrationWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => IntegrationWhereInputSchema),z.lazy(() => IntegrationWhereInputSchema).array() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  type: z.union([ z.lazy(() => EnumIntegrationTypeFilterSchema),z.lazy(() => IntegrationTypeSchema) ]).optional(),
  accessToken: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  refreshToken: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  tokenExpiration: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  recentHistoryId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  scopes: z.lazy(() => StringNullableListFilterSchema).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  lastUsedAt: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  lastRefreshedAt: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  status: z.union([ z.lazy(() => EnumIntegrationStatusFilterSchema),z.lazy(() => IntegrationStatusSchema) ]).optional(),
  genericType: z.union([ z.lazy(() => EnumGenericTypeFilterSchema),z.lazy(() => GenericTypeSchema) ]).optional(),
  metadata: z.lazy(() => JsonNullableFilterSchema).optional(),
  user: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
  emails: z.lazy(() => EmailListRelationFilterSchema).optional(),
  messages: z.lazy(() => MessageListRelationFilterSchema).optional()
}).strict());

export const IntegrationOrderByWithAggregationInputSchema: z.ZodType<Prisma.IntegrationOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  email: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  providerUserId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  accessToken: z.lazy(() => SortOrderSchema).optional(),
  refreshToken: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  tokenExpiration: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  recentHistoryId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  scopes: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  lastUsedAt: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  lastRefreshedAt: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  genericType: z.lazy(() => SortOrderSchema).optional(),
  metadata: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  _count: z.lazy(() => IntegrationCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => IntegrationMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => IntegrationMinOrderByAggregateInputSchema).optional()
}).strict();

export const IntegrationScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.IntegrationScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => IntegrationScalarWhereWithAggregatesInputSchema),z.lazy(() => IntegrationScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => IntegrationScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => IntegrationScalarWhereWithAggregatesInputSchema),z.lazy(() => IntegrationScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  email: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  type: z.union([ z.lazy(() => EnumIntegrationTypeWithAggregatesFilterSchema),z.lazy(() => IntegrationTypeSchema) ]).optional(),
  providerUserId: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  accessToken: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  refreshToken: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  tokenExpiration: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),z.coerce.date() ]).optional().nullable(),
  recentHistoryId: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  scopes: z.lazy(() => StringNullableListFilterSchema).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  lastUsedAt: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),z.coerce.date() ]).optional().nullable(),
  lastRefreshedAt: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),z.coerce.date() ]).optional().nullable(),
  status: z.union([ z.lazy(() => EnumIntegrationStatusWithAggregatesFilterSchema),z.lazy(() => IntegrationStatusSchema) ]).optional(),
  genericType: z.union([ z.lazy(() => EnumGenericTypeWithAggregatesFilterSchema),z.lazy(() => GenericTypeSchema) ]).optional(),
  metadata: z.lazy(() => JsonNullableWithAggregatesFilterSchema).optional()
}).strict();

export const EmailWhereInputSchema: z.ZodType<Prisma.EmailWhereInput> = z.object({
  AND: z.union([ z.lazy(() => EmailWhereInputSchema),z.lazy(() => EmailWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => EmailWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => EmailWhereInputSchema),z.lazy(() => EmailWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  messageId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  integrationId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  subject: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  from: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  date: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  body: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  receivedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  processed: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  integration: z.union([ z.lazy(() => IntegrationRelationFilterSchema),z.lazy(() => IntegrationWhereInputSchema) ]).optional(),
}).strict();

export const EmailOrderByWithRelationInputSchema: z.ZodType<Prisma.EmailOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  messageId: z.lazy(() => SortOrderSchema).optional(),
  integrationId: z.lazy(() => SortOrderSchema).optional(),
  subject: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  from: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  date: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  body: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  receivedAt: z.lazy(() => SortOrderSchema).optional(),
  processed: z.lazy(() => SortOrderSchema).optional(),
  integration: z.lazy(() => IntegrationOrderByWithRelationInputSchema).optional()
}).strict();

export const EmailWhereUniqueInputSchema: z.ZodType<Prisma.EmailWhereUniqueInput> = z.union([
  z.object({
    id: z.string(),
    messageId: z.string()
  }),
  z.object({
    id: z.string(),
  }),
  z.object({
    messageId: z.string(),
  }),
])
.and(z.object({
  id: z.string().optional(),
  messageId: z.string().optional(),
  AND: z.union([ z.lazy(() => EmailWhereInputSchema),z.lazy(() => EmailWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => EmailWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => EmailWhereInputSchema),z.lazy(() => EmailWhereInputSchema).array() ]).optional(),
  integrationId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  subject: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  from: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  date: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  body: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  receivedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  processed: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  integration: z.union([ z.lazy(() => IntegrationRelationFilterSchema),z.lazy(() => IntegrationWhereInputSchema) ]).optional(),
}).strict());

export const EmailOrderByWithAggregationInputSchema: z.ZodType<Prisma.EmailOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  messageId: z.lazy(() => SortOrderSchema).optional(),
  integrationId: z.lazy(() => SortOrderSchema).optional(),
  subject: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  from: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  date: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  body: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  receivedAt: z.lazy(() => SortOrderSchema).optional(),
  processed: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => EmailCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => EmailMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => EmailMinOrderByAggregateInputSchema).optional()
}).strict();

export const EmailScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.EmailScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => EmailScalarWhereWithAggregatesInputSchema),z.lazy(() => EmailScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => EmailScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => EmailScalarWhereWithAggregatesInputSchema),z.lazy(() => EmailScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  messageId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  integrationId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  subject: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  from: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  date: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),z.coerce.date() ]).optional().nullable(),
  body: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  receivedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  processed: z.union([ z.lazy(() => BoolWithAggregatesFilterSchema),z.boolean() ]).optional(),
}).strict();

export const MessageWhereInputSchema: z.ZodType<Prisma.MessageWhereInput> = z.object({
  AND: z.union([ z.lazy(() => MessageWhereInputSchema),z.lazy(() => MessageWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => MessageWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => MessageWhereInputSchema),z.lazy(() => MessageWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  messageId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  integrationId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  channelId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  text: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  timestamp: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  receivedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  processed: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  integration: z.union([ z.lazy(() => IntegrationRelationFilterSchema),z.lazy(() => IntegrationWhereInputSchema) ]).optional(),
}).strict();

export const MessageOrderByWithRelationInputSchema: z.ZodType<Prisma.MessageOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  messageId: z.lazy(() => SortOrderSchema).optional(),
  integrationId: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  channelId: z.lazy(() => SortOrderSchema).optional(),
  text: z.lazy(() => SortOrderSchema).optional(),
  timestamp: z.lazy(() => SortOrderSchema).optional(),
  receivedAt: z.lazy(() => SortOrderSchema).optional(),
  processed: z.lazy(() => SortOrderSchema).optional(),
  integration: z.lazy(() => IntegrationOrderByWithRelationInputSchema).optional()
}).strict();

export const MessageWhereUniqueInputSchema: z.ZodType<Prisma.MessageWhereUniqueInput> = z.union([
  z.object({
    id: z.string(),
    messageId: z.string()
  }),
  z.object({
    id: z.string(),
  }),
  z.object({
    messageId: z.string(),
  }),
])
.and(z.object({
  id: z.string().optional(),
  messageId: z.string().optional(),
  AND: z.union([ z.lazy(() => MessageWhereInputSchema),z.lazy(() => MessageWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => MessageWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => MessageWhereInputSchema),z.lazy(() => MessageWhereInputSchema).array() ]).optional(),
  integrationId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  channelId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  text: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  timestamp: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  receivedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  processed: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  integration: z.union([ z.lazy(() => IntegrationRelationFilterSchema),z.lazy(() => IntegrationWhereInputSchema) ]).optional(),
}).strict());

export const MessageOrderByWithAggregationInputSchema: z.ZodType<Prisma.MessageOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  messageId: z.lazy(() => SortOrderSchema).optional(),
  integrationId: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  channelId: z.lazy(() => SortOrderSchema).optional(),
  text: z.lazy(() => SortOrderSchema).optional(),
  timestamp: z.lazy(() => SortOrderSchema).optional(),
  receivedAt: z.lazy(() => SortOrderSchema).optional(),
  processed: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => MessageCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => MessageMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => MessageMinOrderByAggregateInputSchema).optional()
}).strict();

export const MessageScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.MessageScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => MessageScalarWhereWithAggregatesInputSchema),z.lazy(() => MessageScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => MessageScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => MessageScalarWhereWithAggregatesInputSchema),z.lazy(() => MessageScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  messageId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  integrationId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  channelId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  text: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  timestamp: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  receivedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  processed: z.union([ z.lazy(() => BoolWithAggregatesFilterSchema),z.boolean() ]).optional(),
}).strict();

export const UserCreateInputSchema: z.ZodType<Prisma.UserCreateInput> = z.object({
  id: z.string(),
  name: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  integrations: z.lazy(() => IntegrationCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUncheckedCreateInputSchema: z.ZodType<Prisma.UserUncheckedCreateInput> = z.object({
  id: z.string(),
  name: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  integrations: z.lazy(() => IntegrationUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUpdateInputSchema: z.ZodType<Prisma.UserUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  integrations: z.lazy(() => IntegrationUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateInputSchema: z.ZodType<Prisma.UserUncheckedUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  integrations: z.lazy(() => IntegrationUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserCreateManyInputSchema: z.ZodType<Prisma.UserCreateManyInput> = z.object({
  id: z.string(),
  name: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const UserUpdateManyMutationInputSchema: z.ZodType<Prisma.UserUpdateManyMutationInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserUncheckedUpdateManyInputSchema: z.ZodType<Prisma.UserUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const IntegrationCreateInputSchema: z.ZodType<Prisma.IntegrationCreateInput> = z.object({
  id: z.string().optional(),
  email: z.string().optional().nullable(),
  type: z.lazy(() => IntegrationTypeSchema),
  providerUserId: z.string().optional().nullable(),
  accessToken: z.string(),
  refreshToken: z.string().optional().nullable(),
  tokenExpiration: z.coerce.date().optional().nullable(),
  recentHistoryId: z.string().optional().nullable(),
  scopes: z.union([ z.lazy(() => IntegrationCreatescopesInputSchema),z.string().array() ]).optional(),
  createdAt: z.coerce.date().optional(),
  lastUsedAt: z.coerce.date().optional().nullable(),
  lastRefreshedAt: z.coerce.date().optional().nullable(),
  status: z.lazy(() => IntegrationStatusSchema).optional(),
  genericType: z.lazy(() => GenericTypeSchema),
  metadata: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutIntegrationsInputSchema),
  emails: z.lazy(() => EmailCreateNestedManyWithoutIntegrationInputSchema).optional(),
  messages: z.lazy(() => MessageCreateNestedManyWithoutIntegrationInputSchema).optional()
}).strict();

export const IntegrationUncheckedCreateInputSchema: z.ZodType<Prisma.IntegrationUncheckedCreateInput> = z.object({
  id: z.string().optional(),
  userId: z.string(),
  email: z.string().optional().nullable(),
  type: z.lazy(() => IntegrationTypeSchema),
  providerUserId: z.string().optional().nullable(),
  accessToken: z.string(),
  refreshToken: z.string().optional().nullable(),
  tokenExpiration: z.coerce.date().optional().nullable(),
  recentHistoryId: z.string().optional().nullable(),
  scopes: z.union([ z.lazy(() => IntegrationCreatescopesInputSchema),z.string().array() ]).optional(),
  createdAt: z.coerce.date().optional(),
  lastUsedAt: z.coerce.date().optional().nullable(),
  lastRefreshedAt: z.coerce.date().optional().nullable(),
  status: z.lazy(() => IntegrationStatusSchema).optional(),
  genericType: z.lazy(() => GenericTypeSchema),
  metadata: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  emails: z.lazy(() => EmailUncheckedCreateNestedManyWithoutIntegrationInputSchema).optional(),
  messages: z.lazy(() => MessageUncheckedCreateNestedManyWithoutIntegrationInputSchema).optional()
}).strict();

export const IntegrationUpdateInputSchema: z.ZodType<Prisma.IntegrationUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  type: z.union([ z.lazy(() => IntegrationTypeSchema),z.lazy(() => EnumIntegrationTypeFieldUpdateOperationsInputSchema) ]).optional(),
  providerUserId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  accessToken: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  refreshToken: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  tokenExpiration: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  recentHistoryId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  scopes: z.union([ z.lazy(() => IntegrationUpdatescopesInputSchema),z.string().array() ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  lastUsedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  lastRefreshedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.lazy(() => IntegrationStatusSchema),z.lazy(() => EnumIntegrationStatusFieldUpdateOperationsInputSchema) ]).optional(),
  genericType: z.union([ z.lazy(() => GenericTypeSchema),z.lazy(() => EnumGenericTypeFieldUpdateOperationsInputSchema) ]).optional(),
  metadata: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutIntegrationsNestedInputSchema).optional(),
  emails: z.lazy(() => EmailUpdateManyWithoutIntegrationNestedInputSchema).optional(),
  messages: z.lazy(() => MessageUpdateManyWithoutIntegrationNestedInputSchema).optional()
}).strict();

export const IntegrationUncheckedUpdateInputSchema: z.ZodType<Prisma.IntegrationUncheckedUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  type: z.union([ z.lazy(() => IntegrationTypeSchema),z.lazy(() => EnumIntegrationTypeFieldUpdateOperationsInputSchema) ]).optional(),
  providerUserId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  accessToken: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  refreshToken: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  tokenExpiration: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  recentHistoryId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  scopes: z.union([ z.lazy(() => IntegrationUpdatescopesInputSchema),z.string().array() ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  lastUsedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  lastRefreshedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.lazy(() => IntegrationStatusSchema),z.lazy(() => EnumIntegrationStatusFieldUpdateOperationsInputSchema) ]).optional(),
  genericType: z.union([ z.lazy(() => GenericTypeSchema),z.lazy(() => EnumGenericTypeFieldUpdateOperationsInputSchema) ]).optional(),
  metadata: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  emails: z.lazy(() => EmailUncheckedUpdateManyWithoutIntegrationNestedInputSchema).optional(),
  messages: z.lazy(() => MessageUncheckedUpdateManyWithoutIntegrationNestedInputSchema).optional()
}).strict();

export const IntegrationCreateManyInputSchema: z.ZodType<Prisma.IntegrationCreateManyInput> = z.object({
  id: z.string().optional(),
  userId: z.string(),
  email: z.string().optional().nullable(),
  type: z.lazy(() => IntegrationTypeSchema),
  providerUserId: z.string().optional().nullable(),
  accessToken: z.string(),
  refreshToken: z.string().optional().nullable(),
  tokenExpiration: z.coerce.date().optional().nullable(),
  recentHistoryId: z.string().optional().nullable(),
  scopes: z.union([ z.lazy(() => IntegrationCreatescopesInputSchema),z.string().array() ]).optional(),
  createdAt: z.coerce.date().optional(),
  lastUsedAt: z.coerce.date().optional().nullable(),
  lastRefreshedAt: z.coerce.date().optional().nullable(),
  status: z.lazy(() => IntegrationStatusSchema).optional(),
  genericType: z.lazy(() => GenericTypeSchema),
  metadata: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
}).strict();

export const IntegrationUpdateManyMutationInputSchema: z.ZodType<Prisma.IntegrationUpdateManyMutationInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  type: z.union([ z.lazy(() => IntegrationTypeSchema),z.lazy(() => EnumIntegrationTypeFieldUpdateOperationsInputSchema) ]).optional(),
  providerUserId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  accessToken: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  refreshToken: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  tokenExpiration: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  recentHistoryId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  scopes: z.union([ z.lazy(() => IntegrationUpdatescopesInputSchema),z.string().array() ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  lastUsedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  lastRefreshedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.lazy(() => IntegrationStatusSchema),z.lazy(() => EnumIntegrationStatusFieldUpdateOperationsInputSchema) ]).optional(),
  genericType: z.union([ z.lazy(() => GenericTypeSchema),z.lazy(() => EnumGenericTypeFieldUpdateOperationsInputSchema) ]).optional(),
  metadata: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
}).strict();

export const IntegrationUncheckedUpdateManyInputSchema: z.ZodType<Prisma.IntegrationUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  type: z.union([ z.lazy(() => IntegrationTypeSchema),z.lazy(() => EnumIntegrationTypeFieldUpdateOperationsInputSchema) ]).optional(),
  providerUserId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  accessToken: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  refreshToken: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  tokenExpiration: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  recentHistoryId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  scopes: z.union([ z.lazy(() => IntegrationUpdatescopesInputSchema),z.string().array() ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  lastUsedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  lastRefreshedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.lazy(() => IntegrationStatusSchema),z.lazy(() => EnumIntegrationStatusFieldUpdateOperationsInputSchema) ]).optional(),
  genericType: z.union([ z.lazy(() => GenericTypeSchema),z.lazy(() => EnumGenericTypeFieldUpdateOperationsInputSchema) ]).optional(),
  metadata: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
}).strict();

export const EmailCreateInputSchema: z.ZodType<Prisma.EmailCreateInput> = z.object({
  id: z.string().optional(),
  messageId: z.string(),
  subject: z.string().optional().nullable(),
  from: z.string().optional().nullable(),
  date: z.coerce.date().optional().nullable(),
  body: z.string().optional().nullable(),
  receivedAt: z.coerce.date().optional(),
  processed: z.boolean().optional(),
  integration: z.lazy(() => IntegrationCreateNestedOneWithoutEmailsInputSchema)
}).strict();

export const EmailUncheckedCreateInputSchema: z.ZodType<Prisma.EmailUncheckedCreateInput> = z.object({
  id: z.string().optional(),
  messageId: z.string(),
  integrationId: z.string(),
  subject: z.string().optional().nullable(),
  from: z.string().optional().nullable(),
  date: z.coerce.date().optional().nullable(),
  body: z.string().optional().nullable(),
  receivedAt: z.coerce.date().optional(),
  processed: z.boolean().optional()
}).strict();

export const EmailUpdateInputSchema: z.ZodType<Prisma.EmailUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  messageId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  subject: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  from: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  date: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  body: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  receivedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  processed: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  integration: z.lazy(() => IntegrationUpdateOneRequiredWithoutEmailsNestedInputSchema).optional()
}).strict();

export const EmailUncheckedUpdateInputSchema: z.ZodType<Prisma.EmailUncheckedUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  messageId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  integrationId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  subject: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  from: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  date: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  body: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  receivedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  processed: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const EmailCreateManyInputSchema: z.ZodType<Prisma.EmailCreateManyInput> = z.object({
  id: z.string().optional(),
  messageId: z.string(),
  integrationId: z.string(),
  subject: z.string().optional().nullable(),
  from: z.string().optional().nullable(),
  date: z.coerce.date().optional().nullable(),
  body: z.string().optional().nullable(),
  receivedAt: z.coerce.date().optional(),
  processed: z.boolean().optional()
}).strict();

export const EmailUpdateManyMutationInputSchema: z.ZodType<Prisma.EmailUpdateManyMutationInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  messageId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  subject: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  from: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  date: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  body: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  receivedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  processed: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const EmailUncheckedUpdateManyInputSchema: z.ZodType<Prisma.EmailUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  messageId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  integrationId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  subject: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  from: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  date: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  body: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  receivedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  processed: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const MessageCreateInputSchema: z.ZodType<Prisma.MessageCreateInput> = z.object({
  id: z.string().optional(),
  messageId: z.string(),
  userId: z.string(),
  channelId: z.string(),
  text: z.string(),
  timestamp: z.coerce.date(),
  receivedAt: z.coerce.date().optional(),
  processed: z.boolean().optional(),
  integration: z.lazy(() => IntegrationCreateNestedOneWithoutMessagesInputSchema)
}).strict();

export const MessageUncheckedCreateInputSchema: z.ZodType<Prisma.MessageUncheckedCreateInput> = z.object({
  id: z.string().optional(),
  messageId: z.string(),
  integrationId: z.string(),
  userId: z.string(),
  channelId: z.string(),
  text: z.string(),
  timestamp: z.coerce.date(),
  receivedAt: z.coerce.date().optional(),
  processed: z.boolean().optional()
}).strict();

export const MessageUpdateInputSchema: z.ZodType<Prisma.MessageUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  messageId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  channelId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  text: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  timestamp: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  receivedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  processed: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  integration: z.lazy(() => IntegrationUpdateOneRequiredWithoutMessagesNestedInputSchema).optional()
}).strict();

export const MessageUncheckedUpdateInputSchema: z.ZodType<Prisma.MessageUncheckedUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  messageId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  integrationId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  channelId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  text: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  timestamp: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  receivedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  processed: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const MessageCreateManyInputSchema: z.ZodType<Prisma.MessageCreateManyInput> = z.object({
  id: z.string().optional(),
  messageId: z.string(),
  integrationId: z.string(),
  userId: z.string(),
  channelId: z.string(),
  text: z.string(),
  timestamp: z.coerce.date(),
  receivedAt: z.coerce.date().optional(),
  processed: z.boolean().optional()
}).strict();

export const MessageUpdateManyMutationInputSchema: z.ZodType<Prisma.MessageUpdateManyMutationInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  messageId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  channelId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  text: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  timestamp: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  receivedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  processed: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const MessageUncheckedUpdateManyInputSchema: z.ZodType<Prisma.MessageUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  messageId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  integrationId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  channelId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  text: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  timestamp: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  receivedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  processed: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const StringFilterSchema: z.ZodType<Prisma.StringFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringFilterSchema) ]).optional(),
}).strict();

export const StringNullableFilterSchema: z.ZodType<Prisma.StringNullableFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const DateTimeFilterSchema: z.ZodType<Prisma.DateTimeFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeFilterSchema) ]).optional(),
}).strict();

export const IntegrationListRelationFilterSchema: z.ZodType<Prisma.IntegrationListRelationFilter> = z.object({
  every: z.lazy(() => IntegrationWhereInputSchema).optional(),
  some: z.lazy(() => IntegrationWhereInputSchema).optional(),
  none: z.lazy(() => IntegrationWhereInputSchema).optional()
}).strict();

export const SortOrderInputSchema: z.ZodType<Prisma.SortOrderInput> = z.object({
  sort: z.lazy(() => SortOrderSchema),
  nulls: z.lazy(() => NullsOrderSchema).optional()
}).strict();

export const IntegrationOrderByRelationAggregateInputSchema: z.ZodType<Prisma.IntegrationOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserCountOrderByAggregateInputSchema: z.ZodType<Prisma.UserCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserMaxOrderByAggregateInputSchema: z.ZodType<Prisma.UserMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserMinOrderByAggregateInputSchema: z.ZodType<Prisma.UserMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const StringWithAggregatesFilterSchema: z.ZodType<Prisma.StringWithAggregatesFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional()
}).strict();

export const StringNullableWithAggregatesFilterSchema: z.ZodType<Prisma.StringNullableWithAggregatesFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedStringNullableFilterSchema).optional()
}).strict();

export const DateTimeWithAggregatesFilterSchema: z.ZodType<Prisma.DateTimeWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeFilterSchema).optional()
}).strict();

export const EnumIntegrationTypeFilterSchema: z.ZodType<Prisma.EnumIntegrationTypeFilter> = z.object({
  equals: z.lazy(() => IntegrationTypeSchema).optional(),
  in: z.lazy(() => IntegrationTypeSchema).array().optional(),
  notIn: z.lazy(() => IntegrationTypeSchema).array().optional(),
  not: z.union([ z.lazy(() => IntegrationTypeSchema),z.lazy(() => NestedEnumIntegrationTypeFilterSchema) ]).optional(),
}).strict();

export const DateTimeNullableFilterSchema: z.ZodType<Prisma.DateTimeNullableFilter> = z.object({
  equals: z.coerce.date().optional().nullable(),
  in: z.coerce.date().array().optional().nullable(),
  notIn: z.coerce.date().array().optional().nullable(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const StringNullableListFilterSchema: z.ZodType<Prisma.StringNullableListFilter> = z.object({
  equals: z.string().array().optional().nullable(),
  has: z.string().optional().nullable(),
  hasEvery: z.string().array().optional(),
  hasSome: z.string().array().optional(),
  isEmpty: z.boolean().optional()
}).strict();

export const EnumIntegrationStatusFilterSchema: z.ZodType<Prisma.EnumIntegrationStatusFilter> = z.object({
  equals: z.lazy(() => IntegrationStatusSchema).optional(),
  in: z.lazy(() => IntegrationStatusSchema).array().optional(),
  notIn: z.lazy(() => IntegrationStatusSchema).array().optional(),
  not: z.union([ z.lazy(() => IntegrationStatusSchema),z.lazy(() => NestedEnumIntegrationStatusFilterSchema) ]).optional(),
}).strict();

export const EnumGenericTypeFilterSchema: z.ZodType<Prisma.EnumGenericTypeFilter> = z.object({
  equals: z.lazy(() => GenericTypeSchema).optional(),
  in: z.lazy(() => GenericTypeSchema).array().optional(),
  notIn: z.lazy(() => GenericTypeSchema).array().optional(),
  not: z.union([ z.lazy(() => GenericTypeSchema),z.lazy(() => NestedEnumGenericTypeFilterSchema) ]).optional(),
}).strict();

export const JsonNullableFilterSchema: z.ZodType<Prisma.JsonNullableFilter> = z.object({
  equals: InputJsonValueSchema.optional(),
  path: z.string().array().optional(),
  string_contains: z.string().optional(),
  string_starts_with: z.string().optional(),
  string_ends_with: z.string().optional(),
  array_contains: InputJsonValueSchema.optional().nullable(),
  array_starts_with: InputJsonValueSchema.optional().nullable(),
  array_ends_with: InputJsonValueSchema.optional().nullable(),
  lt: InputJsonValueSchema.optional(),
  lte: InputJsonValueSchema.optional(),
  gt: InputJsonValueSchema.optional(),
  gte: InputJsonValueSchema.optional(),
  not: InputJsonValueSchema.optional()
}).strict();

export const UserRelationFilterSchema: z.ZodType<Prisma.UserRelationFilter> = z.object({
  is: z.lazy(() => UserWhereInputSchema).optional(),
  isNot: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const EmailListRelationFilterSchema: z.ZodType<Prisma.EmailListRelationFilter> = z.object({
  every: z.lazy(() => EmailWhereInputSchema).optional(),
  some: z.lazy(() => EmailWhereInputSchema).optional(),
  none: z.lazy(() => EmailWhereInputSchema).optional()
}).strict();

export const MessageListRelationFilterSchema: z.ZodType<Prisma.MessageListRelationFilter> = z.object({
  every: z.lazy(() => MessageWhereInputSchema).optional(),
  some: z.lazy(() => MessageWhereInputSchema).optional(),
  none: z.lazy(() => MessageWhereInputSchema).optional()
}).strict();

export const EmailOrderByRelationAggregateInputSchema: z.ZodType<Prisma.EmailOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const MessageOrderByRelationAggregateInputSchema: z.ZodType<Prisma.MessageOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const IntegrationCountOrderByAggregateInputSchema: z.ZodType<Prisma.IntegrationCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  providerUserId: z.lazy(() => SortOrderSchema).optional(),
  accessToken: z.lazy(() => SortOrderSchema).optional(),
  refreshToken: z.lazy(() => SortOrderSchema).optional(),
  tokenExpiration: z.lazy(() => SortOrderSchema).optional(),
  recentHistoryId: z.lazy(() => SortOrderSchema).optional(),
  scopes: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  lastUsedAt: z.lazy(() => SortOrderSchema).optional(),
  lastRefreshedAt: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  genericType: z.lazy(() => SortOrderSchema).optional(),
  metadata: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const IntegrationMaxOrderByAggregateInputSchema: z.ZodType<Prisma.IntegrationMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  providerUserId: z.lazy(() => SortOrderSchema).optional(),
  accessToken: z.lazy(() => SortOrderSchema).optional(),
  refreshToken: z.lazy(() => SortOrderSchema).optional(),
  tokenExpiration: z.lazy(() => SortOrderSchema).optional(),
  recentHistoryId: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  lastUsedAt: z.lazy(() => SortOrderSchema).optional(),
  lastRefreshedAt: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  genericType: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const IntegrationMinOrderByAggregateInputSchema: z.ZodType<Prisma.IntegrationMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  providerUserId: z.lazy(() => SortOrderSchema).optional(),
  accessToken: z.lazy(() => SortOrderSchema).optional(),
  refreshToken: z.lazy(() => SortOrderSchema).optional(),
  tokenExpiration: z.lazy(() => SortOrderSchema).optional(),
  recentHistoryId: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  lastUsedAt: z.lazy(() => SortOrderSchema).optional(),
  lastRefreshedAt: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  genericType: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const EnumIntegrationTypeWithAggregatesFilterSchema: z.ZodType<Prisma.EnumIntegrationTypeWithAggregatesFilter> = z.object({
  equals: z.lazy(() => IntegrationTypeSchema).optional(),
  in: z.lazy(() => IntegrationTypeSchema).array().optional(),
  notIn: z.lazy(() => IntegrationTypeSchema).array().optional(),
  not: z.union([ z.lazy(() => IntegrationTypeSchema),z.lazy(() => NestedEnumIntegrationTypeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumIntegrationTypeFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumIntegrationTypeFilterSchema).optional()
}).strict();

export const DateTimeNullableWithAggregatesFilterSchema: z.ZodType<Prisma.DateTimeNullableWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional().nullable(),
  in: z.coerce.date().array().optional().nullable(),
  notIn: z.coerce.date().array().optional().nullable(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeNullableFilterSchema).optional()
}).strict();

export const EnumIntegrationStatusWithAggregatesFilterSchema: z.ZodType<Prisma.EnumIntegrationStatusWithAggregatesFilter> = z.object({
  equals: z.lazy(() => IntegrationStatusSchema).optional(),
  in: z.lazy(() => IntegrationStatusSchema).array().optional(),
  notIn: z.lazy(() => IntegrationStatusSchema).array().optional(),
  not: z.union([ z.lazy(() => IntegrationStatusSchema),z.lazy(() => NestedEnumIntegrationStatusWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumIntegrationStatusFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumIntegrationStatusFilterSchema).optional()
}).strict();

export const EnumGenericTypeWithAggregatesFilterSchema: z.ZodType<Prisma.EnumGenericTypeWithAggregatesFilter> = z.object({
  equals: z.lazy(() => GenericTypeSchema).optional(),
  in: z.lazy(() => GenericTypeSchema).array().optional(),
  notIn: z.lazy(() => GenericTypeSchema).array().optional(),
  not: z.union([ z.lazy(() => GenericTypeSchema),z.lazy(() => NestedEnumGenericTypeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumGenericTypeFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumGenericTypeFilterSchema).optional()
}).strict();

export const JsonNullableWithAggregatesFilterSchema: z.ZodType<Prisma.JsonNullableWithAggregatesFilter> = z.object({
  equals: InputJsonValueSchema.optional(),
  path: z.string().array().optional(),
  string_contains: z.string().optional(),
  string_starts_with: z.string().optional(),
  string_ends_with: z.string().optional(),
  array_contains: InputJsonValueSchema.optional().nullable(),
  array_starts_with: InputJsonValueSchema.optional().nullable(),
  array_ends_with: InputJsonValueSchema.optional().nullable(),
  lt: InputJsonValueSchema.optional(),
  lte: InputJsonValueSchema.optional(),
  gt: InputJsonValueSchema.optional(),
  gte: InputJsonValueSchema.optional(),
  not: InputJsonValueSchema.optional(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedJsonNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedJsonNullableFilterSchema).optional()
}).strict();

export const BoolFilterSchema: z.ZodType<Prisma.BoolFilter> = z.object({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolFilterSchema) ]).optional(),
}).strict();

export const IntegrationRelationFilterSchema: z.ZodType<Prisma.IntegrationRelationFilter> = z.object({
  is: z.lazy(() => IntegrationWhereInputSchema).optional(),
  isNot: z.lazy(() => IntegrationWhereInputSchema).optional()
}).strict();

export const EmailCountOrderByAggregateInputSchema: z.ZodType<Prisma.EmailCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  messageId: z.lazy(() => SortOrderSchema).optional(),
  integrationId: z.lazy(() => SortOrderSchema).optional(),
  subject: z.lazy(() => SortOrderSchema).optional(),
  from: z.lazy(() => SortOrderSchema).optional(),
  date: z.lazy(() => SortOrderSchema).optional(),
  body: z.lazy(() => SortOrderSchema).optional(),
  receivedAt: z.lazy(() => SortOrderSchema).optional(),
  processed: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const EmailMaxOrderByAggregateInputSchema: z.ZodType<Prisma.EmailMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  messageId: z.lazy(() => SortOrderSchema).optional(),
  integrationId: z.lazy(() => SortOrderSchema).optional(),
  subject: z.lazy(() => SortOrderSchema).optional(),
  from: z.lazy(() => SortOrderSchema).optional(),
  date: z.lazy(() => SortOrderSchema).optional(),
  body: z.lazy(() => SortOrderSchema).optional(),
  receivedAt: z.lazy(() => SortOrderSchema).optional(),
  processed: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const EmailMinOrderByAggregateInputSchema: z.ZodType<Prisma.EmailMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  messageId: z.lazy(() => SortOrderSchema).optional(),
  integrationId: z.lazy(() => SortOrderSchema).optional(),
  subject: z.lazy(() => SortOrderSchema).optional(),
  from: z.lazy(() => SortOrderSchema).optional(),
  date: z.lazy(() => SortOrderSchema).optional(),
  body: z.lazy(() => SortOrderSchema).optional(),
  receivedAt: z.lazy(() => SortOrderSchema).optional(),
  processed: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const BoolWithAggregatesFilterSchema: z.ZodType<Prisma.BoolWithAggregatesFilter> = z.object({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedBoolFilterSchema).optional(),
  _max: z.lazy(() => NestedBoolFilterSchema).optional()
}).strict();

export const MessageCountOrderByAggregateInputSchema: z.ZodType<Prisma.MessageCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  messageId: z.lazy(() => SortOrderSchema).optional(),
  integrationId: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  channelId: z.lazy(() => SortOrderSchema).optional(),
  text: z.lazy(() => SortOrderSchema).optional(),
  timestamp: z.lazy(() => SortOrderSchema).optional(),
  receivedAt: z.lazy(() => SortOrderSchema).optional(),
  processed: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const MessageMaxOrderByAggregateInputSchema: z.ZodType<Prisma.MessageMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  messageId: z.lazy(() => SortOrderSchema).optional(),
  integrationId: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  channelId: z.lazy(() => SortOrderSchema).optional(),
  text: z.lazy(() => SortOrderSchema).optional(),
  timestamp: z.lazy(() => SortOrderSchema).optional(),
  receivedAt: z.lazy(() => SortOrderSchema).optional(),
  processed: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const MessageMinOrderByAggregateInputSchema: z.ZodType<Prisma.MessageMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  messageId: z.lazy(() => SortOrderSchema).optional(),
  integrationId: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  channelId: z.lazy(() => SortOrderSchema).optional(),
  text: z.lazy(() => SortOrderSchema).optional(),
  timestamp: z.lazy(() => SortOrderSchema).optional(),
  receivedAt: z.lazy(() => SortOrderSchema).optional(),
  processed: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const IntegrationCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.IntegrationCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => IntegrationCreateWithoutUserInputSchema),z.lazy(() => IntegrationCreateWithoutUserInputSchema).array(),z.lazy(() => IntegrationUncheckedCreateWithoutUserInputSchema),z.lazy(() => IntegrationUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => IntegrationCreateOrConnectWithoutUserInputSchema),z.lazy(() => IntegrationCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => IntegrationCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => IntegrationWhereUniqueInputSchema),z.lazy(() => IntegrationWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const IntegrationUncheckedCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.IntegrationUncheckedCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => IntegrationCreateWithoutUserInputSchema),z.lazy(() => IntegrationCreateWithoutUserInputSchema).array(),z.lazy(() => IntegrationUncheckedCreateWithoutUserInputSchema),z.lazy(() => IntegrationUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => IntegrationCreateOrConnectWithoutUserInputSchema),z.lazy(() => IntegrationCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => IntegrationCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => IntegrationWhereUniqueInputSchema),z.lazy(() => IntegrationWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const StringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.StringFieldUpdateOperationsInput> = z.object({
  set: z.string().optional()
}).strict();

export const NullableStringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableStringFieldUpdateOperationsInput> = z.object({
  set: z.string().optional().nullable()
}).strict();

export const DateTimeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.DateTimeFieldUpdateOperationsInput> = z.object({
  set: z.coerce.date().optional()
}).strict();

export const IntegrationUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.IntegrationUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => IntegrationCreateWithoutUserInputSchema),z.lazy(() => IntegrationCreateWithoutUserInputSchema).array(),z.lazy(() => IntegrationUncheckedCreateWithoutUserInputSchema),z.lazy(() => IntegrationUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => IntegrationCreateOrConnectWithoutUserInputSchema),z.lazy(() => IntegrationCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => IntegrationUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => IntegrationUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => IntegrationCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => IntegrationWhereUniqueInputSchema),z.lazy(() => IntegrationWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => IntegrationWhereUniqueInputSchema),z.lazy(() => IntegrationWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => IntegrationWhereUniqueInputSchema),z.lazy(() => IntegrationWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => IntegrationWhereUniqueInputSchema),z.lazy(() => IntegrationWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => IntegrationUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => IntegrationUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => IntegrationUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => IntegrationUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => IntegrationScalarWhereInputSchema),z.lazy(() => IntegrationScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const IntegrationUncheckedUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.IntegrationUncheckedUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => IntegrationCreateWithoutUserInputSchema),z.lazy(() => IntegrationCreateWithoutUserInputSchema).array(),z.lazy(() => IntegrationUncheckedCreateWithoutUserInputSchema),z.lazy(() => IntegrationUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => IntegrationCreateOrConnectWithoutUserInputSchema),z.lazy(() => IntegrationCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => IntegrationUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => IntegrationUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => IntegrationCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => IntegrationWhereUniqueInputSchema),z.lazy(() => IntegrationWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => IntegrationWhereUniqueInputSchema),z.lazy(() => IntegrationWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => IntegrationWhereUniqueInputSchema),z.lazy(() => IntegrationWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => IntegrationWhereUniqueInputSchema),z.lazy(() => IntegrationWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => IntegrationUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => IntegrationUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => IntegrationUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => IntegrationUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => IntegrationScalarWhereInputSchema),z.lazy(() => IntegrationScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const IntegrationCreatescopesInputSchema: z.ZodType<Prisma.IntegrationCreatescopesInput> = z.object({
  set: z.string().array()
}).strict();

export const UserCreateNestedOneWithoutIntegrationsInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutIntegrationsInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutIntegrationsInputSchema),z.lazy(() => UserUncheckedCreateWithoutIntegrationsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutIntegrationsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export const EmailCreateNestedManyWithoutIntegrationInputSchema: z.ZodType<Prisma.EmailCreateNestedManyWithoutIntegrationInput> = z.object({
  create: z.union([ z.lazy(() => EmailCreateWithoutIntegrationInputSchema),z.lazy(() => EmailCreateWithoutIntegrationInputSchema).array(),z.lazy(() => EmailUncheckedCreateWithoutIntegrationInputSchema),z.lazy(() => EmailUncheckedCreateWithoutIntegrationInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => EmailCreateOrConnectWithoutIntegrationInputSchema),z.lazy(() => EmailCreateOrConnectWithoutIntegrationInputSchema).array() ]).optional(),
  createMany: z.lazy(() => EmailCreateManyIntegrationInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => EmailWhereUniqueInputSchema),z.lazy(() => EmailWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const MessageCreateNestedManyWithoutIntegrationInputSchema: z.ZodType<Prisma.MessageCreateNestedManyWithoutIntegrationInput> = z.object({
  create: z.union([ z.lazy(() => MessageCreateWithoutIntegrationInputSchema),z.lazy(() => MessageCreateWithoutIntegrationInputSchema).array(),z.lazy(() => MessageUncheckedCreateWithoutIntegrationInputSchema),z.lazy(() => MessageUncheckedCreateWithoutIntegrationInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => MessageCreateOrConnectWithoutIntegrationInputSchema),z.lazy(() => MessageCreateOrConnectWithoutIntegrationInputSchema).array() ]).optional(),
  createMany: z.lazy(() => MessageCreateManyIntegrationInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => MessageWhereUniqueInputSchema),z.lazy(() => MessageWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const EmailUncheckedCreateNestedManyWithoutIntegrationInputSchema: z.ZodType<Prisma.EmailUncheckedCreateNestedManyWithoutIntegrationInput> = z.object({
  create: z.union([ z.lazy(() => EmailCreateWithoutIntegrationInputSchema),z.lazy(() => EmailCreateWithoutIntegrationInputSchema).array(),z.lazy(() => EmailUncheckedCreateWithoutIntegrationInputSchema),z.lazy(() => EmailUncheckedCreateWithoutIntegrationInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => EmailCreateOrConnectWithoutIntegrationInputSchema),z.lazy(() => EmailCreateOrConnectWithoutIntegrationInputSchema).array() ]).optional(),
  createMany: z.lazy(() => EmailCreateManyIntegrationInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => EmailWhereUniqueInputSchema),z.lazy(() => EmailWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const MessageUncheckedCreateNestedManyWithoutIntegrationInputSchema: z.ZodType<Prisma.MessageUncheckedCreateNestedManyWithoutIntegrationInput> = z.object({
  create: z.union([ z.lazy(() => MessageCreateWithoutIntegrationInputSchema),z.lazy(() => MessageCreateWithoutIntegrationInputSchema).array(),z.lazy(() => MessageUncheckedCreateWithoutIntegrationInputSchema),z.lazy(() => MessageUncheckedCreateWithoutIntegrationInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => MessageCreateOrConnectWithoutIntegrationInputSchema),z.lazy(() => MessageCreateOrConnectWithoutIntegrationInputSchema).array() ]).optional(),
  createMany: z.lazy(() => MessageCreateManyIntegrationInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => MessageWhereUniqueInputSchema),z.lazy(() => MessageWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const EnumIntegrationTypeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumIntegrationTypeFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => IntegrationTypeSchema).optional()
}).strict();

export const NullableDateTimeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableDateTimeFieldUpdateOperationsInput> = z.object({
  set: z.coerce.date().optional().nullable()
}).strict();

export const IntegrationUpdatescopesInputSchema: z.ZodType<Prisma.IntegrationUpdatescopesInput> = z.object({
  set: z.string().array().optional(),
  push: z.union([ z.string(),z.string().array() ]).optional(),
}).strict();

export const EnumIntegrationStatusFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumIntegrationStatusFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => IntegrationStatusSchema).optional()
}).strict();

export const EnumGenericTypeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumGenericTypeFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => GenericTypeSchema).optional()
}).strict();

export const UserUpdateOneRequiredWithoutIntegrationsNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutIntegrationsNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutIntegrationsInputSchema),z.lazy(() => UserUncheckedCreateWithoutIntegrationsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutIntegrationsInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutIntegrationsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutIntegrationsInputSchema),z.lazy(() => UserUpdateWithoutIntegrationsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutIntegrationsInputSchema) ]).optional(),
}).strict();

export const EmailUpdateManyWithoutIntegrationNestedInputSchema: z.ZodType<Prisma.EmailUpdateManyWithoutIntegrationNestedInput> = z.object({
  create: z.union([ z.lazy(() => EmailCreateWithoutIntegrationInputSchema),z.lazy(() => EmailCreateWithoutIntegrationInputSchema).array(),z.lazy(() => EmailUncheckedCreateWithoutIntegrationInputSchema),z.lazy(() => EmailUncheckedCreateWithoutIntegrationInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => EmailCreateOrConnectWithoutIntegrationInputSchema),z.lazy(() => EmailCreateOrConnectWithoutIntegrationInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => EmailUpsertWithWhereUniqueWithoutIntegrationInputSchema),z.lazy(() => EmailUpsertWithWhereUniqueWithoutIntegrationInputSchema).array() ]).optional(),
  createMany: z.lazy(() => EmailCreateManyIntegrationInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => EmailWhereUniqueInputSchema),z.lazy(() => EmailWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => EmailWhereUniqueInputSchema),z.lazy(() => EmailWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => EmailWhereUniqueInputSchema),z.lazy(() => EmailWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => EmailWhereUniqueInputSchema),z.lazy(() => EmailWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => EmailUpdateWithWhereUniqueWithoutIntegrationInputSchema),z.lazy(() => EmailUpdateWithWhereUniqueWithoutIntegrationInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => EmailUpdateManyWithWhereWithoutIntegrationInputSchema),z.lazy(() => EmailUpdateManyWithWhereWithoutIntegrationInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => EmailScalarWhereInputSchema),z.lazy(() => EmailScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const MessageUpdateManyWithoutIntegrationNestedInputSchema: z.ZodType<Prisma.MessageUpdateManyWithoutIntegrationNestedInput> = z.object({
  create: z.union([ z.lazy(() => MessageCreateWithoutIntegrationInputSchema),z.lazy(() => MessageCreateWithoutIntegrationInputSchema).array(),z.lazy(() => MessageUncheckedCreateWithoutIntegrationInputSchema),z.lazy(() => MessageUncheckedCreateWithoutIntegrationInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => MessageCreateOrConnectWithoutIntegrationInputSchema),z.lazy(() => MessageCreateOrConnectWithoutIntegrationInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => MessageUpsertWithWhereUniqueWithoutIntegrationInputSchema),z.lazy(() => MessageUpsertWithWhereUniqueWithoutIntegrationInputSchema).array() ]).optional(),
  createMany: z.lazy(() => MessageCreateManyIntegrationInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => MessageWhereUniqueInputSchema),z.lazy(() => MessageWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => MessageWhereUniqueInputSchema),z.lazy(() => MessageWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => MessageWhereUniqueInputSchema),z.lazy(() => MessageWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => MessageWhereUniqueInputSchema),z.lazy(() => MessageWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => MessageUpdateWithWhereUniqueWithoutIntegrationInputSchema),z.lazy(() => MessageUpdateWithWhereUniqueWithoutIntegrationInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => MessageUpdateManyWithWhereWithoutIntegrationInputSchema),z.lazy(() => MessageUpdateManyWithWhereWithoutIntegrationInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => MessageScalarWhereInputSchema),z.lazy(() => MessageScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const EmailUncheckedUpdateManyWithoutIntegrationNestedInputSchema: z.ZodType<Prisma.EmailUncheckedUpdateManyWithoutIntegrationNestedInput> = z.object({
  create: z.union([ z.lazy(() => EmailCreateWithoutIntegrationInputSchema),z.lazy(() => EmailCreateWithoutIntegrationInputSchema).array(),z.lazy(() => EmailUncheckedCreateWithoutIntegrationInputSchema),z.lazy(() => EmailUncheckedCreateWithoutIntegrationInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => EmailCreateOrConnectWithoutIntegrationInputSchema),z.lazy(() => EmailCreateOrConnectWithoutIntegrationInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => EmailUpsertWithWhereUniqueWithoutIntegrationInputSchema),z.lazy(() => EmailUpsertWithWhereUniqueWithoutIntegrationInputSchema).array() ]).optional(),
  createMany: z.lazy(() => EmailCreateManyIntegrationInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => EmailWhereUniqueInputSchema),z.lazy(() => EmailWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => EmailWhereUniqueInputSchema),z.lazy(() => EmailWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => EmailWhereUniqueInputSchema),z.lazy(() => EmailWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => EmailWhereUniqueInputSchema),z.lazy(() => EmailWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => EmailUpdateWithWhereUniqueWithoutIntegrationInputSchema),z.lazy(() => EmailUpdateWithWhereUniqueWithoutIntegrationInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => EmailUpdateManyWithWhereWithoutIntegrationInputSchema),z.lazy(() => EmailUpdateManyWithWhereWithoutIntegrationInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => EmailScalarWhereInputSchema),z.lazy(() => EmailScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const MessageUncheckedUpdateManyWithoutIntegrationNestedInputSchema: z.ZodType<Prisma.MessageUncheckedUpdateManyWithoutIntegrationNestedInput> = z.object({
  create: z.union([ z.lazy(() => MessageCreateWithoutIntegrationInputSchema),z.lazy(() => MessageCreateWithoutIntegrationInputSchema).array(),z.lazy(() => MessageUncheckedCreateWithoutIntegrationInputSchema),z.lazy(() => MessageUncheckedCreateWithoutIntegrationInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => MessageCreateOrConnectWithoutIntegrationInputSchema),z.lazy(() => MessageCreateOrConnectWithoutIntegrationInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => MessageUpsertWithWhereUniqueWithoutIntegrationInputSchema),z.lazy(() => MessageUpsertWithWhereUniqueWithoutIntegrationInputSchema).array() ]).optional(),
  createMany: z.lazy(() => MessageCreateManyIntegrationInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => MessageWhereUniqueInputSchema),z.lazy(() => MessageWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => MessageWhereUniqueInputSchema),z.lazy(() => MessageWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => MessageWhereUniqueInputSchema),z.lazy(() => MessageWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => MessageWhereUniqueInputSchema),z.lazy(() => MessageWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => MessageUpdateWithWhereUniqueWithoutIntegrationInputSchema),z.lazy(() => MessageUpdateWithWhereUniqueWithoutIntegrationInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => MessageUpdateManyWithWhereWithoutIntegrationInputSchema),z.lazy(() => MessageUpdateManyWithWhereWithoutIntegrationInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => MessageScalarWhereInputSchema),z.lazy(() => MessageScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const IntegrationCreateNestedOneWithoutEmailsInputSchema: z.ZodType<Prisma.IntegrationCreateNestedOneWithoutEmailsInput> = z.object({
  create: z.union([ z.lazy(() => IntegrationCreateWithoutEmailsInputSchema),z.lazy(() => IntegrationUncheckedCreateWithoutEmailsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => IntegrationCreateOrConnectWithoutEmailsInputSchema).optional(),
  connect: z.lazy(() => IntegrationWhereUniqueInputSchema).optional()
}).strict();

export const BoolFieldUpdateOperationsInputSchema: z.ZodType<Prisma.BoolFieldUpdateOperationsInput> = z.object({
  set: z.boolean().optional()
}).strict();

export const IntegrationUpdateOneRequiredWithoutEmailsNestedInputSchema: z.ZodType<Prisma.IntegrationUpdateOneRequiredWithoutEmailsNestedInput> = z.object({
  create: z.union([ z.lazy(() => IntegrationCreateWithoutEmailsInputSchema),z.lazy(() => IntegrationUncheckedCreateWithoutEmailsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => IntegrationCreateOrConnectWithoutEmailsInputSchema).optional(),
  upsert: z.lazy(() => IntegrationUpsertWithoutEmailsInputSchema).optional(),
  connect: z.lazy(() => IntegrationWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => IntegrationUpdateToOneWithWhereWithoutEmailsInputSchema),z.lazy(() => IntegrationUpdateWithoutEmailsInputSchema),z.lazy(() => IntegrationUncheckedUpdateWithoutEmailsInputSchema) ]).optional(),
}).strict();

export const IntegrationCreateNestedOneWithoutMessagesInputSchema: z.ZodType<Prisma.IntegrationCreateNestedOneWithoutMessagesInput> = z.object({
  create: z.union([ z.lazy(() => IntegrationCreateWithoutMessagesInputSchema),z.lazy(() => IntegrationUncheckedCreateWithoutMessagesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => IntegrationCreateOrConnectWithoutMessagesInputSchema).optional(),
  connect: z.lazy(() => IntegrationWhereUniqueInputSchema).optional()
}).strict();

export const IntegrationUpdateOneRequiredWithoutMessagesNestedInputSchema: z.ZodType<Prisma.IntegrationUpdateOneRequiredWithoutMessagesNestedInput> = z.object({
  create: z.union([ z.lazy(() => IntegrationCreateWithoutMessagesInputSchema),z.lazy(() => IntegrationUncheckedCreateWithoutMessagesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => IntegrationCreateOrConnectWithoutMessagesInputSchema).optional(),
  upsert: z.lazy(() => IntegrationUpsertWithoutMessagesInputSchema).optional(),
  connect: z.lazy(() => IntegrationWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => IntegrationUpdateToOneWithWhereWithoutMessagesInputSchema),z.lazy(() => IntegrationUpdateWithoutMessagesInputSchema),z.lazy(() => IntegrationUncheckedUpdateWithoutMessagesInputSchema) ]).optional(),
}).strict();

export const NestedStringFilterSchema: z.ZodType<Prisma.NestedStringFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringFilterSchema) ]).optional(),
}).strict();

export const NestedStringNullableFilterSchema: z.ZodType<Prisma.NestedStringNullableFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedDateTimeFilterSchema: z.ZodType<Prisma.NestedDateTimeFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeFilterSchema) ]).optional(),
}).strict();

export const NestedStringWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringWithAggregatesFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional()
}).strict();

export const NestedIntFilterSchema: z.ZodType<Prisma.NestedIntFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntFilterSchema) ]).optional(),
}).strict();

export const NestedStringNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringNullableWithAggregatesFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedStringNullableFilterSchema).optional()
}).strict();

export const NestedIntNullableFilterSchema: z.ZodType<Prisma.NestedIntNullableFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedDateTimeWithAggregatesFilterSchema: z.ZodType<Prisma.NestedDateTimeWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeFilterSchema).optional()
}).strict();

export const NestedEnumIntegrationTypeFilterSchema: z.ZodType<Prisma.NestedEnumIntegrationTypeFilter> = z.object({
  equals: z.lazy(() => IntegrationTypeSchema).optional(),
  in: z.lazy(() => IntegrationTypeSchema).array().optional(),
  notIn: z.lazy(() => IntegrationTypeSchema).array().optional(),
  not: z.union([ z.lazy(() => IntegrationTypeSchema),z.lazy(() => NestedEnumIntegrationTypeFilterSchema) ]).optional(),
}).strict();

export const NestedDateTimeNullableFilterSchema: z.ZodType<Prisma.NestedDateTimeNullableFilter> = z.object({
  equals: z.coerce.date().optional().nullable(),
  in: z.coerce.date().array().optional().nullable(),
  notIn: z.coerce.date().array().optional().nullable(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedEnumIntegrationStatusFilterSchema: z.ZodType<Prisma.NestedEnumIntegrationStatusFilter> = z.object({
  equals: z.lazy(() => IntegrationStatusSchema).optional(),
  in: z.lazy(() => IntegrationStatusSchema).array().optional(),
  notIn: z.lazy(() => IntegrationStatusSchema).array().optional(),
  not: z.union([ z.lazy(() => IntegrationStatusSchema),z.lazy(() => NestedEnumIntegrationStatusFilterSchema) ]).optional(),
}).strict();

export const NestedEnumGenericTypeFilterSchema: z.ZodType<Prisma.NestedEnumGenericTypeFilter> = z.object({
  equals: z.lazy(() => GenericTypeSchema).optional(),
  in: z.lazy(() => GenericTypeSchema).array().optional(),
  notIn: z.lazy(() => GenericTypeSchema).array().optional(),
  not: z.union([ z.lazy(() => GenericTypeSchema),z.lazy(() => NestedEnumGenericTypeFilterSchema) ]).optional(),
}).strict();

export const NestedEnumIntegrationTypeWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumIntegrationTypeWithAggregatesFilter> = z.object({
  equals: z.lazy(() => IntegrationTypeSchema).optional(),
  in: z.lazy(() => IntegrationTypeSchema).array().optional(),
  notIn: z.lazy(() => IntegrationTypeSchema).array().optional(),
  not: z.union([ z.lazy(() => IntegrationTypeSchema),z.lazy(() => NestedEnumIntegrationTypeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumIntegrationTypeFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumIntegrationTypeFilterSchema).optional()
}).strict();

export const NestedDateTimeNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedDateTimeNullableWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional().nullable(),
  in: z.coerce.date().array().optional().nullable(),
  notIn: z.coerce.date().array().optional().nullable(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeNullableFilterSchema).optional()
}).strict();

export const NestedEnumIntegrationStatusWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumIntegrationStatusWithAggregatesFilter> = z.object({
  equals: z.lazy(() => IntegrationStatusSchema).optional(),
  in: z.lazy(() => IntegrationStatusSchema).array().optional(),
  notIn: z.lazy(() => IntegrationStatusSchema).array().optional(),
  not: z.union([ z.lazy(() => IntegrationStatusSchema),z.lazy(() => NestedEnumIntegrationStatusWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumIntegrationStatusFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumIntegrationStatusFilterSchema).optional()
}).strict();

export const NestedEnumGenericTypeWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumGenericTypeWithAggregatesFilter> = z.object({
  equals: z.lazy(() => GenericTypeSchema).optional(),
  in: z.lazy(() => GenericTypeSchema).array().optional(),
  notIn: z.lazy(() => GenericTypeSchema).array().optional(),
  not: z.union([ z.lazy(() => GenericTypeSchema),z.lazy(() => NestedEnumGenericTypeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumGenericTypeFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumGenericTypeFilterSchema).optional()
}).strict();

export const NestedJsonNullableFilterSchema: z.ZodType<Prisma.NestedJsonNullableFilter> = z.object({
  equals: InputJsonValueSchema.optional(),
  path: z.string().array().optional(),
  string_contains: z.string().optional(),
  string_starts_with: z.string().optional(),
  string_ends_with: z.string().optional(),
  array_contains: InputJsonValueSchema.optional().nullable(),
  array_starts_with: InputJsonValueSchema.optional().nullable(),
  array_ends_with: InputJsonValueSchema.optional().nullable(),
  lt: InputJsonValueSchema.optional(),
  lte: InputJsonValueSchema.optional(),
  gt: InputJsonValueSchema.optional(),
  gte: InputJsonValueSchema.optional(),
  not: InputJsonValueSchema.optional()
}).strict();

export const NestedBoolFilterSchema: z.ZodType<Prisma.NestedBoolFilter> = z.object({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolFilterSchema) ]).optional(),
}).strict();

export const NestedBoolWithAggregatesFilterSchema: z.ZodType<Prisma.NestedBoolWithAggregatesFilter> = z.object({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedBoolFilterSchema).optional(),
  _max: z.lazy(() => NestedBoolFilterSchema).optional()
}).strict();

export const IntegrationCreateWithoutUserInputSchema: z.ZodType<Prisma.IntegrationCreateWithoutUserInput> = z.object({
  id: z.string().optional(),
  email: z.string().optional().nullable(),
  type: z.lazy(() => IntegrationTypeSchema),
  providerUserId: z.string().optional().nullable(),
  accessToken: z.string(),
  refreshToken: z.string().optional().nullable(),
  tokenExpiration: z.coerce.date().optional().nullable(),
  recentHistoryId: z.string().optional().nullable(),
  scopes: z.union([ z.lazy(() => IntegrationCreatescopesInputSchema),z.string().array() ]).optional(),
  createdAt: z.coerce.date().optional(),
  lastUsedAt: z.coerce.date().optional().nullable(),
  lastRefreshedAt: z.coerce.date().optional().nullable(),
  status: z.lazy(() => IntegrationStatusSchema).optional(),
  genericType: z.lazy(() => GenericTypeSchema),
  metadata: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  emails: z.lazy(() => EmailCreateNestedManyWithoutIntegrationInputSchema).optional(),
  messages: z.lazy(() => MessageCreateNestedManyWithoutIntegrationInputSchema).optional()
}).strict();

export const IntegrationUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.IntegrationUncheckedCreateWithoutUserInput> = z.object({
  id: z.string().optional(),
  email: z.string().optional().nullable(),
  type: z.lazy(() => IntegrationTypeSchema),
  providerUserId: z.string().optional().nullable(),
  accessToken: z.string(),
  refreshToken: z.string().optional().nullable(),
  tokenExpiration: z.coerce.date().optional().nullable(),
  recentHistoryId: z.string().optional().nullable(),
  scopes: z.union([ z.lazy(() => IntegrationCreatescopesInputSchema),z.string().array() ]).optional(),
  createdAt: z.coerce.date().optional(),
  lastUsedAt: z.coerce.date().optional().nullable(),
  lastRefreshedAt: z.coerce.date().optional().nullable(),
  status: z.lazy(() => IntegrationStatusSchema).optional(),
  genericType: z.lazy(() => GenericTypeSchema),
  metadata: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  emails: z.lazy(() => EmailUncheckedCreateNestedManyWithoutIntegrationInputSchema).optional(),
  messages: z.lazy(() => MessageUncheckedCreateNestedManyWithoutIntegrationInputSchema).optional()
}).strict();

export const IntegrationCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.IntegrationCreateOrConnectWithoutUserInput> = z.object({
  where: z.lazy(() => IntegrationWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => IntegrationCreateWithoutUserInputSchema),z.lazy(() => IntegrationUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const IntegrationCreateManyUserInputEnvelopeSchema: z.ZodType<Prisma.IntegrationCreateManyUserInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => IntegrationCreateManyUserInputSchema),z.lazy(() => IntegrationCreateManyUserInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const IntegrationUpsertWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.IntegrationUpsertWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => IntegrationWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => IntegrationUpdateWithoutUserInputSchema),z.lazy(() => IntegrationUncheckedUpdateWithoutUserInputSchema) ]),
  create: z.union([ z.lazy(() => IntegrationCreateWithoutUserInputSchema),z.lazy(() => IntegrationUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const IntegrationUpdateWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.IntegrationUpdateWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => IntegrationWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => IntegrationUpdateWithoutUserInputSchema),z.lazy(() => IntegrationUncheckedUpdateWithoutUserInputSchema) ]),
}).strict();

export const IntegrationUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<Prisma.IntegrationUpdateManyWithWhereWithoutUserInput> = z.object({
  where: z.lazy(() => IntegrationScalarWhereInputSchema),
  data: z.union([ z.lazy(() => IntegrationUpdateManyMutationInputSchema),z.lazy(() => IntegrationUncheckedUpdateManyWithoutUserInputSchema) ]),
}).strict();

export const IntegrationScalarWhereInputSchema: z.ZodType<Prisma.IntegrationScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => IntegrationScalarWhereInputSchema),z.lazy(() => IntegrationScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => IntegrationScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => IntegrationScalarWhereInputSchema),z.lazy(() => IntegrationScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  email: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  type: z.union([ z.lazy(() => EnumIntegrationTypeFilterSchema),z.lazy(() => IntegrationTypeSchema) ]).optional(),
  providerUserId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  accessToken: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  refreshToken: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  tokenExpiration: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  recentHistoryId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  scopes: z.lazy(() => StringNullableListFilterSchema).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  lastUsedAt: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  lastRefreshedAt: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  status: z.union([ z.lazy(() => EnumIntegrationStatusFilterSchema),z.lazy(() => IntegrationStatusSchema) ]).optional(),
  genericType: z.union([ z.lazy(() => EnumGenericTypeFilterSchema),z.lazy(() => GenericTypeSchema) ]).optional(),
  metadata: z.lazy(() => JsonNullableFilterSchema).optional()
}).strict();

export const UserCreateWithoutIntegrationsInputSchema: z.ZodType<Prisma.UserCreateWithoutIntegrationsInput> = z.object({
  id: z.string(),
  name: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const UserUncheckedCreateWithoutIntegrationsInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutIntegrationsInput> = z.object({
  id: z.string(),
  name: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const UserCreateOrConnectWithoutIntegrationsInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutIntegrationsInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutIntegrationsInputSchema),z.lazy(() => UserUncheckedCreateWithoutIntegrationsInputSchema) ]),
}).strict();

export const EmailCreateWithoutIntegrationInputSchema: z.ZodType<Prisma.EmailCreateWithoutIntegrationInput> = z.object({
  id: z.string().optional(),
  messageId: z.string(),
  subject: z.string().optional().nullable(),
  from: z.string().optional().nullable(),
  date: z.coerce.date().optional().nullable(),
  body: z.string().optional().nullable(),
  receivedAt: z.coerce.date().optional(),
  processed: z.boolean().optional()
}).strict();

export const EmailUncheckedCreateWithoutIntegrationInputSchema: z.ZodType<Prisma.EmailUncheckedCreateWithoutIntegrationInput> = z.object({
  id: z.string().optional(),
  messageId: z.string(),
  subject: z.string().optional().nullable(),
  from: z.string().optional().nullable(),
  date: z.coerce.date().optional().nullable(),
  body: z.string().optional().nullable(),
  receivedAt: z.coerce.date().optional(),
  processed: z.boolean().optional()
}).strict();

export const EmailCreateOrConnectWithoutIntegrationInputSchema: z.ZodType<Prisma.EmailCreateOrConnectWithoutIntegrationInput> = z.object({
  where: z.lazy(() => EmailWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => EmailCreateWithoutIntegrationInputSchema),z.lazy(() => EmailUncheckedCreateWithoutIntegrationInputSchema) ]),
}).strict();

export const EmailCreateManyIntegrationInputEnvelopeSchema: z.ZodType<Prisma.EmailCreateManyIntegrationInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => EmailCreateManyIntegrationInputSchema),z.lazy(() => EmailCreateManyIntegrationInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const MessageCreateWithoutIntegrationInputSchema: z.ZodType<Prisma.MessageCreateWithoutIntegrationInput> = z.object({
  id: z.string().optional(),
  messageId: z.string(),
  userId: z.string(),
  channelId: z.string(),
  text: z.string(),
  timestamp: z.coerce.date(),
  receivedAt: z.coerce.date().optional(),
  processed: z.boolean().optional()
}).strict();

export const MessageUncheckedCreateWithoutIntegrationInputSchema: z.ZodType<Prisma.MessageUncheckedCreateWithoutIntegrationInput> = z.object({
  id: z.string().optional(),
  messageId: z.string(),
  userId: z.string(),
  channelId: z.string(),
  text: z.string(),
  timestamp: z.coerce.date(),
  receivedAt: z.coerce.date().optional(),
  processed: z.boolean().optional()
}).strict();

export const MessageCreateOrConnectWithoutIntegrationInputSchema: z.ZodType<Prisma.MessageCreateOrConnectWithoutIntegrationInput> = z.object({
  where: z.lazy(() => MessageWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => MessageCreateWithoutIntegrationInputSchema),z.lazy(() => MessageUncheckedCreateWithoutIntegrationInputSchema) ]),
}).strict();

export const MessageCreateManyIntegrationInputEnvelopeSchema: z.ZodType<Prisma.MessageCreateManyIntegrationInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => MessageCreateManyIntegrationInputSchema),z.lazy(() => MessageCreateManyIntegrationInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const UserUpsertWithoutIntegrationsInputSchema: z.ZodType<Prisma.UserUpsertWithoutIntegrationsInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutIntegrationsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutIntegrationsInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutIntegrationsInputSchema),z.lazy(() => UserUncheckedCreateWithoutIntegrationsInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const UserUpdateToOneWithWhereWithoutIntegrationsInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutIntegrationsInput> = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutIntegrationsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutIntegrationsInputSchema) ]),
}).strict();

export const UserUpdateWithoutIntegrationsInputSchema: z.ZodType<Prisma.UserUpdateWithoutIntegrationsInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserUncheckedUpdateWithoutIntegrationsInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutIntegrationsInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const EmailUpsertWithWhereUniqueWithoutIntegrationInputSchema: z.ZodType<Prisma.EmailUpsertWithWhereUniqueWithoutIntegrationInput> = z.object({
  where: z.lazy(() => EmailWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => EmailUpdateWithoutIntegrationInputSchema),z.lazy(() => EmailUncheckedUpdateWithoutIntegrationInputSchema) ]),
  create: z.union([ z.lazy(() => EmailCreateWithoutIntegrationInputSchema),z.lazy(() => EmailUncheckedCreateWithoutIntegrationInputSchema) ]),
}).strict();

export const EmailUpdateWithWhereUniqueWithoutIntegrationInputSchema: z.ZodType<Prisma.EmailUpdateWithWhereUniqueWithoutIntegrationInput> = z.object({
  where: z.lazy(() => EmailWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => EmailUpdateWithoutIntegrationInputSchema),z.lazy(() => EmailUncheckedUpdateWithoutIntegrationInputSchema) ]),
}).strict();

export const EmailUpdateManyWithWhereWithoutIntegrationInputSchema: z.ZodType<Prisma.EmailUpdateManyWithWhereWithoutIntegrationInput> = z.object({
  where: z.lazy(() => EmailScalarWhereInputSchema),
  data: z.union([ z.lazy(() => EmailUpdateManyMutationInputSchema),z.lazy(() => EmailUncheckedUpdateManyWithoutIntegrationInputSchema) ]),
}).strict();

export const EmailScalarWhereInputSchema: z.ZodType<Prisma.EmailScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => EmailScalarWhereInputSchema),z.lazy(() => EmailScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => EmailScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => EmailScalarWhereInputSchema),z.lazy(() => EmailScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  messageId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  integrationId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  subject: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  from: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  date: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  body: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  receivedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  processed: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
}).strict();

export const MessageUpsertWithWhereUniqueWithoutIntegrationInputSchema: z.ZodType<Prisma.MessageUpsertWithWhereUniqueWithoutIntegrationInput> = z.object({
  where: z.lazy(() => MessageWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => MessageUpdateWithoutIntegrationInputSchema),z.lazy(() => MessageUncheckedUpdateWithoutIntegrationInputSchema) ]),
  create: z.union([ z.lazy(() => MessageCreateWithoutIntegrationInputSchema),z.lazy(() => MessageUncheckedCreateWithoutIntegrationInputSchema) ]),
}).strict();

export const MessageUpdateWithWhereUniqueWithoutIntegrationInputSchema: z.ZodType<Prisma.MessageUpdateWithWhereUniqueWithoutIntegrationInput> = z.object({
  where: z.lazy(() => MessageWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => MessageUpdateWithoutIntegrationInputSchema),z.lazy(() => MessageUncheckedUpdateWithoutIntegrationInputSchema) ]),
}).strict();

export const MessageUpdateManyWithWhereWithoutIntegrationInputSchema: z.ZodType<Prisma.MessageUpdateManyWithWhereWithoutIntegrationInput> = z.object({
  where: z.lazy(() => MessageScalarWhereInputSchema),
  data: z.union([ z.lazy(() => MessageUpdateManyMutationInputSchema),z.lazy(() => MessageUncheckedUpdateManyWithoutIntegrationInputSchema) ]),
}).strict();

export const MessageScalarWhereInputSchema: z.ZodType<Prisma.MessageScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => MessageScalarWhereInputSchema),z.lazy(() => MessageScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => MessageScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => MessageScalarWhereInputSchema),z.lazy(() => MessageScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  messageId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  integrationId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  channelId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  text: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  timestamp: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  receivedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  processed: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
}).strict();

export const IntegrationCreateWithoutEmailsInputSchema: z.ZodType<Prisma.IntegrationCreateWithoutEmailsInput> = z.object({
  id: z.string().optional(),
  email: z.string().optional().nullable(),
  type: z.lazy(() => IntegrationTypeSchema),
  providerUserId: z.string().optional().nullable(),
  accessToken: z.string(),
  refreshToken: z.string().optional().nullable(),
  tokenExpiration: z.coerce.date().optional().nullable(),
  recentHistoryId: z.string().optional().nullable(),
  scopes: z.union([ z.lazy(() => IntegrationCreatescopesInputSchema),z.string().array() ]).optional(),
  createdAt: z.coerce.date().optional(),
  lastUsedAt: z.coerce.date().optional().nullable(),
  lastRefreshedAt: z.coerce.date().optional().nullable(),
  status: z.lazy(() => IntegrationStatusSchema).optional(),
  genericType: z.lazy(() => GenericTypeSchema),
  metadata: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutIntegrationsInputSchema),
  messages: z.lazy(() => MessageCreateNestedManyWithoutIntegrationInputSchema).optional()
}).strict();

export const IntegrationUncheckedCreateWithoutEmailsInputSchema: z.ZodType<Prisma.IntegrationUncheckedCreateWithoutEmailsInput> = z.object({
  id: z.string().optional(),
  userId: z.string(),
  email: z.string().optional().nullable(),
  type: z.lazy(() => IntegrationTypeSchema),
  providerUserId: z.string().optional().nullable(),
  accessToken: z.string(),
  refreshToken: z.string().optional().nullable(),
  tokenExpiration: z.coerce.date().optional().nullable(),
  recentHistoryId: z.string().optional().nullable(),
  scopes: z.union([ z.lazy(() => IntegrationCreatescopesInputSchema),z.string().array() ]).optional(),
  createdAt: z.coerce.date().optional(),
  lastUsedAt: z.coerce.date().optional().nullable(),
  lastRefreshedAt: z.coerce.date().optional().nullable(),
  status: z.lazy(() => IntegrationStatusSchema).optional(),
  genericType: z.lazy(() => GenericTypeSchema),
  metadata: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  messages: z.lazy(() => MessageUncheckedCreateNestedManyWithoutIntegrationInputSchema).optional()
}).strict();

export const IntegrationCreateOrConnectWithoutEmailsInputSchema: z.ZodType<Prisma.IntegrationCreateOrConnectWithoutEmailsInput> = z.object({
  where: z.lazy(() => IntegrationWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => IntegrationCreateWithoutEmailsInputSchema),z.lazy(() => IntegrationUncheckedCreateWithoutEmailsInputSchema) ]),
}).strict();

export const IntegrationUpsertWithoutEmailsInputSchema: z.ZodType<Prisma.IntegrationUpsertWithoutEmailsInput> = z.object({
  update: z.union([ z.lazy(() => IntegrationUpdateWithoutEmailsInputSchema),z.lazy(() => IntegrationUncheckedUpdateWithoutEmailsInputSchema) ]),
  create: z.union([ z.lazy(() => IntegrationCreateWithoutEmailsInputSchema),z.lazy(() => IntegrationUncheckedCreateWithoutEmailsInputSchema) ]),
  where: z.lazy(() => IntegrationWhereInputSchema).optional()
}).strict();

export const IntegrationUpdateToOneWithWhereWithoutEmailsInputSchema: z.ZodType<Prisma.IntegrationUpdateToOneWithWhereWithoutEmailsInput> = z.object({
  where: z.lazy(() => IntegrationWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => IntegrationUpdateWithoutEmailsInputSchema),z.lazy(() => IntegrationUncheckedUpdateWithoutEmailsInputSchema) ]),
}).strict();

export const IntegrationUpdateWithoutEmailsInputSchema: z.ZodType<Prisma.IntegrationUpdateWithoutEmailsInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  type: z.union([ z.lazy(() => IntegrationTypeSchema),z.lazy(() => EnumIntegrationTypeFieldUpdateOperationsInputSchema) ]).optional(),
  providerUserId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  accessToken: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  refreshToken: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  tokenExpiration: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  recentHistoryId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  scopes: z.union([ z.lazy(() => IntegrationUpdatescopesInputSchema),z.string().array() ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  lastUsedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  lastRefreshedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.lazy(() => IntegrationStatusSchema),z.lazy(() => EnumIntegrationStatusFieldUpdateOperationsInputSchema) ]).optional(),
  genericType: z.union([ z.lazy(() => GenericTypeSchema),z.lazy(() => EnumGenericTypeFieldUpdateOperationsInputSchema) ]).optional(),
  metadata: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutIntegrationsNestedInputSchema).optional(),
  messages: z.lazy(() => MessageUpdateManyWithoutIntegrationNestedInputSchema).optional()
}).strict();

export const IntegrationUncheckedUpdateWithoutEmailsInputSchema: z.ZodType<Prisma.IntegrationUncheckedUpdateWithoutEmailsInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  type: z.union([ z.lazy(() => IntegrationTypeSchema),z.lazy(() => EnumIntegrationTypeFieldUpdateOperationsInputSchema) ]).optional(),
  providerUserId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  accessToken: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  refreshToken: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  tokenExpiration: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  recentHistoryId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  scopes: z.union([ z.lazy(() => IntegrationUpdatescopesInputSchema),z.string().array() ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  lastUsedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  lastRefreshedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.lazy(() => IntegrationStatusSchema),z.lazy(() => EnumIntegrationStatusFieldUpdateOperationsInputSchema) ]).optional(),
  genericType: z.union([ z.lazy(() => GenericTypeSchema),z.lazy(() => EnumGenericTypeFieldUpdateOperationsInputSchema) ]).optional(),
  metadata: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  messages: z.lazy(() => MessageUncheckedUpdateManyWithoutIntegrationNestedInputSchema).optional()
}).strict();

export const IntegrationCreateWithoutMessagesInputSchema: z.ZodType<Prisma.IntegrationCreateWithoutMessagesInput> = z.object({
  id: z.string().optional(),
  email: z.string().optional().nullable(),
  type: z.lazy(() => IntegrationTypeSchema),
  providerUserId: z.string().optional().nullable(),
  accessToken: z.string(),
  refreshToken: z.string().optional().nullable(),
  tokenExpiration: z.coerce.date().optional().nullable(),
  recentHistoryId: z.string().optional().nullable(),
  scopes: z.union([ z.lazy(() => IntegrationCreatescopesInputSchema),z.string().array() ]).optional(),
  createdAt: z.coerce.date().optional(),
  lastUsedAt: z.coerce.date().optional().nullable(),
  lastRefreshedAt: z.coerce.date().optional().nullable(),
  status: z.lazy(() => IntegrationStatusSchema).optional(),
  genericType: z.lazy(() => GenericTypeSchema),
  metadata: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutIntegrationsInputSchema),
  emails: z.lazy(() => EmailCreateNestedManyWithoutIntegrationInputSchema).optional()
}).strict();

export const IntegrationUncheckedCreateWithoutMessagesInputSchema: z.ZodType<Prisma.IntegrationUncheckedCreateWithoutMessagesInput> = z.object({
  id: z.string().optional(),
  userId: z.string(),
  email: z.string().optional().nullable(),
  type: z.lazy(() => IntegrationTypeSchema),
  providerUserId: z.string().optional().nullable(),
  accessToken: z.string(),
  refreshToken: z.string().optional().nullable(),
  tokenExpiration: z.coerce.date().optional().nullable(),
  recentHistoryId: z.string().optional().nullable(),
  scopes: z.union([ z.lazy(() => IntegrationCreatescopesInputSchema),z.string().array() ]).optional(),
  createdAt: z.coerce.date().optional(),
  lastUsedAt: z.coerce.date().optional().nullable(),
  lastRefreshedAt: z.coerce.date().optional().nullable(),
  status: z.lazy(() => IntegrationStatusSchema).optional(),
  genericType: z.lazy(() => GenericTypeSchema),
  metadata: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  emails: z.lazy(() => EmailUncheckedCreateNestedManyWithoutIntegrationInputSchema).optional()
}).strict();

export const IntegrationCreateOrConnectWithoutMessagesInputSchema: z.ZodType<Prisma.IntegrationCreateOrConnectWithoutMessagesInput> = z.object({
  where: z.lazy(() => IntegrationWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => IntegrationCreateWithoutMessagesInputSchema),z.lazy(() => IntegrationUncheckedCreateWithoutMessagesInputSchema) ]),
}).strict();

export const IntegrationUpsertWithoutMessagesInputSchema: z.ZodType<Prisma.IntegrationUpsertWithoutMessagesInput> = z.object({
  update: z.union([ z.lazy(() => IntegrationUpdateWithoutMessagesInputSchema),z.lazy(() => IntegrationUncheckedUpdateWithoutMessagesInputSchema) ]),
  create: z.union([ z.lazy(() => IntegrationCreateWithoutMessagesInputSchema),z.lazy(() => IntegrationUncheckedCreateWithoutMessagesInputSchema) ]),
  where: z.lazy(() => IntegrationWhereInputSchema).optional()
}).strict();

export const IntegrationUpdateToOneWithWhereWithoutMessagesInputSchema: z.ZodType<Prisma.IntegrationUpdateToOneWithWhereWithoutMessagesInput> = z.object({
  where: z.lazy(() => IntegrationWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => IntegrationUpdateWithoutMessagesInputSchema),z.lazy(() => IntegrationUncheckedUpdateWithoutMessagesInputSchema) ]),
}).strict();

export const IntegrationUpdateWithoutMessagesInputSchema: z.ZodType<Prisma.IntegrationUpdateWithoutMessagesInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  type: z.union([ z.lazy(() => IntegrationTypeSchema),z.lazy(() => EnumIntegrationTypeFieldUpdateOperationsInputSchema) ]).optional(),
  providerUserId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  accessToken: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  refreshToken: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  tokenExpiration: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  recentHistoryId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  scopes: z.union([ z.lazy(() => IntegrationUpdatescopesInputSchema),z.string().array() ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  lastUsedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  lastRefreshedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.lazy(() => IntegrationStatusSchema),z.lazy(() => EnumIntegrationStatusFieldUpdateOperationsInputSchema) ]).optional(),
  genericType: z.union([ z.lazy(() => GenericTypeSchema),z.lazy(() => EnumGenericTypeFieldUpdateOperationsInputSchema) ]).optional(),
  metadata: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutIntegrationsNestedInputSchema).optional(),
  emails: z.lazy(() => EmailUpdateManyWithoutIntegrationNestedInputSchema).optional()
}).strict();

export const IntegrationUncheckedUpdateWithoutMessagesInputSchema: z.ZodType<Prisma.IntegrationUncheckedUpdateWithoutMessagesInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  type: z.union([ z.lazy(() => IntegrationTypeSchema),z.lazy(() => EnumIntegrationTypeFieldUpdateOperationsInputSchema) ]).optional(),
  providerUserId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  accessToken: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  refreshToken: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  tokenExpiration: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  recentHistoryId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  scopes: z.union([ z.lazy(() => IntegrationUpdatescopesInputSchema),z.string().array() ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  lastUsedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  lastRefreshedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.lazy(() => IntegrationStatusSchema),z.lazy(() => EnumIntegrationStatusFieldUpdateOperationsInputSchema) ]).optional(),
  genericType: z.union([ z.lazy(() => GenericTypeSchema),z.lazy(() => EnumGenericTypeFieldUpdateOperationsInputSchema) ]).optional(),
  metadata: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  emails: z.lazy(() => EmailUncheckedUpdateManyWithoutIntegrationNestedInputSchema).optional()
}).strict();

export const IntegrationCreateManyUserInputSchema: z.ZodType<Prisma.IntegrationCreateManyUserInput> = z.object({
  id: z.string().optional(),
  email: z.string().optional().nullable(),
  type: z.lazy(() => IntegrationTypeSchema),
  providerUserId: z.string().optional().nullable(),
  accessToken: z.string(),
  refreshToken: z.string().optional().nullable(),
  tokenExpiration: z.coerce.date().optional().nullable(),
  recentHistoryId: z.string().optional().nullable(),
  scopes: z.union([ z.lazy(() => IntegrationCreatescopesInputSchema),z.string().array() ]).optional(),
  createdAt: z.coerce.date().optional(),
  lastUsedAt: z.coerce.date().optional().nullable(),
  lastRefreshedAt: z.coerce.date().optional().nullable(),
  status: z.lazy(() => IntegrationStatusSchema).optional(),
  genericType: z.lazy(() => GenericTypeSchema),
  metadata: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
}).strict();

export const IntegrationUpdateWithoutUserInputSchema: z.ZodType<Prisma.IntegrationUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  type: z.union([ z.lazy(() => IntegrationTypeSchema),z.lazy(() => EnumIntegrationTypeFieldUpdateOperationsInputSchema) ]).optional(),
  providerUserId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  accessToken: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  refreshToken: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  tokenExpiration: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  recentHistoryId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  scopes: z.union([ z.lazy(() => IntegrationUpdatescopesInputSchema),z.string().array() ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  lastUsedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  lastRefreshedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.lazy(() => IntegrationStatusSchema),z.lazy(() => EnumIntegrationStatusFieldUpdateOperationsInputSchema) ]).optional(),
  genericType: z.union([ z.lazy(() => GenericTypeSchema),z.lazy(() => EnumGenericTypeFieldUpdateOperationsInputSchema) ]).optional(),
  metadata: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  emails: z.lazy(() => EmailUpdateManyWithoutIntegrationNestedInputSchema).optional(),
  messages: z.lazy(() => MessageUpdateManyWithoutIntegrationNestedInputSchema).optional()
}).strict();

export const IntegrationUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.IntegrationUncheckedUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  type: z.union([ z.lazy(() => IntegrationTypeSchema),z.lazy(() => EnumIntegrationTypeFieldUpdateOperationsInputSchema) ]).optional(),
  providerUserId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  accessToken: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  refreshToken: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  tokenExpiration: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  recentHistoryId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  scopes: z.union([ z.lazy(() => IntegrationUpdatescopesInputSchema),z.string().array() ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  lastUsedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  lastRefreshedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.lazy(() => IntegrationStatusSchema),z.lazy(() => EnumIntegrationStatusFieldUpdateOperationsInputSchema) ]).optional(),
  genericType: z.union([ z.lazy(() => GenericTypeSchema),z.lazy(() => EnumGenericTypeFieldUpdateOperationsInputSchema) ]).optional(),
  metadata: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  emails: z.lazy(() => EmailUncheckedUpdateManyWithoutIntegrationNestedInputSchema).optional(),
  messages: z.lazy(() => MessageUncheckedUpdateManyWithoutIntegrationNestedInputSchema).optional()
}).strict();

export const IntegrationUncheckedUpdateManyWithoutUserInputSchema: z.ZodType<Prisma.IntegrationUncheckedUpdateManyWithoutUserInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  type: z.union([ z.lazy(() => IntegrationTypeSchema),z.lazy(() => EnumIntegrationTypeFieldUpdateOperationsInputSchema) ]).optional(),
  providerUserId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  accessToken: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  refreshToken: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  tokenExpiration: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  recentHistoryId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  scopes: z.union([ z.lazy(() => IntegrationUpdatescopesInputSchema),z.string().array() ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  lastUsedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  lastRefreshedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.lazy(() => IntegrationStatusSchema),z.lazy(() => EnumIntegrationStatusFieldUpdateOperationsInputSchema) ]).optional(),
  genericType: z.union([ z.lazy(() => GenericTypeSchema),z.lazy(() => EnumGenericTypeFieldUpdateOperationsInputSchema) ]).optional(),
  metadata: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
}).strict();

export const EmailCreateManyIntegrationInputSchema: z.ZodType<Prisma.EmailCreateManyIntegrationInput> = z.object({
  id: z.string().optional(),
  messageId: z.string(),
  subject: z.string().optional().nullable(),
  from: z.string().optional().nullable(),
  date: z.coerce.date().optional().nullable(),
  body: z.string().optional().nullable(),
  receivedAt: z.coerce.date().optional(),
  processed: z.boolean().optional()
}).strict();

export const MessageCreateManyIntegrationInputSchema: z.ZodType<Prisma.MessageCreateManyIntegrationInput> = z.object({
  id: z.string().optional(),
  messageId: z.string(),
  userId: z.string(),
  channelId: z.string(),
  text: z.string(),
  timestamp: z.coerce.date(),
  receivedAt: z.coerce.date().optional(),
  processed: z.boolean().optional()
}).strict();

export const EmailUpdateWithoutIntegrationInputSchema: z.ZodType<Prisma.EmailUpdateWithoutIntegrationInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  messageId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  subject: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  from: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  date: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  body: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  receivedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  processed: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const EmailUncheckedUpdateWithoutIntegrationInputSchema: z.ZodType<Prisma.EmailUncheckedUpdateWithoutIntegrationInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  messageId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  subject: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  from: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  date: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  body: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  receivedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  processed: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const EmailUncheckedUpdateManyWithoutIntegrationInputSchema: z.ZodType<Prisma.EmailUncheckedUpdateManyWithoutIntegrationInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  messageId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  subject: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  from: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  date: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  body: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  receivedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  processed: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const MessageUpdateWithoutIntegrationInputSchema: z.ZodType<Prisma.MessageUpdateWithoutIntegrationInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  messageId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  channelId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  text: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  timestamp: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  receivedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  processed: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const MessageUncheckedUpdateWithoutIntegrationInputSchema: z.ZodType<Prisma.MessageUncheckedUpdateWithoutIntegrationInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  messageId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  channelId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  text: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  timestamp: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  receivedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  processed: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const MessageUncheckedUpdateManyWithoutIntegrationInputSchema: z.ZodType<Prisma.MessageUncheckedUpdateManyWithoutIntegrationInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  messageId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  channelId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  text: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  timestamp: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  receivedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  processed: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

/////////////////////////////////////////
// ARGS
/////////////////////////////////////////

export const UserFindFirstArgsSchema: z.ZodType<Prisma.UserFindFirstArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserScalarFieldEnumSchema,UserScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const UserFindFirstOrThrowArgsSchema: z.ZodType<Prisma.UserFindFirstOrThrowArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserScalarFieldEnumSchema,UserScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const UserFindManyArgsSchema: z.ZodType<Prisma.UserFindManyArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserScalarFieldEnumSchema,UserScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const UserAggregateArgsSchema: z.ZodType<Prisma.UserAggregateArgs> = z.object({
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const UserGroupByArgsSchema: z.ZodType<Prisma.UserGroupByArgs> = z.object({
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithAggregationInputSchema.array(),UserOrderByWithAggregationInputSchema ]).optional(),
  by: UserScalarFieldEnumSchema.array(),
  having: UserScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const UserFindUniqueArgsSchema: z.ZodType<Prisma.UserFindUniqueArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
}).strict() ;

export const UserFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.UserFindUniqueOrThrowArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
}).strict() ;

export const IntegrationFindFirstArgsSchema: z.ZodType<Prisma.IntegrationFindFirstArgs> = z.object({
  select: IntegrationSelectSchema.optional(),
  include: IntegrationIncludeSchema.optional(),
  where: IntegrationWhereInputSchema.optional(),
  orderBy: z.union([ IntegrationOrderByWithRelationInputSchema.array(),IntegrationOrderByWithRelationInputSchema ]).optional(),
  cursor: IntegrationWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ IntegrationScalarFieldEnumSchema,IntegrationScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const IntegrationFindFirstOrThrowArgsSchema: z.ZodType<Prisma.IntegrationFindFirstOrThrowArgs> = z.object({
  select: IntegrationSelectSchema.optional(),
  include: IntegrationIncludeSchema.optional(),
  where: IntegrationWhereInputSchema.optional(),
  orderBy: z.union([ IntegrationOrderByWithRelationInputSchema.array(),IntegrationOrderByWithRelationInputSchema ]).optional(),
  cursor: IntegrationWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ IntegrationScalarFieldEnumSchema,IntegrationScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const IntegrationFindManyArgsSchema: z.ZodType<Prisma.IntegrationFindManyArgs> = z.object({
  select: IntegrationSelectSchema.optional(),
  include: IntegrationIncludeSchema.optional(),
  where: IntegrationWhereInputSchema.optional(),
  orderBy: z.union([ IntegrationOrderByWithRelationInputSchema.array(),IntegrationOrderByWithRelationInputSchema ]).optional(),
  cursor: IntegrationWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ IntegrationScalarFieldEnumSchema,IntegrationScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const IntegrationAggregateArgsSchema: z.ZodType<Prisma.IntegrationAggregateArgs> = z.object({
  where: IntegrationWhereInputSchema.optional(),
  orderBy: z.union([ IntegrationOrderByWithRelationInputSchema.array(),IntegrationOrderByWithRelationInputSchema ]).optional(),
  cursor: IntegrationWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const IntegrationGroupByArgsSchema: z.ZodType<Prisma.IntegrationGroupByArgs> = z.object({
  where: IntegrationWhereInputSchema.optional(),
  orderBy: z.union([ IntegrationOrderByWithAggregationInputSchema.array(),IntegrationOrderByWithAggregationInputSchema ]).optional(),
  by: IntegrationScalarFieldEnumSchema.array(),
  having: IntegrationScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const IntegrationFindUniqueArgsSchema: z.ZodType<Prisma.IntegrationFindUniqueArgs> = z.object({
  select: IntegrationSelectSchema.optional(),
  include: IntegrationIncludeSchema.optional(),
  where: IntegrationWhereUniqueInputSchema,
}).strict() ;

export const IntegrationFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.IntegrationFindUniqueOrThrowArgs> = z.object({
  select: IntegrationSelectSchema.optional(),
  include: IntegrationIncludeSchema.optional(),
  where: IntegrationWhereUniqueInputSchema,
}).strict() ;

export const EmailFindFirstArgsSchema: z.ZodType<Prisma.EmailFindFirstArgs> = z.object({
  select: EmailSelectSchema.optional(),
  include: EmailIncludeSchema.optional(),
  where: EmailWhereInputSchema.optional(),
  orderBy: z.union([ EmailOrderByWithRelationInputSchema.array(),EmailOrderByWithRelationInputSchema ]).optional(),
  cursor: EmailWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ EmailScalarFieldEnumSchema,EmailScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const EmailFindFirstOrThrowArgsSchema: z.ZodType<Prisma.EmailFindFirstOrThrowArgs> = z.object({
  select: EmailSelectSchema.optional(),
  include: EmailIncludeSchema.optional(),
  where: EmailWhereInputSchema.optional(),
  orderBy: z.union([ EmailOrderByWithRelationInputSchema.array(),EmailOrderByWithRelationInputSchema ]).optional(),
  cursor: EmailWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ EmailScalarFieldEnumSchema,EmailScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const EmailFindManyArgsSchema: z.ZodType<Prisma.EmailFindManyArgs> = z.object({
  select: EmailSelectSchema.optional(),
  include: EmailIncludeSchema.optional(),
  where: EmailWhereInputSchema.optional(),
  orderBy: z.union([ EmailOrderByWithRelationInputSchema.array(),EmailOrderByWithRelationInputSchema ]).optional(),
  cursor: EmailWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ EmailScalarFieldEnumSchema,EmailScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const EmailAggregateArgsSchema: z.ZodType<Prisma.EmailAggregateArgs> = z.object({
  where: EmailWhereInputSchema.optional(),
  orderBy: z.union([ EmailOrderByWithRelationInputSchema.array(),EmailOrderByWithRelationInputSchema ]).optional(),
  cursor: EmailWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const EmailGroupByArgsSchema: z.ZodType<Prisma.EmailGroupByArgs> = z.object({
  where: EmailWhereInputSchema.optional(),
  orderBy: z.union([ EmailOrderByWithAggregationInputSchema.array(),EmailOrderByWithAggregationInputSchema ]).optional(),
  by: EmailScalarFieldEnumSchema.array(),
  having: EmailScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const EmailFindUniqueArgsSchema: z.ZodType<Prisma.EmailFindUniqueArgs> = z.object({
  select: EmailSelectSchema.optional(),
  include: EmailIncludeSchema.optional(),
  where: EmailWhereUniqueInputSchema,
}).strict() ;

export const EmailFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.EmailFindUniqueOrThrowArgs> = z.object({
  select: EmailSelectSchema.optional(),
  include: EmailIncludeSchema.optional(),
  where: EmailWhereUniqueInputSchema,
}).strict() ;

export const MessageFindFirstArgsSchema: z.ZodType<Prisma.MessageFindFirstArgs> = z.object({
  select: MessageSelectSchema.optional(),
  include: MessageIncludeSchema.optional(),
  where: MessageWhereInputSchema.optional(),
  orderBy: z.union([ MessageOrderByWithRelationInputSchema.array(),MessageOrderByWithRelationInputSchema ]).optional(),
  cursor: MessageWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ MessageScalarFieldEnumSchema,MessageScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const MessageFindFirstOrThrowArgsSchema: z.ZodType<Prisma.MessageFindFirstOrThrowArgs> = z.object({
  select: MessageSelectSchema.optional(),
  include: MessageIncludeSchema.optional(),
  where: MessageWhereInputSchema.optional(),
  orderBy: z.union([ MessageOrderByWithRelationInputSchema.array(),MessageOrderByWithRelationInputSchema ]).optional(),
  cursor: MessageWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ MessageScalarFieldEnumSchema,MessageScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const MessageFindManyArgsSchema: z.ZodType<Prisma.MessageFindManyArgs> = z.object({
  select: MessageSelectSchema.optional(),
  include: MessageIncludeSchema.optional(),
  where: MessageWhereInputSchema.optional(),
  orderBy: z.union([ MessageOrderByWithRelationInputSchema.array(),MessageOrderByWithRelationInputSchema ]).optional(),
  cursor: MessageWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ MessageScalarFieldEnumSchema,MessageScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const MessageAggregateArgsSchema: z.ZodType<Prisma.MessageAggregateArgs> = z.object({
  where: MessageWhereInputSchema.optional(),
  orderBy: z.union([ MessageOrderByWithRelationInputSchema.array(),MessageOrderByWithRelationInputSchema ]).optional(),
  cursor: MessageWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const MessageGroupByArgsSchema: z.ZodType<Prisma.MessageGroupByArgs> = z.object({
  where: MessageWhereInputSchema.optional(),
  orderBy: z.union([ MessageOrderByWithAggregationInputSchema.array(),MessageOrderByWithAggregationInputSchema ]).optional(),
  by: MessageScalarFieldEnumSchema.array(),
  having: MessageScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const MessageFindUniqueArgsSchema: z.ZodType<Prisma.MessageFindUniqueArgs> = z.object({
  select: MessageSelectSchema.optional(),
  include: MessageIncludeSchema.optional(),
  where: MessageWhereUniqueInputSchema,
}).strict() ;

export const MessageFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.MessageFindUniqueOrThrowArgs> = z.object({
  select: MessageSelectSchema.optional(),
  include: MessageIncludeSchema.optional(),
  where: MessageWhereUniqueInputSchema,
}).strict() ;

export const UserCreateArgsSchema: z.ZodType<Prisma.UserCreateArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  data: z.union([ UserCreateInputSchema,UserUncheckedCreateInputSchema ]),
}).strict() ;

export const UserUpsertArgsSchema: z.ZodType<Prisma.UserUpsertArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
  create: z.union([ UserCreateInputSchema,UserUncheckedCreateInputSchema ]),
  update: z.union([ UserUpdateInputSchema,UserUncheckedUpdateInputSchema ]),
}).strict() ;

export const UserCreateManyArgsSchema: z.ZodType<Prisma.UserCreateManyArgs> = z.object({
  data: z.union([ UserCreateManyInputSchema,UserCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const UserCreateManyAndReturnArgsSchema: z.ZodType<Prisma.UserCreateManyAndReturnArgs> = z.object({
  data: z.union([ UserCreateManyInputSchema,UserCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const UserDeleteArgsSchema: z.ZodType<Prisma.UserDeleteArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
}).strict() ;

export const UserUpdateArgsSchema: z.ZodType<Prisma.UserUpdateArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  data: z.union([ UserUpdateInputSchema,UserUncheckedUpdateInputSchema ]),
  where: UserWhereUniqueInputSchema,
}).strict() ;

export const UserUpdateManyArgsSchema: z.ZodType<Prisma.UserUpdateManyArgs> = z.object({
  data: z.union([ UserUpdateManyMutationInputSchema,UserUncheckedUpdateManyInputSchema ]),
  where: UserWhereInputSchema.optional(),
}).strict() ;

export const UserDeleteManyArgsSchema: z.ZodType<Prisma.UserDeleteManyArgs> = z.object({
  where: UserWhereInputSchema.optional(),
}).strict() ;

export const IntegrationCreateArgsSchema: z.ZodType<Prisma.IntegrationCreateArgs> = z.object({
  select: IntegrationSelectSchema.optional(),
  include: IntegrationIncludeSchema.optional(),
  data: z.union([ IntegrationCreateInputSchema,IntegrationUncheckedCreateInputSchema ]),
}).strict() ;

export const IntegrationUpsertArgsSchema: z.ZodType<Prisma.IntegrationUpsertArgs> = z.object({
  select: IntegrationSelectSchema.optional(),
  include: IntegrationIncludeSchema.optional(),
  where: IntegrationWhereUniqueInputSchema,
  create: z.union([ IntegrationCreateInputSchema,IntegrationUncheckedCreateInputSchema ]),
  update: z.union([ IntegrationUpdateInputSchema,IntegrationUncheckedUpdateInputSchema ]),
}).strict() ;

export const IntegrationCreateManyArgsSchema: z.ZodType<Prisma.IntegrationCreateManyArgs> = z.object({
  data: z.union([ IntegrationCreateManyInputSchema,IntegrationCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const IntegrationCreateManyAndReturnArgsSchema: z.ZodType<Prisma.IntegrationCreateManyAndReturnArgs> = z.object({
  data: z.union([ IntegrationCreateManyInputSchema,IntegrationCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const IntegrationDeleteArgsSchema: z.ZodType<Prisma.IntegrationDeleteArgs> = z.object({
  select: IntegrationSelectSchema.optional(),
  include: IntegrationIncludeSchema.optional(),
  where: IntegrationWhereUniqueInputSchema,
}).strict() ;

export const IntegrationUpdateArgsSchema: z.ZodType<Prisma.IntegrationUpdateArgs> = z.object({
  select: IntegrationSelectSchema.optional(),
  include: IntegrationIncludeSchema.optional(),
  data: z.union([ IntegrationUpdateInputSchema,IntegrationUncheckedUpdateInputSchema ]),
  where: IntegrationWhereUniqueInputSchema,
}).strict() ;

export const IntegrationUpdateManyArgsSchema: z.ZodType<Prisma.IntegrationUpdateManyArgs> = z.object({
  data: z.union([ IntegrationUpdateManyMutationInputSchema,IntegrationUncheckedUpdateManyInputSchema ]),
  where: IntegrationWhereInputSchema.optional(),
}).strict() ;

export const IntegrationDeleteManyArgsSchema: z.ZodType<Prisma.IntegrationDeleteManyArgs> = z.object({
  where: IntegrationWhereInputSchema.optional(),
}).strict() ;

export const EmailCreateArgsSchema: z.ZodType<Prisma.EmailCreateArgs> = z.object({
  select: EmailSelectSchema.optional(),
  include: EmailIncludeSchema.optional(),
  data: z.union([ EmailCreateInputSchema,EmailUncheckedCreateInputSchema ]),
}).strict() ;

export const EmailUpsertArgsSchema: z.ZodType<Prisma.EmailUpsertArgs> = z.object({
  select: EmailSelectSchema.optional(),
  include: EmailIncludeSchema.optional(),
  where: EmailWhereUniqueInputSchema,
  create: z.union([ EmailCreateInputSchema,EmailUncheckedCreateInputSchema ]),
  update: z.union([ EmailUpdateInputSchema,EmailUncheckedUpdateInputSchema ]),
}).strict() ;

export const EmailCreateManyArgsSchema: z.ZodType<Prisma.EmailCreateManyArgs> = z.object({
  data: z.union([ EmailCreateManyInputSchema,EmailCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const EmailCreateManyAndReturnArgsSchema: z.ZodType<Prisma.EmailCreateManyAndReturnArgs> = z.object({
  data: z.union([ EmailCreateManyInputSchema,EmailCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const EmailDeleteArgsSchema: z.ZodType<Prisma.EmailDeleteArgs> = z.object({
  select: EmailSelectSchema.optional(),
  include: EmailIncludeSchema.optional(),
  where: EmailWhereUniqueInputSchema,
}).strict() ;

export const EmailUpdateArgsSchema: z.ZodType<Prisma.EmailUpdateArgs> = z.object({
  select: EmailSelectSchema.optional(),
  include: EmailIncludeSchema.optional(),
  data: z.union([ EmailUpdateInputSchema,EmailUncheckedUpdateInputSchema ]),
  where: EmailWhereUniqueInputSchema,
}).strict() ;

export const EmailUpdateManyArgsSchema: z.ZodType<Prisma.EmailUpdateManyArgs> = z.object({
  data: z.union([ EmailUpdateManyMutationInputSchema,EmailUncheckedUpdateManyInputSchema ]),
  where: EmailWhereInputSchema.optional(),
}).strict() ;

export const EmailDeleteManyArgsSchema: z.ZodType<Prisma.EmailDeleteManyArgs> = z.object({
  where: EmailWhereInputSchema.optional(),
}).strict() ;

export const MessageCreateArgsSchema: z.ZodType<Prisma.MessageCreateArgs> = z.object({
  select: MessageSelectSchema.optional(),
  include: MessageIncludeSchema.optional(),
  data: z.union([ MessageCreateInputSchema,MessageUncheckedCreateInputSchema ]),
}).strict() ;

export const MessageUpsertArgsSchema: z.ZodType<Prisma.MessageUpsertArgs> = z.object({
  select: MessageSelectSchema.optional(),
  include: MessageIncludeSchema.optional(),
  where: MessageWhereUniqueInputSchema,
  create: z.union([ MessageCreateInputSchema,MessageUncheckedCreateInputSchema ]),
  update: z.union([ MessageUpdateInputSchema,MessageUncheckedUpdateInputSchema ]),
}).strict() ;

export const MessageCreateManyArgsSchema: z.ZodType<Prisma.MessageCreateManyArgs> = z.object({
  data: z.union([ MessageCreateManyInputSchema,MessageCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const MessageCreateManyAndReturnArgsSchema: z.ZodType<Prisma.MessageCreateManyAndReturnArgs> = z.object({
  data: z.union([ MessageCreateManyInputSchema,MessageCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const MessageDeleteArgsSchema: z.ZodType<Prisma.MessageDeleteArgs> = z.object({
  select: MessageSelectSchema.optional(),
  include: MessageIncludeSchema.optional(),
  where: MessageWhereUniqueInputSchema,
}).strict() ;

export const MessageUpdateArgsSchema: z.ZodType<Prisma.MessageUpdateArgs> = z.object({
  select: MessageSelectSchema.optional(),
  include: MessageIncludeSchema.optional(),
  data: z.union([ MessageUpdateInputSchema,MessageUncheckedUpdateInputSchema ]),
  where: MessageWhereUniqueInputSchema,
}).strict() ;

export const MessageUpdateManyArgsSchema: z.ZodType<Prisma.MessageUpdateManyArgs> = z.object({
  data: z.union([ MessageUpdateManyMutationInputSchema,MessageUncheckedUpdateManyInputSchema ]),
  where: MessageWhereInputSchema.optional(),
}).strict() ;

export const MessageDeleteManyArgsSchema: z.ZodType<Prisma.MessageDeleteManyArgs> = z.object({
  where: MessageWhereInputSchema.optional(),
}).strict() ;