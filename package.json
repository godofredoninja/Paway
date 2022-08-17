{
  "name": "paway",
  "description": "For fancy people, Photographers and Travel Lovers",
  "demo": "https://godofredo.ninja",
  "version": "0.0.4",
  "engines": {
    "ghost": ">=5.0.0"
  },
  "license": "GPLv3",
  "screenshots": {
    "desktop": "assets/images/screenshot-desktop.jpg",
    "mobile": "assets/images/screenshot-mobile.jpg"
  },
  "author": {
    "name": "GodoFredo",
    "email": "hello@godofredo.ninja",
    "url": "https://godofredo.ninja"
  },
  "gpm": {
    "type": "theme",
    "categories": [
      "Minimal",
      "Blog",
      "Magazine",
      "photographer",
      "travel"
    ]
  },
  "keywords": [
    "ghost",
    "theme",
    "photographer",
    "godofredo",
    "ghost-theme"
  ],
  "repository": {
    "type": "git",
    "url": "https://github.com/godofredoninja/Paway.git"
  },
  "bugs": "https://github.com/godofredoninja/Paway/issues",
  "config": {
    "posts_per_page": 12,
    "image_sizes": {
      "xxs": {
        "width": 30
      },
      "xs": {
        "width": 100
      },
      "s": {
        "width": 300
      },
      "m": {
        "width": 600
      },
      "l": {
        "width": 1000
      },
      "xl": {
        "width": 2000
      }
    },
    "card_assets": {
      "exclude": [
        "bookmark",
        "blockquote"
      ]
    },
    "custom": {
      "instagram_url": {
        "type": "text"
      },
      "youtube_url": {
        "type": "text"
      },
      "publication_cover": {
        "type": "select",
        "options": [
          "None",
          "Featured"
        ],
        "default": "Featured",
        "group": "homepage"
      },
      "title_font": {
        "type": "select",
        "options": [
            "Modern sans-serif",
            "Playfair Display"
        ],
        "default": "Modern sans-serif"
      }
    }
  },
  "browserslist": [
    "defaults"
  ],
  "cssnano": {
    "preset": [
      "advanced",
      {
        "reduceIdents": false
      }
    ]
  },
  "scripts": {
    "build": "gulp build",
    "prod": "cross-env NODE_ENV=production gulp production --production",
    "dev": "gulp development",
    "lint:js": "standard src/js/**/*.js gulpfile.js",
    "lint:css": "stylelint src/css/**/*.css",
    "lint": "yarn lint:js && yarn lint:css",
    "test": "yarn lint && gscan .",
    "scan": "gscan ."
  },
  "devDependencies": {
    "@babel/core": "^7.18.10",
    "@babel/plugin-transform-runtime": "^7.18.10",
    "@babel/preset-env": "^7.18.10",
    "@babel/runtime": "^7.18.9",
    "@tailwindcss/line-clamp": "^0.4.0",
    "@tailwindcss/typography": "^0.5.4",
    "autoprefixer": "^10.4.8",
    "babelify": "^10.0.0",
    "beeper": "^2.1.0",
    "browserify": "^17.0.0",
    "cross-env": "^7.0.3",
    "cssnano": "^5.1.12",
    "cssnano-preset-advanced": "^5.3.8",
    "del": "^6.1.1",
    "gscan": "^4.34.0",
    "gulp": "^4.0.2",
    "gulp-header": "^2.0.9",
    "gulp-if": "^3.0.0",
    "gulp-livereload": "^4.0.2",
    "gulp-postcss": "^9.0.1",
    "gulp-rename": "^2.0.0",
    "gulp-replace": "^1.1.3",
    "gulp-sourcemaps": "^3.0.0",
    "gulp-strip-comments": "^2.5.2",
    "gulp-uglify": "^3.0.2",
    "gulp-zip": "^5.1.0",
    "merge-stream": "^2.0.0",
    "postcss": "^8.4.16",
    "postcss-discard-comments": "^5.1.2",
    "postcss-extend": "^1.0.5",
    "postcss-import": "^14.1.0",
    "postcss-nested": "^5.0.6",
    "precss": "^4.0.0",
    "pump": "^3.0.0",
    "standard": "^17.0.0",
    "stylelint": "^14.9.1",
    "stylelint-config-recommended": "^8.0.0",
    "vinyl-buffer": "^1.0.1",
    "vinyl-source-stream": "^2.0.0"
  },
  "dependencies": {
    "lazysizes": "^5.3.2",
    "normalize.css": "^8.0.1",
    "tailwindcss": "^3.1.8"
  }
}
