import { env } from "@/env";
import { Logtail } from "@logtail/node";

export const logtail = new Logtail(env.NEXT_PUBLIC_LOGTAIL_TOKEN);
