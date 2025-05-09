
import { postStatus, userStatus } from "../../config/constants.js";
import postSvc from "./posts.service.js";

class postControl {
    storePost = async(req,res,next) =>{
        try {
            let payload = await postSvc.transformCreatepost(req)
            let data = await postSvc.create(payload)

            res.json({
                data:data,
                message:"post created Successfuly",
                status:"post_CREATED",
                options:null

            })

        } catch (exception) {
            next(exception)
        }
    }
    showAllpost = async(req,res,next) =>{
        try {
            //search
            let filter ={}
            if(req.query.search){
                const searchRegex = new RegExp(req.query.search,'i')
                filter = { 
                    $or: [
                        { title: searchRegex },
                        { slug: searchRegex }
                    ]
                }
            }
            // console.log("FILTER APPLIED:", filter)
            const {data, pagination} = await postSvc.listAllpost({query:req.query,filter}
            )
            res.json({
                data:data,
                message:"All posts listed",
                status:"post_LISTED",
                options:{...pagination}
            })

        } catch (exception) {
            next(exception)
        }
    }
    getpostDetailBySlug = async(req,res,next) =>{
        try {
            const slug = req.params.slug;
            const post = await postSvc.getSingleRow({
                slug:slug
            })
            if(!post){
                next({
                    data:null,
                    message:`Post not found`,
                    status:"POST_NOT_FOUND",
                    options:null
                })
            }
            res.json({
                data:post,
                message:"A single post detail",
                status:"post_DETAIL",
                options:null
            })
        } catch (exception) {
            next(exception)
        }
    }
    getPublishedposts = async(req,res,next) =>{
        try {
            const filter = {
                status: postStatus.PUBLISHED
            }
            if (req.query.search) {
                const searchRegex = new RegExp(req.query.search, 'i');
                filter.$or = [
                    { title: searchRegex },
                    { slug: searchRegex }
                ];
            }
            const {data,pagination} = await postSvc.listAllpost({filter,query:req.query})
            res.json({
                data:data,
                message:"All the published posts",
                status:"ACTIVE_posts",
                options:{...pagination}
            })
        } catch (exception) {
            console.log(exception)
            next(exception)
        }
    }
    updatepostById = async(req,res,next) =>{
        try {
            const postId = req.params.id;
            const post = await postSvc.getSingleRow({
               _id:postId
            })
            if(!post){
                next({
                    code: 422,
                    message:"post not found",
                    status:"post_NOT_FOUND",
                    options:null
                })
            }

            //if post found
            const payload = await postSvc.transformUpdatepost(req,post);

            const updatedpost = await postSvc.updateRowByFilter({
                _id:postId
            },payload)

            res.json({
                data:updatedpost,
                message:"post Updated",
                status:'post_UPDATED',
                options:null

            })

        } catch (exception) {
            next(exception)
        }
    }
    deleteCatgoryById = async(req,res,next) =>{
        try {
            let postId = req.params.id;
            const post = await postSvc.deleteRowByFilter({
                _id:postId
            })
            res.json({
                data:null,
                message:"A categoory deleted",
                status:"post_DELETED"
            })

        } catch (exception) {
            next(exception)
        }
    }

    incrementViews = async(req,res,next) =>{
        try {
            const slug = req.params.slug;

            
        } catch (exception) {
            
        }
    }


}

const postCtrl = new postControl()
export default postCtrl