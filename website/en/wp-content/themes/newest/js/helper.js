if (window.override) {
  if (override.fill) {
    var tankiGlobalFill = override.fill;
  }
  if (override.nodes) {
    nodeNames = override.nodes;
    for (var i = 1; i <= Object.size(nodeNames); i++) {
      preferedNodes['zh'].push(i);
      nodesLocaleMap[i] = '服';
    }
  }
  if (override.prefered) {
    preferedNodes[tankiGlobalLang] = override.prefered;
  }
}