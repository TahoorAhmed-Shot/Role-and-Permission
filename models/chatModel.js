const mongoose = require("mongoose")
const { Schema } = mongoose;

const cahtSchema = new Schema({

  userId: [{
        type:mongoose.Schema.Types.ObjectId,
        ref:'UserInfo'
    }],
    chatName: {
        type: String,
        require: true,
        min: [2],


    },
    isGroupChat: {
        type: String,
        require: true,
        unique: true


    },
    latestMessage:{
       type:mongoose.Schema.Types.ObjectId,
       ref:'Message'
    },
    groupAdmine:{
     type:mongoose.Schema.Types.ObjectId,
        ref:'UserInfo'
    }
  
}
,{
    timestamps:true
}
);

module.exports = mongoose.model('chatData', cahtSchema);