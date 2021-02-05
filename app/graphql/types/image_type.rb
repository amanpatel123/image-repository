# frozen_string_literal: true

module Types
  class ImageType < Types::BaseObject
    graphql_name "Image"
    
    field :id, ID, null: false
    field :slug, String, null: true
    field :label, String, null: false
    field :user, Types::UserType, null: false
    field :url, String, null: true
    field :tags, String, null: false
    field :total_likes, Integer, null: false
    field :like_by_current_user, Boolean, null: false
    field :description, String, null: true

    def url
      if object.photo.attached?
        context[:base_url] + Rails.application.routes.url_helpers.rails_blob_path(object.photo)
      else
        nil
      end
    end

    def tags
      object.tags.pluck(:name).join(", ")
    end

    def total_likes
      object.likes.count
    end

    def like_by_current_user
      current_user = context[:current_user]
      if current_user.nil?
        return false
      end

      object.liked_by.pluck(:id).include?(current_user.id)
    end
  end
end
