# frozen_string_literal: true

FactoryBot.define do
  factory :image do
    label { "A beautiful picture" }
    association :user
  end
end
