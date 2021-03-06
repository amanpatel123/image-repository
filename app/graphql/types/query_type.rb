# frozen_string_literal: true

module Types
  class QueryType < Types::BaseObject

    field :current_user, Types::UserType, null: true, description: "returns the signed in user"
    field :users, [Types::UserType], null: false, description: "returns all the users"
    field :images, Types::ImageType.connection_type, null: false, description: "returns all the Images" do
      argument :tags, String, required: false
    end 
    field :my_images, Types::ImageType.connection_type, null: false, description: "returns all the images belonging to the current user"


    def current_user
      context[:current_user]
    end

    def users
      User.all
    end

    #TODO: Preloading is not the best option, should be replaced by batch loading
    def images(tags: "" )
      if tags.present?
        return Image.preload(:user).joins(:tags).where("tags.name LIKE ?", "%#{tags.strip.titleize}%")
      end

      Image.preload(:user).order(created_at: :DESC)
    end

    def my_images
      if current_user.nil?
        raise GraphQL::ExecutionError,
          "You need to authenticate to perform this action"
      end
      
      current_user.images.order(created_at: :DESC)
    end
  end
end
