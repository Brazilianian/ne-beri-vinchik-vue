let link = document.querySelector("link[rel~='icon']");
link = document.createElement('link');
link.rel = 'icon';
document.head.appendChild(link);
link.href = 'https://stackoverflow.com/favicon.ico';