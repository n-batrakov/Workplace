
import { PageInfo } from './core/types';

const pagesModules = [
    require('pages/Home/manifest.ts'),
    require('pages/Leaves/manifest.ts'),
    require('pages/Team/manifest.ts'),
];

const pages = new Array<PageInfo>().concat(...pagesModules.map(x => x.modules));

export class PagesProvider {
    getPages(): PageInfo[] {
        return pages;
    }

}