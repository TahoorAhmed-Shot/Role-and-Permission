const express = require("express");
const fetchuser = require("../middleware/fetchuser");
const app = express();
const router = express.Router();
const Notes = require("../models/notes");
const { param } = require("./auth");

router.get("/getNotes", fetchuser, async (req, res) => {
  let user = await Notes.find({ user: req.user.id }).sort({ updateTime: -1 });

  res.json({ user: user });
});

router.post("/createNote", fetchuser, async (req, res) => {
  try {
    let { tittle, description, tag, updateTime } = req.body;
    let notes = new Notes({
      tittle,
      description,
      tag,
      updateTime: new Date(),
      user: req.user.id,
    });
    let result = await notes.save();
    res.json({ result });
    console.log(result);
  } catch (err) {
    console.log(err);
  }
});

router.put("/updateNote/:id", fetchuser, async (req, res) => {
  try {
    console.log(req.params.id);

    let newNotes = {};
    let { tittle, description, tag } = req.body;
    if (tittle) {
      newNotes.tittle = tittle;
    }
    if (description) {
      newNotes.description = description;
    }
    if (tag) {
      newNotes.tag = tag;
    }

    let notes = await Notes.findById(req.params.id);
    if (!notes) {
      res.status(404).json({ user: "Invalid Notes" });
    }
    if (notes.user.toString() !== req.user.id) {
      res.status(404).json({});
    }

    let updateNotes = await Notes.findByIdAndUpdate(req.params.id, {
      $set: newNotes,
    });

    res.json({ newNotes: newNotes });
  } catch (err) {
    console.log(err);
  }
});

router.delete("/deleteNote/:id", fetchuser, async (req, res) => {
  try {
    let notes = await Notes.findById(req.params.id);
    if (!notes) {
      res.status(404).json({ user: "Invalid Notes" });
    }
    if (notes.user.toString() !== req.user.id) {
      res.status(404).json({});
    }

    let updateNotes = await Notes.findByIdAndDelete(req.params.id);

    res.json({ newNotes: updateNotes });
  } catch (err) {
    console.log(err);
  }
});

router.put("/boostNotes/:id", fetchuser, async (req, res) => {
  try {
    let { updateTime } = req.body;
    let notes = await Notes.findById(req.params.id);
    if (!notes) {
      res.status(404).json({ user: "Invalid Notes" });
    }
    if (notes.user.toString() !== req.user.id) {
      res.status(404).json({});
    }

    let updateNotes = await Notes.findByIdAndUpdate(req.params.id, {
      $currentDate: {
        updateTime: true,
      },
    });

    res.json({ newNotes: "success", updateNotes });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
