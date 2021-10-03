const express = require('express');
const mongoose = require('mongoose');
var passport = require('passport');
var session = require('express-session');
var cors = require('cors');
const Sentry = require("@sentry/node");
const Tracing = require("@sentry/tracing");

const app = express();

app.use(express.json());
app.use(cors());

const customerRouter = require('./routes/Customers');
const salonRouter = require('./routes/Salons');
const memRouter = require('./routes/MembershipPlans');

Sentry.init({
    dsn: "https://8e2ef2ed0ee44a2dad1d21d667157569@o990074.ingest.sentry.io/5946532",
    tracesSampleRate: 1.0,
});

const transaction = Sentry.startTransaction({
    op: "test",
    name: "My First Test Transaction",
});

setTimeout(() => {
    try {
        //foo();
    } catch (e) {
        Sentry.captureException(e);
    } finally {
        transaction.finish();
    }
}, 05);
mongoose.connect(
    "mongodb+srv://Haris:5337618@cluster0.uqzho.mongodb.net/Ar-Salon?retryWrites=true&w=majority",
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
    }
);
//Express session
app.use(session({
    secret: 'secrettexthere',
    saveUninitialized: true,
    resave: true,
}));

// Passport
app.use(passport.initialize());
app.use(passport.session());


// Routes
app.use('/Customers', customerRouter);
app.use('/Salons', salonRouter);
app.use('/MemPlans', memRouter);


app.use('/api/user', require('./routes/api/user'))
app.use('/api/auth', require('./routes/api/auth'))
app.use('/api/booking', require('./routes/api/booking'))

app.listen(5000, () => {
    console.log("Server is running...");
});
