import { FileChecksum }  from "@rails/activestorage/src/file_checksum";

function calculateChecksum(file) {
  return new Promise((resolve, reject) => {
    FileChecksum.create(file, (error, checkSum) => {
      if (error){
        reject(error);
        return;
      }
      resolve(checkSum);
    });
  });
}

const getFileMetadata = (file) => {
  return new Promise((resolve) => {
    calculateChecksum(file).then((checkSum) => {
      resolve({
        checksum: checkSum,
        filename: file.name,
        contentType: file.type,
        byteSize: file.size.toString()
      });
    });
  });
};

export { getFileMetadata };