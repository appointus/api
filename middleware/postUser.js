const router = require('express').Router();

const regular= '/^([0-9]*)$/'
const  regularString = new RegExp('/^([0-9]*)$/');
const regularNumber=new RegExp('/[^A-Za-z]+/');
router.post('/cliets',(req,res,next)=>{
    if (!regularString.test(req?.body?.first_name) && !regularString.test(req?.body?.last_name) && !regularNumber.test(req?.body?.phone)) {
        next('error')
        res.status(500).send('user parametars is not valid example:first name = John,last name = Haikhel , phone = 380663422757')
        //res.send({error:'error'})
        return
    }
    next()
})    
module.exports = router;
