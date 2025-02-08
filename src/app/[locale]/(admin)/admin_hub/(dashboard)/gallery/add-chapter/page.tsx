import React from 'react';
import AddGalleryChapter from '@/components/Admin/Gallery/AddGalleryChapter/AddGalleryChapter';

export default async function Page() {
  return (
    <div className="bg-[url('/images/admin/footer_trees.png')] relative bg-cover bg-no-repeat bg-fixed bg-blend-overlay p-8">
      <h1 className='text-3xl text-center mb-10'>Сторінка додавання нового розділу Галереї</h1>
      <AddGalleryChapter />
    </div>
  )
}