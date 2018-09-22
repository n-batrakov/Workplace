/**************************************************************
 * Available theming variables:
 * https://github.com/ant-design/ant-design/blob/master/components/style/themes/default.less

 * No ES6 support!
 * The reason for .js theme file instead of .less
 * is because this project uses css-in-js concept for styling.
 * 
 *************************************************************/

module.exports = {
    brandColor: '#001529',
    brandColorFont: '#bdbdbd',

    brandColorAccent: '#1d275e',
    brandColorFontAccent: '#ffffff',
    
    brandColorActive: '#3f51b5',
    brandColorFontActive: '#ffffff',

    logoText: 'workplace',
    logoFont: '15px monospace,serif',
    logoImage: '/images/icon/512.png',
    logoColor: '#dde2e5',
    logoColorActive: '#3f51b5',


    toLessVariables: function() {
        return {
            'layout-header-background': this.brandColor,
            'layout-trigger-color': this.brandColorFont,
            'layout-trigger-background': this.brandColor,

            'menu-dark-color': this.brandColorFont,
            'menu-dark-bg': this.brandColor,
            'menu-dark-arrow-color': this.brandColorAccent,
            'menu-dark-submenu-bg': this.brandColorAccent,
            'menu-dark-highlight-color': this.brandColorFontActive,
            'menu-dark-item-active-bg': this.brandColorActive,

            'primary-color': this.brandColorActive
        }
    }
}