export interface Release{
    versionNumber: number;
    releaseNotesEntriesForVersion: ReleaseNotesEntriesForVersion[];
}

export interface ReleaseDisplay
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
