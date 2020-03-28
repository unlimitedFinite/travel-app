class Trip < ApplicationRecord
  validates :name, presence: true
  validates :trip_start, presence: true

  has_many :costs
end
