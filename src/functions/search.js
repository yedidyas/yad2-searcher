const mongoose = require('mongoose');
const Promise = require('bluebird');
const yad2Caller = require('../services/yad2Caller');
const data = require('../data');
const filesManager = require('../services/filesManager');

// To open an item: 
// https://www.yad2.co.il/item/5apktgfn

module.exports.search = async (event, context, callback) => {
  const promises = [];

  const folderName = new Date().toLocaleString().replace(/:/g,"-").replace(/\//g,"-").replace(/,/g,"");
  
  const dir = `resultsHistory\\${folderName}`;
  await filesManager.mkdir(dir);

  for (let i = 0; i < data.searchData.length; i++) {
    promises.push(yad2Caller.search(data.searchData[i].city, data.searchData[i].neighborhood, data.searchData[i].name, dir));
  }

  const oldresultsFileContext = await filesManager.read('currentResults');
  const oldResults = oldresultsFileContext.split(',');

  const promisesResults = await Promise.all(promises);
  const arrayPromisesResults = [].concat.apply([], promisesResults);
  const currentResults = uniq = [...new Set(arrayPromisesResults)];

  const deltaBetweenOldToCurrentResults = currentResults
    .filter(x => !oldResults.includes(x))
    .concat(oldResults.filter(x => !currentResults.includes(x)));

  await filesManager.write(oldResults, 'oldResults.txt');
  await filesManager.write(currentResults, 'currentResults.txt');
  await filesManager.write(deltaBetweenOldToCurrentResults, 'deltaBetweenOldToCurrentResults.txt');

  callback(null, {
          statusCode: 200,
          body: deltaBetweenOldToCurrentResults
        });  
};