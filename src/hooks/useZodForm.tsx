import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { generateZodSchema } from "../schema/zodSchema";
import { FormSchema } from "../schema/formSchema";

export const useZodForm = (formSchema: FormSchema) => {
  const schema = generateZodSchema(formSchema);
  return useForm({
    resolver: zodResolver(schema),
    defaultValues: Object.fromEntries(formSchema.fields.map(f => [f.name, ""])), // Set default empty values
  });
};
