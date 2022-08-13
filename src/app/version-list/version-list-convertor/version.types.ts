export interface Version{
    versionNumber: number;
    releaseNotesEntriesForVersion: ReleaseNotesEntriesForVersion[];
}

export interface VersionDisplay
{
    versionNumber: number;
    perspectivesComments: PerspectiveComments[];
}

export interface PerspectiveComments
{
    affectedPerspective:string;
    affectedPerspectivecomments: string[];
}

interface ReleaseNotesEntriesForVersion{
    affectedPerspective:string;
    releaseNotesComment:string;
}
