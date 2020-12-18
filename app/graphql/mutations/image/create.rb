module Mutations
  module Image
    class Create < Mutations::BaseMutation
      argument :label, String, required: true
      argument :user_id, ID, required: true

      field :image, Types::ImageType, null: true
      field :errors, [String], null: false

      def resolve(label:, user_id: )
        if context[:current_user].nil?
          raise GraphQL::ExecutionError,
            "You need to authenticate to perform this action"
        end

        image = ::Image.new(label: label, user: ::User.find_by(id: user_id))

        if image.save
          {
            image: image,
            errors: []
          }
        else
          {
            image: nil,
            errors: image.errors.full_messages
          }
        end 
      end
    end
  end
end
