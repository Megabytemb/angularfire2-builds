import { FirebaseApp, AngularFireModule } from 'angularfire2';
import { AngularFireDatabase, AngularFireDatabaseModule } from 'angularfire2/database';
import { TestBed, inject } from '@angular/core/testing';
import { COMMON_CONFIG } from './test-config';
var FIREBASE_APP_NAME = (Math.random() + 1).toString(36).substring(7);
describe('AngularFireDatabase', function () {
    var app;
    var db;
    beforeEach(function () {
        TestBed.configureTestingModule({
            imports: [
                AngularFireModule.initializeApp(COMMON_CONFIG, FIREBASE_APP_NAME),
                AngularFireDatabaseModule
            ]
        });
        inject([FirebaseApp, AngularFireDatabase], function (app_, _db) {
            app = app_;
            db = _db;
        })();
    });
    afterEach(function (done) {
        app.delete().then(done, done.fail);
    });
    describe('<constructor>', function () {
        it('should be an AngularFireDatabase type', function () {
            expect(db instanceof AngularFireDatabase).toEqual(true);
        });
        it('should accept a Firebase App in the constructor', function () {
            var __db = new AngularFireDatabase(app);
            expect(__db instanceof AngularFireDatabase).toEqual(true);
        });
        it('should have an initialized Firebase app instance member', function () {
            expect(db.app.name).toEqual(FIREBASE_APP_NAME);
        });
        it('should have an initialized Firebase database instance member', function () {
            expect(db.database.app.name).toEqual(FIREBASE_APP_NAME);
        });
    });
});
//# sourceMappingURL=database.spec.js.map