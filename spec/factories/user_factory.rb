# frozen_string_literal: true

FactoryBot.define do
  factory :user do
    email { "johndoe@gmail.com" }
    first_name { "john" }
    last_name { "doe" }
    password { "password" }
  end
end
