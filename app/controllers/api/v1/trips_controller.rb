# Trips API controller
class Api::V1::TripsController < ApplicationController
  def index
    trip = Trip.all.order(created_at: :desc)
    render json: trip
  end

  def create
    trip = Trip.create(trip_params)
    if trip
      render json: trip
    else
      render json: trip.errors
    end
  end

  def show
    if trip
      render json: trip
    else
      render json: trip.errors
    end
  end

  def delete
    trip&.destroy
    render json: {message: 'Recipe deleted'}
  end

  private

  def trip_params
    params.permit(:name, :trip_start, :trip_end)
  end

  def trip
    @trip ||= Trip.find(params[:id])
  end
end
