class CreateImageTag < ActiveRecord::Migration[6.0]
  def change
    create_table :image_tags do |t|
      t.belongs_to :image, index: true
      t.belongs_to :tag, index: true
    end
  end
end
