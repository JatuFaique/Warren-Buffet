import React, { useEffect, useState } from "react";
import { TextField, MenuItem, Button } from "@mui/material";
import { FormField } from "../schema/formSchema";
import { EmptyState } from "./EmptyState";
import { PlusCircle, LayoutPanelTop } from 'lucide-react';
import { generateZodSchema } from "@/schema/zodSchema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const STORAGE_KEY = "formSchema";

const DynamicForm: React.FC = () => {
  const [fields, setFields] = useState<FormField[]>([]);
  
  useEffect(() => {
    const updateFields = () => {
      const savedSchema = localStorage.getItem(STORAGE_KEY);
      if (savedSchema) {
        const parsedFields = JSON.parse(savedSchema);
        setFields(parsedFields);
      }
    };

    updateFields();

    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === STORAGE_KEY) {
        updateFields();
      }
    };
    window.addEventListener("storage", handleStorageChange);

    const originalSetItem = localStorage.setItem;
    localStorage.setItem = function (key, value) {
      originalSetItem.call(this, key, value);
      if (key === STORAGE_KEY) {
        updateFields();
      }
    };

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      localStorage.setItem = originalSetItem;
    };
  }, []);

  // Generate Zod schema based on dynamic fields
  const schema = generateZodSchema({ fields });

  // useForm configuration with Zod resolver
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: any) => {
    console.log("Form Data:", data);
  };

  if (fields.length === 0) {
    return (
      <EmptyState
        icon={<LayoutPanelTop size={48} />}
        title="No form fields yet"
        message="Start building your form by adding some fields"
      />
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-4 max-w-3xl mx-auto">
      <h2 className="text-xl font-bold">Generated Form</h2>
      
      {fields.map((field) => (
        <div key={field.id} className="mb-4">
          {field.type === "select" ? (
            <TextField
              select
              label={field.label}
              fullWidth
              error={!!errors[field.name]}
              helperText={errors[field.name]?.message as string || ""}
              {...register(field.name)}
            >
              {field.options?.map((option) => (
                <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
              ))}
            </TextField>
          ) : (
            <TextField
              type={field.type}
              label={field.label}
              fullWidth
              error={!!errors[field.name]}
              helperText={errors[field.name]?.message as string || ""}
              {...register(field.name)}
              inputProps={{
                min: field.min,
                max: field.max
              }}
            />
          )}
        </div>
      ))}

      <Button type="submit" variant="contained" color="primary">Submit</Button>
    </form>
  );
};

export default DynamicForm;
