class CreateTrips < ActiveRecord::Migration[6.0]
  def change
    create_table :trips do |t|
      t.string :name, null: false
      t.date :trip_start, null: false
      t.date :trip_end

      t.timestamps
    end
  end
end
