const express = require('express');
const router = express.Router();
const connection = require('../connection');

router.post('/register', async (req, res) => {
    try {
        var product = req.body;
        query = "insert into product(name, age, address) values(?,?,?)"
        connection.query(query, [product.name, product.age, product.address], (err, results) => {
            console.log(product);
            if (!err) {
                return res.status(201).send({ message: 'successful!!', data: product })
            } else {
                return res.status(500).send(err)
            }
        });
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
                return res.status(200).send(results)
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
        var query = "select * from product";
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
        var query = "update product set name=?,age=?,address=? where id=?"
        connection.query(query, [data.name, data.age, data.address, id], (err, results) => {
            if (!err) {
                if (results.affectedRows == 0) {
                    return res.status(404).send('product id does not found!!')
                }
                return res.status(201).send('product updated successfully!!')
            } else {
                return res.status(500).send(err)
            }
        })
    } catch (error) {
        return res.status(500).send(error)
    }
});

router.delete('/delete/:id', (req, res) => {
    try {
        const id = req.params.id;
        var query = "delete from product where id=?";
        connection.query(query, [id], (err, results) => {
            if (!err) {
                if (results.affectedRows == 0) {
                    return res.status(404).send('product id does not found!!')
                }
                return res.status(200).send('product delete successfully11')

            } else {
                return res.status(500).send(err)
            }
        });
    } catch (error) {
        return res.status(500).send(error)
    }
});

module.exports = router;