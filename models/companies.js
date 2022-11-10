/**
 *  Stating Sequelize Companies model
 */

export default (sequelize, type) => {
    return sequelize.define('companies', {
        counter: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        id: {
            type: type.STRING,
            allowNull: false,
            unique: true
        },
        website: type.STRING,
        name: {
            type: type.STRING,
            unique: true
        },
        founded: type.INTEGER,
        size: type.STRING,
        locality: type.STRING,
        region: type.STRING,
        country: type.STRING,
        industry: type.STRING,
        linkedin_url: type.STRING
    });
}