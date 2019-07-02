let APP;

if (window.NATIVE) {
  APP = window.NATIVE;
} else {
  APP = window.NATIVE = {};
}

export default APP;
