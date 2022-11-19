import express, {Request, Response} from "express";
import webscrape from './webscraping';
import path from "path";

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.sendFile(path.resolve('build', 'index.html'));
});

app.get('/bundle.js', (req: Request, res: Response) => {
  res.sendFile(path.resolve('build', 'bundle.js'));
});

app.post('/api/search', async (req: Request, res: Response) => {
  const body: bodyType = req.body;
  const search: string = body.character.split(' ').concat(body.anime.split(' ')).join('+');
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

