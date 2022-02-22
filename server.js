const express = require(`express`)
const app = express()
const PORT = 8080

let routes = [
    { prefix: `/siswa`, route: require(`./routes/siswa`)},
    { prefix: `/user`, route: require(`./routes/user`)},
    { prefix: `/pelanggaran`, route: require(`./routes/pelanggaran`)},
    {
        prefix: `/pelanggaran_siswa`, 
        route: require(`./routes/pelanggaran_siswa`)
    },
]

for (let i = 0; i < routes.length; i++) {
    app.use(routes[i].prefix, routes[i].route)
}

app.listen(PORT, () => {
    console.log(`Server run on port ${PORT}`);
})