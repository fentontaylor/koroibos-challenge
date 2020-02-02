const { 
  olympianIndex,
  sportEvents,
  eventMedalists,
  olympianStats 
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

  type AvgWeight {
    unit: String
    male_olympians: Float
    female_olympians: Float
  }

  type OlympianStats {
    total_competing_olympians: Int!
    average_age: Float
    average_weight: AvgWeight
  }

  type Query {
    olympians(age: String): [Olympian]
    events: [Event]!
    event_medalists(id: ID): EventMedalist
    olympian_stats: OlympianStats
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
  },
  olympian_stats: async () => {
    const result = await olympianStats();
    return result.olympian_stats;
  }
};

module.exports = {
  schema: schema,
  root: root
}

