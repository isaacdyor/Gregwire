"use client";

import { timeAgo } from "@/utils/datetime";
import { type Email } from "@prisma/client";
import { type ColumnDef } from "@tanstack/react-table";
import { truncate, parseFrom } from "@/utils/string";
import { Checkbox } from "@/components/ui/checkbox";

export const columns: ColumnDef<Email>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
  },
  {
    accessorKey: "from",
    header: () => null,
    cell: ({ row }) => {
      const from = row.getValue("from");
      const name = parseFrom(from as string)?.name;
      return <div className="font-medium">{name}</div>;
    },
  },
  {
    accessorKey: "subject",
    header: () => null,
    cell: ({ row }) => (
      <div className="font-medium">{row.getValue("subject")}</div>
    ),
  },
  {
    accessorKey: "body",
    header: () => null,
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
    accessorKey: "receivedAt",
    header: () => null,
    cell: ({ row }) => {
      const receivedAt = row.getValue("receivedAt");
      console.log(receivedAt);
      return <div className="text-sm">{timeAgo(receivedAt as string)}</div>;
    },
  },
];
