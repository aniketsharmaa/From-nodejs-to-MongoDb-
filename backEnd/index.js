const express = require("express");


const cors = require("cors"); //Cross-Origin Resource Sharing (CORS)

require("./mongodb");

const userModel = require("./models/user");
const { Admin } = require("mongodb");

const app = express();

// instantiate wabot


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

app.put( '/complaints/:complaintNumber/update', async ( req, res ) => {

  const { complaintNumber } = req.params;
  const { status } = req.body;

  const statusArray = [ 'pending', 'solved', 'partially_solved', 'not_feasible' ];

  if( !status || !statusArray.includes(status) ) {
    return res.status(422).json({ message: "A Valid Status is required" })
  }

  if( !complaintNumber ) {
    return res.status(422).json({ message: "Complaint Number is required" })
  }

  try {

    // update status
    let updateStatus = await userModel.updateOne({ complaintNumberr: complaintNumber }, { status })
    let matchedDoc = updateStatus.matchedCount;
    let updatedDoc = updateStatus.modifiedCount;
    if( matchedDoc == 0 ) {
      return res.status(404).json({
        message: "Complaint Not Found",
      });
    }

    if( updatedDoc == 0 ) {
      return res.status(400).json({
        message: "Failed To Update",
      });
    }
    res.status(200).json({
      message: "OK"
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Something went wrong",
    });
  }
} )

app.listen("3000", () => {
  console.log("Server is up on port 3000");
});
