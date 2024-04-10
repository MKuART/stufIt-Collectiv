import Account from "../models/Account.js";
import Customer from "../models/Customer.js";
import Expenses from "../models/Expenses.js";
import Category from "../models/Category.js";
import { comparePassword, hashPassword } from "../middlewares/password/hashPassword.js";
import { issueJwt } from "../helpers/jwt.js"

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
    req.body.password = await hashPassword(req.body.password)
    const newCustomer = await Customer.create(req.body)
    
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
    req.body.password = await hashPassword(req.body.password)
    res.status(200).json(await Account.create(req.body));
  } catch (error) {
    error.status = 404;
    next(error);
  }
};

export const createExpenses = async (req, res, next) => {
  try {
    const newExpense = await Expenses.create(req.body);
    if (!newExpense){
      throw new Error(`Ausgabe konnte nicht erstellt werden.`)}

    const category = await Category.findById(req.body.category);
    if (!category){
      throw new Error(`Kategorie nicht gefunden.`)
    }
  
    if (req.body.cost > category.limitedBudget){
      throw new Error(`Nicht genügend Budget vorhanden, Ausgabe zu hoch.`)
    }

    await Category.updateMany(
      {_id: newExpense.category},
      {$inc: {limitedBudget: -newExpense.cost}}
    );

    await Category.updateMany(
      {_id: newExpense.category},
      {$push: {expense: newExpense._id}}
    );

    await Account.updateMany(
      {_id: newExpense.account},
      {$push: {expense: newExpense._id}}
    );
      
    res.status(200).json(newExpense)
  } catch (error) {
    error.status = 404;
    next(error);
  }
};

