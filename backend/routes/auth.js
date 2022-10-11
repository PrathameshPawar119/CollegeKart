import {Router} from "express"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import User from "../modules/User.js";
import {body, validationResult} from "express-validator";
import FetchUser from "../middleware/FetchUser.js";

const router = Router();
const JWT_SECRET = "react";


// Create user using: POST "/api/auth/createuser"
// router.post('/endpoint', validations, (req, res)=>{})
router.post('/createuser',[
    // ALl validations using express-validator body
    body("name", "Name cannot contain numbers").isAlpha('en-US', {ignore: ' '}),  // isAlpha() considers spaces as nonAlpha to avoid it use ignore
    body("name", "Minimum length 3").isLength({min:3}),
    body("email", "Invalid Email").isEmail(),
    body("password", "Minimum length 3").isLength({min: 3})
], async (req, res)=>{

    // Finding errors from req.body using validationResult
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).send({errors: errors.array()});
    }
    //Find if any user exists already in db
    const user = await User.findOne({email: req.body.email});
    if(user){
        return res.status(400).send("Naya email Dal re!");
    }

    const salt = await bcrypt.genSalt(10);
    const secPassword = await bcrypt.hash(req.body.password, salt);

    try {
        //Create user
        await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secPassword
        })

        // Making authToken using jwt
        // we convert used id to auth token which can be again converted to user id
        const data = {
          user: {
            uname: User.name,
            id: User.id
          },
        };
        const authToken = jwt.sign(data, JWT_SECRET);
        console.log(authToken);

        res.send({"authtoken": authToken, user: req.body})
        
    
    } catch (error) {
        return res.status(400).send({ errors: errors.array() });
    }
})

router.post('/loginuser', [
    body("email", "Email not valid.").isEmail(),
    body("password", "Password cannot be empty").exists()
], async (req, res)=>{

    let success = false;    
    //check if any error exists in req.body using validationresult from express
    const errors =  validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).send({error : errors.message});
    }

    const {email, password} = req.body; // destructing emaila and pass from req.body
    try {
        let user = await User.findOne({email: email});
        if(!user){
            return res.status(401).json({success, error: "User does not exists"});
        }

        const passCompare = await bcrypt.compare(password, user.password);
        if (!passCompare) {
            return res.status(401).json({success, error: "Invalid Credentials"});
        }
        success = true;

        //making authtoken for user using user id
        const data = {
          user: {
            id: user.id,
          },
        };
        const authtoken = jwt.sign(data, JWT_SECRET);
        res.send({success, authtoken: authtoken});

    } catch (error) {
        return res.status(400).send({success, errors: errors.array() });
    }



})

//route 3: getuser using post
router.post('/getuser', FetchUser, async (req, res)=>{
    try {
        const userId = req.user.id;
        const user = await User.findById(userId).select("-password");
        console.log(user);
        res.send(user);
    } catch (error) {
        res.status(500).send("Internal error while fetching user");
    }
})

export default router;






