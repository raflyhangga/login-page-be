const pool = require('../../../database/db');

const addRefreshToken = async (refreshToken) => {
    await pool.query(
        'INSERT INTO refresh_token (refreshToken) VALUES ($1)',
        [refreshToken]
    );
}

const removeRefreshToken = async (refreshToken) => {
    const query = 'DELETE FROM refresh_token WHERE refreshToken = $1';
    const values = [refreshToken];
    await pool.query(query,values);
}

const getAllRefreshToken = async () => {
    const query = 'SELECT * FROM refresh_token';
    const resp = await pool.query(query);
    return resp.rows;
}

module.exports = { addRefreshToken,removeRefreshToken,getAllRefreshToken }