export const createCategory = async (req, res, next) => {
  try { 
    const newCategory = await Category.create(req.body);
    if (!newCategory){
      throw new Error(`Kategorie konnte nicht erstellt werden.`)}
    
    const account = await Account.findById(req.body.account);
    if (!account){
      throw new Error(`Account nicht gefunden.`)
    }

    if (req.body.limitedBudget > account.budget){
      throw new Error(`Nicht genügend Budget vorhanden, minimiere den eingegeben Wert.`)
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
    res.status(200).json(await Customer.findById(req.body.id, {deleted: false}));
  } catch (error) {
    next(error);
  }
};

export const findAccount = async (req, res, next) => {
  try {
    res.status(200).json(await Account.findById(req.body.id, {deleted: false}));
  } catch (error) {
    next(error);
  }
};

export const findCategory = async (req, res, next) => {
  try {
    res.status(200).json(await Category.findById(req.body.id, {deleted: false}));
  } catch (error) {
    next(error);
  }
};

export const findExpenses = async (req, res, next) => {
  try {
    res.status(200).json(await Expenses.findById(req.body.id, {deleted: false}));
  } catch (error) {
    next(error);
  }
};

// Update models
export const updateCustomer = async (req, res, next) => {
  try {
    const foundUser = await Customer.findById(req.body._id);

    if (!foundUser) {
      const error = new Error("User not found!")
      error.statusCode = 404;
      throw error;
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

    if (req.body.password.length > 3) {
      req.body.password = await hashPassword(req.body.password)
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

export const updateCategory = async (req, res, next) => {
  try{
    const foundCategory = await Category.findById(req.body._id)

    if(!foundCategory){
      const error = new Error("No category found!")
      error.statusCode = 404;
      throw error;
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
      const error = new Error("No expenses found!")
      error.statusCode = 404;
      throw error;
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
      const error = new Error("No account to delete!")
      error.statusCode = 404;
      next(error)
    }

    if(foundUser.deleted === "true"){
      const error = new Error("account already deleted")
      error.statusCode = 404;
      next(error)
    }
    foundUser.deleted = true
    await Account.updateOne(foundUser)
    res.clearCookie("jwt", {
      httpOnly: true,
      sameSite: "none",
    secure: true
    }).status(200).json({message: "Account successfully deleted!"})
  }catch(error){
    next(error)
  }
}

export const softDeleteCustomer = async(req, res, next) => {
  try{
    const foundUser = await Customer.findById(req.body._id)
    if(!foundUser){
      const error = new Error("No customer to delete!")
    error.statusCode = 404;
    next(error)
    }

    if(foundUser.deleted === "true"){
      const error = new Error("account already deleted")
      error.statusCode = 404;
      next(error)
    }
    foundUser.deleted = true
    await Account.updateOne(foundUser)
    res.clearCookie("jwt", {
      httpOnly: true,
      sameSite: "none",
    secure: true
    }).status(200).json({message: "Customer successfully deleted!"})
  }catch(error){
    next(error)
  }
}

export const softDeleteCategory = async(req, res, next) => {
  try{
    const foundUser = await Category.findById(req.body._id)
    if(!foundUser){
      const error = new Error("No category to delete!")
    error.statusCode = 404;
    next(error)
    }

    if(foundUser.deleted === "true"){
      const error = new Error("account already deleted")
      error.statusCode = 404;
      next(error)
    }
    foundUser.deleted = true
    await Account.updateOne(foundUser)
    res.clearCookie("jwt", {
      httpOnly: true,
      sameSite: "none",
    secure: true
    }).status(200).json({message: "Category successfully deleted!"})
  }catch(error){
    next(error)
  }
}

export const softDeleteExpenses = async(req, res, next) => {
  try{
    const foundUser = await Expenses.findById(req.body._id)
    if(!foundUser){
      const error = new Error("No expenses to delete!")
    error.statusCode = 404;
    next(error)
    }

    if(foundUser.deleted === "true"){
      const error = new Error("account already deleted")
      error.statusCode = 404;
      next(error)
    }
    foundUser.deleted = true
    await Account.updateOne(foundUser)
    res.clearCookie("jwt", {
      httpOnly: true,
      sameSite: "none",
    secure: true
    }).status(200).json({message: "Expenses successfully deleted!"})
  }catch(error){
    next(error)
  }
}

// Hard-delete
export const hardDeleteAccount = async(req, res, next) => {
  try{
   const deletedAccount = await Account.findByIdAndDelete(req.body._id)
   if(!deletedAccount){
    const error = new Error("No account to delete!")
    error.statusCode = 404;
    next(error)
   }
    res.clearCookie("jwt", {
      httpOnly: true,
      sameSite: "none",
    secure: true
    }).status(200).json({message: "Account deleted!", deletedUser: deletedAccount})
  }catch(error){
    next(error)
  }
}

export const hardDeleteCustomer = async(req, res, next) => {
  try{
   const deletedAccount = await Customer.findByIdAndDelete(req.body._id)
   if(!deletedAccount){
    const error = new Error("No customer to delete!")
    error.statusCode = 404;
    next(error)
   }
    res.clearCookie("jwt", {
      httpOnly: true,
      sameSite: "none",
    secure: true
    }).status(200).json({message: "Account deleted!", deletedUser: deletedAccount})
  }catch(error){
    next(error)
  }
}

// Hard-delete

// Log-In
export const accountLogin = async(req, res, next) => {
  try{
    const {email, password} = req.body;
    const searchEmail = await Account.findOne({ email })
    if(!searchEmail){
      const error = new Error("Email not found!")
      error.statusCode = 404;
      next(error)
    }
    const passwordCompare = await comparePassword(password, searchEmail.password)
    if(!passwordCompare) {
      const error = new Error("Password not found!")
      error.statusCode = 404;
      next(error)
    }

    const token = issueJwt(searchEmail);
    res.cookie("jwt", token, {
      httpOnly: true,
      sameSite: "none",
      secure: true
    })
    res.status(200).json({ message: "Login successful!"})
  }catch(error){
    next(error)
  }
}

export const customerLogin = async(req, res, next) => {
  try{
    const {email, password} = req.body;
    const searchEmail = await Customer.findOne({ email })
    if(!searchEmail){
      const error = new Error("Email not found!")
      error.statusCode = 404;
      next(error)
    }
    const passwordCompare = await comparePassword(password, searchEmail.password)
    if(!passwordCompare) {
      const error = new Error("Password not found!")
      error.statusCode = 404;
      next(error)
    }

    const token = issueJwt(searchEmail);
    res.cookie("jwt", token, {
      httpOnly: true,
      sameSite: "none",
      secure: true
    })
    res.status(200).json({ message: "Login successful!"})
  }catch(error){
    next(error)
  }
}

// Log-In

// Log-out

export const logout = async (req, res, next) => {
  try {
    res
      .clearCookie("jwt", {
        httpOnly: true,
        sameSite: "none",
      secure: true
      })
      .status(200)
      .send("User logged out");
  } catch (error) {
    next(error)
  }
};

// Log-out

// Log in Checker

export const isLoggedIn = async (req, res, next) => {
  const cookie = req.cookies.jwt;
  if (!cookie) {
    const error = new Error("Cookie not found!")
    error.statusCode = 404;
    next(error)
  }
  return res.status(200).send({ message: "Cookie sent" });
};

// Log in Checker

// Data

export const getAccountData = async (req, res, next) => {
  const userId = req.user.id;
  const search = await Account.findOne({ _id: userId });
  res.status(200).send({ search });
};

export const getCustomerData = async (req, res, next) => {
  const userId = req.user.id;
  const search = await Customer.findOne({ _id: userId });
  res.status(200).send({ search });
};

export const getCategoryData = async (req, res, next) => {
  const userId = req.user.id;
  const search = await Category.findOne({ _id: userId });
  res.status(200).send({ search });
};

export const getExpensesData = async (req, res, next) => {
  const userId = req.user.id;
  const search = await Expenses.findOne({ _id: userId });
  res.status(200).send({ search });
};

// Data

// Authorize

export const authorize = (roles = []) => {
  return (req, res, next) => {
    const token = req.headers["authorization"];

    if (!token) {
      return res.status(401).send("Access denied. No token provided.");
    }

    jwt.verify(token, secretKey, (error, decoded) => {
      if (error) return res.status(401).send("Invalid token.");

      if (!roles.includes(decoded.role)) {
        return res.status(403).json({ message: "Unauthorized" });
      }
      
      req.user = decoded;
      next();
    });
  }
}

// Authorize