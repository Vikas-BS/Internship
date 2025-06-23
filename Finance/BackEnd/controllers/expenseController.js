import Expense from '../models/Expense.js'
export const addExpense = async(req , res) =>{
    const {title,amount,category,description} = req.body;
    try{
        const expense = await Expense.create({
            user :req.userId,
            title,
            amount,
            category,
            description,
        

        })
        res.status(201).json(expense)
    }catch(err){
        res.status(500).json({message:err.message})

    }

}

export const getExpense = async(req , res)=>{
    try{
        const expenses = await Expense.find({user:userId}).sort({date:-1});
    res.json(expenses);
    }catch(err){
        res.status(500).json({message:err.message})
    }
    
}