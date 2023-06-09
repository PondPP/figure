const express = require("express");
const multer = require('multer');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const cors = require("cors");
app.use(cors());

/*=================================
        Database
===================================*/
const mongoose = require("mongoose");

mongoose
    .connect("mongodb://127.0.0.1:27017/loginMern", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log("Connection Successful");
    })
    .catch((err) => {
        console.log(err);
    });

/************schema*********** */
const userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: String,
    repassword: String,
});
const UserModel = mongoose.model("UserModel", userSchema);

/*=================================
        get and post
===================================*/

const productSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String,
});

const ProductModel = mongoose.model("ProductModel", productSchema);

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      // Specify the directory where the uploaded files will be stored
      cb(null, '/public/images');
    },
    filename: function (req, file, cb) {
      // Generate a unique filename for the uploaded file
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      cb(null, file.fieldname + '-' + uniqueSuffix);
    },
});

const upload = multer({ storage });

app.get("/products", async (req, res) => {
    try {
        const product = await ProductModel.find();
        res.send(product);
    } catch (error) {
        console.error(error);
        res.status(500).send({message: "Internal Server Error"});
    }
});

app.get("/", async (req, res) => {
    try {
        const product = await UserModel.find();
        res.send(users);
    } catch (error) {
        console.error(error);
        res.status(500).send({message: "Internal Server Error"});
    } 
})

/*----------------------------------------------------------------
                    post
----------------------------------------------------------------*/

app.post("/register", async (req, res) => {
    console.log(req.body);
    const { firstName, lastName, email, password, repassword } = req.body;
    try {
        const user = await UserModel.findOne({ email: email });
        if (user) {
            res.status(400).send({ message: "This email is already registered" });
        } else {
            const newUser = new UserModel({
                firstName,
                lastName,
                email,
                password,
                repassword,
            });
            await newUser.save();
            res.send({ message: "Successful Register" });
        }
    } catch (error) {
        res.status(500).send({ message: "Failed to register user" });
    }
});

app.post("/login", async (req, res) => {
    console.log(req.body);
    const { email, password } = req.body;
    try {
      const user = await UserModel.findOne({ email: email });
      if (user) {
        if (password === user.password) {
          res.send({ message: "Login Successful", user });
        } else {
          res.status(400).send({ message: "Password didn't match" });
        }
      } else {
        res.status(400).send({ message: "This email is not registered" });
      }
    } catch (error) {
      res.status(500).send({ message: "Internal Server Error" });
    }
});
  
app.post("/update", async (req, res) => {
    const { firstName, lastName, email, password } = req.body;
    try {
      const user = await UserModel.findOne({ email: email });
      if (user) {
        user.firstName = firstName;
        user.lastName = lastName;
        user.password = password;
        await user.save();
        res.send({ message: "Profile updated successfully", user: user });
      } else {
        res.send({ message: "User not found" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: "Internal Server Error" });
    }
});
  
app.post('/additem', upload.single('image'), async (req, res) => {
    const { name, description } = req.body;
  
    try {
      const newItem = new ProductModel({
        name,
        image: req.file ? req.file.filename : '', // อัปเดตการอ่านข้อมูลรูปภาพ
        description,
      });
      await newItem.save();
      res.send({ message: 'Item added successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: 'Internal Server Error' });
    }
});


/*----------------------------------------------------------------
                    delete
-----------------------------------------------------------------*/
app.delete('/users/:id', async (req, res) => {
    const userId = req.params.id;
    try {
      await UserModel.findByIdAndDelete(userId);
      res.send({ message: 'User deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: 'Internal Server Error' });
    }
  });

/*============================
        listen
=============================*/
app.listen(8080, () => {
    console.log("Server is running at port 8080");
});
