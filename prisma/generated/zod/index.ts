import { z } from 'zod';
import type { Prisma } from '@prisma/client';

/////////////////////////////////////////
// HELPER FUNCTIONS
/////////////////////////////////////////


/////////////////////////////////////////
// ENUMS
/////////////////////////////////////////

export const TransactionIsolationLevelSchema = z.enum(['ReadUncommitted','ReadCommitted','RepeatableRead','Serializable']);

export const UserScalarFieldEnumSchema = z.enum(['id','name','createdAt','updatedAt']);

export const IntegrationScalarFieldEnumSchema = z.enum(['id','userId','type','status','createdAt','updatedAt']);

export const GmailIntegrationScalarFieldEnumSchema = z.enum(['id','integrationId','email','accessToken','refreshToken','tokenExpiration','recentHistoryId']);

export const SlackIntegrationScalarFieldEnumSchema = z.enum(['id','integrationId','teamId','accessToken','slackUserId']);

export const EmailScalarFieldEnumSchema = z.enum(['id','messageId','gmailIntegrationId','subject','from','date','body','receivedAt','processed']);

export const MessageScalarFieldEnumSchema = z.enum(['id','messageId','slackIntegrationId','senderId','channelId','text','timestamp','threadTs','receivedAt','processed']);

export const AutomationScalarFieldEnumSchema = z.enum(['id','userId','name','lastRun','createdAt','updatedAt']);

export const TriggerScalarFieldEnumSchema = z.enum(['id','automationId','type','createdAt','updatedAt']);

export const ActionScalarFieldEnumSchema = z.enum(['id','automationId','type','position','createdAt','updatedAt']);

export const SortOrderSchema = z.enum(['asc','desc']);

export const QueryModeSchema = z.enum(['default','insensitive']);

export const NullsOrderSchema = z.enum(['first','last']);

export const IntegrationTypeSchema = z.enum(['GMAIL','SLACK']);

export type IntegrationTypeType = `${z.infer<typeof IntegrationTypeSchema>}`

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
  id: z.string(),
  userId: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type Integration = z.infer<typeof IntegrationSchema>

/////////////////////////////////////////
// GMAIL INTEGRATION SCHEMA
/////////////////////////////////////////

export const GmailIntegrationSchema = z.object({
  id: z.string(),
  integrationId: z.string(),
  email: z.string(),
  accessToken: z.string(),
  refreshToken: z.string().nullable(),
  tokenExpiration: z.coerce.date(),
  recentHistoryId: z.string().nullable(),
})

export type GmailIntegration = z.infer<typeof GmailIntegrationSchema>

/////////////////////////////////////////
// SLACK INTEGRATION SCHEMA
/////////////////////////////////////////

export const SlackIntegrationSchema = z.object({
  id: z.string(),
  integrationId: z.string(),
  teamId: z.string(),
  accessToken: z.string(),
  slackUserId: z.string(),
})

export type SlackIntegration = z.infer<typeof SlackIntegrationSchema>

/////////////////////////////////////////
// EMAIL SCHEMA
/////////////////////////////////////////

export const EmailSchema = z.object({
  id: z.string(),
  messageId: z.string(),
  gmailIntegrationId: z.string(),
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
  slackIntegrationId: z.string(),
  senderId: z.string(),
  channelId: z.string(),
  text: z.string(),
  timestamp: z.string(),
  threadTs: z.string().nullable(),
  receivedAt: z.coerce.date(),
  processed: z.boolean(),
})

export type Message = z.infer<typeof MessageSchema>

/////////////////////////////////////////
// AUTOMATION SCHEMA
/////////////////////////////////////////

export const AutomationSchema = z.object({
  id: z.string(),
  userId: z.string(),
  name: z.string(),
  lastRun: z.coerce.date().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type Automation = z.infer<typeof AutomationSchema>

/////////////////////////////////////////
// TRIGGER SCHEMA
/////////////////////////////////////////

export const TriggerSchema = z.object({
  id: z.string(),
  automationId: z.string(),
  type: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type Trigger = z.infer<typeof TriggerSchema>

/////////////////////////////////////////
// ACTION SCHEMA
/////////////////////////////////////////

export const ActionSchema = z.object({
  id: z.string(),
  automationId: z.string(),
  type: z.string(),
  position: z.number(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type Action = z.infer<typeof ActionSchema>

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
  gmail: z.union([z.boolean(),z.lazy(() => GmailIntegrationArgsSchema)]).optional(),
  slack: z.union([z.boolean(),z.lazy(() => SlackIntegrationArgsSchema)]).optional(),
}).strict()

export const IntegrationArgsSchema: z.ZodType<Prisma.IntegrationDefaultArgs> = z.object({
  select: z.lazy(() => IntegrationSelectSchema).optional(),
  include: z.lazy(() => IntegrationIncludeSchema).optional(),
}).strict();

export const IntegrationSelectSchema: z.ZodType<Prisma.IntegrationSelect> = z.object({
  id: z.boolean().optional(),
  userId: z.boolean().optional(),
  type: z.boolean().optional(),
  status: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  gmail: z.union([z.boolean(),z.lazy(() => GmailIntegrationArgsSchema)]).optional(),
  slack: z.union([z.boolean(),z.lazy(() => SlackIntegrationArgsSchema)]).optional(),
}).strict()

// GMAIL INTEGRATION
//------------------------------------------------------

export const GmailIntegrationIncludeSchema: z.ZodType<Prisma.GmailIntegrationInclude> = z.object({
  integration: z.union([z.boolean(),z.lazy(() => IntegrationArgsSchema)]).optional(),
  emails: z.union([z.boolean(),z.lazy(() => EmailFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => GmailIntegrationCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const GmailIntegrationArgsSchema: z.ZodType<Prisma.GmailIntegrationDefaultArgs> = z.object({
  select: z.lazy(() => GmailIntegrationSelectSchema).optional(),
  include: z.lazy(() => GmailIntegrationIncludeSchema).optional(),
}).strict();

export const GmailIntegrationCountOutputTypeArgsSchema: z.ZodType<Prisma.GmailIntegrationCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => GmailIntegrationCountOutputTypeSelectSchema).nullish(),
}).strict();

export const GmailIntegrationCountOutputTypeSelectSchema: z.ZodType<Prisma.GmailIntegrationCountOutputTypeSelect> = z.object({
  emails: z.boolean().optional(),
}).strict();

export const GmailIntegrationSelectSchema: z.ZodType<Prisma.GmailIntegrationSelect> = z.object({
  id: z.boolean().optional(),
  integrationId: z.boolean().optional(),
  email: z.boolean().optional(),
  accessToken: z.boolean().optional(),
  refreshToken: z.boolean().optional(),
  tokenExpiration: z.boolean().optional(),
  recentHistoryId: z.boolean().optional(),
  integration: z.union([z.boolean(),z.lazy(() => IntegrationArgsSchema)]).optional(),
  emails: z.union([z.boolean(),z.lazy(() => EmailFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => GmailIntegrationCountOutputTypeArgsSchema)]).optional(),
}).strict()

// SLACK INTEGRATION
//------------------------------------------------------

export const SlackIntegrationIncludeSchema: z.ZodType<Prisma.SlackIntegrationInclude> = z.object({
  integration: z.union([z.boolean(),z.lazy(() => IntegrationArgsSchema)]).optional(),
  messages: z.union([z.boolean(),z.lazy(() => MessageFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => SlackIntegrationCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const SlackIntegrationArgsSchema: z.ZodType<Prisma.SlackIntegrationDefaultArgs> = z.object({
  select: z.lazy(() => SlackIntegrationSelectSchema).optional(),
  include: z.lazy(() => SlackIntegrationIncludeSchema).optional(),
}).strict();

export const SlackIntegrationCountOutputTypeArgsSchema: z.ZodType<Prisma.SlackIntegrationCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => SlackIntegrationCountOutputTypeSelectSchema).nullish(),
}).strict();

export const SlackIntegrationCountOutputTypeSelectSchema: z.ZodType<Prisma.SlackIntegrationCountOutputTypeSelect> = z.object({
  messages: z.boolean().optional(),
}).strict();

export const SlackIntegrationSelectSchema: z.ZodType<Prisma.SlackIntegrationSelect> = z.object({
  id: z.boolean().optional(),
  integrationId: z.boolean().optional(),
  teamId: z.boolean().optional(),
  accessToken: z.boolean().optional(),
  slackUserId: z.boolean().optional(),
  integration: z.union([z.boolean(),z.lazy(() => IntegrationArgsSchema)]).optional(),
  messages: z.union([z.boolean(),z.lazy(() => MessageFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => SlackIntegrationCountOutputTypeArgsSchema)]).optional(),
}).strict()

// EMAIL
//------------------------------------------------------

export const EmailIncludeSchema: z.ZodType<Prisma.EmailInclude> = z.object({
  gmailIntegration: z.union([z.boolean(),z.lazy(() => GmailIntegrationArgsSchema)]).optional(),
}).strict()

export const EmailArgsSchema: z.ZodType<Prisma.EmailDefaultArgs> = z.object({
  select: z.lazy(() => EmailSelectSchema).optional(),
  include: z.lazy(() => EmailIncludeSchema).optional(),
}).strict();

export const EmailSelectSchema: z.ZodType<Prisma.EmailSelect> = z.object({
  id: z.boolean().optional(),
  messageId: z.boolean().optional(),
  gmailIntegrationId: z.boolean().optional(),
  subject: z.boolean().optional(),
  from: z.boolean().optional(),
  date: z.boolean().optional(),
  body: z.boolean().optional(),
  receivedAt: z.boolean().optional(),
  processed: z.boolean().optional(),
  gmailIntegration: z.union([z.boolean(),z.lazy(() => GmailIntegrationArgsSchema)]).optional(),
}).strict()

// MESSAGE
//------------------------------------------------------

export const MessageIncludeSchema: z.ZodType<Prisma.MessageInclude> = z.object({
  slackIntegration: z.union([z.boolean(),z.lazy(() => SlackIntegrationArgsSchema)]).optional(),
}).strict()

export const MessageArgsSchema: z.ZodType<Prisma.MessageDefaultArgs> = z.object({
  select: z.lazy(() => MessageSelectSchema).optional(),
  include: z.lazy(() => MessageIncludeSchema).optional(),
}).strict();

export const MessageSelectSchema: z.ZodType<Prisma.MessageSelect> = z.object({
  id: z.boolean().optional(),
  messageId: z.boolean().optional(),
  slackIntegrationId: z.boolean().optional(),
  senderId: z.boolean().optional(),
  channelId: z.boolean().optional(),
  text: z.boolean().optional(),
  timestamp: z.boolean().optional(),
  threadTs: z.boolean().optional(),
  receivedAt: z.boolean().optional(),
  processed: z.boolean().optional(),
  slackIntegration: z.union([z.boolean(),z.lazy(() => SlackIntegrationArgsSchema)]).optional(),
}).strict()

// AUTOMATION
//------------------------------------------------------

export const AutomationIncludeSchema: z.ZodType<Prisma.AutomationInclude> = z.object({
  trigger: z.union([z.boolean(),z.lazy(() => TriggerArgsSchema)]).optional(),
  actions: z.union([z.boolean(),z.lazy(() => ActionFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => AutomationCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const AutomationArgsSchema: z.ZodType<Prisma.AutomationDefaultArgs> = z.object({
  select: z.lazy(() => AutomationSelectSchema).optional(),
  include: z.lazy(() => AutomationIncludeSchema).optional(),
}).strict();

export const AutomationCountOutputTypeArgsSchema: z.ZodType<Prisma.AutomationCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => AutomationCountOutputTypeSelectSchema).nullish(),
}).strict();

export const AutomationCountOutputTypeSelectSchema: z.ZodType<Prisma.AutomationCountOutputTypeSelect> = z.object({
  actions: z.boolean().optional(),
}).strict();

export const AutomationSelectSchema: z.ZodType<Prisma.AutomationSelect> = z.object({
  id: z.boolean().optional(),
  userId: z.boolean().optional(),
  name: z.boolean().optional(),
  lastRun: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  trigger: z.union([z.boolean(),z.lazy(() => TriggerArgsSchema)]).optional(),
  actions: z.union([z.boolean(),z.lazy(() => ActionFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => AutomationCountOutputTypeArgsSchema)]).optional(),
}).strict()

// TRIGGER
//------------------------------------------------------

export const TriggerIncludeSchema: z.ZodType<Prisma.TriggerInclude> = z.object({
  automation: z.union([z.boolean(),z.lazy(() => AutomationArgsSchema)]).optional(),
}).strict()

export const TriggerArgsSchema: z.ZodType<Prisma.TriggerDefaultArgs> = z.object({
  select: z.lazy(() => TriggerSelectSchema).optional(),
  include: z.lazy(() => TriggerIncludeSchema).optional(),
}).strict();

export const TriggerSelectSchema: z.ZodType<Prisma.TriggerSelect> = z.object({
  id: z.boolean().optional(),
  automationId: z.boolean().optional(),
  type: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  automation: z.union([z.boolean(),z.lazy(() => AutomationArgsSchema)]).optional(),
}).strict()

// ACTION
//------------------------------------------------------

export const ActionIncludeSchema: z.ZodType<Prisma.ActionInclude> = z.object({
  automation: z.union([z.boolean(),z.lazy(() => AutomationArgsSchema)]).optional(),
}).strict()

export const ActionArgsSchema: z.ZodType<Prisma.ActionDefaultArgs> = z.object({
  select: z.lazy(() => ActionSelectSchema).optional(),
  include: z.lazy(() => ActionIncludeSchema).optional(),
}).strict();

export const ActionSelectSchema: z.ZodType<Prisma.ActionSelect> = z.object({
  id: z.boolean().optional(),
  automationId: z.boolean().optional(),
  type: z.boolean().optional(),
  position: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  automation: z.union([z.boolean(),z.lazy(() => AutomationArgsSchema)]).optional(),
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
  type: z.union([ z.lazy(() => EnumIntegrationTypeFilterSchema),z.lazy(() => IntegrationTypeSchema) ]).optional(),
  status: z.union([ z.lazy(() => EnumIntegrationStatusFilterSchema),z.lazy(() => IntegrationStatusSchema) ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  user: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
  gmail: z.union([ z.lazy(() => GmailIntegrationNullableRelationFilterSchema),z.lazy(() => GmailIntegrationWhereInputSchema) ]).optional().nullable(),
  slack: z.union([ z.lazy(() => SlackIntegrationNullableRelationFilterSchema),z.lazy(() => SlackIntegrationWhereInputSchema) ]).optional().nullable(),
}).strict();

export const IntegrationOrderByWithRelationInputSchema: z.ZodType<Prisma.IntegrationOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  user: z.lazy(() => UserOrderByWithRelationInputSchema).optional(),
  gmail: z.lazy(() => GmailIntegrationOrderByWithRelationInputSchema).optional(),
  slack: z.lazy(() => SlackIntegrationOrderByWithRelationInputSchema).optional()
}).strict();

export const IntegrationWhereUniqueInputSchema: z.ZodType<Prisma.IntegrationWhereUniqueInput> = z.object({
  id: z.string()
})
.and(z.object({
  id: z.string().optional(),
  AND: z.union([ z.lazy(() => IntegrationWhereInputSchema),z.lazy(() => IntegrationWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => IntegrationWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => IntegrationWhereInputSchema),z.lazy(() => IntegrationWhereInputSchema).array() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  type: z.union([ z.lazy(() => EnumIntegrationTypeFilterSchema),z.lazy(() => IntegrationTypeSchema) ]).optional(),
  status: z.union([ z.lazy(() => EnumIntegrationStatusFilterSchema),z.lazy(() => IntegrationStatusSchema) ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  user: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
  gmail: z.union([ z.lazy(() => GmailIntegrationNullableRelationFilterSchema),z.lazy(() => GmailIntegrationWhereInputSchema) ]).optional().nullable(),
  slack: z.union([ z.lazy(() => SlackIntegrationNullableRelationFilterSchema),z.lazy(() => SlackIntegrationWhereInputSchema) ]).optional().nullable(),
}).strict());

export const IntegrationOrderByWithAggregationInputSchema: z.ZodType<Prisma.IntegrationOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
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
  type: z.union([ z.lazy(() => EnumIntegrationTypeWithAggregatesFilterSchema),z.lazy(() => IntegrationTypeSchema) ]).optional(),
  status: z.union([ z.lazy(() => EnumIntegrationStatusWithAggregatesFilterSchema),z.lazy(() => IntegrationStatusSchema) ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const GmailIntegrationWhereInputSchema: z.ZodType<Prisma.GmailIntegrationWhereInput> = z.object({
  AND: z.union([ z.lazy(() => GmailIntegrationWhereInputSchema),z.lazy(() => GmailIntegrationWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => GmailIntegrationWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => GmailIntegrationWhereInputSchema),z.lazy(() => GmailIntegrationWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  integrationId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  email: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  accessToken: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  refreshToken: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  tokenExpiration: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  recentHistoryId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  integration: z.union([ z.lazy(() => IntegrationRelationFilterSchema),z.lazy(() => IntegrationWhereInputSchema) ]).optional(),
  emails: z.lazy(() => EmailListRelationFilterSchema).optional()
}).strict();

export const GmailIntegrationOrderByWithRelationInputSchema: z.ZodType<Prisma.GmailIntegrationOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  integrationId: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  accessToken: z.lazy(() => SortOrderSchema).optional(),
  refreshToken: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  tokenExpiration: z.lazy(() => SortOrderSchema).optional(),
  recentHistoryId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  integration: z.lazy(() => IntegrationOrderByWithRelationInputSchema).optional(),
  emails: z.lazy(() => EmailOrderByRelationAggregateInputSchema).optional()
}).strict();

export const GmailIntegrationWhereUniqueInputSchema: z.ZodType<Prisma.GmailIntegrationWhereUniqueInput> = z.union([
  z.object({
    id: z.string(),
    integrationId: z.string(),
    email: z.string()
  }),
  z.object({
    id: z.string(),
    integrationId: z.string(),
  }),
  z.object({
    id: z.string(),
    email: z.string(),
  }),
  z.object({
    id: z.string(),
  }),
  z.object({
    integrationId: z.string(),
    email: z.string(),
  }),
  z.object({
    integrationId: z.string(),
  }),
  z.object({
    email: z.string(),
  }),
])
.and(z.object({
  id: z.string().optional(),
  integrationId: z.string().optional(),
  email: z.string().optional(),
  AND: z.union([ z.lazy(() => GmailIntegrationWhereInputSchema),z.lazy(() => GmailIntegrationWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => GmailIntegrationWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => GmailIntegrationWhereInputSchema),z.lazy(() => GmailIntegrationWhereInputSchema).array() ]).optional(),
  accessToken: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  refreshToken: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  tokenExpiration: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  recentHistoryId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  integration: z.union([ z.lazy(() => IntegrationRelationFilterSchema),z.lazy(() => IntegrationWhereInputSchema) ]).optional(),
  emails: z.lazy(() => EmailListRelationFilterSchema).optional()
}).strict());

export const GmailIntegrationOrderByWithAggregationInputSchema: z.ZodType<Prisma.GmailIntegrationOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  integrationId: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  accessToken: z.lazy(() => SortOrderSchema).optional(),
  refreshToken: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  tokenExpiration: z.lazy(() => SortOrderSchema).optional(),
  recentHistoryId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  _count: z.lazy(() => GmailIntegrationCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => GmailIntegrationMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => GmailIntegrationMinOrderByAggregateInputSchema).optional()
}).strict();

export const GmailIntegrationScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.GmailIntegrationScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => GmailIntegrationScalarWhereWithAggregatesInputSchema),z.lazy(() => GmailIntegrationScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => GmailIntegrationScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => GmailIntegrationScalarWhereWithAggregatesInputSchema),z.lazy(() => GmailIntegrationScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  integrationId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  email: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  accessToken: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  refreshToken: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  tokenExpiration: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  recentHistoryId: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
}).strict();

export const SlackIntegrationWhereInputSchema: z.ZodType<Prisma.SlackIntegrationWhereInput> = z.object({
  AND: z.union([ z.lazy(() => SlackIntegrationWhereInputSchema),z.lazy(() => SlackIntegrationWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => SlackIntegrationWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => SlackIntegrationWhereInputSchema),z.lazy(() => SlackIntegrationWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  integrationId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  teamId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  accessToken: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  slackUserId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  integration: z.union([ z.lazy(() => IntegrationRelationFilterSchema),z.lazy(() => IntegrationWhereInputSchema) ]).optional(),
  messages: z.lazy(() => MessageListRelationFilterSchema).optional()
}).strict();

export const SlackIntegrationOrderByWithRelationInputSchema: z.ZodType<Prisma.SlackIntegrationOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  integrationId: z.lazy(() => SortOrderSchema).optional(),
  teamId: z.lazy(() => SortOrderSchema).optional(),
  accessToken: z.lazy(() => SortOrderSchema).optional(),
  slackUserId: z.lazy(() => SortOrderSchema).optional(),
  integration: z.lazy(() => IntegrationOrderByWithRelationInputSchema).optional(),
  messages: z.lazy(() => MessageOrderByRelationAggregateInputSchema).optional()
}).strict();

export const SlackIntegrationWhereUniqueInputSchema: z.ZodType<Prisma.SlackIntegrationWhereUniqueInput> = z.union([
  z.object({
    id: z.string(),
    integrationId: z.string(),
    slackUserId: z.string()
  }),
  z.object({
    id: z.string(),
    integrationId: z.string(),
  }),
  z.object({
    id: z.string(),
    slackUserId: z.string(),
  }),
  z.object({
    id: z.string(),
  }),
  z.object({
    integrationId: z.string(),
    slackUserId: z.string(),
  }),
  z.object({
    integrationId: z.string(),
  }),
  z.object({
    slackUserId: z.string(),
  }),
])
.and(z.object({
  id: z.string().optional(),
  integrationId: z.string().optional(),
  slackUserId: z.string().optional(),
  AND: z.union([ z.lazy(() => SlackIntegrationWhereInputSchema),z.lazy(() => SlackIntegrationWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => SlackIntegrationWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => SlackIntegrationWhereInputSchema),z.lazy(() => SlackIntegrationWhereInputSchema).array() ]).optional(),
  teamId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  accessToken: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  integration: z.union([ z.lazy(() => IntegrationRelationFilterSchema),z.lazy(() => IntegrationWhereInputSchema) ]).optional(),
  messages: z.lazy(() => MessageListRelationFilterSchema).optional()
}).strict());

export const SlackIntegrationOrderByWithAggregationInputSchema: z.ZodType<Prisma.SlackIntegrationOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  integrationId: z.lazy(() => SortOrderSchema).optional(),
  teamId: z.lazy(() => SortOrderSchema).optional(),
  accessToken: z.lazy(() => SortOrderSchema).optional(),
  slackUserId: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => SlackIntegrationCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => SlackIntegrationMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => SlackIntegrationMinOrderByAggregateInputSchema).optional()
}).strict();

export const SlackIntegrationScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.SlackIntegrationScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => SlackIntegrationScalarWhereWithAggregatesInputSchema),z.lazy(() => SlackIntegrationScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => SlackIntegrationScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => SlackIntegrationScalarWhereWithAggregatesInputSchema),z.lazy(() => SlackIntegrationScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  integrationId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  teamId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  accessToken: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  slackUserId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
}).strict();

export const EmailWhereInputSchema: z.ZodType<Prisma.EmailWhereInput> = z.object({
  AND: z.union([ z.lazy(() => EmailWhereInputSchema),z.lazy(() => EmailWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => EmailWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => EmailWhereInputSchema),z.lazy(() => EmailWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  messageId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  gmailIntegrationId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  subject: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  from: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  date: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  body: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  receivedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  processed: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  gmailIntegration: z.union([ z.lazy(() => GmailIntegrationRelationFilterSchema),z.lazy(() => GmailIntegrationWhereInputSchema) ]).optional(),
}).strict();

export const EmailOrderByWithRelationInputSchema: z.ZodType<Prisma.EmailOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  messageId: z.lazy(() => SortOrderSchema).optional(),
  gmailIntegrationId: z.lazy(() => SortOrderSchema).optional(),
  subject: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  from: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  date: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  body: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  receivedAt: z.lazy(() => SortOrderSchema).optional(),
  processed: z.lazy(() => SortOrderSchema).optional(),
  gmailIntegration: z.lazy(() => GmailIntegrationOrderByWithRelationInputSchema).optional()
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
  gmailIntegrationId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  subject: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  from: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  date: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  body: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  receivedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  processed: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  gmailIntegration: z.union([ z.lazy(() => GmailIntegrationRelationFilterSchema),z.lazy(() => GmailIntegrationWhereInputSchema) ]).optional(),
}).strict());

export const EmailOrderByWithAggregationInputSchema: z.ZodType<Prisma.EmailOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  messageId: z.lazy(() => SortOrderSchema).optional(),
  gmailIntegrationId: z.lazy(() => SortOrderSchema).optional(),
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
  gmailIntegrationId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
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
  slackIntegrationId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  senderId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  channelId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  text: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  timestamp: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  threadTs: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  receivedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  processed: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  slackIntegration: z.union([ z.lazy(() => SlackIntegrationRelationFilterSchema),z.lazy(() => SlackIntegrationWhereInputSchema) ]).optional(),
}).strict();

export const MessageOrderByWithRelationInputSchema: z.ZodType<Prisma.MessageOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  messageId: z.lazy(() => SortOrderSchema).optional(),
  slackIntegrationId: z.lazy(() => SortOrderSchema).optional(),
  senderId: z.lazy(() => SortOrderSchema).optional(),
  channelId: z.lazy(() => SortOrderSchema).optional(),
  text: z.lazy(() => SortOrderSchema).optional(),
  timestamp: z.lazy(() => SortOrderSchema).optional(),
  threadTs: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  receivedAt: z.lazy(() => SortOrderSchema).optional(),
  processed: z.lazy(() => SortOrderSchema).optional(),
  slackIntegration: z.lazy(() => SlackIntegrationOrderByWithRelationInputSchema).optional()
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
  slackIntegrationId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  senderId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  channelId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  text: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  timestamp: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  threadTs: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  receivedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  processed: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  slackIntegration: z.union([ z.lazy(() => SlackIntegrationRelationFilterSchema),z.lazy(() => SlackIntegrationWhereInputSchema) ]).optional(),
}).strict());

export const MessageOrderByWithAggregationInputSchema: z.ZodType<Prisma.MessageOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  messageId: z.lazy(() => SortOrderSchema).optional(),
  slackIntegrationId: z.lazy(() => SortOrderSchema).optional(),
  senderId: z.lazy(() => SortOrderSchema).optional(),
  channelId: z.lazy(() => SortOrderSchema).optional(),
  text: z.lazy(() => SortOrderSchema).optional(),
  timestamp: z.lazy(() => SortOrderSchema).optional(),
  threadTs: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
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
  slackIntegrationId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  senderId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  channelId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  text: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  timestamp: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  threadTs: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  receivedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  processed: z.union([ z.lazy(() => BoolWithAggregatesFilterSchema),z.boolean() ]).optional(),
}).strict();

export const AutomationWhereInputSchema: z.ZodType<Prisma.AutomationWhereInput> = z.object({
  AND: z.union([ z.lazy(() => AutomationWhereInputSchema),z.lazy(() => AutomationWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => AutomationWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => AutomationWhereInputSchema),z.lazy(() => AutomationWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  lastRun: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  trigger: z.union([ z.lazy(() => TriggerNullableRelationFilterSchema),z.lazy(() => TriggerWhereInputSchema) ]).optional().nullable(),
  actions: z.lazy(() => ActionListRelationFilterSchema).optional()
}).strict();

export const AutomationOrderByWithRelationInputSchema: z.ZodType<Prisma.AutomationOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  lastRun: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  trigger: z.lazy(() => TriggerOrderByWithRelationInputSchema).optional(),
  actions: z.lazy(() => ActionOrderByRelationAggregateInputSchema).optional()
}).strict();

export const AutomationWhereUniqueInputSchema: z.ZodType<Prisma.AutomationWhereUniqueInput> = z.object({
  id: z.string()
})
.and(z.object({
  id: z.string().optional(),
  AND: z.union([ z.lazy(() => AutomationWhereInputSchema),z.lazy(() => AutomationWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => AutomationWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => AutomationWhereInputSchema),z.lazy(() => AutomationWhereInputSchema).array() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  lastRun: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  trigger: z.union([ z.lazy(() => TriggerNullableRelationFilterSchema),z.lazy(() => TriggerWhereInputSchema) ]).optional().nullable(),
  actions: z.lazy(() => ActionListRelationFilterSchema).optional()
}).strict());

export const AutomationOrderByWithAggregationInputSchema: z.ZodType<Prisma.AutomationOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  lastRun: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => AutomationCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => AutomationMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => AutomationMinOrderByAggregateInputSchema).optional()
}).strict();

export const AutomationScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.AutomationScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => AutomationScalarWhereWithAggregatesInputSchema),z.lazy(() => AutomationScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => AutomationScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => AutomationScalarWhereWithAggregatesInputSchema),z.lazy(() => AutomationScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  lastRun: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),z.coerce.date() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const TriggerWhereInputSchema: z.ZodType<Prisma.TriggerWhereInput> = z.object({
  AND: z.union([ z.lazy(() => TriggerWhereInputSchema),z.lazy(() => TriggerWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => TriggerWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => TriggerWhereInputSchema),z.lazy(() => TriggerWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  automationId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  type: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  automation: z.union([ z.lazy(() => AutomationRelationFilterSchema),z.lazy(() => AutomationWhereInputSchema) ]).optional(),
}).strict();

export const TriggerOrderByWithRelationInputSchema: z.ZodType<Prisma.TriggerOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  automationId: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  automation: z.lazy(() => AutomationOrderByWithRelationInputSchema).optional()
}).strict();

export const TriggerWhereUniqueInputSchema: z.ZodType<Prisma.TriggerWhereUniqueInput> = z.union([
  z.object({
    id: z.string(),
    automationId: z.string()
  }),
  z.object({
    id: z.string(),
  }),
  z.object({
    automationId: z.string(),
  }),
])
.and(z.object({
  id: z.string().optional(),
  automationId: z.string().optional(),
  AND: z.union([ z.lazy(() => TriggerWhereInputSchema),z.lazy(() => TriggerWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => TriggerWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => TriggerWhereInputSchema),z.lazy(() => TriggerWhereInputSchema).array() ]).optional(),
  type: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  automation: z.union([ z.lazy(() => AutomationRelationFilterSchema),z.lazy(() => AutomationWhereInputSchema) ]).optional(),
}).strict());

export const TriggerOrderByWithAggregationInputSchema: z.ZodType<Prisma.TriggerOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  automationId: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => TriggerCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => TriggerMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => TriggerMinOrderByAggregateInputSchema).optional()
}).strict();

