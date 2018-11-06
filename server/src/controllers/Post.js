const { Post } = require('../models')

module.exports = {
  async getAll (req, res) {
    try {
      // const { createdBy } = req.params
      console.log('req.query!', req.query)
      let posts
      if (req.query) {
        posts = await Post.findAll({
          where: {
            ...req.query
          }
        })
      } else {
        posts = await Post.findAll()
      }
      res.send({ posts })
    } catch (e) {
      res.status(400).send({
        error: `${e.message || 'Unknown error'}`
      })
    }
  },
  async getOne (req, res) {
    try {
      const post = await Post.findOne({
        where: {
          uuid: req.params.uuid
        }
      })
      console.log('POST!', post)
      res.send(post)
    } catch (e) {
      res.status(400).send({
        error: `${e.message || 'Unknown error'}`
      })
    }
  },
  async create (req, res) {
    try {
      const { title, content, createdBy } = req.body
      if (!title) throw new Error(`Post must have a title`)
      if (!content) throw new Error(`Post body must have a JSON 'content' payload`)
      if (!createdBy) throw new Error(`Post must have an author in 'createdBy' field`)
      const existingPost = await Post.findOne({
        where: {
          title: req.body.title,
        }
      })
      if (existingPost) throw new Error(`A post with that name already exists`)

      const post = await Post.create(req.body)

      res.send(post)
    } catch (e) {
      res.status(400).send({
        error: `${e.message || 'Unknown error'}`
      })
    }
  },
  async update (req, res) {
    try {
      const { title, content, createdBy } = req.body
      const { uuid } = req.params

      if (!title) throw new Error(`Post must have a title`)
      if (!content) throw new Error(`Post body must have a JSON 'content' payload`)
      if (!createdBy) throw new Error(`Post must have an author in 'createdBy' field`)
      if (!uuid) throw new Error(`Updates to posts must have a valid 'uuid' field`)
      const post = await Post.update({ title, content, createdBy }, { where: { uuid },
      })

      res.send(post)
    } catch (e) {
      res.status(400).send({
        error: `${e.message || 'Unknown error'}`
      })
    }
  },
  async delete (req, res) {
    try {
      const { uuid } = req.params
      await Post.destroy({ where: { uuid } })

      res.send(200)
    } catch (e) {
      res.status(400).send({
        error: `${e.message || 'Unknown error'}`
      })
    }
  },
}
