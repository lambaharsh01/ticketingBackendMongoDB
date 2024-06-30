const bodyParser = require('body-parser');
const express=require('express');
const app=express();

const hostname='0.0.0.0';
const port=3000

class Initialise{
    constructor(){
        this.routes={};
        this.dependencies();
        this.routePages();
        this.routeConnection();
        this.connection();
        this.listner();
    }

    dependencies(){
        require('dotenv').config({path:'config.env'});
        
        const bodyParser=require('body-parser');
        app.use(bodyParser.urlencoded({extended:true, limit:'10mb'}));
        app.use(express.json());
    }

    routePages(){
        this.routes.createProduct=require('./routes/createProduct/createProduct');
    }

    routeConnection(){
        app.use('/api/createProduct', this.routes.createProduct);
    }

    connection(){
        require('./utils/connection');
    }

    listner(){
        app.listen( port , hostname, ()=>{
            console.log('Listening on '+ port)
        })
    }
}


new Initialise()