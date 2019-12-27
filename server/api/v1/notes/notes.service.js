const notesDAO =  require('./notes.dao')
const logger = require('../../../logger');

// Handler to create note
const createNote = (note, userId) => {
  logger.debug('Inside notes.notesDAO createNote method');
  return notesDAO.createNote(note, userId);
}

// Handler to get note
const getNote = (userId) => {
  logger.debug('Inside notes.notesDAO getNote method');
  return notesDAO.getNote(userId);
}

// Handler to update note
const updateNote = (note, noteId) => {
  logger.debug('Inside notes.notesDAO updateNote method');
  return notesDAO.updateNote(note, noteId);
}

// Handler to update note
const deleteNote = (noteId) => {
  logger.debug('Inside notes.notesDAO deleteNote method');
  return notesDAO.deleteNote(noteId);
}

const shareNote = (notes,email) => {
  logger.debug('Inside notes.notesDAO shareNote method');
  return notesDAO.shareNote(notes,email);
}

const bulkUploadNote = (notes,userId) => {
  logger.debug('Inside notes.notesDAO bulkUploadNote method');
  return notesDAO.bulkUploadNote(notes,userId);
}
// // Handler to register user
// const registerUser = (userDetails) => {
//   logger.debug('Inside users.usersDAO registerUser method');
//   return usersDAO.registerUser(userDetails);
// }


module.exports = {
  createNote
  , getNote
  ,updateNote
  ,deleteNote
  ,shareNote
  ,bulkUploadNote
}
