# Costs API controller
class Api::V1::CostsController < ApplicationController
  def index
    cost = Cost.all.where(trip_id: params[:id]).order(created_at: :desc)
    render json: cost
  end

  def create
    byebug
    cost = Cost.create(cost_params)
    if cost
      render json: cost
    else
      render json: cost.errors
    end
  end

  def show
    if cost
      render json: cost
    else
      render json: cost.errors
    end
  end

  def delete
    cost&.destroy
    render json: {message: 'Recipe deleted'}
  end

  private

  def cost_params
    params.permit(:info, :amount, :date, :trip_id)
  end

  def cost
    @cost ||= Cost.find(params[:id])
  end
end
