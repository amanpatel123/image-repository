# frozen_string_literal: true

require 'rails_helper'
require 'support/login_helper'

module Mutations::Image
  RSpec.describe Delete, type: :request do
    
    describe '#resolve' do
      context 'user is not logged in' do
        it 'return error if user not logged in (Authentication)' do
          image = create(:image)

          expect do
            post '/graphql', params: { query: query, variables: variables(image_id: image.id) }
          end.to change(Image, :count).by(0)
          json = JSON.parse(response.body)
          data = json['data']['deleteImage']

        expect(data).to include(
          'message'              => nil,
          'error'           => 'You need to authenticate to perform this action',
        )
        end
      end

      context 'user is logged in' do
        let(:logged_in_user) { create(:user, email: "logged_in_user@gmail.com") }
        let(:user_2) { create(:user, email: "not_logged_in_user@gmail.com") }

        before do
          allow_any_instance_of(ApplicationController).to receive(:current_user).and_return(logged_in_user)
        end

        it 'error when not authorized to delete' do
          image = create(:image, user: user_2)

          expect do
            post '/graphql', params: { query: query, variables: variables(image_id: image.id) }
          end.to change(Image, :count).by(0)
          json = JSON.parse(response.body)
          data = json['data']['deleteImage']

          expect(data).to include(
            'message'              => nil,
            'error'           => 'You are not authorized to delete this image',
          )
        end

        it 'errors out on unsuccefull deletion' do
          image = create(:image, user: logged_in_user)
          allow_any_instance_of(Image).to receive(:destroy).and_return(false)

          expect do
            post '/graphql', params: { query: query, variables: variables(image_id: image.id) }
          end.to change(Image, :count).by(0)
          json = JSON.parse(response.body)
          data = json['data']['deleteImage']

          expect(data).to include(
            'message'              => nil,
            'error'           => 'There was some issue deleting this image',
          )
        end 

        it 'succesfully deletes the image if authorized to do so' do
          image = create(:image, user: logged_in_user)

          expect do
            post '/graphql', params: { query: query, variables: variables(image_id: image.id) }
          end.to change(Image, :count).by(-1)
          json = JSON.parse(response.body)
          data = json['data']['deleteImage']

          expect(data).to include(
            'message'              => "Succesfully deleted the image",
            'error'           => nil,
          )
        end
      end
    end
    
    def query
      <<~GQL
        mutation($input: DeleteInput!) {
          deleteImage(input:$input){
            message
            error
          }
        }
      GQL
    end

    def variables(image_id:)
      {
        "input": {
          "imageId": image_id
        }
      }
    end
  end
end
