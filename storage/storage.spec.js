import { forkJoin } from 'rxjs/observable/forkJoin';
import { TestBed, inject } from '@angular/core/testing';
import { FirebaseApp, AngularFireModule } from 'angularfire2';
import { AngularFireStorageModule, AngularFireStorage } from 'angularfire2/storage';
import { COMMON_CONFIG } from './test-config';
describe('AngularFireStorage', function () {
    var app;
    var afStorage;
    beforeEach(function () {
        TestBed.configureTestingModule({
            imports: [
                AngularFireModule.initializeApp(COMMON_CONFIG),
                AngularFireStorageModule
            ]
        });
        inject([FirebaseApp, AngularFireStorage], function (app_, _storage) {
            app = app_;
            afStorage = _storage;
        })();
    });
    afterEach(function (done) {
        app.delete().then(done, done.fail);
    });
    it('should exist', function () {
        expect(afStorage instanceof AngularFireStorage).toBe(true);
    });
    it('should have the Firebase storage instance', function () {
        expect(afStorage.storage).toBeDefined();
    });
    describe('upload task', function () {
        it('should upload and delete a file', function (done) {
            var data = { angular: "fire" };
            var blob = new Blob([JSON.stringify(data)], { type: 'application/json' });
            var ref = afStorage.ref('af.json');
            var task = ref.put(blob);
            var sub = task.snapshotChanges()
                .subscribe(function (snap) { expect(snap).toBeDefined(); }, function (e) { done.fail(); }, function () {
                ref.delete().subscribe(done, done.fail);
            });
        });
        it('should upload a file and observe the download url', function (done) {
            var data = { angular: "fire" };
            var blob = new Blob([JSON.stringify(data)], { type: 'application/json' });
            var ref = afStorage.ref('afs.json');
            var task = ref.put(blob);
            var url$ = task.downloadURL();
            url$.subscribe(function (url) { expect(url).toBeDefined(); }, function (e) { done.fail(); }, function () { ref.delete().subscribe(done, done.fail); });
        });
    });
    describe('reference', function () {
        it('it should upload, download, and delete', function (done) {
            var data = { angular: "fire" };
            var blob = new Blob([JSON.stringify(data)], { type: 'application/json' });
            var ref = afStorage.ref('af.json');
            var task = ref.put(blob);
            var sub = forkJoin(task.snapshotChanges())
                .mergeMap(function () { return ref.getDownloadURL(); })
                .do(function (url) { return expect(url).toBeDefined(); })
                .mergeMap(function (url) { return ref.delete(); })
                .subscribe(done, done.fail);
        });
        it('should upload, get metadata, and delete', function (done) {
            var data = { angular: "fire" };
            var blob = new Blob([JSON.stringify(data)], { type: 'application/json' });
            var ref = afStorage.ref('af.json');
            var task = ref.put(blob, { customMetadata: { blah: 'blah' } });
            var sub = forkJoin(task.snapshotChanges())
                .mergeMap(function () { return ref.getMetadata(); })
                .do(function (meta) { return expect(meta.customMetadata).toEqual({ blah: 'blah' }); })
                .mergeMap(function (meta) { return ref.delete(); })
                .subscribe(done, done.fail);
        });
    });
});
//# sourceMappingURL=storage.spec.js.map