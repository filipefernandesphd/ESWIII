import app from './app';
import dotenv from 'dotenv';

dotenv.config();

const PORT: number = Number(process.env.PORT) || 3001;

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});