import exphbs from 'express-handlebars';
import path from 'path';

export function configureHandlebars(app, viewsPath) {
    app.engine('.hbs', exphbs.engine({
        extname: '.hbs',
        partialsDir: path.join(viewsPath, 'partials'),
        defaultLayout: 'layout'
    }));
    app.set('view engine', '.hbs');
    app.set('views', viewsPath);
}
