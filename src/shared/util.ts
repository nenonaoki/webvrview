export default class Util {
  static isDataURI(src: string) {
  return src && src.indexOf('data:') == 0;
  }
  
  static generateUUID() {
  const s4 = () => {
  return Math.floor((1 + Math.random()) * 0x10000)
  .toString(16)
  .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
  }
  
  static isMobile() {
  const checker = (arg: string) => {
  let check = false;
  if(
  /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(arg)
  || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(arg.substr(0,4))
  ) {
  check = true;
  }
  return check;
  };
  return checker(navigator.userAgent || navigator.vendor || window.opera);
  }
  
  static isIOS() {
  return /(iPad|iPhone|iPod)/g.test(navigator.userAgent);
  }
  
  static isIOS9OrLess() {
  if (!Util.isIOS()) {
  return false;
  }
  
  const re = /(iPhone|iPad|iPod) OS ([\d_]+)/;
  const iOSVersion = navigator.userAgent.match(re);
  
  if (!iOSVersion) {
  return false;
  }
  
  // Get the last group.
  const versionString = iOSVersion[iOSVersion.length - 1];
  const majorVersion = parseFloat(versionString);
  return majorVersion <= 9;
  }
  
  static isSafari() {
  return /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
  }
  
  static cloneObject(obj: any) {
  var out: any = {};
  
  Object.keys(obj).forEach((key) => {
  out[key] = obj[key];
  });
  
  return out;
  }
  
  static clone(obj: any) {
  return JSON.parse(JSON.stringify(obj));
  }
  
  static hashCode(s: string) {
  return s.split("").reduce(function(a,b){a=((a<<5)-a)+b.charCodeAt(0);return a&a},0);
  }
  
  static loadTrackSrc(context: any, src: string, callback: Function, opt_progressCallback: Function) {
  var request = new XMLHttpRequest();
  request.open('GET', src, true);
  request.responseType = 'arraybuffer';
  
  // Decode asynchronously.
  request.onload = function() {
  context.decodeAudioData(request.response, function(buffer: any) {
  callback(buffer);
  }, (e: Error) => {
  console.error(e);
  });
  };
  if (opt_progressCallback) {
  request.onprogress = (e) => {
  var percent = e.loaded / e.total;
  opt_progressCallback(percent);
  };
  }
  request.send();
  }
  
  static isPow2(n: number) {
  return (n & (n - 1)) == 0;
  }
  
  static capitalize(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1);
  }
  
  static isIFrame() {
  try {
  return window.self !== window.top;
  } catch (e) {
  return true;
  }
  }
  
  // From http://goo.gl/4WX3tg
  static getQueryParameter(name: string) {
  name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
  const regex = new RegExp("[\\?&]" + name + "=([^&#]*)");
  const results = regex.exec(location.search);
  return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
  }
  
  // From http://stackoverflow.com/questions/11871077/proper-way-to-detect-webgl-support.
  static isWebGLEnabled() {
  const canvas = document.createElement('canvas');
  let gl
  // let experimental;
  
  try {
  gl = canvas.getContext("webgl");
  } catch (x) {
  gl = null;
  }
  
  if (gl == null) {
  try {
  gl = canvas.getContext("experimental-webgl");
  // experimental = true;
  } catch (x) {
  gl = null;
  }
  }
  return !!gl;
  }
  
  
  // From http://stackoverflow.com/questions/10140604/fastest-hypotenuse-in-javascript
  static hypot(x: number, y: number) {
  return Math.hypot ? Math.hypot(x, y) : Math.sqrt(x*x + y*y);
  }
  
  // From http://stackoverflow.com/a/17447718/693934
  static isIE11() {
  return navigator.userAgent.match(/Trident/);
  }
  
  static getRectCenter(rect: { x: number, y: number, width: number, height: number, }) {
  return new THREE.Vector2(rect.x + rect.width/2, rect.y + rect.height/2);
  }
  
  static getScreenWidth() {
  return Math.max(window.screen.width, window.screen.height) * window.devicePixelRatio;
  }
  
  static getScreenHeight() {
  return Math.min(window.screen.width, window.screen.height) * window.devicePixelRatio;
  }
  
  
  static getExtension(url: string) {
  return url.split('.').pop().split('?')[0];
  }
  
  static createGetParams(params: any) {
  let out = '?';
  
  for (var k in params) {
  var paramString = k + '=' + params[k] + '&';
  out += paramString;
  }
  // Remove the trailing ampersand.
  out.substring(0, params.length - 2);
  return out;
  }
  
  static sendParentMessage(message: string) {
  if (window.parent) {
  parent.postMessage(message, '*');
  }
  }
  
  static parseBoolean(value: string | number) {
  if (value == 'false' || value == 0) {
  return false;
  } else if (value == 'true' || value == 1) {
  return true;
  } else {
  return !!value;
  }
  }
  
  /**
  * @param base {String} An absolute directory root.
  * @param relative {String} A relative path.
  *
  * @returns {String} An absolute path corresponding to the rootPath.
  *
  * From http://stackoverflow.com/a/14780463/693934.
  */
  static relativeToAbsolutePath(base: string, relative: string): string {
  const stack = base.split('/');
  const parts = relative.split('/');
  
  for (let i = 0; i < parts.length; i++) {
  if (parts[i] == '.') {
  continue;
  }
  if (parts[i] == '..') {
  stack.pop();
  } else {
  stack.push(parts[i]);
  }
  }
  return stack.join('/');
  }
  
  /**
  * @return {Boolean} True iff the specified path is an absolute path.
  */
  static isPathAbsolute(path: string) {
  return ! /^(?:\/|[a-z]+:\/\/)/.test(path);
  }
  
  static isEmptyObject(obj: Object) {
  return Object.getOwnPropertyNames(obj).length == 0;
  }
  
  static isDebug() {
  return Util.parseBoolean(Util.getQueryParameter('debug'));
  }
  
  static getCurrentScript() {
  // Note: in IE11, document.currentScript doesn't work, so we fall back to this
  // hack, taken from https://goo.gl/TpExuH.
  if (!document.currentScript) {
  console.warn('This browser does not support document.currentScript. Trying fallback.');
  }
  return document.currentScript || document.scripts[document.scripts.length - 1];
  }
  }