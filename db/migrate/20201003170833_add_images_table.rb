class AddImagesTable < ActiveRecord::Migration[6.0]
  def change
    create_table :images do |t|
      t.string :filename, null: false
      t.integer :slug, null: false
    end
  end
end
