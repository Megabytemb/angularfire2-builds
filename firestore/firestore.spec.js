var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { FirebaseApp, AngularFireModule } from 'angularfire2';
import { AngularFirestore } from './firestore';
import { AngularFirestoreModule } from './firestore.module';
import { AngularFirestoreDocument } from './document/document';
import { AngularFirestoreCollection } from './collection/collection';
import { TestBed, inject } from '@angular/core/testing';
import { COMMON_CONFIG } from './test-config';
describe('AngularFirestore', () => {
    let app;
    let afs;
    let sub;
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                AngularFireModule.initializeApp(COMMON_CONFIG),
                AngularFirestoreModule.enablePersistence()
            ]
        });
        inject([FirebaseApp, AngularFirestore], (_app, _afs) => {
            app = _app;
            afs = _afs;
        })();
    });
    afterEach((done) => __awaiter(this, void 0, void 0, function* () {
        yield app.delete();
        done();
    }));
    it('should be the properly initialized type', () => {
        expect(afs instanceof AngularFirestore).toBe(true);
    });
    it('should have an initialized Firebase app', () => {
        expect(afs.app).toBeDefined();
    });
    it('should create an AngularFirestoreDocument', () => {
        const doc = afs.doc('a/doc');
        expect(doc instanceof AngularFirestoreDocument).toBe(true);
    });
    it('should create an AngularFirestoreCollection', () => {
        const collection = afs.collection('stuffs');
        expect(collection instanceof AngularFirestoreCollection).toBe(true);
    });
    it('should throw on an invalid document path', () => {
        const singleWrapper = () => afs.doc('collection');
        const tripleWrapper = () => afs.doc('collection/doc/subcollection');
        expect(singleWrapper).toThrowError();
        expect(tripleWrapper).toThrowError();
    });
    it('should throw on an invalid collection path', () => {
        const singleWrapper = () => afs.collection('collection/doc');
        const quadWrapper = () => afs.collection('collection/doc/subcollection/doc');
        expect(singleWrapper).toThrowError();
        expect(quadWrapper).toThrowError();
    });
    it('should enable persistence', (done) => {
        const sub = afs.persistenceEnabled$.subscribe(isEnabled => {
            expect(isEnabled).toBe(true);
            done();
        });
    });
});
describe('AngularFirestore without persistance', () => {
    let app;
    let afs;
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                AngularFireModule.initializeApp(COMMON_CONFIG),
                AngularFirestoreModule
            ]
        });
        inject([FirebaseApp, AngularFirestore], (_app, _afs) => {
            app = _app;
            afs = _afs;
        })();
    });
    it('should not enable persistence', (done) => {
        afs.persistenceEnabled$.subscribe(isEnabled => {
            expect(isEnabled).toBe(false);
            done();
        });
    });
});
//# sourceMappingURL=firestore.spec.js.map