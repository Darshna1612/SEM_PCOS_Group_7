var mongoose = require('mongoose');
var Schema = mongoose.Schema;


const accountSchema = new Schema({
    name:{
        type:String,
        required: true,
    },
    account: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    paper:{
        type: Array,
        required: true
    }
    
},  {
    collection:'userInfo'
}, {
    timestamps: true
});

mongoose.model('Account',accountSchema);
