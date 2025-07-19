const verifyToken = (req, res) => {
    res.status(200).send({ message: 'Token Testiqlendi.', status: true, user_login: req.user.username, role: req.user.role });
};

module.exports = verifyToken;
