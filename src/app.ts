import { server } from "./server";

import { environment } from "./environments/environment";

server.listen(environment.port, () => {
    console.log(`Listening on http://${environment.domain}:${environment.port}`);
});