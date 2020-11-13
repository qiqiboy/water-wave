if (process.env.NODE_ENV === 'production') {
    module.exports = require('./water-wave.esm.production.js');
} else {
    module.exports = require('./water-wave.esm.development.js');
}
