CREATE TABLE IF NOT EXISTS Receipt (
    id serial PRIMARY KEY,
    shop_name varchar(50) NOT NULL,
    price varchar(50) NOT NULL,
    issue_date varchar(30) NOT NULL
);

CREATE TABLE IF NOT EXISTS Receipt_Item (
    id serial PRIMARY KEY,
    "name" varchar(50) NOT NULL,
    quantity int NOT NULL,
    price int NOT NULL,
    receipt_id int NOT NULL
);

CREATE TABLE IF NOT EXISTS Expense (
    id serial PRIMARY KEY,
    category varchar(50) NOT NULL,
    receipt_id int NOT NULL
);

ALTER TABLE Receipt_Item DROP CONSTRAINT IF EXISTS receiptItemIdFkey;
ALTER TABLE Expense DROP CONSTRAINT IF EXISTS expenseIdFkey;

ALTER TABLE Receipt_Item
ADD CONSTRAINT receiptItemIdFkey
FOREIGN KEY (receipt_id)
REFERENCES Receipt(id);

ALTER TABLE Expense
ADD CONSTRAINT expenseIdFkey
FOREIGN KEY (receipt_id)
REFERENCES Receipt(id);
