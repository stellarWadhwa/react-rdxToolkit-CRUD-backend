const {addUser, getCreatedUsers,assignUserRoles, deleteUser, updateUserRole} = require("../controllers/adminControlls");

const router = require("express").Router();

router.post('/adduser',addUser);
router.post('/getcreateduser',getCreatedUsers)
router.post('/assignuserrole',assignUserRoles)
router.post('/deleteuser',deleteUser)
router.post('/updateuserrole', updateUserRole)

module.exports = router;