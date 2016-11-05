var mongoose=require('mongoose');
var Schema =mongoose.Schema;

require('mongoose-currency').loadType(mongoose);
var Currency=mongoose.Types.Currency;

var commentSchema= new Schema(
    {
        rating:{
            type:Number,
            min:1,
            max:2,
            required:true
        },
        comment:{
            type:String,
            required:true
        },
        author:{
            type:String,
            required:true
        }
    },
    {
        timestamp:true
    }

);

var dishSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    comments:[commentSchema],
    image:{
        type:String,
        required:false
    },
    category:{
        type:String,
        required:true
    },
    label:{
        type:String,
        default:'',
        required:false
    },
    price:{
        type:Currency,
        required:true
    }

}, {
    timestamps: true
});

var Dishes=mongoose.model('Dish',dishSchema);

module.exports=Dishes;