const Video = require("../models/Video")
const VideoView = require("../models/VideoView")
const CouponClaim = require("../models/CouponClaim")

exports.getVideos = async (req, res) => {
    try {
        const { userId } = req.query
        const videos = await Video.find()
            .populate("rewardCoupon")

        if (!userId) {
            const videosWithStats = await Promise.all(videos.map(async video => {
                const videoObj = video.toObject()
                videoObj.totalViews = await VideoView.countDocuments({ videoId: video._id })
                videoObj.totalClaims = await CouponClaim.countDocuments({ fromVideoId: video._id })
                return videoObj
            }))
            return res.json(videosWithStats)
        }

        // Get all watched records for this user
        const watchedViews = await VideoView.find({ userId })
        const watchedVideoIds = watchedViews.map(v => v.videoId.toString())

        // Get all claimed coupons for this user
        const claimedCoupons = await CouponClaim.find({ userId })

        const videosWithStatus = videos.map(video => {
            const videoObj = video.toObject()
            videoObj.isWatched = watchedVideoIds.includes(video._id.toString())
            // 經確檢查是否從「這部影片」領取過
            videoObj.isClaimed = claimedCoupons.some(c => 
                c.fromVideoId?.toString() === video._id.toString() || 
                (video.rewardCoupon && c.couponId.toString() === video.rewardCoupon._id.toString())
            )
            return videoObj
        })

        res.json(videosWithStatus)
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