export const TriggerScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.TriggerScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => TriggerScalarWhereWithAggregatesInputSchema),z.lazy(() => TriggerScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => TriggerScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => TriggerScalarWhereWithAggregatesInputSchema),z.lazy(() => TriggerScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  automationId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  type: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const ActionWhereInputSchema: z.ZodType<Prisma.ActionWhereInput> = z.object({
  AND: z.union([ z.lazy(() => ActionWhereInputSchema),z.lazy(() => ActionWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ActionWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ActionWhereInputSchema),z.lazy(() => ActionWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  automationId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  type: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  position: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  automation: z.union([ z.lazy(() => AutomationRelationFilterSchema),z.lazy(() => AutomationWhereInputSchema) ]).optional(),
}).strict();

export const ActionOrderByWithRelationInputSchema: z.ZodType<Prisma.ActionOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  automationId: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  position: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  automation: z.lazy(() => AutomationOrderByWithRelationInputSchema).optional()
}).strict();

export const ActionWhereUniqueInputSchema: z.ZodType<Prisma.ActionWhereUniqueInput> = z.object({
  id: z.string()
})
.and(z.object({
  id: z.string().optional(),
  AND: z.union([ z.lazy(() => ActionWhereInputSchema),z.lazy(() => ActionWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ActionWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ActionWhereInputSchema),z.lazy(() => ActionWhereInputSchema).array() ]).optional(),
  automationId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  type: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  position: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  automation: z.union([ z.lazy(() => AutomationRelationFilterSchema),z.lazy(() => AutomationWhereInputSchema) ]).optional(),
}).strict());

export const ActionOrderByWithAggregationInputSchema: z.ZodType<Prisma.ActionOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  automationId: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  position: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => ActionCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => ActionAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => ActionMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => ActionMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => ActionSumOrderByAggregateInputSchema).optional()
}).strict();

export const ActionScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.ActionScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => ActionScalarWhereWithAggregatesInputSchema),z.lazy(() => ActionScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => ActionScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ActionScalarWhereWithAggregatesInputSchema),z.lazy(() => ActionScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  automationId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  type: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  position: z.union([ z.lazy(() => FloatWithAggregatesFilterSchema),z.number() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
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
  type: z.lazy(() => IntegrationTypeSchema),
  status: z.lazy(() => IntegrationStatusSchema).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutIntegrationsInputSchema),
  gmail: z.lazy(() => GmailIntegrationCreateNestedOneWithoutIntegrationInputSchema).optional(),
  slack: z.lazy(() => SlackIntegrationCreateNestedOneWithoutIntegrationInputSchema).optional()
}).strict();

export const IntegrationUncheckedCreateInputSchema: z.ZodType<Prisma.IntegrationUncheckedCreateInput> = z.object({
  id: z.string().optional(),
  userId: z.string(),
  type: z.lazy(() => IntegrationTypeSchema),
  status: z.lazy(() => IntegrationStatusSchema).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  gmail: z.lazy(() => GmailIntegrationUncheckedCreateNestedOneWithoutIntegrationInputSchema).optional(),
  slack: z.lazy(() => SlackIntegrationUncheckedCreateNestedOneWithoutIntegrationInputSchema).optional()
}).strict();

export const IntegrationUpdateInputSchema: z.ZodType<Prisma.IntegrationUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => IntegrationTypeSchema),z.lazy(() => EnumIntegrationTypeFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => IntegrationStatusSchema),z.lazy(() => EnumIntegrationStatusFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutIntegrationsNestedInputSchema).optional(),
  gmail: z.lazy(() => GmailIntegrationUpdateOneWithoutIntegrationNestedInputSchema).optional(),
  slack: z.lazy(() => SlackIntegrationUpdateOneWithoutIntegrationNestedInputSchema).optional()
}).strict();

export const IntegrationUncheckedUpdateInputSchema: z.ZodType<Prisma.IntegrationUncheckedUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => IntegrationTypeSchema),z.lazy(() => EnumIntegrationTypeFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => IntegrationStatusSchema),z.lazy(() => EnumIntegrationStatusFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  gmail: z.lazy(() => GmailIntegrationUncheckedUpdateOneWithoutIntegrationNestedInputSchema).optional(),
  slack: z.lazy(() => SlackIntegrationUncheckedUpdateOneWithoutIntegrationNestedInputSchema).optional()
}).strict();

export const IntegrationCreateManyInputSchema: z.ZodType<Prisma.IntegrationCreateManyInput> = z.object({
  id: z.string().optional(),
  userId: z.string(),
  type: z.lazy(() => IntegrationTypeSchema),
  status: z.lazy(() => IntegrationStatusSchema).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const IntegrationUpdateManyMutationInputSchema: z.ZodType<Prisma.IntegrationUpdateManyMutationInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => IntegrationTypeSchema),z.lazy(() => EnumIntegrationTypeFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => IntegrationStatusSchema),z.lazy(() => EnumIntegrationStatusFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const IntegrationUncheckedUpdateManyInputSchema: z.ZodType<Prisma.IntegrationUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => IntegrationTypeSchema),z.lazy(() => EnumIntegrationTypeFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => IntegrationStatusSchema),z.lazy(() => EnumIntegrationStatusFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const GmailIntegrationCreateInputSchema: z.ZodType<Prisma.GmailIntegrationCreateInput> = z.object({
  id: z.string().optional(),
  email: z.string(),
  accessToken: z.string(),
  refreshToken: z.string().optional().nullable(),
  tokenExpiration: z.coerce.date(),
  recentHistoryId: z.string().optional().nullable(),
  integration: z.lazy(() => IntegrationCreateNestedOneWithoutGmailInputSchema),
  emails: z.lazy(() => EmailCreateNestedManyWithoutGmailIntegrationInputSchema).optional()
}).strict();

export const GmailIntegrationUncheckedCreateInputSchema: z.ZodType<Prisma.GmailIntegrationUncheckedCreateInput> = z.object({
  id: z.string().optional(),
  integrationId: z.string(),
  email: z.string(),
  accessToken: z.string(),
  refreshToken: z.string().optional().nullable(),
  tokenExpiration: z.coerce.date(),
  recentHistoryId: z.string().optional().nullable(),
  emails: z.lazy(() => EmailUncheckedCreateNestedManyWithoutGmailIntegrationInputSchema).optional()
}).strict();

export const GmailIntegrationUpdateInputSchema: z.ZodType<Prisma.GmailIntegrationUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  accessToken: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  refreshToken: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  tokenExpiration: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  recentHistoryId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  integration: z.lazy(() => IntegrationUpdateOneRequiredWithoutGmailNestedInputSchema).optional(),
  emails: z.lazy(() => EmailUpdateManyWithoutGmailIntegrationNestedInputSchema).optional()
}).strict();

export const GmailIntegrationUncheckedUpdateInputSchema: z.ZodType<Prisma.GmailIntegrationUncheckedUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  integrationId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  accessToken: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  refreshToken: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  tokenExpiration: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  recentHistoryId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emails: z.lazy(() => EmailUncheckedUpdateManyWithoutGmailIntegrationNestedInputSchema).optional()
}).strict();

export const GmailIntegrationCreateManyInputSchema: z.ZodType<Prisma.GmailIntegrationCreateManyInput> = z.object({
  id: z.string().optional(),
  integrationId: z.string(),
  email: z.string(),
  accessToken: z.string(),
  refreshToken: z.string().optional().nullable(),
  tokenExpiration: z.coerce.date(),
  recentHistoryId: z.string().optional().nullable()
}).strict();

export const GmailIntegrationUpdateManyMutationInputSchema: z.ZodType<Prisma.GmailIntegrationUpdateManyMutationInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  accessToken: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  refreshToken: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  tokenExpiration: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  recentHistoryId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const GmailIntegrationUncheckedUpdateManyInputSchema: z.ZodType<Prisma.GmailIntegrationUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  integrationId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  accessToken: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  refreshToken: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  tokenExpiration: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  recentHistoryId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const SlackIntegrationCreateInputSchema: z.ZodType<Prisma.SlackIntegrationCreateInput> = z.object({
  id: z.string().optional(),
  teamId: z.string(),
  accessToken: z.string(),
  slackUserId: z.string(),
  integration: z.lazy(() => IntegrationCreateNestedOneWithoutSlackInputSchema),
  messages: z.lazy(() => MessageCreateNestedManyWithoutSlackIntegrationInputSchema).optional()
}).strict();

export const SlackIntegrationUncheckedCreateInputSchema: z.ZodType<Prisma.SlackIntegrationUncheckedCreateInput> = z.object({
  id: z.string().optional(),
  integrationId: z.string(),
  teamId: z.string(),
  accessToken: z.string(),
  slackUserId: z.string(),
  messages: z.lazy(() => MessageUncheckedCreateNestedManyWithoutSlackIntegrationInputSchema).optional()
}).strict();

export const SlackIntegrationUpdateInputSchema: z.ZodType<Prisma.SlackIntegrationUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  teamId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  accessToken: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slackUserId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  integration: z.lazy(() => IntegrationUpdateOneRequiredWithoutSlackNestedInputSchema).optional(),
  messages: z.lazy(() => MessageUpdateManyWithoutSlackIntegrationNestedInputSchema).optional()
}).strict();

export const SlackIntegrationUncheckedUpdateInputSchema: z.ZodType<Prisma.SlackIntegrationUncheckedUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  integrationId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  teamId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  accessToken: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slackUserId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  messages: z.lazy(() => MessageUncheckedUpdateManyWithoutSlackIntegrationNestedInputSchema).optional()
}).strict();

export const SlackIntegrationCreateManyInputSchema: z.ZodType<Prisma.SlackIntegrationCreateManyInput> = z.object({
  id: z.string().optional(),
  integrationId: z.string(),
  teamId: z.string(),
  accessToken: z.string(),
  slackUserId: z.string()
}).strict();

export const SlackIntegrationUpdateManyMutationInputSchema: z.ZodType<Prisma.SlackIntegrationUpdateManyMutationInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  teamId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  accessToken: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slackUserId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const SlackIntegrationUncheckedUpdateManyInputSchema: z.ZodType<Prisma.SlackIntegrationUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  integrationId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  teamId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  accessToken: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slackUserId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
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
  gmailIntegration: z.lazy(() => GmailIntegrationCreateNestedOneWithoutEmailsInputSchema)
}).strict();

export const EmailUncheckedCreateInputSchema: z.ZodType<Prisma.EmailUncheckedCreateInput> = z.object({
  id: z.string().optional(),
  messageId: z.string(),
  gmailIntegrationId: z.string(),
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
  gmailIntegration: z.lazy(() => GmailIntegrationUpdateOneRequiredWithoutEmailsNestedInputSchema).optional()
}).strict();

