const Web3 = require('web3');
const web3 = new Web3('https://mainnet.infura.io/YOUR_INFURA_KEY');

module.exports = async (req, res) => {
    const { address } = req.query; // Assume the address comes as a query parameter
    if (!address) {
        return res.status(400).json({ error: "Address is required" });
    }

    try {
        const balance = await web3.eth.getBalance(address);
        const tokenBalance = Web3.utils.fromWei(balance, 'ether'); // Convert to a more readable format

        return res.status(200).json({ balance: tokenBalance });

    } catch (error) {
        return res.status(500).json({ error: `An error occurred: ${error.message}` });
    }
};