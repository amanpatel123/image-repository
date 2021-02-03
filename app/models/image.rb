# frozen_string_literal: true

class Image < ApplicationRecord
  belongs_to :user
  has_one_attached :photo
  has_many :image_tags
  has_many :tags, through: :image_tags
  before_save :set_slug

  def set_slug
    self.slug = label.parameterize
  end
end
