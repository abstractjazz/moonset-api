Rails.application.routes.draw do
  resources :projects
  resources :notes 
  
  resources :projects do 
    resources :notes
 
end
end 
