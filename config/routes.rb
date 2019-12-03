Rails.application.routes.draw do
  devise_for :users
  root to:"messages#index"
  resources :user, only: [:edit, :update]
end
