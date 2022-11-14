var mongoose = require('mongoose');
var Schema = mongoose.Schema;


const paperSchema = new Schema({
    paperid:{
        type:String,
        required: true,
    },
    courseNO: {
        type: String,
        required: true,
    },
    courseName: {
        type: String,
        required: true
    },
    courseDate:{
        type: String,
        required: true
    },
    examiners:{
        type: String,
        required: true
    },
    fileName:{
        type: String,
        required: true
    },
    createDate:{
        type: String,
        required: true
    },
    modifyDate:{
        type: String,
        required: true
    },

    
},  {
    collection:'paper'
}, {
    timestamps: true
});

mongoose.model('Paper',paperSchema);