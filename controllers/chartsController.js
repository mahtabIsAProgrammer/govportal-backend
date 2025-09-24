// controllers/dashboardController.ts
import db from "../config/db.js";

export const getRequestsByStatus = async (req, res) => {
  try {
    const result = await db.query(`
          SELECT status, COUNT(*) AS count
          FROM requests
          GROUP BY status
        `);
    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching:", error);
    res.status(500).json({ message: "Failed to fetch" });
  }
};

export const getRequestsByService = async (req, res) => {
  try {
    const result = await db.query(`
        SELECT s.name AS service_name, COUNT(r.id) AS count
        FROM requests r
        JOIN services s ON r.service_id = s.id
        GROUP BY s.name
      `);
    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching:", error);
    res.status(500).json({ message: "Failed to fetch" });
  }
};

export const getRequestsByMonth = async (req, res) => {
  try {
    const result = await db.query(`
        SELECT TO_CHAR(created_at, 'YYYY-MM') AS month, COUNT(*) AS count
        FROM requests
        GROUP BY month
        ORDER BY month
      `);
    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching:", error);
    res.status(500).json({ message: "Failed to fetch" });
  }
};

// 4. Payments per Month
export const getPaymentsByMonth = async (req, res) => {
  try {
    const result = await db.query(`
        SELECT TO_CHAR(p.payment_date, 'YYYY-MM') AS month, SUM(p.amount) AS total_amount
        FROM payments p
        GROUP BY month
        ORDER BY month
      `);
    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching:", error);
    res.status(500).json({ message: "Failed to fetch" });
  }
};

// 5. Payments by Service
export const getPaymentsByService = async (req, res) => {
  try {
    const result = await db.query(`
        SELECT s.name AS service_name, SUM(p.amount) AS total_amount
        FROM payments p
        JOIN requests r ON p.request_id = r.id
        JOIN services s ON r.service_id = s.id
        GROUP BY s.name
      `);
    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching:", error);
    res.status(500).json({ message: "Failed to fetch" });
  }
};

// 6. Total Citizens
export const getTotalCitizens = async (req, res) => {
  try {
    const result = await db.query(
      `SELECT COUNT(*) AS total_citizens 
         FROM users 
         WHERE role = 'citizen'`
    );
    res.json(result.rows[0]);
  } catch (error) {
    console.error("Error fetching:", error);
    res.status(500).json({ message: "Failed to fetch" });
  }
};

// 6. Total Officers
export const getTotalUsers = async (req, res) => {
  try {
    const result = await db.query(`SELECT COUNT(*) AS total_users FROM users`);
    res.json(result.rows[0]);
  } catch (error) {
    console.error("Error fetching:", error);
    res.status(500).json({ message: "Failed to fetch" });
  }
};

export const getTotalOfficers = async (req, res) => {
  try {
    const result = await db.query(
      `SELECT COUNT(*) AS total_officers 
         FROM users 
         WHERE role = 'officer'`
    );
    res.json(result.rows[0]);
  } catch (error) {
    console.error("Error fetching:", error);
    res.status(500).json({ message: "Failed to fetch" });
  }
};

export const getTotalAdmins = async (req, res) => {
  try {
    const result = await db.query(
      `SELECT COUNT(*) AS total_admins 
         FROM users 
         WHERE role = 'admin'`
    );
    res.json(result.rows[0]);
  } catch (error) {
    console.error("Error fetching:", error);
    res.status(500).json({ message: "Failed to fetch" });
  }
};

// 6. Total Head department
export const getTotalDepartmentHead = async (req, res) => {
  try {
    const result = await db.query(
      `SELECT COUNT(*) AS total_dept_head 
         FROM users 
         WHERE role = 'department_head'`
    );
    res.json(result.rows[0]);
  } catch (error) {
    console.error("Error fetching:", error);
    res.status(500).json({ message: "Failed to fetch" });
  }
};

// 8. Requests per Officer
export const getRequestsByOfficer = async (req, res) => {
  try {
    const result = await db.query(`
        SELECT u.username AS officer, COUNT(r.id) AS requests_handled
        FROM requests r
        JOIN users u ON r.reviewed_by = u.id
        WHERE r.reviewed_by IS NOT NULL
        GROUP BY u.username
      `);
    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching:", error);
    res.status(500).json({ message: "Failed to fetch" });
  }
};

// 9. Approval vs Rejection Rates
export const getApprovalRejectionRates = async (req, res) => {
  try {
    const result = await db.query(`
        SELECT status, COUNT(*) AS count
        FROM requests
        WHERE status IN (1, 2)
        GROUP BY status
      `);
    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching:", error);
    res.status(500).json({ message: "Failed to fetch" });
  }
};
