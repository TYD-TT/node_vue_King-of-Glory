module.exports = (app) => {
    const jwt = require('jsonwebtoken')
    const express = require('express')
    const AdminUser = require('../../models/AdminUser')
    const assert = require('http-assert')
    const router = express.Router({
        mergeParams: true
    })

    // 登录授权中间件
    const authMiddleware = require('../../middleware/auth')

    const resourceMiddleware = require('../../middleware/resource')


    // 创建资源接口
    router.post('/', async (req, res) => {
        const model = await req.Model.create(req.body)
        res.send(model)
    })

    // 更新资源信息接口
    router.put('/:id', async (req, res) => {
        await req.Model.findByIdAndUpdate(req.params.id, req.body)
        res.send({
            success: true
        })
    })

    // 删除资源接口
    router.delete('/:id', async (req, res) => {
        const model = await req.Model.findByIdAndDelete(req.params.id, req.body)
        res.send(model)
    })

    // 查询资源列表接口
    router.get('/', authMiddleware(), async (req, res) => {
        const queryOptions = {}
        if (req.Model.modelName === 'Category') {
            queryOptions.populate = 'parent'
        }
        const items = await req.Model.find().setOptions(queryOptions).limit(100)
        res.send(items)
    })

    // 根据ID查询资源详细信息的接口
    router.get('/:id', async (req, res) => {
        const model = await req.Model.findById(req.params.id)
        res.send(model)
    })

    app.use('/admin/api/rest/:resource', authMiddleware(), resourceMiddleware(), router)

    const multer = require('multer')
    const upload = multer({ dest: __dirname + '/../../uploads' })
    // upload.single('file') 代表单个文件的上传
    app.post('/admin/api/upload', authMiddleware(), upload.single('file'), async (req, res) => {
        const file = req.file
        file.url = `http://127.0.0.1:3000/uploads/${file.filename}`
        res.send(file)
    })

    // 登陆路由
    app.post('/admin/api/login', async (req, res) => {
        const { username, password } = req.body
        // 根据用户名找用户
        const user = await AdminUser.findOne({
            username: username
        }).select('+password')
        assert(user, 422, '用户不存在')
        // 校验密码
        const isvalid = require('bcrypt').compareSync(password, user.password)
        assert(isvalid, 422, '密码不存在')
        // 返回token
        const token = jwt.sign({ id: user._id }, app.get('secret'))
        res.send({ token })
    })
    // 错误处理函数
    app.use(async (err, req, res, next) => {
        res.status(err.statusCode || 500).send({
            message: err.message
        })
    })
}