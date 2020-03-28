class CreateCosts < ActiveRecord::Migration[6.0]
  def change
    create_table :costs do |t|
      t.string :info
      t.decimal :amount, precision: 8, scale: 2
      t.references :trip, null: false, foreign_key: true
      t.date :date

      t.timestamps
    end
  end
end
