import express, { query } from "express"
import cors from "cors"

const app = express()
app.use(cors())
app.use(express.json())

const users = []
const tweets = []

app.post("/sign-up", (req, res) => {
    if(!req.body.username || !req.body.avatar) {
        res.status(400).send("Todos os campos são obrigatórios!");
        return;
    }
    users.push({...req.body});
    res.status(201).send("OK");
})

app.post("/tweets", (req, res) => {

    if(!req.headers.user || !req.body.tweet) {
        res.status(400).send("Todos os campos são obrigatórios!");
        return;
    }
    tweets.push({
        "username": req.headers.user,
        "tweet": req.body.tweet
    })
    res.status(201).send("OK");
})

app.get("/tweets", (req, res) => {

    console.log(req.query.page)
    const lastTweets = [];

    for(let i = tweets.length-1 - 10 * (req.query.page - 1), k = 0; i >= 0 && k < 10 * req.query.page; k++, i--)
        lastTweets.push({
            "username": tweets[i].username,
            "avatar": users.find(value => value.username === tweets[i].username).avatar,
            "tweet": tweets[i].tweet,
        })
    res.send(lastTweets);

})

app.get("/tweets/:username", (req, res) => {
    res.send(tweets.filter(value => value.username === req.params.username).reverse());
})

app.listen(5000)