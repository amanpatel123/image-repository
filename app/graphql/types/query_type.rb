# frozen_string_literal: true

module Types
  class QueryType < Types::BaseObject
    
    field :users, [Types::UserType], null: false, description: "returns all the users"
    field :images, [Types::ImageType], null: false, description: "returns all the Images"
    
    def users
      User.all
    end

    def images
      Image.all
    end
  end
end
