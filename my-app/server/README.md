node server/app.js


Test app API endpoints using cURL
We are done building our backend, we will test the API endpoints using cURL.
NB: MongoDB instance must be running before you begin the cURL test. To start a MongoDB server, run the command: mongod.
TEST: GET A USER
curl --request GET \
  --url http://localhost:5000/api/user/5a92cf3f2dec79115c8fc78a
TEST: GET ALL ARTICLES
curl --request GET \
  --url http://localhost:5000/api/articles
TEST: GET AN ARTICLE
curl --request GET \
  --url http://localhost:5000/api/article/5a92e41abb04440888395e44
TEST: COMMENT ON AN ARTICLE
curl --request POST \
  --url http://localhost:5000/api/article/comment \
  --header 'content-type: application/json' \
  --data '{"comment": "dfdggd", "author_id": "5a92cf3f2dec79115c8fc78a", "article_id": "5a92e41abb04440888395e44"}'
TEST: CLAP AN ARTICLE
curl --request POST \
  --url http://localhost:5000/api/article/clap \
  --header 'content-type: application/json' \
  --data '{"article_id": "5a92e41abb04440888395e44"}'
