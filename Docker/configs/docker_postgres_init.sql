-- Create Tables

CREATE TABLE "users" (
  "id" SERIAL PRIMARY KEY,
  "full_name" varchar,
  "email" varchar,
  "status" boolean,
  "created_at" timestamp DEFAULT (now()),
  "updated_at" timestamp DEFAULT (now()),
  UNIQUE(email)
);

CREATE TABLE "products" (
  "id" SERIAL PRIMARY KEY,
  "name" varchar,
  "price" int,
  "status" boolean,
  "created_at" timestamp DEFAULT (now()),
  "updated_at" timestamp DEFAULT (now())
);

CREATE TABLE "services" (
  "id" SERIAL PRIMARY KEY,
  "user_id" integer,
  "date_of_service" timestamp,
  "products" jsonb,
  "status" boolean DEFAULT true,
  "created_at" timestamp DEFAULT (now()),
  "updated_at" timestamp DEFAULT (now())
);

-- References
ALTER TABLE "services" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");

-- Inserts
INSERT INTO users (full_name, email, status) VALUES 
('Usuario 1', 'usuario1@email.com', true),
('Usuario 2', 'usuario2@email.com', true),
('Usuario 3', 'usuario3@email.com', true),
('Usuario 4', 'usuario4@email.com', false),
('Usuario 5', 'usuario5@email.com', true),
('Usuario 6', 'usuario6@email.com', true),
('Usuario 7', 'usuario7@email.com', true),
('Usuario 8', 'usuario8@email.com', false),
('Usuario 9', 'usuario9@email.com', true),
('Usuario 10', 'usuario10@email.com', true),
('Usuario 11', 'usuario11@email.com', true),
('Usuario 12', 'usuario12@email.com', false);

INSERT INTO products (name, price, status) VALUES 
('Protecto Solar', 10, true),
('Crema Hidratente', 15, true),
('Delineadores', 30, true),
('Mascarillas', 20, true),
('Brillo', 4, false),
('Crema para Manos', 11, false),
('Spa para Uno', 12, true),
('Para para dos', 30, true),
('Mascarillas Antiespinillas', 20, true),
('Brillo Con Humectante', 3, false);

INSERT INTO services (user_id, date_of_service, products) VALUES 
(1, now(), '[{"id":1,"qty":1},{"id":2,"qty":2}]'),
(2, now(), '[{"id":3,"qty":3}]'),
(3, now(), '[{"id":4,"qty":4},{"id":5,"qty":5}]'),
(4, now(), '[{"id":6,"qty":6},{"id":7,"qty":7}]');

-------------------------------------------------------------------
-------------------------------------------------------------------
-------------------------------------------------------------------

-- Database Test
CREATE DATABASE micro_database_test;

-- use
\c micro_database_test

CREATE TABLE "users" (
  "id" SERIAL PRIMARY KEY,
  "full_name" varchar,
  "email" varchar,
  "status" boolean,
  "created_at" timestamp DEFAULT (now()),
  "updated_at" timestamp DEFAULT (now()),
  UNIQUE(email)
);

CREATE TABLE "products" (
  "id" SERIAL PRIMARY KEY,
  "name" varchar,
  "price" int,
  "status" boolean,
  "created_at" timestamp DEFAULT (now()),
  "updated_at" timestamp DEFAULT (now())
);

CREATE TABLE "services" (
  "id" SERIAL PRIMARY KEY,
  "user_id" integer,
  "date_of_service" timestamp,
  "products" jsonb,
  "status" boolean,
  "created_at" timestamp DEFAULT (now()),
  "updated_at" timestamp DEFAULT (now())
);

--ALTER TABLE "services" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");