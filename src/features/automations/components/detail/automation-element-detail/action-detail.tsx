import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { type Action, type FieldWithInput } from "@/types/actions";
import React from "react";
import { type z } from "zod";

const isFieldWithInput = (
  value: unknown,
): value is z.infer<FieldWithInput<z.ZodTypeAny>> => {
  return typeof value === "object" && value !== null;
};

const renderField = (
  key: string,
  field: z.infer<FieldWithInput<z.ZodTypeAny>>,
) => (
  <div key={key} className="space-y-2">
    <Label htmlFor={key}>{field.input.label}</Label>
    {field.input.inputType === "textarea" ? (
      <Textarea
        id={key}
        placeholder={field.input.placeholder}
        value={field.value}
        readOnly
      />
    ) : field.input.inputType === "select" ? (
      <Select defaultValue={field.value} disabled>
        <SelectTrigger>
          <SelectValue>{field.value}</SelectValue>
        </SelectTrigger>
        <SelectContent>
          {field.input.options?.map((option) => (
            <SelectItem key={option} value={option}>
              {option}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    ) : (
      <Input
        id={key}
        type={field.input.inputType}
        placeholder={field.input.placeholder}
        value={field.value}
        readOnly
      />
    )}
  </div>
);

export const ActionDetail: React.FC<{ action: Action }> = ({ action }) => {
  const { actionData } = action;

  return (
    <div className="space-y-4">
      {Object.entries(actionData).map(([key, value]) => {
        if (key === "type") return null;
        if (isFieldWithInput(value)) {
          return renderField(key, value);
        }
        return null;
      })}
    </div>
  );
};
