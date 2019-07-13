const Problem = require("../models/Problem");
const ProblemImages = require("../models/ProblemImages.js");

const express = require("express");
const router = express.Router();
const uuid = require("uuid");
const authorization = require("../middlewares/authentications");
const getID = require("../utils/getUserId");
const fileUpload = require("../middlewares/FileUpload");

module.exports = {
  getProblem: router.get("/api/v1/problem/:problemId", async (req, res) => {
    try {
      
      const problemId = req.params.problemId;
      const post = await Problem.query()
        .select()
        .where("id", problemId)
        .first();
      const files = await ProblemImages.query()
        .select("image")
        .where("problem_id", problemId);
      let images = []
      files.map(img=>{
        images.push(img.image)
      })
      const problem = {
        ...post,
        images
      };
      return res.status(200).json({ problem });
    } catch (e) {
      return res.status(422).json({ error: e.message });
    }
  }),

  postProblem: router.post(
    "/api/v1/problems/post",
    fileUpload,
    async (req, res) => {
      try {
        let files = req.files;
        let images = [];
        let data = {
          id: uuid(),
          title: req.body.title,
          description: req.body.description,
          needed_amount: req.body.needed_amount,
          aquired: 1,
          user_id: req.body.user_id
        };
        files.map(file => {
          images.push({
            id: uuid(),
            problem_id: data.id,
            image: file.filename
          });
        });

        const problem = await Problem.query().insert(data);
        const problemImages = await ProblemImages.query().insertGraph(images);
        return res.status(200).json({ problem, problemImages });
      } catch (e) {
        res.status(422).json({ error: e.message });
      }
    }
  ),
  myPosts: router.get(
    "/api/v1/problems/myposts",
    authorization(),
    async (req, res) => {
      const user_id = getID(req);
      try {
        const myPosts = await Problem.query()
          .select()
          .where("user_id", user_id);
        return res.status(200).json({ myPosts });
      } catch (e) {
        res.status(422).json({ error: e.message });
      }
    }
  ),

  allposts: router.get("/api/v1/problems/allposts", async (req, res) => {
    try {
      let allposts = [];
      let posts = await Problem.query().select();
      for (var i = 0; i <= posts.length - 1; i++) {
        let id = posts[i].id;
        let Pimages = await ProblemImages.query()
          .select("image")
          .where("problem_id", id);
        let images = [];
        Pimages.map(img => {
          images.push(img.image);
        });
        allposts.push({
          ...posts[i],
          images
        });
      }
      console.log(allposts);
      return res.status(200).json({ allposts });
    } catch (e) {
      console.log(e);
      return res.status(422).json({ error: e.message });
    }
  }),

  deletePost: router.delete(
    "/api/v1/problems/delete/:postId",
    authorization(),
    async (req, res) => {
      const user_id = getID(req);
      try {
        const problem = await Problem.query()
          .select()
          .where("id", req.params.postId)
          .first();
        if (!problem) {
          return res.status(401).json({ error: " post not found" });
        }
        if (problem.user_id !== user_id) {
          return res.status(401).json({ error: "unauthorized access" });
        }
        const deleted = await Problem.query()
          .where("id", req.params.postId)
          .delete();
        if (deleted != 0) {
          return res
            .status(200)
            .json({ message: "post successfully deleted " });
        }
        return res.status(401).json({ error: "unknown error" });
      } catch (e) {
        res.status(422).json({ error: e.message });
      }
    }
  ),

  editPost: router.put(
    "/api/v1/problems/edit/:postId",
    authorization(),
    async (req, res) => {
      const user_id = getID(req);
      const title = req.body.title;
      const id = req.params.postId;
      try {
        const problem = await Problem.query()
          .select()
          .where("id", req.params.postId)
          .first();
        if (!problem) {
          return res.status(401).json({ error: "post not found" });
        }
        if (problem.user_id !== user_id) {
          return res.status(401).json({ error: "unauthorized access" });
        }
        const updated = await Problem.query()
          .where("id", id)
          .update({ title });
        if (updated != 0) {
          return res.status(200).json({ message: "post successfully updated" });
        }
        return res.status(401).json({ error: "unknown error" });
      } catch (e) {
        res.status(422).json({ error: e.message });
      }
    }
  )
};
