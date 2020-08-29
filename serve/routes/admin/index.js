module.exports = (app) => {
    const express = require('express')
    const router = express.Router()
    const Category = require('../../models/Category')

    // 添加分类接口
    router.post('/categories', async (req, res) => {
        const model = await Category.create(req.body)
        res.send(model)
    })

    // 更新编辑分类信息的信息
    router.put('/categories/:id', async (req, res) => {
        await Category.findByIdAndUpdate(req.params.id, req.body)
        res.send({
            success: true
        })
    })

    // 删除分类
    router.delete('/categories/:id', async (req, res) => {
        const model = await Category.findByIdAndDelete(req.params.id, req.body)
        res.send(model)
    })

    // 查询所添加的分类接口
    router.get('/categories', async (req, res) => {
        const items = await Category.find()
        res.send(items)
    })

    // 根据ID查询分类的基本信息
    router.get('/categories/:id', async (req, res) => {
        const model = await Category.findById(req.params.id)
        res.send(model)
    })

    app.use('/admin/api', router)
}