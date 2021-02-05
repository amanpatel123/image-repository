# frozen_string_literal: true

class Like < ApplicationRecord
  belongs_to :image
  belongs_to :user
end
