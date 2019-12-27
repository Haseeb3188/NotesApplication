const notesService =  require('./notes.service')
const logger = require('../../../logger');

// Handler to create note
const createNote = (note, userId) => {
  logger.debug('Inside notes.controller createNote method');
  return notesService.createNote(note, userId);
}

// Handler to get note
const getNote = (userId) => {
  logger.debug('Inside notes.controller getNote method');
  return notesService.getNote(userId);
}

// Handler to update note
const updateNote = (note, noteId) => {
  logger.debug('Inside notes.controller updateNote method');
  return notesService.updateNote(note, noteId);
}

// Handler to update note
const deleteNote = (noteId) => {
  logger.debug('Inside notes.controller deleteNote method');
  return notesService.deleteNote(noteId);
}


// Handler to update note
const shareNote = (notes,email) => {
  logger.debug('Inside notes.controller shareNote method');
  return notesService.shareNote(notes,email);
}

// Handler to update note
const bulkUploadNote = (notes,userId) => {
  logger.debug('Inside notes.controller bulkUploadNote method');
  return notesService.bulkUploadNote(notes,userId);
}
// // Handler to register user
// const registerUser = (userDetails) => {
//   logger.debug('Inside users.controller registerUser method');
//   return usersService.registerUser(userDetails);
// }


module.exports = {
  createNote
  ,getNote
  ,updateNote
  ,deleteNote
  ,shareNote
  ,bulkUploadNote
}
