type GalleryItem = {
  id: number
  name: string
  title: {
    language: string
    text: string
  }[]
  images: {
    id: number
    src: string
    description: string
  }[]
  description: string
}
