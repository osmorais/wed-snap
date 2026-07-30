import 'dotenv/config';
import { createApp } from './application';

const port = process.env.PORT ?? 3000;
const app = createApp();

app.listen(port, () => {
  console.log(`WedSnap API rodando em http://localhost:${port}`);
});
