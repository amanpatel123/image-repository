# frozen_string_literal: true

FactoryBot.define do
  factory :image do
    label { "A beautiful picture" }
    association :user

    after(:build) do |image|
      image.photo.attach(io: File.open(Rails.root.join('spec/fixtures/brown-white-dogs.jpg')), filename: 'brown-white-dogs.jpg', content_type: 'image/jpeg')
    end
  end
end
