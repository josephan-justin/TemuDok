const express = require('express');
const Controller = require('./controllers/homeControllers/controller');
const app = express();
const port = 3000;
const routerAdmin = require('./routers/admin')
const routerDoctor = require('./routers/doctor')

app.use(express.static('public'))
app.use('/assets', express.static('assets'))

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }))

app.get('/',Controller.home);
app.use('/admin',routerAdmin)
app.use('/doctor',routerDoctor)




app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});