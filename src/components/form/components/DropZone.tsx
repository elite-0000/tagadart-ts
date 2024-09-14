import React from 'react'
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { useDropzone } from 'react-dropzone'

type Props = {
  valName: string
  label: string
  description?: string
  required?: boolean
  control: any
}

export function DropzoneInput({
  valName,
  label,
  description,
  required,
  control,
}: Props) {
  return (
    <FormField
      control={control}
      name={valName}
      render={({ field, fieldState }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <DropzoneComponent field={field} fieldState={fieldState} />
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

// Composant Dropzone personnalisé
function DropzoneComponent({
  field,
  fieldState,
}: {
  field: any
  fieldState: any
}) {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: (acceptedFiles) => {
      field.onChange(acceptedFiles) // Met à jour la valeur du champ via React Hook Form
    },
  })

  return (
    <div
      {...getRootProps()}
      className={`rounded-lg border border-dashed p-4 ${
        isDragActive ? 'border-blue-500' : 'border-gray-300'
      }`}
    >
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Drop the files here...</p>
      ) : (
        <p>Drag 'n' drop some files here, or click to select files</p>
      )}

      {/* Affichage des fichiers sélectionnés */}
      {field.value && field.value.length > 0 && (
        <ul className="mt-2">
          {field.value.map((file: File, index: number) => (
            <li key={index}>{file.name}</li>
          ))}
        </ul>
      )}
    </div>
  )
}
