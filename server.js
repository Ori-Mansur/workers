const express = require('express')
const cors = require('cors')
const morgan = require("morgan");
const helmet = require("helmet");
const jwt = require("express-jwt");
const jwksRsa = require("jwks-rsa");
const authConfig = require("./auth_config.json");
const app = express()
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema/schema')


const mongoose = require('mongoose');

// mongoose.connect('mongodb+srv://life-economics:life-economics@cluster0.i7za1.mongodb.net/life-economics?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true , useFindAndModify: false });
mongoose.connect('mongodb+srv://workers:workers3275@cluster0.j8eza.mongodb.net/workers?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true , useFindAndModify: false });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  // we're connected!
  console.log('mongo connect');
});

if (!authConfig.domain || !authConfig.audience) {
    throw new Error(
      "Please make sure that auth_config.json is in place and populated"
    );
  }

app.use(morgan("dev"));
app.use(helmet());

const checkJwt = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://${authConfig.domain}/.well-known/jwks.json`
  }),

  audience: authConfig.audience,
  issuer: `https://${authConfig.domain}/`,
  algorithms: ["RS256"]
});
app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
  }))


if (process.env.NODE_ENV !== 'production') {
    const corsOptions = {
        origin: ['http://127.0.0.1:8080', 'http://localhost:8080', 'http://localhost:3002', 'http://127.0.0.1:8081'],
        credentials: true
    };
    app.use(cors(corsOptions));
}

app.use('/', (req, res) => {
    res.send(`I'm Alive`)
})

const loginRoutes = require('./routes/login.routes')
const workersRoutes = require('./routes/workers.routes')

app.use('/login', loginRoutes)
app.use('/api/workers', workersRoutes)

app.get("/api/external", checkJwt, (req, res) => {
    res.send({
      msg: "Your access token was successfully validated!"
    });
  });




const port = process.env.PORT || 5600
app.listen(port, () => {
    console.log('app listening on port ' + port);
})