import mongoose from 'mongoose';

const expenseSchem = new mongoose.Schema({
  user:{
    type : mongoose.Schema.Types.ObjectId, // It’s a special type in Mongoose used to reference another document in a different collection — like a foreign key in SQL.
    ref : 'User',
    required: true

  },
  title:{
    type : String,
    required : true,
    trim : true
  },
  amount:{
    type:Number,
    required:true,
    min: 100
  },
  category:{
    type:String,
    enum:['Food', 'Transport', 'Bills', 'Shopping', 'Entertainment', 'Healthcare', 'Others'],
    default:'Others'
  },
  description:{
    type:String,
    trim:true
  },


},{timestamps:true});

export default mongoose.model('Expense',expenseSchem);