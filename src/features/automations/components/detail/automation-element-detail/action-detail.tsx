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
import React, { useState, useEffect } from "react";
import { type z } from "zod";

const isFieldWithInput = (
  value: unknown,
): value is z.infer<FieldWithInput<z.ZodTypeAny>> => {
  return typeof value === "object" && value !== null;
};

const renderField = (
  key: string,
  field: z.infer<FieldWithInput<z.ZodTypeAny>>,
  value: string,
  onChange: (value: string) => void,
) => (
  <div key={key} className="space-y-2">
    <Label htmlFor={key}>{field.input.label}</Label>
    {field.input.inputType === "textarea" ? (
      <Textarea
        id={key}
        placeholder={field.input.placeholder}
        value={value}
        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
          onChange(e.target.value)
        }
      />
    ) : field.input.inputType === "select" ? (
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger>
          <SelectValue>{value}</SelectValue>
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
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    )}
  </div>
);

export const ActionDetail: React.FC<{ action: Action }> = ({ action }) => {
  const { actionData } = action;
  const [fieldValues, setFieldValues] = useState<Record<string, string>>({});

  useEffect(() => {
    const initialValues: Record<string, string> = {};
    Object.entries(actionData).forEach(([key, value]) => {
      if (isFieldWithInput(value)) {
        initialValues[key] = value.value.toString();
      }
    });
    setFieldValues(initialValues);
  }, [actionData]);

  const handleFieldChange = (key: string, value: string) => {
    setFieldValues((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="flex flex-col gap-4">
      {Object.entries(actionData).map(([key, value]) => {
        if (key === "type") return null;
        if (isFieldWithInput(value)) {
          return renderField(key, value, fieldValues[key] ?? "", (newValue) =>
            handleFieldChange(key, newValue),
          );
        }
        return null;
      })}
    </div>
  );
};
