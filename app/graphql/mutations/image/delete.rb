module Mutations
  module Image
    class Delete < Mutations::BaseMutation
      argument :image_id, ID, required: true

      field :message, String, null: true
      field :error, String, null: true

      def resolve(image_id:)
        if context[:current_user].nil?
          return response(error: "You need to authenticate to perform this action")
        end

        image_to_deleted = ::Image.find_by(id: image_id) 
        image_owner = image_to_deleted.user
        if context[:current_user] != image_owner
          return response(error: "You are not authorized to delete this image")
        end
        
        if image_to_deleted.destroy 
          return response(message: "Succesfully deleted the image")
        else
          return response(error: "There was some issue deleting this image")
        end
      end

      private
        def response(message: nil, error: nil)
          {
            message: message,
            error: error
          }
        end
    end
  end
end
