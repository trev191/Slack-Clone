const db = require('./db_dmstream');

exports.getAllDMs = async (req, res) => {
  const user = req.user;
  const dms = await db.getDMs(user.id);
  if (dms) {
    res.status(200).json(dms);
  } else {
    res.status(404).send();
  }
}