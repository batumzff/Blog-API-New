"use strict"

const { mongoose: { Schema, model }} = require("../configs/dbConnection")

const BlogSchema = new Schema({

  
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
        index: true
    },

  
    categoryId: {
        type: Schema.Types.ObjectId,
        ref: "Category",
        required: true,
        index: true
    },

 
    title: {
        type: String,
        trim: true,
        required: true
    },

    comments: [],

    totalNumberOfComments: {
        type: Number,
        default: function() { return this.comments.length },
        transform: function() { return this.comments.length}
    },

    likes: {
        type: Array,
        default: []
    },

    totalLikes: {
        type: Number,
        default: function() { return this.likes.length},
        transform: function() { return this.likes.length}
    },

    content: {
        type: String,
        trim: true,
        required: true
    },

    image: [],

    countOfViews: {
        type: Array,
        default: []
    },


    isPublish: {
        type: Boolean,
        default: true
    },

    isDeleted: {
        type: Boolean,
        default: false
    },
  
   
}, {
    collection: "blogs",
    timestamps: true
})



module.exports = model("Blog", BlogSchema)