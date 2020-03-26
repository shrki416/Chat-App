const { Client } = require("pg");

const connectionString = "postgresql://AA:chat@localhost:5432/chat_app";

const client = new Client({
  connectionString: connectionString
});

client.connect();

client.query("SELECT * FROM messages", (error, results) => {
  if (error) {
    console.log(`Error is ${error}`);
  }
  results.rows;
  client.end();
});
