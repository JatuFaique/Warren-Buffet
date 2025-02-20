export type FieldType = "text" | "number" | "select";

export interface FormField {
  id: string;
  name: string;
  label: string;
  type: FieldType;
  required?: boolean;
  min?: number;
  max?: number;
  minLength?: number;
  maxLength?: number;
  options?: { label: string; value: string }[]; // For select dropdowns
}

export interface FormSchema {
  fields: FormField[];
}

export interface FormOption {
    label: string;
    value: string;
  }
  