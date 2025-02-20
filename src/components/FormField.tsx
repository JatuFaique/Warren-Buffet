import React from "react";
import { UseFormRegister, FieldError } from "react-hook-form";
import { FormField as FormFieldType } from "../schema/formSchema";

interface FormFieldProps {
  field: FormFieldType;
  register: UseFormRegister<any>;
  error?: FieldError;
}

const FormField: React.FC<FormFieldProps> = ({ field, register, error }) => {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={field.name} className="font-medium">
        {field.label}
      </label>

      {field.type === "radio" && field.options ? (
        <div className="flex gap-4">
            {/* @ts-ignore */}
          {field.options.map((option) => (
            <label key={option.value} className="flex items-center gap-2">
              <input type="radio" {...register(field.name)} value={option.value} />
              {option.label}
            </label>
          ))}
        </div>
      ) : (
        <input
          id={field.name}
          {...register(field.name)}
          type={field.type}
          className="border px-2 py-1 rounded-md"
        />
      )}

      {error && <p className="text-red-500 text-sm">{error.message}</p>}
    </div>
  );
};

export default FormField;
