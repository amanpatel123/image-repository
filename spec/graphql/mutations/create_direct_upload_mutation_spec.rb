# frozen_string_literal: true

require 'rails_helper'

module Mutations
  RSpec.describe CreateDirectUpload, type: :request do
    describe 'resolver' do
      let(:file_path) { 'spec/fixtures/brown-white-dogs.jpg' }
      let(:file) { File.new(Rails.root.join(file_path)) }
      let(:file_name) { 'brown-white-dogs.jpg' }
      let(:content_type) { 'image/jpeg' }

      it 'returns file information required to prepare direct upload' do
        input = {
          "filename": file_name,
          "byteSize": File.size(file_path).to_i,
          "checksum": compute_checksum_in_chunks(file),
          "contentType": content_type
        }

        post '/graphql', params: { query: query, variables: variables(input: input) }
        json = JSON.parse(response.body)
        data = json['data']['createDirectUpload']['directUpload']

        expect(data.keys).to contain_exactly("blobId", "signedBlobId", "headers", "url")
        expect(data.keys).not_to include(nil)
      end
    end

    def query
      <<~GQL
        mutation($input:CreateDirectUploadInput!){
          createDirectUpload(input: $input){
            directUpload{
              blobId
              signedBlobId
              headers
              url
            }
          }
        }
      GQL
    end

    def variables(input:)
      {
        "input": {
          "input": input
        }
      }
    end

    # https://github.com/rails/rails/blob/main/activestorage/app/models/active_storage/blob.rb#L313
    def compute_checksum_in_chunks(io)
      Digest::MD5.new.tap do |checksum|
        while chunk = io.read(5.megabytes)
          checksum << chunk
        end

        io.rewind
      end.base64digest
    end
  end
end
