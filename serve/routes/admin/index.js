module.exports = (app) => {
    const express = require('express')
    const router = express.Router({
        mergeParams: true
    })

    // 添加分类接口
    router.post('/', async (req, res) => {
        const model = await req.Model.create(req.body)
        res.send(model)
    })

    // 更新编辑分类信息的信息
    router.put('/:id', async (req, res) => {
        await req.Model.findByIdAndUpdate(req.params.id, req.body)
        res.send({
            success: true
        })
    })

    // 删除分类
    router.delete('/:id', async (req, res) => {
        const model = await req.Model.findByIdAndDelete(req.params.id, req.body)
        res.send(model)
    })

    // 查询所添加的分类接口
    router.get('/', async (req, res) => {
        const queryOptions = {}
        if (req.Model.modelName === 'Category') {
            queryOptions.populate = 'parent'
        }
        const items = await req.Model.find().setOptions(queryOptions)
        res.send(items)
    })

    // 根据ID查询分类的基本信息
    router.get('/:id', async (req, res) => {
        const model = await req.Model.findById(req.params.id)
        res.send(model)
    })

    app.use('/admin/api/rest/:resource', async (req, res, next) => {
        const modelName = require('inflection').classify(req.params.resource)
        req.Model = require(`../../models/${modelName}`)
        next()
    }, router)

    const multer = require('multer')
    const upload = multer({ dest: __dirname + '/../../uploads' })
    // upload.single('file') 代表单个文件的上传
    app.post('/admin/api/upload', upload.single('file'), async (req, res) => {
        const file = req.file
        file.url = `http://127.0.0.1:3000/uploads/${file.filename}`
        res.send(file)
    })

    // 登陆路由
    app.post('/admin/api/login', async (req, res) => {
        const { username, password } = req.body
        // 根据用户名找用户
        const AdminUser = require('../../models/AdminUser')
        const user = await AdminUser.findOne({
            username: username
        })
        // 校验密码
        // 返回token
    })
}