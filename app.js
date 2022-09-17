const express = require("express")
const morgan = require("morgan")
const path = require("path")

const app = express()

app.use(morgan("dev"))
app.use(express.json())

//local modules
const birdsRouter = require('./birds.js')


app.get("/", (req,res, next) => {
    res.send("<h1>Welcome to the BIRD API!</h1>")
})

app.use('/birds', birdsRouter)
app.use(express.static(path.join(__dirname, 'public')));

const PORT = 3030;
app.listen(PORT, () => {
  console.log(`app listening at http://localhost:${PORT}`);
});