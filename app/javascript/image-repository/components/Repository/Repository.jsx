import React from 'react'
import { useImagesQuery } from '../../data/queries';


const Repository = ({ useQuery }) => {
  const { data, loading: queryLoading } = useQuery();

  return (
    <div>
        {queryLoading
          ? 'loading...'
          : data.images.map(({ id, label, user }) => (
              <div key={id}>
                <b>{label}</b> {user ? `added by ${user.fullName}` : null}
              </div>
            ))}
      </div>
  )
}

export { Repository };