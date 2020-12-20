# frozen_string_literal: true

module Mutations
  class CreateDirectUpload < Mutations::BaseMutation
    graphql_name "CreateDirectUpload"

    argument :input, Types::InputObjects::DirectUploadInput, required: true

    field :direct_upload, Types::DirectUploadType, null: false

    def resolve(input:)
      blob = ActiveStorage::Blob.create_before_direct_upload!(input.to_h)

      {
        direct_upload: {
          url: blob.service_url_for_direct_upload,
          # NOTE: we pass headers as JSON since they have no schema
          headers: blob.service_headers_for_direct_upload.to_json,
          blob_id: blob.id,
          signed_blob_id: blob.signed_id
        }
      }
    end
  end
end
