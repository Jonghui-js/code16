const express = require('express');
const connectDB = require('./config/db');

const app = express();

//Connect Database. 비동기
connectDB();

//init middleWare. app.use를 통해 라우터에 접근할 때마다 거치는!
app.use(
  express.json({
    extended: false
  })
);

app.get('/', (req, res) => res.send('API Running'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
