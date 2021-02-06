require 'rails_helper'

RSpec.describe Image, type: :model do
  describe 'Association' do
    it 'belongs to a user' do
      should belong_to(:user) 
    end

    it 'has many image_tags' do
      should have_many(:image_tags)
    end

    it 'has many tags' do
      should have_many(:tags)
    end

    it 'has many likes' do
      should have_many(:likes)
    end

    it 'has many likes_by' do
      should have_many(:liked_by)
    end
  end

  describe '#like' do
    
  end
end

