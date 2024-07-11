import  express  from "express";
import {config} from "dotenv"
import cors from "cors";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
const app = express();
config({path: "./config/config.env"})
import {router} from "./routers/messageRoute.js";
import { dbConnection } from "./database/dbConnection.js";
import { errorMiddleware } from "./middlewares/errormiddleware.js";
import userRouter from "./routers/userRouter.js"
import { appointmentRouter } from "./routers/appointmentRoute.js";


app.use(cors(
{
    origin: [process.env.FRONT_END_URL , process.env.DASHBORD_URL],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
}
));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
}));
app.use("/api/v2/message" , router);
app.use("/api/v2" , userRouter);
app.use("/api/v2/appointment" , appointmentRouter );

app.get("/", function(req, res) {
    res.send("Welcome");
});


dbConnection();


app.use(errorMiddleware)
export default app;