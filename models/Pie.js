const ORM = require('../config/orm')

const Pie = {

  selectAll: (cb) => {
    ORM.selectAll('pies', (res) => {
      cb(res)
    })
  },
  insertOne: (cols, vals, cb) => {
    ORM.insertOne('pies', cols, vals, (res) => {
      cb(res)
    })
  },

  updateOne: (objColVals, condition, cb) => {
    ORM.updateOne('pies', objColVals, condition, (res) => {
      cb(res)
    })
  },

  deleteOne: (condition, cb) => {
    ORM.deleteOne('pies', condition, (res) => {
      cb(res)
    })
  }
}

module.exports = Pie
