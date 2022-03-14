const Path = require("../models/Path");
const Column = require("../models/Column");


exports.AllPath = async (req, res) => {
    try {
        const Allpaths = await Path.find({}).lean()
        res.send(Allpaths)
    } catch (error) {
        res.json({
            msg: error
        })
    }
}

exports.CreatePath = async (req, res) => {
    try {
        const {
            path
        } = req.body
        var CreateNewPath = await Path.create({
            path: path,
            section: ["📬 New Tasks", "✨ Do today", "✍ Do later"]
        })
        if (CreateNewPath) {
            CreateNewPath.section.map((value, index) => {
                var AddSection = Column.create({
                    sectionName: value,
                    pathOfSection: path,
                    tasks: [],
                    orederOfSection: index
                })
            })
            res.send({
                msg: "success"
            })
        }
    } catch (error) {
        res.json({
            msg: error
        })
    }
}


exports.FindPath = async (req, res) => {
    try {
        const path = req.params.path
        var GetPath = await Path.findOne({
            path: path
        })
        if (GetPath) {
            res.send(GetPath)
        }
    } catch (error) {
        res.json({
            msg: error
        })
    }
}

exports.AddSectionToPath = async (req, res) => {
    try {
        const {
            path,
            section
        } = req.body
        var GetPath = await Path.findOne({
            path: path
        })
        if (GetPath) {
            GetPath.section.push(section)
            GetPath.save()
            var AddSection = Column.create({
                sectionName: section,
                pathOfSection: path,
                tasks: [],
                orederOfSection: GetPath.section.length - 1
            })
            if (AddSection) {
                res.send({
                    msg: "success"
                })
            }
        }
    } catch (error) {
        res.json({
            msg: error
        })
    }
}
exports.RemoveSectionToPath = async (req, res) => {
    try {
        const {
            path,
            index
        } = req.body
        var GetPath = await Path.findOne({
            path: path
        })
        if (GetPath) {
            GetPath.section.splice(index, 1)
            GetPath.save()
            await Column.findOneAndDelete({
                pathOfSection: path,
                orederOfSection: index
            })
            res.send({
                msg: "success"
            })
        }
    } catch (error) {
        res.json({
            msg: error
        })
    }
}