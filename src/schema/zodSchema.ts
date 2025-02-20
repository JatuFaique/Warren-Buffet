import { z } from "zod";
import { FormSchema } from "./formSchema";

export const generateZodSchema = (formSchema: FormSchema) => {
  const schema: any = {};

  formSchema.fields.forEach((field) => {
    let fieldSchema;

    switch (field.type) {
      case "text":
        fieldSchema = z.string();
        if (field.required) fieldSchema = fieldSchema.min(1, `${field.label} is required`);
        if (field.minLength) fieldSchema = fieldSchema.min(field.minLength, `Min ${field.minLength} characters`);
        if (field.maxLength) fieldSchema = fieldSchema.max(field.maxLength, `Max ${field.maxLength} characters`);
        break;

      case "number":
        fieldSchema = z.number();
        if (field.required) fieldSchema = fieldSchema.refine(val => val !== undefined, { message: `${field.label} is required` });
// @ts-ignore
        if (field.min !== undefined) fieldSchema = fieldSchema.min(field.min, `Minimum value: ${field.min}`);
        if (field.max !== undefined) fieldSchema = fieldSchema.max(field.max, `Maximum value: ${field.max}`);
        break;

      case "select":
        if (field.options && field.options.length > 0) {
          const allowedValues = field.options.map(opt => opt.value);
          fieldSchema = z.enum(allowedValues as [string, ...string[]]);
        } else {
          fieldSchema = z.string();
        }
        if (field.required) fieldSchema = fieldSchema.refine(val => val !== "", { message: `${field.label} is required` });
        break;

      default:
        fieldSchema = z.string();
    }

    schema[field.name] = fieldSchema;
  });

  return z.object(schema);
};
