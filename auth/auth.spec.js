import { Subject } from 'rxjs/Subject';
import { TestBed, inject } from '@angular/core/testing';
import { take } from 'rxjs/operator/take';
import { skip } from 'rxjs/operator/skip';
import { FirebaseApp, AngularFireModule } from 'angularfire2';
import { AngularFireAuth, AngularFireAuthModule } from 'angularfire2/auth';
import { COMMON_CONFIG } from './test-config';
function authTake(auth, count) {
    return take.call(auth, 1);
}
function authSkip(auth, count) {
    return skip.call(auth, 1);
}
var firebaseUser = {
    uid: '12345',
    providerData: [{ displayName: 'jeffbcrossyface' }]
};
describe('AngularFireAuth', function () {
    var app;
    var afAuth;
    var authSpy;
    var mockAuthState;
    beforeEach(function () {
        TestBed.configureTestingModule({
            imports: [
                AngularFireModule.initializeApp(COMMON_CONFIG),
                AngularFireAuthModule
            ]
        });
        inject([FirebaseApp, AngularFireAuth], function (app_, _auth) {
            app = app_;
            afAuth = _auth;
        })();
        mockAuthState = new Subject();
        spyOn(afAuth, 'authState').and.returnValue(mockAuthState);
        spyOn(afAuth, 'idToken').and.returnValue(mockAuthState);
        afAuth.authState = mockAuthState;
        afAuth.idToken = mockAuthState;
    });
    afterEach(function (done) {
        app.delete().then(done, done.fail);
    });
    describe('Zones', function () {
        it('should call operators and subscriber in the same zone as when service was initialized', function (done) {
            var ngZone = Zone.current.fork({
                name: 'ngZone'
            });
            ngZone.run(function () {
                var subs = [
                    afAuth.authState.subscribe(function (user) {
                        expect(Zone.current.name).toBe('ngZone');
                        done();
                    }, done.fail),
                    afAuth.authState.subscribe(function (user) {
                        expect(Zone.current.name).toBe('ngZone');
                        done();
                    }, done.fail)
                ];
                mockAuthState.next(firebaseUser);
                subs.forEach(function (s) { return s.unsubscribe(); });
            });
        });
    });
    it('should be exist', function () {
        expect(afAuth instanceof AngularFireAuth).toBe(true);
    });
    it('should have the Firebase Auth instance', function () {
        expect(afAuth.auth).toBeDefined();
    });
    it('should emit auth updates through authState', function (done) {
        var count = 0;
        var subs = afAuth.authState.subscribe(function (user) {
            if (count === 0) {
                expect(user).toBe(null);
                count = count + 1;
                mockAuthState.next(firebaseUser);
            }
            else {
                expect(user).toEqual(firebaseUser);
                subs.unsubscribe();
                done();
            }
        }, done, done.fail);
        mockAuthState.next(null);
    });
    it('should emit auth updates through idToken', function (done) {
        var count = 0;
        var subs = afAuth.idToken.subscribe(function (user) {
            if (count === 0) {
                expect(user).toBe(null);
                count = count + 1;
                mockAuthState.next(firebaseUser);
            }
            else {
                expect(user).toEqual(firebaseUser);
                subs.unsubscribe();
                done();
            }
        }, done, done.fail);
        mockAuthState.next(null);
    });
});
//# sourceMappingURL=auth.spec.js.map