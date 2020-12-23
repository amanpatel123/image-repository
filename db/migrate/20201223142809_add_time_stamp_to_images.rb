class AddTimeStampToImages < ActiveRecord::Migration[6.0]
  def change
    add_column :images, :created_at, :datetime
    add_column :images, :updated_at, :datetime
  end
end
