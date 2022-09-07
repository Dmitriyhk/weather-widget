# Виджет с погодой. 
 Посмотреть, как работает виджет, можно [тут](https://raspy-linen.surge.sh/)
 
 Для того, чтобы встроить виджет на свой сайт достаточно добавить в body: 
    <div id="app" class="app"></div>
    <script>
      const js = document.createElement("script");
      js.async = true;
      js.src = "https://raspy-linen.surge.sh/widget-loader.js";
      document.getElementsByTagName("head")[0].appendChild(js);
    </script>
    
  Я встроил виджет в свое реакт-приложение. На это можно посмотреть [тут](scrawny-nation.surge.sh)

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
