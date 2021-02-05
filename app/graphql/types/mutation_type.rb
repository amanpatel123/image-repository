module Types
  class MutationType < Types::BaseObject
    # TODO: remove me
    field :user_create, mutation: Mutations::User::Create, description: "Create a new user"
    field :image_create, mutation: Mutations::Image::Create, description: "Create a new Image"
    field :user_sign_in, mutation: Mutations::User::SignIn, description: "Sign in a user"
    field :create_direct_upload, mutation: Mutations::CreateDirectUpload
    field :attach_image_photo, mutation: Mutations::Image::AttachImagePhoto, description: "Add a photo"
    field :delete_image, mutation: Mutations::Image::Delete, description: "delete an Image"
    field :update_likes, mutation: Mutations::Image::UpdateLikes, description: "Like or unlike an Image"
  end
end
