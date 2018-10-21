var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var cors = require('cors');
var router = express.Router();
var multer = require('multer');
var fs = require('fs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use('/api', router);

const MongoClient = require("mongodb").MongoClient;

var shoppingList = require('./Routes/cartlist.js');

var port = process.env.PORT || 8000;

// Serve only the static files form the dist directory
app.use(express.static('./dist/restraunt'));

app.get('/*', function(req,res) {

res.sendFile(path.join(__dirname,'/dist/restraunt/index.html'));
});

// Start the app by listening on the default Heroku port
app.listen(port, function() {
  console.log("listening on port 8000")
});

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null, 'images/uploads')
  },
  filename: (req, file, cb) => {
      cb(null, file.fieldname + '-' + Date.now())
  }
});
var upload = multer({ storage: storage });
const uri = "mongodb+srv://venkatesh:ivedamar.91@node-mongo-jyags.mongodb.net/test?retryWrites=true";

router.post('/postShoppingListdish', shoppingList.postShoppingListdish);
router.get('/getShoppingList', shoppingList.getShoppingList);

router.post('/postnewCategoryData', upload.single('image'), async (req, res) => {
  console.log(req.headers['name']);
  if (!req.file) {
      res.json({ success: false });
  } else {
      const categoryName = req.headers['name'];
      const categoryData = {
          dishType: categoryName,
          banner: req.file.filename,
          dishItems: []
      }
      const client = await MongoClient.connect(uri, { useNewUrlParser: true });
      const collection = client.db("shoppingCart").collection("shoppingList");
      const insertData = await collection.insert(categoryData);
      if (insertData) {
          res.status(200).json({ success: true, message: 'Inserted successfully' });
      }
  }
});
