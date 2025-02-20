import { FormField } from "../schema/formSchema";

const STORAGE_KEY = 'formSchema';

export const useFormStorage = () => {
  const getStoredFields = (): FormField[] => {
    const savedSchema = localStorage.getItem(STORAGE_KEY);
    return savedSchema ? JSON.parse(savedSchema) : [];
  };

  const saveFields = (fields: FormField[]): void => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(fields));
  };

  const addField = async (field: FormField): Promise<FormField> => {
    return new Promise((resolve, reject) => {
      const delay = Math.floor(Math.random() * 2000) + 1000;
      setTimeout(() => {
        try {
          const savedFields = getStoredFields();
          savedFields.push(field);
          saveFields(savedFields);
          resolve(field);
        } catch (error) {
          reject(new Error('Failed to save field'));
        }
      }, delay);
    });
  };


  return {
    getStoredFields,
    saveFields,
    addField,
  };
};