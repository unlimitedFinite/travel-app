class Cost < ApplicationRecord
  validates :info, presence: true
  validates :amount, presence: true

  belongs_to :trip
end
