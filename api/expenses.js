// api/expenses.js

let expenses = []; 
// ⚠️ In-memory only: resets on cold start. 
// Good for demos / prototypes.

export default function handler(req, res) {
  // Enable JSON body parsing
  if (req.method === "GET") {
    return res.status(200).json({
      success: true,
      data: expenses
    });
  }

  if (req.method === "POST") {
    try {
      const { amount, description, category, date } = req.body || {};

      // Validate required fields
      if (
        amount === undefined ||
        !description ||
        !category ||
        !date
      ) {
        return res.status(400).json({
          success: false,
          error: "Missing required fields: amount, description, category, date"
        });
      }

      const newExpense = {
        id: expenses.length + 1,
        amount,
        description,
        category,
        date
      };

      expenses.push(newExpense);

      return res.status(201).json({
        success: true,
        message: "Expense added successfully",
        data: newExpense
      });

    } catch (error) {
      return res.status(500).json({
        success: false,
        error: "Internal Server Error",
        details: error.message
      });
    }
  }

  // Unsupported method
  return res.status(405).json({
    success: false,
    error: "Method Not Allowed"
  });
}
