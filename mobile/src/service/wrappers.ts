import { KategoriaClient, VersenyzoClient } from "../client/client";
import { ImageUploadClient } from "./../client/client.files";

export class FileUploadService extends ImageUploadClient {
    constructor(baseUrl?: string, http?: { fetch(url: RequestInfo, init?: RequestInit): Promise<Response> }) {
        super(baseUrl, http);
        this.jsonParseReviver = ReviveDateTime;
    }
}

export class KategoriaService extends KategoriaClient {
    constructor(baseUrl?: string, http?: { fetch(url: RequestInfo, init?: RequestInit): Promise<Response> }) {
        super(baseUrl, http);
        this.jsonParseReviver = ReviveDateTime;
    }
}

export class VersenyzoService extends VersenyzoClient {
    constructor(baseUrl?: string, http?: { fetch(url: RequestInfo, init?: RequestInit): Promise<Response> }) {
        super(baseUrl, http);
        this.jsonParseReviver = ReviveDateTime;
    }
}

// tslint:disable-next-line: max-classes-per-file
function ReviveDateTime(key: any, value: any): any {
    const DATE_PREFIX = "@!Date";
    if (typeof value === "string" && value.startsWith(DATE_PREFIX)) {
        const datePart = value.substr(DATE_PREFIX.length);
        const converted = new Date(datePart)
        return converted;
    }
    else if (value === null) {
        return undefined;
    }

    return value;
}