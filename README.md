# Olympians Express
[![Build Status](https://travis-ci.com/fentontaylor/koroibos-challenge.svg?branch=master)](https://travis-ci.com/fentontaylor/koroibos-challenge)

## Introduction
This project is an API built in Node.js using Express to explore sample data from the 2016 Summer Olympics. It includes v1 (RESTful) and v2 (GraphQL) of the API.

## Table of Contents
1. [Initial Setup](#setup)
1. [How to Use](#how-to)
1. [Tests](#tests)
1. [API Docs](#docs)
    - [V1: RESTful](#v1)
    - [V2: GraphQL](#v2)
1. [Schema](#schema)
1. [Tech Stack](#tech-stack)
1. [Contributors](#contributors)

## Initial Setup <a name="setup"></a>
1. Clone the repo
```bash
$ git clone git@github.com:fentontaylor/olympians-express.git
```

2. Install dependencies
```bash
$ npm install
```

3. Create your databases. You will already need [Postgres](https://www.postgresql.org/) installed.
```bash
$ createdb olympians_dev && createdb olympians_test
$ knex migrate:latest
$ knex migrate:latest --env=test
```

4. Seed the database
```
$ node utils/seeder.js
### Press control + C when it's finished
```
  
## How to Use <a name="how-to"></a>
To run the server locally, in your console, simply type:
```
$ npm start
```
Use [Postman](https://www.getpostman.com/) or your browser to send requests to the endpoints.

## Tests <a name="tests"></a>
Current test coverage:
![image](https://user-images.githubusercontent.com/18686466/72322581-ecc1af80-3663-11ea-8d0b-1a96c128be3c.png)

Mostly, the utils/dbSeed.js is dragging the coverage down. If you want to run the tests:
```
$ npm test
```
  
# API Docs <a name="docs"></a>
## V1: RESTful <a name="v1"></a>
Base url:
```
Production:
https://olympians.herokuapp.com/api/v1

Local:
http://localhost:3000/api/v1
```

### Endpoints
1. [GET /olympians](#get-olympians)
1. [GET /olympian_stats](#get-stats)
1. [GET /events](#get-events)
1. [GET /events/:id/medalists](#get-medalists)

### Endpoint: GET /olympians <a name="get-olympians"></a>
<details>
  <summary>View Details</summary>

  #### Description
  As a user, I should be able to send a GET request to /api/v1/olympians. A successful response will return a list of all Olympians in the database with their `name`, `team`, `age`, `sport`, and `total_medals_won`. I can enter optional query params to limit the search.

  | Param | Allowed Values |
  |-------|----------------|
  | `age` | youngest, oldest |

  #### Example Request
  ```
  GET https://olympians.herokuapp.com/api/v1/olympians
  ```

  #### Success Response
  ```json
  Status: 200

  {
    "olympians":
      [
        {
          "name": "Maha Abdalsalam",
          "team": "Egypt",
          "age": 18,
          "sport": "Diving",
          "total_medals_won": 0
        },
        {
          "name": "Ahmad Abughaush",
          "team": "Jordan",
          "age": 20,
          "sport": "Taekwondo",
          "total_medals_won": 1
        },
        {...}
      ]
  }
  ```

  #### Example Request With Query Params
  ```
  GET https://olympians.herokuapp.com/api/v1/olympians?age=youngest
  ```

  #### Success Response
  ```json
  Status: 200

  {
    "olympians": [
      {
        "name": "Ana Iulia Dascl",
        "team": "Romania",
        "age": 13,
        "sport": "Swimming",
        "total_medals_won": 0
      }
    ]
  }
  ```
</details>

### Endpoint: GET /olympian_stats <a name="get-stats"></a>
<details>
  <summary>View Details</summary>

  #### Description
  As a user, I should be able to visit GET /api/v1/olympian_stats. It should return the `total_competing_olympians`, the average weight in kg of `male_olympians` and `female_olympians`, and the `average_age` of all olympians.

  #### Example Request
  ```
  GET https://olympians.herokuapp.com/api/v1/olympian_stats
  ```

  #### Success Response
  ```json
  Status: 200

  {
      "olympian_stats": {
        "total_competing_olympians": 3120,
        "average_weight:" {
          "unit": "kg",
          "male_olympians": 75.4,
          "female_olympians": 70.2
        },
        "average_age:" 26.2
      }
    }
  ```
</details>


### Endpoint: GET /events <a name="get-events"></a>
<details>
  <summary>View Details</summary>

  #### Description
  As a user, I should be able to send a request to GET api/v1/events. It should return a list of each `sport` with a sub-list of each `event` associated with that sport.

  #### Example Request
  ```
  GET https://olympians.herokuapp.com/api/v1/events
  ```

  #### Success Response
  ```json
  Status: 200

  {
    "events":
      [
        {
          "sport": "Archery",
          "events": [
            "Archery Men's Individual",
            "Archery Men's Team",
            "Archery Women's Individual",
            "Archery Women's Team"
          ]
        },
        {
          "sport": "Badminton",
          "events": [
            "Badminton Men's Doubles",
            "Badminton Men's Singles",
            "Badminton Women's Doubles",
            "Badminton Women's Singles",
            "Badminton Mixed Doubles"
          ]
        },
        {...}
      ]
  }
  ```
</details>

### Endpoint: GET /events/:id/medalists <a name="get-medalists"></a>
<details>
  <summary>View Details</summary>

  #### Description
  As a user, I should be able to send a request to GET /api/v1/events/:id/medalists. If I give a valid event_id, then I should get a response with `event` and the medalists' `name`, `team`, `age`, and `medal`.

  #### Example Request
  Note:
  - Assume that "Badminton Mixed Doubles" has event id: 2
  - This is sample data and it is incomplete. You may not have all medalists for a particular event.
  ```
  GET https://olympians.herokuapp.com/api/v1/events/2/medalists
  ```

  #### Success Response
  ```json
  Status: 200

  {
    "event": "Badminton Mixed Doubles",
    "medalists": [
        {
          "name": "Tontowi Ahmad",
          "team": "Indonesia-1",
          "age": 29,
          "medal": "Gold"
        },
        {
          "name": "Chan Peng Soon",
          "team": "Malaysia",
          "age": 28,
          "medal": "Silver"
        }
      ]
  }
  ```
</details>

## V2: GraphQL <a name="#v2"></a>
Base url:
```
Production:
https://olympians.herokuapp.com/api/v2/graphql-olympians?query=<query>

Local:
http://localhost:3000/api/v2/graphql-olympians?query=<query>
```

GraphQL only uses a single endpoint and uses a structured query to get results. You can either use Postman or your browser to write the query directly as a query param or use the embedded API tool [GraphiQL](https://olympians.herokuapp.com/api/v2/graphql-olympians?query=query%20%7B%0A%20%20olympians%20%7B%0A%20%20%20%20name%0A%20%20%20%20age%0A%20%20%20%20sport%0A%20%20%20%20team%0A%20%20%20%20total_medals_won%0A%20%20%7D%0A%7D%0A) and construct the query on the page. You can select all of the attributes listed for each query, or as few as you'd like.

### Queries
1. [olympians](#olympians)
2. [olympian_stats](#olympian-stats)
3. [events](#events)
4. [event_medalists](#event-medalists)

### Query { Olympians } <a name="olympians"></a>
<details>
 <summary>View Details</summary>

  #### Description: 
  As a user, I should be able to use GraphQL to query `olympians`. A successful response will return a list of all Olympians in the database with their `name`, `team`, `age`, `sport`, and `total_medals_won`. I can enter the optional query argument `age` with the value 'youngest' or 'oldest' to limit the search.


  #### Example Query:
  ```
  ### 1 ###
  query {
    olympians {
      name
      age
      sport
      team
      total_medals_won
    }
  }

  ### 2 ###
  # age can be 'youngest' or 'oldest'
  query {
    olympians(age: "youngest") {
      name
      age
    }
  }
  ```

  #### Success Response
  ```json
  ### 1 ###
  {
    "data": {
      "olympians": [
        {
          "name": "Brady Lee Ellison",
          "age": 27,
          "sport": "Archery",
          "team": "United States",
          "total_medals_won": 2
        },
        {
          "name": "Chang Hye-Jin",
          "age": 29,
          "sport": "Archery",
          "team": "South Korea",
          "total_medals_won": 2
        },
        {...},
      ]
    }
  }

  ### 2 ###
  {
    "data": {
      "olympians": [
        {
          "name": "Ana Iulia Dascl",
          "age": 13
        }
      ]
    }
  }
  ```
</details>

### Query { OlympianStats } <a name="olympian-stats"></a>
<details>
  <summary>View Details</summary>

  #### Description:
  As a user, I should be able to use GraphQL to query `olympian_stats`. It should return the `total_competing_olympians`, the average weight in kg of `male_olympians` and `female_olympians`, and the `average_age` of all olympians.

  #### Example Query:
  ```
  query {
    olympian_stats {
      total_competing_olympians
      average_age
      average_weight {
        unit
        male_olympians
        female_olympians
      }
    }
  }
  ```

  #### Success Response
  ```json
  {
    "data": {
      "olympian_stats": {
        "total_competing_olympians": 2856,
        "average_age": 26.37,
        "average_weight": {
          "unit": "kg",
          "male_olympians": 79.4,
          "female_olympians": 62.69
        }
      }
    }
  }
  ```
</details>

### Query { Events } <a name="events"></a>
<details>
  <summary>View Details</summary>

  #### Description: 
  As a user, I should be able to use GraphQL to query `events`. It should return a list of each `sport` with a sub-list of each `event` associated with that sport.

  #### Example Query:
  ```

  ```

  #### Success Response:
  ```json
  {
    "data": {
      "events": [
        {
          "sport": "Archery",
          "events": [
            "Archery Men's Individual",
            "Archery Men's Team",
            "Archery Women's Individual",
            "Archery Women's Team"
          ]
        },
        {...},
      ]
    }
  }
  ```
</details>

### Query { EventMedalists } <a name="event-medalists"></a>
<details>
  <summary>View Details</summary>

  #### Description:
  As a user, I should be able to use GraphQL to query `event_medalists`. If I give a valid event_id, then I should get a response with the `event` and the medalists' `name`, `team`, `age`, and `medal`.

  #### Example Query:
  ```
  query {
    event_medalists(id: 10) {
      event
      medalists {
        name
        team
        age
        medal
      }
    }
  }
  ```

  #### Success Response:
  ```json
  {
    "data": {
      "event_medalists": {
        "event": "Taekwondo Women's Flyweight",
        "medalists": [
          {
            "name": "Tijana Bogdanovi",
            "team": "Serbia",
            "age": 18,
            "medal": "Silver"
          },
          {
            "name": "Patimat Abakarova",
            "team": "Azerbaijan",
            "age": 21,
            "medal": "Bronze"
          }
        ]
      }
    }
  }
  ```

</details>

## Schema <a name="schema"></a>
![image](https://user-images.githubusercontent.com/18686466/72352293-3bd90600-369f-11ea-9c8b-cdb878948efc.png)
  
## Tech Stack <a name="tech-stack"></a>
The API is built in [Node.js](https://nodejs.org/en/) using the [Express.js](https://expressjs.com/) framework and [Knex.js](http://knexjs.org/) as the ORM to connect to the [Postgresql](https://www.postgresql.org/) database. The testing suite is built with [Jest](https://jestjs.io/). The app is deployed to [Heroku](https://www.heroku.com/).
  
## Contributors <a name="contributors"></a>
- [Fenton Taylor](https://github.com/fentontaylor)
