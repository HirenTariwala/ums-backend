const Sequelize = require('sequelize');
const db = require('../../config/db');

const AdminClientRelationSchema = {
    id: {
      type: Sequelize.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    AdminId: {
      type: Sequelize.BIGINT,
      allowNull: false,
    },
    ClientId : {
      type: Sequelize.BIGINT,
      allowNull: false,
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
}

const AdminClientRelation = db.sequelize.define('adminClientRelations', AdminClientRelationSchema);

AdminClientRelation.removeAdmin =  function removeAdmin(AdminId,ClientId){
  debugger;
   return this.destroy({
     where : {
      AdminId,
      ClientId
     }
   })
}

module.exports = AdminClientRelation;