export const EmailUncheckedUpdateInputSchema: z.ZodType<Prisma.EmailUncheckedUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  messageId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  gmailIntegrationId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
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
  gmailIntegrationId: z.string(),
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
  gmailIntegrationId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
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
  senderId: z.string(),
  channelId: z.string(),
  text: z.string(),
  timestamp: z.string(),
  threadTs: z.string().optional().nullable(),
  receivedAt: z.coerce.date().optional(),
  processed: z.boolean().optional(),
  slackIntegration: z.lazy(() => SlackIntegrationCreateNestedOneWithoutMessagesInputSchema)
}).strict();

export const MessageUncheckedCreateInputSchema: z.ZodType<Prisma.MessageUncheckedCreateInput> = z.object({
  id: z.string().optional(),
  messageId: z.string(),
  slackIntegrationId: z.string(),
  senderId: z.string(),
  channelId: z.string(),
  text: z.string(),
  timestamp: z.string(),
  threadTs: z.string().optional().nullable(),
  receivedAt: z.coerce.date().optional(),
  processed: z.boolean().optional()
}).strict();

export const MessageUpdateInputSchema: z.ZodType<Prisma.MessageUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  messageId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  senderId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  channelId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  text: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  timestamp: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  threadTs: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  receivedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  processed: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  slackIntegration: z.lazy(() => SlackIntegrationUpdateOneRequiredWithoutMessagesNestedInputSchema).optional()
}).strict();

export const MessageUncheckedUpdateInputSchema: z.ZodType<Prisma.MessageUncheckedUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  messageId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slackIntegrationId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  senderId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  channelId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  text: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  timestamp: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  threadTs: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  receivedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  processed: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const MessageCreateManyInputSchema: z.ZodType<Prisma.MessageCreateManyInput> = z.object({
  id: z.string().optional(),
  messageId: z.string(),
  slackIntegrationId: z.string(),
  senderId: z.string(),
  channelId: z.string(),
  text: z.string(),
  timestamp: z.string(),
  threadTs: z.string().optional().nullable(),
  receivedAt: z.coerce.date().optional(),
  processed: z.boolean().optional()
}).strict();

export const MessageUpdateManyMutationInputSchema: z.ZodType<Prisma.MessageUpdateManyMutationInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  messageId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  senderId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  channelId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  text: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  timestamp: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  threadTs: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  receivedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  processed: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const MessageUncheckedUpdateManyInputSchema: z.ZodType<Prisma.MessageUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  messageId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slackIntegrationId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  senderId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  channelId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  text: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  timestamp: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  threadTs: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  receivedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  processed: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const AutomationCreateInputSchema: z.ZodType<Prisma.AutomationCreateInput> = z.object({
  id: z.string().optional(),
  userId: z.string(),
  name: z.string(),
  lastRun: z.coerce.date().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  trigger: z.lazy(() => TriggerCreateNestedOneWithoutAutomationInputSchema).optional(),
  actions: z.lazy(() => ActionCreateNestedManyWithoutAutomationInputSchema).optional()
}).strict();

export const AutomationUncheckedCreateInputSchema: z.ZodType<Prisma.AutomationUncheckedCreateInput> = z.object({
  id: z.string().optional(),
  userId: z.string(),
  name: z.string(),
  lastRun: z.coerce.date().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  trigger: z.lazy(() => TriggerUncheckedCreateNestedOneWithoutAutomationInputSchema).optional(),
  actions: z.lazy(() => ActionUncheckedCreateNestedManyWithoutAutomationInputSchema).optional()
}).strict();

export const AutomationUpdateInputSchema: z.ZodType<Prisma.AutomationUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  lastRun: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  trigger: z.lazy(() => TriggerUpdateOneWithoutAutomationNestedInputSchema).optional(),
  actions: z.lazy(() => ActionUpdateManyWithoutAutomationNestedInputSchema).optional()
}).strict();

export const AutomationUncheckedUpdateInputSchema: z.ZodType<Prisma.AutomationUncheckedUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  lastRun: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  trigger: z.lazy(() => TriggerUncheckedUpdateOneWithoutAutomationNestedInputSchema).optional(),
  actions: z.lazy(() => ActionUncheckedUpdateManyWithoutAutomationNestedInputSchema).optional()
}).strict();

export const AutomationCreateManyInputSchema: z.ZodType<Prisma.AutomationCreateManyInput> = z.object({
  id: z.string().optional(),
  userId: z.string(),
  name: z.string(),
  lastRun: z.coerce.date().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const AutomationUpdateManyMutationInputSchema: z.ZodType<Prisma.AutomationUpdateManyMutationInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  lastRun: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const AutomationUncheckedUpdateManyInputSchema: z.ZodType<Prisma.AutomationUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  lastRun: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const TriggerCreateInputSchema: z.ZodType<Prisma.TriggerCreateInput> = z.object({
  id: z.string().optional(),
  type: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  automation: z.lazy(() => AutomationCreateNestedOneWithoutTriggerInputSchema)
}).strict();

export const TriggerUncheckedCreateInputSchema: z.ZodType<Prisma.TriggerUncheckedCreateInput> = z.object({
  id: z.string().optional(),
  automationId: z.string(),
  type: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const TriggerUpdateInputSchema: z.ZodType<Prisma.TriggerUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  automation: z.lazy(() => AutomationUpdateOneRequiredWithoutTriggerNestedInputSchema).optional()
}).strict();

export const TriggerUncheckedUpdateInputSchema: z.ZodType<Prisma.TriggerUncheckedUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  automationId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const TriggerCreateManyInputSchema: z.ZodType<Prisma.TriggerCreateManyInput> = z.object({
  id: z.string().optional(),
  automationId: z.string(),
  type: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const TriggerUpdateManyMutationInputSchema: z.ZodType<Prisma.TriggerUpdateManyMutationInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const TriggerUncheckedUpdateManyInputSchema: z.ZodType<Prisma.TriggerUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  automationId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ActionCreateInputSchema: z.ZodType<Prisma.ActionCreateInput> = z.object({
  id: z.string().optional(),
  type: z.string(),
  position: z.number(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  automation: z.lazy(() => AutomationCreateNestedOneWithoutActionsInputSchema)
}).strict();

export const ActionUncheckedCreateInputSchema: z.ZodType<Prisma.ActionUncheckedCreateInput> = z.object({
  id: z.string().optional(),
  automationId: z.string(),
  type: z.string(),
  position: z.number(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const ActionUpdateInputSchema: z.ZodType<Prisma.ActionUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  position: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  automation: z.lazy(() => AutomationUpdateOneRequiredWithoutActionsNestedInputSchema).optional()
}).strict();

export const ActionUncheckedUpdateInputSchema: z.ZodType<Prisma.ActionUncheckedUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  automationId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  position: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ActionCreateManyInputSchema: z.ZodType<Prisma.ActionCreateManyInput> = z.object({
  id: z.string().optional(),
  automationId: z.string(),
  type: z.string(),
  position: z.number(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const ActionUpdateManyMutationInputSchema: z.ZodType<Prisma.ActionUpdateManyMutationInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  position: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ActionUncheckedUpdateManyInputSchema: z.ZodType<Prisma.ActionUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  automationId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  position: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
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

export const EnumIntegrationStatusFilterSchema: z.ZodType<Prisma.EnumIntegrationStatusFilter> = z.object({
  equals: z.lazy(() => IntegrationStatusSchema).optional(),
  in: z.lazy(() => IntegrationStatusSchema).array().optional(),
  notIn: z.lazy(() => IntegrationStatusSchema).array().optional(),
  not: z.union([ z.lazy(() => IntegrationStatusSchema),z.lazy(() => NestedEnumIntegrationStatusFilterSchema) ]).optional(),
}).strict();

export const UserRelationFilterSchema: z.ZodType<Prisma.UserRelationFilter> = z.object({
  is: z.lazy(() => UserWhereInputSchema).optional(),
  isNot: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const GmailIntegrationNullableRelationFilterSchema: z.ZodType<Prisma.GmailIntegrationNullableRelationFilter> = z.object({
  is: z.lazy(() => GmailIntegrationWhereInputSchema).optional().nullable(),
  isNot: z.lazy(() => GmailIntegrationWhereInputSchema).optional().nullable()
}).strict();

export const SlackIntegrationNullableRelationFilterSchema: z.ZodType<Prisma.SlackIntegrationNullableRelationFilter> = z.object({
  is: z.lazy(() => SlackIntegrationWhereInputSchema).optional().nullable(),
  isNot: z.lazy(() => SlackIntegrationWhereInputSchema).optional().nullable()
}).strict();

export const IntegrationCountOrderByAggregateInputSchema: z.ZodType<Prisma.IntegrationCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const IntegrationMaxOrderByAggregateInputSchema: z.ZodType<Prisma.IntegrationMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const IntegrationMinOrderByAggregateInputSchema: z.ZodType<Prisma.IntegrationMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
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

export const EnumIntegrationStatusWithAggregatesFilterSchema: z.ZodType<Prisma.EnumIntegrationStatusWithAggregatesFilter> = z.object({
  equals: z.lazy(() => IntegrationStatusSchema).optional(),
  in: z.lazy(() => IntegrationStatusSchema).array().optional(),
  notIn: z.lazy(() => IntegrationStatusSchema).array().optional(),
  not: z.union([ z.lazy(() => IntegrationStatusSchema),z.lazy(() => NestedEnumIntegrationStatusWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumIntegrationStatusFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumIntegrationStatusFilterSchema).optional()
}).strict();

export const IntegrationRelationFilterSchema: z.ZodType<Prisma.IntegrationRelationFilter> = z.object({
  is: z.lazy(() => IntegrationWhereInputSchema).optional(),
  isNot: z.lazy(() => IntegrationWhereInputSchema).optional()
}).strict();

export const EmailListRelationFilterSchema: z.ZodType<Prisma.EmailListRelationFilter> = z.object({
  every: z.lazy(() => EmailWhereInputSchema).optional(),
  some: z.lazy(() => EmailWhereInputSchema).optional(),
  none: z.lazy(() => EmailWhereInputSchema).optional()
}).strict();

export const EmailOrderByRelationAggregateInputSchema: z.ZodType<Prisma.EmailOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const GmailIntegrationCountOrderByAggregateInputSchema: z.ZodType<Prisma.GmailIntegrationCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  integrationId: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  accessToken: z.lazy(() => SortOrderSchema).optional(),
  refreshToken: z.lazy(() => SortOrderSchema).optional(),
  tokenExpiration: z.lazy(() => SortOrderSchema).optional(),
  recentHistoryId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const GmailIntegrationMaxOrderByAggregateInputSchema: z.ZodType<Prisma.GmailIntegrationMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  integrationId: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  accessToken: z.lazy(() => SortOrderSchema).optional(),
  refreshToken: z.lazy(() => SortOrderSchema).optional(),
  tokenExpiration: z.lazy(() => SortOrderSchema).optional(),
  recentHistoryId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const GmailIntegrationMinOrderByAggregateInputSchema: z.ZodType<Prisma.GmailIntegrationMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  integrationId: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  accessToken: z.lazy(() => SortOrderSchema).optional(),
  refreshToken: z.lazy(() => SortOrderSchema).optional(),
  tokenExpiration: z.lazy(() => SortOrderSchema).optional(),
  recentHistoryId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const MessageListRelationFilterSchema: z.ZodType<Prisma.MessageListRelationFilter> = z.object({
  every: z.lazy(() => MessageWhereInputSchema).optional(),
  some: z.lazy(() => MessageWhereInputSchema).optional(),
  none: z.lazy(() => MessageWhereInputSchema).optional()
}).strict();

export const MessageOrderByRelationAggregateInputSchema: z.ZodType<Prisma.MessageOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const SlackIntegrationCountOrderByAggregateInputSchema: z.ZodType<Prisma.SlackIntegrationCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  integrationId: z.lazy(() => SortOrderSchema).optional(),
  teamId: z.lazy(() => SortOrderSchema).optional(),
  accessToken: z.lazy(() => SortOrderSchema).optional(),
  slackUserId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const SlackIntegrationMaxOrderByAggregateInputSchema: z.ZodType<Prisma.SlackIntegrationMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  integrationId: z.lazy(() => SortOrderSchema).optional(),
  teamId: z.lazy(() => SortOrderSchema).optional(),
  accessToken: z.lazy(() => SortOrderSchema).optional(),
  slackUserId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const SlackIntegrationMinOrderByAggregateInputSchema: z.ZodType<Prisma.SlackIntegrationMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  integrationId: z.lazy(() => SortOrderSchema).optional(),
  teamId: z.lazy(() => SortOrderSchema).optional(),
  accessToken: z.lazy(() => SortOrderSchema).optional(),
  slackUserId: z.lazy(() => SortOrderSchema).optional()
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

export const BoolFilterSchema: z.ZodType<Prisma.BoolFilter> = z.object({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolFilterSchema) ]).optional(),
}).strict();

export const GmailIntegrationRelationFilterSchema: z.ZodType<Prisma.GmailIntegrationRelationFilter> = z.object({
  is: z.lazy(() => GmailIntegrationWhereInputSchema).optional(),
  isNot: z.lazy(() => GmailIntegrationWhereInputSchema).optional()
}).strict();

export const EmailCountOrderByAggregateInputSchema: z.ZodType<Prisma.EmailCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  messageId: z.lazy(() => SortOrderSchema).optional(),
  gmailIntegrationId: z.lazy(() => SortOrderSchema).optional(),
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
  gmailIntegrationId: z.lazy(() => SortOrderSchema).optional(),
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
  gmailIntegrationId: z.lazy(() => SortOrderSchema).optional(),
  subject: z.lazy(() => SortOrderSchema).optional(),
  from: z.lazy(() => SortOrderSchema).optional(),
  date: z.lazy(() => SortOrderSchema).optional(),
  body: z.lazy(() => SortOrderSchema).optional(),
  receivedAt: z.lazy(() => SortOrderSchema).optional(),
  processed: z.lazy(() => SortOrderSchema).optional()
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

export const BoolWithAggregatesFilterSchema: z.ZodType<Prisma.BoolWithAggregatesFilter> = z.object({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedBoolFilterSchema).optional(),
  _max: z.lazy(() => NestedBoolFilterSchema).optional()
}).strict();

export const SlackIntegrationRelationFilterSchema: z.ZodType<Prisma.SlackIntegrationRelationFilter> = z.object({
  is: z.lazy(() => SlackIntegrationWhereInputSchema).optional(),
  isNot: z.lazy(() => SlackIntegrationWhereInputSchema).optional()
}).strict();

export const MessageCountOrderByAggregateInputSchema: z.ZodType<Prisma.MessageCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  messageId: z.lazy(() => SortOrderSchema).optional(),
  slackIntegrationId: z.lazy(() => SortOrderSchema).optional(),
  senderId: z.lazy(() => SortOrderSchema).optional(),
  channelId: z.lazy(() => SortOrderSchema).optional(),
  text: z.lazy(() => SortOrderSchema).optional(),
  timestamp: z.lazy(() => SortOrderSchema).optional(),
  threadTs: z.lazy(() => SortOrderSchema).optional(),
  receivedAt: z.lazy(() => SortOrderSchema).optional(),
  processed: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const MessageMaxOrderByAggregateInputSchema: z.ZodType<Prisma.MessageMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  messageId: z.lazy(() => SortOrderSchema).optional(),
  slackIntegrationId: z.lazy(() => SortOrderSchema).optional(),
  senderId: z.lazy(() => SortOrderSchema).optional(),
  channelId: z.lazy(() => SortOrderSchema).optional(),
  text: z.lazy(() => SortOrderSchema).optional(),
  timestamp: z.lazy(() => SortOrderSchema).optional(),
  threadTs: z.lazy(() => SortOrderSchema).optional(),
  receivedAt: z.lazy(() => SortOrderSchema).optional(),
  processed: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const MessageMinOrderByAggregateInputSchema: z.ZodType<Prisma.MessageMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  messageId: z.lazy(() => SortOrderSchema).optional(),
  slackIntegrationId: z.lazy(() => SortOrderSchema).optional(),
  senderId: z.lazy(() => SortOrderSchema).optional(),
  channelId: z.lazy(() => SortOrderSchema).optional(),
  text: z.lazy(() => SortOrderSchema).optional(),
  timestamp: z.lazy(() => SortOrderSchema).optional(),
  threadTs: z.lazy(() => SortOrderSchema).optional(),
  receivedAt: z.lazy(() => SortOrderSchema).optional(),
  processed: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const TriggerNullableRelationFilterSchema: z.ZodType<Prisma.TriggerNullableRelationFilter> = z.object({
  is: z.lazy(() => TriggerWhereInputSchema).optional().nullable(),
  isNot: z.lazy(() => TriggerWhereInputSchema).optional().nullable()
}).strict();

export const ActionListRelationFilterSchema: z.ZodType<Prisma.ActionListRelationFilter> = z.object({
  every: z.lazy(() => ActionWhereInputSchema).optional(),
  some: z.lazy(() => ActionWhereInputSchema).optional(),
  none: z.lazy(() => ActionWhereInputSchema).optional()
}).strict();

export const ActionOrderByRelationAggregateInputSchema: z.ZodType<Prisma.ActionOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const AutomationCountOrderByAggregateInputSchema: z.ZodType<Prisma.AutomationCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  lastRun: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const AutomationMaxOrderByAggregateInputSchema: z.ZodType<Prisma.AutomationMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  lastRun: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const AutomationMinOrderByAggregateInputSchema: z.ZodType<Prisma.AutomationMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  lastRun: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const AutomationRelationFilterSchema: z.ZodType<Prisma.AutomationRelationFilter> = z.object({
  is: z.lazy(() => AutomationWhereInputSchema).optional(),
  isNot: z.lazy(() => AutomationWhereInputSchema).optional()
}).strict();

export const TriggerCountOrderByAggregateInputSchema: z.ZodType<Prisma.TriggerCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  automationId: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const TriggerMaxOrderByAggregateInputSchema: z.ZodType<Prisma.TriggerMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  automationId: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const TriggerMinOrderByAggregateInputSchema: z.ZodType<Prisma.TriggerMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  automationId: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const FloatFilterSchema: z.ZodType<Prisma.FloatFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatFilterSchema) ]).optional(),
}).strict();

export const ActionCountOrderByAggregateInputSchema: z.ZodType<Prisma.ActionCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  automationId: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  position: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ActionAvgOrderByAggregateInputSchema: z.ZodType<Prisma.ActionAvgOrderByAggregateInput> = z.object({
  position: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ActionMaxOrderByAggregateInputSchema: z.ZodType<Prisma.ActionMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  automationId: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  position: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ActionMinOrderByAggregateInputSchema: z.ZodType<Prisma.ActionMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  automationId: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  position: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ActionSumOrderByAggregateInputSchema: z.ZodType<Prisma.ActionSumOrderByAggregateInput> = z.object({
  position: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const FloatWithAggregatesFilterSchema: z.ZodType<Prisma.FloatWithAggregatesFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedFloatFilterSchema).optional(),
  _min: z.lazy(() => NestedFloatFilterSchema).optional(),
  _max: z.lazy(() => NestedFloatFilterSchema).optional()
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

export const UserCreateNestedOneWithoutIntegrationsInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutIntegrationsInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutIntegrationsInputSchema),z.lazy(() => UserUncheckedCreateWithoutIntegrationsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutIntegrationsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export const GmailIntegrationCreateNestedOneWithoutIntegrationInputSchema: z.ZodType<Prisma.GmailIntegrationCreateNestedOneWithoutIntegrationInput> = z.object({
  create: z.union([ z.lazy(() => GmailIntegrationCreateWithoutIntegrationInputSchema),z.lazy(() => GmailIntegrationUncheckedCreateWithoutIntegrationInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => GmailIntegrationCreateOrConnectWithoutIntegrationInputSchema).optional(),
  connect: z.lazy(() => GmailIntegrationWhereUniqueInputSchema).optional()
}).strict();

export const SlackIntegrationCreateNestedOneWithoutIntegrationInputSchema: z.ZodType<Prisma.SlackIntegrationCreateNestedOneWithoutIntegrationInput> = z.object({
  create: z.union([ z.lazy(() => SlackIntegrationCreateWithoutIntegrationInputSchema),z.lazy(() => SlackIntegrationUncheckedCreateWithoutIntegrationInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => SlackIntegrationCreateOrConnectWithoutIntegrationInputSchema).optional(),
  connect: z.lazy(() => SlackIntegrationWhereUniqueInputSchema).optional()
}).strict();

export const GmailIntegrationUncheckedCreateNestedOneWithoutIntegrationInputSchema: z.ZodType<Prisma.GmailIntegrationUncheckedCreateNestedOneWithoutIntegrationInput> = z.object({
  create: z.union([ z.lazy(() => GmailIntegrationCreateWithoutIntegrationInputSchema),z.lazy(() => GmailIntegrationUncheckedCreateWithoutIntegrationInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => GmailIntegrationCreateOrConnectWithoutIntegrationInputSchema).optional(),
  connect: z.lazy(() => GmailIntegrationWhereUniqueInputSchema).optional()
}).strict();

export const SlackIntegrationUncheckedCreateNestedOneWithoutIntegrationInputSchema: z.ZodType<Prisma.SlackIntegrationUncheckedCreateNestedOneWithoutIntegrationInput> = z.object({
  create: z.union([ z.lazy(() => SlackIntegrationCreateWithoutIntegrationInputSchema),z.lazy(() => SlackIntegrationUncheckedCreateWithoutIntegrationInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => SlackIntegrationCreateOrConnectWithoutIntegrationInputSchema).optional(),
  connect: z.lazy(() => SlackIntegrationWhereUniqueInputSchema).optional()
}).strict();

export const EnumIntegrationTypeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumIntegrationTypeFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => IntegrationTypeSchema).optional()
}).strict();

export const EnumIntegrationStatusFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumIntegrationStatusFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => IntegrationStatusSchema).optional()
}).strict();

export const UserUpdateOneRequiredWithoutIntegrationsNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutIntegrationsNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutIntegrationsInputSchema),z.lazy(() => UserUncheckedCreateWithoutIntegrationsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutIntegrationsInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutIntegrationsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutIntegrationsInputSchema),z.lazy(() => UserUpdateWithoutIntegrationsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutIntegrationsInputSchema) ]).optional(),
}).strict();

export const GmailIntegrationUpdateOneWithoutIntegrationNestedInputSchema: z.ZodType<Prisma.GmailIntegrationUpdateOneWithoutIntegrationNestedInput> = z.object({
  create: z.union([ z.lazy(() => GmailIntegrationCreateWithoutIntegrationInputSchema),z.lazy(() => GmailIntegrationUncheckedCreateWithoutIntegrationInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => GmailIntegrationCreateOrConnectWithoutIntegrationInputSchema).optional(),
  upsert: z.lazy(() => GmailIntegrationUpsertWithoutIntegrationInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => GmailIntegrationWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => GmailIntegrationWhereInputSchema) ]).optional(),
  connect: z.lazy(() => GmailIntegrationWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => GmailIntegrationUpdateToOneWithWhereWithoutIntegrationInputSchema),z.lazy(() => GmailIntegrationUpdateWithoutIntegrationInputSchema),z.lazy(() => GmailIntegrationUncheckedUpdateWithoutIntegrationInputSchema) ]).optional(),
}).strict();

export const SlackIntegrationUpdateOneWithoutIntegrationNestedInputSchema: z.ZodType<Prisma.SlackIntegrationUpdateOneWithoutIntegrationNestedInput> = z.object({
  create: z.union([ z.lazy(() => SlackIntegrationCreateWithoutIntegrationInputSchema),z.lazy(() => SlackIntegrationUncheckedCreateWithoutIntegrationInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => SlackIntegrationCreateOrConnectWithoutIntegrationInputSchema).optional(),
  upsert: z.lazy(() => SlackIntegrationUpsertWithoutIntegrationInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => SlackIntegrationWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => SlackIntegrationWhereInputSchema) ]).optional(),
  connect: z.lazy(() => SlackIntegrationWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => SlackIntegrationUpdateToOneWithWhereWithoutIntegrationInputSchema),z.lazy(() => SlackIntegrationUpdateWithoutIntegrationInputSchema),z.lazy(() => SlackIntegrationUncheckedUpdateWithoutIntegrationInputSchema) ]).optional(),
}).strict();

