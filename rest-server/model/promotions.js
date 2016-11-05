var mongoose=require('mongoose');
var Schema=mongoose.Schema;

require('mongoose-currency').loadType(mongoose);
var Currency = mongoose.Types.Currency;
var promotionSchema=new Schema(
    {
        name:{
            type:String,
            required:true,
            unique:true
        },
        image:{
            type:String,
            required:false
        },
        label:{
            type:String,
            default:''
        },
        price:{
            type:Currency,
            required:true
        },
        description:{
            type:String,
            required:true
        }
    },
    {
        timestamp:true
    }

);

var Promotions= mongoose.model('Promotion',promotionSchema);

module.exports=Promotions;
