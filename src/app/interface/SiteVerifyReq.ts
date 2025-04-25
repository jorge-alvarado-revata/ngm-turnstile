export interface SiteVerifyRequest {
    secret: string,
    response: string,
    remoteip?: string
}