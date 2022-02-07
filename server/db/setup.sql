CREATE TABLE bins(
  id serial PRIMARY KEY,
  hash_id char(8) UNIQUE,
  created_at timestamp,
  update_at timestamp
);

INSERT into bins (hash_id, created_at, update_at)
VALUES (
  'kz4rmvrm',
  to_timestamp(1643758945.618),
  to_timestamp(1643931745.618)
);