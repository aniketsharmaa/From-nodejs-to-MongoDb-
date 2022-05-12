const express = require("express");

const cors = require("cors"); //Cross-Origin Resource Sharing (CORS)

require("./mongodb");

// model imports
const userModel = require("./models/user");
const { Admin } = require("mongodb");

const app = express();

// use client side data
app.use(express.json());

// define cors rules
app.use(cors());

app.get("/", (req, res) => {
  res.json({ message: "Hello There" });
});

app.post("/register", async (req, res) => {
  // create op
  const user = new userModel(req.body);
  user
    .save()
    .then(() => {
      res.status(200).json(user);
    })
    .catch((err) => {
      if (err.name == "ValidationError") {
        console.error("Error Validating!", err);
        res.status(422).json({ message: "Error Validating", err });
      } else {
        console.error(err);
        res.status(500).json(err);
      }
    });
});

app.get("/complaints", async (req, res) => {
  // read op
  try {
    let user = await userModel.find();

    if (!user) {
      return res.status(404).json({
        message: "User Not Found",
      });
    }

    res.status(200).json({
      message: "OK",
      user,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Something went wrong",
    });
  }
});


app.listen("3000", () => {
  console.log("Server is up on port 3000");
});
