const PORT = process.env.PORT || 5000;
import { ApolloServer } from 'apollo-server-express';
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core';
import Express,{Request,Response,Application} from 'express';
import 'reflect-metadata';
import { buildSchema } from 'type-graphql';
import { connect } from 'mongoose';

/* import { UserResolver } from './resolvers/User';*/
import { ProductResolver } from './resolvers/Product'; 
import { CategoriesResolver } from './resolvers/Categories';
/* import { CartResolver } from './resolvers/Cart';
import { OrderResolver } from './resolvers/Order';
 */


const main = async () => {
  const schema = await buildSchema({
    resolvers: [
      CategoriesResolver,
      ProductResolver,
    ],
    emitSchemaFile: true,
    validate: false,
  });

  // create mongoose connection
  const mongoose = await connect('mongodb://localhost:27017/test');
  await mongoose.connection;

  const server = new ApolloServer({
    schema,
    plugins: [ ApolloServerPluginLandingPageGraphQLPlayground ],
  });

  const app:any = Express();

  await server.start();

  server.applyMiddleware({ app });

  app.listen({ port: 3333 }, () =>
    console.log(
      `🚀 Server ready and listening at ==> http://localhost:3333${server.graphqlPath}`
    )
  );
};

main().catch((error) => {
  console.log(error, 'error');
});













/* run.then(()=>{
  console.log("Connected");
}).catch((err)=>{console.log(err)});

app.get("/", (req:Request, res:Response):void => {
  res.send("Hello Typescript with Node.js!")
});
app.listen(PORT, ():void => {
  console.log(`Server Running here 👉 https://localhost:${PORT}`);
}); */