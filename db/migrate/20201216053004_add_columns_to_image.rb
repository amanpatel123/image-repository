class AddColumnsToImage < ActiveRecord::Migration[6.0]
  def change
    add_column :images, :label, :string
  end
end
