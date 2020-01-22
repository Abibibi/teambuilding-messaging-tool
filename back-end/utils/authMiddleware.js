module.exports = (req, res, next) => {
    if(req.session && req.session.user) {
      next();
    } else {
      res.status(403).send({ errorMessage: 'L\'utilisateur n\'est pas connecté.' });
    }
};