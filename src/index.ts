import express from 'express';
import router from './routes';
import logger from './utilities/logger';

const app = express(),
    port = 3000;

app.use('/api', logger, router);

app.listen(port, () => {
    console.log(`Server started at port ${port}`);
});

export default app;
