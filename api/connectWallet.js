const authenticationAdapter = require('./authenticationAdapter');

module.exports = async (req, res) => {
  if (req.method === 'POST') {
    try {
        const walletConnection = await rainbowKit.connect(); 
      if (walletConnection) {
        res.status(200).json({status: 'success', message: 'Wallet connected'});
      } else {
        res.status(400).json({status: 'failure', message: 'Could not connect wallet'});
      }
    } catch (error) {
      res.status(500).json({status: 'error', message: `An error occurred: ${error.message}`});
    }
  } else {
    res.status(405).json({status: 'error', message: 'Method not allowed'});
  }
};