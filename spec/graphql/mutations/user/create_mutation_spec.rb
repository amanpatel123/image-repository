# frozen_string_literal: true

require 'rails_helper'

module Mutations::User
  RSpec.describe Create, type: :request do
    describe 'resolver' do
      it 'creates a new user' do
        expect do
          post '/graphql', params: { query: query, variables: variables }
        end.to change { ::User.count }.by(1)
      end

      it 'returns the newly created user on sucessfull creation' do
        post '/graphql', params: { query: query, variables: variables }
        json = JSON.parse(response.body)
        data = json['data']['userCreate']['user']

        expect(data).to include(
          'id'              => be_present,
          'email'           => 'testuser@gmail.com',
          'fullName'        => 'Test User',
        )
      end

      it 'return an Active record error if any' do
        variables = {
          "input": {
            "userAttributes": {
              "email": "testuser@gmail.com",
              "firstName": "test",
              "lastName": "user",
              "password": "small"
            }
          }
        }

        post '/graphql', params: { query: query, variables: variables }
        json = JSON.parse(response.body)
        user_data = json['data']['userCreate']['user']
        errors = json['data']['userCreate']['errors']

        expect(user_data).to be nil
        expect(errors.count).to be(1)
        expect(errors.first).to eq("Password is too short (minimum is 6 characters)")
      end
    end

    def query
      <<~GQL
        mutation createUser($input: CreateUserInput!){
          userCreate(input: $input){
            user {
              id
              email
              fullName
            }
            errors
          }
        }
      GQL
    end

    def variables
      {
        "input": {
          "userAttributes": {
            "email": "testuser@gmail.com",
            "firstName": "test",
            "lastName": "user",
            "password": "ShopifyIsLove"
          }
        }
      }
    end
  end
end
