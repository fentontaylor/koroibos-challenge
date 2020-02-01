const { 
  olympianIndex,
  sportEvents 
} = require('../../utils/dbQueries')
const { buildSchema } = require('graphql')

var schema = buildSchema(`
  type Olympian {
    name: String!
    team: String
    age: Int
    sport: String
    total_medals_won: Int
  }

  type Event {
    sport: String!
    events: [String]!
  }

  type Query {
    olympians(age: String): [Olympian]
    events: [Event]!
  }
`);

var root = {
  olympians: async (args) => {
    return await olympianIndex(args)
  },
  events: async () => {
    return await sportEvents()
  }
};

module.exports = {
  schema: schema,
  root: root
}

