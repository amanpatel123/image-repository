import {useState, useEffect} from 'react';
import { useImagesQuery } from '../data/queries';

const useGetImages = () => {
  const [images, setImages] = useState([]);

  const { data, loading: queryLoading } = useImagesQuery();
  
  useEffect(() => {
    if(!queryLoading) {
      let documents = []
      data.images.forEach(image => {
        documents.push({user: image.user.fullName, label: images.label, url: image.url, id: image.id});
      });

      setImages(documents);
    }
  }, [queryLoading]);

  return images;
}

export { useGetImages };