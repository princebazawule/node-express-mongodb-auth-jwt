module.exports = (app) => {
    const users = require("./user.controller")
    const VerifyToken = require('../auth/verifyToken')
    
    const router = require("express").Router()
  
    // create create
    router.post("/", users.createOne)
  
    // user findAll
    router.get("/", users.findAll)
  
    // user findOne
    router.get("/:id", users.findOne)

    // user update
    router.put("/:id", /*VerifyToken,*/ users.updateOne)

    // user delete
    router.delete("/:id", users.deleteOne)

    // user deleteAll
    router.delete("/", users.deleteAll)
  
    app.use("/api/users", router)
}
  