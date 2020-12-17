class AddImagesTable < ActiveRecord::Migration[6.0]
  def change
    create_table :images do |t|
      t.string :slug
    end
  end
end
