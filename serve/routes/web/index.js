const Category = require('../../models/Category')
const Article = require('../../models/Article')

module.exports = app => {
    const router = require('express').Router()
    router.get('/news/list', async (req, res) => {
        // const parent = await Category.findOne({
        //     name:'新闻资讯'
        // }).populate({
        //     path:"children",
        //     populate:{
        //         path:"newsList"
        //     }
        // }).lean()
        const parent = await Category.findOne({
            name: "新闻资讯"
        })

        const cats = await Category.aggregate([
            { $match: { parent: parent._id } },
            {
                $lookup: {
                    from: 'articles',
                    localField: '_id',
                    foreignField: 'categories',
                    as: 'newsList'
                }
            },
            {
                $addFields: {
                    newsList: { $slice: ['$newsList', 5] }
                }
            }
        ])

        const subCats = cats.map(v => v._id)
        cats.unshift({
            name: '热门',
            newsList: await Article.find().where({
                categories: { $in: subCats }
            }).limit(5).lean()
        })

        cats.map(cat=>{
            cat.newsList.map(news=>{})
        })
        res.send(cats)
    })

    app.use('/web/api', router)
}