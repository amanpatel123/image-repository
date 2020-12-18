# frozen_string_literal: true

require 'rails_helper'
module Types
  describe QueryType do
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

    describe "users" do

      let!(:user) { create(:user, email: "user@gmail.com") }
      let(:query) do
        <<~GRAPHQL
          query GetUser {
            user(userId: #{user.id}) {
              email
              fullName
              images {
                id
              }
            }
          }
        GRAPHQL
      end

      it 'returns the user with passed used id' do
        results = ImageRepositorySchema.execute(query)

        expect(results["data"]["user"]["email"]).to eq("user@gmail.com")
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
          query Images {
            images{
              label
              slug
              user {
                id
              }
            }
          }
        GRAPHQL
      end

      it 'returns all the images' do
        results = ImageRepositorySchema.execute(query)

        expect(results.dig("data", "images").size).to eq(3)
        expect(results.dig("data", "images").pluck("label")).to contain_exactly("image1", "image2", "image3") 
      end
    end
  end
end
