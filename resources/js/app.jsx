import '../css/app.css';
import './bootstrap';

import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot } from 'react-dom/client';
import Layout from "./Layouts/Layout.jsx";
import {Provider} from './Components/ui/provider'

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) => {
        // resolvePageComponent(
        //     `./Pages/${name}.jsx`,
        //     import.meta.glob('./Pages/**/*.jsx'),
        // ),
        const pages = import.meta.glob('./Pages/**/*.jsx', {eager: true})
        let page = pages[`./Pages/${name}.jsx`]

        page.default.layout = page.default.layout || ((page) => {
            return (
                <Provider>
                    <Layout children={page} />
                </Provider>
            )
        })

        return page;
    },
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(<App {...props} />);
    },
    progress: {
        showSpinner: true,
        delay: 0,
        color: '#ff0000'
    }
});
