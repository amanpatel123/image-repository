# frozen_string_literal: true

module Mutations
  module User
    class SignIn < Mutations::BaseMutation
      graphql_name "SignInUser"
      description "Mutation to Sign in User"

      argument :user_email, String, required: false
      argument :password, String, required: false

      field :user, Types::UserType, null: true
      field :token, String, null: true
      field :message, String, null: false

      def resolve(user_email:, password:)
        user = user_email.present? && ::User.find_by(email: user_email)
        return no_account_message unless user

        if user.valid_password?(password)
          token = Base64.encode64(user.email)
          context[:session][:token] = token
          {
            token: token,
            user: user,
            message: "logged in sucessfully"
          }
        else
          invalid_credentials_message
        end
      end

      private
        def invalid_credentials_message
          {
            user: nil,
            token: nil,
            message: "Invalid credentials" 
          }
        end

        def no_account_message
          {
            user: nil,
            token: nil,
            message: "Seems like you don't have an account with us" 
          }
        end
    end
  end
end
