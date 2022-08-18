const express = require('express');
const app = express();
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/wikiDB')
const Article = require('./models/articles')
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({

    extended: true
}))

app.use(express.static('public'))


app.set('view engine', "ejs")


app.route('/articles')

    .get((req, res) => {

        Article.find({})

            .then(result => {

                res.send(result)


            })
            .catch(e => {

                console.log(e)
            })

    })

    .post((req, res) => {



        const newArticle = new Article({

            title: req.body.title,
            content: req.body.content


        })
        newArticle.save()
            .then(result => {


                console.log(`sucessfully saved into DB`)
            })
            .catch(e => {
                console.log(e)
            })


    })

    .delete((req, res) => {

        Article.deleteMany((err, result) => {

            if (!err) {

                console.log(`successfully deleted all items`)
            } else {

                console.log(err)
            }
        })

    })


app.route('/articles/:articleTitle')

    .get((req, res) => {



        Article.findOne({
                title: req.params.articleTitle
            }).then(result => {

                res.send(result)
            })
            .catch(err => {


                res.send("No articles found")
            })
    })
    .put((req, res) => {

        Article.replaceOne({
                title: req.params.articleTitle
            }, {
                title: req.body.title,
                content: req.body.content
            })
            .then(res => {
                console.log(res)
            })
            .catch(e => {
                console.log(e)
            })




    })
    .patch((req, res) => {


        Article.findOneAndUpdate({
            title: req.params.articleTitle
        }, {
            $set: req.body
        }).then(result => {
            console.log(result)
        }).catch(e => {

            console.log(e)
        })



    })

    .delete((req, body) => {

        Article.deleteOne({

            title: req.params.articleTitle

        }).then(result => {

            console.log(result)
        }).catch(e => {

            console.log(e)
        })

    })






app.listen(3000, () => {


    console.log(`server started on port 3000`)
})