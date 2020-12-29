# frozen_string_literal: true

module Types::InputObjects
  class ImageAttributes < Types::BaseInputObject
    description "Attributes of Image"
    argument :label, String, required: false
    argument :user_id, String, required: false
    argument :description, String, required: false
    argument :blob_id, String, required: false
    argument :tags, String, required: false
  end 
end
