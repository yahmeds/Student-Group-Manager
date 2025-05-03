const mongoose = require('mongoose');
const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    uppercase: true,
    trim: true
  },
  firstnames: {
    type: String,
    required: true,
    set: value => {
      return value
        .split(/,|\s+/) 
        .map(part => 
          part
            .trim()
            .toLowerCase() 
            .replace(/\b\w/g, l => l.toUpperCase()) 
        )
        .filter(part => part)
        .join(','); 
    },
    trim: true
  },
  number: {
    type: String,
    required: true,
    unique: true,  
    trim: true,
    validate: { 
      validator: function(v) {
        return /^\d+$/.test(v);
      },
      message: props => `${props.value} n'est pas un numéro valide!`
    }
  },


  group: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Group',  
  }
});



const Student = mongoose.model('Student', studentSchema);

module.exports = Student;
