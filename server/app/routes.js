const router = require('express').Router();
const routes = require('../routes');

router.get('/', (req, res) => {
    res.send({ message: 'Success' });
});
router.use(routes);

module.exports = router;
