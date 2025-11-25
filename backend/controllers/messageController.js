const Message = require('../models/Message');

const createMessage = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // Validazione campi obbligatori
    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        error: 'Tutti i campi sono obbligatori (nome, email, messaggio)'
      });
    }

    // Validazione formato email (deve contenere @ e .)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        error: 'Formato email non valido'
      });
    }

    // Validazione lunghezza messaggio (almeno 10 caratteri)
    if (message.trim().length < 10) {
      return res.status(400).json({
        success: false,
        error: 'Il messaggio deve contenere almeno 10 caratteri'
      });
    }

    // Salvataggio nel database
    const newMessage = new Message({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      message: message.trim()
    });

    await newMessage.save();

    res.status(201).json({
      success: true,
      message: 'Messaggio salvato'
    });
  } catch (error) {
    console.error('Error saving message:', error);

    // Gestione errori di validazione Mongoose
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        success: false,
        error: Object.values(error.errors).map(e => e.message).join(', ')
      });
    }

    // Gestione errori di duplicazione (se unique: true sull'email)
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        error: 'Un messaggio con questa email esiste già'
      });
    }

    res.status(500).json({
      success: false,
      error: 'Errore nel salvataggio del messaggio'
    });
  }
};

module.exports = {
  createMessage
};

