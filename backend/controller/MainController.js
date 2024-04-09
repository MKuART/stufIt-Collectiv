import Account from "../models/Account.js";
import Customer from "../models/Customer.js";
import Expenses from "../models/Expenses.js";
import Category from "../models/Category.js";

// To get all Models

export const AllCustomers = async (req, res, next) => {
  try {
    res.status(200).json(await Customer.find());
  } catch (error) {
    error.status = 404;
    next(error);
  }
};

export const AllAccounts = async (req, res, next) => {
  try {
    res.status(200).json(await Account.find());
  } catch (error) {
    error.status = 404;
    next(error);
  }
};

export const AllExpenses = async (req, res, next) => {
  try {
    res.status(200).json(await Expenses.find());
  } catch (error) {
    error.status = 404;
    next(error);
  }
};

export const AllCategorys = async (req, res, next) => {
  try {
    res.status(200).json(await Category.find());
  } catch (error) {
    error.status = 404;
    next(error);
  }
};

// Create Section

export const createCustomer = async (req, res, next) => {
  try {
    
      const newCustomer = await Customer.create({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        password: req.body.password,
        account: req.body.account
      })
    
      await Account.updateMany(

      {_id: newCustomer.account},
      {$push: {customer: newCustomer._id}}
      );

      res.status(200).json(newCustomer);
  } catch (error) {
    error.status = 404;
    next(error);
  }
};

export const createAccount = async (req, res, next) => {
  try {
    res.status(200).json(
      await Account.create({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        password: req.body.password,
        customer: req.body.customer,
        budget: req.body.budget,
      })
    );
  } catch (error) {
    error.status = 404;
    next(error);
  }
};
/*
export const createExpenses = async (req, res, next) => {
  try {
    res.status(200).json(
      await Expenses.create({
        description: req.body.description,
        cost: req.body.cost,
      })
    );
  } catch (error) {
    error.status = 404;
    next(error);
  }
};
*/
export const createExpenses = async (req, res, next) => {
  try {
    
      const newExpense = await Expenses.create({
        description: req.body.description,
        cost: req.body.cost,
        account: req.body.account,
        category: req.body.category
      });

    if (!newExpense){
      throw new Error(`Ausgabe konnte nicht erstellt werden.`);
    }

    await Category.updateMany(

      {_id: newExpense.category},
      {$inc: {limitedBudget: -newExpense.cost}}
      );
      

      res.status(200).json(newExpense)
  } catch (error) {
    error.status = 404;
    next(error);
  }
};

export const createCategory = async (req, res, next) => {
  try {
    
      const newCategory = await Category.create({
        name: req.body.name,
        limitedBudget: req.body.limitedBudget,
        account: req.body.account,
        expense: req.body.expense
      });

    if (!newCategory){
      throw new Error(`Kategorie konnte nicht erstellt werden.`);
    }

    await Account.updateMany(

      {_id: newCategory.account},
      {$inc: {budget: -newCategory.limitedBudget}}
    );
    
    await Account.updateMany(

      {_id: newCategory.account},
      {$push: {category: newCategory._id}}
      );

      res.status(200).json(newCategory)
  } catch (error) {
    error.status = 404;
    next(error);
  }
};

// Find ID
export const findCustomer = async (req, res, next) => {
  try {
    res.status(200).json(await Customer.findById(req.body.id));
  } catch (error) {
    next(error);
  }
};

export const findAccount = async (req, res, next) => {
  try {
    res.status(200).json(await Account.findById(req.body.id));
  } catch (error) {
    next(error);
  }
};

export const findCategory = async (req, res, next) => {
  try {
    res.status(200).json(await Category.findById(req.body.id));
  } catch (error) {
    next(error);
  }
};

export const findExpenses = async (req, res, next) => {
  try {
    res.status(200).json(await Expenses.findById(req.body.id));
  } catch (error) {
    next(error);
  }
};

// Update models
export const updateCustomer = async (req, res, next) => {
  try {
    const foundUser = await Customer.findById(req.body._id);

    if (!foundUser) {
      return res.status(404).json({ message: "User not found!" });
    }

    if (req.body.firstname) {
      foundUser.firstname = req.body.firstname;
    }

    if (req.body.lastname) {
      foundUser.lastname = req.body.lastname;
    }

    if (req.body.email) {
      foundUser.email = req.body.email;
    }

    if (req.body.password) {
      foundUser.password = req.body.password;
    }

    await Customer.updateMany(foundUser);

    res
      .status(200)
      .json({
        message: "Customer successful updated!",
        NewCustomer: foundUser,
      });
  } catch (error) {
    error.status = 404;
    next(error);
  }
};

