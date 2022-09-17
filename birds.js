const express = require("express")
const router = express.Router()

let {birds} = require('./data')
// {
//     name: 'blue jay',
//     id: 1,
//     viewCount: 0,
//   },

// GET /birds
router.get("/", (req, res, next) => {
    res.send(birds)
})

// GET /birds/:id
router.get("/:id", (req, res, next) => {
    const id = Number(req.params.id)
    // console.log(birds)

    // Challenge
    // Access the single bird by id
    // res.send the birds name, an view count
    const currentBird = birds.find(bird => bird.id === id)
    res.send(`
        <h1>${currentBird.name}</h1>
        <p>Viewed ${currentBird.viewCount}</p>
    `)
})

// POST
router.post('/', (req, res, next) => {
    // req.body is where you will access the POST information
    const { name: birdName } = req.body
    if(!birdName){
        next('must supply name')
    }

    const newBird = {
        name: birdName,
        id: birds[birds.length - 1].id + 1,
        viewCount: 0
    }

    birds.push(newBird)
    res.send(
        `<p>A bird has been added</p>
        <p>${newBird}</p>
        `
    )
})

// PATCH
// Accessing a bird and changing the view count or name
router.patch("/:id", (req, res, next) => {
    const { viewCount: count } = req.body
    const id = Number(req.params.id)

    const updateBird = birds.find(bird => bird.id === id)
    updateBird.viewCount += count

    res.send(updateBird)
})

// DELETE
// Challenge: Accessing a bird and deleting them
router.delete("/:id", (req, res, next) => {
    const id = Number(req.params.id)
    const deleteBird = birds.find(bird => bird.id === id)
    const updatedBirds = birds.filter(bird => bird.id !== id )
    birds = updatedBirds // updates birds to be deleted

    // res.send(`
    // <p>This bird has been deleted ${deleteBird.name}</p>
    // <p>New Bird List<p>
    // ${updatedBirds}
    // `)
    res.send(updatedBirds)
})

module.exports = router
{}