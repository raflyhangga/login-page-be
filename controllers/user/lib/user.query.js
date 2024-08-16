const pool = require ('../../../database/db');

const addUser = async (user) => {
    console.log("Inserting user..")
    console.log(user);
    await pool.query(
        'INSERT INTO "user" (name, username, password) VALUES ($1, $2, $3)',
        [user.name,user.username,user.password]
    );
}

const getUsers = async () => {
    const data = await pool.query(
        'SELECT * FROM "user"'
    );
    return data.rows;
}

module.exports = { addUser, getUsers }