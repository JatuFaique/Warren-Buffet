import React from "react";
import { useZodForm } from "../hooks/useZodForm";
import { FormSchema } from "../schema/formSchema";
import FormField from './FormField';

// @ts-ignore
const formSchema: FormSchema = {
  fields: [
// @ts-ignore

    { name: "name", label: "Name", type: "text", required: true, minLength: 3, maxLength: 20 },
// @ts-ignore

    { name: "age", label: "Age", type: "number", min: 18, max: 60 },
// @ts-ignore

    { name: "gender", label: "Gender", type: "radio", required: true, options: [{ label: "Male", value: "male" }, { label: "Female", value: "female" }] }
  ]
};

const Form = () => {
  const { register, handleSubmit, formState: { errors } } = useZodForm(formSchema);

  const onSubmit = (data: any) => {
    console.log("Form Submitted:", data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      {formSchema.fields.map((field) => (
        // @ts-ignore
        <FormField key={field.name} field={field} register={register} error={errors[field.name]} />
      ))}
      <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">Submit</button>
    </form>
  );
};

export default Form;
