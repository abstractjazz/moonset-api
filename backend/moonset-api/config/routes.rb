Rails.application.routes.draw do
  resources :projects
  resources :notes 
  
  resources :projects do 
    resources :notes
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
end 
