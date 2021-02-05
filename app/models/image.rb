# frozen_string_literal: true

class Image < ApplicationRecord
  belongs_to :user
  has_one_attached :photo
  has_many :image_tags
  has_many :tags, through: :image_tags
  has_many :likes
  has_many :liked_by, through: :likes, source: :user
  before_save :set_slug

  def set_slug
    self.slug = label.parameterize
  end

  def like(user_id:)
    user = User.find(user_id)
    if user
      !liked_by.pluck(:id).include?(user.id) && liked_by << user
    end
  end

  def unlike(user_id:)
    user = User.find(user_id)
    if user
      liked_by.pluck(:id).include?(user.id) && liked_by.delete(user)
    end
  end
end
