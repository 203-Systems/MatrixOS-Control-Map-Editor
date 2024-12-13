import i18n from 'sveltekit-i18n';
import lang from './lang.json';

/** @type {import('sveltekit-i18n').Config} */
export const config = {
    translations: {
        "en": { lang },
        "zh-CN": { lang },
    },
    loaders: [
        //EN
        {
            locale: 'en',
            key: 'editor',
            loader: async () => (await import('./en/editor.json')).default,
        },
        {
            locale: 'en',
            key: 'editor_state',
            loader: async () => (await import('./en/editor_state.json')).default,
        },
        {
            locale: 'en',
            key: 'setting',
            loader: async () => (await import('./en/setting.json')).default,
        },
        {
            locale: 'en',
            key: 'actioncolor',
            loader: async () => (await import('./en/actioncolor.json')).default,
        },
        {
            locale: 'en',
            key: 'midi',
            loader: async () => (await import('./en/midi.json')).default
        },
        //ZH-CN
        {
            locale: 'zh-CN',
            key: 'editor',
            loader: async () => (await import('./zh-cn/editor.json')).default,
        },
        {
            locale: 'zh-cn',
            key: 'editor_state',
            loader: async () => (await import('./zh-cn/editor_state.json')).default,
        },
        {
            locale: 'zh-CN',
            key: 'setting',
            loader: async () => (await import('./zh-cn/setting.json')).default,
        },
        {
            locale: 'zh-CN',
            key: 'actioncolor',
            loader: async () => (await import('./zh-cn/actioncolor.json')).default,
        },
        {
            locale: 'zh-CN',
            key: 'midi',
            loader: async () => (await import('./zh-cn/midi.json')).default
        }
    ],
};

export const { t, loading, locales, locale, loadTranslations } = new i18n(config);

loading.subscribe(($loading) => $loading && console.log('Loading localizations...'));