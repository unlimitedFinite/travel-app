Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      get 'trips/index'
      post 'trips/create'
      get 'trips/show/:id', to: 'trips#show'
      delete 'trips/destroy/:id', to: 'trips#delete'
    end
  end
  root 'homepage#index'
  get './*path' => 'homepage#index'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
