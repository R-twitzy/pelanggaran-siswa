'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('detail_pelanggaran_siswa', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id_pelanggaran_siswa: {
        type: Sequelize.INTEGER,
        references: {
          model: "pelanggaran_siswa",
          key: "id_pelanggaran_siswa"
        }
      },
      id_pelanggaran: {
        type: Sequelize.INTEGER,
        references: {
          model: "pelanggaran",
          key: "id_pelanggaran"
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('detail_pelanggaran_siswa');
  }
};