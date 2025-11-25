const Newsletter = require('../models/Newsletter');

const subscribeNewsletter = async (req, res) => {
  try {
    const { email } = req.body;

    // Validazione campo email obbligatorio
    if (!email) {
      return res.status(400).json({
        success: false,
        message: 'Email è obbligatoria'
      });
    }

    // Validazione formato email (deve contenere @)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Formato email non valido'
      });
    }

    // Controlla se l'email è già iscritta
    const existingSubscription = await Newsletter.findOne({ 
      email: email.trim().toLowerCase() 
    });

    if (existingSubscription) {
      return res.status(400).json({
        success: false,
        message: 'Email già iscritta'
      });
    }

    // Salva nuova iscrizione
    const newSubscription = new Newsletter({
      email: email.trim().toLowerCase()
    });

    await newSubscription.save();

    res.status(201).json({
      success: true,
      message: 'Iscritto!'
    });
  } catch (error) {
    console.error('Error subscribing to newsletter:', error);

    // Gestione errori di validazione Mongoose
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        success: false,
        message: Object.values(error.errors).map(e => e.message).join(', ')
      });
    }

    // Gestione errori di duplicazione (unique constraint)
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'Email già iscritta'
      });
    }

    res.status(500).json({
      success: false,
      message: 'Errore nell\'iscrizione alla newsletter'
    });
  }
};

module.exports = {
  subscribeNewsletter
};

