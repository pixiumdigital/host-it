import { HostItConfiguration } from "./types";
import * as express from 'express'
import * as fs from 'fs'
import * as path from 'path'
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

    if (configuration.isReact) {
        console.log(`Launching a React App`)
        if (path.isAbsolute(configuration.directory) && fs.existsSync(path.join(configuration.directory, 'images'))) {
            app.use('/images', express.static(path.join(configuration.directory, 'images')))
        }
        app.all('*', (req, res) => {
            //res.redirect('/');
            // Nice parse for dynamic / absolute urls
            let targetPath = configuration.directory
            if (!path.isAbsolute(targetPath)) {
                targetPath = path.join(process.cwd(), configuration.directory)
            }
            res.sendFile(path.join(targetPath, '/index.html'), (err) => {
                if (err) {
                    res.status(500).send(err)
                }
            })
        });
    }

    app.listen(port, () => {
        console.log(`Server started on port ${port}`);
    });
}