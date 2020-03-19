const graphql = require(`graphql`);

const {GraphQLObjectType,GraphQLString,GraphQLSchema,GraphQLID,GraphQLInt} = graphql;


const movies = [
    {id:`1`,name:`Pulp Fiction`,genre:`Crime`,directorId:`1`},
    {id:`2`,name:`1984`,genre:`Sci-Fi`,directorId:`2`},
    {id:3,name:`V for vendetta`,genre:`Action`,directorId:`3`},
    {id:4,name:`Snatch`,genre:`Crime-comedy`,directorId:`4`},
]
const directors = [
    {id:`1`,name:`Dima`,age:19},
    {id:`2`,name:`Denis`,age:19},
    {id:`3`,name:`Stas-O`,age:19},
    {id:`4`,name:`Stas-R`,age:19},
]
const MovieType = new GraphQLObjectType({
    name:`Movie`,
    fields:()=> ({
      id:{type:GraphQLID},
      name:{type:GraphQLString},
      genre:{type:GraphQLString},
        director:{
          type:DirectorType,
            resolve(parent,args)
            {
                return directors.find(director=>director.id === parent.id);
            }
        }
    }),
})
const DirectorType = new GraphQLObjectType({
    name:`Director`,
    fields:()=> ({
      id:{type:GraphQLID},
      name:{type:GraphQLString},
      age:{type:GraphQLInt},
    }),
})

const Query = new GraphQLObjectType({
    name:`Query`,
    fields:{
        movie:{
            type:MovieType,
            args:{id:{type:GraphQLID}},
            resolve(parent,args)
            {
                return movies.find(movie=>movie.id === args.id);
            }
        },
        director:{
            type:DirectorType,
            args:{id:{type:GraphQLID}},
            resolve(parent,args)
            {
                return directors.find(director=>director.id === args.id);
            }
        },
    }
});

module.exports = new GraphQLSchema({
   query:Query,
});