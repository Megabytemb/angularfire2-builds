import { UploadTaskSnapshot, UploadTask } from '@firebase/storage-types';
import { Observable } from 'rxjs/Observable';
export interface AngularFireUploadTask {
    snapshotChanges(): Observable<UploadTaskSnapshot | undefined>;
    percentageChanges(): Observable<number | undefined>;
    downloadURL(): Observable<string | null>;
    pause(): boolean;
    cancel(): boolean;
    resume(): boolean;
    then(): Promise<any>;
    catch(onRejected: (a: Error) => any): Promise<any>;
}
export declare function createUploadTask(task: UploadTask): AngularFireUploadTask;
