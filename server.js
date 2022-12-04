const express = require('express')
const app = express()
const port = 3000

const { Pool } = require('pg')
const db = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'tour499',
    password: '123',
    port: 5433
})


app.use('/', express.static('www'))

app.listen(port, () => {
    console.log(`http://localhost:${port}`)
})


app.get('/api/getdata', (req, res) => {
    let sql = "select picture,name,description,source, st_x(geom1) as lng ,st_y(geom1) as lat from tour_point_4326";
    db.query(sql).then(r => {
        // console.log(r.rows)
        res.json({
            data: r.rows
        })
    })
})

app.get('/api/getdata/tour', (req, res) => {
    let sql = "select picture,name,description, source, st_x(geom1) as lng ,st_y(geom1) as lat from tour_point_4326 where type_1 = 'แหล่งท่องเที่ยวเชิงวัฒนธรรม'";
    db.query(sql).then(r => {
        // console.log(r.rows)
        res.json({
            data: r.rows
        })
    })
})

app.get('/api/getdata/restaurant', (req, res) => {
    let sql = "select picture,name,description, source, st_x(geom1) as lng ,st_y(geom1) as lat from tour_point_4326 where type_1 = 'ร้านอาหาร'";
    db.query(sql).then(r => {
        // console.log(r.rows)
        res.json({
            data: r.rows
        })
    })
})

app.get('/api/getdata/hostel', (req, res) => {
    let sql = "select picture,name,description, source, st_x(geom1) as lng ,st_y(geom1) as lat from tour_point_4326 where type_1 = 'ที่พัก'";
    db.query(sql).then(r => {
        // console.log(r.rows)
        res.json({
            data: r.rows
        })
    })
})
app.get('/api/getdata2', (req, res) => {
    let sql = "select picture,name,description, id, source, st_x(geom1) as lng ,st_y(geom1) as lat from public.tour_point_4326  where id = 1 or id = 9 or id = 61 or id = 2 or id = 3 or id = 5 or id = 8 or id = 10 or id = 4 or id = 7 or id = 64 "
    db.query(sql).then(r => {
        // console.log(r.rows)
        res.json({
            data: r.rows
        })
    })
})

app.get('/api/getbyroute/:rt', (req, res) => {
    const rt = req.params.rt
    // console.log(rt);
    let sql = `select * from public.tour_point_4326 where ${rt}=1`
    // console.log(sql);
    db.query(sql).then(r => {
        // console.log(r.rows)
        res.json({
            data: r.rows
        })
    })
})

app.get('/api/getbyroute/:t', (req, res) => {
    const t = req.params.t
    // console.log(t);
    let sql = `select * from public.tour_point_4326 where ${t}=1`
    // console.log(sql);
    db.query(sql).then(r => {
        // console.log(r.rows)
        res.json({
            data: r.rows
        })
    })
})

app.get('/api/getbyrote/:st', (req, res) => {
    const st = req.params.st
    let sql = `select name, st_x(geom1) as lng ,st_y(geom1) as lat from public.tour_point_4326 where st = ${st}`;
    db.query(sql).then(r => {
        // console.log(r.rows)
        res.json({
            data: r.rows
        })
    })
})

app.get('/api/getdata3', (req, res) => {
    let sql = "select picture,name,description, id, source, st_x(geom1) as lng ,st_y(geom1) as lat from public.tour_point_4326  where id = 62 or id = 63  or id = 3 or id = 6  "
    db.query(sql).then(r => {
        // console.log(r.rows)
        res.json({
            data: r.rows
        })
    })
})

app.get('/api/getdata4', (req, res) => {
    let sql = "select picture,name,description, id, source, st_x(geom1) as lng ,st_y(geom1) as lat from public.tour_point_4326  where id = 65 or id = 3  or id = 7 "
    db.query(sql).then(r => {
        // console.log(r.rows)
        res.json({
            data: r.rows
        })
    })
})

app.get('/api/getdata5', (req, res) => {
    let sql = "select picture,name,description, id, source, st_x(geom1) as lng ,st_y(geom1) as lat from public.tour_point_4326  where id = 5"
    db.query(sql).then(r => {
        // console.log(r.rows)
        res.json({
            data: r.rows
        })
    })
})


app.get('/api/getbygps/:lng/:lat/:dis', (req, res) => {
    const lat = req.params.lat
    const lng = req.params.lng
    const dis = req.params.dis
    let sql = `select name, picture,description,source, st_x(geom1) as lng ,st_y(geom1) as lat
    from tour_point_4326 where ST_DWithin(st_transform(geom1, 32647),
        st_transform(st_geomfromtext('POINT(${lng} ${lat})', 4326), 32647),
        ${dis}) = true `
    db.query(sql).then(r => {
        res.json({
            data: r.rows
        })
    })
})

