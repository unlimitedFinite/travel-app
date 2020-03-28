Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      get 'trips', to: 'trips#index'
      post 'trips', to: 'trips#create'
      get 'trip/:id', to: 'trips#show'
      delete 'trip/:id', to: 'trips#delete'
    end
  end
  root 'homepage#index'
  get '*path' => 'homepage#index'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
