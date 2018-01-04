import { fromTask } from './observable/fromTask';
import { map, filter } from 'rxjs/operators';
export function createUploadTask(task) {
    var inner$ = fromTask(task);
    return {
        pause: function () { return task.pause(); },
        cancel: function () { return task.cancel(); },
        resume: function () { return task.resume(); },
        then: function () { return task.then(); },
        catch: function (onRejected) {
            return task.catch(onRejected);
        },
        snapshotChanges: function () { return inner$; },
        percentageChanges: function () {
            return inner$.pipe(filter(function (s) { return s !== undefined; }), map(function (s) { return s.bytesTransferred / s.totalBytes * 100; }));
        },
        downloadURL: function () {
            return inner$.pipe(filter(function (s) { return s !== undefined; }), filter(function (s) { return s.bytesTransferred === s.totalBytes; }), map(function (s) { return s.downloadURL; }));
        }
    };
}
//# sourceMappingURL=task.js.map