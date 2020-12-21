# image-repository
Collection of Images 

This README would normally document whatever steps are necessary to get the
application up and running.

* Tech stack:
```
Ruby on Rails  
GraphQl
React
```

* ruby 2.7.0p0
* rails 6.0.3.2

* Setup
```
clone the repo and cd to image-repository
bundle install
yarn
rails db:setup
rails db:migrate
rails s
```

* How to run the test suite
`rspec`

* Deployment instructions
`TBD`

This is my submission to Shopify's backend challenge Summmer 2021. 
This project is still work in progress. Currently, what I have is ability to upload images to `disk` if in `development` environment and on s3 bucket if in `production` environment. Application also have an ability to view their uploads and all uploads 


#### Upcomming (Dec 21st will be my last final and the speed with which I finish these task will improve)
- Currently working on search and sort feature
- Pagination using GraphQL Realy
- Buy and Sell feature
- UI Updates and fixes

#### Queries and Mutations:
```
query {
  users{
    email
    fullName
    images {
      id
    }
  }
}

query User($input:ID!){
  user(userId: $input){
    email
    images {
      id
      
    }
  }
}



mutation createUser($input: CreateUserInput!){
  userCreate(input: $input){
    user {
      email
      fullName
    }
    errors
  }
}

mutation imageCreate($input: CreateInput!){
  imageCreate(input:$input) {
    image {
      id
      label
      
    }
    errors
  }
}

mutation signInUser($input:SignInUserInput!){
  userSignIn(input: $input){
    token
    user {
     id
    }
    message 
  }
}

query{
  currentUser{
    id
  }
}

mutation createDirectUpload($input: CreateDirectUploadInput!) {
 createDirectUpload(input: $input) {
   directUpload {
    url
    signedBlobId
    blobId
    headers
   }
 }
}

mutation AttachImagePhoto($input: AttachImagePhotoInput!){
  attachImagePhoto(input: $input){
    user{
      id
    }
  }
}

query {
  images{
    label
    slug
    user {
      id
    }
    url
  }
}

```
