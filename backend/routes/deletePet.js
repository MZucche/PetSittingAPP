const express = require('express');
const router = express.Router();
const Pet = require('../schema/pet'); // Asegúrate de que la ruta sea correcta

// Endpoint para eliminar una mascota por su ID
router.delete('/:id', async (req, res) => {
  try {
    const petId = req.params.id;
    const deletedPet = await Pet.findByIdAndDelete(petId);
    if (!deletedPet) {
      return res.status(404).json({ error: 'Pet not found' });
    }
    res.json({ message: 'Pet deleted successfully', pet: deletedPet });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
