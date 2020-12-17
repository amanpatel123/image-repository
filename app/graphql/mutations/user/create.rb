# frozen_string_literal: true

module Mutations::User
  class Create < Mutations::BaseMutation
    graphql_name "CreateUser"
    description "Create a new user"

    argument :user_attributes, Types::InputObjects::UserAttributes, required: true

    field :user, Types::UserType, null: true
    field :errors, [String], null: false


    def resolve(user_attributes:)
      create_attrs = approved_params(user_attributes)
      user = User.new(create_attrs)
      
      if user.save 
        {
          user: user,
          errors: []
        }
      else
        {
          user: nil,
          errors: user.errors.full_messages
        }
      end 
    end

    private
      def approved_params(user_attributes)
        require_params(user_attributes.to_h, :email, :first_name, :last_name, :password)
      end
  end
end
