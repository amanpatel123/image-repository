import { BlobUpload } from "@rails/activestorage/src/blob_upload";

const directUpload = (url, headers, file) => {
  const upload = new BlobUpload({ file, directUploadData: { url, headers } });
  return new Promise((resolve, reject) => {
    upload.create(error => {
      if (error) {
        reject(error);
      } else {
        resolve();
      }
    })
  });
};

export { directUpload };