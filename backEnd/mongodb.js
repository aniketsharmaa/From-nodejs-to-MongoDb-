// Connection to mongodb 

const mongoose = require('mongoose');

const url = 'mongodb://localhost:27017'
const databaseName = 'grievance'

mongoose.connect(url+'/'+databaseName);
