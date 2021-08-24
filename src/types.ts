export interface HostItConfiguration {
    directory: string,
    port?: number,
    isReact: boolean
    security?: { username: string, password: string, hostname: string }
}