const router = require('express').Router();
const notesCtrl = require('./notes.controller');
const logger = require('../../../logger');

// api to create notes
router.post('/', (req, res) => {
  logger.debug('Inside notes.router login');
  try {
    if (Object.keys(req.body).length === 0 && Object.keys(req.query.userId).length===0) {
      res.status(403).send({message:'Invalid input passsed'});
    } else {
      notesCtrl.createNote(req.body, req.query.userId).then((response) => {
        logger.debug('Inside notesCtrl.createNote success');
        res.status(response.status).send(response);
      },
      (err) => {
        logger.error('Error in notesCtrl.createNote error: ', err.message);
        res.status(err.status).send(err);
      });
    }
  } catch (err) {
    logger.error('Unexpected error in notesCtrl.createNote ', err);
    res.send({message: 'Failed to complete request'})
  }
});

// api to get notes by user
router.get('/', (req, res) => {
  logger.debug('Inside notes.router login');
  try {
    if (Object.keys(req.query.userId).length===0) {
      res.status(403).send({message:'Invalid input passsed'});
    } else {
      notesCtrl.getNote(req.query.userId).then((response) => {
        logger.debug('Inside notesCtrl.getNote success');
        res.status(200).send(response);
      },
      (err) => {
        logger.error('Error in notesCtrl.getNote error: ', err.message);
        res.status(403).send(err);
      });
    }
  } catch (err) {
    logger.error('Unexpected error in notesCtrl.getNote ', err);
    res.send({message: 'Failed to complete request'})
  }
});
// api to update notes
router.put('/:noteId', (req, res) => {
  logger.debug('Inside notes.router update note');
  try {    
      notesCtrl.updateNote(req.body, req.params.noteId).then((response) => {
        logger.debug('Inside notesCtrl.updateNote success');
        res.status(response.status).send(response);
      },
      (err) => {
        logger.error('Error in notesCtrl.updateNote error: ', err.message);
        res.status(err.status).send(err);
      });    
  } catch (err) {
    logger.error('Unexpected error in notesCtrl.createNote ', err);
    res.send({message: 'Failed to complete request'})
  }
});


router.delete('/:noteId', (req, res) => {
  logger.debug('Inside notes.router delete note');
  try {    
      notesCtrl.deleteNote(req.params.noteId).then((response) => {
        logger.debug('Inside notesCtrl.deleteNote success');
        res.status(response.status).send(response);
      },
      (err) => {
        logger.error('Error in notesCtrl.deleteNote error: ', err.message);
        res.status(err.status).send(err);
      });    
  } catch (err) {
    logger.error('Unexpected error in notesCtrl.deleteNote ', err);
    res.send({message: 'Failed to complete request'})
  }
});


// api to share notes
router.post('/share', (req, res) => {
  logger.debug('Inside notes.router login');
  try {
    if (Object.keys(req.body).length === 0 && Object.keys(req.query.email).length===0) {
      res.status(403).send({message:'Invalid input passsed'});
    } else {
      notesCtrl.shareNote(req.body, req.query.email).then((response) => {
        logger.debug('Inside notesCtrl.shareNote success');
        res.status(response.status).send(response);
      },
      (err) => {
        logger.error('Error in notesCtrl.createNote error: ', err.message);
        res.status(err.status).send(err);
      });
    }
  } catch (err) {
    logger.error('Unexpected error in notesCtrl.createNote ', err);
    res.send({message: 'Failed to complete request'})
  }
});

// api to share notes
router.post('/stream', (req, res) => {
  logger.debug('Inside notes.router login');
  try {
    if (Object.keys(req.body).length === 0 && Object.keys(req.query.userId).length===0) {
      res.status(403).send({message:'Invalid input passsed'});
    } else {
      notesCtrl.bulkUploadNote(req.body, req.query.userId).then((response) => {
        logger.debug('Inside notesCtrl.bulkUploadNote success');
        res.status(response.status).send(response);
      },
      (err) => {
        logger.error('Error in notesCtrl.bulkUploadNote error: ', err.message);
        res.status(err.status).send(err);
      });
    }
  } catch (err) {
    logger.error('Unexpected error in notesCtrl.bulkUploadNote ', err);
    res.send({message: 'Failed to complete request'})
  }
});

module.exports = router;