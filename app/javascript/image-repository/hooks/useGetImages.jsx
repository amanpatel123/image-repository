import {useState, useEffect} from 'react';
import { useImagesQuery } from '../data/queries';

const useGetImages = () => {
  const [images, setImages] = useState([]);

  const { data, loading: queryLoading, error, fetchMore } = useImagesQuery();
  
  useEffect(() => {
    if(!queryLoading) {
      let documents = []
      data.images.edges.forEach(edge => {
        documents.push({user: edge.node.user.fullName, label: edge.node.label, url: edge.node.url, id: edge.node.id});
      });

      setImages(documents);
    }
  }, [queryLoading]);

  return { data, images, queryLoading, error, fetchMore };
}

export { useGetImages };