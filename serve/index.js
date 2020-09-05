const express = require('express')
const app = express()
const port = 3000

app.set('secret','tyd970420')

app.use(require('cors')())
app.use(express.json())

app.use('/uploads',express.static(__dirname+'/uploads'))

require('./routes/admin')(app);
require('./plugins/db')(app);

app.listen(port, () => console.log(`http://127.0.0.1:3000`))