module Mutations
  module Image
    class UpdateLikes < Mutations::BaseMutation
      argument :image_id, ID, required: true
      argument :like, Boolean, required: true

      field :image, Types::ImageType, null: true
      field :success, Boolean, null: false

      def resolve(image_id:, like:)
        if current_user.nil?
          return response(error: "You need to authenticate to perform this action")
        end

        image_to_update = ::Image.find_by(id: image_id)
        success = false
        unless image_to_update
          { 
            image: image_to_update,
            success: success
          }
        end

        if like
          success = image_to_update.like(user_id: current_user.id)
        else
          success = image_to_update.unlike(user_id: current_user.id)
        end

        {
          image: image_to_update,
          success: success
        }
      end
    end
  end
end
