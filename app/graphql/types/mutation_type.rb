module Types
  class MutationType < Types::BaseObject
    # TODO: remove me
    field :user_create, mutation: Mutations::User::Create, description: "Create new user"
  end
end
