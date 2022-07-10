import express from 'express';

const app = express(),
  port = 3000;

app.listen(port, () => {
  console.log(`Server started at port ${port}`);
});
