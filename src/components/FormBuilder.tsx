// src/components/FormBuilder/FormBuilder.tsx
import React, { useState, useEffect } from 'react';
import { Button } from '@mui/material';
import { v4 as uuidv4 } from 'uuid';
import { useFormStorage } from '../hooks/useFormStorage'
import { FieldEditor } from '../components/FormField/FieldEditor'
import { FormField } from '@/schema/formSchema';

export const FormBuilder: React.FC = () => {
  const [fields, setFields] = useState<FormField[]>([]);
  const { getStoredFields, saveFields, addField } = useFormStorage();

  useEffect(() => {
    const savedFields = getStoredFields();
    setFields(savedFields);
  }, []);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      saveFields(fields);
    }, 500);
    return () => clearTimeout(timeoutId);
  }, [fields]);

  const handleAddField = async () => {
    const newField: FormField = {
      id: uuidv4(),
      name: `field_${fields.length + 1}`,
      label: 'New Field',
      type: 'text',
      required: false,
      options: [],
    //   @ts-ignore
      defaultValue: ''
    };

    try {
      const savedField = await addField(newField);
      setFields(prev => [...prev, savedField]);
    } catch (error) {
      console.error('Failed to add field:', error);
    }
  };

  const updateField = (id: string, key: keyof FormField, value: any) => {
    setFields(prev =>
      prev.map(field => (field.id === id ? { ...field, [key]: value } : field))
    );
  };

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h2 className="text-xl font-bold">Form Builder</h2>
      <Button variant="contained" color="primary" onClick={handleAddField}>
        Add Field
      </Button>

      <div className="mt-4 grid gap-4">
        {fields.map(field => (
          <FieldEditor
            key={field.id}
            field={field}
            onUpdate={updateField}
          />
        ))}
      </div>
    </div>
  );
};