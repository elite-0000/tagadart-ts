'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { toast } from '@/hooks/use-toast'
import { TextInput } from './components/TextInput'
import DatePickerInput from './components/DatePicker'
import { postAxiosAPI } from '@/request/request'

//TODO: Get the form schema from the Strapi
/*
FormSchema
onSubmit
*/

const FormSchema = z.object({
  fullname: z.string().min(2, {
    message: 'Username must be at least 2 characters.',
  }),
  subject: z.string().min(2, {
    message: 'Username must be at least 2 characters.',
  }),
  emailTo: z.string().email({
    message: 'Email must be a valid email address.',
  }),
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

export function InputForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      fullname: '',
      emailTo: '',
      subject: '',
    },
  })

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      //Todo: Add image upload
      const formData = new FormData()
      formData.append('data', JSON.stringify(data))
      await postAxiosAPI('/email-contact', formData)

      //This work withou Multipart
      // postAxiosAPI('/email-contact', { data: data })

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
