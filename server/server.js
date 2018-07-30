const path = require('path');

const express = require('express');
const app = express();

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT||3000;
app.use(express.static(publicPath));

app.listen(3000, () => {
    console.log(`listening on port ${port}`);
})
//create new express application
//static middleware
//create server on port 3000