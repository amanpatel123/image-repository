# frozen_string_literal: true

require 'rails_helper'

module Mutations::Image
  RSpec.describe Create, type: :request do
    describe 'resolver' do
      let(:user) { create(:user) }
      
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
