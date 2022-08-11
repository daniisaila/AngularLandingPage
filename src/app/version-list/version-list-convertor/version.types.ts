export interface Version{
    versionNumber: number;
    releaseNotesEntriesForVersion: ReleaseNotesEntriesForVersion[];
}

interface ReleaseNotesEntriesForVersion{
    affectedPerspective:string;
    releaseNotesComment:string;
}
