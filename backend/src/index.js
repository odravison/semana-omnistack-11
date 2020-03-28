const express = require('express');
const cors = require('cors');

const ongRoutes = require('./routes/ongs.routes');
const incidentsRoutes = require('./routes/incidents.routes');
const profileRoutes = require('./routes/profile.routes');
const sessionRoutes = require('./routes/session.routes');

const app = express();

app.use(cors());

app.use(express.json());
app.use('/ongs', ongRoutes);
app.use('/sessions', sessionRoutes);
app.use('/profiles', profileRoutes);
app.use('/incidents', incidentsRoutes);
app.listen(3333);