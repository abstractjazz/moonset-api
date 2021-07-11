class Notes < ActiveRecord::Migration[6.1]
  def change
    create_table :notes do |t|

      t.integer :project_id
      t.timestamps 
    end
  end 
end
