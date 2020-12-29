module Mutations
  module Image
    class AttachImagePhoto < Mutations::BaseMutation
      graphql_name "AttachImagePhoto"
      description "Attach or Update Image photo by updating the blob"
 
      argument :input, Types::InputObjects::ImageAttributes, required: true

      field :image, Types::ImageType, null: false

      def resolve(input:)
        current_user = context[:current_user]
        
        if current_user.nil?
          raise GraphQL::ExecutionError,
            "You need to authenticate to perform this action"
        end

        image = ::Image.new(label: input.label.titleize, description: input.description, user: current_user)
        image.photo.attach(input.blob_id)
        
        input.tags.split(',').each do |tag|
          formate_tag = tag.strip.titleize
          available_tag = ::Tag.find_by(name: formate_tag)
          if available_tag
            image.tags << available_tag
          else
            tag_instance = ::Tag.create(name: formate_tag)
            image.tags << tag_instance
          end
        end

        image.save!
        { image: image }
      end
    end
  end
end
