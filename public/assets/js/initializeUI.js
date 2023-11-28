(async () => {
  const app = document.createElement("div");
  // app.style.position = "fixed";
  // app.style.top = "50%";
  // app.style.transform = "translateY(-50%)";
  // app.style.right = 0;
  // app.style.width = "300px";
  // app.style.height = "100%";
  // app.style.zIndex = 1000;

  app.id = "root";
  document.body.append(app);

  const src = chrome?.runtime?.getURL("/react/index.js");
  await import(src);
})();
