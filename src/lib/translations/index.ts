import i18n from 'sveltekit-i18n';
import lang from './lang.json';

/** @type {import('sveltekit-i18n').Config} */
export const config = {
    translations: {
        "en": { lang },
        "de": { lang },
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
            key: 'color',
            loader: async () => (await import('./en/color.json')).default,
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
        {
            locale: 'en',
            key: 'layer',
            loader: async () => (await import('./en/layer.json')).default
        },
        {
            locale: 'en',
            key: 'warp',
            loader: async () => (await import('./en/warp.json')).default
        },
        {
            locale: 'en',
            key: 'keyboard',
            loader: async () => (await import('./en/keyboard.json')).default
        },
        {
            locale: 'en',
            key: 'gamepad',
            loader: async () => (await import('./en/gamepad.json')).default
        },

        //DE
        {
            locale: 'de',
            key: 'editor',
            loader: async () => (await import('./de/editor.json')).default,
        },
        {
            locale: 'de',
            key: 'editor_state',
            loader: async () => (await import('./de/editor_state.json')).default,
        },
        {
            locale: 'de',
            key: 'setting',
            loader: async () => (await import('./de/setting.json')).default,
        },
        {
            locale: 'de',
            key: 'color',
            loader: async () => (await import('./de/color.json')).default,
        },
        {
            locale: 'de',
            key: 'actioncolor',
            loader: async () => (await import('./de/actioncolor.json')).default,
        },
        {
            locale: 'de',
            key: 'midi',
            loader: async () => (await import('./de/midi.json')).default
        },
        {
            locale: 'de',
            key: 'layer',
            loader: async () => (await import('./de/layer.json')).default
        },
        {
            locale: 'de',
            key: 'warp',
            loader: async () => (await import('./de/warp.json')).default
        },
        {
            locale: 'de',
            key: 'keyboard',
            loader: async () => (await import('./de/keyboard.json')).default
        },
        {
            locale: 'de',
            key: 'gamepad',
            loader: async () => (await import('./de/gamepad.json')).default
        },

        // ZH-CN
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
            key: 'color',
            loader: async () => (await import('./zh-cn/color.json')).default,
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
        },
        {
            locale: 'zh-CN',
            key: 'layer',
            loader: async () => (await import('./zh-cn/layer.json')).default
        },
        {
            locale: 'zh-CN',
            key: 'warp',
            loader: async () => (await import('./zh-cn/warp.json')).default
        },
        {
            locale: 'zh-CN',
            key: 'keyboard',
            loader: async () => (await import('./zh-cn/keyboard.json')).default
        },
        {
            locale: 'zh-CN',
            key: 'gamepad',
            loader: async () => (await import('./zh-cn/gamepad.json')).default
        }
    ],
};

export const { t, loading, locales, locale, loadTranslations } = new i18n(config);

loading.subscribe(($loading) => $loading && console.log('Loading localizations...'));