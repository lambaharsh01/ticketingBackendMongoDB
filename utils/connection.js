const mongoose=require('mongoose');

let connectionString=process.env.CONNECTION_STRING;

async function connectDB(){
    try{
        if(mongoose.connection.readyState!==1){
            await mongoose.connect(connectionString,{
                autoIndex: false,
                serverSelectionTimeoutMS: 5000,
                socketTimeoutMS: 45000,
                family: 4,
                maxPoolSize: 50,
                retryWrites: true,
                monitorCommands: true
              });
            console.log('Database Connected Successfully');
        }else{
            console.log('Database Already Connected')
        }

    }catch(err){
        console.error(err);
        process.exit(1);
    }
}
module.exports=connectDB();