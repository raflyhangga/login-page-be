const pool = require ('../../../database/db');
const { use } = require('../../../routes/token.router');

const addUser = async (user) => {
    console.log("Inserting user..")
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

const getSessionProfile = async (userID) => {
    const query = 'SELECT * FROM "user" WHERE id = $1';
    const values = [userID]
    const data = await pool.query(query,values);
    return data.rows;
}

const getUser = async (username) => {
    const query = 'SELECT * FROM "user" WHERE username = $1';
    const values = [username];
    const data = await pool.query(query,values);
    return data.rows;
}

module.exports = { addUser, getUsers, getSessionProfile, getUser }