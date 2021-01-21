const { findByIdAndDelete } = require('../models/noteModel');
const Notes = require('../models/noteModel');

const noteController = {
    // Get
    getNotes: async (req, res) => {
        try {
            const notes = await Notes.find({ user_id: req.user.id });
            res.status(400).json(notes)
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
    // Create
    createNote: async (req, res) => {
        try {
            const { title, content, date } = req.body;
            const newNote = new Notes({
                title, content, date,
                user_id: req.user.id,
                name: req.user.name
            });

            await newNote.save();

            res.json({ msg: "Create note successfully" });

        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
    // Delete 
    deleteNote: async (req, res) => {
        try {
            await Notes.findByIdAndDelete(req.params.id)
            res.json({ msg: "Delete a note successfully" })
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
    // Update
    updateNote: async (req, res) => {
        try {
            const { title, content, date } = req.body;
            await Notes.findByIdAndUpdate({ _id: req.params.id }, {
                title, content, date
            });
            res.json({ msg: "Update a note successfully" })
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },

    // GetNote
    getNote: async (req, res) => {
        try {
            const note = await Notes.findById(req.params.id);
            res.json(note);
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    }
}

module.exports = noteController;