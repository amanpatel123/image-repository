import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { ImageGrid, Title, Modal } from '../../components/';
import { Button } from 'react-bootstrap';
import { useImagesQuery } from '../../data/queries';
import './gallery';

const Gallery = ({ setRedirectToReferrer }) => {
  const useQuery = () => {
    return new URLSearchParams(useLocation().search);
  }
  let query = useQuery();

  const [selectedImg, setSelectedImg] = useState(null);
  
  useEffect(() => {
    setRedirectToReferrer(false);
  })

  const { data, loading: queryLoading, error, fetchMore } = useImagesQuery({
    variables: {
      tags: query.get("q")
    }
  });

  if(error) return <div>There was some error on our end</div>
  if(queryLoading) return <div>Loading...</div>

  const handleClick = (e) => {
    e.preventDefault();
    const { endCursor } = data.images.pageInfo;
    console.log(endCursor);

    fetchMore({
      variables: {
        after: endCursor,
        tags: query.get("q"),
      },
      updateQuery: (prevResult, { fetchMoreResult }) => {
        fetchMoreResult.images.edges = [
          ...prevResult.images.edges, ...fetchMoreResult.images.edges
        ]
        return fetchMoreResult;
      }
    })
  } 
  
  return (
    <>
      <Title text="All Images"/>
      <div className="gallery">  
        <ImageGrid edges={data.images.edges} setSelectedImg={setSelectedImg} />
        <Button variant="primary" onClick={handleClick} disabled={queryLoading || !data.images.pageInfo.hasNextPage}>
          Load More
        </Button>
      </div>
      {selectedImg && <Modal setSelectedImg={setSelectedImg} selectedImg={selectedImg} />}
    </>
 )
}

export { Gallery };