# frozen_string_literal: true

require 'rails_helper'

module Mutations
  module Image
    RSpec.describe Create, type: :request do
      describe 'resolver' do
        let(:user) { create(:user) }

        it 'creates a new Image' do
          expect do
            post '/graphql', params: { query: query, variables: variables(user_id: user.id) }
          end.to change { ::Image.count }.by(1)
        end

        it 'returns the newly created image on sucessfull creation' do
          post '/graphql', params: { query: query, variables: variables(user_id: user.id) }
          json = JSON.parse(response.body)
          data = json['data']['imageCreate']['image']

          expect(data).to include(
            'id'              => be_present,
            'label'           => 'A car Pic'
          )
          expect(data["user"]["id"]).to eq(user.id.to_s) 
        end
      end

      def query
        <<~GQL
          mutation imageCreate($input: CreateInput!){
            imageCreate(input: $input) {
              image {
                id
                label
                user {
                  id
                }
              }
              errors
            }
          }
        GQL
      end

      def variables(user_id:)
        {
          "input": {
            "label": "A car Pic",
            "userId": user_id
          }
        }
      end
    end
  end
end
