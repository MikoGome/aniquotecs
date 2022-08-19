"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const webscraping_1 = __importDefault(require("./webscraping"));
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
const PORT = 3000 || process.env.PORT;
app.use(express_1.default.json());
app.get('/', (req, res) => {
    res.sendFile(path_1.default.resolve('build', 'index.html'));
});
app.get('/bundle.js', (req, res) => {
    res.sendFile(path_1.default.resolve('build', 'bundle.js'));
});
app.post('/api/search', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    const search = body.character + '+' + body.anime;
    const imgUrl = yield (0, webscraping_1.default)(search);
    res.json(imgUrl);
}));
app.listen(PORT, () => {
    console.log('server is listening to PORT ' + PORT);
});
