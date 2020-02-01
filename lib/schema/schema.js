const { olympianIndex } = require('../../utils/dbQueries')
const { buildSchema } = require('graphql')

var schema = buildSchema(`
  type Olympian {
    name: String!
    team: String
    age: Int
    sport: String
    total_medals_won: Int
  }

  type Query {
    olympians(age: String): [Olympian]
  }
`);

var root = {
  olympians: async (args) => {
    return await olympianIndex(args)
  }
};

module.exports = {
  schema: schema,
  root: root
}

