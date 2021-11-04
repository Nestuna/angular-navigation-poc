export interface SubChannel {
    oid: string,
    dbid: number,
    type: string,
    title:  string,
    slug: string,
    language: string | null,
    thumb: string,
    add_date: string,
    comments: number,
    comments_last_month: number,
    short_description: string,
    can_edit: boolean,
    can_delete: boolean,
    sorting: string,
    display_rss_links: boolean,
    storage_quota: number,
    storage_used: number,
    unlisted: boolean
}

export interface Channel extends SubChannel {
    parent_oid: string,
    parent_title: string,
    parent_slug: string,
    parent_language: string | null
}

