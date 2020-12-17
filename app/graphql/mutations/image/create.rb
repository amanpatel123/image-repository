module Mutations
  module Image
    class Create < Mutations::BaseMutation
      argument :label, String, required: true
      argument :user_id, ID, required: true

      field :image, Types::ImageType, null: true
      field :errors, [String], null: false

      def resolve(label:, user_id: )
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