export const GmailIntegrationUncheckedUpdateOneWithoutIntegrationNestedInputSchema: z.ZodType<Prisma.GmailIntegrationUncheckedUpdateOneWithoutIntegrationNestedInput> = z.object({
  create: z.union([ z.lazy(() => GmailIntegrationCreateWithoutIntegrationInputSchema),z.lazy(() => GmailIntegrationUncheckedCreateWithoutIntegrationInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => GmailIntegrationCreateOrConnectWithoutIntegrationInputSchema).optional(),
  upsert: z.lazy(() => GmailIntegrationUpsertWithoutIntegrationInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => GmailIntegrationWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => GmailIntegrationWhereInputSchema) ]).optional(),
  connect: z.lazy(() => GmailIntegrationWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => GmailIntegrationUpdateToOneWithWhereWithoutIntegrationInputSchema),z.lazy(() => GmailIntegrationUpdateWithoutIntegrationInputSchema),z.lazy(() => GmailIntegrationUncheckedUpdateWithoutIntegrationInputSchema) ]).optional(),
}).strict();

export const SlackIntegrationUncheckedUpdateOneWithoutIntegrationNestedInputSchema: z.ZodType<Prisma.SlackIntegrationUncheckedUpdateOneWithoutIntegrationNestedInput> = z.object({
  create: z.union([ z.lazy(() => SlackIntegrationCreateWithoutIntegrationInputSchema),z.lazy(() => SlackIntegrationUncheckedCreateWithoutIntegrationInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => SlackIntegrationCreateOrConnectWithoutIntegrationInputSchema).optional(),
  upsert: z.lazy(() => SlackIntegrationUpsertWithoutIntegrationInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => SlackIntegrationWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => SlackIntegrationWhereInputSchema) ]).optional(),
  connect: z.lazy(() => SlackIntegrationWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => SlackIntegrationUpdateToOneWithWhereWithoutIntegrationInputSchema),z.lazy(() => SlackIntegrationUpdateWithoutIntegrationInputSchema),z.lazy(() => SlackIntegrationUncheckedUpdateWithoutIntegrationInputSchema) ]).optional(),
}).strict();

