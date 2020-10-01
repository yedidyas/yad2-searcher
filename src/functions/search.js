const mongoose = require('mongoose');
const Promise = require('bluebird');
const yad2Caller = require('../services/yad2Caller');
const data = require('../data');
const filesManager = require('../services/filesManager');

// To open an item: 
// https://www.yad2.co.il/item/link_token

module.exports.search = async (event, context, callback) => {
  const promises = [];

  for (let i = 0; i < data.searchData.length; i++) {
    promises.push(yad2Caller.search(data.searchData[i].city, data.searchData[i].neighborhood, data.searchData[i].name));
  }

  const oldresultsFileContext = await filesManager.read('currentResults');
  const oldResults = oldresultsFileContext.split(',');

  const promisesResults = await Promise.all(promises);
  const arrayPromisesResults = [].concat.apply([], promisesResults);
  const currentResults = uniq = [...new Set(arrayPromisesResults)];

  const deltaBetweenOldToCurrentResults = currentResults
    .filter(x => !oldResults.includes(x))
    .concat(oldResults.filter(x => !currentResults.includes(x)));

  await filesManager.write(oldResults, 'oldresults');
  await filesManager.write(currentResults, 'currentResults');
  await filesManager.write(deltaBetweenOldToCurrentResults, 'deltaBetweenOldToCurrentResults');

  callback(null, {
          statusCode: 200,
          body: deltaBetweenOldToCurrentResults
        });  
};