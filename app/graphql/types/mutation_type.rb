module Types
  class MutationType < Types::BaseObject
    # TODO: remove me
    field :user_create, mutation: Mutations::User::Create, description: "Create a new user"
    field :image_create, mutation: Mutations::Image::Create, description: "Create a new Image"

  end
end
