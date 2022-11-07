import express from "express"
import cors from "cors"

const app = express()
app.use(cors())
app.use(express.json())

const users = []
const tweets = []

app.post("/sign-up", (req, res) => {
    console.log(req.body)
    if(!req.body.username || !req.body.avatar) {
        res.status(400).send({ message: "Insira todos os campos por favor."});
        return;
    }
    users.push({...req.body})
    res.send("OK")
})

app.post("/tweets", (req, res) => {
    if(!req.body.username || !req.body.tweet) {
        res.status(400).send({ message: "Corpo de requisição inválido." });
        return;
    }
    tweets.push({...req.body})
    res.send("OK")
})

app.get("/tweets", (req, res) => {
    const lastTweets = []
    for(let i = tweets.length-1, k = 0; i >= 0 && k < 10; k++, i--)
        lastTweets.push({
            "username": tweets[i].username,
            "avatar": users.find(value => value.username === tweets[i].username).avatar,
            "tweet": tweets[i].tweet,
        })
    res.send(lastTweets)
})

app.listen(5000)