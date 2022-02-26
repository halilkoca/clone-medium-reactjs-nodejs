import Article, { find, findById } from '../models/Article'
import User from '../models/User'
import fs from 'fs'
import { uploader } from 'cloudinary'

export function addArticle(req, res, next) {
    let { text, title, claps, description } = req.body

    if (req.files.image) {
        uploader.upload(req.files.image.path, (result) => {
            let obj = { text, title, claps, description, feature_img: result.url != null ? result.url : '' }
            saveArticle(obj)
        }, {
            resource_type: 'image',
            eager: [
                { effect: 'sepia' }
            ]
        })
    } else {
        saveArticle({ text, title, claps, description, feature_img: '' })
    }

    function saveArticle(obj) {
        new Article(obj).save((err, article) => {
            if (err)
                res.send(err)
            else if (!article)
                res.send(400)
            else {
                return article.addAuthor(req.body.author_id)
                    .then((_article) => {
                        return res.send(_article)
                    })
            }
            next()
        })
    }
}
export function getAll(req, res, next) {
    find(req.params.id)
        .populate('comments.author')
        .exec((err, article) => {
            if (err)
                res.send(err)
            else if (!article)
                res.send(400)

            else
                res.send(article)
            next()
        })
}
export function clapArticle(req, res, next) {
    findById(req.body.article_id)
        .then((article) => {
            return article.clap()
                .then((article) => {
                    return res.json({ msg: "Done" })
                })
        })
}
export function commentArticle(req, res, next) {
    findById(req.body.article_id).then((article) => {
        return article.comment({
            author: req.body.author_id,
            text: req.body.comment
        }).then(() => {
            return res.json({ msg: "Done" })
        })
    }).catch(next)
}
export function getArticle(req, res, next) {
    findById(req.params.id)
        .populate('author')
        .populate('comments.author').exec((err, article) => {
            if (err)
                res.send(err)
            else if (!article)
                res.send(400)

            else
                res.send(article)
            next()
        })
}