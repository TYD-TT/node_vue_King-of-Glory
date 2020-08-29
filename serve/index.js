const express = require('express')
const app = express()
const port = 3000

app.use(require('cors')())
app.use(express.json())

require('./routes/admin')(app);
require('./plugins/db')(app);

app.listen(port, () => console.log(`http://127.0.0.1:3000`))