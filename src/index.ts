import express from 'express';

const app = express(),
  port = 3000;

app.get('/api', (req, res) => {
    res.status(200).send('Server running');
})

app.listen(port, () => {
  console.log(`Server started at port ${port}`);
});


export default app;