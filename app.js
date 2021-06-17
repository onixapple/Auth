const express = require('express')
const app = express()
const port = process.env.PORT || 3500
const bcrypt = require('bcrypt')

app.use(express.json())

const users = []

app.get('/users', (req,res)=>{
    res.json(users)
})

app.post('/users', async (req,res)=>{
    try{
        const salt = await bcrypt.genSalt()
        const hashedPass = await bcrypt.hash(req.body.password,salt)
        const user = {name: req.body.name, password: hashedPass}
        users.push(user)
        res.status(200).send()
    }catch{
        res.status(500).send()
    }
})

app.post('/users/login', async (req,res)=>{
    const user = users.find(user => user.name = req.body.name)
    if(user == null){
        return res.status(400).send("cannot find")
    }
    try{
        if(await bcrypt.compare(req.body.password, user.password)){
            res.send('loged in')
        }else{
            res.send('do not match')
        }
    }catch{
        res.status(500).send()
    }
})


app.listen(port)