export const IntegrationCreateNestedOneWithoutGmailInputSchema: z.ZodType<Prisma.IntegrationCreateNestedOneWithoutGmailInput> = z.object({
  create: z.union([ z.lazy(() => IntegrationCreateWithoutGmailInputSchema),z.lazy(() => IntegrationUncheckedCreateWithoutGmailInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => IntegrationCreateOrConnectWithoutGmailInputSchema).optional(),
  connect: z.lazy(() => IntegrationWhereUniqueInputSchema).optional()
}).strict();

export const EmailCreateNestedManyWithoutGmailIntegrationInputSchema: z.ZodType<Prisma.EmailCreateNestedManyWithoutGmailIntegrationInput> = z.object({
  create: z.union([ z.lazy(() => EmailCreateWithoutGmailIntegrationInputSchema),z.lazy(() => EmailCreateWithoutGmailIntegrationInputSchema).array(),z.lazy(() => EmailUncheckedCreateWithoutGmailIntegrationInputSchema),z.lazy(() => EmailUncheckedCreateWithoutGmailIntegrationInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => EmailCreateOrConnectWithoutGmailIntegrationInputSchema),z.lazy(() => EmailCreateOrConnectWithoutGmailIntegrationInputSchema).array() ]).optional(),
  createMany: z.lazy(() => EmailCreateManyGmailIntegrationInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => EmailWhereUniqueInputSchema),z.lazy(() => EmailWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const EmailUncheckedCreateNestedManyWithoutGmailIntegrationInputSchema: z.ZodType<Prisma.EmailUncheckedCreateNestedManyWithoutGmailIntegrationInput> = z.object({
  create: z.union([ z.lazy(() => EmailCreateWithoutGmailIntegrationInputSchema),z.lazy(() => EmailCreateWithoutGmailIntegrationInputSchema).array(),z.lazy(() => EmailUncheckedCreateWithoutGmailIntegrationInputSchema),z.lazy(() => EmailUncheckedCreateWithoutGmailIntegrationInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => EmailCreateOrConnectWithoutGmailIntegrationInputSchema),z.lazy(() => EmailCreateOrConnectWithoutGmailIntegrationInputSchema).array() ]).optional(),
  createMany: z.lazy(() => EmailCreateManyGmailIntegrationInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => EmailWhereUniqueInputSchema),z.lazy(() => EmailWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const IntegrationUpdateOneRequiredWithoutGmailNestedInputSchema: z.ZodType<Prisma.IntegrationUpdateOneRequiredWithoutGmailNestedInput> = z.object({
  create: z.union([ z.lazy(() => IntegrationCreateWithoutGmailInputSchema),z.lazy(() => IntegrationUncheckedCreateWithoutGmailInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => IntegrationCreateOrConnectWithoutGmailInputSchema).optional(),
  upsert: z.lazy(() => IntegrationUpsertWithoutGmailInputSchema).optional(),
  connect: z.lazy(() => IntegrationWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => IntegrationUpdateToOneWithWhereWithoutGmailInputSchema),z.lazy(() => IntegrationUpdateWithoutGmailInputSchema),z.lazy(() => IntegrationUncheckedUpdateWithoutGmailInputSchema) ]).optional(),
}).strict();

export const EmailUpdateManyWithoutGmailIntegrationNestedInputSchema: z.ZodType<Prisma.EmailUpdateManyWithoutGmailIntegrationNestedInput> = z.object({
  create: z.union([ z.lazy(() => EmailCreateWithoutGmailIntegrationInputSchema),z.lazy(() => EmailCreateWithoutGmailIntegrationInputSchema).array(),z.lazy(() => EmailUncheckedCreateWithoutGmailIntegrationInputSchema),z.lazy(() => EmailUncheckedCreateWithoutGmailIntegrationInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => EmailCreateOrConnectWithoutGmailIntegrationInputSchema),z.lazy(() => EmailCreateOrConnectWithoutGmailIntegrationInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => EmailUpsertWithWhereUniqueWithoutGmailIntegrationInputSchema),z.lazy(() => EmailUpsertWithWhereUniqueWithoutGmailIntegrationInputSchema).array() ]).optional(),
  createMany: z.lazy(() => EmailCreateManyGmailIntegrationInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => EmailWhereUniqueInputSchema),z.lazy(() => EmailWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => EmailWhereUniqueInputSchema),z.lazy(() => EmailWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => EmailWhereUniqueInputSchema),z.lazy(() => EmailWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => EmailWhereUniqueInputSchema),z.lazy(() => EmailWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => EmailUpdateWithWhereUniqueWithoutGmailIntegrationInputSchema),z.lazy(() => EmailUpdateWithWhereUniqueWithoutGmailIntegrationInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => EmailUpdateManyWithWhereWithoutGmailIntegrationInputSchema),z.lazy(() => EmailUpdateManyWithWhereWithoutGmailIntegrationInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => EmailScalarWhereInputSchema),z.lazy(() => EmailScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const EmailUncheckedUpdateManyWithoutGmailIntegrationNestedInputSchema: z.ZodType<Prisma.EmailUncheckedUpdateManyWithoutGmailIntegrationNestedInput> = z.object({
  create: z.union([ z.lazy(() => EmailCreateWithoutGmailIntegrationInputSchema),z.lazy(() => EmailCreateWithoutGmailIntegrationInputSchema).array(),z.lazy(() => EmailUncheckedCreateWithoutGmailIntegrationInputSchema),z.lazy(() => EmailUncheckedCreateWithoutGmailIntegrationInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => EmailCreateOrConnectWithoutGmailIntegrationInputSchema),z.lazy(() => EmailCreateOrConnectWithoutGmailIntegrationInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => EmailUpsertWithWhereUniqueWithoutGmailIntegrationInputSchema),z.lazy(() => EmailUpsertWithWhereUniqueWithoutGmailIntegrationInputSchema).array() ]).optional(),
  createMany: z.lazy(() => EmailCreateManyGmailIntegrationInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => EmailWhereUniqueInputSchema),z.lazy(() => EmailWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => EmailWhereUniqueInputSchema),z.lazy(() => EmailWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => EmailWhereUniqueInputSchema),z.lazy(() => EmailWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => EmailWhereUniqueInputSchema),z.lazy(() => EmailWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => EmailUpdateWithWhereUniqueWithoutGmailIntegrationInputSchema),z.lazy(() => EmailUpdateWithWhereUniqueWithoutGmailIntegrationInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => EmailUpdateManyWithWhereWithoutGmailIntegrationInputSchema),z.lazy(() => EmailUpdateManyWithWhereWithoutGmailIntegrationInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => EmailScalarWhereInputSchema),z.lazy(() => EmailScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const IntegrationCreateNestedOneWithoutSlackInputSchema: z.ZodType<Prisma.IntegrationCreateNestedOneWithoutSlackInput> = z.object({
  create: z.union([ z.lazy(() => IntegrationCreateWithoutSlackInputSchema),z.lazy(() => IntegrationUncheckedCreateWithoutSlackInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => IntegrationCreateOrConnectWithoutSlackInputSchema).optional(),
  connect: z.lazy(() => IntegrationWhereUniqueInputSchema).optional()
}).strict();

export const MessageCreateNestedManyWithoutSlackIntegrationInputSchema: z.ZodType<Prisma.MessageCreateNestedManyWithoutSlackIntegrationInput> = z.object({
  create: z.union([ z.lazy(() => MessageCreateWithoutSlackIntegrationInputSchema),z.lazy(() => MessageCreateWithoutSlackIntegrationInputSchema).array(),z.lazy(() => MessageUncheckedCreateWithoutSlackIntegrationInputSchema),z.lazy(() => MessageUncheckedCreateWithoutSlackIntegrationInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => MessageCreateOrConnectWithoutSlackIntegrationInputSchema),z.lazy(() => MessageCreateOrConnectWithoutSlackIntegrationInputSchema).array() ]).optional(),
  createMany: z.lazy(() => MessageCreateManySlackIntegrationInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => MessageWhereUniqueInputSchema),z.lazy(() => MessageWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const MessageUncheckedCreateNestedManyWithoutSlackIntegrationInputSchema: z.ZodType<Prisma.MessageUncheckedCreateNestedManyWithoutSlackIntegrationInput> = z.object({
  create: z.union([ z.lazy(() => MessageCreateWithoutSlackIntegrationInputSchema),z.lazy(() => MessageCreateWithoutSlackIntegrationInputSchema).array(),z.lazy(() => MessageUncheckedCreateWithoutSlackIntegrationInputSchema),z.lazy(() => MessageUncheckedCreateWithoutSlackIntegrationInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => MessageCreateOrConnectWithoutSlackIntegrationInputSchema),z.lazy(() => MessageCreateOrConnectWithoutSlackIntegrationInputSchema).array() ]).optional(),
  createMany: z.lazy(() => MessageCreateManySlackIntegrationInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => MessageWhereUniqueInputSchema),z.lazy(() => MessageWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const IntegrationUpdateOneRequiredWithoutSlackNestedInputSchema: z.ZodType<Prisma.IntegrationUpdateOneRequiredWithoutSlackNestedInput> = z.object({
  create: z.union([ z.lazy(() => IntegrationCreateWithoutSlackInputSchema),z.lazy(() => IntegrationUncheckedCreateWithoutSlackInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => IntegrationCreateOrConnectWithoutSlackInputSchema).optional(),
  upsert: z.lazy(() => IntegrationUpsertWithoutSlackInputSchema).optional(),
  connect: z.lazy(() => IntegrationWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => IntegrationUpdateToOneWithWhereWithoutSlackInputSchema),z.lazy(() => IntegrationUpdateWithoutSlackInputSchema),z.lazy(() => IntegrationUncheckedUpdateWithoutSlackInputSchema) ]).optional(),
}).strict();

export const MessageUpdateManyWithoutSlackIntegrationNestedInputSchema: z.ZodType<Prisma.MessageUpdateManyWithoutSlackIntegrationNestedInput> = z.object({
  create: z.union([ z.lazy(() => MessageCreateWithoutSlackIntegrationInputSchema),z.lazy(() => MessageCreateWithoutSlackIntegrationInputSchema).array(),z.lazy(() => MessageUncheckedCreateWithoutSlackIntegrationInputSchema),z.lazy(() => MessageUncheckedCreateWithoutSlackIntegrationInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => MessageCreateOrConnectWithoutSlackIntegrationInputSchema),z.lazy(() => MessageCreateOrConnectWithoutSlackIntegrationInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => MessageUpsertWithWhereUniqueWithoutSlackIntegrationInputSchema),z.lazy(() => MessageUpsertWithWhereUniqueWithoutSlackIntegrationInputSchema).array() ]).optional(),
  createMany: z.lazy(() => MessageCreateManySlackIntegrationInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => MessageWhereUniqueInputSchema),z.lazy(() => MessageWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => MessageWhereUniqueInputSchema),z.lazy(() => MessageWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => MessageWhereUniqueInputSchema),z.lazy(() => MessageWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => MessageWhereUniqueInputSchema),z.lazy(() => MessageWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => MessageUpdateWithWhereUniqueWithoutSlackIntegrationInputSchema),z.lazy(() => MessageUpdateWithWhereUniqueWithoutSlackIntegrationInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => MessageUpdateManyWithWhereWithoutSlackIntegrationInputSchema),z.lazy(() => MessageUpdateManyWithWhereWithoutSlackIntegrationInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => MessageScalarWhereInputSchema),z.lazy(() => MessageScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const MessageUncheckedUpdateManyWithoutSlackIntegrationNestedInputSchema: z.ZodType<Prisma.MessageUncheckedUpdateManyWithoutSlackIntegrationNestedInput> = z.object({
  create: z.union([ z.lazy(() => MessageCreateWithoutSlackIntegrationInputSchema),z.lazy(() => MessageCreateWithoutSlackIntegrationInputSchema).array(),z.lazy(() => MessageUncheckedCreateWithoutSlackIntegrationInputSchema),z.lazy(() => MessageUncheckedCreateWithoutSlackIntegrationInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => MessageCreateOrConnectWithoutSlackIntegrationInputSchema),z.lazy(() => MessageCreateOrConnectWithoutSlackIntegrationInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => MessageUpsertWithWhereUniqueWithoutSlackIntegrationInputSchema),z.lazy(() => MessageUpsertWithWhereUniqueWithoutSlackIntegrationInputSchema).array() ]).optional(),
  createMany: z.lazy(() => MessageCreateManySlackIntegrationInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => MessageWhereUniqueInputSchema),z.lazy(() => MessageWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => MessageWhereUniqueInputSchema),z.lazy(() => MessageWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => MessageWhereUniqueInputSchema),z.lazy(() => MessageWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => MessageWhereUniqueInputSchema),z.lazy(() => MessageWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => MessageUpdateWithWhereUniqueWithoutSlackIntegrationInputSchema),z.lazy(() => MessageUpdateWithWhereUniqueWithoutSlackIntegrationInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => MessageUpdateManyWithWhereWithoutSlackIntegrationInputSchema),z.lazy(() => MessageUpdateManyWithWhereWithoutSlackIntegrationInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => MessageScalarWhereInputSchema),z.lazy(() => MessageScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const GmailIntegrationCreateNestedOneWithoutEmailsInputSchema: z.ZodType<Prisma.GmailIntegrationCreateNestedOneWithoutEmailsInput> = z.object({
  create: z.union([ z.lazy(() => GmailIntegrationCreateWithoutEmailsInputSchema),z.lazy(() => GmailIntegrationUncheckedCreateWithoutEmailsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => GmailIntegrationCreateOrConnectWithoutEmailsInputSchema).optional(),
  connect: z.lazy(() => GmailIntegrationWhereUniqueInputSchema).optional()
}).strict();

export const NullableDateTimeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableDateTimeFieldUpdateOperationsInput> = z.object({
  set: z.coerce.date().optional().nullable()
}).strict();

export const BoolFieldUpdateOperationsInputSchema: z.ZodType<Prisma.BoolFieldUpdateOperationsInput> = z.object({
  set: z.boolean().optional()
}).strict();

export const GmailIntegrationUpdateOneRequiredWithoutEmailsNestedInputSchema: z.ZodType<Prisma.GmailIntegrationUpdateOneRequiredWithoutEmailsNestedInput> = z.object({
  create: z.union([ z.lazy(() => GmailIntegrationCreateWithoutEmailsInputSchema),z.lazy(() => GmailIntegrationUncheckedCreateWithoutEmailsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => GmailIntegrationCreateOrConnectWithoutEmailsInputSchema).optional(),
  upsert: z.lazy(() => GmailIntegrationUpsertWithoutEmailsInputSchema).optional(),
  connect: z.lazy(() => GmailIntegrationWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => GmailIntegrationUpdateToOneWithWhereWithoutEmailsInputSchema),z.lazy(() => GmailIntegrationUpdateWithoutEmailsInputSchema),z.lazy(() => GmailIntegrationUncheckedUpdateWithoutEmailsInputSchema) ]).optional(),
}).strict();

export const SlackIntegrationCreateNestedOneWithoutMessagesInputSchema: z.ZodType<Prisma.SlackIntegrationCreateNestedOneWithoutMessagesInput> = z.object({
  create: z.union([ z.lazy(() => SlackIntegrationCreateWithoutMessagesInputSchema),z.lazy(() => SlackIntegrationUncheckedCreateWithoutMessagesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => SlackIntegrationCreateOrConnectWithoutMessagesInputSchema).optional(),
  connect: z.lazy(() => SlackIntegrationWhereUniqueInputSchema).optional()
}).strict();

export const SlackIntegrationUpdateOneRequiredWithoutMessagesNestedInputSchema: z.ZodType<Prisma.SlackIntegrationUpdateOneRequiredWithoutMessagesNestedInput> = z.object({
  create: z.union([ z.lazy(() => SlackIntegrationCreateWithoutMessagesInputSchema),z.lazy(() => SlackIntegrationUncheckedCreateWithoutMessagesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => SlackIntegrationCreateOrConnectWithoutMessagesInputSchema).optional(),
  upsert: z.lazy(() => SlackIntegrationUpsertWithoutMessagesInputSchema).optional(),
  connect: z.lazy(() => SlackIntegrationWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => SlackIntegrationUpdateToOneWithWhereWithoutMessagesInputSchema),z.lazy(() => SlackIntegrationUpdateWithoutMessagesInputSchema),z.lazy(() => SlackIntegrationUncheckedUpdateWithoutMessagesInputSchema) ]).optional(),
}).strict();

export const TriggerCreateNestedOneWithoutAutomationInputSchema: z.ZodType<Prisma.TriggerCreateNestedOneWithoutAutomationInput> = z.object({
  create: z.union([ z.lazy(() => TriggerCreateWithoutAutomationInputSchema),z.lazy(() => TriggerUncheckedCreateWithoutAutomationInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => TriggerCreateOrConnectWithoutAutomationInputSchema).optional(),
  connect: z.lazy(() => TriggerWhereUniqueInputSchema).optional()
}).strict();

export const ActionCreateNestedManyWithoutAutomationInputSchema: z.ZodType<Prisma.ActionCreateNestedManyWithoutAutomationInput> = z.object({
  create: z.union([ z.lazy(() => ActionCreateWithoutAutomationInputSchema),z.lazy(() => ActionCreateWithoutAutomationInputSchema).array(),z.lazy(() => ActionUncheckedCreateWithoutAutomationInputSchema),z.lazy(() => ActionUncheckedCreateWithoutAutomationInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ActionCreateOrConnectWithoutAutomationInputSchema),z.lazy(() => ActionCreateOrConnectWithoutAutomationInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ActionCreateManyAutomationInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ActionWhereUniqueInputSchema),z.lazy(() => ActionWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const TriggerUncheckedCreateNestedOneWithoutAutomationInputSchema: z.ZodType<Prisma.TriggerUncheckedCreateNestedOneWithoutAutomationInput> = z.object({
  create: z.union([ z.lazy(() => TriggerCreateWithoutAutomationInputSchema),z.lazy(() => TriggerUncheckedCreateWithoutAutomationInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => TriggerCreateOrConnectWithoutAutomationInputSchema).optional(),
  connect: z.lazy(() => TriggerWhereUniqueInputSchema).optional()
}).strict();

export const ActionUncheckedCreateNestedManyWithoutAutomationInputSchema: z.ZodType<Prisma.ActionUncheckedCreateNestedManyWithoutAutomationInput> = z.object({
  create: z.union([ z.lazy(() => ActionCreateWithoutAutomationInputSchema),z.lazy(() => ActionCreateWithoutAutomationInputSchema).array(),z.lazy(() => ActionUncheckedCreateWithoutAutomationInputSchema),z.lazy(() => ActionUncheckedCreateWithoutAutomationInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ActionCreateOrConnectWithoutAutomationInputSchema),z.lazy(() => ActionCreateOrConnectWithoutAutomationInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ActionCreateManyAutomationInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ActionWhereUniqueInputSchema),z.lazy(() => ActionWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const TriggerUpdateOneWithoutAutomationNestedInputSchema: z.ZodType<Prisma.TriggerUpdateOneWithoutAutomationNestedInput> = z.object({
  create: z.union([ z.lazy(() => TriggerCreateWithoutAutomationInputSchema),z.lazy(() => TriggerUncheckedCreateWithoutAutomationInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => TriggerCreateOrConnectWithoutAutomationInputSchema).optional(),
  upsert: z.lazy(() => TriggerUpsertWithoutAutomationInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => TriggerWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => TriggerWhereInputSchema) ]).optional(),
  connect: z.lazy(() => TriggerWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => TriggerUpdateToOneWithWhereWithoutAutomationInputSchema),z.lazy(() => TriggerUpdateWithoutAutomationInputSchema),z.lazy(() => TriggerUncheckedUpdateWithoutAutomationInputSchema) ]).optional(),
}).strict();

export const ActionUpdateManyWithoutAutomationNestedInputSchema: z.ZodType<Prisma.ActionUpdateManyWithoutAutomationNestedInput> = z.object({
  create: z.union([ z.lazy(() => ActionCreateWithoutAutomationInputSchema),z.lazy(() => ActionCreateWithoutAutomationInputSchema).array(),z.lazy(() => ActionUncheckedCreateWithoutAutomationInputSchema),z.lazy(() => ActionUncheckedCreateWithoutAutomationInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ActionCreateOrConnectWithoutAutomationInputSchema),z.lazy(() => ActionCreateOrConnectWithoutAutomationInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ActionUpsertWithWhereUniqueWithoutAutomationInputSchema),z.lazy(() => ActionUpsertWithWhereUniqueWithoutAutomationInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ActionCreateManyAutomationInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ActionWhereUniqueInputSchema),z.lazy(() => ActionWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ActionWhereUniqueInputSchema),z.lazy(() => ActionWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ActionWhereUniqueInputSchema),z.lazy(() => ActionWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ActionWhereUniqueInputSchema),z.lazy(() => ActionWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ActionUpdateWithWhereUniqueWithoutAutomationInputSchema),z.lazy(() => ActionUpdateWithWhereUniqueWithoutAutomationInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ActionUpdateManyWithWhereWithoutAutomationInputSchema),z.lazy(() => ActionUpdateManyWithWhereWithoutAutomationInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ActionScalarWhereInputSchema),z.lazy(() => ActionScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const TriggerUncheckedUpdateOneWithoutAutomationNestedInputSchema: z.ZodType<Prisma.TriggerUncheckedUpdateOneWithoutAutomationNestedInput> = z.object({
  create: z.union([ z.lazy(() => TriggerCreateWithoutAutomationInputSchema),z.lazy(() => TriggerUncheckedCreateWithoutAutomationInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => TriggerCreateOrConnectWithoutAutomationInputSchema).optional(),
  upsert: z.lazy(() => TriggerUpsertWithoutAutomationInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => TriggerWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => TriggerWhereInputSchema) ]).optional(),
  connect: z.lazy(() => TriggerWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => TriggerUpdateToOneWithWhereWithoutAutomationInputSchema),z.lazy(() => TriggerUpdateWithoutAutomationInputSchema),z.lazy(() => TriggerUncheckedUpdateWithoutAutomationInputSchema) ]).optional(),
}).strict();

export const ActionUncheckedUpdateManyWithoutAutomationNestedInputSchema: z.ZodType<Prisma.ActionUncheckedUpdateManyWithoutAutomationNestedInput> = z.object({
  create: z.union([ z.lazy(() => ActionCreateWithoutAutomationInputSchema),z.lazy(() => ActionCreateWithoutAutomationInputSchema).array(),z.lazy(() => ActionUncheckedCreateWithoutAutomationInputSchema),z.lazy(() => ActionUncheckedCreateWithoutAutomationInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ActionCreateOrConnectWithoutAutomationInputSchema),z.lazy(() => ActionCreateOrConnectWithoutAutomationInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ActionUpsertWithWhereUniqueWithoutAutomationInputSchema),z.lazy(() => ActionUpsertWithWhereUniqueWithoutAutomationInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ActionCreateManyAutomationInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ActionWhereUniqueInputSchema),z.lazy(() => ActionWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ActionWhereUniqueInputSchema),z.lazy(() => ActionWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ActionWhereUniqueInputSchema),z.lazy(() => ActionWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ActionWhereUniqueInputSchema),z.lazy(() => ActionWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ActionUpdateWithWhereUniqueWithoutAutomationInputSchema),z.lazy(() => ActionUpdateWithWhereUniqueWithoutAutomationInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ActionUpdateManyWithWhereWithoutAutomationInputSchema),z.lazy(() => ActionUpdateManyWithWhereWithoutAutomationInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ActionScalarWhereInputSchema),z.lazy(() => ActionScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const AutomationCreateNestedOneWithoutTriggerInputSchema: z.ZodType<Prisma.AutomationCreateNestedOneWithoutTriggerInput> = z.object({
  create: z.union([ z.lazy(() => AutomationCreateWithoutTriggerInputSchema),z.lazy(() => AutomationUncheckedCreateWithoutTriggerInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => AutomationCreateOrConnectWithoutTriggerInputSchema).optional(),
  connect: z.lazy(() => AutomationWhereUniqueInputSchema).optional()
}).strict();

export const AutomationUpdateOneRequiredWithoutTriggerNestedInputSchema: z.ZodType<Prisma.AutomationUpdateOneRequiredWithoutTriggerNestedInput> = z.object({
  create: z.union([ z.lazy(() => AutomationCreateWithoutTriggerInputSchema),z.lazy(() => AutomationUncheckedCreateWithoutTriggerInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => AutomationCreateOrConnectWithoutTriggerInputSchema).optional(),
  upsert: z.lazy(() => AutomationUpsertWithoutTriggerInputSchema).optional(),
  connect: z.lazy(() => AutomationWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => AutomationUpdateToOneWithWhereWithoutTriggerInputSchema),z.lazy(() => AutomationUpdateWithoutTriggerInputSchema),z.lazy(() => AutomationUncheckedUpdateWithoutTriggerInputSchema) ]).optional(),
}).strict();

export const AutomationCreateNestedOneWithoutActionsInputSchema: z.ZodType<Prisma.AutomationCreateNestedOneWithoutActionsInput> = z.object({
  create: z.union([ z.lazy(() => AutomationCreateWithoutActionsInputSchema),z.lazy(() => AutomationUncheckedCreateWithoutActionsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => AutomationCreateOrConnectWithoutActionsInputSchema).optional(),
  connect: z.lazy(() => AutomationWhereUniqueInputSchema).optional()
}).strict();

export const FloatFieldUpdateOperationsInputSchema: z.ZodType<Prisma.FloatFieldUpdateOperationsInput> = z.object({
  set: z.number().optional(),
  increment: z.number().optional(),
  decrement: z.number().optional(),
  multiply: z.number().optional(),
  divide: z.number().optional()
}).strict();

export const AutomationUpdateOneRequiredWithoutActionsNestedInputSchema: z.ZodType<Prisma.AutomationUpdateOneRequiredWithoutActionsNestedInput> = z.object({
  create: z.union([ z.lazy(() => AutomationCreateWithoutActionsInputSchema),z.lazy(() => AutomationUncheckedCreateWithoutActionsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => AutomationCreateOrConnectWithoutActionsInputSchema).optional(),
  upsert: z.lazy(() => AutomationUpsertWithoutActionsInputSchema).optional(),
  connect: z.lazy(() => AutomationWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => AutomationUpdateToOneWithWhereWithoutActionsInputSchema),z.lazy(() => AutomationUpdateWithoutActionsInputSchema),z.lazy(() => AutomationUncheckedUpdateWithoutActionsInputSchema) ]).optional(),
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

export const NestedEnumIntegrationStatusFilterSchema: z.ZodType<Prisma.NestedEnumIntegrationStatusFilter> = z.object({
  equals: z.lazy(() => IntegrationStatusSchema).optional(),
  in: z.lazy(() => IntegrationStatusSchema).array().optional(),
  notIn: z.lazy(() => IntegrationStatusSchema).array().optional(),
  not: z.union([ z.lazy(() => IntegrationStatusSchema),z.lazy(() => NestedEnumIntegrationStatusFilterSchema) ]).optional(),
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

export const NestedEnumIntegrationStatusWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumIntegrationStatusWithAggregatesFilter> = z.object({
  equals: z.lazy(() => IntegrationStatusSchema).optional(),
  in: z.lazy(() => IntegrationStatusSchema).array().optional(),
  notIn: z.lazy(() => IntegrationStatusSchema).array().optional(),
  not: z.union([ z.lazy(() => IntegrationStatusSchema),z.lazy(() => NestedEnumIntegrationStatusWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumIntegrationStatusFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumIntegrationStatusFilterSchema).optional()
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

export const NestedBoolFilterSchema: z.ZodType<Prisma.NestedBoolFilter> = z.object({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolFilterSchema) ]).optional(),
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

export const NestedBoolWithAggregatesFilterSchema: z.ZodType<Prisma.NestedBoolWithAggregatesFilter> = z.object({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedBoolFilterSchema).optional(),
  _max: z.lazy(() => NestedBoolFilterSchema).optional()
}).strict();

export const NestedFloatFilterSchema: z.ZodType<Prisma.NestedFloatFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatFilterSchema) ]).optional(),
}).strict();

export const NestedFloatWithAggregatesFilterSchema: z.ZodType<Prisma.NestedFloatWithAggregatesFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedFloatFilterSchema).optional(),
  _min: z.lazy(() => NestedFloatFilterSchema).optional(),
  _max: z.lazy(() => NestedFloatFilterSchema).optional()
}).strict();

export const IntegrationCreateWithoutUserInputSchema: z.ZodType<Prisma.IntegrationCreateWithoutUserInput> = z.object({
  id: z.string().optional(),
  type: z.lazy(() => IntegrationTypeSchema),
  status: z.lazy(() => IntegrationStatusSchema).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  gmail: z.lazy(() => GmailIntegrationCreateNestedOneWithoutIntegrationInputSchema).optional(),
  slack: z.lazy(() => SlackIntegrationCreateNestedOneWithoutIntegrationInputSchema).optional()
}).strict();

export const IntegrationUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.IntegrationUncheckedCreateWithoutUserInput> = z.object({
  id: z.string().optional(),
  type: z.lazy(() => IntegrationTypeSchema),
  status: z.lazy(() => IntegrationStatusSchema).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  gmail: z.lazy(() => GmailIntegrationUncheckedCreateNestedOneWithoutIntegrationInputSchema).optional(),
  slack: z.lazy(() => SlackIntegrationUncheckedCreateNestedOneWithoutIntegrationInputSchema).optional()
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
  type: z.union([ z.lazy(() => EnumIntegrationTypeFilterSchema),z.lazy(() => IntegrationTypeSchema) ]).optional(),
  status: z.union([ z.lazy(() => EnumIntegrationStatusFilterSchema),z.lazy(() => IntegrationStatusSchema) ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
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

export const GmailIntegrationCreateWithoutIntegrationInputSchema: z.ZodType<Prisma.GmailIntegrationCreateWithoutIntegrationInput> = z.object({
  id: z.string().optional(),
  email: z.string(),
  accessToken: z.string(),
  refreshToken: z.string().optional().nullable(),
  tokenExpiration: z.coerce.date(),
  recentHistoryId: z.string().optional().nullable(),
  emails: z.lazy(() => EmailCreateNestedManyWithoutGmailIntegrationInputSchema).optional()
}).strict();

export const GmailIntegrationUncheckedCreateWithoutIntegrationInputSchema: z.ZodType<Prisma.GmailIntegrationUncheckedCreateWithoutIntegrationInput> = z.object({
  id: z.string().optional(),
  email: z.string(),
  accessToken: z.string(),
  refreshToken: z.string().optional().nullable(),
  tokenExpiration: z.coerce.date(),
  recentHistoryId: z.string().optional().nullable(),
  emails: z.lazy(() => EmailUncheckedCreateNestedManyWithoutGmailIntegrationInputSchema).optional()
}).strict();

export const GmailIntegrationCreateOrConnectWithoutIntegrationInputSchema: z.ZodType<Prisma.GmailIntegrationCreateOrConnectWithoutIntegrationInput> = z.object({
  where: z.lazy(() => GmailIntegrationWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => GmailIntegrationCreateWithoutIntegrationInputSchema),z.lazy(() => GmailIntegrationUncheckedCreateWithoutIntegrationInputSchema) ]),
}).strict();

export const SlackIntegrationCreateWithoutIntegrationInputSchema: z.ZodType<Prisma.SlackIntegrationCreateWithoutIntegrationInput> = z.object({
  id: z.string().optional(),
  teamId: z.string(),
  accessToken: z.string(),
  slackUserId: z.string(),
  messages: z.lazy(() => MessageCreateNestedManyWithoutSlackIntegrationInputSchema).optional()
}).strict();

export const SlackIntegrationUncheckedCreateWithoutIntegrationInputSchema: z.ZodType<Prisma.SlackIntegrationUncheckedCreateWithoutIntegrationInput> = z.object({
  id: z.string().optional(),
  teamId: z.string(),
  accessToken: z.string(),
  slackUserId: z.string(),
  messages: z.lazy(() => MessageUncheckedCreateNestedManyWithoutSlackIntegrationInputSchema).optional()
}).strict();

export const SlackIntegrationCreateOrConnectWithoutIntegrationInputSchema: z.ZodType<Prisma.SlackIntegrationCreateOrConnectWithoutIntegrationInput> = z.object({
  where: z.lazy(() => SlackIntegrationWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => SlackIntegrationCreateWithoutIntegrationInputSchema),z.lazy(() => SlackIntegrationUncheckedCreateWithoutIntegrationInputSchema) ]),
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

export const GmailIntegrationUpsertWithoutIntegrationInputSchema: z.ZodType<Prisma.GmailIntegrationUpsertWithoutIntegrationInput> = z.object({
  update: z.union([ z.lazy(() => GmailIntegrationUpdateWithoutIntegrationInputSchema),z.lazy(() => GmailIntegrationUncheckedUpdateWithoutIntegrationInputSchema) ]),
  create: z.union([ z.lazy(() => GmailIntegrationCreateWithoutIntegrationInputSchema),z.lazy(() => GmailIntegrationUncheckedCreateWithoutIntegrationInputSchema) ]),
  where: z.lazy(() => GmailIntegrationWhereInputSchema).optional()
}).strict();

export const GmailIntegrationUpdateToOneWithWhereWithoutIntegrationInputSchema: z.ZodType<Prisma.GmailIntegrationUpdateToOneWithWhereWithoutIntegrationInput> = z.object({
  where: z.lazy(() => GmailIntegrationWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => GmailIntegrationUpdateWithoutIntegrationInputSchema),z.lazy(() => GmailIntegrationUncheckedUpdateWithoutIntegrationInputSchema) ]),
}).strict();

export const GmailIntegrationUpdateWithoutIntegrationInputSchema: z.ZodType<Prisma.GmailIntegrationUpdateWithoutIntegrationInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  accessToken: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  refreshToken: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  tokenExpiration: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  recentHistoryId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emails: z.lazy(() => EmailUpdateManyWithoutGmailIntegrationNestedInputSchema).optional()
}).strict();

export const GmailIntegrationUncheckedUpdateWithoutIntegrationInputSchema: z.ZodType<Prisma.GmailIntegrationUncheckedUpdateWithoutIntegrationInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  accessToken: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  refreshToken: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  tokenExpiration: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  recentHistoryId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emails: z.lazy(() => EmailUncheckedUpdateManyWithoutGmailIntegrationNestedInputSchema).optional()
}).strict();

export const SlackIntegrationUpsertWithoutIntegrationInputSchema: z.ZodType<Prisma.SlackIntegrationUpsertWithoutIntegrationInput> = z.object({
  update: z.union([ z.lazy(() => SlackIntegrationUpdateWithoutIntegrationInputSchema),z.lazy(() => SlackIntegrationUncheckedUpdateWithoutIntegrationInputSchema) ]),
  create: z.union([ z.lazy(() => SlackIntegrationCreateWithoutIntegrationInputSchema),z.lazy(() => SlackIntegrationUncheckedCreateWithoutIntegrationInputSchema) ]),
  where: z.lazy(() => SlackIntegrationWhereInputSchema).optional()
}).strict();

export const SlackIntegrationUpdateToOneWithWhereWithoutIntegrationInputSchema: z.ZodType<Prisma.SlackIntegrationUpdateToOneWithWhereWithoutIntegrationInput> = z.object({
  where: z.lazy(() => SlackIntegrationWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => SlackIntegrationUpdateWithoutIntegrationInputSchema),z.lazy(() => SlackIntegrationUncheckedUpdateWithoutIntegrationInputSchema) ]),
}).strict();

export const SlackIntegrationUpdateWithoutIntegrationInputSchema: z.ZodType<Prisma.SlackIntegrationUpdateWithoutIntegrationInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  teamId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  accessToken: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slackUserId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  messages: z.lazy(() => MessageUpdateManyWithoutSlackIntegrationNestedInputSchema).optional()
}).strict();

export const SlackIntegrationUncheckedUpdateWithoutIntegrationInputSchema: z.ZodType<Prisma.SlackIntegrationUncheckedUpdateWithoutIntegrationInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  teamId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  accessToken: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slackUserId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  messages: z.lazy(() => MessageUncheckedUpdateManyWithoutSlackIntegrationNestedInputSchema).optional()
}).strict();

export const IntegrationCreateWithoutGmailInputSchema: z.ZodType<Prisma.IntegrationCreateWithoutGmailInput> = z.object({
  id: z.string().optional(),
  type: z.lazy(() => IntegrationTypeSchema),
  status: z.lazy(() => IntegrationStatusSchema).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutIntegrationsInputSchema),
  slack: z.lazy(() => SlackIntegrationCreateNestedOneWithoutIntegrationInputSchema).optional()
}).strict();

export const IntegrationUncheckedCreateWithoutGmailInputSchema: z.ZodType<Prisma.IntegrationUncheckedCreateWithoutGmailInput> = z.object({
  id: z.string().optional(),
  userId: z.string(),
  type: z.lazy(() => IntegrationTypeSchema),
  status: z.lazy(() => IntegrationStatusSchema).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  slack: z.lazy(() => SlackIntegrationUncheckedCreateNestedOneWithoutIntegrationInputSchema).optional()
}).strict();

export const IntegrationCreateOrConnectWithoutGmailInputSchema: z.ZodType<Prisma.IntegrationCreateOrConnectWithoutGmailInput> = z.object({
  where: z.lazy(() => IntegrationWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => IntegrationCreateWithoutGmailInputSchema),z.lazy(() => IntegrationUncheckedCreateWithoutGmailInputSchema) ]),
}).strict();

export const EmailCreateWithoutGmailIntegrationInputSchema: z.ZodType<Prisma.EmailCreateWithoutGmailIntegrationInput> = z.object({
  id: z.string().optional(),
  messageId: z.string(),
  subject: z.string().optional().nullable(),
  from: z.string().optional().nullable(),
  date: z.coerce.date().optional().nullable(),
  body: z.string().optional().nullable(),
  receivedAt: z.coerce.date().optional(),
  processed: z.boolean().optional()
}).strict();

export const EmailUncheckedCreateWithoutGmailIntegrationInputSchema: z.ZodType<Prisma.EmailUncheckedCreateWithoutGmailIntegrationInput> = z.object({
  id: z.string().optional(),
  messageId: z.string(),
  subject: z.string().optional().nullable(),
  from: z.string().optional().nullable(),
  date: z.coerce.date().optional().nullable(),
  body: z.string().optional().nullable(),
  receivedAt: z.coerce.date().optional(),
  processed: z.boolean().optional()
}).strict();

export const EmailCreateOrConnectWithoutGmailIntegrationInputSchema: z.ZodType<Prisma.EmailCreateOrConnectWithoutGmailIntegrationInput> = z.object({
  where: z.lazy(() => EmailWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => EmailCreateWithoutGmailIntegrationInputSchema),z.lazy(() => EmailUncheckedCreateWithoutGmailIntegrationInputSchema) ]),
}).strict();

export const EmailCreateManyGmailIntegrationInputEnvelopeSchema: z.ZodType<Prisma.EmailCreateManyGmailIntegrationInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => EmailCreateManyGmailIntegrationInputSchema),z.lazy(() => EmailCreateManyGmailIntegrationInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const IntegrationUpsertWithoutGmailInputSchema: z.ZodType<Prisma.IntegrationUpsertWithoutGmailInput> = z.object({
  update: z.union([ z.lazy(() => IntegrationUpdateWithoutGmailInputSchema),z.lazy(() => IntegrationUncheckedUpdateWithoutGmailInputSchema) ]),
  create: z.union([ z.lazy(() => IntegrationCreateWithoutGmailInputSchema),z.lazy(() => IntegrationUncheckedCreateWithoutGmailInputSchema) ]),
  where: z.lazy(() => IntegrationWhereInputSchema).optional()
}).strict();

export const IntegrationUpdateToOneWithWhereWithoutGmailInputSchema: z.ZodType<Prisma.IntegrationUpdateToOneWithWhereWithoutGmailInput> = z.object({
  where: z.lazy(() => IntegrationWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => IntegrationUpdateWithoutGmailInputSchema),z.lazy(() => IntegrationUncheckedUpdateWithoutGmailInputSchema) ]),
}).strict();

export const IntegrationUpdateWithoutGmailInputSchema: z.ZodType<Prisma.IntegrationUpdateWithoutGmailInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => IntegrationTypeSchema),z.lazy(() => EnumIntegrationTypeFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => IntegrationStatusSchema),z.lazy(() => EnumIntegrationStatusFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutIntegrationsNestedInputSchema).optional(),
  slack: z.lazy(() => SlackIntegrationUpdateOneWithoutIntegrationNestedInputSchema).optional()
}).strict();

export const IntegrationUncheckedUpdateWithoutGmailInputSchema: z.ZodType<Prisma.IntegrationUncheckedUpdateWithoutGmailInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => IntegrationTypeSchema),z.lazy(() => EnumIntegrationTypeFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => IntegrationStatusSchema),z.lazy(() => EnumIntegrationStatusFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  slack: z.lazy(() => SlackIntegrationUncheckedUpdateOneWithoutIntegrationNestedInputSchema).optional()
}).strict();

export const EmailUpsertWithWhereUniqueWithoutGmailIntegrationInputSchema: z.ZodType<Prisma.EmailUpsertWithWhereUniqueWithoutGmailIntegrationInput> = z.object({
  where: z.lazy(() => EmailWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => EmailUpdateWithoutGmailIntegrationInputSchema),z.lazy(() => EmailUncheckedUpdateWithoutGmailIntegrationInputSchema) ]),
  create: z.union([ z.lazy(() => EmailCreateWithoutGmailIntegrationInputSchema),z.lazy(() => EmailUncheckedCreateWithoutGmailIntegrationInputSchema) ]),
}).strict();

export const EmailUpdateWithWhereUniqueWithoutGmailIntegrationInputSchema: z.ZodType<Prisma.EmailUpdateWithWhereUniqueWithoutGmailIntegrationInput> = z.object({
  where: z.lazy(() => EmailWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => EmailUpdateWithoutGmailIntegrationInputSchema),z.lazy(() => EmailUncheckedUpdateWithoutGmailIntegrationInputSchema) ]),
}).strict();

export const EmailUpdateManyWithWhereWithoutGmailIntegrationInputSchema: z.ZodType<Prisma.EmailUpdateManyWithWhereWithoutGmailIntegrationInput> = z.object({
  where: z.lazy(() => EmailScalarWhereInputSchema),
  data: z.union([ z.lazy(() => EmailUpdateManyMutationInputSchema),z.lazy(() => EmailUncheckedUpdateManyWithoutGmailIntegrationInputSchema) ]),
}).strict();

export const EmailScalarWhereInputSchema: z.ZodType<Prisma.EmailScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => EmailScalarWhereInputSchema),z.lazy(() => EmailScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => EmailScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => EmailScalarWhereInputSchema),z.lazy(() => EmailScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  messageId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  gmailIntegrationId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  subject: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  from: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  date: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  body: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  receivedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  processed: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
}).strict();

export const IntegrationCreateWithoutSlackInputSchema: z.ZodType<Prisma.IntegrationCreateWithoutSlackInput> = z.object({
  id: z.string().optional(),
  type: z.lazy(() => IntegrationTypeSchema),
  status: z.lazy(() => IntegrationStatusSchema).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutIntegrationsInputSchema),
  gmail: z.lazy(() => GmailIntegrationCreateNestedOneWithoutIntegrationInputSchema).optional()
}).strict();

export const IntegrationUncheckedCreateWithoutSlackInputSchema: z.ZodType<Prisma.IntegrationUncheckedCreateWithoutSlackInput> = z.object({
  id: z.string().optional(),
  userId: z.string(),
  type: z.lazy(() => IntegrationTypeSchema),
  status: z.lazy(() => IntegrationStatusSchema).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  gmail: z.lazy(() => GmailIntegrationUncheckedCreateNestedOneWithoutIntegrationInputSchema).optional()
}).strict();

export const IntegrationCreateOrConnectWithoutSlackInputSchema: z.ZodType<Prisma.IntegrationCreateOrConnectWithoutSlackInput> = z.object({
  where: z.lazy(() => IntegrationWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => IntegrationCreateWithoutSlackInputSchema),z.lazy(() => IntegrationUncheckedCreateWithoutSlackInputSchema) ]),
}).strict();

export const MessageCreateWithoutSlackIntegrationInputSchema: z.ZodType<Prisma.MessageCreateWithoutSlackIntegrationInput> = z.object({
  id: z.string().optional(),
  messageId: z.string(),
  senderId: z.string(),
  channelId: z.string(),
  text: z.string(),
  timestamp: z.string(),
  threadTs: z.string().optional().nullable(),
  receivedAt: z.coerce.date().optional(),
  processed: z.boolean().optional()
}).strict();

export const MessageUncheckedCreateWithoutSlackIntegrationInputSchema: z.ZodType<Prisma.MessageUncheckedCreateWithoutSlackIntegrationInput> = z.object({
  id: z.string().optional(),
  messageId: z.string(),
  senderId: z.string(),
  channelId: z.string(),
  text: z.string(),
  timestamp: z.string(),
  threadTs: z.string().optional().nullable(),
  receivedAt: z.coerce.date().optional(),
  processed: z.boolean().optional()
}).strict();

export const MessageCreateOrConnectWithoutSlackIntegrationInputSchema: z.ZodType<Prisma.MessageCreateOrConnectWithoutSlackIntegrationInput> = z.object({
  where: z.lazy(() => MessageWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => MessageCreateWithoutSlackIntegrationInputSchema),z.lazy(() => MessageUncheckedCreateWithoutSlackIntegrationInputSchema) ]),
}).strict();

export const MessageCreateManySlackIntegrationInputEnvelopeSchema: z.ZodType<Prisma.MessageCreateManySlackIntegrationInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => MessageCreateManySlackIntegrationInputSchema),z.lazy(() => MessageCreateManySlackIntegrationInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const IntegrationUpsertWithoutSlackInputSchema: z.ZodType<Prisma.IntegrationUpsertWithoutSlackInput> = z.object({
  update: z.union([ z.lazy(() => IntegrationUpdateWithoutSlackInputSchema),z.lazy(() => IntegrationUncheckedUpdateWithoutSlackInputSchema) ]),
  create: z.union([ z.lazy(() => IntegrationCreateWithoutSlackInputSchema),z.lazy(() => IntegrationUncheckedCreateWithoutSlackInputSchema) ]),
  where: z.lazy(() => IntegrationWhereInputSchema).optional()
}).strict();

export const IntegrationUpdateToOneWithWhereWithoutSlackInputSchema: z.ZodType<Prisma.IntegrationUpdateToOneWithWhereWithoutSlackInput> = z.object({
  where: z.lazy(() => IntegrationWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => IntegrationUpdateWithoutSlackInputSchema),z.lazy(() => IntegrationUncheckedUpdateWithoutSlackInputSchema) ]),
}).strict();

export const IntegrationUpdateWithoutSlackInputSchema: z.ZodType<Prisma.IntegrationUpdateWithoutSlackInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => IntegrationTypeSchema),z.lazy(() => EnumIntegrationTypeFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => IntegrationStatusSchema),z.lazy(() => EnumIntegrationStatusFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutIntegrationsNestedInputSchema).optional(),
  gmail: z.lazy(() => GmailIntegrationUpdateOneWithoutIntegrationNestedInputSchema).optional()
}).strict();

export const IntegrationUncheckedUpdateWithoutSlackInputSchema: z.ZodType<Prisma.IntegrationUncheckedUpdateWithoutSlackInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => IntegrationTypeSchema),z.lazy(() => EnumIntegrationTypeFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => IntegrationStatusSchema),z.lazy(() => EnumIntegrationStatusFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  gmail: z.lazy(() => GmailIntegrationUncheckedUpdateOneWithoutIntegrationNestedInputSchema).optional()
}).strict();

export const MessageUpsertWithWhereUniqueWithoutSlackIntegrationInputSchema: z.ZodType<Prisma.MessageUpsertWithWhereUniqueWithoutSlackIntegrationInput> = z.object({
  where: z.lazy(() => MessageWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => MessageUpdateWithoutSlackIntegrationInputSchema),z.lazy(() => MessageUncheckedUpdateWithoutSlackIntegrationInputSchema) ]),
  create: z.union([ z.lazy(() => MessageCreateWithoutSlackIntegrationInputSchema),z.lazy(() => MessageUncheckedCreateWithoutSlackIntegrationInputSchema) ]),
}).strict();

export const MessageUpdateWithWhereUniqueWithoutSlackIntegrationInputSchema: z.ZodType<Prisma.MessageUpdateWithWhereUniqueWithoutSlackIntegrationInput> = z.object({
  where: z.lazy(() => MessageWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => MessageUpdateWithoutSlackIntegrationInputSchema),z.lazy(() => MessageUncheckedUpdateWithoutSlackIntegrationInputSchema) ]),
}).strict();

export const MessageUpdateManyWithWhereWithoutSlackIntegrationInputSchema: z.ZodType<Prisma.MessageUpdateManyWithWhereWithoutSlackIntegrationInput> = z.object({
  where: z.lazy(() => MessageScalarWhereInputSchema),
  data: z.union([ z.lazy(() => MessageUpdateManyMutationInputSchema),z.lazy(() => MessageUncheckedUpdateManyWithoutSlackIntegrationInputSchema) ]),
}).strict();

export const MessageScalarWhereInputSchema: z.ZodType<Prisma.MessageScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => MessageScalarWhereInputSchema),z.lazy(() => MessageScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => MessageScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => MessageScalarWhereInputSchema),z.lazy(() => MessageScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  messageId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  slackIntegrationId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  senderId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  channelId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  text: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  timestamp: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  threadTs: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  receivedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  processed: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
}).strict();

export const GmailIntegrationCreateWithoutEmailsInputSchema: z.ZodType<Prisma.GmailIntegrationCreateWithoutEmailsInput> = z.object({
  id: z.string().optional(),
  email: z.string(),
  accessToken: z.string(),
  refreshToken: z.string().optional().nullable(),
  tokenExpiration: z.coerce.date(),
  recentHistoryId: z.string().optional().nullable(),
  integration: z.lazy(() => IntegrationCreateNestedOneWithoutGmailInputSchema)
}).strict();

export const GmailIntegrationUncheckedCreateWithoutEmailsInputSchema: z.ZodType<Prisma.GmailIntegrationUncheckedCreateWithoutEmailsInput> = z.object({
  id: z.string().optional(),
  integrationId: z.string(),
  email: z.string(),
  accessToken: z.string(),
  refreshToken: z.string().optional().nullable(),
  tokenExpiration: z.coerce.date(),
  recentHistoryId: z.string().optional().nullable()
}).strict();

export const GmailIntegrationCreateOrConnectWithoutEmailsInputSchema: z.ZodType<Prisma.GmailIntegrationCreateOrConnectWithoutEmailsInput> = z.object({
  where: z.lazy(() => GmailIntegrationWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => GmailIntegrationCreateWithoutEmailsInputSchema),z.lazy(() => GmailIntegrationUncheckedCreateWithoutEmailsInputSchema) ]),
}).strict();

export const GmailIntegrationUpsertWithoutEmailsInputSchema: z.ZodType<Prisma.GmailIntegrationUpsertWithoutEmailsInput> = z.object({
  update: z.union([ z.lazy(() => GmailIntegrationUpdateWithoutEmailsInputSchema),z.lazy(() => GmailIntegrationUncheckedUpdateWithoutEmailsInputSchema) ]),
  create: z.union([ z.lazy(() => GmailIntegrationCreateWithoutEmailsInputSchema),z.lazy(() => GmailIntegrationUncheckedCreateWithoutEmailsInputSchema) ]),
  where: z.lazy(() => GmailIntegrationWhereInputSchema).optional()
}).strict();

export const GmailIntegrationUpdateToOneWithWhereWithoutEmailsInputSchema: z.ZodType<Prisma.GmailIntegrationUpdateToOneWithWhereWithoutEmailsInput> = z.object({
  where: z.lazy(() => GmailIntegrationWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => GmailIntegrationUpdateWithoutEmailsInputSchema),z.lazy(() => GmailIntegrationUncheckedUpdateWithoutEmailsInputSchema) ]),
}).strict();

export const GmailIntegrationUpdateWithoutEmailsInputSchema: z.ZodType<Prisma.GmailIntegrationUpdateWithoutEmailsInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  accessToken: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  refreshToken: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  tokenExpiration: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  recentHistoryId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  integration: z.lazy(() => IntegrationUpdateOneRequiredWithoutGmailNestedInputSchema).optional()
}).strict();

export const GmailIntegrationUncheckedUpdateWithoutEmailsInputSchema: z.ZodType<Prisma.GmailIntegrationUncheckedUpdateWithoutEmailsInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  integrationId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  accessToken: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  refreshToken: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  tokenExpiration: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  recentHistoryId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const SlackIntegrationCreateWithoutMessagesInputSchema: z.ZodType<Prisma.SlackIntegrationCreateWithoutMessagesInput> = z.object({
  id: z.string().optional(),
  teamId: z.string(),
  accessToken: z.string(),
  slackUserId: z.string(),
  integration: z.lazy(() => IntegrationCreateNestedOneWithoutSlackInputSchema)
}).strict();

export const SlackIntegrationUncheckedCreateWithoutMessagesInputSchema: z.ZodType<Prisma.SlackIntegrationUncheckedCreateWithoutMessagesInput> = z.object({
  id: z.string().optional(),
  integrationId: z.string(),
  teamId: z.string(),
  accessToken: z.string(),
  slackUserId: z.string()
}).strict();

export const SlackIntegrationCreateOrConnectWithoutMessagesInputSchema: z.ZodType<Prisma.SlackIntegrationCreateOrConnectWithoutMessagesInput> = z.object({
  where: z.lazy(() => SlackIntegrationWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => SlackIntegrationCreateWithoutMessagesInputSchema),z.lazy(() => SlackIntegrationUncheckedCreateWithoutMessagesInputSchema) ]),
}).strict();

