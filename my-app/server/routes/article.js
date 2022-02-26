import { getAll, addArticle, clapArticle, commentArticle, getArticle } from './../controllers/article.ctrl'
import multipart from 'connect-multiparty'
const multipartWare = multipart()

export default (router) => {

    router
        .route('/articles')
        .get(getAll)

    router
        .route('/article')
        .post(multipartWare, addArticle)

    router
        .route('/article/clap')
        .post(clapArticle)

    router
        .route('/article/comment')
        .post(commentArticle)

    router
        .route('/article/:id')
        .get(getArticle)
}