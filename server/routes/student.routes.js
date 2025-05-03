const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const Student = require('../models/student.model');

router.post('/', async (req, res) => {  
  const { name, firstnames, number } = req.body;
  

  try {
    const student = new Student({ name, firstnames, number });
    await student.save();
    res.status(201).json(student);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const students = await Student.find({});
    res.status(200).json(students);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


router.delete('/', async (req, res) => {
  try {
    await Student.deleteMany({});
    res.status(200).json({ message: "Base de données vidée avec succès" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


router.delete('/:id', async (req, res) => {
  const studentId = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(studentId)) {
    return res.status(400).json({ message: "ID invalide" });
  }

  try {
    const result = await Student.deleteOne({ _id: studentId });
    
    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Étudiant non trouvé" });
    }

    res.status(200).json({ message: "Étudiant supprimé avec succès" });
  } catch (err) {
    console.error('Erreur de suppression:', err);
    res.status(500).json({ message: err.message });
  }
});


router.put('/:id', async (req, res) => {
  const { name, firstnames, number } = req.body;
  
  try {
    const student = await Student.findByIdAndUpdate(
      req.params.id,
      { name, firstnames },
      { new: true } 
    );

    if (!student) {
      return res.status(404).json({ message: "Étudiant non trouvé" });
    }

    res.status(200).json(student);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
 


module.exports = router;
