const mongoose = require('mongoose')


const aticleSchema = {

    title: {

        type: String,
        lowercase: true,
        required:true,
    },
    content: String,



}

const Article = mongoose.model("Article", aticleSchema)


module.exports = Article;