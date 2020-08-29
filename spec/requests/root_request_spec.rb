# frozen_string_literal: true

require 'rails_helper'

describe RootController, type: :request do
  describe '#index' do
    it 'render the page without error' do
      get root_path

      expect(response.status).to eq(200)
    end
  end
end
