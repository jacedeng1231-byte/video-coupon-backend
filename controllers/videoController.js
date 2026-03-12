const Video = require("../models/Video")
const VideoView = require("../models/VideoView")

exports.getVideos = async (req, res) => {
    try {
        const videos = await Video.find()
            .populate("rewardCoupon")

        res.json(videos)
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: error.message })
    }
}

exports.recordView = async (req, res) => {
    try {
        const { userId, videoId } = req.body

        const existing = await VideoView.findOne({
            userId,
            videoId
        })

        if (existing) {
            return res.json(existing)
        }

        const view = await VideoView.create({
            userId,
            videoId
        })

        res.json(view)
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: error.message })
    }
}

exports.createVideo = async (req, res) => {
    try {
        const video = await Video.create(req.body)
        res.json(video)
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: error.message })
    }
}

exports.updateVideo = async (req, res) => {
    try {
        const video = await Video.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        )

        res.json(video)
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: error.message })
    }
}

exports.deleteVideo = async (req, res) => {
    try {
        await Video.findByIdAndDelete(req.params.id)
        res.json({ message: "deleted" })
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: error.message })
    }
}