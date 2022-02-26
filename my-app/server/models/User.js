import { Schema, model } from 'mongoose';

let UserSchema = new Schema(
    {
        name: String,
        email: String,
        provider: String,
        provider_id: String,
        token: String,
        provider_pic: String,
        followers: [{
            type: Schema.Types.ObjectId,
            ref: 'User'
        }],
        following: [{
            type: Schema.Types.ObjectId,
            ref: 'User'
        }],
    }
);

UserSchema.methods.follow = function (user_id) {
    if (this.following.indexOf(user_id) === -1) {
        this.following.push(user_id)
    }
    return this.save()
}
UserSchema.methods.addFollower = function (fs) {
    this.followers.push(fs)
    return this.save()
}
export default model('User', UserSchema)