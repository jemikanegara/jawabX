## Bug Fixing

node_modules => internal => index.js

on detach function change into     
    `if(node.parentNode) node.parentNode.removeChild(node);`


## Bugs and feedback

Sapper is in early development, and may have the odd rough edge here and there. Please be vocal over on the [Sapper issue tracker](https://github.com/sveltejs/sapper/issues).
