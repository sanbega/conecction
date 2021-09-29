const path = require('path')

module.exports = {
    client: 'postgresql',
    connection: {
        database: 'saana',
        user: 'santiago',
        password: '12345'
    },
    migrations: {
        tableName: 'migrations',
        directory: path.join(__dirname, 'database/migrations')
    }
}