export const SlackIntegrationUpsertWithoutMessagesInputSchema: z.ZodType<Prisma.SlackIntegrationUpsertWithoutMessagesInput> = z.object({
  update: z.union([ z.lazy(() => SlackIntegrationUpdateWithoutMessagesInputSchema),z.lazy(() => SlackIntegrationUncheckedUpdateWithoutMessagesInputSchema) ]),
  create: z.union([ z.lazy(() => SlackIntegrationCreateWithoutMessagesInputSchema),z.lazy(() => SlackIntegrationUncheckedCreateWithoutMessagesInputSchema) ]),
  where: z.lazy(() => SlackIntegrationWhereInputSchema).optional()
}).strict();

export const SlackIntegrationUpdateToOneWithWhereWithoutMessagesInputSchema: z.ZodType<Prisma.SlackIntegrationUpdateToOneWithWhereWithoutMessagesInput> = z.object({
  where: z.lazy(() => SlackIntegrationWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => SlackIntegrationUpdateWithoutMessagesInputSchema),z.lazy(() => SlackIntegrationUncheckedUpdateWithoutMessagesInputSchema) ]),
}).strict();

export const SlackIntegrationUpdateWithoutMessagesInputSchema: z.ZodType<Prisma.SlackIntegrationUpdateWithoutMessagesInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  teamId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  accessToken: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slackUserId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  integration: z.lazy(() => IntegrationUpdateOneRequiredWithoutSlackNestedInputSchema).optional()
}).strict();

