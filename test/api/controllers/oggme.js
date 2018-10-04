var should = require('should');
var request = require('supertest');
var server = require('../../../app');

describe('controllers', function() {

  describe('oggme', function() {

    describe('GET /oggme', function() {

      it('should return an OGG file download', function(done) {

        request(server)
          .get('/oggme')
          .set('Accept', 'audio/ogg')
          .expect('Content-Type', /audio\/ogg/)
          .expect('Content-Disposition', /attachment/)
          .expect(200)
          .end(function(err, res) {
            should.not.exist(err);

            console.log(res.body)

            res.body.should.eql('something @todo oggfile unique identifier');

            done();
          });
      });

      it('should accept a url parameter', function(done) {

        request(server)
          .get('/oggme')
          .query({ url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'})
          .set('Accept', 'audio/ogg')
          .expect('Content-Type', /audio\/ogg/)
          .expect('Content-Disposition', /attachment/)
          .expect(200)
          .end(function(err, res) {
            should.not.exist(err);

            res.body.should.eql('something @tod');

            done();
          });
      });

    });

  });

});
