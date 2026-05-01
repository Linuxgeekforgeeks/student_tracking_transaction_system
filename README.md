
# 🧾 📘 System Overview — Student Money Tracking System

## 🎯 Purpose

This system is designed to help teachers track money sent by parents to students through agents.
It focuses on **recording, monitoring, and reporting transactions** in a simple and practical way.

Unlike complex financial systems, this solution is built around **real-world messaging workflows** where:

* Parents send money via agents
* Parents notify the teacher (you) with details
* Teachers record the transaction in the system

---

# 🧠 Core Idea (How It Works)

The system revolves around **one main action**:

> A teacher records a transaction when a parent reports sending money to a student.

Each transaction captures:

* Student details (full name + combination)
* Amount sent
* Agent used (optional)
* Teacher who recorded it

---

# 🧑‍🏫 Multi-User System (Important)

The system supports multiple users (teachers), each of whom can:

* Log in using **Firebase Authentication**

  * Google login
  * Email/password
* Record transactions independently
* View and filter data

---

# 🧱 Data Models (Mongoose Design)

## 🧑‍🏫 User Model

```js
User {
  _id: ObjectId,
  firebase_uid: String,       // unique Firebase ID
  name: String,
  email: String,
  role: "teacher" | "admin" | "staff",
  auth_provider: "google" | "email",
  createdAt: Date,
  updatedAt: Date
}
```

---

## 💸 Transaction Model

```js
Transaction {
  _id: ObjectId,

  student_full_name: String,      // full 3 names
  student_combination: String,    // e.g. PCM, EGM

  amount: Number,
  date: Date,

  agent_name: String,             // optional
  agent_code: String,             // optional

  recorded_by: ObjectId,          // reference to User

  note: String,                   // optional

  createdAt: Date,
  updatedAt: Date
}
```

---

# 🔄 System Workflow (Step-by-Step)

1. Parent sends money via agent
2. Parent messages teacher:

   * Student full name
   * Combination
   * Amount
   * Agent (optional)
3. Teacher logs into system
4. Teacher records transaction
5. Data is stored and becomes available for:

   * Filtering
   * Reporting
   * Tracking totals

---

# 🌐 API Design (All Important Routes)

## 🧑‍🏫 User Routes

```
POST    /api/users                 → Create user
GET     /api/users                 → Get all users
GET     /api/users/:id             → Get user by ID
GET     /api/users/firebase/:uid   → Get user by Firebase UID
PATCH   /api/users/:id             → Update user
PATCH   /api/users/:id/role        → Update role
DELETE  /api/users/:id             → Delete user
```

---

## 💸 Transaction Routes (CRUD)

```
POST    /api/transactions          → Create transaction
GET     /api/transactions          → Get all transactions
GET     /api/transactions/:id      → Get one transaction
PATCH   /api/transactions/:id      → Update transaction
DELETE  /api/transactions/:id      → Delete transaction
```

---

# 🔍 Filtering & Query Routes

These allow teachers to quickly find data.

```
GET /api/transactions/student/:name
GET /api/transactions/combination/:combination
GET /api/transactions/agent/:agentName
GET /api/transactions/user/:userId
```

---

# 📅 Date Filtering

```
GET /api/transactions/date-range?start=YYYY-MM-DD&end=YYYY-MM-DD
```

👉 Used for:

* Monthly reports
* Weekly tracking
* Custom time analysis

---

# 📊 Reports & Aggregation Routes (Most Powerful)

## 💰 Totals

```
GET /api/transactions/summary/student
GET /api/transactions/summary/agent
GET /api/transactions/summary/combination
GET /api/transactions/summary/user
GET /api/transactions/summary/overall
```

---

# 🧠 What Makes This System Effective

## ✅ 1. Simplicity First

* Only **2 main collections**
* No unnecessary complexity

## ✅ 2. Real-World Fit

* Matches how you actually receive data (via messages)

## ✅ 3. Flexible Agent Handling

* Agent is optional → no forced input

## ✅ 4. Multi-User Ready

* Firebase UID integration
* Role-based system

## ✅ 5. Powerful Reporting

* Aggregation pipelines enable:

  * Total per student
  * Total per agent
  * Total per teacher
  * Overall system insights

---

# ⚠️ Design Decisions (Intentional)

### ❌ No Student Table (for now)

Because:

* Data comes from messages
* No strict student registry needed yet

---

### ❌ No Agent Table

Because:

* Agents are loosely defined
* Only used for identification

---

# 🚀 Future Improvements (When System Grows)

* Add `Student` collection (to avoid duplicate names)
* Add `Agent` collection (for validation)
* Add dashboard (charts & analytics)
* Add pagination + search
* Add permissions (admin vs teacher)

---

# 🧠 Final Summary (One Line)

> This is a lightweight, scalable transaction tracking system that helps teachers record and analyze money sent by parents to students through agents, using a simple but powerful MongoDB + Express backend.

---

If you want next step, I’d strongly suggest:

👉 Build a **single dashboard endpoint** that returns:

* total money
* recent transactions
* top students
* top agents

That’s how real systems become useful fast.
