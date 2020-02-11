/* eslint-disable no-console */
const { MongoClient, ObjectId} = require('mongodb');
const {config} = require('../config/index');

const DB_USER = encodeURIComponent(config.dbUser);
const DB_PASSWORD = encodeURIComponent(config.dbPassword);
const DB_NAME = config.dbName;

const MONGO_URI = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${config.dbHost}/${DB_NAME}`

class MongoLib {
  constructor(){
    this.client = new MongoClient(MONGO_URI, { useNewUrlParser: true});
    this.dbName = DB_NAME;

  }

  connect() {
    if(!MongoLib.connection){
      MongoLib.connection = new Promise((resolve, reject)=> {
        this.client.connect(err => {
          if(err){
            reject(err)
          }

          console.log('MongoDB Conected')
          resolve(this.client.db(this.dbName))
        })
      })
    }

    return MongoLib.connection;

  }
}

module.exports = MongoLib
