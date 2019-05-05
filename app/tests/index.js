// Import modules
let chai = require('chai');
let app = require('../index');
// Set Chai's assertion style and add the plugin
chai.should();
chai.use(require('chai-http'));
// Run test suite
describe('home', () => {
    it('it should return status 200', done => {
        chai.request(app)
            .get('/')
            .end((err, res) => {
                res.should.have.status(200);
                done();
            })
    })
})