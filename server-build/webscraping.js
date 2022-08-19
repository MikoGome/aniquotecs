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
const puppeteer_1 = __importDefault(require("puppeteer"));
function webscrape(params) {
    return __awaiter(this, void 0, void 0, function* () {
        const browser = yield puppeteer_1.default.launch();
        const page = yield browser.newPage();
        const URL = `https://www.google.com/search?q=${params}&sxsrf=ALiCzsZCha0uJqjiuzH3sLIuBD-ZIhLQfw:1660941518663&source=lnms&tbm=isch&sa=X&ved=2ahUKEwjboNmp4dP5AhVxKkQIHXLEC-IQ_AUoAXoECAIQAw`;
        yield page.goto(URL);
        const imgUrl = yield page.evaluate(() => {
            const imageEl = document.querySelector('.rg_i');
            return imageEl.getAttribute('src');
        });
        yield browser.close();
        return imgUrl;
    });
}
exports.default = webscrape;
