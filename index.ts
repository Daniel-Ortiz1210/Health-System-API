import { app, port } from './src/app';
import 'reflect-metadata';

app.listen(port, () => {
    console.log('Server up & running' + 'port ' + port);
});
