class AddColumnsToImage < ActiveRecord::Migration[6.0]
  def change
    add_column :images, :label, :string
    add_column :images, :String, :string
  end
end
