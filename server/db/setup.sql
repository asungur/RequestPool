-- TODO: add a primary key that isn't the hash value
CREATE TABLE bins(
  id serial PRIMARY KEY,
  hash_id char(8),
  created_at timestamp,
  update_at timestamp
);

INSERT into bins (id, created_at, update_at)
VALUES (
  'kz4rmvrm',
  to_timestamp(1643758945.618),
  to_timestamp(1643931745.618)
);

CREATE TABLE requests (
  request_id serial PRIMARY KEY,
  bin_id char(8),
  mongo_id char(24),
  FOREIGN KEY (bin_id)
    REFERENCES bins (hash_id)
);

INSERT INTO requests (bin_id, mongo_id)
VALUES (
  'kz4rmvrm',
  '61fb3297fac3baa5f143574b'
);
