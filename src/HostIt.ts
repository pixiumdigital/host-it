import { HostItConfiguration } from "./types";
import * as express from 'express'
import * as fs from 'fs'
import * as basicAuth from 'express-basic-auth'
const app = express()

// const testConfig: HostItConfiguration = {
//     directory: "test",
//     security: {
//         username: "admin",
//         password: "root"
//     }
// }

export const HostIt = (configuration: HostItConfiguration) => {
    const port = (configuration.port) ? configuration.port : 8080
    if (!fs.existsSync(configuration.directory)) {
        console.log("Directory does not exist please try using an absolute path")
        return false
    }
    if (configuration.security) {
        const user = configuration.security.username
        const password = configuration.security.password
        let userInfo: { [username: string]: string } = {}
        userInfo[user] = password
        console.log(`Basic Auth is setup for user: ${user}`)
        app.use(
            basicAuth({
                users: userInfo,
                challenge: true,
                realm: configuration.security.hostname
            })
        )
    }
    app.use(express.static(configuration.directory));

    app.get('*', (req: any,res: any) => res.sendFile(configuration.directory));
    
    app.listen(port, () => {
        console.log(`Server started on port ${port}`);
    });
}