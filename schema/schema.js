const graphql = require(`graphql`);

const {GraphQLObjectType,GraphQLString,GraphQLSchema,GraphQLID,GraphQLInt,GraphQLList} = graphql;


const movies = [
    {id:`1`,name:`1`,genre:`Crime`,directorId:`1`},
    {id:`2`,name:`2`,genre:`Sci-Fi`,directorId:`2`},
    {id:'3',name:`3`,genre:`Action`,directorId:`3`},
    {id:'4',name:`4`,genre:`Crime-comedy`,directorId:`4`},
    {id:'5',name:`5`,genre:`Type-Action`,directorId:`1`},
    {id:'6',name:`6`,genre:`Horror`,directorId:`2`},
    {id:'7',name:`7`,genre:`Scary`,directorId:`3`},
    {id:'8',name:`8`,genre:`Fantasy`,directorId:`4`},
    {id:'9',name:`9`,genre:`-Action`,directorId:`1`},

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
        movies:
            {
                type:new GraphQLList(MovieType),
                resolve(parent,args)
                {
                    return movies.filter(movie=>movie.directorId===parent.id);
                },
            },
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
        movies:
            {
                type: new GraphQLList(MovieType),
                resolve(parent,args)
                {
                    return movies;
                }
            },
        directors:
            {
                type:new GraphQLList(DirectorType),
                resolve(parent,args)
                {
                    return directors;
                }
            }
    }
});

module.exports = new GraphQLSchema({
   query:Query,
});