export const SlackIntegrationUncheckedUpdateWithoutMessagesInputSchema: z.ZodType<Prisma.SlackIntegrationUncheckedUpdateWithoutMessagesInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  integrationId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  teamId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  accessToken: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slackUserId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const TriggerCreateWithoutAutomationInputSchema: z.ZodType<Prisma.TriggerCreateWithoutAutomationInput> = z.object({
  id: z.string().optional(),
  type: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const TriggerUncheckedCreateWithoutAutomationInputSchema: z.ZodType<Prisma.TriggerUncheckedCreateWithoutAutomationInput> = z.object({
  id: z.string().optional(),
  type: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const TriggerCreateOrConnectWithoutAutomationInputSchema: z.ZodType<Prisma.TriggerCreateOrConnectWithoutAutomationInput> = z.object({
  where: z.lazy(() => TriggerWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => TriggerCreateWithoutAutomationInputSchema),z.lazy(() => TriggerUncheckedCreateWithoutAutomationInputSchema) ]),
}).strict();

export const ActionCreateWithoutAutomationInputSchema: z.ZodType<Prisma.ActionCreateWithoutAutomationInput> = z.object({
  id: z.string().optional(),
  type: z.string(),
  position: z.number(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const ActionUncheckedCreateWithoutAutomationInputSchema: z.ZodType<Prisma.ActionUncheckedCreateWithoutAutomationInput> = z.object({
  id: z.string().optional(),
  type: z.string(),
  position: z.number(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const ActionCreateOrConnectWithoutAutomationInputSchema: z.ZodType<Prisma.ActionCreateOrConnectWithoutAutomationInput> = z.object({
  where: z.lazy(() => ActionWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ActionCreateWithoutAutomationInputSchema),z.lazy(() => ActionUncheckedCreateWithoutAutomationInputSchema) ]),
}).strict();

export const ActionCreateManyAutomationInputEnvelopeSchema: z.ZodType<Prisma.ActionCreateManyAutomationInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => ActionCreateManyAutomationInputSchema),z.lazy(() => ActionCreateManyAutomationInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const TriggerUpsertWithoutAutomationInputSchema: z.ZodType<Prisma.TriggerUpsertWithoutAutomationInput> = z.object({
  update: z.union([ z.lazy(() => TriggerUpdateWithoutAutomationInputSchema),z.lazy(() => TriggerUncheckedUpdateWithoutAutomationInputSchema) ]),
  create: z.union([ z.lazy(() => TriggerCreateWithoutAutomationInputSchema),z.lazy(() => TriggerUncheckedCreateWithoutAutomationInputSchema) ]),
  where: z.lazy(() => TriggerWhereInputSchema).optional()
}).strict();

export const TriggerUpdateToOneWithWhereWithoutAutomationInputSchema: z.ZodType<Prisma.TriggerUpdateToOneWithWhereWithoutAutomationInput> = z.object({
  where: z.lazy(() => TriggerWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => TriggerUpdateWithoutAutomationInputSchema),z.lazy(() => TriggerUncheckedUpdateWithoutAutomationInputSchema) ]),
}).strict();

export const TriggerUpdateWithoutAutomationInputSchema: z.ZodType<Prisma.TriggerUpdateWithoutAutomationInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const TriggerUncheckedUpdateWithoutAutomationInputSchema: z.ZodType<Prisma.TriggerUncheckedUpdateWithoutAutomationInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ActionUpsertWithWhereUniqueWithoutAutomationInputSchema: z.ZodType<Prisma.ActionUpsertWithWhereUniqueWithoutAutomationInput> = z.object({
  where: z.lazy(() => ActionWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => ActionUpdateWithoutAutomationInputSchema),z.lazy(() => ActionUncheckedUpdateWithoutAutomationInputSchema) ]),
  create: z.union([ z.lazy(() => ActionCreateWithoutAutomationInputSchema),z.lazy(() => ActionUncheckedCreateWithoutAutomationInputSchema) ]),
}).strict();

export const ActionUpdateWithWhereUniqueWithoutAutomationInputSchema: z.ZodType<Prisma.ActionUpdateWithWhereUniqueWithoutAutomationInput> = z.object({
  where: z.lazy(() => ActionWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => ActionUpdateWithoutAutomationInputSchema),z.lazy(() => ActionUncheckedUpdateWithoutAutomationInputSchema) ]),
}).strict();

export const ActionUpdateManyWithWhereWithoutAutomationInputSchema: z.ZodType<Prisma.ActionUpdateManyWithWhereWithoutAutomationInput> = z.object({
  where: z.lazy(() => ActionScalarWhereInputSchema),
  data: z.union([ z.lazy(() => ActionUpdateManyMutationInputSchema),z.lazy(() => ActionUncheckedUpdateManyWithoutAutomationInputSchema) ]),
}).strict();

export const ActionScalarWhereInputSchema: z.ZodType<Prisma.ActionScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => ActionScalarWhereInputSchema),z.lazy(() => ActionScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ActionScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ActionScalarWhereInputSchema),z.lazy(() => ActionScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  automationId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  type: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  position: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const AutomationCreateWithoutTriggerInputSchema: z.ZodType<Prisma.AutomationCreateWithoutTriggerInput> = z.object({
  id: z.string().optional(),
  userId: z.string(),
  name: z.string(),
  lastRun: z.coerce.date().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  actions: z.lazy(() => ActionCreateNestedManyWithoutAutomationInputSchema).optional()
}).strict();

export const AutomationUncheckedCreateWithoutTriggerInputSchema: z.ZodType<Prisma.AutomationUncheckedCreateWithoutTriggerInput> = z.object({
  id: z.string().optional(),
  userId: z.string(),
  name: z.string(),
  lastRun: z.coerce.date().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  actions: z.lazy(() => ActionUncheckedCreateNestedManyWithoutAutomationInputSchema).optional()
}).strict();

export const AutomationCreateOrConnectWithoutTriggerInputSchema: z.ZodType<Prisma.AutomationCreateOrConnectWithoutTriggerInput> = z.object({
  where: z.lazy(() => AutomationWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => AutomationCreateWithoutTriggerInputSchema),z.lazy(() => AutomationUncheckedCreateWithoutTriggerInputSchema) ]),
}).strict();

export const AutomationUpsertWithoutTriggerInputSchema: z.ZodType<Prisma.AutomationUpsertWithoutTriggerInput> = z.object({
  update: z.union([ z.lazy(() => AutomationUpdateWithoutTriggerInputSchema),z.lazy(() => AutomationUncheckedUpdateWithoutTriggerInputSchema) ]),
  create: z.union([ z.lazy(() => AutomationCreateWithoutTriggerInputSchema),z.lazy(() => AutomationUncheckedCreateWithoutTriggerInputSchema) ]),
  where: z.lazy(() => AutomationWhereInputSchema).optional()
}).strict();

export const AutomationUpdateToOneWithWhereWithoutTriggerInputSchema: z.ZodType<Prisma.AutomationUpdateToOneWithWhereWithoutTriggerInput> = z.object({
  where: z.lazy(() => AutomationWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => AutomationUpdateWithoutTriggerInputSchema),z.lazy(() => AutomationUncheckedUpdateWithoutTriggerInputSchema) ]),
}).strict();

export const AutomationUpdateWithoutTriggerInputSchema: z.ZodType<Prisma.AutomationUpdateWithoutTriggerInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  lastRun: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  actions: z.lazy(() => ActionUpdateManyWithoutAutomationNestedInputSchema).optional()
}).strict();

export const AutomationUncheckedUpdateWithoutTriggerInputSchema: z.ZodType<Prisma.AutomationUncheckedUpdateWithoutTriggerInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  lastRun: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  actions: z.lazy(() => ActionUncheckedUpdateManyWithoutAutomationNestedInputSchema).optional()
}).strict();

export const AutomationCreateWithoutActionsInputSchema: z.ZodType<Prisma.AutomationCreateWithoutActionsInput> = z.object({
  id: z.string().optional(),
  userId: z.string(),
  name: z.string(),
  lastRun: z.coerce.date().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  trigger: z.lazy(() => TriggerCreateNestedOneWithoutAutomationInputSchema).optional()
}).strict();

export const AutomationUncheckedCreateWithoutActionsInputSchema: z.ZodType<Prisma.AutomationUncheckedCreateWithoutActionsInput> = z.object({
  id: z.string().optional(),
  userId: z.string(),
  name: z.string(),
  lastRun: z.coerce.date().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  trigger: z.lazy(() => TriggerUncheckedCreateNestedOneWithoutAutomationInputSchema).optional()
}).strict();

export const AutomationCreateOrConnectWithoutActionsInputSchema: z.ZodType<Prisma.AutomationCreateOrConnectWithoutActionsInput> = z.object({
  where: z.lazy(() => AutomationWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => AutomationCreateWithoutActionsInputSchema),z.lazy(() => AutomationUncheckedCreateWithoutActionsInputSchema) ]),
}).strict();

export const AutomationUpsertWithoutActionsInputSchema: z.ZodType<Prisma.AutomationUpsertWithoutActionsInput> = z.object({
  update: z.union([ z.lazy(() => AutomationUpdateWithoutActionsInputSchema),z.lazy(() => AutomationUncheckedUpdateWithoutActionsInputSchema) ]),
  create: z.union([ z.lazy(() => AutomationCreateWithoutActionsInputSchema),z.lazy(() => AutomationUncheckedCreateWithoutActionsInputSchema) ]),
  where: z.lazy(() => AutomationWhereInputSchema).optional()
}).strict();

export const AutomationUpdateToOneWithWhereWithoutActionsInputSchema: z.ZodType<Prisma.AutomationUpdateToOneWithWhereWithoutActionsInput> = z.object({
  where: z.lazy(() => AutomationWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => AutomationUpdateWithoutActionsInputSchema),z.lazy(() => AutomationUncheckedUpdateWithoutActionsInputSchema) ]),
}).strict();

export const AutomationUpdateWithoutActionsInputSchema: z.ZodType<Prisma.AutomationUpdateWithoutActionsInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  lastRun: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  trigger: z.lazy(() => TriggerUpdateOneWithoutAutomationNestedInputSchema).optional()
}).strict();

export const AutomationUncheckedUpdateWithoutActionsInputSchema: z.ZodType<Prisma.AutomationUncheckedUpdateWithoutActionsInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  lastRun: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  trigger: z.lazy(() => TriggerUncheckedUpdateOneWithoutAutomationNestedInputSchema).optional()
}).strict();

export const IntegrationCreateManyUserInputSchema: z.ZodType<Prisma.IntegrationCreateManyUserInput> = z.object({
  id: z.string().optional(),
  type: z.lazy(() => IntegrationTypeSchema),
  status: z.lazy(() => IntegrationStatusSchema).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const IntegrationUpdateWithoutUserInputSchema: z.ZodType<Prisma.IntegrationUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => IntegrationTypeSchema),z.lazy(() => EnumIntegrationTypeFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => IntegrationStatusSchema),z.lazy(() => EnumIntegrationStatusFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  gmail: z.lazy(() => GmailIntegrationUpdateOneWithoutIntegrationNestedInputSchema).optional(),
  slack: z.lazy(() => SlackIntegrationUpdateOneWithoutIntegrationNestedInputSchema).optional()
}).strict();

export const IntegrationUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.IntegrationUncheckedUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => IntegrationTypeSchema),z.lazy(() => EnumIntegrationTypeFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => IntegrationStatusSchema),z.lazy(() => EnumIntegrationStatusFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  gmail: z.lazy(() => GmailIntegrationUncheckedUpdateOneWithoutIntegrationNestedInputSchema).optional(),
  slack: z.lazy(() => SlackIntegrationUncheckedUpdateOneWithoutIntegrationNestedInputSchema).optional()
}).strict();

