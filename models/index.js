const User = require("./User");
const Post = require("./Post");
const Comment = require("./Comment");

// create associations
User.hasMany(Post, {
    foreignKey: "user_id",
});

Post.belongsTo(User, {
    foreignKey: "user_id",
});

Comment.belongsTo(User, {
    foreignKey: "user_id",
    hooks: true,
});

Comment.belongsTo(Post, {
    foreignKey: "post_id",
    hooks: true,
});

User.hasMany(Comment, {
    foreignKey: "user_id",
    onDelete: "CASCADE",
    hooks: true,
});

Post.hasMany(Comment, {
    foreignKey: "post_id",
    onDelete: "CASCADE",
    hooks: true,
});

module.exports = { User, Post, Comment };