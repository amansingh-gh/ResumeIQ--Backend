const validateToken = require('../middleware/validateToken')
const router = express.Router();

router.get("/current", validateToken, (req, res) => {
    res.json(req.user);
})

module.exports = router;