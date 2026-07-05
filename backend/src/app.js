// Configures the Express app: middleware, routes, error handlers.
// Exported (not started) so it can be reused in tests without opening a port.
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const routes = require('./routes');
const errorMiddleware = require('./middleware/error.middleware');
const notFoundMiddleware = require('./middleware/notFound.middleware');

const app = express();

app.use(helmet());
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan(process.env.NODE_ENV === 'development' ? 'dev' : 'combined'));

app.get('/health', (req, res) => res.status(200).json({ status: 'ok' }));

app.use('/api', routes);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

module.exports = app;
