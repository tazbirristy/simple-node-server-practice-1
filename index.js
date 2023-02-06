const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion } = require("mongodb");

const { request } = require("express");
const app = express();
const port = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("Simple node server is running");
});

app.use(cors());
app.use(express.json());

const users = [
  { id: 1, name: "tazbir", email: "tazbir@gmail.com" },
  { id: 2, name: "rahman", email: "rahman@gmail.com" },
  { id: 3, name: "risty", email: "risty@gmail.com" },
];

// userName: dbUser2
// password:kWONdjonNNVpa7tU

const uri =
  "mongodb+srv://dbUser2:kWONdjonNNVpa7tU@cluster0.dhgvhns.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function run() {
  try {
    const userCollection = client.db("simpleNode").collection("users");
    // const user = { name: "mahi", email: "mahi@gmail.com" };
    // const result = await userCollection.insertOne(user);
    // console.log(result);

    app.get("/users", async (req, res) => {
      const cursor = userCollection.find({});
      const users = await cursor.toArray();
      res.send(users);
    });

    app.post("/users", async (req, res) => {
      // console.log("POST api called");
      // console.log(req.body);
      const user = req.body;

      // users.push(user);
      // console.log(user);
      const result = await userCollection.insertOne(user);
      console.log(result);
      user._id = result.insertedId;
      res.send(user);
    });
  } finally {
  }
}

run().catch((err) => console.log(err));

app.get("/users", (req, res) => {
  // console.log(req.query);
  if (req.query.name) {
    const search = req.query.name;
    const filtered = users.filter(
      (usr) => usr.name.toLowerCase().indexOf(search) >= 0
    );
    res.send(filtered);
  } else {
    res.send(users);
  }
});

// app.post("/users", (req, res) => {
//   console.log("POST api called");
//   // console.log(req.body);
//   const user = req.body;
//   user.id = users.length + 1;
//   users.push(user);
//   console.log(user);
//   res.send(user);
// });

app.listen(port, () => {
  console.log(`Simple node server is running on port ${port}`);
});
