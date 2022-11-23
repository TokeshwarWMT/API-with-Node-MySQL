const express = require('express');
const connection = require('../connection');
const router = express.Router();

router.post('/register', async (req, res) => {
    try {
        var product = req.body;
        query = "insert into user(name, email, password, address) values(?,?,?,?)"
        const results = connection.query(query, [product.name, product.email, product.password, product.address]);
        return res.status(201).send({ message: 'successful!!', data: results.values })

    } catch (error) {
        return res.status(500).send(error)
    }
});

router.get('/getById/:id', async (req, res) => {
    try {
        const id = req.params.id;
        var query = "select * from user where id=?";
        connection.query(query, [id], (err, results) => {
            if (!err) {
                return res.status(200).send({ data: results })
            } else {
                return res.status(500).send(err)
            }
        })
    } catch (error) {
        return res.status(500).status(error)
    }
});

router.get('/getAllProducts', async (req, res) => {
    try {
        var query = "select * from user";
        const product = await connection.query(query, (err, results) => {
            if (!results) {
                return res.status(404).send('data not found!!')
            } else {
                return res.status(200).send({ message: 'successful!!', data: results })
            }
        });
    } catch (error) {
        return res.status(500).send(error)
    }
});

router.get('/getAllProducts', async (req, res) => {
    try {
        var query = "show databases";
        const product = await connection.query(query, (err, results) => {
            if (!results) {
                return res.status(404).send('data not found!!')
            } else {
                return res.status(200).send({ message: 'successful!!', data: results })
            }
        });
    } catch (error) {
        return res.status(500).send(error)
    }
});

router.put('/update/:id', (req, res) => {
    try {
        const id = req.params.id;
        const data = req.body;
        var query = "update user set name=?,email=?,password=?,address=? where id=?"
        const results = connection.query(query, [data.name, data.email, data.password, data.address, id])
        if (!results) {
            return res.status(404).send('user id not found!!')
        } else {
            return res.status(200).send({ message: 'updated data successfully!!', data: results.values });
        }
    } catch (error) {
        return res.status(500).send(error)
    }
});

router.delete('/delete/:id', (req, res) => {
    try {
        const id = req.params.id;
        var query = "delete from user where id=?";
        connection.query(query, [id], (err, results) => {
            if (!err) {
                if (results.affectedRows == 0) {
                    return res.status(404).send('product id does not found!!')
                }
                return res.status(200).send('product delete successfully!!')
            } else {
                return res.status(500).send(err)
            }
        });
    } catch (error) {
        return res.status(500).send(error)
    }
});

module.exports = router;