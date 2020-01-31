const DB = require('../../utils/dbConnect')
const graphql = require('graphql')
const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
  GraphQLSchema
} = graphql

const AthleteType = new GraphQLObjectType({
  name: 'Athlete',
  fields: () => ({
    id: {type: GraphQLID},
    name: {type: GraphQLString},
    sex: {type: GraphQLString},
    team: {type: GraphQLString},
    age: {type: GraphQLInt},
    height: {type: GraphQLInt},
    weight: {type: GraphQLInt},
  })
})

const RootQuery = new GraphQLObjectType({
  name: 'RootQuery',
  fields: {
    athletes: {
      type: new GraphQLList(AthleteType),
      resolve(parent, args) {
        return DB('athletes');
      }
    }
  }
})

module.exports = new GraphQLSchema({
  query: RootQuery
})