export const updateAccount = async (req, res, next) => {
  try {
    
    const updatedAccount = await Account.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    res.json(updatedAccount);
  } catch (err) {
    next(err);
  }
}



/* Michas Code
export const updateAccount = async (req, res, next) => {
  try {
    const foundUser = await Account.findByIdAndUpdate(req.params.id);

    if (!foundUser) {
      return res.status(404).json({ message: "Account not found!" });
    }

    if (req.body.firstname) {
      foundUser.firstname = req.body.firstname;
    }

    if (req.body.lastname) {
      foundUser.lastname = req.body.lastname;
    }

    if (req.body.email) {
      foundUser.email = req.body.email;
    }

    if (req.body.password) {
      foundUser.password = req.body.password;
    }

    if (req.body.budget) {
      foundUser.budget = req.body.budget;
    }

    await Customer.updateMany(foundUser);

    res
      .status(200)
      .json({ message: "Account successful updated!", NewCustomer: foundUser });
  } catch (error) {
    error.status = 404;
    next(error);
  }
};
*/

export const updateCategory = async (req, res, next) => {
  try{
    const foundCategory = await Category.findById(req.body._id)

    if(!foundCategory){
      res.status(404).json({message: "No category found!"})
    }

    if(req.body.name){
      foundCategory.name = req.body.name
    }

    if(req.body.limitedBudget){
      foundCategory.limitedBudget = req.body.limitedBudget
    }

    await Category.updateMany(findCategory)

    res.status(200).json({message: "Category successful updated!", newCategory: foundCategory})
  }catch(error){
    next(error)
  }
}

export const updateExpenses = async (req, res, next) => {
  try{
    const foundExpenses = await Expenses.findById(req.body._id)

    if(!foundExpenses){
      res.status(404).json({message: "No expenses found!"})
    }

    if(req.body.description){
      foundExpenses.description = req.body.description
    }

    if(req.body.cost){
      foundExpenses.cost = req.body.cost
    }

    await Category.updateMany(foundExpenses)

    res.status(200).json({message: "Expenses successful updated!", newCategory: foundExpenses})
  }catch(error){
    next(error)
  }
}

// Soft-Delete

export const softDeleteAccount = async(req, res, next) => {
  try{
    const foundUser = await Account.findById(req.body._id)
    if(!foundUser){
      return res.status(404).json({ message: "Account not found!" });
    }
    foundUser.deleted = true
    await Account.updateOne(foundUser)
    res.status(200).json({message: "Account successfully deleted!"})
  }catch(error){
    next(error)
  }
}

export const softDeleteCustomer = async(req, res, next) => {
  try{
    const foundUser = await Customer.findById(req.body._id)
    if(!foundUser){
      return res.status(404).json({ message: "Customer not found!" });
    }
    foundUser.deleted = true
    await Account.updateOne(foundUser)
    res.status(200).json({message: "Customer successfully deleted!"})
  }catch(error){
    next(error)
  }
}

export const softDeleteCategory = async(req, res, next) => {
  try{
    const foundUser = await Category.findById(req.body._id)
    if(!foundUser){
      return res.status(404).json({ message: "Category not found!" });
    }
    foundUser.deleted = true
    await Account.updateOne(foundUser)
    res.status(200).json({message: "Category successfully deleted!"})
  }catch(error){
    next(error)
  }
}

export const softDeleteExpenses = async(req, res, next) => {
  try{
    const foundUser = await Expenses.findById(req.body._id)
    if(!foundUser){
      return res.status(404).json({ message: "Expenses not found!" });
    }
    foundUser.deleted = true
    await Account.updateOne(foundUser)
    res.status(200).json({message: "Expenses successfully deleted!"})
  }catch(error){
    next(error)
  }
}

// Hard-delete

export const hardDeleteAccount = async(req, res, next) => {
  try{
   const deletedAccount = await Account.findByIdAndDelete(req.body._id)
   if(!deletedAccount){
    res.status(404).json({message: "No account to delete!"})
   }
    res.status(200).json({message: "Account deleted!", deletedUser: deletedAccount})
  }catch(error){
    next(error)
  }
}

export const hardDeleteCustomer = async(req, res, next) => {
  try{
   const deletedAccount = await Customer.findByIdAndDelete(req.body._id)
   if(!deletedAccount){
    res.status(404).json({message: "No customer to delete!"})
   }
    res.status(200).json({message: "Account deleted!", deletedUser: deletedAccount})
  }catch(error){
    next(error)
  }
}