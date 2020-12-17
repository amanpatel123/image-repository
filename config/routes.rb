# frozen_string_literal: true

Rails.application.routes.draw do
  default_url_options :host => "http://localhost:3000/"
  if Rails.env.development?
    mount GraphiQL::Rails::Engine, at: "/graphiql", graphql_path: "/graphql"
  end
  post "/graphql", to: "graphql#execute"
  devise_for :users
  root to: 'root#index'
end
