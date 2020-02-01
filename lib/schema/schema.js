const { 
  olympianIndex,
  sportEvents,
  eventMedalists 
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

  type Medalist {
    name: String!
    team: String
    age: Int
    medal: String
  }

  type EventMedalist {
    event: String
    medalists: [Medalist]
  }

  type Query {
    olympians(age: String): [Olympian]
    events: [Event]!
    event_medalists(id: ID): EventMedalist
  }
`);

var root = {
  olympians: async (args) => {
    return await olympianIndex(args);
  },
  events: async () => {
    return await sportEvents();
  },
  event_medalists: async (args) => {
    const eventId = parseInt(args.id)
    return await eventMedalists(eventId);
  }
};

module.exports = {
  schema: schema,
  root: root
}

