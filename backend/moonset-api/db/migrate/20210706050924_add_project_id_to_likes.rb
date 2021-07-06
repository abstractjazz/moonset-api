class AddProjectIdToLikes < ActiveRecord::Migration[6.1]
  def change
    add_column :likes, :project_id, :integer
  end
end
