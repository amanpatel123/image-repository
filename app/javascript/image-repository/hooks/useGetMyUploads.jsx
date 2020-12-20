import {useState, useEffect} from 'react';
import { useMyImagesQuery } from '../data/queries';


const useGetMyUploads = () => {
  const [images, setImages] = useState([]);

  const { data: myImagesdata, loading: myQueryLoading, refetch} = useMyImagesQuery();

  useEffect(() => {
    if(!myQueryLoading){
      let documents = []
      myImagesdata.myImages.forEach(image => {
        documents.push({user: image.user.fullName, label: images.label, url: image.url, id: image.id});
      });

      setImages(documents);
    }
  }, [myQueryLoading]);

  return { images, refetch} ;
}

export { useGetMyUploads };