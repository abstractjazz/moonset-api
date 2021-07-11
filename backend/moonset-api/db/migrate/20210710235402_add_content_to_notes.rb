class AddContentToNotes < ActiveRecord::Migration[6.1]
  def change
    add_column :notes, :content, :string
  end
end
