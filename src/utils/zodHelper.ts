import { z } from "zod";

// Helper for common validations
export const textField = (minLength?: number, maxLength?: number) => {
  let schema = z.string();
  if (minLength) schema = schema.min(minLength, `Minimum ${minLength} characters`);
  if (maxLength) schema = schema.max(maxLength, `Maximum ${maxLength} characters`);
  return schema;
};

export const numberField = (min?: number, max?: number) => {
  let schema = z.number();
  if (min !== undefined) schema = schema.min(min, `Minimum value: ${min}`);
  if (max !== undefined) schema = schema.max(max, `Maximum value: ${max}`);
  return schema;
};
