import React, { useState } from 'react';
import { UploadImage, ImageGrid, Title, Modal } from '../../components/';
import { Button } from 'react-bootstrap';
import { useMyImagesQuery } from '../../data/queries';
import './myUploads';

const MyUploads = () => {
  const [selectedImg, setSelectedImg] = useState(null);
  const [deletePayLoad, setDeletePayLoad] = useState({
    error: null,
    message: null
  });

  const { data, loading: queryLoading, error: gqlError, fetchMore } = useMyImagesQuery();

  if(gqlError) return <div>There was some error on our end</div>
  if(queryLoading) return <div>Loading...</div>

  const handleClick = (e) => {
    e.preventDefault();
    const { endCursor } = data.myImages.pageInfo;

    fetchMore({
      variables: {
        after: endCursor
      },
      updateQuery: (prevResult, { fetchMoreResult }) => {
        console.log(fetchMoreResult.myImages.edges);
        fetchMoreResult.myImages.edges = [
          ...prevResult.myImages.edges, ...fetchMoreResult.myImages.edges
        ]
        return fetchMoreResult;
      }
    })
  }

  return (
    <>
      
      <Title text="My Uploads"/>
      <div className="myUploads">
        <UploadImage />
        {deletePayLoad.error && <p>{deletePayLoad.error}</p>}
        {deletePayLoad.message && <p>{deletePayLoad.message}</p>}
        <ImageGrid edges={data.myImages.edges} setSelectedImg={setSelectedImg} setDeletePayLoad={setDeletePayLoad}/>
        <Button variant="primary" onClick={handleClick} disabled={queryLoading || !data.myImages.pageInfo.hasNextPage}>
          Load More
        </Button>
      </div>
      {selectedImg && <Modal setSelectedImg={setSelectedImg} selectedImg={selectedImg} />}
    </>
 );
}

export { MyUploads };