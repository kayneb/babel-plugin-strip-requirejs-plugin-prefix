module.exports = function (babel) {
    var t = babel.types;

    function isRequireJsCall(path) {
        if (!path.isCallExpression()) return false;

        if (path.node.callee.name !== "require" &&
            path.node.callee.name !== "define") return false;


        var requirements = path.get("arguments")[0];
        if (requirements.length > 0) return false;

        for (var i = 0; i < requirements.length; i++) {
            if (!requirements[i].isStringLiteral()) return false;
        }

        return true;
    }

    function maybeRemovePrefix(node, plugin) {
        if (node.value.indexOf(plugin + '!') === 0) {
            node.value = node.value.substring((plugin + '!').length);
        }
    }

    return {
        visitor: {
            CallExpression: function (path, state) {
                var plugin = state.opts.plugin;
                if (!plugin) {
                    throw new Error('plugin must be defined');
                }

                if (isRequireJsCall(path)) {
                    var requirements = path.get("arguments")[0];

                    if (t.isArrayExpression(requirements)) {
                        var elems = requirements.get("elements");
                        for (var i = 0; i < elems.length; i++) {
                            maybeRemovePrefix(elems[i].node, plugin)
                        }
                    } else if (t.isStringLiteral(requirements)) {
                        maybeRemovePrefix(requirements.node, plugin)
                    }
                }
            }
        }
    };
}