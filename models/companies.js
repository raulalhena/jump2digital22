export default (sequelize, type) => {
    return sequelize.define('companies', {
        counter: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        id: type.STRING,
        website: type.STRING,
        name: type.STRING,
        founded: type.INTEGER,
        size: type.STRING,
        locality: type.STRING,
        region: type.STRING,
        country: type.STRING,
        industry: type.STRING,
        linkedin_url: type.STRING
    });
}