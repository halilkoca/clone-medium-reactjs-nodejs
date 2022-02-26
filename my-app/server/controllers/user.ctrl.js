import { find } from '../models/Article';
import User, { findById, find as _find } from '../models/User';

export function addUser(req, res, next) {
    new User(req.body).save((err, newUser) => {
        if (err)
            res.send(err);
        else if (!newUser)
            res.send(400);

        else
            res.send(newUser);
        next();
    });
}
export function getUser(req, res, next) {
    findById(req.params.id).then((err, user) => {
        if (err)
            res.send(err);
        else if (!user)
            res.send(404);

        else
            res.send(user);
        next();
    });
}
export function followUser(req, res, next) {
    findById(req.body.id).then((user) => {
        return user.follow(req.body.user_id).then(() => {
            return res.json({ msg: "followed" });
        });
    }).catch(next);
}
export function getUserProfile(req, res, next) {
    findById(req.params.id).then((_user) => {
        return _find({ 'following': req.params.id }).then((_users) => {
            _users.forEach((user_) => {
                _user.addFollower(user_);
            });
            return find({ 'author': req.params.id }).then((_articles) => {
                return res.json({ user: _user, articles: _articles });
            });
        });
    }).catch((err) => console.log(err));
}