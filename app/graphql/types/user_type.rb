# frozen_string_literal: true

module Types
  class UserType < Types::BaseObject
    graphql_name "User"

    field :id, ID, null: false
    field :email, String, null: true
    field :full_name, String, null: true
    field :images, [Types::ImageType], null: true
    field :liked, Boolean, null: false do
      argument :image_id, ID, required: true
    end
  end
end
