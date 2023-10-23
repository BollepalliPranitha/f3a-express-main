import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import { PORT } from '@/config';
import AvailabilityData from '@/models/models'; // Import the AvailabilityData model

export const app = express();

app.use(cors());
app.use(helmet());

// New route to fetch availability data based on teamName
app.get('/api/availability/:teamName', async (req, res) => {
  const teamName = req.params.teamName;
  try {
    // Fetch availability data based on teamName
    const availabilityData = await AvailabilityData.findAll({
      where: { teamName }, // Filter by teamName
    });

    res.status(200).json(availabilityData);
  } catch (error) {
    console.error('Error fetching availability data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/update-availability', async (req, res) => {
  const { playerName, matchDay, availability } = req.body;

  try {
    // Update availability in your database (replace with your actual database update code)
    // Make sure to validate and sanitize user input
    // Example using Sequelize:
    const [updatedRowsCount] = await AvailabilityData.update(
      { availability },
      {
        where: { playerName, matchDay },
      }
    );

    if (updatedRowsCount === 1) {
      return res.status(200).json({ message: 'Availability updated successfully' });
    }
    return res.status(404).json({ error: 'Player or match day not found' });
  } catch (error) {
    console.error('Error updating availability:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

if (process.env.NODE_ENV === 'production') {
  // If in production environment, use the PORT variable from config
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
} else {
  // In the development environment, use a default port (e.g., 3000)
  app.listen(3000, () => {
    console.log('Server is running on port 3000');
  });
}
