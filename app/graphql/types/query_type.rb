# frozen_string_literal: true

module Types
  class QueryType < Types::BaseObject

    field :current_user, Types::UserType, null: true, description: "returns the signed in user"
    field :users, [Types::UserType], null: false, description: "returns all the users"
    field :images, [Types::ImageType], null: false, description: "returns all the Images"
    field :my_images, [Types::ImageType], null: false, description: "returns all the images belonging to the current user"


    def current_user
      context[:current_user]
    end

    def users
      User.all
    end

    def user(user_id:)
      User.find_by(id: user_id)
    end 

    #TODO: Preloading is not the best option, should be replaced by batch loading
    def images
      Image.preload(:user)
    end

    def my_images
      if current_user.nil?
        raise GraphQL::ExecutionError,
          "You need to authenticate to perform this action"
      end
      
      context[:current_user].images
    end
  end
end
