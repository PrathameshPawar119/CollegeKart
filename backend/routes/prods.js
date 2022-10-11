import { Router } from "express";
import multer from "multer";
import {body, validationResult } from "express-validator";
import FetchUser from "../middleware/FetchUser.js";
import Prod from "../modules/Prod.js";
const router = Router();


// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "../prod_images");
//   },
//   filename: function (req, file, cb) {
//     const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
//     cb(null, file.fieldname + "-" + uniqueSuffix);
//   },
// });

// const upload = multer({ storage: storage });


// route1 GET all user's products
router.get('/fetchmyprods', FetchUser , async (req, res) => {
  try {
    const prods = await Prod.find({user: req.user.id});
    res.json(prods);
  } catch (error) {
    res.status(500).send("Error while fetching user's products");
  }
});

// route to fetch all products for home page
router.get("/fetchAllprods", async (req, res) => {
  try {
    const prods = await Prod.find({});
    res.json(prods);
  } catch (error) {
    res.status(500).send("Error while fetching All products");
  }
});


// route2 POST for adding products to database
// upload.single("image"), to be added remaining
router.post('/addprod', FetchUser, [
  body('title', "Title length must be greater than 5").isLength({min: 5}),
  body('description', "Description len must above 10char").isLength({min:10}),
], async (req, res)=>{
  
  const errors =  validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({error: errors.array()})
  }
  try {  
      const {title, description, price, category}= req.body; // destructing variables
      // const {image} = req.file;

      const prod =  new Prod({
      title, description, price, user: req.user.id, category
    })
    const savedProd = await prod.save();
    res.json(prod);
    
  } catch (error) {
    res.status(500).send("Error while adding prod try Block");
  }

})


//route 3 PUT to update existing product
router.put('/updateprod/:id', FetchUser, async (req, res)=>{
  // /updateprod/:id here :id can be accessed by using  req.params.id
  const {title, description, price, category} = req.body;
  // const {image} = req.file;

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      res.status(400).json({ error: errors.array() });
    }

  try {
    //create a new prod
    const newprod = {};
    if(title){newprod.title = title};
    if(description){newprod.description = description};
    if(price){newprod.price = price};
    if(category){newprod.category = category};
    if(image){newprod.image = image};
  
    var prod = await Prod.findById(req.params.id);
    if(!prod){return res.status(400).send(`Product not found`)};
  
    // check user is editing his own products
    //prod.user.id = got from given param in endpoint //req.user.id = got from fetchuser
    if (prod.user.toString() !== req.user.id) {
      return res.status(401).send("Not allowed to change other's product");
    }
  
    // finally update prod
    prod = await Prod.findByIdAndUpdate(req.params.id, {$set : newprod})
    res.json({prod});
    
  } catch (error) {
      res.status(500).json(error);
  }
})

// route 4 to delete prods
router.delete('/deleteprod/:id', FetchUser, async (req, res) => {
  try {
    var prod = await Prod.findById(req.params.id);
    if (!prod) {return res.status(400).send(`Product not found`)}

    if (prod.user.toString() !== req.user.id) {
      return res.status(401).send("Not allowed to delete other's product");
    }

    prod = await Prod.findByIdAndDelete(req.params.id);
    res.send({"Success": "Product Deleted", prod: prod});
  } catch (error) {
      res.status(500).json(error);
  }

})


export default router;
