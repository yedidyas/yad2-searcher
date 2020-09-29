const mongoose = require('mongoose');
const validator = require('validator');

const model = mongoose.model('SearchResult', {
  id: {
    type: Number,
    required: true,
    validate: {
      validator(name) {
        return validator.isAlphanumeric(name);
      },
    },
  },
  recordsIds: {
    type: Array,
    required: true,
    validate: {
      validator(firstname) {
        return validator.isAlphanumeric(firstname);
      },
    },
  }
});

module.exports = model;
