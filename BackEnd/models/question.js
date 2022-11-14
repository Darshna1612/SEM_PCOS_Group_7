var mongoose = require('mongoose');
var Schema = mongoose.Schema;


const questionSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    total: {
        type: String,
        required: true
    },
    subquestion:{
        type:Array,
    },
    qid:{
        type:Number,
        required:true,
    },
    comment:{
        type:Array,
    },
    paperid: {
        type: String,
        required: true
    },

    
},  {
    collection:'question'
}, {
    timestamps: true
});

mongoose.model('Question',questionSchema);