// walletController.js
const Wallet = require('../models/Wallet');

const getWalletBalance = async (req, res) => {
  try {
    if (!req.user || !req.user._id) {
      return res.status(401).json({
        success: false,
        error: 'User not authenticated'
      });
    }

    const userId = req.user._id;
    
    let wallet = await Wallet.findOne({ userId });
    
    if (!wallet) {
      wallet = await Wallet.create({
        userId,
        balance: 0
      });
    }

    res.status(200).json({
      success: true,
      data: {
        balance: wallet.balance,
        userId: wallet.userId
      }
    });

  } catch (error) {
    console.error('Wallet fetch error:', error);
    res.status(500).json({
      success: false,
      error: 'Error retrieving wallet balance'
    });
  }
};

const updateWalletBalance = async (req, res) => {
  try {
    if (!req.user || !req.user._id) {
      return res.status(401).json({
        success: false,
        error: 'User not authenticated'
      });
    }

    const { amount } = req.body;
    const userId = req.user._id;

    // Validate amount
    if (!amount || isNaN(amount) || amount <= 0) {
      return res.status(400).json({
        success: false,
        error: 'Please provide a valid positive amount'
      });
    }

    // Find and update wallet in one atomic operation
    let wallet = await Wallet.findOneAndUpdate(
      { userId },
      { $inc: { balance: amount } },
      { new: true, upsert: true }
    );

    res.status(200).json({
      success: true,
      data: {
        balance: wallet.balance,
        userId: wallet.userId
      }
    });

  } catch (error) {
    console.error('Wallet update error:', error);
    res.status(500).json({
      success: false,
      error: 'Error updating wallet balance'
    });
  }
};

module.exports = {
  getWalletBalance,
  updateWalletBalance
};