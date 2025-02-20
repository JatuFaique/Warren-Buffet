import React from 'react';
import { Card, CardContent, TextField, MenuItem, FormControlLabel, Switch } from '@mui/material';
import { FormField } from '../../schema/formSchema'
import { NumberFieldEditor } from './NumberFieldEditor';
import { SelectFieldEditor } from './SelectFieldEditor';

interface FieldEditorProps {
  field: FormField;
  onUpdate: (id: string, key: keyof FormField, value: any) => void;
}

export const FieldEditor: React.FC<FieldEditorProps> = ({ field, onUpdate }) => {
  const handleUpdate = (key: keyof FormField, value: any) => {
    onUpdate(field.id, key, value);
  };

  return (
    <Card className="p-4">
      <CardContent >
        <TextField
         style={{padding:'4px'}}
          label="Field Label"
          fullWidth
          value={field.label}
          onChange={(e) => handleUpdate('label', e.target.value)}
          className="pb-2"
          
        />
        <TextField
        style={{padding:'4px'}}
          select
          label="Field Type"
          fullWidth
          value={field.type}
          onChange={(e) => handleUpdate('type', e.target.value)}
          className="mb-2"
        >
          <MenuItem value="text">Text</MenuItem>
          <MenuItem value="number">Number</MenuItem>
          <MenuItem value="select">Select</MenuItem>
        </TextField>
        <TextField
        style={{padding:'4px'}}
          label="Default Value"
          fullWidth
        //   @ts-ignore
          value={field.defaultValue}
        //   @ts-ignore
          onChange={(e) => handleUpdate('defaultValue', e.target.value)}
          className="p-2"
        />
        {field.type === 'number' && (
          <NumberFieldEditor  field={field} onUpdate={handleUpdate} />
        )}
        {field.type === 'select' && (
          <SelectFieldEditor  field={field} onUpdate={handleUpdate} />
        )}
        <FormControlLabel
            className='p-2'
          control={
            <Switch
              checked={field.required}
              onChange={(e) => handleUpdate('required', e.target.checked)}
            />
          }
          label="Required"
        />
      </CardContent>
    </Card>
  );
};