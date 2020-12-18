# frozen_string_literal: true

module Types
  class QueryType < Types::BaseObject

    field :current_user, Types::UserType, null: true, description: "returns the signed in user"
    field :users, [Types::UserType], null: false, description: "returns all the users"
    field :images, [Types::ImageType], null: false, description: "returns all the Images"

    def current_user
      context[:current_user]
    end

    def users
      User.all
    end

    #TODO: Preloading is not the best option, should be replaced by batch loading
    def images
      Image.preload(:user)
    end
  end
end
