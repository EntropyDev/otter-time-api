import mongoose, {Schema} from "mongoose";

const UserSchema = new Schema({
    first_name: {type: String, required: true, maxlength:50},
    second_name: {type: String, maxlength:50 },
    email: {type: String, required: true, unique:true, maxlength:50,
        validate: {
            validator: function(v) {
                return /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/.test(v)
            }
        }
    }, 
    username: {type: String, required: true, unique:true, maxlength:20, 
        validate:{
            validator: function(v){
            return /^[a-zA-Z][a-zA-Z0-9_]{3,24}$(?<!_)$/.test(v)
            }
        }
    },
    password: {type:String, require: true},
    photo_url: {type: String, default:'dummy'},
    is_pro: {type: Boolean, default:false},
    is_female: {type: Boolean, default:false},
    purchased_items: {type: Array},
    country: {type: String},
    age: {type: Number, min: 18, max: 65},
    wallet: {type: Number, default:0},
    stage: {type: String, default:'A1'},
    streak: {type:Number, default:0},
    data: {
        type: Object, default:{}
    },
    created_at: {
        type: Date,
        default: Date.now,
      }
    ,
    role: {type:Number, deafult:0}
})

export const User = mongoose.model('User',UserSchema)
