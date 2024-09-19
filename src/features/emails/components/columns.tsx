"use client";

import { timeAgo } from "@/utils/datetime";
import { type Email } from "@prisma/client";
import { type ColumnDef } from "@tanstack/react-table";
import { truncate, parseFrom } from "@/utils/string";

export const columns: ColumnDef<Email>[] = [
  {
    accessorKey: "from",
    cell: ({ row }) => {
      const from = row.getValue("from");
      const name = parseFrom(from as string)?.name;
      return <div className="font-medium">{name}</div>;
    },
  },
  {
    accessorKey: "subject",
    cell: ({ row }) => (
      <div className="font-medium">{row.getValue("subject")}</div>
    ),
  },
  {
    accessorKey: "body",
    cell: ({ row }) => {
      const body = row.getValue("body");
      return (
        <div className="text-sm text-gray-500">
          {truncate(body as string, 100)}...
        </div>
      );
    },
  },
  {
    accessorKey: "recievedAt",
    cell: ({ row }) => {
      const recievedAt = row.getValue("recievedAt");
      return <div className="text-sm">{timeAgo(recievedAt as string)}</div>;
    },
  },
];
