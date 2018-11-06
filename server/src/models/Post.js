const uuid = require('uuid/v4')

module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define('Post', {
    uuid: {
      type: DataTypes.UUID,
      defaultValue: uuid(),
      primaryKey: true
    },
    title: DataTypes.STRING,
    createdBy: DataTypes.STRING,
    content: DataTypes.JSON,
  })

  return Post
}
