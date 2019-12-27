let noteModel = require('./notes.entity');
let userModel = require('../users/users.entity');
let common = require('../../../common');
const uuidv1 = require('uuid/v1');
const logger = require('../../../logger');

const getNote = (userId) => {
  logger.debug('Inside notes.dao getNote method',userId);
  return new Promise((resolve, reject) => {
    noteModel.find({userId: userId}, function(err, notes) {
      if(err) {
        logger.error(err);
        reject({message: 'Internal Server Error', status: 500});
      } else if(notes.length > 0) {        
         resolve(notes);        
      }  else if(notes.length == 0) {        
         resolve(notes);        
      } 
    });
  });
};

const createNote = (noteInfo, userId) => {
  logger.debug('Inside notes.dao createNote method',userId);
  return new Promise((resolve, reject) => {    
        let newNote = new noteModel();
        newNote.userId = userId;
        newNote.noteId = uuidv1();
        newNote.title = noteInfo.title;
        newNote.text = noteInfo.text;
        newNote.state = noteInfo.state;
        newNote.createdOn = noteInfo.createdOn;
        newNote.save(function(error, addedNote) {
          if(error) {
            logger.error(error);
            reject({message: 'Internal Server Error', status: 500});
          } else {
            resolve({message: 'Successfully added the note', status: 201,note:addedNote, text: addedNote.text, id: addedNote.id});
          }
        });
      });
    };

  const updateNote = (noteInfo, noteId) => {
  logger.debug('Inside notes.dao updateNote method');
  return new Promise((resolve, reject) => {    
       noteModel.findOne({noteId: noteId}, function(err, note) {
          if(err) {
            logger.error(err);
            reject({message: 'Internal Server Error', status: 500});
          } else if(note) { 
            note.title = noteInfo.title;
            note.text = noteInfo.text;
            note.state = noteInfo.state;
            note.group = noteInfo.group;
            note.favourite = noteInfo.favourite;
            note.modifiedOn = noteInfo.modifiedOn; 
            note.save();    
            resolve({text: note.text, noteId:note.noteId, note:note, id:note._id, status: 200});        
          } else {
            reject({message: 'No notes found ', status: 403});
          }
       });
      });
    };


  const deleteNote = (noteId) => {
  logger.debug('Inside notes.dao deleteNote method');
  return new Promise((resolve, reject) => {    
       noteModel.remove({noteId: noteId}, function(err, note) {
          if(err) {
            logger.error(err);
            reject({message: 'Internal Server Error', status: 500});
          } else{                 
            resolve({message: 'deleted successfully', status: 200});        
          } 
       });
      });
    };


  const shareNote = (notes, email) => {
  logger.debug('Inside notes.dao shareNote method', email); 
  let errorMsg; 
  return new Promise((resolve, reject) => {
    if(!email){
        reject({message: 'email not provided', status: 403});
      }
    userModel.findOne({email:email},function(error,user){
      logger.debug('Inside notes.dao shareNote findOne method', user); 
      if(user == null){
        console.log('here')
        reject({message: 'user not found', status: 201});
      }
      else {
        notes.forEach(noteInfo =>{
        let newNote = new noteModel();
        newNote.userId = user.userId;
        newNote.noteId = uuidv1();
        newNote.title = noteInfo.title;
        newNote.text = noteInfo.text;
        newNote.state = noteInfo.state;
        newNote.createdOn = noteInfo.createdOn;
        newNote.save(function(error, addedNote) {
          if(error) {
            logger.error(error);
            errorMsg = errorMsg + error
            reject({message: err, status: 500});
          }
        });
      })
       
       if(error) {
            logger.error(error);
            errorMsg = errorMsg + error
            reject({message: 'Internal Server Error', status: 500});
        }
        else{
          resolve({message: 'notes saherd successfully', status: 201});
        }
      }
      
      
      }) 
      // if(errorMsg) {
      //       logger.error(error);
      //       errorMsg = errorMsg + error
      //       reject({message: errorMsg , status: 201});
      //     } else {
      //   resolve({message: 'Successfully shared the note', status: 201});
      //  }   
       
      });
    };
  const bulkUploadNote = (notes,userId) => {
  logger.debug('Inside notes.dao bulkUploadNote method');
  return new Promise((resolve, reject) => {    
       noteModel.insertMany(notes, function(err) {
          if(err) {
            logger.error(err);
            reject({message: 'Internal Server Error', status: 500});
          } else{                 
            resolve({message: 'notes created successfully', status: 200});        
          } 
       });
      });
    };

 module.exports = {
  createNote
  , getNote
  , updateNote
  , deleteNote
  , shareNote
  , bulkUploadNote
 }
