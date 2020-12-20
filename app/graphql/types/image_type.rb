# frozen_string_literal: true

module Types
  class ImageType < Types::BaseObject
    graphql_name "Image"
    
    field :id, ID, null: false
    field :slug, String, null: true
    field :label, String, null: false
    field :user, Types::UserType, null: false
    field :url, String, null: true

    def url
      if object.photo.attached?
        Rails.application.routes.url_helpers.url_for(object.photo)
      else
        nil
      end
    end
  end
end
