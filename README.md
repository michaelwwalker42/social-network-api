# Social Network Api
  ![license](https://img.shields.io/badge/license-MIT-orange.svg)
  ![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?logo=mongodb&logoColor=white)
  ![NodeJS](https://img.shields.io/badge/node.js-6DA55F?logo=node.js&logoColor=white)
  ![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?logo=express&logoColor=%2361DAFB)

## Description
  An API for a social network web application where users can share their thoughts, react to friends’ thoughts, and create a friend list. The application uses a MongoDb database, the Mongoose ODM, and Express.Js for the server.
## Table of Contents
  * [User Story](#user-story)  
  * [Technologies](#technologies)  
  * [Tests](#tests)  
  * [Demos](#demos)  
  * [Api Routes](#api-routes)  
  * [License](#license)
  * [Questions](#questions) 
## User Story
AS A social media startup
I WANT an API for my social network that uses a NoSQL database
SO THAT my website can handle large amounts of unstructured data

## Tests
Routes were tested with [Insomnia](https://insomnia.rest/)   

![](assets/images/18-nosql-homework-demo-01.gif)
## Technologies
  - [Express.js](https://expressjs.com/)
  - [MongoDb](https://www.mongodb.com/)
  - [Mongoose ODM](https://mongoosejs.com/)
## Demos

  - [User Routes Demo](https://drive.google.com/file/d/1fMXmvylpg3IHHzmKfMIMnqcjunr5gDwK/view)
  - [Friend Routes Demo](https://drive.google.com/file/d/1K7Gw4_aHvNWKWBLCN-uHIPZ2m3nzSnzB/view)
  - [Thought Routes Demo](https://drive.google.com/file/d/1dDIMQZqDI6EiJ6uC8Di4Ai2bMirL0Bgv/view)
  - [Reaction Routes Demo](https://drive.google.com/file/d/1CeTisJdEVLVg6CAtpISdoohc1sW4hzRe/view)

## Api Routes 

### /api/users

  - `GET` all users
  - `GET` a single user by its _id and populated thought and friend data
  - `POST` a new user:

  ```
 // example data
{
  "username": "lernantino",
  "email": "lernantino@gmail.com"
}
```
### /api/users/:userId
  - `PUT` to update a user by its `_id`

  - `DELETE` to remove user by its `_id`
### /api/users/:userId/friends/:friendId
  
  - `POST` to add a new friend to a user's friend list

  - `DELETE` to remove a friend from a user's friend list
### /api/thoughts 
  - `GET` to get all thoughts
  - `GET` to get a single thought by its `_id`
  - `POST` to create a new thought 
  ```
 // example data
{
  "thoughtText": "Here's a cool thought...",
  "username": "lernantino",
  "userId": "5edff358a0fcb779aa7b118b"
}
``` 
/api/thoughts/thoughtId
  - `PUT` to update a thought by its `_id`
  - `DELETE` to remove a thought by its `_id`
### /api/thoughts/:thoughtId/reactions
  - `POST` to create a reaction stored in a single thought's `reactions` array field
### /api/thoughts/:thoughtId/reactions/:reactionId
  - `DELETE` to pull and remove a reaction by the reaction's `reactionId` value 

  ## License

 [MIT License](https://choosealicense.com/)

Copyright (c) 2022 Michael Walker

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

  ## Questions
  My Github Profile: [michaelwwalker42](https://github.com/michaelwwalker42)  
  For additional questions email me at michaelwwalker42@gmail.com  
