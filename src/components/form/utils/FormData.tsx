export const formDataImg = async (values: any) => {
  console.log(values, 'values')

  const formData = new FormData()
  const newValues = {
    ...values,

    publishedAt:
      values.publishedDate && new Date(values.publishedDate) <= new Date()
        ? values.publishedDate
        : null,

    // cover: null,
    // avatar: null,
  }

  formData.append('data', JSON.stringify(newValues))

  console.log(values.cover, 'values.cover')

  if (values.cover && values.cover[0] instanceof File) {
    formData.append('files.cover', values.cover[0], values.cover[0].name)
  }
  if (values.avatar && values.avatar[0] instanceof File) {
    formData.append('files.avatar', values.avatar[0], values.avatar[0].name)
  }

  return formData
}
