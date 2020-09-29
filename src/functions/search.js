const mongoose = require('mongoose');
const Promise = require('bluebird');
const validator = require('validator');
const SearchResult = require('../models/SearchResult');
const yad2Caller = require('../services/yad2Caller');
mongoose.Promise = Promise;

const mongoString = ''; // MongoDB Url

const createErrorResponse = (statusCode, message) => ({
  statusCode: statusCode || 501,
  headers: { 'Content-Type': 'text/plain' },
  body: message || 'Incorrect id',
});

const dbExecute = (db, fn) => db.then(fn).finally(() => db.close());

function dbConnectAndExecute(dbUrl, fn) {
  return dbExecute(mongoose.connect(dbUrl, { useMongoClient: true }), fn);
}


module.exports.search = async (event, context, callback) => {
  const results = await yad2Caller.search();
  
  // TODO: Promise all
  // Remove unrelecant results (seperating panels etc.)
  // fetch existing search resultss from db
  // Calculate delta from new resulsts only
  // Save ALL current results in mongo in the current search results record id 
  // Send back the titel of the new delta apartments showed up
  
  // 
  callback(null, {
          statusCode: 200,
          body: results
        });  
  // const data = JSON.parse(event.body);

  // const user = new UserModel({
  //   name: data.name,
  //   firstname: data.firstname,
  //   birth: data.birth,
  //   city: data.city,
  //   ip: event.requestContext.identity.sourceIp,
  // });

  // if (user.validateSync()) {
  //   callback(null, createErrorResponse(400, 'Incorrect user data'));
  //   return;
  // }

  // dbConnectAndExecute(mongoString, () => (
  //   user
  //     .save()
  //     .then(() => callback(null, {
  //       statusCode: 200,
  //       body: JSON.stringify({ id: user.id }),
  //     }))
  //     .catch(err => callback(null, createErrorResponse(err.statusCode, err.message)))
  // ));
};


// module.exports.search = async (event, context) => {
//   let bodyObj = JSON.parse(event.body)
//   console.log(bodyObj)
//   return {
//     statusCode: 200,
//     body: JSON.stringify({
//       message: bodyObj.parameter
//     })
//   }
// }