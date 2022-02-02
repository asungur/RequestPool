-- TODO: add a primary key that isn't the hash value
CREATE TABLE bins(
  id char(8) PRIMARY KEY,
  created_at timestamp,
  update_at timestamp
);

INSERT into bins (id, created_at, update_at)
VALUES (
  'kz4rmvrm',
  to_timestamp(1643758945.618),
  to_timestamp(1643931745.618)
);