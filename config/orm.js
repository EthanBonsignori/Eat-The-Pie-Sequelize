const connection = require('./connection')

function printQuestionMarks (num) {
  const arr = []
  for (let i = 0; i < num; i++) {
    arr.push('?')
  }
  return arr.toString()
}

function objToSql (ob) {
  const arr = []
  for (const key in ob) {
    let value = ob[key]
    if (Object.hasOwnProperty.call(ob, key)) {
      if (typeof value === 'string' && value.indexOf(' ') >= 0) {
        value = "'" + value + "'"
      }
      arr.push(key + '=' + value)
    }
  }
  return arr.toString()
}

const ORM = {

  selectAll: (tableInput, cb) => {
    const queryString = `SELECT * FROM ${tableInput}`
    connection.query(queryString, (err, result) => {
      if (err) throw err
      cb(result)
    })
  },

  insertOne: (table, cols, vals, cb) => {
    let queryString = `
      INSERT INTO ${table} (${cols.toString()})
      VALUES (${printQuestionMarks(vals.length)})`
    console.log(queryString)
    connection.query(queryString, vals, (err, result) => {
      if (err) throw err
      cb(result)
    })
  },

  updateOne: (table, objColVals, condition, cb) => {
    let queryString = `
      UPDATE ${table}
      SET ${objToSql(objColVals)}
      WHERE ${condition}`
    console.log(queryString)
    connection.query(queryString, (err, result) => {
      if (err) throw err
      cb(result)
    })
  },

  deleteOne: (table, condition, cb) => {
    const queryString = `
      DELETE FROM ${table}
      WHERE ${condition}`
    console.log(queryString)
    connection.query(queryString, (err, result) => {
      if (err) throw err
      cb(result)
    })
  }
}

module.exports = ORM
