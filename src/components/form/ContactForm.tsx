'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'

import { toast } from '@/hooks/use-toast'
import { TextInput } from './components/TextInput'

import { postAxiosAPI } from '@/request/request'
import { DropzoneInput } from './components/DropZone'

const FormSchema = z.object({
  fullname: z.string().min(2, {
    message: 'Fullname must be at least 2 characters.',
  }),
  subject: z.string().min(2, {
    message: 'Subject must be at least 2 characters.',
  }),
  emailTo: z.string().email({
    message: 'Email must be a valid email address.',
  }),
  media: z.array(z.unknown()).optional(),
  //   bla: z.date(),

  //   bla: z
  //     .union([
  //       z.string().length(0, {
  //         message: 'Bla must be at least 4 characters.',
  //       }),
  //       z.string().min(4),
  //     ])
  //     .optional()
  //     .transform((e) => (e === '' ? undefined : e)),
})

const formDataContact = async (values: z.infer<typeof FormSchema>) => {
  const formData = new FormData()
  const newValues = {
    ...values,
    media: null,
  }

  formData.append('data', JSON.stringify(newValues))

  // if (values.media && values.media[0] instanceof File) {
  //   formData.append('files.media', values.media[0], values.media[0].name)
  // }

  if (values.media && values.media.length > 0) {
    values.media.map((file: any) => {
      formData.append('files.media', file, file.name)
    })
  }

  return formData
}

export function ContactForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      fullname: '',
      emailTo: '',
      subject: '',
      media: [],
    },
  })

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      // const formData = await formDataContact(data)
      // await postAxiosAPI('/email-contact', formData)

      //This work without FormData
      await postAxiosAPI('/email-contact', { data: data })

      toast({
        title: 'You submitted the following values:',
        description: (
          <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
            <code className="text-white">{JSON.stringify(data, null, 2)}</code>
          </pre>
        ),
      })
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
        <TextInput
          valName="subject"
          label="Subject"
          // description="This is your public display name."
          control={form.control}
        />
        <TextInput
          valName="fullname"
          label="Fullname"
          placeholder="Paul le Meilleur"
          // description="This is your public display name."
          control={form.control}
        />
        <TextInput
          valName="emailTo"
          label="Email"
          placeholder="aurel@webjedi.ch"
          //   description="This is your public display name."
          control={form.control}
        />
        <DropzoneInput
          valName="media"
          label="Upload Files"
          description="Drag and drop files here or click to select files"
          control={form.control}
        />
        {/* <DatePickerInput
          valName="bla"
          label="Username"
          placeholder="shadcn"
          description="This is your public display name."
          control={form.control}
          type="single"
        /> */}
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}
