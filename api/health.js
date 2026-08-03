module.exports = async function handler(req, res) {
  res.status(200).json({
    status: 'ok',
    databaseConfigured: Boolean(process.env.MONGO_URI),
  });
};