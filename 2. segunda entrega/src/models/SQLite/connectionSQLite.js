const options = {
    client: 'sqlite3',
    connection: {
        filename: "./src/models/SQLite/dbFile.sqlite"
    },
    useNullAsDefault: true
}

module.exports = {options}