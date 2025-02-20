import React from 'react';
import { TextField } from '@mui/material';
import { FormField } from '../../schema/formSchema'

interface NumberFieldEditorProps {
  field: FormField;
  onUpdate: (key: keyof FormField, value: any) => void;
}

export const NumberFieldEditor: React.FC<NumberFieldEditorProps> = ({ field, onUpdate }) => (
  <>
    <TextField
      label="Min Value"
      type="number"
      fullWidth
      value={field.min || ''}
      onChange={(e) => onUpdate('min', Number(e.target.value))}
      className="mb-2"
      style={{padding:'4px'}}
    />
    <TextField
      label="Max Value"
      type="number"
      fullWidth
      value={field.max || ''}
      onChange={(e) => onUpdate('max', Number(e.target.value))}
      className="mb-2"
      style={{padding:'4px'}}
    />
  </>
);