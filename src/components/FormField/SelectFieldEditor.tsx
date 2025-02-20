// src/components/FormField/SelectFieldEditor.tsx
import React from 'react';
import { TextField } from '@mui/material';
import { FormField } from '../../schema/formSchema';

interface SelectFieldEditorProps {
  field: FormField;
  onUpdate: (key: keyof FormField, value: any) => void;
}

export const SelectFieldEditor: React.FC<SelectFieldEditorProps> = ({ field, onUpdate }) => (
  <TextField
    label="Options (comma-separated)"
    fullWidth
    value={field.options?.map(opt => opt.label).join(', ') || ''}
    onChange={(e) => onUpdate('options', e.target.value.split(',').map(opt => ({
      label: opt.trim(),
      value: opt.trim()
    })))}
    className="mb-2"
  />
);