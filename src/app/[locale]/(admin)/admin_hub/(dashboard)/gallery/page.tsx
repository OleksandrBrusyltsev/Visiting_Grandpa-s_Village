import React from 'react';
import GalleryPage from '@/components/Admin/Pages/Gallery/Gallery';
import { getGallery } from '@/actions/getGallery';


export default async function Page() {
  const gallery = await getGallery();
  return (
    <div className='p-8'>
      <h1 className='text-3xl text-center mb-10'>Редагування сторінки СПОГАДИ</h1>
      {
        gallery.length
          ? <GalleryPage data={gallery} />
          : <h2 className='text-3xl text-center mt-[200px] text-red-600'>
            Хтось схавав дані для рендеру сторінки, але ви тримайтесь!
          </h2>
      }
    </div>
  )
}