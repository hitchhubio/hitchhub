function s(e){return e!==null&&typeof e=="object"}function m(e){return s(e)&&"$type"in e&&"$value"in e}function k(e){return m(e)&&s(e.$value)}function i(e){let n=/{([^}]+)}/g;if(typeof e=="string")return n.test(e);if(s(e)){let o=!1;for(let t in e)if(Object.prototype.hasOwnProperty.call(e,t)){let r=e[t];if(i(r)){o=!0;break}}return o}return!1}function f(e){return`{${e}}`}function u(e){if(!i(e))throw new Error(`Invalid alias '${e}'.`);return e.replace("{","").replace("}","")}import{objectKeys as c}from"ts-extras";function a(e){return typeof e=="string"?/^[A-Za-z|]+(\.[A-Za-z|]+)*$/.test(e):!1}function l(...e){let n=e.map(o=>{if(i(o))return u(o);if(a(o))return o;throw new Error(`Invalid part '${o}'.`)});return f(n.join("."))}function P({alias:e,aliasedValue:n,resolveType:o}){return c(n.$value).reduce((t,r)=>{let p=o(r);if(p==null)throw new Error(`No type defined composite value key '${r}'.`);return t[r]={$type:p,$value:l(e,r)},t},{})}import{objectKeys as T}from"ts-extras";function V({value:e,resolveType:n}){return T(e.$value).reduce((o,t)=>{let r=n(t);if(r==null)throw new Error(`No type defined composite value key '${t}'.`);return o[t]={$type:r,$value:e.$value[t]},o},{})}import g from"lodash/get.js";function J({value:e,path:n,defaultValue:o}){return g(e,n,o)}export{u as aliasToPath,V as flattenComposite,P as flattenCompositeAlias,J as getValue,i as isAlias,k as isCompositeToken,s as isObject,m as isToken,f as pathToAlias};
//# sourceMappingURL=index.js.map