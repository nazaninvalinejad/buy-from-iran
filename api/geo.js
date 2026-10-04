module.exports = async function handler(req, res) {
  const raw = req.headers['x-vercel-ip-country'];
  const country = Array.isArray(raw) ? raw[0] : (raw || null);
  res.setHeader('Cache-Control', 'no-store');
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.status(200).json({ country });
};
