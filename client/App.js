"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
require("./stylesheets/App.scss");
const App = () => {
    const [anime, setAnime] = (0, react_1.useState)({});
    const [image, setImage] = (0, react_1.useState)('');
    (0, react_1.useEffect)(() => {
        fetch('https://animechan.vercel.app/api/random')
            .then(response => response.json())
            .then((anime) => {
            setAnime(anime);
            fetch('/api/search', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(anime)
            })
                .then(response => response.json())
                .then((imgUrl) => {
                setImage(imgUrl);
            });
        })
            .catch(e => console.log(e));
    }, []);
    return (<div className="app">
      <div className="info">
        <h1>{anime.anime}</h1>
        <h2>{anime.quote}</h2>
        <h3>{anime.character && '-' + anime.character}</h3>
      </div>
      <div className="image">
        <img src={image}/>
      </div>
    </div>);
};
exports.default = App;
