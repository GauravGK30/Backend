const express = require('express');

const {handleGetAllUsers,handleGetUserbyID,handleUpdateUserbyID,handleDeleteUserbyID,handleCreateNewUser} = require('../controller/user');

const router = express.Router();


router.route("/")
.get(handleGetAllUsers)
.post(handleCreateNewUser);


router.route('/:id')
.get(handleGetUserbyID)
.patch(handleUpdateUserbyID)
.delete(handleDeleteUserbyID);

module.exports = router;