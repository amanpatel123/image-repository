# frozen_string_literal: true

module Types
  class ImageType < Types::BaseObject
    graphql_name "Image"
    
    field :id, ID, null: false
    field :slug, String, null: true
    field :label, String, null: false
    field :user, Types::UserType, null: false
  end
end
