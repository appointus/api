const router = require('express').Router()

router.put('/clients/:id', (req, res, next) => {
  check(req?.params?.id, res, next)
})

router.put('/clients/:id/activate', function (req, res, next) {
  check(req?.params?.id, res, next)
})
router.put('/clients/:id/deactivate', function (req, res, next) {
  check(req?.params?.id, res, next)
})
router.put('/appointments/:id', function (req, res, next) {
  check(req?.params?.id, res, next)
})
router.delete('/appointments/:id/delete', function (req, res, next) {
  check(req?.params?.id, res, next)
})

function check(id, res, next) {
  if (id.match(/^[0-9a-fA-F]{24}$/)) {
    next()
  } else {
    next('error')
    res.status(500).send('id is not mongo objectId')
  }
}
module.exports = router
