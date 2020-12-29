import React, { useState } from 'react';
import { UploadImage, ImageGrid, Title, Modal } from '../../components/';
import { Button } from 'react-bootstrap';
import { useMyImagesQuery } from '../../data/queries';
import './myUploads';

const MyUploads = () => {
  const [selectedImg, setSelectedImg] = useState(null);

  const { data, loading: queryLoading, error, fetchMore } = useMyImagesQuery();

  if(error) return <div>There was some error on our end</div>
  if(queryLoading) return <div>Loading...</div>

  const handleClick = (e) => {
    e.preventDefault();
    const { endCursor } = data.myImages.pageInfo;
    console.log(endCursor);

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
        <ImageGrid edges={data.myImages.edges} setSelectedImg={setSelectedImg} />
        <Button variant="primary" onClick={handleClick} disabled={queryLoading || !data.myImages.pageInfo.hasNextPage}>
          Load More
        </Button>
      </div>
      {selectedImg && <Modal setSelectedImg={setSelectedImg} selectedImg={selectedImg} />}
    </>
 );
}

export { MyUploads };