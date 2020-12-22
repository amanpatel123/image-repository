module Mutations
  module Image
    class AttachImagePhoto < Mutations::BaseMutation
      graphql_name "AttachImagePhoto"
      description "Attach or Update Image photo by updating the blob"
 
      argument :blob_id, String, required: true

      field :image, Types::ImageType, null: false

      def resolve(blob_id:)
        current_user = context[:current_user]
        
        if current_user.nil?
          raise GraphQL::ExecutionError,
            "You need to authenticate to perform this action"
        end
        image = ::Image.new(label: "Temp Label", user: current_user)
        image.photo.attach(blob_id)
        image.save!

        { image: image }
      end
    end
  end
end