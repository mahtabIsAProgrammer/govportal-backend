CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email VARCHAR(255) UNIQUE,
  password TEXT NOT NULL,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  national_id VARCHAR(20),
  date_of_birth DATE,
  phone_number TEXT,
  role VARCHAR(255) NOT NULL,
  is_active BOOLEAN,
  gender INT,
  image TEXT,
  username TEXT UNIQUE,
  department_id INT REFERENCES departments(id) ON DELETE SET NULL,
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now()
);

CREATE TABLE departments (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  description TEXT,
  created_at TIMESTAMP DEFAULT now(),
);

CREATE TABLE services (
  id SERIAL PRIMARY KEY,
  department_id INT NOT NULL REFERENCES departments(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  fee NUMERIC(10,2) DEFAULT 0, -- store cents
  form_schema JSONB NOT NULL,
  created_at TIMESTAMP DEFAULT now()
);

CREATE TABLE requests (
  id SERIAL PRIMARY KEY,
  citizen_id uuid REFERENCES users(id),
  service_id INT NOT NULL REFERENCES services(id) ON DELETE SET NULL,
  status integer NOT NULL DEFAULT 0,
  submitted_at TIMESTAMP DEFAULT now(),
  reviewed_at TIMESTAMP DEFAULT now(),,
  reviewed_by uuid REFERENCES users(id),
  updated_at TIMESTAMP DEFAULT now(),
);

CREATE TABLE request_data (
  id SERIAL PRIMARY KEY,
  request_id integer NOT NULL REFERENCES requests(id) ON DELETE CASCADE,
  form_data jsonb NOT NULL
);

CREATE TABLE payments (
  id SERIAL PRIMARY KEY,
  request_id INT REFERENCES requests(id) ON DELETE SET NULL,
  amount numeric(10,2),
  status TEXT,
  transaction_id TEXT,
  created_at TIMESTAMP DEFAULT now(),
);

CREATE TABLE notifications (
  id SERIAL PRIMARY KEY,
  title TEXT,
  message TEXT,
  is_read BOOLEAN DEFAULT FALSE,
  user_id uuid REFERENCES users(id),
  created_at TIMESTAMP DEFAULT now()
);


CREATE TABLE uploads (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id uuid REFERENCES users(id),
    path text NOT NULL,
    original_name text NOT NULL,
    mime_type text NOT NULL,
    size bigint NOT NULL,
    folder_name text NOT NULL,
    created_at TIMESTAMP DEFAULT now()
);