const fs = require('fs-extra');
const path = require('path');

const isDirectory = (path) => fs.lstatSync(path).isDirectory();

function *listFilesRecursively(dir) {
    if (!isDirectory(dir)) {
        yield dir;
        return;
    }

    const files = fs.readdirSync(dir);

    for (const file of files) {
        const pathToFile = path.join(dir, file);
        if (isDirectory(pathToFile)) {
            yield *listFilesRecursively(pathToFile);
        } else {
            yield pathToFile;
        }
    }
}

function *findFiles(dir, fileName) {
    for (const file of listFilesRecursively(dir)) {
        if (path.basename(file) === fileName) {
            yield file;
        }
    }
}

function getPackageJsonFiles(dir) {
    return Array
    .from(findFiles(dir, 'package.json'))
    .map(x => fs.readFileSync(x))
    .map(x => x.toString())
    .map(x => JSON.parse(x));
}

function generatePagesProvider(manifestPaths) {
    const pagesModules = manifestPaths.map(x => `require('${x}')`).join(',\n    ');
    return `
import { PageInfo } from './core/types';

const pagesModules = [
    ${pagesModules}
];

const pages = new Array<PageInfo>().concat(...pagesModules.map(x => x.modules));

export class PagesProvider {
    getPages(): PageInfo[] {
        return pages;
    }
}
    `;
}

const ignoreDirs = ['.git', 'node_modules', 'dist', '.vscode'];
const modulesSrcDir = 'modules';
const coreSrcDir = 'frontend';

const buildDir = path.resolve('./build');
const modulesDir = path.join(buildDir, 'src', 'pages');
const pagesProviderPath = path.join(buildDir, 'src', 'pagesProvider.ts');
const moduleMarkerFileName = 'manifest.ts';
const formatModuleRequirePath = (markerFile) => 
    path.join('pages', path.relative(modulesDir, markerFile));


//// SET UP

fs.removeSync(buildDir);
fs.mkdir(buildDir);

//// COPY

const ignorePaths = ignoreDirs.map(x => path.join(coreSrcDir, x));
fs.copySync(coreSrcDir, buildDir, {
    filter: (src) => {
        return ignorePaths.find(x => x === src) === undefined;
    }
});

fs.copySync(modulesSrcDir, modulesDir);

//// NPM INSTALL

// generate package.json in tempDir with dependencies from core and every module
// run `npm install`

//// GENERATE PAGES PROVIDER

const modulesRequirePaths = Array
    .from(findFiles(modulesDir, moduleMarkerFileName))
    .map(formatModuleRequirePath);
const pagesProviderText = generatePagesProvider(modulesRequirePaths);
fs.writeFileSync(pagesProviderPath, pagesProviderText);

//// BUILD



//// CLEANUP

fs.removeSync(tempDir);