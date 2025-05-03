const express = require('express');
const router = express.Router();
const Group = require('../models/group.model');
const Student = require('../models/student.model');
const mongoose = require('mongoose');


router.post('/init', async (req, res) => {
  try {
    for (let i = 1; i <= 6; i++) {
      await Group.findOneAndUpdate(
        { number: i },
        { 
          $setOnInsert: { 
            number: i,
            students: [] 
          }
        },
        { 
          upsert: true,
          setDefaultsOnInsert: true 
        }
      );
    }
    res.status(201).json({ message: "Groupes initialisés (sans écraser les étudiants)" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


router.get('/', async (req, res) => {
  try {
    const groups = await Group.find().populate('students');
    res.status(200).json(groups);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/assign', async (req, res) => {
  const { studentId, groupNumber } = req.body;

  if (!mongoose.Types.ObjectId.isValid(studentId)) {
    return res.status(400).json({ message: "ID étudiant invalide" });
  }

  if (groupNumber !== 'none' && (groupNumber < 1 || groupNumber > 6)) {
    return res.status(400).json({ message: "Numéro de groupe invalide" });
  }

  try {
    const student = await Student.findById(studentId);
    if (!student) {
      return res.status(404).json({ message: "Étudiant non trouvé" });
    }

    await Group.updateMany(
      { students: studentId },
      { $pull: { students: studentId } }
    );

    if (groupNumber !== 'none') {
      await Group.findOneAndUpdate(
        { number: groupNumber },
        { $addToSet: { students: studentId } },
        { upsert: true }
      );
      
      return res.status(200).json({
        message: `Étudiant assigné au groupe ${groupNumber} avec succès`,
      });
    }

    res.status(200).json({ 
      message: "Étudiant retiré des groupes avec succès" 
    });

  } catch (err) {
    res.status(500).json({ 
      message: err.code === 11000 
        ? "L'étudiant est déjà dans ce groupe" 
        : err.message 
    });
  }
});

router.get('/:number/students', async (req, res) => {
  try {
    if (req.params.number === 'none') {
      const students = await Student.find({
        _id: { $nin: (await Group.distinct('students')) }
      });
      return res.status(200).json(students);
    }

    const groupNumber = parseInt(req.params.number);
    if (groupNumber < 1 || groupNumber > 6) {
      return res.status(400).json({ message: "Numéro de groupe invalide" });
    }

    const group = await Group.findOne({ number: groupNumber })
      .populate('students');
    
    res.status(200).json(group ? group.students : []);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});




module.exports = router;
