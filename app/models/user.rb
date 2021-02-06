# frozen_string_literal: true
class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :lockable, :timeoutable, and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable, :trackable

  has_many :images, dependent: :destroy
  has_many :likes, dependent: :destroy
  has_many :liked_images, through: :likes, source: :image

  def full_name
    "#{first_name} ".capitalize  + "#{last_name}".capitalize
  end

  def liked(image_id:)
    liked_image_ids = self.liked_images.pluck(:id)

    liked_image_ids.include?(image_id.to_i)
  end
end
