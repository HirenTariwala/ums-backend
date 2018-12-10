const Sequelize = require('sequelize');
const db = require('../../config/db');

const AdminClientRelationSchema = {
    AdminId: {
      type: Sequelize.BIGINT,
      allowNull: false,
    },
    ClientId : {
      type: Sequelize.BIGINT,
      allowNull: false,
    }
}

const AdminClientRelation = db.sequelize.define('adminClientRelation', AdminClientRelationSchema);

module.exports = AdminClientRelation;
