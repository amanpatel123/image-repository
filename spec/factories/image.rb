# frozen_string_literal: true

FactoryBot.define do
  factory :image do
    filename { "testname" }
    label { "A beautiful picture" }
    association :user
  end
end
