import * as postService from "../services/post";

export const getPosts = async (req, res) => {
   try {
      const response = await postService.getPostsService();
      return res.status(200).json(response);
   } catch (error) {
      return res
         .status(500)
         .json({ err: -1, msg: "Failed at  post controller " + error });
   }
};

export const getPostsLimit = async (req, res) => {
   const { page, priceNumber, acreageNumber, ...query } = req.query;

   try {
      const response = await postService.getPostsLimitService(page, query, {
         priceNumber,
         acreageNumber,
      });
      return res.status(200).json(response);
   } catch (error) {
      return res
         .status(500)
         .json({ err: -1, msg: "Failed at  post controller " + error });
   }
};

export const getNewPosts = async (req, res) => {
   try {
      const response = await postService.getNewPostsService();
      return res.status(200).json(response);
   } catch (error) {
      return res.status(500).json({ err: -1, msg: "Failed at post controller " + error });
   }
};

export const createNewPost = async (req, res) => {
   try {
      const { categoryCode, title, priceNumber, acreageNumber, label } = req.body;

      const { id } = req.user;
      if (!categoryCode || !id || !title || !priceNumber || !acreageNumber || !label)
         return res.status(400).json({ err: 1, msg: "Missing inputs" });
      const response = await postService.createNewPostService(req.body, id);
      return res.status(200).json(response);
   } catch (error) {
      return res
         .status(500)
         .json({ err: -1, msg: "Failed at create post controller " + error });
   }
};

export const managerPost = async (req, res) => {
   try {
      const { page, ...query } = req.body;
      const { id } = req.user;
      if (!id) return res.status(400).json({ err: 1, msg: "Missing inputs" });
      const response = await postService.getPostManagerService(page, id, query);
      return res.status(200).json(response);
   } catch (error) {
      return res
         .status(500)
         .json({ err: -1, msg: "Failed at manager post controller " + error });
   }
};

export const updatePostController = async (req, res) => {
   const { postId, attributesId, imagesId, overviewId, ...payload } = req.body;
   const { id } = req.user;
   try {
      if (!postId || !id || !attributesId || !imagesId || !overviewId)
         return res.status(400).json({ err: 1, msg: "Missing inputs" });
      const response = await postService.updatePost(req.body);
      return res.status(200).json(response);
   } catch (error) {
      return res
         .status(500)
         .json({ err: -1, msg: "Failed at  update post controller " + error });
   }
};

export const deletePostController = async (req, res) => {
   const { postId } = req.query;
   const { id } = req.user;
   try {
      if (!postId || !id) return res.status(400).json({ err: 1, msg: "Missing inputs" });
      const response = await postService.deletePost(postId);
      return res.status(200).json(response);
   } catch (error) {
      return res
         .status(500)
         .json({ err: -1, msg: "Failed at  delete post controller " + error });
   }
};
