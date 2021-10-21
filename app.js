const express=require('express');
const morgan=require("morgan");
const app=express();
const path=require('path')
const session = require('express-session');
const colors=require('colors');
app.use(morgan("dev"));
app.set('port',process.env.PORT||3000)
app.use(express.static(path.join(__dirname,'public')));
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'vista'));
app.use(express.urlencoded({extended:true}));

app.use(session({
    secret:'123', /*es para cualquier texto por si no deja cargar la session*/
    resave:true,/*salvar la session*/
    saveUninitialized:true
}));


app.use(require('./rutas/rutas'));
app.use((err,rep,res,next)=>{
    res.send({err:err.message})
})



app.set('port',process.env.PORT || 3000);
app.listen(app.get('port'),()=>{

    console.log(`En el servidor ${app.get('port')}`)
})