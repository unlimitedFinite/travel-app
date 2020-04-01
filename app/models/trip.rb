class Trip < ApplicationRecord
  validates :name, presence: true
  validates :trip_start, presence: true

  has_many :costs

  before_destroy :destroy_costs

  private

  def destroy_costs
    costs.destroy_all
  end
end
