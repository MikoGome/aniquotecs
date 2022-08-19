import express, {Request, Response, NextFunction} from "express";
import webscrape from './webscraping';
import path from "path";

const app = express();

const PORT = 3000 || process.env.PORT;

app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.sendFile(path.resolve('build', 'index.html'));
});

app.get('/bundle.js', (req: Request, res: Response) => {
  res.sendFile(path.resolve('build', 'bundle.js'));
});

app.post('/api/search', async (req: Request, res: Response) => {
  const body: bodyType = req.body;
  const search: string = body.character + '+' + body.anime;
  const imgUrl = await webscrape(search);
  res.json(imgUrl);
});

app.listen(PORT, () => {
  console.log('server is listening to PORT ' + PORT);
});

interface bodyType {
  character: string,
  anime: string
}

