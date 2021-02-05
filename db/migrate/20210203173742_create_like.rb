class CreateLike < ActiveRecord::Migration[6.0]
  def change
    create_table :likes do |t|
      t.belongs_to :image, index: true
      t.belongs_to :user, index: true
    end
  end
end
