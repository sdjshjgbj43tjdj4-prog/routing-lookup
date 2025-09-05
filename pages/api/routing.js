// pages/api/routing.js
const routingData = require('../../routing.json'); // <-- two ../ from api/ to root

function unique(arr) {
  return [...new Set(arr)];
}

module.exports = (req, res) => {
  const { action, state, city_ascii, bank } = req.query;

  if (action === 'states') {
    const states = unique(routingData.map(r => r.state));
    res.status(200).json(states);
    return;
  }

  if (action === 'cities' && state) {
    const cities = unique(
      routingData.filter(r => r.state === state).map(r => r.city_ascii)
    );
    res.status(200).json(cities);
    return;
  }

  if (state && city_ascii && bank) {
    const record = routingData.find(
      r =>
        r.state === state &&
        r.city_ascii === city_ascii &&
        r.bank.toLowerCase() === bank.toLowerCase()
    );
    if (record) {
      res.status(200).json(record);
    } else {
      res.status(404).json({ error: 'Routing number not found' });
    }
    return;
  }

  res.status(400).json({ error: 'Invalid request' });
};
