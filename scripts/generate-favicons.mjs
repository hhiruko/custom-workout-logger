import { loadEnv } from "vite";
import favicons from "favicons";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import fs from "node:fs/promises";
import path from "node:path";

const __dirname = dirname(dirname(fileURLToPath(import.meta.url)));
const env = loadEnv(process.env.NODE_ENV || 'development', __dirname);

if(!env.VITE_APP_ICON) {
    process.exit(0);
}

const src = 'public/favicons/' + env.VITE_APP_ICON;
const dest = 'public/favicons';
const index = 'index.html';
const manifest = 'public/favicons/manifest.webmanifest';

const configuration = {
    path: '/favicons',
    appName: env.VITE_APP_NAME,
    appShortName: env.VITE_APP_SHORT_NAME,
    appDescription: env.VITE_APP_DESCRIPTION,
    developerName: env.VITE_DEV_NAME,
    developerURL: env.VITE_DEV_URL,
    cacheBustingQueryParam: null,
    dir: "auto",
    lang: "en-US",
    appleStatusBarStyle: "default",
    display: "standalone",
    orientation: "any",
    scope: "/" + env.VITE_APP_PATH,
    start_url: "/" + env.VITE_APP_PATH,
    preferRelatedApplications: false,
    relatedApplications: undefined,
    version: env.APP_VERSION,
    pixel_art: false,
    loadManifestWithCredentials: false,
    manifestMaskable: false,
    icons: {
        android: true,
        appleIcon: true,
        appleStartup: true,
        favicons: true,
        windows: true,
        yandex: true,
    },
};

const response = await favicons(src, configuration);
await fs.mkdir(dest, { recursive: true });
await Promise.all(
    response.images.map(
        async (image) => await fs.writeFile(path.join(dest, image.name), image.contents),
    ),
);
await Promise.all(
    response.files.map(
        async (file) => await fs.writeFile(path.join(dest, file.name), file.contents),
    ),
);

const meta = response.html.filter(m => m !== '<meta name="theme-color" content="#fff">');
let html = await fs.readFile(index, 'utf-8');
const insertPosition = html.indexOf('</head>');
html = html.substring(0, insertPosition) + `\n        ${meta.join('\n        ')}\n        ` + html.substring(insertPosition);
await fs.writeFile(index, html);

let manifestJson = JSON.parse(await fs.readFile(manifest, 'utf-8'));
for(const [key, value] of manifestJson.icons.entries()){
    let newValue = value;
    newValue.src = '/' + env.VITE_APP_PATH + newValue.src.substr(1);
    manifestJson.icons[key] = newValue;
}
await fs.writeFile(manifest, JSON.stringify(manifestJson));