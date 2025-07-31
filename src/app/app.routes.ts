import { Routes } from '@angular/router';
import { News } from './news/news';

export const routes: Routes = [
    {
        path: '',
        component: News,
        data: { category: 'general' }
    },
    {
        path: 'business',
        component: News,
        data: { category: 'business' }
    },
    {
        path: 'entertainment',
        component: News,
        data: { category: 'entertainment' }
    },
    {
        path: 'general',
        component: News,
        data: { category: 'general' }
    },
    {
        path: 'health',
        component: News,
        data: { category: 'health' }
    },
    {
        path: 'science',
        component: News,
        data: { category: 'science' }
    },
    {
        path: 'sports',
        component: News,
        data: { category: 'sports' }
    },
    {
        path: 'technology',
        component: News,
        data: { category: 'technology' }
    }
];