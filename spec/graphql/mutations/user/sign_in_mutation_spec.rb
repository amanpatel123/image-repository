# frozen_string_literal: true

require 'rails_helper'

module Mutations
  module User
    RSpec.describe SignIn, type: :request do
      describe 'resolver' do
        let(:user) { create(:user, password: "password") }

        it 'Sign in a user' do
          post '/graphql', params: { query: query, variables: variables(user) }

          expect(controller.current_user).to eq(user)
        end

        context 'failure' do
          it 'no account with the given email' do 
            variables =  {
              "input": {
                "userEmail": "Notonsystem@gmail.com",
                "password": "Letsgetit"
              }
            }

            post '/graphql', params: { query: query, variables: variables }
            json = JSON.parse(response.body)
            data = json['data']['userSignIn']

            expect(data).to include(
              'message' => "Seems like you don't have an account with us",
              'token' => nil,
              'user' => nil
            )
          end

          it 'invalid credentials' do 
            variables = {
              "input": {
                "userEmail": user.email,
                "password": "Letsgetit"
              }
            }

            post '/graphql', params: { query: query, variables: variables }
            json = JSON.parse(response.body)
            data = json['data']['userSignIn']

            expect(data).to include(
              'message' => "Invalid credentials",
              'token' => nil,
              'user' => nil
            )
          end
        end
      end

      def query
        <<~GQL
          mutation signInUser($input: SignInUserInput!){
            userSignIn(input: $input){
              user{
                fullName
              }
              message
              token
            }
          }
        GQL
      end

      def variables(user)
        {
          "input": {
            "userEmail": user.email,
            "password": user.password
          }
        }
      end
    end
  end
end
