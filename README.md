# image-repository

#### Tech Stack
```
Ruby on Rails  
GraphQl
React
```

#### requirements 

```
* ruby 2.7.0p0
* rails 6.0.3.2
* postgres 10
```
* Setup
```
https://github.com/amanpatel123/image-repository.git
cd image-repository
bundle install
yarn
rails db:setup
rails db:migrate
rails s

Once all the above step's are performed, go to: 
- http://localhost:3000/graphiql
and use Graphiql playGround to create a user or two (SignUp Page yet to implement, currenlty focusing on major parts)

Mutation to create user: 

mutation createUser($input: CreateUserInput!){
  userCreate(input: $input){
    user {
      email
      fullName
    }
    errors
  }
}

Example Input: 
{
  "input": {
    "userAttributes": {
      "email": "myemail@gmail.com",
      "firstName": "first",
      "lastName": "last",
      "password": "password"
    }
  }
}

Once the user is created, go to http://localhost:3000/ and login. 
```

* How to run the test suite
`rspec`

* Deployment instructions
`TBD`

This is my submission to Shopify's backend challenge Summmer 2021. Following are the features added till now:

- This project is still work in progress. Currently, what I have is ability to upload images to `disk` if in `development` environment and on s3 bucket if in `production` environment. 
- Application also have an ability to view their uploads and all uploads
- Pagination (Cursor based pagination) and displaying Images in sorted fashion


#### Upcomming (Dec 21st will be my last final and the speed with which I finish these task will improve)
- Currently working on search
- Buy and Sell feature
- Refactoring
