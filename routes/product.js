const express = require('express');
const connection = require('../connection');
const router = express.Router();

router.post('/create', (req, res) => {
    try {
        const data = req.body;
        query = "insert into product(pname, price, discription, quantity) values (?,?,?,?)";
        const results = connection.query(query, [data.pname, data.price, data.discription, data.quantity]);
        return res.status(201).send({ message: 'successful!!', data: results.values });
    } catch (error) {
        return res.status(500).send(error)
    }
});

router.get('/getById/:id', async (req, res) => {
    try {
        const id = req.params.id;
        var query = "select * from product where id=?";
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

router.get('/getAllProduct', (req, res) => {
    try {
        var query = "select * from product";
        connection.query(query, (err, results) => {
            if (!err) {
                return res.status(200).send({ data: results })
            } else {
                return res.status(500).send(err)
            }
        })
    } catch (error) {
        return res.status(500).send(error);
    }
});

router.delete('/delete/:id', (req, res) => {
    try {
        const id = req.params.id;
       var query = "delete from product where id=?";
        connection.query(query, [id], (err, results) => {
            if (!err) {
                return res.status(200).send('successfully deleted data!')
            } else {
                return res.status(500).send(err)
            }
        })
    } catch (error) {
        return res.status(500).send(error)
    }
});

module.exports = router;