export const IntegrationUncheckedUpdateManyWithoutUserInputSchema: z.ZodType<Prisma.IntegrationUncheckedUpdateManyWithoutUserInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => IntegrationTypeSchema),z.lazy(() => EnumIntegrationTypeFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => IntegrationStatusSchema),z.lazy(() => EnumIntegrationStatusFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const EmailCreateManyGmailIntegrationInputSchema: z.ZodType<Prisma.EmailCreateManyGmailIntegrationInput> = z.object({
  id: z.string().optional(),
  messageId: z.string(),
  subject: z.string().optional().nullable(),
  from: z.string().optional().nullable(),
  date: z.coerce.date().optional().nullable(),
  body: z.string().optional().nullable(),
  receivedAt: z.coerce.date().optional(),
  processed: z.boolean().optional()
}).strict();

export const EmailUpdateWithoutGmailIntegrationInputSchema: z.ZodType<Prisma.EmailUpdateWithoutGmailIntegrationInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  messageId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  subject: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  from: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  date: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  body: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  receivedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  processed: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const EmailUncheckedUpdateWithoutGmailIntegrationInputSchema: z.ZodType<Prisma.EmailUncheckedUpdateWithoutGmailIntegrationInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  messageId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  subject: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  from: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  date: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  body: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  receivedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  processed: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const EmailUncheckedUpdateManyWithoutGmailIntegrationInputSchema: z.ZodType<Prisma.EmailUncheckedUpdateManyWithoutGmailIntegrationInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  messageId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  subject: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  from: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  date: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  body: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  receivedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  processed: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const MessageCreateManySlackIntegrationInputSchema: z.ZodType<Prisma.MessageCreateManySlackIntegrationInput> = z.object({
  id: z.string().optional(),
  messageId: z.string(),
  senderId: z.string(),
  channelId: z.string(),
  text: z.string(),
  timestamp: z.string(),
  threadTs: z.string().optional().nullable(),
  receivedAt: z.coerce.date().optional(),
  processed: z.boolean().optional()
}).strict();

export const MessageUpdateWithoutSlackIntegrationInputSchema: z.ZodType<Prisma.MessageUpdateWithoutSlackIntegrationInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  messageId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  senderId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  channelId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  text: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  timestamp: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  threadTs: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  receivedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  processed: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const MessageUncheckedUpdateWithoutSlackIntegrationInputSchema: z.ZodType<Prisma.MessageUncheckedUpdateWithoutSlackIntegrationInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  messageId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  senderId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  channelId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  text: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  timestamp: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  threadTs: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  receivedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  processed: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const MessageUncheckedUpdateManyWithoutSlackIntegrationInputSchema: z.ZodType<Prisma.MessageUncheckedUpdateManyWithoutSlackIntegrationInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  messageId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  senderId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  channelId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  text: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  timestamp: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  threadTs: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  receivedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  processed: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ActionCreateManyAutomationInputSchema: z.ZodType<Prisma.ActionCreateManyAutomationInput> = z.object({
  id: z.string().optional(),
  type: z.string(),
  position: z.number(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const ActionUpdateWithoutAutomationInputSchema: z.ZodType<Prisma.ActionUpdateWithoutAutomationInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  position: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ActionUncheckedUpdateWithoutAutomationInputSchema: z.ZodType<Prisma.ActionUncheckedUpdateWithoutAutomationInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  position: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ActionUncheckedUpdateManyWithoutAutomationInputSchema: z.ZodType<Prisma.ActionUncheckedUpdateManyWithoutAutomationInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  position: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
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

export const GmailIntegrationFindFirstArgsSchema: z.ZodType<Prisma.GmailIntegrationFindFirstArgs> = z.object({
  select: GmailIntegrationSelectSchema.optional(),
  include: GmailIntegrationIncludeSchema.optional(),
  where: GmailIntegrationWhereInputSchema.optional(),
  orderBy: z.union([ GmailIntegrationOrderByWithRelationInputSchema.array(),GmailIntegrationOrderByWithRelationInputSchema ]).optional(),
  cursor: GmailIntegrationWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ GmailIntegrationScalarFieldEnumSchema,GmailIntegrationScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const GmailIntegrationFindFirstOrThrowArgsSchema: z.ZodType<Prisma.GmailIntegrationFindFirstOrThrowArgs> = z.object({
  select: GmailIntegrationSelectSchema.optional(),
  include: GmailIntegrationIncludeSchema.optional(),
  where: GmailIntegrationWhereInputSchema.optional(),
  orderBy: z.union([ GmailIntegrationOrderByWithRelationInputSchema.array(),GmailIntegrationOrderByWithRelationInputSchema ]).optional(),
  cursor: GmailIntegrationWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ GmailIntegrationScalarFieldEnumSchema,GmailIntegrationScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const GmailIntegrationFindManyArgsSchema: z.ZodType<Prisma.GmailIntegrationFindManyArgs> = z.object({
  select: GmailIntegrationSelectSchema.optional(),
  include: GmailIntegrationIncludeSchema.optional(),
  where: GmailIntegrationWhereInputSchema.optional(),
  orderBy: z.union([ GmailIntegrationOrderByWithRelationInputSchema.array(),GmailIntegrationOrderByWithRelationInputSchema ]).optional(),
  cursor: GmailIntegrationWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ GmailIntegrationScalarFieldEnumSchema,GmailIntegrationScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const GmailIntegrationAggregateArgsSchema: z.ZodType<Prisma.GmailIntegrationAggregateArgs> = z.object({
  where: GmailIntegrationWhereInputSchema.optional(),
  orderBy: z.union([ GmailIntegrationOrderByWithRelationInputSchema.array(),GmailIntegrationOrderByWithRelationInputSchema ]).optional(),
  cursor: GmailIntegrationWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const GmailIntegrationGroupByArgsSchema: z.ZodType<Prisma.GmailIntegrationGroupByArgs> = z.object({
  where: GmailIntegrationWhereInputSchema.optional(),
  orderBy: z.union([ GmailIntegrationOrderByWithAggregationInputSchema.array(),GmailIntegrationOrderByWithAggregationInputSchema ]).optional(),
  by: GmailIntegrationScalarFieldEnumSchema.array(),
  having: GmailIntegrationScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const GmailIntegrationFindUniqueArgsSchema: z.ZodType<Prisma.GmailIntegrationFindUniqueArgs> = z.object({
  select: GmailIntegrationSelectSchema.optional(),
  include: GmailIntegrationIncludeSchema.optional(),
  where: GmailIntegrationWhereUniqueInputSchema,
}).strict() ;

export const GmailIntegrationFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.GmailIntegrationFindUniqueOrThrowArgs> = z.object({
  select: GmailIntegrationSelectSchema.optional(),
  include: GmailIntegrationIncludeSchema.optional(),
  where: GmailIntegrationWhereUniqueInputSchema,
}).strict() ;

export const SlackIntegrationFindFirstArgsSchema: z.ZodType<Prisma.SlackIntegrationFindFirstArgs> = z.object({
  select: SlackIntegrationSelectSchema.optional(),
  include: SlackIntegrationIncludeSchema.optional(),
  where: SlackIntegrationWhereInputSchema.optional(),
  orderBy: z.union([ SlackIntegrationOrderByWithRelationInputSchema.array(),SlackIntegrationOrderByWithRelationInputSchema ]).optional(),
  cursor: SlackIntegrationWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ SlackIntegrationScalarFieldEnumSchema,SlackIntegrationScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const SlackIntegrationFindFirstOrThrowArgsSchema: z.ZodType<Prisma.SlackIntegrationFindFirstOrThrowArgs> = z.object({
  select: SlackIntegrationSelectSchema.optional(),
  include: SlackIntegrationIncludeSchema.optional(),
  where: SlackIntegrationWhereInputSchema.optional(),
  orderBy: z.union([ SlackIntegrationOrderByWithRelationInputSchema.array(),SlackIntegrationOrderByWithRelationInputSchema ]).optional(),
  cursor: SlackIntegrationWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ SlackIntegrationScalarFieldEnumSchema,SlackIntegrationScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const SlackIntegrationFindManyArgsSchema: z.ZodType<Prisma.SlackIntegrationFindManyArgs> = z.object({
  select: SlackIntegrationSelectSchema.optional(),
  include: SlackIntegrationIncludeSchema.optional(),
  where: SlackIntegrationWhereInputSchema.optional(),
  orderBy: z.union([ SlackIntegrationOrderByWithRelationInputSchema.array(),SlackIntegrationOrderByWithRelationInputSchema ]).optional(),
  cursor: SlackIntegrationWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ SlackIntegrationScalarFieldEnumSchema,SlackIntegrationScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const SlackIntegrationAggregateArgsSchema: z.ZodType<Prisma.SlackIntegrationAggregateArgs> = z.object({
  where: SlackIntegrationWhereInputSchema.optional(),
  orderBy: z.union([ SlackIntegrationOrderByWithRelationInputSchema.array(),SlackIntegrationOrderByWithRelationInputSchema ]).optional(),
  cursor: SlackIntegrationWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const SlackIntegrationGroupByArgsSchema: z.ZodType<Prisma.SlackIntegrationGroupByArgs> = z.object({
  where: SlackIntegrationWhereInputSchema.optional(),
  orderBy: z.union([ SlackIntegrationOrderByWithAggregationInputSchema.array(),SlackIntegrationOrderByWithAggregationInputSchema ]).optional(),
  by: SlackIntegrationScalarFieldEnumSchema.array(),
  having: SlackIntegrationScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const SlackIntegrationFindUniqueArgsSchema: z.ZodType<Prisma.SlackIntegrationFindUniqueArgs> = z.object({
  select: SlackIntegrationSelectSchema.optional(),
  include: SlackIntegrationIncludeSchema.optional(),
  where: SlackIntegrationWhereUniqueInputSchema,
}).strict() ;

export const SlackIntegrationFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.SlackIntegrationFindUniqueOrThrowArgs> = z.object({
  select: SlackIntegrationSelectSchema.optional(),
  include: SlackIntegrationIncludeSchema.optional(),
  where: SlackIntegrationWhereUniqueInputSchema,
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

export const AutomationFindFirstArgsSchema: z.ZodType<Prisma.AutomationFindFirstArgs> = z.object({
  select: AutomationSelectSchema.optional(),
  include: AutomationIncludeSchema.optional(),
  where: AutomationWhereInputSchema.optional(),
  orderBy: z.union([ AutomationOrderByWithRelationInputSchema.array(),AutomationOrderByWithRelationInputSchema ]).optional(),
  cursor: AutomationWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ AutomationScalarFieldEnumSchema,AutomationScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const AutomationFindFirstOrThrowArgsSchema: z.ZodType<Prisma.AutomationFindFirstOrThrowArgs> = z.object({
  select: AutomationSelectSchema.optional(),
  include: AutomationIncludeSchema.optional(),
  where: AutomationWhereInputSchema.optional(),
  orderBy: z.union([ AutomationOrderByWithRelationInputSchema.array(),AutomationOrderByWithRelationInputSchema ]).optional(),
  cursor: AutomationWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ AutomationScalarFieldEnumSchema,AutomationScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const AutomationFindManyArgsSchema: z.ZodType<Prisma.AutomationFindManyArgs> = z.object({
  select: AutomationSelectSchema.optional(),
  include: AutomationIncludeSchema.optional(),
  where: AutomationWhereInputSchema.optional(),
  orderBy: z.union([ AutomationOrderByWithRelationInputSchema.array(),AutomationOrderByWithRelationInputSchema ]).optional(),
  cursor: AutomationWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ AutomationScalarFieldEnumSchema,AutomationScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const AutomationAggregateArgsSchema: z.ZodType<Prisma.AutomationAggregateArgs> = z.object({
  where: AutomationWhereInputSchema.optional(),
  orderBy: z.union([ AutomationOrderByWithRelationInputSchema.array(),AutomationOrderByWithRelationInputSchema ]).optional(),
  cursor: AutomationWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const AutomationGroupByArgsSchema: z.ZodType<Prisma.AutomationGroupByArgs> = z.object({
  where: AutomationWhereInputSchema.optional(),
  orderBy: z.union([ AutomationOrderByWithAggregationInputSchema.array(),AutomationOrderByWithAggregationInputSchema ]).optional(),
  by: AutomationScalarFieldEnumSchema.array(),
  having: AutomationScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const AutomationFindUniqueArgsSchema: z.ZodType<Prisma.AutomationFindUniqueArgs> = z.object({
  select: AutomationSelectSchema.optional(),
  include: AutomationIncludeSchema.optional(),
  where: AutomationWhereUniqueInputSchema,
}).strict() ;

export const AutomationFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.AutomationFindUniqueOrThrowArgs> = z.object({
  select: AutomationSelectSchema.optional(),
  include: AutomationIncludeSchema.optional(),
  where: AutomationWhereUniqueInputSchema,
}).strict() ;

export const TriggerFindFirstArgsSchema: z.ZodType<Prisma.TriggerFindFirstArgs> = z.object({
  select: TriggerSelectSchema.optional(),
  include: TriggerIncludeSchema.optional(),
  where: TriggerWhereInputSchema.optional(),
  orderBy: z.union([ TriggerOrderByWithRelationInputSchema.array(),TriggerOrderByWithRelationInputSchema ]).optional(),
  cursor: TriggerWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ TriggerScalarFieldEnumSchema,TriggerScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const TriggerFindFirstOrThrowArgsSchema: z.ZodType<Prisma.TriggerFindFirstOrThrowArgs> = z.object({
  select: TriggerSelectSchema.optional(),
  include: TriggerIncludeSchema.optional(),
  where: TriggerWhereInputSchema.optional(),
  orderBy: z.union([ TriggerOrderByWithRelationInputSchema.array(),TriggerOrderByWithRelationInputSchema ]).optional(),
  cursor: TriggerWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ TriggerScalarFieldEnumSchema,TriggerScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const TriggerFindManyArgsSchema: z.ZodType<Prisma.TriggerFindManyArgs> = z.object({
  select: TriggerSelectSchema.optional(),
  include: TriggerIncludeSchema.optional(),
  where: TriggerWhereInputSchema.optional(),
  orderBy: z.union([ TriggerOrderByWithRelationInputSchema.array(),TriggerOrderByWithRelationInputSchema ]).optional(),
  cursor: TriggerWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ TriggerScalarFieldEnumSchema,TriggerScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const TriggerAggregateArgsSchema: z.ZodType<Prisma.TriggerAggregateArgs> = z.object({
  where: TriggerWhereInputSchema.optional(),
  orderBy: z.union([ TriggerOrderByWithRelationInputSchema.array(),TriggerOrderByWithRelationInputSchema ]).optional(),
  cursor: TriggerWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const TriggerGroupByArgsSchema: z.ZodType<Prisma.TriggerGroupByArgs> = z.object({
  where: TriggerWhereInputSchema.optional(),
  orderBy: z.union([ TriggerOrderByWithAggregationInputSchema.array(),TriggerOrderByWithAggregationInputSchema ]).optional(),
  by: TriggerScalarFieldEnumSchema.array(),
  having: TriggerScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const TriggerFindUniqueArgsSchema: z.ZodType<Prisma.TriggerFindUniqueArgs> = z.object({
  select: TriggerSelectSchema.optional(),
  include: TriggerIncludeSchema.optional(),
  where: TriggerWhereUniqueInputSchema,
}).strict() ;

export const TriggerFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.TriggerFindUniqueOrThrowArgs> = z.object({
  select: TriggerSelectSchema.optional(),
  include: TriggerIncludeSchema.optional(),
  where: TriggerWhereUniqueInputSchema,
}).strict() ;

export const ActionFindFirstArgsSchema: z.ZodType<Prisma.ActionFindFirstArgs> = z.object({
  select: ActionSelectSchema.optional(),
  include: ActionIncludeSchema.optional(),
  where: ActionWhereInputSchema.optional(),
  orderBy: z.union([ ActionOrderByWithRelationInputSchema.array(),ActionOrderByWithRelationInputSchema ]).optional(),
  cursor: ActionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ActionScalarFieldEnumSchema,ActionScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const ActionFindFirstOrThrowArgsSchema: z.ZodType<Prisma.ActionFindFirstOrThrowArgs> = z.object({
  select: ActionSelectSchema.optional(),
  include: ActionIncludeSchema.optional(),
  where: ActionWhereInputSchema.optional(),
  orderBy: z.union([ ActionOrderByWithRelationInputSchema.array(),ActionOrderByWithRelationInputSchema ]).optional(),
  cursor: ActionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ActionScalarFieldEnumSchema,ActionScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const ActionFindManyArgsSchema: z.ZodType<Prisma.ActionFindManyArgs> = z.object({
  select: ActionSelectSchema.optional(),
  include: ActionIncludeSchema.optional(),
  where: ActionWhereInputSchema.optional(),
  orderBy: z.union([ ActionOrderByWithRelationInputSchema.array(),ActionOrderByWithRelationInputSchema ]).optional(),
  cursor: ActionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ActionScalarFieldEnumSchema,ActionScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const ActionAggregateArgsSchema: z.ZodType<Prisma.ActionAggregateArgs> = z.object({
  where: ActionWhereInputSchema.optional(),
  orderBy: z.union([ ActionOrderByWithRelationInputSchema.array(),ActionOrderByWithRelationInputSchema ]).optional(),
  cursor: ActionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const ActionGroupByArgsSchema: z.ZodType<Prisma.ActionGroupByArgs> = z.object({
  where: ActionWhereInputSchema.optional(),
  orderBy: z.union([ ActionOrderByWithAggregationInputSchema.array(),ActionOrderByWithAggregationInputSchema ]).optional(),
  by: ActionScalarFieldEnumSchema.array(),
  having: ActionScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const ActionFindUniqueArgsSchema: z.ZodType<Prisma.ActionFindUniqueArgs> = z.object({
  select: ActionSelectSchema.optional(),
  include: ActionIncludeSchema.optional(),
  where: ActionWhereUniqueInputSchema,
}).strict() ;

export const ActionFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.ActionFindUniqueOrThrowArgs> = z.object({
  select: ActionSelectSchema.optional(),
  include: ActionIncludeSchema.optional(),
  where: ActionWhereUniqueInputSchema,
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

export const GmailIntegrationCreateArgsSchema: z.ZodType<Prisma.GmailIntegrationCreateArgs> = z.object({
  select: GmailIntegrationSelectSchema.optional(),
  include: GmailIntegrationIncludeSchema.optional(),
  data: z.union([ GmailIntegrationCreateInputSchema,GmailIntegrationUncheckedCreateInputSchema ]),
}).strict() ;

export const GmailIntegrationUpsertArgsSchema: z.ZodType<Prisma.GmailIntegrationUpsertArgs> = z.object({
  select: GmailIntegrationSelectSchema.optional(),
  include: GmailIntegrationIncludeSchema.optional(),
  where: GmailIntegrationWhereUniqueInputSchema,
  create: z.union([ GmailIntegrationCreateInputSchema,GmailIntegrationUncheckedCreateInputSchema ]),
  update: z.union([ GmailIntegrationUpdateInputSchema,GmailIntegrationUncheckedUpdateInputSchema ]),
}).strict() ;

export const GmailIntegrationCreateManyArgsSchema: z.ZodType<Prisma.GmailIntegrationCreateManyArgs> = z.object({
  data: z.union([ GmailIntegrationCreateManyInputSchema,GmailIntegrationCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const GmailIntegrationCreateManyAndReturnArgsSchema: z.ZodType<Prisma.GmailIntegrationCreateManyAndReturnArgs> = z.object({
  data: z.union([ GmailIntegrationCreateManyInputSchema,GmailIntegrationCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const GmailIntegrationDeleteArgsSchema: z.ZodType<Prisma.GmailIntegrationDeleteArgs> = z.object({
  select: GmailIntegrationSelectSchema.optional(),
  include: GmailIntegrationIncludeSchema.optional(),
  where: GmailIntegrationWhereUniqueInputSchema,
}).strict() ;

export const GmailIntegrationUpdateArgsSchema: z.ZodType<Prisma.GmailIntegrationUpdateArgs> = z.object({
  select: GmailIntegrationSelectSchema.optional(),
  include: GmailIntegrationIncludeSchema.optional(),
  data: z.union([ GmailIntegrationUpdateInputSchema,GmailIntegrationUncheckedUpdateInputSchema ]),
  where: GmailIntegrationWhereUniqueInputSchema,
}).strict() ;

export const GmailIntegrationUpdateManyArgsSchema: z.ZodType<Prisma.GmailIntegrationUpdateManyArgs> = z.object({
  data: z.union([ GmailIntegrationUpdateManyMutationInputSchema,GmailIntegrationUncheckedUpdateManyInputSchema ]),
  where: GmailIntegrationWhereInputSchema.optional(),
}).strict() ;

export const GmailIntegrationDeleteManyArgsSchema: z.ZodType<Prisma.GmailIntegrationDeleteManyArgs> = z.object({
  where: GmailIntegrationWhereInputSchema.optional(),
}).strict() ;

export const SlackIntegrationCreateArgsSchema: z.ZodType<Prisma.SlackIntegrationCreateArgs> = z.object({
  select: SlackIntegrationSelectSchema.optional(),
  include: SlackIntegrationIncludeSchema.optional(),
  data: z.union([ SlackIntegrationCreateInputSchema,SlackIntegrationUncheckedCreateInputSchema ]),
}).strict() ;

export const SlackIntegrationUpsertArgsSchema: z.ZodType<Prisma.SlackIntegrationUpsertArgs> = z.object({
  select: SlackIntegrationSelectSchema.optional(),
  include: SlackIntegrationIncludeSchema.optional(),
  where: SlackIntegrationWhereUniqueInputSchema,
  create: z.union([ SlackIntegrationCreateInputSchema,SlackIntegrationUncheckedCreateInputSchema ]),
  update: z.union([ SlackIntegrationUpdateInputSchema,SlackIntegrationUncheckedUpdateInputSchema ]),
}).strict() ;

export const SlackIntegrationCreateManyArgsSchema: z.ZodType<Prisma.SlackIntegrationCreateManyArgs> = z.object({
  data: z.union([ SlackIntegrationCreateManyInputSchema,SlackIntegrationCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const SlackIntegrationCreateManyAndReturnArgsSchema: z.ZodType<Prisma.SlackIntegrationCreateManyAndReturnArgs> = z.object({
  data: z.union([ SlackIntegrationCreateManyInputSchema,SlackIntegrationCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const SlackIntegrationDeleteArgsSchema: z.ZodType<Prisma.SlackIntegrationDeleteArgs> = z.object({
  select: SlackIntegrationSelectSchema.optional(),
  include: SlackIntegrationIncludeSchema.optional(),
  where: SlackIntegrationWhereUniqueInputSchema,
}).strict() ;

export const SlackIntegrationUpdateArgsSchema: z.ZodType<Prisma.SlackIntegrationUpdateArgs> = z.object({
  select: SlackIntegrationSelectSchema.optional(),
  include: SlackIntegrationIncludeSchema.optional(),
  data: z.union([ SlackIntegrationUpdateInputSchema,SlackIntegrationUncheckedUpdateInputSchema ]),
  where: SlackIntegrationWhereUniqueInputSchema,
}).strict() ;

export const SlackIntegrationUpdateManyArgsSchema: z.ZodType<Prisma.SlackIntegrationUpdateManyArgs> = z.object({
  data: z.union([ SlackIntegrationUpdateManyMutationInputSchema,SlackIntegrationUncheckedUpdateManyInputSchema ]),
  where: SlackIntegrationWhereInputSchema.optional(),
}).strict() ;

export const SlackIntegrationDeleteManyArgsSchema: z.ZodType<Prisma.SlackIntegrationDeleteManyArgs> = z.object({
  where: SlackIntegrationWhereInputSchema.optional(),
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

export const AutomationCreateArgsSchema: z.ZodType<Prisma.AutomationCreateArgs> = z.object({
  select: AutomationSelectSchema.optional(),
  include: AutomationIncludeSchema.optional(),
  data: z.union([ AutomationCreateInputSchema,AutomationUncheckedCreateInputSchema ]),
}).strict() ;

export const AutomationUpsertArgsSchema: z.ZodType<Prisma.AutomationUpsertArgs> = z.object({
  select: AutomationSelectSchema.optional(),
  include: AutomationIncludeSchema.optional(),
  where: AutomationWhereUniqueInputSchema,
  create: z.union([ AutomationCreateInputSchema,AutomationUncheckedCreateInputSchema ]),
  update: z.union([ AutomationUpdateInputSchema,AutomationUncheckedUpdateInputSchema ]),
}).strict() ;

export const AutomationCreateManyArgsSchema: z.ZodType<Prisma.AutomationCreateManyArgs> = z.object({
  data: z.union([ AutomationCreateManyInputSchema,AutomationCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const AutomationCreateManyAndReturnArgsSchema: z.ZodType<Prisma.AutomationCreateManyAndReturnArgs> = z.object({
  data: z.union([ AutomationCreateManyInputSchema,AutomationCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const AutomationDeleteArgsSchema: z.ZodType<Prisma.AutomationDeleteArgs> = z.object({
  select: AutomationSelectSchema.optional(),
  include: AutomationIncludeSchema.optional(),
  where: AutomationWhereUniqueInputSchema,
}).strict() ;

export const AutomationUpdateArgsSchema: z.ZodType<Prisma.AutomationUpdateArgs> = z.object({
  select: AutomationSelectSchema.optional(),
  include: AutomationIncludeSchema.optional(),
  data: z.union([ AutomationUpdateInputSchema,AutomationUncheckedUpdateInputSchema ]),
  where: AutomationWhereUniqueInputSchema,
}).strict() ;

export const AutomationUpdateManyArgsSchema: z.ZodType<Prisma.AutomationUpdateManyArgs> = z.object({
  data: z.union([ AutomationUpdateManyMutationInputSchema,AutomationUncheckedUpdateManyInputSchema ]),
  where: AutomationWhereInputSchema.optional(),
}).strict() ;

export const AutomationDeleteManyArgsSchema: z.ZodType<Prisma.AutomationDeleteManyArgs> = z.object({
  where: AutomationWhereInputSchema.optional(),
}).strict() ;

export const TriggerCreateArgsSchema: z.ZodType<Prisma.TriggerCreateArgs> = z.object({
  select: TriggerSelectSchema.optional(),
  include: TriggerIncludeSchema.optional(),
  data: z.union([ TriggerCreateInputSchema,TriggerUncheckedCreateInputSchema ]),
}).strict() ;

export const TriggerUpsertArgsSchema: z.ZodType<Prisma.TriggerUpsertArgs> = z.object({
  select: TriggerSelectSchema.optional(),
  include: TriggerIncludeSchema.optional(),
  where: TriggerWhereUniqueInputSchema,
  create: z.union([ TriggerCreateInputSchema,TriggerUncheckedCreateInputSchema ]),
  update: z.union([ TriggerUpdateInputSchema,TriggerUncheckedUpdateInputSchema ]),
}).strict() ;

export const TriggerCreateManyArgsSchema: z.ZodType<Prisma.TriggerCreateManyArgs> = z.object({
  data: z.union([ TriggerCreateManyInputSchema,TriggerCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const TriggerCreateManyAndReturnArgsSchema: z.ZodType<Prisma.TriggerCreateManyAndReturnArgs> = z.object({
  data: z.union([ TriggerCreateManyInputSchema,TriggerCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const TriggerDeleteArgsSchema: z.ZodType<Prisma.TriggerDeleteArgs> = z.object({
  select: TriggerSelectSchema.optional(),
  include: TriggerIncludeSchema.optional(),
  where: TriggerWhereUniqueInputSchema,
}).strict() ;

export const TriggerUpdateArgsSchema: z.ZodType<Prisma.TriggerUpdateArgs> = z.object({
  select: TriggerSelectSchema.optional(),
  include: TriggerIncludeSchema.optional(),
  data: z.union([ TriggerUpdateInputSchema,TriggerUncheckedUpdateInputSchema ]),
  where: TriggerWhereUniqueInputSchema,
}).strict() ;

export const TriggerUpdateManyArgsSchema: z.ZodType<Prisma.TriggerUpdateManyArgs> = z.object({
  data: z.union([ TriggerUpdateManyMutationInputSchema,TriggerUncheckedUpdateManyInputSchema ]),
  where: TriggerWhereInputSchema.optional(),
}).strict() ;

export const TriggerDeleteManyArgsSchema: z.ZodType<Prisma.TriggerDeleteManyArgs> = z.object({
  where: TriggerWhereInputSchema.optional(),
}).strict() ;

export const ActionCreateArgsSchema: z.ZodType<Prisma.ActionCreateArgs> = z.object({
  select: ActionSelectSchema.optional(),
  include: ActionIncludeSchema.optional(),
  data: z.union([ ActionCreateInputSchema,ActionUncheckedCreateInputSchema ]),
}).strict() ;

export const ActionUpsertArgsSchema: z.ZodType<Prisma.ActionUpsertArgs> = z.object({
  select: ActionSelectSchema.optional(),
  include: ActionIncludeSchema.optional(),
  where: ActionWhereUniqueInputSchema,
  create: z.union([ ActionCreateInputSchema,ActionUncheckedCreateInputSchema ]),
  update: z.union([ ActionUpdateInputSchema,ActionUncheckedUpdateInputSchema ]),
}).strict() ;

export const ActionCreateManyArgsSchema: z.ZodType<Prisma.ActionCreateManyArgs> = z.object({
  data: z.union([ ActionCreateManyInputSchema,ActionCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const ActionCreateManyAndReturnArgsSchema: z.ZodType<Prisma.ActionCreateManyAndReturnArgs> = z.object({
  data: z.union([ ActionCreateManyInputSchema,ActionCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const ActionDeleteArgsSchema: z.ZodType<Prisma.ActionDeleteArgs> = z.object({
  select: ActionSelectSchema.optional(),
  include: ActionIncludeSchema.optional(),
  where: ActionWhereUniqueInputSchema,
}).strict() ;

export const ActionUpdateArgsSchema: z.ZodType<Prisma.ActionUpdateArgs> = z.object({
  select: ActionSelectSchema.optional(),
  include: ActionIncludeSchema.optional(),
  data: z.union([ ActionUpdateInputSchema,ActionUncheckedUpdateInputSchema ]),
  where: ActionWhereUniqueInputSchema,
}).strict() ;

export const ActionUpdateManyArgsSchema: z.ZodType<Prisma.ActionUpdateManyArgs> = z.object({
  data: z.union([ ActionUpdateManyMutationInputSchema,ActionUncheckedUpdateManyInputSchema ]),
  where: ActionWhereInputSchema.optional(),
}).strict() ;

export const ActionDeleteManyArgsSchema: z.ZodType<Prisma.ActionDeleteManyArgs> = z.object({
  where: ActionWhereInputSchema.optional(),
}).strict() ;