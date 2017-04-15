const db = require('./../../db/db.js');
const path = require('path');
const pg = require('pg');
const pgp = require('pg-promise')();



function sql(file) {
  var fullPath = path.join(__dirname, './../../db/queries/comments', file);
  return new pgp.QueryFile(fullPath, {minify: true});
}

let queries = {
  getComments: sql('getCommentsByTopicId.sql'),
  addComment: sql('insertComment.sql')
}


module.exports.getComments = (req, res) => {
  const { type, topic_id } = req.query;

  return db.query(queries.getComments, [type, topic_id])
  .then( data => {
    console.log('Success getting comments');
    res.status(200).json(data);
  })
  .catch( error => {
    res.status(404).send(error, 'FAILED getting comments');
  });
}


module.exports.addComment = (req, res) => {
  const { user_id, type, topic_id, content } = req.body;

  return db.query(queries.addComment, [user_id, type, topic_id, content])
  .then(() => {
    res.status(201).send('Success adding comment');
  })
  .catch( error => {
    res.status(404).send('failed to add comment');
  })
}



