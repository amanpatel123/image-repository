# frozen_string_literal: true

class Image < ApplicationRecord
  belongs_to :user

  before_save :set_slug

  def set_slug
    self.slug = label.parameterize
  end
end
