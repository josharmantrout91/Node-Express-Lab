const express = require("express");

const db = require("./db.js");

const router = express.Router();

// POST to /api/posts - Creates a post using the information sent inside the request body.
router.post("/", async (req, res) => {
  try {
    const post = await db.insert(req.body);

    if (req.body.title && req.body.contents) {
      res.status(201).json(post);
    } else {
      res.status(400).json({
        errorMessage: "Please provide title and contents for the post."
      });
    }
  } catch (error) {
    res.status(500).json({
      error: "There was an error while saving the post to the database"
    });
  }
});

// GET to /api/posts - Returns an array of all the post objects contained in the database.
router.get("/", async (req, res) => {
  try {
    const posts = await db.find();
    res.status(200).json(posts);
  } catch (error) {
    // log error to database
    console.log(error);
    res
      .status(500)
      .json({ error: "The posts information could not be retrieved." });
  }
});

// GET to /api/posts/:id - Returns the post object with the specified id.
router.get("/:id", async (req, res) => {
  try {
    const post = await db.findById(req.params.id);

    if (post) {
      res.status(200).json(post);
    } else {
      res
        .status(404)
        .json({ error: "The posts information could not be retrieved." });
    }
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: "The post information could not be retrieved." });
  }
});

// DELETE to /api/posts/:id	- Removes the post with the specified id and returns the deleted post object. You may need to make additional calls to the database in order to satisfy this requirement.
router.delete("/:id", async (req, res) => {
  try {
    count = await db.remove(req.params.id);
    if (count) {
      res.status(200).json({ message: "The hub has been nuked" });
    } else {
      res
        .status(404)
        .json({ message: "The post with the specified ID does not exist." });
    }
  } catch (error) {
    res.status(500).json({ error: "The post could not be removed" });
  }
});
// PUT to /api/posts/:id - Updates the post with the specified id using data from the request body. Returns the modified document, NOT the original.
router.put("/:id", async (req, res) => {
  try {
    updated = await db.update(req.params.id, req.body);

    if (!req.params.id) {
      res
        .status(404)
        .json({ message: "The post with the specified ID does not exist." });
    } else if (req.body.title && req.body.contents) {
      res.status(200).json(updated);
    } else {
      res
        .status(400)
        .json({
          errorMessage: "Please provide title and contents for the post."
        });
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: "The post information could not be modified." });
  }
});

module.exports = router;
