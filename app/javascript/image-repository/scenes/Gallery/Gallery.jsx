import React, { useState } from 'react';
import { ImageGrid, Title } from '../../components/';
import { Button } from 'react-bootstrap';
import { useImagesQuery } from '../../data/queries';
import './gallery';

const Gallery = () => {
  const { data, loading: queryLoading, error, fetchMore } = useImagesQuery();

  if(error) return <div>There was some error on our end</div>
  if(queryLoading) return <div>Loading...</div>

  const handleClick = (e) => {
    e.preventDefault();
    const { endCursor } = data.images.pageInfo;
    console.log(endCursor);

    fetchMore({
      variables: {
        after: endCursor
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
        <ImageGrid edges={data.images.edges} />
        <Button variant="primary" onClick={handleClick} disabled={queryLoading || !data.images.pageInfo.hasNextPage}>
          Load More
        </Button>
      </div>
    </>
 )
}

export { Gallery };