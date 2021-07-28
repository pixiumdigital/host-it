export interface HostItConfiguration {
    directory: string,
    port?: number
    security?: { username: string, password: string, hostname: string }
}