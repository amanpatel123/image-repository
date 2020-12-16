# frozen_string_literal: true
class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :lockable, :timeoutable, and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable, :trackable

  has_many :images, dependent: :destroy

  def full_name
    "#{first_name} ".capitalize  + "#{last_name}".capitalize
  end
end
