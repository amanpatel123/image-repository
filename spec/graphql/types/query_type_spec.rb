# frozen_string_literal: true

require 'rails_helper'

module Types
  RSpec.describe QueryType, type: :request do
    describe "users" do
      let!(:user_1) { create(:user, email: "user1@gmail.com") }
      let!(:user_2) { create(:user, email: "user2@gmail.com") }

      let(:query) do
        <<~GRAPHQL
          query Users {
            users {
              email
              fullName
            }
          }
        GRAPHQL
      end

      it 'returns all the users' do
        results = ImageRepositorySchema.execute(query)

        expect(results.dig("data", "users").size).to eq(2)
        expect(results.dig("data", "users").pluck("email")).to contain_exactly("user1@gmail.com", "user2@gmail.com")
      end
    end
  
    describe "images" do
      let!(:user_1) { create(:user, email: "user1@gmail.com") }
      let!(:user_2) { create(:user, email: "user2@gmail.com") }

      let!(:image_1) { create(:image, label: "image1", user: user_1) }
      let!(:image_2) { create(:image, label: "image2", user: user_1) }
      let!(:image_3) { create(:image, label: "image3", user: user_2) }

      let(:query) do
        <<~GRAPHQL
          query Images($first: Int, $tags: String) {
            images(first: $first, tags: $tags){
              edges{
                node{
                  tags
                  totalLikes
                }
              }
            }
          }
        GRAPHQL
      end

      it 'returns all the images' do
        post '/graphql', params: { query: query }
        json = JSON.parse(response.body)
        data = json['data']['images']['edges']

        expect(data.count).to eq(3)
      end

      # it 'return only first 2 images' do
      #   post '/graphql', params: { query: query, variables: images_variables(first: 2) }
      #   json = JSON.parse(response.body)
      #   data = json['data']['images']['edges']

      #   expect(data.count).to eq(2)
      # end

      it 'filter images based on tags' do
        tag = create(:tag, name: "Coffee")
        image_1.tags << tag

        post '/graphql', params: { query: query, variables: images_variables(tag: tag.name)}
        json = JSON.parse(response.body)
        data = json['data']['images']['edges']

        expect(data.count).to eq(1)
      end
    end

    def images_variables(first: nil, tag: "")
      if first
        return {
          "first": first,
          "tags": tag
        }
      end

      {
        "tags": tag
      }
    end
  end
end
