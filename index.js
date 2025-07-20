const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());
require('dotenv/config');

const { loginRouter, categoryRouter, imgRouter, productRouter } = require('./src/routes');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const path = require('path');
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/auth', loginRouter);
app.use('/categories', categoryRouter);
app.use('/img', imgRouter);
app.use('/products', productRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
