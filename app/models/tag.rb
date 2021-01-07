# frozen_string_literal: true

class Tag < ApplicationRecord
  has_many :image_tags
  has_many :images, through: :image_tags

  validates :name, uniqueness: { case_sensitive: false }
end
