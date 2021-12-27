var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
define("Product", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Product = void 0;
    var Product = /** @class */ (function () {
        function Product(_name, _scale) {
            this.name = _name;
            this.scale = _scale;
        }
        Product.prototype.getName = function () {
            return this.name;
        };
        Product.prototype.getScale = function () {
            return this.scale;
        };
        return Product;
    }());
    exports.Product = Product;
});
define("Scales", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Scales = /** @class */ (function () {
        function Scales() {
            this.products = [];
        }
        Scales.prototype.add = function (product) {
            this.products.push(product);
            return this;
        };
        Scales.prototype.getNameList = function () {
            return this.products.map(function (p) { return p.getName(); });
        };
        Scales.prototype.getSumScale = function () {
            var productsScaleList = this.products.map(function (p) {
                return p.getScale();
            });
            return productsScaleList.reduce(function (previous, current) { return previous + current; });
        };
        return Scales;
    }());
    exports.default = Scales;
});
define("Apple", ["require", "exports", "Product"], function (require, exports, Product_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Apple = void 0;
    var Apple = /** @class */ (function (_super) {
        __extends(Apple, _super);
        function Apple(_name, _scale, _isSweetKind) {
            var _this = _super.call(this, "\u044F\u0431\u043B\u043E\u043A\u043E ".concat(_name), _scale) || this;
            _this.isSweetKind = _isSweetKind;
            return _this;
        }
        return Apple;
    }(Product_1.Product));
    exports.Apple = Apple;
});
define("Tomato", ["require", "exports", "Product"], function (require, exports, Product_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Tomato = exports.Color = void 0;
    var Color;
    (function (Color) {
        Color[Color["Red"] = 0] = "Red";
        Color[Color["Pink"] = 1] = "Pink";
        Color[Color["Orange"] = 2] = "Orange";
        Color[Color["Yellow"] = 3] = "Yellow";
        Color[Color["Green"] = 4] = "Green";
    })(Color = exports.Color || (exports.Color = {}));
    var Tomato = /** @class */ (function (_super) {
        __extends(Tomato, _super);
        function Tomato(_name, _scale, _color) {
            var _this = _super.call(this, "\u0442\u043E\u043C\u0430\u0442 ".concat(_name), _scale) || this;
            _this.color = _color ? _color : Color.Red;
            return _this;
        }
        return Tomato;
    }(Product_2.Product));
    exports.Tomato = Tomato;
});
define("App", ["require", "exports", "Scales", "Apple", "Tomato"], function (require, exports, Scales_1, Apple_1, Tomato_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    (function () {
        var scales = new Scales_1.default();
        scales
            .add(new Apple_1.Apple("Медуница", 0.12, true))
            .add(new Apple_1.Apple("Рождественское", 0.18, true))
            .add(new Apple_1.Apple("Белорусское сладкое", 0.1, true))
            .add(new Apple_1.Apple("Белый налив", 0.2, false))
            .add(new Tomato_1.Tomato("Оранжевый спам", 0.2, Tomato_1.Color.Orange))
            .add(new Tomato_1.Tomato("Черри клубничный", 0.09, Tomato_1.Color.Red))
            .add(new Tomato_1.Tomato("Медовая капля", 0.18, Tomato_1.Color.Yellow))
            .add(new Tomato_1.Tomato("Розовый слон", 0.33, Tomato_1.Color.Pink))
            .add(new Tomato_1.Tomato("Эльдорадо", 0.25, Tomato_1.Color.Yellow))
            .add(new Tomato_1.Tomato("Турецкий сверхранний", 0.21));
        console === null || console === void 0 ? void 0 : console.log("\u0421\u043F\u0438\u0441\u043E\u043A \u043F\u0440\u043E\u0434\u0443\u043A\u0442\u043E\u0432 \u043D\u0430 \u0432\u0435\u0441\u0430\u0445: ".concat(scales.getNameList()));
        console === null || console === void 0 ? void 0 : console.log("\u0421\u0443\u043C\u043C\u0430\u0440\u043D\u044B\u0439 \u0432\u0435\u0441 \u043F\u0440\u043E\u0434\u0443\u043A\u0442\u043E\u0432: ".concat(scales.getSumScale()));
    })();
});
//# sourceMappingURL=scales_app.js.map