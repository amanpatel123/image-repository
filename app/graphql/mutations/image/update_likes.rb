module Mutations
  module Image
    class UpdateLikes < Mutations::BaseMutation
      argument :image_id, ID, required: true
      argument :like, Boolean, required: true

      field :success, Boolean, null: false

      def resolve(image_id:, like:)
        if current_user.nil?
          return response(error: "You need to authenticate to perform this action")
        end

        image_to_update = ::Image.find_by(id: image_id)
        return { success: false } if !image_to_update

        if like
          {
            success: image_to_update.like(user_id: current_user.id),
          }
        else
          {
            success: image_to_update.unlike(user_id: current_user.id)
          }
        end
      end
    end
  end
end
