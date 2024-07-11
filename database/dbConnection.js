import mongoose from "mongoose";

export const dbConnection=()=>{
        mongoose
        .connect(process.env.MONGO_URL2, {
            dbName: "REGISTERMAINTAINANCE",
        }).then(()=>{
            console.log("DB connection established");
        }).catch(err=>{
           console.log("Error connecting to : database : " + err.message)
        });
}