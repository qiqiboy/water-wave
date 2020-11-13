if (process.env.NODE_ENV === 'production') {
    module.exports = require('./water-wave.cjs.production.js');
} else {
    module.exports = require('./water-wave.cjs.development.js');
}
