"use strict"

const Blog = require("../models/blog")

module.exports = {
    likeStatus: async (req, res) => {
     
      const base = req.baseUrl
    
      const par = base.split("blogs/")
      // console.log("par", par);
      
            const userId = req.body.userId = req.user._id
            // console.log(userId);
            const blogId  = req.body.blogId =par[1]
            // console.log(blogId)
   
             
// console.log("blogId" ,blogId);
         const blog = await Blog.findOne({ _id: blogId })
         if (!blog) {
          res.errorStatusCode = 404;
          throw new Error("Blog not found");
        }
    
        const userLikesBlog = blog.likes.includes(userId);
    
        if (!userLikesBlog) {
          await Blog.updateOne(
            { _id: blogId },
            {
              $addToSet: { likes: userId }, // $addToSet kullanarak tekrar eklemeyi önler
            }
            // Güncellenmiş belgeyi döndürmek için
          );
          res.status(201).send({
            error: false,
            message: "Blog liked successfully",
          });
        } else {
          await Blog.updateOne(
            {_id: blogId },
            {
              $pull: { likes: userId }, // Belirli bir kullanıcının beğenisini kaldırır
            }
          );
    
          res.status(201).send({
            error: false,
            message: "Blog disliked successfully",
          });
        }
      },

      getLikeInfo: async (req, res) => {
        const base = req.baseUrl
    
        const par = base.split("blogs/")
        // console.log("par", par);
        
              const userId = req.body.userId = req.user._id
              // console.log(userId);
              const blogId  = req.body.blogId =par[1]
              // console.log(blogId)
     
               
  // console.log("blogId" ,blogId);
           const blog = await Blog.findOne({ _id: blogId })
           if (!blog) {
            res.errorStatusCode = 404;
            throw new Error("Blog not found");
          }else{
            res.status(200).send({
              error: false,
              like: await Blog.findOne({_id: blogId})
            })
          }
      }
    };