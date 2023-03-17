interface AppStore {
    alert: Alert_status;
    imported_data: object;
    dashboard: object;
    forum_file_name: string[];
    forum_messages: [];
    forum: object;
    logs: [];
    summary: object;
    summary_cards: [];
    upload_status: Upload_status;
    emotions_dataset: [];
    emotions: [];
    students: object;
}

interface Upload_status{
    status: number,
    progress: number,
}

interface Alert_status{
    status: boolean,
    message: string,
    timeout: number,
}

export {AppStore};